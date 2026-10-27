import time, os
t0=time.time()
from reg import Model
m=Model("V8"); SF=m.SF; PF=m.PF; P=m.P
import cadquery as cq
C="C:/Users/giaco/AppData/Local/Temp/claude/C--Users-giaco-Desktop-Karaoke-Studio-sorgente/4fb7b161-3232-4c71-abfb-284edf8751ad/scratchpad/v8_face.brep"
if os.path.exists(C):
    SF._FACE = cq.Shape.importBrep(C)
f=SF._face_surface(); f.exportBrep(C); print("shell", round(time.time()-t0), flush=True)
t=time.time(); sl=SF.slab(0.0, P.T_SKIN); so=sl.Solids()[0]
print("slab", sl.ShapeType(), so.isValid(), round(so.Volume()), round(time.time()-t,1), flush=True)
ring=SF._ring_prism(PF.outer_wire(), PF.opening_wire())
A=cq.Face.makeFromWires(PF.outer_wire()).Area()-cq.Face.makeFromWires(PF.opening_wire()).Area()
t=time.time(); sk=so.intersect(ring); print("skin(solid)", sk.isValid(), round(sk.Volume()), "expected", round(A*P.T_SKIN), round(time.time()-t,1), flush=True)
t=time.time(); sk2=ring.intersect(so); print("skin(rev)", sk2.isValid(), round(sk2.Volume()), round(time.time()-t,1), flush=True)
