# Clip map — 81A807925A V1

Positions: `s` = distance from the inner tip along the front view (mm); `X_cad = L − s`.
Y/Z = anchor on the rear return (CAD frame). Insertion direction of the whole trim:
**+Z** (pushed rearward into the recess of 81A807681A) — ASSUMED (A-15).
All clips are independent solids (`cad/exports/clips/CLIP_Cxx.step`, and separate bodies
in `81A807925A_V1.step`).

| Clip | Family | Edge | s | X_cad | Y | Z | Tab direction (authoring frame) | Orientation | Receiver evidence (681A) | Repeated | Conf. pos | Dims |
|---|---|---|---:|---:|---:|---:|---|---|---|---|---|---|
| C01 | HOOK_TAB | top | 44 | 428 | −1.0 | 10.2 | +Z | rearward from top return, barb up | slots/barbs on bar above lower opening (w63_5, psh_3) – **ambiguous** | ×3 (C01–C03) | medium | ASSUMED |
| C02 | HOOK_TAB | top | 144 | 328 | −1.0 | 8.2 | +Z | idem | idem | | medium | ASSUMED |
| C03 | HOOK_TAB | top | 282 | 190 | −1.0 | 7.7 | +Z | idem | idem | | low (1 photo) | ASSUMED |
| C04 | TONGUE | outer end | ≈460 | ≈12 | −14 | 31.0 | (0.13, −0.33, 0.94) | rearward + outward from slanted end | 681A outer edge features (w63_4) | single | low | ASSUMED |
| C05 | EYELET | bottom | 308 | 164 | −57 | −1.9 | (−0.02, −0.57, 0.82) = 35° down | rearward/downward from bottom return | lower snap row on 681A rear (psh_3 y≈420–435, w63_5 y≈330) | ×3 (C05–C07) | medium (2 photos) | ASSUMED |
| C06 | EYELET | bottom | 199 | 273 | −57 | −2.2 | idem | idem | idem | | medium (2 photos, Δ1 mm) | ASSUMED |
| C07 | EYELET | bottom | 88 | 384 | −57 | −0.7 | idem | idem | idem | | medium (2 photos) | ASSUMED |

## Clip family parameters (all ASSUMED_PARAMETRIC)

| Parameter | EYELET (C05–C07) | HOOK_TAB (C01–C03) | TONGUE (C04) |
|---|---|---|---|
| base_width | 20.0 | 10.0 | 12.0 |
| base_thickness | 1.8 | 1.8 | 1.8 |
| flex_length | 14.0 | 9.0 | 15.0 |
| window (along edge × along tab) | 10 × 5 | – | 6 × 4 |
| hook_length / hook_height | – | 2.5 / 1.5 | – |
| local angle | 35° outward | 0° | 20° outward |
| root_fillet | 0.8 (param, not modelled V1) | 0.8 | 0.8 |
| clearance (nominal) | 0.30 | 0.30 | 0.30 |

## Evidence notes

* Eyelets (flat tabs with a rectangular window, ~2 mm bridge at the free end) are the
  clearest feature: close-ups fre_5, mp_3, ccm_3, and full views pru_1/pru_4/ccm_2.
  Three on the installed **bottom** edge.
* Small tabs on the installed **top** edge (pru_4 bottom edge after 180° rotation; pru_5).
  Exact shape (barb vs. plain tab) not resolvable → modelled as hook tab with barb.
* Outer-end tongue: seen in pru_4 (long tab at the outer end) and pru_1 (feature visible
  through the loop). Topology low confidence.
* **Receiver ambiguity (open issue):** the bare 681A rear (w63_5) shows three barbs on the
  bar directly above the lower opening at grille positions ≈150 / 236 / 364 mm from the
  grille inner tip. Their spacing (86, 128 mm) fits both the top tabs (100, 138) and the
  eyelets (111, 109) within the photo error, and the frame-to-grille offset is only known
  to ±14 mm (24–52 mm). V1 keeps clip positions from the 925A's own photos; the
  receiver pairing must be confirmed on parts (V2).

## Fit coupons (`cad/exports/clip_test_coupons/`)

For each family: `coupon_<FAM>_trim.stl` (40 × 22 mm trim patch + return + clip) and
`coupon_<FAM>_c{0.20,0.30,0.45}_receiver.stl` (nominal 681A surrogate), plus a STEP
assembly per variant. Interference trim ↔ receiver = 0.000 mm³ for all 9 variants
(checked in `build_report.json`). Print in PETG/ASA, test snap, choose clearance.
