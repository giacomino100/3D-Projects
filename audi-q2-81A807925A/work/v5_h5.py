"""H5 test: is the Z curvature compound (needs extra degrees of freedom) or is the 2-parameter wrap
law enough? Leave-one-view-out on independent oblique/rear views of different specimens.
  law2 : z = A*w^2.5 - sag             (A, u0)
  law4 : law2 + b1*g(s; 0.55L) + b2*g(s; 0.80L)   (two local bumps, sigma 0.08L)
Training: fit shape + cameras on 2 views; Test: camera-only refit on the held-out view, cost = mean |dev| mm."""
import json, os, sys, numpy as np, warnings
os.environ["Q2_VER"] = "V4"
warnings.filterwarnings("ignore")
from scipy.optimize import least_squares
from reg import *
from v3b import StationModel, targets, residual_block, FREE_Z
VIEWS = {"925_alA_1": "cam_V4_oblique_A", "925_krik_0": "cam_V4_oblique_B", "925_alB_2": "cam_V4_rear"}
OV = os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis", "overlays")
sm = StationModel(); L = sm.m.L; s = sm.s_k; u = s / L
def zvec(p, law):
    A, u0 = p[0], p[1]
    w = np.clip((u - u0) / (1 - u0), 0, None); z = A * w ** 2.5 - 4.0 * 4 * u * (1 - u)
    if law == 4:
        g = lambda c: np.exp(-0.5 * ((u - c) / 0.08) ** 2)
        z = z + p[2] * g(0.55) + p[3] * g(0.80)
    z = z - z[0]
    return np.r_[z[FREE_Z], sm.p0[[0, 8, 11]]]
def cams0():
    return {n: np.load(os.path.join(OV, f"{c}.npy")) for n, c in VIEWS.items()}
def fit(train, law, cams, p0):
    T, EI = {}, {}
    for n in train:
        EI[n], T[n] = targets(sm, zvec(p0, law), n, cams[n])
    npar = len(p0)
    def res(v):
        x = zvec(v[:npar], law); r = []
        for k, n in enumerate(train):
            r.append(residual_block(sm, x, v[npar + 7 * k: npar + 7 * (k + 1)], T[n], EI[n].W, EI[n].H))
        r.append(0.05 * np.r_[v[2:npar]] if npar > 2 else np.zeros(0))
        return np.concatenate(r)
    lb = [0, 0.2] + [-15] * (npar - 2); ub = [80, 0.9] + [15] * (npar - 2)
    v0 = np.r_[p0, np.concatenate([cams[n] for n in train])]
    LB = np.r_[lb, [-np.inf] * 7 * len(train)]; UB = np.r_[ub, [np.inf] * 7 * len(train)]
    for n_ in train:
        pass
    sol = least_squares(res, np.clip(v0, LB + 1e-6, UB - 1e-6), bounds=(LB, UB), loss="huber", f_scale=1.0, x_scale="jac", max_nfev=200)
    return sol.x[:npar]
def test(n, law, p, cam):
    x = zvec(p, law); cam = np.array(cam, float)
    for _ in range(2):
        ei, T = targets(sm, x, n, cam)
        f = lambda c: residual_block(sm, x, c, T, ei.W, ei.H)
        cam = least_squares(f, cam, loss="huber", f_scale=1.0, x_scale="jac", max_nfev=150).x
    r = residual_block(sm, x, cam, T, ei.W, ei.H)
    return float(np.mean(np.minimum(np.abs(r), 4.0)))
out = []
names = list(VIEWS)
for held in names:
    train = [n for n in names if n != held]
    cams = cams0()
    p2 = fit(train, 2, cams, np.array([40.0, 0.60]))
    p4 = fit(train, 4, cams, np.r_[p2, 0.0, 0.0])
    c2 = test(held, 2, p2, cams[held]); c4 = test(held, 4, p4, cams[held])
    out.append(dict(held_out=held, law2=p2.round(2).tolist(), law4=p4.round(2).tolist(), test_cost_law2=round(c2, 3), test_cost_law4=round(c4, 3)))
    print(out[-1], flush=True)
json.dump(out, open(os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis", "H5_leave_one_out.json"), "w"), indent=1)
