import time, os
t0=time.time()
from reg import Model
m=Model("V8"); SF=m.SF; PF=m.PF; P=m.P
import cadquery as cq
C="C:/Users/giaco/AppData/Local/Temp/claude/C--Users-giaco-Desktop-Karaoke-Studio-sorgente/4fb7b161-3232-4c71-abfb-284edf8751ad/scratchpad/v8_face.brep"
sh=cq.Shape.importBrep(C)
ring=SF._ring_prism(PF.outer_wire(), PF.opening_wire())
A=cq.Face.makeFromWires(PF.outer_wire()).Area()-cq.Face.makeFromWires(PF.opening_wire()).Area()
pieces=[]
for k,f in enumerate(sh.Faces()):
    pr=cq.Solid.extrudeLinear(f, cq.Vector(0,0,P.T_SKIN))
    p=pr.intersect(ring)
    if p.Volume()>1: pieces.append(p)
    print(k, round(pr.Volume()), round(p.Volume()), round(time.time()-t0), flush=True)
sk=pieces[0].fuse(*pieces[1:], glue=True).clean()
print("skin", sk.isValid(), len(sk.Solids()), round(sk.Volume()), "expected", round(A*P.T_SKIN), round(time.time()-t0), flush=True)
