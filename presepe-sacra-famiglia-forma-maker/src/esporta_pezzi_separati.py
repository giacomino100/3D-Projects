"""Esporta presepe e piattino come file 3MF separati (albero e stella: crea_albero.py) (in mm, appoggiati su z = 0).

Uso:  blender -b --factory-startup --python src/esporta_pezzi_separati.py
Legge progetto/sacra_famiglia_con_piattino.blend (creato da crea_piattino.py) senza modificarlo.
Presepe e albero sono le mesh di ANTEPRIMA di MakerWorld: per la qualita' migliore stampare i file
originali scaricati dalle rispettive schede (Th3D.br 3497493, 3D2K 1885816), solo uso personale.
"""
import zipfile
from pathlib import Path

import bmesh
import bpy

ROOT = Path(__file__).resolve().parent.parent
PEZZI = {
    'SACRA_FAMIGLIA_mesh_anteprima_MakerWorld': 'presepe_sacra_famiglia.3mf',
    'PIATTINO_scanalato': 'piattino_sacra_famiglia.3mf',
}


def scrivi_3mf(bm, nome, path):
    bmesh.ops.triangulate(bm, faces=bm.faces)
    bm.verts.index_update()
    righe = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<model unit="millimeter" xml:lang="it-IT" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">',
             f'<resources><object id="1" name="{nome}" type="model"><mesh><vertices>']
    righe += [f'<vertex x="{v.co.x:.4f}" y="{v.co.y:.4f}" z="{v.co.z:.4f}"/>' for v in bm.verts]
    righe.append('</vertices><triangles>')
    righe += [f'<triangle v1="{f.verts[0].index}" v2="{f.verts[1].index}" v3="{f.verts[2].index}"/>' for f in bm.faces]
    righe.append('</triangles></mesh></object></resources><build><item objectid="1"/></build></model>')
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/></Types>')
        z.writestr('_rels/.rels', '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>')
        z.writestr('3D/3dmodel.model', '\n'.join(righe))


def main():
    bpy.ops.wm.open_mainfile(filepath=str(ROOT / 'progetto/sacra_famiglia_con_piattino.blend'))
    (ROOT / 'stampa').mkdir(exist_ok=True)
    for nome, file in PEZZI.items():
        obj = bpy.data.objects[nome]
        bm = bmesh.new()
        bm.from_mesh(obj.data)
        bm.transform(obj.matrix_world)
        bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-7)
        bmesh.ops.scale(bm, vec=(1000, 1000, 1000), verts=bm.verts)        # metri -> mm
        xs = [v.co.x for v in bm.verts]; ys = [v.co.y for v in bm.verts]; zs = [v.co.z for v in bm.verts]
        cx, cy, z0 = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2, min(zs)
        bmesh.ops.translate(bm, verts=bm.verts, vec=(-cx, -cy, -z0))      # centrato e sul piano
        bad = sum(1 for e in bm.edges if not e.is_manifold)
        vol = bm.calc_volume(signed=True) / 1000
        dim = (max(xs) - min(xs), max(ys) - min(ys), max(zs) - min(zs))
        scrivi_3mf(bm, nome, ROOT / 'stampa' / file)
        print(f'PEZZO {file}: {dim[0]:.1f} x {dim[1]:.1f} x {dim[2]:.1f} mm, volume {vol:.1f} cm3, '
              f'bordi non manifold {bad}, triangoli {len(bm.faces)}', flush=True)
        bm.free()


main()
