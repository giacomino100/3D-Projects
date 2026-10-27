"""Render frontale diagnostico della scena Blender V9 (nessun salvataggio scena)."""

from __future__ import annotations

from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "cad" / "blender" / "81A807925A_V9_Blender_check.png"


def aim(obj: bpy.types.Object, target: Vector) -> None:
    obj.rotation_euler = (target - obj.location).to_track_quat("-Z", "Y").to_euler()


meshes = [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]
corners = [obj.matrix_world @ Vector(corner) for obj in meshes for corner in obj.bound_box]
minimum = Vector((min(p.x for p in corners), min(p.y for p in corners), min(p.z for p in corners)))
maximum = Vector((max(p.x for p in corners), max(p.y for p in corners), max(p.z for p in corners)))
center = (minimum + maximum) * 0.5

camera_data = bpy.data.cameras.new("Camera_Check")
camera = bpy.data.objects.new("Camera_Check", camera_data)
bpy.context.scene.collection.objects.link(camera)
camera.location = center + Vector((0.0, 0.0, -700.0))
camera.data.type = "ORTHO"
camera.data.ortho_scale = (maximum.x - minimum.x) * 1.08
aim(camera, center)
bpy.context.scene.camera = camera

for name, location, energy, size in (
    ("Key_Check", center + Vector((-120.0, -170.0, -320.0)), 1700.0, 260.0),
    ("Fill_Check", center + Vector((180.0, 100.0, -260.0)), 1100.0, 220.0),
    ("Rim_Check", center + Vector((0.0, 0.0, 260.0)), 1300.0, 180.0),
):
    light_data = bpy.data.lights.new(name, "AREA")
    light_data.energy = energy
    light_data.shape = "DISK"
    light_data.size = size
    light = bpy.data.objects.new(name, light_data)
    bpy.context.scene.collection.objects.link(light)
    light.location = location
    aim(light, center)

scene = bpy.context.scene
scene.render.resolution_x = 1600
scene.render.resolution_y = 420
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = str(OUTPUT)
scene.render.film_transparent = False
scene.world.use_nodes = True
background = next(node for node in scene.world.node_tree.nodes if node.type == "BACKGROUND")
background.inputs["Color"].default_value = (0.16, 0.18, 0.22, 1.0)
background.inputs["Strength"].default_value = 0.8
bpy.ops.render.render(write_still=True)
print(f"Rendered: {OUTPUT}")
