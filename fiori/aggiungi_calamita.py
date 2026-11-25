"""Aggiunge la sede per calamita 8 x 2 mm a dalia, girasole e tulipano.

Uso:  blender -b --factory-startup --python aggiungi_calamita.py -- dalia|girasole|tulipano
Non modifica i file esistenti: per ogni fiore salva un NUOVO .blend e il suo .3mf
(nome con suffisso _calamita_8x2). Misure della sede in comune_rilievo.py.
"""
import math
import os
import sys

import bmesh
import bpy
from mathutils import Vector
from mathutils.bvhtree import BVHTree

FIORI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, FIORI)
import comune_rilievo as cr  # noqa: E402

EXPORT = os.path.join(FIORI, 'esporta_blend_3mf.py')


def open_file(path):
    bpy.ops.wm.open_mainfile(filepath=path)


def save_and_export(path):
    bpy.ops.wm.save_as_mainfile(filepath=path)
    exec(open(EXPORT, encoding='utf-8').read(), {'__name__': '__main__'})


def apply_mods(obj):
    dg = bpy.context.evaluated_depsgraph_get()
    new = bpy.data.meshes.new_from_object(obj.evaluated_get(dg))
    mats = list(obj.data.materials)
    obj.modifiers.clear()
    old = obj.data
    obj.data = new
    new.materials.clear()
    for m in mats:
        new.materials.append(m)
    bpy.data.meshes.remove(old)


def bake_transform(obj):
    obj.data.transform(obj.matrix_world)
    obj.matrix_world.identity()


# ------------------------------------------------------------------ tulipano
def tulipano():
    folder = os.path.join(FIORI, 'tulipano')
    open_file(os.path.join(folder, 'tulipano_dritto_29.5x88x12.6mm.blend'))
    obj = next(o for o in bpy.data.objects if o.type == 'MESH')
    bake_transform(obj)
    # centro della vecchia sede 6x2: punti del retro in cui il pieno non parte da z = 0
    bvh = BVHTree.FromPolygons([v.co[:] for v in obj.data.vertices], [p.vertices[:] for p in obj.data.polygons])
    pts = []
    for ix in range(-40, 41):
        for iy in range(140, 380):
            x, y = ix * 0.1, iy * 0.1
            hit = bvh.ray_cast(Vector((x, y, -1)), Vector((0, 0, 1)))
            if hit[0] is not None and 0.5 < hit[0].z < 3.0:
                pts.append((x, y))
    cx = sum(p[0] for p in pts) / len(pts)
    cy = sum(p[1] for p in pts) / len(pts)
    print(f'vecchia sede 6x2 trovata in ({cx:.2f}, {cy:.2f}), {len(pts)} campioni', flush=True)
    # la vecchia sede 6x2 era aperta sul fondo: la riempio, rifilo il fondo e ricavo la cavita chiusa
    plug = cr.make_disc(4.8, 3.2, segments=96, z=-1.0)  # copre tutta la vecchia sede (r ~4.1) fino a 2.2 mm
    bmesh.ops.translate(plug, verts=plug.verts, vec=(cx, cy, 0))
    cr.boolean(obj, plug, 'UNION')
    obj.data.transform(__import__('mathutils').Matrix.Translation((0, 0, -0.02)))
    cr.cut_below_zero(obj)
    cr.foro_calamita(obj, (round(cx, 2), round(cy, 2)))
    cr.check(obj)
    obj.name = 'TULIPANO_calamita_8x2'
    save_and_export(os.path.join(folder, 'tulipano_dritto_calamita_8x2.blend'))


# ------------------------------------------------------------------ girasole
def girasole():
    folder = os.path.join(FIORI, 'girasoli', 'finale')
    open_file(os.path.join(folder, 'girasole_stelo_nel_petalo.blend'))
    corpo = bpy.data.objects['PROVA_giunzione2']   # e' il corpo esportato nel 3MF finale
    cr.SOLVER = 'MANIFOLD'  # il corpo e' fatto di parti che si compenetrano: EXACT lascia facce doppie
    centro = bpy.data.objects['girasoli_008']
    for o in bpy.data.objects:                     # esporta solo i due pezzi del 3MF finale
        o.hide_render = o not in (corpo, centro)
    bake_transform(corpo)
    z0 = min(v.co.z for v in corpo.data.vertices)
    corpo.data.transform(__import__('mathutils').Matrix.Translation((0, 0, -z0)))
    centro.location.z -= z0
    originale = corpo.data.copy()  # per ripristinare i colori dopo i booleani
    # rinforzo pieno sotto il cuore marrone (nascosto): il corpo li' e' spesso solo 0.8-1.8 mm
    r_boss = (cr.CALAMITA_D + cr.GIOCO_D) / 2 + 1.6
    centro_bottom = min((centro.matrix_world @ v.co).z for v in centro.data.vertices)
    boss = cr.make_disc(r_boss, centro_bottom - 0.25 + 1.0, segments=128, z=-1.0)
    print(f'rinforzo Ø{2 * r_boss:.1f} mm alto fino a {centro_bottom - 0.25:.2f} mm '
          f'(cuore marrone da {centro_bottom:.2f} mm)', flush=True)
    cr.boolean(corpo, boss, 'UNION')
    # il fondo originale non e' perfettamente piano (centesimi di mm): lo rifilo 0.02 mm sopra
    # il minimo, cosi' il taglio attraversa il materiale e non e' mai complanare, poi riporto a z = 0
    RIFILO = 0.02
    corpo.data.transform(__import__('mathutils').Matrix.Translation((0, 0, -RIFILO)))
    cr.cut_below_zero(corpo)
    centro.location.z -= RIFILO
    cr.foro_calamita(corpo, (0.0, 0.0))
    restore_materials(corpo, originale, shift=Vector((0, 0, -RIFILO)))
    cr.check(corpo, max_parts=99)
    corpo.name = 'GIRASOLE_corpo_calamita_8x2'
    save_and_export(os.path.join(folder, 'girasole_calamita_8x2.blend'))


# ------------------------------------------------------------- girasole unico
def girasole_unico():
    """Corpo + semi fusi in UN solo pezzo, con la calamita 8x2 chiusa dentro (pausa in stampa).

    Nel progetto originale i semi (girasoli_008) erano un pezzo da incollare sul piano del corpo
    (z = 1.78) sopra un foro Ø8 x 1 mm. Qui i semi vengono abbassati su quel piano e uniti.
    """
    from mathutils import Matrix
    folder = os.path.join(FIORI, 'girasoli', 'finale')
    open_file(os.path.join(folder, 'girasole_stelo_nel_petalo.blend'))
    corpo = bpy.data.objects['PROVA_giunzione2']
    semi = bpy.data.objects['girasoli_008']
    for o in list(bpy.data.objects):
        if o not in (corpo, semi):
            bpy.data.objects.remove(o, do_unlink=True)
    cr.SOLVER = 'MANIFOLD'  # il corpo e' fatto di parti che si compenetrano
    bake_transform(corpo)
    bake_transform(semi)
    z0 = min(v.co.z for v in corpo.data.vertices)
    corpo.data.transform(Matrix.Translation((0, 0, -z0)))
    semi.data.transform(Matrix.Translation((0, 0, -z0)))

    bvh = cr.bvh_triangoli(corpo)
    vs = semi.data.vertices
    sx, sy = sum(v.co.x for v in vs) / len(vs), sum(v.co.y for v in vs) / len(vs)
    piano = cr._hits_up(bvh, sx + 8.0, sy, -5)[-1][0]       # piano d'appoggio dei semi
    pts = []                                                # vecchio foro Ø8 x 1
    for ix in range(-70, 71):
        for iy in range(-70, 71):
            x, y = sx + ix * 0.1, sy + iy * 0.1
            h = cr._hits_up(bvh, x, y, -5)
            if h and h[-1][0] < piano - 0.5:
                pts.append((x, y))
    cx, cy = sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts)
    r_foro = math.sqrt(len(pts) * 0.01 / math.pi)
    print(f'piano semi z={piano:.2f}; vecchio foro Ø{2 * r_foro:.2f} in ({cx:.2f}, {cy:.2f})', flush=True)

    # il piano d'appoggio (cuore della corolla) non e' centrato sui semi: trovo il suo cerchio
    import numpy as np
    bordo = []
    for k in range(72):
        a = 2 * math.pi * k / 72
        r = 8.0
        while r < 16:
            h = cr._hits_up(bvh, sx + r * math.cos(a), sy + r * math.sin(a), -5)
            if not h or abs(h[-1][0] - piano) > 0.03:
                break
            r += 0.02
        bordo.append((sx + r * math.cos(a), sy + r * math.sin(a)))
    A = np.array([[x, y, 1] for x, y in bordo])
    D, E, Fc = np.linalg.lstsq(A, np.array([-(x * x + y * y) for x, y in bordo]), rcond=None)[0]
    px, py = -D / 2, -E / 2
    bx = (min(v.co.x for v in vs) + max(v.co.x for v in vs)) / 2
    by = (min(v.co.y for v in vs) + max(v.co.y for v in vs)) / 2
    print(f'piano d\'appoggio: centro ({px:.2f}, {py:.2f}) Ø{2 * math.sqrt(D * D / 4 + E * E / 4 - Fc):.2f}; '
          f'semi spostati da ({bx:.2f}, {by:.2f}) al centro del piano', flush=True)

    # semi centrati sul piano e appoggiati (0.1 mm di compenetrazione per un'unione pulita)
    semi_bottom = min(v.co.z for v in vs)
    abbassa = semi_bottom - (piano - 0.1)
    semi.data.transform(Matrix.Translation((px - bx, py - by, -abbassa)))
    print(f'semi abbassati di {abbassa:.2f} mm (top ora {max(v.co.z for v in vs):.2f})', flush=True)

    # mesh di riferimento con i 3 colori, per ripristinarli dopo i booleani MANIFOLD
    n_corpo_mats = len(corpo.data.materials)
    bm = bmesh.new()
    bm.from_mesh(corpo.data)
    bm_s = bmesh.new()
    bm_s.from_mesh(semi.data)
    for f in bm_s.faces:
        f.material_index += n_corpo_mats
    tmp = bpy.data.meshes.new('tmp_semi')
    bm_s.to_mesh(tmp)
    bm_s.free()
    bm.from_mesh(tmp)
    bpy.data.meshes.remove(tmp)
    originale = bpy.data.meshes.new('riferimento_colori')
    bm.to_mesh(originale)
    bm.free()
    for m in list(corpo.data.materials) + list(semi.data.materials):
        originale.materials.append(m)

    # 1) riempio il vecchio foro, 2) unisco i semi
    plug = cr.make_disc(r_foro + 0.8, piano - 0.05 + 1.0, segments=96, z=-1.0)
    bmesh.ops.translate(plug, verts=plug.verts, vec=(cx, cy, 0))
    cr.boolean(corpo, plug, 'UNION')
    cr._apply_boolean(corpo, semi, 'UNION')
    bpy.data.objects.remove(semi, do_unlink=True)
    RIFILO = 0.02
    corpo.data.transform(Matrix.Translation((0, 0, -RIFILO)))
    cr.cut_below_zero(corpo)
    cr.foro_calamita(corpo, (round(px, 2), round(py, 2)))   # calamita al centro dei semi
    restore_materials(corpo, originale, shift=Vector((0, 0, -RIFILO)))
    cr.check(corpo)
    corpo.name = 'GIRASOLE_pezzo_unico_calamita_8x2'
    save_and_export(os.path.join(folder, 'girasole_pezzo_unico_calamita_8x2.blend'))


# ------------------------------------------------------------------ dalia
def dalia(diametro=None, spessore=None):
    if diametro:
        cr.CALAMITA_D, cr.CALAMITA_H = diametro, spessore
    nome = f'{cr.CALAMITA_D:g}x{cr.CALAMITA_H:g}'
    folder = os.path.join(FIORI, 'dalia')
    open_file(os.path.join(folder, 'dalia_54mm.blend'))
    parts = list(bpy.data.collections['DALIA_sorgente_112_parti'].objects)
    mat = parts[0].data.materials[0]
    bm = bmesh.new()
    for p in parts:
        me = p.data.copy()
        me.transform(p.matrix_world)
        bm.from_mesh(me)
        bpy.data.meshes.remove(me)
    for o in list(bpy.data.objects):
        bpy.data.objects.remove(o, do_unlink=True)
    for c in list(bpy.data.collections):
        bpy.data.collections.remove(c)
    me = bpy.data.meshes.new('Dalia')
    bm.to_mesh(me)
    bm.free()
    me.materials.append(mat)
    obj = bpy.data.objects.new(f'DALIA_calamita_{nome}', me)
    bpy.context.scene.collection.objects.link(obj)
    z0 = min(v.co.z for v in me.vertices)
    me.transform(__import__('mathutils').Matrix.Translation((0, 0, -z0)))
    # le 112 parti si compenetrano: le fondo in un solido unico e chiuso
    rem = obj.modifiers.new('voxel', 'REMESH')
    rem.mode, rem.voxel_size, rem.adaptivity = 'VOXEL', 0.05, 0.0
    apply_mods(obj)
    keep_largest(obj)
    tris = sum(len(p.vertices) - 2 for p in obj.data.polygons)
    dec = obj.modifiers.new('dec', 'DECIMATE')
    dec.decimate_type, dec.ratio, dec.use_collapse_triangulate = 'COLLAPSE', min(1.0, 400_000 / tris), True
    apply_mods(obj)
    # il canale centrale (forse per uno stelo) e' aperto sul fondo: lo tappo, la calamita va sopra il fondo
    cr.boolean(obj, cr.make_disc(3.0, 10.5, segments=64, z=-1.0), 'UNION')
    cr.cut_below_zero(obj)
    cr.foro_calamita(obj, (0.0, 0.0))
    cr.check(obj)
    save_and_export(os.path.join(folder, f'dalia_54mm_calamita_{nome}.blend'))


def dalia15_interna():
    """Dalia con calamita 15x3 annegata DENTRO il corpo (pausa in stampa).

    Parte dal solido gia fuso della versione 8x2: tappa la sede 8x2 e riempie il vuoto tra i
    petali attorno alla colonna centrale (r ~6.5, troppo stretta per Ø15.4) con un nucleo pieno
    che resta dentro il fiore, poi ricava la cavita chiusa.
    """
    cr.CALAMITA_D, cr.CALAMITA_H = 15.0, 3.0
    folder = os.path.join(FIORI, 'dalia')
    open_file(os.path.join(folder, 'dalia_54mm_calamita_8x2.blend'))
    obj = next(o for o in bpy.data.objects if o.type == 'MESH')
    obj.name = 'DALIA_calamita_15x3'
    cr.boolean(obj, cr.make_disc(5.0, 4.0, segments=96, z=-1.0), 'UNION')   # tappa la vecchia sede
    r_nucleo = (cr.CALAMITA_D + cr.GIOCO_D) / 2 + NUCLEO_PARETE
    h_nucleo = cr.FONDO + cr.CALAMITA_H + cr.GIOCO_H + NUCLEO_TETTO
    cr.boolean(obj, cr.make_disc(r_nucleo, h_nucleo + 1.0, segments=128, z=-1.0), 'UNION')
    cr.cut_below_zero(obj)
    cr.foro_calamita(obj, (0.0, 0.0))
    cr.check(obj)
    save_and_export(os.path.join(folder, 'dalia_54mm_calamita_15x3.blend'))


NUCLEO_PARETE, NUCLEO_TETTO = 1.5, 1.0


def restore_materials(obj, original_mesh, shift):
    """Il solver MANIFOLD perde gli indici materiale: li ricopia dalla faccia originale piu vicina."""
    bvh = BVHTree.FromPolygons([(v.co + shift)[:] for v in original_mesh.vertices],
                               [p.vertices[:] for p in original_mesh.polygons])
    src = [p.material_index for p in original_mesh.polygons]
    obj.data.materials.clear()
    for m in original_mesh.materials:
        obj.data.materials.append(m)
    idx = [src[bvh.find_nearest(p.center)[2]] for p in obj.data.polygons]
    obj.data.polygons.foreach_set('material_index', idx)
    obj.data.update()
    from collections import Counter
    print('colori ripristinati:', {original_mesh.materials[k].name: v for k, v in Counter(idx).items()}, flush=True)


def keep_largest(obj):
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
    print(f'{obj.name}: gusci eliminati (briciole/cavita chiuse) {len(groups) - 1}', flush=True)


if __name__ == '__main__':
    which = sys.argv[sys.argv.index('--') + 1]
    {'tulipano': tulipano, 'girasole': girasole, 'girasole_unico': girasole_unico, 'dalia': dalia, 'dalia15': lambda: dalia(15.0, 3.0), 'dalia15_interna': dalia15_interna}[which]()
