import bpy
path=r'C:\Users\giaco\Downloads\girasoli_modificati.blend'
bpy.ops.wm.open_mainfile(filepath=path)
objs=[o for o in bpy.data.objects if o.type=='MESH']
if objs:
    p=[objs[0].matrix_world@v.co for v in objs[0].data.vertices]
    cx=sum(v.x for v in p)/len(p); cy=sum(v.y for v in p)/len(p)
    for o in objs: o.location.x-=cx; o.location.y-=cy; o.select_set(True)
    bpy.context.view_layer.objects.active=objs[0]
bpy.ops.wm.save_as_mainfile(filepath=path)
