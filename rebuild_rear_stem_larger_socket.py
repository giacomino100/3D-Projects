import bpy
from mathutils import Vector
bpy.ops.wm.read_factory_settings(use_empty=True)
def imp(path,name):
 bpy.ops.object.select_all(action='DESELECT'); bpy.ops.wm.stl_import(filepath=path); o=max(list(bpy.context.selected_objects),key=lambda x:x.dimensions.x*x.dimensions.y*x.dimensions.z); o.name=name; bpy.ops.object.select_all(action='DESELECT'); return o
def norm(o):
 p=[v.co.copy() for v in o.data.vertices]; cx=(min(v.x for v in p)+max(v.x for v in p))/2; cy=(min(v.y for v in p)+max(v.y for v in p))/2
 for v in o.data.vertices: v.co.x-=cx; v.co.y-=cy
pet=imp(r'C:\Users\giaco\Documents\3D-Projects\fiori_blender_parts\girasoli_007.stl','GIRASOLE_petali_e_gambo'); norm(pet)
cen=imp(r'C:\Users\giaco\Documents\3D-Projects\fiori_blender_parts\girasoli_008.stl','GIRASOLE_centro_copricalamita'); norm(cen)
zmin=min(v.co.z for v in pet.data.vertices); zmax=max(v.co.z for v in pet.data.vertices); czmin=min(v.co.z for v in cen.data.vertices); cen.location.z=zmax-czmin+0.15
# stem behind the flower: its front edge overlaps the rear face, most volume is at negative Z
bpy.ops.mesh.primitive_cube_add(location=(0,-23,zmin-1.8),scale=(3.2,18,2.0)); stem=bpy.context.object
bev=stem.modifiers.new('Arrotondato','BEVEL'); bev.width=2; bev.segments=5; bpy.context.view_layer.objects.active=stem; bpy.ops.object.modifier_apply(modifier=bev.name)
bpy.ops.object.select_all(action='DESELECT'); pet.select_set(True); stem.select_set(True); bpy.context.view_layer.objects.active=pet; bpy.ops.object.join(); pet.name='GIRASOLE_petali_e_gambo'
# enlarged blind socket from the front/top, to be covered by the separate center piece
top=max((pet.matrix_world@v.co).z for v in pet.data.vertices)
bpy.ops.mesh.primitive_cylinder_add(vertices=64,radius=3.2,depth=3.8,location=(0,0,top-1.5)); cut=bpy.context.object
mod=pet.modifiers.new('Cavita calamita maggiorata 6.4 mm','BOOLEAN'); mod.operation='DIFFERENCE'; mod.solver='EXACT'; mod.object=cut; bpy.context.view_layer.objects.active=pet; bpy.ops.object.modifier_apply(modifier=mod.name); bpy.data.objects.remove(cut,do_unlink=True)
bpy.ops.wm.save_as_mainfile(filepath=r'C:\Users\giaco\Downloads\girasoli_modificati.blend')
