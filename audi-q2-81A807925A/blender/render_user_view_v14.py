"""Render V13/V14 usando la vista Blender annotata dall'utente."""

import os
from pathlib import Path

import bpy
from mathutils import Matrix, Vector


ROOT = Path(__file__).resolve().parents[1]
VERSION = os.environ.get("Q2_VERSION", "V14").upper()
OUTPUT = ROOT / "cad" / "blender" / f"{VERSION}_user_view_check.png"

body = bpy.data.objects[f"BODY_81A807925A_{VERSION}"]
for obj in bpy.context.scene.objects:
    if obj.type == "MESH" and obj != body:
        obj.hide_render = True

mat = bpy.data.materials.new("User_View_Silver")
mat.use_nodes = True
shader = next(n for n in mat.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
shader.inputs["Base Color"].default_value = (0.62, 0.65, 0.69, 1.0)
shader.inputs["Metallic"].default_value = 0.2
shader.inputs["Roughness"].default_value = 0.38
body.data.materials.clear()
body.data.materials.append(mat)

# Matrice letta dalla RegionView3D dell'utente prima della ricostruzione V14.
view_matrix = Matrix((
    (-0.9953464269638062, -0.09635981917381287, -0.0000004149894153, 311.5414123535156),
    (-0.06913656741380692, 0.7141416072845459, 0.6965786814689636, 57.09394454956055),
    (-0.06712190061807632, 0.6933372020721436, -0.7174802422523499, -148.00279235839844),
    (0.0, 0.0, 0.0, 1.0),
))
cam_data = bpy.data.cameras.new("Camera_User_View")
cam = bpy.data.objects.new("Camera_User_View", cam_data)
bpy.context.scene.collection.objects.link(cam)
cam.matrix_world = view_matrix.inverted()
cam.data.type = "PERSP"
# Il viewport includeva barre laterali; un'inquadratura leggermente piu larga
# conserva la stessa direzione ma comprende tutta la zona END A annotata.
cam.data.lens = 30.0
cam.data.clip_start = 0.01
cam.data.clip_end = 1000.0
bpy.context.scene.camera = cam

target = Vector((320.6, -36.0, 5.0))
for name, location, energy, size in (
    ("User_Fill", cam.location + Vector((0.0, 0.0, 15.0)), 2100.0, 140.0),
    ("User_Key", target + Vector((-80.0, -120.0, -150.0)), 1500.0, 130.0),
    ("User_Rim", target + Vector((90.0, 80.0, 100.0)), 1700.0, 100.0),
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
scene.render.resolution_y = 710
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = str(OUTPUT)
scene.world.use_nodes = True
background = next(n for n in scene.world.node_tree.nodes if n.type == "BACKGROUND")
background.inputs["Color"].default_value = (0.035, 0.035, 0.035, 1.0)
background.inputs["Strength"].default_value = 0.8
scene.view_settings.look = "AgX - Medium High Contrast"
scene.view_settings.exposure = 1.8
bpy.ops.render.render(write_still=True)
print("Rendered", OUTPUT)
