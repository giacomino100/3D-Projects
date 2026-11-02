import bpy, glob, os
from mathutils import Vector

base=r'C:\Users\giaco\Documents\3D-Projects\fiori_blender_parts'
for prefix,out in [('girasoli',r'C:\Users\giaco\Downloads\girasoli_modificati.blend'),('tulipani',r'C:\Users\giaco\Downloads\tulipani_modificati.blend')]:
    bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
    files=sorted(glob.glob(os.path.join(base,prefix+'_*.stl')))
    for f in files:
        bpy.ops.wm.stl_import(filepath=f, use_scene_unit=False)
        if bpy.context.selected_objects:
            o=bpy.context.selected_objects[0]; o.name=os.path.splitext(os.path.basename(f))[0]
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.wm.save_as_mainfile(filepath=out)
    print('saved',out)
