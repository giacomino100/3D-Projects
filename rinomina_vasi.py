import bpy

names = {
    "VASO_F2_SENZA_SCRITTA": "VASO_01_F2_SENZA_SCRITTA",
    "VASO_PROTO_A_PETALI_TORTI": "VASO_02_PETALI_TORTI",
    "VASO_PROTO_B_LOTO": "VASO_03_LOTO",
    "VASO_PROTO_C_INTRECCIO": "VASO_04_INTRECCIO",
    "VASO_PROTO_D_GEMMA": "VASO_05_GEMMA",
    "VASO_PROTO_E_PLISSE_GRIGIO": "VASO_06_PLISSE_GRIGIO",
    "VASO_PROTO_F2_NERVATURE_BEIGE": "VASO_07_F2_NERVATURE_BEIGE",
}

for old_name, new_name in names.items():
    obj = bpy.data.objects.get(old_name)
    if obj:
        obj.name = new_name
        if obj.data:
            obj.data.name = new_name + "_MESH"

vaso_collection = bpy.data.collections.get("VASI") or bpy.data.collections.new("VASI")
if vaso_collection.name not in bpy.context.scene.collection.children:
    bpy.context.scene.collection.children.link(vaso_collection)

for obj in bpy.data.objects:
    if obj.name.startswith("VASO_"):
        if not obj.users_collection:
            vaso_collection.objects.link(obj)
        obj.hide_viewport = False
        obj.hide_render = False
        obj.hide_set(False)
        obj.select_set(True)
        bpy.context.view_layer.objects.active = obj

bpy.ops.wm.save_as_mainfile(filepath=bpy.data.filepath)
print("VASI_RINOMINATI", ", ".join(o.name for o in bpy.data.objects if o.name.startswith("VASO_")))
