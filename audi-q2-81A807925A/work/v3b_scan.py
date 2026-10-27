"""V3-B (low-dimensional): per-view cost maps of the wrap law, to test whether
independent oblique views AGREE on the Z curvature.
z_mid(s) = A * w^p,  w = max(0, (s/L - u0)/(1 - u0)),  p = 2.5,  sag 4 mm (V2), pitch V2.
For each (A, u0) and each view: re-measure edges (lip-aware) and refit the camera,
cost = mean |deviation| (mm) of the outer silhouette.
"""
import json, os, sys, numpy as np, warnings
warnings.filterwarnings("ignore")
from scipy.optimize import least_squares
from reg import *
from v3b import StationModel, targets, residual_block, FREE_Z, N_ST

HERE = os.path.dirname(os.path.abspath(__file__))
VIEWS = ["925_alA_1", "925_krik_0", "925_alB_2"]
A_GRID = [0.0, 10.0, 20.0, 30.0, 40.0, 55.0]
U_GRID = [0.30, 0.45, 0.60, 0.75]
P_EXP, SAG = 2.5, 4.0


def x_for(sm, A, u0):
    s = sm.s_k; u = s / sm.m.L
    w = np.clip((u - u0) / (1 - u0), 0, None)
    z = A * w ** P_EXP - SAG * 4 * u * (1 - u)
    z = z - z[0]
    return np.r_[z[FREE_Z], sm.p0[[0, 8, 11]]]


def cost(sm, x, name, cam, ei_cache):
    cam = np.array(cam, float)
    for _ in range(2):
        ei, T = targets(sm, x, name, cam)
        f = lambda c: residual_block(sm, x, c, T, ei.W, ei.H)
        lb = np.r_[[-np.inf] * 6, 0.5 * ei.W]; ub = np.r_[[np.inf] * 6, 20 * ei.W]
        cam[6] = np.clip(cam[6], lb[6] * 1.01, ub[6] * 0.99)
        cam = least_squares(f, cam, loss="huber", f_scale=1.0, x_scale="jac", max_nfev=150, bounds=(lb, ub)).x
    r = residual_block(sm, x, cam, T, ei.W, ei.H)
    return float(np.mean(np.minimum(np.abs(r), 4.0))), cam, len(r)


def main():
    sm = StationModel()
    res = {}
    for name in VIEWS:
        cam0 = np.load(os.path.join(HERE, "reg_out", f"cam_V3A_{name}.npy"))
        grid = []
        for A in A_GRID:
            for u0 in U_GRID:
                if A == 0.0 and u0 != U_GRID[0]:
                    continue
                c, cam, n = cost(sm, x_for(sm, A, u0), name, cam0, None)
                grid.append(dict(A=A, u0=u0, cost=c, n=n))
                print(name, A, u0, round(c, 4), n, flush=True)
        res[name] = grid
    json.dump(res, open(os.path.join(HERE, "reg_out", "v3b_scan.json"), "w"), indent=1)


if __name__ == "__main__":
    main()
