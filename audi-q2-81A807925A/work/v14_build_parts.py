"""Costruisce i solidi V14 dalla stessa superficie, senza booleane monolitiche."""

import os
import time

import cadquery as cq

from reg import Model, ROOT


t0 = time.time()
version = os.environ.get("Q2_VERSION", "V14").upper()
m = Model(version)
P, PF, SF = m.P, m.PF, m.SF
face = SF._face_surface()
print("face", round(time.time() - t0), flush=True)

P.OUTLINE_POLY_STEP = None
P.NUMPY_OFFSET = True
sw = lambda which, off: PF._spline_wire(which, z=SF.Z_LO, offset=off, nseg=8, npts=80)


def ring(outer, inner):
    return cq.Solid.extrudeLinear(
        cq.Face.makeFromWires(outer, [inner]),
        cq.Vector(0, 0, SF.Z_HI - SF.Z_LO),
    )


def checked(name, shape):
    shape = shape.clean()
    if shape.isNull() or not shape.isValid() or len(shape.Solids()) != 1:
        raise RuntimeError(
            f"{name} non valido: null={shape.isNull()} valid={shape.isValid()} solids={len(shape.Solids())}"
        )
    print(name, round(shape.Volume()), len(shape.Faces()), flush=True)
    return shape


skin_ring = ring(sw("outer", 0.0), sw("opening", 0.0))
skin = checked(
    "skin",
    cq.Solid.extrudeLinear(face, cq.Vector(0, 0, P.T_SKIN)).intersect(skin_ring),
)

outer_ring = ring(sw("outer", -0.3), sw("outer", -P.T_RETURN))
lip = checked("lip", SF.slab(1.0, P.T_SKIN + P.D_RET_OUTER).intersect(outer_ring))

opening_ring = ring(sw("opening", P.T_WALL_OPEN), sw("opening", 0.3))
ret_open = checked(
    "ret_open",
    SF.slab(1.2, P.T_SKIN + P.D_RET_OPEN).intersect(opening_ring),
)

oi = PF.outline_polyline("opening", 1.0)
y_mid = 0.5 * (oi[:, 1].max() + oi[:, 1].min())
s_tip = float(oi[:, 0].min())
s0 = s_tip + P.WALL_TOP_START_OFFSET
z0 = P.T_SKIN + P.D_RET_OPEN - 0.3
z1 = P.T_SKIN + P.D_WALL_OPEN_TOP

top_box = cq.Solid.makeBox(
    P.WALL_TOP_END_S - s0,
    40.0,
    SF.Z_HI - SF.Z_LO,
    cq.Vector(s0, y_mid, SF.Z_LO),
)
top_tongue = checked(
    "tongue_ext",
    SF.slab(z0, z1).intersect(opening_ring.intersect(top_box)),
)

bottom_box = cq.Solid.makeBox(
    P.WALL_BOTTOM_END_S - s0,
    40.0 + P.WALL_BOTTOM_MID_OVERLAP,
    SF.Z_HI - SF.Z_LO,
    cq.Vector(s0, y_mid - 40.0, SF.Z_LO),
)
bottom_tongue = checked(
    "bottom_tongue",
    SF.slab(z0, P.T_SKIN + P.D_WALL_OPEN_BOTTOM).intersect(opening_ring.intersect(bottom_box)),
)

out_dir = os.path.join(ROOT, "cad", "exports", version, "fusion_parts")
os.makedirs(out_dir, exist_ok=True)
parts = {
    f"face_{version.lower()}.step": face,
    f"skin_{version.lower()}_occ.step": skin,
    f"lip_{version.lower()}.step": lip,
    f"ret_open_{version.lower()}.step": ret_open,
    f"tongue_ext_{version.lower()}.step": top_tongue,
    f"bottom_tongue_{version.lower()}.step": bottom_tongue,
}
for filename, shape in parts.items():
    target = os.path.join(out_dir, filename)
    cq.exporters.export(
        cq.Workplane().add(shape.mirror("YZ", (P.L / 2.0, 0, 0))),
        target,
    )
    print("saved", filename, flush=True)

print("elapsed", round(time.time() - t0), flush=True)
