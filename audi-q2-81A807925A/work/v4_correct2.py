"""V4 iteration 2 - R4: opening, installed-LOWER edge, s 400-440 (loop-end lower turn): both front
photos agree (V4 meas: alB_1 +1.12, ccm_1 +1.63 mm) -> move the opening edge outward by the smaller."""
import json, os, re, numpy as np
from scipy.interpolate import splprep, splev, interp1d
from scipy.ndimage import gaussian_filter1d
from reg import Model
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OV = os.path.join(ROOT, "REFERENCE_PACK_V4", "analysis", "overlays")
m = Model("V4")
i = m.PF.spline_points("opening", 1500)
t = np.roll(i, -1, 0) - np.roll(i, 1, 0); n = np.c_[t[:, 1], -t[:, 0]]; n /= np.linalg.norm(n, axis=1)[:, None]
yc = i[:, 1].mean()
def prof(tag):
    d = json.load(open(os.path.join(OV, f"meas_V4_{tag}.json")))["opening"]
    sy = np.array(d["sy"]); v = np.array(d["dev_mm"], float)
    k = np.isfinite(v) & (sy[:, 1] <= yc); s, v = sy[k, 0], v[k]; o = np.argsort(s)
    return interp1d(s[o], np.convolve(v[o], np.ones(3) / 3, mode="same"), bounds_error=False, fill_value=np.nan)
A, B = prof("front_01"), prof("front_02")
disp = np.zeros(len(i))
for k, (s, y) in enumerate(i):
    if y <= yc and 400 <= s <= 440:
        a, b = A(s), B(s)
        if np.isfinite(a) and np.isfinite(b) and a > 0 and b > 0:
            disp[k] = min(a, b) * np.clip((s - 400) / 8, 0, 1) * np.clip((440 - s) / 8, 0, 1)
disp = gaussian_filter1d(disp, 2, mode="wrap")
new = i + disp[:, None] * n
c = np.vstack([new, new[:1]]); tck, _ = splprep([c[:, 0], c[:, 1]], s=0.0005 * len(new), per=True, k=3)
x, y = splev(np.linspace(0, 1, 130, endpoint=False), tck)
fmt = "[\n" + "".join(f"    ({a:8.2f}, {b:7.2f}),\n" for a, b in zip(x, y)) + "]"
p = os.path.join(ROOT, "cad", "parameters_v4.py"); src = open(p, encoding="utf-8").read()
src = re.sub(r"\nOPENING_CPS = \[.*?\n\]\n", "\n", src, flags=re.S)
src = src.replace('STAGE = "V4 front refinement (outer edge R1-R3)"', 'STAGE = "V4 front refinement (outer edge R1-R3, opening R4)"')
src += "\n# R4 (iteration 2): opening installed-lower edge at the loop end, s 400-440\nOPENING_CPS = " + fmt + "\n"
open(p, "w", encoding="utf-8").write(src)
json.dump(dict(max_mm=round(float(disp.max()), 2), n=int((disp > 0.05).sum())), open(os.path.join(ROOT, "REFERENCE_PACK_V4", "analysis", "v4_opening_R4.json"), "w"))
print("R4 max displacement", round(float(disp.max()), 2), "mm over", int((disp > 0.05).sum()), "samples")
