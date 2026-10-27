import sys, time; sys.path.insert(0, ".")
import parameters_v2; sys.modules["parameters"] = parameters_v2
parameters_v2.R_OUTER_VISIBLE = 0; parameters_v2.R_INNER_VISIBLE = 0
import warnings; warnings.filterwarnings("ignore")
from geometry import surface as SF
t = time.time(); body, rep = SF.build_body_v2(); print("body (no fillet)", round(time.time() - t, 1), "s", rep, flush=True)
fo, fi = SF._classify_front_edges(body); print("front edges outer", len(fo), "opening", len(fi), flush=True)
for name, edges, r in (("inner", fi, 0.8), ("outer", fo, 1.2)):
    t = time.time()
    try:
        b2 = body.fillet(r, edges); print(name, "fillet ok", round(time.time() - t, 1), "s valid", b2.isValid(), flush=True)
    except Exception as ex:
        print(name, "fillet failed", type(ex).__name__, round(time.time() - t, 1), flush=True)
