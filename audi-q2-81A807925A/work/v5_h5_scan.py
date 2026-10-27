import json, os, numpy as np, warnings
os.environ["Q2_VER"] = "V4"
warnings.filterwarnings("ignore")
from reg import *
from v3b import StationModel
import v3b_scan as VS
OV = os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis", "overlays")
sm = StationModel()
VIEWS = {"925_alA_1": "cam_V4_oblique_A", "925_krik_0": "cam_V4_oblique_B", "925_alB_2": "cam_V4_rear"}
out = {}
for n, c in VIEWS.items():
    cam0 = np.load(os.path.join(OV, f"{c}.npy")); out[n] = []
    for A in (10.0, 25.0, 40.0, 55.0):
        for u0 in (0.45, 0.60, 0.75):
            cost, cam, k = VS.cost(sm, VS.x_for(sm, A, u0), n, cam0, None)
            out[n].append(dict(A=A, u0=u0, cost=round(cost, 4), n=k)); print(n, A, u0, round(cost, 4), flush=True)
json.dump(out, open(os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis", "H5_wrap_scan_V4planform.json"), "w"), indent=1)
