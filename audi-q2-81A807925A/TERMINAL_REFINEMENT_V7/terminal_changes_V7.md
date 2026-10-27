# Terminal refinement 2 (V7): beads, END A recess, regular END B loop

What triggered this: user feedback on V6, with two crops of photo `925_alB_1`.

- **END A:** "c'è un rientro e sopra e sotto invece continuano dritte lungo tutto il pezzo".
- **END B:** "è regolare ma al momento sembra ci sia un errore su fusion".

## What V6 got wrong

1. **The "recess" was modelled in the wrong place.**
   - V6 turned the two steps of the opening near END B into planform steps of the visible face, all at face level.
   - In the photo those steps are where a **lower ledge** ends, and the ledge sits behind the rail bead.
   - At face level they showed up as notches in the band (Fusion render `07_END_B_front_closeup`, V6).
2. **The END B loop contour had waves and a hook.**
   - The V4/V5 opening is off from the real loop by up to 1.4 mm at s 425–458.
   - It bulged upward near the inner tip corner (s 440–455).
3. **END A had no recess.**
   - The wide end was a flat plate flush with the rails.
   - On the real part the plate is set back between two beads, and the beads run straight to the tip.

## Measurements

All measurements are on `925_alB_1`, using camera `cam_V5_front_A`.

| Item | Method | Result |
|---|---|---|
| Bead width | gradient edges in 12 columns, back-projected (`work/term2_measure.py`, `bead_measure.json`) | **Top rail:** crease at d = 6.4–7.0 mm from the outer edge, opening edge at 8.4–9.0 (ledge 1.4–2 mm).<br>**Bottom rail:** opening edge at 11–12.5 (ledge ~4 mm).<br>**END B loop band:** 6.9–7.5 mm.<br>→ **W_BEAD = 7.2** |
| END A recess boundary | same columns, s 32–110 | **Top:** crease at d 9.4–10, which continues the opening top edge (d ≈ 9).<br>**Bottom:** crease at d ≈ 13.5, which continues the opening bottom edge (d 11–13).<br>So the recess is bounded by the **straight extensions of the opening edges**. |
| END B inner loop contour | ray casting from 5 seeds inside the loop, back-projected; 1350 edge points (`work/term2_loop.py`, `loop_contour_alB1.png/json`) | Smooth, regular contour. V6 deviates by up to 1.4 mm (mean 0.37 mm). |
| Depths | not measurable on frontal photos | **D_LEDGE = 1.0, D_RECESS = 2.2 mm.** These are ASSUMED magnitudes. Their existence is confirmed on alB_1, alA_3 (oblique close-up of END A) and fre_2. |

## Changes from V6

Files touched: `cad/parameters_v7.py`, `geometry/planform.py: recess_polygons`, `geometry/surface.py`.

1. **Opening outline** (`OPENING_CPS`, 750 points, so the steps are not smeared): from s = 362 to the END B tip it is moved along its normal onto the alB_1 loop contour. This removes the waves and the hook. The two steps from alB_1 are kept.
2. **Bead:** a band of width W_BEAD along the whole outer edge, at face level, including the END A nose and the END B loop.
3. **Ledge (−1.0 mm):** the outer contour inset by W_BEAD.
   - It is clipped at s = 392, where the steps are; beyond that the END B loop is bead only.
   - Along the opening it becomes the thin ledge that ends with the two steps.
4. **END A pocket (−2.2 mm):**
   - It lies between the straight extensions of the opening's top and bottom edges, fitted on s 135–175.
   - It stays ≥ 1.2 mm inside the bead around the nose.
   - It runs into the opening's D-end.
5. **Construction:**
   - The ledge and pocket are the same 2.5 mm skin, set back.
   - The skin, ledge, pocket, lip and opening returns are fused.
   - Each boolean is checked by volume.
6. **Simplifications:**
   - The bead/ledge and ledge/pocket transitions are sharp steps. On the real part they are soft concave sweeps, best seen in alA_3.
   - The step edges can be filleted in Fusion; OCC fillets time out on these spline edges.

## Still open

- The depths D_LEDGE and D_RECESS need a profile photo or a physical measurement.
- The radius of the transitions is not modelled.

## Validation

Measured with the 1350 edge points of the alB_1 loop, for s > 370:

| Version | Median | p90 | Max |
|---|---|---|---|
| V5 | 0.37 mm | 1.12 mm | 1.50 mm |
| V6 | 0.20 mm | 1.12 mm | 1.50 mm |
| **V7** | **0.08 mm** | **0.15 mm** | 1.48 mm (isolated texture point) |

### Build and import

- **Build:** valid, all boolean volume checks passed.
- **Volumes:** ledge 5750 mm³, pocket 6957 mm³, body 45380 mm³.
- **Clips:** C01–C07 all valid.
- **Fusion:** imported as a solid; renders are in `renders/`.

## Fillets on the recess steps (Fusion)

I selected the edges by distance from the theoretical step lines (`work/term2_step_edges.py` → `cad/fusion/V7_step_edges.json`) and filleted them in Fusion.

| Step edge | Result |
|---|---|
| bead → ledge, concave (foot of the step) | **applied, r = 0.4 mm** (0.6 mm failed). |
| ledge → pocket, concave | failed at r = 0.6 and 0.4 mm: `ASM_BL_CAP_COMPLEX`. |
| bead → ledge, convex | failed at r = 0.3 mm: `ASM_BL_END_TOO_CMPLX`, also with the 28 edges next to the opening excluded. |
| ledge → pocket, convex | not attempted, because the same chain-end condition makes it fail. |

**Why the others fail:** the edge chains end against the walls of the opening (D-end and END B steps). The fillet kernel cannot close the chain ends there. The boundaries are also dense polylines (0.5 mm segments), which makes it harder.

**Outputs:**

- `81A807925A_terminal_refinement2_fillet.step`
- `cad/fusion/81A807925A_V7_terminal_refinement2_fillet.f3d`
- renders 10–12

**Robust fix (not done yet):** build the transitions into the geometry as inclined/curved walls, instead of filleting vertical steps afterwards.
