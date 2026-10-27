# Terminal overlay analysis — 81A807925A

Cameras matched on the full part for each exact-target photo (V5 workflow); terminal crops: `overlays/OEM_END_*_overlay_V5.png` (before) and `_V6.png` (after), edge overlays `*_edges_*.png` (red = OEM edges, cyan = CAD silhouette).

## Terminal-zone deviation (mean / MAE, mm)

| terminal / view | outer V5 | outer V6 | opening V5 | opening V6 |
|---|---|---|---|---|
| A_front_A | -0.15 / 0.26 | -0.14 / 0.24 | 1.37 / 1.85 | 1.17 / 1.65 |
| B_front_A | -0.17 / 0.24 | -0.17 / 0.23 | 0.36 / 0.58 | 0.42 / 0.64 |
| A_front_C_assembly | -0.97 / 0.97 | -0.98 / 0.98 | 0.67 / 0.67 | 0.80 / 0.82 |
| B_front_C_assembly | -0.00 / 0.35 | 0.08 / 0.34 | 0.49 / 0.49 | 0.51 / 0.55 |
| A_oblique_A | 0.29 / 1.28 | 0.00 / 1.36 | — / — | — / — |
| B_oblique_A | 0.11 / 1.15 | 0.16 / 0.94 | — / — | — / — |
| A_oblique_B | -0.46 / 0.59 | -0.45 / 0.59 | — / — | — / — |
| B_oblique_B | 0.50 / 0.80 | 0.58 / 0.82 | — / — | — / — |
| B_profile | -2.18 / 2.18 | -2.37 / 2.37 | — / — | — / — |

## Hypotheses of the brief, tested

| Hypothesis | Evidence | Verdict |
|---|---|---|
| END A upper edge too straight for too long | Leo-b (2560 px) residual ±0.25 mm along the whole upper approach (13 earlier manual stations + edge search); ccm44 and polovni show −0.5…−1.0 mm (OEM edge lower) on s 35–75 | CONFLICT between specimens (the same pattern as the upper-band conflict of V4/V5); not applied |
| END A descent too clean / nose too smooth | Leo-b: outer-descent residuals ≤ 0.3 mm; nose +1.1…1.3 mm on 3 samples (single view, the other specimens crop or shadow the nose) | single-view → not applied, kept as uncertainty |
| END A broad surface too planar | plate luminance range 60 vs rails 104–126 (V5 H6 test): the plate IS nearly flat-shaded | not supported for the plate (rails already rounded in V5) |
| END A opening termination | Leo-b ≈ 0, polovni +0.4…+1.8, ccm44 −0.4…−1.4 mm on the same bins | CONFLICT (opposite signs) → unchanged |
| END B tip asymmetric | Leo-b front: tip/shoulder residuals ≤ 0.3 mm; KRIK ≤ 0.85 mm | CAD tip asymmetry (upper shoulder R 3.5, lower sweep R 17–18) already matches |
| END B inner turn = generic fillet | Leo-b ≤ 0.5 mm along the turn; polovni and ccm44 conflict in sign (±0.5–0.9) | no consistent signal → unchanged |
| END B local concave recess | objective background-edge extraction on Leo-b and ccm44: BOTH show two sharp band steps (bottom edge −38.9 → −42.5 mm, top edge −8.3 → −7.1 mm) with ~8 mm transitions; V5 had 15–25 mm ramps | CONFIRMED (2 specimens) → modelled explicitly (R-feature) |
| END B 3D (oblique A tip ~10 mm off) | tip offset in alA_1 decomposes to Δz ≈ −17 mm (tip more forward); the Marktplaats profile puts the tip within 2.7 mm of the CAD; Leo-b front within 1.7 mm; alA_1 is a close-range wide-angle shot (f ≈ 1440 px, 27 cm) with the tip at the image border, lens distortion not modelled | CONFLICT (one view) → not applied, documented |

## Recess position conflict

ccm44 shows both steps ≈ 10–12 mm closer to END A than Leo-b. ccm44 crops END B, so its camera has no constraint at that end and its s-scale near the right border is not reliable; Leo-b has both tips in frame at 5 px/mm. Position therefore from Leo-b; the transition shape (sharp, ~8 mm) is common to both.

## Naming of the required overlays

| required | file | note |
|---|---|---|
| OEM_END_A_FRONT_overlay | `overlays/OEM_END_A_FRONT_overlay_V6.png` (+ `_FRONT_2_` polovni) | |
| OEM_END_A_OBLIQUE_overlay | `overlays/OEM_END_A_OBLIQUE_overlay_V6.png` (+ `_OBLIQUE_2_` KRIK) | |
| OEM_END_A_CLOSEUP_overlay | not produced | the only close-up of END A (925_alA_3) shows < 1/4 of the part, so its camera cannot be matched without a landmark scale; the 2560 px frontal crop (`OEM_END_A_FRONT`) is used as close-up |
| OEM_END_B_FRONT_overlay | `overlays/OEM_END_B_FRONT_overlay_V6.png` (+ `_FRONT_2_` polovni) | |
| OEM_END_B_OBLIQUE_overlay | `overlays/OEM_END_B_OBLIQUE_overlay_V6.png` (+ `_OBLIQUE_2_` KRIK) | |
| OEM_END_B_PROFILE_overlay | `overlays/OEM_END_B_PROFILE_overlay_V6.png` | Marktplaats rear profile |
| edge overlays | `overlays/*_edges_V6.png` | red = OEM edges (Canny), cyan = CAD silhouette |
