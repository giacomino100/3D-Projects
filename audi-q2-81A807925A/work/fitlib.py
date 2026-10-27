"""Silhouette-based camera / shape fitting against exact-target photos.

Model curves = planform outlines (outer, opening) lifted onto the visible surface
z = zf(s, y; Zparams), converted to the right-handed CAD frame X = L - s.
Camera = pinhole (rvec, tvec, f), principal point at image centre, no distortion.
Residuals = symmetric chamfer distance (model->photo via distance transform,
photo->model via KD-tree), in pixels.
"""
import json, math, os, sys
import numpy as np, cv2
from scipy.optimize import least_squares
from scipy.spatial import cKDTree

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "cad"))
import parameters as P  # noqa
from geometry import planform as PF  # noqa

ZDEF = dict(sag=P.Z_SAG_MAIN, u0=P.X_WRAP_START, zw=P.Z_WRAP_OUTER, p=P.WRAP_EXP,
            pitch=P.PITCH_DEG, twist=P.TWIST_OUTER_DEG, crown=0.0)


def zf(s, y, Z):
    Hh = Z.get("H", P.H)
    u = np.clip(s / P.L, -0.1, 1.1)
    w = np.clip((u - Z["u0"]) / (1 - Z["u0"]), 0, None)
    pitch = np.radians(Z["pitch"] + Z["twist"] * np.clip(w, 0, 1))
    v = np.clip(-y / Hh, 0, 1)
    z = (-Z["sag"] * 4 * u * (1 - u) + Z["zw"] * w ** Z["p"] + (y + Hh / 2) * np.tan(pitch)
         - Z["crown"] * 4 * v * (1 - v))
    z0 = (Hh / 2) * math.tan(math.radians(Z["pitch"]))
    return z - z0


def lift(sy, Z):
    s, y = sy[:, 0], sy[:, 1]
    return np.c_[P.L - s, y, zf(s, y, Z)]


def model_curves(Z=ZDEF, outer=None, opening=None):
    o = PF.outline_polyline("outer", 2.0) if outer is None else outer
    i = PF.outline_polyline("opening", 2.0) if opening is None else opening
    return lift(o, Z), lift(i, Z)


def load_photo(name):
    m = cv2.imread(os.path.join(ROOT, "work", f"mask_{name}.png"), 0)
    cs, hier = cv2.findContours(m, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    hier = hier[0]
    outer = max([c for c, h in zip(cs, hier) if h[3] < 0], key=cv2.contourArea)[:, 0, :].astype(float)
    holes = [c for c, h in zip(cs, hier) if h[3] >= 0]
    hole = max(holes, key=cv2.contourArea)[:, 0, :].astype(float) if holes else None
    H, W = m.shape
    def dt(pts):
        img = np.full((H, W), 255, np.uint8)
        cv2.polylines(img, [pts.astype(np.int32).reshape(-1, 1, 2)], True, 0, 1)
        return cv2.distanceTransform(img, cv2.DIST_L2, 5)
    return dict(name=name, W=W, H=H, outer=outer, hole=hole, dt_outer=dt(outer),
                dt_hole=dt(hole) if hole is not None else None,
                kd_outer=cKDTree(outer), kd_hole=cKDTree(hole) if hole is not None else None)


def project(X, cam, W, H):
    rvec, tvec, f = cam[:3], cam[3:6], cam[6]
    K = np.array([[f, 0, W / 2], [0, f, H / 2], [0, 0, 1.0]])
    uv, _ = cv2.projectPoints(X.astype(np.float64), rvec, tvec, K, None)
    return uv[:, 0, :]


def _sample(dtimg, uv):
    H, W = dtimg.shape
    x = np.clip(uv[:, 0], 0, W - 1.001); y = np.clip(uv[:, 1], 0, H - 1.001)
    x0 = x.astype(int); y0 = y.astype(int); fx = x - x0; fy = y - y0
    d = (dtimg[y0, x0] * (1 - fx) * (1 - fy) + dtimg[y0, x0 + 1] * fx * (1 - fy)
         + dtimg[y0 + 1, x0] * (1 - fx) * fy + dtimg[y0 + 1, x0 + 1] * fx * fy)
    out = (uv[:, 0] < 0) | (uv[:, 0] > W) | (uv[:, 1] < 0) | (uv[:, 1] > H)
    return np.where(out, 200.0, d)


def residuals(cam, ph, Xo, Xi, use_hole=True, w_hole=0.6, nsub=400):
    uo = project(Xo, cam, ph["W"], ph["H"])
    r = [_sample(ph["dt_outer"], uo)]
    # photo -> model (subsampled)
    po = ph["outer"][:: max(1, len(ph["outer"]) // nsub)]
    r.append(cKDTree(uo).query(po)[0])
    if use_hole and ph["hole"] is not None:
        ui = project(Xi, cam, ph["W"], ph["H"])
        r.append(w_hole * _sample(ph["dt_hole"], ui))
        pi = ph["hole"][:: max(1, len(ph["hole"]) // nsub)]
        r.append(w_hole * cKDTree(ui).query(pi)[0])
    return np.concatenate(r)


def init_cams(ph, Xo):
    """Multi-start initial cameras around a frontal view."""
    W, H = ph["W"], ph["H"]
    x, y, w, h = cv2.boundingRect(ph["outer"].astype(np.int32))
    f = 1.4 * W
    d = f * P.L / max(w, 1)
    C = np.array([P.L / 2, -P.H / 2, 0.0])
    starts = []
    for yaw in (-35, -20, -8, 0, 8, 20, 35):
        for pitch in (-30, -15, 0, 15):
            Rf = np.array([[-1, 0, 0], [0, -1, 0], [0, 0, 1.0]])  # front view
            ry = cv2.Rodrigues(np.array([0, math.radians(yaw), 0.0]))[0]
            rx = cv2.Rodrigues(np.array([math.radians(pitch), 0, 0.0]))[0]
            R = rx @ ry @ Rf
            # camera centre: along -Z_cam axis from C
            fwd = R.T @ np.array([0, 0, 1.0])
            Cc = C - fwd * d
            t = -R @ Cc
            rvec = cv2.Rodrigues(R)[0].ravel()
            cam = np.r_[rvec, t, f]
            # align bbox centre: shift t in image plane
            uv = project(Xo, cam, W, H)
            du = (x + w / 2) - uv[:, 0].mean(); dv = (y + h / 2) - uv[:, 1].mean()
            cam[3] += du * d / f; cam[4] += dv * d / f
            starts.append(cam)
    return starts


def fit_camera(ph, Xo, Xi, cam0=None, use_hole=False):
    best = None
    starts = [cam0] if cam0 is not None else init_cams(ph, Xo)
    for c0 in starts:
        try:
            res = least_squares(lambda c: residuals(c, ph, Xo, Xi, use_hole), c0, loss="soft_l1",
                                f_scale=4.0, x_scale="jac", max_nfev=300)
        except Exception:
            continue
        cost = np.median(np.abs(residuals(res.x, ph, Xo, Xi, use_hole)))
        if best is None or cost < best[1]:
            best = (res.x, cost)
    return best


def fit_camera_fixed_f(ph, Xo, Xi, f, cam0=None, use_hole=True):
    """Fit rvec,tvec with a fixed focal length; multi-start if cam0 is None."""
    starts = [cam0] if cam0 is not None else init_cams(ph, Xo)
    best = None
    for c0 in starts:
        c0 = np.array(c0, float).copy()
        # rescale distance to the new focal
        if c0[6] > 0:
            c0[3:6] *= f / c0[6]
        c0[6] = f
        fun = lambda c6: residuals(np.r_[c6, f], ph, Xo, Xi, use_hole)
        try:
            res = least_squares(fun, c0[:6], loss="soft_l1", f_scale=4.0, x_scale="jac", max_nfev=300)
        except Exception:
            continue
        cost = np.median(np.abs(fun(res.x)))
        if best is None or cost < best[1]:
            best = (np.r_[res.x, f], cost)
    return best


def draw_overlay(name, cam, Xo, Xi, path, label=""):
    im = cv2.imread(os.path.join(ROOT, "docs", "reference_images", f"{name}.jpg"))
    ph = load_photo(name)
    cv2.polylines(im, [ph["outer"].astype(np.int32).reshape(-1, 1, 2)], True, (0, 200, 0), 1)
    if ph["hole"] is not None:
        cv2.polylines(im, [ph["hole"].astype(np.int32).reshape(-1, 1, 2)], True, (0, 200, 0), 1)
    for X, col in ((Xo, (0, 0, 255)), (Xi, (255, 80, 0))):
        uv = project(X, cam, ph["W"], ph["H"])
        cv2.polylines(im, [uv.astype(np.int32).reshape(-1, 1, 2)], True, col, 2)
    x, y, w, h = cv2.boundingRect(ph["outer"].astype(np.int32)); pad = 60
    crop = im[max(0, y - pad):y + h + pad, max(0, x - pad):x + w + pad]
    cv2.putText(crop, f"{name} {label}", (8, 22), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 2)
    cv2.imwrite(path, crop)
    return crop
