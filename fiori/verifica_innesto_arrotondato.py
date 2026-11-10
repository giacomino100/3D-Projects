import bpy
import os
import sys
from mathutils import Vector
from mathutils.bvhtree import BVHTree

scene=bpy.context.scene
folder=os.path.dirname(bpy.data.filepath)
name='GIRASOLE_corpo_unico_gambo_stile_tulipano'
new=bpy.data.objects[name]
def load(filename,object_name):
    with bpy.data.libraries.load(os.path.join(folder,filename),link=False) as (src,dst):
        dst.objects=[object_name]
    obj=dst.objects[0]
    scene.collection.objects.link(obj)
    bpy.context.view_layer.update()
    return obj
old=load('girasole_rinforzato_foglie_bombate.blend',name)
flower=load('girasole_diametro_+10mm_con_foglie.blend','GIRASOLE_petali_e_gambo')

def tree(obj):
    return BVHTree.FromPolygons([obj.matrix_world@v.co for v in obj.data.vertices],
                              [tuple(p.vertices) for p in obj.data.polygons])
sys.path.insert(0,os.path.dirname(folder))
from correggi_fiori_verificati import mesh_components
flower_vertices=set(mesh_components(flower.data)[0])
current,prior=tree(new),tree(old)
original=BVHTree.FromPolygons([flower.matrix_world@v.co for v in flower.data.vertices],
    [tuple(p.vertices) for p in flower.data.polygons if p.vertices[0] in flower_vertices])
checks=0
for x in (-.8,-.4,0,.4,.8):
    for y in (-24,-25,-26,-27,-27.6,-27.8):
        p=Vector((x,y,20))
        a=original.ray_cast(p,Vector((0,0,-1)))[0]
        b=current.ray_cast(p,Vector((0,0,-1)))[0]
        if a is not None:
            assert b is not None and abs(a.z-b.z)<.01,(x,y,a,b)
            checks+=1
assert checks>=25
p=Vector((0,-27.8,20))
a=prior.ray_cast(p,Vector((0,0,-1)))[0]
b=current.ray_cast(p,Vector((0,0,-1)))[0]
assert a.z-b.z>.2,('La punta deve emergere rispetto alla versione precedente',a,b)
print('PETAL_TIP_REVEALED_MM',round(a.z-b.z,4),'CHECKS',checks)

points=[(0,-40),(0,-50),(0,-60)]
if not scene.get('foglie_superficie_corolla'):
    points.extend([(-5.666875,-39.665),(7.506875,-47.20375)])
for x,y in points:
    for z,direction in ((20,(0,0,-1)),(-20,(0,0,1))):
        p=Vector((x,y,z))
        a=prior.ray_cast(p,Vector(direction))[0]
        b=current.ray_cast(p,Vector(direction))[0]
        assert a is not None and b is not None and (a-b).length<.005,(x,y,z,a,b)
back=float(scene['piano_appoggio_posteriore_z_mm'])
if scene.get('stelo_senza_rigonfiamento'):
    widths=[]
    for y in (-28.1,-28.5,-29.2,-30,-31,-33.5):
        left=current.ray_cast(Vector((-3,y,back+.002)),Vector((1,0,0)))[0]
        right=current.ray_cast(Vector((3,y,back+.002)),Vector((-1,0,0)))[0]
        assert left is not None and right is not None
        width=right.x-left.x
        assert abs(width-4.1)<.005,(y,width)
        widths.append(width)
    assert max(widths)-min(widths)<.005
    print('DIRECT_STEM_UNIFORM_WIDTH_MM',min(widths),max(widths))
for y in (-28,-30,-35,-45,-60):
    b=current.ray_cast(Vector((0,y,-20)),Vector((0,0,1)))[0]
    assert b is not None and abs(b.z-back)<.002
for axis in (0,1):
    a=[v.co[axis] for v in old.data.vertices]
    b=[v.co[axis] for v in new.data.vertices]
    assert abs(min(a)-min(b))<.002 and abs(max(a)-max(b))<.002
print('INNESTO_VERIFICATO petal_tip_visible=True stem_length_unchanged=True flat_back=True leaves_unchanged',not bool(scene.get('foglie_superficie_corolla')))
