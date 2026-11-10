import bpy
import os
import sys
from mathutils import Vector

sys.path.insert(0,os.path.dirname(os.path.dirname(bpy.data.filepath)))
from correggi_fiori_verificati import configure_view

def show():
    direction=Vector((.2,-.25,1)).normalized()
    up=Vector((0,1,0))
    up=(up-direction*up.dot(direction)).normalized()
    configure_view(direction,up,Vector((0,-28,1.5)),34)
    return None

bpy.app.timers.register(show,first_interval=1)
