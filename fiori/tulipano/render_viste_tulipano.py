import bpy
import os
from mathutils import Vector


obj = bpy.data.collections["Tulipano_sorgente_2"].objects[0]
if obj.name not in bpy.context.scene.collection.objects:
    bpy.context.scene.collection.objects.link(obj)
for other in bpy.context.scene.objects:
    other.hide_render = other != obj

material = bpy.data.materials.new("Preview")
material.diffuse_color = (0.85, 0.20, 0.34, 1.0)
obj.data.materials.clear()
obj.data.materials.append(material)

scene = bpy.context.scene
scene.render.engine = "BLENDER_WORKBENCH"
scene.render.resolution_x = 420
scene.render.resolution_y = 640
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.display.shading.light = "STUDIO"
scene.display.shading.show_shadows = True
scene.display.shading.show_cavity = True
scene.display.shading.cavity_type = "WORLD"

camera_data = bpy.data.cameras.new("Camera")
camera = bpy.data.objects.new("Camera", camera_data)
scene.collection.objects.link(camera)
scene.camera = camera
camera.data.type = "ORTHO"
camera.data.ortho_scale = 115

folder = os.path.dirname(bpy.data.filepath)
for label, location in (("retro_menoY", (0, -180, 0)), ("fronte_piuY", (0, 180, 0)), ("laterale", (180, 0, 0))):
    camera.location = location
    direction = Vector((0, 0, 0)) - camera.location
    camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = os.path.join(folder, f"vista_{label}.png")
    bpy.ops.render.render(write_still=True)
