import bpy
import os
import zipfile
from xml.sax.saxutils import escape


blend_path = bpy.data.filepath
out_path = os.path.splitext(blend_path)[0] + ".3mf"
depsgraph = bpy.context.evaluated_depsgraph_get()
objects = [obj for obj in bpy.context.scene.objects if obj.type == "MESH" and not obj.hide_render]

model = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<model unit="millimeter" xml:lang="it-IT" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">',
    f'  <metadata name="Title">{escape(os.path.splitext(os.path.basename(blend_path))[0])}</metadata>',
    '  <resources><basematerials id="1">',
]
material_indices = {}
material_count = 0
for obj in objects:
    slots = list(obj.data.materials) or [None]
    for slot, material in enumerate(slots):
        if material:
            color = material.diffuse_color
            rgba = "#" + "".join(f"{max(0, min(255, round(channel * 255))):02X}" for channel in color)
        else:
            rgba = "#B0B0B0FF"
        material_indices[(obj.name, slot)] = material_count
        material_count += 1
        model.append(f'    <base name="{escape(obj.name)}_{slot}" displaycolor="{rgba}"/>')
model.append('  </basematerials>')

temporary = []
try:
    for object_id, obj in enumerate(objects, start=2):
        evaluated = obj.evaluated_get(depsgraph)
        mesh = evaluated.to_mesh(preserve_all_data_layers=False, depsgraph=depsgraph)
        temporary.append(evaluated)
        matrix = obj.matrix_world
        default_material = material_indices[(obj.name, 0)]
        model.append(f'  <object id="{object_id}" name="{escape(obj.name)}" type="model" pid="1" pindex="{default_material}"><mesh><vertices>')
        for vertex in mesh.vertices:
            co = matrix @ vertex.co
            model.append(f'    <vertex x="{co.x:.6f}" y="{co.y:.6f}" z="{co.z:.6f}"/>')
        model.append('  </vertices><triangles>')
        # Blender triangola correttamente anche le facce concave prodotte dai fori.
        mesh.calc_loop_triangles()
        for triangle in mesh.loop_triangles:
            a, b, c = triangle.vertices
            mat_index = material_indices.get((obj.name, triangle.material_index), default_material)
            model.append(f'    <triangle v1="{a}" v2="{b}" v3="{c}" p1="{mat_index}" p2="{mat_index}" p3="{mat_index}"/>')
        model.append('  </triangles></mesh></object>')
finally:
    for evaluated in temporary:
        evaluated.to_mesh_clear()

model.append('</resources><build>')
for object_id in range(2, 2 + len(objects)):
    model.append(f'  <item objectid="{object_id}"/>')
model.extend(['</build>', '</model>'])

content_types = '''<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/>
</Types>'''
relationships = '''<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>
</Relationships>'''

with zipfile.ZipFile(out_path, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
    archive.writestr("[Content_Types].xml", content_types)
    archive.writestr("_rels/.rels", relationships)
    archive.writestr("3D/3dmodel.model", "\n".join(model))
print(f"3MF_EXPORT={out_path}")
