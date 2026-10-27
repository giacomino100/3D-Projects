# 81A807925A TB2 — V3 photo-registration report

V2 = baseline (frozen). V3 derived **only** from measurable comparisons with photographs of the exact part (81A807925A, molded number visible on ccm_3, fre_5, krik_1, mp_3, alB_3). No similar parts used as dimensional source. Scale: unchanged from V2 (group box 548 mm via installed photos, ±15 mm).

## 1. Photo set and classification

| Class | Photos (exact part) | Used for |
|---|---|---|
| frontal | **925_alB_1** (Allegro Leo-b, 2560 px, new sample), 925_ccm_1 (cropped) | V3-A silhouette + opening (13 stations, manual + edge search) |
| rear | **925_alB_2** (Leo-b), **925_alA_4** (spawplast, 2500 px), 925_pru_4, 925_ccm_2 | clip bases (2 samples), rear silhouette check |
| oblique front 30–45° | **925_alA_1** (spawplast, from above), **925_krik_0** (KRIK, from below), 925_mp_1_hr, 925_fre_1 | Z wrap scan, validation |
| oblique rear | 925_fre_3, 925_fre_4, 925_krik_2 | wall / tab topology |
| profile (upper/lower) | **925_mp_2_hr** (Marktplaats 1440 px, along the length) | Z wrap scan (manual silhouette) |
| Z-curvature view | 925_mp_2_hr, 925_alA_1 | V3-B |
| close-ups | 925_alB_3, 925_fre_5, 925_mp_3_hr, 925_alA_5, 925_ccm_3 | tab shape, ID |
| receiver 81A807681A | 681_w63_5, 681_w48_6, 681_psh_3, 681_al_1..5 (Allegro 1920×2560) | clip ↔ seat pattern |

Not used as dimensional source: installed views (corner_*, w63_*): the 681A grille covers part of the top band and the tips (this biased V2).

## 2. Method (measure → compare → modify → render → compare)

* Camera per photo: pinhole (R, t, f) from hand-picked extremes (P01, P09, P03, P16) + point-to-curve edge picks, then refined on image edges (normal search, background-aware). Camera side (front/back) enforced — an unconstrained fit converged once to the mirror (rear) solution on krik_0; that run was discarded.
* Deviation = signed normal distance CAD edge → OEM edge, px and mm (local px/mm from the camera). Non-frontal views use the lip-aware silhouette (front edge or back of the lip, whichever projects outward); opening edges are measured only in the frontal view (deep walls are visible through the opening in obliques).
* Where automatic edges are unreliable (silver ≈ grey background, cast shadows, highlights), manual readings on 4×–6× zoom strips were used and objectively cross-checked with intensity profiles.

## 3. V2 vs V3 — silhouette deviation per view (MAE, mm)

| View | Photo | outer V2 | outer V3 | opening V2 | opening V3 | note |
|---|---|---:|---:|---:|---:|---|
| front | 925_alB_1 | 0.64 | 0.36 | 2.13 | 0.35 | frontal, Leo-b sample (Allegro 15311724741), 2560 px |
| oblique_01 | 925_alA_1 | 1.69 | 1.39 | — | — | oblique from above, spawplast sample (Allegro 11269 = RRR pru6165), 2500 px |
| oblique_02 | 925_krik_0 | 1.13 | 0.87 | — | — | oblique from below, KRIK sample, 1024 px |
| rear | 925_alB_2 | 1.69 | 1.79 | — | — | rear, Leo-b sample (same part as front), 2560 px |
| profile | 925_mp_2_hr | 2.00 | 1.81 | — | — | rear profile along the length, Marktplaats sample, 1440 px; manual silhouette RMS V2 4.36 / V3 3.81 mm |

Overlays (50 % CAD render over the OEM photo, camera re-registered on each model, colored normal deviations): `docs/V3/validation/OEM_vs_V3_{front,oblique_01,oblique_02,profile,rear}_overlay.png` and the V2 equivalents.

## 4. Landmarks P01–P20 (frozen definitions: work/lm.py)

Extreme landmarks (P01, P03, P09, P16): 2-D error vs hand pick. Edge landmarks: 1-D normal error (the only objectively measurable component on a smooth edge). '—' = not visible/measurable in that view.

### front — 925_alB_1

| Landmark | | X / Y / Z (CAD, mm) | OEM px | CAD px | err px | err mm (V3) | err mm (V2) | confidence |
|---|---|---|---|---|---:|---:|---:|---|
| P01 | inner tip (end of solid zone) | 477.2 / -8.3 / -1.1 | (2516, 1081) | (2511, 1081) | 4.9 | 1.02 | 4.91 | medium (hand pick ±3 px) |
| P02 | top of solid zone | 362.5 / -3.6 / -3.4 | — | (1949, 1090) | — | — | — | not measurable |
| P03 | opening start | 359.8 / -21.4 / -5.9 | (1937, 1012) | (1936, 999) | 13.3 | 2.66 | 6.43 | medium (hand pick ±3 px) |
| P04 | opening upper inner fillet | 359.1 / -18.5 / -5.6 | — | (1932, 1013) | — | — | — | not measurable |
| P05 | outer upper edge 25% | 356.5 / -3.5 / -3.5 | — | (1919, 1090) | — | — | — | not measurable |
| P06 | outer upper edge 50% | 236.5 / -1.7 / -4.1 | (1313, 1084) | (1313, 1085) | 1.3 | 0.24 | 0.61 | high |
| P07 | outer upper edge 75% | 113.5 / -0.4 / 2.1 | (681, 1087) | (681, 1085) | 2.7 | 0.51 | 0.73 | high |
| P08 | outer upper shoulder | -4.8 / -2.2 / 44.2 | (106, 1104) | (105, 1107) | 3.2 | 0.62 | 1.05 | high |
| P09 | outer-most point | -6.8 / -4.0 / 45.0 | (91, 1092) | (96, 1098) | 8.0 | 1.73 | 7.31 | medium (hand pick ±3 px) |
| P10 | outer lower shoulder | 61.4 / -48.3 / 6.6 | (425, 847) | (425, 846) | 0.2 | 0.03 | — | high |
| P11 | outer lower edge 75% | 115.2 / -51.1 / -5.8 | (697, 828) | (697, 823) | 5.2 | 1.03 | 0.34 | high |
| P12 | outer lower edge 50% | 235.2 / -53.0 / -9.8 | (1310, 821) | (1310, 824) | 3.1 | 0.61 | 0.91 | high |
| P13 | outer lower edge 25% | 355.1 / -55.5 / -8.9 | (1910, 828) | (1910, 828) | 0.3 | 0.05 | 0.93 | high |
| P14 | opening lower inner fillet | 358.6 / -27.2 / -6.6 | — | (1929, 969) | — | — | — | not measurable |
| P15 | lower end of solid zone | 429.7 / -52.0 / -7.0 | (2276, 856) | (2276, 857) | 0.3 | 0.07 | 1.20 | high |
| P16 | opening outer-most point | 12.5 / -11.2 / 32.7 | (186, 1052) | (185, 1053) | 1.5 | 0.31 | 0.40 | medium (hand pick ±3 px) |
| P17 | opening upper edge 50% | 187.4 / -9.9 / -5.0 | (1062, 1037) | (1062, 1038) | 0.3 | 0.05 | 2.53 | high |
| P18 | opening lower edge 50% | 187.5 / -40.5 / -9.0 | (1066, 879) | (1066, 881) | 1.2 | 0.24 | 2.96 | high |
| P19 | opening outer upper fillet | 12.5 / -11.2 / 32.7 | — | (185, 1053) | — | — | — | not measurable |
| P20 | opening outer lower fillet | 31.8 / -29.3 / 20.2 | (270, 938) | (278, 953) | 16.5 | 3.47 | 0.54 | medium |

### oblique_01 — 925_alA_1

| Landmark | | X / Y / Z (CAD, mm) | OEM px | CAD px | err px | err mm (V3) | err mm (V2) | confidence |
|---|---|---|---|---|---:|---:|---:|---|
| P01 | inner tip (end of solid zone) | 477.2 / -8.3 / -1.1 | (2488, 962) | (2489, 988) | 25.6 | 5.24 | 2.49 | medium (hand pick ±3 px) |
| P02 | top of solid zone | 362.5 / -3.6 / -3.4 | (1894, 1016) | (1895, 1012) | 3.7 | 0.87 | 1.57 | medium |
| P03 | opening start | 359.8 / -21.4 / -5.9 | (1905, 912) | (1904, 935) | 22.6 | 4.33 | 11.00 | medium (hand pick ±3 px) |
| P04 | opening upper inner fillet | 359.1 / -18.5 / -5.6 | — | (1897, 948) | — | — | — | not measurable |
| P05 | outer upper edge 25% | 356.5 / -3.5 / -3.5 | (1863, 1017) | (1864, 1012) | 4.8 | 1.12 | 1.67 | high |
| P06 | outer upper edge 50% | 236.5 / -1.7 / -4.1 | — | (1246, 1019) | — | — | — | not measurable |
| P07 | outer upper edge 75% | 113.5 / -0.4 / 2.1 | — | (632, 1006) | — | — | — | not measurable |
| P08 | outer upper shoulder | -4.8 / -2.2 / 44.2 | — | (192, 908) | — | — | 1.65 | not measurable |
| P09 | outer-most point | -6.8 / -4.0 / 45.0 | (143, 905) | (183, 899) | 40.6 | 18.25 | 1.03 | medium (hand pick ±3 px) |
| P10 | outer lower shoulder | 61.4 / -48.3 / 6.6 | (320, 762) | (323, 770) | 9.2 | 1.78 | — | high |
| P11 | outer lower edge 75% | 115.2 / -51.1 / -5.8 | (571, 772) | (573, 779) | 7.2 | 1.36 | 1.99 | medium |
| P12 | outer lower edge 50% | 235.2 / -53.0 / -9.8 | (1239, 794) | (1238, 779) | 15.1 | 2.86 | 0.40 | high |
| P13 | outer lower edge 25% | 355.1 / -55.5 / -8.9 | (1917, 785) | (1921, 766) | 19.3 | 3.54 | 2.57 | medium |
| P14 | opening lower inner fillet | 358.6 / -27.2 / -6.6 | — | (1905, 908) | — | — | — | not measurable |
| P15 | lower end of solid zone | 429.7 / -52.0 / -7.0 | (2336, 781) | (2335, 783) | 2.6 | 0.42 | 0.72 | high |
| P16 | opening outer-most point | 12.5 / -11.2 / 32.7 | (220, 893) | (221, 893) | 0.8 | 0.36 | 6.69 | medium (hand pick ±3 px) |
| P17 | opening upper edge 50% | 187.4 / -9.9 / -5.0 | — | (991, 982) | — | — | — | not measurable |
| P18 | opening lower edge 50% | 187.5 / -40.5 / -9.0 | — | (975, 842) | — | — | — | not measurable |
| P19 | opening outer upper fillet | 12.5 / -11.2 / 32.7 | — | (221, 893) | — | — | — | not measurable |
| P20 | opening outer lower fillet | 31.8 / -29.3 / 20.2 | — | (246, 837) | — | — | — | not measurable |

### oblique_02 — 925_krik_0

| Landmark | | X / Y / Z (CAD, mm) | OEM px | CAD px | err px | err mm (V3) | err mm (V2) | confidence |
|---|---|---|---|---|---:|---:|---:|---|
| P01 | inner tip (end of solid zone) | 477.2 / -8.3 / -1.1 | (151, 354) | (153, 353) | 1.9 | 1.20 | 3.22 | medium (hand pick ±3 px) |
| P02 | top of solid zone | 362.5 / -3.6 / -3.4 | (345, 339) | (345, 339) | 0.6 | 0.38 | — | high |
| P03 | opening start | 359.8 / -21.4 / -5.9 | (348, 380) | (347, 368) | 11.6 | 6.80 | 15.26 | medium (hand pick ±3 px) |
| P04 | opening upper inner fillet | 359.1 / -18.5 / -5.6 | — | (349, 364) | — | — | — | not measurable |
| P05 | outer upper edge 25% | 356.5 / -3.5 / -3.5 | (356, 338) | (356, 339) | 0.6 | 0.38 | 0.51 | high |
| P06 | outer upper edge 50% | 236.5 / -1.7 / -4.1 | (562, 332) | (562, 330) | 1.9 | 1.18 | 0.01 | high |
| P07 | outer upper edge 75% | 113.5 / -0.4 / 2.1 | (774, 325) | (774, 326) | 0.5 | 0.34 | 1.07 | high |
| P08 | outer upper shoulder | -4.8 / -2.2 / 44.2 | (946, 344) | (945, 342) | 2.0 | 1.44 | — | high |
| P09 | outer-most point | -6.8 / -4.0 / 45.0 | (950, 346) | (949, 345) | 1.8 | 1.73 | 4.25 | medium (hand pick ±3 px) |
| P10 | outer lower shoulder | 61.4 / -48.3 / 6.6 | (878, 414) | (877, 407) | 6.3 | 3.51 | 2.31 | high |
| P11 | outer lower edge 75% | 115.2 / -51.1 / -5.8 | — | (787, 411) | — | — | — | not measurable |
| P12 | outer lower edge 50% | 235.2 / -53.0 / -9.8 | — | (568, 418) | — | — | — | not measurable |
| P13 | outer lower edge 25% | 355.1 / -55.5 / -8.9 | (351, 425) | (351, 428) | 2.3 | 1.24 | 1.10 | high |
| P14 | opening lower inner fillet | 358.6 / -27.2 / -6.6 | — | (348, 378) | — | — | — | not measurable |
| P15 | lower end of solid zone | 429.7 / -52.0 / -7.0 | (221, 423) | (220, 425) | 2.0 | 1.08 | 0.07 | high |
| P16 | opening outer-most point | 12.5 / -11.2 / 32.7 | (921, 348) | (929, 352) | 9.1 | 8.20 | 4.94 | medium (hand pick ±3 px) |
| P17 | opening upper edge 50% | 187.4 / -9.9 / -5.0 | — | (649, 342) | — | — | — | not measurable |
| P18 | opening lower edge 50% | 187.5 / -40.5 / -9.0 | — | (654, 394) | — | — | — | not measurable |
| P19 | opening outer upper fillet | 12.5 / -11.2 / 32.7 | — | (929, 352) | — | — | — | not measurable |
| P20 | opening outer lower fillet | 31.8 / -29.3 / 20.2 | — | (912, 378) | — | — | — | not measurable |

### rear — 925_alB_2

| Landmark | | X / Y / Z (CAD, mm) | OEM px | CAD px | err px | err mm (V3) | err mm (V2) | confidence |
|---|---|---|---|---|---:|---:|---:|---|
| P01 | inner tip (end of solid zone) | 477.2 / -8.3 / -1.1 | (97, 991) | (101, 996) | 6.5 | 1.46 | 4.50 | medium (hand pick ±3 px) |
| P02 | top of solid zone | 362.5 / -3.6 / -3.4 | — | (606, 1015) | — | — | — | not measurable |
| P03 | opening start | 359.8 / -21.4 / -5.9 | — | (628, 937) | — | — | — | not measurable |
| P04 | opening upper inner fillet | 359.1 / -18.5 / -5.6 | — | (630, 950) | — | — | — | not measurable |
| P05 | outer upper edge 25% | 356.5 / -3.5 / -3.5 | — | (633, 1015) | — | — | — | not measurable |
| P06 | outer upper edge 50% | 236.5 / -1.7 / -4.1 | — | (1184, 1019) | — | — | — | not measurable |
| P07 | outer upper edge 75% | 113.5 / -0.4 / 2.1 | — | (1781, 1014) | — | — | — | not measurable |
| P08 | outer upper shoulder | -4.8 / -2.2 / 44.2 | (2472, 959) | (2468, 950) | 9.3 | 1.70 | 3.76 | high |
| P09 | outer-most point | -6.8 / -4.0 / 45.0 | (2481, 947) | (2480, 939) | 7.9 | 1.12 | 4.77 | medium (hand pick ±3 px) |
| P10 | outer lower shoulder | 61.4 / -48.3 / 6.6 | (2036, 777) | (2036, 776) | 0.7 | 0.16 | — | high |
| P11 | outer lower edge 75% | 115.2 / -51.1 / -5.8 | (1761, 798) | (1761, 786) | 11.7 | 2.64 | 0.90 | high |
| P12 | outer lower edge 50% | 235.2 / -53.0 / -9.8 | (1200, 780) | (1199, 794) | 13.7 | 3.15 | 3.88 | high |
| P13 | outer lower edge 25% | 355.1 / -55.5 / -8.9 | (666, 779) | (665, 791) | 12.5 | 2.95 | 3.08 | high |
| P14 | opening lower inner fillet | 358.6 / -27.2 / -6.6 | — | (636, 912) | — | — | — | not measurable |
| P15 | lower end of solid zone | 429.7 / -52.0 / -7.0 | (342, 820) | (340, 810) | 10.2 | 2.51 | 0.28 | high |
| P16 | opening outer-most point | 12.5 / -11.2 / 32.7 | — | (2344, 919) | — | — | — | not measurable |
| P17 | opening upper edge 50% | 187.4 / -9.9 / -5.0 | — | (1418, 980) | — | — | — | not measurable |
| P18 | opening lower edge 50% | 187.5 / -40.5 / -9.0 | — | (1418, 844) | — | — | — | not measurable |
| P19 | opening outer upper fillet | 12.5 / -11.2 / 32.7 | — | (2344, 919) | — | — | — | not measurable |
| P20 | opening outer lower fillet | 31.8 / -29.3 / 20.2 | — | (2212, 846) | — | — | — | not measurable |

### profile — 925_mp_2_hr

| Landmark | | X / Y / Z (CAD, mm) | OEM px | CAD px | err px | err mm (V3) | err mm (V2) | confidence |
|---|---|---|---|---|---:|---:|---:|---|
| P01 | inner tip (end of solid zone) | 477.2 / -8.3 / -1.1 | (532, 1284) | (533, 1294) | 10.7 | 3.82 | 2.05 | high |
| P02 | top of solid zone | 362.5 / -3.6 / -3.4 | (526, 984) | (534, 984) | 7.5 | 3.34 | 3.55 | high |
| P03 | opening start | 359.8 / -21.4 / -5.9 | — | (493, 981) | — | — | — | not measurable |
| P04 | opening upper inner fillet | 359.1 / -18.5 / -5.6 | — | (500, 978) | — | — | — | not measurable |
| P05 | outer upper edge 25% | 356.5 / -3.5 / -3.5 | — | (534, 969) | — | — | — | not measurable |
| P06 | outer upper edge 50% | 236.5 / -1.7 / -4.1 | — | (530, 676) | — | — | — | not measurable |
| P07 | outer upper edge 75% | 113.5 / -0.4 / 2.1 | — | (535, 395) | — | — | — | not measurable |
| P08 | outer upper shoulder | -4.8 / -2.2 / 44.2 | — | (585, 84) | — | — | — | not measurable |
| P09 | outer-most point | -6.8 / -4.0 / 45.0 | (578, 77) | (583, 76) | 4.6 | 1.43 | 2.52 | medium (hand pick ±3 px) |
| P10 | outer lower shoulder | 61.4 / -48.3 / 6.6 | — | (444, 240) | — | — | — | not measurable |
| P11 | outer lower edge 75% | 115.2 / -51.1 / -5.8 | — | (424, 375) | — | — | — | not measurable |
| P12 | outer lower edge 50% | 235.2 / -53.0 / -9.8 | — | (416, 664) | — | — | 1.99 | not measurable |
| P13 | outer lower edge 25% | 355.1 / -55.5 / -8.9 | — | (413, 976) | — | — | — | not measurable |
| P14 | opening lower inner fillet | 358.6 / -27.2 / -6.6 | — | (480, 979) | — | — | — | not measurable |
| P15 | lower end of solid zone | 429.7 / -52.0 / -7.0 | — | (425, 1183) | — | — | — | not measurable |
| P16 | opening outer-most point | 12.5 / -11.2 / 32.7 | — | (552, 130) | — | — | — | not measurable |
| P17 | opening upper edge 50% | 187.4 / -9.9 / -5.0 | — | (511, 561) | — | — | — | not measurable |
| P18 | opening lower edge 50% | 187.5 / -40.5 / -9.0 | — | (444, 552) | — | — | — | not measurable |
| P19 | opening outer upper fillet | 12.5 / -11.2 / 32.7 | — | (552, 130) | — | — | — | not measurable |
| P20 | opening outer lower fillet | 31.8 / -29.3 / 20.2 | — | (500, 173) | — | — | — | not measurable |

## 5. V3-B — Z curvature, stations S00…S11

Per-station free fits (12 stations) were **not identifiable** (σ 3–17 mm, single views disagreeing) → rejected. Low-dimensional wrap law z = A·w^2.5 (w from onset u0) scanned per view:

| View | best (A mm, u0) | cost at best | cost without wrap | discriminative? |
|---|---|---:|---:|---|
| 925_alA_1 | (40, 0.60) | 1.141 mm | 1.256 mm | yes |
| 925_krik_0 | (55, 0.75) | 0.723 mm | 0.763 mm | weak |
| 925_alB_2 | (55, 0.30) | 1.066 mm | 1.544 mm | yes |
| 925_mp_2_hr (manual silhouette) | (40, 0.60) | 2.86 px | 5.43 px | yes |

**Two independent oblique views (925_alA_1, 925_mp_2_hr — different physical samples) agree on A = 40 mm, u0 = 0.60** (grid ±10 mm / ±0.15). V2 had 36.8 mm from 0.45.

| Station | s [mm] | X_cad [mm] | z_mid [mm] | σ_z [mm] | pitch [°] | status |
|---|---:|---:|---:|---:|---:|---|
| S00 | 0.0 | 472.0 | 0.00 | 0.0 | 6.0 (assumed) | NOT observable (sag 4 mm assumed) |
| S01 | 42.9 | 429.1 | -1.32 | 0.0 | 6.0 (assumed) | NOT observable (sag 4 mm assumed) |
| S02 | 85.8 | 386.2 | -2.38 | 0.0 | 6.0 (assumed) | NOT observable (sag 4 mm assumed) |
| S03 | 128.7 | 343.3 | -3.17 | 0.0 | 6.0 (assumed) | NOT observable (sag 4 mm assumed) |
| S04 | 171.6 | 300.4 | -3.70 | 0.0 | 6.0 (assumed) | NOT observable (sag 4 mm assumed) |
| S05 | 214.6 | 257.4 | -3.97 | 0.0 | 6.0 (assumed) | NOT observable (sag 4 mm assumed) |
| S06 | 257.4 | 214.6 | -3.97 | 0.0 | 6.7 (assumed) | NOT observable (sag 4 mm assumed) |
| S07 | 300.4 | 171.6 | -3.60 | 0.1 | 7.4 (assumed) | measured (wrap law, 2 views) |
| S08 | 343.3 | 128.7 | -0.89 | 1.6 | 8.0 (assumed) | measured (wrap law, 2 views) |
| S09 | 386.2 | 85.8 | 6.41 | 5.3 | 8.7 (assumed) | measured (wrap law, 2 views) |
| S10 | 429.1 | 42.9 | 19.67 | 8.0 | 9.3 (assumed) | measured (wrap law, 2 views) |
| S11 | 472.0 | 0.0 | 40.00 | 7.5 | 10.0 (assumed) | measured (wrap law, 2 views) |

## 6. Cross-sections S00, S02, S04, S06, S08, S10, S11

Plot: `docs/V3/sections_V2_vs_V3.png`. Body = loft of 17 curved sections ∩ planform (not a 2-D extrusion).

| Station | model | band top [mm] | band bottom [mm] | inclination [°] | z top / z bottom [mm] |
|---|---|---:|---:|---:|---|
| S00 | V2 | — | — | 8.3 | -0.62 / -2.19 |
| S00 | V3 | — | — | 7.9 | -0.76 / -2.78 |
| S02 | V2 | — | — | 5.9 | -2.82 / -8.0 |
| S02 | V3 | — | — | 5.8 | -3.0 / -8.28 |
| S04 | V2 | 4.78 | 7.67 | 5.9 | -4.13 / -9.35 |
| S04 | V3 | 9.07 | 12.82 | 5.9 | -4.12 / -9.56 |
| S06 | V2 | 5.22 | 7.89 | 6.8 | -3.75 / -9.64 |
| S06 | V3 | 8.82 | 11.24 | 6.8 | -3.88 / -9.98 |
| S08 | V2 | 5.00 | 10.78 | 8.3 | 2.34 / -4.63 |
| S08 | V3 | 8.12 | 11.98 | 8.3 | 0.01 / -7.38 |
| S10 | V2 | 4.71 | 11.31 | 10.1 | 21.55 / 14.34 |
| S10 | V3 | 7.76 | 10.28 | 10.0 | 21.29 / 13.54 |
| S11 | V2 | — | — | 12.3 | 37.65 / 34.62 |
| S11 | V3 | — | — | 12.2 | 40.69 / 37.78 |

Measured on 925_alB_1 (13 stations): top band 8.4–9.1 mm, bottom band ≈ 11–12 mm in the straight part; **band steps** at s ≈ 378 mm (bottom band, −3.1 mm) and s ≈ 386 mm (top band, −1.2 mm, where the deep wall ends). Crown, inclination, return depths, thickness, radii: not observable from silhouettes → ASSUMED (unchanged).

## 7. V3-C — clips rebuilt (prototype)

| Clip | type | edge | alB_2 centre / base | alA_4 centre / base | V3 s / base | shape evidence | confidence |
|---|---|---|---|---|---|---|---|
| C01 | flexible latch (sym. eyelet) | top | 45.5 / 15.0 | 44.5 / 26.9 | 45.0 / 27.0 | near-symmetric trapezoid (alA_4, alB_2) | pos high, width low |
| C02 | flexible latch (sym. eyelet) | top | 146.0 / 22.0 | 141.5 / 29.0 | 143.8 / 25.5 | near-symmetric trapezoid | pos medium, width low |
| C03 | flexible latch (ramp eyelet) | top | 289.4 / 35.0 | 281.9 / 34.0 | 285.7 / 34.5 | asymmetric ramp, both samples | pos medium, shape high |
| C04 | locating tongue (in-plane) | top, outer loop | — | 432.4 / 51.0 | 458→407 / 8 wide, 51 long | long tongue along the top edge (alA_4); hidden in frontal | topology medium |
| C05 | flexible latch (ramp eyelet) | bottom | 316.6 / 38.0 | 307.6 / 36.0 | 312.1 / 37.0 | ramp, longer base on both samples | pos medium |
| C06 | flexible latch (ramp eyelet) | bottom | 205.2 / 31.0 | 206.7 / 30.0 | 206.0 / 30.5 | ramp, both samples | pos high, width high |
| C07 | flexible latch (ramp eyelet) | bottom | 97.7 / 30.0 | 103.2 / 29.0 | 100.5 / 29.5 | ramp, both samples | pos medium, width high |

Repetition is only claimed where both samples show the same shape (C05–C07 ramp family, but C05 longer; C01–C02 symmetric family). Tilt 0° (frontal view of the same sample shows no tab tip beyond the outline); height/tilt could not be solved from the rear views (ill-conditioned). Height, thickness, windows: PROTOTYPE.

**Receivers (81A807681A):** the three barbs on the bar above the lower opening (681_w63_5) are spaced short-long (86 / 128 mm, ratio 0.67) = pattern of the top clips C01–C03 (99 / 142 mm, ratio 0.70); the bottom family is regular (106 / 106 mm) and matches no single row → seats for C05–C07 not identified. Seat dimensions: not measurable.

## 8. Rear analysis (only what the photos support)

* Perimeter lip: continuous on both samples; rear silhouette of the Leo-b sample lies 1–2 mm **inside** the front outline along the installed bottom edge and the plate slant (alB_2 overlay) → lip recessed or rear edge rounded. One sample only → recorded, NOT modelled.
* Deep wall on the installed TOP edge of the opening, ending with a step at s ≈ 386 mm: confirmed on two samples (alB_2 rear, alA_1 through the opening) — modelled (V2 position kept).
* Thin rib along the installed BOTTOM rail ending at s ≈ 378 mm (alB_2): coincides with the visible band step; modelled only as the visible-face step (rib depth unmeasured).
* Clip roots grow from the lip (no bosses visible); plate B-side flat with molded text/date clock and ejector marks; no ribs found.

## 9. Stop criteria

| Criterion | Status | Evidence |
|---|---|---|
| outer silhouette coincides in ≥ 2 independent photos | **yes (≤ 1 mm MAE on 2 samples)** | frontal alB_1 (Leo-b) 0.36 mm; krik_0 (KRIK, other sample) 0.87 mm. Other views: alA_1 1.39, rear alB_2 1.79 mm (rear lip recess, see §8) |
| inner opening coincides | **yes, 1 sample** | frontal MAE 0.35 mm, stations ±0.2 mm; opening only measurable frontally (walls) |
| local frame width coincides | **yes, 1 sample** | 13 stations on alB_1, both bands within ±0.2 mm, steps reproduced |
| ≥ 2 oblique views agree on curvature | **yes (low-dimensional)** | alA_1 and mp_2 → A = 40 mm, u0 = 0.60; station-wise Z not identifiable |
| no evident deviation at the terminals | **yes on frontal** | P01 1.02 mm (V2 4.91), P09 1.73 mm (V2 7.31), P08 0.62, P16 0.31; P03 2.66 mm, ambiguous ±3 mm (shadow / end wall) |

**Verdict:** the stop criteria are met with these limits: opening, band widths and terminals are validated on ONE sample (the only clean frontal view online); the rear silhouette shows a 1-2 mm systematic offset (lip recess, one sample, not modelled); station-wise Z is not identifiable (only a 2-parameter wrap is). The aesthetic part is therefore declared **converged for prototyping, not certified**. Clips remain PROTOTYPE (positions/shapes measured on 2 samples; heights, tilt, thickness and seat fit not measurable from photos).
