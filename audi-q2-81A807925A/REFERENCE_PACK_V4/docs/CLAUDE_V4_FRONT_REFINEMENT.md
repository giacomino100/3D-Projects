# CLAUDE_V4_FRONT_REFINEMENT.md

## Objective

Refine the current CAD of the exact LEFT Audi Q2 trim:

`81A807925A / 81A807925A TB2`

The current model is close overall.  
DO NOT restart from zero.  
The next pass is primarily a **front-visible-surface fidelity pass**.

The current front design is still visibly different from the real OEM part shown in the exact-target web references.

---

## 0. Mandatory first step: build a real reference board

Before changing any CAD geometry:

1. Read `web_references/SOURCE_MANIFEST.md`.
2. Download and inspect ALL useful images from the exact-target sources.
3. Build `analysis/reference_board.png`.
4. Select at least:
   - 2 independent front/near-front exact-target photos
   - 2 oblique exact-target photos
   - 1 rear exact-target photo
   - 1 close-up of the wide solid end
   - 1 close-up of the narrow end
   - 1 receiver-side image of `81A807681A`

Do not modify control points before the reference board exists.

---

## 1. Freeze what is already good

Preserve unless evidence proves a conflict:

- overall left/right orientation
- global length scale logic
- current non-planar 3D architecture
- rear system concept
- current clip positions as temporary topology markers
- current main assembly structure

Do NOT let front-shape refinement trigger an unnecessary complete rebuild.

---

## 2. FRONT FACE is now the priority

The current CAD still differs from OEM in the visible front geometry.

The front must be treated as an independently traced automotive surface, not as a cleaned-up mathematical frame.

Correct these areas using exact-target photo overlays:

### A. Wide solid end

The large filled region is still too idealized.

Measure/check:
- maximum height
- maximum width
- top curvature
- lower sweep
- outer terminal radius
- transition into upper rail
- transition into lower rail

Do not use a generic teardrop/trapezoid construction.

### B. Inner opening

The inner opening must be traced independently.

Do NOT generate it using a uniform offset from the outer perimeter.

Check separately:
- opening start near solid end
- upper opening edge
- lower opening edge
- far terminal turn
- local radii at both ends
- taper along length

### C. Narrow outer end

Check:
- actual tip radius
- top/bottom asymmetry
- opening-to-tip transition
- visible band width
- surface twist

Avoid a perfectly symmetric or mathematically neat point.

### D. Upper rail

Check whether current rail is:
- too straight
- too constant in width
- too constant in section
- too smooth/regular

Use OEM overlay.

### E. Lower rail

Treat as an independent spline.
Do not derive from the upper rail or from constant-width offsets.

Check:
- sag/rise
- local width changes
- transition near narrow end
- transition near wide end

---

## 3. Surface character

The OEM part is molded automotive trim.

The visible front surface must have:
- mild crown
- changing local normal
- smooth but non-uniform transition
- controlled section twist

Avoid a flat face with a constant shell thickness appearance.

Use section/loft logic.

---

## 4. Photo-registration workflow

For each chosen OEM exact-target photo:

1. Estimate camera perspective.
2. Match an equivalent CAD camera.
3. Render current baseline.
4. Generate:
   - 50% alpha overlay
   - silhouette/edge overlay
5. Save under:
   `analysis/overlays/`

At minimum:
- OEM_vs_CAD_front_01.png
- OEM_vs_CAD_front_02.png
- OEM_vs_CAD_oblique_01.png
- OEM_vs_CAD_oblique_02.png

No front-shape edits before these exist.

---

## 5. Landmark system

Create P01...P20 on both OEM reference and CAD.

Suggested landmarks:
- wide-end outer tip
- wide-end maximum upper point
- wide-end maximum lower point
- opening start upper
- opening start lower
- upper rail 25/50/75%
- narrow upper shoulder
- narrow-most tip
- narrow lower shoulder
- lower rail 75/50/25%
- local inflection points visible in reference photos

Record:
- CAD X/Y/Z
- image pixel coordinate
- estimated residual
- confidence

Save:
`analysis/front_landmarks.md`

---

## 6. Do not over-regularize

The following are forbidden unless confirmed by exact-target evidence:
- constant band width
- constant fillet radius
- globally uniform wall section
- inner opening = outer contour offset
- single circular/elliptical terminal construction
- one generic curvature spline for the whole visible face

The OEM surface may be slightly asymmetric and locally non-uniform.

---

## 7. Current clip geometry

Do NOT spend the majority of this pass rebuilding clips.

Treat current orange clips as provisional.

Only modify a clip if:
- front-surface correction causes direct collision
- exact target + receiver image clearly proves its current position is impossible

After front geometry converges, clips will receive a separate fit pass.

---

## 8. Required V4 outputs

CAD:
- `81A807925A_V4_front_refined.step`
- `81A807925A_V4_front_refined.stl`

Renders:
- front orthographic
- front perspective
- rear
- top
- side
- 2 oblique front views
- 1 oblique rear view
- wide-end close-up
- narrow-end close-up

Analysis:
- `reference_board.png`
- front overlays
- landmark table
- `V3_vs_V4_front_changes.md`

---

## 9. V3 vs V4 change log

Create a table:

| Area | V3 mismatch | V4 geometric correction | Source image(s) | Confidence |
|---|---|---|---|---|

No vague "improved shape" wording.

Describe:
- spline moved by...
- radius changed...
- opening widened/narrowed...
- local band width changed...
- control station adjusted...

---

## 10. Stop criterion

Do not call front geometry complete until:

- outer silhouette matches at least 2 independent exact-target photos
- inner opening matches at least 2 independent exact-target photos
- wide-end proportions agree
- narrow-end shape agrees
- upper/lower band-width changes agree
- at least 2 oblique views are consistent with the same 3D geometry

If different photos conflict because of perspective, do not average blindly.
Resolve via camera matching and document uncertainty.

The goal is convergence to the real `81A807925A`, not aesthetic plausibility.
