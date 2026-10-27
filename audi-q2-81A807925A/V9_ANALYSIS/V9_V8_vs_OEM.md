# V9: V8 compared with OEM photos (no CAD edits yet)

## Method

- **Tooling:** `work/v9_overlays.py` (camera matched on each photo, then edge measurement along the CAD normals) and `work/v9_zones.py` (zone table).
- **Sign:** `+` means the OEM edge lies outside the CAD contour. For the opening, `+` means the OEM opening is larger.
- **Units:** mm in the CAD frame, with L = 472 mm. **No photo has a metric scale.**
- **Agreement rule:** a correction is accepted only if at least 2 independent specimens give the same sign with |median| > 0.5 mm, and no specimen contradicts it.

## Overall fit

| View | Photo | Specimen | Outer MAE | Opening MAE |
|---|---|---|---|---|
| front_A | `alB_1` | S1 | 0.28 | 0.39 |
| front_B | `ccm_1` | S2 | 0.46 (41 % covered) | 0.82 |
| front_C_assembly | `681_pa_1` | S7 | 0.91 (16 % covered) | 0.48 |
| oblique_A | `alA_1` | S3 | 1.31 | – |
| oblique_B | `krik_0` | S5 | 1.00 | – |
| rear | `alB_2` | S1 | 1.66 | – |
| profile | `mp_2_hr` | S6 | 1.48 (18 % covered) | – |

Full per-zone values: `zone_deviation_V8.json`. Overlays: `overlays/OEM_vs_V8_*.png`.

## Findings by priority

### 1. Global Z curvature: NOT constrained enough to change

- The oblique, rear and profile views disagree with each other:
  - On the rails' bottom edge: S3 −1.0, S5 +1.7, S1 rear −2.4, S6 −0.6.
  - At END A: S3 +0.7, S5 −0.1, S1 rear −2.6.
- No 2-specimen agreement anywhere, so the wrap / Z stations of V5 to V8 stay as they are.

### 2. Scallop / recess: not measurable with silhouette overlays

- Its existence and shape are confirmed qualitatively on `alA_3` (S3), `fre_2` (S4) and `alB_1` (S1): the face sinks between straight rails and deepens towards the opening at END A, as modelled in V8.
- Its depth (D_LEDGE 1.0 / D_RECESS 2.2 mm) **cannot be measured**: there is no scale and no profile section. It stays ASSUMED.

### 3. END A outer contour: no consistent correction

The zone medians conflict in sign across the views.

### 4. Inner opening

- **Rails:** no agreement. S2 top −1.15 mm, S1 −0.08, S7 +0.17. S2 is an outlier.
- **Bottom edge near END B (s 378–412): CONFIRMED by 2 independent specimens.** The OEM opening reaches lower than V8:

  | s range | S1 (`alB_1`) | S2 (`ccm_1`) |
  |---|---|---|
  | 378–392 | – | +2.3 mm |
  | 392–412 | +3.4 mm | +1.7 mm |

  This is exactly the **step that was removed in V8** at the user's request. Both specimens show it, and so does the overlay. **Conflict between the user instruction and the evidence.**
- **Top edge near END B:** S2 +0.95, S7 +0.55, S1 +0.15. This is a weak tendency for the opening to be about 0.5 mm larger.

### 5. END B outer contour: no consistent correction

The views conflict in sign.

## Proposed V9 edits

| Edit | Status |
|---|---|
| (a) Restore the bottom-edge step near END B (photo-confirmed, 2 specimens), keeping the clean straight cavity lines and the band that follows it | Needs the user's decision, because it reverses the user's instruction |
| (b) Top opening edge near END B: +0.5 mm | Optional, weak evidence |
| Everything else | No change: not constrained by ≥ 2 specimens, or not measurable without scale |

## V9 edit applied: rientranza on the opening bottom edge near END B

The user clarified that the feature is a recess (rientranza), not a step. On the `alB_1` zoom it is the lower ledge along the opening ending in a rounded concave notch, while the bead continues.

**Changes:**
- The opening keeps the photo-extracted outline from V7 (`alB_1`), concave notch included.
- The bottom flat band blends into the bead-based ledge before the notch (`BOTTOM_FLAT_S` = (115, 380), fade 30 mm), so the cavity lines stay straight and the ledge ends exactly at the notch.

**Re-measured** (camera-matched; median deviation on the bottom opening edge, s 375–412):

| Specimen | V8 (straight edge) | V9 |
|---|---|---|
| S1 `alB_1` | +3.4 mm | **−0.02 / +0.16 mm** |
| S2 `ccm_1` | +2.3 / +1.7 mm | **+0.01 / −0.11 mm** |

**Opening fit overall:**

| Specimen | V8 MAE | V9 MAE |
|---|---|---|
| S1 | 0.39 | **0.28** |
| S2 | 0.82 | **0.58** |

**Not changed:** global Z, END A, END B outer contour and recess depths. They are not constrained by ≥ 2 specimens, or not measurable without scale.

**Files:** `cad/exports/V9/81A807925A_V9.step`, `cad/fusion/81A807925A_V9.f3d`. These are identical to the V8 files, which were also updated.

## Correction (user): the bottom feature is a recess like the top one, not a notch

The notch in the opening outline was wrong, so it has been removed:

- The opening bottom edge is straight into the END B loop again.
- The bottom cavity now ends at the same place (s ≈ 390, `FLOOR_S_MAX`) and in the same way as the top one, rising to the bead with a curved sweep over `RW_LEDGE`.
- The bottom flat band blends into the bead-based ledge before that point: `BOTTOM_FLAT_S` = (115, 375), fade 25 mm.

**Note:** the earlier silhouette measurement on `alB_1` and `ccm_1` read the end of this recess as an outline deviation (+2 to +3 mm), probably from the shadow of the recess wall. Silhouette overlays cannot tell the two apart.

## V9b: END A made faithful to the photos (alB_1, alA_3)

The user confirmed that the recess depth was the main difference.

| Change | Before | Now |
|---|---|---|
| END A recess depth (`D_RECESS`) | 2.2 mm | **3.5 mm**. ASSUMED: there is no scale, but the rails now stand proud as on the photos. |
| Transition from rails to plate | two levels (ledge + pocket) | **one single concave crease** (`ENDA_SINGLE` up to s 120, blended into the rail ledges by s 160; `RW_POCKET` 2.5 mm). The crease lines are the straight extensions of the opening edges. |
| Slanted nose | no rim; recess faded to 0 at the nose | narrow rolled rim, 4.7 mm (`POCKET_RIM` −2.5). The recess starts at 55 % depth at the nose and deepens to full by s 90 (`RECESS_RAMP_MIN`). |
| Rails at END A | flat | rounded all the way to the nose (`CROWN_S_START` 8) |
| D-end of the opening | loose tab where the deep top wall started | tab removed: the deep top wall now starts 18 mm after the D-end (`work/v8_returns2.py`) |

**Result:** one closed solid with 6 clips. Saved as `cad/exports/V9/81A807925A_V9.step` and `cad/fusion/81A807925A_V9.f3d`.

## V9c: bottom lip recessed inward along the whole part

User feedback, matching the shadow along the bottom rail on `alB_1`: seen from the front the bottom edge is a simple lip, but behind it the rail goes inward.

**Changes:**
- **Bottom channel** (`BOTTOM_CHANNEL`): a recessed channel, 1.6 mm deep (ASSUMED), behind a 1.2 mm lip with a 3 mm roll. It runs from END A to the END B loop.
- **Bottom rail:** no longer crowned (raised).
- **END A:** the plate recess now reaches down to the bottom lip in one gentle roll (`POCKET_TO_LIP`, `RW_LIP_ENDA` 7 mm). There is no horizontal crease underneath any more.

**Remaining:** a small visible jog where the END A plate blends into the channel (s ≈ 150).

**Build:** closed solid with 6 clips. Saved as V9 (STEP + f3d).

## V9d: jog removed where the END A plate enters the bottom channel

The jog had two causes, both fixed:

- **Pocket edge on the rail:** the pocket region ended with a vertical edge on the bottom rail at s 160. It now extends to `POCKET_S_MAX` = 260, so the END A → rails blend (`ENDA_SINGLE` 115–200) governs the transition alone.
- **Order of operations:** the bottom channel is now combined with the rail depth *before* the END A blend, which removes the small ridge.
- **Cleanup:** the old two-level pocket sweep (`b_`) is disabled when `ENDA_SINGLE` is used.

**Result:** the depth profile is continuous with no steps. The part is rebuilt as a closed solid with 6 clips and saved as V9.
