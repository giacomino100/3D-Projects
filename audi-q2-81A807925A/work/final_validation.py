"""Final photo-registration validation V2 vs V3 + required deliverables.

Outputs (docs/V3/validation/):
  OEM_vs_V3_front_overlay.png       925_alB_1  (frontal, Leo-b sample)
  OEM_vs_V3_oblique_01_overlay.png  925_alA_1  (oblique, spawplast sample)
  OEM_vs_V3_oblique_02_overlay.png  925_krik_0 (oblique from below, KRIK sample)
  OEM_vs_V3_profile_overlay.png     925_mp_2_hr(rear profile along the length, MP sample)
  OEM_vs_V3_rear_overlay.png        925_alB_2  (rear, Leo-b sample)
  + the same for V2 (OEM_vs_V2_*.png), metrics.json, landmarks_<photo>.json
"""
import json, os, sys, numpy as np, cv2, warnings
warnings.filterwarnings("ignore")
from reg import *
import lm as LM

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "docs", "V3", "validation"); os.makedirs(OUT, exist_ok=True)
PICKS = json.load(open(os.path.join(HERE, "picks.json")))
VIEWS = [("front", "925_alB_1", True), ("oblique_01", "925_alA_1", False), ("oblique_02", "925_krik_0", False),
         ("rear", "925_alB_2", False), ("profile", "925_mp_2_hr", False)]
SIDE = {"925_alB_1": "front", "925_alA_1": "front", "925_krik_0": "front", "925_alB_2": "back", "925_mp_2_hr": "back"}
STL = {"V2": [os.path.join(CAD, "exports", "V2", f) for f in ("81A807925A_V2_body.stl", "81A807925A_V2_clips.stl")],
       "V3": [os.path.join(CAD, "exports", "V3", f) for f in ("81A807925A_V3_body.stl", "81A807925A_V3_clips.stl")]}
LIP = 6.5


def register(model, name, frontal):
    pk = PICKS[name]; ei = EdgeImage(os.path.join(REF, name + ".jpg"))
    side = SIDE[name]
    cands = []
    if len(pk["pts"]) >= 4:
        c, _ = init_camera(model, pk["pts"], ei.W, ei.H)
        c, r = fit_from_picks(model, pk["pts"], pk.get("curves", []), ei.W, ei.H, c)
        if camera_side(c) == side:
            cands.append((float(np.sqrt(np.mean(r ** 2))), c))
    g = init_camera_generic(model, pk["pts"], pk.get("curves", []), ei.W, ei.H, side=side)
    if g is not None:
        cands.append((g[1], g[0]))
    c0 = min(cands, key=lambda t: t[0])[1]
    cam = refine_camera(model, ei, c0, pk["pts"], iters=2, f_prior=c0[6], curves=pk.get("curves", []),
                        use_opening=frontal)
    if camera_side(cam) != side:          # refinement flipped to the mirror solution -> keep the pick fit
        cam = c0
    assert camera_side(cam) == side, f"{name}: camera on the wrong side"
    m = measure(model, ei, cam, lip=None if frontal else LIP)
    if not frontal:                       # opening edges not valid in non-frontal views (walls visible)
        m["opening"]["off_px"][:] = np.nan; m["opening"]["dev_mm"][:] = np.nan
    return ei, cam, m


def manual_profile_check(model, cam, W, H):
    """mp_2: distance of the manual silhouette readings to the projected silhouette (px, mm)."""
    from v3b_mp2 import PTS
    sy = model.o2[::2]; X = model.lift(sy); Xb = X.copy(); Xb[:, 2] += LIP
    from scipy.spatial import cKDTree
    U = np.vstack([project(X, cam, W, H), project(Xb, cam, W, H)])
    d = cKDTree(U).query(PTS)[0]
    return d, PTS


def main():
    metrics = {}
    for ver in ("V2", "V3"):
        model = Model(ver)
        for tag, name, frontal in VIEWS:
            ei, cam, m = register(model, name, frontal)
            s = summary(m)
            rec = dict(photo=name, view=tag, side=camera_side(cam), f_px=round(float(cam[6])), outer=s["outer"], opening=s["opening"])
            if name == "925_mp_2_hr":
                d, pts = manual_profile_check(model, cam, ei.W, ei.H)
                rec["manual_silhouette_rms_px"] = round(float(np.sqrt(np.mean(d ** 2))), 2)
                rec["manual_silhouette_rms_mm"] = round(float(np.sqrt(np.mean(d ** 2)) / (1150 / 472.0)), 2)
            metrics.setdefault(ver, {})[tag] = rec
            print(ver, tag, name, s, rec.get("manual_silhouette_rms_mm", ""), flush=True)
            overlay(ei, m, cam, STL[ver], os.path.join(OUT, f"OEM_vs_{ver}_{tag}_overlay.png"),
                    f"OEM {name} ({tag}) vs CAD {ver} - camera re-registered on {ver} (f={cam[6]:.0f}px)")
            rows = LM.table(model, m, cam, PICKS[name]["pts"], ei.W, ei.H, project)
            json.dump([{k: (v.tolist() if hasattr(v, "tolist") else v) for k, v in r.items()} for r in rows],
                      open(os.path.join(OUT, f"landmarks_{ver}_{tag}.json"), "w"), indent=1)
    json.dump(metrics, open(os.path.join(OUT, "metrics.json"), "w"), indent=1)


if __name__ == "__main__":
    main()
