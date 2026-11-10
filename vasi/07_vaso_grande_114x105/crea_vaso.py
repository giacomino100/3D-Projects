"""Crea il progetto Blender del vaso (cachepot scanalato) dalla foto di riferimento.

Unita': 1 unita' Blender = 1 mm.
Il vaso deve contenere un vasetto standard da 10 cm (bordo 100 mm, fondo ~70 mm, h ~85 mm).
Uso:  blender -b -P crea_vaso.py
"""
import bpy, bmesh, math, os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "vaso.blend")
PHOTO = os.path.join(HERE, "vaso_riferimento.jpg")

# ---- parametri (mm) ----
H = 105.0            # altezza
WALL = 3.6           # spessore parete (misurato dalla cresta delle scanalature)
FLOOR = 4.0          # spessore fondo
R_RIM_OUT = 56.6     # raggio esterno al bordo (quasi uguale al massimo: parete dritta)
R_MAX = 57.0         # raggio esterno massimo (parete dritta)
R_BASE = 0.80        # raggio al fondo / R_MAX
N_RIBS = 48          # scanalature
RIB_DEPTH = 1.9       # profondita' scanalature (spessore minimo nel solco = WALL - RIB_DEPTH)
COLS = N_RIBS * 8
# fascia di ciclo per il vasetto interno da 10 cm
POT_TOP_R, POT_BOT_R, POT_H = 50.0, 35.0, 85.0

# profilo esterno (t = quota/H, raggio/R_MAX), forma letta dalla foto
OUT_PROFILE = [(0.00, R_BASE), (0.03, R_BASE + 0.025), (0.12, 0.865), (0.28, 0.945),
               (0.45, 0.995), (0.62, 1.0), (0.80, 0.985), (0.94, R_RIM_OUT / R_MAX + 0.004),
               (1.00, R_RIM_OUT / R_MAX)]


T_BELLY = 0.46       # sotto questa quota (frazione di H) la parete si restringe verso il fondo
FILLET = 7.0         # raggio di raccordo dello spigolo del fondo (mm)


def shape(t):
    """Raggio relativo a R_MAX: parete dritta, poi curva morbida (tangente alla parete) verso il fondo."""
    if t <= T_BELLY:
        u = t / T_BELLY
        return R_BASE + (1.0 - R_BASE) * (1.0 - (1.0 - u) ** 2.4)   # ease-out: tangente verticale in alto
    k = (t - T_BELLY) / (1.0 - T_BELLY)
    return 1.0 - (1.0 - R_RIM_OUT / R_MAX) * k


def r_out(z):
    r = R_MAX * shape(z / H)
    if z < FILLET:   # spigolo del fondo arrotondato
        r -= FILLET * (1.0 - math.sqrt(max(0.0, 1.0 - ((FILLET - z) / FILLET) ** 2)))
    return r


def r_in(z):
    return r_out(z) - WALL


# ---- punti del profilo (r, z, tipo) ----
pts = []
pts.append((0.0, 0.0, 'pole'))
for i in range(1, 5):               # fondo piano esterno
    pts.append((r_out(0.0) * i / 4.0, 0.0, 'base'))
NZ = 90
for i in range(1, NZ + 1):
    z = H * (i / NZ) ** 1.6          # punti piu' fitti vicino al fondo (raccordo)
    pts.append((r_out(z), z, 'out'))
# bordo superiore (piatto con piccolo smusso)
pts.append((r_out(H) - WALL * 0.5, H, 'rim'))
pts.append((r_in(H), H - 0.4, 'rim'))
for i in range(NZ - 1, -1, -1):
    z = FLOOR + (H - FLOOR) * i / NZ
    pts.append((r_in(z), z, 'in'))
pts.append((r_in(FLOOR) - 3.0, FLOOR, 'floor'))
pts.append((0.0, FLOOR, 'pole'))

# ---- costruzione mesh (rivoluzione con poli) ----
bm = bmesh.new()
rows = []
for (r, z, kind) in pts:
    if r < 1e-6:
        rows.append([bm.verts.new((0, 0, z))])
        continue
    row = []
    for j in range(COLS):
        th = 2 * math.pi * j / COLS
        rr = r
        if kind == 'out':
            fade = min(1.0, z / (H * 0.10)) * min(1.0, (H - z) / (H * 0.02))  # niente scanalature a filo fondo/bordo
            rib = 0.5 - 0.5 * math.cos(N_RIBS * th)          # 0 in cresta, 1 in solco
            rr = r - RIB_DEPTH * (rib ** 0.75) * fade
        row.append(bm.verts.new((rr * math.cos(th), rr * math.sin(th), z)))
    rows.append(row)
for a, b in zip(rows, rows[1:]):
    if len(a) == 1:
        for j in range(COLS):
            bm.faces.new((a[0], b[(j + 1) % COLS], b[j]))
    elif len(b) == 1:
        for j in range(COLS):
            bm.faces.new((a[j], a[(j + 1) % COLS], b[0]))
    else:
        for j in range(COLS):
            bm.faces.new((a[j], a[(j + 1) % COLS], b[(j + 1) % COLS], b[j]))
bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
if bm.calc_volume(signed=True) < 0:
    bmesh.ops.reverse_faces(bm, faces=bm.faces)
vol = bm.calc_volume(signed=True)
nonman = sum(1 for e in bm.edges if not e.is_manifold)

# ---- scena ----
bpy.ops.wm.read_factory_settings(use_empty=True)
scn = bpy.context.scene
scn.unit_settings.system = 'METRIC'
scn.unit_settings.scale_length = 0.001
scn.unit_settings.length_unit = 'MILLIMETERS'

me = bpy.data.meshes.new("VASO")
bm.to_mesh(me)
bm.free()
ob = bpy.data.objects.new("VASO", me)
scn.collection.objects.link(ob)
for p in me.polygons:
    p.use_smooth = True
mat = bpy.data.materials.new("Vaso_rosa")
mat.use_nodes = True
bsdf = next(n for n in mat.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
bsdf.inputs['Base Color'].default_value = (0.86, 0.47, 0.37, 1)
bsdf.inputs['Roughness'].default_value = 0.6
ob.data.materials.append(mat)

# vasetto da 10 cm di riferimento (non renderizzato), tronco di cono sul fondo
ref_me = bpy.data.meshes.new("VASETTO_10cm")
bm2 = bmesh.new()
bmesh.ops.create_cone(bm2, cap_ends=True, segments=96, radius1=POT_BOT_R, radius2=POT_TOP_R,
                      depth=POT_H)
bmesh.ops.translate(bm2, verts=bm2.verts, vec=(0, 0, FLOOR + POT_H / 2))
bm2.to_mesh(ref_me)
bm2.free()
ref = bpy.data.objects.new("VASETTO_10cm_riferimento", ref_me)
scn.collection.objects.link(ref)
ref.display_type = 'WIRE'
ref.hide_render = True

# foto di riferimento accanto al vaso
if os.path.exists(PHOTO):
    img = bpy.data.images.load(PHOTO)
    emp = bpy.data.objects.new("FOTO_riferimento", None)
    emp.empty_display_type = 'IMAGE'
    emp.data = img
    emp.empty_display_size = 160
    emp.location = (-170, 0, 80)
    emp.rotation_euler = (math.radians(90), 0, 0)
    emp.hide_render = True
    scn.collection.objects.link(emp)

# luci + camera di controllo
cam = bpy.data.objects.new("Camera", bpy.data.cameras.new("Camera"))
cam.location = (260, -320, 190)
cam.rotation_euler = (math.radians(68), 0, math.radians(38))
cam.data.clip_end = 5000
scn.collection.objects.link(cam)
scn.camera = cam
sun = bpy.data.objects.new("Sole", bpy.data.lights.new("Sole", 'SUN'))
sun.data.energy = 3
sun.rotation_euler = (math.radians(50), 0, math.radians(30))
scn.collection.objects.link(sun)

# controllo gioco (mm) tra vasetto da 10 cm e cavita' del vaso
min_gap = min(r_in(z) - (POT_BOT_R + (POT_TOP_R - POT_BOT_R) * (z - FLOOR) / POT_H)
              for z in [FLOOR + POT_H * k / 100 for k in range(101)])
print(f"volume={vol:.0f} mm3  non-manifold={nonman}")
print(f"diametro interno al bordo = {2*r_in(H):.1f} mm ; minimo gioco con vasetto da 10 cm = {min_gap:.2f} mm")
print(f"diametro esterno max = {2*R_MAX:.1f} mm ; altezza = {H} mm")

bpy.ops.wm.save_as_mainfile(filepath=OUT)
print("salvato", OUT)
