# Dimensional evidence — 81A807925A V1

Every number used by `cad/parameters.py`. Evidence types:
`CERTAIN_OEM_OR_CATALOG` · `MULTI_SOURCE_CONFIRMED` · `PHOTO_DERIVED` · `ASSUMED_PARAMETRIC` · `UNVERIFIED`.

**No OEM drawing, no OEM dimension of the isolated 925A exists in any public source found.**
The only catalogue dimensions are the complete-group envelope.

## 1. Identity and non-dimensional facts

| Fact | Value | Source | Type | Confidence |
|---|---|---|---|---|
| Part number | 81A807925A | molded on 4 independent samples (ccm_3, fre_5, krik_1, mp_3) | CERTAIN | ~100 % |
| Finish | TB2 Selenite Silver | catalogue (V0.2, handlerparts/oemvwshop) | CERTAIN | high |
| Molded designation | `Zierrahmen Gitter BASIS Li` | molded text | CERTAIN | ~100 % |
| **Material** | **PC+ABS** (`>PC+ABS<`) | molded text, 4 samples | CERTAIN | ~100 % |
| Project / supplier | AU276, SMP / PNE | molded | CERTAIN | ~100 % |
| Receiver | 81A807681A, `Gitter Seite links`, **ASA anthrazit**, `Audi AU276 Basis` | molded (psh_4, w63_6, corner_11) | CERTAIN | ~100 % |
| Topology | **925A is the silver loop at the bottom of 681A only** (one through-opening, solid plate at the inner end) — it does NOT surround the whole grille | psh_1/2, w63_1/3, corner_1–7 (3 independent assemblies) | MULTI_SOURCE_CONFIRMED | high |

## 2. Calibration (group 81A807671 4W3)

| Parameter | Value | Unit | Measures | Source | Type | Confidence | Mfg-safe |
|---|---:|---|---|---|---|---|---|
| GROUP_X | 548 | mm | group envelope X | oemvwshop (via report V0.1; site behind Cloudflare 2026-10-20) | CERTAIN_OEM_OR_CATALOG | high | yes, **group only** |
| GROUP_Y | 240 | mm | group envelope Y | idem | CERTAIN_OEM_OR_CATALOG | high | yes, group only |
| GROUP_Z | 80 | mm | group envelope Z | idem | CERTAIN_OEM_OR_CATALOG | high | yes, group only |
| group mass | 0.45 | kg | group | idem | CERTAIN_OEM_OR_CATALOG | high | n/a |
| Calibration check | H/W = 405/910 px = 0.445 | – | 681A+925A rear, psh_3 | vs 240/548 = 0.438 (Δ 1.6 %) | PHOTO_DERIVED | high | – |
| Scale psh_3 | 0.602 | mm/px | | 548 / 910 px | PHOTO_DERIVED | medium | no |

## 3. Front-view planform

| Parameter | Value | Unit | Measures | Source / method | Type | Conf. | Mfg-safe |
|---|---:|---|---|---|---|---|---|
| L | 472 (±15) | mm | X extent of 925A (projected front view) | psh_3: 790 px × 0.602 = 476; corner_4: frame/grille ratio 0.857 × 548 = 470 | PHOTO_DERIVED (2 photos agree) | medium | prototype only |
| H | 58 (±6) | mm | Y height | psh_3: 95 px × 0.602 = 57; w63_1: H/L = 0.128 × 472 = 60 | PHOTO_DERIVED (2 photos) | medium | prototype only |
| W_TOP | 8.5 | mm | visible top bar | w63_3: 18 px / 123 px × H | PHOTO_DERIVED | low-med | no |
| W_BOT | 16.5 | mm | visible bottom band | w63_3: 35 px / 123 px × H | PHOTO_DERIVED | low-med | no |
| W_OUTER | 8.0 | mm | outer-end band (horizontal) | w63_3: ~17 px | PHOTO_DERIVED | low | no |
| OPEN_X0 (s) | 110 (±10) | mm | opening start from inner tip | pru_1: 232/995 × L; confirmed by overlay corner_4 | PHOTO_DERIVED (2 photos) | medium | no |
| INNER_RUN | 40 (±12) | mm | X run of inner slanted end | psh_1z ~45° slant; pru_1 | PHOTO_DERIVED | low | no |
| OUTER_RUN | 46 (±10) | mm | X run of outer slanted end | w63_3 (≈50°), pru_1 | PHOTO_DERIVED | low-med | no |
| R_OUTER_TOP | 7 | mm | outer top corner radius | w63_3 ~15 px | PHOTO_DERIVED | low | no |
| R_OUTER_BOT | 26 | mm | outer bottom corner radius | w63_3 ~55 px | PHOTO_DERIVED | low | no |
| R_OPEN_IN | 10 | mm | opening inner-end radius | pru_1, w63_1 | PHOTO_DERIVED | low | no |
| R_TIP, R_INNER_BOT, R_OPEN_OUT_* | 5 / 14 / 5, 15 | mm | radii | — | ASSUMED_PARAMETRIC | – | no |
| V0.1 sanity band "330–355 × 185–200 mm" | — | — | — | **REJECTED**: based on the wrong assumption that 925A frames the whole grille | — | — | — |

## 4. 3D shape (Z)

| Parameter | Value | Unit | Measures | Source | Type | Conf. | Mfg-safe |
|---|---:|---|---|---|---|---|---|
| Z_WRAP_OUTER | 28 | mm | rearward displacement of outer end vs straight part | corner_3, corner_7, mp_2 (qualitative), bounded by GROUP_Z = 80 | PHOTO_DERIVED (low) | low | no |
| X_WRAP_START | 0.60 L | – | onset of the wrap | corner_3, mp_2 | PHOTO_DERIVED (qualitative) | low | no |
| Z_SAG_MAIN | 4 | mm | convex bow over full length | fre_1 shows a bow, not measurable | ASSUMED_PARAMETRIC | low | no |
| PITCH_DEG | 6 | ° | top edge rearward of bottom edge | not measurable | ASSUMED_PARAMETRIC | low | no |
| TWIST_OUTER_DEG | +4 | ° | extra pitch over wrap zone | not measurable | ASSUMED_PARAMETRIC | low | no |
| Resulting body depth | 47.6 | mm | Z extent of the V1 trim | computed | derived | – | ≤ GROUP_Z ✔ |

## 5. Section / wall

| Parameter | Value | Unit | Type | Notes |
|---|---:|---|---|---|
| T_SHELL | 2.5 | mm | ASSUMED_PARAMETRIC | V0.1 prototype value; typical PC+ABS trim 2.2–2.8 |
| T_WALL | 2.0 | mm | ASSUMED_PARAMETRIC | |
| D_RET_OUTER | 6.0 | mm | ASSUMED_PARAMETRIC | returns visible in fre_3/fre_4, depth not measurable |
| D_RET_OPEN | 4.0 | mm | ASSUMED_PARAMETRIC | |
| D_RET_TOP | 10.0 | mm | ASSUMED_PARAMETRIC | deep top surface seen in pru_1 oblique (see assumptions A-12) |
| EDGE_FILLET | 1.0 | mm | ASSUMED_PARAMETRIC | applied on 12 front edges |

## 6. Clips (positions in `s` = distance from inner tip, front view; X_cad = L − s)

| Clip | s [mm] | X_cad | Edge | Source of position | Position type | Dimension type |
|---|---:|---:|---|---|---|---|
| C01 | 44 | 428 | top | pru_4 (130 px) | PHOTO_DERIVED | ASSUMED |
| C02 | 144 | 328 | top | pru_4 (335 px), pru_5 | PHOTO_DERIVED | ASSUMED |
| C03 | 282 | 190 | top | pru_4 (620 px) | PHOTO_DERIVED (1 photo) | ASSUMED |
| C04 | ≈460 (y = −14) | ≈12 | outer end | pru_4 (900–975 px), pru_1 | PHOTO_DERIVED (low) | ASSUMED |
| C05 | 308 | 164 | bottom | pru_1 665/995 → 315, pru_4 660 → 302 | MULTI_SOURCE (2 photos, Δ13 mm) | ASSUMED |
| C06 | 199 | 273 | bottom | pru_1 → 199, pru_4 → 199.5 | MULTI_SOURCE (Δ1 mm) | ASSUMED |
| C07 | 88 | 384 | bottom | pru_1 → 81, pru_4 → 97 | MULTI_SOURCE (Δ16 mm) | ASSUMED |

Clip sizes (width, thickness, length, window, hook): **ASSUMED_PARAMETRIC**, see `clip_map.md`.
Estimated part mass (PC+ABS 1.15 g/cm³, V1 volume 58.7 cm³): **≈ 68 g** — derived, not OEM.
