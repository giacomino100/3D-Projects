"""Fair V1 vs V2 comparison: best camera fitted independently for each model on
every exact-target photo with a usable silhouette. Metric: mean of per-point
symmetric chamfer distance clipped at 15 px (outer + opening when available)."""
import json, sys, os, numpy as np, cv2, warnings
warnings.filterwarnings("ignore")
from fitlib import *
from fit_v2 import spline_curve
sys.path.insert(0, os.path.join(ROOT, "cad"))
import parameters_v2 as P2

Z1 = dict(ZDEF, crown=0.0)
Z2 = dict(sag=P2.Z_SAG_MAIN, u0=P2.X_WRAP_START, zw=P2.Z_WRAP_OUTER, p=P2.WRAP_EXP, pitch=P2.PITCH_DEG,
          twist=P2.TWIST_OUTER_DEG, crown=P2.CROWN, H=P2.H)
C1 = model_curves(Z1)
C2 = (lift(spline_curve(np.array(P2.OUTER_CPS), 300), Z2), lift(spline_curve(np.array(P2.OPENING_CPS), 300), Z2))
PHOTOS = [("corner_1", "fit", 0), ("corner_2", "fit", 0), ("corner_3", "fit", 0), ("corner_5", "fit", 0),
          ("corner_6", "fit", 0), ("corner_4", "holdout", 0), ("925_krik_0", "holdout (other sample)", 0),
          ("925_pru_1_r", "holdout (other sample, outer only)", 180)]
prev = json.load(open("fit_v2b.json"))["cams"]


def best_cam(ph, C, cam0):
    best = None
    for f in (1500.0, 3000.0, 7000.0):
        starts = [None] if cam0 is None else [cam0, None]
        for s0 in starts:
            r = fit_camera_fixed_f(ph, C[0], C[1], f, cam0=s0, use_hole=ph["hole"] is not None)
            if r is None:
                continue
            c = r[0]
            m = float(np.mean(np.minimum(np.abs(residuals(c, ph, C[0], C[1], ph["hole"] is not None)), 15)))
            if best is None or m < best[1]:
                best = (c, m)
    return best


rows, crops = [], []
for name, role, rot in PHOTOS:
    ph = load_photo(name)
    if name.startswith("925_"):     # GrabCut holes are unreliable on pru_1 (cloth seen through)
        if "pru" in name:
            ph["hole"] = None
    c0 = np.array(prev[name]) if name in prev else None
    b1, b2 = best_cam(ph, C1, c0), best_cam(ph, C2, c0)
    rows.append(dict(photo=name, role=role, v1_px=round(b1[1], 2), v2_px=round(b2[1], 2),
                     change_pct=round(100 * (b2[1] - b1[1]) / b1[1], 1)))
    print(rows[-1])
    imgname = name.replace("_r", "")
    im = cv2.imread(os.path.join(ROOT, "docs", "reference_images", f"{imgname}.jpg"))
    if rot == 180:
        im = cv2.rotate(im, cv2.ROTATE_180)
    tiles = []
    for (cam, m), C, lab in ((b1, C1, "V1"), (b2, C2, "V2")):
        t = im.copy()
        cv2.polylines(t, [ph["outer"].astype(np.int32).reshape(-1, 1, 2)], True, (0, 200, 0), 1)
        if ph["hole"] is not None:
            cv2.polylines(t, [ph["hole"].astype(np.int32).reshape(-1, 1, 2)], True, (0, 200, 0), 1)
        for X, col in ((C[0], (0, 0, 255)), (C[1], (255, 80, 0))):
            uv = project(X, cam, ph["W"], ph["H"])
            cv2.polylines(t, [uv.astype(np.int32).reshape(-1, 1, 2)], True, col, 2)
        x, y, w, h = cv2.boundingRect(ph["outer"].astype(np.int32)); pad = 40
        t = t[max(0, y - pad):y + h + pad, max(0, x - pad):x + w + pad]
        t = cv2.resize(t, (900, int(900 * t.shape[0] / t.shape[1])))
        cv2.putText(t, f"{name} {lab}: {m:.2f}px ({role})", (8, 24), cv2.FONT_HERSHEY_SIMPLEX, 0.65, (0, 0, 0), 2)
        tiles.append(t)
    hh = max(t.shape[0] for t in tiles)
    tiles = [cv2.copyMakeBorder(t, 0, hh - t.shape[0], 0, 6, cv2.BORDER_CONSTANT, value=(255, 255, 255)) for t in tiles]
    crops.append(np.hstack(tiles))
out = os.path.join(ROOT, "docs", "V2", "validation")
os.makedirs(out, exist_ok=True)
for (name, _, _), c in zip(PHOTOS, crops):
    cv2.imwrite(os.path.join(out, f"V1_vs_V2_{name}.jpg"), c)
json.dump(rows, open(os.path.join(out, "V1_vs_V2_metrics.json"), "w"), indent=1)
