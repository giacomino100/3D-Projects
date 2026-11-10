import bpy
import bmesh
import os
import sys
from collections import Counter
from mathutils import Vector

root=os.path.dirname(os.path.dirname(bpy.data.filepath))
sys.path.insert(0,os.path.dirname(root))
from correggi_fiori_verificati import mesh_check, render_view

obj=bpy.data.objects['GIRASOLE_corpo_unico_gambo_stile_tulipano']
bm=bmesh.new()
bm.from_mesh(obj.data)
bm.faces.ensure_lookup_table()
bad=[e for e in bm.edges if not e.is_manifold]
for edge in bad:
    print('BAD_EDGE',[(tuple(round(c,7) for c in v.co)) for v in edge.verts],
          'faces',[(round(f.calc_area(),10),round(f.normal.z,5)) for f in edge.link_faces],flush=True)

# Il problema e' limitato a facce sovrapposte nella triangolazione posteriore.
patch={f for edge in bad for f in edge.link_faces}
for face in list(patch):
    patch.update(f for edge in face.edges for f in edge.link_faces)
vertices={v for f in patch for v in f.verts}
print('REPAIR_PATCH faces',len(patch),'area',sum(f.calc_area() for f in patch),
      'max_z',max(v.co.z for v in vertices),flush=True)
assert max(v.co.z for v in vertices)<.221,'La riparazione deve restare sul retro'
assert sum(f.calc_area() for f in patch)<5.0,'Zona di riparazione troppo ampia'
# Saldatura locale con tolleranza massima di 25 micron: le facce problematiche
# sono sottilissime strisce quasi coincidenti provenienti dall'importazione.
for tolerance in (.002,.01,.025):
    bad=[e for e in bm.edges if not e.is_manifold]
    if not bad:
        break
    local={v for edge in bad for f in edge.link_faces for v in f.verts}
    local.update(v for original in list(local) for e in original.link_edges for v in e.verts)
    assert all(v.co.z<.221 for v in local)
    bmesh.ops.remove_doubles(bm,verts=list(local),dist=tolerance)
    local_edges={e for v in local if v.is_valid for e in v.link_edges}
    bmesh.ops.dissolve_degenerate(bm,edges=list(local_edges),dist=.00001)
    wire=[e for e in bm.edges if not e.link_faces]
    if wire:
        bmesh.ops.delete(bm,geom=wire,context='EDGES')
    print('LOCAL_WELD',tolerance,dict(Counter(len(e.link_faces) for e in bm.edges if not e.is_manifold)),flush=True)
boundary=[e for e in bm.edges if len(e.link_faces)==1]
if boundary:
    assert sum(e.calc_length() for e in boundary)<.2
    bmesh.ops.holes_fill(bm,edges=boundary,sides=0)
isolated=[v for v in bm.verts if not v.link_edges]
if isolated:
    bmesh.ops.delete(bm,geom=isolated,context='VERTS')
bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
print('REPAIR_REMAINING',dict(Counter(len(e.link_faces) for e in bm.edges if not e.is_manifold)),flush=True)
bm.to_mesh(obj.data)
bm.free()
obj.data.update()
mesh_check(obj)
scene=bpy.context.scene
scene['retro_corolla_raccordato']=True
scene['larghezza_raccordo_retro_mm']=.65
scene['rinforzo_retro_centrale_mm']=.6
scene['gambo_e_foglie_invariati']=True
output=os.path.join(root,'girasole_corolla_raccordata.blend')
bpy.ops.wm.save_as_mainfile(filepath=output)
print('SAVED_REPAIRED',output,flush=True)
# La libreria di rendering usa il percorso di importazione corrente.
import correggi_fiori_verificati as common
common.FOLDER=root
render_view('girasole_corolla_raccordata_fronte.png',(0,0,1),(0,1,0),Vector((0,-18,2)),104)
render_view('girasole_corolla_raccordata_retro.png',(.3,.6,-.75),(0,1,0),Vector((0,0,0)),68)
