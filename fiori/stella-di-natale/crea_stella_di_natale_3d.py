"""Stella di Natale 3D (testa di fiore come dalia e ortensia), da stampare in piedi.

Uso:  blender -b --factory-startup --python crea_stella_di_natale_3d.py
Genera stella_di_natale_3d.blend, stella_di_natale_3d.3mf e anteprime/.
Oggetti (un colore ciascuno, senza sovrapposizioni):
  Brattee (rosso): nucleo + 6 brattee superiori inclinate + 6 inferiori quasi distese
  Centro  (giallo): grappolo di 7 bacche sopra il nucleo
  Foglie  (verde): 6 foglie distese sul piatto tra le brattee inferiori

Stampabilita senza supporti: ogni lama sale sempre allontanandosi dal centro
(nessuna punta che ricade) e ha spessore >= 1 mm, quindi ogni strato appoggia
sul precedente. Le parti si fondono con un voxel remesh (solido unico e chiuso).
"""
import math
import os
import random
import sys

import bmesh
import bpy
from mathutils import Vector

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import comune_rilievo as cr  # noqa: E402

FOLDER = os.path.dirname(os.path.abspath(__file__))
NOME = 'stella_di_natale_3d'

N = 6
# lame: radice (r0, z0), lunghezza, larghezza, angolo di salita radice->punta (gradi),
# spessore al centro e al bordo, coppa (quanto si alzano i bordi laterali)
SOTTO = dict(r0=5.0, z0=0.65, length=25.0, width=12.5, a0=3, a1=16, t_mid=1.3, t_edge=1.0, cup=0.5)
SOPRA = dict(r0=3.0, z0=4.0, length=16.5, width=9.0, a0=42, a1=24, t_mid=1.4, t_edge=1.0, cup=0.6)
FOGLIA = dict(r0=7.0, z0=0.38, length=26.0, width=11.5, a0=1, a1=6, t_mid=1.0, t_edge=0.9, cup=0.2)
NUCLEO = dict(r_bottom=7.5, r_top=4.6, h=6.6)
BACCHE = dict(r=1.35, ring=2.45, disc_h=0.9)
VOXEL = 0.06


def halfwidth(width, u):
    u = min(max(u, 0.0), 1.0)
    return max(0.06, width / 2 * math.sin(math.pi * (0.04 + 0.96 * u) ** 0.72) ** 0.9)


def blade(p, angle, rnd, nu=160, nv=60):
    """Lama chiusa (lato superiore + inferiore + pareti) lungo la direzione angle."""
    length = p['length'] * rnd.uniform(0.95, 1.05)
    a0, a1 = math.radians(p['a0']), math.radians(p['a1'])
    # linea mediana: si integra l'angolo di salita lungo la lunghezza
    spine = [(p['r0'], p['z0'])]
    for i in range(1, nu + 1):
        u = (i - 0.5) / nu
        ang = a0 + (a1 - a0) * u
        r, z = spine[-1]
        spine.append((r + length / nu * math.cos(ang), z + length / nu * math.sin(ang)))
    ca, sa = math.cos(angle), math.sin(angle)
    bm = bmesh.new()
    top, bot = [], []
    for i in range(nu + 1):
        u = i / nu
        r, z = spine[i]
        hw = halfwidth(p['width'], u)
        rt, rb = [], []
        for j in range(nv + 1):
            v = -1 + 2 * j / nv
            y = v * hw
            zc = z + p['cup'] * v * v * min(1.0, u * 4)            # bordi rialzati (coppa)
            t = p['t_edge'] + (p['t_mid'] - p['t_edge']) * (1 - v * v)
            vein = 0.0
            if 0.05 < u < 0.92:
                vein = 0.28 * math.exp(-(y / 0.45) ** 2)               # nervatura centrale incisa
                w = (u * length - 1.2 * abs(y)) / 3.4                  # nervature laterali oblique
                vein += 0.2 * math.exp(-(((w - math.floor(w)) - 0.5) / 0.09) ** 2) * (abs(y) > 0.7)
            x, yy = r * ca - y * sa, r * sa + y * ca
            rt.append(bm.verts.new((x, yy, zc + t / 2 - vein)))
            rb.append(bm.verts.new((x, yy, zc - t / 2)))
        top.append(rt)
        bot.append(rb)
    for i in range(nu):
        for j in range(nv):
            bm.faces.new((top[i][j], top[i + 1][j], top[i + 1][j + 1], top[i][j + 1]))
            bm.faces.new((bot[i][j], bot[i][j + 1], bot[i + 1][j + 1], bot[i + 1][j]))
    for i in range(nu):  # pareti laterali
        bm.faces.new((top[i][0], bot[i][0], bot[i + 1][0], top[i + 1][0]))
        bm.faces.new((top[i][nv], top[i + 1][nv], bot[i + 1][nv], bot[i][nv]))
    for j in range(nv):  # radice e punta
        bm.faces.new((top[0][j], top[0][j + 1], bot[0][j + 1], bot[0][j]))
        bm.faces.new((top[nu][j], bot[nu][j], bot[nu][j + 1], top[nu][j + 1]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return bm


def frustum(r1, r2, h, z=0.0, segments=96):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=segments, radius1=r1, radius2=r2, depth=h)
    bmesh.ops.translate(bm, verts=bm.verts, vec=(0, 0, h / 2 + z))
    return bm


def merge_into(target_bm, bm):
    me = bpy.data.meshes.new('tmp')
    bm.to_mesh(me)
    bm.free()
    target_bm.from_mesh(me)
    bpy.data.meshes.remove(me)


def solid_from_parts(name, parts, mat, triangles):
    """Unisce le parti con voxel remesh, tiene il guscio esterno, base a z=0, decima."""
    bm = bmesh.new()
    for part in parts:
        merge_into(bm, part)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    obj = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(obj)
    mod = obj.modifiers.new('voxel', 'REMESH')
    mod.mode, mod.voxel_size, mod.adaptivity = 'VOXEL', VOXEL, 0.0
    apply_mods(obj)
    keep_shells(obj)
    tris = sum(len(p.vertices) - 2 for p in obj.data.polygons)
    dec = obj.modifiers.new('dec', 'DECIMATE')
    dec.decimate_type, dec.ratio, dec.use_collapse_triangulate = 'COLLAPSE', min(1.0, triangles / tris), True
    apply_mods(obj)
    cr.cut_below_zero(obj)
    obj.data.materials.append(mat)
    return obj


def apply_mods(obj):
    dg = bpy.context.evaluated_depsgraph_get()
    new = bpy.data.meshes.new_from_object(obj.evaluated_get(dg))
    obj.modifiers.clear()
    old = obj.data
    obj.data = new
    bpy.data.meshes.remove(old)


def keep_shells(obj, min_verts=200, min_vol=0.0):
    """Toglie briciole e cavita interne (gusci piccoli o contenuti in quello principale)."""
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
    removed = 0
    for g in groups[1:]:
        faces = {f for v in g for f in v.link_faces}
        vol = sum(f.calc_center_median().dot(f.normal) * f.calc_area() for f in faces) / 3
        if len(g) < min_verts or vol < min_vol:  # volume negativo = cavita interna
            bmesh.ops.delete(bm, geom=g, context='VERTS')
            removed += 1
    bm.to_mesh(obj.data)
    bm.free()
    print(f'{obj.name}: gusci eliminati {removed}', flush=True)


def main():
    cr.clear_scene()
    rnd = random.Random(5)
    m_rosso = cr.material('Brattee_rosso', (0.78, 0.04, 0.06))
    m_giallo = cr.material('Centro_giallo', (0.95, 0.78, 0.08))
    m_verde = cr.material('Foglie_verde', (0.12, 0.38, 0.12))

    jit = lambda: math.radians(rnd.uniform(-4, 4))  # noqa: E731
    red_parts = [frustum(NUCLEO['r_bottom'], NUCLEO['r_top'], NUCLEO['h'])]
    red_parts += [blade(SOTTO, math.pi / 2 + 2 * math.pi * k / N + jit(), rnd) for k in range(N)]
    red_parts += [blade(SOPRA, math.pi / 2 + 2 * math.pi * (k + 0.5) / N + jit(), rnd) for k in range(N)]
    brattee = solid_from_parts('Brattee', red_parts, m_rosso, 300_000)
    cr.foro_calamita(brattee)  # sotto il nucleo pieno

    # bacche: dischetto appoggiato sul nucleo + 7 sfere
    z_top = NUCLEO['h']
    yellow = [frustum(NUCLEO['r_top'] - 0.15, NUCLEO['r_top'] - 0.6, BACCHE['disc_h'], z=z_top)]
    centers = [(0.0, 0.0)] + [(BACCHE['ring'] * math.cos(a), BACCHE['ring'] * math.sin(a))
                              for a in (math.pi / 6 + 2 * math.pi * k / 6 for k in range(6))]
    for cx, cy in centers:
        s = bmesh.new()
        bmesh.ops.create_uvsphere(s, u_segments=32, v_segments=16, radius=BACCHE['r'])
        lift = 0.5 if (cx, cy) == (0.0, 0.0) else 0.0
        bmesh.ops.translate(s, verts=s.verts, vec=(cx, cy, z_top + BACCHE['disc_h'] + 0.35 + lift))
        yellow.append(s)
    centro = solid_from_parts('Centro', yellow, m_giallo, 40_000)
    # il centro poggia sul nucleo: niente compenetrazione con il rosso
    cr.boolean(centro, frustum(20, 20, z_top, z=-0.001), 'DIFFERENCE')

    green = [blade(FOGLIA, math.pi / 2 + 2 * math.pi * (k + 0.5) / N + jit(), rnd) for k in range(N)]
    foglie = solid_from_parts('Foglie', green, m_verde, 80_000)
    s_red = bmesh.new()
    s_red.from_mesh(brattee.data)
    cr.boolean(foglie, s_red, 'DIFFERENCE')  # toglie solo il volume rosso: le foglie restano sotto le brattee
    keep_shells(foglie, min_vol=5.0)  # schegge rimaste lungo i bordi delle brattee

    cr.finish([brattee, centro, foglie], FOLDER, NOME, max_parts={'Foglie': N}, appoggiati={'Centro'})
    cr.render_previews(FOLDER, NOME, (0, 0, 4), 70, size=(1000, 800), persp_lens=190, shots=[
        (NOME + '_prospettiva.png', (0.55, -0.9, 0.7), None),
        (NOME + '_lato.png', (0, -1, 0.1), 72),
        (NOME + '_alto.png', (0, -0.001, 1), 70),
    ])


main()
