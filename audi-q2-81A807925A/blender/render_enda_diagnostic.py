"""Vista diagnostica ravvicinata di END A, senza salvare modifiche al blend."""

from __future__ import annotations

import os
from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
VERSION = os.environ.get("Q2_VERSION", "V9").upper()
OUTPUT = ROOT / "cad" / "blender" / f"{VERSION}_END_A_diagnostic.png"


def aim(obj: bpy.types.Object, target: Vector) -> None:
    obj.rotation_euler = (target - obj.location).to_track_quat("-Z", "Y").to_euler()


body = bpy.data.objects[f"BODY_81A807925A_{VERSION}"]
for obj in bpy.context.scene.objects:
    if obj.type == "MESH" and obj != body:
        obj.hide_render = True

diagnostic = bpy.data.materials.new("Diagnostic_Matte")
diagnostic.use_nodes = True
shader = next(node for node in diagnostic.node_tree.nodes if node.type == "BSDF_PRINCIPLED")
shader.inputs["Base Color"].default_value = (0.72, 0.76, 0.82, 1.0)
shader.inputs["Metallic"].default_value = 0.0
shader.inputs["Roughness"].default_value = 0.62
body.data.materials.clear()
body.data.materials.append(diagnostic)

# END A is the high-X end in the CAD frame. The camera is on the visible/front side (-Z).
target = Vector((410.0, -29.0, -4.0))
camera_data = bpy.data.cameras.new("Camera_END_A")
camera = bpy.data.objects.new("Camera_END_A", camera_data)
bpy.context.scene.collection.objects.link(camera)
camera.location = target + Vector((0.0, -38.0, -180.0))
camera.data.type = "ORTHO"
camera.data.ortho_scale = 190.0
aim(camera, target)
bpy.context.scene.camera = camera

for name, direction, energy, angle in (
    ("Sun_Key", Vector((-0.5, -0.8, -1.0)), 3.0, 0.18),
    ("Sun_Fill", Vector((0.8, 0.25, -1.0)), 1.2, 0.35),
):
    light_data = bpy.data.lights.new(name, "SUN")
    light_data.energy = energy
    light_data.angle = angle
    light = bpy.data.objects.new(name, light_data)
    bpy.context.scene.collection.objects.link(light)
    light.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()

scene = bpy.context.scene
scene.render.resolution_x = 1100
scene.render.resolution_y = 760
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = str(OUTPUT)
scene.world.use_nodes = True
background = next(node for node in scene.world.node_tree.nodes if node.type == "BACKGROUND")
background.inputs["Color"].default_value = (0.12, 0.14, 0.18, 1.0)
background.inputs["Strength"].default_value = 0.9
scene.view_settings.look = "AgX - Medium High Contrast"
scene.view_settings.exposure = 1.25
bpy.ops.render.render(write_still=True)
print(f"Rendered: {OUTPUT}")
