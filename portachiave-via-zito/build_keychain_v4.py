"""Portachiavi FDM 'LOCALI PARROCCHIALI - VIA ZITO'  (v4: chiesa incisa, testi piu' grandi)
Run:  blender -b -P build_keychain_v2.py
Unita': mm (1 BU = 1 mm). Retro piatto sul piatto di stampa, nessun supporto.
"""
import bpy, bmesh, math, os

# ---------------- parametri ----------------
D = 45.0            # diametro medaglione
BASE_T = 3.0        # spessore base
RELIEF = 1.0        # rialzo cornice/edificio  -> totale 4.0 (< 4.5)
BORDER_W = 1.5      # larghezza cornice
LOOP_D = 12.0       # diametro esterno asola (>= 11)
HOLE_D = 5.0        # foro
ENGR = 0.7          # profondita' incisione (0.6-0.8)
FONT_PATH = r"C:\Windows\Fonts\ariblk.ttf"   # sans-serif molto robusto
FONT2_PATH = "C:/Windows/Fonts/arialbd.ttf"  # bold stretto per le righe lunghe
OUT = os.path.dirname(os.path.abspath(__file__))
NAME = "portachiave_via_zito_v4"

R = D / 2


# ---------------- utilita' ----------------
def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    u = bpy.context.scene.unit_settings
    u.system = 'METRIC'; u.scale_length = 0.001; u.length_unit = 'MILLIMETERS'


def cyl(name, d, h, x=0.0, y=0.0, z0=0.0, verts=160):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=d / 2, depth=h, location=(x, y, z0 + h / 2))
    o = bpy.context.object; o.name = name; return o


def prism(name, pts, z0, h):
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    f = bm.faces.new([bm.verts.new((x, y, z0)) for x, y in pts])
    if f.normal.z < 0: f.normal_flip()
    r = bmesh.ops.extrude_face_region(bm, geom=[f])
    bmesh.ops.translate(bm, vec=(0, 0, h), verts=[v for v in r['geom'] if isinstance(v, bmesh.types.BMVert)])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o); return o


def boolean(target, tool, op, delete=True):
    m = target.modifiers.new("bool", 'BOOLEAN'); m.operation = op; m.object = tool; m.solver = 'EXACT'
    bpy.context.view_layer.objects.active = target
    bpy.ops.object.modifier_apply(modifier=m.name)
    if delete: bpy.data.objects.remove(tool, do_unlink=True)


def arch(w, y0, y1, n=24):
    r = w / 2; yc = y1 - r
    pts = [(-r, y0), (r, y0), (r, yc)]
    pts += [(r * math.cos(math.pi * k / n), yc + r * math.sin(math.pi * k / n)) for k in range(1, n)]
    pts += [(-r, yc)]
    return pts


def move(pts, dx=0.0, dy=0.0): return [(x + dx, y + dy) for x, y in pts]


# ---------------- funzioni richieste ----------------
def create_base():
    return cyl("Portachiave", D, BASE_T)


def create_loop(body):
    """Asola integrata, raccordata al disco con un collo e alta quanto cornice (rinforzata)."""
    cy = R + LOOP_D / 2 - 3.0                      # sovrapposta al disco
    t = BASE_T + RELIEF
    boolean(body, cyl("loop", LOOP_D, t, y=cy), 'UNION')
    # raccordo (collo) ai lati: trapezio concavo tra asola e disco
    neck = [(-4.2, R - 2.0), (4.2, R - 2.0), (3.2, cy + 1.0), (-3.2, cy + 1.0)]
    boolean(body, prism("neck", neck, 0.0, t), 'UNION')
    return cy


def create_border(body):
    ring = cyl("ring", D, RELIEF, z0=BASE_T)
    boolean(ring, cyl("ringin", D - 2 * BORDER_W, RELIEF * 3, z0=BASE_T - 1), 'DIFFERENCE')
    boolean(body, ring, 'UNION')


S, OFFY, OFFX = 0.85, 3.6, 0.9     # scala edificio e posizione (centrato sul disco)

def P(pts): return [((x + OFFX / S) * S, y * S + OFFY) for x, y in pts]


def offset_poly(pts, d):
    """Offset interno (mitre) di un poligono semplice di distanza d."""
    n = len(pts)
    area = sum(pts[k][0] * pts[(k + 1) % n][1] - pts[(k + 1) % n][0] * pts[k][1] for k in range(n))
    if area < 0: pts = pts[::-1]
    out = []
    for k in range(n):
        p0, p1, p2 = pts[k - 1], pts[k], pts[(k + 1) % n]
        def nrm(a, b):
            dx, dy = b[0] - a[0], b[1] - a[1]; l = math.hypot(dx, dy); return (-dy / l, dx / l)
        n1, n2 = nrm(p0, p1), nrm(p1, p2)
        k_ = 1 + n1[0] * n2[0] + n1[1] * n2[1]
        out.append((p1[0] + d * (n1[0] + n2[0]) / k_, p1[1] + d * (n1[1] + n2[1]) / k_))
    return out


def ring_prism(name, pts, thick, z0, h):
    """Linea di spessore 'thick' lungo il perimetro, estrusa (poligono - poligono offsettato)."""
    ring = prism(name, pts, z0, h)
    boolean(ring, prism(name + "_in", offset_poly(pts, thick), z0 - 1, h + 2), 'DIFFERENCE')
    return ring


def create_building(body):
    """Chiesetta INCISA: contorno a gradini scavato, porta/finestre/croce scavate piene,
    falce e linea a 'sorriso' incise. Niente rilievo."""
    zc = BASE_T - ENGR
    hh = ENGR + 0.5
    outline = [(-12, 0), (10, 0), (10, 8.5), (5.5, 8.5), (3.3, 11.3), (1.7, 11.3),
               (-0.5, 8.5), (-5, 8.5), (-5, 4.5), (-12, 4.5)]
    boolean(body, ring_prism("outline", P(outline), 0.9, zc, hh), 'DIFFERENCE')
    cut = lambda nm, pts: boolean(body, prism(nm, P(pts), zc, hh), 'DIFFERENCE')
    cut("door", move(arch(3.4, 0.9, 5.6), 2.5))
    cut("winL", move(arch(3.0, 2.0, 6.9), -2.1))
    cut("winR", move(arch(3.0, 2.0, 6.9), 7.1))
    cut("winT", move(arch(1.4, 9.0, 10.4), 2.5))
    cut("cross", [(1.7, 12.2), (1.7, 13.5), (0.4, 13.5), (0.4, 15.0), (1.7, 15.0), (1.7, 17.2),
                  (3.3, 17.2), (3.3, 15.0), (4.6, 15.0), (4.6, 13.5), (3.3, 13.5), (3.3, 12.2)])
    # falce
    cx, cy, rr, n = 0.5, 6.5, 13.5, 40
    outer, inner = [], []
    for k in range(n + 1):
        t = k / n; a = math.radians(105 + 65 * t)
        w = 0.9 + 0.5 * math.sin(math.pi * t)
        outer.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
        inner.append((cx + (rr - w) * math.cos(a), cy + (rr - w) * math.sin(a)))
    boolean(body, prism("crescent", outer + inner[::-1], zc, hh), 'DIFFERENCE')
    # linea a sorriso
    top, bot = [], []
    for k in range(n + 1):
        t = k / n; x = -13.0 + 26.0 * t
        yc = 2.6 - 1.9 * (1 - (x / 13.0) ** 2)
        w = 0.5 + 0.35 * math.sin(math.pi * t)
        top.append((x, yc + w)); bot.append((x, yc - w))
    boolean(body, prism("swoosh", top + bot[::-1], zc, hh), 'DIFFERENCE')


def create_text(s, cap_height, y, max_w, font, flip=False):
    """Testo -> mesh. cap_height ~ altezza maiuscole in mm; scala in larghezza se eccede max_w."""
    bpy.ops.object.text_add(location=(0, y, 0))
    t = bpy.context.object
    t.data.body = s; t.data.font = font
    t.data.size = cap_height / 0.72
    t.data.align_x = 'CENTER'; t.data.align_y = 'CENTER'
    t.data.extrude = 1.0                     # +-1 mm attorno al piano
    t.data.resolution_u = 12
    bpy.ops.object.convert(target='MESH')
    t = bpy.context.object
    bpy.context.view_layer.update()
    if t.dimensions.x > max_w:
        k = max_w / t.dimensions.x
        t.scale.x = t.scale.y = k
        bpy.context.view_layer.update()
    return t


def engrave_text(body, tobj, z_top):
    """Incide: il testo va da z_top-ENGR a z_top+2."""
    tobj.location.z = z_top - ENGR + 1.0
    bpy.context.view_layer.update()
    boolean(body, tobj, 'DIFFERENCE')


def validate_model(obj):
    bm = bmesh.new(); bm.from_mesh(obj.data)
    nonman = sum(1 for e in bm.edges if not e.is_manifold)
    loose = sum(1 for v in bm.verts if not v.link_edges)
    vol = bm.calc_volume(signed=True)
    bm.free()
    d = obj.dimensions
    print(f"VALIDATE dims={d.x:.2f}x{d.y:.2f}x{d.z:.2f} mm  nonmanifold_edges={nonman} loose_verts={loose} volume={vol:.1f} mm3")
    return nonman, loose, vol


def export_stl(obj, path):
    bpy.ops.object.select_all(action='DESELECT'); obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    try:
        bpy.ops.wm.stl_export(filepath=path, export_selected_objects=True)
    except Exception:
        bpy.ops.export_mesh.stl(filepath=path, use_selection=True)


def clean_mesh(obj):
    bm = bmesh.new(); bm.from_mesh(obj.data)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=0.001)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(obj.data); bm.free()


# ---------------- main ----------------
def main():
    reset_scene()
    font = bpy.data.fonts.load(FONT_PATH); font2 = bpy.data.fonts.load(FONT2_PATH)
    body = create_base()
    create_loop(body)
    create_border(body)
    create_building(body)
    # foro passante (dopo asola e rinforzi)
    cy = R + LOOP_D / 2 - 3.0
    boolean(body, cyl("hole", HOLE_D, BASE_T * 4, y=cy, z0=-1), 'DIFFERENCE')

    z_top = BASE_T                       # incisioni nel piano base
    lines = (("LOCALI", 6.0, -4.0, 28.0, font),
             ("PARROCCHIALI", 3.8, -10.0, 31.0, font2),
             ("VIA ZITO", 3.8, -15.2, 22.0, font2))
    for s_, cap, y, mw, fnt in lines:
        t = create_text(s_, cap, y, mw, fnt)
        engrave_text(body, t, z_top)

    clean_mesh(body)
    nonman, loose, vol = validate_model(body)
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, NAME + ".blend"))
    export_stl(body, os.path.join(OUT, NAME + ".stl"))
    print("OK", NAME)


if __name__ == "__main__":
    main()
