# V8: smooth recess (curved inward transitions)

## Files

- **Fusion:** `cad/fusion/81A807925A_V8.f3d`
  - Component `BODY_81A807925A_V8`: one closed solid.
  - Components `CLIP_C01`, `C02`, `C03`, `C05`, `C06`, `C07`.
- **STEP:** `cad/exports/V8/81A807925A_V8.step`
- **Parameters:** `cad/parameters_v8.py`, which builds on V7.

## Changes from V7

All changes were requested by the user.

1. **No steps.** The face sinks inward through a continuous depth field built into the face surface (`geometry/surface.py: recess_depth`).
   - Along the rails: a band of constant width `RW_LEDGE` = 2 mm sweeps from the bead line down to the ledge. Its lines are straight and parallel to the edge of the part.
   - At END A: the recess sweeps down to the pocket floor.
2. **END A ramp.** The END A recess starts at zero depth at the nose and gets deeper toward the opening. `RECESS_RAMP_S` = s 4 → 118 mm.
3. **Rail crown.** The crown now spans the bead of constant width `W_BEAD`, not the band up to the opening. This removes the bump where the opening steps near END B.
4. **Clip C04 removed.** The END B tongue stuck out of the part.

## Construction

- **Face:** an exact cubic spline (scipy) converted to a single OCC B-spline face. Deviation from the depth field is ≤ 0.02 mm.
- **Skin:** the face is extruded 2.5 mm along Z, as in all earlier versions. A normal offset of 2.5 mm is impossible here because the sweep radii are about 0.3 mm. The skin is then trimmed with the outer contour minus the opening (spline outline). Steps: `work/v8_face_export.py`, `work/v8_skin_occ.py`.
- **Returns:** built from the V7 lofts (`work/v8_returns_v7loft.py`).
  - Outer lip: starts 1.0 mm behind the face and sits 0.3 mm inside the outer wall.
  - Opening returns: start 2.3 mm behind the face and sit 0.05 mm outside the opening wall.
- **Assembly:** the skin and returns were united in Fusion. A 7 mm² internal void between a return and the skin, at s ≈ 395–401, was filled.

## Assumed values

| Parameter | Value |
|---|---|
| `D_LEDGE` | 1.0 mm |
| `D_RECESS` | 2.2 mm |
| `RW_LEDGE` | 2.0 mm |
| `RW_POCKET` | 4.5 mm |
| `RECESS_RAMP_S` | s 4 → 118 mm |

They are not measurable on the frontal photos; a profile photo or a physical measurement is needed.

## Correction: straight cavity lines

User feedback: the cavity lines along the rails were not linear. Three causes, each fixed:

| Cause | Fix |
|---|---|
| The face grid was too coarse across the 2 mm sweep (0.5 mm in y). Because the rails are slightly slanted, this produced a ripple every ~40 mm. | `FACE_GRID` changed to (1.5, 0.2) mm. |
| The photo-fitted outer edges wiggle by about 0.1 mm. | The bead line and the crown tables are smoothed along the edge, `EDGE_SMOOTH` = 8 mm. |
| The rail crown 4t(1-t) ended with a slope, so a crease showed where the bead meets the sweep. | The crown is now 16t²(1-t)², with zero slope at both bead edges. |

A trapped void between the returns and the skin is now filled automatically during the Fusion assembly.

## Correction: bottom cavity parallel to the opening edge

User feedback: the bottom cavity must follow the bottom edge of the opening, END B step included.

- **Flat band** (`BOTTOM_FLAT`): along the opening bottom edge there is a flat band of 1.5 mm at `D_LEDGE`, followed by a 2 mm sweep up to the bead. It follows the edge, step included.
  - It blends in over 40 mm after the END A D-end.
  - It runs out over 8 mm along the END B step (`BOTTOM_FLAT_S`, `BOTTOM_FLAT_FADE`).
- **Bottom bead:** it ends exactly where the band starts.
- **Rail crown** (`CROWN_IN_TABLE`): it is now part of the depth table and uses exact distances to the smoothed outer edge. This removes the sawtooth on the steep legs of the END B loop. On a narrower bead (the END B step) the crown is proportionally lower.
- **Inside the opening:** the blend uses exact distances, which removes the small ticks along the edge.
- **Returns** (`work/v8_returns2.py`): rebuilt on the V8 face itself.
  - The lip starts 1.0 mm behind the face, the opening returns 1.2 mm behind it.
  - Their lateral walls sit 0.3 mm inside the skin walls.
  - The Fusion union now succeeds with one closed shell and no voids.

## Correction: no step on the opening bottom edge

User feedback: the step must not be there, and the line must continue straight.

- **Opening bottom edge:** from s ≈ 345 it is replaced by its straight extension, fitted on s 300–370 (`BOTTOM_STEP_REMOVED` = slope, intercept). The extension joins the END B loop curve smoothly where the loop rises above it (s ≈ 420).
- **Bottom band and ledge:** they follow the straight edge into the loop and end by themselves where the loop band narrows to the bead (`BOTTOM_FLAT_S` ends at 425 with a 14 mm fade, `LEDGE_BOTTOM_S_MAX` = 445).
- **Effect:** the dent below the old step is gone.
- **Top edge:** its step at s ≈ 389 is unchanged.
