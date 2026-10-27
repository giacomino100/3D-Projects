# Assumptions register — 81A807925A V1

Every value or decision below is **not** an OEM dimension. All are exposed in
`cad/parameters.py` and can be changed; rebuild with `cad/build_model.py`.

| ID | Assumption | Value | Why this value | How to retire it |
|---|---|---|---|---|
| A-01 | Shell thickness | T_SHELL 2.5 mm | V0.1 prototype value; PC+ABS exterior trims are typically 2.2–2.8 mm | calliper on a real part (any edge) |
| A-02 | Return wall thickness | T_WALL 2.0 mm | typical | calliper |
| A-03 | Outer return depth | D_RET_OUTER 6 mm | returns visible in fre_3/fre_4 but no scale | calliper / side photo with ruler |
| A-04 | Opening return depth | D_RET_OPEN 4 mm | idem | idem |
| A-05 | Top return depth | D_RET_TOP 10 mm | pru_1 (oblique) shows a deep upper surface; see A-12 | side photo / calliper |
| A-06 | Front-face bow | Z_SAG_MAIN 4 mm | fre_1 shows a gentle bow, not measurable | lay the part on a flat table, measure gap |
| A-07 | Wrap law | onset 0.60 L, exponent 2.2, Z_WRAP_OUTER 28 mm | qualitative from corner_3/corner_7/mp_2, bounded by group Z 80 mm | top-view photo with ruler, or scan |
| A-08 | Section pitch | 6° (+4° twist over wrap) | lower bumper intakes normally face slightly downward; not measurable | side photo of installed corner |
| A-09 | Front-edge radius | 1.0 mm | typical injection-moulded trim | visual / radius gauge |
| A-10 | Small corner radii | R_TIP 5, R_INNER_BOT 14, R_OPEN_OUT_TOP 5, R_OPEN_OUT_BOT 15 mm | visual estimate | overlay on a frontal photo with scale |
| A-11 | Clip dimensions | eyelet 20 × 1.8 × 14 mm, window 10 × 5 mm, tilt 35°; hook tab 10 × 1.8 × 9 mm, barb 2.5 × 1.5 mm; tongue 12 × 1.8 × 15 mm, window 6 × 4 mm, tilt 20° | proportions from close-ups (fre_5, mp_3, pru_5), no scale | calliper; or close-up photo with ruler |
| A-12 | **Section of the top bar** | thin visible bar (8.5 mm) + deep rear top return (10 mm) | frontal installed photos show a thin top bar, while pru_1 (oblique, elevated camera, rotated 180°) shows a wide upper band: interpreted as the top return seen obliquely | side photo of the isolated part, or section cut |
| A-13 | **Installed orientation of isolated photos** | pru_1, pru_4, pru_5, ccm_3, fre_5 are rotated 180° w.r.t. the installed position (molded text upside-down when installed) | inner tip is at the top-left in all installed photos (psh_1, corner_4, w63_1); in the isolated photos it is at bottom-right/bottom-left | confirm on a physical part |
| A-14 | Clip root fillet | 0.8 mm (parameter only, not modelled) | OCC fillets on lofted returns are fragile; deferred to V2 | — |
| A-15 | Clip insertion direction | +Z (trim pushed rearward into the 681A recess) | the trim sits in a recess on the front of 681A (w48_1) | assembly trial with coupons |
| A-16 | Receiver surrogates in coupons | barb into window (eyelet/tongue), slot + barb (hook tab) | relationship visible on 681A rear, sizes unknown | V2 fit trials |
| A-17 | Coupon clearances | 0.20 / 0.30 / 0.45 mm | FDM practice (0.4 nozzle) | print and test |
| A-18 | Frame position inside the group box | not modelled; inner tip ≈ 24–52 mm from the 681A inner tip (psh_3 / corner_4) | — | needed only for assembly CAD |
| A-19 | Density for mass estimate | 1.15 g/cm³ (PC+ABS) | datasheet range 1.10–1.20 | weigh a real part |

## Rejected input

* **V0.1 §7 sanity band (330–355 mm × 185–200 mm)** — assumed the 925A frames the whole
  grille. Photos of three independent installed assemblies show the 925A is only the lower
  silver loop; measured L ≈ 472 mm, H ≈ 58 mm. Kept here for traceability only.
* **CLAUDE.md station semantics "S3 outer-upper bend … S7 inner-lower end"** described a
  ring around the whole grille. They were re-mapped to this part's own perimeter
  (see `curvature_analysis.md §3`).
