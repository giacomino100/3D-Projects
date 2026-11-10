import bpy
import math
import os


source_collection = bpy.data.collections["Tulipano_sorgente_2"]
tulip = source_collection.objects[0]
bpy.context.scene.collection.objects.link(tulip)
for obj in list(bpy.data.objects):
    if obj != tulip:
        bpy.data.objects.remove(obj, do_unlink=True)
for collection in list(bpy.data.collections):
    bpy.data.collections.remove(collection)

tulip.name = "TULIPANO_corpo_unico_foro_sul_retro_piatto"
tulip.data.name = tulip.name
tulip.scale = (1.10, 1.10, 1.10)
bpy.context.view_layer.objects.active = tulip
tulip.select_set(True)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

pink = bpy.data.materials.get("Tulipano_rosa") or bpy.data.materials.new("Tulipano_rosa")
pink.diffuse_color = (0.92, 0.22, 0.38, 1.0)
pink.roughness = 0.46
tulip.data.materials.clear()
tulip.data.materials.append(pink)

# Trova il piano posteriore della corolla nella zona scelta per la calamita.
hole_x, hole_z = 0.0, 33.0
near = [
    vertex.co.y for vertex in tulip.data.vertices
    if abs(vertex.co.x - hole_x) < 3.3 and abs(vertex.co.z - hole_z) < 3.3
]
flat_y = max(near)

# Rinforzo solo interno: parte dal piano piatto e cresce dentro la corolla.
bpy.ops.mesh.primitive_cylinder_add(
    vertices=96, radius=4.25, depth=3.0,
    location=(hole_x, flat_y - 1.50, hole_z),
    rotation=(math.radians(90.0), 0.0, 0.0),
)
internal = bpy.context.object
internal.name = "Rinforzo_interno_invisibile"
bpy.context.view_layer.objects.active = tulip
join = tulip.modifiers.new("Unione_rinforzo_interno", "BOOLEAN")
join.operation = "UNION"
join.solver = "EXACT"
join.object = internal
bpy.ops.object.modifier_apply(modifier=join.name)
bpy.data.objects.remove(internal, do_unlink=True)

# Foro aperto direttamente sulla superficie piatta, per calamita 6 x 2 mm.
bpy.ops.mesh.primitive_cylinder_add(
    vertices=96, radius=3.2, depth=2.4,
    location=(hole_x, flat_y - 1.10, hole_z),
    rotation=(math.radians(90.0), 0.0, 0.0),
)
cutter = bpy.context.object
cutter.name = "Foro_calamita_sul_piano_piatto"
bpy.context.view_layer.objects.active = tulip
hole = tulip.modifiers.new("Foro_6_4x2_2_sul_retro_piatto", "BOOLEAN")
hole.operation = "DIFFERENCE"
hole.solver = "EXACT"
hole.object = cutter
bpy.ops.object.modifier_apply(modifier=hole.name)
bpy.data.objects.remove(cutter, do_unlink=True)

bpy.context.scene.unit_settings.system = "METRIC"
bpy.context.scene.unit_settings.length_unit = "MILLIMETERS"
bpy.context.scene.unit_settings.scale_length = 0.001
bpy.context.scene["scala_rispetto_originale"] = 1.10
bpy.context.scene["foro_diametro_mm"] = 6.4
bpy.context.scene["foro_profondita_mm"] = 2.2
bpy.context.scene["foro_posizione"] = "Parte piatta posteriore della corolla"
bpy.context.scene["supporto_esterno"] = False

output = os.path.join(os.path.dirname(bpy.data.filepath), "tulipano_maggiorato_calamita.blend")
bpy.ops.wm.save_as_mainfile(filepath=output)
print(f"SAVED={output}")
print(f"FLAT_Y={flat_y:.4f}")
