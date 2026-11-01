"""Render riproducibili della mesh pubblica di anteprima, solo personaggi.

Blender 5.2: blender --background --python src/prepara_render.py -- --preview
Omettere --preview per i render finali. Nessuna superficie nascosta inventata.
"""
from pathlib import Path
import argparse
import json
import math
import sys

import bmesh
import bpy
from mathutils import Matrix, Vector

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--preview', action='store_true')
parser.add_argument('--photo-only', action='store_true')
args = parser.parse_args(sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else [])

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.gltf(filepath=str(ROOT / 'progetto/input_plate_1.glb'))
figure = next(o for o in bpy.context.scene.objects if o.type == 'MESH')
world = figure.matrix_world.copy()
figure.parent = None
figure.data.transform(world)
figure.matrix_world = Matrix.Identity(4)
figure.name = 'SACRA_FAMIGLIA_mesh_anteprima_MakerWorld'

# Vertici duplicati dal formato di anteprima: la saldatura non altera la forma.
bm = bmesh.new()
bm.from_mesh(figure.data)
bmesh.ops.remove_doubles(bm, verts=list(bm.verts), dist=1e-7)
bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
boundary = sum(e.is_boundary for e in bm.edges)
non_manifold = sum(not e.is_manifold for e in bm.edges)
bm.to_mesh(figure.data)
bm.free()
for p in figure.data.polygons:
    p.use_smooth = True
coords = [v.co.copy() for v in figure.data.vertices]
mins = Vector([min(v[k] for v in coords) for k in range(3)])
maxs = Vector([max(v[k] for v in coords) for k in range(3)])
shift = Vector((-(mins.x + maxs.x) / 2, -(mins.y + maxs.y) / 2, -mins.z))
figure.data.transform(Matrix.Translation(shift))
figure.data.update()
for obj in list(bpy.context.scene.objects):
    if obj.type == 'EMPTY':
        bpy.data.objects.remove(obj, do_unlink=True)

people = bpy.data.collections.new('01_PERSONAGGI')
bpy.context.scene.collection.children.link(people)
for collection in list(figure.users_collection):
    collection.objects.unlink(figure)
people.objects.link(figure)
studio = bpy.data.collections.new('02_STUDIO_solo_render')
bpy.context.scene.collection.children.link(studio)

def move_to_studio(obj):
    for collection in list(obj.users_collection):
        collection.objects.unlink(obj)
    studio.objects.link(obj)
    return obj

def material(name, color, roughness):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get('Principled BSDF')
    bsdf.inputs['Base Color'].default_value = (*color, 1)
    bsdf.inputs['Roughness'].default_value = roughness
    return mat

ivory = material('PLA_avorio_opaco_riferimento', (0.56, 0.46, 0.32), 0.72)
figure.data.materials.clear()
figure.data.materials.append(ivory)
for p in figure.data.polygons:
    p.material_index = 0

bpy.ops.mesh.primitive_plane_add(size=200, location=(0, 0, -0.00015))
floor = move_to_studio(bpy.context.object)
floor.name = 'Piano_studio_NON_PARTE_DEL_PRESEPE'
floor.data.materials.append(material('Fondo_neutro', (0.63, 0.64, 0.63), 0.9))

target = Vector((0, 0, (maxs.z - mins.z) * 0.48))

def aim(obj, point=target):
    obj.rotation_euler = (Vector(point) - obj.location).to_track_quat('-Z', 'Y').to_euler()

def area(name, location, energy, size, color=(1, 1, 1)):
    data = bpy.data.lights.new(name, 'AREA')
    data.energy = energy
    data.shape = 'DISK'
    data.size = size
    data.color = color
    obj = bpy.data.objects.new(name, data)
    studio.objects.link(obj)
    obj.location = location
    aim(obj)

area('Key_softbox', (-0.20, -0.25, 0.32), 2.5, 0.23)
area('Fill_softbox', (0.23, -0.12, 0.18), 0.7, 0.22)
area('Rim_softbox', (0.06, 0.22, 0.27), 2.5, 0.20)
scene = bpy.context.scene
scene.unit_settings.system = 'METRIC'
scene.unit_settings.length_unit = 'MILLIMETERS'
scene.unit_settings.scale_length = 1
scene.world.use_nodes = True
scene.world.node_tree.nodes.get('Background').inputs['Color'].default_value = (0.77, 0.80, 0.84, 1)
scene.world.node_tree.nodes.get('Background').inputs['Strength'].default_value = 0.25
scene.render.engine = 'CYCLES'
scene.cycles.samples = 16 if args.preview else 48
scene.cycles.use_denoising = True
scene.render.threads_mode = 'FIXED'
scene.render.threads = 12
scene.render.image_settings.file_format = 'PNG'
scene.render.film_transparent = False
scene.view_settings.view_transform = 'AgX'
scene.view_settings.exposure = -0.4
scene.render.resolution_percentage = 100

camera_data = bpy.data.cameras.new('Camera_render')
camera = bpy.data.objects.new('Camera_render', camera_data)
studio.objects.link(camera)
scene.camera = camera
camera_data.type = 'ORTHO'
camera_data.ortho_scale = 0.145
camera_data.lens = 70

views = [
    ('01_render_principale', (0.080, -0.42, 0.18)),
    ('02_fronte', (0, -0.45, target.z)),
    ('03_retro', (0, 0.45, target.z)),
    ('04_lato_maria', (-0.45, 0, target.z)),
    ('05_lato_giuseppe', (0.45, 0, target.z)),
    ('06_retro_tre_quarti', (-0.28, 0.40, 0.15)),
    ('07_vista_prospettica_riferimento', (0.085, -0.23, 0.145)),
]
if args.preview:
    views = [views[0], views[2]]
elif args.photo_only:
    views = [views[-1]]

audit = {
    'source': 'MakerWorld 3497493 / profilo 4028964 / anteprima pubblica GLB',
    'author': 'Th3D.br', 'license_metadata': 'BY-NC',
    'dimensions_mm': [float(v * 1000) for v in maxs - mins],
    'vertices_welded': len(figure.data.vertices), 'triangles': len(figure.data.polygons),
    'boundary_edges': boundary, 'non_manifold_edges': non_manifold,
    'changes': ['saldatura vertici coincidenti entro 0,0001 mm', 'normali e shading', 'traslazione al piano Z=0', 'materiale e studio'],
    'status': 'mesh di anteprima, non validata come file definitivo di stampa',
}
(ROOT / 'ricerca/audit_mesh.json').write_text(json.dumps(audit, ensure_ascii=False, indent=2), encoding='utf-8')
print('AUDIT_MESH', json.dumps(audit), flush=True)

for name, location in views:
    camera_data.type = 'PERSP' if name.startswith('07') else 'ORTHO'
    camera_data.lens = 65
    if not args.preview:
        scene.cycles.samples = 32 if name.startswith('07') else 48
    camera.location = location
    aim(camera)
    size = 640 if args.preview else (1400 if name.startswith('07') else 1600 if name == '01_render_principale' else 1200)
    scene.render.resolution_x = size
    scene.render.resolution_y = size
    scene.render.filepath = str(ROOT / 'render' / (('preview_' if args.preview else '') + name + '.png'))
    print('RENDER_START', name, flush=True)
    bpy.ops.render.render(write_still=True)

camera.location = (0.085, -0.23, 0.145)
camera_data.type = 'PERSP'
camera_data.lens = 65
aim(camera)
scene.render.resolution_x = scene.render.resolution_y = 1600
scene.render.filepath = str(ROOT / 'render/07_vista_prospettica_riferimento.png')
bpy.context.view_layer.objects.active = figure
bpy.ops.object.select_all(action='DESELECT')
figure.select_set(True)
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT / 'progetto/sacra_famiglia_render.blend'))
print('PROJECT_SAVED', flush=True)
