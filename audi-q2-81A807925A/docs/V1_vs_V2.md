# V1 → V2 — 81A807925A TB2 (LEFT): every geometric change

Revision applied: `CLAUDE_REVISION_V2_81A807925A.md`. V2 was built **on the V1
parametric base** (same modules; `cad/parameters_v2.py` imports V1 and overrides;
`cad/build_model_v2.py`). V1 remains reproducible with `cad/build_model.py`.

## 0. Comparison method (revision §6) — camera-corrected, not screenshot-vs-photo

1. Exact-target photos with a usable silhouette were segmented: 6 installed views of
   one sample (eBay 267760879656, `corner_1…6`; silver on anthracite → HSV threshold)
   and 2 isolated samples (KRIK `krik_0`, RRR pru6165 `pru_1`; GrabCut).
2. For every photo a pinhole camera (rotation, translation, focal) was estimated
   **separately for V1 and for V2**, minimising the symmetric chamfer distance
   between the projected 3D model edges (outer outline + opening lifted on the
   visible surface) and the photo contours (`work/fitlib.py`).
3. V2 planform = joint multi-view fit on corner_1,2,3,5,6 (independent periodic
   splines for outer edge and opening, 18 + 14 control points), then a 45 + 12 point
   scan of the Z law (`work/fit_v2.py`, `work/fit_v2b.py`).
4. Holdouts: corner_4 (same sample, not used in the fit), krik_0 and pru_1 (other
   physical samples).
5. A second, independent check renders the **full STL** (body + returns + clips) from
   a camera refined by IoU (`work/iou_check.py`).

### Results — silhouette error (mean symmetric chamfer, px, clipped at 15 px)

| Photo | Role | V1 | V2 | Change |
|---|---|---:|---:|---:|
| corner_1 | fit | 3.05 | 1.76 | −42.5 % |
| corner_2 | fit | 2.47 | 1.75 | −29.3 % |
| corner_3 | fit (outer-side oblique) | 2.48 | 1.39 | −44.1 % |
| corner_5 | fit | 1.78 | 1.98 | +11.3 % |
| corner_6 | fit | 4.72 | 3.03 | −35.7 % |
| **corner_4** | **holdout, same sample** | **4.71** | **2.70** | **−42.7 %** |
| krik_0 | holdout, other sample (front-face curves only) | 3.48 | 5.10 | +46.8 % ⚠ |
| pru_1 | holdout, other sample, outer only | 4.49 | 4.33 | −3.6 % |

⚠ krik_0 is shot from **below**: its silhouette includes the rear returns and the
deep opening wall, which the front-face curves do not contain, so this metric is not
a fair test there. The full-mesh IoU check, which does include the returns, gives:

| Photo | IoU V1 | IoU V2 | Δ |
|---|---:|---:|---:|
| krik_0 | 0.633 | 0.613 | −0.020 |
| pru_1 | 0.549 | 0.547 | −0.002 |
| corner_4 | 0.445 | 0.472 | +0.027 |
| corner_1 | 0.512 | 0.503 | −0.009 |

→ On the installed sample V2 is clearly better (5 of 6 views, including the
holdout). On the two isolated samples V1 and V2 are **equivalent within noise**; the
KRIK view suggests the opening reaches further toward the outer end than V2 and
shows a deep wall at the opening top (present in V2, depth unmeasured). Visuals:
`docs/V2/validation/V1_vs_V2_*.jpg`, `iou_*.png`.

## 1. Change table (revision §10)

| Feature | V1 issue | V2 correction (actual geometric change) | Evidence | Confidence |
|---|---|---|---|---|
| **Outer silhouette** (§2C/D/F/G) | 4 straight lines + 4 arcs; constant H = 58 mm; top/bottom edges parallel | closed periodic spline, 18 control points (s, y) fitted to 5 views; H = 53.05 mm max at s≈100–200, decreasing to ≈ 46 mm at s≈400 (top edge rises 6 mm from the tip, bottom edge rises ≈ 5 mm toward the outer end) | multi-view fit; consistent with w63_1 (height decreases ≈ 8 % toward the outer end) | medium |
| **Inner terminal** (§2F) | sharp tip at top-left (R 5) + straight 45° slant + R 14 | asymmetric terminal: tight upper turn **R ≈ 4.8 mm at P01** and a broad lower sweep **R ≈ 70 mm at P11**; tip sits 6 mm below the top line | multi-view fit (inner end visible in all 5 views), psh_1 close-up | medium |
| **Outer terminal / loop end** (§2F/G) | straight slanted end, R 7 top / R 26 bottom | continuous curved end: outer-most point P06 at y = −7.6, shoulders R 3.5 (upper) and ≈ 17–18 (lower), no straight segment | multi-view fit; outer end most affected by bumper parts in the masks → see uncertainties | medium-low |
| **Upper rail** (§2C) | straight beam, visible band 8.5 mm constant | slightly arched top edge (y −6.3 at tip → −1.6 → −0.3 toward the outer end), band **4.6–7.5 mm**, varying along s | fit | medium (band width: medium-low) |
| **Lower rail** (§2D) | constant 16.5 mm band, edge = offset logic | lower edge is its own spline segment; visible band **5.7–11 mm** along the rail, widening at both ends; no offset relation to the upper edge | fit; corner_5 zoom shows the shaded lower return correctly excluded | medium-low |
| **Inner opening** (§2E) | rounded rectangle, uniform border, regular radii | independent spline, 14 control points; inner end **slanted** ("\\", top at s≈117, bottom at s≈145) as in corner_4/psh_1; outer end rounded; top edge almost straight; bottom edge free-form. One 3-point smoothing pass on 4 bottom points (s 250–420) to remove a 3 mm wave caused by the grille "plug" in the masks | fit; smoothing logged in `work/params_v2_info.json` | medium |
| **Broad terminal panel** (§2G) | single planar trapezoid, abrupt rail→panel change | panel bounded by the fitted spline (gradual width growth over s≈115–150 instead of a step) + crown (below) + 17 loft sections | fit | medium |
| **Z curvature** (§2B) | wrap starts at 0.60 L, 28 mm, exp 2.2 (most bend in the last 40 %) | wrap starts at **0.45 L**, amplitude **36.8 mm**, exponent 3.0, sag 4.1 mm; longitudinal slope grows progressively from s≈200 (see `docs/V2/profiles_V1_vs_V2.png`); max |d²Z/ds²| 0.0085 vs 0.0105 1/mm (smoother) | 45-point scan on 5 views: small wraps (≤ 12 mm) rejected (+15 % cost); several (amplitude, onset) pairs within 1 % → low identifiability | low-medium |
| **Front face** (§2A) | linear in y (flat sections) | transverse **crown 0.82 mm** + curved loft sections (11 points per section, spline front/back), 17 sections; face normal changes continuously | ASSUMED (silhouettes cannot observe crown: Δcost < 0.01 px) | low |
| **Rear returns** (§4) | uniform 6 mm outer return + 10 mm return on the OUTER top edge + 4 mm opening return | outer perimeter = low **lip 4 mm**; opening = 3 mm return; **deep 12 mm wall on the TOP edge of the opening** from the opening start to a **step at s = 389 mm** (the V1 10 mm outer-top return was misattributed and removed) | pru_1 (wall seen through the opening, step at 820/995 → s≈389), fre_3/fre_4 (wall + abrupt end), pru_4 (step at s≈374–403), krik_0 (wall seen from below) | medium (position), low (depths) |
| **Thicknesses** (§5) | T_SHELL 2.5, T_WALL 2.0 everywhere | T_SKIN 2.5, T_RETURN 1.8, T_WALL_OPEN 1.8, T_CLIP_ROOT 2.4, T_CLIP_ARM 1.6, T_REINF 2.4, T_RIB 1.5 (no ribs evidenced) — all separate parameters | ASSUMED | — |
| **Edge radii** (§2H) | one 1.0 mm fillet on 12 front edges | separate parameters R_OUTER_VISIBLE 1.2, R_INNER_VISIBLE 0.8, R_REAR_RETURN 0.5, R_CLIP_ROOT 1.0; terminal radii now come from the fitted spline (P01 4.8 / P11 70). **Visible-edge fillets are NOT in the CadQuery V2 STEP**: OCC did not finish them on the spline edges within 240 s (child-process timeout) → see §2 below | ASSUMED values | — |
| **Clips** (§3) | 3 identical rectangle eyelets (20 mm, square hole, 35°), 3 barbed hook tabs, 1 rearward tongue; tabs embedded without root | 6 **trapezoidal eyelets with slanted rounded window** in two size families (bottom 30/21/12 mm, top 26/18/10 mm), tilt 15°/10°, each with a **root pad merged into the lip**; C04 = **in-plane tongue with window** pointing inward behind the loop; one definition + local frame per clip; positions re-measured (C05 306, C06 199.5, C07 91, C01 42, C02 142, C03 281) | fre_5, mp_3 (close-ups), fre_3, fre_4, pru_4 (0.487 mm/px), pru_5, pru_1 | positions medium, sizes low |
| **Feature removed** | — | the V1 assumption "top of the trim has a 10 mm deep return" | contradicted by fre_3/fre_4/pru_1 (the deep wall is on the opening edge) | medium |
| **Not a clip** | — | pru_4 "long low feature" at s≈374–403 is the wall step, not an attachment | pru_1 + pru_4 coincidence | medium |
| **STEP robustness** | — | body surfaces converted to explicit NURBS before export: without it the STEP writer dropped 68 of 87 faces (re-import = open Shell, Fusion "NOT SOLID") | round-trip check in `build_report_v2.json` | high |
| **STL** | 0.05 mm tessellation | 0.01 mm / 0.05 rad tessellation: at 0.05 mm OCC left a 0.0002 mm² sliver (non-manifold edge); now watertight, 146 602 triangles (checked in `build_report_v2.json → stl_check`) | trimesh check | high |
| **Mass estimate** | 67.5 g | **50.9 g** (mesh volume 44.29 cm³ × 1.15 g/cm³): thinner lip/returns, smaller H, no outer-top deep return. OCC volume of NURBS faces is unreliable (+10 %), the mesh volume is used | derived | — |

## 2. Known regressions / not done

* **Visible-edge fillets** (R 1.2 / 0.8) are **not** in V2 (V1 had 1.0 mm on 12 front
  edges). Tried: (a) OCC fillet in a time-limited child process → not finished in
  240 s; (b) Autodesk Fusion (ASM kernel) via MCP, per edge, radii 0.8→0.5→0.3 mm
  (opening) and 1.2→0.8→0.5 mm (outer) → `ASM_BL_BLEND_TOO_BIG` on all 8 front
  boundary edges. Cause (probable): the single dense NURBS front face meeting the
  prism walls. Action for V3: rebuild the front face with fewer loft sections /
  lower-degree surface, or model the edge round as part of the section profile.
* V2 is fitted on one physical sample's installed views; on two other isolated samples
  V1 and V2 are equivalent (IoU ±0.02).
* Crown, pitch, twist, return depths: still assumed (not observable from silhouettes).
