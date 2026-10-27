"""Riepilogo geometrico e render posteriore diagnostico delle sei clip V18."""

from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "cad" / "blender" / "V18_clip_audit_rear.png"
BODY = "BODY_81A807925A_V18"
CLIPS = ("CLIP_C01", "CLIP_C02", "CLIP_C03", "CLIP_C05", "CLIP_C06", "CLIP_C07")


def bounds(obj):
    points = [obj.matrix_world @ Vector(corner) for corner in obj.bound_box]
    mins = Vector(tuple(min(point[i] for point in points) for i in range(3)))
    maxs = Vector(tuple(max(point[i] for point in points) for i in range(3)))
    return mins, maxs


body = bpy.data.objects[BODY]
objects = [body] + [bpy.data.objects[name] for name in CLIPS]
all_points = [obj.matrix_world @ Vector(corner) for obj in objects for corner in obj.bound_box]
all_min = Vector(tuple(min(point[i] for point in all_points) for i in range(3)))
all_max = Vector(tuple(max(point[i] for point in all_points) for i in range(3)))
center = (all_min + all_max) * 0.5

for obj in objects:
    mins, maxs = bounds(obj)
    dims = maxs - mins
    ctr = (mins + maxs) * 0.5
    print(
        "CLIP_AUDIT",
        obj.name,
        "center", tuple(round(value, 2) for value in ctr),
        "dims", tuple(round(value, 2) for value in dims),
        "min", tuple(round(value, 2) for value in mins),
        "max", tuple(round(value, 2) for value in maxs),
    )

body.color = (0.58, 0.61, 0.65, 1.0)
for name in CLIPS:
    bpy.data.objects[name].color = (0.95, 0.17, 0.04, 1.0)

camera_data = bpy.data.cameras.new("Camera_Clip_Audit_Rear")
camera = bpy.data.objects.new("Camera_Clip_Audit_Rear", camera_data)
bpy.context.scene.collection.objects.link(camera)
camera.location = (center.x, center.y, all_max.z + 600.0)
camera.rotation_euler = (0.0, 0.0, 0.0)
camera.data.type = "ORTHO"
camera.data.ortho_scale = max((all_max.x - all_min.x) * 1.06, (all_max.y - all_min.y) * 4.0)
camera.data.clip_start = 0.1
camera.data.clip_end = 2000.0

scene = bpy.context.scene
scene.camera = camera
scene.render.engine = "BLENDER_WORKBENCH"
scene.display.shading.light = "STUDIO"
scene.display.shading.color_type = "OBJECT"
scene.display.shading.show_shadows = True
scene.display.shading.show_cavity = True
scene.display.shading.cavity_type = "WORLD"
scene.render.resolution_x = 1800
scene.render.resolution_y = 520
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = str(OUTPUT)
scene.render.film_transparent = False
scene.world.color = (0.04, 0.04, 0.04)

bpy.ops.render.render(write_still=True)
print("CLIP_AUDIT_RENDER", OUTPUT)

