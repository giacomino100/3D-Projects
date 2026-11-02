import bpy
bpy.ops.wm.read_factory_settings(use_empty=True)
def imp(path,name):
 bpy.ops.object.select_all(action='DESELECT'); bpy.ops.wm.stl_import(filepath=path); o=max(list(bpy.context.selected_objects),key=lambda x:x.dimensions.x*x.dimensions.y*x.dimensions.z); o.name=name; bpy.ops.object.select_all(action='DESELECT'); return o
def norm(o):
 vs=[v.co.copy() for v in o.data.vertices]; cx=(min(v.x for v in vs)+max(v.x for v in vs))/2; cy=(min(v.y for v in vs)+max(v.y for v in vs))/2
 for v in o.data.vertices: v.co.x-=cx; v.co.y-=cy
pet=imp(r'C:\Users\giaco\Documents\3D-Projects\fiori_blender_parts\girasoli_007.stl','GIRASOLE_petali_con_foro'); norm(pet)
cen=imp(r'C:\Users\giaco\Documents\3D-Projects\fiori_blender_parts\girasoli_008.stl','GIRASOLE_centro_copricalamita'); norm(cen)
z0=min(v.co.z for v in pet.data.vertices); top=max(v.co.z for v in pet.data.vertices); ct=max(v.co.z for v in cen.data.vertices)-min(v.co.z for v in cen.data.vertices); cz=min(v.co.z for v in cen.data.vertices); cen.location.z=top-cz+0.15
# clean separate, narrow stem; preserve a slim depth and rounded silhouette
bpy.ops.mesh.primitive_cube_add(location=(0,-39.5,z0+0.8),scale=(2.0,18,0.8)); stem=bpy.context.object; stem.name='GIRASOLE_gambo_separato'
bev=stem.modifiers.new('Forma arrotondata','BEVEL'); bev.width=1.6; bev.segments=5; bpy.context.view_layer.objects.active=stem; bpy.ops.object.modifier_apply(modifier=bev.name)
# enlarged magnet cavity in petal piece
bpy.ops.mesh.primitive_cylinder_add(vertices=64,radius=3.2,depth=3.8,location=(0,0,top-1.5)); cut=bpy.context.object
mod=pet.modifiers.new('Cavita calamita 6.4 mm','BOOLEAN'); mod.operation='DIFFERENCE'; mod.solver='EXACT'; mod.object=cut; bpy.context.view_layer.objects.active=pet; bpy.ops.object.modifier_apply(modifier=mod.name); bpy.data.objects.remove(cut,do_unlink=True)
bpy.ops.wm.save_as_mainfile(filepath=r'C:\Users\giaco\Downloads\girasoli_modificati.blend')
