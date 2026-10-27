# START HERE — Codex handoff: Audi Q2 81A807925A / TB2 CAD

You are picking up a running CAD reverse-engineering project. This file explains:

- what the part is;
- where the work stands;
- how to rebuild the model;
- the rules the user has set;
- every correction the user has asked for, so you don't redo them wrong.

## 1. The part

| Item | Value |
|---|---|
| Part | Audi Q2 (81A) front LEFT lower grille trim, **81A807925A / 81A807925A TB2** (selenite silver) |
| What it is | The silver frame that clips onto the receiving grille **81A807681A** |
| Assembly | Group **81A807671 4W3** |

Group-level facts (from `V9_REFERENCE_ADDON/.../04_ANALYSIS/KNOWN_FACTS.md`):

- catalogue envelope 8 × 54.8 × 24 cm;
- weight ~0.45 kg.

**These are GROUP dimensions. Never use them as trim dimensions.**

**No OEM dimension of the isolated trim is public.** All geometry comes from photos of the exact part, collected from several independent physical specimens.

## 2. Current state (latest = V9)

### Deliverables

| File | Contents |
|---|---|
| `cad/fusion/81A807925A_V9.f3d` | Fusion: component `BODY_81A807925A_V8` (one closed solid) plus clips CLIP_C01, C02, C03, C05, C06, C07. C04 was removed by the user. |
| `cad/exports/V9/81A807925A_V9.step` | Same content as STEP |
| `V9_ANALYSIS/` | V9 photo checklist, V8-vs-OEM comparison, zone-deviation tables, camera-matched overlays |

### Frame

- CAD frame: X_cad = L − s (X towards the vehicle's right), Y up, Z rearward, in mm. L = 472 mm (photo-derived, ±15).
- Authoring frame used in all parameters: **s** = distance from the END A tip.

### Terminology

| Term | Meaning |
|---|---|
| END A | The wide solid end at s ≈ 0, with the deep recess/plate and the slanted nose |
| END B | The narrow loop end at s ≈ 470 |
| Opening | The long inner hole |
| Rails | The top and bottom bands |

## 3. Hard rules from the user (do not break)

1. **Do not modify by eye.** The loop is: measure → overlay → modify → re-validate.
2. Use **only photos of the exact 81A807925A** as dimensional truth. Similar Q2 parts and the receiver/assembly are for context, clip windows and orientation only.
3. A correction is valid only if **at least 2 independent specimens** agree on it and no other exact photo contradicts it. Don't average blindly.
4. **Don't invent precision.** Values without a reliable scale stay parametric and are marked ASSUMED. No photo has a metric scale.
5. Don't restart from scratch. Keep the clips, rear, rails and scale unless the evidence demands otherwise.
6. Don't model scratches, bends or removal damage seen on used parts.
7. The user's latest visual instructions beat earlier photo-silhouette inferences. Silhouette overlays can mistake a recess shadow for an outline deviation; this happened in V9.
8. The user wants the result as a **clean Fusion 3D model**: one body plus clips, no leftover helper bodies or surfaces. They don't want renders as the deliverable. Screenshots are only for checking, or when they ask for them.

## 4. History of user corrections (read before touching the face)

Versions V1–V6 cover the planform, Z wrap and clips (see the reports in `docs/`, `REFERENCE_PACK_V4/`, `REFERENCE_PACK_V5/`, `TERMINAL_REFINEMENT/`). From V7 on, the user's feedback drove the changes below. The full detail is in `TERMINAL_REFINEMENT_V7/terminal_changes_V7.md`, `TERMINAL_REFINEMENT_V8/README_V8.md` and `V9_ANALYSIS/V9_V8_vs_OEM.md`.

| Ver | User feedback | Implemented |
|---|---|---|
| V7 | END A has a "rientro"; the top and bottom rails stay straight; END B loop must be regular | Bead + ledge + END A pocket. END B loop fitted to the `alB_1` contour. |
| V8 | No vertical steps: the transitions are **curved inward** | Smooth depth field inside one B-spline face (`surface.recess_depth`, `_face_surface`) |
| V8 | END A recess starts from one side and gets **deeper towards the big opening** | Ramp along s (`RECESS_RAMP_S`) |
| V8 | Cavity lines must be **straight and follow the part** (top and bottom) | Constant-width sweep, smoothed edges, crown with zero slope at the edges, fine face grid |
| V8 | Bottom cavity runs **parallel to the opening bottom edge** | Flat band along the opening edge (`BOTTOM_FLAT`) |
| V8 | **No step** on the opening bottom edge near END B; the line continues straight | Straight extension of the bottom edge into the loop |
| V9 | (photo comparison) | Tried restoring a notch. **WRONG**: the user said it is a **recess like the top one**. Now the edge is straight and the bottom cavity ends at s ≈ 390, like the top one (`FLOOR_S_MAX`). |
| V9b | **Recess depth** was the main difference from the original; fix the rest too | END A plate 3.5 mm deep (ASSUMED); **one single crease** from rail to plate; narrow rolled rim on the nose; rails rounded to the tip; loose tab at the opening D-end removed |
| V9c | Bottom lip: "frontally a simple lip, but in depth it goes **inward**", for the whole length (the shadow on `alB_1`) | Recessed bottom channel 1.6 mm deep (ASSUMED) behind a 1.2 mm lip, from END A to the END B loop. No crown on the bottom rail. END A plate rolls down to the lip with no crease. |
| V9d | Make the jog invisible where the END A plate enters the channel | Pocket no longer ends on the rail; blend s 115–200; channel combined before the END A blend |

**Removed by the user:** clip C04 (END B tongue, which stuck out of the part).

### Known open points

- **Assumed depths:** D_LEDGE 1.0, D_RECESS 3.5 and channel 1.6 mm are ASSUMED. They need a profile photo or a physical measurement.
- **Nose highlight:** a slight irregular highlight remains along the slanted-nose crease at END A.
- **Unconstrained:** global Z curvature, END A outer contour and END B outer contour. The specimens disagree, so there is no 2-specimen agreement (see `V9_ANALYSIS/zone_deviation_V8.json`).
- **Missing photo:** no dedicated front close-up of END B exists in any source.

## 5. How the model is built (pipeline)

The face cannot be built with OCC booleans. A dense B-spline face hangs or fails silently in OCC, which is why the skin is built in OCC as a Z-prism but the assembly is done in Fusion.

### Requirements

- Python 3.12+ with the packages in `requirements.txt`.
- Autodesk Fusion with the local MCP add-in at `http://127.0.0.1:27182/mcp`.

### Steps

Run from `work/`.

```
python v8_face_export.py     # smooth visible face (parameters_v8) -> cad/exports/V8/fusion_parts/face_v8.step  (~3 min)
python v8_skin_occ.py        # face extruded 2.5 mm along Z, trimmed by the spline ring -> skin_v8_occ.step       (~6 min)
python v8_returns2.py        # outer lip + opening returns on the same face -> lip_v8.step, ret_open_v8.step     (~13 min)
python ../fusion_scripts/mcp_call.py ../fusion_scripts/fus_v8_build2.py
        # Fusion: new doc, union skin+returns (TemporaryBRepManager), fills trapped voids, adds clips C01-C07 minus C04,
        # exports cad/fusion/81A807925A_V8.f3d and cad/exports/V8/81A807925A_V8.step; log in fusion_parts/build_log.txt
```

Then copy the V8 outputs to the V9 names (the V9 files are the latest build).

### Parameter chain

`cad/parameters.py` → `parameters_v2.py` → … → `parameters_v8.py`. Each file imports the previous one and overrides values.

- `parameters_v8.py` holds **all** V8 and V9 settings, each block commented with the user feedback behind it.
- Geometry code:
  - `cad/geometry/planform.py`: outlines, recess regions.
  - `cad/geometry/surface.py`: `zf`, `recess_depth`, `_face_surface`, `rail_crown`, slabs.
  - `cad/geometry/clips_v2.py`: clips.
  - Legacy full build: `cad/build_model_v2.py` with env `Q2_PARAMS=parameters_v7`. **It does not work for V8+**: the booleans hang. Use the pipeline above.

### Quick check of the depth field

The depth field takes ~2 min to compute. Plot `SF.recess_depth(S, Y)` and its gradient over an (s, y) grid before rebuilding: this catches steps and jogs early. Many inline snippets for this are in the history; the pattern is `Model("V8").SF.recess_depth`.

### Photo registration and overlays

Tools in `work/reg.py`:
- `Model(version)`;
- pinhole camera fit;
- edge measurement along the CAD normals.

Main scripts:
- `work/v9_overlays.py V8`: camera-matched overlays on 7 views (2 frontal from different specimens, assembly, 2 oblique, rear, profile).
- `work/v9_zones.py`: per-zone medians with the 2-specimen agreement rule.

Camera solutions are cached as `cam_*.json` in `REFERENCE_PACK_V5/analysis/overlays` and `V9_ANALYSIS/overlays`.

### Fusion MCP

`fusion_scripts/mcp_call.py <script.py>` sends a Python script (with a `run(_context)` function) to the Fusion MCP server.

- Long operations time out on the client but keep running in Fusion. Wait until Fusion is idle (CPU stops), then read the log file the script writes.
- Never run a modifying script while a Fusion command dialog is open.
- All scripts hard-code `C:\Users\giaco\Documents\pezzo audi\...`. Adjust these paths if the project moves.

## 6. Reference photos (`docs/reference_images/`, URLs in `_download_urls.txt`)

| ID | Specimen | Images |
|---|---|---|
| S1 | Leo-b, Allegro 15311724741 | `925_alB_1..3`. `alB_1` is the best frontal (2560 px, **rotated 180°**: image top = installed bottom). |
| S2 | RRR CCM44 | `925_ccm_1..3` (END B cropped) |
| S3 | spawplast, Allegro 11269 = RRR pru | `925_alA_1..5`, `925_pru_1..5`. `alA_3` is the END A close-up. |
| S4 | RRR fre | `925_fre_1..5` (`fre_2`: recess / D-end close-up) |
| S5 | KRIK | `925_krik_0..2` |
| S6 | Marktplaats Jan Los | `925_mp_1..3` (+ `_hr`) |
| S7 | Fitted on the receiver | `681_pa_1` |
| — | Receivers 81A807681A | `681_*` |

**Rejected images:** `671w3_3`, `671w3_4` (Kia), `671_eb1_1`, `671w3_2` (logos), Allegro 8ec15102 (left + right pair in primer). Full table: `V9_ANALYSIS/V9_PHOTO_CHECKLIST.md`.

## 7. Briefs from the user (in order)

Read in this order:

1. `CLAUDE.md`
2. `81A807925A_reverse_engineering_V0.1.md`
3. `81A807925A_reverse_engineering_V0.2_clip_curvatura.md`
4. `CLAUDE_REVISION_V2_81A807925A.md`
5. `REFERENCE_PACK_V4/START_HERE.md` and `REFERENCE_PACK_V4/docs/`
6. `REFERENCE_PACK_V5/00_READ_FIRST/`
7. `V9_REFERENCE_ADDON/V9_REFERENCE_ADDON/00_READ_FIRST/ADD_TO_CLAUDE_V9.md`, together with its `04_ANALYSIS` checklist

## 8. Folder map

| Folder | Contents |
|---|---|
| `cad/` | Parameters, geometry, build scripts. `exports/V7/clips` (clip STEPs used in the assembly), `exports/V8/fusion_parts` (current build parts), `exports/V9`, `fusion/` (V7, V8, V9 .f3d) |
| `work/` | All analysis and build scripts (`v8_*`, `v9_*`, `term*`, `reg.py`, …) |
| `fusion_scripts/` | Fusion MCP client and scripts (build, views, screenshots, read selection/camera) |
| `docs/` | Reference images and the V1–V3 reports |
| `REFERENCE_PACK_V4/`, `REFERENCE_PACK_V5/` | Earlier refinement packs with analyses and camera solutions |
| `TERMINAL_REFINEMENT*/` | V6, V7 and V8 terminal work, docs and screenshots (`TERMINAL_REFINEMENT_V8/screenshots_V8`: 24 views of V8) |
| `V9_REFERENCE_ADDON/` | V9 evidence pack from the user |
| `V9_ANALYSIS/` | V9 checklist, comparison, overlays and previews |
