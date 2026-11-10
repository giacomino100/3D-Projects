import bpy
import bmesh
import math
import os
import sys
from mathutils import Vector
from mathutils.bvhtree import BVHTree

root=os.path.dirname(os.path.dirname(bpy.data.filepath))
sys.path.insert(0,os.path.dirname(root))
from correggi_fiori_verificati import mesh_check,render_view
name='GIRASOLE_corpo_unico_gambo_stile_tulipano'
obj=bpy.data.objects[name]
scene=bpy.context.scene
back=float(scene['piano_appoggio_posteriore_z_mm'])
source_path=os.path.join(root,'girasole_convesso_foglie_allungate.blend')
with bpy.data.libraries.load(source_path,link=False) as (source,dest):
    dest.objects=[name]
old=dest.objects[0]
scene.collection.objects.link(old)
bpy.context.view_layer.update()
old_tree=BVHTree.FromPolygons([v.co.copy() for v in old.data.vertices],
                            [tuple(f.vertices) for f in old.data.polygons])
bounds=[(min(v.co[i] for v in old.data.vertices),max(v.co[i] for v in old.data.vertices)) for i in (0,1)]
bm=bmesh.new()
bm.from_mesh(old.data)
rear={f for f in bm.faces if all(abs(v.co.z-back)<.0002 for v in f.verts)}
edges={e for f in rear for e in f.edges}
wv,wf=[],[]
kept=0
for edge in edges:
    if sum(f in rear for f in edge.link_faces)!=1:
        continue
    a,b=(v.co.copy() for v in edge.verts)
    mid=(a+b)*.5
    delta=b-a
    if mid.xy.length<8 or (abs(mid.x)<3 and mid.y<-24) or delta.xy.length<1e-6:
        continue
    side=Vector((-delta.y,delta.x,0)).normalized()
    # Esclude le sottili cuciture interne del vecchio STL: si raccorda soltanto
    # il contorno realmente esposto all'esterno della corolla.
    outside=False
    for offset in (.7,1.2):
        for sign in (-1,1):
            p=mid+side*offset*sign
            if old_tree.ray_cast(Vector((p.x,p.y,-20)),Vector((0,0,1)))[0] is None:
                outside=True
        if outside:
            break
    if not outside:
        continue
    i=len(wv)
    wv.extend([(a.x,a.y,-1),(b.x,b.y,-1),(b.x,b.y,1),(a.x,a.y,1)])
    wf.append((i,i+1,i+2,i+3))
    kept+=1
bm.free()
assert kept>100
print('TRUE_OUTLINE_EDGES',kept,flush=True)
outline=BVHTree.FromPolygons(wv,wf)
bpy.data.objects.remove(old,do_unlink=True)

mats=list(obj.data.materials)
yellow={i for i,m in enumerate(mats) if m and m.name.startswith('Petali_gialli')}
bm=bmesh.new()
bm.from_mesh(obj.data)
vertices={v for f in bm.faces if f.material_index in yellow and f.normal.z<-.05
          and all(v.co.z<.221 for v in f.verts) for v in f.verts}
cache={}
for v in vertices:
    key=(round(float(v.co.x),7),round(float(v.co.y),7))
    if key not in cache:
        cache[key]=outline.find_nearest(Vector((v.co.x,v.co.y,0)))[3]
    t=min(1.0,max(0.0,cache[key]/.65))
    v.co.z=back+.6*(1-t*t*(3-2*t))
bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
bm.to_mesh(obj.data)
bm.free()
obj.data.update()

for o in scene.objects:
    o.select_set(False)
obj.select_set(True)
bpy.context.view_layer.objects.active=obj
obj.data.remesh_voxel_size=.05
obj.data.remesh_voxel_adaptivity=0
print('VOXEL_REPAIR_BEGIN size_mm=0.05',flush=True)
bpy.ops.object.voxel_remesh()
print('VOXEL_REPAIR_END vertices',len(obj.data.vertices),'faces',len(obj.data.polygons),flush=True)

# Ripristina esattamente le quote nominali XY e il piano posteriore di stampa.
new_bounds=[(min(v.co[i] for v in obj.data.vertices),max(v.co[i] for v in obj.data.vertices)) for i in (0,1)]
for v in obj.data.vertices:
    for i in (0,1):
        lo,hi=bounds[i]
        nlo,nhi=new_bounds[i]
        v.co[i]=lo+(v.co[i]-nlo)*(hi-lo)/(nhi-nlo)
    if v.co.z<back+.015:
        v.co.z=back
obj.data.materials.clear()
for material in mats:
    obj.data.materials.append(material)
yellow_index=next(i for i,m in enumerate(mats) if m and m.name.startswith('Petali_gialli'))
green_index=next(i for i,m in enumerate(mats) if m and m.name.startswith('Gambo_e_foglie'))
obj.data.update()
for f in obj.data.polygons:
    f.material_index=green_index if f.center.y<-27.95 else yellow_index
    f.use_smooth=True
obj.select_set(False)

scene['retro_corolla_raccordato']=True
scene['larghezza_raccordo_retro_mm']=.65
scene['rinforzo_retro_centrale_mm']=.6
scene['precisione_riparazione_superficie_mm']=.05
scene['gambo_e_foglie_invariati']=True
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(root,'_work','corolla_superficie_riparata.blend'))
mesh_check(obj)
output=os.path.join(root,'girasole_corolla_raccordata.blend')
bpy.ops.wm.save_as_mainfile(filepath=output)
print('SAVED_FINAL',output,flush=True)
import correggi_fiori_verificati as common
common.FOLDER=root
render_view('girasole_corolla_raccordata_fronte.png',(0,0,1),(0,1,0),Vector((0,-18,2)),104)
render_view('girasole_corolla_raccordata_retro.png',(.3,.6,-.75),(0,1,0),Vector((0,0,0)),68)
