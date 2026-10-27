# CLAUDE.md — Audi Q2 81A807925A TB2 Reverse Engineering

## Mission

Reconstruct a manufacturable, parametric CAD model of the LEFT FRONT decorative bumper/grille trim for an Audi Q2:

- OEM target: `81A807925A`
- Finish code: `81A807925A TB2`
- Side: LEFT / front
- Vehicle: Audi Q2 pre-facelift
- Associated complete group: `81A807671 4W3`
- Associated receiving grille/support: `81A807681A 4W3`
- Original finish: Selenite Silver / silver

This is NOT the right-side part and NOT a generic visually-similar Audi Q2 trim.

The target is a CAD project that can be iterated and eventually manufactured/3D printed.

---

## Source of truth hierarchy

Use the files in this project in the following order:

1. `81A807925A_reverse_engineering_V0.2_clip_curvatura.md`
2. `81A807925A_reverse_engineering_V0.1.md`
3. The source URLs listed inside those files
4. Any additional web research you perform, ONLY if it is directly relevant to the exact OEM target or its exact receiving grille/support.

Do NOT silently treat estimates as OEM dimensions.

Every measurement or geometry claim must be tagged internally as one of:

- `CERTAIN_OEM_OR_CATALOG`
- `MULTI_SOURCE_CONFIRMED`
- `PHOTO_DERIVED`
- `ASSUMED_PARAMETRIC`
- `UNVERIFIED`

---

## Absolute constraints

### Exact target

The target component is:

`81A807925A / 81A807925A TB2`

Do NOT replace it with:

- `81A853053TB2`
- `81A807671B4W3`
- `81A807671EX7L`
- `81A807671E3FZ`
- any right-side part
- any facelift/S-Line part unless used ONLY as a clearly labelled geometric reference

### Known scale

The associated complete group `81A807671 4W3` has a documented envelope:

- X ≈ 548 mm
- Y ≈ 240 mm
- Z ≈ 80 mm
- mass ≈ 0.45 kg

These dimensions apply to the COMPLETE GROUP, NOT to the isolated `81A807925A`.

They may be used to calibrate photos of the complete group.

### Geometry

The target trim is NOT planar.

Model it as a true 3D surface with:

- XY frontal curvature
- depth change in Z
- local section rotation/twist
- rear returns
- independent snap-fit features

Do not model it as a simple 2D outline extruded to constant depth.

---

## Required research before modelling

Before producing the final CAD, review ALL exact-target image sources listed in the project reports.

At minimum, classify useful images into:

- target front
- target rear
- target oblique
- target side/profile
- close-up of terminal ends
- close-up of clip features
- receiving grille `81A807681A`
- complete assembly `81A8076714W3`
- installed left corner / bumper context

Create a table in `docs/source_image_index.md` with:

- source URL
- exact part number shown
- image/view type
- usefulness for shape
- usefulness for Z curvature
- usefulness for clips
- confidence
- notes

If additional web images are found, add them.

---

## CAD coordinate system

Use:

- X = horizontal / long axis of the left grille assembly
- Y = vertical axis in frontal view
- Z = depth toward vehicle interior

Set the complete group calibration box to:

- X = 548 mm
- Y = 240 mm
- Z = 80 mm

Do not assume the isolated trim spans this full box.

---

## Modelling strategy

Build the model parametrically in layers.

### Layer 1 — visible outer silhouette

Create the front-view perimeter of `81A807925A`.

Use only images of the exact left target whenever possible.

If a complete-group photo is used for scale:

1. rectify perspective
2. calibrate using the 548 mm complete-group X dimension
3. extract the target trim silhouette
4. cross-check against isolated-target photos

### Layer 2 — 3D centerline and curvature

Create a 3D centerline for the trim.

Use at least 8 stations:

- S0 = inner upper end
- S1 = upper-inner section
- S2 = upper-middle
- S3 = outer-upper bend
- S4 = outer side section
- S5 = outer-lower bend
- S6 = lower-middle
- S7 = inner-lower end

Each station should have parameters for:

- X
- Y
- Z
- local tangent
- local surface normal
- section rotation
- local visible band width
- rear-return depth

If possible, use more than 8 stations.

### Layer 3 — visible section / shell

Generate the visible trim body as a sweep/loft along the 3D centerline.

Keep these parametric:

- shell thickness
- visible-band width
- rear return depth
- edge radius
- section angle
- local twist

Do not hard-code guessed values unless they are marked `ASSUMED_PARAMETRIC`.

### Layer 4 — attachment system

Model ALL clips/tabs as independent features.

For every clip create a named parameter structure:

`CLIP_C01`, `CLIP_C02`, etc.

Each clip must expose at least:

- X
- Y
- Z
- insertion direction
- base width
- base thickness
- flexible length
- hook length
- hook height
- local angle
- root fillet
- clearance/tolerance

Use the exact receiving grille `81A807681A` image set to infer corresponding receiving windows/seats.

Do not claim exact clip dimensions unless they are visible against a known scale.

### Layer 5 — fit prototypes

Before a full print, generate small printable coupon models containing:

- each unique clip family
- surrounding local trim geometry
- corresponding nominal receiver relationship

Generate 3 tolerance variants per clip family where useful.

---

## Preferred implementation

Prefer a reproducible parametric workflow.

Best options, in order:

1. FreeCAD Python
2. CadQuery Python
3. OpenSCAD only if the geometry can be represented cleanly without losing curvature fidelity

Avoid a workflow that depends on manual GUI-only operations.

The project should be reproducible from scripts.

---

## Required outputs

Create this directory structure:

```text
/
├── CLAUDE.md
├── docs/
│   ├── source_image_index.md
│   ├── dimensional_evidence.md
│   ├── assumptions.md
│   ├── clip_map.md
│   ├── curvature_analysis.md
│   └── validation_plan.md
├── cad/
│   ├── build_model.py
│   ├── parameters.py
│   ├── geometry/
│   └── exports/
│       ├── 81A807925A_V1.step
│       ├── 81A807925A_V1.stl
│       └── clip_test_coupons/
├── renders/
│   ├── front.png
│   ├── rear.png
│   ├── top.png
│   ├── side.png
│   └── iso.png
└── README.md
```

If STEP export is not available in the chosen runtime, explain why and still produce the parametric source plus STL.

---

## Documentation requirements

### `docs/dimensional_evidence.md`

For every numerical value, include:

- value
- unit
- what it measures
- source
- evidence type
- confidence
- whether safe for manufacturing

Example:

| Parameter | Value | Source | Type | Confidence | Manufacturing-safe |
|---|---:|---|---|---|---|
| complete_group_X | 548 mm | OEMVWshop | CERTAIN_OEM_OR_CATALOG | high | yes, group only |
| target_length | ... | calibrated photo | PHOTO_DERIVED | medium | prototype only |

### `docs/assumptions.md`

Every guessed dimension must be recorded here.

Never hide assumptions inside code.

### `docs/clip_map.md`

Assign IDs C01, C02, C03... to every visible attachment feature.

For each clip include:

- approximate location
- orientation
- matching receiver evidence
- confidence
- whether symmetric/repeated
- whether dimensions are measured or estimated

### `docs/curvature_analysis.md`

Describe the 3D curvature using the station system S0...Sn.

For each station include:

- X/Y/Z
- local orientation
- evidence source
- confidence

If Z cannot be measured reliably, keep it parametric and document the uncertainty.

---

## Validation requirements

Before calling the model "final":

1. Overlay CAD front silhouette against at least two independent exact-target photos.
2. Overlay rear clip positions against at least two exact-target photos when available.
3. Check clip positions against receiving grille `81A807681A`.
4. Verify complete assembly placement against `81A8076714W3`.
5. Generate front/rear/top/side/isometric renders.
6. Produce a list of remaining uncertainties.

The model must not be labelled production-ready while clip geometry or Z curvature remain only inferred.

Use version labels:

- V1 = visual/shape prototype
- V2 = fit/clip prototype
- V3 = manufacturing candidate

---

## Manufacturing guidance

For prototypes:
- PETG acceptable for shape validation
- ASA preferred for external automotive use

For final appearance:
- finish should match the OEM Selenite Silver / TB2 look
- do not rely on filament colour alone if visual match is important

Geometry and manufacturing finish are separate concerns.

---

## Critical behaviour

Do not stop after producing another research summary.

The goal is to BUILD.

Proceed through:

research → image classification → dimensional extraction → parametric geometry → clip map → CAD → exports → renders → validation documentation.

If evidence is insufficient for an exact dimension, do NOT invent precision.

Instead:
1. make it parametric
2. choose a documented prototype value
3. mark it clearly as assumed
4. continue the rest of the model

A partially uncertain but reproducible parametric V1 is preferable to refusing to build anything.

---

## First execution tasks

Start by:

1. Read both reverse-engineering reports completely.
2. Build `docs/source_image_index.md`.
3. Re-check all source URLs.
4. Search specifically for additional rear/profile/clip photos of the exact `81A807925A`.
5. Search specifically for receiver-side photos of exact `81A807681A`.
6. Build a clip inventory C01...Cn.
7. Build the station map S0...Sn for curvature.
8. Produce `docs/dimensional_evidence.md`.
9. Create the parametric CAD V1.
10. Export renders and available CAD formats.
11. Report exactly what remains uncertain.

Do not ask the user for photos until every usable online source has been exhausted.
