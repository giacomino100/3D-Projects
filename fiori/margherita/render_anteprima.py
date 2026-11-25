"""Render di anteprima: blender -b margherita.blend --python render_anteprima.py"""
import bpy
import math
import os
from mathutils import Vector

FOLDER = os.path.dirname(bpy.data.filepath)
OUT = os.path.join(FOLDER, 'anteprime')
os.makedirs(OUT, exist_ok=True)
scene = bpy.context.scene

for engine in ('BLENDER_EEVEE', 'BLENDER_EEVEE_NEXT', 'CYCLES'):
    try:
        scene.render.engine = engine
        break
    except TypeError:
        pass
scene.render.resolution_x, scene.render.resolution_y = 900, 1100
scene.world = scene.world or bpy.data.worlds.new('World')
scene.world.use_nodes = True
bg = next(n for n in scene.world.node_tree.nodes if n.type == 'BACKGROUND')
bg.inputs[0].default_value = (0.42, 0.42, 0.42, 1)
bg.inputs[1].default_value = 0.6
scene.view_settings.view_transform = 'Standard'

sun = bpy.data.objects.new('Sole', bpy.data.lights.new('Sole', 'SUN'))
sun.data.energy = 3.5
sun.rotation_euler = (math.radians(35), math.radians(-25), math.radians(20))
scene.collection.objects.link(sun)

cam = bpy.data.objects.new('Camera', bpy.data.cameras.new('Camera'))
cam.data.clip_end = 2000
scene.collection.objects.link(cam)
scene.camera = cam
target = Vector((0, -30, 1))


def shoot(name, direction, ortho=None, lens=80):
    direction = Vector(direction).normalized()
    cam.location = target + direction * 330
    cam.rotation_euler = (target - cam.location).to_track_quat('-Z', 'Y').to_euler()
    if ortho:
        cam.data.type, cam.data.ortho_scale = 'ORTHO', ortho
    else:
        cam.data.type, cam.data.lens = 'PERSP', lens
    scene.render.filepath = os.path.join(OUT, name)
    bpy.ops.render.render(write_still=True)
    print('RENDER', scene.render.filepath)


shoot('margherita_fronte.png', (0, -0.001, 1), ortho=128)
shoot('margherita_prospettiva.png', (0.55, -0.9, 0.75), lens=105)
