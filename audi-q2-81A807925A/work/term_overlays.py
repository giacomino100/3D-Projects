"""Terminal-region overlays (END A = wide solid end, END B = narrow loop end) for a CAD version,
using cameras already matched on the full part (REFERENCE_PACK_V5/analysis/overlays/cam_<VER>_<view>.json).
Writes 50% alpha + edge overlays cropped to each terminal, and per-terminal deviation stats."""
import json, os, sys, numpy as np, cv2, warnings
warnings.filterwarnings("ignore")
from reg import *
VER = sys.argv[1] if len(sys.argv) > 1 else "V5"
CAMDIR = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis", "overlays")
OUT = os.path.join(ROOT, "TERMINAL_REFINEMENT", "overlays"); os.makedirs(OUT, exist_ok=True)
PH = {"front_A": "925_alB_1", "front_C_assembly": "681_pa_1", "oblique_A": "925_alA_1", "oblique_B": "925_krik_0",
      "profile": "925_mp_2_hr"}
NAMES = {("A", "front_A"): "OEM_END_A_FRONT", ("A", "front_C_assembly"): "OEM_END_A_FRONT_2", ("A", "oblique_A"): "OEM_END_A_OBLIQUE",
         ("A", "oblique_B"): "OEM_END_A_OBLIQUE_2", ("B", "front_A"): "OEM_END_B_FRONT", ("B", "front_C_assembly"): "OEM_END_B_FRONT_2",
         ("B", "oblique_A"): "OEM_END_B_OBLIQUE", ("B", "oblique_B"): "OEM_END_B_OBLIQUE_2", ("B", "profile"): "OEM_END_B_PROFILE"}
STL = [os.path.join(CAD, "exports", VER, f"81A807925A_{VER}_body.stl"), os.path.join(CAD, "exports", VER, f"81A807925A_{VER}_clips.stl")]
m = Model(VER)
sA = m.i2[:, 0].min() + 25.0          # END A zone: s < opening start + 25
sB = m.i2[:, 0].max() - 70.0          # END B zone: s > opening end - 70
stats = {}
for tag, photo in PH.items():
    p = os.path.join(CAMDIR, f"cam_{VER}_{tag}.json")
    if not os.path.exists(p):
        continue
    cj = json.load(open(p)); cam = np.array(cj["cam"]); ei = EdgeImage(os.path.join(REF, photo + ".jpg"))
    frontal = tag.startswith("front")
    meas = measure(m, ei, cam, lip=None if frontal else 6.5)
    rgb, mask = render_rgba(STL, cam, ei.W, ei.H, scale=0.6)
    for end, zone in (("A", lambda s: s < sA), ("B", lambda s: s > sB)):
        if (end, tag) not in NAMES:
            continue
        # crop box = projection of the terminal zone of the outer contour (+ lip) with margin
        sel = zone(m.o2[:, 0]); X = m.lift(m.o2[sel]); Xb = X.copy(); Xb[:, 2] += 6.5
        uv = np.vstack([project(X, cam, ei.W, ei.H), project(Xb, cam, ei.W, ei.H)])
        x0, y0 = np.maximum(uv.min(0) - 60, 0).astype(int); x1, y1 = np.minimum(uv.max(0) + 60, [ei.W, ei.H]).astype(int)
        img = ei.img.copy(); bl = img.copy(); bl[mask] = (0.5 * img[mask] + 0.5 * rgb[mask]).astype(np.uint8)
        th = max(1, ei.W // 1000)
        rec = {}
        for which, col in (("outer", (255, 160, 0)), ("opening", (255, 0, 255))):
            d = meas[which]; z = zone(d["sy"][:, 0])
            if which == "opening" and not frontal:
                z[:] = False
            cv2.polylines(bl, [d["uv"].astype(np.int32).reshape(-1, 1, 2)], True, col, th)
            for k in np.where(z & np.isfinite(d["off_px"]))[0]:
                p0 = d["uv"][k]; q = p0 + d["off_px"][k] * d["nimg"][k]; e = abs(d["dev_mm"][k])
                c = (0, 200, 0) if e < 0.75 else ((0, 220, 255) if e < 1.5 else (0, 0, 255))
                cv2.line(bl, tuple(p0.astype(int)), tuple(q.astype(int)), c, th); cv2.circle(bl, tuple(q.astype(int)), 2 * th, c, -1)
            v = d["dev_mm"][z]; v = v[np.isfinite(v)]
            rec[which] = dict(n=int(len(v)), mean=round(float(v.mean()), 2) if len(v) else None,
                              mae=round(float(np.abs(v).mean()), 2) if len(v) else None)
        crop = bl[y0:y1, x0:x1]; sc = 1400 / max(crop.shape[1], 1)
        crop = cv2.resize(crop, None, fx=sc, fy=sc, interpolation=cv2.INTER_CUBIC)
        bar = np.full((48, crop.shape[1], 3), 255, np.uint8)
        cv2.putText(bar, f"END {end} - {photo} ({tag}) vs CAD {VER}", (8, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 2)
        cv2.putText(bar, "50% CAD | orange/magenta CAD edges | dots OEM edge: green<0.75 yellow<1.5 red>=1.5 mm", (8, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.45, (60, 60, 60), 1)
        name = NAMES[(end, tag)]
        cv2.imwrite(os.path.join(OUT, f"{name}_overlay_{VER}.png"), np.vstack([bar, crop]))
        # edge overlay: OEM edges red, CAD silhouette edges cyan
        g = cv2.Canny(cv2.GaussianBlur(cv2.cvtColor(ei.img, cv2.COLOR_BGR2GRAY), (0, 0), 1.2), 30, 90)
        ce = cv2.Canny((mask * 255).astype(np.uint8), 50, 150)
        e = np.zeros_like(ei.img); e[g > 0] = (0, 0, 255); e[ce > 0] = (255, 255, 0)
        ec = cv2.resize(e[y0:y1, x0:x1], None, fx=sc, fy=sc, interpolation=cv2.INTER_NEAREST)
        cv2.imwrite(os.path.join(OUT, f"{name}_edges_{VER}.png"), ec)
        stats[f"{end}_{tag}"] = rec
        print(VER, end, tag, rec, flush=True)
json.dump(stats, open(os.path.join(OUT, f"terminal_stats_{VER}.json"), "w"), indent=1)
