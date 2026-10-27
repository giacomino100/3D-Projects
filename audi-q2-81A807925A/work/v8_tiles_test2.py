import time, numpy as np
t0=time.time()
from reg import Model
m=Model("V8"); SF=m.SF; PF=m.PF; P=m.P
import cadquery as cq
from OCP.BRep import BRep_Tool
from OCP.Geom import Geom_BSplineSurface
from OCP.BRepBuilderAPI import BRepBuilderAPI_MakeFace, BRepBuilderAPI_Sewing
from OCP.BRepPrimAPI import BRepPrimAPI_MakePrism
from OCP.gp import gp_Vec
f=SF._face_surface(); print("face", round(time.time()-t0), flush=True)
s=Geom_BSplineSurface.DownCast(BRep_Tool.Surface_s(f.wrapped))
u0,u1,v0,v1 = s.Bounds()
n=20; us=np.linspace(u0,u1,n+1)
sew=BRepBuilderAPI_Sewing(1e-4)
for a,b in zip(us[:-1],us[1:]):
    c=Geom_BSplineSurface.DownCast(s.Copy()); c.Segment(a,b,v0,v1)
    sew.Add(BRepBuilderAPI_MakeFace(c,1e-6).Face())
sew.Perform(); sh=cq.Shape.cast(sew.SewedShape()); print("shell", sh.ShapeType(), len(sh.Faces()), round(time.time()-t0), flush=True)
t=time.time()
pr=cq.Shape.cast(BRepPrimAPI_MakePrism(sh.wrapped, gp_Vec(0,0,P.T_SKIN)).Shape()); print("prism", pr.ShapeType(), len(pr.Solids()), round(time.time()-t,1), flush=True)
sols=pr.Solids(); sl=sols[0].fuse(*sols[1:], glue=True).clean(); print("slab", sl.ShapeType(), len(sl.Solids()), sl.isValid(), round(sl.Volume()), round(time.time()-t,1), flush=True)
t=time.time(); ring=SF._ring_prism(PF.outer_wire(), PF.opening_wire())
sk=sl.intersect(ring); A=cq.Face.makeFromWires(PF.outer_wire()).Area()-cq.Face.makeFromWires(PF.opening_wire()).Area()
print("skin", sk.isValid(), round(sk.Volume()), "expected", round(A*P.T_SKIN), round(time.time()-t,1), flush=True)
