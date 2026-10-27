"""Full-mesh silhouette validation (IoU) of V1 vs V2 on exact-target photos.

For each model and photo: camera initialised from the outer-curve fit, then refined
(Nelder-Mead on rvec, tvec, log f) to MAXIMISE the IoU between the rendered STL
silhouette (body + clips, i.e. including returns, lip and eyelets) and the photo
mask. Fair for oblique views of isolated parts, where returns/eyelets belong to the
silhouette. Output: docs/V2/validation/iou_*.png + iou_metrics.json
"""
import json, math, os, sys
import numpy as np, cv2, pyvista as pv
from scipy.optimize import minimize
import warnings; warnings.filterwarnings("ignore")
from fitlib import *
from fit_v2 import spline_curve

sys.path.insert(0, os.path.join(ROOT, "cad")); import parameters_v2 as P2
EXP = os.path.join(ROOT, "cad", "exports")
MESH = {"V1": pv.read(os.path.join(EXP, "81A807925A_V1.stl")),
        "V2": pv.read(os.path.join(EXP, "V2", "81A807925A_V2.stl"))}
Z1 = dict(ZDEF, crown=0.0)
Z2 = dict(sag=P2.Z_SAG_MAIN, u0=P2.X_WRAP_START, zw=P2.Z_WRAP_OUTER, p=P2.WRAP_EXP, pitch=P2.PITCH_DEG,
          twist=P2.TWIST_OUTER_DEG, crown=P2.CROWN, H=P2.H)
CURVES = {"V1": model_curves(Z1),
          "V2": (lift(spline_curve(np.array(P2.OUTER_CPS), 300), Z2), lift(spline_curve(np.array(P2.OPENING_CPS), 300), Z2))}
PHOTOS = [("925_krik_0", 0, True), ("925_pru_1_r", 180, False), ("corner_4", 0, True), ("corner_1", 0, True)]
SC = 0.5   # render at half resolution for speed


class Renderer:
    def __init__(self, mesh, W, H):
        self.W, self.H = int(W * SC), int(H * SC)
        self.pl = pv.Plotter(off_screen=True, window_size=(self.W, self.H))
        self.pl.set_background("black")
        self.pl.add_mesh(mesh, color="white", lighting=False)

    def mask(self, cam):
        rvec, tvec, f = cam[:3], cam[3:6], cam[6]
        R = cv2.Rodrigues(np.asarray(rvec, float))[0]
        C = -R.T @ np.asarray(tvec, float)
        fwd = R.T @ np.array([0, 0, 1.0]); up = -(R.T @ np.array([0, 1.0, 0]))
        c = self.pl.camera
        c.position = C; c.focal_point = C + fwd * 500.0; c.up = up
        c.view_angle = math.degrees(2 * math.atan(self.H / (2 * f * SC)))
        c.clipping_range = (1.0, 1e6)
        img = self.pl.screenshot(return_img=True)
        return (img[..., 0] > 127).astype(np.uint8)


def iou(a, b):
    i = np.logical_and(a, b).sum(); u = np.logical_or(a, b).sum()
    return i / max(u, 1)


def main():
    out = os.path.join(ROOT, "docs", "V2", "validation"); os.makedirs(out, exist_ok=True)
    rows = []
    for name, rot, keep_hole in PHOTOS:
        m = cv2.imread(os.path.join(ROOT, "work", f"mask_{name}.png"), 0)
        if not keep_hole:   # fill holes (opening not separable from background)
            cs, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
            m = np.zeros_like(m); cv2.drawContours(m, cs, -1, 255, -1)
        Hh, Ww = m.shape
        ms = cv2.resize(m, (int(Ww * SC), int(Hh * SC)), interpolation=cv2.INTER_NEAREST) > 127
        ph = load_photo(name)
        res = {}
        for ver in ("V1", "V2"):
            Xo, Xi = CURVES[ver]
            best = None
            for f in (1500.0, 3000.0, 7000.0):
                r = fit_camera_fixed_f(ph, Xo, Xi, f, None, use_hole=False)
                if r and (best is None or r[1] < best[1]):
                    best = r
            cam0 = best[0]
            R = Renderer(MESH[ver], Ww, Hh)
            fill = lambda mm: mm if keep_hole else cv2.morphologyEx(mm, cv2.MORPH_CLOSE, np.ones((25, 25), np.uint8))
            def cost(x):
                cam = np.r_[x[:6], math.exp(x[6])]
                return 1.0 - iou(fill(R.mask(cam)) > 0, ms)
            x0 = np.r_[cam0[:6], math.log(cam0[6])]
            steps = np.r_[0.02, 0.02, 0.02, 5.0, 5.0, 0.05 * abs(cam0[5]), 0.15]
            sim = np.vstack([x0] + [x0 + np.eye(7)[k] * steps[k] for k in range(7)])
            opt = minimize(cost, x0, method="Nelder-Mead", options=dict(initial_simplex=sim, maxfev=260, xatol=1e-4, fatol=1e-5))
            cam = np.r_[opt.x[:6], math.exp(opt.x[6])]
            rm = fill(R.mask(cam)) > 0
            res[ver] = dict(iou=round(1 - opt.fun, 4), cam=cam.tolist(), mask=rm)
            R.pl.close()
        rows.append(dict(photo=name, iou_v1=res["V1"]["iou"], iou_v2=res["V2"]["iou"],
                         delta=round(res["V2"]["iou"] - res["V1"]["iou"], 4)))
        print(rows[-1], flush=True)
        # visual: green = photo only, red = model only, white = both
        tiles = []
        for ver in ("V1", "V2"):
            rm = res[ver]["mask"]
            vis = np.zeros(ms.shape + (3,), np.uint8)
            vis[ms & rm] = (230, 230, 230); vis[ms & ~rm] = (0, 200, 0); vis[~ms & rm] = (0, 0, 255)
            ys, xs = np.where(ms | rm); pad = 15
            v = vis[max(0, ys.min() - pad):ys.max() + pad, max(0, xs.min() - pad):xs.max() + pad]
            v = cv2.resize(v, (900, int(900 * v.shape[0] / v.shape[1])), interpolation=cv2.INTER_NEAREST)
            cv2.putText(v, f"{name} {ver} IoU={res[ver]['iou']:.3f}  (green: photo only, red: CAD only)",
                        (6, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 0), 1)
            tiles.append(v)
        hh = max(t.shape[0] for t in tiles)
        tiles = [cv2.copyMakeBorder(t, 0, hh - t.shape[0], 0, 6, cv2.BORDER_CONSTANT, value=(255, 255, 255)) for t in tiles]
        cv2.imwrite(os.path.join(out, f"iou_{name}.png"), np.hstack(tiles))
    json.dump(rows, open(os.path.join(out, "iou_metrics.json"), "w"), indent=1)


if __name__ == "__main__":
    main()
