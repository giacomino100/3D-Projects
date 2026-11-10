import bpy
import math
import os
from mathutils import Vector


body = bpy.data.objects["GIRASOLE_petali_e_gambo"]
mesh = body.data

# Elimina le vecchie foglie della versione sorgente.
for name in ("FOGLIA_sinistra", "FOGLIA_destra"):
    obj = bpy.data.objects.get(name)
    if obj:
        bpy.data.objects.remove(obj, do_unlink=True)

# Allunga il solo fusto di 12 mm verso il basso.
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

green = bpy.data.materials.get("Verde_foglie") or bpy.data.materials.new("Verde_foglie")
green.diffuse_color = (0.12, 0.42, 0.08, 1.0)
green.roughness = 0.52

def sunflower_leaf(name, base_xy, tip_xy, max_half_width, thickness=1.8, segments=18):
    base = Vector((base_xy[0], base_xy[1]))
    tip = Vector((tip_xy[0], tip_xy[1]))
    direction = tip - base
    direction.normalize()
    side = Vector((-direction.y, direction.x))

    left, right = [], []
    for i in range(segments + 1):
        t = i / segments
        center = base.lerp(tip, t)
        # Sagoma larga, leggermente cuoriforme alla base e appuntita in punta.
        core = (math.sin(math.pi * (t ** 0.78)) ** 0.72) if 0 < t < 1 else 0.0
        heart_lobe = 0.26 * math.exp(-((t - 0.18) / 0.13) ** 2)
        width = max_half_width * min(core + heart_lobe, 1.0)
        if i == 0:
            width = 1.55  # base larga che penetra nel fusto
        elif i == segments:
            width = 0.12
        # Dentellatura discreta tipica delle foglie di girasole.
        tooth = 1.0 + (0.075 if i % 2 == 0 else -0.035) * math.sin(math.pi * t)
        width *= tooth
        left.append(center + side * width)
        right.append(center - side * width)

    outline = left + list(reversed(right))
    z_mid = 1.05
    half = thickness / 2.0
    vertices = [(v.x, v.y, z_mid + half) for v in outline]
    vertices += [(v.x, v.y, z_mid - half) for v in outline]
    count = len(outline)
    faces = [tuple(range(count)), tuple(reversed(range(count, count * 2)))]
    for i in range(count):
        j = (i + 1) % count
        faces.append((i, j, count + j, count + i))

    leaf_mesh = bpy.data.meshes.new(name)
    leaf_mesh.from_pydata(vertices, [], faces)
    leaf_mesh.materials.append(green)
    leaf = bpy.data.objects.new(name, leaf_mesh)
    bpy.context.collection.objects.link(leaf)

    bevel = leaf.modifiers.new("Bordi_foglia_morbidi", "BEVEL")
    bevel.width = 0.22
    bevel.segments = 2
    bpy.context.view_layer.objects.active = leaf
    bpy.ops.object.modifier_apply(modifier=bevel.name)
    return leaf

leaves = [
    sunflower_leaf("FOGLIA_girasole_sinistra", (-1.25, -30.5), (-18.5, -20.8), 5.8),
    sunflower_leaf("FOGLIA_girasole_destra", (1.25, -41.0), (18.0, -31.0), 5.5),
]

# Fonde le nuove foglie nel fusto: un solo corpo stampabile.
for leaf in leaves:
    bpy.context.view_layer.objects.active = body
    boolean = body.modifiers.new(f"Unione_{leaf.name}", "BOOLEAN")
    boolean.operation = "UNION"
    boolean.solver = "EXACT"
    boolean.object = leaf
    bpy.ops.object.modifier_apply(modifier=boolean.name)
    bpy.data.objects.remove(leaf, do_unlink=True)

body.name = "GIRASOLE_corpo_unico_petali_stelo_foglie"
body.data.name = "GIRASOLE_corpo_unico_petali_stelo_foglie"
bpy.context.scene["tipo_foglie"] = "Sagoma foglia di girasole ovato-cuoriforme dentellata"
bpy.context.scene["spessore_foglie_mm"] = 1.8
bpy.context.scene["foglie_unite_allo_stelo"] = True
bpy.context.scene["allungamento_stelo_mm"] = 12.0

output = os.path.join(os.path.dirname(bpy.data.filepath), "girasole_diametro_+10mm_foglie_stelo_lungo.blend")
bpy.ops.wm.save_as_mainfile(filepath=output)
print(f"SAVED={output}")
print("LEAF_STYLE=SUNFLOWER THICKNESS=1.8")
