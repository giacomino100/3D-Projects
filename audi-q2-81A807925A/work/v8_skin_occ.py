"""V8 skin in OCC: single smooth B-spline face, prism along Z by T_SKIN (constant thickness in Z, as every
earlier version; a normal offset cannot exist where the sweep radius < 2.5 mm), trimmed by the spline ring."""
import os, time, cadquery as cq
from reg import Model, ROOT
t0 = time.time()
version = os.environ.get("Q2_VERSION", "V8").upper()
m = Model(version); P, PF, SF = m.P, m.PF, m.SF
face = SF._face_surface(); print("face", round(time.time() - t0), flush=True)
slab = cq.Solid.extrudeLinear(face, cq.Vector(0, 0, P.T_SKIN)); print("slab", slab.isValid(), round(slab.Volume()), flush=True)
P.OUTLINE_POLY_STEP = None
wo = PF._spline_wire("outer", z=SF.Z_LO, nseg=8, npts=60); wi = PF._spline_wire("opening", z=SF.Z_LO, nseg=8, npts=80)
ring = cq.Solid.extrudeLinear(cq.Face.makeFromWires(wo, [wi]), cq.Vector(0, 0, SF.Z_HI - SF.Z_LO))
A = cq.Face.makeFromWires(wo, [wi]).Area()
skin = slab.intersect(ring)
print("skin", skin.isValid(), len(skin.Solids()), round(skin.Volume()), "expected", round(A * P.T_SKIN), round(time.time() - t0), flush=True)
out_dir = os.path.join(ROOT, "cad", "exports", version, "fusion_parts")
os.makedirs(out_dir, exist_ok=True)
cq.exporters.export(cq.Workplane().add(skin.mirror("YZ", (P.L / 2.0, 0, 0))),
                    os.path.join(out_dir, f"skin_{version.lower()}_occ.step"))
