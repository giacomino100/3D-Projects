import bpy
path=r'C:\Users\giaco\Downloads\girasoli_modificati.blend'
bpy.ops.wm.open_mainfile(filepath=path)
o=bpy.data.objects.get('GIRASOLE_petali_e_gambo')
if o:
    # Stem is the lower disconnected section of the joined mesh.
    verts=[v for v in o.data.vertices if v.co.y < -5.0]
    for v in verts: v.co.x *= 0.78
bpy.ops.wm.save_as_mainfile(filepath=path)
