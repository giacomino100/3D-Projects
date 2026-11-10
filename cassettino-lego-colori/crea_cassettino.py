"""
Cassettino Lego da scrivania per 24 matite colorate.
Si lancia con:  blender -b --python crea_cassettino.py
Unita: 1 unita Blender = 1 mm.

Z (mm), corpo:      0 - 1.8   incavo sotto (tubi Lego)
                    1.8 - 4.2 fondo
                    4.2 - 26.4 vano cassetto
                    26.4 - 28.8 tetto  (28.8 = 3 mattoncini da 9.6)
                    28.8 - 30.5 borchie (d 4.8 x 1.7)
"""
import bpy, bmesh, math, os, zipfile
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__)) if "__file__" in globals() else os.getcwd()

# ---------------- parametri ----------------
PITCH = 8.0
NX, NY = 14, 25                 # borchie: larghezza x lunghezza
W = NX*PITCH - 0.2              # 111.8
L = NY*PITCH - 0.2              # 199.8
H = 28.8
WALL = 2.4                      # pareti corpo
SKIRT = 1.2                     # bordo sotto
RECESS = 1.8                    # profondita incavo sotto
FLOOR_TOP = 4.2
TOP_BOT = H - WALL              # 26.4
STUD_D, STUD_H = 4.8, 1.7
TUBE_OD, TUBE_ID = 6.51, 4.9
CLR = 0.3                       # gioco per lato cassetto
DW = W - 2*WALL - 2*CLR         # larghezza cassetto 106.4
DZ0, DZ1 = FLOOR_TOP + CLR, TOP_BOT - CLR   # 4.5 - 26.1
D_WALL, D_FLOOR, D_FRONT = 1.6, 2.0, 3.0
D_LEN = (L - WALL) - 0.4        # lunghezza cassetto, frontale a filo
SEG = 32

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.unit_settings.system = 'METRIC'
sc.unit_settings.scale_length = 0.001
sc.unit_settings.length_unit = 'MILLIMETERS'


def obj_from_bm(name, bm):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new(name, me)
    sc.collection.objects.link(o)
    return o


def box(name, x0, x1, y0, y1, z0, z1):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co.x = x0 if v.co.x < 0 else x1
        v.co.y = y0 if v.co.y < 0 else y1
        v.co.z = z0 if v.co.z < 0 else z1
    return obj_from_bm(name, bm)


def cyl_bm(bm, cx, cy, z0, z1, r, seg=SEG):
    res = bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=seg,
                                radius1=r, radius2=r, depth=z1-z0)
    for v in res["verts"]:
        v.co.x += cx; v.co.y += cy; v.co.z += (z0+z1)/2


def ring_bm(bm, cx, cy, z0, z1, ro, ri, seg=SEG):
    ob, ot, ib, it = [], [], [], []
    for k in range(seg):
        a = 2*math.pi*k/seg
        c, s = math.cos(a), math.sin(a)
        ob.append(bm.verts.new((cx+ro*c, cy+ro*s, z0)))
        ot.append(bm.verts.new((cx+ro*c, cy+ro*s, z1)))
        ib.append(bm.verts.new((cx+ri*c, cy+ri*s, z0)))
        it.append(bm.verts.new((cx+ri*c, cy+ri*s, z1)))
    for k in range(seg):
        n = (k+1) % seg
        bm.faces.new((ob[k], ob[n], ot[n], ot[k]))      # esterno
        bm.faces.new((ib[n], ib[k], it[k], it[n]))      # interno
        bm.faces.new((ot[k], ot[n], it[n], it[k]))      # sopra
        bm.faces.new((ob[n], ob[k], ib[k], ib[n]))      # sotto


def boolean(a, b, op):
    m = a.modifiers.new("bool", 'BOOLEAN')
    m.operation = op
    m.object = b
    m.solver = 'EXACT'
    bpy.ops.object.select_all(action='DESELECT')
    bpy.context.view_layer.objects.active = a
    a.select_set(True)
    bpy.ops.object.modifier_apply(modifier=m.name)
    bpy.data.objects.remove(b, do_unlink=True)


# ---------------- CORPO ----------------
body = box("CORPO", -W/2, W/2, -L/2, L/2, 0, H)
# vano cassetto (aperto davanti, fronte = -Y)
boolean(body, box("v", -W/2+WALL, W/2-WALL, -L/2-1, L/2-WALL, FLOOR_TOP, TOP_BOT), 'DIFFERENCE')
# incavo sotto
boolean(body, box("v", -W/2+SKIRT, W/2-SKIRT, -L/2+SKIRT, L/2-SKIRT, -1, RECESS), 'DIFFERENCE')

# tubi sotto (incroci della griglia) + borchie sopra
x0 = -W/2 + 0.1
y0 = -L/2 + 0.1
bm = bmesh.new()
for i in range(1, NX):
    for j in range(1, NY):
        ring_bm(bm, x0+i*PITCH, y0+j*PITCH, 0.0, RECESS+0.2, TUBE_OD/2, TUBE_ID/2)
tubes = obj_from_bm("tubi", bm)
bm = bmesh.new()
for i in range(NX):
    for j in range(NY):
        cyl_bm(bm, x0+(i+0.5)*PITCH, y0+(j+0.5)*PITCH, H-0.2, H+STUD_H, STUD_D/2)
studs = obj_from_bm("borchie", bm)
boolean(body, tubes, 'UNION')
boolean(body, studs, 'UNION')

# ---------------- CASSETTO ----------------
dy0 = -L/2                      # frontale a filo
dy1 = dy0 + D_LEN
drawer = box("CASSETTO", -DW/2, DW/2, dy0, dy1, DZ0, DZ1)
boolean(drawer, box("v", -DW/2+D_WALL, DW/2-D_WALL, dy0+D_FRONT, dy1-D_WALL, DZ0+D_FLOOR, DZ1+1), 'DIFFERENCE')
# divisorio centrale (2 colonne da 12 matite)
boolean(drawer, box("d", -0.6, 0.6, dy0+D_FRONT-0.2, dy1-D_WALL+0.2, DZ0+D_FLOOR-0.2, DZ0+D_FLOOR+13), 'UNION')
# foro per il dito sul frontale
bm = bmesh.new()
res = bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=48, radius1=8, radius2=8, depth=D_FRONT+2)
for v in res["verts"]:
    co = v.co.copy()
    v.co = Vector((co.x, dy0 + D_FRONT/2 + co.z, DZ0 + 11.0 + co.y))   # asse lungo Y
hole = obj_from_bm("foro", bm)
boolean(drawer, hole, 'DIFFERENCE')

# ---------------- materiali, vista ----------------
for o, col in ((body, (0.85, 0.85, 0.85, 1)), (drawer, (0.2, 0.45, 0.9, 1))):
    m = bpy.data.materials.new(o.name+"_mat")
    m.diffuse_color = col
    o.data.materials.append(m)
    for p in o.data.polygons:
        p.use_smooth = False


# ---------------- controlli ----------------
def check(o):
    bm = bmesh.new()
    bm.from_mesh(o.data)
    nm = sum(1 for e in bm.edges if not e.is_manifold)
    vol = bm.calc_volume()
    bb = [o.matrix_world @ Vector(c) for c in o.bound_box]
    dims = [max(v[k] for v in bb)-min(v[k] for v in bb) for k in range(3)]
    print("CHECK", o.name, "bordi non-manifold:", nm, "volume cm3: %.1f" % (vol/1000),
          "dim:", [round(d, 2) for d in dims], "tri:", len(o.data.polygons))
    bm.free()


check(body)
check(drawer)
print("INTERNO CASSETTO mm: larg %.1f  lung %.1f  alt %.1f" % (DW-2*D_WALL, D_LEN-D_FRONT-D_WALL, DZ1-DZ0-D_FLOOR))

# ---------------- salva blend ----------------
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, "cassettino_lego.blend"))


# ---------------- 3MF (scrittura diretta, mm) ----------------
def mesh_xml(o, idn, dx, dy, dz):
    me = o.data
    me.calc_loop_triangles()
    vs = "".join('<vertex x="%.4f" y="%.4f" z="%.4f"/>' % (v.co.x+dx, v.co.y+dy, v.co.z+dz) for v in me.vertices)
    ts = "".join('<triangle v1="%d" v2="%d" v3="%d"/>' % tuple(t.vertices) for t in me.loop_triangles)
    return ('<object id="%d" name="%s" type="model"><mesh><vertices>%s</vertices><triangles>%s</triangles></mesh></object>'
            % (idn, o.name, vs, ts))


def write3mf(path, items):
    objs = "".join(mesh_xml(o, i+1, dx, dy, dz) for i, (o, dx, dy, dz) in enumerate(items))
    build = "".join('<item objectid="%d"/>' % (i+1) for i in range(len(items)))
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
# piatto 250x250: centro a (125,125); corpo e cassetto affiancati, tutti con z=0 sul piatto
bw = W/2
write3mf(os.path.join(out, "cassettino_corpo.3mf"), [(body, 125, 125, 0)])
write3mf(os.path.join(out, "cassettino_cassetto.3mf"), [(drawer, 125, 125, -DZ0)])
gap = 6
tot = W + DW + gap
cx_body = 125 - tot/2 + W/2
cx_dr = 125 + tot/2 - DW/2
write3mf(os.path.join(out, "cassettino_piatto_completo.3mf"),
         [(body, cx_body, 125, 0), (drawer, cx_dr, 125, -DZ0)])
print("OK 3MF")
