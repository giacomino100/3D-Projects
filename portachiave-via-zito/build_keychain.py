"""Portachiave rotondo 'LOCALI / VIA ZITO'. Run: blender -b -P build_keychain.py"""
import bpy, os, math

# --- parametri (mm) ---
D = 40.0        # diametro disco
T = 4.0         # spessore
RIM_W = 1.5     # larghezza bordo rialzato
RIM_H = 1.0     # altezza bordo rialzato
LUG_D = 12.0    # diametro occhiello
HOLE_D = 5.0    # foro
ENGR = 0.8      # profondita' incisione
TXT1, TXT2 = "LOCALI", "PARROCCHIALI"
out = os.path.dirname(os.path.abspath(__file__))

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.unit_settings.system = 'METRIC'; sc.unit_settings.scale_length = 0.001

def cyl(name, d, h, x=0, y=0, z=0):
    bpy.ops.mesh.primitive_cylinder_add(vertices=128, radius=d/2, depth=h, location=(x, y, z))
    o = bpy.context.object; o.name = name; return o

def boolean(a, b, op):
    m = a.modifiers.new("b", 'BOOLEAN'); m.operation = op; m.object = b; m.solver = 'EXACT'
    bpy.context.view_layer.objects.active = a
    bpy.ops.object.modifier_apply(modifier=m.name)
    bpy.data.objects.remove(b, do_unlink=True)

ly = D/2 + LUG_D/2 - 3.0   # occhiello sovrapposto al disco
body = cyl("Portachiave", D, T, z=T/2)
boolean(body, cyl("lug", LUG_D, T, y=ly, z=T/2), 'UNION')
# bordo rialzato (anello)
ring = cyl("ring", D, RIM_H, z=T + RIM_H/2)
boolean(ring, cyl("ringin", D - 2*RIM_W, RIM_H*2, z=T + RIM_H/2), 'DIFFERENCE')
boolean(body, ring, 'UNION')
# foro
boolean(body, cyl("hole", HOLE_D, T*3, y=ly, z=T/2), 'DIFFERENCE')

import bmesh
def prism(name, pts, z0, h):
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    vs = [bm.verts.new((x, y, z0)) for x, y in pts]
    f = bm.faces.new(vs)
    if f.normal.z < 0: f.normal_flip()
    r = bmesh.ops.extrude_face_region(bm, geom=[f])
    bmesh.ops.translate(bm, vec=(0, 0, h), verts=[v for v in r['geom'] if isinstance(v, bmesh.types.BMVert)])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o); return o

def arch(w, y0, y1, n=24):
    """rettangolo largo w da y0 con arco in cima fino a y1"""
    r = w/2; yc = y1 - r
    pts = [(-r, y0), (r, y0), (r, yc)]
    pts += [(r*math.cos(math.pi*k/n), yc + r*math.sin(math.pi*k/n)) for k in range(1, n)]
    pts += [(-r, yc)]
    return pts

def circle(cx, cy, r, n=32):
    return [(cx + r*math.cos(2*math.pi*k/n), cy + r*math.sin(2*math.pi*k/n)) for k in range(n)]

def shift(pts, dx, dy): return [(x+dx, y+dy) for x, y in pts]

# --- casetta (rilievo) ---
HH = 1.0                    # altezza rilievo sopra il disco
z0 = T - 0.1
# casa a due altezze (rilievo) con finestre/portone FORATI + sole a raggi forato
K, OY = 0.9, 2.0
def X(pts, dx=0): return [((x+dx)*K, y*K + OY) for x, y in pts]
outline = [(-10, -1), (11, -1), (11, 7), (1, 7), (1, 13), (-10, 13)]
boolean(body, prism("house", X(outline), z0, HH + 0.1), 'UNION')
def thru(name, pts): boolean(body, prism(name, pts, -1, T + 4), 'DIFFERENCE')
thru("door", X(arch(3.6, -1.1, 4.6), -4.5))
for dx in (-7.5, -1.5): thru("winA", X(arch(2.4, 7.5, 11.0), dx))
for dx in (-7.5, -1.5): thru("winB", X(arch(2.4, 2.4, 5.2), dx)) if False else None
for dx in (4.3, 8.0): thru("winC", X(arch(2.4, 1.8, 5.2), dx))
# croce forata in alto a destra
cx, cy, w2 = 6.4, 0.0, 0.8
cross = [(-w2, 9.2), (w2, 9.2), (w2, 12.6), (2.5, 12.6), (2.5, 14.2), (w2, 14.2), (w2, 16.0),
         (-w2, 16.0), (-w2, 14.2), (-2.5, 14.2), (-2.5, 12.6), (-w2, 12.6)]
thru("cross", [(x + cx, y + cy) for x, y in cross])

def text(s, size, y, flip=False):
    bpy.ops.object.text_add(location=(0, y, T - ENGR + 1.0))
    t = bpy.context.object; t.data.body = s; t.data.size = size
    t.data.align_x = 'CENTER'; t.data.align_y = 'CENTER'
    t.data.extrude = 1.0
    bpy.ops.object.convert(target='MESH'); return bpy.context.object
for s, sz, y, maxw in ((TXT1, 6.0, -3.0, 22), (TXT2, 6.0, -8.7, 27), ("VIA ZITO", 6.0, -14.0, 16)):
    t = text(s, sz, y)
    w = t.dimensions.x
    if w > maxw: t.scale.x = t.scale.y = maxw/w; bpy.context.view_layer.update()
    boolean(body, t, 'DIFFERENCE')

# retro: VIA ZITO inciso (specchiato, si legge girando il portachiave)
bpy.ops.object.text_add(location=(0, -2, ENGR - 1.0))
t = bpy.context.object; t.data.body = "VIA ZITO"; t.data.size = 6.0
t.data.align_x = 'CENTER'; t.data.align_y = 'CENTER'; t.data.extrude = 1.0
t.rotation_euler = (math.pi, 0, 0)
bpy.ops.object.convert(target='MESH'); t = bpy.context.object
if t.dimensions.x > 26: t.scale.x = t.scale.y = 26/t.dimensions.x
bpy.context.view_layer.update(); boolean(body, t, 'DIFFERENCE')

bpy.ops.object.select_all(action='DESELECT'); body.select_set(True)
bpy.context.view_layer.objects.active = body
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(out, "portachiave_via_zito.blend"))
try:
    bpy.ops.wm.stl_export(filepath=os.path.join(out, "portachiave_via_zito.stl"), export_selected_objects=True, global_scale=1.0)
except Exception:
    bpy.ops.export_mesh.stl(filepath=os.path.join(out, "portachiave_via_zito.stl"), use_selection=True)
print("DIMS", tuple(round(v,2) for v in body.dimensions))
