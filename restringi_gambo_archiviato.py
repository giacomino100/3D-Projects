import bpy
path=r'C:\Users\giaco\_codex_undo_2026-11-07\girasoli_modificati.blend'
bpy.ops.wm.open_mainfile(filepath=path)
o=bpy.data.objects.get('GIRASOLE_petali_e_gambo')
if o:
    for v in o.data.vertices:
        if v.co.y < -5.0: v.co.x *= 0.82
bpy.ops.wm.save_as_mainfile(filepath=path)
