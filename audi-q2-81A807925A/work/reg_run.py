import json, sys, os, numpy as np, warnings; warnings.filterwarnings("ignore")
from reg import *
name, ver = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else "V2")
pk = json.load(open("picks.json"))[name]; picks, curves = pk["pts"], pk.get("curves", []); use_open = pk.get("use_opening", True)
model = Model(ver)
ei = EdgeImage(os.path.join(REF, name + ".jpg"))
cam0, e0 = init_camera(model, picks, ei.W, ei.H) if len(picks) >= 4 else init_camera_generic(model, picks, curves, ei.W, ei.H)
cam1, r1 = fit_from_picks(model, picks, curves, ei.W, ei.H, cam0)
print(name, ver, "init reproj px", round(e0, 2), "| picks+curves fit: rms px", round(float(np.sqrt(np.mean(r1**2))), 2), "f", round(cam1[6]))
cam = refine_camera(model, ei, cam1, picks, iters=2, f_prior=cam1[6], curves=curves, use_opening=use_open) if "--refine" in sys.argv else cam1
m = measure(model, ei, cam)
s = summary(m); print("summary", s, "f", round(cam[6]))
lm = model.landmarks_extreme()
for k, v in picks.items():
    u = project(model.lift(lm[k][None]), cam, ei.W, ei.H)[0]; print(k, "pick", v, "cad", u.round(1), "err px", round(float(np.linalg.norm(u - np.array(v))), 1))
exp = os.path.join(CAD, "exports", "V2" if ver == "V2" else os.environ.get("Q2_OUT", "V3"))
stls = [os.path.join(exp, f"81A807925A_{ver}_body.stl"), os.path.join(exp, f"81A807925A_{ver}_clips.stl")]
os.makedirs("reg_out", exist_ok=True)
overlay(ei, m, cam, stls, f"reg_out/{ver}_{name}.jpg", f"OEM {name} vs CAD {ver} - camera registered (f={cam[6]:.0f}px)")
np.save(f"reg_out/cam_{ver}_{name}.npy", cam)
json.dump({k: {kk: (vv.tolist() if hasattr(vv, "tolist") else vv) for kk, vv in m[k].items()} for k in m}, open(f"reg_out/meas_{ver}_{name}.json", "w"))
