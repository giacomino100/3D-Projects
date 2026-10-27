"""Printable fit coupons: one per clip family x clearance variant.

Each coupon = (a) local trim patch (flat shell + rear return) carrying the clip,
             (b) nominal receiver surrogate of 81A807681A (ASA) with clearance c.
Receivers are NOT OEM geometry: they reproduce the *relationship* (barb into
window, tab through slot) seen in the 681A photos, with a parametric gap.
Coupon local frame: X along edge, Y = tab extension (rearward), Z = plate normal.
"""
import cadquery as cq

import parameters as P
from geometry import clips as CL

PATCH_W = 40.0     # ASSUMED_PARAMETRIC patch length along edge
PATCH_H = 22.0     # ASSUMED_PARAMETRIC patch height (visible face)


def trim_patch(c: P.Clip):
    """Flat trim patch: visible shell lying in XZ (face toward -Y), return wall
    at the clip edge rising to the clip root at Y=0."""
    depth = P.D_RET_TOP if c.edge == "top" else P.D_RET_OUTER
    shell = (cq.Workplane("XY")
             .box(PATCH_W, P.T_SHELL, PATCH_H, centered=(True, False, False))
             .translate((0, -depth - P.T_SHELL, -P.T_WALL)))
    wall = (cq.Workplane("XY")
            .box(PATCH_W, depth + CL.EMBED, P.T_WALL, centered=(True, False, False))
            .translate((0, -depth, -P.T_WALL / 2.0 - P.T_WALL / 2.0)))
    tab = cq.Workplane("XY").add(CL.clip_solid(c, flat=True)).translate((0, -CL.EMBED, -P.T_WALL / 2.0 + c.base_thickness / 2.0 - c.base_thickness / 2.0))
    return shell.union(wall).union(tab)


def receiver(c: P.Clip, clr: float):
    """Nominal receiver surrogate, positioned in the assembled state."""
    th = c.base_thickness
    zt = -P.T_WALL / 2.0          # tab mid-plane in the coupon frame (see trim_patch)
    if c.family in ("EYELET", "TONGUE"):
        wx, wl = c.window
        wc = CL.EMBED + c.flex_length - wl / 2.0 - 2.0 - CL.EMBED
        # base block under the tab + barb that enters the window
        base_t = 3.0
        base = (cq.Workplane("XY").box(c.base_width + 10, c.flex_length + 6, base_t, centered=(True, False, False))
                .translate((0, 1.0, -th / 2.0 - clr - base_t)))
        barb = (cq.Workplane("XY").box(wx - 2 * clr, wl - 2 * clr, th + clr, centered=(True, True, False))
                .translate((0, wc, -th / 2.0 - clr)))
        # ramp on the insertion side (toward the root) as a chamfer of the barb
        barb = barb.faces(">Z").edges("<Y").chamfer(min(th * 0.8, (wl - 2 * clr) * 0.6))
        return base.union(barb).translate((0, 0, zt))
    # HOOK_TAB: plate with a slot the tab passes through; barb catches the far face
    plate_t = 2.5
    slot_y = c.flex_length - c.hook_length - plate_t - clr
    plate = (cq.Workplane("XZ").rect(c.base_width + 16, 16).extrude(-plate_t)
             .translate((0, slot_y, 0)))
    slot = (cq.Workplane("XZ").rect(c.base_width + 2 * clr, th + 2 * clr).extrude(-plate_t)
            .translate((0, slot_y, 0)))
    return plate.cut(slot).translate((0, 0, zt))


def families():
    seen = {}
    for c in P.CLIPS:
        seen.setdefault(c.family, c)
    return seen


def build_coupons():
    out = {}
    for fam, c in families().items():
        trim = trim_patch(c)
        for clr in P.COUPON_CLEARANCES:
            out[(fam, clr)] = (trim, receiver(c, clr))
    return out
