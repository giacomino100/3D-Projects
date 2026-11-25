"""Vaso grande (07) scalato a diametro esterno 50 mm + vasetto interno sottile con fori sul fondo.

Unita: 1 unita Blender = 1 mm.   Uso:  blender -b -P crea_vaso_50mm.py
Stesse proporzioni del vaso 114x105 (fattore 50/114), scanalature incluse.
Il vasetto interno si appoggia su 3 piedini ricavati sul fondo del vaso (il vasetto ha il fondo piatto, si stampa senza supporti): l'acqua che esce dai fori si raccoglie sotto, nel vaso decorativo.
"""
import bpy, bmesh, math, os, zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
S = 50.0 / 114.0                 # fattore di scala rispetto al vaso grande

# ---- vaso decorativo (stessa forma di 07, scalata) ----
H = 105.0 * S
WALL = 3.6 * S
FLOOR = 4.0 * S
R_RIM_OUT = 56.6 * S
R_MAX = 25.0                      # diametro 50 mm
R_BASE = 0.80
N_RIBS = 48
RIB_DEPTH = 1.9 * S
COLS = N_RIBS * 8
T_BELLY = 0.46
FILLET = 7.0 * S

# ---- vasetto interno (mm) ----
LINER_WALL = 0.8        # sottile
LINER_FLOOR = 0.8
GAP = 1.05              # gioco radiale dalla cavita del vaso (distanza minima reale ~1 mm)
FOOT_H = 1.2            # piedini: lasciano uno spazio sotto per l'acqua
TOP_DROP = 3.0          # il bordo del vasetto sta 3 mm sotto il bordo del vaso (non si vede)
HOLE_D = 3.0


def shape(t):
    if t <= T_BELLY:
        u = t / T_BELLY
        return R_BASE + (1.0 - R_BASE) * (1.0 - (1.0 - u) ** 2.4)
    k = (t - T_BELLY) / (1.0 - T_BELLY)
    return 1.0 - (1.0 - R_RIM_OUT / R_MAX) * k


def r_out(z):
    r = R_MAX * shape(z / H)
    if z < FILLET:
        r -= FILLET * (1.0 - math.sqrt(max(0.0, 1.0 - ((FILLET - z) / FILLET) ** 2)))
    return r


def r_in(z):
    return r_out(z) - WALL


def revolve(pts, cols, ribs=False, closed=False):
    bm = bmesh.new()
    rows = []
    for (r, z, kind) in pts:
        if r < 1e-6:
            rows.append([bm.verts.new((0, 0, z))])
            continue
        row = []
        for j in range(cols):
            th = 2 * math.pi * j / cols
            rr = r
            if ribs and kind == 'out':
                fade = min(1.0, z / (H * 0.10)) * min(1.0, (H - z) / (H * 0.02))
                rib = 0.5 - 0.5 * math.cos(N_RIBS * th)
                rr = r - RIB_DEPTH * (rib ** 0.75) * fade
            row.append(bm.verts.new((rr * math.cos(th), rr * math.sin(th), z)))
        rows.append(row)
    pairs = list(zip(rows, rows[1:])) + ([(rows[-1], rows[0])] if closed else [])
    for a, b in pairs:
        if len(a) == 1:
            for j in range(cols):
                bm.faces.new((a[0], b[(j + 1) % cols], b[j]))
        elif len(b) == 1:
            for j in range(cols):
                bm.faces.new((a[j], a[(j + 1) % cols], b[0]))
        else:
            for j in range(cols):
                bm.faces.new((a[j], a[(j + 1) % cols], b[(j + 1) % cols], b[j]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    if bm.calc_volume(signed=True) < 0:
        bmesh.ops.reverse_faces(bm, faces=bm.faces)
    return bm


# ================= VASO =================
pts = [(0.0, 0.0, 'pole')]
for i in range(1, 5):
    pts.append((r_out(0.0) * i / 4.0, 0.0, 'base'))
NZ = 90
for i in range(1, NZ + 1):
    z = H * (i / NZ) ** 1.6
    pts.append((r_out(z), z, 'out'))
pts.append((r_out(H) - WALL * 0.5, H, 'rim'))
pts.append((r_in(H), H - 0.3, 'rim'))
for i in range(NZ - 1, -1, -1):
    z = FLOOR + (H - FLOOR) * i / NZ
    pts.append((r_in(z), z, 'in'))
pts.append((r_in(FLOOR) - 1.3, FLOOR, 'floor'))
pts.append((0.0, FLOOR, 'pole'))
bm = revolve(pts, COLS, ribs=True)
vaso_info = (bm.calc_volume(signed=True), sum(1 for e in bm.edges if not e.is_manifold))

# ================= VASETTO INTERNO =================
Z0 = FLOOR + FOOT_H
ZT = H - TOP_DROP


def rl(z):
    return r_in(z) - GAP


lp = [(rl(Z0) - LINER_WALL, Z0, 'base'), (rl(Z0) - LINER_WALL / 2, Z0, 'base'), (rl(Z0), Z0, 'base')]
NL = 60
for i in range(1, NL + 1):
    z = Z0 + (ZT - Z0) * (i / NL) ** 1.5
    lp.append((rl(z), z, 'out'))
lp.append((rl(ZT) - LINER_WALL * 0.5, ZT, 'rim'))
lp.append((rl(ZT) - LINER_WALL, ZT - 0.2, 'rim'))
for i in range(NL - 1, 0, -1):
    z = Z0 + (ZT - Z0) * i / NL
    lp.append((rl(z) - LINER_WALL, z, 'in'))
lbm = revolve(lp, 96, closed=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
scn = bpy.context.scene
scn.unit_settings.system = 'METRIC'
scn.unit_settings.scale_length = 0.001
scn.unit_settings.length_unit = 'MILLIMETERS'


def mk(name, b, color):
    me = bpy.data.meshes.new(name)
    b.to_mesh(me)
    b.free()
    o = bpy.data.objects.new(name, me)
    scn.collection.objects.link(o)
    for p in me.polygons:
        p.use_smooth = True
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    n = next(x for x in m.node_tree.nodes if x.type == 'BSDF_PRINCIPLED')
    n.inputs['Base Color'].default_value = color
    n.inputs['Roughness'].default_value = 0.6
    me.materials.append(m)
    return o


vaso = mk("VASO_50mm", bm, (0.86, 0.47, 0.37, 1))
liner = mk("VASETTO_INTERNO", lbm, (0.9, 0.9, 0.9, 1))

# fondo del vasetto: disco separato (si sovrappone alla parete) con 1 foro centrale + 6 su cerchio r=8
fdb = bmesh.new()
bmesh.ops.create_cone(fdb, cap_ends=True, segments=96, radius1=rl(Z0) - LINER_WALL + 0.4,
                      radius2=rl(Z0) - LINER_WALL + 0.4, depth=LINER_FLOOR)
bmesh.ops.translate(fdb, verts=fdb.verts, vec=(0, 0, Z0 + LINER_FLOOR / 2))
fme = bpy.data.meshes.new("fondo")
fdb.to_mesh(fme)
fdb.free()
fondo = bpy.data.objects.new("fondo", fme)
scn.collection.objects.link(fondo)
hole_pos = [(0, 0)] + [(8 * math.cos(math.radians(60 * k)), 8 * math.sin(math.radians(60 * k))) for k in range(6)]
cutters = []
for (x, y) in hole_pos:
    cb = bmesh.new()
    bmesh.ops.create_cone(cb, cap_ends=True, segments=24, radius1=HOLE_D / 2, radius2=HOLE_D / 2,
                          depth=LINER_FLOOR + 2.0)
    bmesh.ops.translate(cb, verts=cb.verts, vec=(x, y, Z0 + LINER_FLOOR / 2))
    me = bpy.data.meshes.new("c")
    cb.to_mesh(me)
    cb.free()
    c = bpy.data.objects.new("c", me)
    scn.collection.objects.link(c)
    cutters.append(c)
bpy.context.view_layer.objects.active = fondo
for c in cutters:
    md = fondo.modifiers.new("f", 'BOOLEAN')
    md.operation = 'DIFFERENCE'
    md.solver = 'EXACT'
    md.object = c
    bpy.ops.object.modifier_apply(modifier=md.name)
    bpy.data.objects.remove(c)

# 3 piedini sul fondo del VASO (incassati di 0.3 mm nel fondo); il vasetto ci poggia sopra
feet = []
for k in range(3):
    a = math.radians(120 * k + 30)
    fb = bmesh.new()
    bmesh.ops.create_cone(fb, cap_ends=True, segments=16, radius1=1.6, radius2=1.6, depth=FOOT_H + 0.3)
    bmesh.ops.translate(fb, verts=fb.verts, vec=(12 * math.cos(a), 12 * math.sin(a), FLOOR + (FOOT_H - 0.3) / 2))
    me = bpy.data.meshes.new("p")
    fb.to_mesh(me)
    fb.free()
    o = bpy.data.objects.new("p", me)
    scn.collection.objects.link(o)
    feet.append(o)
bpy.ops.object.select_all(action='DESELECT')
for o in [fondo, liner]:
    o.select_set(True)
bpy.context.view_layer.objects.active = liner
bpy.ops.object.join()
liner.name = "VASETTO_INTERNO"
bpy.ops.object.select_all(action='DESELECT')
for o in feet + [vaso]:
    o.select_set(True)
bpy.context.view_layer.objects.active = vaso
bpy.ops.object.join()
vaso.name = "VASO_50mm"

# controlli
min_gap = min(r_in(z) - rl(z) for z in [Z0 + (ZT - Z0) * k / 100 for k in range(101)])
lbmc = bmesh.new()
lbmc.from_mesh(liner.data)
print(f"VASO: vol={vaso_info[0]:.0f} mm3 non-manifold={vaso_info[1]}  diametro={2*R_MAX:.1f} h={H:.1f} diam. interno bordo={2*r_in(H):.1f}")
print(f"VASETTO: h={ZT-Z0:.1f} (appoggiato su piedini del vaso alti {FOOT_H}) diametro bordo={2*rl(ZT):.1f} fondo={2*rl(Z0):.1f} gioco={min_gap:.2f} vol={lbmc.calc_volume(signed=True):.0f} mm3")
print("vasetto non-manifold:", sum(1 for e in lbmc.edges if not e.is_manifold))

# camera/luce
cam = bpy.data.objects.new("Camera", bpy.data.cameras.new("Camera"))
cam.location = (120, -150, 100)
cam.rotation_euler = (math.radians(65), 0, math.radians(38))
cam.data.clip_end = 5000
scn.collection.objects.link(cam)
scn.camera = cam
sun = bpy.data.objects.new("Sole", bpy.data.lights.new("Sole", 'SUN'))
sun.data.energy = 3
sun.rotation_euler = (math.radians(50), 0, math.radians(30))
scn.collection.objects.link(sun)

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, "vaso_50mm.blend"))


# ---- export 3MF ----
def mesh_xml(o, idn, dx, dy, dz):
    me = o.data
    me.calc_loop_triangles()
    vs = "".join('<vertex x="%.4f" y="%.4f" z="%.4f"/>' % (v.co.x + dx, v.co.y + dy, v.co.z + dz) for v in me.vertices)
    ts = "".join('<triangle v1="%d" v2="%d" v3="%d"/>' % tuple(t.vertices) for t in me.loop_triangles)
    return ('<object id="%d" name="%s" type="model"><mesh><vertices>%s</vertices><triangles>%s</triangles></mesh></object>'
            % (idn, o.name, vs, ts))


def write3mf(path, items):
    objs = "".join(mesh_xml(o, i + 1, dx, dy, dz) for i, (o, dx, dy, dz) in enumerate(items))
    build = "".join('<item objectid="%d"/>' % (i + 1) for i in range(len(items)))
    model = ('<?xml version="1.0" encoding="UTF-8"?>'
             '<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">'
             '<resources>%s</resources><build>%s</build></model>' % (objs, build))
    ct = ('<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
          '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
          '<Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/></Types>')
    rels = ('<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>')
    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", ct)
        z.writestr("_rels/.rels", rels)
        z.writestr("3D/3dmodel.model", model)


out = os.path.join(HERE, "3MF")
os.makedirs(out, exist_ok=True)
# il vasetto ha il fondo piatto a z = Z0: lo abbasso cosi poggia sul piatto (z=0)
write3mf(os.path.join(out, "vaso_50mm.3mf"), [(vaso, 0, 0, 0)])
write3mf(os.path.join(out, "vasetto_interno_50mm.3mf"), [(liner, 0, 0, -Z0)])
write3mf(os.path.join(out, "vaso_50mm_e_vasetto.3mf"), [(vaso, -22, 0, 0), (liner, 22, 0, -Z0)])
print("3MF scritti in", out)
