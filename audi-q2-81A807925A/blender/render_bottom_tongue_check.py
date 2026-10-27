"""Render comparabile del raccordo della linguetta inferiore (V12/V13)."""

import os
from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
VERSION = os.environ.get("Q2_VERSION", "V13").upper()
OUTPUT = ROOT / "cad" / "blender" / f"{VERSION}_bottom_tongue_check.png"


def aim(obj, target):
    obj.rotation_euler = (target - obj.location).to_track_quat("-Z", "Y").to_euler()


body = bpy.data.objects[f"BODY_81A807925A_{VERSION}"]
for obj in bpy.context.scene.objects:
    if obj.type == "MESH" and obj != body:
        obj.hide_render = True

mat = bpy.data.materials.new("Bottom_Tongue_Check_Silver")
mat.use_nodes = True
shader = next(n for n in mat.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
shader.inputs["Base Color"].default_value = (0.62, 0.67, 0.74, 1.0)
shader.inputs["Metallic"].default_value = 0.15
shader.inputs["Roughness"].default_value = 0.4
body.data.materials.clear()
body.data.materials.append(mat)

# Guarda nella rientranza dal basso: il contorno frontale rimane diritto mentre
# il ritorno arretrato deve proseguire fino al D-end e raccordarsi alla cavita.
target = Vector((348.0, -39.0, 5.0))
cam_data = bpy.data.cameras.new("Camera_Bottom_Tongue_Check")
cam = bpy.data.objects.new("Camera_Bottom_Tongue_Check", cam_data)
bpy.context.scene.collection.objects.link(cam)
cam.location = target + Vector((0.0, 58.0, -165.0))
cam.data.type = "ORTHO"
cam.data.ortho_scale = 105.0
aim(cam, target)
bpy.context.scene.camera = cam

for name, location, energy, size in (
    ("Bottom_Key", target + Vector((-45.0, 80.0, -105.0)), 1400.0, 95.0),
    ("Bottom_Rim", target + Vector((55.0, -45.0, 90.0)), 1650.0, 75.0),
):
    data = bpy.data.lights.new(name, "AREA")
    data.energy = energy
    data.shape = "DISK"
    data.size = size
    light = bpy.data.objects.new(name, data)
    bpy.context.scene.collection.objects.link(light)
    light.location = location
    aim(light, target)

scene = bpy.context.scene
scene.render.resolution_x = 1200
scene.render.resolution_y = 720
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = str(OUTPUT)
scene.world.use_nodes = True
background = next(n for n in scene.world.node_tree.nodes if n.type == "BACKGROUND")
background.inputs["Color"].default_value = (0.035, 0.04, 0.05, 1.0)
background.inputs["Strength"].default_value = 0.8
scene.view_settings.look = "AgX - Medium High Contrast"
scene.view_settings.exposure = 1.8
bpy.ops.render.render(write_still=True)
print("Rendered", OUTPUT)
