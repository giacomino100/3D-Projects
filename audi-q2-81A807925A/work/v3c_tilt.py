"""Tab height h and tilt theta from the registered rear view 925_alB_2 (+ front check on 925_alB_1,
same physical sample). Tip(h, th) = B + h*(cos th * rear + sin th * outward), B = base on the lip back."""
import json, os, numpy as np, warnings
warnings.filterwarnings("ignore")
from scipy.optimize import least_squares
from reg import *
B = json.load(open("reg_out/v3c_clip_bases.json"))
TIPS = {"B_t1": (650, 765), "B_t2": (1150, 770), "B_t3": (1650, 758), "T_b2": (850, 985), "T_b3": (1560, 980)}
m = Model("V3"); LIP = 2.5 + 4.0
cam = np.load("reg_out/cam_V3_925_alB_2.npy"); W, H = 2560, 1917
camF = np.load("reg_out/cam_V3A_925_alB_1.npy")
out = {}
for tab, tip in TIPS.items():
    s = 0.5 * (B["925_alB_2"][tab]["s_centre"] + B["925_alA_4"][tab]["s_centre"])
    top = tab.startswith("T")
    o = m.o2; cand = o[(o[:, 1] > o[:, 1].mean()) if top else (o[:, 1] < o[:, 1].mean())]
    e = cand[np.argmin(np.abs(cand[:, 0] - s))]
    Bp = m.lift(e[None])[0]; Bp[2] += LIP
    outward = np.array([0, 1.0 if top else -1.0, 0]); rear = np.array([0, 0, 1.0])
    f = lambda v: project((Bp + v[0] * (np.cos(v[1]) * rear + np.sin(v[1]) * outward))[None], cam, W, H)[0] - np.array(tip, float)
    best = min((least_squares(f, [h0, t0], bounds=([2, -1.2], [30, 1.4])) for h0 in (8, 14) for t0 in (-0.5, 0.2, 0.8)), key=lambda r: r.cost)
    h, th = best.x
    tip3 = Bp + h * (np.cos(th) * rear + np.sin(th) * outward)
    # front-view check: is the tip outside the face outline in the frontal photo (would be visible)?
    uF = project(tip3[None], camF, 2560, 1917)[0]; uE = project(m.lift(e[None]), camF, 2560, 1917)[0]
    out[tab] = dict(s=round(s, 1), h_mm=round(float(h), 1), tilt_deg=round(float(np.degrees(th)), 1),
                    reproj_px=round(float(np.sqrt(2 * best.cost)), 1), tip_beyond_edge_in_front_px=round(float(np.dot(uF - uE, (uE - np.array([1280, 958])) / np.linalg.norm(uE - np.array([1280, 958])))), 1))
    print(tab, out[tab])
json.dump(out, open("reg_out/v3c_tilt.json", "w"), indent=1)
