"""V5 deliverables from measurements: landmark_residuals.csv (V4 and V5), curvature_profile.csv + plot,
stations.csv. Run after v5_overlays.py V4 and V5."""
import csv, json, os, sys, math, numpy as np, warnings
warnings.filterwarnings("ignore")
import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
from reg import *
import lm5
A = os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis"); OV = os.path.join(A, "overlays")
PK = json.load(open("picks.json"))
VIEWS = [("front_A", "925_alB_1"), ("front_B", "925_ccm_1"), ("front_C_assembly", "681_pa_1"),
         ("oblique_A", "925_alA_1"), ("oblique_B", "925_krik_0")]
rows = []
for ver in ("V4", "V5"):
    m = Model(ver)
    for tag, photo in VIEWS:
        p = os.path.join(OV, f"meas_{ver}_{tag}.json")
        if not os.path.exists(p):
            continue
        meas = json.load(open(p)); cj = json.load(open(os.path.join(OV, f"cam_{ver}_{tag}.json")))
        for k in meas:
            for kk in ("off_px", "dev_mm", "ppm", "strength"):
                meas[k][kk] = np.array([np.nan if v is None else v for v in meas[k][kk]], float)
        for r in lm5.table(m, meas, np.array(cj["cam"]), PK[photo]["pts"], cj["W"], cj["H"], project, photo):
            r = {k: (round(float(v), 2) if isinstance(v, (float, np.floating)) else v) for k, v in r.items()}
            r["cad_version"] = ver; r["view"] = tag; rows.append(r)
cols = ["cad_version", "view", "landmark_id", "name", "source_image", "pixel_x", "pixel_y", "cad_x_mm", "cad_y_mm", "cad_z_mm",
        "projected_x", "projected_y", "residual_px", "residual_mm", "confidence"]
with open(os.path.join(A, "landmark_residuals.csv"), "w", newline="", encoding="utf-8") as fh:
    w = csv.DictWriter(fh, fieldnames=cols, extrasaction="ignore"); w.writeheader(); w.writerows(rows)
summ = {}
for ver in ("V4", "V5"):
    for tag, _ in VIEWS:
        v = [r["residual_mm"] for r in rows if r["cad_version"] == ver and r["view"] == tag and r["residual_mm"] is not None]
        if v:
            summ[f"{ver}_{tag}"] = dict(n=len(v), mean_mm=round(float(np.mean(v)), 2), max_mm=round(float(np.max(v)), 2))
json.dump(summ, open(os.path.join(A, "landmark_summary.json"), "w"), indent=1)
print(json.dumps(summ, indent=1))

# curvature / stations for V5 (and V4 for comparison)
def profile(ver):
    m = Model(ver); P, SF, PF = m.P, m.SF, m.PF
    o = PF.spline_points("outer", 6000); i = PF.spline_points("opening", 6000)
    ss = np.arange(o[:, 0].min() + 0.5, o[:, 0].max() - 0.5, 2.0)
    yo, yi = o[:, 1].mean(), i[:, 1].mean(); out = []
    for s in ss:
        c = o[np.abs(o[:, 0] - s) < 0.6]
        if len(c) < 2: continue
        yt, yb = c[:, 1].max(), c[:, 1].min(); ci = i[np.abs(i[:, 0] - s) < 0.6]
        bt = bb = None
        if len(ci) >= 2:
            bt, bb = yt - ci[:, 1].max(), ci[:, 1].min() - yb
        ym = 0.5 * (yt + yb)
        z = float(SF.zf(s, ym)); twist = math.degrees(math.atan2(float(SF.zf(s, yt) - SF.zf(s, yb)), yt - yb))
        rc_t = float(SF.rail_crown(s, yt - 0.5 * bt)) if bt else 0.0
        out.append(dict(s=float(s), x=float(P.L - s), y_mid=float(ym), z_mid=z, twist_deg=twist, band_top=bt, band_bot=bb,
                        height=float(yt - yb), rail_crown_mm=-rc_t))
    s = np.array([r["s"] for r in out]); z = np.array([r["z_mid"] for r in out]); y = np.array([r["y_mid"] for r in out])
    d1 = np.gradient(np.c_[s, y, z], s, axis=0); d2 = np.gradient(d1, s, axis=0)
    k = np.linalg.norm(np.cross(d1, d2), axis=1) / np.linalg.norm(d1, axis=1) ** 3
    arc = np.r_[0, np.cumsum(np.linalg.norm(np.diff(np.c_[s, y, z], axis=0), axis=1))]
    for r, kk, a in zip(out, k, arc):
        r["curvature_1_per_mm"] = float(kk); r["arc_mm"] = float(a)
    return out
P5, P4 = profile("V5"), profile("V4")
with open(os.path.join(A, "curvature_profile.csv"), "w", newline="", encoding="utf-8") as fh:
    w = csv.DictWriter(fh, fieldnames=list(P5[0].keys())); w.writeheader()
    for r in P5: w.writerow({k: (round(v, 4) if isinstance(v, float) else v) for k, v in r.items()})
fig, ax = plt.subplots(4, 1, figsize=(11, 12), sharex=True)
for pr, st, lab in ((P4, "--", "V4"), (P5, "-", "V5")):
    a = [r["arc_mm"] for r in pr]
    ax[0].plot(a, [r["curvature_1_per_mm"] for r in pr], "k" + st, label=lab)
    ax[1].plot(a, [r["z_mid"] for r in pr], "k" + st, label=lab)
    ax[2].plot(a, [r["twist_deg"] for r in pr], "g" + st, label=lab)
    ax[3].plot(a, [np.nan if r["band_top"] is None else r["band_top"] for r in pr], "r" + st, label=f"{lab} upper band")
    ax[3].plot(a, [np.nan if r["band_bot"] is None else r["band_bot"] for r in pr], "b" + st, label=f"{lab} lower band")
for a_, lab in zip(ax, ("centerline curvature [1/mm]", "Z mid [mm] (+ rearward)", "section twist [deg]", "visible band [mm]")):
    a_.set_ylabel(lab); a_.grid(alpha=.3); a_.legend(fontsize=7)
ax[3].set_xlabel("arc length along the visible centerline [mm] (0 = inner tip)")
fig.suptitle("81A807925A - curvature diagnostic V4 (dashed) vs V5 (solid)")
plt.tight_layout(); plt.savefig(os.path.join(A, "curvature_profile.png"), dpi=110)
# 21 stations = Z_STATIONS of V5
m = Model("V5"); st = m.P.Z_STATIONS; sig = m.P.Z_SIGMA
with open(os.path.join(A, "stations.csv"), "w", newline="", encoding="utf-8") as fh:
    w = csv.writer(fh)
    w.writerow(["station_id", "arc_fraction", "x_mm", "y_mm", "z_mm", "band_width_upper_mm", "band_width_lower_mm",
                "crown_mm", "twist_deg", "rear_return_mm", "z_sigma_mm", "confidence", "source_views", "notes"])
    for k, ((s, z, p), sg) in enumerate(zip(st, sig)):
        r = min(P5, key=lambda q: abs(q["s"] - s))
        conf = "MEDIUM (wrap law, 4 views)" if s > 300 else "LOW (not observable; sag 4 mm assumed)"
        w.writerow([f"S{k:02d}", round(r["arc_mm"] / P5[-1]["arc_mm"], 3), round(m.P.L - s, 1), round(r["y_mid"], 2), round(z, 2),
                    None if r["band_top"] is None else round(r["band_top"], 2), None if r["band_bot"] is None else round(r["band_bot"], 2),
                    f"{m.P.CROWN:.2f} global + {r['rail_crown_mm']:.2f} rail", round(p, 2),
                    f"lip {m.P.D_RET_OUTER} / opening {m.P.D_RET_OPEN}-{m.P.D_WALL_OPEN_TOP}", sg, conf,
                    "alA_1, krik_0, alB_2, mp_2" if s > 300 else "-", "pitch ASSUMED (6 deg + 4 deg twist over wrap)"])
print("ok")
