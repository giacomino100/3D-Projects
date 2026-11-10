import bpy
import os
import sys
from mathutils import Vector

folder = os.path.dirname(bpy.data.filepath)
sys.path.insert(0, os.path.dirname(folder))

if 'girasoli' in folder:
    obj = bpy.data.objects['GIRASOLE_corpo_unico_gambo_stile_tulipano']
    green = bpy.data.materials['Gambo_e_foglie_verde']
    index = next((i for i,m in enumerate(obj.data.materials) if m == green),None)
    if index is None:
        obj.data.materials.append(green)
        index = len(obj.data.materials)-1
    for face in obj.data.polygons:
        if face.center.y < -27.95:
            face.material_index = index
else:
    scene=bpy.context.scene
    n=Vector(scene['foro_normale_piano'])
    u=(Vector((0,0,1))-n*n.z).normalized()
    r=u.cross(n).normalized()
    direction=(n+r*.32+u*.14).normalized()
    up=(u-direction*u.dot(direction)).normalized()
    right=up.cross(direction).normalized()
    from mathutils import Matrix
    q=Matrix((right,up,direction)).transposed().to_quaternion()
    for screen in bpy.data.screens:
        for area in screen.areas:
            if area.type=='VIEW_3D':
                space=area.spaces.active
                space.region_3d.view_rotation=q
                space.region_3d.view_perspective='ORTHO'
                space.region_3d.view_distance=122
                space.shading.cavity_type='BOTH'
                space.shading.cavity_ridge_factor=2
                space.shading.cavity_valley_factor=2

bpy.ops.wm.save_as_mainfile(filepath=bpy.data.filepath)
