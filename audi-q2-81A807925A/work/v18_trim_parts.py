"""V18: conserva i piani posteriori V17 e rifila i ritorni sulla nuova faccia."""

import os
import shutil
import time
from pathlib import Path

import cadquery as cq

from reg import Model, ROOT


def solids_from_step(path: Path):
    imported = cq.importers.importStep(str(path))
    solids = []
    for value in imported.vals():
        solids.extend(value.Solids())
    if not solids:
        raise RuntimeError(f"{path.name}: nessun solido")
    return solids


def intersect_all(name, source_solids, keep):
    kept = []
    for solid in source_solids:
        # I file V17 sono gia nel frame esportato (X=L-s). Riportarli prima
        # nel frame CAD evita di riflettere un solido di taglio OCC e mantiene
        # coerenti orientamento e classificazione interno/esterno.
        internal = solid.mirror("YZ", (P.L / 2.0, 0, 0))
        result = internal.intersect(keep).clean()
        for piece in result.Solids():
            if piece.Volume() > 1.0:  # elimina solo frammenti numerici sub-mm3
                kept.append(piece.mirror("YZ", (P.L / 2.0, 0, 0)))
    if not kept or any(not s.isValid() for s in kept):
        raise RuntimeError(f"{name}: intersezione non valida, solidi={len(kept)}")
    shape = kept[0] if len(kept) == 1 else cq.Compound.makeCompound(kept)
    print(name, "valid", "solids", len(kept), "volumes", [round(s.Volume()) for s in kept], flush=True)
    return shape


t0 = time.time()
version = os.environ.get("Q2_VERSION", "V18").upper()
m = Model(version)
P, PF, SF = m.P, m.PF, m.SF
face = SF._face_surface()
print("face", round(time.time() - t0), flush=True)

source = Path(ROOT) / "cad" / "exports" / "V17" / "fusion_parts"
output = Path(ROOT) / "cad" / "exports" / version / "fusion_parts"
output.mkdir(parents=True, exist_ok=True)

# Faccia e pelle V18 sono le uniche geometrie anteriori ricostruite. Si usa la
# stessa faccia per entrambi i file, evitando divergenze tra due build separate.
P.OUTLINE_POLY_STEP = None
P.NUMPY_OFFSET = True
wo = PF._spline_wire("outer", z=SF.Z_LO, nseg=8, npts=60)
wi = PF._spline_wire("opening", z=SF.Z_LO, nseg=8, npts=80)
skin_ring = cq.Solid.extrudeLinear(
    cq.Face.makeFromWires(wo, [wi]),
    cq.Vector(0, 0, SF.Z_HI - SF.Z_LO),
)
skin = cq.Solid.extrudeLinear(face, cq.Vector(0, 0, P.T_SKIN)).intersect(skin_ring).clean()
if skin.isNull() or not skin.isValid() or len(skin.Solids()) != 1:
    raise RuntimeError(f"skin non valida: solidi={len(skin.Solids())}")

mirror = lambda shape: cq.Workplane().add(shape.mirror("YZ", (P.L / 2.0, 0, 0)))
cq.exporters.export(mirror(face), str(output / f"face_{version.lower()}.step"))
cq.exporters.export(mirror(skin), str(output / f"skin_{version.lower()}_occ.step"))
print("skin", "valid", "solids", 1, "volume", round(skin.Volume()), flush=True)

# I dorsi V17 restano fermi sul piano da 12 mm. Le intersezioni rimuovono solo
# il materiale davanti alla nuova cavita superiore V18; l'overlap di 0.15 mm e
# una tolleranza booleana gia usata in V17, non una quota OEM.
far = P.T_SKIN + P.D_WALL_OPEN_TOP + 30.0
short_keep = SF.slab(1.2 - P.RETURN_RAMP_TRIM_OVERLAP, far)
deep_start = P.T_SKIN + P.D_RET_OPEN - 0.3
deep_keep = SF.slab(deep_start - P.RETURN_RAMP_TRIM_OVERLAP, far)

ret_source = solids_from_step(source / "ret_open_v17.step")
ret_top = intersect_all("ret_open_top", [ret_source[0]], short_keep)
ret_kept = ret_top.Solids() + ret_source[1:]
ret_open = ret_kept[0] if len(ret_kept) == 1 else cq.Compound.makeCompound(ret_kept)

bottom_source = solids_from_step(source / "bottom_tongue_v17.step")
bottom_tongue = bottom_source[0] if len(bottom_source) == 1 else cq.Compound.makeCompound(bottom_source)
lip_source = solids_from_step(source / "lip_v17.step")
lip = lip_source[0] if len(lip_source) == 1 else cq.Compound.makeCompound(lip_source)
print("ret_open", "valid", "solids", len(ret_kept), "volumes", [round(s.Volume()) for s in ret_kept], flush=True)
print("bottom_tongue", "preserved V17", "solids", len(bottom_source),
      "volumes", [round(s.Volume()) for s in bottom_source], flush=True)
print("lip", "preserved V17", "solids", len(lip_source),
      "volumes", [round(s.Volume()) for s in lip_source], flush=True)

parts = {
    "lip": lip,
    "ret_open": ret_open,
    "tongue_ext": intersect_all("tongue_ext", solids_from_step(source / "tongue_ext_v17.step"), deep_keep),
    "bottom_tongue": bottom_tongue,
}

for name, shape in parts.items():
    target = output / f"{name}_{version.lower()}.step"
    if name in ("lip", "bottom_tongue"):
        shutil.copyfile(source / f"{name}_v17.step", target)
    else:
        cq.exporters.export(shape, str(target))
    print("saved", target, flush=True)

print("elapsed", round(time.time() - t0), flush=True)
