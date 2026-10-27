# CLAUDE_REVISION_V2.md
## Audi Q2 81A807925A TB2 — refinement pass from current V1

### Goal
Refine the existing V1 model of the LEFT Audi Q2 trim `81A807925A / TB2`.
Do NOT restart from scratch unless a geometric inconsistency forces it.

The current V1 is already close in overall topology. The next pass must focus on fidelity.

---

## 1. What is already correct enough to preserve
- Overall left-side frame topology
- Large inner opening
- Broad outer/terminal panel
- General elongated trapezoidal silhouette
- 3D non-planar nature
- Separate rear attachment features
- Continuous outer perimeter concept

Preserve the current parametric structure wherever possible.

---

## 2. Visible issues in the current V1 that must be corrected

### A. Front face is too planar / too "CAD-flat"
The visible silver surface currently reads as a mostly flat sheet with a bent outer end.
The OEM part is a molded automotive trim and should read as a continuous sculpted surface.

Action:
- Add mild crown/convexity to the visible face.
- Avoid a single flat front plane.
- Use section-based lofting with local normals, not a flat sketch plus thickness.
- Ensure face normal changes gradually along the perimeter.

Priority: HIGH

---

### B. Curvature in Z is concentrated too much in one bend
Current V1 appears to keep most of the long body relatively flat, then introduces a stronger twist/bend near the outer end.

Action:
- Distribute Z curvature progressively along the length.
- Start the depth change earlier.
- Use at least 8-12 stations along the centerline.
- Inspect the exact-part photos from RRR/Allegro/KRIK and compare the silhouette in oblique views.
- Avoid a "hinge-like" transition.

Priority: HIGH

---

### C. Upper rail is too straight and mechanically uniform
The upper visible band currently looks like a long straight beam.

Action:
- Introduce the subtle OEM arc.
- Allow local width variation.
- The rail should not have constant visual thickness from inner to outer end.
- Check exact target photos before modifying.

Priority: HIGH

---

### D. Lower rail is too uniform
The lower visible band is currently modeled with almost constant width/depth.

Action:
- Reconstruct the lower edge as a separate spline.
- Do not derive it by offsetting the upper edge or centerline uniformly.
- Let the opening taper naturally.
- Preserve a smooth automotive surface rather than a mathematically perfect constant offset.

Priority: HIGH

---

### E. Inner opening currently looks too regular
The opening appears overly CAD-clean, with near-uniform border width and mathematically regular corner radii.

Action:
- Trace the exact inner opening independently from the outer perimeter.
- Do NOT generate the inner opening by uniform offset.
- Use independent control points for all four transition zones.
- Match local corner radii to photos.

Priority: HIGH

---

### F. Terminal pointed end is too sharp / too symmetric
The narrow terminal end currently converges to a very clean point.

Action:
- Compare multiple exact `81A807925A` photos.
- Soften the terminal radius.
- Make the transition asymmetric if supported by photos.
- Preserve the rear return geometry separately from the visible edge.

Priority: HIGH

---

### G. Broad terminal panel transition is too abrupt
The broad solid area at the opposite end currently changes from thin rail to wide panel too suddenly.

Action:
- Rebuild this region with 3-4 local sections.
- Blend the width increase gradually.
- Add surface crown.
- Avoid a single planar trapezoid.

Priority: HIGH

---

### H. Edge radii are too uniform
The model currently uses a visually similar radius around most edges.

Action:
Create separate parameters:
- R_outer_visible
- R_inner_visible
- R_terminal_upper
- R_terminal_lower
- R_rear_return
- R_clip_root

Do not use one global fillet for all edges.

Priority: MEDIUM/HIGH

---

## 3. Clip system — current V1 is placeholder quality

The orange tabs in the current model are useful for topology, but they should NOT be considered OEM-like yet.

Visible current problems:
- repeated rectangular shape
- repeated square hole
- similar size on most tabs
- simplified insertion direction
- weak integration with rear rib
- clip bases look added-on rather than molded into the trim

### Required correction
Rebuild attachment features from the exact target/receiver evidence.

Use:
- `81A807925A` exact-part rear/oblique photos
- receiving grille/support `81A807681A`
- complete assembly `81A807671 4W3`

For each clip:
- identify whether it is a hook, tongue, stop, locating tab, or flexible latch
- number it C01...Cn
- map its actual direction
- create a unique local coordinate system
- record confidence

Do NOT clone one generic clip around the part unless images prove repetition.

Priority: CRITICAL for fit

---

## 4. Rear geometry is too clean and uniform
The rear perimeter currently appears as a continuous, nearly uniform return/rib.

Action:
- Look for interruptions, local bosses, steps, reinforcement ribs, clip roots and changes in return depth.
- Add rear structure only where supported by images.
- Keep uncertain structures parametric.

Priority: HIGH

---

## 5. Thickness should not be globally constant
Do not use a single wall thickness as an implicit OEM truth.

Keep separately parameterized:
- visible skin
- rear return
- rib thickness
- clip root
- flexible clip arm
- local reinforcement

If a value is not measured, mark it `ASSUMED_PARAMETRIC`.

---

## 6. Required comparison method

Before modifying geometry:
1. Collect the best exact target views from:
   - RRR `81A807925A`
   - Allegro exact target listings
   - KRIK exact target
   - Marktplaats exact target
2. Create:
   - front reference
   - rear reference
   - left oblique
   - right oblique
   - shallow side/profile reference
3. Generate equivalent camera views from V1.
4. Compare silhouette and local landmarks.

Do NOT compare screenshots with different perspective without correcting/approximating camera angle.

---

## 7. Landmark system

Add named landmarks to the CAD:

P01 inner-upper end
P02 upper rail 25%
P03 upper rail 50%
P04 upper rail 75%
P05 outer-upper shoulder
P06 outer-most point
P07 outer-lower shoulder
P08 lower rail 75%
P09 lower rail 50%
P10 lower rail 25%
P11 inner-lower end

For every landmark record:
- X
- Y
- Z
- outer-edge tangent
- visible-band width
- local face normal

This will make photo-derived corrections explicit and reproducible.

---

## 8. Curvature validation

Create plots/tables for:
- Z(P01..P11)
- local section rotation
- visible-band width along arc length

Look for:
- abrupt Z jumps
- sudden rotation changes
- constant-width regions that photos do not support

The desired result should be smooth in first derivative except where the OEM molded feature clearly creates a crease.

---

## 9. Deliver V2 outputs

Generate:
- `81A807925A_V2.step`
- `81A807925A_V2.stl`

Renders:
- `V2_front.png`
- `V2_rear.png`
- `V2_top.png`
- `V2_side.png`
- `V2_iso_front.png`
- `V2_iso_rear.png`

Also create:
- `docs/V1_vs_V2.md`
- `docs/V2_landmarks.md`
- `docs/V2_clip_map.md`
- `docs/V2_remaining_uncertainties.md`

---

## 10. V1 vs V2 report requirement

For each changed feature, report:

| Feature | V1 issue | V2 correction | Evidence | Confidence |
|---|---|---|---|---|

Do not write "improved" without explaining the actual geometric change.

---

## 11. Important restriction
Do NOT use visually similar Audi Q2 parts as dimensional truth.

The exact target remains:
`81A807925A / 81A807925A TB2`

Related receiver/assembly references may be used only for mating geometry:
- `81A807681A`
- `81A807671 4W3`

Other Q2 variants are only qualitative references and must never overwrite exact-target evidence.

---

## 12. Final objective for V2
V2 should visually overlay the OEM part much better in:
- front silhouette
- inner opening shape
- terminal transitions
- Z curvature
- rear attachment topology

Do not attempt to call V2 production-ready until clip dimensions and mating fit have been physically validated.
