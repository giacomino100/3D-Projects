# V3 → V4 front changes — 81A807925A / TB2 (LEFT)

Scope: front-visible geometry only (CLAUDE_V4_FRONT_REFINEMENT.md). V3 = baseline (`cad_baseline/V3_current_renders`). Not rebuilt from zero: `cad/parameters_v4.py` imports V3 and overrides only `OUTER_CPS` and `OPENING_CPS`. Z law, sections, crown, rear and clips are unchanged.

## Method

1. Reference board `analysis/reference_board.png` (REF_01…REF_12 + 2 receiver images; exact 81A807925A / 81A807681A only).
2. Camera matched per photo on the V3 CAD (pinhole, picks + edge refinement, camera side enforced) → V3 overlays `overlays/OEM_vs_CAD_*.png` produced BEFORE any edit.
3. Edge deviations along the outline binned every 20 mm of s, upper/lower half separately, for the two INDEPENDENT front photos (`front_deviation_profiles_V3.png`, `front_agreement_V3.json`).
4. A correction is applied ONLY where both front photos agree in sign and exceed 0.5 mm (moved by the SMALLER of the two), or where it repairs a V3 regression proven against the earlier 13-station measurement. Conflicting regions are NOT averaged.
5. Rebuild → re-match cameras → re-measure (`*_V4` overlays, `front_deviation_profiles_V4.png`). Iterated until no bin agrees on an error > 0.5 mm.

## Change table

| Area | V3 mismatch | V4 geometric correction | Source image(s) | Confidence |
|---|---|---|---|---|
| Lower rail, outer edge, s 290–440 (narrow-end half) | wave −1.0 mm at s 320–370 and +1.2 mm at s 400–420 (alB_1); introduced by the V3 terminal splice/refit, not by the OEM | R1: edge moved along its normal by the alB_1 measured deviation (smoothed, 12 mm tapers): 226 samples, max 1.23 mm | REF_01 (5 px/mm), consistent with the V3-A 13-station readings | medium-high (ccm_1 lower edge in shadow) |
| Upper rail, outer edge, s 300–385 | OEM outside CAD by +0.5…0.6 (alB_1) and +0.6…0.96 mm (ccm_1) | R2: moved outward by the smaller of the two: mean 0.45 mm, max 0.63 mm → upper band locally ~0.5 mm wider | REF_01 + REF_02 | medium (2 specimens agree) |
| Narrow end, upper shoulder, s 425–455 | OEM inside CAD: −0.6 (alB_1), −1.25 mm (ccm_1) | R3: moved inward by the smaller: mean -0.39 mm, max 0.59 mm → tip shoulder slightly tighter | REF_01 + REF_02 | medium |
| Opening, lower edge at the loop end, s 400–440 | opening too small: +1.12 (alB_1) and +1.63 mm (ccm_1) after iteration 1 | R4: opening edge moved outward by the smaller (max 1.8 mm after smoothing) → lower turn of the opening ~1 mm larger | REF_01 + REF_02 | medium |
| Upper band width (outer upper s 150–250; opening upper s 290–410) | CONFLICT: alB_1 ≈ 0 mm, ccm_1 shows the top band ~1.5–2 mm wider | NOT changed. Camera elevations differ by only 7°, so perspective does not explain it; candidates: ccm_1 resolution (≈2 px/mm) with rounded/shaded edges, or specimen variation | REF_01 vs REF_02 | unresolved |
| Wide solid end (P01, P15), opening start (P03) | P01 1.0 mm, P15 0.1 mm; P03 ±3 mm (shadow / end wall) | unchanged (no 2-photo agreement possible: ccm_1 crops the tip) | REF_01, REF_07b | — |
| Inner opening shape | independent spline (not an offset) since V3 | unchanged except R4 | — | — |

## Measured result (mean |deviation| in mm; camera re-matched on each model)

| View | outer V3 | outer V4 | opening V3 | opening V4 |
|---|---:|---:|---:|---:|
| front_01 (925_alB_1 (Leo-b, 2560 px)) | 0.35 | 0.23 | 0.26 | 0.29 |
| front_02 (925_ccm_1 (RRR ccm44, 1024 px)) | 0.73 | 0.68 | 0.76 | 0.69 |
| oblique_01 (925_alA_1 (spawplast)) | 1.33 | 1.39 | — | — |
| oblique_02 (925_krik_0 (KRIK)) | 0.86 | 0.85 | — | — |

20-mm bins where both front photos agree on an error > 0.5 mm: V3 4 → V4 0. Bins where the two photos disagree with each other by > 1 mm: V3 8, V4 11 (photo-vs-photo conflicts, not fixable by moving the CAD).

## Stop criteria (brief §10)

| Criterion | Status |
|---|---|
| outer silhouette matches ≥ 2 independent photos | yes: alB_1 0.23 mm, ccm_1 0.68 mm, KRIK 0.85 mm |
| inner opening matches ≥ 2 independent photos | yes within 0.7 mm: alB_1 0.29, ccm_1 0.69 mm (ccm_1 band-width conflict documented) |
| wide-end proportions agree | alB_1 only (tip cropped in ccm_1): P01 1 mm, P15 0.1 mm |
| narrow-end shape agrees | yes on both fronts after R3/R4 |
| upper/lower band-width changes agree | lower band: yes; upper band: CONFLICT ccm_1 vs alB_1 (~1.5 mm), unresolved |
| ≥ 2 oblique views consistent with the same 3D geometry | alA_1 1.39 mm and KRIK 0.85 mm with the same model (Z law from V3-B) |

**Status:** front geometry converged on every region where two independent exact-target photos agree; the upper-band width remains open (the two photos conflict by ~1.5 mm). Not production-ready; clips unchanged (provisional).

## Outputs

- `81A807925A_V4_front_refined.step`, `81A807925A_V4_front_refined.stl` (pack root; also `cad/exports/V4/`)
- `renders_V4/`: front ortho + perspective, rear, top, bottom, 2 sides, 2 oblique front, 2 oblique rear, wide-end and narrow-end close-ups; Fusion file `cad/fusion/81A807925A_V4.f3d`
- `analysis/reference_board.png`, `analysis/overlays/OEM_vs_CAD_{front_01,front_02,oblique_01,oblique_02}.png` (V3) and `*_V4.png`
- `analysis/front_landmarks.md`, `analysis/front_deviation_profiles_V3.png` / `_V4.png`