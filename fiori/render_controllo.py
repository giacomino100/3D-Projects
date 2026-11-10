import bpy
import os
import sys
from mathutils import Vector


args = sys.argv[sys.argv.index("--") + 1:]
axis, output = args
meshes = [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]
for obj in meshes:
    obj.hide_render = False

points = [obj.matrix_world @ Vector(corner) for obj in meshes for corner in obj.bound_box]
center = sum(points, Vector()) / len(points)
span = max(
    max(p.x for p in points) - min(p.x for p in points),
    max(p.y for p in points) - min(p.y for p in points),
    max(p.z for p in points) - min(p.z for p in points),
)

camera_data = bpy.data.cameras.new("Camera_controllo")
camera = bpy.data.objects.new("Camera_controllo", camera_data)
bpy.context.scene.collection.objects.link(camera)
bpy.context.scene.camera = camera
camera.data.type = "ORTHO"
camera.data.ortho_scale = span * 1.15
if axis == "Z":
    camera.location = center + Vector((0, 0, span * 3))
elif axis == "+Y":
    camera.location = center + Vector((0, span * 3, 0))
else:
    camera.location = center + Vector((0, -span * 3, 0))
camera.rotation_euler = (center - camera.location).to_track_quat("-Z", "Y").to_euler()

scene = bpy.context.scene
scene.render.engine = "BLENDER_WORKBENCH"
scene.render.resolution_x = 600
scene.render.resolution_y = 700
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.display.shading.light = "STUDIO"
scene.display.shading.show_shadows = True
scene.display.shading.show_cavity = True
scene.render.filepath = output
bpy.ops.render.render(write_still=True)
