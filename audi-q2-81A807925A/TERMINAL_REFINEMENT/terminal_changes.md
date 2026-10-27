# Terminal changes (V5 → terminal refinement)

Not rebuilt from zero: `cad/parameters_v6.py` imports V5 and overrides only `OPENING_CPS` inside the two END B recess windows. Clips, rear, central rails, scale: unchanged. Rule: a change only where ≥ 2 exact-target specimens agree; otherwise documented.

| Region | Previous mismatch | Geometric change | Reference | Confidence |
|---|---|---|---|---|
| END B recess, opening BOTTOM edge (R01–R05), s 360–414 | V5 step from −38.9 to −43.1 mm spread over s 377–393 (15 mm ramp, 0.6 mm too deep) | step re-traced: −38.9 → −42.5 mm over s 379–387 (~8 mm), minimum raised 0.6 mm; max local move 0.67 mm | alB_1 (edge points), shape confirmed on ccm_1 | MEDIUM (existence/shape HIGH, position from 1 specimen) |
| END B recess, opening TOP edge, s 370–414 | V5 smooth 25 mm ramp −8.4 → −7.4 | sharp step at s ≈ 389: −8.3 → −7.1 mm over ~4 mm; max local move 0.93 mm | alB_1, shape confirmed on ccm_1 | MEDIUM |
| END A (all landmarks A01–A13) | conflicts between specimens (see analysis) | none | — | — |
| END B outer contour B01–B07, inner turn B08–B12 | residuals ≤ 0.5 mm on Leo-b; other specimens conflict in sign | none | — | — |
| END B tip in oblique A | ~10 mm, explained only by a 17 mm Z change contradicted by the profile view | none (documented) | alA_1 vs mp_2 | — |

## Radii / band widths

No global fillet is used. Terminal radii are properties of the traced splines (END A nose ≈ 3.3 mm, END B upper shoulder ≈ 3.5 mm, END B lower sweep ≈ 17–18 mm, END A lower sweep ≈ 70 mm); visible-edge fillets remain unapplied (OCC). Band widths vary continuously (see EA/EB station tables and `REFERENCE_PACK_V5/analysis/curvature_profile.csv`).

## Stop criteria

| END A | status |
|---|---|
| upper silhouette agrees with multiple photos | Leo-b ±0.25 mm; ccm44/polovni −0.5…−1 mm → partially (specimen conflict) |
| outer descent / lower sweep / nose | Leo-b ≤ 0.3 mm (nose +1.1 single view); KRIK oblique ≤ 0.6 mm | yes except nose (1 view) |
| inner opening termination | conflicting specimens | open |
| front + oblique explained by one 3D geometry | KRIK oblique 0.59 mm MAE, alA_1 1.3 mm | yes |
| END B | status |
|---|---|
| tapered end in front view | Leo-b ≤ 0.3 mm | yes |
| inner opening turn | Leo-b ≤ 0.5 mm, others conflict | partially |
| tip asymmetry | matches (front + KRIK) | yes |
| recess | confirmed on 2 specimens and modelled | yes (position from 1 specimen) |
| front + oblique + profile consistent | front + KRIK + profile yes; alA_1 tip no | partially |

**Status: terminals not declared final** (END A specimen conflicts on the upper approach and opening termination; END B tip in one oblique view).

## Measured effect of the recess change (objective edge points, rms / max distance to the CAD edge in the recess windows)

| photo | edge | V5 | terminal refinement |
|---|---|---|---|
| alB_1 (Leo-b) | opening top, s 372–412 | 0.43 / 1.00 mm | 0.09 / 0.18 mm |
| alB_1 (Leo-b) | opening bottom, s 362–412 | 0.41 / 0.71 mm | 0.12 / 0.48 mm |
| ccm_1 (ccm44) | both | unchanged (steps ~10–12 mm earlier along s, see analysis; points include wall edges) | unchanged |

Full-part and terminal-zone metrics on all other views are unchanged within ±0.05 mm (the change is local), except oblique A
(edge coverage changed 222 → 254 samples, MAE 1.39 → 1.66 mm, mean −0.02 → −0.23 mm: the extra samples are on the wrapped END B;
the terminal-zone MAE for END B in that view went 1.15 → 0.94 mm).

## Outputs
- `81A807925A_terminal_refinement.step` / `.stl` (this folder), Fusion `cad/fusion/81A807925A_terminal_refinement.f3d`
- `renders/` 01 full front, 02 full rear, 03 full oblique, 04–06 END A front / oblique / profile, 07–09 END B front / oblique / profile
- `overlays/OEM_END_{A,B}_*_overlay_{V5,V6}.png` (+ `_edges_`), `recess_V5_vs_V6.png`, `recess_steps_*.png`, `terminal_deviation_profiles_V5.png`
- `END_A_landmarks.md`, `END_B_landmarks.md`, `terminal_overlay_analysis.md`
