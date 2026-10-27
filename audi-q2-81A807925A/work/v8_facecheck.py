import time, numpy as np
t0=time.time()
from reg import Model
m=Model("V8"); SF=m.SF
import cadquery as cq
sh=SF._face_surface(); print("shell", sh.ShapeType(), len(sh.Faces()), round(time.time()-t0), flush=True)
bb=sh.BoundingBox(); print("bbox", round(bb.xmin,1), round(bb.xmax,1), round(bb.ymin,1), round(bb.ymax,1), round(bb.zmin,1), round(bb.zmax,1))
from OCP.BRepExtrema import BRepExtrema_DistShapeShape
err=[]
for s,y in [(60,-25),(60,-45),(140,-30),(250,-5),(250,-45),(385,-9),(20,-20),(470,-5),(100,-13.5)]:
    z=float(SF.zf(s,y)); v=cq.Vertex.makeVertex(s,y,z)
    d=BRepExtrema_DistShapeShape(v.wrapped, sh.wrapped); d.Perform(); err.append(d.Value())
print("max dev mm", round(max(err),4), [round(e,4) for e in err])
sh.exportBrep("C:/Users/giaco/AppData/Local/Temp/claude/C--Users-giaco-Desktop-Karaoke-Studio-sorgente/4fb7b161-3232-4c71-abfb-284edf8751ad/scratchpad/v8_face.brep")
print("area", round(sum(f.Area() for f in sh.Faces())))
