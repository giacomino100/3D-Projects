"""Ricostruzione dai sorgenti puliti e controlli geometrici delle correzioni."""
import bpy
import bmesh
import math
import os
import sys
from collections import defaultdict
from mathutils import Vector, Matrix
from mathutils.bvhtree import BVHTree


FOLDER = os.path.dirname(bpy.data.filepath)


def normalize_mesh(mesh):
    bm = bmesh.new()
    bm.from_mesh(mesh)
    bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
    bm.to_mesh(mesh)
    bm.free()
    mesh.update()


def bvh_for(obj):
    return BVHTree.FromPolygons(
        [v.co.copy() for v in obj.data.vertices],
        [tuple(p.vertices) for p in obj.data.polygons],
    )


def mesh_components(mesh):
    parents = list(range(len(mesh.vertices)))
    def find(a):
        while parents[a] != a:
            parents[a] = parents[parents[a]]
            a = parents[a]
        return a
    for edge in mesh.edges:
        a, b = (find(int(i)) for i in edge.vertices)
        if a != b:
            parents[b] = a
    groups = defaultdict(list)
    for v in mesh.vertices:
        groups[find(v.index)].append(v.index)
    return sorted(groups.values(), key=len, reverse=True)


def mesh_check(obj):
    groups = mesh_components(obj.data)
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    bad_edges = sum(not edge.is_manifold for edge in bm.edges)
    volume = bm.calc_volume(signed=True)
    bm.free()
    report = {'components': len(groups), 'nonmanifold_edges': bad_edges, 'volume': round(volume, 4)}
    print('MESH_CHECK', obj.name, report, flush=True)
    assert len(groups) == 1, f'Corpo non connesso: {report}'
    assert bad_edges == 0, f'Mesh aperta: {report}'
    assert volume > 0
    return report


def boolean(obj, operand, operation='UNION', solver='EXACT'):
    bpy.context.view_layer.objects.active = obj
    modifier = obj.modifiers.new(operation + '_' + operand.name, 'BOOLEAN')
    modifier.operation = operation
    modifier.solver = solver
    modifier.object = operand
    bpy.ops.object.modifier_apply(modifier=modifier.name)
    bpy.data.objects.remove(operand, do_unlink=True)
    obj.data.update()


def create_mesh(name, vertices, faces, material=None):
    data = bpy.data.meshes.new(name)
    data.from_pydata(vertices, [], faces)
    normalize_mesh(data)
    if material:
        data.materials.append(material)
    obj = bpy.data.objects.new(name, data)
    bpy.context.scene.collection.objects.link(obj)
    return obj


def soften_flower_back(mesh, extra, band=.65, original_z=.2201):
    """Raccordo sul solo retro: profilo esterno originale e rinforzo interno pieno."""
    bm=bmesh.new()
    bm.from_mesh(mesh)
    rear={f for f in bm.faces if all(abs(v.co.z-original_z)<.0002 for v in f.verts)}
    rear_edges={e for f in rear for e in f.edges}
    outline=[e for e in rear_edges if sum(f in rear for f in e.link_faces)==1
             and ((e.verts[0].co+e.verts[1].co)*.5).xy.length>8]
    assert outline
    walls,wall_faces=[],[]
    for edge in outline:
        a,b=(v.co for v in edge.verts)
        if (a-b).length<.000001:
            continue
        i=len(walls)
        walls.extend([(a.x,a.y,-1),(b.x,b.y,-1),(b.x,b.y,1),(a.x,a.y,1)])
        wall_faces.append((i,i+1,i+2,i+3))
    boundary=BVHTree.FromPolygons(walls,wall_faces)
    cache={}
    def distance(p):
        key=(round(float(p.x),7),round(float(p.y),7))
        if key not in cache:
            cache[key]=boundary.find_nearest(Vector((p.x,p.y,0)))[3]
        return cache[key]
    # Le triangolazioni originali hanno ventagli lunghi fino a decine di mm.
    # Si infittisce solo la fascia interessata per rappresentare la curva reale.
    for iteration in range(9):
        rear=[f for f in bm.faces if all(abs(v.co.z-original_z)<.0002 for v in f.verts)]
        bmesh.ops.triangulate(bm,faces=rear)
        rear=[f for f in bm.faces if all(abs(v.co.z-original_z)<.0002 for v in f.verts)]
        edges={e for f in rear for e in f.edges}
        split=[]
        for edge in edges:
            if edge.calc_length()<=.20:
                continue
            a,b=(v.co for v in edge.verts)
            if min(distance(a),distance(b),distance((a+b)*.5))<band+.15:
                split.append(edge)
        print('BACK_RIM_SUBDIVISION',iteration,'edges',len(split),flush=True)
        if not split:
            break
        bmesh.ops.subdivide_edges(bm,edges=split,cuts=1,use_grid_fill=True)
    rear=[f for f in bm.faces if all(abs(v.co.z-original_z)<.0002 for v in f.verts)]
    vertices={v for f in rear for v in f.verts}
    distances={v:distance(v.co) for v in vertices}
    for face in rear:
        face.smooth=any(0<distances[v]<band for v in face.verts)
    for vertex in vertices:
        t=min(1.0,max(0.0,distances[vertex]/band))
        weight=t*t*(3-2*t)
        vertex.co.z=original_z-extra*weight
    bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
    bm.to_mesh(mesh)
    bm.free()
    mesh.update()
    print('BACK_RIM_SOFTENED width_mm',band,'core_extra_mm',extra,flush=True)


def configure_view(direction, up, target, span):
    rotation = Matrix((Vector(up).cross(Vector(direction)).normalized(), Vector(up).normalized(), Vector(direction).normalized())).transposed().to_quaternion()
    for screen in bpy.data.screens:
        for area in screen.areas:
            if area.type == 'VIEW_3D':
                space = area.spaces.active
                space.region_3d.view_rotation = rotation
                space.region_3d.view_location = target
                space.region_3d.view_distance = span * 1.15
                space.region_3d.view_perspective = 'ORTHO'
                space.clip_end = 5000
                space.shading.type = 'SOLID'
                space.shading.color_type = 'MATERIAL'
                space.shading.show_cavity = True
                space.shading.cavity_type = 'BOTH'
                space.overlay.show_floor = False


def render_view(filename, direction, up, target, span):
    scene = bpy.context.scene
    camera = bpy.data.objects.new('Camera_verifica', bpy.data.cameras.new('Camera_verifica'))
    scene.collection.objects.link(camera)
    scene.camera = camera
    direction = Vector(direction).normalized()
    up = Vector(up).normalized()
    right = up.cross(direction).normalized()
    up = direction.cross(right).normalized()
    camera.rotation_euler = Matrix((right, up, direction)).transposed().to_euler()
    camera.location = Vector(target) + direction * span * 3
    camera.data.type = 'ORTHO'
    camera.data.ortho_scale = span
    scene.render.engine = 'BLENDER_WORKBENCH'
    scene.render.resolution_x = 800
    scene.render.resolution_y = 1000
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = 'PNG'
    scene.display.shading.light = 'STUDIO'
    scene.display.shading.color_type = 'MATERIAL'
    scene.display.shading.show_shadows = True
    scene.display.shading.show_cavity = True
    scene.display.shading.cavity_type = 'BOTH'
    scene.display.shading.background_type = 'WORLD'
    if scene.world is None:
        scene.world = bpy.data.worlds.new('Sfondo_verifica')
    scene.world.color = (0.16, 0.16, 0.16)
    scene.render.filepath = os.path.join(FOLDER, filename)
    bpy.ops.render.render(write_still=True)
    bpy.data.objects.remove(camera, do_unlink=True)


def sunflower():
    reinforced = '--rinforzato' in sys.argv
    extra_thickness = 1.0 if reinforced else 0.0
    back_extra = .6 if '--retro-spesso' in sys.argv else 0.0
    back_z = .2201-back_extra
    flat_stem = '--stelo-piatto' in sys.argv
    curved_leaves = '--foglie-bombate' in sys.argv
    refined_profile = '--profilo-convesso' in sys.argv
    soft_back = '--raccordo-retro' in sys.argv
    rounded_joint = '--innesto-arrotondato' in sys.argv
    straight_joint = '--stelo-diretto' in sys.argv
    natural_leaves = '--foglie-naturali' in sys.argv
    lower_stem_front = '--stelo-frontale-ridotto' in sys.argv
    body = bpy.data.objects['GIRASOLE_petali_e_gambo']
    for obj in list(bpy.context.scene.objects):
        if obj.name.startswith('FOGLIA_'):
            bpy.data.objects.remove(obj, do_unlink=True)
    # Mantiene solo l'isola originale della corolla e rimuove il vecchio gambo.
    groups = mesh_components(body.data)
    keep = set(groups[0])
    bm = bmesh.new()
    bm.from_mesh(body.data)
    bm.verts.ensure_lookup_table()
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.index not in keep], context='VERTS')
    bm.to_mesh(body.data)
    bm.free()
    if back_extra and soft_back:
        soften_flower_back(body.data,back_extra)
    elif back_extra:
        # Estende solo il piano posteriore della corolla verso il retro.
        # Coordinate XY, rilievi anteriori e disco centrale restano quelli approvati.
        for vertex in body.data.vertices:
            if abs(vertex.co.z-.2201)<.0002:
                vertex.co.z -= back_extra
    normalize_mesh(body.data)
    before_bvh = bvh_for(body)

    green = bpy.data.materials.new('Gambo_e_foglie_verde')
    green.diffuse_color = (0.16, 0.38, 0.07, 1)
    yellow = bpy.data.materials.new('Petali_gialli')
    yellow.diffuse_color = (0.95, 0.58, 0.025, 1)
    brown = bpy.data.materials.new('Centro_marrone')
    brown.diffuse_color = (0.20, 0.075, 0.025, 1)
    body.data.materials.clear()
    body.data.materials.append(yellow)
    bpy.data.objects['girasoli_008'].data.materials.clear()
    bpy.data.objects['girasoli_008'].data.materials.append(brown)

    # Sezione circolare continua fino all'inserimento nella corolla.
    # L'estremita alta e' inglobata nel petalo; la quota bassa resta -65 mm.
    sections = [(-24, 1.55, 1.55), (-26, 1.55, 1.55), (-28, 1.55, 1.55),
                (-29.8, 1.55, 1.55), (-30.8, 1.55, 1.55),
                (-37, 1.52, 1.52), (-46, 1.62, 1.62), (-55, 1.42, 1.42),
                (-61.5, 1.24, 1.24), (-63.8, 1.20, 1.20)]
    if reinforced:
        # +1 mm sul diametro equivale a +0.5 mm sul raggio. Il raccordo
        # superiore si allarga progressivamente nel petalo esistente.
        sections = [(y,rx+.5*min(1.0,max(0.0,(-y-24)/4)),
                       rz+.5*min(1.0,max(0.0,(-y-24)/4))) for y,rx,rz in sections]
    if refined_profile:
        # Collo stretto dietro il petalo, poi raccordo progressivo al fusto.
        sections = [(-24,1.30,1.55),(-26,1.40,1.80),(-27.8,1.45,2.05),
                    (-28.2,1.52,2.05),(-28.8,1.72,2.05),(-29.6,1.96,2.05),
                    (-30.8,2.05,2.05)]+[s for s in sections if s[0]<=-37]
    if rounded_joint:
        # Modifica locale: il collo resta dietro il petalo e si apre nel fusto
        # con curvatura continua, mantenendo il rinforzo del resto dello stelo.
        neck=[(-24,1.30,1.20),(-25,1.35,1.20),(-26,1.40,1.20),
              (-27,1.43,1.20),(-27.8,1.45,1.20)]
        for i in range(1,17):
            t=i/16
            s=t*t*t*(t*(6*t-15)+10)
            neck.append((-27.8-4*t,1.45+.60*s,1.20+.85*s))
        sections=neck+[section for section in sections if section[0]<=-37]
    if straight_joint:
        # Stessa larghezza fino al petalo: nessun collo e nessuna spalla.
        # Solo l'estremita frontale si chiude dietro al petalo in 0.8 mm.
        direct=[(-24,2.05,1.20),(-26,2.05,1.20),(-27.8,2.05,1.20)]
        for i in range(1,9):
            t=i/8
            s=t*t*(3-2*t)
            direct.append((-27.8-.8*t,2.05,1.20+.85*s))
        sections=direct+[(-30,2.05,2.05),(-33.5,2.05,2.05)]+[s for s in sections if s[0]<=-37]
    tip_radius = 1.2+extra_thickness/2
    tip_center_y = -65+tip_radius
    tip_center_z = back_z+tip_radius
    sections[-1] = (tip_center_y,tip_radius,tip_radius)
    radial_segments = 49 if rounded_joint or straight_joint else (25 if flat_stem else 48)
    vertices = []
    for y, radius_x, radius_z in sections:
        center_z = back_z + radius_z
        for j in range(radial_segments):
            if flat_stem:
                angle = math.pi*j/(radial_segments-1)
                # Profilo a D: arco frontale semiellittico, diametro posteriore
                # piano. Larghezza e spessore massimi rinforzati sono conservati.
                depth = 2*radius_z
                if refined_profile:
                    t = min(1.0,max(0.0,(-y-27.8)/3.0))
                    transition = t*t*(3-2*t)
                    depth = 2.40+(depth+.6-2.40)*transition
                if lower_stem_front:
                    t=min(1.0,max(0.0,(-y-27.8)/.8))
                    depth-=.4*t*t*(3-2*t)
                z = back_z+depth*math.sin(angle)
            else:
                angle = math.tau*j/radial_segments
                z = center_z+radius_z*math.sin(angle)
            vertices.append((radius_x*math.cos(angle), y, z))
    for i in range(1, 8):
        angle = (math.pi/2)*i/8
        radius = tip_radius*math.cos(angle)
        y = tip_center_y-tip_radius*math.sin(angle)
        for j in range(radial_segments):
            if flat_stem:
                a = math.pi*j/(radial_segments-1)
                depth = 2*radius+(.6*math.cos(angle) if refined_profile else 0)
                if lower_stem_front:
                    depth-=.4*math.cos(angle)
                z = back_z+depth*math.sin(a)
            else:
                a = math.tau*j/radial_segments
                z = tip_center_z+radius*math.sin(a)
            vertices.append((radius*math.cos(a),y,z))
    ring_count = len(vertices)//radial_segments
    faces = [tuple(reversed(range(radial_segments)))]
    for i in range(ring_count - 1):
        a, b = i * radial_segments, (i + 1) * radial_segments
        for j in range(radial_segments):
            k = (j + 1) % radial_segments
            faces.append((a + j, a + k, b + k, b + j))
    pole = len(vertices)
    vertices.append((0,-65,back_z if flat_stem else tip_center_z))
    last = (ring_count-1)*radial_segments
    for j in range(radial_segments):
        faces.append((last+j,last+(j+1)%radial_segments,pole))
    stem = create_mesh('Gambo_tondo_fuso_nei_petali', vertices, faces, green)
    for polygon in stem.data.polygons:
        is_back = flat_stem and all(abs(stem.data.vertices[i].co.z-back_z)<.00001 for i in polygon.vertices)
        polygon.use_smooth = polygon.index != 0 and not is_back

    # La sezione e' circolare anche nel tratto d'innesto nel fiore.
    for y, radius_x, radius_z in sections:
        if not flat_stem:
            assert abs(radius_x-radius_z) < 1e-6

    leaf_centers = []
    leaf_center_heights = []
    leaf_arc_lengths = []
    leaf_ns,leaf_nc=(80,40) if natural_leaves else (64,32)
    petal_reference=[]
    if natural_leaves:
        # Campiona una vera superficie della corolla, compresi i suoi solchi
        # morbidi e la curvatura asimmetrica, anziche' usare una piastra bombata.
        for i in range(leaf_ns+1):
            t=i/leaf_ns
            y=16.0+11.4*t
            runs=[]
            run=[]
            for j in range(151):
                x=-7.5+j*.1
                hit=before_bvh.ray_cast(Vector((x,y,20)),Vector((0,0,-1)))[0]
                if hit is not None:
                    run.append((x,float(hit.z)))
                elif run:
                    runs.append(run)
                    run=[]
            if run:
                runs.append(run)
            assert runs,'Profilo di riferimento del petalo non trovato'
            run=min(runs,key=lambda r:abs((r[0][0]+r[-1][0])*.5))
            middle=(run[0][0]+run[-1][0])*.5
            half=(run[-1][0]-run[0][0])*.485
            row=[]
            for j in range(leaf_nc+1):
                s=2*j/leaf_nc-1
                x=middle+half*s
                hit=before_bvh.ray_cast(Vector((x,y,20)),Vector((0,0,-1)))[0]
                row.append(float(hit.z) if hit is not None else min(run,key=lambda p:abs(p[0]-x))[1])
            petal_reference.append(row)
        # Elimina soltanto la grana della triangolazione del riferimento,
        # mantenendo i solchi e la forma reale del singolo petalo esposto.
        for smoothing_pass in range(2):
            smooth=[]
            for i in range(leaf_ns+1):
                row=[]
                for j in range(leaf_nc+1):
                    total=weight=0.0
                    for di,wi in ((-1,1),(0,2),(1,1)):
                        for dj,wj in ((-1,1),(0,2),(1,1)):
                            ii=min(leaf_ns,max(0,i+di))
                            jj=min(leaf_nc,max(0,j+dj))
                            total+=petal_reference[ii][jj]*wi*wj
                            weight+=wi*wj
                    row.append(total/weight)
                smooth.append(row)
            petal_reference=smooth
        reference_min=min(min(row) for row in petal_reference)
        reference_max=max(max(row) for row in petal_reference)
        print('NATURAL_LEAF_REFERENCE',reference_min,reference_max,'samples',(leaf_ns+1)*(leaf_nc+1),flush=True)

    def leaf(name, base, control, tip, half_width):
        base, control, tip = Vector(base), Vector(control), Vector(tip)
        size_factor = 1.15
        # Crescita del 15% con la punta alla quota approvata: la foglia si
        # sviluppa verso l'esterno e leggermente in basso, lontano dai petali.
        lower_shift = (tip.y-base.y)*(size_factor-1)
        ns, nc = leaf_ns, leaf_nc
        positions = []
        centerline = []
        length = (tip - base).length
        for i in range(ns + 1):
            t = i / ns
            center = (1 - t) ** 2 * base + 2 * (1 - t) * t * control + t ** 2 * tip
            if refined_profile:
                center = base+(center-base)*1.10
            tangent = (2 * (1 - t) * (control - base) + 2 * t * (tip - control)).normalized()
            side = Vector((-tangent.y, tangent.x))
            width = .19 + half_width * math.sin(math.pi * t) ** 1.12
            for j in range(nc + 1):
                s = 2 * j / nc - 1
                p = center + side * width * s * (1 + .06 * s * math.sin(math.pi*t))
                p = base+(p-base)*size_factor
                p.y -= lower_shift
                if natural_leaves:
                    anchor=base-Vector((0,lower_shift))
                    p=anchor+(p-anchor)*1.10
                if j==nc//2:
                    centerline.append(p.copy())
                    if i==ns//2:
                        leaf_centers.extend((float(p.x),float(p.y)))
                envelope = math.sin(math.pi * t) ** .7
                midrib = .22 * math.exp(-(s * width / .28) ** 2)
                veins = sum(.11 * math.exp(-((t - start - .15 * abs(s)) * length / .14) ** 2)
                            for start in (.26, .45, .64))
                # Rilievo basso e una leggera piega naturale senza ridurre il bordo a zero.
                height = 1.60 + extra_thickness - back_extra + envelope * (.11 * s * s + midrib + veins)
                if curved_leaves:
                    # Convessita' continua sia trasversale sia longitudinale.
                    # Si aggiunge materiale al centro mantenendo il bordo robusto
                    # e il dorso sul piano posteriore di stampa.
                    crown = .75*math.sin(math.pi*t)**.9*max(0.0,1-s*s)**.85
                    height += crown
                if natural_leaves:
                    style=(petal_reference[i][j]-reference_min)/max(.001,reference_max-reference_min)
                    height=(1.60+extra_thickness-back_extra+1.10*style
                            +envelope*(midrib*(.14/.22)+veins*(.06/.11))+.12*t*t
                            +.50*math.sin(math.pi*t)**.8*max(0.0,1-s*s)**.8)
                if i==ns//2 and j==nc//2:
                    leaf_center_heights.append(float(height))
                positions.append((p.x, p.y, height))
        n = len(positions)
        verts = positions + [(p[0], p[1], back_z) for p in positions]
        fs = []
        for i in range(ns):
            for j in range(nc):
                a = i * (nc + 1) + j
                b = a + nc + 1
                fs.extend([(a, b, b + 1, a + 1), (n + a + 1, n + b + 1, n + b, n + a)])
        boundary = list(range(nc+1))
        boundary += [i*(nc+1)+nc for i in range(1, ns+1)]
        boundary += [ns*(nc+1)+j for j in range(nc-1, -1, -1)]
        boundary += [i*(nc+1) for i in range(ns-1, 0, -1)]
        for k, a in enumerate(boundary):
            b = boundary[(k+1) % len(boundary)]
            fs.append((a, n+a, n+b, b))
        obj = create_mesh(name, verts, fs, green)
        for polygon in obj.data.polygons:
            polygon.use_smooth = True
        assert max(p[1] for p in verts) < -32, 'Foglia troppo vicina ai petali'
        mesh_check(obj)
        leaf_arc_lengths.append(sum((b-a).length for a,b in zip(centerline,centerline[1:])))
        return obj

    leaves = [leaf('Foglia_sinistra_curva_nervata', (-.65,-46), (-3.7,-37.9), (-12.0,-33.8), 2.50),
              leaf('Foglia_destra_curva_nervata', (.65,-54), (6.3,-45.6), (13.2,-39.7), 2.40)]
    for obj in leaves:
        boolean(stem, obj)
    mesh_check(stem)
    stem_surface = bvh_for(stem)
    if flat_stem:
        mesh_check(body)
    boolean(body, stem,solver='MANIFOLD' if flat_stem else 'EXACT')
    if flat_stem:
        print('CHECK_BEFORE_JUNCTION_ROUNDING',flush=True)
        mesh_check(body)

    # Raccorda soltanto lo spigolo prodotto dall'intersezione gambo/petalo.
    # I vertici selezionati appartengono a entrambe le superfici originali.
    bm = bmesh.new()
    bm.from_mesh(body.data)
    seam_vertices = set()
    for vertex in bm.verts:
        p = vertex.co
        if abs(p.x) < 2.4 and -28.8 < p.y < -25.5 and p.z > .4:
            on_flower = before_bvh.find_nearest(p)
            on_stem = stem_surface.find_nearest(p)
            if on_flower[0] is not None and on_stem[0] is not None:
                if on_flower[3] < .002 and on_stem[3] < .002:
                    seam_vertices.add(vertex)
    seam_edges = [edge for edge in bm.edges if all(v in seam_vertices for v in edge.verts)]
    print('ROUND_JUNCTION_EDGES',len(seam_edges),flush=True)
    assert seam_edges, 'Raccordo gambo/petalo non individuato'
    rounded = ({'faces':[]} if straight_joint else
               bmesh.ops.bevel(bm,geom=seam_edges,offset=.22,segments=3,
                              profile=.5,affect='EDGES',clamp_overlap=True))
    for face in rounded['faces']:
        face.smooth = True
    bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
    bm.to_mesh(body.data)
    bm.free()
    body.data.update()
    body.name = 'GIRASOLE_corpo_unico_gambo_stile_tulipano'
    green_index = next((i for i, m in enumerate(body.data.materials) if m == green), None)
    if green_index is None:
        body.data.materials.append(green)
        green_index = len(body.data.materials)-1
    for polygon in body.data.polygons:
        if polygon.center.y < -27.95:
            polygon.material_index = green_index
    mesh_check(body)

    # Verifica i petali fuori dalla piccola zona del raccordo autorizzato.
    after_bvh = bvh_for(body)
    for x in (-6, -4, -1, 0, 1, 4, 6):
        for y in (-14, -18, -22, -25, -27):
            if abs(x) < 3 and y < -24:
                continue
            origin, direction = Vector((x,y,20)), Vector((0,0,-1))
            before, after = before_bvh.ray_cast(origin,direction)[0], after_bvh.ray_cast(origin,direction)[0]
            if before is not None:
                assert after is not None and abs(before.z-after.z)<.01, (x,y,before,after)
    if refined_profile or rounded_joint or straight_joint:
        for x in (-.8,-.4,0,.4,.8):
            for y in (-24,-25,-26,-27,-27.6,-27.8):
                origin,direction=Vector((x,y,20)),Vector((0,0,-1))
                before,after=before_bvh.ray_cast(origin,direction)[0],after_bvh.ray_cast(origin,direction)[0]
                if before is not None:
                    assert after is not None and abs(before.z-after.z)<.01,('Petalo coperto',x,y,before,after)
        print('PETAL_FRONT_CLEAR_VERIFIED',flush=True)
    assert abs(min(v.co.y for v in body.data.vertices)+65)<.001
    scene = bpy.context.scene
    scene['foglie_unite_allo_stelo'] = True
    scene['raccordo_gambo'] = 'Sezione circolare fusa nel petalo con raccordo locale arrotondato da 0.22 mm'
    scene['estremita_inferiore_gambo_mm'] = -65.0
    scene['foglie'] = 'Lanceolate curve, lisce, con nervature; abbassate di circa 10 mm'
    scene['sezione_gambo'] = 'Circolare, diametro 2.4-3.24 mm; estremita arrotondata'
    scene['ingrandimento_foglie'] = 1.15
    scene['centri_foglie_xy'] = leaf_centers
    scene['altezze_centri_foglie_z'] = leaf_center_heights
    scene['lunghezze_mediane_foglie_mm'] = leaf_arc_lengths
    if reinforced:
        scene['sezione_gambo'] = 'Circolare, diametro 3.4-4.24 mm; estremita arrotondata'
        scene['incremento_spessore_gambo_mm'] = 1.0
        scene['incremento_spessore_foglie_mm'] = 1.0
        scene['dimensioni_fiore_e_altezza_invariate'] = True
    if back_extra:
        scene['spessore_aggiunto_retro_corolla_mm'] = back_extra
        scene['strati_equivalenti_a_0_2mm'] = 3
        scene['piano_appoggio_posteriore_z_mm'] = back_z
        scene['gambo_e_foglie_spessore_rinforzato_preservato'] = True
        if 'dimensioni_fiore_e_altezza_invariate' in scene:
            del scene['dimensioni_fiore_e_altezza_invariate']
        scene['diametro_fiore_e_altezza_invariati'] = True
    if flat_stem:
        scene['sezione_gambo'] = 'Profilo a D semiellittico; fronte arrotondato e retro piano'
        scene['retro_stelo_piatto'] = True
        scene['larghezza_e_spessore_stelo_preservati'] = True
    if curved_leaves:
        scene['superficie_superiore_foglie'] = 'Convessa, curva in larghezza e lunghezza; nervature in rilievo'
        scene['bombatura_aggiunta_foglie_mm'] = .75
        scene['retro_foglie_piatto'] = True
    if refined_profile:
        scene['profilo_stelo_piu_convesso'] = True
        scene['bombatura_stelo_aggiunta_mm'] = .6
        scene['petalo_inferiore_libero'] = True
        scene['allungamento_foglie_percento'] = 10.0
        scene['spessore_minimo_collo_stelo_mm'] = 2.4
        if 'larghezza_e_spessore_stelo_preservati' in scene:
            del scene['larghezza_e_spessore_stelo_preservati']
    if rounded_joint:
        scene['innesto_stelo_arrotondato']=True
        scene['punta_petalo_inferiore_libera']=True
        scene['spessore_minimo_innesto_mm']=2.4
        scene['foglie_e_lunghezza_stelo_invariate']=True
    if straight_joint:
        scene['stelo_senza_rigonfiamento']=True
        scene['larghezza_stelo_presso_innesto_mm']=4.1
        scene['punta_petalo_inferiore_libera']=True
        scene['raccordo_gambo']='Stelo diretto a larghezza uniforme; estremita nascosta dietro al petalo'
        scene['foglie_e_lunghezza_stelo_invariate']=True
    if natural_leaves:
        scene['foglie_superficie_corolla']=True
        scene['riferimento_superficie_foglie']='Profilo campionato dal petalo superiore della corolla'
        scene['ingrandimento_foglie_rispetto_ultima_versione']=1.10
        scene['spessore_minimo_foglie_mm']=2.38
        scene['bombatura_aggiunta_foglie_mm']=1.10
        scene['bombatura_macro_foglie_mm']=.50
        scene['lunghezza_stelo_invariata']=True
        if 'foglie_e_lunghezza_stelo_invariate' in scene:
            del scene['foglie_e_lunghezza_stelo_invariate']
    if lower_stem_front:
        scene['riduzione_bombatura_frontale_stelo_mm']=.4
        scene['retro_stelo_invariato']=True
        scene['foglie_naturali_preservate']=True
        scene['incremento_spessore_gambo_mm']=extra_thickness-.4
        if 'larghezza_e_spessore_stelo_preservati' in scene:
            del scene['larghezza_e_spessore_stelo_preservati']
        scene['larghezza_stelo_preservata']=True
    if soft_back:
        scene['retro_corolla_raccordato'] = True
        scene['larghezza_raccordo_retro_mm'] = .65
        scene['rinforzo_retro_centrale_mm'] = back_extra
    target = Vector((0,-18,2))
    configure_view((0,0,1), (0,1,0), target, 104)
    for obj in scene.objects:
        obj.select_set(False)
    basename = 'girasole_rinforzato_+1mm' if reinforced else 'girasole_diametro_+10mm_gambo_stile_tulipano'
    if back_extra:
        basename = 'girasole_rinforzato_retro_+0.6mm'
    if flat_stem:
        basename = 'girasole_rinforzato_stelo_piatto'
    if curved_leaves:
        basename = 'girasole_rinforzato_foglie_bombate'
    if refined_profile:
        basename = 'girasole_convesso_foglie_allungate'
    if soft_back:
        basename = 'girasole_corolla_raccordata'
    if rounded_joint:
        basename = 'girasole_innesto_arrotondato'
    if straight_joint:
        basename = 'girasole_stelo_diretto'
    if natural_leaves:
        basename = 'girasole_stelo_diretto_foglie_naturali'
    if lower_stem_front:
        basename = 'girasole_stelo_frontale_ridotto'
    path = os.path.join(FOLDER,basename+'.blend')
    bpy.ops.wm.save_as_mainfile(filepath=path)
    preview = basename+'_fronte.png' if reinforced else 'girasole_corretto_fronte.png'
    render_view(preview,(0,0,1),(0,1,0),target,104)
    if curved_leaves:
        render_view(basename+'_dettaglio_foglie.png',(.45,-.28,.85),(0,1,0),Vector((0,-45,1)),45)
    if soft_back:
        render_view(basename+'_retro.png',(.3,.6,-.75),(0,1,0),Vector((0,0,0)),68)
    if rounded_joint or straight_joint:
        render_view(basename+'_dettaglio_innesto.png',(.25,-.35,1),(0,1,0),Vector((0,-28,1.5)),20)
    print('SAVED_VERIFIED',path,flush=True)


def tulip():
    obj = bpy.data.collections['Tulipano_sorgente_2'].objects[0]
    bpy.context.scene.collection.objects.link(obj)
    for other in list(bpy.data.objects):
        if other != obj:
            bpy.data.objects.remove(other, do_unlink=True)
    for collection in list(bpy.data.collections):
        bpy.data.collections.remove(collection)
    # Scala accettata +10%, incorporata direttamente nelle coordinate.
    for v in obj.data.vertices:
        v.co *= 1.10
    normalize_mesh(obj.data)
    me = obj.data
    candidates = [p for p in me.polygons if p.area > .001]
    bins = defaultdict(float)
    for p in candidates:
        key = tuple(round(float(v),3) for v in p.normal)
        bins[key] += p.area
    dominant = Vector(max(bins, key=bins.get)).normalized()
    planar = [p for p in candidates if p.normal.dot(dominant) > .999999]
    area = sum(p.area for p in planar)
    normal = sum((p.normal*p.area for p in planar),Vector()).normalized()
    distance = sum(p.center.dot(normal)*p.area for p in planar)/area
    # Il centro viene calcolato dall'area reale del retro della corolla,
    # usando i centri delle facce, anche dove il piano non ha vertici interni.
    head = [p for p in planar if p.center.z > 17.0]
    center = sum((p.center*p.area for p in head),Vector()) / sum(p.area for p in head)
    center += normal * (distance-normal.dot(center))
    print('FLAT_PLANE_NORMAL',tuple(normal),'CENTER',tuple(center),'AREA',area,flush=True)
    before = bvh_for(obj)
    up = (Vector((0,0,1))-normal*normal.z).normalized()
    right = up.cross(normal).normalized()
    thickness_samples = []
    for r in (0, 2.0, 3.1):
        for i in range(12):
            p = center + right*r*math.cos(i*math.tau/12)+up*r*math.sin(i*math.tau/12)
            surface = before.ray_cast(p+normal*5, -normal)
            assert surface[0] is not None and abs(normal.dot(surface[0])-distance)<.03, 'Sede fuori dal retro piatto'
            front = before.ray_cast(p-normal*30, normal)
            thickness = distance - normal.dot(front[0])
            thickness_samples.append(thickness)
    assert min(thickness_samples) > 3.3, thickness_samples
    print('MIN_WALL_BEFORE',min(thickness_samples),flush=True)

    # Cilindro orientato perpendicolarmente al vero piano obliquo del retro.
    bpy.ops.mesh.primitive_cylinder_add(vertices=128,radius=3.2,depth=2.6,
        location=center-normal*.9)
    cutter = bpy.context.object
    cutter.rotation_euler = normal.to_track_quat('Z','Y').to_euler()
    boolean(obj,cutter,'DIFFERENCE')
    obj.name = 'TULIPANO_corpo_unico_foro_centrato_retro_piatto'
    mesh_check(obj)
    after = bvh_for(obj)
    for r in (0,1.5,2.8):
        for i in range(8):
            p = center+right*r*math.cos(i*math.tau/8)+up*r*math.sin(i*math.tau/8)
            hit = after.ray_cast(p+normal*5,-normal)[0]
            depth = distance-normal.dot(hit)
            assert abs(depth-2.2)<.02, ('Profondita foro errata',depth)
            p_front = p-normal*30
            old_hit, new_hit = before.ray_cast(p_front,normal)[0], after.ray_cast(p_front,normal)[0]
            assert (old_hit-new_hit).length<.01,'Il taglio ha modificato il davanti'
    # Al bordo esterno la faccia resta sul piano iniziale, senza supporti aggiunti.
    for i in range(12):
        p = center+right*3.65*math.cos(i*math.tau/12)+up*3.65*math.sin(i*math.tau/12)
        hit = after.ray_cast(p+normal*5,-normal)[0]
        assert abs(distance-normal.dot(hit))<.03
    print('HOLE_VERIFIED depth=2.2 diameter=6.4 front_unchanged=True',flush=True)
    pink = bpy.data.materials.new('Tulipano_rosa')
    pink.diffuse_color=(.82,.20,.32,1)
    obj.data.materials.clear()
    obj.data.materials.append(pink)
    scene=bpy.context.scene
    scene['foro_diametro_mm']=6.4
    scene['foro_profondita_mm']=2.2
    scene['foro_posizione']='Centro geometrico del retro piatto della corolla'
    scene['foro_normale_piano']=tuple(normal)
    scene['foro_centro']=tuple(center)
    scene['superficie_anteriore_invariata']=True
    scene['supporto_esterno']=False
    obj.select_set(False)
    configure_view(normal,up,Vector((0,0,0)),122)
    path=os.path.join(FOLDER,'tulipano_maggiorato_calamita.blend')
    bpy.ops.wm.save_as_mainfile(filepath=path)
    render_view('tulipano_corretto_retro.png',normal,up,Vector((0,0,0)),122)
    render_view('tulipano_corretto_fronte.png',-normal,up,Vector((0,0,0)),122)
    render_view('tulipano_dettaglio_foro.png',normal,up,center,40)
    print('SAVED_VERIFIED',path,flush=True)


if __name__ != '__main__':
    pass
elif '--preview' in sys.argv:
    if 'girasoli' in FOLDER:
        render_view('girasole_corretto_fronte.png',(0,0,1),(0,1,0),Vector((0,-18,2)),104)
    else:
        n = Vector(bpy.context.scene['foro_normale_piano'])
        u = (Vector((0,0,1))-n*n.z).normalized()
        c = Vector(bpy.context.scene['foro_centro'])
        render_view('tulipano_corretto_retro.png',n,u,Vector((0,0,0)),122)
        render_view('tulipano_corretto_fronte.png',-n,u,Vector((0,0,0)),122)
        render_view('tulipano_dettaglio_foro.png',n,u,c,40)
        r = u.cross(n).normalized()
        render_view('tulipano_retro_inclinato.png',(n+r*.32+u*.14).normalized(),u,Vector((0,0,0)),122)
        render_view('tulipano_dettaglio_foro_inclinato.png',(n+r*.32+u*.14).normalized(),u,c,40)
elif 'girasoli' in FOLDER:
    sunflower()
else:
    tulip()
