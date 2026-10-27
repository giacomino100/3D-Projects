# V4 → V5 change log — 81A807925A / TB2 (LEFT)

Workflow (CLAUDE_V5_OEM_GEOMETRY_RECOVERY.md): references downloaded and curated → reference board → camera-matched overlays of the CURRENT CAD (V4) on 7 exact-target views → hypotheses H1–H6 tested quantitatively → ONLY supported changes applied → V5 rebuilt and re-matched. `cad/parameters_v5.py` imports V4; nothing rebuilt from zero.

## 1. Reference set

`fetch_exact_references_playwright.py` was run: RRR 4 images (all already in the local set, identical), Marktplaats 1 (identical), Allegro 0 (bot protection in headless mode — the 2500/2560 px Allegro originals were already downloaded earlier through the in-app browser), receiver B2 (polovniautomobili, part number 81A807681A verified on the page): **new** 1600 px frontal photo of 681A with a fitted 925A = 4th independent specimen with both tips visible. Curated set: `analysis/image_manifest.csv`, board `analysis/reference_board.png`.

## 2. Hypothesis tests on V4 (measured, before any edit)

| Hyp. | Test | Result | Verdict |
|---|---|---|---|
| H1 wide end over-regularized | outer-edge deviation for s < opening start, 5 views | mean −0.12 / −0.04 / +0.31 / +0.09 / −0.30 mm; MAE 0.26 (front A) … 1.41 mm (front C, dark grille background) | NOT supported (no consistent signed error) |
| H2 opening = offset | CAD band widths at 10/25/50/75/90 % vs photos | CAD bands already non-uniform: upper 8.8→7.6, lower 13.2→8.9 mm; front A matches within 0.1–0.7 mm. Front B upper +1.5…1.8 mm, front C upper +0.1…+1.6 (mean +0.4) and lower +1.0…1.5 mm | NOT supported as an offset problem; residual spread ~1–1.7 mm between specimens with no common direction (see uncertainties) |
| H3 upper rail too straight | max deviation from the s 140–380 chord | CAD 0.6 mm vs OEM 0.59 (A) / 0.74 mm (B); shape residual RMS 0.10 / 0.29 mm | NOT supported |
| H4 lower rail too clean | same, lower edge | CAD 0.47 vs OEM 0.46 mm (A); shape residual RMS 0.34 mm | NOT supported |
| H5 Z single-arc vs compound | leave-one-view-out (alA_1, krik_0, alB_2): 2-parameter wrap vs wrap + 2 local bumps | held-out cost law4 vs law2: +0.17 / −0.05 / −0.01 mm, bump amplitudes run to the bounds | compound NOT supported. BUT a fixed-law amplitude scan (camera refit per candidate, 4 views / 4 specimens) puts every view's minimum at A ≥ 55 mm (V4: 40) → **amplitude changed** |
| H6 face too planar | luminance across rails vs plate (alB_1, 3 stations) | rails: full specular highlight cycle, L* range 126.1–119.1; plate central 60 %: 59.6 | SUPPORTED for the rails (rounded section); magnitude not measurable |

## 3. Geometric changes V4 → V5

| Area | V4 | V5 change | Evidence | Confidence |
|---|---|---|---|---|
| Z wrap amplitude (outer/narrow end) | z_mid(outer end) = 40 mm, onset 0.60 L | 55 mm, same onset and law (21 stations S00–S20, denser at wide-end, opening start and narrow-end turn); body depth 61 → 80 mm (min thickness over rotations 48 → 60 mm, still < 80 mm group envelope) | H5 amplitude scan: minima alA_1 55, mp_2 55, krik_0 65, alB_2 65 mm | MEDIUM-LOW (cost differences 0.07–0.15 mm per view; range 50–65) |
| Rail cross-section | flat in y (only a global 0.82 mm crown over the full height) | each rail gets its own convex section, sagitta 1.2 mm, faded over 15 mm at both opening ends (plate unchanged) | H6 highlight profiles | existence HIGH, magnitude LOW (ASSUMED 1.2 mm) |
| Loft sections | 11 points | 33 points per section (needed to carry the rail crown) | — | — |
| Outer / opening planform | V4 | unchanged | H1–H4 not supported | — |
| Clips, rear | V4 | unchanged (brief §9: after front convergence) | — | — |

## 4. Result (outer-edge MAE, mm; camera re-matched on each model)

| View | V4 outer | V5 outer | V4 opening | V5 opening |
|---|---:|---:|---:|---:|
| front_A (925_alB_1 Leo-b) | 0.23 | 0.26 | 0.29 | 0.30 |
| front_B (925_ccm_1 RRR ccm44) | 0.68 | 0.80 | 0.69 | 0.66 |
| front_C_assembly (681_pa_1 polovni (new)) | 1.93 | 0.87 | 1.33 | 0.45 |
| oblique_A (925_alA_1 spawplast) | 1.39 | 1.39 | — | — |
| oblique_B (925_krik_0 KRIK) | 0.85 | 0.74 | — | — |
| rear (925_alB_2 Leo-b) | 1.81 | 1.61 | — | — |
| profile (925_mp_2_hr Marktplaats) | 1.65 | 1.26 | — | — |

Oblique B −0.11, rear −0.20, profile −0.39 mm; front A +0.03, front B +0.12 mm (within the ≈1 px edge noise of a 1024 px photo); front C coverage changed (119 → 53 edge samples) so its MAE is not comparable. Accepted per protocol §7 (improves the Z-sensitive views without clearly degrading another).

## 5. Stop criteria

| Criterion | Status |
|---|---|
| outer silhouette agrees with ≥ 2 specimens | yes: Leo-b 0.26, ccm44 0.80, KRIK 0.74 mm |
| inner opening agrees with ≥ 2 specimens | yes: Leo-b 0.30, ccm44 0.66, polovni 0.45 mm |
| wide end agrees in front + oblique | yes: P01 1.0 mm (front A), oblique B 2.4 mm; oblique A hand pick 6.8 mm (see uncertainties) |
| narrow end agrees in front + oblique | front A + oblique B yes (≤ 2.3 mm); **oblique A: OEM tip projects ~10 mm beyond the CAD in both V4 and V5** → open |
| Z compatible with ≥ 2 oblique/profile views | yes (alA_1, mp_2, krik_0 all prefer ≥ 55 mm) |
| front no longer reads as a flat plate | rails now carry a convex section; plate flat as in the photos |
| remaining differences documented | `remaining_uncertainties.md` |

**Status: V5 is not declared final** (oblique-A narrow-end mismatch, band-width spread between specimens, rail-crown magnitude assumed).

## 6. Files

- `81A807925A_V5_master.step` / `.stl` (pack root), Fusion `cad/fusion/81A807925A_V5.f3d`
- `renders_V5/` (Fusion views + 4 camera-matched renders), `analysis/overlays/OEM_vs_V4_*.png`, `OEM_vs_V5_*.png`
- `analysis/landmark_residuals.csv` (P01–P24, V4 and V5), `analysis/curvature_profile.csv` + `.png`, `analysis/stations.csv`
- tests: `hypothesis_tests_V4.json`, `pa1_bands_V4.json`, `H5_leave_one_out.json`, `H5_wrap_amplitude_scan.json`, `H6_highlight_profiles_alB1.*`
## 7. Curvature diagnostic (`curvature_profile.png` / `.csv`)

- Centerline = mid-height line of the visible face. Spike at arc 0–5 mm: the centerline turns round the inner tip where the height goes to 0 (geometric, expected). Ripple 0.005–0.015 1/mm at arc 15–60 mm: the slanted wide-end lower edge (photo-traced spline, R ≥ 70 mm, ≈ 0.2 mm amplitude, below photo resolution). Peaks at arc 440–490 mm: narrow-end turn.
- Z vs arc: one smooth wrap from arc ≈ 300 mm (no hinge); V5 reaches 60 mm at the narrow end vs 43 mm in V4.
- Twist: 6° → 12.5° over the wrap zone (ASSUMED law, unchanged except for the new wrap timing).
- Band widths: non-uniform in both versions (upper 9.0 → 6 mm, lower 13.2 → 6.5 → 10.5 mm with the measured steps at arc ≈ 385–400 mm); identical between V4 and V5 because the planform was not changed.
- No self-intersection (STEP round-trip: 1 closed solid, 0 free edges; STL watertight), no section flip (twist monotonic).
