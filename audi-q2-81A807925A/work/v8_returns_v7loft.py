"""Returns for the V8 Fusion part: V7 loft slabs (valid, fast), front 2.3 mm behind the V7 face (behind the
deepest recess 2.2 mm: no near-coincident front faces), lateral walls 0.05 mm inside the skin walls, spline
outlines (few faces). Exported as separate solids: lip, opening returns."""
import os, time
import cadquery as cq
from reg import Model, ROOT
t0 = time.time()
m = Model("V7"); P, PF, SF = m.P, m.PF, m.SF
P.OUTLINE_POLY_STEP = None; P.NUMPY_OFFSET = True
sw = lambda which, off: PF._spline_wire(which, z=SF.Z_LO, offset=off, nseg=8, npts=80)
ring = lambda wo, wi: cq.Solid.extrudeLinear(cq.Face.makeFromWires(wo, [wi]), cq.Vector(0, 0, SF.Z_HI - SF.Z_LO))
ring_outer = ring(sw("outer", -0.3), sw("outer", -P.T_RETURN))   # 0.3 inside the skin wall (0.05 was too close for Fusion)
ring_open = ring(sw("opening", P.T_WALL_OPEN), sw("opening", 0.05))
F = 2.3   # opening returns: behind the deepest recess (2.2); the outer lip (recess 0 there) starts at 1.0
lip = SF.slab(1.0, P.T_SKIN + P.D_RET_OUTER, n=P.N_LOFT).intersect(ring_outer)
oi = PF.outline_polyline("opening", 1.0)
y_mid = 0.5 * (oi[:, 1].max() + oi[:, 1].min()); s0 = oi[:, 0].min() - 5.0
box = cq.Solid.makeBox(P.WALL_TOP_END_S - s0, 40.0, SF.Z_HI - SF.Z_LO, cq.Vector(s0, y_mid, SF.Z_LO))
prof = SF.slab(F, P.T_SKIN + P.D_RET_OPEN, n=P.N_LOFT).fuse(SF.slab(F, P.T_SKIN + P.D_WALL_OPEN_TOP, n=P.N_LOFT).intersect(box))
ret_open = prof.intersect(ring_open)
for name, s in (("lip", lip), ("ret_open", ret_open)):
    print(name, s.isValid(), len(s.Solids()), round(s.Volume()), len(s.Faces()), round(time.time() - t0), flush=True)
    cq.exporters.export(cq.Workplane().add(s.mirror("YZ", (P.L / 2.0, 0, 0))),
                        os.path.join(ROOT, "cad", "exports", "V8", "fusion_parts", f"{name}_v8.step"))
