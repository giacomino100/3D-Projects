"""V17: rifila i ritorni V16 contro la nuova rampa, senza spostarne il dorso."""

import os
import time
from pathlib import Path

import cadquery as cq

from reg import Model, ROOT


def single_solid(path: Path):
    imported = cq.importers.importStep(str(path))
    solids = []
    for value in imported.vals():
        solids.extend(value.Solids())
    if len(solids) != 1:
        raise RuntimeError(f"{path.name}: atteso un solido, trovati {len(solids)}")
    return solids[0]


def checked(name, shape):
    shape = shape.clean()
    solids = shape.Solids()
    if shape.isNull() or not shape.isValid() or not solids:
        raise RuntimeError(
            f"{name} non valido: null={shape.isNull()} valid={shape.isValid()} solids={len(shape.Solids())}"
        )
    result = solids[0] if len(solids) == 1 else cq.Compound.makeCompound(solids)
    print(
        name,
        "valid",
        "solids",
        len(solids),
        "volumes",
        [round(s.Volume()) for s in solids],
        flush=True,
    )
    return result


t0 = time.time()
version = os.environ.get("Q2_VERSION", "V17").upper()
m = Model(version)
P, SF = m.P, m.SF
SF._face_surface()
print("face", round(time.time() - t0), flush=True)

source = Path(ROOT) / "cad" / "exports" / "V16" / "fusion_parts"
output = Path(ROOT) / "cad" / "exports" / version / "fusion_parts"
output.mkdir(parents=True, exist_ok=True)

# I solidi V16 hanno il dorso corretto e restano fermi. L'intersezione conserva
# soltanto la parte che si trova dietro la nuova faccia V17: dove la rampa sale,
# il ritorno si accorcia; sul D-end il ritorno corto sparisce e i due labbri
# terminano con lo stesso andamento. Fuori da END A le parti restano identiche.
far = P.T_SKIN + P.D_WALL_OPEN_TOP + 30.0
short_keep = SF.slab(1.2 - P.RETURN_RAMP_TRIM_OVERLAP, far)
deep_start = P.T_SKIN + P.D_RET_OPEN - 0.3
deep_keep = SF.slab(deep_start - P.RETURN_RAMP_TRIM_OVERLAP, far)

parts = {
    "ret_open": checked(
        "ret_open",
        single_solid(source / "ret_open_v16.step").intersect(short_keep),
    ),
    "tongue_ext": checked(
        "tongue_ext",
        single_solid(source / "tongue_ext_v16.step").intersect(deep_keep),
    ),
    "bottom_tongue": checked(
        "bottom_tongue",
        single_solid(source / "bottom_tongue_v16.step").intersect(deep_keep),
    ),
}

for name, shape in parts.items():
    target = output / f"{name}_{version.lower()}.step"
    cq.exporters.export(shape, str(target))
    print("saved", target, flush=True)

print("elapsed", round(time.time() - t0), flush=True)
