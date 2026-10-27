"""V12: solo l'estensione mancante della linguetta superiore fino al D-end."""

import os
import time

import cadquery as cq

from reg import Model, ROOT


t0 = time.time()
version = os.environ.get("Q2_VERSION", "V12").upper()
m = Model(version)
P, PF, SF = m.P, m.PF, m.SF
SF._face_surface()
print("face", round(time.time() - t0), flush=True)

P.OUTLINE_POLY_STEP = None
P.NUMPY_OFFSET = True
sw = lambda which, off: PF._spline_wire(which, z=SF.Z_LO, offset=off, nseg=8, npts=80)
ring_open = cq.Solid.extrudeLinear(
    cq.Face.makeFromWires(sw("opening", P.T_WALL_OPEN), [sw("opening", 0.3)]),
    cq.Vector(0, 0, SF.Z_HI - SF.Z_LO),
)

oi = PF.outline_polyline("opening", 1.0)
y_mid = 0.5 * (oi[:, 1].max() + oi[:, 1].min())
s_tip = float(oi[:, 0].min())
s0 = s_tip - 5.0
s1 = s_tip + 18.5  # 0.5 mm di sovrapposizione con il ritorno profondo V11
box = cq.Solid.makeBox(s1 - s0, 40.0, SF.Z_HI - SF.Z_LO, cq.Vector(s0, y_mid, SF.Z_LO))

# Il ritorno corto V11 arriva già a T_SKIN + D_RET_OPEN. Aggiungiamo solo la
# parte posteriore della linguetta, con 0.3 mm di sovrapposizione per l'unione.
z0 = P.T_SKIN + P.D_RET_OPEN - 0.3
z1 = P.T_SKIN + P.D_WALL_OPEN_TOP
section = ring_open.intersect(box)
tongue = SF.slab(z0, z1).intersect(section).clean()
if tongue.isNull() or not tongue.isValid() or len(tongue.Solids()) != 1:
    raise RuntimeError(
        f"linguetta V12 non valida: null={tongue.isNull()} valid={tongue.isValid()} solids={len(tongue.Solids())}"
    )

out_dir = os.path.join(ROOT, "cad", "exports", version, "fusion_parts")
os.makedirs(out_dir, exist_ok=True)
target = os.path.join(out_dir, f"tongue_ext_{version.lower()}.step")
cq.exporters.export(
    cq.Workplane().add(tongue.mirror("YZ", (P.L / 2.0, 0, 0))),
    target,
)
print("tongue_ext", tongue.isValid(), len(tongue.Solids()), round(tongue.Volume()), target, flush=True)
