import bpy
src=r'C:\Users\giaco\Documents\3D-Projects\fiori_blender_parts\girasoli_007.stl'
src_center=r'C:\Users\giaco\Documents\3D-Projects\fiori_blender_parts\girasoli_008.stl'
out=r'C:\Users\giaco\Downloads\girasoli_modificati.blend'
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.wm.stl_import(filepath=src); petals=bpy.context.object; petals.name='GIRASOLE_petali_e_gambo'
bpy.ops.wm.stl_import(filepath=src_center); center=bpy.context.object; center.name='GIRASOLE_centro_copricalamita'
def bbox(o):
 p=[o.matrix_world@v.co for v in o.data.vertices]; return min(v.x for v in p),max(v.x for v in p),min(v.y for v in p),max(v.y for v in p),min(v.z for v in p),max(v.z for v in p)
ax,bx,ay,by,az,bz=bbox(petals); cx=(ax+bx)/2; cy=(ay+by)/2
petals.location.x-=cx; petals.location.y-=cy
ax,bx,ay,by,az,bz=bbox(petals); cx=(ax+bx)/2; cy=(ay+by)/2
u,v,w,q,cz0,cz1=bbox(center); center.location.x += cx-(u+v)/2; center.location.y += cy-(w+q)/2; center.location.z += (bz+0.15)-cz0
bpy.ops.mesh.primitive_cube_add(location=(0,-23,az+2.2), scale=(3.2,18,2.2)); stem=bpy.context.object
bev=stem.modifiers.new('Arrotondamento','BEVEL'); bev.width=2; bev.segments=5; bpy.context.view_layer.objects.active=stem; bpy.ops.object.modifier_apply(modifier=bev.name)
bpy.ops.mesh.primitive_cylinder_add(vertices=64,radius=2.6,depth=3.2,location=(0,0,az+1.2)); cut=bpy.context.object
mod=petals.modifiers.new('Foro calamita 5 mm sul retro','BOOLEAN'); mod.operation='DIFFERENCE'; mod.solver='EXACT'; mod.object=cut; bpy.context.view_layer.objects.active=petals; bpy.ops.object.modifier_apply(modifier=mod.name); bpy.data.objects.remove(cut,do_unlink=True)
petals.select_set(True); stem.select_set(True); bpy.context.view_layer.objects.active=petals; bpy.ops.object.join(); petals.name='GIRASOLE_petali_e_gambo'
bpy.ops.wm.save_as_mainfile(filepath=out); print('saved',out)
