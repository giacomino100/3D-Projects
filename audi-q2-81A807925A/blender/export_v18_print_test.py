"""Esporta la V18 completa di sei clip come STL di prova, senza alterare il master."""

from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "cad" / "exports" / "V18" / "81A807925A_V18_print_test_with_clips.stl"
NAMES = (
    "BODY_81A807925A_V18",
    "CLIP_C01",
    "CLIP_C02",
    "CLIP_C03",
    "CLIP_C05",
    "CLIP_C06",
    "CLIP_C07",
)

objects = []
for name in NAMES:
    obj = bpy.data.objects.get(name)
    if obj is None or obj.type != "MESH":
        raise RuntimeError(f"Oggetto mancante o non mesh: {name}")
    objects.append(obj)

bpy.ops.object.select_all(action="DESELECT")
for obj in objects:
    obj.select_set(True)
bpy.context.view_layer.objects.active = objects[0]

points = [obj.matrix_world @ Vector(corner) for obj in objects for corner in obj.bound_box]
mins = tuple(min(point[i] for point in points) for i in range(3))
maxs = tuple(max(point[i] for point in points) for i in range(3))
dims = tuple(maxs[i] - mins[i] for i in range(3))

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.wm.stl_export(filepath=str(OUTPUT), export_selected_objects=True)
print("PRINT_TEST_STL", OUTPUT)
print("OBJECTS", len(objects), NAMES)
print("BOUNDS_MM", tuple(round(value, 2) for value in dims))

