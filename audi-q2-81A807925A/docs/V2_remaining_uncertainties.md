# V2 remaining uncertainties — 81A807925A (LEFT)

V2 is still a **shape prototype** (visual + improved topology). It is **not**
production-ready: clip dimensions and the mating fit with 81A807681A have not been
physically validated (revision §12).

Ranked by impact on fit:

| # | Item | V2 status | Evidence type | What would close it |
|---|---|---|---|---|
| 1 | Clip **dimensions** (eyelet base/top/height, window, arm thickness) | proportioned on pru_4 (0.487 mm/px) and close-ups; absolute sizes ±3 mm | PHOTO_DERIVED (low) / ASSUMED | calliper on a real part, or close-up with ruler |
| 2 | Pairing eyelets ↔ 681A barbs (which edge latches where) | unresolved (spacing fits both rows) | PHOTO_DERIVED (ambiguous) | 681A rear + 925A rear side by side with ruler; or test-fit coupons on a real 681A |
| 3 | **Z curvature amplitude** | wrap 36.8 mm, onset 0.45 L, exponent 3 = best of a 45-point scan; alternatives within +1 % cost: (28, 0.45, 3.0), (28, 0.60, 2.2). Small wraps (≤ 12 mm) are clearly rejected (+15 %) | PHOTO_DERIVED (multi-view, low-medium) | top view of the isolated part with ruler, or a 3D scan |
| 4 | **Crown** (transverse convexity) | 0.82 mm, imposed | ASSUMED (silhouettes cannot see it: cost change < 0.01 px) | straight-edge across the face |
| 5 | Section pitch / twist | 6° + 4° (unchanged) | ASSUMED | side photo with ruler |
| 6 | Visible height H | 53.1 mm from the 5-view fit (V1 58 from two single-view ratios) | PHOTO_DERIVED | tape measure |
| 7 | Bottom visible band | 6–11 mm along s, varies with the fitted spline; small waviness (±2 mm) may be residual segmentation noise | PHOTO_DERIVED (medium-low) | frontal photo with ruler |
| 8 | Deep wall on the opening top edge | depth 12 mm, ends with a step at s = 389 mm | PHOTO_DERIVED (low) for depth, medium for the step position | calliper |
| 9 | Lip depth, return thicknesses, skin thickness | 4.0 / 1.8 / 2.5 mm | ASSUMED | calliper |
| 10 | Outer-end tongue C04 geometry | in-plane tongue, 14/9/20 mm | PHOTO_DERIVED topology (low), ASSUMED size | rear close-up of the outer end |
| 11 | Edge radii | parameters R_OUTER_VISIBLE 1.2 / R_INNER_VISIBLE 0.8 / R_REAR_RETURN 0.5 / R_CLIP_ROOT 1.0 exist but **no visible-edge fillet is in the V2 solid** (OCC timeout, Fusion ASM_BL_BLEND_TOO_BIG) | ASSUMED | radius gauge; V3 surface rebuild |
| 12a | Top visible band | 4.6–7.5 mm in V2 (multi-view fit) vs 8.5 mm in V1 (one near-frontal photo, w63_3) | PHOTO_DERIVED, conflicting | frontal photo with ruler |
| 12b | Opening outer end | KRIK sample (krik_0) suggests the opening reaches further toward the outer end than V2 | PHOTO_DERIVED (one view from below, confounded by returns) | frontal photo of an isolated part |
| 12 | Scale | L = 472 mm from the group box (548 mm) via two photos, ±15 mm | PHOTO_DERIVED | tape measure (single most valuable number) |

## Method limits

* Shape fit used 5 installed photos of **one** physical sample (eBay 267760879656);
  holdout checks on corner_4 (same sample, camera not used in the fit) and on two
  **other** samples (KRIK, RRR pru6165) — see `docs/V1_vs_V2.md`.
* Cameras: pinhole, no lens distortion, shared focal 7000 px (product photos with a
  long lens; focal is weakly identifiable).
* Silhouette fitting cannot observe surface detail inside the outline (crown, bead,
  return depths); those stay ASSUMED.
* Allegro exact-target listings remain inaccessible (bot protection).
