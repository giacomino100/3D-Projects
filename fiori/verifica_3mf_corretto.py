import bpy
import os
import zipfile
import xml.etree.ElementTree as ET
from mathutils import Vector
from mathutils.bvhtree import BVHTree

path = os.path.splitext(bpy.data.filepath)[0]+'.3mf'
objects = {o.name:o for o in bpy.context.scene.objects if o.type=='MESH'}
count = 0
with zipfile.ZipFile(path) as archive:
    assert archive.testzip() is None
    with archive.open('3D/3dmodel.model') as stream:
        for event, element in ET.iterparse(stream,events=('start','end')):
            tag=element.tag.rsplit('}',1)[-1]
            if event=='start':
                if tag=='model':
                    assert element.get('unit')=='millimeter'
                elif tag=='object':
                    name=element.get('name')
                    vertices,triangles=[],[]
                continue
            if tag=='vertex':
                vertices.append(tuple(float(element.get(k)) for k in ('x','y','z')))
            elif tag=='triangle':
                triangles.append(tuple(int(element.get(k)) for k in ('v1','v2','v3')))
            elif tag=='object':
                obj=objects[name]
                obj.data.calc_loop_triangles()
                assert len(vertices)==len(obj.data.vertices)
                assert len(triangles)==len(obj.data.loop_triangles)
                for triangle in triangles:
                    assert all(0<=v<len(vertices) for v in triangle)
                if name.startswith('TULIPANO'):
                    tree=BVHTree.FromPolygons(vertices,triangles,all_triangles=True)
                    n=Vector(bpy.context.scene['foro_normale_piano'])
                    c=Vector(bpy.context.scene['foro_centro'])
                    up=(Vector((0,0,1))-n*n.z).normalized()
                    right=up.cross(n).normalized()
                    for x,y in ((0,0),(2,0),(-2,0),(0,2),(0,-2)):
                        p=c+right*x+up*y
                        hit=tree.ray_cast(p+n*10,-n)[0]
                        depth=(p-hit).dot(n)
                        assert abs(depth-2.2)<.02,depth
                    for x,y in ((3.7,0),(-3.7,0),(0,3.7),(0,-3.7)):
                        p=c+right*x+up*y
                        hit=tree.ray_cast(p+n*10,-n)[0]
                        assert abs((p-hit).dot(n))<.03
                    print('3MF_HOLE_OK centered_back=True depth_mm=2.2')
                elif name.startswith('GIRASOLE'):
                    assert abs(min(p[1] for p in vertices)+65)<.001
                    print('3MF_STEM_OK bottom_y_mm=-65')
                    if bpy.context.scene.get('spessore_aggiunto_retro_corolla_mm'):
                        tree=BVHTree.FromPolygons(vertices,triangles,all_triangles=True)
                        expected=float(bpy.context.scene['piano_appoggio_posteriore_z_mm'])
                        for x,y in ((0,10),(6,6),(-6,6),(0,-15)):
                            hit=tree.ray_cast(Vector((x,y,-20)),Vector((0,0,1)))[0]
                            assert hit is not None and abs(hit.z-expected)<.002
                        print('3MF_FLAT_BACK_OK extra_mm=0.6')
                    if bpy.context.scene.get('retro_stelo_piatto'):
                        expected=float(bpy.context.scene['piano_appoggio_posteriore_z_mm'])
                        for y in (-35,-42,-50,-60):
                            for x in (-1,0,1):
                                hit=tree.ray_cast(Vector((x,y,-20)),Vector((0,0,1)))[0]
                                assert hit is not None and abs(hit.z-expected)<.002,(x,y,hit)
                        print('3MF_D_STEM_OK flat_back=True')
                    if bpy.context.scene.get('bombatura_aggiunta_foglie_mm'):
                        centers=list(bpy.context.scene.get('centri_foglie_xy',[-5.666875,-39.665,7.506875,-47.20375]))
                        expected_heights=list(bpy.context.scene.get('altezze_centri_foglie_z',[]))
                        for index,(x,y) in enumerate(zip(centers[::2],centers[1::2])):
                            hit=tree.ray_cast(Vector((x,y,20)),Vector((0,0,-1)))[0]
                            assert hit is not None,(x,y)
                            if expected_heights:
                                assert abs(hit.z-expected_heights[index])<.03,(x,y,hit)
                            else:
                                assert hit.z>2.9,(x,y,hit)
                        print('3MF_CURVED_LEAVES_OK profile_mm',bpy.context.scene['bombatura_aggiunta_foglie_mm'])
                print('3MF_OBJECT_OK',name,'vertices',len(vertices),'triangles',len(triangles))
                count+=1
                del vertices,triangles
            element.clear()
assert count==len(objects)
print('3MF_VERIFIED',path,'OBJECTS',count)
