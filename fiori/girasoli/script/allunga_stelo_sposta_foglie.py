import bpy


flower = bpy.data.objects["GIRASOLE_petali_e_gambo"]
mesh = flower.data
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
    groups.setdefault(find(vertex.index), []).append(vertex.index)

# Lo stelo è la piccola isola connessa; il fiore è l'isola principale.
stem_vertices = min((g for g in groups.values() if len(g) > 20), key=len)
ys = [mesh.vertices[i].co.y for i in stem_vertices]
stem_top = max(ys)
stem_bottom = min(ys)
old_length = stem_top - stem_bottom
extension = 12.0
new_length = old_length + extension
factor = new_length / old_length

for index in stem_vertices:
    co = mesh.vertices[index].co
    co.y = stem_top + (co.y - stem_top) * factor
mesh.update()

leaf_shift = 8.0
for name in ("FOGLIA_sinistra", "FOGLIA_destra"):
    leaf = bpy.data.objects.get(name)
    if leaf:
        leaf.location.y -= leaf_shift

bpy.context.scene["allungamento_stelo_mm"] = extension
bpy.context.scene["spostamento_foglie_verso_basso_mm"] = leaf_shift

for obj in bpy.context.scene.objects:
    obj.select_set(obj.name in {
        "GIRASOLE_petali_e_gambo", "girasoli_008", "FOGLIA_sinistra", "FOGLIA_destra"
    })
bpy.context.view_layer.objects.active = flower

output = bpy.path.abspath("//girasole_diametro_+10mm_foglie_stelo_lungo.blend")
bpy.ops.wm.save_as_mainfile(filepath=output)
print(f"SAVED={output}")
print(f"STEM_OLD={old_length:.3f} STEM_NEW={new_length:.3f} LEAF_SHIFT={leaf_shift:.3f}")
