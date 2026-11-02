import bpy
path=r'C:\Users\giaco\Downloads\girasoli_modificati.blend'
bpy.ops.wm.open_mainfile(filepath=path)
pet=bpy.data.objects.get('GIRASOLE_petali_con_foro'); stem=bpy.data.objects.get('GIRASOLE_gambo_separato')
if pet and stem:
    # move stem below the flower so only its connector enters the lower edge
    stem.location.y-=18
    zmin=min((stem.matrix_world@v.co).z for v in stem.data.vertices); zmax=max((stem.matrix_world@v.co).z for v in stem.data.vertices)
    zc=(zmin+zmax)/2
    # male tongue on the stem top
    bpy.ops.mesh.primitive_cube_add(location=(0,-22.0,zc),scale=(2.0,2.5,(zmax-zmin)/2))
    peg=bpy.context.object; peg.name='GIRASOLE_incastro_stelo'
    bev=peg.modifiers.new('Bordi arrotondati','BEVEL'); bev.width=.5; bev.segments=3; bpy.context.view_layer.objects.active=peg; bpy.ops.object.modifier_apply(modifier=bev.name)
    bpy.ops.object.select_all(action='DESELECT'); stem.select_set(True); peg.select_set(True); bpy.context.view_layer.objects.active=stem; bpy.ops.object.join(); stem.name='GIRASOLE_gambo_separato_con_incastro'
    # matching female slot in the lower part of the petal piece
    top=max((pet.matrix_world@v.co).z for v in pet.data.vertices); bottom=min((pet.matrix_world@v.co).z for v in pet.data.vertices)
    bpy.ops.mesh.primitive_cube_add(location=(0,-22.0,(top+bottom)/2),scale=(2.25,2.75,(top-bottom)/2+0.2)); slot=bpy.context.object
    mod=pet.modifiers.new('Sede incastro gambo','BOOLEAN'); mod.operation='DIFFERENCE'; mod.solver='EXACT'; mod.object=slot; bpy.context.view_layer.objects.active=pet; bpy.ops.object.modifier_apply(modifier=mod.name); bpy.data.objects.remove(slot,do_unlink=True)
bpy.ops.wm.save_as_mainfile(filepath=path)
