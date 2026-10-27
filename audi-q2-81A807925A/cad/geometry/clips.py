"""Independent attachment features CLIP_C01..Cn.

Each clip is built in a local frame and placed on the rear edge of the trim:
  t : edge tangent (along the trim, follows Z wrap)
  d : extension direction of the tab = rearward (+Z, normal to the local face
      in XZ) tilted by `angle_deg` toward the outward edge normal
  p : plate normal = t x d
Families
  EYELET   : flat tab with a rectangular window, snaps over a barb on 681A
  HOOK_TAB : flat cantilever with an outward barb at the tip
  TONGUE   : flat tongue with small window on the outer slanted end
Dimensions are ASSUMED_PARAMETRIC (see docs/clip_map.md); positions are
PHOTO_DERIVED.
"""
import math
import numpy as np
import cadquery as cq

import parameters as P
from geometry import planform as PF
from geometry import surface as SF

EMBED = 0.8   # mm of root embedded into the return wall for a clean union


def _n(v):
    v = np.asarray(v, float)
    return v / np.linalg.norm(v)


def clip_frame(c: P.Clip):
    """Return (origin, t, d, p, outward) in world coordinates for clip c."""
    if c.edge == "top":
        y = -P.T_WALL / 2.0
        x = c.x
        depth = P.D_RET_TOP
        outward = np.array([0.0, 1.0, 0.0])
        s = float(SF.dzdx(x, y))
        t = _n([1.0, 0.0, s])
    elif c.edge == "bottom":
        y = -P.H + P.T_WALL / 2.0
        x = c.x
        depth = P.D_RET_OUTER
        outward = np.array([0.0, -1.0, 0.0])
        s = float(SF.dzdx(x, y))
        t = _n([1.0, 0.0, s])
    elif c.edge == "outer_end":
        y = c.y if c.y is not None else -P.H / 2
        x = PF.outer_x_at(y) - P.T_WALL / 2.0
        depth = P.D_RET_OUTER
        # outward normal of the slanted end, in XY
        e = _n([P.OUTER_RUN, P.H])           # edge direction (bottom-left -> top-right)
        outward = np.array([e[1], -e[0], 0.0])  # rotate -90 deg -> points to +X side
        if outward[0] < 0:
            outward = -outward
        s = float(SF.dzdx(x, y))
        t = _n(np.cross([0, 0, 1.0], outward) if True else e)  # along the slanted edge
        t = _n([t[0], t[1], s * t[0]])
        outward = _n([outward[0], outward[1], s * outward[0]])
    else:
        raise ValueError(c.edge)

    z = float(SF.zf(x, y)) + P.T_SHELL + depth - EMBED
    origin = np.array([x, y, z])
    rear = _n(np.cross(t, np.cross([0, 0, 1.0], t))) if abs(t[2]) > 1e-9 else np.array([0, 0, 1.0])
    # rear: component of +Z orthogonal to t
    rear = _n(np.array([0, 0, 1.0]) - np.dot([0, 0, 1.0], t) * t)
    a = math.radians(c.angle_deg)
    d = _n(math.cos(a) * rear + math.sin(a) * outward)
    p = _n(np.cross(t, d))
    return origin, t, d, p, outward


def _plane(origin, t, p):
    return cq.Plane(origin=tuple(origin), xDir=tuple(t), normal=tuple(p))


def clip_solid(c: P.Clip, flat=False):
    """Build the clip solid. If flat=True, build in a canonical local frame
    (origin 0, t=+X, d=+Y, p=+Z) for coupons."""
    if flat:
        origin, t, d, p = np.zeros(3), np.array([1.0, 0, 0]), np.array([0, 1.0, 0]), np.array([0, 0, 1.0])
        outward_sign = -1.0
    else:
        origin, t, d, p, outward = clip_frame(c)
        outward_sign = 1.0 if np.dot(outward, p) > 0 else -1.0

    wp = cq.Workplane(_plane(origin, t, p))
    L_tab = c.flex_length + EMBED
    th = c.base_thickness
    body = wp.center(0, L_tab / 2.0).rect(c.base_width, L_tab).extrude(th / 2.0, both=True)

    if c.window[0] > 0:
        wx, wl = c.window
        wc = EMBED + c.flex_length - wl / 2.0 - 2.0     # window near the free end, 2 mm bridge
        win = cq.Workplane(_plane(origin, t, p)).center(0, wc).rect(wx, wl).extrude(th, both=True)
        body = body.cut(win)

    if c.family == "HOOK_TAB" and c.hook_height > 0:
        # outward barb at the tip: box on the outward face of the plate
        zc = outward_sign * (th / 2.0 + c.hook_height / 2.0)
        barb = (cq.Workplane(_plane(origin, t, p))
                .center(0, L_tab - c.hook_length / 2.0)
                .rect(c.base_width, c.hook_length)
                .extrude(c.hook_height / 2.0, both=True)
                .translate(tuple(np.asarray(p) * zc)))
        body = body.union(barb)

    if c.root_fillet > 0 and not flat:
        pass  # root fillet kept as parameter; applied in V2 (OCC fillets on lofted walls are fragile)
    return body.val()


def all_clips():
    return {c.cid: clip_solid(c) for c in P.CLIPS}


def clip_table():
    rows = []
    for c in P.CLIPS:
        o, t, d, p, outward = clip_frame(c)
        rows.append(dict(cid=c.cid, family=c.family, edge=c.edge, s=round(float(o[0]), 1),
                         x_cad=round(P.L - float(o[0]), 1),
                         y=round(float(o[1]), 1), z=round(float(o[2]), 1),
                         insertion=[0, 0, 1], tab_dir=np.round(d, 3).tolist(),
                         base_width=c.base_width, base_thickness=c.base_thickness,
                         flex_length=c.flex_length, hook_length=c.hook_length,
                         hook_height=c.hook_height, angle_deg=c.angle_deg,
                         root_fillet=c.root_fillet, clearance=c.clearance,
                         window=list(c.window), confidence=c.confidence, note=c.note))
    return rows
