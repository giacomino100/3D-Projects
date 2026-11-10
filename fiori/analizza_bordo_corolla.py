import bpy
import bmesh
from collections import Counter

obj=bpy.data.objects['GIRASOLE_petali_e_gambo']
bm=bmesh.new()
bm.from_mesh(obj.data)
rear_faces={f for f in bm.faces if all(abs(v.co.z-.2201)<.0002 for v in f.verts)}
rear_edges={e for f in rear_faces for e in f.edges}
boundary=[e for e in rear_edges if sum(f in rear_faces for f in e.link_faces)==1]
boundary_vertices={v for e in boundary for v in e.verts}
rear_vertices={v for f in rear_faces for v in f.verts}
print('REAR_FACES',len(rear_faces),'REAR_VERTICES',len(rear_vertices),
      'BOUNDARY_EDGES',len(boundary),'INTERIOR_VERTICES',len(rear_vertices-boundary_vertices))
print('INTERIOR_EDGE_LENGTHS',dict(Counter(round(e.calc_length(),1) for e in rear_edges if e not in boundary).most_common(16)))
print('BACK_FACE_SIZES',dict(Counter(len(f.verts) for f in rear_faces)))
bm.free()
