import json, os, shutil
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis"); OV = os.path.join(A, "overlays")
m4 = json.load(open(os.path.join(OV, "metrics_V4.json"))); m5 = json.load(open(os.path.join(OV, "metrics_V5.json")))
h4 = json.load(open(os.path.join(A, "hypothesis_tests_V4.json")))
pa = json.load(open(os.path.join(A, "pa1_bands_V4.json")))
loo = json.load(open(os.path.join(A, "H5_leave_one_out.json")))
sc = json.load(open(os.path.join(A, "H5_wrap_amplitude_scan.json")))
h6 = json.load(open(os.path.join(A, "H6_highlight_profiles_alB1.json")))
f = lambda v: "—" if v is None or v != v else f"{v:.2f}"
VIEWS = [("front_A", "925_alB_1 Leo-b"), ("front_B", "925_ccm_1 RRR ccm44"), ("front_C_assembly", "681_pa_1 polovni (new)"),
         ("oblique_A", "925_alA_1 spawplast"), ("oblique_B", "925_krik_0 KRIK"), ("rear", "925_alB_2 Leo-b"), ("profile", "925_mp_2_hr Marktplaats")]
L = ["# V4 → V5 change log — 81A807925A / TB2 (LEFT)\n",
     "Workflow (CLAUDE_V5_OEM_GEOMETRY_RECOVERY.md): references downloaded and curated → reference board → camera-matched "
     "overlays of the CURRENT CAD (V4) on 7 exact-target views → hypotheses H1–H6 tested quantitatively → ONLY supported "
     "changes applied → V5 rebuilt and re-matched. `cad/parameters_v5.py` imports V4; nothing rebuilt from zero.\n",
     "## 1. Reference set\n",
     "`fetch_exact_references_playwright.py` was run: RRR 4 images (all already in the local set, identical), Marktplaats 1 "
     "(identical), Allegro 0 (bot protection in headless mode — the 2500/2560 px Allegro originals were already downloaded "
     "earlier through the in-app browser), receiver B2 (polovniautomobili, part number 81A807681A verified on the page): "
     "**new** 1600 px frontal photo of 681A with a fitted 925A = 4th independent specimen with both tips visible. "
     "Curated set: `analysis/image_manifest.csv`, board `analysis/reference_board.png`.\n",
     "## 2. Hypothesis tests on V4 (measured, before any edit)\n",
     "| Hyp. | Test | Result | Verdict |", "|---|---|---|---|",
     f"| H1 wide end over-regularized | outer-edge deviation for s < opening start, 5 views | mean −0.12 / −0.04 / +0.31 / +0.09 / −0.30 mm; MAE {h4['H1_wide_end']['front_A']['mae']} (front A) … {h4['H1_wide_end']['front_C_assembly']['mae']} mm (front C, dark grille background) | NOT supported (no consistent signed error) |",
     "| H2 opening = offset | CAD band widths at 10/25/50/75/90 % vs photos | CAD bands already non-uniform: upper 8.8→7.6, lower 13.2→8.9 mm; front A matches within 0.1–0.7 mm. Front B upper +1.5…1.8 mm, front C upper +0.1…+1.6 (mean +0.4) and lower +1.0…1.5 mm | NOT supported as an offset problem; residual spread ~1–1.7 mm between specimens with no common direction (see uncertainties) |",
     f"| H3 upper rail too straight | max deviation from the s 140–380 chord | CAD {h4['H3_H4_chord']['upper']['cad_max_from_chord']} mm vs OEM {h4['H3_H4_chord']['upper']['front_A']['oem_max_from_chord']} (A) / {h4['H3_H4_chord']['upper']['front_B']['oem_max_from_chord']} mm (B); shape residual RMS 0.10 / 0.29 mm | NOT supported |",
     f"| H4 lower rail too clean | same, lower edge | CAD {h4['H3_H4_chord']['lower']['cad_max_from_chord']} vs OEM {h4['H3_H4_chord']['lower']['front_A']['oem_max_from_chord']} mm (A); shape residual RMS 0.34 mm | NOT supported |",
     "| H5 Z single-arc vs compound | leave-one-view-out (alA_1, krik_0, alB_2): 2-parameter wrap vs wrap + 2 local bumps | held-out cost law4 vs law2: +0.17 / −0.05 / −0.01 mm, bump amplitudes run to the bounds | compound NOT supported. BUT a fixed-law amplitude scan (camera refit per candidate, 4 views / 4 specimens) puts every view's minimum at A ≥ 55 mm (V4: 40) → **amplitude changed** |",
     f"| H6 face too planar | luminance across rails vs plate (alB_1, 3 stations) | rails: full specular highlight cycle, L* range {h6['x1000_installed top band']['range']}–{h6['x1400_installed bottom band']['range']}; plate central 60 %: {h6['plate_x2200_central60pct']['range']} | SUPPORTED for the rails (rounded section); magnitude not measurable |",
     "\n## 3. Geometric changes V4 → V5\n",
     "| Area | V4 | V5 change | Evidence | Confidence |", "|---|---|---|---|---|",
     "| Z wrap amplitude (outer/narrow end) | z_mid(outer end) = 40 mm, onset 0.60 L | 55 mm, same onset and law (21 stations S00–S20, denser at wide-end, opening start and narrow-end turn); body depth 61 → 80 mm (min thickness over rotations 48 → 60 mm, still < 80 mm group envelope) | H5 amplitude scan: minima alA_1 55, mp_2 55, krik_0 65, alB_2 65 mm | MEDIUM-LOW (cost differences 0.07–0.15 mm per view; range 50–65) |",
     "| Rail cross-section | flat in y (only a global 0.82 mm crown over the full height) | each rail gets its own convex section, sagitta 1.2 mm, faded over 15 mm at both opening ends (plate unchanged) | H6 highlight profiles | existence HIGH, magnitude LOW (ASSUMED 1.2 mm) |",
     "| Loft sections | 11 points | 33 points per section (needed to carry the rail crown) | — | — |",
     "| Outer / opening planform | V4 | unchanged | H1–H4 not supported | — |",
     "| Clips, rear | V4 | unchanged (brief §9: after front convergence) | — | — |",
     "\n## 4. Result (outer-edge MAE, mm; camera re-matched on each model)\n",
     "| View | V4 outer | V5 outer | V4 opening | V5 opening |", "|---|---:|---:|---:|---:|"]
for t, d in VIEWS:
    a, b = m4.get(t, {}), m5.get(t, {})
    L.append(f"| {t} ({d}) | {f(a.get('outer', {}).get('mae'))} | {f(b.get('outer', {}).get('mae'))} | "
             f"{f(a.get('opening', {}).get('mae')) if a.get('opening', {}).get('n') else '—'} | {f(b.get('opening', {}).get('mae')) if b.get('opening', {}).get('n') else '—'} |")
L += ["\nOblique B −0.11, rear −0.20, profile −0.39 mm; front A +0.03, front B +0.12 mm (within the ≈1 px edge noise of a 1024 px photo); "
      "front C coverage changed (119 → 53 edge samples) so its MAE is not comparable. Accepted per protocol §7 (improves the Z-sensitive views "
      "without clearly degrading another).\n",
      "## 5. Stop criteria\n", "| Criterion | Status |", "|---|---|",
      f"| outer silhouette agrees with ≥ 2 specimens | yes: Leo-b {f(m5['front_A']['outer']['mae'])}, ccm44 {f(m5['front_B']['outer']['mae'])}, KRIK {f(m5['oblique_B']['outer']['mae'])} mm |",
      f"| inner opening agrees with ≥ 2 specimens | yes: Leo-b {f(m5['front_A']['opening']['mae'])}, ccm44 {f(m5['front_B']['opening']['mae'])}, polovni {f(m5['front_C_assembly']['opening']['mae'])} mm |",
      "| wide end agrees in front + oblique | yes: P01 1.0 mm (front A), oblique B 2.4 mm; oblique A hand pick 6.8 mm (see uncertainties) |",
      "| narrow end agrees in front + oblique | front A + oblique B yes (≤ 2.3 mm); **oblique A: OEM tip projects ~10 mm beyond the CAD in both V4 and V5** → open |",
      "| Z compatible with ≥ 2 oblique/profile views | yes (alA_1, mp_2, krik_0 all prefer ≥ 55 mm) |",
      "| front no longer reads as a flat plate | rails now carry a convex section; plate flat as in the photos |",
      "| remaining differences documented | `remaining_uncertainties.md` |",
      "\n**Status: V5 is not declared final** (oblique-A narrow-end mismatch, band-width spread between specimens, rail-crown magnitude assumed).\n",
      "## 6. Files\n",
      "- `81A807925A_V5_master.step` / `.stl` (pack root), Fusion `cad/fusion/81A807925A_V5.f3d`",
      "- `renders_V5/` (Fusion views + 4 camera-matched renders), `analysis/overlays/OEM_vs_V4_*.png`, `OEM_vs_V5_*.png`",
      "- `analysis/landmark_residuals.csv` (P01–P24, V4 and V5), `analysis/curvature_profile.csv` + `.png`, `analysis/stations.csv`",
      "- tests: `hypothesis_tests_V4.json`, `pa1_bands_V4.json`, `H5_leave_one_out.json`, `H5_wrap_amplitude_scan.json`, `H6_highlight_profiles_alB1.*`"]
open(os.path.join(A, "V4_vs_V5_change_log.md"), "w", encoding="utf-8").write("\n".join(L))
U = ["# Remaining uncertainties — V5\n",
     "| # | Item | Evidence state | Effect | What would close it |", "|---|---|---|---|---|",
     "| 1 | Z wrap amplitude | 50–65 mm; per-view cost differences only 0.07–0.15 mm; free joint fits unstable (14–24 mm with cameras free) | outer-end depth ±7.5 mm | top or side photo of the isolated part with a ruler |",
     "| 2 | Rail crown magnitude | existence from highlights (all frontal specimens); 1.2 mm ASSUMED | visual character of the rails | straight-edge across a rail / profile gauge |",
     "| 3 | Band widths between specimens | Leo-b matches CAD; ccm44 upper +1.5–1.8; polovni upper +0.4, lower +1.0–1.5 mm | ±1–1.7 mm per band | frontal photo with a ruler; specimen variation possible |",
     "| 4 | Narrow-end tip in oblique A (spawplast) | OEM tip projects ~10 mm beyond the CAD (V4 and V5), not in front A / oblique B | terminal shape in 3D (tip rear corner / sharper terminal) | close-up of the narrow end from the side |",
     "| 5 | Opening start P06 | ±2.5–7 mm hand-pick residual; shadow and end wall in all views | local | close-up frontal of the opening start |",
     "| 6 | Section pitch / twist | ASSUMED (6° + 4°) | face orientation | side photo |",
     "| 7 | Absolute scale | 548 mm group via installed photos (assembly-level, allowed); never from isolated photos | ±15 mm overall | tape measure |",
     "| 8 | Rear lip recess | rear view offset −0.9 mm mean (Leo-b) | rear only | calliper |",
     "| 9 | Clips | positions from 2 specimens; heights/tilt/thickness/seat fit not measurable; unchanged | fit | physical trial with coupons |",
     "| 10 | Visible-edge fillets | not applied (OCC) | cosmetic | V6 surface rebuild |"]
open(os.path.join(A, "remaining_uncertainties.md"), "w", encoding="utf-8").write("\n".join(U))
shutil.copy(os.path.join(A, "landmark_residuals.csv"), os.path.join(ROOT, "REFERENCE_PACK_V5", "05_ANALYSIS_TEMPLATES", "landmarks.csv"))
shutil.copy(os.path.join(A, "stations.csv"), os.path.join(ROOT, "REFERENCE_PACK_V5", "05_ANALYSIS_TEMPLATES", "stations.csv"))
print("ok")
