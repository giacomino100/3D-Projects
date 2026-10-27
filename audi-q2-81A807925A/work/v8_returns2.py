"""V8 returns built on the V8 face itself (Z-prism of the smooth face): fronts 1.0 / 1.2 mm behind the visible face
(always inside the 2.5 mm skin, whatever the recess depth), lateral walls 0.3 mm inside the skin walls (no
near-coincident faces for the Fusion union). Outer lip + opening returns (+ deep wall along the top edge)."""
import os, time
import cadquery as cq
from reg import Model, ROOT
t0 = time.time()
m = Model("V8"); P, PF, SF = m.P, m.PF, m.SF
SF._face_surface(); print("face", round(time.time() - t0), flush=True)
P.OUTLINE_POLY_STEP = None; P.NUMPY_OFFSET = True
sw = lambda which, off: PF._spline_wire(which, z=SF.Z_LO, offset=off, nseg=8, npts=80)
ring = lambda wo, wi: cq.Solid.extrudeLinear(cq.Face.makeFromWires(wo, [wi]), cq.Vector(0, 0, SF.Z_HI - SF.Z_LO))
ring_outer = ring(sw("outer", -0.3), sw("outer", -P.T_RETURN))
ring_open = ring(sw("opening", P.T_WALL_OPEN), sw("opening", 0.3))
lip = SF.slab(1.0, P.T_SKIN + P.D_RET_OUTER).intersect(ring_outer)
oi = PF.outline_polyline("opening", 1.0)
y_mid = 0.5 * (oi[:, 1].max() + oi[:, 1].min()); s0 = oi[:, 0].min() + 18.0   # V9: deep top wall starts after the D-end (no loose tab)
box = cq.Solid.makeBox(P.WALL_TOP_END_S - s0, 40.0, SF.Z_HI - SF.Z_LO, cq.Vector(s0, y_mid, SF.Z_LO))
ret_open = SF.slab(1.2, P.T_SKIN + P.D_RET_OPEN).fuse(SF.slab(1.2, P.T_SKIN + P.D_WALL_OPEN_TOP).intersect(box)).intersect(ring_open)
for name, s in (("lip", lip), ("ret_open", ret_open)):
    print(name, s.isValid(), len(s.Solids()), round(s.Volume()), len(s.Faces()), round(time.time() - t0), flush=True)
    cq.exporters.export(cq.Workplane().add(s.mirror("YZ", (P.L / 2.0, 0, 0))),
                        os.path.join(ROOT, "cad", "exports", "V8", "fusion_parts", f"{name}_v8.step"))
