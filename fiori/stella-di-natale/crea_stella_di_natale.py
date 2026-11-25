"""Stella di Natale in rilievo a retro piatto (stampa sdraiata, senza supporti).

Uso:  blender -b --factory-startup --python crea_stella_di_natale.py
Genera stella_di_natale.blend, stella_di_natale.3mf e anteprime/.
Oggetti: Brattee (rosso, due strati), Centro (bacche gialle), Foglie (verde, 6 punte
che spuntano tra le brattee). Solo testa, senza stelo: decorazione / calamita.

Ogni strato colorato e' UN unico campo di altezze in coordinate polari: in ogni
punto vale la lama (brattea/foglia) piu alta. Niente booleani tra lame sovrapposte,
quindi mesh pulita per costruzione e nessuno sbalzo.
"""
import math
import os
import sys

import bmesh
from mathutils import Vector

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import comune_rilievo as cr  # noqa: E402

FOLDER = os.path.dirname(os.path.abspath(__file__))

# ---- parametri (mm) ----
N = 6
R_BASE = 1.5                 # dove nascono brattee e foglie
SOTTO = dict(length=25.5, width=12.5, edge=1.0, top=1.9)   # Ø rosso = 2*(1.5+25.5) = 54 mm
SOPRA = dict(length=17.0, width=9.0, edge=2.1, top=3.1)    # strato superiore ruotato di ~30 gradi
FOGLIA = dict(length=29.0, width=12.0, edge=0.8, top=1.4)  # verdi, spuntano tra le brattee
R_CENTRO = 4.6
CENTRO_BASE = 3.4
BACCHE = 1.35                # raggio delle bacche (ciazi)
ANGOLI, ANELLI = 1440, 160   # risoluzione del campo di altezze polare


def halfwidth(width, u):
    """Base stretta, pancia larga, punta affilata."""
    if u <= 0.0 or u >= 1.0:
        return 0.0
    return width / 2 * math.sin(math.pi * u ** 0.72) ** 0.9


class Blade:
    def __init__(self, p, angle):
        self.p = p
        self.ca, self.sa = math.cos(angle), math.sin(angle)
        self.origin = Vector((R_BASE * self.ca, R_BASE * self.sa))

    def inside(self, q):
        d = q - self.origin
        x = d.x * self.ca + d.y * self.sa
        y = -d.x * self.sa + d.y * self.ca
        return abs(y) <= halfwidth(self.p['width'], x / self.p['length']) and x > 0

    def height(self, q):
        """Altezza della lama nel punto q, oppure None se q e' fuori."""
        p = self.p
        d = q - self.origin
        x = d.x * self.ca + d.y * self.sa
        y = -d.x * self.sa + d.y * self.ca
        u = x / p['length']
        hw = halfwidth(p['width'], u)
        if hw <= 0.0 or abs(y) > hw:
            return None
        t = abs(y) / hw
        along = min(1.0, (1 - u) * 5) ** 0.5 * min(1.0, u * 6) ** 0.5
        dome = math.sqrt(max(0.0, 1 - t * t)) * along
        z = p['edge'] + (p['top'] - p['edge']) * dome
        z -= 0.4 * math.exp(-(y / 0.5) ** 2) * math.sin(math.pi * min(1.0, u * 1.05)) * dome  # nervatura centrale
        v = (x - 1.3 * abs(y)) / 3.6  # nervature laterali oblique verso la punta
        frac = v - math.floor(v)
        if 0.12 < u < 0.9 and abs(y) > 0.7:
            z -= 0.3 * math.exp(-((frac - 0.5) / 0.08) ** 2) * dome
        return z


def layer(blades):
    """Campo di altezze polare: contorno = ultimo punto coperto da una lama lungo ogni raggio."""
    def top(q):
        hs = [h for h in (b.height(q) for b in blades) if h is not None]
        return max(hs) if hs else None

    outline = []
    for i in range(ANGOLI):
        a = 2 * math.pi * i / ANGOLI
        u = Vector((math.cos(a), math.sin(a)))
        r, last, step = 0.0, 0.0, 0.1
        while r < 40.0:
            if any(bl.inside(u * r) for bl in blades):
                last = r
            r += step
        lo, hi = last, last + step  # rifinitura per bisezione
        for _ in range(8):
            mid = (lo + hi) / 2
            if any(bl.inside(u * mid) for bl in blades):
                lo = mid
            else:
                hi = mid
        outline.append(u * max(lo, 0.5))

    def h(q, s):
        z = top(q)
        return z if z is not None else min(b.p['edge'] for b in blades)

    return cr.domed_slab(outline, h, rings=ANELLI)


def make_center():
    berries = [Vector((0, 0))] + [Vector((2.5 * math.cos(a), 2.5 * math.sin(a)))
                                  for a in (2 * math.pi * k / 6 + math.pi / 6 for k in range(6))]
    seg = 160
    outline = [Vector((R_CENTRO * math.cos(2 * math.pi * i / seg), R_CENTRO * math.sin(2 * math.pi * i / seg)))
               for i in range(seg)]

    def h(q, s):
        z = CENTRO_BASE
        for b in berries:
            d2 = (q - b).length_squared
            if d2 < BACCHE ** 2:
                z = max(z, CENTRO_BASE + 0.95 * math.sqrt(BACCHE ** 2 - d2))
        return z

    return cr.domed_slab(outline, h, rings=50)


def drop_crumbs(obj, min_volume):
    """Elimina le schegge sottili rimaste lungo i bordi delle brattee dopo la sottrazione."""
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    seen, removed = set(), []
    for v in list(bm.verts):
        if v in seen or not v.is_valid:
            continue
        grp, stack = {v}, [v]
        while stack:
            for e in stack.pop().link_edges:
                for w in e.verts:
                    if w not in grp:
                        grp.add(w)
                        stack.append(w)
        seen |= grp
        faces = {f for w in grp for f in w.link_faces}
        vol = abs(sum(f.calc_center_median().dot(f.normal) * f.calc_area() for f in faces) / 3)
        if vol < min_volume:
            removed.append(round(vol, 2))
            bmesh.ops.delete(bm, geom=list(grp), context='VERTS')
    bm.to_mesh(obj.data)
    bm.free()
    print('schegge eliminate:', len(removed), flush=True)


def main():
    cr.clear_scene()
    m_rosso = cr.material('Brattee_rosso', (0.78, 0.04, 0.06))
    m_giallo = cr.material('Centro_giallo', (0.95, 0.78, 0.08))
    m_verde = cr.material('Foglie_verde', (0.12, 0.38, 0.12))

    sotto = [Blade(SOTTO, math.pi / 2 + 2 * math.pi * k / N) for k in range(N)]
    # strato superiore: sfalsato di 30 gradi con piccola asimmetria naturale
    sopra = [Blade(SOPRA, math.pi / 2 + 2 * math.pi * (k + 0.5) / N + math.radians(1.2 * math.sin(2.3 * k)))
             for k in range(N)]
    brattee = cr.to_object('Brattee', layer(sotto + sopra), m_rosso)
    cr.boolean(brattee, cr.make_disc(R_CENTRO, 20, z=-5), 'DIFFERENCE')

    centro = cr.to_object('Centro', make_center(), m_giallo)

    verdi = [Blade(FOGLIA, math.pi / 2 + 2 * math.pi * (k + 0.5) / N) for k in range(N)]
    foglie = cr.to_object('Foglie', layer(verdi), m_verde)
    cr.boolean(foglie, cr.make_disc(8.0, 20, z=-5), 'DIFFERENCE')  # il centro e' tutto rosso/giallo
    cr.subtract_silhouette(foglie, brattee)
    drop_crumbs(foglie, min_volume=3.0)

    cr.finish([brattee, centro, foglie], FOLDER, 'stella_di_natale', max_parts={'Foglie': N})
    cr.render_previews(FOLDER, 'stella_di_natale', (0, 0, 1), ortho_scale=72, size=(1000, 1000), persp_lens=230)


main()
