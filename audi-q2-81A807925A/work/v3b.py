"""V3-B: Z curvature from oblique views of the exact part (XY planform frozen = V3-A).

Z law = station table S00..S11 (s_k, z_mid_k, pitch_k), PCHIP interpolation.
Gauge (unobservable rigid rotations absorbed by the cameras): z(S00) = 0,
z(S04) = prior, pitch(S04) = prior. Fitted: z at S01..S03, S05..S11 and pitch at
S00, S08, S11 (others interpolated linearly between these control stations).
Data: outer-edge silhouette (lip-aware: front edge or back of the 4 mm lip,
whichever projects further out) on oblique views. Opening edges NOT used in
obliques (deep walls visible through the opening).
Each oblique view is fitted ALONE and then JOINTLY -> agreement table.
"""
import json, os, sys, copy, numpy as np, warnings
warnings.filterwarnings("ignore")
from scipy.optimize import least_squares
from reg import *

HERE = os.path.dirname(os.path.abspath(__file__))
PICKS = json.load(open(os.path.join(HERE, "picks.json")))
OBLIQUE = ["925_alA_1", "925_krik_0", "925_alB_2"]
N_ST = 12
FREE_Z = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11]
PITCH_CTRL = [0, 4, 8, 11]          # pitch control stations; S04 fixed


class StationModel:
    """Wraps Model (XY from parameters_v3) with an editable station table."""
    def __init__(self):
        self.m = Model(os.environ.get("Q2_VER", "V3"))
        P = self.m.P; SF = self.m.SF
        self.s_k = np.linspace(0.0, P.L, N_ST)
        self.z0 = np.array([float(SF.zf(s, -P.H / 2)) for s in self.s_k])
        self.p0 = np.array([float(np.degrees(SF.pitch_rad(s))) for s in self.s_k])
        self.H = P.H; self.crown = getattr(P, "CROWN", 0.0); self.d_lip = P.T_SKIN + P.D_RET_OUTER

    def table(self, x):
        z = self.z0.copy(); z[FREE_Z] = x[:len(FREE_Z)]; z -= z[0]
        pc = self.p0[PITCH_CTRL].copy(); free_p = [0, 2, 3]
        pc[free_p] = x[len(FREE_Z):len(FREE_Z) + 3]
        p = np.interp(self.s_k, self.s_k[PITCH_CTRL], pc)
        return z, p

    def zf(self, s, y, x):
        from scipy.interpolate import PchipInterpolator
        z, p = self.table(x)
        v = np.clip(-y / self.H, 0, 1)
        return (PchipInterpolator(self.s_k, z)(s) + (y + self.H / 2) * np.tan(np.radians(np.interp(s, self.s_k, p)))
                - self.crown * 4 * v * (1 - v))

    def lift(self, sy, x, back=0.0):
        return np.c_[self.m.L - sy[:, 0], sy[:, 1], self.zf(sy[:, 0], sy[:, 1], x) + back]

    def x0(self):
        return np.r_[self.z0[FREE_Z] - self.z0[0], self.p0[PITCH_CTRL][[0, 2, 3]]]


def targets(sm, x, name, cam):
    """Measure outer edge targets with the current station model (patch the Model lift)."""
    ei = EdgeImage(os.path.join(REF, name + ".jpg"))
    sm.m.lift = lambda sy: sm.lift(sy, x)
    m = measure(sm.m, ei, cam, lip=sm.d_lip)
    d = m["outer"]; ok = np.isfinite(d["off_px"])
    t = d["uv"][ok] + d["off_px"][ok, None] * d["nimg"][ok]
    return ei, dict(sy=d["sy"][ok], t=t, n=d["nimg"][ok], ppm=d["ppm"][ok])


def residual_block(sm, x, cam, T, W, H):
    uf = project(sm.lift(T["sy"], x), cam, W, H)
    ub = project(sm.lift(T["sy"], x, back=sm.d_lip), cam, W, H)
    rf = np.sum((uf - T["t"]) * T["n"], axis=1); rb = np.sum((ub - T["t"]) * T["n"], axis=1)
    return np.maximum(rf, rb) / T["ppm"]          # mm, signed (outermost of front edge / lip back)


def fit(names, sm, cams, x_init, n_outer=3, prior_w=0.02):
    x = x_init.copy(); cams = {k: np.array(v, float) for k, v in cams.items()}
    for it in range(n_outer):
        T = {}; EI = {}
        for n in names:
            EI[n], T[n] = targets(sm, x, n, cams[n])
        nx = len(x)
        def res(v):
            xx = v[:nx]; r = []
            for k, n in enumerate(names):
                c = v[nx + 7 * k: nx + 7 * (k + 1)]
                r.append(residual_block(sm, xx, c, T[n], EI[n].W, EI[n].H))
            r.append(prior_w * (xx - sm.x0()))     # weak pull to V2 law (only matters where unobservable)
            return np.concatenate(r)
        v0 = np.r_[x, np.concatenate([cams[n] for n in names])]
        sol = least_squares(res, v0, loss="huber", f_scale=1.0, x_scale="jac", max_nfev=300)
        x = sol.x[:nx]
        for k, n in enumerate(names):
            cams[n] = sol.x[nx + 7 * k: nx + 7 * (k + 1)]
    # uncertainty (Gauss-Newton covariance on the last linearisation)
    J = sol.jac; r = sol.fun
    dof = max(1, len(r) - len(sol.x)); s2 = float(np.sum(r ** 2) / dof)
    try:
        cov = np.linalg.pinv(J.T @ J) * s2
        sig = np.sqrt(np.clip(np.diag(cov)[:len(x)], 0, None))
    except Exception:
        sig = np.full(len(x), np.nan)
    mae = float(np.mean(np.abs(r[:-len(x)])))
    return x, sig, cams, mae


def main():
    sm = StationModel()
    cams = {}
    for n in OBLIQUE:
        cams[n] = np.load(os.path.join(HERE, "reg_out", f"cam_V3A_{n}.npy"))
    x0 = sm.x0()
    out = {"s_k": sm.s_k.tolist(), "prior_z": (sm.z0 - sm.z0[0]).tolist(), "prior_pitch": sm.p0.tolist()}
    for n in OBLIQUE:
        x, sig, c, mae = fit([n], sm, {n: cams[n]}, x0)
        z, p = sm.table(x)
        out[n] = dict(z=z.tolist(), pitch=p.tolist(), sigma=sig.tolist(), mae_mm=mae)
        print(n, "MAE", round(mae, 3), "z", np.round(z, 1), "sig", np.round(sig[:len(FREE_Z)], 1), flush=True)
    x, sig, c, mae = fit(OBLIQUE, sm, cams, x0)
    z, p = sm.table(x)
    out["joint"] = dict(z=z.tolist(), pitch=p.tolist(), sigma=sig.tolist(), mae_mm=mae)
    print("joint MAE", round(mae, 3), "z", np.round(z, 1), "pitch", np.round(p, 1), flush=True)
    for n in OBLIQUE:
        np.save(os.path.join(HERE, "reg_out", f"cam_V3B_{n}.npy"), c[n])
    json.dump(out, open(os.path.join(HERE, "reg_out", "v3b_fit.json"), "w"), indent=1)


if __name__ == "__main__":
    main()
