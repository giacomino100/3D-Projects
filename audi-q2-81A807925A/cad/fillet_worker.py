"""Child process: fillet selected front edges of a BREP body (V2). Usage:
   python fillet_worker.py in.brep out.brep R_OUTER R_INNER
Edges are re-classified here (same rule as surface._classify_front_edges)."""
import sys
HERE = __import__("os").path.dirname(__import__("os").path.abspath(__file__))
sys.path.insert(0, HERE)
import parameters_v2; sys.modules["parameters"] = parameters_v2
import cadquery as cq
from geometry import surface as SF
src, dst, ro, ri = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4])
body = cq.Shape.importBrep(src)
for r, which in ((ri, 1), (ro, 0)):
    if r > 0:
        edges = SF._classify_front_edges(body)[which]
        body = body.fillet(r, edges)
        print(("outer", "inner")[which], "ok", len(edges), flush=True)
body.exportBrep(dst)
print("valid", body.isValid(), flush=True)
