"""Raccorda il rinforzo posteriore sul modello gia' unito, senza nuove booleane."""
import bpy
import bmesh
import os
import sys
from collections import Counter
from mathutils import Vector
from mathutils.bvhtree import BVHTree

folder=os.path.dirname(bpy.data.filepath)
sys.path.insert(0,os.path.dirname(folder))
from correggi_fiori_verificati import mesh_check, render_view

obj=bpy.data.objects['GIRASOLE_corpo_unico_gambo_stile_tulipano']
scene=bpy.context.scene
back=float(scene['piano_appoggio_posteriore_z_mm'])
extra=.6
band=.65
bm=bmesh.new()
bm.from_mesh(obj.data)
yellow={i for i,m in enumerate(obj.data.materials) if m and m.name.startswith('Petali_gialli')}
assert yellow

def cap_faces():
    return [f for f in bm.faces if f.material_index in yellow
            and all(abs(v.co.z-back)<.0002 for v in f.verts)]

rear=set(cap_faces())
edges={e for f in rear for e in f.edges}
outline=[]
for e in edges:
    mid=(e.verts[0].co+e.verts[1].co)*.5
    if sum(f in rear for f in e.link_faces)!=1 or mid.xy.length<8:
        continue
    # Il piano condiviso con il collo dello stelo resta intatto.
    if abs(mid.x)<3 and mid.y<-24:
        continue
    outline.append(e)
assert outline
wall_vertices,wall_faces=[],[]
for edge in outline:
    a,b=(v.co for v in edge.verts)
    if (a-b).length<1e-6:
        continue
    i=len(wall_vertices)
    wall_vertices.extend([(a.x,a.y,-1),(b.x,b.y,-1),(b.x,b.y,1),(a.x,a.y,1)])
    wall_faces.append((i,i+1,i+2,i+3))
boundary=BVHTree.FromPolygons(wall_vertices,wall_faces)
cache={}
def distance(p):
    key=(round(float(p.x),7),round(float(p.y),7))
    if key not in cache:
        cache[key]=boundary.find_nearest(Vector((p.x,p.y,0)))[3]
    return cache[key]

for iteration in range(8):
    rear=cap_faces()
    bmesh.ops.triangulate(bm,faces=rear)
    rear=cap_faces()
    edges={e for f in rear for e in f.edges}
    split=[]
    for edge in edges:
        if edge.calc_length()<=.40:
            continue
        a,b=(v.co for v in edge.verts)
        if min(distance(a),distance(b),distance((a+b)*.5))<band+.15:
            split.append(edge)
    print('REAR_BLEND',iteration,'split_edges',len(split),flush=True)
    if not split:
        break
    bmesh.ops.subdivide_edges(bm,edges=split,cuts=1,use_grid_fill=True)

rear=cap_faces()
vertices={v for f in rear for v in f.verts}
distances={v:distance(v.co) for v in vertices}
for face in rear:
    face.smooth=any(distances[v]<band for v in face.verts)
for vertex in vertices:
    t=min(1.0,max(0.0,distances[vertex]/band))
    weight=t*t*(3-2*t)
    vertex.co.z=back+extra*(1-weight)

# Alcuni ventagli quasi degeneri importati dal 3MF lasciano spigoli senza
# facce dopo la suddivisione: non appartengono alla superficie stampabile.
bad=[e for e in bm.edges if not e.is_manifold]
print('RIM_EDGE_DIAGNOSTIC',dict(Counter(len(e.link_faces) for e in bad)),flush=True)
wire=[e for e in bad if not e.link_faces]
if wire:
    bmesh.ops.delete(bm,geom=wire,context='EDGES')
bad=[e for e in bm.edges if not e.is_manifold]
if bad:
    patch={v for e in bad for v in e.verts}
    patch.update(v for original in list(patch) for e in original.link_edges for v in e.verts)
    bmesh.ops.remove_doubles(bm,verts=list(patch),dist=.000001)
    patch_edges={e for v in patch if v.is_valid for e in v.link_edges}
    bmesh.ops.dissolve_degenerate(bm,edges=list(patch_edges),dist=.000001)
wire=[e for e in bm.edges if not e.link_faces]
if wire:
    bmesh.ops.delete(bm,geom=wire,context='EDGES')
isolated=[v for v in bm.verts if not v.link_edges]
if isolated:
    bmesh.ops.delete(bm,geom=isolated,context='VERTS')
print('RIM_EDGE_AFTER_CLEAN',dict(Counter(len(e.link_faces) for e in bm.edges if not e.is_manifold)),flush=True)
bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
bm.to_mesh(obj.data)
bm.free()
obj.data.update()
work=os.path.join(folder,'_work')
os.makedirs(work,exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(work,'corolla_raccordata_lavorazione.blend'))
mesh_check(obj)

scene['retro_corolla_raccordato']=True
scene['larghezza_raccordo_retro_mm']=band
scene['rinforzo_retro_centrale_mm']=extra
scene['gambo_e_foglie_invariati']=True
path=os.path.join(folder,'girasole_corolla_raccordata.blend')
bpy.ops.wm.save_as_mainfile(filepath=path)
print('SAVED',path,flush=True)
render_view('girasole_corolla_raccordata_fronte.png',(0,0,1),(0,1,0),Vector((0,-18,2)),104)
render_view('girasole_corolla_raccordata_retro.png',(.3,.6,-.75),(0,1,0),Vector((0,0,0)),68)
