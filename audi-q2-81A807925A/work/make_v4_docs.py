import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, "REFERENCE_PACK_V4", "analysis"); OV = os.path.join(A, "overlays")


def f(v, n=2):
    return "—" if v is None else f"{v:.{n}f}"


def P(q):
    return "—" if q is None else f"({q[0]:.0f}, {q[1]:.0f})"


VIEWS = [("front_01", "REF_01_FRONT = 925_alB_1 (Leo-b, 2560 px)"), ("front_02", "REF_02_FRONT_ALT = 925_ccm_1 (RRR ccm44, 1024 px)"),
         ("oblique_01", "REF_04_OBLIQUE_FRONT = 925_alA_1 (spawplast)"), ("oblique_02", "REF_12_OBLIQUE_FRONT_2 = 925_krik_0 (KRIK)")]
L = ["# Front landmarks P01–P20 — 81A807925A V4 (vs V3)\n",
     "Definitions frozen in `work/lm.py` (same as the V3 report). Camera re-matched on each model. Extreme landmarks "
     "(P01 inner tip, P03 opening start, P09 outer-most, P16 opening outer-most): 2-D error vs hand pick. Edge landmarks: "
     "1-D normal error from edge search. CAD X/Y/Z in mm (X toward vehicle right/inner tip, Y up, Z rearward). Opening "
     "landmarks are measured only in frontal views. '—' = not visible / not measurable.\n"]
for tag, desc in VIEWS:
    v4 = json.load(open(os.path.join(OV, f"landmarks_V4_{tag}.json")))
    v3 = {r["id"]: r for r in json.load(open(os.path.join(OV, f"landmarks_V3_{tag}.json")))}
    L += [f"\n## {tag} — {desc}\n",
          "| Landmark | name | CAD X / Y / Z | OEM px | CAD px (V4) | residual px | residual mm V4 | residual mm V3 | confidence |",
          "|---|---|---|---|---|---:|---:|---:|---|"]
    for r in v4:
        X = r["X"]
        L.append(f"| {r['id']} | {r['name']} | {X[0]:.1f} / {X[1]:.1f} / {X[2]:.1f} | {P(r['oem'])} | {P(r['cad'])} | "
                 f"{f(r['err_px'], 1)} | {f(r['err_mm'])} | {f(v3.get(r['id'], {}).get('err_mm'))} | {r['conf']} |")
open(os.path.join(A, "front_landmarks.md"), "w", encoding="utf-8").write("\n".join(L))

m3 = json.load(open(os.path.join(OV, "metrics_V3.json"))); m4 = json.load(open(os.path.join(OV, "metrics_V4.json")))
d1 = json.load(open(os.path.join(A, "v4_outer_displacement.json")))["summary"]
d2 = json.load(open(os.path.join(A, "v4_opening_R4.json")))
ag3 = json.load(open(os.path.join(A, "front_agreement_V3.json"))); ag4 = json.load(open(os.path.join(A, "front_agreement_V4.json")))


def cnt(r):
    return (sum(x["agree"] for x in r),
            sum(1 for x in r if x["d01"] is not None and x["d02"] is not None and abs(x["d01"] - x["d02"]) > 1.0))


C = ["# V3 → V4 front changes — 81A807925A / TB2 (LEFT)\n",
     "Scope: front-visible geometry only (CLAUDE_V4_FRONT_REFINEMENT.md). V3 = baseline (`cad_baseline/V3_current_renders`). "
     "Not rebuilt from zero: `cad/parameters_v4.py` imports V3 and overrides only `OUTER_CPS` and `OPENING_CPS`. Z law, "
     "sections, crown, rear and clips are unchanged.\n",
     "## Method\n",
     "1. Reference board `analysis/reference_board.png` (REF_01…REF_12 + 2 receiver images; exact 81A807925A / 81A807681A only).",
     "2. Camera matched per photo on the V3 CAD (pinhole, picks + edge refinement, camera side enforced) → V3 overlays "
     "`overlays/OEM_vs_CAD_*.png` produced BEFORE any edit.",
     "3. Edge deviations along the outline binned every 20 mm of s, upper/lower half separately, for the two INDEPENDENT "
     "front photos (`front_deviation_profiles_V3.png`, `front_agreement_V3.json`).",
     "4. A correction is applied ONLY where both front photos agree in sign and exceed 0.5 mm (moved by the SMALLER of the "
     "two), or where it repairs a V3 regression proven against the earlier 13-station measurement. Conflicting regions are "
     "NOT averaged.",
     "5. Rebuild → re-match cameras → re-measure (`*_V4` overlays, `front_deviation_profiles_V4.png`). Iterated until no "
     "bin agrees on an error > 0.5 mm.\n",
     "## Change table\n",
     "| Area | V3 mismatch | V4 geometric correction | Source image(s) | Confidence |", "|---|---|---|---|---|",
     f"| Lower rail, outer edge, s 290–440 (narrow-end half) | wave −1.0 mm at s 320–370 and +1.2 mm at s 400–420 (alB_1); "
     f"introduced by the V3 terminal splice/refit, not by the OEM | R1: edge moved along its normal by the alB_1 measured "
     f"deviation (smoothed, 12 mm tapers): {d1['R1']['n']} samples, max {d1['R1']['max_abs_mm']} mm | REF_01 (5 px/mm), "
     f"consistent with the V3-A 13-station readings | medium-high (ccm_1 lower edge in shadow) |",
     f"| Upper rail, outer edge, s 300–385 | OEM outside CAD by +0.5…0.6 (alB_1) and +0.6…0.96 mm (ccm_1) | R2: moved outward "
     f"by the smaller of the two: mean {d1['R2']['mean_mm']} mm, max {d1['R2']['max_abs_mm']} mm → upper band locally "
     f"~0.5 mm wider | REF_01 + REF_02 | medium (2 specimens agree) |",
     f"| Narrow end, upper shoulder, s 425–455 | OEM inside CAD: −0.6 (alB_1), −1.25 mm (ccm_1) | R3: moved inward by the "
     f"smaller: mean {d1['R3']['mean_mm']} mm, max {d1['R3']['max_abs_mm']} mm → tip shoulder slightly tighter | REF_01 + REF_02 | medium |",
     f"| Opening, lower edge at the loop end, s 400–440 | opening too small: +1.12 (alB_1) and +1.63 mm (ccm_1) after "
     f"iteration 1 | R4: opening edge moved outward by the smaller (max {d2['max_mm']} mm after smoothing) → lower turn of "
     f"the opening ~1 mm larger | REF_01 + REF_02 | medium |",
     "| Upper band width (outer upper s 150–250; opening upper s 290–410) | CONFLICT: alB_1 ≈ 0 mm, ccm_1 shows the top band "
     "~1.5–2 mm wider | NOT changed. Camera elevations differ by only 7°, so perspective does not explain it; candidates: "
     "ccm_1 resolution (≈2 px/mm) with rounded/shaded edges, or specimen variation | REF_01 vs REF_02 | unresolved |",
     "| Wide solid end (P01, P15), opening start (P03) | P01 1.0 mm, P15 0.1 mm; P03 ±3 mm (shadow / end wall) | unchanged "
     "(no 2-photo agreement possible: ccm_1 crops the tip) | REF_01, REF_07b | — |",
     "| Inner opening shape | independent spline (not an offset) since V3 | unchanged except R4 | — | — |",
     "\n## Measured result (mean |deviation| in mm; camera re-matched on each model)\n",
     "| View | outer V3 | outer V4 | opening V3 | opening V4 |", "|---|---:|---:|---:|---:|"]
for tag, desc in VIEWS:
    a, b = m3[tag], m4[tag]
    C.append(f"| {tag} ({desc.split(' = ')[1]}) | {f(a['outer']['mae'])} | {f(b['outer']['mae'])} | "
             f"{f(a['opening']['mae']) if a['opening']['n'] else '—'} | {f(b['opening']['mae']) if b['opening']['n'] else '—'} |")
C += [f"\n20-mm bins where both front photos agree on an error > 0.5 mm: V3 {cnt(ag3)[0]} → V4 {cnt(ag4)[0]}. "
      f"Bins where the two photos disagree with each other by > 1 mm: V3 {cnt(ag3)[1]}, V4 {cnt(ag4)[1]} "
      f"(photo-vs-photo conflicts, not fixable by moving the CAD).\n",
      "## Stop criteria (brief §10)\n", "| Criterion | Status |", "|---|---|",
      f"| outer silhouette matches ≥ 2 independent photos | yes: alB_1 {f(m4['front_01']['outer']['mae'])} mm, ccm_1 "
      f"{f(m4['front_02']['outer']['mae'])} mm, KRIK {f(m4['oblique_02']['outer']['mae'])} mm |",
      f"| inner opening matches ≥ 2 independent photos | yes within 0.7 mm: alB_1 {f(m4['front_01']['opening']['mae'])}, "
      f"ccm_1 {f(m4['front_02']['opening']['mae'])} mm (ccm_1 band-width conflict documented) |",
      "| wide-end proportions agree | alB_1 only (tip cropped in ccm_1): P01 1 mm, P15 0.1 mm |",
      "| narrow-end shape agrees | yes on both fronts after R3/R4 |",
      "| upper/lower band-width changes agree | lower band: yes; upper band: CONFLICT ccm_1 vs alB_1 (~1.5 mm), unresolved |",
      f"| ≥ 2 oblique views consistent with the same 3D geometry | alA_1 {f(m4['oblique_01']['outer']['mae'])} mm and KRIK "
      f"{f(m4['oblique_02']['outer']['mae'])} mm with the same model (Z law from V3-B) |",
      "\n**Status:** front geometry converged on every region where two independent exact-target photos agree; the "
      "upper-band width remains open (the two photos conflict by ~1.5 mm). Not production-ready; clips unchanged (provisional).\n",
      "## Outputs\n",
      "- `81A807925A_V4_front_refined.step`, `81A807925A_V4_front_refined.stl` (pack root; also `cad/exports/V4/`)",
      "- `renders_V4/`: front ortho + perspective, rear, top, bottom, 2 sides, 2 oblique front, 2 oblique rear, wide-end and "
      "narrow-end close-ups; Fusion file `cad/fusion/81A807925A_V4.f3d`",
      "- `analysis/reference_board.png`, `analysis/overlays/OEM_vs_CAD_{front_01,front_02,oblique_01,oblique_02}.png` (V3) and `*_V4.png`",
      "- `analysis/front_landmarks.md`, `analysis/front_deviation_profiles_V3.png` / `_V4.png`"]
open(os.path.join(A, "V3_vs_V4_front_changes.md"), "w", encoding="utf-8").write("\n".join(C))
print("ok")
