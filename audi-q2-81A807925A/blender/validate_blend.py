"""Verifica topologica generica del corpo nella scena Blender aperta."""

import os

import bmesh
import bpy


version = os.environ.get("Q2_VERSION", "V16").upper()
name = f"BODY_81A807925A_{version}"
obj = bpy.data.objects.get(name)
if obj is None or obj.type != "MESH":
    raise RuntimeError(f"Corpo mesh non trovato: {name}")

bm = bmesh.new()
bm.from_mesh(obj.data)

boundary = sum(1 for edge in bm.edges if edge.is_boundary)
non_manifold = sum(1 for edge in bm.edges if not edge.is_manifold)
loose_edges = sum(1 for edge in bm.edges if len(edge.link_faces) == 0)
loose_verts = sum(1 for vert in bm.verts if not vert.link_edges)

remaining = set(bm.verts)
components = 0
while remaining:
    components += 1
    stack = [remaining.pop()]
    while stack:
        vert = stack.pop()
        for edge in vert.link_edges:
            other = edge.other_vert(vert)
            if other in remaining:
                remaining.remove(other)
                stack.append(other)

print(
    "TOPOLOGY",
    f"body={name}",
    f"verts={len(bm.verts)}",
    f"faces={len(bm.faces)}",
    f"boundary={boundary}",
    f"non_manifold={non_manifold}",
    f"loose_edges={loose_edges}",
    f"loose_verts={loose_verts}",
    f"components={components}",
)

bad_edges = [edge for edge in bm.edges if not edge.is_manifold]
for edge in bad_edges[:20]:
    coords = [tuple(round(float(c), 4) for c in vert.co) for vert in edge.verts]
    print("NON_MANIFOLD_EDGE", coords, "linked_faces", len(edge.link_faces))
    for face in edge.link_faces:
        center = tuple(round(float(c), 4) for c in face.calc_center_median())
        normal = tuple(round(float(c), 4) for c in face.normal)
        print("  FACE", face.index, "verts", len(face.verts), "area", round(float(face.calc_area()), 6), "center", center, "normal", normal)

if any((boundary, non_manifold, loose_edges, loose_verts)) or components != 1:
    raise RuntimeError("La topologia del corpo non e' valida")

bm.free()
