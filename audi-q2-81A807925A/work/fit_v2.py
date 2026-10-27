"""Joint silhouette fit (multi-view) of the 81A807925A shape on the installed photos.

Unknowns
  * outer outline  : closed periodic cubic spline, N_O control points (s, y)
  * opening outline: closed periodic cubic spline, N_I control points (s, y)  (independent!)
  * Z surface law  : sag, u0, zw, p, pitch, twist, crown
  * one camera per photo (rvec, tvec), shared fixed focal
Gauge: tip control point s fixed, outer-extreme control point s fixed (scale),
       tip y fixed. Result is rescaled so that the outline X extent = L (472 mm).
"""
import json, sys, time
import numpy as np, warnings
from scipy.interpolate import splprep, splev
from scipy.optimize import least_squares
warnings.filterwarnings("ignore")
from fitlib import *

NAMES = ["corner_1", "corner_2", "corner_3", "corner_4", "corner_5", "corner_6"]
F = 7000.0
N_O, N_I = 18, 14
ZKEYS = ["sag", "u0", "zw", "p", "pitch", "twist", "crown"]


def resample_closed(pts, n):
    d = np.r_[0, np.cumsum(np.linalg.norm(np.diff(np.vstack([pts, pts[:1]]), axis=0), axis=1))]
    t = np.linspace(0, d[-1], n, endpoint=False)
    return np.c_[np.interp(t, d, np.r_[pts[:, 0], pts[0, 0]]), np.interp(t, d, np.r_[pts[:, 1], pts[0, 1]])]


def spline_curve(cps, n=260):
    c = np.vstack([cps, cps[:1]])
    tck, _ = splprep([c[:, 0], c[:, 1]], s=0, per=True, k=3)
    x, y = splev(np.linspace(0, 1, n, endpoint=False), tck)
    return np.c_[x, y]


def unpack(v, ctx):
    i = 0
    Z = dict(zip(ZKEYS, v[i:i + 7])); i += 7
    o = ctx["o0"].copy()
    free = ctx["o_free"]
    o.flat[free] = v[i:i + len(free)]; i += len(free)
    op = v[i:i + 2 * N_I].reshape(N_I, 2); i += 2 * N_I
    cams = v[i:].reshape(len(NAMES), 6)
    return Z, o, op, cams


def all_res(v, ctx):
    Z, o, op, cams = unpack(v, ctx)
    Xo = lift(spline_curve(o), Z)
    Xi = lift(spline_curve(op), Z)
    r = []
    for k, n in enumerate(NAMES):
        r.append(residuals(np.r_[cams[k], F], ctx["ph"][n], Xo, Xi, True, 0.7, 250))
    # regularisation: control-point smoothness (second differences, mm) + weak Z priors
    for cp in (o, op):
        dd = np.roll(cp, -1, 0) - 2 * cp + np.roll(cp, 1, 0)
        r.append(0.15 * dd.ravel())
    r.append(np.array([(Z["u0"] - 0.6) * 2, (Z["p"] - 2.0) * 0.5, Z["twist"] * 0.1, Z["crown"] * 0.05]))
    return np.concatenate(r)


def main():
    t0 = time.time()
    ph = {n: load_photo(n) for n in NAMES}
    cams0 = json.load(open("cams_v1_fixedf.json"))
    o0 = resample_closed(PF.outline_polyline("outer", 1.0), N_O)
    op0 = resample_closed(PF.outline_polyline("opening", 1.0), N_I)
    i_tip = int(np.argmin(o0[:, 0] - 0.2 * o0[:, 1]))
    i_ext = int(np.argmax(o0[:, 0]))
    fixed = {2 * i_tip, 2 * i_tip + 1, 2 * i_ext}
    o_free = np.array([k for k in range(2 * N_O) if k not in fixed])
    ctx = dict(ph=ph, o0=o0, o_free=o_free)
    Xo, Xi = model_curves()
    cams = []
    for n in NAMES:   # refit cameras of the V1 model at F (multi-start for bad ones)
        c, cost = fit_camera_fixed_f(ph[n], Xo, Xi, F, cam0=cams0["cams"][n])
        if cost > 2.6:
            c2, cost2 = fit_camera_fixed_f(ph[n], Xo, Xi, F, cam0=None)
            if cost2 < cost:
                c, cost = c2, cost2
        cams.append(c[:6]); print("init cam", n, round(cost, 2))
    v0 = np.r_[[ZDEF[k] for k in ZKEYS], o0.ravel()[o_free], op0.ravel(), np.concatenate(cams)]
    lb = np.full_like(v0, -np.inf); ub = np.full_like(v0, np.inf)
    zlb = [0, 0.2, 0, 1.0, -15, -10, -3]; zub = [12, 0.9, 60, 4.0, 20, 15, 3]
    lb[:7], ub[:7] = zlb, zub
    v0[:7] = np.clip(v0[:7], np.array(zlb) + 1e-6, np.array(zub) - 1e-6)
    r0 = all_res(v0, ctx)
    print("start cost", round(float(np.median(np.abs(r0))), 3))
    res = least_squares(all_res, v0, args=(ctx,), bounds=(lb, ub), loss="soft_l1", f_scale=3.0,
                        x_scale="jac", max_nfev=60, verbose=1)
    Z, o, op, camsf = unpack(res.x, ctx)
    # per-photo medians V1 vs V2
    Xo1, Xi1 = model_curves()
    Xo2 = lift(spline_curve(o), Z); Xi2 = lift(spline_curve(op), Z)
    rep = {"Z": Z, "outer_cps": o.tolist(), "opening_cps": op.tolist(), "F": F, "cams": {}, "per_photo": {}}
    for k, n in enumerate(NAMES):
        c1, _ = fit_camera_fixed_f(ph[n], Xo1, Xi1, F, cam0=np.r_[camsf[k], F])
        m1 = float(np.median(residuals(c1, ph[n], Xo1, Xi1, True)))
        m2 = float(np.median(residuals(np.r_[camsf[k], F], ph[n], Xo2, Xi2, True)))
        rep["cams"][n] = np.r_[camsf[k], F].tolist(); rep["cams_v1"] = rep.get("cams_v1", {}); rep["cams_v1"][n] = c1.tolist()
        rep["per_photo"][n] = dict(v1_median_px=round(m1, 2), v2_median_px=round(m2, 2))
        print(n, rep["per_photo"][n])
    rep["seconds"] = round(time.time() - t0)
    json.dump(rep, open("fit_v2.json", "w"), indent=1)
    print("Z", {k: round(float(v), 3) for k, v in Z.items()})


if __name__ == "__main__":
    main()
