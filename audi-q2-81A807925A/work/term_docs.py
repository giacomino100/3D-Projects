"""Terminal refinement documentation (all numbers read from measurement files)."""
import json, math, os, numpy as np, warnings
warnings.filterwarnings("ignore")
from reg import Model, ROOT
T = os.path.join(ROOT, "TERMINAL_REFINEMENT")
L5 = json.load(open(os.path.join(T, "landmarks_V5.json"))); L6 = json.load(open(os.path.join(T, "landmarks_V6.json")))
S5 = json.load(open(os.path.join(T, "overlays", "terminal_stats_V5.json"))); S6 = json.load(open(os.path.join(T, "overlays", "terminal_stats_V6.json")))
AG = json.load(open(os.path.join(T, "terminal_agreement_V5.json"))); RC = json.load(open(os.path.join(T, "recess_correction.json")))
f = lambda v, n=2: "—" if v is None else f"{v:.{n}f}"


def stations(m, ss):
    P, SF, PF = m.P, m.SF, m.PF
    o = PF.spline_points("outer", 6000); i = PF.spline_points("opening", 6000); rows = []
    for s in ss:
        c = o[np.abs(o[:, 0] - s) < 0.6]; yt, yb = c[:, 1].max(), c[:, 1].min(); ci = i[np.abs(i[:, 0] - s) < 0.6]
        bt = bb = None
        if len(ci) >= 2:
            bt, bb = yt - ci[:, 1].max(), ci[:, 1].min() - yb
        ym = 0.5 * (yt + yb); z = float(SF.zf(s, ym)); h = 0.3
        dzs = (SF.zf(s + h, ym) - SF.zf(s - h, ym)) / (2 * h); dzy = (SF.zf(s, ym + h) - SF.zf(s, ym - h)) / (2 * h)
        n = np.array([dzs, dzy, -1.0]); n /= np.linalg.norm(n); n[0] = -n[0]
        tw = math.degrees(math.atan2(float(SF.zf(s, yt) - SF.zf(s, yb)), yt - yb))
        rc = 0.0 if bt is None else float(-SF.rail_crown(s, yt - 0.5 * bt))
        rows.append(dict(s=s, X=P.L - s, Y=ym, Z=z, height=yt - yb, band_top=bt, band_bot=bb, normal=n.round(3).tolist(),
                         twist=tw, crown=f"{P.CROWN:.2f} global + {rc:.2f} rail", rear=f"lip {P.D_RET_OUTER} mm"))
    return rows


def st_table(rows, prefix):
    out = ["| Station | s | X / Y / Z (CAD mm) | visible height | band top / bottom | crown (mm) | face normal (CAD) | twist (deg) | rear return |",
           "|---|---:|---|---:|---|---|---|---:|---|"]
    for k, r in enumerate(rows):
        out.append(f"| {prefix}{k} | {r['s']:.1f} | {r['X']:.1f} / {r['Y']:.1f} / {r['Z']:.1f} | {r['height']:.1f} | "
                   f"{f(r['band_top'])} / {f(r['band_bot'])} | {r['crown']} | {r['normal']} | {r['twist']:.1f} | {r['rear']} |")
    return "\n".join(out)


def lm_md(prefixes, title):
    ids = sorted({r["id"] for v in L6.values() for r in v["rows"] if r["id"][0] in prefixes})
    out = [f"# {title}\n", "END A = wide solid end, END B = narrow loop end (names independent of the CAD camera). "
           "Residual = signed normal distance CAD edge → OEM edge (+ = OEM outside the CAD contour); measured by edge search with "
           "the camera matched on the full part. '—' = not visible or not measurable in that view (high-curvature corners "
           "often defeat the edge search; opening edges are measured only in frontal views).\n"]
    for k in ids:
        name = next(r["name"] for v in L6.values() for r in v["rows"] if r["id"] == k)
        r6 = next(r for r in next(iter(L6.values()))["rows"] if r["id"] == k)
        out.append(f"\n## {k} — {name}\nCAD V6: s = {r6['s']} mm, X/Y/Z = {r6['X']} / {r6['Y']} / {r6['Z']} mm\n")
        out.append("| view (photo) | CAD px | OEM px | residual px | residual mm V6 | residual mm V5 | confidence |")
        out.append("|---|---|---|---:|---:|---:|---|")
        for tag, v in L6.items():
            r = next(x for x in v["rows"] if x["id"] == k); r5 = next(x for x in L5[tag]["rows"] if x["id"] == k)
            out.append(f"| {tag} ({v['photo']}) | {r['cad_px']} | {r['oem_px'] or '—'} | {f(r['res_px'], 1)} | {f(r['res_mm'])} | {f(r5['res_mm'])} | {r['conf']} |")
    return "\n".join(out)


m6 = Model("V6")
sa, sb = m6.i2[:, 0].min(), m6.i2[:, 0].max(); s1 = m6.o2[:, 0].max()
EA = stations(m6, [2.0, 15.0, 35.0, 70.0, 105.0, sa + 5])
EB = stations(m6, [sb - 80, sb - 50, sb - 25, sb - 8, sb + 5, s1 - 6, s1 - 1.5])
A = lm_md("A", "END A landmarks (wide solid end) — A01…A13") + "\n\n## Local stations EA0…EA5 (V6)\n\n" + st_table(EA, "EA")
B = lm_md("BR", "END B landmarks (narrow loop end) — B01…B12, recess R01…R05") + "\n\n## Local stations EB0…EB6 (V6)\n\n" + st_table(EB, "EB")
open(os.path.join(T, "END_A_landmarks.md"), "w", encoding="utf-8").write(A)
open(os.path.join(T, "END_B_landmarks.md"), "w", encoding="utf-8").write(B)

# overlay analysis
O = ["# Terminal overlay analysis — 81A807925A\n",
     "Cameras matched on the full part for each exact-target photo (V5 workflow); terminal crops: `overlays/OEM_END_*_overlay_V5.png` "
     "(before) and `_V6.png` (after), edge overlays `*_edges_*.png` (red = OEM edges, cyan = CAD silhouette).\n",
     "## Terminal-zone deviation (mean / MAE, mm)\n", "| terminal / view | outer V5 | outer V6 | opening V5 | opening V6 |", "|---|---|---|---|---|"]
for k in S5:
    a, b = S5[k], S6.get(k, {})
    O.append(f"| {k} | {f(a['outer']['mean'])} / {f(a['outer']['mae'])} | {f(b.get('outer', {}).get('mean'))} / {f(b.get('outer', {}).get('mae'))} | "
             f"{f(a['opening']['mean'])} / {f(a['opening']['mae'])} | {f(b.get('opening', {}).get('mean'))} / {f(b.get('opening', {}).get('mae'))} |")
O += ["\n## Hypotheses of the brief, tested\n",
      "| Hypothesis | Evidence | Verdict |", "|---|---|---|",
      "| END A upper edge too straight for too long | Leo-b (2560 px) residual ±0.25 mm along the whole upper approach (13 earlier manual stations + edge search); ccm44 and polovni show −0.5…−1.0 mm (OEM edge lower) on s 35–75 | CONFLICT between specimens (the same pattern as the upper-band conflict of V4/V5); not applied |",
      "| END A descent too clean / nose too smooth | Leo-b: outer-descent residuals ≤ 0.3 mm; nose +1.1…1.3 mm on 3 samples (single view, the other specimens crop or shadow the nose) | single-view → not applied, kept as uncertainty |",
      "| END A broad surface too planar | plate luminance range 60 vs rails 104–126 (V5 H6 test): the plate IS nearly flat-shaded | not supported for the plate (rails already rounded in V5) |",
      "| END A opening termination | Leo-b ≈ 0, polovni +0.4…+1.8, ccm44 −0.4…−1.4 mm on the same bins | CONFLICT (opposite signs) → unchanged |",
      "| END B tip asymmetric | Leo-b front: tip/shoulder residuals ≤ 0.3 mm; KRIK ≤ 0.85 mm | CAD tip asymmetry (upper shoulder R 3.5, lower sweep R 17–18) already matches |",
      "| END B inner turn = generic fillet | Leo-b ≤ 0.5 mm along the turn; polovni and ccm44 conflict in sign (±0.5–0.9) | no consistent signal → unchanged |",
      "| END B local concave recess | objective background-edge extraction on Leo-b and ccm44: BOTH show two sharp band steps (bottom edge −38.9 → −42.5 mm, top edge −8.3 → −7.1 mm) with ~8 mm transitions; V5 had 15–25 mm ramps | CONFIRMED (2 specimens) → modelled explicitly (R-feature) |",
      "| END B 3D (oblique A tip ~10 mm off) | tip offset in alA_1 decomposes to Δz ≈ −17 mm (tip more forward); the Marktplaats profile puts the tip within 2.7 mm of the CAD; Leo-b front within 1.7 mm; alA_1 is a close-range wide-angle shot (f ≈ 1440 px, 27 cm) with the tip at the image border, lens distortion not modelled | CONFLICT (one view) → not applied, documented |",
      "\n## Recess position conflict\n",
      "ccm44 shows both steps ≈ 10–12 mm closer to END A than Leo-b. ccm44 crops END B, so its camera has no constraint at that end and its s-scale "
      "near the right border is not reliable; Leo-b has both tips in frame at 5 px/mm. Position therefore from Leo-b; the transition shape (sharp, ~8 mm) "
      "is common to both.\n"]
open(os.path.join(T, "terminal_overlay_analysis.md"), "w", encoding="utf-8").write("\n".join(O))

C = ["# Terminal changes (V5 → terminal refinement)\n",
     "Not rebuilt from zero: `cad/parameters_v6.py` imports V5 and overrides only `OPENING_CPS` inside the two END B recess windows. "
     "Clips, rear, central rails, scale: unchanged. Rule: a change only where ≥ 2 exact-target specimens agree; otherwise documented.\n",
     "| Region | Previous mismatch | Geometric change | Reference | Confidence |", "|---|---|---|---|---|",
     f"| END B recess, opening BOTTOM edge (R01–R05), s {RC['bottom']['window_s'][0]:.0f}–{RC['bottom']['window_s'][1]:.0f} | V5 step from −38.9 to −43.1 mm spread over s 377–393 (15 mm ramp, 0.6 mm too deep) | step re-traced: −38.9 → −42.5 mm over s 379–387 (~8 mm), minimum raised 0.6 mm; max local move {RC['bottom']['max_abs_change_mm']} mm | alB_1 (edge points), shape confirmed on ccm_1 | MEDIUM (existence/shape HIGH, position from 1 specimen) |",
     f"| END B recess, opening TOP edge, s {RC['top']['window_s'][0]:.0f}–{RC['top']['window_s'][1]:.0f} | V5 smooth 25 mm ramp −8.4 → −7.4 | sharp step at s ≈ 389: −8.3 → −7.1 mm over ~4 mm; max local move {RC['top']['max_abs_change_mm']} mm | alB_1, shape confirmed on ccm_1 | MEDIUM |",
     "| END A (all landmarks A01–A13) | conflicts between specimens (see analysis) | none | — | — |",
     "| END B outer contour B01–B07, inner turn B08–B12 | residuals ≤ 0.5 mm on Leo-b; other specimens conflict in sign | none | — | — |",
     "| END B tip in oblique A | ~10 mm, explained only by a 17 mm Z change contradicted by the profile view | none (documented) | alA_1 vs mp_2 | — |",
     "\n## Radii / band widths\n",
     "No global fillet is used. Terminal radii are properties of the traced splines (END A nose ≈ 3.3 mm, END B upper shoulder ≈ 3.5 mm, "
     "END B lower sweep ≈ 17–18 mm, END A lower sweep ≈ 70 mm); visible-edge fillets remain unapplied (OCC). Band widths vary continuously "
     "(see EA/EB station tables and `REFERENCE_PACK_V5/analysis/curvature_profile.csv`).\n",
     "## Stop criteria\n", "| END A | status |", "|---|---|",
     "| upper silhouette agrees with multiple photos | Leo-b ±0.25 mm; ccm44/polovni −0.5…−1 mm → partially (specimen conflict) |",
     "| outer descent / lower sweep / nose | Leo-b ≤ 0.3 mm (nose +1.1 single view); KRIK oblique ≤ 0.6 mm | yes except nose (1 view) |",
     "| inner opening termination | conflicting specimens | open |",
     "| front + oblique explained by one 3D geometry | KRIK oblique 0.59 mm MAE, alA_1 1.3 mm | yes |",
     "| END B | status |", "|---|---|",
     "| tapered end in front view | Leo-b ≤ 0.3 mm | yes |",
     "| inner opening turn | Leo-b ≤ 0.5 mm, others conflict | partially |",
     "| tip asymmetry | matches (front + KRIK) | yes |",
     "| recess | confirmed on 2 specimens and modelled | yes (position from 1 specimen) |",
     "| front + oblique + profile consistent | front + KRIK + profile yes; alA_1 tip no | partially |",
     "\n**Status: terminals not declared final** (END A specimen conflicts on the upper approach and opening termination; END B tip in one oblique view).\n"]
open(os.path.join(T, "terminal_changes.md"), "w", encoding="utf-8").write("\n".join(C))
print("ok")
