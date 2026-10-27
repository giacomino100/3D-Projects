"""Render del presepe (esegue in Blender dopo genera_presepe.main()). 1 unita' = 1 mm."""
import math
import os

import bpy
from mathutils import Vector

OUT = r"C:\Users\giaco\Documents\Progetti 3D\Presepe\mini-presepe-cometa\render"
PARTS = ["BASE", "CAPANNA", "STELLA_COMETA", "MARIA", "GIUSEPPE", "MANGIATOIA_GESU"]


def setup():
    sc = bpy.context.scene
    ids = [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items]
    sc.render.engine = next(i for i in ids if "EEVEE" in i)
    sc.render.resolution_x, sc.render.resolution_y = 1600, 1100
    sc.render.film_transparent = False
    try:
        sc.view_settings.view_transform = "Standard"
        sc.view_settings.look = "None"
    except TypeError:
        pass
    w = sc.world or bpy.data.worlds.new("W")
    sc.world = w
    w.use_nodes = True
    bg = next(n for n in w.node_tree.nodes if n.type == "BACKGROUND")
    bg.inputs["Color"].default_value = (0.30, 0.31, 0.34, 1)
    bg.inputs["Strength"].default_value = 0.6
    for o in [o for o in bpy.data.objects if o.type == "LIGHT" or o.name.startswith("Ground")]:
        bpy.data.objects.remove(o, do_unlink=True)
    bpy.ops.mesh.primitive_plane_add(size=8000, location=(0, 0, -0.01))
    g = bpy.context.active_object
    g.name = "Ground"
    gm = bpy.data.materials.new("GroundM")
    gm.use_nodes = True
    b = next(n for n in gm.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
    b.inputs["Base Color"].default_value = (0.28, 0.28, 0.30, 1)
    b.inputs["Roughness"].default_value = 0.9
    g.data.materials.append(gm)
    for name, rot, e in (("Key", (math.radians(55), 0, math.radians(-40)), 3.0), ("Fill", (math.radians(70), 0, math.radians(70)), 0.8)):
        d = bpy.data.lights.new(name, "SUN")
        d.energy = e
        d.angle = math.radians(12)
        l = bpy.data.objects.new(name, d)
        l.rotation_euler = rot
        bpy.context.collection.objects.link(l)
    cam = bpy.data.cameras.new("Cam")
    cam.lens = 90
    cam.clip_end = 5000
    co = bpy.data.objects.new("Cam", cam)
    bpy.context.collection.objects.link(co)
    sc.camera = co
    return co


def aim(cam, loc, target, lens=90):
    cam.location = loc
    cam.data.lens = lens
    d = Vector(target) - Vector(loc)
    cam.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()


def shot(cam, name, loc, target, lens=90, res=None):
    sc = bpy.context.scene
    if res:
        sc.render.resolution_x, sc.render.resolution_y = res
    aim(cam, loc, target, lens)
    sc.render.filepath = os.path.join(OUT, name + ".png")
    bpy.ops.render.render(write_still=True)


def main():
    cam = setup()
    objs = {n: bpy.data.objects[n] for n in PARTS}
    home = {n: o.location.copy() for n, o in objs.items()}
    ctr = (0, 0, 42)
    shot(cam, "frontale", (0, -520, 55), ctr, 90)
    shot(cam, "tre_quarti", (330, -380, 220), ctr, 90)
    shot(cam, "laterale", (520, 0, 50), (0, 0, 42), 90, (1100, 1100))
    shot(cam, "dettaglio_cometa", (90, -160, 120), (10, 4, 80), 90, (1400, 1000))
    # esploso (ripristinato dopo)
    off = {"BASE": (0, 0, 0), "CAPANNA": (0, 30, 22), "STELLA_COMETA": (0, 30, 55), "MARIA": (-25, -25, 25),
           "GIUSEPPE": (25, -25, 25), "MANGIATOIA_GESU": (0, -25, 25)}
    for n, v in off.items():
        objs[n].location = home[n] + Vector(v)
    shot(cam, "esploso", (300, -640, 330), (0, 0, 62), 70, (1600, 1200))
    for n in PARTS:
        objs[n].location = home[n]


if __name__ == "__main__":
    main()
