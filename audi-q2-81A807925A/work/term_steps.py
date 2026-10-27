"""Objective extraction of the opening edges near END B (where the two band steps = the 'recess' are)
on the two frontal photos where the background is seen through the opening (alB_1 Leo-b, ccm_1 RRR ccm44).
Per image column: first / last background pixel inside the opening -> back-projected to (s, y) with the
camera matched on the current CAD. Compared with the CAD opening edges. Output json + plot."""
import json, os, sys, numpy as np, cv2, warnings
warnings.filterwarnings("ignore")
import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
from scipy.optimize import least_squares
from reg import *
VER = sys.argv[1] if len(sys.argv) > 1 else "V5"
CAMDIR = os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis", "overlays")
OUT = os.path.join(ROOT, "TERMINAL_REFINEMENT")
m = Model(VER)
CASES = {"front_A": ("925_alB_1", range(300, 760, 4), (840, 1075)), "front_B": ("925_ccm_1", range(700, 1000, 3), (340, 450))}
res = {}
fig, ax = plt.subplots(2, 1, figsize=(12, 8))
for tag, (photo, xs, (yl, yh)) in CASES.items():
    cj = json.load(open(os.path.join(CAMDIR, f"cam_{VER}_{tag}.json"))); cam = np.array(cj["cam"]); W, H = cj["W"], cj["H"]
    im = cv2.imread(os.path.join(REF, photo + ".jpg")); L = cv2.GaussianBlur(cv2.cvtColor(im, cv2.COLOR_BGR2LAB)[..., 0].astype(float), (0, 0), 1.0)
    band = np.r_[L[30:110, 100:W - 100].ravel(), L[H - 110:H - 30, 100:W - 100].ravel()]
    bgv, tol = np.median(band), max(10.0, 3 * np.std(band))
    ui = project(m.i3, cam, W, H)
    def bp(u):
        j = int(np.argmin(np.linalg.norm(ui - u, axis=1)))
        f = lambda p: project(m.lift(np.array([p])), cam, W, H)[0] - u
        return least_squares(f, m.i2[j], x_scale=[10, 10]).x
    pts = []
    for x in xs:
        col = L[yl:yh, x]; isbg = np.abs(col - bgv) < tol
        k = np.where(isbg)[0]
        if len(k) < 8:
            continue
        # longest run of background = the opening
        runs = np.split(k, np.where(np.diff(k) > 2)[0] + 1); r = max(runs, key=len)
        if len(r) < 8:
            continue
        for yy in (yl + r[0] - 0.5, yl + r[-1] + 0.5):
            s, y = bp(np.array([x, yy], float)); pts.append((float(s), float(y)))
    pts = np.array(pts); res[tag] = pts.tolist()
    yc = m.i2[:, 1].mean()
    for half, a in (("installed top edge", ax[0]), ("installed bottom edge", ax[1])):
        sel = pts[:, 1] > yc if "top" in half else pts[:, 1] <= yc
        a.plot(pts[sel, 0], pts[sel, 1], ".", ms=4, label=f"{photo}")
for half, a in (("installed top edge", ax[0]), ("installed bottom edge", ax[1])):
    c = m.i2[(m.i2[:, 1] > m.i2[:, 1].mean()) if "top" in half else (m.i2[:, 1] <= m.i2[:, 1].mean())]
    c = c[(c[:, 0] > 330) & (c[:, 0] < 470)]; c = c[np.argsort(c[:, 0])]
    a.plot(c[:, 0], c[:, 1], "k-", lw=1.2, label=f"CAD {VER}"); a.set_title(f"opening {half} near END B"); a.grid(alpha=.3); a.legend(fontsize=8)
    a.set_xlim(330, 470)
ax[1].set_xlabel("s [mm] from END A tip")
plt.tight_layout(); plt.savefig(os.path.join(OUT, f"recess_steps_{VER}.png"), dpi=110)
json.dump(res, open(os.path.join(OUT, f"recess_steps_{VER}.json"), "w"))
print({k: len(v) for k, v in res.items()})
