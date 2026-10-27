"""Crea il file Blender pulito della V9 senza toccare la sessione interattiva."""

from __future__ import annotations

import json
import math
from pathlib import Path

import bmesh
import bpy


ROOT = Path(__file__).resolve().parents[1]
MESH_DIR = ROOT / "cad" / "exports" / "V9" / "blender_meshes"
MANIFEST = MESH_DIR / "manifest.json"
OUTPUT = ROOT / "cad" / "blender" / "81A807925A_V9_Blender.blend"


def make_material(name: str, color: tuple[float, float, float, float], metallic: float, roughness: float):
    material = bpy.data.materials.new(name)
    material.use_nodes = True
    shader = next(node for node in material.node_tree.nodes if node.type == "BSDF_PRINCIPLED")
    shader.inputs["Base Color"].default_value = color
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Roughness"].default_value = roughness
    return material


def mark_cad_edges(mesh: bpy.types.Mesh, angle_degrees: float = 35.0) -> None:
    for polygon in mesh.polygons:
        polygon.use_smooth = True
    bm = bmesh.new()
    bm.from_mesh(mesh)
    threshold = math.radians(angle_degrees)
    for edge in bm.edges:
        if not edge.is_manifold or edge.calc_face_angle(0.0) >= threshold:
            edge.smooth = False
    bm.to_mesh(mesh)
    bm.free()
    mesh.update()


def main() -> None:
    bpy.ops.wm.read_factory_settings(use_empty=True)

    scene = bpy.context.scene
    scene.name = "81A807925A_V9"
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.length_unit = "MILLIMETERS"
    scene.unit_settings.scale_length = 0.001
    scene["part_number"] = "81A807925A / 81A807925A TB2"
    scene["source_version"] = "V9d"
    scene["coordinate_units"] = "mm"
    scene["assumed_depths_mm"] = "D_LEDGE=1.0; D_RECESS=3.5; BOTTOM_CHANNEL=1.6"
    scene["validation_rule"] = "2 independent exact-part specimens; no contradictions"

    part_collection = bpy.data.collections.new("81A807925A_PART")
    scene.collection.children.link(part_collection)
    reference_collection = bpy.data.collections.new("REFERENCE_NON_RENDER")
    scene.collection.children.link(reference_collection)
    reference_collection.hide_render = True
    reference_collection.hide_viewport = True

    silver = make_material("TB2_Selenite_Silver", (0.47, 0.50, 0.53, 1.0), 0.72, 0.24)
    clip_material = make_material("Clip_Diagnostic_Dark", (0.055, 0.065, 0.075, 1.0), 0.08, 0.34)

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    imported_objects = []

    for item in manifest["objects"]:
        before = set(bpy.data.objects)
        bpy.ops.wm.stl_import(filepath=item["file"], global_scale=1.0)
        created = list(set(bpy.data.objects) - before)
        if len(created) != 1:
            raise RuntimeError(f"Import ambiguo per {item['name']}: {len(created)} oggetti")
        obj = created[0]
        obj.name = item["name"]
        obj.data.name = f"{item['name']}_MESH"

        for collection in list(obj.users_collection):
            collection.objects.unlink(obj)
        part_collection.objects.link(obj)

        obj.data.materials.clear()
        obj.data.materials.append(silver if item["name"].startswith("BODY_") else clip_material)
        obj["source_step"] = manifest["source"]
        obj["source_version"] = manifest["source_version"]
        obj["volume_mm3_occ"] = item["volume_mm3"]
        obj["geometry_status"] = "PHOTO_DERIVED + ASSUMED depths; unchanged from V9d"
        mark_cad_edges(obj.data)
        imported_objects.append(obj)

    body = bpy.data.objects["BODY_81A807925A_V9"]
    bpy.context.view_layer.objects.active = body
    body.select_set(True)
    for obj in imported_objects:
        obj.hide_render = False
        obj.show_name = False

    scene.world = bpy.data.worlds.new("World_81A807925A")
    scene.world.color = (0.025, 0.025, 0.025)
    scene.render.resolution_x = 1600
    scene.render.resolution_y = 700
    scene.render.resolution_percentage = 100

    scene["open_points"] = (
        "END A nose highlight; assumed depths 1.0/3.5/1.6 mm; "
        "END A/END B contours and global Z curvature unconstrained"
    )

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
    print(f"Saved: {OUTPUT}")
    print("Objects:", ", ".join(obj.name for obj in imported_objects))


if __name__ == "__main__":
    main()
