"""Tessella i tre solidi versionati destinati all'unione in Blender."""

from __future__ import annotations

import os
from pathlib import Path

import cadquery as cq


ROOT = Path(__file__).resolve().parents[1]
VERSION = os.environ.get("Q2_VERSION", "V10").upper()
LOWER = VERSION.lower()
SOURCE_DIR = ROOT / "cad" / "exports" / VERSION / "fusion_parts"
OUTPUT_DIR = ROOT / "cad" / "exports" / VERSION / "blender_parts"

PARTS = {
    f"BODY_SKIN_{VERSION}": SOURCE_DIR / f"skin_{LOWER}_occ.step",
    f"BODY_OUTER_RETURN_{VERSION}": SOURCE_DIR / f"lip_{LOWER}.step",
    f"BODY_OPENING_RETURN_{VERSION}": SOURCE_DIR / f"ret_open_{LOWER}.step",
}
if VERSION in ("V12", "V13", "V14", "V15", "V17", "V18"):
    PARTS[f"BODY_TONGUE_EXTENSION_{VERSION}"] = SOURCE_DIR / f"tongue_ext_{LOWER}.step"
if VERSION in ("V13", "V14", "V15", "V17", "V18"):
    PARTS[f"BODY_BOTTOM_TONGUE_{VERSION}"] = SOURCE_DIR / f"bottom_tongue_{LOWER}.step"
if VERSION == "V16":
    PARTS[f"BODY_TONGUE_EXTENSION_{VERSION}"] = SOURCE_DIR / f"tongue_ext_{LOWER}.step"
    PARTS[f"BODY_BOTTOM_TONGUE_{VERSION}"] = SOURCE_DIR / f"bottom_tongue_{LOWER}.step"


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for name, source in PARTS.items():
        imported = cq.importers.importStep(str(source))
        solids = []
        for value in imported.vals():
            solids.extend(value.Solids())
        if len(solids) != 1 and VERSION not in ("V17", "V18"):
            raise RuntimeError(f"{source.name}: atteso un solido, trovati {len(solids)}")
        if not solids:
            raise RuntimeError(f"{source.name}: nessun solido")
        target = OUTPUT_DIR / f"{name}.stl"
        shape = solids[0] if len(solids) == 1 else cq.Compound.makeCompound(solids)
        cq.exporters.export(shape, str(target), tolerance=0.05, angularTolerance=0.08)
        print(f"{name}: {target}")


if __name__ == "__main__":
    main()
