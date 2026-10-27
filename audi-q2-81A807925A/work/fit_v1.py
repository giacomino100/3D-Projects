import json, numpy as np, warnings; warnings.filterwarnings("ignore")
from fitlib import *
names=["corner_1","corner_2","corner_3","corner_4","corner_5","corner_6"]
Xo,Xi=model_curves()
out={}
for n in names:
    ph=load_photo(n)
    cam,cost=fit_camera(ph,Xo,Xi,use_hole=False)
    cam2,cost2=fit_camera(ph,Xo,Xi,cam0=cam,use_hole=True)
    r=residuals(cam2,ph,Xo,Xi,True)
    out[n]=dict(cam=cam2.tolist(), med_outer=float(np.median(residuals(cam2,ph,Xo,Xi,False))), med_all=float(np.median(r)), p90=float(np.percentile(r,90)))
    print(n, {k:round(v,2) for k,v in out[n].items() if k!="cam"}, "f=",round(cam2[6]))
json.dump(out,open("cams_v1.json","w"),indent=1)
