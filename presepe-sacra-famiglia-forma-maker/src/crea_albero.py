"""Albero di Natale a balze con tronco, e stella a incastro, da mettere nel piattino.

Uso:  blender -b --factory-startup --python src/crea_albero.py
Salva progetto/albero_natale.blend, stampa/albero_natale.3mf (verde + marrone) e
stampa/stella_albero.3mf (oro, si stampa sdraiata e si infila nel foro in cima).

Stampa SENZA supporti: il sotto di ogni palco sale verso l'esterno con pendenza >= 45 gradi,
partendo dal palco inferiore (o dal tronco). Il tronco finisce a 14 mm: per un albero bicolore
senza AMS basta un cambio filamento (marrone -> verde) al layer di 14 mm.
"""
import math
import sys
import zipfile
from collections import Counter
from pathlib import Path

import bmesh
import bpy
from mathutils.bvhtree import BVHTree

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT.parent / 'fiori'))
import comune_rilievo as cr  # noqa: E402

# ------------------------------------------------------------------ parametri (mm)
TRONCO_R, TRONCO_H, PIEDE_R = 8.0, 14.0, 10.5
# palchi: (quota del bordo, raggio del bordo, numero di rami)
PALCHI = [(34.5, 28.0, 9), (50.0, 24.0, 8), (65.0, 20.0, 8), (79.0, 16.5, 7), (92.0, 13.0, 6),
          (104.0, 9.5, 5)]
PEND_FIANCO = 1.9        # dz/dr del fianco dei palchi
PEND_SOTTO = 1.05        # dz/dr del sotto (>= 1 = almeno 45 gradi, niente supporti)
LOBI = 0.08              # quanto sporgono i rami (frazione del raggio)
COSTE_PASSO, COSTE_PROF = 3.2, 0.7   # scanalature come il piattino
CIMA_R = 4.2             # cima arrotondata che ospita il foro della stella
FORO, FORO_H = 3.4, 8.0  # foro quadrato per il perno della stella (perno 3.0)
STELLA_R, STELLA_r, STELLA_BORDO, STELLA_CENTRO = 12.0, 5.2, 2.4, 4.4
PERNO, PERNO_L = 3.0, 7.5
VOXEL, TRIANGOLI, N_ANG = 0.14, 450_000, 720
VERDE, MARRONE = 0, 1


def lathe(bm, profilo, mod_fn, n=N_ANG):
    """Solido di rivoluzione chiuso: profilo [(r, z, tag)] dall'asse in basso all'asse in alto."""
    anelli = []
    for r, z, t in profilo:
        anello = []
        for i in range(n):
            a = 2 * math.pi * i / n
            rr, zz = mod_fn(r, z, t, a)
            anello.append(bm.verts.new((rr * math.cos(a), rr * math.sin(a), zz)))
        anelli.append(anello)
    facce = []
    for a, b in zip(anelli, anelli[1:]):
        for i in range(n):
            j = (i + 1) % n
            facce.append(bm.faces.new((a[i], a[j], b[j], b[i])))
    for anello, (_, z, _), verso in ((anelli[0], profilo[0], -1), (anelli[-1], profilo[-1], 1)):
        c = bm.verts.new((0, 0, z))
        for i in range(n):
            j = (i + 1) % n
            facce.append(bm.faces.new((c, anello[j], anello[i]) if verso < 0 else (c, anello[i], anello[j])))
    return facce


def palco(bm, z_b, r_b, rami, ultimo):
    r_t = CIMA_R if ultimo else r_b * 0.25
    z_t = z_b + (r_b - r_t) * PEND_FIANCO
    r_in = 3.0
    prof = []
    for k in range(17):                                   # sotto: sale verso il bordo
        r = r_in + (r_b - r_in) * k / 16
        prof.append((r, z_b - (r_b - r) * PEND_SOTTO, 'sotto'))
    for k in range(1, 49):                                # fianco leggermente concavo
        s = k / 48
        prof.append((r_t + (r_b - r_t) * (1 - s) ** 1.15, z_b + (z_t - z_b) * s, 'fianco'))
    if ultimo:                                            # cima arrotondata
        for k in range(1, 7):
            t = math.pi / 2 * k / 6
            prof.append((r_t * math.cos(t), z_t + 1.6 * math.sin(t), 'cima'))
    else:
        prof.append((0.0, z_t, 'cima'))
    m = round(2 * math.pi * r_b / COSTE_PASSO / rami) * rami   # scanalature: multiplo dei rami

    def mod(r, z, t, a):
        if t == 'cima' or r < 1e-6:
            return r, z
        lobo = 0.5 + 0.5 * math.cos(rami * a)              # 1 al centro di un ramo
        if t == 'sotto':
            w = ((r - r_in) / (r_b - r_in)) ** 2
            rr = r * (1 + LOBI * lobo * w)
            # il sotto resta a pendenza >= PEND_SOTTO anche dove il ramo sporge
            return rr, z_b - (r_b * (1 + LOBI * lobo) - rr) * PEND_SOTTO
        w = max(0.0, (r - r_t) / (r_b - r_t)) ** 1.6
        rr = r * (1 + LOBI * lobo * w)
        onda = abs(math.sin(m * a / 2)) ** 0.6
        rr -= COSTE_PROF * (1 - onda) * min(1.0, (r - r_t) / 3.0)
        return rr, z
    return lathe(bm, prof, mod)


def tronco(bm):
    prof = [(0.0, -1.0, 'x'), (PIEDE_R, -1.0, 'x')]
    for k in range(9):                                     # piede svasato
        t = k / 8
        prof.append((TRONCO_R + (PIEDE_R - TRONCO_R) * (1 - math.sin(t * math.pi / 2)), 3.5 * t, 'c'))
    prof += [(TRONCO_R, z, 'c') for z in (6.0, 9.0, 12.0, TRONCO_H + 3.0)]
    prof += [(3.5, 108.0, 'anima'), (0.0, 109.0, 'anima')]  # anima interna che lega i palchi

    def mod(r, z, t, a):
        if t == 'c':                                       # corteccia: solchi verticali irregolari
            sol = abs(math.sin(7 * a + 0.6 * math.sin(3 * a))) ** 0.5
            return r - 0.6 * (1 - sol), z
        return r, z
    return lathe(bm, prof, mod, n=240)


def stella_bmesh():
    """Stella a 5 punte 'a cuscino' (centro rialzato), da stampare sdraiata, con perno quadrato."""
    bm = bmesh.new()
    pts = []
    for k in range(10):
        a = math.pi / 2 + k * math.pi / 5
        rr = STELLA_R if k % 2 == 0 else STELLA_r
        pts.append((rr * math.cos(a), rr * math.sin(a)))
    giu = [bm.verts.new((x, y, 0.0)) for x, y in pts]
    su = [bm.verts.new((x, y, STELLA_BORDO)) for x, y in pts]
    c_giu = bm.verts.new((0, 0, 0.0))
    c_su = bm.verts.new((0, 0, STELLA_CENTRO))
    for i in range(10):
        j = (i + 1) % 10
        bm.faces.new((c_giu, giu[j], giu[i]))
        bm.faces.new((c_su, su[i], su[j]))
        bm.faces.new((giu[i], giu[j], su[j], su[i]))
    # perno quadrato sotto, tra le due punte basse, a filo del piano di stampa
    y0 = -STELLA_r + 1.0
    perno = bmesh.ops.create_cube(bm, size=1.0)['verts']
    bmesh.ops.scale(bm, vec=(PERNO, PERNO_L + 1.0, PERNO), verts=perno)
    bmesh.ops.translate(bm, verts=perno, vec=(0, y0 - (PERNO_L + 1.0) / 2, PERNO / 2))
    return bm


def unisci_voxel(obj, voxel, triangoli):
    rem = obj.modifiers.new('voxel', 'REMESH')
    rem.mode, rem.voxel_size, rem.adaptivity = 'VOXEL', voxel, 0.0
    applica(obj)
    tris = sum(len(p.vertices) - 2 for p in obj.data.polygons)
    dec = obj.modifiers.new('dec', 'DECIMATE')
    dec.decimate_type, dec.ratio, dec.use_collapse_triangulate = 'COLLAPSE', min(1.0, triangoli / tris), True
    applica(obj)


def applica(obj):
    mats = list(obj.data.materials)
    dg = bpy.context.evaluated_depsgraph_get()
    nuovo = bpy.data.meshes.new_from_object(obj.evaluated_get(dg))
    obj.modifiers.clear()
    vecchio, obj.data = obj.data, nuovo
    bpy.data.meshes.remove(vecchio)
    nuovo.materials.clear()
    for m in mats:
        nuovo.materials.append(m)


def solo_guscio_esterno(obj):
    """Tiene il guscio esterno: riempie i vuoti chiusi tra i palchi ed elimina le briciole."""
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    seen, gusci = set(), []
    for v in bm.verts:
        if v in seen:
            continue
        stack, verts = [v], [v]
        seen.add(v)
        while stack:
            for e in stack.pop().link_edges:
                for w in e.verts:
                    if w not in seen:
                        seen.add(w)
                        stack.append(w)
                        verts.append(w)
        facce = {f for u in verts for f in u.link_faces}
        vol = sum(f.calc_center_median().dot(f.normal) * f.calc_area() for f in facce) / 3
        gusci.append((vol, verts))
    gusci.sort(key=lambda g: g[0], reverse=True)
    print(f'  gusci: {len(gusci)}; tengo il piu grande ({gusci[0][0]:.0f} mm3), '
          f'secondo positivo: {max([g[0] for g in gusci[1:]] + [0]):.1f} mm3', flush=True)
    for g in gusci[1:]:
        bmesh.ops.delete(bm, geom=g[1], context='VERTS')
    bm.to_mesh(obj.data)
    bm.free()


def ripristina_colori(obj, me_src):
    bvh = BVHTree.FromPolygons([v.co[:] for v in me_src.vertices], [p.vertices[:] for p in me_src.polygons])
    src = [p.material_index for p in me_src.polygons]
    idx = [src[bvh.find_nearest(p.center)[2]] for p in obj.data.polygons]
    # tutto cio' che sta sotto TRONCO_H e' tronco, sopra e' chioma: cambio colore netto a 14 mm
    for i, p in enumerate(obj.data.polygons):
        idx[i] = MARRONE if p.center.z < TRONCO_H else VERDE
    obj.data.polygons.foreach_set('material_index', idx)
    obj.data.update()
    print('colori:', {obj.data.materials[k].name: v for k, v in Counter(idx).items()}, flush=True)


def esporta_3mf(obj, path, nome):
    me = obj.data
    me.calc_loop_triangles()
    righe = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<model unit="millimeter" xml:lang="it-IT" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">',
             '<resources><basematerials id="1">']
    for m in me.materials:
        righe.append(f'<base name="{m.name}" displaycolor="#' + ''.join(f'{round(x * 255):02X}' for x in m.diffuse_color) + '"/>')
    righe.append(f'</basematerials><object id="2" name="{nome}" type="model" pid="1" pindex="0"><mesh><vertices>')
    righe += [f'<vertex x="{v.co.x:.4f}" y="{v.co.y:.4f}" z="{v.co.z:.4f}"/>' for v in me.vertices]
    righe.append('</vertices><triangles>')
    for t in me.loop_triangles:
        a, b, c = t.vertices
        mi = t.material_index
        righe.append(f'<triangle v1="{a}" v2="{b}" v3="{c}" p1="{mi}" p2="{mi}" p3="{mi}"/>')
    righe.append('</triangles></mesh></object></resources><build><item objectid="2"/></build></model>')
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/></Types>')
        z.writestr('_rels/.rels', '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>')
        z.writestr('3D/3dmodel.model', '\n'.join(righe))
    print(f'3MF={path}', flush=True)


def main():
    cr.clear_scene()
    verde = cr.material('PLA_verde_abete', (0.07, 0.24, 0.10))
    marrone = cr.material('PLA_marrone_tronco', (0.30, 0.17, 0.08))
    oro = cr.material('PLA_oro_stella', (0.85, 0.62, 0.16))

    # ---------------------------------------------------------------- albero
    src = bmesh.new()
    tronco(src)
    for k, p in enumerate(PALCHI):
        palco(src, *p, ultimo=(k == len(PALCHI) - 1))
    bmesh.ops.recalc_face_normals(src, faces=src.faces)
    me_src = bpy.data.meshes.new('albero_sorgente')
    src.to_mesh(me_src)
    src.free()
    obj = bpy.data.objects.new('ALBERO_NATALE', me_src.copy())
    bpy.context.scene.collection.objects.link(obj)
    obj.data.materials.append(verde)
    obj.data.materials.append(marrone)
    unisci_voxel(obj, VOXEL, TRIANGOLI)
    cr.cut_below_zero(obj)
    solo_guscio_esterno(obj)
    # foro quadrato per il perno della stella
    z_cima = max(v.co.z for v in obj.data.vertices)
    foro = bmesh.new()
    bmesh.ops.create_cube(foro, size=1.0)
    bmesh.ops.scale(foro, vec=(FORO, FORO, FORO_H + 5), verts=foro.verts)
    bmesh.ops.translate(foro, verts=foro.verts, vec=(0, 0, z_cima - FORO_H + (FORO_H + 5) / 2))
    cr.boolean(obj, foro, 'DIFFERENCE')
    ripristina_colori(obj, me_src)
    cr.check(obj)
    for p in obj.data.polygons:
        p.use_smooth = True
    print(f'albero: cima a {z_cima:.1f} mm, foro {FORO}x{FORO} profondo {FORO_H} mm', flush=True)

    # ---------------------------------------------------------------- stella (pezzo a parte)
    sb = stella_bmesh()
    me_st = bpy.data.meshes.new('stella')
    sb.to_mesh(me_st)
    sb.free()
    stella = bpy.data.objects.new('STELLA_albero', me_st)
    bpy.context.scene.collection.objects.link(stella)
    me_st.materials.append(oro)
    unisci_voxel(stella, 0.06, 120_000)
    cr.cut_below_zero(stella)
    cr.check(stella)

    bpy.ops.wm.save_as_mainfile(filepath=str(ROOT / 'progetto' / 'albero_natale.blend'))
    esporta_3mf(obj, ROOT / 'stampa' / 'albero_natale.3mf', 'Albero_di_Natale')
    esporta_3mf(stella, ROOT / 'stampa' / 'stella_albero.3mf', 'Stella_albero')


main()
