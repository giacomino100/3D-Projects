import json, numpy as np, warnings, cv2; warnings.filterwarnings("ignore")
from fitlib import *
names=["corner_1","corner_2","corner_3","corner_4","corner_5","corner_6"]
Xo,Xi=model_curves(); phs={n:load_photo(n) for n in names}
prev=json.load(open("cams_v1.json"))
best=None
for f in (1200,1800,2500,3500,5000,7000):
    tot=[];cams={}
    for n in names:
        c,cost=fit_camera_fixed_f(phs[n],Xo,Xi,f,cam0=None if f==1200 and False else prev[n]["cam"])
        c2,cost2=fit_camera_fixed_f(phs[n],Xo,Xi,f,cam0=None) if cost>3 else (c,cost)
        if cost2<cost: c,cost=c2,cost2
        cams[n]=c.tolist(); tot.append(cost)
    print("f",f,"median per photo",np.round(tot,2),"sum",round(sum(tot),2))
    if best is None or sum(tot)<best[0]: best=(sum(tot),f,cams)
print("best f",best[1]); json.dump(dict(f=best[1],cams=best[2]),open("cams_v1_fixedf.json","w"),indent=1)
crops=[]
for n in names:
    c=np.array(best[2][n]); crops.append(draw_overlay(n,c,Xo,Xi,f"ov_v1_{n}.png","V1 (red/blue) vs photo (green)"))
W=1000; S=np.vstack([cv2.resize(c,(W,int(W*c.shape[0]/c.shape[1]))) for c in crops]); cv2.imwrite("ov_v1_sheet.jpg",S)
