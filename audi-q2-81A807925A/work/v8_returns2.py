"""V8 returns built on the V8 face itself (Z-prism of the smooth face): fronts 1.0 / 1.2 mm behind the visible face
(always inside the 2.5 mm skin, whatever the recess depth), lateral walls 0.3 mm inside the skin walls (no
near-coincident faces for the Fusion union). Outer lip + opening returns (+ deep wall along the top edge)."""
import os, time
import cadquery as cq
from reg import Model, ROOT
t0 = time.time()
version = os.environ.get("Q2_VERSION", "V8").upper()
m = Model(version); P, PF, SF = m.P, m.PF, m.SF
SF._face_surface(); print("face", round(time.time() - t0), flush=True)
P.OUTLINE_POLY_STEP = None; P.NUMPY_OFFSET = True
wanted = {x.strip() for x in os.environ.get("Q2_RETURN_PARTS", "lip,ret_open").split(",") if x.strip()}
sw = lambda which, off: PF._spline_wire(which, z=SF.Z_LO, offset=off, nseg=8, npts=80)
ring = lambda wo, wi: cq.Solid.extrudeLinear(cq.Face.makeFromWires(wo, [wi]), cq.Vector(0, 0, SF.Z_HI - SF.Z_LO))
parts = []
if "lip" in wanted:
    ring_outer = ring(sw("outer", -0.3), sw("outer", -P.T_RETURN))
    lip = SF.slab(1.0, P.T_SKIN + P.D_RET_OUTER).intersect(ring_outer)
    parts.append(("lip", lip))
oi = PF.outline_polyline("opening", 1.0)
y_mid = 0.5 * (oi[:, 1].max() + oi[:, 1].min())
# V12: the deep upper return is the continuous inward tongue identified by the
# user in the front overlay. Earlier versions started it 18 mm after the D-end,
# incorrectly treating the first portion as a loose tab. The versioned offset
# preserves older builds while allowing the tongue to reach the rounded D-end.
s0 = oi[:, 0].min() + getattr(P, "WALL_TOP_START_OFFSET", 18.0)
if "ret_open" in wanted:
    ring_open = ring(sw("opening", P.T_WALL_OPEN), sw("opening", 0.3))
    box = cq.Solid.makeBox(P.WALL_TOP_END_S - s0, 40.0, SF.Z_HI - SF.Z_LO, cq.Vector(s0, y_mid, SF.Z_LO))
    ret_open = SF.slab(1.2, P.T_SKIN + P.D_RET_OPEN).fuse(SF.slab(1.2, P.T_SKIN + P.D_WALL_OPEN_TOP).intersect(box)).intersect(ring_open)
    parts.append(("ret_open", ret_open))
out_dir = os.path.join(ROOT, "cad", "exports", version, "fusion_parts")
os.makedirs(out_dir, exist_ok=True)
for name, s in parts:
    print(name, s.isValid(), len(s.Solids()), round(s.Volume()), len(s.Faces()), round(time.time() - t0), flush=True)
    cq.exporters.export(cq.Workplane().add(s.mirror("YZ", (P.L / 2.0, 0, 0))),
                        os.path.join(out_dir, f"{name}_{version.lower()}.step"))
