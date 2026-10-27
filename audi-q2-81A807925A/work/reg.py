"""Photo registration / geometric validation toolkit (V3 phase).

Model side (any version): outer + opening outlines of the visible face, lifted on
the face surface, in the right-handed CAD frame (X = L - s, Y up, Z rearward).
Photo side: the ORIGINAL image (no segmentation). Measurement = edge search along
the projected normal of every CAD contour sample (gradient peak nearest to the
prediction), giving a signed deviation in px and mm:
    + : OEM edge lies OUTSIDE the CAD contour (outer: part larger; opening: opening larger)
Camera: pinhole (rvec, tvec, f), principal point at the image centre; initialised
from 4 hand-picked extreme landmarks (P01, P09, P03, P16), refined on the edges.
"""
import importlib, json, math, os, sys
import numpy as np, cv2
from scipy.optimize import least_squares

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CAD = os.path.join(ROOT, "cad")
sys.path.insert(0, CAD)
REF = os.path.join(ROOT, "docs", "reference_images")


# ----------------------------------------------------------------------------- model
class Model:
    def __init__(self, version="V2", params=None):
        import parameters as P1
        if params is not None:
            mod = params
        elif version == "V2":
            import parameters_v2 as mod
        elif version in ("V3", "V4", "V5", "V6", "V7", "V8"):
            mod = importlib.import_module("parameters_" + version.lower())
            importlib.reload(mod)
        elif version == "V1":
            mod = P1
        else:
            raise ValueError(version)
        sys.modules["parameters"] = mod
        from geometry import planform, surface
        importlib.reload(planform); importlib.reload(surface)
        self.P, self.PF, self.SF, self.version = mod, planform, surface, version
        self.L = mod.L
        self.o2 = planform.outline_polyline("outer", 1.0)
        self.i2 = planform.outline_polyline("opening", 1.0)
        self.o3 = self.lift(self.o2); self.i3 = self.lift(self.i2)

    def lift(self, sy):
        s, y = sy[:, 0], sy[:, 1]
        return np.c_[self.L - s, y, self.SF.zf(s, y)]

    def landmarks_extreme(self):
        o, i = self.o2, self.i2
        return {"P01": o[np.argmin(o[:, 0])], "P09": o[np.argmax(o[:, 0])],
                "P03": i[np.argmin(i[:, 0])], "P16": i[np.argmax(i[:, 0])]}

    def normals2d(self, sy):
        t = np.roll(sy, -1, 0) - np.roll(sy, 1, 0)
        n = np.c_[t[:, 1], -t[:, 0]]; n /= np.linalg.norm(n, axis=1)[:, None]
        c = sy.mean(axis=0)
        flip = np.sum(n * (sy - c), axis=1) < 0
        n[flip] *= -1
        return n                     # outward from the contour's own centroid


# ----------------------------------------------------------------------------- camera
def K_of(f, W, H):
    return np.array([[f, 0, W / 2], [0, f, H / 2], [0, 0, 1.0]])


def project(X, cam, W, H):
    uv, _ = cv2.projectPoints(np.asarray(X, np.float64), cam[:3], cam[3:6], K_of(cam[6], W, H), None)
    return uv[:, 0, :]


def _curve_res(model, cam, curves, W, H):
    r = []
    for x, y, which in curves:
        poly = project(model.o3 if which == "outer" else model.i3, cam, W, H)
        r.append(np.min(np.linalg.norm(poly - np.array([x, y]), axis=1)))
    return np.array(r)


def fit_from_picks(model, picks, curves, W, H, cam0):
    lm = model.landmarks_extreme()
    keys = [k for k in picks if k in lm]
    X = model.lift(np.array([lm[k] for k in keys])); x = np.array([picks[k] for k in keys], float)
    def res(c):
        return np.r_[(project(X, c, W, H) - x).ravel(), _curve_res(model, c, curves, W, H)]
    lb = np.r_[[-np.inf] * 6, 0.5 * W]; ub = np.r_[[np.inf] * 6, 20 * W]
    c0 = np.array(cam0, float); c0[6] = np.clip(c0[6], lb[6] * 1.01, ub[6] * 0.99)
    sol = least_squares(res, c0, x_scale="jac", max_nfev=400, bounds=(lb, ub))
    return sol.x, res(sol.x)


def camera_side(cam):
    """'front' if the camera centre is in front of the part (z < 0, Z is rearward), else 'back'."""
    R = cv2.Rodrigues(np.asarray(cam[:3], float))[0]
    C = -R.T @ np.asarray(cam[3:6], float)
    return "front" if C[2] < 0 else "back"


def init_camera_generic(model, picks, curves, W, H, side=None):
    """Try front/rear x 4 rolls x 3 tilts, fit picks+curves, keep best (optionally only one side)."""
    C = np.array([model.L / 2, -25.0, 0.0]); best = None
    sides = (False, True) if side is None else ((False,) if side == "front" else (True,))
    for f in (1.0 * W, 1.5 * W, 3.0 * W):
        for back in sides:
            for roll in (0, 90, 180, 270):
                Rf = np.array([[-1, 0, 0], [0, -1, 0], [0, 0, 1.0]]) if not back else np.array([[1, 0, 0], [0, -1, 0], [0, 0, -1.0]])
                Rr = cv2.Rodrigues(np.array([0, 0, math.radians(roll)]))[0]
                R = Rr @ Rf
                d = f * model.L / (0.9 * W)
                fwd = R.T @ np.array([0, 0, 1.0]); Cc = C - fwd * d
                cam = np.r_[cv2.Rodrigues(R)[0].ravel(), -R @ Cc, f]
                try:
                    c2, r = fit_from_picks(model, picks, curves, W, H, cam)
                except Exception:
                    continue
                if side is not None and camera_side(c2) != side:
                    continue
                e = float(np.sqrt(np.mean(r ** 2)))
                if best is None or e < best[1]:
                    best = (c2, e)
    return best


def init_camera(model, picks, W, H, f_list=None):
    lm = model.landmarks_extreme()
    keys = [k for k in ("P01", "P09", "P03", "P16") if k in picks]
    X = model.lift(np.array([lm[k] for k in keys]))
    x = np.array([picks[k] for k in keys], float)
    best = None
    for f in (f_list or [0.7 * W, 1.0 * W, 1.5 * W, 2.5 * W, 4 * W]):
        ok, rv, tv = cv2.solvePnP(X, x, K_of(f, W, H), None, flags=cv2.SOLVEPNP_SQPNP)
        if not ok:
            continue
        cam = np.r_[rv.ravel(), tv.ravel(), f]
        e = np.linalg.norm(project(X, cam, W, H) - x, axis=1).mean()
        if best is None or e < best[1]:
            best = (cam, e)
    return best


# ----------------------------------------------------------------------------- edges
class EdgeImage:
    def __init__(self, path, sigma=1.2):
        im = cv2.imread(path)
        self.H, self.W = im.shape[:2]
        g = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY).astype(np.float32)
        lab = cv2.cvtColor(im, cv2.COLOR_BGR2LAB).astype(np.float32)
        self.g = cv2.GaussianBlur(g, (0, 0), sigma)
        self.lab = [cv2.GaussianBlur(lab[..., k], (0, 0), sigma) for k in range(3)]
        self.img = im
        b = np.concatenate([lab[:40, :].reshape(-1, 3), lab[-40:, :].reshape(-1, 3),
                            lab[:, :40].reshape(-1, 3), lab[:, -40:].reshape(-1, 3)])
        self.bg = np.median(b, axis=0)
        self.bg_tol = max(6.0, 2.5 * np.median(np.linalg.norm(b - self.bg, axis=1)))

    def profile(self, p, n, R, step=0.5):
        ts = np.arange(-R, R + step, step)
        pts = p[None, :] + ts[:, None] * n[None, :]
        mx = pts[:, 0].astype(np.float32); my = pts[:, 1].astype(np.float32)
        vals = [cv2.remap(ch, mx.reshape(1, -1), my.reshape(1, -1), cv2.INTER_LINEAR).ravel() for ch in self.lab]
        return ts, np.stack(vals, 1)

    def search(self, p, n, R, rel=0.25, bg_side=+1, use_bg=True):
        """Edge nearest to 0 along n. bg_side=+1: background expected on the +n side
        (outer contour), -1 for the opening (background seen through the hole).
        Returns (offset_px, strength) or (nan, 0)."""
        if not (R + 8 < p[0] < self.W - R - 8 and R + 8 < p[1] < self.H - R - 8):
            return np.nan, 0.0
        ts, v = self.profile(p, n, R + 6)
        d = np.linalg.norm(np.gradient(v, axis=0), axis=1) / 0.5
        inner = np.abs(ts) <= R
        if d[inner].max() < 2.0:
            return np.nan, 0.0
        thr = rel * d[inner].max()
        peaks = [k for k in range(2, len(d) - 2) if inner[k] and d[k] >= thr and d[k] >= d[k - 1] and d[k] >= d[k + 1]]
        if not peaks:
            return np.nan, 0.0
        if use_bg:
            def bgness(k, side):
                kk = int(np.clip(k + side * 6, 0, len(ts) - 1))     # 3 px away
                return np.linalg.norm(v[kk] - self.bg) < self.bg_tol
            good = [k for k in peaks if bgness(k, bg_side) and not bgness(k, -bg_side)]
            if good:
                peaks = good
            else:
                return np.nan, 0.0
        k = min(peaks, key=lambda k: abs(ts[k]))
        return float(ts[k]), float(d[k])


def px_per_mm(model, sy, n2, cam, W, H):
    a = project(model.lift(sy), cam, W, H)
    b = project(model.lift(sy + n2), cam, W, H)
    return a, b - a                # projected point, image displacement of +1 mm along 2D outward normal


def measure(model, ei, cam, R_mm=4.0, step=3, use_bg=True, lip=None):
    """lip (mm): if given, the CAD silhouette of the OUTER edge is the outermost (in the
    image) of the front-face edge and the back of the perimeter lip (front + lip mm)."""
    out = {}
    for name, sy in (("outer", model.o2[::step]), ("opening", model.i2[::step])):
        n2 = model.normals2d(model.o2 if name == "outer" else model.i2)[::step]
        uv, dv = px_per_mm(model, sy, n2, cam, ei.W, ei.H)
        ppm = np.linalg.norm(dv, axis=1); nimg = dv / ppm[:, None]
        if lip and name == "outer":
            X = model.lift(sy); X[:, 2] += lip
            ub = project(X, cam, ei.W, ei.H)
            shift = np.maximum(0.0, np.sum((ub - uv) * nimg, axis=1))
            uv = uv + shift[:, None] * nimg
        offs, st = [], []
        for k in range(len(sy)):
            o, s = ei.search(uv[k], nimg[k], max(6.0, R_mm * ppm[k]), bg_side=+1 if name == "outer" else -1,
                             use_bg=use_bg)
            offs.append(o); st.append(s)
        offs = np.array(offs); dev_mm = offs / ppm
        out[name] = dict(sy=sy, n2=n2, uv=uv, nimg=nimg, ppm=ppm, off_px=offs, dev_mm=dev_mm, strength=np.array(st))
    return out


def refine_camera(model, ei, cam0, picks=None, iters=3, w_pick=2.0, f_prior=None, curves=None, w_curve=2.0,
                  use_opening=True):
    cam = np.array(cam0, float)
    lm = model.landmarks_extreme()
    for _ in range(iters):
        m = measure(model, ei, cam)
        tgt = []
        for name in (("outer", "opening") if use_opening else ("outer",)):
            d = m[name]; ok = np.isfinite(d["off_px"])
            X3 = model.lift(d["sy"][ok])
            tgt.append((X3, d["uv"][ok] + d["off_px"][ok, None] * d["nimg"][ok], d["nimg"][ok]))
        def res(c):
            r = []
            for X3, t, nn in tgt:
                u = project(X3, c, ei.W, ei.H)
                r.append(np.sum((u - t) * nn, axis=1))        # point-to-line (normal) residual
            if picks:
                for k, v in picks.items():
                    u = project(model.lift(lm[k][None]), c, ei.W, ei.H)[0]
                    r.append(w_pick * (u - np.array(v)))
            if curves:
                r.append(w_curve * _curve_res(model, c, curves, ei.W, ei.H))
            if f_prior:
                r.append([5.0 * math.log(c[6] / f_prior)])
            return np.concatenate([np.atleast_1d(x) for x in r])
        lb = np.r_[[-np.inf] * 6, 0.5 * ei.W]; ub = np.r_[[np.inf] * 6, 20 * ei.W]
        cam[6] = np.clip(cam[6], lb[6] * 1.01, ub[6] * 0.99)
        sol = least_squares(res, cam, loss="huber", f_scale=3.0, x_scale="jac", max_nfev=200, bounds=(lb, ub))
        cam = sol.x
    return cam


# ----------------------------------------------------------------------------- render / overlay
def render_rgba(stl_paths, cam, W, H, scale=0.5):
    import pyvista as pv
    w, h = int(W * scale), int(H * scale)
    pl = pv.Plotter(off_screen=True, window_size=(w, h))
    pl.set_background("black")
    cols = [(0.80, 0.81, 0.84), (0.95, 0.5, 0.15)]
    for k, p in enumerate(stl_paths):
        pl.add_mesh(pv.read(p), color=cols[min(k, 1)], smooth_shading=True, specular=0.3)
    R = cv2.Rodrigues(np.asarray(cam[:3], float))[0]
    C = -R.T @ np.asarray(cam[3:6], float)
    fwd = R.T @ np.array([0, 0, 1.0]); up = -(R.T @ np.array([0, 1.0, 0]))
    c = pl.camera; c.position = C; c.focal_point = C + fwd * 500; c.up = up
    c.view_angle = math.degrees(2 * math.atan(h / (2 * cam[6] * scale))); c.clipping_range = (1, 1e6)
    img = pl.screenshot(return_img=True); pl.close()
    img = cv2.resize(img, (W, H), interpolation=cv2.INTER_LINEAR)
    mask = img.max(axis=2) > 8
    return img[..., ::-1], mask


def overlay(ei, m, cam, stl_paths, out_path, title, crop_pad=60, max_w=2400):
    img = ei.img.copy()
    rgb, mask = render_rgba(stl_paths, cam, ei.W, ei.H)
    blend = img.copy()
    blend[mask] = (0.5 * img[mask] + 0.5 * rgb[mask]).astype(np.uint8)
    # colored deviation along contours: CAD (blue/cyan) and OEM edge points colored by |dev|
    th = max(1, ei.W // 1200)
    for name, col in (("outer", (255, 160, 0)), ("opening", (255, 0, 255))):
        d = m[name]
        cv2.polylines(blend, [d["uv"].astype(np.int32).reshape(-1, 1, 2)], True, col, th)
        for k in range(len(d["uv"])):
            if not np.isfinite(d["off_px"][k]):
                continue
            p = d["uv"][k]; q = p + d["off_px"][k] * d["nimg"][k]
            e = abs(d["dev_mm"][k])
            c = (0, 200, 0) if e < 0.75 else ((0, 220, 255) if e < 1.5 else (0, 0, 255))
            cv2.line(blend, tuple(p.astype(int)), tuple(q.astype(int)), c, th)
            cv2.circle(blend, tuple(q.astype(int)), 2 * th, c, -1)
    ys, xs = np.where(mask)
    y0, y1 = max(0, ys.min() - crop_pad), min(ei.H, ys.max() + crop_pad)
    x0, x1 = max(0, xs.min() - crop_pad), min(ei.W, xs.max() + crop_pad)
    c = blend[y0:y1, x0:x1]
    if c.shape[1] > max_w:
        c = cv2.resize(c, (max_w, int(max_w * c.shape[0] / c.shape[1])))
    bar = np.full((70, c.shape[1], 3), 255, np.uint8)
    cv2.putText(bar, title, (8, 26), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 2)
    cv2.putText(bar, "50% CAD render over OEM photo | orange/magenta: CAD outer/opening edge | dots: measured OEM edge "
                     "(green <0.75 mm, yellow <1.5 mm, red >=1.5 mm)", (8, 56), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (60, 60, 60), 1)
    cv2.imwrite(out_path, np.vstack([bar, c]))


def summary(m):
    out = {}
    for name in ("outer", "opening"):
        d = m[name]["dev_mm"]; ok = np.isfinite(d)
        out[name] = dict(n=int(ok.sum()), coverage=round(float(ok.mean()), 3),
                         mean=round(float(np.nanmean(d)), 2), mae=round(float(np.nanmean(np.abs(d))), 2),
                         p90=round(float(np.nanpercentile(np.abs(d), 90)), 2))
    return out
