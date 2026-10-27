"""Front-view (XY) planform of 81A807925A: outer contour + through-opening.

All corners are exact tangent arcs (line / arc segments), so the STEP keeps
true circular edges. Geometry is driven only by cad/parameters.py.
"""
import math
import numpy as np
import cadquery as cq

import parameters as P


def _unit(v):
    v = np.asarray(v, float)
    return v / np.linalg.norm(v)


def rounded_polygon(pts, radii):
    """Return a list of segments for a closed polygon with filleted corners.

    pts   : list of (x, y) vertices (closed implicitly)
    radii : corner radius per vertex (0 = sharp)
    segments: ("line", p0, p1) | ("arc", p0, pm, p1)
    """
    n = len(pts)
    pts = [np.asarray(p, float) for p in pts]
    corners = []
    for i in range(n):
        p_prev, p, p_next = pts[i - 1], pts[i], pts[(i + 1) % n]
        r = radii[i]
        u_in = _unit(p_prev - p)     # toward previous vertex
        u_out = _unit(p_next - p)    # toward next vertex
        cosang = float(np.clip(np.dot(u_in, u_out), -1.0, 1.0))
        theta = math.acos(cosang)    # interior angle at vertex
        if r <= 0 or theta < 1e-6 or abs(theta - math.pi) < 1e-6:
            corners.append((p, None, p))
            continue
        d = r / math.tan(theta / 2.0)
        # keep tangent points inside the adjacent edges
        d = min(d, 0.49 * np.linalg.norm(p_prev - p), 0.49 * np.linalg.norm(p_next - p))
        r_eff = d * math.tan(theta / 2.0)
        t_in = p + u_in * d
        t_out = p + u_out * d
        bis = _unit(u_in + u_out)
        center = p + bis * (r_eff / math.sin(theta / 2.0))
        mid = center - bis * r_eff
        corners.append((t_in, mid, t_out))
    segs = []
    for i in range(n):
        t_in, mid, t_out = corners[i]
        if mid is not None:
            segs.append(("arc", t_in, mid, t_out))
        nxt_in = corners[(i + 1) % n][0]
        if np.linalg.norm(nxt_in - t_out) > 1e-6:
            segs.append(("line", t_out, nxt_in))
    return segs


def segments_to_wire(segs, z=0.0):
    edges = []
    V = lambda p: cq.Vector(float(p[0]), float(p[1]), z)
    for s in segs:
        if s[0] == "line":
            edges.append(cq.Edge.makeLine(V(s[1]), V(s[2])))
        else:
            edges.append(cq.Edge.makeThreePointArc(V(s[1]), V(s[2]), V(s[3])))
    return cq.Wire.assembleEdges(edges)


def _outer_raw(dx_tip=0.0, dx_out=0.0):
    pts = [
        (0.0 - dx_tip, 0.0),                  # A inner tip (top-left), sharp vertex
        (P.L + dx_out, -P.TOP_EDGE_BOW),      # B outer top corner (X extreme), sharp vertex
        (P.L - P.OUTER_RUN, -P.H),            # C outer bottom corner
        (P.INNER_RUN, -P.H),                  # D inner bottom corner
    ]
    radii = [P.R_TIP, P.R_OUTER_TOP, P.R_OUTER_BOT, P.R_INNER_BOT]
    # build clockwise -> reverse to CCW for a positive face normal (+Z)
    return pts[::-1], radii[::-1]


_DX = None


def outer_outline():
    """Outer contour, installed front view. Tip at top-left (inner end).
    Sharp vertices A and B are pushed outward so that the ROUNDED outline
    spans exactly X = 0 ... L (L is the photo-measured visible extent)."""
    global _DX
    if _DX is None:
        dx_tip = dx_out = 0.0
        for _ in range(4):
            pts, radii = _outer_raw(dx_tip, dx_out)
            xs = _sample(pts, radii)[:, 0]
            dx_tip += xs.min() - 0.0
            dx_out += P.L - xs.max()
        _DX = (dx_tip, dx_out)
    return _outer_raw(*_DX)


def _sample(pts, radii, step=0.5):
    return _polyline(rounded_polygon(pts, radii), step)


def outer_x_at(y):
    """X of the (sharp) outer slanted end at height y (y in [-H, 0])."""
    return P.L - P.OUTER_RUN * (-y) / P.H


def inner_x_at(y):
    """X of the (sharp) inner slanted end at height y."""
    return P.INNER_RUN * (-y) / P.H


def opening_outline():
    y_top = -P.W_TOP
    y_bot = -(P.H - P.W_BOT)
    x_rt = outer_x_at(y_top) - P.W_OUTER
    x_rb = outer_x_at(y_bot) - P.W_OUTER
    pts = [
        (P.OPEN_X0, y_top),
        (x_rt, y_top),
        (x_rb, y_bot),
        (P.OPEN_X0, y_bot),
    ]
    radii = [P.R_OPEN_IN, P.R_OPEN_OUT_TOP, P.R_OPEN_OUT_BOT, P.R_OPEN_IN]
    return pts[::-1], radii[::-1]


# ---------------------------------------------------------------------------
# V2: independent periodic splines (control points photo-fitted), active when
# parameters define OUTER_CPS / OPENING_CPS. V1 (lines + arcs) otherwise.
# ---------------------------------------------------------------------------
def _spline_mode(which):
    return getattr(P, "OUTER_CPS" if which == "outer" else "OPENING_CPS", None) is not None


def spline_points(which, n=400):
    from scipy.interpolate import splprep, splev
    cps = np.asarray(P.OUTER_CPS if which == "outer" else P.OPENING_CPS, float)
    c = np.vstack([cps, cps[:1]])
    tck, _ = splprep([c[:, 0], c[:, 1]], s=0, per=True, k=3)
    x, y = splev(np.linspace(0, 1, n, endpoint=False), tck)
    pts = np.c_[x, y]
    # orientation CCW (positive area) for a +Z face normal
    area = 0.5 * np.sum(pts[:, 0] * np.roll(pts[:, 1], -1) - np.roll(pts[:, 0], -1) * pts[:, 1])
    return pts if area > 0 else pts[::-1]


def _offset_cps(which, offset, n=900):
    """Offset of the (CCW) spline outline by `offset` mm along the outward normal,
    computed on a dense polyline (valid while |offset| < min radius of curvature)."""
    p = spline_points(which, n)
    t = np.roll(p, -1, 0) - np.roll(p, 1, 0)
    nrm = np.c_[t[:, 1], -t[:, 0]]; nrm /= np.linalg.norm(nrm, axis=1)[:, None]   # outward for CCW
    q = p + offset * nrm
    return q[:: max(1, n // 180)]


def _spline_wire(which, z=0.0, offset=0.0, nseg=4, npts=None):
    """Closed wire from `nseg` NON-periodic splines joined with G1 tangents
    (a single periodic B-spline face breaks OCC booleans)."""
    from scipy.interpolate import splprep, splev
    npts = npts or getattr(P, "SPLINE_SEG_PTS", 28)
    cps = np.asarray(P.OUTER_CPS if which == "outer" else P.OPENING_CPS, float)
    if offset and getattr(P, "NUMPY_OFFSET", False):
        cps = _offset_cps(which, offset)
        offset = 0.0
    c = np.vstack([cps, cps[:1]])
    tck, _ = splprep([c[:, 0], c[:, 1]], s=0, per=True, k=3)
    # orientation: CCW
    xs, ys = splev(np.linspace(0, 1, 400, endpoint=False), tck)
    ccw = 0.5 * np.sum(xs * np.roll(ys, -1) - np.roll(xs, -1) * ys) > 0
    us = np.linspace(0, 1, nseg + 1)
    if not ccw:
        us = us[::-1]
    edges = []
    V = lambda a, b: cq.Vector(float(a), float(b), z)
    for a, b in zip(us[:-1], us[1:]):
        u = np.linspace(a, b, npts)
        x, y = splev(u, tck)
        dx0, dy0 = splev(a, tck, der=1); dx1, dy1 = splev(b, tck, der=1)
        sgn = 1.0 if b > a else -1.0
        t0, t1 = V(sgn * dx0, sgn * dy0).normalized(), V(sgn * dx1, sgn * dy1).normalized()
        t0 = cq.Vector(t0.x, t0.y, 0); t1 = cq.Vector(t1.x, t1.y, 0)
        pts = [V(xx, yy) for xx, yy in zip(x, y)]
        edges.append(cq.Edge.makeSpline(pts, tangents=[t0, t1], scale=True))
    w = cq.Wire.assembleEdges(edges)
    if offset:
        w = w.offset2D(offset, "arc")[0]
    return w


def _poly_wire(which, z=0.0, offset=0.0):
    """V3 robust mode: dense polyline (OUTLINE_POLY_STEP mm) of the spline outline,
    offsets computed on the polyline normals. Planar side faces -> robust booleans."""
    step = P.OUTLINE_POLY_STEP
    pts = spline_points(which, 6000)
    if offset:
        t = np.roll(pts, -1, 0) - np.roll(pts, 1, 0)
        nrm = np.c_[t[:, 1], -t[:, 0]]; nrm /= np.linalg.norm(nrm, axis=1)[:, None]
        pts = pts + offset * nrm
    d = np.r_[0, np.cumsum(np.linalg.norm(np.diff(pts, axis=0), axis=1))]
    tt = np.arange(0, d[-1] - 0.5 * step, step)
    q = np.c_[np.interp(tt, d, pts[:, 0]), np.interp(tt, d, pts[:, 1])]
    return cq.Wire.makePolygon([cq.Vector(float(a), float(b), z) for a, b in q], close=True)


def outer_wire(z=0.0, offset=0.0):
    if _spline_mode("outer") and getattr(P, "OUTLINE_POLY_STEP", None):
        return _poly_wire("outer", z, offset)
    if _spline_mode("outer"):
        return _spline_wire("outer", z, offset)
    pts, radii = outer_outline()
    w = segments_to_wire(rounded_polygon(pts, radii), z)
    if offset:
        w = w.offset2D(offset, "arc")[0]
    return w


def opening_wire(z=0.0, offset=0.0):
    if _spline_mode("opening") and getattr(P, "OUTLINE_POLY_STEP", None):
        return _poly_wire("opening", z, offset)
    if _spline_mode("opening"):
        return _spline_wire("opening", z, offset)
    pts, radii = opening_outline()
    w = segments_to_wire(rounded_polygon(pts, radii), z)
    if offset:
        w = w.offset2D(offset, "arc")[0]
    return w


def outline_polyline(which="outer", step=1.0):
    """Sampled 2D outline (numpy Nx2), used for photo overlays / docs."""
    if _spline_mode(which):
        pts = spline_points(which, 2000)
        d = np.r_[0, np.cumsum(np.linalg.norm(np.diff(pts, axis=0), axis=1))]
        t = np.arange(0, d[-1], step)
        return np.c_[np.interp(t, d, pts[:, 0]), np.interp(t, d, pts[:, 1])]
    pts, radii = outer_outline() if which == "outer" else opening_outline()
    return _polyline(rounded_polygon(pts, radii), step)


def _polyline(segs, step=1.0):
    out = []
    for s in segs:
        if s[0] == "line":
            p0, p1 = s[1], s[2]
            n = max(2, int(np.linalg.norm(p1 - p0) / step))
            out += [p0 + (p1 - p0) * t for t in np.linspace(0, 1, n, endpoint=False)]
        else:
            p0, pm, p1 = s[1], s[2], s[3]
            # circle through 3 points
            ax, ay = p0; bx, by = pm; cx, cy = p1
            d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
            ux = ((ax**2 + ay**2) * (by - cy) + (bx**2 + by**2) * (cy - ay) + (cx**2 + cy**2) * (ay - by)) / d
            uy = ((ax**2 + ay**2) * (cx - bx) + (bx**2 + by**2) * (ax - cx) + (cx**2 + cy**2) * (bx - ax)) / d
            c = np.array([ux, uy]); r = np.linalg.norm(p0 - c)
            a0 = math.atan2(*(p0 - c)[::-1]); am = math.atan2(*(pm - c)[::-1]); a1 = math.atan2(*(p1 - c)[::-1])
            # choose direction passing through am
            def norm(a): return (a - a0) % (2 * math.pi)
            ccw = norm(am) < norm(a1)
            span = norm(a1) if ccw else -((a0 - a1) % (2 * math.pi))
            n = max(3, int(abs(span) * r / step))
            out += [c + r * np.array([math.cos(a0 + span * t), math.sin(a0 + span * t)])
                    for t in np.linspace(0, 1, n, endpoint=False)]
    return np.array(out)


# ---------------------------------------------------------------------------
# V7: raised rail beads + recessed levels between them (photo alB_1, alA_3, fre_2).
#  LEDGE  : outer inset by W_BEAD (bead = constant-width band along the outer edge),
#           set back by D_LEDGE; along the opening it is the thin ledge that ends with
#           the two steps near END B (clipped at FLOOR_S_MAX: the END B loop is bead only).
#  POCKET : END A only, between the straight extensions of the opening top / bottom
#           edges ('sopra e sotto continuano dritte'), kept >= POCKET_RIM inside the
#           bead, set back by D_RECESS (the 'rientro').
# Both run 0.5 mm into the opening (no faces coincident with the opening walls) and
# are morphologically opened to drop strips narrower than FLOOR_MIN_W.
# ---------------------------------------------------------------------------
def recess_polygons():
    from shapely.geometry import Polygon, box
    w = getattr(P, "W_BEAD", None)
    if not w:
        return {"ledge": [], "pocket": []}
    outer = Polygon(spline_points("outer", 6000)).buffer(0)
    o_pts = spline_points("opening", 6000)
    opening = Polygon(o_pts).buffer(0)
    r = 0.5 * getattr(P, "FLOOR_MIN_W", 1.2)
    clean = lambda g: g.buffer(-r, join_style="round").buffer(r, join_style="round")
    shrunk = opening.buffer(-0.5, join_style="round")
    ledge = outer.buffer(-w, join_style="round").intersection(box(-50, -200, P.FLOOR_S_MAX, 200))
    ledge = clean(ledge.difference(shrunk))
    # straight extensions of the opening edges, fitted on s in POCKET_FIT_S
    a, b = P.POCKET_FIT_S
    yc = o_pts[:, 1].mean()
    lines = []
    for up in (True, False):
        q = o_pts[((o_pts[:, 1] > yc) if up else (o_pts[:, 1] <= yc)) & (o_pts[:, 0] > a) & (o_pts[:, 0] < b)]
        lines.append(np.polyfit(q[:, 0], q[:, 1], 1))
    s0, s1 = -50.0, P.POCKET_S_MAX
    band = Polygon([(s0, np.polyval(lines[0], s0)), (s1, np.polyval(lines[0], s1)),
                    (s1, np.polyval(lines[1], s1)), (s0, np.polyval(lines[1], s0))])
    pocket = band.intersection(outer.buffer(-(w + P.POCKET_RIM), join_style="round"))
    pocket = clean(pocket.difference(shrunk)).intersection(ledge)
    pick = lambda g: [x for x in getattr(g, "geoms", [g]) if x.area > 5.0]
    return {"ledge": pick(ledge.simplify(0.02)), "pocket": pick(clean(pocket).simplify(0.02))}


def _ring_spline_wire(ring, z=0.0, nseg=6, step=1.0):
    """Closed G1 wire of `nseg` splines through a shapely ring resampled every `step` mm
    (few long smooth edges -> the step edges can be filleted, unlike a dense polygon)."""
    from scipy.interpolate import splprep, splev
    L_ = ring.length
    q = np.array([ring.interpolate(t).coords[0] for t in np.arange(0, L_, step)])
    c = np.vstack([q, q[:1]])
    tck, _ = splprep([c[:, 0], c[:, 1]], s=0.0005 * len(c), per=True, k=3)
    us = np.linspace(0, 1, nseg + 1)
    V = lambda a, b: cq.Vector(float(a), float(b), z)
    edges = []
    for a, b in zip(us[:-1], us[1:]):
        u = np.linspace(a, b, max(8, int(L_ / nseg / step)))
        x, y = splev(u, tck)
        t0, t1 = (V(*splev(v, tck, der=1)).normalized() for v in (a, b))
        edges.append(cq.Edge.makeSpline([V(xx, yy) for xx, yy in zip(x, y)], tangents=[t0, t1], scale=True))
    return cq.Wire.assembleEdges(edges)


def recess_wires(which, z=0.0):
    """[(outer_wire, [hole_wires])] of the 'ledge' or 'pocket' region."""
    if getattr(P, "RECESS_SPLINE", False):
        mk = lambda ring: _ring_spline_wire(ring, z)
    else:
        mk = lambda ring: cq.Wire.makePolygon([cq.Vector(float(a), float(b), z) for a, b in list(ring.coords)[:-1]],
                                              close=True)
    return [(mk(g.exterior), [mk(h) for h in g.interiors]) for g in recess_polygons()[which]]


def outer_smooth_polygon():
    """Outer contour smoothed along the edge by EDGE_SMOOTH (straight bead / cavity lines), shapely Polygon."""
    from shapely.geometry import Polygon
    op = spline_points("outer", 6000)
    if getattr(P, "EDGE_SMOOTH", 0):
        from scipy.ndimage import gaussian_filter1d
        step = np.mean(np.linalg.norm(np.diff(op, axis=0), axis=1))
        op = gaussian_filter1d(op, P.EDGE_SMOOTH / step, axis=0, mode="wrap")
    return Polygon(op).buffer(0)


def recess_regions_smooth():
    """V8: regions of the smooth recess depth field (shapely), NOT cut by the opening (the depth must
    depend on the distance from the bead line / pocket line only, the opening is cut afterwards).
    ledge  = outer inset by W_BEAD, s < FLOOR_S_MAX;  pocket = band between the straight extensions of
    the opening edges, >= POCKET_RIM inside the ledge line, s < POCKET_S_MAX."""
    from shapely.geometry import Polygon, box
    w = P.W_BEAD
    op = spline_points("outer", 6000)
    if getattr(P, "EDGE_SMOOTH", 0):      # straight bead line: smooth the ~0.1 mm wiggles of the fitted edge
        from scipy.ndimage import gaussian_filter1d
        step = np.mean(np.linalg.norm(np.diff(op, axis=0), axis=1))
        op = gaussian_filter1d(op, P.EDGE_SMOOTH / step, axis=0, mode="wrap")
    outer = Polygon(op).buffer(0)
    o_pts = spline_points("opening", 6000)
    clip = box(-50, -200, P.FLOOR_S_MAX, 200)
    if getattr(P, "LEDGE_BOTTOM_S_MAX", None):     # bottom rail: the ledge follows the straight edge into the loop
        clip = clip.union(box(-50, -200, P.LEDGE_BOTTOM_S_MAX, P.BOTTOM_FLAT_Y))
    ledge = outer.buffer(-w, join_style="round").intersection(clip)
    a, b = P.POCKET_FIT_S
    yc = o_pts[:, 1].mean()
    lines = []
    for up in (True, False):
        q = o_pts[((o_pts[:, 1] > yc) if up else (o_pts[:, 1] <= yc)) & (o_pts[:, 0] > a) & (o_pts[:, 0] < b)]
        lines.append(np.polyfit(q[:, 0], q[:, 1], 1))
    s0, s1 = -50.0, P.POCKET_S_MAX
    yb0 = yb1 = None
    if getattr(P, "POCKET_TO_LIP", False):      # V9c: END A recess reaches down to the bottom lip (no bottom crease)
        yb0 = yb1 = -200.0
    band = Polygon([(s0, np.polyval(lines[0], s0)), (s1, np.polyval(lines[0], s1)),
                    (s1, yb1 if yb1 is not None else np.polyval(lines[1], s1)),
                    (s0, yb0 if yb0 is not None else np.polyval(lines[1], s0))])
    pocket = band.intersection(outer.buffer(-(w + P.POCKET_RIM), join_style="round"))
    return ledge, pocket
