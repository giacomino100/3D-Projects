import json, os, numpy as np, warnings
os.environ["Q2_VER"] = "V4"
warnings.filterwarnings("ignore")
from scipy.optimize import least_squares
from reg import *
from v3b import StationModel
import v3b_scan as VS
import v3b_mp2 as M2
OV = os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis", "overlays")
sm = StationModel(); M2.W, M2.H = 1080, 1440
VIEWS = {"925_alA_1": "cam_V4_oblique_A", "925_krik_0": "cam_V4_oblique_B", "925_alB_2": "cam_V4_rear"}
AS = [30.0, 35.0, 40.0, 45.0, 50.0, 55.0, 60.0, 65.0]
out = {n: [] for n in list(VIEWS) + ["925_mp_2_hr"]}
for n, c in VIEWS.items():
    cam = np.load(os.path.join(OV, f"{c}.npy"))
    for A in AS:
        cost, cam2, k = VS.cost(sm, VS.x_for(sm, A, 0.6), n, cam, None)
        out[n].append(dict(A=A, cost=round(cost, 4))); print(n, A, round(cost, 4), flush=True)
cam = np.load(os.path.join(ROOT, "work", "reg_out", "cam_V3A_925_mp_2_hr.npy"))
for A in AS:
    x = VS.x_for(sm, A, 0.6)
    lb = np.r_[[-np.inf] * 6, 0.5 * 1080]; ub = np.r_[[np.inf] * 6, 20 * 1080]
    sol = least_squares(lambda c: M2.resid(sm, x, c), cam, x_scale="jac", max_nfev=400, bounds=(lb, ub), loss="soft_l1", f_scale=3)
    r = M2.resid(sm, x, sol.x)[:-2]; cost = float(np.sqrt(np.mean(r ** 2))) / (1150 / 472.0)
    out["925_mp_2_hr"].append(dict(A=A, cost=round(cost, 4))); print("mp_2", A, round(cost, 4), flush=True)
json.dump(out, open(os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis", "H5_wrap_amplitude_scan.json"), "w"), indent=1)
