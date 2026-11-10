import bpy
import math
import os


source_collection = bpy.data.collections["Tulipano_sorgente_2"]
tulip = source_collection.objects[0]

# Isola il vero tulipano dagli altri fiori inclusi nel pacchetto originale.
bpy.context.scene.collection.objects.link(tulip)
for obj in list(bpy.data.objects):
    if obj != tulip:
        bpy.data.objects.remove(obj, do_unlink=True)
for collection in list(bpy.data.collections):
    bpy.data.collections.remove(collection)

tulip.name = "TULIPANO_corpo_con_sede_calamita"
tulip.data.name = "TULIPANO_corpo_con_sede_calamita"

# Leggermente più grande: +10% uniforme.
tulip.scale = (1.10, 1.10, 1.10)
bpy.context.view_layer.objects.active = tulip
tulip.select_set(True)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

pink = bpy.data.materials.get("Tulipano_rosa") or bpy.data.materials.new("Tulipano_rosa")
pink.diffuse_color = (0.92, 0.22, 0.38, 1.0)
pink.roughness = 0.46
tulip.data.materials.clear()
tulip.data.materials.append(pink)

# Sede posteriore integrata alla corolla. Asse del cilindro lungo Y.
pad_center = (0.0, -13.70, 33.0)
bpy.ops.mesh.primitive_cylinder_add(
    vertices=96,
    radius=4.4,
    depth=3.0,
    location=pad_center,
    rotation=(math.radians(90.0), 0.0, 0.0),
)
pad = bpy.context.object
pad.name = "Supporto_posteriore_calamita"

bpy.context.view_layer.objects.active = tulip
join = tulip.modifiers.new("Unione_supporto_calamita", "BOOLEAN")
join.operation = "UNION"
join.solver = "EXACT"
join.object = pad
bpy.ops.object.modifier_apply(modifier=join.name)
bpy.data.objects.remove(pad, do_unlink=True)

# Cavità per calamita 6 x 2 mm: 0,2 mm di gioco radiale e in profondità.
bpy.ops.mesh.primitive_cylinder_add(
    vertices=96,
    radius=3.2,
    depth=2.4,
    location=(0.0, -14.10, 33.0),
    rotation=(math.radians(90.0), 0.0, 0.0),
)
cutter = bpy.context.object
cutter.name = "Taglio_calamita_6x2"

bpy.context.view_layer.objects.active = tulip
hole = tulip.modifiers.new("Foro_posteriore_calamita_6x2", "BOOLEAN")
hole.operation = "DIFFERENCE"
hole.solver = "EXACT"
hole.object = cutter
bpy.ops.object.modifier_apply(modifier=hole.name)
bpy.data.objects.remove(cutter, do_unlink=True)

bpy.context.scene.unit_settings.system = "METRIC"
bpy.context.scene.unit_settings.length_unit = "MILLIMETERS"
bpy.context.scene.unit_settings.scale_length = 0.001
bpy.context.scene["scala_rispetto_originale"] = 1.10
bpy.context.scene["calamita_diametro_mm"] = 6.0
bpy.context.scene["calamita_spessore_mm"] = 2.0
bpy.context.scene["foro_diametro_mm"] = 6.4
bpy.context.scene["foro_profondita_mm"] = 2.2

output = os.path.join(os.path.dirname(bpy.data.filepath), "tulipano_maggiorato_calamita.blend")
bpy.ops.wm.save_as_mainfile(filepath=output)
print(f"SAVED={output}")
print(f"DIMENSIONS={tuple(round(value, 3) for value in tulip.dimensions)}")
