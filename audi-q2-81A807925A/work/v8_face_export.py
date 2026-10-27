"""Smooth V8 face (single B-spline face) -> STEP in the CAD frame, for the Fusion build. Prints a check of the
fitted surface against zf and of the depth-field smoothness along the END A bottom flank."""
import os, time, numpy as np, cadquery as cq
from reg import Model, ROOT
t0 = time.time()
version = os.environ.get("Q2_VERSION", "V8").upper()
m = Model(version); SF, P = m.SF, m.P
sh = SF._face_surface(); print("face", sh.ShapeType(), len(sh.Faces()), round(time.time() - t0), flush=True)
from OCP.BRepExtrema import BRepExtrema_DistShapeShape
err = []
for s, y in [(60, -25), (60, -45), (140, -30), (250, -5), (250, -45), (385, -9), (20, -20), (100, -13.5), (115, -45.5)]:
    v = cq.Vertex.makeVertex(s, y, float(SF.zf(s, y))); d = BRepExtrema_DistShapeShape(v.wrapped, sh.wrapped); d.Perform(); err.append(d.Value())
print("max dev vs zf mm", round(max(err), 4))
ss = np.arange(90, 140, 0.1); g = np.gradient(SF.zf(ss, np.full_like(ss, -45.5)), ss)
print("END A bottom flank dz/ds: max jump between samples", round(float(np.abs(np.diff(g)).max()), 4))
out_dir = os.path.join(ROOT, "cad", "exports", version, "fusion_parts")
os.makedirs(out_dir, exist_ok=True)
out = os.path.join(out_dir, f"face_{version.lower()}.step")
cq.exporters.export(cq.Workplane().add(sh.mirror("YZ", (P.L / 2.0, 0, 0))), out); print(out, round(time.time() - t0))
