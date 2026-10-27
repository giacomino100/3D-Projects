# V2 clip map — 81A807925A (LEFT)

Supersedes `docs/clip_map.md` (V1). Every clip has its **own definition and its own
local frame** in `cad/parameters_v2.py → CLIPS_V2`, built by
`cad/geometry/clips_v2.py`. Coordinates: `s` = distance from the inner tip in the
front view, `X_cad = L − s` (right-handed CAD frame, X toward vehicle right, Y up,
Z rearward). Local frame vectors are given in the CAD frame in
`cad/exports/V2/build_report_v2.json → clips` (t = along edge, d = extension,
p = plate normal).

## 1. What the exact-part photos show (and how V1 was wrong)

| Observation | Photos (exact 81A807925A) | V1 | V2 |
|---|---|---|---|
| All rail tabs are **flat trapezoidal eyelets** (wider at the root), with a **slanted, rounded window** near the free end | fre_5 (close-up), mp_3 (close-up), fre_3, fre_4, pru_4, pru_5 | top tabs were barbed "hook tabs"; eyelets were rectangles with a square hole | 6 trapezoidal eyelets, slanted window, corner-filleted plate |
| Bottom-edge eyelets are larger than top-edge ones | pru_4 (base ≈ 30 mm vs ≈ 26–29 mm at 0.487 mm/px) | all eyelets 20 mm | two families: EYELET_BOTTOM 30/21 mm, EYELET_TOP 26/18 mm |
| Eyelets stand almost perpendicular to the B-side, leaning slightly outward | fre_3, fre_4 (rear oblique), pru_1 (tips visible beyond the edge in front view) | 35° tilt (bottom) / 0° (top) | 15° (bottom) / 10° (top) |
| Eyelet roots grow out of the low perimeter lip, no added block | fre_4, fre_5 | tab simply embedded in the return | root pad (local reinforcement, T_CLIP_ROOT 2.4 mm) merged into the lip, width = base + 2×2 mm |
| Outer-end feature is a **tongue with a window lying ~parallel to the face**, pointing inward behind the loop | pru_1 (seen through the loop at s≈403–427), fre_3 (window tab inside the loop), pru_4 (s≈448–472) | eyelet-like tab pointing rearward | TONGUE_INPLANE, extends −s inward 20 mm, 2 mm behind the skin |
| "Long low feature" on the top rail at s ≈ 374–403 | pru_4 | (not modelled) | **not a clip**: it is the step where the deep opening wall ends (also seen in pru_1 at s≈389) → modelled as wall end, see V1_vs_V2.md |

## 2. Clip table

| Clip | Type (role) | Edge | s [mm] | X_cad [mm] | Shape base/top/height [mm] | Arm t | Window w×h, slant | Tilt | Position evidence | Conf. pos | Conf. dims |
|---|---|---|---:|---:|---|---:|---|---:|---|---|---|
| C01 | EYELET (flexible latch onto 681A barb) | top | 42.1 | 429.9 | 26 / 18 / 10 | 1.6 | 11×3.5, 2.0 | 10° | pru_4 s=42; pru_5; fre_4 near-rail tab by the plate | medium | low |
| C02 | EYELET (flexible latch) | top | 142.1 | 329.9 | 26 / 18 / 10 | 1.6 | 11×3.5, 2.0 | 10° | pru_4 s=142; fre_4 | medium | low |
| C03 | EYELET (flexible latch) | top | 281.1 | 190.9 | 26 / 18 / 10 | 1.6 | 11×3.5, 2.0 | 10° | pru_4 s=281; fre_3 near-rail tab | medium-low | low |
| C04 | TONGUE with window (locating / latch, in-plane) | outer end, y = −11.8 | 470.1 (root) → ≈ 450 (tip) | 1.9 → ≈ 22 | 14 / 9 / 20 | 1.6 | 7×4, 1.5 | in-plane | pru_1, fre_3, pru_4 | low | low |
| C05 | EYELET (flexible latch) | bottom | 306.2 | 165.8 | 30 / 21 / 12 | 1.6 | 13×4, 2.5 | 15° | pru_1 315; pru_4 302 / 301 | medium | low |
| C06 | EYELET (flexible latch) | bottom | 199.3 | 272.7 | 30 / 21 / 12 | 1.6 | 13×4, 2.5 | 15° | pru_1 199; pru_4 199.5 / 200 | medium-high | low |
| C07 | EYELET (flexible latch) | bottom | 90.9 | 381.1 | 30 / 21 / 12 | 1.6 | 13×4, 2.5 | 15° | pru_1 81; pru_4 97 / 95 | medium | low |

Repetition is used **only** where the photos show the same shape repeated
(three bottom eyelets of equal size in pru_4/fre_4; three top eyelets of equal size
in pru_4). Positions, frames and edge geometry are individual per clip.

Insertion direction of the whole trim: +Z (pushed rearward into the 681A recess) —
ASSUMED (unchanged from V1).

## 3. Receivers on 81A807681A

Unchanged conclusion: the bare 681A rear (w63_5, psh_3) shows three barbs on the bar
above the lower opening and a row of features along the lower edge; the pairing with
top vs bottom eyelets cannot be resolved from photos (offset frame↔grille known only
to ±14 mm). Coupon receivers remain surrogates (barb into window).

## 4. Coupons (`cad/exports/V2/clip_test_coupons/`)

Families EYELET_TOP, EYELET_BOTTOM, TONGUE_END × clearances 0.20 / 0.30 / 0.45 mm:
`coupon_<FAM>_trim.stl`, `coupon_<FAM>_c<clr>_receiver.stl`, STEP assemblies.
Interference trim ↔ receiver = 0.000 mm³ for all 9 variants (`build_report_v2.json`).

Anchor heights (CAD Y/Z of each clip root) and the local frame vectors t, d, p are listed in
`cad/exports/V2/build_report_v2.json → clips`; e.g. the bottom eyelets extend along
d ≈ (0, −0.26, 0.97) (15° outward), the top eyelets along d ≈ (0, 0.17, 0.98) (10°),
C04 along d = (0.91, 0, −0.42) (inward, parallel to the locally wrapped face).
