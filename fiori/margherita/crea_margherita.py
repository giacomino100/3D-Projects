"""Margherita in rilievo a retro piatto (stampa sdraiata, senza supporti).

Uso:  blender -b --python crea_margherita.py
Genera margherita.blend e margherita.3mf nella stessa cartella.
Oggetti separati per colore: Petali (bianco), Centro (giallo), Stelo (verde).
Unita: 1 BU = 1 mm. Retro di tutti i pezzi a z = 0.
"""
import bpy
import bmesh
import math
import os
from mathutils import Matrix, Vector
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import comune_rilievo as cr  # noqa: E402

FOLDER = os.path.dirname(os.path.abspath(__file__))

# ---- parametri principali (mm) ----
N_PETALI = 16
R_INIZIO_PETALO = 5.5        # dove nasce il petalo (sotto al centro)
LUNGHEZZE = (21.5, 20.0)     # alternate: diametro max = 2*(5.5+21.5) = 54 mm
LARGHEZZA_PETALO = 6.4
PETALO_BORDO, PETALO_CENTRO = 1.0, 2.1   # spessori al bordo e in mezzeria
R_CENTRO = 8.0
CENTRO_BORDO, CENTRO_CIMA = 2.6, 5.0
STELO_R, STELO_Z = 2.2, 1.0  # sezione a mezzo tondo con base piatta
STELO_Y0, STELO_Y1 = -22.0, -88.0


def clear_scene():
    for obj in list(bpy.data.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    for block in (bpy.data.meshes, bpy.data.materials):
        for item in list(block):
            block.remove(item)
    bpy.context.scene.unit_settings.system = 'METRIC'
    bpy.context.scene.unit_settings.scale_length = 0.001
    bpy.context.scene.unit_settings.length_unit = 'MILLIMETERS'


def material(name, rgb):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*rgb, 1.0)
    mat.use_nodes = True
    bsdf = next(n for n in mat.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
    bsdf.inputs['Base Color'].default_value = (*rgb, 1.0)
    bsdf.inputs['Roughness'].default_value = 0.45
    return mat


def to_object(name, bm, mat=None):
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    if mat:
        me.materials.append(mat)
    obj = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(obj)
    return obj


def domed_slab(outline, height_fn, rings=12, z0=0.0):
    """Solido con fondo piatto (z=0), pareti verticali e cima bombata.

    outline: punti 2D (Vector) in ordine antiorario, forma stellata rispetto
    al baricentro. height_fn(p2d, s) -> z della cima, s=1 sul bordo, 0 al centro.
    """
    bm = bmesh.new()
    c = sum(outline, Vector((0, 0))) / len(outline)
    n = len(outline)
    bottom = [bm.verts.new((p.x, p.y, z0)) for p in outline]
    ring_verts = []
    for k in range(rings, 0, -1):
        s = k / rings
        ring = []
        for p in outline:
            q = c + (p - c) * s
            ring.append(bm.verts.new((q.x, q.y, height_fn(q, s))))
        ring_verts.append(ring)
    top_c = bm.verts.new((c.x, c.y, height_fn(c, 0.0)))
    bm.faces.new(list(reversed(bottom)))
    outer = ring_verts[0]
    for i in range(n):
        j = (i + 1) % n
        bm.faces.new((bottom[i], bottom[j], outer[j], outer[i]))
    for a, b in zip(ring_verts, ring_verts[1:]):
        for i in range(n):
            j = (i + 1) % n
            bm.faces.new((a[i], a[j], b[j], b[i]))
    inner = ring_verts[-1]
    for i in range(n):
        bm.faces.new((inner[i], inner[(i + 1) % n], top_c))
    return bm


def leaf_outline(length, width, pts=40, power=0.55, tip=1.6):
    """Contorno a goccia: largo vicino alla base, punta affusolata."""
    upper, lower = [], []
    for i in range(pts + 1):
        u = i / pts
        hw = width / 2 * (math.sin(math.pi * u ** (1 / tip))) ** power
        upper.append(Vector((u * length, hw)))
        lower.append(Vector((u * length, -hw)))
    # rimuovi i doppioni alle estremita (larghezza zero)
    return lower[1:-1] + [Vector((length, 0))] + list(reversed(upper[1:-1])) + [Vector((0, 0))]


def petal_outline(length, width, pts=36):
    """Petalo di margherita: base stretta, lati quasi paralleli, punta arrotondata."""
    upper = []
    for i in range(1, pts):
        u = i / pts
        hw = width / 2 * (math.sin(math.pi * u)) ** 0.45
        if u > 0.5:  # punta piu piena e tonda
            hw = width / 2 * math.sqrt(max(0.0, 1 - ((u - 0.5) / 0.5) ** 2.4))
        upper.append(Vector((u * length, hw)))
    lower = [Vector((p.x, -p.y)) for p in upper]
    return lower + [Vector((length, 0))] + list(reversed(upper)) + [Vector((0, 0))]


def transform(bm, angle, offset):
    rot = (math.cos(angle), math.sin(angle))
    for v in bm.verts:
        x, y = v.co.x, v.co.y
        v.co.x = x * rot[0] - y * rot[1] + offset.x
        v.co.y = x * rot[1] + y * rot[0] + offset.y


def make_petal(i):
    length = LUNGHEZZE[i % 2]
    outline = petal_outline(length, LARGHEZZA_PETALO)

    def h(q, s):
        dome = math.sqrt(max(0.0, 1 - s * s))
        z = PETALO_BORDO + (PETALO_CENTRO - PETALO_BORDO) * dome
        # leggera scanalatura in mezzeria, sfuma verso base e punta
        u = min(max(q.x / length, 0.0), 1.0)
        z -= 0.35 * math.exp(-(q.y / 0.55) ** 2) * math.sin(math.pi * u) * dome
        return z

    bm = domed_slab(outline, h, rings=10)
    angle = 2 * math.pi * i / N_PETALI + math.pi / 2
    transform(bm, angle, Vector((R_INIZIO_PETALO * math.cos(angle), R_INIZIO_PETALO * math.sin(angle))))
    return bm


def make_disc(r, h, segments=128):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=segments, radius1=r, radius2=r, depth=h)
    bmesh.ops.translate(bm, verts=bm.verts, vec=(0, 0, h / 2))
    return bm


def make_center():
    """Cupola gialla con fiorellini a puntini disposti a spirale di Fibonacci."""
    golden = math.pi * (3 - math.sqrt(5))
    florets = []
    n_fl = 120
    for k in range(n_fl):
        rr = (R_CENTRO - 0.9) * math.sqrt((k + 0.5) / n_fl)
        florets.append(Vector((rr * math.cos(k * golden), rr * math.sin(k * golden))))
    seg = 160
    outline = [Vector((R_CENTRO * math.cos(2 * math.pi * i / seg),
                       R_CENTRO * math.sin(2 * math.pi * i / seg))) for i in range(seg)]

    def h(q, s):
        z = CENTRO_BORDO + (CENTRO_CIMA - CENTRO_BORDO) * math.sqrt(max(0.0, 1 - s * s)) ** 0.8
        d = min((q - f).length for f in florets)
        return z + 0.32 * max(0.0, 1 - (d / 0.62) ** 2)

    return domed_slab(outline, h, rings=48)


def make_stem():
    bm = bmesh.new()
    length = STELO_Y0 - STELO_Y1
    bmesh.ops.create_cone(bm, cap_ends=True, segments=48, radius1=STELO_R, radius2=STELO_R, depth=length)
    bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(math.pi / 2, 3, 'X'))
    bmesh.ops.translate(bm, verts=bm.verts, vec=(0, (STELO_Y0 + STELO_Y1) / 2, STELO_Z))
    cap = bmesh.new()  # estremita inferiore arrotondata
    bmesh.ops.create_uvsphere(cap, u_segments=48, v_segments=24, radius=STELO_R + 0.06)
    bmesh.ops.translate(cap, verts=cap.verts, vec=(0, STELO_Y1, STELO_Z))
    return bm, cap


def make_leaf(attach_y, side, length=27.0, width=10.0, angle_deg=38.0):
    outline = leaf_outline(length, width)

    def h(q, s):
        dome = math.sqrt(max(0.0, 1 - s * s))
        z = 0.9 + 1.0 * dome
        u = min(max(q.x / length, 0.0), 1.0)
        z -= 0.4 * math.exp(-(q.y / 0.5) ** 2) * math.sin(math.pi * min(1.0, u * 1.1)) * dome
        return z

    bm = domed_slab(outline, h, rings=10, z0=-1.0)
    # foglie rivolte verso l'alto, ai lati dello stelo
    a = math.pi / 2 - side * math.radians(90 - angle_deg)
    transform(bm, a, Vector((-side * 1.2, attach_y)))
    return bm


def boolean(target, operand_bm, op):
    tmp = to_object('tmp_' + op, operand_bm)
    mod = target.modifiers.new(op, 'BOOLEAN')
    mod.operation = op
    mod.solver = 'EXACT'
    mod.object = tmp
    dg = bpy.context.evaluated_depsgraph_get()
    new_mesh = bpy.data.meshes.new_from_object(target.evaluated_get(dg))
    target.modifiers.remove(mod)
    old = target.data
    mats = list(old.materials)
    target.data = new_mesh
    new_mesh.materials.clear()
    for m in mats:
        new_mesh.materials.append(m)
    bpy.data.meshes.remove(old)
    bpy.data.objects.remove(tmp, do_unlink=True)


def check(obj):
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    badl = [e for e in bm.edges if not e.is_manifold]
    bad = len(badl)
    for e in badl[:8]:
        print('  BAD', tuple(round(c, 2) for c in (e.verts[0].co + e.verts[1].co) / 2), len(e.link_faces))
    vol = bm.calc_volume(signed=True)
    zmin = min(v.co.z for v in bm.verts)
    bm.free()
    dims = obj.dimensions
    print(f'CHECK {obj.name}: nonmanifold={bad} volume={vol:.1f}mm3 zmin={zmin:.3f} '
          f'dim={dims.x:.1f}x{dims.y:.1f}x{dims.z:.1f}', flush=True)
    assert bad == 0 and vol > 0 and abs(zmin) < 1e-4


def main():
    clear_scene()
    m_bianco = material('Petali_bianco', (0.95, 0.95, 0.92))
    m_giallo = material('Centro_giallo', (1.0, 0.72, 0.05))
    m_verde = material('Stelo_verde', (0.18, 0.42, 0.13))

    # Petali: anello di base + 16 petali, poi foro per il centro
    petali = to_object('Petali', make_disc(R_CENTRO + 2.5, 1.2), m_bianco)
    for i in range(N_PETALI):
        boolean(petali, make_petal(i), 'UNION')
    hole = make_disc(R_CENTRO, 20)
    bmesh.ops.translate(hole, verts=hole.verts, vec=(0, 0, -5))
    boolean(petali, hole, 'DIFFERENCE')

    centro = to_object('Centro', make_center(), m_giallo)
    cr.foro_calamita(centro)  # calamita 8x2 nel cuore giallo

    stem_bm, cap_bm = make_stem()
    stelo = to_object('Stelo', stem_bm, m_verde)
    boolean(stelo, cap_bm, 'UNION')
    boolean(stelo, make_leaf(-48.0, +1), 'UNION')
    boolean(stelo, make_leaf(-60.0, -1, length=24.0, width=9.0), 'UNION')
    # niente sovrapposizioni con i petali: sottrai la loro sagoma estrusa in altezza
    sagoma = bmesh.new()
    sagoma.from_mesh(petali.data)
    bmesh.ops.scale(sagoma, vec=(1, 1, 10), verts=sagoma.verts)
    bmesh.ops.translate(sagoma, verts=sagoma.verts, vec=(0, 0, -5))
    boolean(stelo, sagoma, 'DIFFERENCE')
    # taglio piano del retro (z<0)
    cut = bmesh.new()
    bmesh.ops.create_cube(cut, size=1.0)
    bmesh.ops.scale(cut, vec=(200, 200, 20), verts=cut.verts)
    bmesh.ops.translate(cut, verts=cut.verts, vec=(0, 0, -10))
    boolean(stelo, cut, 'DIFFERENCE')

    for obj in (petali, centro, stelo):
        for p in obj.data.polygons:
            p.use_smooth = True
        check(obj)

    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(FOLDER, 'margherita.blend'))
    exec(open(os.path.join(os.path.dirname(FOLDER), 'esporta_blend_3mf.py'), encoding='utf-8').read(),
         {'__name__': '__main__'})


if __name__ == '__main__':
    main()
