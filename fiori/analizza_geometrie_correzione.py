import bpy
from collections import defaultdict
from mathutils import Vector
from mathutils.bvhtree import BVHTree

if 'tulipano' in bpy.data.filepath.lower():
    obj = bpy.data.collections['Tulipano_sorgente_2'].objects[0]
    me = obj.data
    planes = defaultdict(lambda: [0.0, 0, None])
    for p in me.polygons:
        if p.area < 1e-8:
            continue
        n = p.normal
        d = n.dot(p.center)
        key = tuple(round(float(c), 4) for c in n) + (round(d, 3),)
        planes[key][0] += p.area
        planes[key][1] += 1
        planes[key][2] = p.index
    for key, value in sorted(planes.items(), key=lambda item: -item[1][0])[:18]:
        print('PLANE', key, 'AREA', round(value[0], 3), 'FACES', value[1], 'EXAMPLE', value[2])
    for k in range(3):
        print('BOUNDS', k, min(v.co[k] for v in me.vertices), max(v.co[k] for v in me.vertices))
else:
    obj = bpy.data.objects['GIRASOLE_petali_e_gambo']
    bvh = BVHTree.FromPolygons([v.co.copy() for v in obj.data.vertices], [tuple(p.vertices) for p in obj.data.polygons])
    for y in (-10, -15, -20, -23, -25, -26, -27, -27.8, -28):
        for x in (0, 1.5):
            back = bvh.ray_cast(Vector((x,y,-20)), Vector((0,0,1)))
            front = bvh.ray_cast(Vector((x,y,20)), Vector((0,0,-1)))
            print('RAY',x,y,'BACK',tuple(back[0]) if back[0] else None,'FRONT',tuple(front[0]) if front[0] else None)
