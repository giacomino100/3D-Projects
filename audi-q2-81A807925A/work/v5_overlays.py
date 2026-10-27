"""V5 step 2: camera-matched overlays of the CURRENT CAD (V4) on the exact-target set (no CAD edits)."""
import json, os, sys, numpy as np, warnings
warnings.filterwarnings("ignore")
from reg import *
import lm as LM
import final_validation as FV
VER = sys.argv[1] if len(sys.argv) > 1 else "V4"
only = sys.argv[2:] or None
OUT = os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis", "overlays"); os.makedirs(OUT, exist_ok=True)
FV.SIDE.update({"925_ccm_1": "front", "681_pa_1": "front"})
VIEWS = [("front_A", "925_alB_1", True), ("front_B", "925_ccm_1", True), ("front_C_assembly", "681_pa_1", True),
         ("oblique_A", "925_alA_1", False), ("oblique_B", "925_krik_0", False),
         ("rear", "925_alB_2", False), ("profile", "925_mp_2_hr", False)]
STL = [os.path.join(CAD, "exports", VER, f"81A807925A_{VER}_body.stl"), os.path.join(CAD, "exports", VER, f"81A807925A_{VER}_clips.stl")]
model = Model(VER)
mpath = os.path.join(OUT, f"metrics_{VER}.json")
res = json.load(open(mpath)) if os.path.exists(mpath) else {}
for tag, name, frontal in VIEWS:
    if only and tag not in only:
        continue
    ei, cam, m = FV.register(model, name, frontal)
    s = summary(m); res[tag] = dict(photo=name, f=float(cam[6]), **s)
    print(VER, tag, name, s, flush=True)
    np.save(os.path.join(OUT, f"cam_{VER}_{tag}.npy"), cam)
    overlay(ei, m, cam, STL, os.path.join(OUT, f"OEM_vs_{VER}_{tag}.png"), f"OEM {name} ({tag}) vs CAD {VER} - camera matched (f={cam[6]:.0f}px)")
    json.dump({k: {kk: (vv.tolist() if hasattr(vv, 'tolist') else vv) for kk, vv in m[k].items()} for k in m},
              open(os.path.join(OUT, f"meas_{VER}_{tag}.json"), "w"))
    json.dump(dict(cam=cam.tolist(), W=ei.W, H=ei.H), open(os.path.join(OUT, f"cam_{VER}_{tag}.json"), "w"))
    json.dump(res, open(mpath, "w"), indent=1)
