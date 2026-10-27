"""Terminal-zone deviation profiles along the contour (arc-length parameter, 5 mm bins) for the
frontal views of two independent specimens (front_A = Leo-b alB_1, front_C = polovni pa_1) plus the
ccm44 front where visible. Flags bins where >= 2 specimens agree in sign with |dev| > 0.5 mm.
Output: TERMINAL_REFINEMENT/terminal_agreement_<VER>.json + plot."""
import json, os, sys, numpy as np, warnings
warnings.filterwarnings("ignore")
import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
from reg import *
VER = sys.argv[1] if len(sys.argv) > 1 else "V5"
CAMDIR = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis", "overlays")
OUT = os.path.join(ROOT, "TERMINAL_REFINEMENT")
VIEWS = {"front_A": "925_alB_1", "front_C_assembly": "681_pa_1", "front_B": "925_ccm_1"}
m = Model(VER)
sa, sb = m.i2[:, 0].min(), m.i2[:, 0].max()
ZONES = {"A_outer": ("outer", lambda s: s < sa + 25), "A_opening": ("opening", lambda s: s < sa + 60),
         "B_outer": ("outer", lambda s: s > sb - 90), "B_opening": ("opening", lambda s: s > sb - 110)}


def arc(pts):
    return np.r_[0, np.cumsum(np.linalg.norm(np.diff(pts, axis=0), axis=1))]


res = {}
meas = {}
for tag, photo in VIEWS.items():
    cj = json.load(open(os.path.join(CAMDIR, f"cam_{VER}_{tag}.json")))
    ei = EdgeImage(os.path.join(REF, photo + ".jpg"))
    meas[tag] = measure(m, ei, np.array(cj["cam"]), step=1)
fig, axs = plt.subplots(len(ZONES), 1, figsize=(13, 13))
for ax, (zn, (which, zf_)) in zip(axs, ZONES.items()):
    pts = m.o2 if which == "outer" else m.i2
    sel = zf_(pts[:, 0])
    # contiguous ordering along the contour: rotate so the zone does not wrap around index 0
    idx = np.where(sel)[0]
    if idx[0] == 0 and idx[-1] == len(pts) - 1:
        gap = np.argmax(np.diff(idx)); idx = np.r_[idx[gap + 1:], idx[:gap + 1]]
    a = arc(pts[idx]); bins = np.arange(0, a[-1] + 5, 5.0); rows = []
    for tag, col in zip(VIEWS, ("tab:red", "tab:blue", "tab:green")):
        d = np.asarray(meas[tag][which]["dev_mm"], float)[idx]
        ax.plot(a, np.clip(d, -4, 4), ".", ms=3, color=col, label=tag)
    for b0 in bins[:-1]:
        k = (a >= b0) & (a < b0 + 5); r = dict(arc0=float(b0), s_mean=float(pts[idx[k], 0].mean()), y_mean=float(pts[idx[k], 1].mean()))
        for tag in VIEWS:
            d = np.asarray(meas[tag][which]["dev_mm"], float)[idx[k]]; d = d[np.isfinite(d) & (np.abs(d) < 4)]
            r[tag] = round(float(np.median(d)), 2) if len(d) >= 2 else None
        vals = [r[t] for t in VIEWS if r[t] is not None]
        pos = [v for v in vals if v > 0.5]; neg = [v for v in vals if v < -0.5]
        r["agree"] = "+" if len(pos) >= 2 and not neg else ("-" if len(neg) >= 2 and not pos else "")
        r["conflict"] = bool(pos and neg)
        rows.append(r)
    res[zn] = rows
    ax.axhspan(-0.5, 0.5, color="g", alpha=.08); ax.axhline(0, color="k", lw=.6); ax.set_ylim(-4, 4); ax.grid(alpha=.3)
    ax.set_title(f"{zn}: deviation along the contour (arc mm)"); ax.legend(fontsize=7)
plt.tight_layout(); plt.savefig(os.path.join(OUT, f"terminal_deviation_profiles_{VER}.png"), dpi=100)
json.dump(res, open(os.path.join(OUT, f"terminal_agreement_{VER}.json"), "w"), indent=1)
for zn, rows in res.items():
    for r in rows:
        if r["agree"] or r["conflict"]:
            print(zn, f"arc {r['arc0']:5.0f} s {r['s_mean']:6.1f} y {r['y_mean']:6.1f}", {t: r[t] for t in VIEWS}, "AGREE" + r["agree"] if r["agree"] else "CONFLICT")
