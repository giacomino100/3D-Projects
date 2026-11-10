import bpy


body = bpy.data.objects["GIRASOLE_petali_e_gambo"]
bpy.context.view_layer.objects.active = body

for leaf_name in ("FOGLIA_sinistra", "FOGLIA_destra"):
    leaf = bpy.data.objects.get(leaf_name)
    if leaf is None:
        continue

    # Rende definitiva la forma arrotondata prima della fusione.
    bpy.context.view_layer.objects.active = leaf
    for modifier in list(leaf.modifiers):
        bpy.ops.object.modifier_apply(modifier=modifier.name)

    bpy.context.view_layer.objects.active = body
    modifier = body.modifiers.new(f"Unione_{leaf_name}", "BOOLEAN")
    modifier.operation = "UNION"
    modifier.solver = "EXACT"
    modifier.object = leaf
    bpy.ops.object.modifier_apply(modifier=modifier.name)
    bpy.data.objects.remove(leaf, do_unlink=True)

body.name = "GIRASOLE_corpo_unico_petali_stelo_foglie"
body.data.name = "GIRASOLE_corpo_unico_petali_stelo_foglie"
bpy.context.scene["foglie_unite_allo_stelo"] = True

for obj in bpy.context.scene.objects:
    obj.select_set(obj in {body, bpy.data.objects.get("girasoli_008")})
bpy.context.view_layer.objects.active = body

bpy.ops.wm.save_as_mainfile(filepath=bpy.data.filepath)
print(f"SAVED={bpy.data.filepath}")
print(f"BODY_VERTICES={len(body.data.vertices)} BODY_FACES={len(body.data.polygons)}")
