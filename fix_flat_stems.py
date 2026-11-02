import bpy, glob, os
from mathutils import Vector

def bounds(o):
    p=[o.matrix_world@v.co for v in o.data.vertices]
    return min(v.x for v in p),max(v.x for v in p),min(v.y for v in p),max(v.y for v in p)

for path,prefix in [(r'C:\Users\giaco\Downloads\girasoli_modificati.blend','girasoli'),(r'C:\Users\giaco\Downloads\tulipani_modificati.blend','tulipani')]:
    bpy.ops.wm.open_mainfile(filepath=path)
    old=[o for o in list(bpy.data.objects) if o.type=='MESH' and o.name.startswith(prefix+'_') and o.dimensions.z>40]
    for k,o in enumerate(old):
        # old objects already have their transformed position in the mesh; use its center as flower/stem anchor
        xmin,xmax,ymin,ymax=bounds(o); x=(xmin+xmax)/2; y=(ymin+ymax)/2
        bpy.ops.mesh.primitive_cube_add(location=(x,y-17,2.4), scale=(3.2,17,2.4))
        stem=bpy.context.object; stem.name=f'{prefix}_stelo_piano_{k+1:02d}'
        bev=stem.modifiers.new('Arrotondamento stelo','BEVEL'); bev.width=2.0; bev.segments=4
        bpy.context.view_layer.objects.active=stem; bpy.ops.object.modifier_apply(modifier=bev.name)
        bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=2.6, depth=3.2, location=(x,y-30,1.0))
        cutter=bpy.context.object; cutter.name='sede_calამita_temp'
        mod=stem.modifiers.new('Sede calamita 5mm','BOOLEAN'); mod.operation='DIFFERENCE'; mod.solver='EXACT'; mod.object=cutter
        bpy.context.view_layer.objects.active=stem; bpy.ops.object.modifier_apply(modifier=mod.name)
        bpy.data.objects.remove(cutter,do_unlink=True)
    for o in old: bpy.data.objects.remove(o,do_unlink=True)
    bpy.ops.wm.save_as_mainfile(filepath=path)
    print('saved',path)
