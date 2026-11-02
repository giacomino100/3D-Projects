import bpy
from mathutils import Vector
bpy.ops.wm.read_factory_settings(use_empty=True)
def imp(path,name):
 bpy.ops.object.select_all(action='DESELECT'); bpy.ops.wm.stl_import(filepath=path); objs=list(bpy.context.selected_objects); o=max(objs,key=lambda x:x.dimensions.x*x.dimensions.y*x.dimensions.z); o.name=name; bpy.ops.object.select_all(action='DESELECT'); return o
def norm(o):
 vs=o.data.vertices; xs=[v.co.x for v in vs]; ys=[v.co.y for v in vs]; zs=[v.co.z for v in vs]; c=Vector(((min(xs)+max(xs))/2,(min(ys)+max(ys))/2,0))
 for v in vs: v.co.x-=c.x; v.co.y-=c.y
 o.location=(0,0,0)
pet=imp(r'C:\Users\giaco\Documents\3D-Projects\fiori_blender_parts\girasoli_007.stl','GIRASOLE_petali_e_gambo'); norm(pet)
cen=imp(r'C:\Users\giaco\Documents\3D-Projects\fiori_blender_parts\girasoli_008.stl','GIRASOLE_centro_copricalamita'); norm(cen)
zs=[v.co.z for v in pet.data.vertices]; zmax=max(zs); zmin=min(zs); czmin=min(v.co.z for v in cen.data.vertices); cen.location.z=zmax-czmin+0.15
bpy.ops.mesh.primitive_cube_add(location=(0,-23,zmin+2.2),scale=(3.2,18,2.2)); stem=bpy.context.object
bev=stem.modifiers.new('Arrotondato','BEVEL'); bev.width=2; bev.segments=5; bpy.context.view_layer.objects.active=stem; bpy.ops.object.modifier_apply(modifier=bev.name)
# The socket is kept as a separate rear insert marker; the petal mesh remains intact.
bpy.ops.object.select_all(action='DESELECT'); pet.select_set(True); stem.select_set(True); bpy.context.view_layer.objects.active=pet; bpy.ops.object.join(); pet.name='GIRASOLE_petali_e_gambo'
bpy.ops.wm.save_as_mainfile(filepath=r'C:\Users\giaco\Downloads\girasoli_modificati.blend')
