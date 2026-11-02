import bpy
path=r'C:\Users\giaco\Downloads\girasoli_modificati.blend'
bpy.ops.wm.open_mainfile(filepath=path)
keep={'girasoli_009','girasoli_011'}
petals=bpy.data.objects.get('girasoli_009'); center=bpy.data.objects.get('girasoli_011')
# remove full flowers, duplicate parts, and stems
for o in list(bpy.data.objects):
    if o.type=='MESH' and o.name not in keep: bpy.data.objects.remove(o,do_unlink=True)
petals.name='GIRASOLE_petali_con_sede_calамita'
center.name='GIRASOLE_centro_copricalamita'
# center of the petal piece in XY; cut a rear-facing blind socket, 5.2 mm diameter
pts=[petals.matrix_world@v.co for v in petals.data.vertices]
x=sum(p.x for p in pts)/len(pts); y=sum(p.y for p in pts)/len(pts)
zmin=min(p.z for p in pts)
bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=2.6, depth=3.2, location=(x,y,zmin+1.4))
cutter=bpy.context.object; cutter.name='TEMP_sede_calамita'
mod=petals.modifiers.new('Sede calamita 5 mm sul retro','BOOLEAN'); mod.operation='DIFFERENCE'; mod.solver='EXACT'; mod.object=cutter
bpy.context.view_layer.objects.active=petals; bpy.ops.object.modifier_apply(modifier=mod.name)
bpy.data.objects.remove(cutter,do_unlink=True)
bpy.ops.wm.save_as_mainfile(filepath=path)
print('saved',path)
