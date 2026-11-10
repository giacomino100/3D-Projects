import bpy
import os
from mathutils import Vector
from mathutils.bvhtree import BVHTree

scene=bpy.context.scene
obj=bpy.data.objects['GIRASOLE_corpo_unico_gambo_stile_tulipano']
old_path=os.path.join(os.path.dirname(bpy.data.filepath),'girasole_stelo_diretto.blend')
with bpy.data.libraries.load(old_path,link=False) as (src,dst):
    dst.objects=['GIRASOLE_corpo_unico_gambo_stile_tulipano']
old=dst.objects[0]
scene.collection.objects.link(old)
bpy.context.view_layer.update()
def tree(o):
    return BVHTree.FromPolygons([o.matrix_world@v.co for v in o.data.vertices],
                               [tuple(f.vertices) for f in o.data.polygons])
current,prior=tree(obj),tree(old)
back=float(scene['piano_appoggio_posteriore_z_mm'])
tests=grown=0
for base,control,tip,width in (((-.65,-46),(-3.7,-37.9),(-12,-33.8),2.5),
                              ((.65,-54),(6.3,-45.6),(13.2,-39.7),2.4)):
    base,control,tip=Vector(base),Vector(control),Vector(tip)
    shift=(tip.y-base.y)*.15
    anchor=base-Vector((0,shift))
    def point(t,s):
        import math
        c=(1-t)**2*base+2*(1-t)*t*control+t*t*tip
        tangent=(2*(1-t)*(control-base)+2*t*(tip-control)).normalized()
        side=Vector((-tangent.y,tangent.x))
        w=.19+width*math.sin(math.pi*t)**1.12
        p=c+side*w*s*(1+.06*s*math.sin(math.pi*t))
        p=base+(p-base)*1.15-Vector((0,shift))
        return anchor+(p-anchor)*1.1
    heights=[]
    coordinates=[]
    for s in (-.8,-.4,0,.4,.8):
        p=point(.5,s)
        top=current.ray_cast(Vector((p.x,p.y,20)),Vector((0,0,-1)))[0]
        bottom=current.ray_cast(Vector((p.x,p.y,-20)),Vector((0,0,1)))[0]
        assert top is not None and bottom is not None
        assert abs(bottom.z-back)<.002 and top.z-bottom.z>=2.35
        heights.append(top.z)
        coordinates.append(p)
        tests+=1
    span=(coordinates[-1]-coordinates[0]).length
    deviations=[]
    for p,z in zip(coordinates,heights):
        t=(p-coordinates[0]).length/span
        deviations.append(abs(z-(heights[0]*(1-t)+heights[-1]*t)))
    assert max(deviations)>.08,('Superficie troppo piatta',heights)
    tip_point=point(.97,0)
    assert current.ray_cast(Vector((tip_point.x,tip_point.y,20)),Vector((0,0,-1)))[0] is not None
    assert prior.ray_cast(Vector((tip_point.x,tip_point.y,20)),Vector((0,0,-1)))[0] is None
    grown+=1
print('NATURAL_LEAVES_VERIFIED larger_leaves',grown,'curved_surface_samples',tests,
      'minimum_thickness_mm>=2.35 flat_back=True')
