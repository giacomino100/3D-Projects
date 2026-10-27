"""V3-C: clip bases measured on two independent rear views (alB_2: Leo-b sample,
alA_4: spawplast sample). Cameras registered on the V3 (A+B) outline; each picked
base end (pixel on the lip where the tab leaves the edge) is mapped to the nearest
point of the projected lip-aware outline -> s. Output: s_start, s_end, width, centre."""
import json, os, numpy as np, warnings
warnings.filterwarnings("ignore")
from reg import *

PICKS = json.load(open("picks.json"))
BASES = {   # tab: (left end px, right end px) ; left = toward the inner tip in both rear photos
    "925_alB_2": {"B_t1": ((562, 800), (708, 800)), "B_t2": ((1063, 800), (1203, 800)), "B_t3": ((1540, 797), (1700, 797)),
                  "T_b1": ((290, 1000), (372, 1000)), "T_b2": ((795, 1003), (905, 1003)), "T_b3": ((1450, 1002), (1610, 1002))},
    "925_alA_4": {"B_t1": ((503, 782), (652, 782)), "B_t2": ((1025, 780), (1175, 780)), "B_t3": ((1525, 778), (1705, 785)),
                  "T_b1": ((245, 995), (385, 995)), "T_b2": ((735, 990), (880, 990)), "T_b3": ((1425, 990), (1600, 990)),
                  "C04": ((2140, 1000), (2400, 1060))},
}
LIP = 2.5 + 4.0


def main():
    model = Model("V3")
    res = {}
    for name, tabs in BASES.items():
        pk = PICKS[name]; ei = EdgeImage(os.path.join(REF, name + ".jpg"))
        c0, _ = init_camera_generic(model, pk["pts"], pk["curves"], ei.W, ei.H)
        cam = refine_camera(model, ei, c0, pk["pts"], iters=2, f_prior=c0[6], curves=pk["curves"], use_opening=False)
        np.save(os.path.join("reg_out", f"cam_V3_{name}.npy"), cam)
        sy = model.o2
        X = model.lift(sy); Xb = X.copy(); Xb[:, 2] += LIP
        U = np.vstack([project(X, cam, ei.W, ei.H), project(Xb, cam, ei.W, ei.H)]); S = np.r_[sy[:, 0], sy[:, 0]]
        Y = np.r_[sy[:, 1], sy[:, 1]]
        res[name] = {}
        for tab, (a, b) in tabs.items():
            out = []
            for p in (a, b):
                j = int(np.argmin(np.linalg.norm(U - np.array(p, float), axis=1)))
                out.append((float(S[j]), float(Y[j]), float(np.linalg.norm(U[j] - np.array(p, float)))))
            (s1, y1, e1), (s2, y2, e2) = out
            res[name][tab] = dict(s_start=round(min(s1, s2), 1), s_end=round(max(s1, s2), 1), width=round(abs(s2 - s1), 1),
                                  s_centre=round(0.5 * (s1 + s2), 1), edge_y=round(0.5 * (y1 + y2), 1),
                                  pick_to_edge_px=round(max(e1, e2), 1))
            print(name, tab, res[name][tab])
    json.dump(res, open(os.path.join("reg_out", "v3c_clip_bases.json"), "w"), indent=1)


if __name__ == "__main__":
    main()
