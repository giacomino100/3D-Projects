"""Assembla la V10 in Blender: un corpo unito più le sei clip della V9."""

from __future__ import annotations

import math
import os
from pathlib import Path

import bmesh
import bpy


ROOT = Path(__file__).resolve().parents[1]
VERSION = os.environ.get("Q2_VERSION", "V10").upper()
PARTS = ROOT / "cad" / "exports" / VERSION / "blender_parts"
CLIPS = ROOT / "cad" / "exports" / "V9" / "blender_meshes"
OUTPUT = ROOT / "cad" / "blender" / f"81A807925A_{VERSION}_Blender.blend"
EXPORT_DIR = ROOT / "cad" / "exports" / VERSION


def import_stl(path: Path, name: str) -> bpy.types.Object:
    before = set(bpy.data.objects)
    bpy.ops.wm.stl_import(filepath=str(path), global_scale=1.0)
    created = list(set(bpy.data.objects) - before)
    if len(created) != 1:
        raise RuntimeError(f"Import ambiguo {name}: {len(created)} oggetti")
    obj = created[0]
    obj.name = name
    obj.data.name = f"{name}_MESH"
    return obj


def material(name: str, color, metallic: float, roughness: float):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    shader = next(node for node in mat.node_tree.nodes if node.type == "BSDF_PRINCIPLED")
    shader.inputs["Base Color"].default_value = color
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Roughness"].default_value = roughness
    return mat


def smooth_cad_mesh(mesh: bpy.types.Mesh, sharp_angle: float = 55.0) -> None:
    for polygon in mesh.polygons:
        polygon.use_smooth = True
    bm = bmesh.new()
    bm.from_mesh(mesh)
    threshold = math.radians(sharp_angle)
    for edge in bm.edges:
        if not edge.is_manifold or edge.calc_face_angle(0.0) >= threshold:
            edge.smooth = False
    bm.to_mesh(mesh)
    bm.free()
    mesh.update()


def union_into(body: bpy.types.Object, cutter: bpy.types.Object) -> None:
    bpy.context.view_layer.objects.active = body
    body.select_set(True)
    cutter.select_set(False)
    modifier = body.modifiers.new(name=f"UNION_{cutter.name}", type="BOOLEAN")
    modifier.operation = "UNION"
    modifier.solver = "EXACT"
    modifier.object = cutter
    bpy.ops.object.modifier_apply(modifier=modifier.name)
    bpy.data.objects.remove(cutter, do_unlink=True)


def main() -> None:
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.name = f"81A807925A_{VERSION}"
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.length_unit = "MILLIMETERS"
    scene.unit_settings.scale_length = 0.001
    scene["part_number"] = "81A807925A / 81A807925A TB2"
    scene["source_version"] = VERSION
    if VERSION == "V18":
        scene["change"] = "continuous upper recessed channel matching the existing lower channel"
        scene["evidence"] = "user red-line annotation; profile reused from the lower edge"
        scene["assumed_value"] = "TOP_CHANNEL reuses BOTTOM_CHANNEL 1.6/1.2/3.0 mm; no new OEM dimension"
    elif VERSION == "V17":
        scene["change"] = "remove protruding D-end collar; upper and lower opening lips taper with the END A ramp"
        scene["evidence"] = "user blue annotation; S1 alB_2 + S3 alA_4/5 + S4 fre_4"
        scene["assumed_value"] = "no new OEM dimension; 0.15 mm is boolean overlap only"
    elif VERSION == "V16":
        scene["change"] = "END A constant-thickness skin: front and rear deepen together to the 12 mm lip plane"
        scene["evidence"] = "user annotated points 1/A/2; S1 alB_2 + S3 alA_4/5 + S4 fre_4/5"
        scene["assumed_value"] = "endpoint reuses confirmed 12 mm rear lip plane; V15 start depth unchanged"
    elif VERSION == "V15":
        scene["change"] = "rear depth carried by continuous outer, upper and lower lips; V14 front-depth error reverted"
        scene["evidence"] = "user red-line correction; S1 alB_2 + S3 alA_4/5, supported by S4 fre_4/5"
        scene["assumed_value"] = "all lips reuse D_WALL_OPEN_TOP=12 mm (no new metric value)"
    elif VERSION == "V14":
        scene["change"] = "END A at full recess depth from nose; lower inner tongue follows the complete opening"
        scene["evidence"] = "user red-line correction; S1 alB + S3 alA, supported by S4 fre/pru"
        scene["assumed_value"] = "D_RECESS remains 3.5 mm; return depth and thickness unchanged (ASSUMED)"
    elif VERSION == "V13":
        scene["change"] = "continuous recessed tongues on upper and lower opening edges, joined at END A"
        scene["evidence"] = "user feedback; S1 alB_1 + S3 alA_3, supported by S4 fre"
        scene["assumed_value"] = "bottom tongue uses unchanged top return depth and thickness (ASSUMED)"
    elif VERSION == "V12":
        scene["change"] = "continuous recessed upper tongue from END A D-end to END B"
        scene["evidence"] = "user crops on S1 front_A; deep return confirmed by S3 pru and S4 fre"
        scene["assumed_value"] = "existing return depth and thickness unchanged (ASSUMED)"
    elif VERSION == "V11":
        scene["change"] = "END A recess: uniform longitudinal ramp from nose to cavity"
        scene["evidence"] = "S1 alB_1 + S3 alA_3"
        scene["assumed_value"] = "start depth 55%; D_RECESS=3.5 mm (unchanged ASSUMED values)"
    else:
        scene["change"] = "REJECTED V10 transverse sweep experiment"
        scene["evidence"] = "Rejected by user after Blender inspection"
        scene["assumed_value"] = "RW_POCKET=W_BEAD=7.2 mm (rejected)"
    if VERSION in ("V16", "V17", "V18"):
        scene["depths_mm"] = "D_LEDGE=1.0 ASSUMED; END_A start=V15; END_A target=12 user-confirmed; channels=1.6 ASSUMED"
    else:
        scene["unchanged_assumed_depths_mm"] = "D_LEDGE=1.0; D_RECESS=3.5; BOTTOM_CHANNEL=1.6"

    collection = bpy.data.collections.new("81A807925A_PART")
    scene.collection.children.link(collection)

    body = import_stl(PARTS / f"BODY_SKIN_{VERSION}.stl", f"BODY_81A807925A_{VERSION}")
    outer_return = import_stl(PARTS / f"BODY_OUTER_RETURN_{VERSION}.stl", "_OUTER_RETURN")
    opening_return = import_stl(PARTS / f"BODY_OPENING_RETURN_{VERSION}.stl", "_OPENING_RETURN")
    union_into(body, outer_return)
    union_into(body, opening_return)
    if VERSION in ("V12", "V13", "V14", "V15", "V16", "V17", "V18"):
        tongue = import_stl(PARTS / f"BODY_TONGUE_EXTENSION_{VERSION}.stl", "_UPPER_INNER_TONGUE")
        union_into(body, tongue)
    if VERSION in ("V13", "V14", "V15", "V16", "V17", "V18"):
        bottom_tongue = import_stl(PARTS / f"BODY_BOTTOM_TONGUE_{VERSION}.stl", "_BOTTOM_INNER_TONGUE")
        union_into(body, bottom_tongue)
    for current in list(body.users_collection):
        current.objects.unlink(body)
    collection.objects.link(body)

    silver = material("TB2_Selenite_Silver", (0.47, 0.50, 0.53, 1.0), 0.72, 0.24)
    dark = material("Clip_Diagnostic_Dark", (0.055, 0.065, 0.075, 1.0), 0.08, 0.34)
    body.data.materials.append(silver)
    smooth_cad_mesh(body.data)

    clip_objects = []
    for name in ("CLIP_C01", "CLIP_C02", "CLIP_C03", "CLIP_C05", "CLIP_C06", "CLIP_C07"):
        obj = import_stl(CLIPS / f"{name}.stl", name)
        for current in list(obj.users_collection):
            current.objects.unlink(obj)
        collection.objects.link(obj)
        obj.data.materials.append(dark)
        smooth_cad_mesh(obj.data)
        clip_objects.append(obj)

    body["geometry_status"] = "PHOTO_CONFIRMED direction; metric depths remain ASSUMED"
    if VERSION == "V18":
        body["upper_channel"] = "continuous along the red-line edge; same profile as lower channel"
        body["opening_lips"] = "V17 rear planes retained and trimmed against the V18 face"
    elif VERSION == "V17":
        body["opening_d_end"] = "short collar removed by V16 ramp"
        body["opening_lips"] = "upper and lower trimmed symmetrically against V16 ramp"
    elif VERSION == "V16":
        body["enda_shell"] = "constant thickness: front and rear share the same progressive depth"
        body["enda_ramp"] = "V15 depth at point 1; 12 mm at point 2"
    elif VERSION == "V15":
        body["rear_recess"] = "continuous deep outer/opening lips; front surface restored to V13"
        body["outer_lip_depth_mm"] = 12.0
        body["opening_lips"] = "upper and lower complete to the opening end"
    elif VERSION == "V14":
        body["enda_recess"] = "full existing D_RECESS from nose to cavity boundary"
        body["lower_inner_tongue"] = "continuous along the complete lower opening edge"
        body["upper_inner_tongue"] = "continuous from opening D-end; front contour unchanged"
    elif VERSION == "V13":
        body["lower_inner_tongue"] = "continuous and joined to END A nose recess"
        body["upper_inner_tongue"] = "continuous from opening D-end; front contour unchanged"
    elif VERSION == "V12":
        body["upper_inner_tongue"] = "continuous from opening D-end; front contour unchanged"
    elif VERSION == "V11":
        body["longitudinal_ramp_profile"] = "linear"

    scene.world = bpy.data.worlds.new(f"World_81A807925A_{VERSION}")
    scene.world.color = (0.025, 0.025, 0.025)
    scene.render.resolution_x = 1600
    scene.render.resolution_y = 700
    scene.render.resolution_percentage = 100

    bpy.ops.object.select_all(action="DESELECT")
    body.select_set(True)
    bpy.context.view_layer.objects.active = body

    EXPORT_DIR.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.stl_export(
        filepath=str(EXPORT_DIR / f"81A807925A_{VERSION}_body.stl"),
        export_selected_objects=True,
    )
    bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
    print(f"Saved: {OUTPUT}")
    print("Body + clips:", 1 + len(clip_objects))


if __name__ == "__main__":
    main()
