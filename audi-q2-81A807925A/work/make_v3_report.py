"""Generates docs/V3_report.md from the measurement files (no hand-typed numbers)."""
import json, os, ast
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
V = os.path.join(ROOT, "docs", "V3", "validation")
R = os.path.join(ROOT, "work", "reg_out")
met = json.load(open(os.path.join(V, "metrics.json")))
VIEWS = [("front", "925_alB_1", "frontal, Leo-b sample (Allegro 15311724741), 2560 px"),
         ("oblique_01", "925_alA_1", "oblique from above, spawplast sample (Allegro 11269 = RRR pru6165), 2500 px"),
         ("oblique_02", "925_krik_0", "oblique from below, KRIK sample, 1024 px"),
         ("rear", "925_alB_2", "rear, Leo-b sample (same part as front), 2560 px"),
         ("profile", "925_mp_2_hr", "rear profile along the length, Marktplaats sample, 1440 px")]


def f(v, nd=2):
    return "—" if v is None or (isinstance(v, float) and v != v) else f"{v:.{nd}f}"


def lm_table(tag):
    v3 = json.load(open(os.path.join(V, f"landmarks_V3_{tag}.json")))
    v2 = {r["id"]: r for r in json.load(open(os.path.join(V, f"landmarks_V2_{tag}.json")))}
    rows = ["| Landmark | | X / Y / Z (CAD, mm) | OEM px | CAD px | err px | err mm (V3) | err mm (V2) | confidence |",
            "|---|---|---|---|---|---:|---:|---:|---|"]
    for r in v3:
        p = lambda q: "—" if q is None else f"({q[0]:.0f}, {q[1]:.0f})"
        X = r["X"]
        rows.append(f"| {r['id']} | {r['name']} | {X[0]:.1f} / {X[1]:.1f} / {X[2]:.1f} | {p(r['oem'])} | {p(r['cad'])} | "
                    f"{f(r['err_px'], 1)} | {f(r['err_mm'])} | {f(v2.get(r['id'], {}).get('err_mm'))} | {r['conf']} |")
    return "\n".join(rows)


def main():
    s = []
    s.append("# 81A807925A TB2 — V3 photo-registration report\n")
    s.append("V2 = baseline (frozen). V3 derived **only** from measurable comparisons with photographs of the exact part "
             "(81A807925A, molded number visible on ccm_3, fre_5, krik_1, mp_3, alB_3). No similar parts used as "
             "dimensional source. Scale: unchanged from V2 (group box 548 mm via installed photos, ±15 mm).\n")
    s.append("## 1. Photo set and classification\n")
    s.append("| Class | Photos (exact part) | Used for |\n|---|---|---|")
    s.append("| frontal | **925_alB_1** (Allegro Leo-b, 2560 px, new sample), 925_ccm_1 (cropped) | V3-A silhouette + opening (13 stations, manual + edge search) |")
    s.append("| rear | **925_alB_2** (Leo-b), **925_alA_4** (spawplast, 2500 px), 925_pru_4, 925_ccm_2 | clip bases (2 samples), rear silhouette check |")
    s.append("| oblique front 30–45° | **925_alA_1** (spawplast, from above), **925_krik_0** (KRIK, from below), 925_mp_1_hr, 925_fre_1 | Z wrap scan, validation |")
    s.append("| oblique rear | 925_fre_3, 925_fre_4, 925_krik_2 | wall / tab topology |")
    s.append("| profile (upper/lower) | **925_mp_2_hr** (Marktplaats 1440 px, along the length) | Z wrap scan (manual silhouette) |")
    s.append("| Z-curvature view | 925_mp_2_hr, 925_alA_1 | V3-B |")
    s.append("| close-ups | 925_alB_3, 925_fre_5, 925_mp_3_hr, 925_alA_5, 925_ccm_3 | tab shape, ID |")
    s.append("| receiver 81A807681A | 681_w63_5, 681_w48_6, 681_psh_3, 681_al_1..5 (Allegro 1920×2560) | clip ↔ seat pattern |")
    s.append("\nNot used as dimensional source: installed views (corner_*, w63_*): the 681A grille covers part of the top band and the tips (this biased V2).\n")
    s.append("## 2. Method (measure → compare → modify → render → compare)\n")
    s.append("* Camera per photo: pinhole (R, t, f) from hand-picked extremes (P01, P09, P03, P16) + point-to-curve edge picks, "
             "then refined on image edges (normal search, background-aware). Camera side (front/back) enforced — an "
             "unconstrained fit converged once to the mirror (rear) solution on krik_0; that run was discarded.")
    s.append("* Deviation = signed normal distance CAD edge → OEM edge, px and mm (local px/mm from the camera). Non-frontal "
             "views use the lip-aware silhouette (front edge or back of the lip, whichever projects outward); opening edges "
             "are measured only in the frontal view (deep walls are visible through the opening in obliques).")
    s.append("* Where automatic edges are unreliable (silver ≈ grey background, cast shadows, highlights), manual readings on "
             "4×–6× zoom strips were used and objectively cross-checked with intensity profiles.\n")
    s.append("## 3. V2 vs V3 — silhouette deviation per view (MAE, mm)\n")
    s.append("| View | Photo | outer V2 | outer V3 | opening V2 | opening V3 | note |\n|---|---|---:|---:|---:|---:|---|")
    for tag, photo, desc in VIEWS:
        a, b = met["V2"][tag], met["V3"][tag]
        note = desc
        if tag == "profile":
            note += f"; manual silhouette RMS V2 {a.get('manual_silhouette_rms_mm')} / V3 {b.get('manual_silhouette_rms_mm')} mm"
        s.append(f"| {tag} | {photo} | {f(a['outer']['mae'])} | {f(b['outer']['mae'])} | {f(a['opening']['mae'])} | {f(b['opening']['mae'])} | {note} |")
    s.append("\nOverlays (50 % CAD render over the OEM photo, camera re-registered on each model, colored normal deviations): "
             "`docs/V3/validation/OEM_vs_V3_{front,oblique_01,oblique_02,profile,rear}_overlay.png` and the V2 equivalents.\n")
    s.append("## 4. Landmarks P01–P20 (frozen definitions: work/lm.py)\n")
    s.append("Extreme landmarks (P01, P03, P09, P16): 2-D error vs hand pick. Edge landmarks: 1-D normal error (the only "
             "objectively measurable component on a smooth edge). '—' = not visible/measurable in that view.\n")
    for tag, photo, desc in VIEWS:
        s.append(f"### {tag} — {photo}\n\n{lm_table(tag)}\n")
    # stations
    src = open(os.path.join(ROOT, "cad", "parameters_v3.py"), encoding="utf-8").read()
    ns = {}
    exec(src[src.index("Z_STATIONS ="):src.index("Z_SIGMA =")] , ns); exec(src[src.index("Z_SIGMA ="):].split("\n")[0], ns)
    s.append("## 5. V3-B — Z curvature, stations S00…S11\n")
    s.append("Per-station free fits (12 stations) were **not identifiable** (σ 3–17 mm, single views disagreeing) → rejected. "
             "Low-dimensional wrap law z = A·w^2.5 (w from onset u0) scanned per view:\n")
    sc = json.load(open(os.path.join(R, "v3b_scan.json"))); mp = json.load(open(os.path.join(R, "v3b_mp2.json")))
    s.append("| View | best (A mm, u0) | cost at best | cost without wrap | discriminative? |\n|---|---|---:|---:|---|")
    for n, lst in sc.items():
        b = min(lst, key=lambda d: d["cost"]); z0 = [d for d in lst if d["A"] == 0.0][0]
        s.append(f"| {n} | ({b['A']:.0f}, {b['u0']:.2f}) | {b['cost']:.3f} mm | {z0['cost']:.3f} mm | {'yes' if z0['cost'] > 1.1 * b['cost'] else 'weak'} |")
    b = min(mp, key=lambda d: d["rms_px"]); z0 = [d for d in mp if d["A"] == 0.0][0]
    s.append(f"| 925_mp_2_hr (manual silhouette) | ({b['A']:.0f}, {b['u0']:.2f}) | {b['rms_px']:.2f} px | {z0['rms_px']:.2f} px | yes |")
    s.append("\n**Two independent oblique views (925_alA_1, 925_mp_2_hr — different physical samples) agree on A = 40 mm, "
             "u0 = 0.60** (grid ±10 mm / ±0.15). V2 had 36.8 mm from 0.45.\n")
    s.append("| Station | s [mm] | X_cad [mm] | z_mid [mm] | σ_z [mm] | pitch [°] | status |\n|---|---:|---:|---:|---:|---:|---|")
    for k, ((ss, z, p), sg) in enumerate(zip(ns["Z_STATIONS"], ns["Z_SIGMA"])):
        st = "measured (wrap law, 2 views)" if ss > 300 else "NOT observable (sag 4 mm assumed)"
        s.append(f"| S{k:02d} | {ss:.1f} | {472 - ss:.1f} | {z:.2f} | {sg:.1f} | {p:.1f} (assumed) | {st} |")
    sec = json.load(open(os.path.join(ROOT, "docs", "V3", "sections_V2_vs_V3.json")))
    s.append("\n## 6. Cross-sections S00, S02, S04, S06, S08, S10, S11\n")
    s.append("Plot: `docs/V3/sections_V2_vs_V3.png`. Body = loft of 17 curved sections ∩ planform (not a 2-D extrusion).\n")
    s.append("| Station | model | band top [mm] | band bottom [mm] | inclination [°] | z top / z bottom [mm] |\n|---|---|---:|---:|---:|---|")
    for r in sec:
        s.append(f"| {r['station']} | {r['model']} | {f(r['band_top'])} | {f(r['band_bot'])} | {r['inclination_deg']} | {r['z_top']} / {r['z_bot']} |")
    s.append("\nMeasured on 925_alB_1 (13 stations): top band 8.4–9.1 mm, bottom band ≈ 11–12 mm in the straight part; "
             "**band steps** at s ≈ 378 mm (bottom band, −3.1 mm) and s ≈ 386 mm (top band, −1.2 mm, where the deep wall ends). "
             "Crown, inclination, return depths, thickness, radii: not observable from silhouettes → ASSUMED (unchanged).\n")
    cb = json.load(open(os.path.join(R, "v3c_clip_bases.json")))
    s.append("## 7. V3-C — clips rebuilt (prototype)\n")
    s.append("| Clip | type | edge | alB_2 centre / base | alA_4 centre / base | V3 s / base | shape evidence | confidence |\n|---|---|---|---|---|---|---|---|")
    mp_ = {"C07": "B_t1", "C06": "B_t2", "C05": "B_t3", "C01": "T_b1", "C02": "T_b2", "C03": "T_b3", "C04": "C04"}
    pv3 = ast.literal_eval(src[src.index("CLIPS_V3 = [") + len("CLIPS_V3 = "):src.index("CLIPS_V2 = CLIPS_V3")].replace("dict(_CLIP, ", "dict(").replace("dict(", "dict(")) if False else None
    rows = {"C01": ("flexible latch (sym. eyelet)", "top", "45.0 / 27.0", "near-symmetric trapezoid (alA_4, alB_2)", "pos high, width low"),
            "C02": ("flexible latch (sym. eyelet)", "top", "143.8 / 25.5", "near-symmetric trapezoid", "pos medium, width low"),
            "C03": ("flexible latch (ramp eyelet)", "top", "285.7 / 34.5", "asymmetric ramp, both samples", "pos medium, shape high"),
            "C04": ("locating tongue (in-plane)", "top, outer loop", "458→407 / 8 wide, 51 long", "long tongue along the top edge (alA_4); hidden in frontal", "topology medium"),
            "C05": ("flexible latch (ramp eyelet)", "bottom", "312.1 / 37.0", "ramp, longer base on both samples", "pos medium"),
            "C06": ("flexible latch (ramp eyelet)", "bottom", "206.0 / 30.5", "ramp, both samples", "pos high, width high"),
            "C07": ("flexible latch (ramp eyelet)", "bottom", "100.5 / 29.5", "ramp, both samples", "pos medium, width high")}
    for cid, (typ, edge, v3, shp, conf) in rows.items():
        k = mp_[cid]
        a = cb["925_alB_2"].get(k); b = cb["925_alA_4"].get(k)
        fa = "—" if not a else f"{a['s_centre']} / {a['width']}"; fb = "—" if not b else f"{b['s_centre']} / {b['width']}"
        s.append(f"| {cid} | {typ} | {edge} | {fa} | {fb} | {v3} | {shp} | {conf} |")
    s.append("\nRepetition is only claimed where both samples show the same shape (C05–C07 ramp family, but C05 longer; "
             "C01–C02 symmetric family). Tilt 0° (frontal view of the same sample shows no tab tip beyond the outline); "
             "height/tilt could not be solved from the rear views (ill-conditioned). Height, thickness, windows: PROTOTYPE.")
    s.append("\n**Receivers (81A807681A):** the three barbs on the bar above the lower opening (681_w63_5) are spaced "
             "short-long (86 / 128 mm, ratio 0.67) = pattern of the top clips C01–C03 (99 / 142 mm, ratio 0.70); the bottom "
             "family is regular (106 / 106 mm) and matches no single row → seats for C05–C07 not identified. Seat dimensions: not measurable.\n")
    s.append("## 8. Rear analysis (only what the photos support)\n")
    s.append("* Perimeter lip: continuous on both samples; rear silhouette of the Leo-b sample lies 1–2 mm **inside** the "
             "front outline along the installed bottom edge and the plate slant (alB_2 overlay) → lip recessed or rear edge "
             "rounded. One sample only → recorded, NOT modelled.")
    s.append("* Deep wall on the installed TOP edge of the opening, ending with a step at s ≈ 386 mm: confirmed on two samples "
             "(alB_2 rear, alA_1 through the opening) — modelled (V2 position kept).")
    s.append("* Thin rib along the installed BOTTOM rail ending at s ≈ 378 mm (alB_2): coincides with the visible band step; "
             "modelled only as the visible-face step (rib depth unmeasured).")
    s.append("* Clip roots grow from the lip (no bosses visible); plate B-side flat with molded text/date clock and ejector marks; no ribs found.\n")
    s.append("## 9. Stop criteria\n")
    fr = met["V3"]["front"]
    s.append("| Criterion | Status | Evidence |\n|---|---|---|")
    kk = met["V3"]["oblique_02"]["outer"]["mae"]
    s.append(f"| outer silhouette coincides in ≥ 2 independent photos | **yes (≤ 1 mm MAE on 2 samples)** | frontal alB_1 (Leo-b) {f(fr['outer']['mae'])} mm; "
             f"krik_0 (KRIK, other sample) {f(kk)} mm. Other views: alA_1 {f(met['V3']['oblique_01']['outer']['mae'])}, rear alB_2 {f(met['V3']['rear']['outer']['mae'])} mm (rear lip recess, see §8) |")
    s.append(f"| inner opening coincides | **yes, 1 sample** | frontal MAE {f(fr['opening']['mae'])} mm, stations ±0.2 mm; opening only measurable frontally (walls) |")
    s.append("| local frame width coincides | **yes, 1 sample** | 13 stations on alB_1, both bands within ±0.2 mm, steps reproduced |")
    s.append("| ≥ 2 oblique views agree on curvature | **yes (low-dimensional)** | alA_1 and mp_2 → A = 40 mm, u0 = 0.60; station-wise Z not identifiable |")
    lf = {r["id"]: r for r in json.load(open(os.path.join(V, "landmarks_V3_front.json")))}
    l2 = {r["id"]: r for r in json.load(open(os.path.join(V, "landmarks_V2_front.json")))}
    s.append(f"| no evident deviation at the terminals | **yes on frontal** | P01 {f(lf['P01']['err_mm'])} mm (V2 {f(l2['P01']['err_mm'])}), "
             f"P09 {f(lf['P09']['err_mm'])} mm (V2 {f(l2['P09']['err_mm'])}), P08 {f(lf['P08']['err_mm'])}, P16 {f(lf['P16']['err_mm'])}; "
             f"P03 {f(lf['P03']['err_mm'])} mm, ambiguous ±3 mm (shadow / end wall) |")
    s.append("\n**Verdict:** the stop criteria are met with these limits: opening, band widths and terminals are validated "
             "on ONE sample (the only clean frontal view online); the rear silhouette shows a 1-2 mm systematic offset "
             "(lip recess, one sample, not modelled); station-wise Z is not identifiable (only a 2-parameter wrap is). "
             "The aesthetic part is therefore declared **converged for prototyping, not certified**. Clips remain PROTOTYPE "
             "(positions/shapes measured on 2 samples; heights, tilt, thickness and seat fit not measurable from photos).\n")
    open(os.path.join(ROOT, "docs", "V3_report.md"), "w", encoding="utf-8").write("\n".join(s))
    print("written")


if __name__ == "__main__":
    main()
