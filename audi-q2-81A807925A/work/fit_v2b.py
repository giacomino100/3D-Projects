"""Stage A: planform fit (outer + opening splines, independent) with Z FIXED.
Stage B: Z-law scan (wrap amplitude, onset, exponent, sag) with planform fixed,
         cameras refitted for each candidate -> total multi-view cost.
Photos: corner_1,2,3,5,6 (corner_4 excluded: camera does not converge; corner_7
segmentation failed). Results -> fit_v2b.json
"""
import json, itertools, time
import numpy as np, warnings
from scipy.optimize import least_squares
warnings.filterwarnings("ignore")
from fitlib import *
from fit_v2 import spline_curve, resample_closed

NAMES = ["corner_1", "corner_2", "corner_3", "corner_5", "corner_6"]
F = 7000.0
N_O, N_I = 18, 14
ZFIX = dict(sag=4.0, u0=0.60, zw=28.0, p=2.2, pitch=6.0, twist=4.0, crown=1.0)


def stage_a(ph, cams0):
    o0 = resample_closed(PF.outline_polyline("outer", 1.0), N_O)
    i0 = resample_closed(PF.outline_polyline("opening", 1.0), N_I)
    i_tip = int(np.argmin(o0[:, 0] - 0.2 * o0[:, 1])); i_ext = int(np.argmax(o0[:, 0]))
    fixed = {2 * i_tip, 2 * i_tip + 1, 2 * i_ext}
    free = np.array([k for k in range(2 * N_O) if k not in fixed])

    def unpack(v):
        o = o0.copy(); o.flat[free] = v[:len(free)]
        k = len(free); op = v[k:k + 2 * N_I].reshape(N_I, 2); cams = v[k + 2 * N_I:].reshape(len(NAMES), 6)
        return o, op, cams

    def res(v):
        o, op, cams = unpack(v)
        Xo = lift(spline_curve(o), ZFIX); Xi = lift(spline_curve(op), ZFIX)
        r = [residuals(np.r_[cams[k], F], ph[n], Xo, Xi, True, 0.7, 250) for k, n in enumerate(NAMES)]
        for cp, cp0 in ((o, o0), (op, i0)):
            dd = np.roll(cp, -1, 0) - 2 * cp + np.roll(cp, 1, 0)
            r.append(0.25 * dd.ravel())
            r.append(0.04 * (cp - cp0).ravel())        # weak pull toward V1
        return np.concatenate(r)

    v0 = np.r_[o0.ravel()[free], i0.ravel(), np.concatenate([np.array(cams0[n])[:6] for n in NAMES])]
    sol = least_squares(res, v0, loss="soft_l1", f_scale=2.5, x_scale="jac", max_nfev=120, verbose=1)
    return unpack(sol.x)


def total_cost(ph, o, op, Z, cams):
    Xo = lift(spline_curve(o), Z); Xi = lift(spline_curve(op), Z)
    meds, newc = [], []
    for k, n in enumerate(NAMES):
        c, cost = fit_camera_fixed_f(ph[n], Xo, Xi, F, cam0=np.r_[cams[k], F])
        meds.append(float(np.mean(np.minimum(np.abs(residuals(c, ph[n], Xo, Xi, True)), 15.0))))
        newc.append(c[:6])
    return float(np.mean(meds)), meds, np.array(newc)


def main():
    t0 = time.time()
    ph = {n: load_photo(n) for n in NAMES}
    prev = json.load(open("fit_v2.json"))
    Xo1, Xi1 = model_curves(ZFIX)
    cams0 = {}
    for n in NAMES:
        c, _ = fit_camera_fixed_f(ph[n], Xo1, Xi1, F, cam0=prev["cams"][n])
        cams0[n] = c.tolist()
    v1 = {n: float(np.mean(np.minimum(np.abs(residuals(np.array(cams0[n]), ph[n], *model_curves(ZDEF), True)), 15)))
          for n in NAMES}
    o, op, cams = stage_a(ph, cams0)
    base, meds, cams = total_cost(ph, o, op, ZFIX, cams)
    print("stage A done", round(base, 3), np.round(meds, 2), "V1:", {k: round(v, 2) for k, v in v1.items()})
    scan = []
    for zw, u0, p in itertools.product((12.0, 20.0, 28.0, 36.0, 46.0), (0.30, 0.45, 0.60), (1.5, 2.2, 3.0)):
        Z = dict(ZFIX, zw=zw, u0=u0, p=p)
        c, m, _ = total_cost(ph, o, op, Z, cams)
        scan.append(dict(zw=zw, u0=u0, p=p, cost=c, per=m)); print("scan", zw, u0, p, round(c, 4))
    best = min(scan, key=lambda d: d["cost"])
    for sag in (0.0, 2.0, 4.0, 8.0):
        for crown in (0.0, 1.0, 2.0):
            Z = dict(ZFIX, zw=best["zw"], u0=best["u0"], p=best["p"], sag=sag, crown=crown)
            c, m, _ = total_cost(ph, o, op, Z, cams)
            scan.append(dict(zw=best["zw"], u0=best["u0"], p=best["p"], sag=sag, crown=crown, cost=c, per=m))
            print("scan sag/crown", sag, crown, round(c, 4))
    json.dump(dict(names=NAMES, F=F, ZFIX=ZFIX, outer_cps=o.tolist(), opening_cps=op.tolist(),
                   cams={n: np.r_[cams[k], F].tolist() for k, n in enumerate(NAMES)},
                   stageA_cost=base, stageA_per=meds, v1_per=v1, scan=scan,
                   seconds=round(time.time() - t0)), open("fit_v2b.json", "w"), indent=1)


if __name__ == "__main__":
    main()
