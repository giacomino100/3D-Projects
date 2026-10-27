# Audi Q2 81A807925A / TB2 — parametric CAD (V1 → V2)

Left front lower-grille decorative frame (`Zierrahmen Gitter BASIS Li`), Audi Q2 GA
pre-facelift, Selenite Silver TB2, material PC+ABS (molded). Fits on grille
81A807681A (ASA anthracite); together they form the group 81A807671 4W3.

**Status: V2 = refined shape prototype** (`CLAUDE_REVISION_V2_81A807925A.md` applied on the V1 base; V1 kept reproducible).
V1 = first visual / shape prototype. Front-view shape validated on two
independent photos; Z curvature and clips are inferred and parametric.
**Not production-ready.**

## Build

```bash
.venv\Scripts\python cad\build_model.py      # STEP, STL, clips, coupons, build_report.json
.venv\Scripts\python cad\render.py           # renders/front|rear|top|side|iso|iso_rear.png
.venv\Scripts\python cad\render.py --coupons # renders/clip_coupons.png
.venv\Scripts\python cad\validate_overlay.py # docs/validation/overlay_*.jpg
```

Environment: Python 3.12, `pip install cadquery numpy pillow trimesh pyvista`
(CadQuery 2.8.0 used). Change any value in `cad/parameters.py` and rebuild (~13 s).

## V3 (photo-registration phase, current)

```bash
set Q2_PARAMS=parameters_v3 & set Q2_OUT=V3 & .venv\Scripts\python cad\build_model_v2.py   # cad/exports/V3/
.venv\Scripts\python work\final_validation.py   # docs/V3/validation/OEM_vs_V3_*.png, landmarks, metrics
.venv\Scripts\python work\make_v3_report.py     # docs/V3_report.md
```

* Derived only from measured comparisons with photos of the exact 81A807925A (camera-registered overlays).
* Report with landmark table P01-P20, stations S00-S11, sections, clips C01-C07 and stop criteria: `docs/V3_report.md`.
* Booleans are volume- and validity-checked; outlines are dense polylines (2 mm) for OCC robustness.

## V2

```bash
.venv\Scripts\python cad\build_model_v2.py   # cad/exports/V2/: 81A807925A_V2.step / .stl, clips, coupons, build_report_v2.json
.venv\Scripts\python cad\render.py --v2      # renders/V2_front|rear|top|side|iso_front|iso_rear.png
.venv\Scripts\python cad\report_v2.py        # docs/V2_landmarks.md + docs/V2/*.png (profiles, Z at landmarks)
```

* Shape: planform from a camera-corrected multi-view silhouette fit (`work/fit_v2*.py`),
  Z wrap from a 57-point scan, crown/pitch/returns still assumed.
* Silhouette error vs V1 on the installed sample: −29…−44 % on 4 of 5 fit views and
  −43 % on the holdout view; equivalent to V1 on two other isolated samples.
* STEP round-trip: closed Solid, 0 free edges; STL watertight; Fusion import = solid
  (`cad/fusion/81A807925A_V2.f3d`). No visible-edge fillets in V2 (see docs).
* Reports: `docs/V1_vs_V2.md`, `docs/V2_landmarks.md`, `docs/V2_clip_map.md`,
  `docs/V2_remaining_uncertainties.md`. Work scripts (photo fitting) in `work/`
  (needs `opencv-python scipy`).

## Layout

```
cad/
  parameters.py             every dimension, tagged CERTAIN / PHOTO_DERIVED / ASSUMED
  build_model.py            orchestration + exports
  geometry/planform.py      front-view outline (exact arcs) + opening
  geometry/surface.py       Z field (bow, wrap, pitch, twist), stations, loft, body
  geometry/clips.py         CLIP_C01..C07 independent features
  geometry/coupons.py       fit coupons + receiver surrogates
  render.py, validate_overlay.py
  exports/81A807925A_V1.step         assembly: BODY + 7 clips as separate solids
  exports/81A807925A_V1.stl          fused printable mesh (watertight)
  exports/81A807925A_V1_body.step    body only
  exports/clips/CLIP_Cxx.step
  exports/clip_test_coupons/         3 families x 3 clearances (STL + STEP)
  exports/build_report.json          validity, bbox, volumes, stations, clip table
  fusion/81A807925A_V1.f3d           same model imported in Autodesk Fusion
docs/  source_image_index, dimensional_evidence, assumptions, clip_map,
       curvature_analysis, validation_plan, validation/ overlays, reference_images/
renders/
```

## Coordinate system

Right-handed, mm. **X toward the vehicle's right (= toward the inner tip of this left
part)**, Y up, Z rearward (into the vehicle). Shape is authored in the photo frame
`s` (distance from inner tip) and mirrored once: `X_cad = L − s`. See
`docs/curvature_analysis.md §1` — without this the part would be the right-hand one.

## Key numbers

| | Value | Type |
|---|---|---|
| Group 81A807671 4W3 | 548 × 240 × 80 mm, 0.45 kg | catalogue (group only) |
| 925A length × height | 472 × 58 mm (±15 / ±6) | photo-derived, 2 photos |
| 925A depth (V1) | 47.6 mm | assumed wrap 28 mm |
| Clips | 3 eyelets bottom, 3 hook tabs top, 1 tongue outer end | positions photo, sizes assumed |
| Mass V1 | ≈ 68 g (PC+ABS) | derived |

## Printing (V1)

PETG for shape check, ASA for outdoor use. Print the coupons first
(`exports/clip_test_coupons`), pick the clearance, then the full part. Finish to the
TB2 look needs primer + silver paint; filament colour alone will not match.
