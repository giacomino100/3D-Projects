"""V8 returns (outer lip + opening returns + top deep wall) on the smooth V8 face, for the Fusion assembly.
Front of the returns 1.0 mm behind the face (well inside the 2.5 mm skin: no near-coincident faces) and lateral
walls 0.05 mm inside the skin walls (spline outlines, few faces)."""
import os, time
import cadquery as cq
from reg import Model, ROOT
t0 = time.time()
m = Model("V8"); P, PF, SF = m.P, m.PF, m.SF
SF._FACE = cq.Shape.importBrep(r"C:/Users/giaco/AppData/Local/Temp/claude/C--Users-giaco-Desktop-Karaoke-Studio-sorgente/4fb7b161-3232-4c71-abfb-284edf8751ad/scratchpad/v8_face.brep")
P.OUTLINE_POLY_STEP = None; P.NUMPY_OFFSET = True
sw = lambda which, off: PF._spline_wire(which, z=SF.Z_LO, offset=off, nseg=8, npts=80)
def ring(wo, wi):
    return cq.Solid.extrudeLinear(cq.Face.makeFromWires(wo, [wi]), cq.Vector(0, 0, SF.Z_HI - SF.Z_LO))
ring_outer = ring(sw("outer", -0.05), sw("outer", -P.T_RETURN))
ring_open = ring(sw("opening", P.T_WALL_OPEN), sw("opening", 0.05))
print("rings", ring_outer.isValid(), ring_open.isValid(), round(time.time() - t0), flush=True)
lip = SF.slab(1.0, P.T_SKIN + P.D_RET_OUTER).intersect(ring_outer)
print("lip", lip.isValid(), round(lip.Volume()), round(time.time() - t0), flush=True)
oi = PF.outline_polyline("opening", 1.0)
y_mid = 0.5 * (oi[:, 1].max() + oi[:, 1].min()); s0 = oi[:, 0].min() - 5.0
box = cq.Solid.makeBox(P.WALL_TOP_END_S - s0, 40.0, SF.Z_HI - SF.Z_LO, cq.Vector(s0, y_mid, SF.Z_LO))
shallow = SF.slab(1.0, P.T_SKIN + P.D_RET_OPEN).intersect(ring_open)
deep = SF.slab(1.0, P.T_SKIN + P.D_WALL_OPEN_TOP).intersect(ring_open).intersect(box)
ret = lip.fuse(shallow).fuse(deep).clean()
print("returns", ret.isValid(), len(ret.Solids()), round(ret.Volume()), len(ret.Faces()), round(time.time() - t0), flush=True)
out = os.path.join(ROOT, "cad", "exports", "V8", "fusion_parts", "returns_v8.step")
cq.exporters.export(cq.Workplane().add(ret.mirror("YZ", (P.L / 2.0, 0, 0))), out); print(out)
