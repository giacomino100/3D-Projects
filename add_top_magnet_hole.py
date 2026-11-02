import bpy
path=r'C:\Users\giaco\Downloads\girasoli_modificati.blend'
bpy.ops.wm.open_mainfile(filepath=path)
pet=bpy.data.objects.get('GIRASOLE_petali_e_gambo')
if pet:
    # hole on the upper/front face of the flower, covered later by the round center
    top=max((pet.matrix_world@v.co).z for v in pet.data.vertices)
    bpy.ops.mesh.primitive_cylinder_add(vertices=64,radius=2.6,depth=3.4,location=(0,0,top-1.3))
    cut=bpy.context.object
    mod=pet.modifiers.new('FORO CALAMITA 5 mm - parte superiore','BOOLEAN'); mod.operation='DIFFERENCE'; mod.solver='EXACT'; mod.object=cut
    bpy.context.view_layer.objects.active=pet; bpy.ops.object.modifier_apply(modifier=mod.name)
    bpy.data.objects.remove(cut,do_unlink=True)
bpy.ops.wm.save_as_mainfile(filepath=path)
print([(o.name,len(o.data.vertices)) for o in bpy.data.objects if o.type=='MESH'])
