import bpy
import os
from mathutils import Vector
from mathutils.bvhtree import BVHTree

name='GIRASOLE_corpo_unico_gambo_stile_tulipano'
new=bpy.data.objects[name]
new_center=bpy.data.objects['girasoli_008']
path=os.path.join(os.path.dirname(bpy.data.filepath),'girasole_rinforzato_+1mm.blend')
with bpy.data.libraries.load(path,link=False) as (source,dest):
    dest.objects=[name,'girasoli_008']
old,old_center=dest.objects
for obj in dest.objects:
    bpy.context.scene.collection.objects.link(obj)
bpy.context.view_layer.update()

def tree(obj):
    return BVHTree.FromPolygons([obj.matrix_world@v.co for v in obj.data.vertices],
        [tuple(p.vertices) for p in obj.data.polygons])

before,after=tree(old),tree(new)
front_tests=back_tests=0
for x in (-18,-12,-6,0,6,12,18):
    for y in (-22,-12,0,12,22):
        origin=Vector((x,y,20))
        a=before.ray_cast(origin,Vector((0,0,-1)))[0]
        b=after.ray_cast(origin,Vector((0,0,-1)))[0]
        if a is not None:
            assert b is not None and abs(a.z-b.z)<.005,(x,y,a,b)
            front_tests+=1
        origin.z=-20
        a=before.ray_cast(origin,Vector((0,0,1)))[0]
        b=after.ray_cast(origin,Vector((0,0,1)))[0]
        if a is not None and abs(a.z-.2201)<.002:
            assert b is not None and abs((a.z-b.z)-.6)<.002,(x,y,a,b)
            back_tests+=1

for x,y in ((0,-35),(0,-50),(-6,-40),(7,-48)):
    values=[]
    for surface in (before,after):
        top=surface.ray_cast(Vector((x,y,20)),Vector((0,0,-1)))[0]
        bottom=surface.ray_cast(Vector((x,y,-20)),Vector((0,0,1)))[0]
        assert top is not None and bottom is not None,(x,y)
        values.append(top.z-bottom.z)
    assert abs(values[0]-values[1])<.003,(x,y,values)

for axis in (0,1):
    a=[v.co[axis] for v in old.data.vertices]
    b=[v.co[axis] for v in new.data.vertices]
    assert abs(min(a)-min(b))<.002 and abs(max(a)-max(b))<.002
for a,b in zip(old_center.data.vertices,new_center.data.vertices):
    assert ((old_center.matrix_world@a.co)-(new_center.matrix_world@b.co)).length<.00001
assert front_tests>20 and back_tests>20
print('RETRO_VERIFICATO extra_mm=0.6 FRONT_CHECKS',front_tests,'BACK_CHECKS',back_tests,
      'STEM_LEAF_THICKNESS_PRESERVED=True')

# Rimuove dalla sola sessione di verifica gli oggetti di confronto importati.
for obj in dest.objects:
    bpy.data.objects.remove(obj,do_unlink=True)
scene=bpy.context.scene
if 'dimensioni_fiore_e_altezza_invariate' in scene:
    del scene['dimensioni_fiore_e_altezza_invariate']
scene['diametro_fiore_e_altezza_invariati']=True
scene['retro_verificato_mm']=.6
bpy.ops.wm.save_as_mainfile(filepath=bpy.data.filepath)
