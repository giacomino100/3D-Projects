"""Per-region deviation profiles on the two independent front photos; flags regions where both
agree in sign and magnitude (> AGREE mm). Output: analysis/front_deviation_profiles.png + json."""
import json, os, sys, numpy as np
import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OV = os.path.join(ROOT, "REFERENCE_PACK_V4", "analysis", "overlays")
VER = sys.argv[1] if len(sys.argv) > 1 else "V3"
AGREE = 0.5
def prof(tag, which):
    m = json.load(open(os.path.join(OV, f"meas_{VER}_{tag}.json")))[which]
    sy = np.array(m["sy"]); d = np.array(m["dev_mm"], float)
    return sy, d
out = {}
fig, axs = plt.subplots(2, 1, figsize=(15, 8))
for ax, which in zip(axs, ("outer", "opening")):
    for tag, col in (("front_01", "tab:red"), ("front_02", "tab:blue")):
        sy, d = prof(tag, which)
        yc = sy[:, 1].mean()
        for half, mk in (("upper", "o"), ("lower", "s")):
            msk = (sy[:, 1] > yc) if half == "upper" else (sy[:, 1] <= yc)
            ax.plot(sy[msk, 0], d[msk], mk, ms=3, color=col, alpha=.7, label=f"{tag} {half}")
    ax.axhline(0, color="k", lw=.8); ax.axhspan(-AGREE, AGREE, color="g", alpha=.08)
    ax.set_ylim(-4, 4); ax.grid(alpha=.3); ax.set_ylabel(f"{which} dev [mm] (+ OEM outside CAD)"); ax.legend(fontsize=7, ncol=4)
axs[1].set_xlabel("s [mm] from inner tip")
fig.suptitle(f"Front deviations of CAD {VER}: front_01 = alB_1 (Leo-b), front_02 = ccm_1 (RRR ccm44)")
plt.tight_layout(); plt.savefig(os.path.join(ROOT, "REFERENCE_PACK_V4", "analysis", f"front_deviation_profiles_{VER}.png"), dpi=110)
# binned agreement table
rows = []
for which in ("outer", "opening"):
    P = {t: prof(t, which) for t in ("front_01", "front_02")}
    yc = P["front_01"][0][:, 1].mean()
    for half in ("upper", "lower"):
        for s0 in range(-10, 490, 20):
            vals = {}
            for t, (sy, d) in P.items():
                msk = (sy[:, 0] >= s0) & (sy[:, 0] < s0 + 20) & (((sy[:, 1] > yc) if half == "upper" else (sy[:, 1] <= yc))) & np.isfinite(d)
                vals[t] = (float(np.median(d[msk])), int(msk.sum())) if msk.sum() >= 2 else (None, int(msk.sum()))
            a, b = vals["front_01"][0], vals["front_02"][0]
            agree = a is not None and b is not None and np.sign(a) == np.sign(b) and min(abs(a), abs(b)) > AGREE
            rows.append(dict(edge=which, half=half, s0=s0, d01=a, n01=vals["front_01"][1], d02=b, n02=vals["front_02"][1], agree=bool(agree)))
json.dump(rows, open(os.path.join(ROOT, "REFERENCE_PACK_V4", "analysis", f"front_agreement_{VER}.json"), "w"), indent=1)
for r in rows:
    if r["d01"] is not None or r["d02"] is not None:
        flag = "AGREE" if r["agree"] else ("CONFLICT" if (r["d01"] is not None and r["d02"] is not None and abs(r["d01"] - r["d02"]) > 1.0) else "")
        f = lambda v: "  -  " if v is None else f"{v:+.2f}"
        if flag or (r["d01"] is not None and abs(r["d01"]) > 0.6) or (r["d02"] is not None and abs(r["d02"]) > 0.6):
            print(f"{r['edge']:7s} {r['half']:5s} s {r['s0']:4d}-{r['s0']+20:<4d} alB_1 {f(r['d01'])} (n{r['n01']:2d})  ccm_1 {f(r['d02'])} (n{r['n02']:2d})  {flag}")
