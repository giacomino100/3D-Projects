import bpy
import os


body = bpy.data.objects["GIRASOLE_petali_e_gambo"]
target_thickness = 2.6

for leaf_name in ("FOGLIA_sinistra", "FOGLIA_destra"):
    leaf = bpy.data.objects[leaf_name]

    # Applica l'arrotondamento, poi aumenta lo spessore attorno al piano medio.
    bpy.context.view_layer.objects.active = leaf
    for modifier in list(leaf.modifiers):
        bpy.ops.object.modifier_apply(modifier=modifier.name)

    zs = [vertex.co.z for vertex in leaf.data.vertices]
    z_mid = (min(zs) + max(zs)) / 2.0
    factor = target_thickness / (max(zs) - min(zs))
    for vertex in leaf.data.vertices:
        vertex.co.z = z_mid + (vertex.co.z - z_mid) * factor
    leaf.data.update()

    # Unione geometrica: foglia e stelo diventano una sola mesh stampabile.
    bpy.context.view_layer.objects.active = body
    boolean = body.modifiers.new(f"Unione_spessa_{leaf_name}", "BOOLEAN")
    boolean.operation = "UNION"
    boolean.solver = "EXACT"
    boolean.object = leaf
    bpy.ops.object.modifier_apply(modifier=boolean.name)
    bpy.data.objects.remove(leaf, do_unlink=True)

body.name = "GIRASOLE_corpo_unico_petali_stelo_foglie"
body.data.name = "GIRASOLE_corpo_unico_petali_stelo_foglie"
bpy.context.scene["spessore_foglie_mm"] = target_thickness
bpy.context.scene["foglie_unite_allo_stelo"] = True

output = os.path.join(os.path.dirname(bpy.data.filepath), "girasole_diametro_+10mm_foglie_stelo_lungo.blend")
bpy.ops.wm.save_as_mainfile(filepath=output)
print(f"SAVED={output}")
print(f"LEAF_THICKNESS={target_thickness:.3f}")
