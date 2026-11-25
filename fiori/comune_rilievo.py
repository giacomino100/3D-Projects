"""Funzioni comuni per i fiori in rilievo a retro piatto (stampa sdraiata, senza supporti).

Unita: 1 BU = 1 mm. Ogni pezzo ha il retro a z = 0; un oggetto per colore.
Importato dagli script crea_*.py nelle sottocartelle.
"""
import bpy
import bmesh
import math
import os
from mathutils import Matrix, Vector

FIORI = os.path.dirname(os.path.abspath(__file__))


def clear_scene():
    for obj in list(bpy.data.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    for block in (bpy.data.meshes, bpy.data.materials):
        for item in list(block):
            block.remove(item)
    us = bpy.context.scene.unit_settings
    us.system, us.scale_length, us.length_unit = 'METRIC', 0.001, 'MILLIMETERS'


def material(name, rgb):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*rgb, 1.0)
    mat.use_nodes = True
    bsdf = next(n for n in mat.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
    bsdf.inputs['Base Color'].default_value = (*rgb, 1.0)
    bsdf.inputs['Roughness'].default_value = 0.45
    return mat


def to_object(name, bm, mat=None):
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    if mat:
        me.materials.append(mat)
    obj = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(obj)
    return obj


def domed_slab(outline, height_fn, rings=12, z0=0.0):
    """Solido con fondo piatto (z0), pareti verticali e cima data da height_fn(q, s).

    outline: punti 2D (Vector) in ordine antiorario, forma stellata rispetto al
    baricentro. s = 1 sul bordo, 0 al centro. La cima e' un campo di altezze:
    nessuno sbalzo, stampabile senza supporti.
    """
    bm = bmesh.new()
    c = sum(outline, Vector((0, 0))) / len(outline)
    n = len(outline)
    bottom = [bm.verts.new((p.x, p.y, z0)) for p in outline]
    ring_verts = []
    for k in range(rings, 0, -1):
        s = k / rings
        ring = []
        for p in outline:
            q = c + (p - c) * s
            ring.append(bm.verts.new((q.x, q.y, height_fn(q, s))))
        ring_verts.append(ring)
    top_c = bm.verts.new((c.x, c.y, height_fn(c, 0.0)))
    bm.faces.new(list(reversed(bottom)))
    outer = ring_verts[0]
    for i in range(n):
        j = (i + 1) % n
        bm.faces.new((bottom[i], bottom[j], outer[j], outer[i]))
    for a, b in zip(ring_verts, ring_verts[1:]):
        for i in range(n):
            j = (i + 1) % n
            bm.faces.new((a[i], a[j], b[j], b[i]))
    inner = ring_verts[-1]
    for i in range(n):
        bm.faces.new((inner[i], inner[(i + 1) % n], top_c))
    return bm


def symmetric_outline(length, halfwidth_fn, pts=40):
    """Contorno simmetrico lungo +x da (0,0) a (length,0); halfwidth_fn(u) con u in [0,1]."""
    upper = [Vector((i / pts * length, halfwidth_fn(i / pts))) for i in range(1, pts)]
    lower = [Vector((p.x, -p.y)) for p in upper]
    return lower + [Vector((length, 0))] + list(reversed(upper)) + [Vector((0, 0))]


def transform(bm, angle, offset):
    ca, sa = math.cos(angle), math.sin(angle)
    for v in bm.verts:
        x, y = v.co.x, v.co.y
        v.co.x = x * ca - y * sa + offset.x
        v.co.y = x * sa + y * ca + offset.y


def make_disc(r, h, segments=128, z=0.0):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=segments, radius1=r, radius2=r, depth=h)
    bmesh.ops.translate(bm, verts=bm.verts, vec=(0, 0, h / 2 + z))
    return bm


def make_stem(y0, y1, radius, zc):
    """Stelo a mezzo tondo lungo -y con estremita arrotondata (va poi tagliato a z=0)."""
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=48, radius1=radius, radius2=radius, depth=y0 - y1)
    bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(math.pi / 2, 3, 'X'))
    bmesh.ops.translate(bm, verts=bm.verts, vec=(0, (y0 + y1) / 2, zc))
    cap = bmesh.new()
    bmesh.ops.create_uvsphere(cap, u_segments=48, v_segments=24, radius=radius + 0.06)
    bmesh.ops.translate(cap, verts=cap.verts, vec=(0, y1, zc))
    return bm, cap


# 'MANIFOLD' per mesh chiuse fatte di parti che si compenetrano (es. girasole)
SOLVER = 'EXACT'


def _apply_boolean(target, operand, op):
    mod = target.modifiers.new(op, 'BOOLEAN')
    mod.operation, mod.solver, mod.object = op, SOLVER, operand
    dg = bpy.context.evaluated_depsgraph_get()
    new_mesh = bpy.data.meshes.new_from_object(target.evaluated_get(dg))
    target.modifiers.remove(mod)
    old = target.data
    mats = list(old.materials)
    target.data = new_mesh
    new_mesh.materials.clear()
    for m in mats:
        new_mesh.materials.append(m)
    bpy.data.meshes.remove(old)


def boolean(target, operand_bm, op):
    tmp = to_object('tmp_' + op, operand_bm)
    _apply_boolean(target, tmp, op)
    bpy.data.objects.remove(tmp, do_unlink=True)


def subtract_silhouette(target, other):
    """Toglie da target la sagoma di other estrusa in verticale (niente sovrapposizioni tra colori).

    Funziona perche' i pezzi hanno pareti verticali: scalare in z conserva la sagoma.
    """
    bm = bmesh.new()
    bm.from_mesh(other.data)
    bmesh.ops.scale(bm, vec=(1, 1, 10), verts=bm.verts)
    bmesh.ops.translate(bm, verts=bm.verts, vec=(0, 0, -5))
    boolean(target, bm, 'DIFFERENCE')


def cut_below_zero(target):
    cut = bmesh.new()
    bmesh.ops.create_cube(cut, size=1.0)
    bmesh.ops.scale(cut, vec=(400, 400, 20), verts=cut.verts)
    bmesh.ops.translate(cut, verts=cut.verts, vec=(0, 0, -10))
    boolean(target, cut, 'DIFFERENCE')


def check(obj, max_parts=1, sul_piano=True):
    """sul_piano=False per pezzi appoggiati su un altro pezzo (non sul piatto)."""
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    bad = [e for e in bm.edges if not e.is_manifold]
    for e in bad[:8]:
        print('  BAD', tuple(round(c, 2) for c in (e.verts[0].co + e.verts[1].co) / 2), flush=True)
    vol = bm.calc_volume(signed=True)
    zmin = min(v.co.z for v in bm.verts)
    # gusci: volume positivo = pezzo, negativo = cavita chiusa (es. sede della calamita annegata)
    seen, parts, cavities = set(), 0, 0
    for v in bm.verts:
        if v in seen:
            continue
        stack, faces = [v], set()
        seen.add(v)
        while stack:
            u = stack.pop()
            faces.update(u.link_faces)
            for e in u.link_edges:
                for w in e.verts:
                    if w not in seen:
                        seen.add(w)
                        stack.append(w)
        vol_shell = sum(f.calc_center_median().dot(f.normal) * f.calc_area() for f in faces) / 3
        if vol_shell >= 0:
            parts += 1
        else:
            cavities += 1
    tris = sum(len(f.verts) - 2 for f in bm.faces)
    bm.free()
    d = obj.dimensions
    print(f'CHECK {obj.name}: nonmanifold={len(bad)} parti={parts} cavita={cavities} volume={vol:.1f}mm3 zmin={zmin:.3f} '
          f'triangoli={tris} dim={d.x:.1f}x{d.y:.1f}x{d.z:.1f}', flush=True)
    assert not bad and vol > 0 and parts <= max_parts
    assert abs(zmin) < 1e-4 or not sul_piano, f'{obj.name} non appoggia sul piano'


def finish(objects, folder, name, max_parts=None, appoggiati=()):
    max_parts = max_parts or {}
    for obj in objects:
        for p in obj.data.polygons:
            p.use_smooth = True
        check(obj, max_parts.get(obj.name, 1), obj.name not in appoggiati)
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(folder, name + '.blend'))
    exec(open(os.path.join(FIORI, 'esporta_blend_3mf.py'), encoding='utf-8').read(), {'__name__': '__main__'})


def render_previews(folder, name, target, ortho_scale, size=(900, 1100), persp_lens=105, shots=None):
    """Anteprime: vista dall'alto ortogonale e vista in prospettiva."""
    out = os.path.join(folder, 'anteprime')
    os.makedirs(out, exist_ok=True)
    scene = bpy.context.scene
    for engine in ('BLENDER_EEVEE', 'BLENDER_EEVEE_NEXT', 'CYCLES'):
        try:
            scene.render.engine = engine
            break
        except TypeError:
            pass
    scene.render.resolution_x, scene.render.resolution_y = size
    scene.world = scene.world or bpy.data.worlds.new('World')
    scene.world.use_nodes = True
    bg = next(n for n in scene.world.node_tree.nodes if n.type == 'BACKGROUND')
    bg.inputs[0].default_value = (0.42, 0.42, 0.42, 1)
    bg.inputs[1].default_value = 0.6
    scene.view_settings.view_transform = 'Standard'
    sun = bpy.data.objects.new('Sole', bpy.data.lights.new('Sole', 'SUN'))
    sun.data.energy = 3.5
    sun.rotation_euler = (math.radians(35), math.radians(-25), math.radians(20))
    scene.collection.objects.link(sun)
    cam = bpy.data.objects.new('Camera', bpy.data.cameras.new('Camera'))
    cam.data.clip_end = 3000
    scene.collection.objects.link(cam)
    scene.camera = cam
    target = Vector(target)
    # shots: lista di (nome_file, direzione verso la camera, ortho_scale o None = prospettiva)
    shots = shots or [(name + '_fronte.png', (0, -0.001, 1), ortho_scale),
                      (name + '_prospettiva.png', (0.55, -0.9, 0.75), None)]
    for fname, direction, ortho in shots:
        cam.location = target + Vector(direction).normalized() * 330
        cam.rotation_euler = (target - cam.location).to_track_quat('-Z', 'Y').to_euler()
        if ortho:
            cam.data.type, cam.data.ortho_scale = 'ORTHO', ortho
        else:
            cam.data.type, cam.data.lens = 'PERSP', persp_lens
        scene.render.filepath = os.path.join(out, fname)
        bpy.ops.render.render(write_still=True)
        print('RENDER', scene.render.filepath, flush=True)
    bpy.data.objects.remove(sun, do_unlink=True)
    bpy.data.objects.remove(cam, do_unlink=True)


# ---- sede calamita (uguale per tutti i fiori) ----
CALAMITA_D, CALAMITA_H = 8.0, 2.0   # calamita al neodimio a disco 8 x 2 mm
GIOCO_D, GIOCO_H = 0.4, 0.2         # tolleranze: foro Ø8.4 x 2.2 mm
TETTO_MIN = 0.8                     # materiale minimo sopra la calamita
FONDO = 0.4                         # calamita annegata: fondo sotto la calamita (2 layer da 0.2)


def bvh_triangoli(obj):
    """BVH dai triangoli reali della mesh: con n-gon concavi (es. fondi tagliati) FromPolygons sbaglia."""
    from mathutils.bvhtree import BVHTree
    me = obj.data
    me.calc_loop_triangles()
    return BVHTree.FromPolygons([v.co[:] for v in me.vertices], [t.vertices[:] for t in me.loop_triangles])


def _hits_up(bvh, x, y, z0):
    """Tutte le intersezioni di un raggio verticale verso l'alto: lista di (z, normale_z).

    Il punto e' spostato di pochi centesimi: un raggio che passa esattamente per un vertice
    (es. il centro di un disco a ventaglio) puo' scivolare tra i triangoli.
    """
    out, o = [], Vector((x + 0.0137, y + 0.0071, z0))
    while True:
        hit = bvh.ray_cast(o, Vector((0, 0, 1)))
        if hit[0] is None:
            return out
        out.append((hit[0].z, hit[1].z))
        o = hit[0] + Vector((0, 0, 1e-4))


def foro_calamita(obj, center=(0.0, 0.0), parete_min=1.0, annegata=True):
    """Sede per la calamita. annegata=True: cavita chiusa da FONDO a FONDO + 2.2 mm; la stampa
    si mette in pausa alla quota del soffitto, si inserisce la calamita e si riprende.
    annegata=False: foro aperto sul fondo (z = 0), calamita incollata dopo la stampa.

    Controlli: materiale sopra la calamita >= TETTO_MIN (anche se sopra c'e' una
    cavita interna chiusa) e parete laterale piena per almeno parete_min mm.
    """
    from mathutils.bvhtree import BVHTree
    r = (CALAMITA_D + GIOCO_D) / 2
    h = CALAMITA_H + GIOCO_H
    z_bot = FONDO if annegata else -1.0
    top = (FONDO + h) if annegata else h
    hole = make_disc(r, top - z_bot, segments=96, z=z_bot)
    bmesh.ops.translate(hole, verts=hole.verts, vec=(center[0], center[1], 0))
    boolean(obj, hole, 'DIFFERENCE')
    bvh = bvh_triangoli(obj)
    roof = 99.0
    for k in range(6):
        rr = (r - 0.05) * k / 5
        for i in range(24):
            a = 2 * math.pi * i / 24
            hits = _hits_up(bvh, center[0] + rr * math.cos(a), center[1] + rr * math.sin(a), top + 1e-3)
            if not hits:
                roof = 0.0                         # foro passante
            elif hits[0][1] > 0:                   # siamo nel pieno: si esce dalla superficie
                roof = min(roof, hits[0][0] - top)
            else:                                  # cavita interna: conta lo strato pieno successivo
                roof = min(roof, hits[1][0] - hits[0][0] if len(hits) > 1 else 0.0)
    wall_ok = True
    for rr in (r + 0.3, r + parete_min):
        for i in range(36):
            a = 2 * math.pi * i / 36
            hits = _hits_up(bvh, center[0] + rr * math.cos(a), center[1] + rr * math.sin(a), -1.0)
            if not hits or hits[0][0] > 0.05 or (len(hits) > 1 and hits[1][0] < top + 0.3):
                if wall_ok:
                    print(f'  parete insufficiente a r={rr:.2f}, angolo {math.degrees(a):.0f}: '
                          f'{[(round(z, 2), round(n, 2)) for z, n in hits[:4]]}', flush=True)
                wall_ok = False
    if annegata:  # il fondo sotto la calamita deve essere pieno e chiuso
        for k in range(4):
            for i in range(12):
                a = 2 * math.pi * i / 12
                rr = (r - 0.05) * k / 3
                hits = _hits_up(bvh, center[0] + rr * math.cos(a), center[1] + rr * math.sin(a), -1.0)
                assert hits and hits[0][0] < 0.05 and abs(hits[1][0] - FONDO) < 0.02, f'fondo non chiuso: {hits[:3]}'
    print(f'{obj.name}: sede calamita Ø{2 * r:.1f} x {h:.1f} mm in {center}, '
          f'{"annegata da " + format(z_bot, ".1f") + " a " + format(top, ".1f") + " mm" if annegata else "aperta sul fondo"}, '
          f'materiale sopra {roof:.2f} mm, parete >= {parete_min} mm: {"ok" if wall_ok else "NO"}', flush=True)
    if annegata:
        print(f'PAUSA: inserire la calamita prima del layer che parte da {top:.1f} mm '
              f'(con layer da 0.2: layer con quota {top + 0.2:.1f} mm)', flush=True)
    assert roof >= TETTO_MIN, 'tetto sopra la calamita troppo sottile'
    assert wall_ok, 'parete intorno alla calamita troppo sottile'
