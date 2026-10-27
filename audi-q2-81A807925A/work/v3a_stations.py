"""V3-A final: opening corrected by the manual station readings on 925_alB_1.
Upper (installed top) and lower (installed bottom) opening edges are displaced in y by
the measured deviation dy(s) (PCHIP between stations; steps kept by close station
pairs). Only near-horizontal stations are used (s <= 410 mm). Outer outline: unchanged
(validated at 13 stations within +-0.4 mm)."""
import json, os, re, numpy as np
from scipy.interpolate import PchipInterpolator, splprep, splev
from reg import Model

R = json.load(open(os.path.join("reg_out", "stations_alB1.json")))
m = Model("V3")
op = m.P.OPENING_CPS
op = np.array(op, float)
def prof(edge):
    pts = sorted({(r["s"], r["dy"]) for r in R if r["edge"] == edge and r["s"] <= 410})
    s = np.array([p[0] for p in pts]); d = np.array([p[1] for p in pts])
    return PchipInterpolator(s, d, extrapolate=False), s.min(), s.max()
up, us0, us1 = prof("img_bot_opening")      # image bottom = installed TOP edge of the opening
lo, ls0, ls1 = prof("img_top_opening")      # image top    = installed BOTTOM edge of the opening
# dense opening polyline from the current spline
c = np.vstack([op, op[:1]]); tck, _ = splprep([c[:, 0], c[:, 1]], s=0, per=True, k=3)
x, y = splev(np.linspace(0, 1, 1200, endpoint=False), tck); P = np.c_[x, y]
ymid = 0.5 * (P[:, 1].max() + P[:, 1].min()); smin = P[:, 0].min()
new = P.copy()
for k, (s, yy) in enumerate(P):
    f, a, b = (up, us0, us1) if yy > ymid else (lo, ls0, ls1)
    d = float(f(np.clip(s, a, b)))
    w = np.clip((s - smin) / 12.0, 0, 1)          # blend to 0 on the inner end (P03 was fitted there)
    if s > 410:
        w *= np.clip((440 - s) / 30.0, 0, 1)      # fade out toward the loop (diagonal readings not used)
    new[k, 1] = yy + w * d
c = np.vstack([new, new[:1]]); tck, _ = splprep([c[:, 0], c[:, 1]], s=0.02 * len(new), per=True, k=3)
x, y = splev(np.linspace(0, 1, 110, endpoint=False), tck); NEW = np.c_[x, y]
src = open(os.path.join("..", "cad", "parameters_v3.py"), encoding="utf-8").read()
fmt = "[\n" + "".join(f"    ({a:8.2f}, {b:7.2f}),\n" for a, b in NEW) + "]"
src = re.sub(r"OPENING_CPS = \[.*?\n\]", "OPENING_CPS = " + fmt, src, flags=re.S)
src = src.replace("Stage: V3-A iteration 3", "Stage: V3-A final (outer: frontal edge loop; opening: manual stations on 925_alB_1)")
src = re.sub(r'STAGE = ".*?"', 'STAGE = "V3-A final"', src)
open(os.path.join("..", "cad", "parameters_v3.py"), "w", encoding="utf-8").write(src)
print("upper dy at stations", [round(float(up(s)), 2) for s in (150, 250, 350, 380, 390, 400)])
print("lower dy at stations", [round(float(lo(s)), 2) for s in (150, 250, 350, 380, 390, 400)])
