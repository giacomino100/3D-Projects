"""V4 step 4: camera-matched overlays of a CAD version on the 4 selected exact-target photos."""
import json, os, sys, numpy as np, warnings
warnings.filterwarnings("ignore")
from reg import *
import lm as LM
import final_validation as FV
VER = sys.argv[1] if len(sys.argv) > 1 else "V3"
PACK = os.path.join(ROOT, "REFERENCE_PACK_V4", "analysis")
OUT = os.path.join(PACK, "overlays"); os.makedirs(OUT, exist_ok=True)
FV.SIDE["925_ccm_1"] = "front"
VIEWS = [("front_01", "925_alB_1", True), ("front_02", "925_ccm_1", True),
         ("oblique_01", "925_alA_1", False), ("oblique_02", "925_krik_0", False)]
STL = {v: [os.path.join(CAD, "exports", v, f"81A807925A_{v}_body.stl"), os.path.join(CAD, "exports", v, f"81A807925A_{v}_clips.stl")]
       for v in ("V3", "V4")}
model = Model(VER)
res = {}
for tag, name, frontal in VIEWS:
    ei, cam, m = FV.register(model, name, frontal)
    s = summary(m); res[tag] = dict(photo=name, f=float(cam[6]), **s)
    print(VER, tag, name, s, flush=True)
    np.save(os.path.join(OUT, f"cam_{VER}_{tag}.npy"), cam)
    overlay(ei, m, cam, STL[VER], os.path.join(OUT, f"OEM_vs_CAD_{tag}{'' if VER == 'V3' else '_V4'}.png"),
            f"OEM {name} ({tag}) vs CAD {VER} - camera matched (f={cam[6]:.0f}px)")
    json.dump({k: {kk: (vv.tolist() if hasattr(vv, 'tolist') else vv) for kk, vv in m[k].items()} for k in m},
              open(os.path.join(OUT, f"meas_{VER}_{tag}.json"), "w"))
    rows = LM.table(model, m, cam, PICKS_ := json.load(open("picks.json"))[name]["pts"], ei.W, ei.H, project)
    json.dump([{k: (v.tolist() if hasattr(v, "tolist") else v) for k, v in r.items()} for r in rows],
              open(os.path.join(OUT, f"landmarks_{VER}_{tag}.json"), "w"), indent=1)
json.dump(res, open(os.path.join(OUT, f"metrics_{VER}.json"), "w"), indent=1)
