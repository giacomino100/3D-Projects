"""Ripara e alleggerisce il giglio dentro il progetto Bambu 3MF.

Uso:  blender -b --factory-startup --python ottimizza_giglio_3mf.py -- [ingresso.3mf] [triangoli]
Default: giglio_54mm.3mf -> giglio_54mm_ottimizzato.3mf, 250000 triangoli.

1. voxel remesh: elimina auto-intersezioni e frammenti interni, solido unico chiuso
2. decimate: riduce i triangoli (l'ugello da 0.4 mm non vede dettagli < 0.05 mm)
3. riscrive solo le mesh nel 3MF: piatti, impostazioni e posizioni restano invariati
4. trasferisce la colorazione fatta nello slicer (paint_color) sulla nuova mesh
"""
import bpy
import bmesh
import os
import re
import sys
import zipfile
from collections import Counter

import numpy as np
from mathutils.bvhtree import BVHTree

FOLDER = os.path.dirname(os.path.abspath(__file__))
args = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
SRC = os.path.join(FOLDER, args[0] if args else 'giglio_54mm.3mf')
TARGET_TRIS = int(args[1]) if len(args) > 1 else 250_000
DST = os.path.splitext(SRC)[0] + '_ottimizzato.3mf'
VOXEL = 0.06  # mm, nelle coordinate dell'oggetto (in stampa scalato x0.9066)


def read_mesh(text):
    V = np.array(re.findall(r'<vertex x="([^"]+)" y="([^"]+)" z="([^"]+)"', text), float)
    T = np.array(re.findall(r'<triangle v1="(\d+)" v2="(\d+)" v3="(\d+)"', text), int)
    return V, T


def read_paint(text):
    """Codice paint per triangolo: '' = non dipinto, '4' = filamento 1, '8' = filamento 2, altro = misto."""
    return re.findall(r'<triangle v1="\d+" v2="\d+" v3="\d+"(?: paint_color="([^"]*)")?/>', text)


def transfer_paint(V, T, paint, obj):
    """Per ogni nuovo triangolo: voto di maggioranza dei triangoli originali piu vicini."""
    bvh = BVHTree.FromPolygons(V.tolist(), T.tolist())
    me = obj.data
    me.calc_loop_triangles()
    out = []
    for tri in me.loop_triangles:
        pts = [me.vertices[i].co for i in tri.vertices]
        c = (pts[0] + pts[1] + pts[2]) / 3
        votes = Counter()
        for q in [c] + [c * 0.5 + p * 0.5 for p in pts]:
            code = paint[bvh.find_nearest(q)[2]]
            if code in ('', '4', '8'):
                votes[code] += 1
        out.append(votes.most_common(1)[0][0] if votes else '4')
    print('colorazione trasferita:', Counter(out), flush=True)
    return out


def report(tag, obj):
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    bmesh.ops.triangulate(bm, faces=bm.faces)
    bm.faces.ensure_lookup_table()
    open_edges = sum(not e.is_manifold for e in bm.edges)
    bvh = BVHTree.FromBMesh(bm)
    inter = 0
    for a, b in bvh.overlap(bvh):
        if a < b and not ({v.index for v in bm.faces[a].verts} & {v.index for v in bm.faces[b].verts}):
            inter += 1
    # parti separate
    seen, parts = set(), 0
    for v in bm.verts:
        if v in seen:
            continue
        parts += 1
        stack = [v]
        seen.add(v)
        while stack:
            for e in stack.pop().link_edges:
                for w in e.verts:
                    if w not in seen:
                        seen.add(w)
                        stack.append(w)
    info = dict(triangoli=len(bm.faces), bordi_aperti=open_edges, auto_intersezioni=inter,
                parti=parts, volume=round(bm.calc_volume(signed=True), 1))
    bm.free()
    print(f'{tag}: {info}', flush=True)
    return info


def deviation(orig_V, obj, samples=200_000):
    """Distanza dei vertici originali dalla nuova superficie (mm)."""
    bvh = BVHTree.FromPolygons([v.co[:] for v in obj.data.vertices],
                               [p.vertices[:] for p in obj.data.polygons])
    idx = np.random.default_rng(0).choice(len(orig_V), min(samples, len(orig_V)), replace=False)
    d = np.array([bvh.find_nearest(orig_V[i])[3] for i in idx])
    print(f'SCOSTAMENTO dalla forma originale: media {d.mean():.4f} mm, 99% {np.percentile(d, 99):.4f} mm, '
          f'max {d.max():.4f} mm', flush=True)


def build_object_xml(header, obj, paint=None):
    me = obj.data
    me.calc_loop_triangles()
    out = [header, '    <mesh>\n     <vertices>\n']
    out += [f'      <vertex x="{v.co.x:.6f}" y="{v.co.y:.6f}" z="{v.co.z:.6f}"/>\n' for v in me.vertices]
    out.append('     </vertices>\n     <triangles>\n')
    for k, t in enumerate(me.loop_triangles):
        extra = f' paint_color="{paint[k]}"' if paint and paint[k] else ''
        out.append(f'      <triangle v1="{t.vertices[0]}" v2="{t.vertices[1]}" v3="{t.vertices[2]}"{extra}/>\n')
    out.append('     </triangles>\n    </mesh>\n   </object>\n  </resources>\n <build/>\n</model>\n')
    return ''.join(out), len(me.loop_triangles)


def main():
    src = zipfile.ZipFile(SRC)
    obj_files = [n for n in src.namelist() if n.startswith('3D/Objects/') and n.endswith('.model')]
    texts = {n: src.read(n).decode('utf-8') for n in obj_files}
    first = texts[obj_files[0]]
    V, T = read_mesh(first)
    for n, t in texts.items():  # le copie devono avere la stessa geometria (la colorazione puo variare)
        V2, T2 = read_mesh(t)
        assert np.array_equal(V, V2) and np.array_equal(T, T2), f'{n}: geometria diversa'
    paints = {n: read_paint(t) for n, t in texts.items()}
    assert all(len(p) == len(T) for p in paints.values())
    me = bpy.data.meshes.new('giglio')
    me.from_pydata(V.tolist(), [], T.tolist())
    obj = bpy.data.objects.new('giglio', me)
    bpy.context.scene.collection.objects.link(obj)
    report('PRIMA', obj)

    remesh = obj.modifiers.new('voxel', 'REMESH')
    remesh.mode = 'VOXEL'
    remesh.voxel_size = VOXEL
    remesh.adaptivity = 0.0
    dg = bpy.context.evaluated_depsgraph_get()
    new = bpy.data.meshes.new_from_object(obj.evaluated_get(dg))
    obj.modifiers.clear()
    obj.data = new
    # tieni solo la parte principale (scarta eventuali briciole staccate)
    bm = bmesh.new()
    bm.from_mesh(new)
    groups, seen = [], set()
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
    print('frammenti scartati dopo remesh:', [len(g) for g in groups[1:]][:10], flush=True)
    bm.to_mesh(new)
    bm.free()
    tris_now = sum(len(p.vertices) - 2 for p in new.polygons)
    print('triangoli dopo remesh:', tris_now, flush=True)

    dec = obj.modifiers.new('decimate', 'DECIMATE')
    dec.decimate_type = 'COLLAPSE'
    dec.ratio = min(1.0, TARGET_TRIS / tris_now)
    dec.use_collapse_triangulate = True
    dg = bpy.context.evaluated_depsgraph_get()
    final = bpy.data.meshes.new_from_object(obj.evaluated_get(dg))
    obj.modifiers.clear()
    obj.data = final
    info = report('DOPO', obj)
    deviation(V, obj)
    assert info['bordi_aperti'] == 0 and info['auto_intersezioni'] == 0 and info['parti'] == 1, info

    new_paint = {n: (transfer_paint(V, T, p, obj) if any(p) else None) for n, p in paints.items()}
    face_count = None
    with zipfile.ZipFile(DST, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as dst:
        for item in src.infolist():
            data = src.read(item.filename)
            if item.filename in texts:
                text = texts[item.filename]
                header = text[:text.index('<mesh>')].rstrip(' ')
                xml, face_count = build_object_xml(header, obj, new_paint[item.filename])
                data = xml.encode('utf-8')
            elif item.filename == 'Metadata/model_settings.config':
                cfg = data.decode('utf-8')
                cfg = re.sub(r'face_count="\d+"', f'face_count="{len(obj.data.polygons)}"', cfg)
                cfg = re.sub(r'(edges_fixed|degenerate_facets|facets_removed|facets_reversed|backwards_edges)="\d+"',
                             r'\1="0"', cfg)
                data = cfg.encode('utf-8')
            dst.writestr(item, data, compress_type=zipfile.ZIP_DEFLATED)
    print(f'SALVATO {DST} ({os.path.getsize(DST) / 1e6:.1f} MB, {face_count} triangoli per copia)', flush=True)


main()
