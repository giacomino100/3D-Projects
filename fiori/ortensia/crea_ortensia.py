"""Ortensia 3D (testa di fiore come la dalia): calotta coperta di fiorellini a 4 petali.

Uso:  blender -b --factory-startup --python crea_ortensia.py
Genera ortensia.blend, ortensia.3mf e anteprime/.

Stampa in piedi sulla base piatta (z = 0), senza supporti: la calotta non ha
superfici rivolte verso il basso e i petali sporgono di pochi decimi di mm.
Costruzione: nucleo + ~90 fiorellini come primitive che si compenetrano, poi
voxel remesh (un solo solido chiuso), taglio della base e decimazione.
"""
import math
import os
import random
import sys

import bmesh
import bpy
from mathutils import Matrix, Vector

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import comune_rilievo as cr  # noqa: E402

FOLDER = os.path.dirname(os.path.abspath(__file__))

# ---- parametri (mm) ----
R_NUCLEO, H_NUCLEO = 25.3, 19.5   # semiassi della calotta (orizzontale, verticale)
N_FIORELLINI = 128
SCALA_FIORELLINO = (1.0, 1.2)    # variazione casuale della dimensione
PETALO = (1.85, 1.45, 0.48)       # semiassi petalo: lunghezza, larghezza, mezzo spessore
COPPA = 0.38                      # quanto si alzano i bordi del petalo
INCLINAZIONE = math.radians(14)   # petali leggermente aperti verso l'esterno
VOXEL = 0.07
TRIANGOLI = 300_000


def ellipsoid_point(zu, phi):
    rr = math.sqrt(max(0.0, 1 - zu * zu))
    p = Vector((R_NUCLEO * rr * math.cos(phi), R_NUCLEO * rr * math.sin(phi), H_NUCLEO * zu))
    n = Vector((p.x / R_NUCLEO ** 2, p.y / R_NUCLEO ** 2, p.z / H_NUCLEO ** 2)).normalized()
    return p, n


def append_bm(bm, tmp):
    me = bpy.data.meshes.new('tmp')
    tmp.to_mesh(me)
    tmp.free()
    bm.from_mesh(me)
    bpy.data.meshes.remove(me)


def add_petal(bm, center, d, e, n, s):
    a, b, c = PETALO[0] * s, PETALO[1] * s, PETALO[2]
    tmp = bmesh.new()
    bmesh.ops.create_uvsphere(tmp, u_segments=24, v_segments=12, radius=1.0)
    rot = Matrix.Rotation(-INCLINAZIONE, 3, 'Y')  # alza la punta (+x) verso la normale
    for v in tmp.verts:
        x, y, z = v.co.x * a, v.co.y * b, v.co.z * c
        z += COPPA * ((x / a) ** 2 + (y / b) ** 2)  # coppa: bordi rialzati
        x, y, z = rot @ Vector((x, y, z))
        v.co = center + d * x + e * y + n * z
    append_bm(bm, tmp)


def add_sphere(bm, center, r, segs=16):
    tmp = bmesh.new()
    bmesh.ops.create_uvsphere(tmp, u_segments=segs, v_segments=segs // 2, radius=r)
    bmesh.ops.translate(tmp, verts=tmp.verts, vec=center)
    append_bm(bm, tmp)


def build_raw():
    rnd = random.Random(11)
    bm = bmesh.new()
    # nucleo: ellissoide intero (la meta inferiore verra tagliata)
    bmesh.ops.create_uvsphere(bm, u_segments=96, v_segments=48, radius=1.0)
    bmesh.ops.scale(bm, vec=(R_NUCLEO, R_NUCLEO, H_NUCLEO), verts=bm.verts)
    # fiorellini: spirale di Fibonacci sulla calotta, fino poco sotto la base
    golden = math.pi * (3 - math.sqrt(5))
    zu_min = -0.04
    for i in range(N_FIORELLINI):
        zu = 1 - (i + 0.5) / N_FIORELLINI * (1 - zu_min)
        p, n = ellipsoid_point(zu, i * golden)
        s = rnd.uniform(*SCALA_FIORELLINO)
        t1 = n.cross(Vector((0, 0, 1)) if abs(n.z) < 0.9 else Vector((1, 0, 0))).normalized()
        t2 = n.cross(t1)
        spin = rnd.uniform(0, math.pi / 2)
        base = p + n * 0.25
        for k in range(4):
            ang = spin + k * math.pi / 2
            d = t1 * math.cos(ang) + t2 * math.sin(ang)
            e = n.cross(d)
            add_petal(bm, base + d * (PETALO[0] * s * 0.85), d, e, n, s)
        add_sphere(bm, base + n * 0.45, 0.6 * s)  # bottoncino centrale
    print('fiorellini:', N_FIORELLINI, flush=True)
    return bm


def replace_with_evaluated(obj, m):
    dg = bpy.context.evaluated_depsgraph_get()
    new = bpy.data.meshes.new_from_object(obj.evaluated_get(dg))
    obj.modifiers.clear()
    old = obj.data
    obj.data = new
    new.materials.clear()
    new.materials.append(m)
    bpy.data.meshes.remove(old)


def keep_outer_shell(obj):
    """Tiene solo il guscio piu grande: elimina briciole e cavita interne chiuse (che cosi si riempiono)."""
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    seen, groups = set(), []
    for v in bm.verts:
        if v in seen:
            continue
        grp, stack = [v], [v]
        seen.add(v)
        while stack:
            for e in stack.pop().link_edges:
                for w in e.verts:
                    if w not in seen:
                        seen.add(w)
                        stack.append(w)
                        grp.append(w)
        groups.append(grp)
    groups.sort(key=len, reverse=True)
    for g in groups[1:]:
        bmesh.ops.delete(bm, geom=g, context='VERTS')
    bm.to_mesh(obj.data)
    bm.free()
    print('gusci eliminati (briciole/cavita):', len(groups) - 1, flush=True)


def main():
    cr.clear_scene()
    m = cr.material('Ortensia_azzurro_lilla', (0.50, 0.56, 0.95))
    bm = build_raw()
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new('Ortensia')
    bm.to_mesh(me)  # niente remove_doubles: le primitive restano separate, ci pensa il remesh
    bm.free()
    obj = bpy.data.objects.new('Ortensia', me)
    bpy.context.scene.collection.objects.link(obj)

    remesh = obj.modifiers.new('voxel', 'REMESH')
    remesh.mode, remesh.voxel_size, remesh.adaptivity = 'VOXEL', VOXEL, 0.0
    replace_with_evaluated(obj, m)
    keep_outer_shell(obj)

    tris = sum(len(p.vertices) - 2 for p in obj.data.polygons)
    dec = obj.modifiers.new('decimate', 'DECIMATE')
    dec.decimate_type, dec.ratio, dec.use_collapse_triangulate = 'COLLAPSE', min(1.0, TRIANGOLI / tris), True
    replace_with_evaluated(obj, m)
    cr.cut_below_zero(obj)  # base piatta di appoggio (dopo la decimazione: taglio piu veloce)
    cr.foro_calamita(obj)

    cr.finish([obj], FOLDER, 'ortensia')
    cr.render_previews(FOLDER, 'ortensia', (0, 0, 8), ortho_scale=68, size=(1000, 800), shots=[
        ('ortensia_prospettiva.png', (0.55, -0.9, 0.6), None),
        ('ortensia_lato.png', (0, -1, 0.08), 74),
        ('ortensia_alto.png', (0, -0.001, 1), 68),
    ], persp_lens=210)


main()
