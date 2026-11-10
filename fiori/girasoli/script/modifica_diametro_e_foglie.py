import bpy
import math
from mathutils import Vector


source_name = "GIRASOLE_petali_e_gambo"
flower = bpy.data.objects[source_name]
mesh = flower.data

# Individua le isole connesse: quella grande è il fiore, quella piccola è lo stelo.
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
flower_vertices = max(groups.values(), key=len)

xs = [mesh.vertices[i].co.x for i in flower_vertices]
ys = [mesh.vertices[i].co.y for i in flower_vertices]
old_diameter = max(max(xs) - min(xs), max(ys) - min(ys))
new_diameter = old_diameter + 10.0
scale = new_diameter / old_diameter

center_x = (min(xs) + max(xs)) / 2.0
center_y = (min(ys) + max(ys)) / 2.0
for index in flower_vertices:
    co = mesh.vertices[index].co
    co.x = center_x + (co.x - center_x) * scale
    co.y = center_y + (co.y - center_y) * scale
mesh.update()

# Anche il disco centrale cresce insieme alla corolla.
center = bpy.data.objects.get("girasoli_008")
if center:
    center.scale.x *= scale
    center.scale.y *= scale

green = bpy.data.materials.get("Verde_foglie") or bpy.data.materials.new("Verde_foglie")
green.diffuse_color = (0.12, 0.42, 0.08, 1.0)
green.roughness = 0.52

def make_leaf(name, base, tip, max_width, thickness=1.15, sections=18):
    base = Vector(base)
    tip = Vector(tip)
    direction = Vector((tip.x - base.x, tip.y - base.y, 0.0))
    length = direction.length
    direction.normalize()
    side = Vector((-direction.y, direction.x, 0.0))
    vertices = []
    for i in range(sections + 1):
        t = i / sections
        profile = max(math.sin(math.pi * t), 0.025) ** 0.72
        middle = base.lerp(tip, t)
        width = max_width * profile
        rise = thickness * profile
        vertices.extend([
            tuple(middle + side * width),
            tuple(middle + Vector((0.0, 0.0, rise))),
            tuple(middle - side * width),
            tuple(middle - Vector((0.0, 0.0, thickness * 0.22 * profile))),
        ])
    faces = []
    for i in range(sections):
        a, b = i * 4, (i + 1) * 4
        faces.extend([
            (a, b, b + 1, a + 1),
            (a + 1, b + 1, b + 2, a + 2),
            (a + 2, b + 2, b + 3, a + 3),
            (a + 3, b + 3, b, a),
        ])
    faces.extend([(0, 1, 2, 3), (sections * 4 + 3, sections * 4 + 2, sections * 4 + 1, sections * 4)])
    leaf_mesh = bpy.data.meshes.new(name)
    leaf_mesh.from_pydata(vertices, [], faces)
    leaf_mesh.materials.append(green)
    leaf = bpy.data.objects.new(name, leaf_mesh)
    bpy.context.collection.objects.link(leaf)
    for polygon in leaf_mesh.polygons:
        polygon.use_smooth = True
    bevel = leaf.modifiers.new("Bordi_morbidi_come_petali", "BEVEL")
    bevel.width = 0.32
    bevel.segments = 3
    return leaf

leaf_left = make_leaf("FOGLIA_sinistra", (-1.65, -29.0, 1.05), (-17.2, -21.0, 1.05), 3.5)
leaf_right = make_leaf("FOGLIA_destra", (1.65, -36.0, 1.05), (16.2, -27.2, 1.05), 3.25)

for obj in bpy.context.scene.objects:
    obj.select_set(obj in {flower, center, leaf_left, leaf_right})
bpy.context.view_layer.objects.active = flower

bpy.context.scene["diametro_originale_mm"] = old_diameter
bpy.context.scene["diametro_nuovo_mm"] = new_diameter
bpy.context.scene["incremento_diametro_mm"] = 10.0

output = bpy.path.abspath("//girasole_diametro_+10mm_con_foglie.blend")
bpy.ops.wm.save_as_mainfile(filepath=output)
print(f"SAVED={output}")
print(f"OLD_DIAMETER={old_diameter:.4f} NEW_DIAMETER={new_diameter:.4f} SCALE={scale:.6f}")
