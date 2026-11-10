import bpy
import os


body = bpy.data.objects["GIRASOLE_petali_e_gambo"]
mesh = body.data

# Allunga nuovamente lo stelo di 12 mm verso il basso partendo dalla versione pulita.
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
stem = min((group for group in groups.values() if len(group) > 20), key=len)
ys = [mesh.vertices[i].co.y for i in stem]
top, bottom = max(ys), min(ys)
factor = ((top - bottom) + 12.0) / (top - bottom)
for index in stem:
    co = mesh.vertices[index].co
    co.y = top + (co.y - top) * factor
mesh.update()

target_thickness = 2.6

for leaf_name in ("FOGLIA_sinistra", "FOGLIA_destra"):
    old_leaf = bpy.data.objects[leaf_name]
    old_leaf.location.y -= 8.0
    old_mesh = old_leaf.data

    # La mesh originale ha quattro punti per sezione: sinistra, colmo, destra, fondo.
    # Ricava solo la sagoma XY e la estrude con due facce parallele.
    section_count = len(old_mesh.vertices) // 4
    left = [old_mesh.vertices[i * 4].co.copy() for i in range(section_count)]
    right = [old_mesh.vertices[i * 4 + 2].co.copy() for i in range(section_count)]
    outline = left + list(reversed(right))
    mid_z = sum(v.z for v in outline) / len(outline)
    half = target_thickness / 2.0
    vertices = [(v.x, v.y, mid_z + half) for v in outline]
    vertices += [(v.x, v.y, mid_z - half) for v in outline]
    count = len(outline)
    faces = [tuple(range(count)), tuple(reversed(range(count, count * 2)))]
    for i in range(count):
        j = (i + 1) % count
        faces.append((i, j, count + j, count + i))

    new_mesh = bpy.data.meshes.new(f"{leaf_name}_spessore_costante")
    new_mesh.from_pydata(vertices, [], faces)
    new_mesh.materials.clear()
    for material in old_mesh.materials:
        new_mesh.materials.append(material)
    new_leaf = bpy.data.objects.new(leaf_name + "_uniforme", new_mesh)
    bpy.context.collection.objects.link(new_leaf)
    new_leaf.matrix_world = old_leaf.matrix_world.copy()
    bpy.data.objects.remove(old_leaf, do_unlink=True)

    # Fusione booleana con lo stelo: resta un unico corpo stampabile.
    bpy.context.view_layer.objects.active = body
    boolean = body.modifiers.new(f"Unione_{leaf_name}_uniforme", "BOOLEAN")
    boolean.operation = "UNION"
    boolean.solver = "EXACT"
    boolean.object = new_leaf
    bpy.ops.object.modifier_apply(modifier=boolean.name)
    bpy.data.objects.remove(new_leaf, do_unlink=True)

body.name = "GIRASOLE_corpo_unico_petali_stelo_foglie"
body.data.name = "GIRASOLE_corpo_unico_petali_stelo_foglie"
bpy.context.scene["spessore_foglie_mm"] = target_thickness
bpy.context.scene["spessore_foglie_costante"] = True
bpy.context.scene["allungamento_stelo_mm"] = 12.0
bpy.context.scene["spostamento_foglie_verso_basso_mm"] = 8.0

output = os.path.join(os.path.dirname(bpy.data.filepath), "girasole_diametro_+10mm_foglie_stelo_lungo.blend")
bpy.ops.wm.save_as_mainfile(filepath=output)
print(f"SAVED={output}")
print(f"UNIFORM_LEAF_THICKNESS={target_thickness:.3f}")
