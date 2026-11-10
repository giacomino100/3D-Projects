import bpy

obj = bpy.data.objects["GIRASOLE_petali_e_gambo"]
mesh = obj.data
parent = list(range(len(mesh.vertices)))

def find(a):
    while parent[a] != a:
        parent[a] = parent[parent[a]]
        a = parent[a]
    return a

def union(a, b):
    a, b = find(a), find(b)
    if a != b:
        parent[b] = a

for edge in mesh.edges:
    union(edge.vertices[0], edge.vertices[1])

groups = {}
for vertex in mesh.vertices:
    groups.setdefault(find(vertex.index), []).append(vertex.co)

summary = []
for coords in groups.values():
    if len(coords) < 20:
        continue
    summary.append((
        len(coords),
        min(v.x for v in coords), max(v.x for v in coords),
        min(v.y for v in coords), max(v.y for v in coords),
        min(v.z for v in coords), max(v.z for v in coords),
    ))

for item in sorted(summary, reverse=True):
    print("COMP", *(round(v, 4) if isinstance(v, float) else v for v in item))
