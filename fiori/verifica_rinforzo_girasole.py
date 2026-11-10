import bpy
import os
from mathutils import Vector
from mathutils.bvhtree import BVHTree

folder=os.path.dirname(bpy.data.filepath)
previous=os.path.join(folder,'girasole_diametro_+10mm_gambo_stile_tulipano.blend')
body_name='GIRASOLE_corpo_unico_gambo_stile_tulipano'
new=bpy.data.objects[body_name]
new_center=bpy.data.objects['girasoli_008']
with bpy.data.libraries.load(previous,link=False) as (source,dest):
    dest.objects=[body_name,'girasoli_008']
old,old_center=dest.objects
for imported in dest.objects:
    bpy.context.scene.collection.objects.link(imported)
bpy.context.view_layer.update()

def tree(obj):
    return BVHTree.FromPolygons([obj.matrix_world@v.co for v in obj.data.vertices],
        [tuple(p.vertices) for p in obj.data.polygons])

before,after=tree(old),tree(new)

for y in (-35,-42,-50,-60):
    origin=Vector((0,y,20))
    a=before.ray_cast(origin,Vector((0,0,-1)))[0]
    b=after.ray_cast(origin,Vector((0,0,-1)))[0]
    assert abs((b.z-a.z)-1.0)<.002,(y,a,b)

for base,control,tip in (((-.65,-46),(-3.7,-37.9),(-12,-33.8)),
                          ((.65,-54),(6.3,-45.6),(13.2,-39.7))):
    base,control,tip=Vector(base),Vector(control),Vector(tip)
    for t in (.30,.55,.80):
        p=(1-t)**2*base+2*(1-t)*t*control+t*t*tip
        p=base+(p-base)*1.15
        p.y-=(tip.y-base.y)*.15
        for dx in (-.5,0,.5):
            origin=Vector((p.x+dx,p.y,20))
            a=before.ray_cast(origin,Vector((0,0,-1)))[0]
            b=after.ray_cast(origin,Vector((0,0,-1)))[0]
            assert a is not None and b is not None
            assert abs((b.z-a.z)-1.0)<.002,(t,dx,a,b)
            back_origin=Vector((p.x+dx,p.y,-20))
            a=before.ray_cast(back_origin,Vector((0,0,1)))[0]
            b=after.ray_cast(back_origin,Vector((0,0,1)))[0]
            assert (a-b).length<.002

for axis in (0,1):
    a=[(old.matrix_world@v.co)[axis] for v in old.data.vertices]
    b=[(new.matrix_world@v.co)[axis] for v in new.data.vertices]
    assert abs(min(a)-min(b))<.002 and abs(max(a)-max(b))<.002

assert len(new_center.data.vertices)==len(old_center.data.vertices)
for a,b in zip(new_center.data.vertices,old_center.data.vertices):
    assert ((new_center.matrix_world@a.co)-(old_center.matrix_world@b.co)).length<.00001

print('RINFORZO_VERIFICATO gambo=+1mm foglie=+1mm altezza_invariata=True centro_invariato=True')
