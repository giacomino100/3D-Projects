import bpy
import os
import sys
import zipfile
import xml.etree.ElementTree as ET
from mathutils import Matrix


NS = {
    "m": "http://schemas.microsoft.com/3dmanufacturing/core/2015/02",
    "p": "http://schemas.microsoft.com/3dmanufacturing/production/2015/06",
}
P_PATH = "{%s}path" % NS["p"]


def matrix_3mf(value):
    if not value:
        return Matrix.Identity(4)
    v = [float(number) for number in value.split()]
    return Matrix((
        (v[0], v[3], v[6], v[9]),
        (v[1], v[4], v[7], v[10]),
        (v[2], v[5], v[8], v[11]),
        (0.0, 0.0, 0.0, 1.0),
    ))


args = sys.argv[sys.argv.index("--") + 1:]
source, output, flower_name, color_hex = args

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.unit_settings.system = "METRIC"
scene.unit_settings.length_unit = "MILLIMETERS"
scene.unit_settings.scale_length = 0.001

color_hex = color_hex.lstrip("#")
rgb = tuple(int(color_hex[i:i + 2], 16) / 255.0 for i in (0, 2, 4))
material = bpy.data.materials.new(flower_name)
material.diffuse_color = (*rgb, 1.0)
material.roughness = 0.48

with zipfile.ZipFile(source, "r") as archive:
    main = ET.fromstring(archive.read("3D/3dmodel.model"))
    root_objects = {node.get("id"): node for node in main.findall("./m:resources/m:object", NS)}
    build_items = main.findall("./m:build/m:item", NS)

    paths = sorted({
        component.get(P_PATH).lstrip("/")
        for root in root_objects.values()
        for component in root.findall("./m:components/m:component", NS)
    })
    model_objects = {}
    for path in paths:
        model_root = ET.fromstring(archive.read(path))
        model_objects[path] = {
            node.get("id"): node for node in model_root.findall("./m:resources/m:object", NS)
        }

mesh_cache = {}
root_collections = {}
part_count = 0

for root_id, root in root_objects.items():
    collection = bpy.data.collections.new(f"{flower_name}_sorgente_{root_id}")
    root_collections[root_id] = collection
    for component_index, component in enumerate(root.findall("./m:components/m:component", NS), start=1):
        path = component.get(P_PATH).lstrip("/")
        object_id = component.get("objectid")
        cache_key = (path, object_id)
        if cache_key not in mesh_cache:
            part = model_objects[path][object_id]
            mesh_node = part.find("./m:mesh", NS)
            vertices = [
                (float(v.get("x")), float(v.get("y")), float(v.get("z")))
                for v in mesh_node.findall("./m:vertices/m:vertex", NS)
            ]
            faces = [
                (int(t.get("v1")), int(t.get("v2")), int(t.get("v3")))
                for t in mesh_node.findall("./m:triangles/m:triangle", NS)
            ]
            mesh = bpy.data.meshes.new(f"{flower_name}_parte_{len(mesh_cache) + 1:03d}")
            mesh.from_pydata(vertices, [], faces)
            mesh.materials.append(material)
            mesh_cache[cache_key] = mesh
        obj = bpy.data.objects.new(
            f"{flower_name}_{root_id}_parte_{component_index:03d}", mesh_cache[cache_key]
        )
        obj.matrix_world = matrix_3mf(component.get("transform"))
        collection.objects.link(obj)
        part_count += 1

for index, item in enumerate(build_items, start=1):
    instance = bpy.data.objects.new(f"{flower_name}_{index:02d}", None)
    instance.instance_type = "COLLECTION"
    instance.instance_collection = root_collections[item.get("objectid")]
    instance.matrix_world = matrix_3mf(item.get("transform"))
    scene.collection.objects.link(instance)

scene["origine_3mf"] = source
scene["numero_parti"] = part_count
scene["numero_istanze"] = len(build_items)
bpy.ops.wm.save_as_mainfile(filepath=output)
print(f"BLEND_SAVED={output}")
print(f"PARTS={part_count} UNIQUE_MESHES={len(mesh_cache)} INSTANCES={len(build_items)}")
