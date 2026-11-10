import bpy
import bmesh
import math
import os
from mathutils import Vector


body = bpy.data.objects["GIRASOLE_petali_e_gambo"]
mesh = body.data

for old_leaf_name in ("FOGLIA_sinistra", "FOGLIA_destra"):
    old_leaf = bpy.data.objects.get(old_leaf_name)
    if old_leaf:
        bpy.data.objects.remove(old_leaf, do_unlink=True)

# Rimuove completamente il vecchio stelo dalla mesh, conservando la corolla.
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
old_stem = min((group for group in groups.values() if len(group) > 20), key=len)

bm = bmesh.new()
bm.from_mesh(mesh)
bm.verts.ensure_lookup_table()
bmesh.ops.delete(bm, geom=[bm.verts[i] for i in old_stem], context="VERTS")
bm.to_mesh(mesh)
bm.free()
mesh.update()

green = bpy.data.materials.get("Verde_gambo") or bpy.data.materials.new("Verde_gambo")
green.diffuse_color = (0.10, 0.38, 0.07, 1.0)
green.roughness = 0.52

def prism_from_outline(name, outline, thickness=1.6, z_mid=1.05):
    half = thickness / 2.0
    count = len(outline)
    vertices = [(p[0], p[1], z_mid + half) for p in outline]
    vertices += [(p[0], p[1], z_mid - half) for p in outline]
    faces = [tuple(range(count)), tuple(reversed(range(count, count * 2)))]
    for i in range(count):
        j = (i + 1) % count
        faces.append((i, j, count + j, count + i))
    data = bpy.data.meshes.new(name)
    data.from_pydata(vertices, [], faces)
    data.materials.append(green)
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    bevel = obj.modifiers.new("Bordi_morbidi", "BEVEL")
    bevel.width = 0.18
    bevel.segments = 2
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=bevel.name)
    return obj

def lanceolate_leaf(name, base, tip, half_width, segments=24):
    base = Vector(base)
    tip = Vector(tip)
    direction = tip - base
    direction.normalize()
    side = Vector((-direction.y, direction.x))
    left, right = [], []
    for i in range(segments + 1):
        t = i / segments
        center = base.lerp(tip, t)
        # Foglia stretta, lunga e appuntita come quella del tulipano.
        width = half_width * (math.sin(math.pi * t) ** 0.82) if 0 < t < 1 else 0.18
        left.append(center + side * width)
        right.append(center - side * width)
    outline = [(p.x, p.y) for p in left + list(reversed(right))]
    return prism_from_outline(name, outline)

# Stelo rastremato, più sottile in basso, con sovrapposizione sotto la corolla.
stem_outline = [
    (-1.75, -10.0), (1.75, -10.0),
    (1.55, -31.0), (1.85, -43.0),
    (1.20, -65.0), (-1.20, -65.0),
    (-1.85, -43.0), (-1.55, -31.0),
]
new_stem = prism_from_outline("GAMBO_stile_tulipano", stem_outline)
leaves = [
    lanceolate_leaf("FOGLIA_tulipano_sinistra", (-1.15, -34.0), (-13.5, -20.8), 2.65),
    lanceolate_leaf("FOGLIA_tulipano_destra", (1.15, -45.0), (13.2, -29.2), 2.55),
]

# Unisce prima le foglie al gambo, poi il gruppo alla corolla: un unico corpo.
for leaf in leaves:
    bpy.context.view_layer.objects.active = new_stem
    modifier = new_stem.modifiers.new("Unione_" + leaf.name, "BOOLEAN")
    modifier.operation = "UNION"
    modifier.solver = "EXACT"
    modifier.object = leaf
    bpy.ops.object.modifier_apply(modifier=modifier.name)
    bpy.data.objects.remove(leaf, do_unlink=True)

bpy.context.view_layer.objects.active = body
modifier = body.modifiers.new("Unione_gambo_stile_tulipano", "BOOLEAN")
modifier.operation = "UNION"
modifier.solver = "EXACT"
modifier.object = new_stem
bpy.ops.object.modifier_apply(modifier=modifier.name)
bpy.data.objects.remove(new_stem, do_unlink=True)

body.name = "GIRASOLE_corpo_unico_gambo_stile_tulipano"
body.data.name = body.name
bpy.context.scene["tipo_gambo"] = "Stelo e foglie lanceolate stile tulipano"
bpy.context.scene["foglie_unite_allo_stelo"] = True

output = os.path.join(os.path.dirname(bpy.data.filepath), "girasole_diametro_+10mm_gambo_stile_tulipano.blend")
bpy.ops.wm.save_as_mainfile(filepath=output)
print(f"SAVED={output}")
