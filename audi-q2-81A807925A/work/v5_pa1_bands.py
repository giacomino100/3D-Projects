"""pa_1 (4th specimen): band widths from manual edge readings, back-projected with a camera fitted to
picks+curves on the current CAD. Compared with CAD and with alB_1 / ccm_1."""
import json, os, sys, numpy as np, warnings
warnings.filterwarnings("ignore")
from scipy.optimize import least_squares
from reg import *
VER = sys.argv[1] if len(sys.argv) > 1 else "V4"
pk = json.load(open("picks.json"))["681_pa_1"]
m = Model(VER); W, H = 1600, 1200
g = init_camera_generic(m, pk["pts"], pk["curves"], W, H, side="front")
cam, r = fit_from_picks(m, pk["pts"], pk["curves"], W, H, g[0])
print("pa_1 camera: rms px", round(float(np.sqrt(np.mean(r**2))), 2), "f", round(cam[6]), "side", camera_side(cam))
o, i = m.o2, m.i2; uo, ui = project(m.o3, cam, W, H), project(m.i3, cam, W, H)
def bp(u, ref, refuv):
    j = int(np.argmin(np.linalg.norm(refuv - u, axis=1)))
    f = lambda p: project(m.lift(np.array([p])), cam, W, H)[0] - u
    return least_squares(f, ref[j], x_scale=[10, 10]).x
out = []
for x, (a, b, c, d) in pk["manual_bands"].items():
    x = float(x)
    to = bp(np.array([x, a]), o, uo); ti = bp(np.array([x, b]), i, ui); bi = bp(np.array([x, c]), i, ui); bo = bp(np.array([x, d]), o, uo)
    s = float(np.mean([to[0], ti[0], bi[0], bo[0]]))
    def cad_edge(pts, up):
        cc = pts[(np.abs(pts[:, 0] - s) < 1.0)]; yc = pts[:, 1].mean(); cc = cc[(cc[:, 1] > yc) if up else (cc[:, 1] <= yc)]
        return float(cc[:, 1].max() if up else cc[:, 1].min())
    cad_up = cad_edge(o, True) - cad_edge(i, True); cad_lo = cad_edge(i, False) - cad_edge(o, False)
    out.append(dict(s=round(s, 1), pa1_upper=round(float(to[1] - ti[1]), 2), cad_upper=round(cad_up, 2),
                    pa1_lower=round(float(bi[1] - bo[1]), 2), cad_lower=round(cad_lo, 2),
                    pa1_height=round(float(to[1] - bo[1]), 2)))
    print(out[-1])
json.dump(dict(camera_rms_px=float(np.sqrt(np.mean(r**2))), f=float(cam[6]), stations=out),
          open(os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis", f"pa1_bands_{VER}.json"), "w"), indent=1)
