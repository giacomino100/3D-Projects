import bpy
import math
import os
from mathutils import Vector
from mathutils.bvhtree import BVHTree

name='GIRASOLE_corpo_unico_gambo_stile_tulipano'
obj=bpy.data.objects[name]
center=bpy.data.objects['girasoli_008']
previous=os.path.join(os.path.dirname(bpy.data.filepath),'girasole_rinforzato_stelo_piatto.blend')
with bpy.data.libraries.load(previous,link=False) as (source,dest):
    dest.objects=[name,'girasoli_008']
old,old_center=dest.objects
for imported in dest.objects:
    bpy.context.scene.collection.objects.link(imported)
bpy.context.view_layer.update()

def tree(o):
    return BVHTree.FromPolygons([o.matrix_world@v.co for v in o.data.vertices],
                              [tuple(p.vertices) for p in o.data.polygons])

before,after=tree(old),tree(obj)

def hit(surface,p,front):
    return surface.ray_cast(Vector((p.x,p.y,20 if front else -20)),
                            Vector((0,0,-1 if front else 1)))[0]

tests=0
for base,control,tip,half_width in (((-.65,-46),(-3.7,-37.9),(-12,-33.8),2.5),
                                   ((.65,-54),(6.3,-45.6),(13.2,-39.7),2.4)):
    base,control,tip=Vector(base),Vector(control),Vector(tip)
    mid_heights={}
    for t in (.3,.5,.75):
        c=(1-t)**2*base+2*(1-t)*t*control+t*t*tip
        tangent=(2*(1-t)*(control-base)+2*t*(tip-control)).normalized()
        side=Vector((-tangent.y,tangent.x))
        width=.19+half_width*math.sin(math.pi*t)**1.12
        for s in (-.85,0,.85):
            p=c+side*width*s*(1+.06*s*math.sin(math.pi*t))
            p=base+(p-base)*1.15
            p.y-=(tip.y-base.y)*.15
            a,b=hit(before,p,True),hit(after,p,True)
            assert a is not None and b is not None
            delta=b.z-a.z
            expected=.75*math.sin(math.pi*t)**.9*max(0,1-s*s)**.85
            # Vicino alla radice la foglia si fonde con il gambo: il raggio
            # puo' incontrare il gambo invece della sola lamina di riferimento.
            if abs(p.x)>2.3:
                assert abs(delta-expected)<.04,(t,s,delta,expected)
            else:
                assert delta>=-.005
            a_back,b_back=hit(before,p,False),hit(after,p,False)
            assert abs(a_back.z-b_back.z)<.002
            assert b.z-b_back.z>=2.35
            if t==.5:
                mid_heights[s]=b.z
            tests+=1
    assert mid_heights[0]-max(mid_heights[-.85],mid_heights[.85])>.4

for x,y in ((0,-35),(0,-42),(0,-50),(0,-60),(0,15),(10,10),(-10,10)):
    p=Vector((x,y))
    for front in (True,False):
        a,b=hit(before,p,front),hit(after,p,front)
        assert a is not None and b is not None and (a-b).length<.005,(x,y,front,a,b)

for axis in (0,1):
    a=[v.co[axis] for v in old.data.vertices]
    b=[v.co[axis] for v in obj.data.vertices]
    assert abs(min(a)-min(b))<.002 and abs(max(a)-max(b))<.002
for a,b in zip(center.data.vertices,old_center.data.vertices):
    assert ((center.matrix_world@a.co)-(old_center.matrix_world@b.co)).length<.00001
print('FOGLIE_BOMBATE_VERIFICATE samples',tests,'crown_mm=0.75 flat_back=True stem_flower_unchanged=True')
