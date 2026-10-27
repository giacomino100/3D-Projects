# Validation — status of V1 and plan to V2/V3

Version label: **V1 = visual / shape prototype**. Not a fit prototype, not a
manufacturing candidate (clip geometry and Z curvature are inferred).

## CLAUDE.md validation checklist

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 1 | Front silhouette overlay on ≥ 2 independent exact-target photos | **Done** | `validation/overlay_corner_4_installed.jpg` (installed, eBay corner) — outline, opening start and height match without being fitted; `validation/overlay_pru_1_isolated_front.jpg` (isolated, RRR pru6165) — X positions match, Y foreshortened by elevated camera (expected). psh_1 overlay **rejected** (close-range perspective, outer end cropped). |
| 2 | Rear clip positions on ≥ 2 exact-target photos | **Done (partial)** | eyelets C05–C07 from pru_1 + pru_4 (Δ ≤ 16 mm); top tabs C01–C03 and tongue C04 from pru_4 only (+ pru_5 for C01/C02) |
| 3 | Clip positions vs receiving grille 81A807681A | **Open** | receiver pairing ambiguous (see clip_map.md) |
| 4 | Assembly placement vs 81A8076714W3 | **Partial** | scale check H/W 0.445 vs 0.438; frame/grille X ratio 0.857–0.87 on two photos; exact placement not modelled |
| 5 | Front/rear/top/side/iso renders | **Done** | `renders/*.png` (+ `iso_rear.png`, `clip_coupons.png`) |
| 6 | List of remaining uncertainties | **Done** | below |

## Automatic checks (run by `cad/build_model.py`, see `cad/exports/build_report.json`)

* body, fused part and every clip: `isValid() == True`
* STL watertight (trimesh), STEP re-imported in Autodesk Fusion: 8 solid bodies, volumes
  identical to CadQuery (body 56 558 mm³)
* bounding box 472.0 × 58.0 × 47.6 mm (body) — X and Y equal to photo-derived L and H by
  construction; Z < group 80 mm
* coupon interference trim ↔ receiver: 0.000 mm³ for all 9 variants

## Remaining uncertainties (ranked)

1. **Z wrap / pitch / twist** (low confidence) — no calibrated side/top view online.
2. **Receiver pairing of top tabs vs eyelets** with the 681A barbs.
3. **Clip dimensions** (all assumed) and clip shape of the top tabs.
4. **Section**: shell thickness, return depths, top-bar section (A-12).
5. L ± 15 mm, H ± 6 mm (scale from catalogue group box via photos).
6. Small radii and slant runs (INNER_RUN ± 12, OUTER_RUN ± 10 mm).
7. Group envelope 548 × 240 × 80 mm not re-verified on 2026-10-20 (site behind Cloudflare).

## Online sources: exhausted

All listings in reports V0.1/V0.2 re-checked, plus RRR searches (3 × 925A, 3 × 681A
listings), eBay (5 listings), KRIK, Marktplaats, web search on both part numbers.
Allegro pages blocked by bot protection (one is the same item as RRR pru6165). No
public source gives a calibrated rear/side view, a section, or clip dimensions.

## What would retire the main uncertainties (photos/measurements, in priority order)

1. Isolated part lying on a table, **side view and top view with a ruler/tape** in frame
   → Z wrap, bow, pitch (retires #1).
2. Calliper: shell thickness at an edge, return depth, eyelet width/thickness/window,
   top tab size (retires #3, #4).
3. Total length / height with a tape (retires #5).
4. Rear of 681A with the 925A removed, next to the 925A rear, both with a ruler
   (retires #2).

## Plan

* **V1 (this)**: print the full part (PETG/ASA) → check silhouette and wrap against the
  car; print the 9 coupons → choose clearance per family.
* **V2 (fit prototype)**: update parameters from measurements above, model root fillets
  and real barb/ramp shapes, add the frame placement inside the 681A recess.
* **V3 (manufacturing candidate)**: only after V2 fit trial on a real 81A807681A.
