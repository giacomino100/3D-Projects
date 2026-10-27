"""Try OCC fillets on the V7 recess step edges (front side): convex r_cx, concave r_cc.
Edges selected by proximity to cad/fusion/V7_step_edges.json (CAD frame, cm -> mm)."""
import json, os, sys, time, numpy as np
import cadquery as cq
from scipy.spatial import cKDTree
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ref = json.load(open(os.path.join(ROOT, "cad", "fusion", "V7_step_edges.json")))
body = cq.importers.importStep(os.path.join(ROOT, "cad", "exports", "V7", "81A807925A_V7_body.step")).val()
print("faces", len(body.Faces()), "edges", len(body.Edges()), flush=True)
pts, lab = [], []
for key, d in ref.items():
    xy = np.array(d["xy"]) * 10
    for kind in ("convex", "concave"):
        z = np.array(d["z_" + kind]) * 10
        pts.append(np.c_[xy, z]); lab += [(key, kind)] * len(xy)
kd = cKDTree(np.vstack(pts))


def select(shape):
    sel = {}
    for e in shape.Edges():
        ps = [e.positionAt(t) for t in (0.25, 0.5, 0.75)]
        d, i = kd.query([[p.x, p.y, p.z] for p in ps])
        if d.max() < 0.45 and len({lab[j] for j in i}) == 1:
            sel.setdefault(lab[i[1]], []).append(e)
    return sel


print({k: len(v) for k, v in select(body).items()}, flush=True)
R = {("ledge", "convex"): 0.3, ("ledge", "concave"): 0.6, ("pocket", "convex"): 0.3, ("pocket", "concave"): 0.8}
out = body
for k in (("ledge", "concave"), ("pocket", "concave"), ("ledge", "convex"), ("pocket", "convex")):
    t = time.time()
    try:
        es = select(out).get(k, [])
        r = out.fillet(R[k], es)
        print(k, "ok" if r.isValid() else "INVALID", len(es), round(time.time() - t, 1), "s", flush=True)
        if r.isValid():
            out = r
    except Exception as ex:
        print(k, "FAILED", type(ex).__name__, ex, flush=True)
out.exportStep(os.path.join(ROOT, "cad", "exports", "V7", "81A807925A_V7_body_fillet_test.step"))
print("done", out.isValid(), out.Volume())
