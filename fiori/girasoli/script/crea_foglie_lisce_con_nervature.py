import bpy
import math
import os
from mathutils import Vector


body = bpy.data.objects["GIRASOLE_petali_e_gambo"]
mesh = body.data

for name in ("FOGLIA_sinistra", "FOGLIA_destra"):
    obj = bpy.data.objects.get(name)
    if obj:
        bpy.data.objects.remove(obj, do_unlink=True)

# Allunga il fusto di 12 mm verso il basso dalla versione sorgente pulita.
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

def make_ridge(name, points, radius):
    curve_data = bpy.data.curves.new(name, "CURVE")
    curve_data.dimensions = "3D"
    curve_data.resolution_u = 1
    curve_data.bevel_depth = radius
    curve_data.bevel_resolution = 2
    spline = curve_data.splines.new("BEZIER")
    spline.bezier_points.add(len(points) - 1)
    for point, coordinate in zip(spline.bezier_points, points):
        point.co = coordinate
        point.handle_left_type = "AUTO"
        point.handle_right_type = "AUTO"
    ridge = bpy.data.objects.new(name, curve_data)
    bpy.context.collection.objects.link(ridge)
    bpy.context.view_layer.objects.active = ridge
    ridge.select_set(True)
    bpy.ops.object.convert(target="MESH")
    ridge.select_set(False)
    return ridge

def smooth_sunflower_leaf(name, base_xy, tip_xy, max_half_width, thickness=1.4, segments=28):
    base = Vector(base_xy)
    tip = Vector(tip_xy)
    direction = tip - base
    direction.normalize()
    side = Vector((-direction.y, direction.x))

    def center_at(t):
        return base.lerp(tip, t)

    def width_at(t):
        if t <= 0.0:
            return 1.55
        if t >= 1.0:
            return 0.10
        core = math.sin(math.pi * (t ** 0.78)) ** 0.72
        heart_lobe = 0.22 * math.exp(-((t - 0.18) / 0.14) ** 2)
        return max_half_width * min(core + heart_lobe, 1.0)

    left, right = [], []
    for i in range(segments + 1):
        t = i / segments
        center = center_at(t)
        width = width_at(t)
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

    bevel = leaf.modifiers.new("Bordo_liscio", "BEVEL")
    bevel.width = 0.14
    bevel.segments = 2
    bpy.context.view_layer.objects.active = leaf
    bpy.ops.object.modifier_apply(modifier=bevel.name)

    # Nervatura centrale e tre coppie di nervature laterali in basso rilievo.
    ridge_z = z_mid + half + 0.06
    ridges = []
    central_points = []
    for t in (0.04, 0.28, 0.55, 0.82, 0.94):
        p = center_at(t)
        central_points.append((p.x, p.y, ridge_z))
    ridges.append(make_ridge(name + "_nervatura_centrale", central_points, 0.18))

    for index, t in enumerate((0.30, 0.48, 0.65), start=1):
        start = center_at(t)
        end_t = min(t + 0.17, 0.88)
        forward = center_at(end_t)
        width = width_at(end_t) * 0.72
        for sign, suffix in ((1.0, "S"), (-1.0, "D")):
            end = forward + side * width * sign
            middle = start.lerp(end, 0.58) + direction * 0.35
            ridges.append(make_ridge(
                f"{name}_nervatura_{index}_{suffix}",
                [(start.x, start.y, ridge_z), (middle.x, middle.y, ridge_z), (end.x, end.y, ridge_z)],
                0.115,
            ))

    # Incorpora le nervature nella foglia prima di unirla al fusto.
    for ridge in ridges:
        bpy.context.view_layer.objects.active = leaf
        boolean = leaf.modifiers.new("Unione_" + ridge.name, "BOOLEAN")
        boolean.operation = "UNION"
        boolean.solver = "EXACT"
        boolean.object = ridge
        bpy.ops.object.modifier_apply(modifier=boolean.name)
        bpy.data.objects.remove(ridge, do_unlink=True)
    return leaf

leaves = [
    smooth_sunflower_leaf("FOGLIA_girasole_sinistra", (-1.25, -30.5), (-15.5, -22.2), 4.4),
    smooth_sunflower_leaf("FOGLIA_girasole_destra", (1.25, -41.0), (15.2, -33.0), 4.2),
]

for leaf in leaves:
    bpy.context.view_layer.objects.active = body
    boolean = body.modifiers.new("Unione_" + leaf.name, "BOOLEAN")
    boolean.operation = "UNION"
    boolean.solver = "EXACT"
    boolean.object = leaf
    bpy.ops.object.modifier_apply(modifier=boolean.name)
    bpy.data.objects.remove(leaf, do_unlink=True)

body.name = "GIRASOLE_corpo_unico_petali_stelo_foglie"
body.data.name = "GIRASOLE_corpo_unico_petali_stelo_foglie"
bpy.context.scene["tipo_foglie"] = "Foglia di girasole liscia con nervature in rilievo"
bpy.context.scene["spessore_foglie_mm"] = 1.4
bpy.context.scene["foglie_unite_allo_stelo"] = True

output = os.path.join(os.path.dirname(bpy.data.filepath), "girasole_diametro_+10mm_foglie_stelo_lungo.blend")
bpy.ops.wm.save_as_mainfile(filepath=output)
print(f"SAVED={output}")
print("LEAF_STYLE=SMOOTH_WITH_VEINS THICKNESS=1.4")
