"""V5 step 3: quantitative test of the brief's hypotheses H1-H4 on the CURRENT CAD (V4), from the
camera-matched edge measurements (analysis/overlays/meas_V4_*.json). No CAD edits here.
Sign convention of dev: + = OEM edge outside the CAD contour (outer: part bigger; opening: opening bigger)."""
import json, os, sys, numpy as np
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "work"))
from reg import Model
OV = os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis", "overlays")
OUT = os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis")
VER = sys.argv[1] if len(sys.argv) > 1 else "V4"
FRONTS = {"front_A": "925_alB_1 (Leo-b)", "front_B": "925_ccm_1 (RRR ccm44)", "front_C_assembly": "681_pa_1 (polovni)"}
m = Model(VER)
o = m.PF.spline_points("outer", 3000); i = m.PF.spline_points("opening", 3000)
yc_o, yc_i = o[:, 1].mean(), i[:, 1].mean()


def edge_y(pts, s, upper, yc):
    c = pts[(np.abs(pts[:, 0] - s) < 0.8) & ((pts[:, 1] > yc) if upper else (pts[:, 1] <= yc))]
    return float(c[:, 1].max() if upper else c[:, 1].min()) if len(c) else np.nan


def dev_at(tag, which, s, upper, half_win=6.0):
    d = json.load(open(os.path.join(OV, f"meas_{VER}_{tag}.json")))[which]
    sy = np.array(d["sy"]); v = np.array(d["dev_mm"], float)
    yc = sy[:, 1].mean()
    k = np.isfinite(v) & (np.abs(sy[:, 0] - s) < half_win) & ((sy[:, 1] > yc) if upper else (sy[:, 1] <= yc)) & (np.abs(v) < 4)
    return (float(np.median(v[k])), int(k.sum())) if k.sum() >= 2 else (np.nan, int(k.sum()))


res = {"H2_band_widths": [], "H3_H4_chord": {}, "H1_wide_end": {}}
s0, s1 = i[:, 0].min(), i[:, 0].max()
for frac in (0.10, 0.25, 0.50, 0.75, 0.90):
    s = s0 + frac * (s1 - s0)
    row = dict(frac=frac, s=round(float(s), 1))
    for half, up in (("upper", True), ("lower", False)):
        cad = abs(edge_y(o, s, up, yc_o) - edge_y(i, s, up, yc_i))
        row[f"cad_{half}"] = round(cad, 2)
        for tag in FRONTS:
            do, no = dev_at(tag, "outer", s, up); di, ni = dev_at(tag, "opening", s, up)
            row[f"{tag}_{half}"] = None if (np.isnan(do) or np.isnan(di)) else round(cad + do - di, 2)
    res["H2_band_widths"].append(row)
# H3/H4: deviation of the OEM edge from the straight chord between s=140 and s=380, vs the same for CAD
for half, up in (("upper", True), ("lower", False)):
    ss = np.arange(140, 381, 10.0)
    ycad = np.array([edge_y(o, s, up, yc_o) for s in ss])
    chord = lambda y: y - (y[0] + (y[-1] - y[0]) * (ss - ss[0]) / (ss[-1] - ss[0]))
    out = {"cad_max_from_chord": round(float(np.nanmax(np.abs(chord(ycad)))), 2)}
    for tag in FRONTS:
        dv = np.array([dev_at(tag, "outer", s, up)[0] for s in ss])
        if np.isfinite(dv).sum() < len(ss) * 0.7:
            out[tag] = "insufficient coverage"; continue
        dv = np.where(np.isfinite(dv), dv, np.nanmedian(dv))
        yo = ycad + (dv if up else -dv)
        out[tag] = dict(oem_max_from_chord=round(float(np.max(np.abs(chord(yo)))), 2),
                        residual_shape_rms=round(float(np.sqrt(np.mean((chord(yo) - chord(ycad)) ** 2))), 2))
    res["H3_H4_chord"][half] = out
# H1: wide end (s < opening start): outer dev stats per view
for tag in list(FRONTS) + ["oblique_A", "oblique_B"]:
    p = os.path.join(OV, f"meas_{VER}_{tag}.json")
    if not os.path.exists(p):
        continue
    d = json.load(open(p))["outer"]; sy = np.array(d["sy"]); v = np.array(d["dev_mm"], float)
    k = np.isfinite(v) & (sy[:, 0] < s0) & (np.abs(v) < 5)
    res["H1_wide_end"][tag] = dict(n=int(k.sum()), mean=round(float(np.mean(v[k])), 2) if k.any() else None,
                                   mae=round(float(np.mean(np.abs(v[k]))), 2) if k.any() else None)
json.dump(res, open(os.path.join(OUT, f"hypothesis_tests_{VER}.json"), "w"), indent=1)
print(json.dumps(res, indent=1))
