"""V2 attachment features - each clip has its own definition and local frame.

Evidence (exact 81A807925A photos, see docs/V2_clip_map.md):
  * all 6 rail tabs are flat TRAPEZOIDAL EYELETS with a slanted, rounded window
    (fre_3, fre_4, fre_5, mp_3, pru_4, pru_5) - NOT barbed hook tabs as in V1;
  * bottom-edge eyelets (C05-C07) are larger than top-edge ones (C01-C03) (pru_4);
  * C04 is a tongue with window lying roughly PARALLEL to the face, pointing
    inward from the outer end, behind the opening (pru_1, fre_3, pru_4).
Local frame per clip (authoring frame s, y, z):
  t : along the edge (in the local face), d : extension direction, p = t x d.
Every eyelet stands on a local root pad (reinforcement) merged into the return.
"""
import math
import numpy as np
import cadquery as cq

import parameters as P
from geometry import surface as SF
from geometry import planform as PF

EMBED = 0.8


def _n(v):
    v = np.asarray(v, float)
    return v / np.linalg.norm(v)


def edge_point(edge, s=None, y=None):
    """Point + in-plane outward normal on the outer outline.
    edge: 'top' | 'bottom' -> by s ; 'outer_end' -> by y (largest s)."""
    pts = PF.outline_polyline("outer", 0.5)
    yc = pts[:, 1].mean()
    if edge in ("top", "bottom"):
        cand = pts[(pts[:, 1] > yc) if edge == "top" else (pts[:, 1] < yc)]
        i = np.argmin(np.abs(cand[:, 0] - s))
    else:
        cand = pts[pts[:, 0] > pts[:, 0].max() - 80]
        i = np.argmin(np.abs(cand[:, 1] - y) - 1e-3 * cand[:, 0])
    p = cand[i]
    j = int(np.argmin(np.linalg.norm(pts - p, axis=1)))
    tng = pts[(j + 1) % len(pts)] - pts[j - 1]
    nrm = _n([tng[1], -tng[0]])
    # make the normal point away from the outline centroid (outward)
    if np.dot(nrm, p - pts.mean(axis=0)) < 0:
        nrm = -nrm
    return p, nrm


def frame(c):
    p2, n2 = edge_point(c["edge"], s=c.get("s"), y=c.get("y"))
    inset = P.T_RETURN / 2.0
    s, y = p2 - n2 * inset
    zface = float(SF.zf(s, y))
    dzds = float(SF.dzdx(s, y))
    t = _n([-n2[1], n2[0], 0.0])                     # along edge
    t = _n([t[0], t[1], dzds * t[0]])
    outward = _n([n2[0], n2[1], dzds * n2[0]])
    rear = np.array([0, 0, 1.0]); rear = _n(rear - np.dot(rear, t) * t)
    if c["kind"] == "TONGUE_INPLANE":
        d = _n([-1.0, 0.0, -dzds])                   # inward along the face
        if c["edge"] == "top":                       # V3: tongue runs along the top edge, inset from it
            s_, y_ = s, y - c.get("inset", 4.0)
            s, y = s_, y_
            zface = float(SF.zf(s, y)); dzds = float(SF.dzdx(s, y)); d = _n([-1.0, 0.0, -dzds])
            t = _n([0.0, 1.0, 0.0])
        z = zface + P.T_SKIN + c["z_offset"]
    else:
        a = math.radians(c["tilt_deg"])
        d = _n(math.cos(a) * rear + math.sin(a) * outward)
        z = zface + P.T_SKIN + P.D_RET_OUTER - EMBED
    pnorm = _n(np.cross(t, d))
    return np.array([s, y, z]), t, d, pnorm, outward


def _plane(o, t, p):
    return cq.Plane(origin=tuple(map(float, o)), xDir=tuple(map(float, t)), normal=tuple(map(float, p)))


def clip_solid(c, flat=False):
    """Trapezoidal plate (base -> tip) with slanted rounded window + root pad."""
    if flat:
        o, t, d, p = np.zeros(3), np.array([1.0, 0, 0]), np.array([0, 1.0, 0]), np.array([0, 0, 1.0])
    else:
        o, t, d, p, _ = frame(c)
    wp = cq.Workplane(_plane(o, t, p))
    b, tp, h, th = c["base"], c["top"], c["height"] + EMBED, c["t_arm"]
    if c.get("shape") == "ramp":
        # asymmetric: steep side toward the OUTER end (+s), ramp toward the inner tip (-s)
        sgn = 1.0 if flat else (1.0 if t[0] > 0 else -1.0)     # +x_local == +s ?
        steep = c.get("steep_inset", 2.0)
        pts = [(-b / 2, 0), (b / 2, 0), (b / 2 - steep, h), (b / 2 - steep - tp, h)]
        pts = [(sgn * x, y) for x, y in pts]
        plate = wp.polyline(pts).close().extrude(th / 2, both=True)
    else:
        plate = wp.polyline([(-b / 2, 0), (b / 2, 0), (tp / 2, h), (-tp / 2, h)]).close().extrude(th / 2, both=True)
    par = cq.selectors.ParallelDirSelector(cq.Vector(*map(float, p)))
    plate = plate.edges(par).fillet(min(1.5, tp / 6))
    ww, wh, wtip, slant = c["win_w"], c["win_h"], c["win_from_tip"], c["win_slant"]
    yc = h - wtip - wh / 2
    win = (cq.Workplane(_plane(o, t, p)).center(c.get("win_dx", 0.0), yc)
           .polyline([(-ww / 2, -wh / 2), (ww / 2 - slant, -wh / 2), (ww / 2, wh / 2), (-ww / 2 + slant, wh / 2)])
           .close().extrude(th, both=True))
    try:
        win = win.edges(par).fillet(min(1.0, wh / 3))
    except Exception:
        pass
    plate = plate.cut(win)
    if c["kind"] != "TONGUE_INPLANE" and not flat:
        # root pad: local reinforcement merged into the return wall (molded root)
        pad = (cq.Workplane(_plane(o, t, p)).center(0, -P.D_RET_OUTER / 2 + EMBED)
               .rect(b + 2 * c["pad_extra"], P.D_RET_OUTER).extrude(P.T_CLIP_ROOT / 2, both=True))
        plate = plate.union(pad)
    return plate.val()


def all_clips():
    return {c["cid"]: clip_solid(c) for c in P.CLIPS_V2}


def clip_table():
    rows = []
    for c in P.CLIPS_V2:
        o, t, d, p, _ = frame(c)
        rows.append(dict(cid=c["cid"], kind=c["kind"], edge=c["edge"], s=round(float(o[0]), 1),
                         x_cad=round(P.L - float(o[0]), 1), y=round(float(o[1]), 1), z=round(float(o[2]), 1),
                         t=np.round([-t[0], t[1], t[2]], 3).tolist(), d=np.round([-d[0], d[1], d[2]], 3).tolist(),
                         p=np.round([-p[0], p[1], p[2]], 3).tolist(),
                         **{k: c[k] for k in ("base", "top", "height", "t_arm", "win_w", "win_h", "tilt_deg",
                                              "confidence", "evidence")}))
    return rows
