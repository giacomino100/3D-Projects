import time, numpy as np
t0=time.time()
from reg import Model
m=Model("V8"); SF=m.SF; PF=m.PF; P=m.P
import cadquery as cq
from OCP.TColgp import TColgp_Array2OfPnt
from OCP.gp import gp_Pnt
from OCP.GeomAPI import GeomAPI_PointsToBSplineSurface
from OCP.GeomAbs import GeomAbs_C2
from OCP.BRepBuilderAPI import BRepBuilderAPI_MakeFace
ds, dy = 1.0, 0.5
ss = np.arange(-12.0, P.L + 12.0 + 1e-9, ds); ys = np.arange(-P.H - 6.0, 6.0 + 1e-9, dy)
S, Y = np.meshgrid(ss, ys, indexing="ij"); Z = SF.zf(S, Y); print("grid", round(time.time()-t0), flush=True)
TW = 24
faces = []
for i0 in range(0, len(ss) - 1, TW):
    i1 = min(i0 + TW, len(ss) - 1)
    arr = TColgp_Array2OfPnt(1, i1 - i0 + 1, 1, len(ys))
    for i in range(i0, i1 + 1):
        for j in range(len(ys)):
            arr.SetValue(i - i0 + 1, j + 1, gp_Pnt(float(ss[i]), float(ys[j]), float(Z[i, j])))
    surf = GeomAPI_PointsToBSplineSurface(arr, 3, 3, GeomAbs_C2, 0.01).Surface()
    faces.append(cq.Face(BRepBuilderAPI_MakeFace(surf, 1e-6).Face()))
print("tiles", len(faces), round(time.time()-t0), flush=True)
t=time.time()
prisms = [cq.Solid.extrudeLinear(f, cq.Vector(0, 0, P.T_SKIN)) for f in faces]
sl = prisms[0].fuse(*prisms[1:], glue=True).clean()
print("slab", sl.isValid(), len(sl.Solids()), round(sl.Volume()), round(time.time()-t,1), flush=True)
t=time.time(); ring=SF._ring_prism(PF.outer_wire(), PF.opening_wire())
sk=sl.intersect(ring); print("skin", sk.isValid(), round(sk.Volume()), round(time.time()-t,1), flush=True)
