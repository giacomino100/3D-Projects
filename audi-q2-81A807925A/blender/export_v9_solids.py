"""Esporta i sette solidi del STEP V9 come mesh separate per Blender.

La geometria non viene modificata: OCC tessella ogni solido con tolleranza
esplicita e conserva le coordinate originali in millimetri.
"""

from __future__ import annotations

import json
from pathlib import Path

import cadquery as cq


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "cad" / "exports" / "V9" / "81A807925A_V9.step"
OUTPUT = ROOT / "cad" / "exports" / "V9" / "blender_meshes"

NAMES = (
    "BODY_81A807925A_V9",
    "CLIP_C01",
    "CLIP_C02",
    "CLIP_C03",
    "CLIP_C05",
    "CLIP_C06",
    "CLIP_C07",
)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    imported = cq.importers.importStep(str(SOURCE))
    solids = []
    for value in imported.vals():
        solids.extend(value.Solids())

    if len(solids) != len(NAMES):
        raise RuntimeError(
            f"Attesi {len(NAMES)} solidi (corpo + 6 clip), trovati {len(solids)}"
        )

    manifest = {
        "source": str(SOURCE),
        "source_version": "V9d",
        "units": "mm",
        "tessellation_tolerance_mm": 0.05,
        "angular_tolerance_rad": 0.08,
        "objects": [],
    }

    for name, solid in zip(NAMES, solids, strict=True):
        path = OUTPUT / f"{name}.stl"
        cq.exporters.export(
            solid,
            str(path),
            tolerance=0.05,
            angularTolerance=0.08,
        )
        box = solid.BoundingBox()
        manifest["objects"].append(
            {
                "name": name,
                "file": str(path),
                "volume_mm3": solid.Volume(),
                "size_mm": [box.xlen, box.ylen, box.zlen],
                "center_mm": list(solid.Center().toTuple()),
            }
        )
        print(f"{name}: {path.name}")

    manifest_path = OUTPUT / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"Manifest: {manifest_path}")


if __name__ == "__main__":
    main()
