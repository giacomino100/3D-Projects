import bpy
from mathutils import Vector
path=r'C:\Users\giaco\_codex_undo_2026-11-07\girasoli_modificati.blend'
pet_src=r'C:\Users\giaco\_sunflower_inspect_parts\parte_003.stl'
cen_src=r'C:\Users\giaco\_sunflower_inspect_parts\parte_002.stl'
bpy.ops.wm.read_factory_settings(use_empty=True)
def import_norm(src,name):
    bpy.ops.object.select_all(action='DESELECT'); bpy.ops.wm.stl_import(filepath=src); o=max(bpy.context.selected_objects,key=lambda x:x.dimensions.x*x.dimensions.y*x.dimensions.z); o.name=name
    ps=[v.co.copy() for v in o.data.vertices]; cx=(min(v.x for v in ps)+max(v.x for v in ps))/2; cy=(min(v.y for v in ps)+max(v.y for v in ps))/2
    for v in o.data.vertices: v.co.x-=cx; v.co.y-=cy
    bpy.ops.object.select_all(action='DESELECT'); return o
pet=import_norm(pet_src,'GIRASOLE_petali_con_foro'); cen=import_norm(cen_src,'GIRASOLE_centro_copricalamita')
pz=[v.co.z for v in pet.data.vertices]; z0=min(pz); top=max(pz); cy0=min(v.co.z for v in cen.data.vertices); cen.location.z=top-cy0+.12
ys=[v.co.y for v in pet.data.vertices]; ymin=min(ys); stem_len=32.0
# clean rounded stem: its upper end stops at the flower perimeter, no overlap seam
bpy.ops.mesh.primitive_cube_add(location=(0,ymin-stem_len/2+.15,z0+1.6),scale=(2.1,stem_len/2,1.6)); stem=bpy.context.object; stem.name='GIRASOLE_gambo_separato'
bev=stem.modifiers.new('Raccordo arrotondato dello stelo','BEVEL'); bev.width=1.2; bev.segments=5; bpy.context.view_layer.objects.active=stem; bpy.ops.object.modifier_apply(modifier=bev.name)
# magnet cavity in the flower, from the visible/top face
bpy.ops.mesh.primitive_cylinder_add(vertices=64,radius=3.2,depth=3.8,location=(0,0,top-1.5)); cut=bpy.context.object
mod=pet.modifiers.new('Cavita calamita 6.4 mm','BOOLEAN'); mod.operation='DIFFERENCE'; mod.solver='EXACT'; mod.object=cut; bpy.context.view_layer.objects.active=pet; bpy.ops.object.modifier_apply(modifier=mod.name); bpy.data.objects.remove(cut,do_unlink=True)
bpy.ops.wm.save_as_mainfile(filepath=path)
