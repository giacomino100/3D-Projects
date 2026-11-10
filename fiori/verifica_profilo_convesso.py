import bpy
import math
import os
from mathutils import Vector
from mathutils.bvhtree import BVHTree

scene=bpy.context.scene
obj=bpy.data.objects['GIRASOLE_corpo_unico_gambo_stile_tulipano']
folder=os.path.dirname(bpy.data.filepath)
previous=os.path.join(folder,'girasole_rinforzato_foglie_bombate.blend')
pure=os.path.join(folder,'girasole_diametro_+10mm_con_foglie.blend')

def load(path,name):
    with bpy.data.libraries.load(path,link=False) as (source,dest):
        dest.objects=[name]
    o=dest.objects[0]
    scene.collection.objects.link(o)
    bpy.context.view_layer.update()
    return o

old=load(previous,'GIRASOLE_corpo_unico_gambo_stile_tulipano')
original_flower=load(pure,'GIRASOLE_petali_e_gambo')
def tree(o):
    return BVHTree.FromPolygons([o.matrix_world@v.co for v in o.data.vertices],
        [tuple(p.vertices) for p in o.data.polygons])
current,prior,flower=tree(obj),tree(old),tree(original_flower)

for y in (-35,-42,-50,-60):
    p=Vector((0,y,20))
    a=prior.ray_cast(p,Vector((0,0,-1)))[0]
    b=current.ray_cast(p,Vector((0,0,-1)))[0]
    assert abs(b.z-a.z-.6)<.01,(y,a,b)

checks=0
for x in (-.8,-.4,0,.4,.8):
    for y in (-24,-25,-26,-27,-27.6,-27.8):
        p=Vector((x,y,20))
        a=flower.ray_cast(p,Vector((0,0,-1)))[0]
        b=current.ray_cast(p,Vector((0,0,-1)))[0]
        if a is not None and a.z>2:
            assert b is not None and abs(a.z-b.z)<.01,('PETAL',x,y,a,b)
            checks+=1
assert checks>=20

lengths=list(scene['lunghezze_mediane_foglie_mm'])
for index,(base,control,tip) in enumerate((((-.65,-46),(-3.7,-37.9),(-12,-33.8)),
                                         ((.65,-54),(6.3,-45.6),(13.2,-39.7)))):
    base,control,tip=Vector(base),Vector(control),Vector(tip)
    line=[]
    for i in range(65):
        t=i/64
        p=(1-t)**2*base+2*(1-t)*t*control+t*t*tip
        line.append(p)
    old_length=1.15*sum((b-a).length for a,b in zip(line,line[1:]))
    assert abs(lengths[index]/old_length-1.10)<.0001
    print('LEAF_LENGTH',index,'OLD',round(old_length,3),'NEW',round(lengths[index],3))

centers=list(scene['centri_foglie_xy'])
back=float(scene['piano_appoggio_posteriore_z_mm'])
for x,y in zip(centers[::2],centers[1::2]):
    front=current.ray_cast(Vector((x,y,20)),Vector((0,0,-1)))[0]
    rear=current.ray_cast(Vector((x,y,-20)),Vector((0,0,1)))[0]
    assert front is not None and front.z>2.9
    assert rear is not None and abs(rear.z-back)<.002

for x in (-1,0,1):
    for y in (-35,-42,-50,-60):
        rear=current.ray_cast(Vector((x,y,-20)),Vector((0,0,1)))[0]
        assert rear is not None and abs(rear.z-back)<.002
assert abs(min(v.co.y for v in obj.data.vertices)+65)<.001
print('PROFILO_VERIFICATO extra_convexity_mm=0.6 leaves_length=+10% petal_checks',checks,'flat_back=True')
