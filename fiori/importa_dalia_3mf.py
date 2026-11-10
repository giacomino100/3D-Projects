import bpy
import os
import zipfile
import xml.etree.ElementTree as ET
from mathutils import Matrix


ROOT = os.path.dirname(os.path.abspath(__file__))
SOURCE = os.path.join(ROOT, "dalia", "dalia_originale.3mf")
OUTPUT = os.path.join(ROOT, "dalia", "dalia.blend")
NS = {
    "m": "http://schemas.microsoft.com/3dmanufacturing/core/2015/02",
    "p": "http://schemas.microsoft.com/3dmanufacturing/production/2015/06",
}
P_PATH = "{%s}path" % NS["p"]


def transform_matrix(value):
    if not value:
        return Matrix.Identity(4)
    v = [float(number) for number in value.split()]
    return Matrix((
        (v[0], v[3], v[6], v[9]),
        (v[1], v[4], v[7], v[10]),
        (v[2], v[5], v[8], v[11]),
        (0.0, 0.0, 0.0, 1.0),
    ))


bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.unit_settings.system = "METRIC"
scene.unit_settings.length_unit = "MILLIMETERS"
scene.unit_settings.scale_length = 0.001

with zipfile.ZipFile(SOURCE, "r") as archive:
    root = ET.fromstring(archive.read("3D/3dmodel.model"))
    build_items = root.findall("./m:build/m:item", NS)
    root_objects = {node.get("id"): node for node in root.findall("./m:resources/m:object", NS)}

    first_root = root_objects[build_items[0].get("objectid")]
    components = first_root.findall("./m:components/m:component", NS)
    model_path = components[0].get(P_PATH).lstrip("/")
    parts_root = ET.fromstring(archive.read(model_path))
    part_nodes = {node.get("id"): node for node in parts_root.findall("./m:resources/m:object", NS)}

source_collection = bpy.data.collections.new("DALIA_sorgente_112_parti")

material = bpy.data.materials.new("Dalia")
material.diffuse_color = (0.55, 0.08, 0.30, 1.0)
material.metallic = 0.0
material.roughness = 0.48

for index, component in enumerate(components, start=1):
    part = part_nodes[component.get("objectid")]
    mesh_node = part.find("./m:mesh", NS)
    vertices = [
        (float(v.get("x")), float(v.get("y")), float(v.get("z")))
        for v in mesh_node.findall("./m:vertices/m:vertex", NS)
    ]
    faces = [
        (int(t.get("v1")), int(t.get("v2")), int(t.get("v3")))
        for t in mesh_node.findall("./m:triangles/m:triangle", NS)
    ]
    mesh = bpy.data.meshes.new(f"Dalia_parte_{index:03d}")
    mesh.from_pydata(vertices, [], faces)
    mesh.materials.append(material)
    obj = bpy.data.objects.new(mesh.name, mesh)
    obj.matrix_world = transform_matrix(component.get("transform"))
    source_collection.objects.link(obj)

for index, item in enumerate(build_items, start=1):
    instance = bpy.data.objects.new(f"Dalia_{index:02d}", None)
    instance.instance_type = "COLLECTION"
    instance.instance_collection = source_collection
    instance.matrix_world = transform_matrix(item.get("transform"))
    scene.collection.objects.link(instance)

scene["origine_3mf"] = SOURCE
scene["numero_parti_dalia"] = len(components)
scene["numero_copie"] = len(build_items)

bpy.ops.wm.save_as_mainfile(filepath=OUTPUT)
print(f"BLEND_SAVED={OUTPUT}")
print(f"PARTS={len(components)} INSTANCES={len(build_items)}")
