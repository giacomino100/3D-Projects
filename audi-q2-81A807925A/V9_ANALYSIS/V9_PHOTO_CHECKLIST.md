# V9 photo checklist — 81A807925A / TB2 (front LEFT)

Rule from `ADD_TO_CLAUDE_V9.md`: V8 is not modified until every item below has been collected locally and reviewed.

## Specimens

Every image belongs to one physical specimen. "Independent" means a different physical part.

| ID | Specimen | Source | Local images |
|---|---|---|---|
| S1 | Leo-b, exact 81A807925A, left | Allegro offer 15311724741 (the addon's "specimen B" link; offerId confirmed in the browser on 2026-10-22) | `925_alB_1..3` |
| S2 | RRR CCM44, exact 81A807925A | rrr.lt ccm44 (3 images, checked in the browser; same 3 already local) | `925_ccm_1..3` |
| S3 | spawplast, exact 81A807925A TB2 | Allegro 11269 (the addon's "specimen A") = RRR pru6165 (same "11269" tag) | `925_alA_1..5`, `925_pru_1..5` |
| S4 | RRR "fre" seller | ovoko fre, 81A807925A | `925_fre_1..5` |
| S5 | KRIK | krik.bg, left 81A807925A | `925_krik_0..2` |
| S6 | Jan Los Auto's | Marktplaats m2320491364 (addon link; same image hash as `925_mp_1`) | `925_mp_1..3` (+ `_hr`) |
| S7 | Fitted on receiver | polovniautomobili 22397355 (81A807681A + 81A807925A assembled) | `681_pa_1` |

## Sources not used

| Source | Reason |
|---|---|
| Allegro 8ec15102 ("lewa lub prawa") | The image is a left + right pair in black/primer, not the silver TB2 left part on its own. Not safe as truth. Saved as `V9_REFERENCE_ADDON/downloads/al8ec_1.jpg`. |
| RRR cpp5934 (81A807681A) | The listing is gone (redirects to search). Other 681A receivers are already local. |
| oemvwshop 81A807671 4W3, eBay group page | Bot-blocked (HTTP 403). Group facts are taken from `KNOWN_FACTS.md`: 8 × 54.8 × 24 cm, ~0.45 kg. These are group-level only and never used as trim dimensions. |
| `671w3_3`, `671w3_4` | Wrong part (Kia grilles). Rejected. |
| `671_eb1_1`, `671w3_2` | Logos only. Rejected. |
| `671w3_1` | Exploded catalogue diagram. Orientation only. |

## Checklist

Column key:
- **XY:** safe for the front silhouette.
- **Z:** safe for Z curvature.
- **Clip:** safe for clip inference.

| Item | Image(s) | Specimen | View / perspective quality | XY | Z | Clip | Confidence | Status |
|---|---|---|---|---|---|---|---|---|
| TARGET_FRONT_A | `925_alB_1` (2560 px) | S1 | Near-frontal, both tips in frame, mild perspective; camera matched | yes | weak (wrap only via perspective) | no | high | DONE |
| TARGET_FRONT_B | `925_ccm_1` (S2); `925_alA_2` (S3) | S2, S3 | `ccm_1`: frontal but END B cropped at the image border. `alA_2`: near-frontal, slightly oblique. | yes (ccm_1 except END B) | weak | no | medium-high | DONE |
| TARGET_OBLIQUE_A | `925_alA_1` | S3 | Front oblique, full part | partial | yes | no | medium | DONE |
| TARGET_OBLIQUE_B | `925_krik_0` (S5); `925_fre_1` (S4) | S5, S4 | `krik_0`: from below/front. `fre_1`: top oblique on a plate. | partial | yes | no | medium | DONE |
| TARGET_PROFILE_GRAZING | `925_mp_2_hr` (S6, along the length); `925_fre_3` (S4, grazing) | S6, S4 | Strong perspective, no scale | no | yes (shape of the wrap) | no | medium-low | DONE |
| TARGET_REAR | `925_alB_2` (S1), `925_alA_4` (S3), `925_pru_4` (S3), `925_krik_2` (S5) | S1, S3, S5 | Rear, full part, clip roots visible | partial | no | yes (positions, s only) | medium | DONE |
| END_A_WIDE_END_CLOSEUP | `925_alA_3` (S3, front low-oblique); `925_alB_1` END A crop (S1) | S3, S1 | `alA_3`: close, strong perspective. `alB_1` crop: frontal. | crop only | yes (qualitative) | no | medium | DONE |
| END_B_NARROW_END_CLOSEUP | `925_alB_1` END B crop (S1, front); `925_fre_3` (S4, rear side of the loop) | S1, S4 | There is no dedicated front close-up of END B. The best front evidence is the 2560 px crop of `alB_1`. | crop only | weak | no | medium | **PARTIAL** (no dedicated front close-up exists in any source) |
| SCALLOP_RECESS_CLOSEUP | `925_alA_3` (S3); `925_fre_2` (S4) | S3, S4 | Close, oblique | no | yes (qualitative depth/shape, **no scale**) | no | medium | DONE |
| INNER_OPENING_TRANSITION_CLOSEUP | `925_fre_2` (S4, opening D-end + pocket); `925_alA_3` (S3) | S4, S3 | Close, oblique | partial | qualitative | no | medium | DONE |
| RECEIVER_81A807681A_A | `681_psh_1..4` | psh specimen | Front and rear of the receiver | — | — | yes (windows) | medium | DONE |
| RECEIVER_81A807681A_B | `681_w48_1..7` (+ `681_w63_1..6`, `681_al_1..5`) | w48 / w63 / al specimens | Front and rear | — | — | yes | medium | DONE |
| ASSEMBLY_81A8076714W3 | `681_pa_1` (S7, 681A + 925A fitted); `671w3_1` (catalogue diagram, orientation only) | S7 | `pa_1`: fitted assembly, frontal, 1600 px | yes (in situ) | weak | context only | medium | DONE (no exact group product photo could be fetched: oemvwshop/eBay blocked) |

## Scale

No image has a reliable metric scale: no ruler, no known dimension in the frame.

- All V8–photo comparisons are made in the photos' own camera frames, on a CAD with the current length L = 472 mm (photo-derived, ±15 mm since V1).
- Depths (recess, ledge) and absolute Z values are **not** measurable from these images. They stay parametric (ASSUMED).
- The group envelope 8 × 54.8 × 24 cm is not a trim dimension and is not used.
