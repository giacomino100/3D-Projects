import bpy
import os
from mathutils import Vector
from mathutils.bvhtree import BVHTree

scene=bpy.context.scene
name='GIRASOLE_corpo_unico_gambo_stile_tulipano'
new=bpy.data.objects[name]
path=os.path.join(os.path.dirname(bpy.data.filepath),'girasole_stelo_diretto_foglie_naturali.blend')
with bpy.data.libraries.load(path,link=False) as (src,dst):
    dst.objects=[name]
old=dst.objects[0]
scene.collection.objects.link(old)
bpy.context.view_layer.update()
def tree(o):
    return BVHTree.FromPolygons([o.matrix_world@v.co for v in o.data.vertices],
                               [tuple(p.vertices) for p in o.data.polygons])
before,after=tree(old),tree(new)
for y in (-35,-40,-50,-60):
    p=Vector((0,y,20))
    a=before.ray_cast(p,Vector((0,0,-1)))[0]
    b=after.ray_cast(p,Vector((0,0,-1)))[0]
    assert a is not None and b is not None and abs(a.z-b.z-.4)<.005,(y,a,b)
    for x in (-1,0,1):
        p=Vector((x,y,-20))
        a=before.ray_cast(p,Vector((0,0,1)))[0]
        b=after.ray_cast(p,Vector((0,0,1)))[0]
        assert a is not None and b is not None and (a-b).length<.002
centers=list(scene['centri_foglie_xy'])
points=list(zip(centers[::2],centers[1::2]))+[(0,-27.8),(10,10),(-10,10),(0,15)]
for x,y in points:
    for z,direction in ((20,(0,0,-1)),(-20,(0,0,1))):
        a=before.ray_cast(Vector((x,y,z)),Vector(direction))[0]
        b=after.ray_cast(Vector((x,y,z)),Vector(direction))[0]
        assert a is not None and b is not None and (a-b).length<.005,(x,y,z,a,b)
for axis in (0,1):
    a=[v.co[axis] for v in old.data.vertices]
    b=[v.co[axis] for v in new.data.vertices]
    assert abs(min(a)-min(b))<.002 and abs(max(a)-max(b))<.002
print('STEM_FRONT_VERIFIED reduction_mm=0.4 back_unchanged=True leaves_flower_unchanged=True width_length_unchanged=True')
