import bpy
import bmesh
import os
from mathutils import Vector
from mathutils.bvhtree import BVHTree

scene=bpy.context.scene
name='GIRASOLE_corpo_unico_gambo_stile_tulipano'
obj=bpy.data.objects[name]
center=bpy.data.objects['girasoli_008']
previous=os.path.join(os.path.dirname(bpy.data.filepath),'girasole_convesso_foglie_allungate.blend')
with bpy.data.libraries.load(previous,link=False) as (source,dest):
    dest.objects=[name,'girasoli_008']
old,old_center=dest.objects
for imported in dest.objects:
    scene.collection.objects.link(imported)
bpy.context.view_layer.update()

def tree(o):
    return BVHTree.FromPolygons([o.matrix_world@v.co for v in o.data.vertices],
                               [tuple(p.vertices) for p in o.data.polygons])

before,after=tree(old),tree(obj)
back=float(scene['piano_appoggio_posteriore_z_mm'])
precision=float(scene.get('precisione_riparazione_superficie_mm',0))
tolerance=max(.01,precision*1.5)
bm=bmesh.new()
bm.from_mesh(old.data)
rear={f for f in bm.faces if all(abs(v.co.z-back)<.0002 for v in f.verts)}
boundary=[e for e in bm.edges if sum(f in rear for f in e.link_faces)==1]
tips={v for e in boundary for v in e.verts if v.co.y>0}
tip=max(tips,key=lambda v:v.co.y).co.copy()
bm.free()
inward=Vector((-tip.x,-tip.y,0)).normalized()
values=[]
for i in range(33):
    d=.10+(2.0-.10)*i/32
    p=tip+inward*d
    hit=after.ray_cast(Vector((p.x,p.y,-20)),Vector((0,0,1)))[0]
    assert hit is not None
    values.append(hit.z)
    assert back-.003<=hit.z<=.2201+.003
assert values[0]-back>.3,values[:5]
assert abs(values[-1]-back)<.003,values[-5:]
assert max(abs(b-a) for a,b in zip(values,values[1:]))<.20
assert all(b<=a+max(.015,tolerance*.5) for a,b in zip(values,values[1:]))
print('RIM_TRANSITION_OK outer_z',values[0],'inner_z',values[-1],
      'max_step',max(abs(b-a) for a,b in zip(values,values[1:])))

checks=0
for x in (-18,-12,-6,0,6,12,18):
    for y in (-22,-12,0,12,22):
        p=Vector((x,y,20))
        a=before.ray_cast(p,Vector((0,0,-1)))[0]
        b=after.ray_cast(p,Vector((0,0,-1)))[0]
        if a is not None:
            assert b is not None and abs(a.z-b.z)<tolerance,(x,y,a,b)
            checks+=1

centers=list(scene['centri_foglie_xy'])
points=list(zip(centers[::2],centers[1::2]))+[(0,-35),(0,-42),(0,-50),(0,-60)]
for x,y in points:
    for z,direction in ((20,(0,0,-1)),(-20,(0,0,1))):
        p=Vector((x,y,z))
        a,b=before.ray_cast(p,Vector(direction))[0],after.ray_cast(p,Vector(direction))[0]
        assert a is not None and b is not None and (a-b).length<tolerance,(x,y,z,a,b)

for x,y in ((0,10),(6,6),(-6,6),(0,-15)):
    hit=after.ray_cast(Vector((x,y,-20)),Vector((0,0,1)))[0]
    assert hit is not None and abs(hit.z-back)<.003
for axis in (0,1):
    a=[v.co[axis] for v in old.data.vertices]
    b=[v.co[axis] for v in obj.data.vertices]
    assert abs(min(a)-min(b))<.002 and abs(max(a)-max(b))<.002
assert len(center.data.vertices)==len(old_center.data.vertices)
for a,b in zip(center.data.vertices,old_center.data.vertices):
    assert ((center.matrix_world@a.co)-(old_center.matrix_world@b.co)).length<.00001
print('COROLLA_VERIFICATA front_checks',checks,'center_extra_mm=0.6 stem_leaves_unchanged=True')
