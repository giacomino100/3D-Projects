"""3D surface definition: depth field Z(x, y), stations S0..Sn, lofted slabs,
and the trim body (visible shell + rear returns).

The visible face is the surface  z = zf(x, y):
    zf = z_bow(x) + z_wrap(x) + (y + H/2) * tan(pitch(x))  - zf(0, 0)
 - z_bow  : gentle convex bow over the full length          (ASSUMED)
 - z_wrap : rearward wrap of the outer end around the corner (PHOTO_DERIVED, low)
 - pitch  : section rotation about X (top edge rearward), increasing over the
            wrap zone = local twist                         (ASSUMED)
The front-view silhouette is imposed by intersecting curved slabs with prisms
of the planform extruded along Z, so the projected outline is exact by
construction while the surface keeps compound curvature.
"""
import math
import numpy as np
import cadquery as cq

import parameters as P
from geometry import planform as PF

Z_LO, Z_HI = -80.0, 160.0   # prism extent along Z (covers full group depth)


def _u(x):
    return np.clip(np.asarray(x, float) / P.L, -0.1, 1.1)


def _wrap_frac(x):
    u = _u(x)
    return np.clip((u - P.X_WRAP_START) / (1.0 - P.X_WRAP_START), 0.0, None)


def pitch_rad(x):
    if getattr(P, "Z_STATIONS", None) is not None:
        return np.radians(_PITCH(np.asarray(x, float)))
    return math.radians(P.PITCH_DEG) + math.radians(P.TWIST_OUTER_DEG) * np.clip(_wrap_frac(x), 0, 1)


CROWN = getattr(P, "CROWN", 0.0)   # V2: transverse convexity of the visible face (mm at mid-height)


Z_STATIONS = getattr(P, "Z_STATIONS", None)   # V3-B: [(s, z_mid, pitch_deg), ...] station table


def _station_interp():
    from scipy.interpolate import PchipInterpolator
    st = np.asarray(Z_STATIONS, float)
    return PchipInterpolator(st[:, 0], st[:, 1], extrapolate=True), PchipInterpolator(st[:, 0], st[:, 2], extrapolate=True)


if Z_STATIONS is not None:
    _ZC, _PITCH = _station_interp()


RAIL_CROWN = getattr(P, "RAIL_CROWN", 0.0)     # V5: convex (rounded) section of each rail, sagitta in mm
_RAIL = None


def _rail_tables():
    """Per-s tables of the band edges (outer top/bottom, opening top/bottom) from the planform."""
    global _RAIL
    if _RAIL is None:
        o = PF.spline_points("outer", 6000); i = PF.spline_points("opening", 6000)
        ss = np.arange(np.floor(o[:, 0].min()), np.ceil(o[:, 0].max()) + 0.5, 0.5)
        yo, yi = o[:, 1].mean(), i[:, 1].mean()
        def tab(pts, up, yc):
            out = np.full(len(ss), np.nan)
            sel = pts[(pts[:, 1] > yc) if up else (pts[:, 1] <= yc)]
            idx = np.clip(np.round((sel[:, 0] - ss[0]) / 0.5).astype(int), 0, len(ss) - 1)
            for k in range(len(ss)):
                v = sel[idx == k, 1]
                if len(v):
                    out[k] = v.max() if up else v.min()
            ok = np.isfinite(out)
            return np.interp(ss, ss[ok], out[ok]) if ok.any() else out
        s_a, s_b = i[:, 0].min(), i[:, 0].max()
        if getattr(P, "EDGE_SMOOTH", 0):   # V8: straight crease lines (the photo-fitted edges wiggle ~0.1 mm)
            from scipy.ndimage import gaussian_filter1d
            # smoothed along the rails; the END B loop (steep legs) only lightly (bin noise of the tables)
            wl = np.clip((395.0 - ss) / 10.0, 0, 1)
            sm = lambda v, r=P.EDGE_SMOOTH: (wl * gaussian_filter1d(v, r / 0.5, mode="nearest")
                                             + (1 - wl) * gaussian_filter1d(v, 1.0 / 0.5, mode="nearest"))
            _RAIL = dict(s=ss, ot=sm(tab(o, True, yo)), ob=sm(tab(o, False, yo)), it=tab(i, True, yi),
                         ib=sm(tab(i, False, yi), 1.0), s_a=s_a, s_b=s_b)
            return _RAIL
        _RAIL = dict(s=ss, ot=tab(o, True, yo), ob=tab(o, False, yo), it=tab(i, True, yi), ib=tab(i, False, yi),
                     s_a=s_a, s_b=s_b)
    return _RAIL


def _smoothstep(t):
    t = np.clip(t, 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


def rail_crown(x, y):
    """-RAIL_CROWN * 4t(1-t) across each rail (t = 0 at the outer edge, 1 at the opening edge),
    faded in/out over RAIL_CROWN_FADE mm at both ends of the opening. 0 elsewhere (plate)."""
    if RAIL_CROWN == 0.0 or getattr(P, "CROWN_IN_TABLE", False):
        return 0.0
    T = _rail_tables(); x = np.asarray(x, float); y = np.asarray(y, float)
    ot, ob, it, ib = (np.interp(x, T["s"], T[k]) for k in ("ot", "ob", "it", "ib"))
    fade = getattr(P, "RAIL_CROWN_FADE", 15.0)
    w = np.clip((x - T["s_a"]) / fade, 0, 1) * np.clip((T["s_b"] - x) / fade, 0, 1)
    if getattr(P, "RECESS_SMOOTH", False):   # V8: crown across the bead of constant width (lines follow the part,
        ib_open = ib                            # no bump where the opening steps near END B)
        it, ib = ot - P.W_BEAD, ob + P.W_BEAD
        if getattr(P, "BOTTOM_FLAT", 0):        # bottom rail: the bead reaches exactly the start of the cavity band
            b0, b1 = P.BOTTOM_FLAT_S             # that runs parallel to the opening edge
            wB = _smoothstep((x - b0) / P.BOTTOM_FLAT_FADE[0]) * _smoothstep((b1 - x) / P.BOTTOM_FLAT_FADE[1])
            ib = (1 - wB) * ib + wB * (ib_open - P.BOTTOM_FLAT - P.RW_LEDGE)
    tu = np.clip((ot - y) / np.maximum(ot - it, 1e-6), 0, 1); up = (y <= ot) & (y >= it)
    tl = np.clip((y - ob) / np.maximum(ib - ob, 1e-6), 0, 1); lo = (y >= ob) & (y <= ib)
    if getattr(P, "RECESS_SMOOTH", False):   # V8: zero slope at the bead edges -> no crease line where the bead
        z = np.where(up, 16 * (tu * (1 - tu)) ** 2, 0.0) + np.where(lo, 16 * (tl * (1 - tl)) ** 2, 0.0)  # meets the sweep
    else:
        z = np.where(up, 4 * tu * (1 - tu), 0.0) + np.where(lo, 4 * tl * (1 - tl), 0.0)
    return -RAIL_CROWN * w * z


def _zf_raw(x, y):
    if Z_STATIONS is not None:   # V3-B: shape-preserving interpolation between measured stations
        x = np.asarray(x, float); y = np.asarray(y, float)
        v = np.clip(-y / P.H, 0.0, 1.0)
        return (_ZC(x) + (y + P.H / 2.0) * np.tan(np.radians(_PITCH(x))) - CROWN * 4.0 * v * (1.0 - v)
                + rail_crown(x, y))
    u = _u(x)
    y = np.asarray(y, float)
    z_bow = -P.Z_SAG_MAIN * 4.0 * u * (1.0 - u)
    z_wrap = P.Z_WRAP_OUTER * _wrap_frac(x) ** P.WRAP_EXP
    v = np.clip(-y / P.H, 0.0, 1.0)
    z_crown = -CROWN * 4.0 * v * (1.0 - v)
    return z_bow + z_wrap + (y + P.H / 2.0) * np.tan(pitch_rad(x)) + z_crown


_Z0 = float(_zf_raw(0.0, 0.0))

# ---------------------------------------------------------------------------
# V8: smooth recess. The face between the rail beads is set back by a depth field
# (no vertical steps): the bead runs into the ledge / END A pocket with a curved
# inward sweep (photos alB_1, alA_3, fre_2). Along the rails the face sweeps from the
# bead line down to the ledge in a band of constant width: D_LEDGE * h(dL / RW_LEDGE); at END A it sweeps
# in one curve down to the pocket floor (pocket band eroded by RW_POCKET): D_RECESS *
# h(dL / (dL + dF)); smooth max of the two, h = smoothstep, light blur against the
# raster staircase. Rasterised once (RECESS_RES mm), bilinear lookup.
# ---------------------------------------------------------------------------
RECESS_SMOOTH = getattr(P, "RECESS_SMOOTH", False)
_DEPTH = None


def _depth_table():
    global _DEPTH
    if _DEPTH is None:
        from matplotlib.path import Path
        from scipy.ndimage import distance_transform_edt
        from scipy.interpolate import RegularGridInterpolator
        r = getattr(P, "RECESS_RES", 0.2)
        ss = np.arange(-40.0, P.L + 40.0, r); ys = np.arange(-P.H - 30.0, 30.0, r)
        S, Y = np.meshgrid(ss, ys, indexing="ij"); pts = np.c_[S.ravel(), Y.ravel()]
        ledge, pocket = PF.recess_regions_smooth()

        def mask(g):
            m = np.zeros(len(pts), bool)
            for part in getattr(g, "geoms", [g]):
                m |= Path(np.asarray(part.exterior.coords)).contains_points(pts)
            return m.reshape(S.shape)
        import shapely
        from shapely.geometry import Polygon
        from scipy.ndimage import gaussian_filter
        mL = mask(ledge)
        floor = pocket.buffer(-P.RW_POCKET, join_style="round")   # END A floor (flat at D_RECESS)
        opening = Polygon(PF.spline_points("opening", 4000)).buffer(0)
        q = shapely.points(pts[mL.ravel()])
        dL = shapely.distance(q, ledge.boundary)       # exact distances (a raster EDT leaves a staircase)
        dF = shapely.distance(q, floor) if not floor.is_empty else np.full(len(q), 1e9)
        # along the rails the sweep is a constant-width band from the bead line (straight lines that follow
        # the part, as on the photos), not tied to the opening outline (that bent the lines at the END B steps)
        a_ = P.D_LEDGE * _smoothstep(dL / P.RW_LEDGE)
        if getattr(P, "BOTTOM_FLAT", 0):
            # bottom rail (user): the cavity runs PARALLEL to the opening bottom edge, step included - a flat band
            # of BOTTOM_FLAT at D_LEDGE along the edge, then the sweep up to the bead over RW_LEDGE
            qs, qy = pts[mL.ravel(), 0], pts[mL.ravel(), 1]
            dO = shapely.distance(q, opening)
            a_bot = P.D_LEDGE * _smoothstep((P.BOTTOM_FLAT + P.RW_LEDGE - dO) / P.RW_LEDGE)
            b0, b1 = P.BOTTOM_FLAT_S
            wB = (qy < P.BOTTOM_FLAT_Y) * _smoothstep((qs - b0) / P.BOTTOM_FLAT_FADE[0]) * _smoothstep((b1 - qs) / P.BOTTOM_FLAT_FADE[1])
            a_ = (1 - wB) * a_ + wB * a_bot
        b_ = P.D_RECESS * _smoothstep(dL / np.maximum(dL + dF, 1e-6))
        if getattr(P, "ENDA_SINGLE", None):     # V9: END A handled by the single-crease pocket below
            b_ = np.zeros_like(b_)
        out = np.zeros(len(pts)); out[mL.ravel()] = (a_ ** 8 + b_ ** 8) ** 0.125   # smooth max of the sweeps
        if getattr(P, "BOTTOM_CHANNEL", None):
            # V9c (user + alB_1 shadow): the bottom lip is a simple lip frontally but the rail behind it goes INWARD -
            # a recessed channel along the whole part (no raised bead on the bottom rail)
            dch, wl, rwc, c0, c1 = P.BOTTOM_CHANNEL
            o_sm = PF.outer_smooth_polygon()
            mB = (pts[:, 1] < P.BOTTOM_FLAT_Y + 10.0) & Path(np.asarray(o_sm.exterior.coords)).contains_points(pts)
            dOb = np.zeros(len(pts)); dOb[mB] = shapely.distance(shapely.points(pts[mB]), o_sm.boundary)
            ch = np.where(mB, dch * _smoothstep((dOb - wl) / rwc), 0.0)
            ch *= _smoothstep((P.BOTTOM_FLAT_Y + 5.0 - pts[:, 1]) / 15.0)          # smooth in y (loop legs)
            ch *= _smoothstep((c1 - pts[:, 0]) / 20.0) * _smoothstep((pts[:, 0] - c0) / 10.0)
            out = (out ** 8 + ch ** 8) ** 0.125
        if getattr(P, "ENDA_SINGLE", None):
            # V9 (photos alB_1, alA_3): at END A the plate drops from the rails in ONE concave crease (no ledge level),
            # crease lines = straight extensions of the opening edges, narrow rim along the slanted nose
            a0, a1 = P.ENDA_SINGLE
            mP = mask(pocket).ravel()
            dP = np.zeros(len(pts)); dP[mP] = shapely.distance(shapely.points(pts[mP]), pocket.boundary)
            rw = np.full(len(pts), float(P.RW_POCKET))
            if getattr(P, "POCKET_TO_LIP", False):   # bottom: long gentle roll from the plate down to the lip
                ty = _smoothstep((P.BOTTOM_FLAT_Y + 5.0 - pts[:, 1]) / 15.0)
                rw = (1 - ty) * rw + ty * P.RW_LIP_ENDA
            endA = np.where(mP, P.D_RECESS * _smoothstep(dP / rw), 0.0)
            wA = _smoothstep((a1 - pts[:, 0]) / (a1 - a0))
            out = (1 - wA) * out + wA * endA
        # END A: the recess is shallower at the nose and gets deeper towards the opening (user, photos)
        r0, r1 = getattr(P, "RECESS_RAMP_S", (None, None))
        if r0 is not None:
            rmin = getattr(P, "RECESS_RAMP_MIN", 0.0)
            out *= rmin + (1 - rmin) * _smoothstep((pts[:, 0] - r0) / (r1 - r0))
        out = out.reshape(S.shape)
        if getattr(P, "CROWN_IN_TABLE", False):
            # V8: rail crown (rounded bead) from EXACT distances to the outer edge (vertical tables gave a sawtooth
            # on the steep END B loop legs); on the bottom rail the bead ends where the cavity band starts
            o_sm = PF.outer_smooth_polygon()
            inner_core = o_sm.buffer(-12.0)
            mC = Path(np.asarray(o_sm.exterior.coords)).contains_points(pts)
            for g in getattr(inner_core, "geoms", [inner_core]):
                if not g.is_empty:
                    mC &= ~Path(np.asarray(g.exterior.coords)).contains_points(pts)
            qc = shapely.points(pts[mC]); cs, cy = pts[mC, 0], pts[mC, 1]
            dOut = shapely.distance(qc, o_sm.boundary)
            Weff = np.full(len(qc), float(P.W_BEAD))
            if getattr(P, "BOTTOM_FLAT", 0):
                dOc = shapely.distance(qc, opening)
                b0, b1 = P.BOTTOM_FLAT_S
                wB = (cy < P.BOTTOM_FLAT_Y) * _smoothstep((cs - b0) / P.BOTTOM_FLAT_FADE[0]) * _smoothstep((b1 - cs) / P.BOTTOM_FLAT_FADE[1])
                Weff = (1 - wB) * Weff + wB * (dOut + np.maximum(dOc - P.BOTTOM_FLAT - P.RW_LEDGE, 0.0))
            t = np.clip(dOut / np.maximum(Weff, 1e-6), 0, 1)
            T_ = _rail_tables(); fade = getattr(P, "RAIL_CROWN_FADE", 15.0)
            sa = getattr(P, "CROWN_S_START", T_["s_a"])      # V9: rounded rails continue to the END A nose
            wc = np.clip((cs - sa) / fade, 0, 1) * np.clip((T_["s_b"] - cs) / fade, 0, 1)
            amp = np.clip(Weff / P.W_BEAD, 0, 1)        # narrower bead (END B step) -> proportionally lower crown
            if getattr(P, "BOTTOM_CHANNEL", None):      # bottom rail is a recessed channel, not a raised bead
                c0b, c1b = P.BOTTOM_CHANNEL[3], P.BOTTOM_CHANNEL[4]
                amp = amp * (1 - (cy < P.BOTTOM_FLAT_Y) * _smoothstep((c1b - cs) / 20.0) * _smoothstep((cs - c0b) / 10.0))
            crown = np.zeros(len(pts)); crown[mC] = -RAIL_CROWN * amp * wc * 16 * (t * (1 - t)) ** 2
            out = out + crown.reshape(S.shape)
        bs, by = getattr(P, "RECESS_BLUR", (0.3, 0.3))
        out = gaussian_filter(out, (bs / r, by / r))
        mO = Path(PF.spline_points("opening", 4000)).contains_points(pts).reshape(S.shape)
        dIn = np.zeros(len(pts)); mo = mO.ravel()           # exact depth inside the opening (a raster EDT
        dIn[mo] = shapely.distance(shapely.points(pts[mo]), opening.boundary)   # left ticks along the edge)
        w = _smoothstep(dIn.reshape(S.shape) / 3.0)         # inside the opening (cut away): no jumps
        out = (1 - w) * out + w * gaussian_filter(out, 4.0 / r)
        _DEPTH = RegularGridInterpolator((ss, ys), out, bounds_error=False, fill_value=0.0)
    return _DEPTH


def recess_depth(x, y):
    if not RECESS_SMOOTH:
        return 0.0
    x, y = np.broadcast_arrays(np.asarray(x, float), np.asarray(y, float))
    return _depth_table()(np.c_[x.ravel(), y.ravel()]).reshape(x.shape)


def zf(x, y):
    """Front (visible) face depth at (x, y)."""
    return _zf_raw(x, y) - _Z0 + recess_depth(x, y)


_FACE = None


def _face_surface():
    """V8: the visible face as ONE B-spline surface approximated on a dense (s, y) grid of zf
    (carries the smooth recess, which a 17-section loft cannot)."""
    global _FACE
    if _FACE is None:
        from OCP.TColgp import TColgp_Array2OfPnt
        from OCP.gp import gp_Pnt
        from OCP.BRepBuilderAPI import BRepBuilderAPI_MakeFace
        ds, dy = getattr(P, "FACE_GRID", (1.0, 0.5))
        ss = np.arange(-12.0, P.L + 12.0 + 1e-9, ds); ys = np.arange(-P.H - 6.0, 6.0 + 1e-9, dy)
        S, Y = np.meshgrid(ss, ys, indexing="ij"); Z = zf(S, Y)
        # exact tensor-product cubic spline of z(s, y) (scipy), turned into an OCC B-spline with poles at the
        # Greville abscissae: x(u) = u, y(v) = v exactly, no oscillation (GeomAPI approximation of this grid
        # oscillated by hundreds of mm).
        from scipy.interpolate import RectBivariateSpline
        from OCP.TColStd import TColStd_Array1OfReal, TColStd_Array1OfInteger
        sp = RectBivariateSpline(ss, ys, Z, kx=3, ky=3, s=0)
        tx, ty = sp.get_knots()             # full knot vectors (end knots repeated 4x)
        cf = sp.get_coeffs().reshape(len(tx) - 4, len(ty) - 4)
        gx = np.array([tx[i + 1:i + 4].mean() for i in range(len(tx) - 4)])
        gy = np.array([ty[j + 1:j + 4].mean() for j in range(len(ty) - 4)])
        poles = TColgp_Array2OfPnt(1, len(gx), 1, len(gy))
        for i in range(len(gx)):
            for j in range(len(gy)):
                poles.SetValue(i + 1, j + 1, gp_Pnt(float(gx[i]), float(gy[j]), float(cf[i, j])))

        def km(t):
            u, mlt = np.unique(t, return_counts=True)
            K = TColStd_Array1OfReal(1, len(u)); M = TColStd_Array1OfInteger(1, len(u))
            for k, (x_, m_) in enumerate(zip(u, mlt)):
                K.SetValue(k + 1, float(x_)); M.SetValue(k + 1, int(m_))
            return K, M
        (UK, UM), (VK, VM) = km(tx), km(ty)
        from OCP.Geom import Geom_BSplineSurface
        surf = Geom_BSplineSurface(poles, UK, VK, UM, VM, 3, 3)
        # one surface with ~65k poles makes every boolean hang: split it along s into exact segments
        # (identical boundary curves) and sew them -> each prism wall only meets a small patch
        from OCP.Geom import Geom_BSplineSurface
        from OCP.BRepBuilderAPI import BRepBuilderAPI_Sewing
        u0, u1, v0, v1 = surf.Bounds()
        sew = BRepBuilderAPI_Sewing(1e-5)
        us = np.linspace(u0, u1, getattr(P, "FACE_TILES", 20) + 1)
        for a, b in zip(us[:-1], us[1:]):
            c = Geom_BSplineSurface(surf.Poles(), surf.UKnots(), surf.VKnots(), surf.UMultiplicities(),
                                    surf.VMultiplicities(), surf.UDegree(), surf.VDegree())
            c.Segment(a, b, v0, v1)
            sew.Add(BRepBuilderAPI_MakeFace(c, 1e-6).Face())
        sew.Perform()
        _FACE = cq.Shape.cast(sew.SewedShape())
    return _FACE


def dzdx(x, y=None, h=0.5):
    y = -P.H / 2 if y is None else y
    return (zf(x + h, y) - zf(x - h, y)) / (2 * h)


def stations(n=None):
    """Longitudinal stations S0..S(n-1) with geometry descriptors (for docs)."""
    n = n or P.N_STATIONS
    xs = np.linspace(0.0, P.L, n)
    out = []
    for i, x in enumerate(xs):
        ytop = 0.0
        ybot = -P.H
        # visible band widths at this X
        if x < P.OPEN_X0:
            band = "solid plate"
        elif x > PF.outer_x_at(-P.W_TOP) - P.W_OUTER:
            band = "outer end loop"
        else:
            band = f"top {P.W_TOP} / bottom {P.W_BOT}"
        zc = float(zf(x, -P.H / 2))
        s = float(dzdx(x))
        tangent = np.array([1.0, 0.0, s]); tangent /= np.linalg.norm(tangent)
        pr = pitch_rad(x)
        # surface normal pointing forward (out of the visible face, -Z)
        dzdy = math.tan(pr)
        nrm = np.array([s, dzdy, -1.0]); nrm /= np.linalg.norm(nrm)
        out.append(dict(name=f"S{i}", x=float(x), y_top=ytop, y_bot=ybot, y_mid=-P.H / 2,
                        z_mid=zc, z_top=float(zf(x, 0.0)), z_bot=float(zf(x, -P.H)),
                        tangent=tangent.round(4).tolist(), normal=nrm.round(4).tolist(),
                        pitch_deg=math.degrees(pr), band=band,
                        ret_outer=P.D_RET_OUTER, ret_top=P.D_RET_TOP))
    return out


def slab(z_off0, z_off1, n=None, x_margin=20.0, y_margin=20.0):
    """Curved slab between zf+z_off0 and zf+z_off1, lofted through X-sections."""
    if RECESS_SMOOTH:   # V8: prism of the B-spline face shell along Z (exactly zf+off0 .. zf+off1)
        from OCP.BRepPrimAPI import BRepPrimAPI_MakePrism
        from OCP.gp import gp_Vec
        sh = _face_surface().moved(cq.Location(cq.Vector(0, 0, z_off0)))
        sols = cq.Shape.cast(BRepPrimAPI_MakePrism(sh.wrapped, gp_Vec(0, 0, z_off1 - z_off0)).Shape()).Solids()
        return sols[0].fuse(*sols[1:], glue=True).clean() if len(sols) > 1 else sols[0]
    n = n or max(P.N_STATIONS, 15)
    xs = np.linspace(-x_margin, P.L + x_margin, n)
    y0, y1 = -P.H - y_margin, y_margin
    wires = []
    for x in xs:
        if CROWN == 0.0:   # V1: straight sections (face linear in y)
            a = cq.Vector(x, y0, float(zf(x, y0)) + z_off0)
            b = cq.Vector(x, y1, float(zf(x, y1)) + z_off0)
            c = cq.Vector(x, y1, float(zf(x, y1)) + z_off1)
            d = cq.Vector(x, y0, float(zf(x, y0)) + z_off1)
            wires.append(cq.Wire.makePolygon([a, b, c, d], close=True))
        else:              # V2: curved sections (crown), spline front/back curves
            ys = np.linspace(y0, y1, getattr(P, "SECTION_PTS", 11))
            fr = [cq.Vector(x, float(y), float(zf(x, y)) + z_off0) for y in ys]
            bk = [cq.Vector(x, float(y), float(zf(x, y)) + z_off1) for y in ys[::-1]]
            e = [cq.Edge.makeSpline(fr), cq.Edge.makeLine(fr[-1], bk[0]),
                 cq.Edge.makeSpline(bk), cq.Edge.makeLine(bk[-1], fr[0])]
            wires.append(cq.Wire.assembleEdges(e))
    return cq.Solid.makeLoft(wires, ruled=False)


def prism(wire):
    """Extrude a planar XY wire along Z through the full depth range."""
    w = wire.moved(cq.Location(cq.Vector(0, 0, Z_LO)))
    f = cq.Face.makeFromWires(w)
    return cq.Solid.extrudeLinear(f, cq.Vector(0, 0, Z_HI - Z_LO))


def build_body():
    """Visible shell + rear returns, fused. Returns (shape, report dict)."""
    rep = {}
    outer = prism(PF.outer_wire())
    outer_in = prism(PF.outer_wire(offset=-P.T_WALL))
    opening = prism(PF.opening_wire())
    opening_out = prism(PF.opening_wire(offset=+P.T_WALL))

    shell = slab(0.0, P.T_SHELL).intersect(outer).cut(opening)

    ring_outer = outer.cut(outer_in)
    ret_outer = slab(P.T_SHELL - 0.2, P.T_SHELL + P.D_RET_OUTER).intersect(ring_outer)

    ring_open = opening_out.cut(opening)
    ret_open = slab(P.T_SHELL - 0.2, P.T_SHELL + P.D_RET_OPEN).intersect(ring_open)

    # deeper return along the top edge only (top bar), between tip and outer corner
    top_box = cq.Solid.makeBox(P.L - 2 * P.R_TIP - P.R_OUTER_TOP - 6, 6.0, Z_HI - Z_LO,
                               cq.Vector(P.R_TIP + 4, -6.0 + 0.01, Z_LO))
    ret_top = slab(P.T_SHELL - 0.2, P.T_SHELL + P.D_RET_TOP).intersect(ring_outer).intersect(top_box)

    body = shell.fuse(ret_outer).fuse(ret_open).fuse(ret_top).clean()

    if P.EDGE_FILLET > 0:
        try:
            # front perimeter edges = edges of the shell lying on the visible face
            front_edges = [e for e in body.Edges()
                           if abs(e.Center().z - float(zf(e.Center().x, e.Center().y))) < 0.3]
            body = body.fillet(P.EDGE_FILLET, front_edges)
            rep["edge_fillet"] = f"applied r={P.EDGE_FILLET} on {len(front_edges)} front edges"
        except Exception as ex:  # documented fallback, see docs/assumptions.md
            rep["edge_fillet"] = f"NOT applied (OCC fillet failed: {type(ex).__name__}); sharp edges in V1"
    rep["body_valid"] = body.isValid()
    rep["body_volume_mm3"] = body.Volume()
    return body, rep


# ---------------------------------------------------------------------------
# V2 body: lip return on the outer perimeter, deep wall on the TOP edge of the
# opening ending with a step (pru_1, fre_3, fre_4, pru_4), shallow return on the
# rest of the opening, separate edge radii.
# ---------------------------------------------------------------------------
def _classify_front_edges(body):
    """Return (outer_front_edges, opening_front_edges) lying on the visible face."""
    o = PF.outline_polyline("outer", 1.0); i = PF.outline_polyline("opening", 1.0)
    from scipy.spatial import cKDTree
    ko, ki = cKDTree(o), cKDTree(i)
    outer, opening = [], []
    for e in body.Edges():
        pts = [e.positionAt(t) for t in (0.2, 0.5, 0.8)]
        if max(abs(q.z - float(zf(q.x, q.y))) for q in pts) > 0.35:
            continue
        c = pts[1]
        do, di = ko.query([c.x, c.y])[0], ki.query([c.x, c.y])[0]
        if min(do, di) > 1.5:
            continue
        (outer if do < di else opening).append(e)
    return outer, opening


def build_body_v2():
    """Builds the body; verifies every boolean by volume (OCC can fail SILENTLY on
    spline prisms depending on the spline discretisation) and retries with other
    SPLINE_SEG_PTS values. Raises if no discretisation gives consistent volumes."""
    base_pts = getattr(P, "SPLINE_SEG_PTS", 28)
    tried = []
    for npts in [base_pts, 60, 40, 48, 36, 56, 64, 44, 52, 32]:
        if npts in tried:
            continue
        tried.append(npts)
        P.SPLINE_SEG_PTS = npts
        try:
            body, rep = _build_body_v2_once()
        except _BoolCheck as ex:
            print(f"[build_body_v2] SPLINE_SEG_PTS={npts}: boolean check failed ({ex}) -> retry", flush=True)
            continue
        rep["spline_seg_pts"] = npts
        rep["spline_seg_pts_tried"] = tried
        return body, rep
    raise RuntimeError(f"build_body_v2: boolean volume checks failed for SPLINE_SEG_PTS in {tried}")


class _BoolCheck(Exception):
    pass


def _check(label, got, expected, tol=0.12):
    if expected > 0 and abs(got - expected) > tol * expected:
        raise _BoolCheck(f"{label}: {got:.0f} mm3 vs expected ~{expected:.0f} mm3")


def _ring_prism(w_outer, w_inner):
    """Planar face with a hole, extruded through the full depth (more robust than
    prism(outer).cut(prism(inner)) for dense spline outlines)."""
    a = w_outer.moved(cq.Location(cq.Vector(0, 0, Z_LO)))
    b = w_inner.moved(cq.Location(cq.Vector(0, 0, Z_LO)))
    f = cq.Face.makeFromWires(a, [b])
    return cq.Solid.extrudeLinear(f, cq.Vector(0, 0, Z_HI - Z_LO))


def _region_prism(regions):
    """Prism through the full depth of planar regions [(outer_wire, [hole_wires])] (V7 recess levels)."""
    out = None
    for w, holes in regions:
        mv = lambda x: x.moved(cq.Location(cq.Vector(0, 0, Z_LO)))
        s = cq.Solid.extrudeLinear(cq.Face.makeFromWires(mv(w), [mv(h) for h in holes]), cq.Vector(0, 0, Z_HI - Z_LO))
        out = s if out is None else out.fuse(s)
    return out


def _valid(label, shape):
    if not shape.isValid():
        raise _BoolCheck(f"{label}: invalid OCC shape")
    return shape


def _build_body_v2_once():
    rep = {}
    outer = prism(PF.outer_wire())
    opening = prism(PF.opening_wire())
    A_out = cq.Face.makeFromWires(PF.outer_wire()).Area()
    A_open = cq.Face.makeFromWires(PF.opening_wire()).Area()
    A_out_in = cq.Face.makeFromWires(PF.outer_wire(offset=-P.T_RETURN)).Area()
    A_open_out = cq.Face.makeFromWires(PF.opening_wire(offset=+P.T_WALL_OPEN)).Area()
    skin_ring = _valid("skin ring", _ring_prism(PF.outer_wire(), PF.opening_wire()))
    skin = _valid("skin", slab(0.0, P.T_SKIN, n=P.N_LOFT).intersect(skin_ring))
    _check("skin", skin.Volume(), (A_out - A_open) * P.T_SKIN, tol=0.05)
    ring_outer = _valid("outer ring", _ring_prism(PF.outer_wire(), PF.outer_wire(offset=-P.T_RETURN)))
    _check("outer ring", ring_outer.Volume(), (A_out - A_out_in) * (Z_HI - Z_LO))
    lip = _valid("lip", slab(P.T_SKIN - 0.2, P.T_SKIN + P.D_RET_OUTER, n=P.N_LOFT).intersect(ring_outer))
    _check("lip", lip.Volume(), (A_out - A_out_in) * (P.D_RET_OUTER + 0.2), tol=0.2)
    ring_open = _valid("opening ring", _ring_prism(PF.opening_wire(offset=+P.T_WALL_OPEN), PF.opening_wire()))
    _check("opening ring", ring_open.Volume(), (A_open_out - A_open) * (Z_HI - Z_LO))
    # opening return profile = shallow return everywhere  U  deep wall along the TOP
    # edge of the opening, from the opening start to the step at WALL_TOP_END_S.
    # (Built as one profile, then ONE intersection with the ring: intersecting the
    # deep slab with the ring first gives an invalid OCC solid.)
    oi = PF.outline_polyline("opening", 1.0)
    y_mid = 0.5 * (oi[:, 1].max() + oi[:, 1].min())
    s0 = oi[:, 0].min() - 5.0
    box = cq.Solid.makeBox(P.WALL_TOP_END_S - s0, 40.0, Z_HI - Z_LO, cq.Vector(s0, y_mid, Z_LO))
    prof = slab(P.T_SKIN - 0.2, P.T_SKIN + P.D_RET_OPEN, n=P.N_LOFT).fuse(
        slab(P.T_SKIN - 0.2, P.T_SKIN + P.D_WALL_OPEN_TOP, n=P.N_LOFT).intersect(box))
    ret_open = _valid("opening return", prof.intersect(ring_open))

    parts = [skin, lip, ret_open]
    if RECESS_SMOOTH:
        rep["recess"] = dict(mode="smooth depth field in the face surface", W_BEAD=P.W_BEAD, D_LEDGE=P.D_LEDGE,
                             D_RECESS=P.D_RECESS, RW_LEDGE=P.RW_LEDGE, RW_POCKET=P.RW_POCKET)
    elif getattr(P, "W_BEAD", None):
        # V7: beads stay on the face; ledge (D_LEDGE) and END A pocket (D_RECESS) are the same skin set back
        T = P.T_SKIN
        led_p, poc_p = _region_prism(PF.recess_wires("ledge")), _region_prism(PF.recess_wires("pocket"))
        skin = _valid("skin - recess", skin.cut(led_p))
        ledge = _valid("ledge", slab(P.D_LEDGE, P.D_LEDGE + T, n=P.N_LOFT).intersect(skin_ring)
                       .intersect(led_p).cut(poc_p))
        pocket = _valid("pocket", slab(P.D_RECESS, P.D_RECESS + T, n=P.N_LOFT).intersect(skin_ring).intersect(poc_p))
        _check("recess", skin.Volume() + ledge.Volume() + pocket.Volume(), (A_out - A_open) * T, tol=0.05)
        parts = [skin, ledge, pocket, lip, ret_open]
        rep["recess"] = dict(ledge_mm3=round(ledge.Volume()), pocket_mm3=round(pocket.Volume()),
                             W_BEAD=P.W_BEAD, D_LEDGE=P.D_LEDGE, D_RECESS=P.D_RECESS)
    body = parts[0]
    for p in parts[1:]:
        body = body.fuse(p)
    body = _valid("body", body.clean())
    tot = sum(p.Volume() for p in parts)
    if getattr(P, "W_BEAD", None):   # overlaps of returns with the set-back levels: bounded check
        if not 0.85 * tot < body.Volume() <= 1.001 * tot:
            raise _BoolCheck(f"body: {body.Volume():.0f} mm3 vs parts {tot:.0f} mm3")
    else:
        _check("body", body.Volume(), tot - 0.2 * ((A_out - A_out_in) + (A_open_out - A_open)), tol=0.08)
    rep["boolean_volume_checks"] = "passed (skin, opening cut, rings, lip, body)"
    # Visible-edge radii: OCC fillets on long spline edges can hang -> run them in a
    # child process with a time limit; on timeout/failure keep sharp edges (reported).
    import subprocess, tempfile, os, sys as _sys
    tmp = tempfile.mkdtemp()
    src, dst = os.path.join(tmp, "in.brep"), os.path.join(tmp, "out.brep")
    body.exportBrep(src)
    worker = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "fillet_worker.py")
    try:
        cp = subprocess.run([_sys.executable, worker, src, dst, str(P.R_OUTER_VISIBLE), str(P.R_INNER_VISIBLE)],
                            capture_output=True, text=True, timeout=getattr(P, "FILLET_TIMEOUT_S", 240))
        if cp.returncode == 0 and os.path.exists(dst):
            fb = cq.Shape.importBrep(dst)
            if fb.isValid():
                body = fb
            rep["visible_fillets"] = "applied: " + "; ".join(cp.stdout.strip().splitlines())
        else:
            rep["visible_fillets"] = "NOT applied (worker error): " + cp.stderr.strip()[-200:]
    except subprocess.TimeoutExpired:
        rep["visible_fillets"] = (f"NOT applied: OCC fillet did not finish in {getattr(P, 'FILLET_TIMEOUT_S', 240)} s "
                                  "on the spline edges -> sharp visible edges in V2 STEP (R_OUTER_VISIBLE/R_INNER_VISIBLE "
                                  "kept as parameters)")
    rep["body_valid"] = body.isValid()
    rep["body_volume_mm3"] = body.Volume()
    return body, rep
