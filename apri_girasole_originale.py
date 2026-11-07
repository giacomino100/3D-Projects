import bpy,glob,os
bpy.ops.wm.read_factory_settings(use_empty=True)
for f in sorted(glob.glob(r'C:\Users\giaco\_sunflower_inspect_parts\*.stl')):
    bpy.ops.object.select_all(action='DESELECT'); bpy.ops.wm.stl_import(filepath=f)
    if bpy.context.selected_objects:
        o=bpy.context.selected_objects[0]; o.name=os.path.splitext(os.path.basename(f))[0]
bpy.ops.object.select_all(action='SELECT')
bpy.ops.wm.save_as_mainfile(filepath=r'C:\Users\giaco\Downloads\girasole_originale.blend')
