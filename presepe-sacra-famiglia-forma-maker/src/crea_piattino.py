"""Piattino a pista ovale con bordo scanalato per la Sacra Famiglia (stile vassoio del video forma.maker).

Uso:  blender -b --factory-startup --python src/crea_piattino.py [-- --preview]
Legge  progetto/sacra_famiglia_render.blend (non lo modifica) e salva:
  progetto/sacra_famiglia_con_piattino.blend   scena con personaggi + piattino
  stampa/piattino_sacra_famiglia.3mf           solo il piattino, in mm, pronto per lo slicer
  render/08_con_piattino.png                   anteprima
Le misure sono in mm; nella scena (unita' = metri) il piattino ha scala 0.001 come i personaggi.
"""
import math
import os
import sys
import zipfile
from pathlib import Path

import bmesh
import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parent.parent
PREVIEW = '--preview' in sys.argv

# ------------------------------------------------------------------ parametri (mm)
LUNGHEZZA, LARGHEZZA = 210.0, 110.0   # ingombro esterno (sulle creste delle scanalature)
ALTEZZA = 12.0                        # altezza totale del bordo
FONDO = 2.4                           # spessore del fondo (12 layer da 0.2)
PARETE = 3.0                          # spessore del bordo in cima (labbro arrotondato)
SFORMO = 1.2                          # la parete interna si allarga verso l'alto
RACCORDO = 1.5                        # raccordo tra parete interna e fondo
SMUSSO = 0.6                          # smusso alla base esterna (niente "piede d'elefante")
PASSO = 3.0                           # passo delle scanalature lungo il perimetro
PROF = 0.9                            # profondita' delle scanalature
# curva destra centrata in x = 9 rispetto al gruppo (come prima); la curva sinistra ospita l'albero
CENTRO_PIATTO = (9.0 - (LUNGHEZZA / 2 - LARGHEZZA / 2), -3.0)
CENTRO_ALBERO = (CENTRO_PIATTO[0] - (LUNGHEZZA / 2 - LARGHEZZA / 2), CENTRO_PIATTO[1])
ALBERO_BLEND = ROOT / 'progetto/albero_natale.blend'  # creato da crea_albero.py
CAMPIONI_PER_PASSO = 12


def stadium(s_total_steps):
    """Punti e normali esterne della pista ovale, equispaziati lungo il perimetro."""
    r = LARGHEZZA / 2
    a = LUNGHEZZA / 2 - r                     # mezza lunghezza del tratto dritto
    tratti = [2 * a, math.pi * r, 2 * a, math.pi * r]
    per = sum(tratti)
    out = []
    for i in range(s_total_steps):
        s = per * i / s_total_steps
        if s < tratti[0]:                                    # lato davanti, da sinistra a destra
            p, n = Vector((-a + s, -r)), Vector((0, -1))
        elif s < tratti[0] + tratti[1]:                      # curva destra
            t = (s - tratti[0]) / r - math.pi / 2
            n = Vector((math.cos(t), math.sin(t)))
            p = Vector((a, 0)) + n * r
        elif s < tratti[0] + tratti[1] + tratti[2]:          # lato dietro, da destra a sinistra
            p, n = Vector((a - (s - tratti[0] - tratti[1]), r)), Vector((0, 1))
        else:                                                # curva sinistra
            t = (s - tratti[0] - tratti[1] - tratti[2]) / r + math.pi / 2
            n = Vector((math.cos(t), math.sin(t)))
            p = Vector((-a, 0)) + n * r
        out.append((s, p, n))
    return out, per


def profilo():
    """Sezione del bordo come lista di (offset dal contorno esterno, z, scanalato?)."""
    pts = [(-SMUSSO, 0.0, False), (0.0, SMUSSO, False)]
    z_top = ALTEZZA - PARETE / 2
    n = 40
    for k in range(1, n + 1):                      # parete esterna scanalata
        pts.append((0.0, SMUSSO + (z_top - SMUSSO) * k / n, True))
    for k in range(1, 16):                         # labbro arrotondato (semicerchio)
        t = math.pi * k / 16
        pts.append((-PARETE / 2 + PARETE / 2 * math.cos(t), z_top + PARETE / 2 * math.sin(t), False))
    pts.append((-PARETE, z_top, False))
    d_fondo = -PARETE - SFORMO                     # parete interna con sformo
    z_r = FONDO + RACCORDO
    pts.append((d_fondo, z_r, False))
    for k in range(1, 7):                          # raccordo concavo verso il fondo
        t = math.pi / 2 * k / 6
        pts.append((d_fondo - RACCORDO + RACCORDO * math.cos(t), z_r - RACCORDO * math.sin(t), False))
    return pts


def scanalatura(s, z):
    """Offset delle scanalature: creste arrotondate, valli strette; sfuma vicino a base e labbro."""
    fade_lo = min(1.0, max(0.0, (z - SMUSSO) / 0.8))
    fade_hi = min(1.0, max(0.0, (ALTEZZA - PARETE / 2 - z) / 0.8))
    onda = abs(math.sin(math.pi * s / PASSO)) ** 0.55
    return -PROF * (1.0 - onda) * min(fade_lo, fade_hi)


def crea_piattino_bmesh():
    global PASSO
    perimetro = 2 * (LUNGHEZZA - LARGHEZZA) + math.pi * LARGHEZZA
    n_coste = round(perimetro / PASSO)
    PASSO = perimetro / n_coste                    # numero intero di scanalature
    campioni, _ = stadium(n_coste * CAMPIONI_PER_PASSO)
    prof = profilo()
    bm = bmesh.new()
    anelli = []
    for d, z, rigato in prof:
        anello = []
        for s, p, n in campioni:
            dd = d + (scanalatura(s, z) if rigato else 0.0)
            q = p + n * dd
            anello.append(bm.verts.new((q.x, q.y, z)))
        anelli.append(anello)
    m = len(campioni)
    for a, b in zip(anelli, anelli[1:]):
        for i in range(m):
            j = (i + 1) % m
            bm.faces.new((a[i], a[j], b[j], b[i]))
    # fondo sotto (z = 0) e pavimento interno (z = FONDO): tappi con ventaglio dal centro
    for anello, z, verso in ((anelli[0], 0.0, -1), (anelli[-1], FONDO, 1)):
        c = bm.verts.new((0.0, 0.0, z))
        for i in range(m):
            j = (i + 1) % m
            tri = (c, anello[j], anello[i]) if verso < 0 else (c, anello[i], anello[j])
            bm.faces.new(tri)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    print(f'piattino: {n_coste} scanalature, passo {PASSO:.2f} mm, {len(bm.faces)} facce', flush=True)
    return bm


def controlla(bm):
    bad = [e for e in bm.edges if not e.is_manifold]
    vol = bm.calc_volume(signed=True)
    print(f'CHECK piattino: nonmanifold={len(bad)} volume={vol / 1000:.1f} cm3 '
          f'(~{vol / 1000 * 1.24:.0f} g PLA pieno)', flush=True)
    assert not bad and vol > 0


def esporta_3mf(bm, path):
    bm2 = bm.copy()
    bmesh.ops.triangulate(bm2, faces=bm2.faces)
    bm2.verts.index_update()
    righe = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<model unit="millimeter" xml:lang="it-IT" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">',
             '<resources><object id="1" name="Piattino_Sacra_Famiglia" type="model"><mesh><vertices>']
    righe += [f'<vertex x="{v.co.x:.4f}" y="{v.co.y:.4f}" z="{v.co.z:.4f}"/>' for v in bm2.verts]
    righe.append('</vertices><triangles>')
    righe += [f'<triangle v1="{f.verts[0].index}" v2="{f.verts[1].index}" v3="{f.verts[2].index}"/>' for f in bm2.faces]
    righe += ['</triangles></mesh></object></resources><build><item objectid="1"/></build></model>']
    bm2.free()
    path.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/></Types>')
        z.writestr('_rels/.rels', '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>')
        z.writestr('3D/3dmodel.model', '\n'.join(righe))
    print(f'3MF={path}', flush=True)


def main():
    bpy.ops.wm.open_mainfile(filepath=str(ROOT / 'progetto/sacra_famiglia_render.blend'))
    bm = crea_piattino_bmesh()
    controlla(bm)
    esporta_3mf(bm, ROOT / 'stampa' / 'piattino_sacra_famiglia.3mf')

    me = bpy.data.meshes.new('Piattino')
    bm.to_mesh(me)
    bm.free()
    for p in me.polygons:
        p.use_smooth = True
    obj = bpy.data.objects.new('PIATTINO_scanalato', me)
    coll = bpy.data.collections.new('03_PIATTINO')
    bpy.context.scene.collection.children.link(coll)
    coll.objects.link(obj)
    obj.scale = (0.001, 0.001, 0.001)
    obj.location = (CENTRO_PIATTO[0] / 1000, CENTRO_PIATTO[1] / 1000, 0)
    # personaggi appoggiati sul fondo del piattino (solo nella scena, il 3MF resta a z = 0)
    fam = bpy.data.objects['SACRA_FAMIGLIA_mesh_anteprima_MakerWorld']
    fam.location.z = FONDO / 1000
    obj.data.materials.append(fam.data.materials[0])  # stesso PLA avorio
    obj.modifiers.new('normali', 'WEIGHTED_NORMAL').keep_sharp = True

    # albero di Natale e stella (crea_albero.py): pezzi separati, qui solo per la composizione
    if ALBERO_BLEND.exists():
        with bpy.data.libraries.load(str(ALBERO_BLEND)) as (src, dst):
            dst.objects = [n for n in src.objects if n in ('ALBERO_NATALE', 'STELLA_albero')]
        albero = next(o for o in dst.objects if o.name.startswith('ALBERO_NATALE'))
        stella = next(o for o in dst.objects if o.name.startswith('STELLA_albero'))
        for o in (albero, stella):
            coll.objects.link(o)
            o.scale = (0.001, 0.001, 0.001)
        z_cima = max(v.co.z for v in albero.data.vertices)
        albero.location = (CENTRO_ALBERO[0] / 1000, CENTRO_ALBERO[1] / 1000, FONDO / 1000)
        # stella in piedi: perno (asse -y del pezzo sdraiato) infilato nel foro in cima
        stella.rotation_euler = (math.radians(90), 0, 0)
        stella.location = (CENTRO_ALBERO[0] / 1000, (CENTRO_ALBERO[1] + 1.5) / 1000,
                           (FONDO + z_cima + 5.0) / 1000)
        r_base = max(math.hypot(v.co.x, v.co.y) for v in albero.data.vertices)
        print(f'albero: alto {z_cima:.1f} mm + stella, raggio max {r_base:.1f} mm, distanza dal gruppo '
              f'{-48.5 - (CENTRO_ALBERO[0] + r_base):.1f} mm', flush=True)

    sc = bpy.context.scene
    cam = sc.camera
    cam.location = (0.02, -0.36, 0.20)
    target = Vector((-0.04, 0.0, 0.045))
    cam.rotation_euler = (target - cam.location).to_track_quat('-Z', 'Y').to_euler()
    cam.data.lens = 50
    sc.render.resolution_x, sc.render.resolution_y = 1600, 1100
    sc.cycles.samples = 16 if PREVIEW else 64
    sc.render.filepath = str(ROOT / 'render' / '08_con_piattino.png')
    bpy.ops.wm.save_as_mainfile(filepath=str(ROOT / 'progetto/sacra_famiglia_con_piattino.blend'))
    bpy.ops.render.render(write_still=True)
    print('RENDER', sc.render.filepath, flush=True)


main()
