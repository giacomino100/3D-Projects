"""Confronto V14/V15 dalla vista laterale/posteriore indicata dall'utente."""

import os
from pathlib import Path

import bpy
from mathutils import Matrix, Vector


ROOT = Path(__file__).resolve().parents[1]
VERSION = os.environ.get("Q2_VERSION", "V15").upper()
OUTPUT = ROOT / "cad" / "blender" / f"{VERSION}_rear_depth_check.png"

body = bpy.data.objects[f"BODY_81A807925A_{VERSION}"]
silver = bpy.data.materials.new("Rear_Depth_Silver")
silver.use_nodes = True
shader = next(n for n in silver.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
shader.inputs["Base Color"].default_value = (0.58, 0.61, 0.65, 1.0)
shader.inputs["Metallic"].default_value = 0.12
shader.inputs["Roughness"].default_value = 0.43
body.data.materials.clear()
body.data.materials.append(silver)

clip_mat = bpy.data.materials.new("Rear_Depth_Clips")
clip_mat.use_nodes = True
clip_shader = next(n for n in clip_mat.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
clip_shader.inputs["Base Color"].default_value = (0.36, 0.39, 0.43, 1.0)
clip_shader.inputs["Metallic"].default_value = 0.08
clip_shader.inputs["Roughness"].default_value = 0.48
for obj in bpy.context.scene.objects:
    if obj.type == "MESH" and obj != body:
        obj.data.materials.clear()
        obj.data.materials.append(clip_mat)

# RegionView3D letta dalla vista laterale usata dall'utente per la linea rossa.
view_matrix = Matrix((
    (-0.9983524680137634, -0.057379625737667084, -0.0000012738117903, 414.7144470214844),
    (0.019391201436519623, -0.3374099135398865, 0.9411581158638, -21.383136749267578),
    (-0.05400373041629791, 0.9396075010299683, 0.3379666209220886, -257.7937927246094),
    (0.0, 0.0, 0.0, 1.0),
))
cam_data = bpy.data.cameras.new("Camera_Rear_Depth")
cam = bpy.data.objects.new("Camera_Rear_Depth", cam_data)
bpy.context.scene.collection.objects.link(cam)
cam.matrix_world = view_matrix.inverted()
cam.data.type = "PERSP"
cam.data.lens = 32.0
cam.data.clip_start = 0.01
cam.data.clip_end = 1200.0
bpy.context.scene.camera = cam

target = Vector((380.0, -28.0, 12.0))
for name, location, energy, size in (
    ("Rear_Fill", cam.location + Vector((0.0, 0.0, 20.0)), 2300.0, 160.0),
    ("Rear_Rim", target + Vector((-90.0, 100.0, 130.0)), 1800.0, 120.0),
):
    data = bpy.data.lights.new(name, "AREA")
    data.energy = energy
    data.shape = "DISK"
    data.size = size
    light = bpy.data.objects.new(name, data)
    bpy.context.scene.collection.objects.link(light)
    light.location = location
    light.rotation_euler = (target - light.location).to_track_quat("-Z", "Y").to_euler()

scene = bpy.context.scene
scene.render.resolution_x = 1200
scene.render.resolution_y = 600
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = str(OUTPUT)
scene.world.use_nodes = True
background = next(n for n in scene.world.node_tree.nodes if n.type == "BACKGROUND")
background.inputs["Color"].default_value = (0.028, 0.03, 0.034, 1.0)
background.inputs["Strength"].default_value = 0.9
scene.view_settings.look = "AgX - Medium High Contrast"
scene.view_settings.exposure = 2.0
bpy.ops.render.render(write_still=True)
print("Rendered", OUTPUT)
