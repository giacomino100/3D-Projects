import bpy
from mathutils import Vector
def setup():
    for o in bpy.context.selected_objects: o.select_set(False)
    objs=[o for o in bpy.data.objects if o.type=='MESH']
    for o in objs: o.select_set(True)
    if objs: bpy.context.view_layer.objects.active=objs[0]
    for a in bpy.context.screen.areas:
        if a.type=='VIEW_3D':
            r=a.spaces.active.region_3d; r.view_location=Vector((0,0,2)); r.view_distance=85
    bpy.ops.wm.save_as_mainfile(filepath=r'C:\Users\giaco\Downloads\girasoli_modificati.blend')
    return None
bpy.app.timers.register(setup, first_interval=1.0)
