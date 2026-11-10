import bpy
import os
import zipfile
from xml.sax.saxutils import escape


out_path = os.path.join(os.path.dirname(bpy.data.filepath), "girasoli_modificati.3mf")
objects = [obj for obj in bpy.context.scene.objects if obj.type == "MESH" and not obj.hide_render]

colors = {
    "girasoli_008": "#6B3E1FFF",
    "GIRASOLE_petali_e_gambo": "#F4B400FF",
}

model = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<model unit="millimeter" xml:lang="it-IT" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">',
    '  <metadata name="Title">Girasoli modificati</metadata>',
    '  <metadata name="Designer">Giacomo</metadata>',
    '  <resources>',
    '    <basematerials id="1">',
]

for obj in objects:
    color = colors.get(obj.name, "#B0B0B0FF")
    model.append(f'      <base name="{escape(obj.name)}" displaycolor="{color}"/>')
model.append('    </basematerials>')

for object_id, obj in enumerate(objects, start=2):
    mesh = obj.data
    matrix = obj.matrix_world
    model.append(f'    <object id="{object_id}" name="{escape(obj.name)}" type="model" pid="1" pindex="{object_id - 2}">')
    model.append('      <mesh>')
    model.append('        <vertices>')
    for vertex in mesh.vertices:
        co = matrix @ vertex.co
        model.append(f'          <vertex x="{co.x:.6f}" y="{co.y:.6f}" z="{co.z:.6f}"/>')
    model.append('        </vertices>')
    model.append('        <triangles>')
    for polygon in mesh.polygons:
        indices = list(polygon.vertices)
        for i in range(1, len(indices) - 1):
            model.append(f'          <triangle v1="{indices[0]}" v2="{indices[i]}" v3="{indices[i + 1]}"/>')
    model.append('        </triangles>')
    model.append('      </mesh>')
    model.append('    </object>')

model.append('  </resources>')
model.append('  <build>')
for object_id in range(2, 2 + len(objects)):
    model.append(f'    <item objectid="{object_id}"/>')
model.extend(['  </build>', '</model>'])

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
