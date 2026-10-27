"""Z wrap scan on the profile view 925_mp_2_hr using MANUAL silhouette readings
(floor texture defeats the automatic edge search). For each (A, u0): camera refit
on the readings; residual = distance from each reading to the projected outer
silhouette envelope (front edge U back of the 6.5 mm lip), px and mm."""
import json, os, numpy as np, warnings
warnings.filterwarnings("ignore")
from scipy.optimize import least_squares
from reg import *
from v3b import StationModel
from v3b_scan import x_for, A_GRID, U_GRID

L_READ = {1200: 395, 1100: 392, 900: 402, 800: 403, 700: 405, 500: 415, 420: 420, 360: 430, 300: 435, 250: 445, 200: 470, 160: 495, 125: 515}
R_READ = {1200: 532, 1100: 530, 900: 530, 800: 530, 700: 532, 500: 532, 420: 535, 360: 548, 300: 548, 250: 562, 200: 572, 160: 580}
P09 = (578.0, 77.0)
PTS = np.array([(x, y) for y, x in L_READ.items()] + [(x, y) for y, x in R_READ.items()], float)
W, H = 1080, 1440


def resid(sm, x, cam):
    sy = sm.m.o2[::2]
    uf = project(sm.lift(sy, x), cam, W, H); ub = project(sm.lift(sy, x, back=6.5), cam, W, H)
    U = np.vstack([uf, ub])
    from scipy.spatial import cKDTree
    d = cKDTree(U).query(PTS)[0]
    p9 = project(sm.lift(sm.m.o2[[np.argmax(sm.m.o2[:, 0])]], x), cam, W, H)[0]
    return np.r_[d, 0.5 * (p9 - np.array(P09))]


def main():
    sm = StationModel()
    cam0 = np.load(os.path.join("reg_out", "cam_V3A_925_mp_2_hr.npy"))
    out = []
    for A in A_GRID:
        for u0 in U_GRID:
            if A == 0.0 and u0 != U_GRID[0]:
                continue
            x = x_for(sm, A, u0)
            best = None
            for c0 in (cam0,):
                lb = np.r_[[-np.inf] * 6, 0.5 * W]; ub = np.r_[[np.inf] * 6, 20 * W]
                sol = least_squares(lambda c: resid(sm, x, c), c0, x_scale="jac", max_nfev=400, bounds=(lb, ub), loss="soft_l1", f_scale=3)
                r = resid(sm, x, sol.x)[:-2]
                best = (float(np.sqrt(np.mean(r ** 2))), sol.x)
            ppm = 1150 / 472.0
            out.append(dict(A=A, u0=u0, rms_px=best[0], rms_mm=best[0] / ppm))
            print("mp_2", A, u0, round(best[0], 2), "px", flush=True)
            cam0 = best[1]
    json.dump(out, open(os.path.join("reg_out", "v3b_mp2.json"), "w"), indent=1)


if __name__ == "__main__":
    main()
