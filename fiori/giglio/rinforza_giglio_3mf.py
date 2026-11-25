"""Giglio ingrandito, con petali ispessiti e sede per calamita sul retro.

Uso:  blender -b --factory-startup --python rinforza_giglio_3mf.py
Ingresso: giglio_54mm.3mf (progetto Bambu originale, 2 piatti, colorazione stami)
Uscita:   giglio_60mm_rinforzato.3mf (stesso progetto, mesh nuova, scala 100%)

Passi:
1. voxel remesh della mesh originale (toglie auto-intersezioni e frammenti)
2. ispessimento uniforme: guscio esterno di SPESSORE_EXTRA + nuovo remesh = dilatazione
3. piedino pieno sotto il centro (nascosto dal fiore) che alza il giglio di SOLLEVAMENTO
4. foro calamita dal basso, base piatta a z = 0, decimazione
5. trasferimento della colorazione (paint_color) e riscrittura del 3MF
"""
import math
import os
import re
import sys
import zipfile
from collections import Counter

import bmesh
import bpy
import numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree

FOLDER = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(FOLDER))
import comune_rilievo as cr  # noqa: E402

SRC = os.path.join(FOLDER, 'giglio_54mm.3mf')
DST = os.path.join(FOLDER, 'giglio_60mm_rinforzato.3mf')

SCALA = 1.0               # prima 0.9066 (54.8 mm) -> 100% = 60.4 mm
SPESSORE_EXTRA = 0.25     # mm aggiunti su ogni lato di petali e stami
SOLLEVAMENTO = 1.9        # mm: altezza del piedino (1.5 + 0.4 di fondo sotto la calamita annegata)
R_PIEDINO = 5.8          # piedino Ø 11.6 mm: parete di 1.6 mm intorno alla calamita
CENTRO_PIEDINO = (1.3, -2.5)  # zona in cui la corolla tocca il piano (coordinate modello)
CALAMITA_D, CALAMITA_H = cr.CALAMITA_D, cr.CALAMITA_H  # 8 x 2 mm, definita in comune_rilievo.py
GIOCO_D, GIOCO_H = cr.GIOCO_D, cr.GIOCO_H  # foro Ø8.4 x 2.2 mm
VOXEL = 0.06
TRIANGOLI = 300_000


def read_mesh(text):
    V = np.array(re.findall(r'<vertex x="([^"]+)" y="([^"]+)" z="([^"]+)"', text), float)
    T = np.array(re.findall(r'<triangle v1="(\d+)" v2="(\d+)" v3="(\d+)"', text), int)
    return V, T


def read_paint(text):
    return re.findall(r'<triangle v1="\d+" v2="\d+" v3="\d+"(?: paint_color="([^"]*)")?/>', text)


def evaluated(obj, keep_material=None):
    dg = bpy.context.evaluated_depsgraph_get()
    new = bpy.data.meshes.new_from_object(obj.evaluated_get(dg))
    obj.modifiers.clear()
    old = obj.data
    obj.data = new
    bpy.data.meshes.remove(old)


def remesh(obj):
    mod = obj.modifiers.new('voxel', 'REMESH')
    mod.mode, mod.voxel_size, mod.adaptivity = 'VOXEL', VOXEL, 0.0
    evaluated(obj)
    keep_largest(obj)


def decimate(obj, target):
    tris = sum(len(p.vertices) - 2 for p in obj.data.polygons)
    mod = obj.modifiers.new('dec', 'DECIMATE')
    mod.decimate_type, mod.ratio, mod.use_collapse_triangulate = 'COLLAPSE', min(1.0, target / tris), True
    evaluated(obj)


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


def pedestal(bvh_flower, zmin):
    """Piedino: colonna piena dal piano fino al lato inferiore del fiore (+0.7 mm di innesto)."""
    cx, cy = CENTRO_PIEDINO
    seg = 128
    outline = [Vector((cx + R_PIEDINO * math.cos(2 * math.pi * i / seg),
                       cy + R_PIEDINO * math.sin(2 * math.pi * i / seg))) for i in range(seg)]

    def h(q, s):
        hit = bvh_flower.ray_cast(Vector((q.x, q.y, -50)), Vector((0, 0, 1)))
        under = hit[0].z if hit[0] is not None else zmin + 6
        return under + 0.7

    return cr.domed_slab(outline, h, rings=40, z0=zmin - SOLLEVAMENTO - 1.0)


def transfer_paint(V, T, paint, obj, shift):
    bvh = BVHTree.FromPolygons(V.tolist(), T.tolist())
    me = obj.data
    me.calc_loop_triangles()
    out = []
    for tri in me.loop_triangles:
        pts = [me.vertices[i].co - shift for i in tri.vertices]
        c = (pts[0] + pts[1] + pts[2]) / 3
        votes = Counter()
        for q in [c] + [c * 0.5 + p * 0.5 for p in pts]:
            code = paint[bvh.find_nearest(q)[2]]
            if code in ('', '4', '8'):
                votes[code] += 1
        out.append(votes.most_common(1)[0][0] if votes else '4')
    print('colorazione trasferita:', Counter(out), flush=True)
    return out


def object_xml(header, obj, paint):
    me = obj.data
    me.calc_loop_triangles()
    out = [header, '    <mesh>\n     <vertices>\n']
    out += [f'      <vertex x="{v.co.x:.6f}" y="{v.co.y:.6f}" z="{v.co.z:.6f}"/>\n' for v in me.vertices]
    out.append('     </vertices>\n     <triangles>\n')
    for k, t in enumerate(me.loop_triangles):
        extra = f' paint_color="{paint[k]}"' if paint and paint[k] else ''
        out.append(f'      <triangle v1="{t.vertices[0]}" v2="{t.vertices[1]}" v3="{t.vertices[2]}"{extra}/>\n')
    out.append('     </triangles>\n    </mesh>\n   </object>\n  </resources>\n <build/>\n</model>\n')
    return ''.join(out)


def roof_check(obj, hole_r, hole_top):
    """Spessore minimo di materiale sopra il foro della calamita."""
    bvh = BVHTree.FromPolygons([v.co[:] for v in obj.data.vertices], [p.vertices[:] for p in obj.data.polygons])
    cx, cy = CENTRO_PIEDINO
    worst = 99.0
    for r in np.linspace(0, hole_r, 6):
        for a in np.linspace(0, 2 * math.pi, 24, endpoint=False):
            o = Vector((cx + r * math.cos(a), cy + r * math.sin(a), hole_top + 1e-3))
            hit = bvh.ray_cast(o, Vector((0, 0, 1)))
            if hit[0] is not None:
                worst = min(worst, hit[3])
    print(f'materiale minimo sopra la calamita: {worst:.2f} mm', flush=True)
    assert worst >= 0.8, 'tetto del foro troppo sottile'


def spike_check(obj, flower_bvh, shift):
    """Nessun punto (fuori dal piedino) deve allontanarsi dalla forma originale piu dell'ispessimento."""
    cx, cy = CENTRO_PIEDINO
    worst = 0.0
    for v in obj.data.vertices:
        p = v.co - shift
        if math.hypot(p.x - cx, p.y - cy) < R_PIEDINO + 1.0:
            continue
        worst = max(worst, flower_bvh.find_nearest(p)[3])
    print(f'distanza massima dalla forma originale: {worst:.2f} mm', flush=True)
    assert worst < SPESSORE_EXTRA + 0.35, 'punte anomale (aghi) nella mesh'


def main():
    cr.clear_scene()
    src = zipfile.ZipFile(SRC)
    obj_files = [n for n in src.namelist() if n.startswith('3D/Objects/') and n.endswith('.model')]
    texts = {n: src.read(n).decode('utf-8') for n in obj_files}
    V, T = read_mesh(texts[obj_files[0]])
    for n, t in texts.items():
        V2, T2 = read_mesh(t)
        assert np.array_equal(V, V2) and np.array_equal(T, T2), f'{n}: geometria diversa'
    paints = {n: read_paint(t) for n, t in texts.items()}
    V = V * SCALA

    me = bpy.data.meshes.new('giglio')
    me.from_pydata(V.tolist(), [], T.tolist())
    obj = bpy.data.objects.new('Giglio', me)
    bpy.context.scene.collection.objects.link(obj)

    remesh(obj)                      # 1. pulizia
    decimate(obj, 800_000)
    print('pulito', flush=True)
    flower_bvh = BVHTree.FromPolygons([v.co[:] for v in obj.data.vertices],
                                      [p.vertices[:] for p in obj.data.polygons])
    zmin = min(v.co.z for v in obj.data.vertices)

    sol = obj.modifiers.new('ispessisci', 'SOLIDIFY')  # 2. guscio esterno -> dilatazione
    # offset semplice lungo la normale: quello 'even' crea aghi sulle punte affilate
    sol.thickness, sol.offset, sol.use_even_offset = SPESSORE_EXTRA, 1.0, False
    evaluated(obj)

    bm = bmesh.new()                 # 3. piedino nello stesso solido
    bm.from_mesh(obj.data)
    ped = pedestal(flower_bvh, zmin)
    tmp = bpy.data.meshes.new('ped')
    ped.to_mesh(tmp)
    ped.free()
    bm.from_mesh(tmp)
    bpy.data.meshes.remove(tmp)
    bm.to_mesh(obj.data)
    bm.free()
    remesh(obj)
    print('ispessito e piedino aggiunto', flush=True)

    shift = Vector((0, 0, -zmin + SOLLEVAMENTO))  # 4. base a z = 0
    obj.data.transform(__import__('mathutils').Matrix.Translation(shift))
    decimate(obj, TRIANGOLI)
    cr.cut_below_zero(obj)
    cr.foro_calamita(obj, CENTRO_PIEDINO)  # calamita annegata: pausa durante la stampa
    cr.check(obj)
    spike_check(obj, flower_bvh, shift)

    new_paint = {n: (transfer_paint(V, T, p, obj, shift) if any(p) else None) for n, p in paints.items()}
    n_faces = len(obj.data.polygons)
    with zipfile.ZipFile(DST, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as dst:
        for item in src.infolist():
            data = src.read(item.filename)
            if item.filename in texts:
                text = texts[item.filename]
                data = object_xml(text[:text.index('<mesh>')].rstrip(' '), obj, new_paint[item.filename]).encode()
            elif item.filename == '3D/3dmodel.model':
                model = data.decode('utf-8')
                # scala 100% e appoggio a z = 0 (la mesh e' gia' sul piano)
                model = re.sub(r'(<component [^>]*transform=")([^"]*)(")',
                               lambda m: m.group(1) + '1 0 0 0 1 0 0 0 1 0 0 0' + m.group(3), model)
                model = re.sub(r'(<item [^>]*transform=")([^"]*)(")',
                               lambda m: m.group(1) + '1 0 0 0 1 0 0 0 1 ' + ' '.join(m.group(2).split()[9:11]) + ' 0'
                               + m.group(3), model)
                data = model.encode('utf-8')
            elif item.filename == 'Metadata/model_settings.config':
                cfg = data.decode('utf-8')
                cfg = re.sub(r'face_count="\d+"', f'face_count="{n_faces}"', cfg)
                cfg = re.sub(r'key="matrix" value="[^"]*"', 'key="matrix" value="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1"', cfg)
                data = cfg.encode('utf-8')
            dst.writestr(item, data, compress_type=zipfile.ZIP_DEFLATED)
    d = obj.dimensions
    print(f'SALVATO {DST} ({os.path.getsize(DST) / 1e6:.1f} MB) dim={d.x:.1f}x{d.y:.1f}x{d.z:.1f} mm', flush=True)

    # anteprime: anche il retro con il foro
    obj.data.materials.append(cr.material('Giglio_bianco', (0.92, 0.92, 0.9)))
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(FOLDER, 'giglio_60mm_rinforzato.blend'))
    cr.render_previews(FOLDER, 'giglio_rinforzato', (0, 0, 7), 70, size=(1000, 800), persp_lens=180, shots=[
        ('giglio_rinforzato_prospettiva.png', (0.5, -0.9, 0.8), None),
    ])


main()
