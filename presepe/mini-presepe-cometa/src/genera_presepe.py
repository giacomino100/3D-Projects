"""Mini presepe con stella cometa - generatore parametrico Blender (bpy).

1 unita' Blender = 1 mm. Eseguire da Blender (Scripting) oppure:
    blender --background --python src/genera_presepe.py
Produce: progetto/mini_presepe_cometa.blend, stl/*.stl
"""
import math
import os

import bmesh
import bpy
from mathutils import Matrix, Vector

# ---------------------------------------------------------------- parametri
OUT = r"C:\Users\giaco\Documents\Progetti 3D\Presepe\mini-presepe-cometa"
BASE_W, BASE_D, BASE_H = 120.0, 60.0, 9.0
GAP = 0.25            # gioco per lato negli incastri
PEG_H = 3.2           # altezza perni
FLAT_Y = 27.5         # fascia frontale piana della base
TEXT_SIZE = 4.5
TEXT_DEPTH = 0.7
VOXEL = 0.55          # risoluzione remesh figure
VARIANTI = {"standard": None, "Famiglia_Rossi": "Famiglia Rossi", "Natale_2026": "Natale 2026"}

HUT_Y0, HUT_Y1 = -4.0, 12.0
HUT_YC = (HUT_Y0 + HUT_Y1) / 2
ROOF_T = 6.0
A, B, C = (-58.6, 49.0), (-8.0, 75.0), (59.0, 52.0)
STAR_C = (B[0], 84.0)
STAR_THK = 3.0
FIG_Y = -8.0
MARIA_X, GIUSEPPE_X, MANGER_X = -31.0, 27.0, -2.0

PEGS = {  # componente -> perni (x, y, r) per figure, box per capanna
    "MARIA": [("cyl", MARIA_X, FIG_Y, 3.2)],
    "GIUSEPPE": [("cyl", GIUSEPPE_X, FIG_Y, 3.2)],
    "MANGIATOIA_GESU": [("cyl", MANGER_X - 6.1, FIG_Y, 1.4), ("cyl", MANGER_X + 6.1, FIG_Y, 1.4)],
    "CAPANNA": [("box", -50, HUT_YC, 2.0, 5.0), ("box", 50, HUT_YC, 2.0, 5.0)],
}


# ---------------------------------------------------------------- helpers
def reset_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()
    for me in list(bpy.data.meshes):
        bpy.data.meshes.remove(me)
    us = bpy.context.scene.unit_settings
    us.system = "METRIC"
    us.scale_length = 0.001
    us.length_unit = "MILLIMETERS"


def new_obj(name, bm):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(o)
    return o


def prism(bm, pts, y0, y1):
    vs = [bm.verts.new((x, y0, z)) for x, z in pts]
    f = bm.faces.new(vs)
    r = bmesh.ops.extrude_face_region(bm, geom=[f])
    vv = [e for e in r["geom"] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, vec=(0, y1 - y0, 0), verts=vv)
    bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))


def beam_pts(p0, p1, t):
    d = Vector(p1) - Vector(p0)
    d.normalize()
    n = Vector((-d.y, d.x)) * (t / 2)
    p0, p1 = Vector(p0), Vector(p1)
    return [tuple(p0 + n), tuple(p1 + n), tuple(p1 - n), tuple(p0 - n)]


def box(bm, lo, hi):
    c = [(lo[i] + hi[i]) / 2 for i in range(3)]
    s = [(hi[i] - lo[i]) / 2 for i in range(3)]
    m = Matrix.Translation(c) @ Matrix.Diagonal((s[0], s[1], s[2], 1))
    bmesh.ops.create_cube(bm, size=2.0, matrix=m)


def ell(bm, c, r, rotz=0.0):
    m = Matrix.Translation(c) @ Matrix.Rotation(rotz, 4, "Z") @ Matrix.Diagonal((r[0], r[1], r[2], 1))
    try:
        bmesh.ops.create_uvsphere(bm, u_segments=40, v_segments=20, radius=1.0, matrix=m)
    except TypeError:
        bmesh.ops.create_uvsphere(bm, u_segments=40, v_segments=20, diameter=1.0, matrix=m)


def cyl(bm, c, r, h, seg=32):
    m = Matrix.Translation(c)
    try:
        bmesh.ops.create_cone(bm, cap_ends=True, segments=seg, radius1=r, radius2=r, depth=h, matrix=m)
    except TypeError:
        bmesh.ops.create_cone(bm, cap_ends=True, segments=seg, diameter1=r, diameter2=r, depth=h, matrix=m)


def boolean(o, cutter, op="DIFFERENCE", delete=True):
    m = o.modifiers.new("bool", "BOOLEAN")
    m.operation = op
    m.object = cutter
    m.solver = "EXACT"
    with bpy.context.temp_override(object=o, active_object=o):
        bpy.ops.object.modifier_apply(modifier=m.name)
    if delete:
        bpy.data.objects.remove(cutter, do_unlink=True)


def bm_obj(name, fn):
    bm = bmesh.new()
    fn(bm)
    return new_obj(name, bm)


def remesh(o, voxel):
    m = o.modifiers.new("rm", "REMESH")
    m.mode = "VOXEL"
    m.voxel_size = voxel
    with bpy.context.temp_override(object=o, active_object=o):
        bpy.ops.object.modifier_apply(modifier=m.name)
    for p in o.data.polygons:
        p.use_smooth = True


def cut_bottom(o):
    """Taglia sotto z=BASE_H con bisect + riempimento del foro (evita sliver da boolean)."""
    bm = bmesh.new()
    bm.from_mesh(o.data)
    bmesh.ops.bisect_plane(bm, geom=list(bm.verts) + list(bm.edges) + list(bm.faces), dist=1e-5,
                           plane_co=(0, 0, BASE_H), plane_no=(0, 0, 1), clear_inner=True)
    bd = [e for e in bm.edges if e.is_boundary]
    bmesh.ops.holes_fill(bm, edges=bd, sides=len(bd) + 1)
    bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
    bm.to_mesh(o.data)
    bm.free()


def add_pegs(o, name):
    for p in PEGS[name]:
        if p[0] == "cyl":
            _, x, y, r = p
            f = lambda bm: cyl(bm, (x, y, BASE_H - PEG_H / 2 + 0.15), r, PEG_H + 0.3)
        else:
            _, x, y, hx, hy = p
            f = lambda bm: box(bm, (x - hx, y - hy, BASE_H - PEG_H), (x + hx, y + hy, BASE_H + 0.3))
        boolean(o, bm_obj("peg", f), "UNION")


# ---------------------------------------------------------------- componenti
def make_base():
    bpy.ops.mesh.primitive_cylinder_add(vertices=160, radius=1, depth=BASE_H, location=(0, 0, BASE_H / 2))
    o = bpy.context.active_object
    o.name = "BASE_standard"
    o.scale = (BASE_W / 2, BASE_D / 2, 1)
    bpy.ops.object.transform_apply(scale=True)
    m = o.modifiers.new("bev", "BEVEL")
    m.width, m.segments = 1.0, 3
    with bpy.context.temp_override(object=o, active_object=o):
        bpy.ops.object.modifier_apply(modifier=m.name)
    boolean(o, bm_obj("flat", lambda bm: box(bm, (-80, -60, -5), (80, -FLAT_Y, 30))))
    # sedi dei perni (con gioco)
    for name, plist in PEGS.items():
        for p in plist:
            if p[0] == "cyl":
                _, x, y, r = p
                f = lambda bm: cyl(bm, (x, y, BASE_H - PEG_H / 2 - 0.15 + 0.01), r + GAP, PEG_H + 0.3 + 0.0)
                f2 = lambda bm: cyl(bm, (x, y, BASE_H - (PEG_H + 0.3) / 2 + 0.01), r + GAP, PEG_H + 0.3)
            else:
                _, x, y, hx, hy = p
                f2 = lambda bm: box(bm, (x - hx - GAP, y - hy - GAP, BASE_H - PEG_H - 0.3), (x + hx + GAP, y + hy + GAP, BASE_H + 1))
            boolean(o, bm_obj("sock", f2))
    return o


def text_cutter(text):
    cu = bpy.data.curves.new("txt", "FONT")
    cu.body = text
    cu.size = TEXT_SIZE
    cu.extrude = TEXT_DEPTH
    cu.align_x, cu.align_y = "CENTER", "CENTER"
    t = bpy.data.objects.new("txt", cu)
    bpy.context.collection.objects.link(t)
    t.rotation_euler = (math.pi / 2, 0, 0)
    t.location = (0, -FLAT_Y, BASE_H / 2)
    bpy.context.view_layer.update()
    w = t.dimensions.x
    maxw = 2 * BASE_W / 2 * math.sqrt(1 - (FLAT_Y / (BASE_D / 2)) ** 2) - 6
    if w > maxw:
        cu.size *= maxw / w
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(t.evaluated_get(dg))
    o = bpy.data.objects.new("txtmesh", me)
    o.matrix_world = t.matrix_world.copy()
    bpy.context.collection.objects.link(o)
    bpy.data.objects.remove(t, do_unlink=True)
    bpy.data.curves.remove(cu)
    return o


def make_capanna():
    def poly(bm):
        a, b, c = map(Vector, (A, B, C))
        t = ROOF_T / 2

        def nrm(p, q):
            d = (q - p).normalized()
            return Vector((-d.y, d.x))

        n1, n2 = nrm(a, b), nrm(b, c)
        mi = (n1 + n2) / (1 + n1.dot(n2)) * t
        pts = [a + n1 * t, b + mi, c + n2 * t, c - n2 * t, b - mi, a - n1 * t]
        prism(bm, [tuple(p) for p in pts], HUT_Y0, HUT_Y1)

    o = bm_obj("CAPANNA", poly)
    for x0, x1, top in ((-53, -47, 54.5), (47, 53, 57.0)):
        pil = bm_obj("pil", lambda bm: prism(bm, [(x0, BASE_H), (x1, BASE_H), (x1, top), (x0, top)], HUT_Y0, HUT_Y1))
        boolean(o, pil, "UNION")
    add_pegs(o, "CAPANNA")
    # asola per il perno della stella (con gioco)
    sx = STAR_C[0]
    slot = bm_obj("slot", lambda bm: box(bm, (sx - 1.5 - GAP, HUT_YC - STAR_THK / 2 - GAP, 73.5), (sx + 1.5 + GAP, HUT_YC + STAR_THK / 2 + GAP, 82)))
    boolean(o, slot)
    return o


def bezier(p0, p1, p2, n=28):
    pts = []
    for i in range(n + 1):
        t = i / n
        pts.append(((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
                    (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]))
    return pts


def ribbon_poly(p0, p1, p2, w0, w1, n=28):
    c = bezier(p0, p1, p2, n)
    left, right = [], []
    for i, p in enumerate(c):
        a = c[max(i - 1, 0)]
        b = c[min(i + 1, n)]
        d = Vector((b[0] - a[0], b[1] - a[1])).normalized()
        nn = Vector((-d.y, d.x))
        w = (w0 + (w1 - w0) * (i / n) ** 0.8) / 2
        left.append((p[0] + nn.x * w, p[1] + nn.y * w))
        right.append((p[0] - nn.x * w, p[1] - nn.y * w))
    return left + right[::-1]


def make_stella():
    cx, cz = STAR_C
    y0, y1 = HUT_YC - STAR_THK / 2, HUT_YC + STAR_THK / 2
    star = []
    for i in range(16):
        ang = math.pi / 2 + i * math.pi / 8
        r = (10.0 if i % 4 == 0 else 6.2 if i % 2 == 0 else 2.6)
        star.append((cx + r * math.cos(ang), cz + r * math.sin(ang)))
    o = bm_obj("STELLA_COMETA", lambda bm: prism(bm, star, y0, y1))
    tails = [((cx + 3, cz + 1.5), (28, 94.5), (59, 79), 5.5, 1.8),
             ((cx + 3, cz + 0.2), (26, 87.5), (58, 71.5), 4.8, 1.8),
             ((cx + 3, cz - 1.2), (22, 81.5), (54, 63.5), 4.0, 1.8)]
    for p0, p1, p2, w0, w1 in tails:
        poly = ribbon_poly(p0, p1, p2, w0, w1)
        r = bm_obj("rib", lambda bm: prism(bm, poly, y0, y1))
        boolean(o, r, "UNION")
    peg = bm_obj("peg", lambda bm: box(bm, (cx - 1.5, y0, 73.8), (cx + 1.5, y1, cz - 6)))
    boolean(o, peg, "UNION")
    return o


def loft(bm, keys, seg=48, n=40):
    """Tunica: anelli ellittici (z, cx, cy, rx, ry) interpolati con Catmull-Rom."""
    def cr(p0, p1, p2, p3, t):
        return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t ** 3)

    rings = []
    m = len(keys) - 1
    for i in range(n + 1):
        u = i / n * m
        k = min(int(u), m - 1)
        t = u - k
        ks = [keys[max(k - 1, 0)], keys[k], keys[k + 1], keys[min(k + 2, m)]]
        rings.append([cr(ks[0][j], ks[1][j], ks[2][j], ks[3][j], t) for j in range(5)])
    vr = []
    for z, cx, cy, rx, ry in rings:
        vr.append([bm.verts.new((cx + rx * math.cos(2 * math.pi * j / seg), cy + ry * math.sin(2 * math.pi * j / seg), z)) for j in range(seg)])
    for i in range(n):
        for j in range(seg):
            bm.faces.new((vr[i][j], vr[i][(j + 1) % seg], vr[i + 1][(j + 1) % seg], vr[i + 1][j]))
    bm.faces.new(vr[0][::-1])
    bm.faces.new(vr[-1])
    bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))


def make_maria():
    x, y = MARIA_X, FIG_Y

    def f(bm):
        loft(bm, [(8, x, y, 14.5, 10.5), (14, x + 0.3, y, 13, 10), (22, x + 1.5, y, 10.5, 8.8),
                  (30, x + 3, y - 0.3, 8.6, 7.6), (36, x + 4.2, y - 0.6, 7, 6.4), (40, x + 5, y - 0.8, 5, 4.8)])
        ell(bm, (x + 3.5, y, 34), (9.2, 7.2, 4.5))               # spalle
        ell(bm, (x + 6, y - 7, 14), (8, 4.5, 6))                  # ginocchio
        ell(bm, (x + 5.8, y - 1.2, 43), (5.0, 4.7, 6.2))          # volto liscio
        ell(bm, (x + 4.6, y + 1.2, 43.5), (6.8, 6.4, 7.6))        # cappuccio
        ell(bm, (x + 7.5, y - 5.5, 27.5), (3.6, 3.2, 5.5))        # avambracci
        ell(bm, (x + 9.0, y - 7, 31), (2.8, 2.3, 4.4))            # mani giunte

    o = bm_obj("MARIA", f)
    remesh(o, VOXEL)
    cut_bottom(o)
    add_pegs(o, "MARIA")
    return o


def make_giuseppe():
    x, y = GIUSEPPE_X, FIG_Y

    def f(bm):
        loft(bm, [(8, x, y, 11, 8.8), (18, x, y, 9.2, 7.6), (30, x - 0.3, y, 8, 6.8),
                  (40, x - 0.8, y, 7.6, 6.2), (46, x - 1.4, y, 6, 5.2), (50, x - 2.2, y - 0.3, 3.8, 3.8)])
        ell(bm, (x - 1, y, 44), (8.4, 6.2, 4.2))                   # spalle
        ell(bm, (x - 3.2, y - 1.2, 54), (5.0, 4.7, 6.2))           # volto liscio
        ell(bm, (x - 2.2, y + 0.9, 54.5), (6.3, 6.0, 7.2))         # cappuccio
        ell(bm, (x - 6.5, y - 4.5, 37.5), (3.8, 3.4, 6.5))         # braccio
        ell(bm, (x - 8.8, y - 6.5, 34.5), (3.0, 3.0, 3.0))         # mano
        cyl(bm, (x - 9.8, y - 6.5, 33.5), 1.9, 49)                 # bastone
        ell(bm, (x - 9.8, y - 6.5, 58), (2.6, 2.6, 2.6))

    o = bm_obj("GIUSEPPE", f)
    remesh(o, VOXEL)
    cut_bottom(o)
    add_pegs(o, "GIUSEPPE")
    return o


def make_mangiatoia():
    cx, y = MANGER_X, FIG_Y

    def f(bm):
        prism(bm, beam_pts((cx - 10.65, 6.6), (cx + 8, 16.5), 3.0), y - 2, y + 2)
        prism(bm, beam_pts((cx + 10.65, 6.6), (cx - 8, 16.5), 3.0), y - 2, y + 2)
        prism(bm, [(cx - 10, 19), (cx + 10, 19), (cx + 7.5, 14), (cx - 7.5, 14)], y - 5.5, y + 5.5)
        ell(bm, (cx - 1, y, 20.5), (7, 3.8, 3.2))
        ell(bm, (cx + 3.5, y, 22.2), (4.2, 4.0, 4.0))

    o = bm_obj("MANGIATOIA_GESU", f)
    remesh(o, 0.45)
    cut_bottom(o)
    add_pegs(o, "MANGIATOIA_GESU")
    return o


# ---------------------------------------------------------------- QA / export
def ivory():
    mat = bpy.data.materials.new("Avorio_PLA")
    mat.use_nodes = True
    b = next(n for n in mat.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
    b.inputs["Base Color"].default_value = (0.92, 0.88, 0.78, 1)
    b.inputs["Roughness"].default_value = 0.42
    return mat


def report(o):
    bm = bmesh.new()
    bm.from_mesh(o.data)
    nm = sum(1 for e in bm.edges if not e.is_manifold)
    vol = bm.calc_volume(signed=True)
    pts = [o.matrix_world @ v.co for v in bm.verts]
    lo = [min(p[i] for p in pts) for i in range(3)]
    hi = [max(p[i] for p in pts) for i in range(3)]
    n = len(bm.faces)
    bm.free()
    return dict(nome=o.name, bbox_min=[round(v, 2) for v in lo], bbox_max=[round(v, 2) for v in hi],
                dim=[round(hi[i] - lo[i], 2) for i in range(3)], edges_non_manifold=nm, volume_mm3=round(vol, 1), facce=n)


def export_stl(o, path):
    bpy.ops.object.select_all(action="DESELECT")
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    try:
        bpy.ops.wm.stl_export(filepath=path, export_selected_objects=True, global_scale=1.0, apply_modifiers=True)
    except AttributeError:
        bpy.ops.export_mesh.stl(filepath=path, use_selection=True, global_scale=1.0)


def main():
    reset_scene()
    parts = {
        "BASE": make_base(),
        "CAPANNA": make_capanna(),
        "STELLA_COMETA": make_stella(),
        "MARIA": make_maria(),
        "GIUSEPPE": make_giuseppe(),
        "MANGIATOIA_GESU": make_mangiatoia(),
    }
    mat = ivory()
    for o in parts.values():
        o.data.materials.append(mat)
    os.makedirs(os.path.join(OUT, "stl"), exist_ok=True)
    os.makedirs(os.path.join(OUT, "progetto"), exist_ok=True)
    rep = []
    for k, o in parts.items():
        rep.append(report(o))
        if k != "BASE":
            export_stl(o, os.path.join(OUT, "stl", k + ".stl"))
    # varianti base (con/senza testo)
    base = parts["BASE"]
    for nome, testo in VARIANTI.items():
        v = base.copy()
        v.data = base.data.copy()
        v.name = "BASE_" + nome
        bpy.context.collection.objects.link(v)
        if testo:
            boolean(v, text_cutter(testo))
        rep.append(report(v))
        export_stl(v, os.path.join(OUT, "stl", "BASE_%s.stl" % nome))
        if nome != "standard":
            bpy.data.objects.remove(v, do_unlink=True)
        else:
            bpy.data.objects.remove(v, do_unlink=True)
    base.name = "BASE"
    # assieme
    xs = [report(o) for o in parts.values()]
    lo = [min(r["bbox_min"][i] for r in xs) for i in range(3)]
    hi = [max(r["bbox_max"][i] for r in xs) for i in range(3)]
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, "progetto", "mini_presepe_cometa.blend"))
    return rep, lo, hi


if __name__ == "__main__":
    rep, lo, hi = main()
    for r in rep:
        print(r)
    print("ASSIEME", lo, hi, [round(hi[i] - lo[i], 2) for i in range(3)])
