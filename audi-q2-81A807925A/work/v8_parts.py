"""V8 parts for the Fusion assembly of the smooth-recess skin (CadQuery booleans with the smooth face hang):
 face_v8.step   smooth visible face (sewn B-spline shell, depth field of parameters_v8)
 ring_v8.step   outer contour minus opening, prism through the full depth (trims the thickened face)
 returns_v7.step  outer lip + opening returns of V7 (unchanged)
All in the right-handed CAD frame (X = L - s), mm."""
import os, time
import cadquery as cq
from reg import Model, ROOT
OUT = os.path.join(ROOT, "cad", "exports", "V8", "fusion_parts"); os.makedirs(OUT, exist_ok=True)
CACHE = r"C:/Users/giaco/AppData/Local/Temp/claude/C--Users-giaco-Desktop-Karaoke-Studio-sorgente/4fb7b161-3232-4c71-abfb-284edf8751ad/scratchpad/v8_face.brep"
t0 = time.time()
m = Model("V7"); P, PF, SF = m.P, m.PF, m.SF
mir = lambda s: s.mirror("YZ", (P.L / 2.0, 0, 0))
face = cq.Shape.importBrep(CACHE)
cq.exporters.export(cq.Workplane().add(mir(face)), os.path.join(OUT, "face_v8.step"))
ring = SF._ring_prism(PF.outer_wire(), PF.opening_wire())
cq.exporters.export(cq.Workplane().add(mir(ring)), os.path.join(OUT, "ring_v8.step"))
print("face, ring", round(time.time() - t0), flush=True)
# returns, as in surface._build_body_v2_once (V7 parameters, loft slabs)
ring_outer = SF._ring_prism(PF.outer_wire(), PF.outer_wire(offset=-P.T_RETURN))
lip = SF.slab(P.T_SKIN - 0.2, P.T_SKIN + P.D_RET_OUTER, n=P.N_LOFT).intersect(ring_outer)
ring_open = SF._ring_prism(PF.opening_wire(offset=+P.T_WALL_OPEN), PF.opening_wire())
oi = PF.outline_polyline("opening", 1.0)
y_mid = 0.5 * (oi[:, 1].max() + oi[:, 1].min()); s0 = oi[:, 0].min() - 5.0
box = cq.Solid.makeBox(P.WALL_TOP_END_S - s0, 40.0, SF.Z_HI - SF.Z_LO, cq.Vector(s0, y_mid, SF.Z_LO))
prof = SF.slab(P.T_SKIN - 0.2, P.T_SKIN + P.D_RET_OPEN, n=P.N_LOFT).fuse(
    SF.slab(P.T_SKIN - 0.2, P.T_SKIN + P.D_WALL_OPEN_TOP, n=P.N_LOFT).intersect(box))
ret_open = prof.intersect(ring_open)
ret = lip.fuse(ret_open).clean()
print("returns valid", ret.isValid(), round(ret.Volume()), round(time.time() - t0), flush=True)
cq.exporters.export(cq.Workplane().add(mir(ret)), os.path.join(OUT, "returns_v7.step"))
