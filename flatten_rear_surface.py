import bpy
bpy.ops.wm.open_mainfile(filepath=r'C:\Users\giaco\Downloads\girasoli_modificati.blend')
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
# Rebuild the earlier, wider thin-stem version.
bpy.ops.wm.stl_import(filepath=r'C:\Users\giaco\Documents\3D-Projects\fiori_blender_parts\girasoli_008.stl'); cen=bpy.context.object
bpy.ops.object.select_all(action='DESELECT'); bpy.ops.wm.stl_import(filepath=r'C:\Users\giaco\Documents\3D-Projects\fiori_blender_parts\girasoli_007.stl'); pet=max(list(bpy.context.selected_objects),key=lambda x:x.dimensions.x*x.dimensions.y*x.dimensions.z); pet.name='GIRASOLE_petali_e_gambo'
cv=[v.co.copy() for v in cen.data.vertices]; ccx=(min(v.x for v in cv)+max(v.x for v in cv))/2; ccy=(min(v.y for v in cv)+max(v.y for v in cv))/2
for v in cen.data.vertices: v.co.x-=ccx; v.co.y-=ccy
vs=[v.co.copy() for v in pet.data.vertices]; cx=(min(v.x for v in vs)+max(v.x for v in vs))/2; cy=(min(v.y for v in vs)+max(v.y for v in vs))/2
for v in pet.data.vertices: v.co.x-=cx; v.co.y-=cy
cen.location.z=max(v.co.z for v in pet.data.vertices)-min(v.co.z for v in cen.data.vertices)+0.15
z0=min(v.co.z for v in pet.data.vertices); z1=max(v.co.z for v in pet.data.vertices); thick=z1-z0
# exact same thickness as flower; rear and front faces remain flat and coplanar
bpy.ops.mesh.primitive_cube_add(location=(0,-23,z0+0.8),scale=(3.2,18,0.8)); stem=bpy.context.object
bev=stem.modifiers.new('Forma arrotondata','BEVEL'); bev.width=1.6; bev.segments=5; bpy.context.view_layer.objects.active=stem; bpy.ops.object.modifier_apply(modifier=bev.name)
bpy.ops.object.select_all(action='DESELECT'); pet.select_set(True); stem.select_set(True); bpy.context.view_layer.objects.active=pet; bpy.ops.object.join(); pet.name='GIRASOLE_petali_e_gambo'
top=max(v.co.z for v in pet.data.vertices)
bpy.ops.mesh.primitive_cylinder_add(vertices=64,radius=3.2,depth=3.8,location=(0,0,top-1.5)); cut=bpy.context.object
mod=pet.modifiers.new('Cavita calamita 6.4 mm','BOOLEAN'); mod.operation='DIFFERENCE'; mod.object=cut; bpy.context.view_layer.objects.active=pet; bpy.ops.object.modifier_apply(modifier=mod.name); bpy.data.objects.remove(cut,do_unlink=True)
bpy.ops.wm.save_as_mainfile(filepath=r'C:\Users\giaco\Downloads\girasoli_modificati.blend')
