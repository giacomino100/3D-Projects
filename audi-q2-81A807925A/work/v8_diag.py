import numpy as np, cadquery as cq
from shapely.geometry import Polygon
from reg import Model, ROOT
import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
m=Model("V8"); SF=m.SF; PF=m.PF; P=m.P
sh=cq.Shape.importBrep(r"C:/Users/giaco/AppData/Local/Temp/claude/C--Users-giaco-Desktop-Karaoke-Studio-sorgente/4fb7b161-3232-4c71-abfb-284edf8751ad/scratchpad/v8_face.brep")
from OCP.BRep import BRep_Tool
from OCP.GeomAPI import GeomAPI_ProjectPointOnSurf
outer=Polygon(PF.spline_points("outer",6000)).buffer(0)
fig,ax=plt.subplots(3,1,figsize=(13,11))
for k,(off,col) in enumerate(((P.W_BEAD+1.0,"tab:red"),(P.W_BEAD+2.5,"tab:blue"))):
    ring=outer.buffer(-off).exterior
    pts=np.array([ring.interpolate(t).coords[0] for t in np.arange(0,ring.length,0.25)])
    sel=(pts[:,0]<140)&(pts[:,1]<-25)          # bottom flank at END A, incl. the slanted nose
    p=pts[sel]; p=p[np.argsort(p[:,0])]
    z_field=SF.recess_depth(p[:,0],p[:,1])
    ax[0].plot(p[:,0],z_field,".",ms=2,color=col,label=f"depth field, d={off}")
# surface vs zf at fine grid inside one tile and across seams
faces=sh.Faces(); seams=sorted({round(f.BoundingBox().xmin,2) for f in faces})
print("tile seams s:", seams)
ss=np.arange(10,140,0.1); y=-45.5
zf=SF.zf(ss,np.full_like(ss,y))
zs=[]
for s in ss:
    v=cq.Vertex.makeVertex(float(s),y,0.0)
    best=None
    for f in faces:
        bb=f.BoundingBox()
        if bb.xmin-1e-6<=s<=bb.xmax+1e-6:
            pr=GeomAPI_ProjectPointOnSurf(cq.Vector(s,y,50).toPnt(),BRep_Tool.Surface_s(f.wrapped))
            # vertical line intersection: use projection of a high point then refine with x,y
            q=pr.NearestPoint(); best=q.Z(); break
    zs.append(best)
zs=np.array(zs,float)
ax[1].plot(ss,zf,"k-",lw=.8,label="zf (target)"); ax[1].plot(ss,zs,"r-",lw=.6,label="surface (projection)")
ax[2].plot(ss,np.gradient(zf,ss),"k-",lw=.8,label="dz/ds target")
for s in seams:
    for a in ax[1:]: a.axvline(s,color="0.7",lw=.5)
for a in ax: a.legend(fontsize=7); a.grid(alpha=.3)
plt.tight_layout(); plt.savefig(ROOT+"/TERMINAL_REFINEMENT_V8/diag_ripple.png",dpi=90)
