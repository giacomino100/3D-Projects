"""Render diagnostico ravvicinato del fondo posteriore END A."""

import os
from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
VERSION = os.environ.get("Q2_VERSION", "V16").upper()
SIDE = os.environ.get("Q2_SIDE", "rear").lower()
OUTPUT = ROOT / "cad" / "blender" / f"{VERSION}_END_A_{SIDE}_check.png"

body = bpy.data.objects[f"BODY_81A807925A_{VERSION}"]
body.color = (0.58, 0.61, 0.65, 1.0)
for obj in bpy.context.scene.objects:
    if obj.type == "MESH" and obj != body:
        obj.hide_render = True

target = Vector((405.0, -30.0, 7.0))
camera_data = bpy.data.cameras.new("Camera_END_A_Floor")
camera = bpy.data.objects.new("Camera_END_A_Floor", camera_data)
bpy.context.scene.collection.objects.link(camera)
z_eye = 126.0 if SIDE == "rear" else -126.0
camera.location = target + Vector((88.0, -105.0, z_eye))
camera.rotation_euler = (target - camera.location).to_track_quat("-Z", "Y").to_euler()
camera.data.type = "PERSP"
camera.data.lens = 57.0
camera.data.clip_start = 0.1
camera.data.clip_end = 1000.0

scene = bpy.context.scene
scene.camera = camera
scene.render.engine = "BLENDER_WORKBENCH"
scene.display.shading.light = "STUDIO"
scene.display.shading.studio_light = "paint.sl"
scene.display.shading.color_type = "OBJECT"
scene.display.shading.show_shadows = True
scene.display.shading.show_cavity = True
scene.display.shading.cavity_type = "WORLD"
scene.display.shading.curvature_ridge_factor = 1.8
scene.display.shading.curvature_valley_factor = 1.8
scene.display.shading.background_type = "VIEWPORT"
scene.display.shading.background_color = (0.035, 0.04, 0.05)
scene.render.resolution_x = 1200
scene.render.resolution_y = 800
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = str(OUTPUT)
bpy.ops.render.render(write_still=True)
print("Rendered", OUTPUT)
