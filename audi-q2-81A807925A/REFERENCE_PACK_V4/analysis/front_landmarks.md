# Front landmarks P01–P20 — 81A807925A V4 (vs V3)

Definitions frozen in `work/lm.py` (same as the V3 report). Camera re-matched on each model. Extreme landmarks (P01 inner tip, P03 opening start, P09 outer-most, P16 opening outer-most): 2-D error vs hand pick. Edge landmarks: 1-D normal error from edge search. CAD X/Y/Z in mm (X toward vehicle right/inner tip, Y up, Z rearward). Opening landmarks are measured only in frontal views. '—' = not visible / not measurable.


## front_01 — REF_01_FRONT = 925_alB_1 (Leo-b, 2560 px)

| Landmark | name | CAD X / Y / Z | OEM px | CAD px (V4) | residual px | residual mm V4 | residual mm V3 | confidence |
|---|---|---|---|---|---:|---:|---:|---|
| P01 | inner tip (end of solid zone) | 477.1 / -8.5 / -1.1 | (2516, 1081) | (2512, 1081) | 3.7 | 0.76 | 1.44 | medium (hand pick ±3 px) |
| P02 | top of solid zone | 362.5 / -3.5 / -3.4 | — | (1950, 1090) | — | — | — | not measurable |
| P03 | opening start | 359.9 / -21.4 / -5.9 | (1937, 1012) | (1936, 999) | 13.0 | 2.61 | 2.87 | medium (hand pick ±3 px) |
| P04 | opening upper inner fillet | 359.1 / -18.5 / -5.6 | — | (1933, 1014) | — | — | — | not measurable |
| P05 | outer upper edge 25% | 356.5 / -3.4 / -3.5 | — | (1920, 1090) | — | — | — | not measurable |
| P06 | outer upper edge 50% | 236.5 / -1.7 / -4.1 | (1313, 1084) | (1313, 1084) | 0.8 | 0.15 | 0.03 | high |
| P07 | outer upper edge 75% | 113.5 / 0.2 / 2.2 | (680, 1088) | (680, 1087) | 0.3 | 0.05 | 0.61 | high |
| P08 | outer upper shoulder | -3.9 / -2.5 / 43.7 | (108, 1103) | (107, 1107) | 3.4 | 0.65 | 0.45 | high |
| P09 | outer-most point | -6.5 / -6.8 / 44.2 | (91, 1092) | (96, 1086) | 8.2 | 1.89 | 1.41 | medium (hand pick ±3 px) |
| P10 | outer lower shoulder | 43.6 / -44.2 / 13.3 | (338, 875) | (338, 874) | 1.3 | 0.27 | 0.11 | high |
| P11 | outer lower edge 75% | 115.0 / -50.1 / -5.7 | (696, 829) | (696, 828) | 0.7 | 0.14 | 1.04 | high |
| P12 | outer lower edge 50% | 235.0 / -52.9 / -9.8 | (1309, 821) | (1309, 824) | 3.1 | 0.63 | 0.61 | high |
| P13 | outer lower edge 25% | 354.9 / -55.5 / -8.9 | (1910, 828) | (1910, 828) | 0.8 | 0.17 | 0.06 | high |
| P14 | opening lower inner fillet | 358.6 / -27.2 / -6.6 | — | (1930, 969) | — | — | — | not measurable |
| P15 | lower end of solid zone | 435.0 / -49.7 / -6.7 | (2304, 868) | (2303, 870) | 1.5 | 0.31 | 0.09 | high |
| P16 | opening outer-most point | 13.0 / -11.3 / 32.5 | (186, 1052) | (186, 1054) | 1.5 | 0.31 | 0.17 | medium (hand pick ±3 px) |
| P17 | opening upper edge 50% | 187.4 / -9.9 / -5.0 | (1062, 1038) | (1062, 1037) | 0.7 | 0.14 | 0.05 | high |
| P18 | opening lower edge 50% | 187.5 / -40.5 / -9.0 | (1066, 879) | (1066, 880) | 0.7 | 0.14 | 0.24 | high |
| P19 | opening outer upper fillet | 13.0 / -11.3 / 32.5 | — | (186, 1054) | — | — | — | not measurable |
| P20 | opening outer lower fillet | 45.2 / -36.0 / 13.8 | (345, 918) | (343, 914) | 3.9 | 0.80 | — | high |

## front_02 — REF_02_FRONT_ALT = 925_ccm_1 (RRR ccm44, 1024 px)

| Landmark | name | CAD X / Y / Z | OEM px | CAD px (V4) | residual px | residual mm V4 | residual mm V3 | confidence |
|---|---|---|---|---|---:|---:|---:|---|
| P01 | inner tip (end of solid zone) | 477.1 / -8.5 / -1.1 | — | (-110, 330) | — | — | — | not measurable |
| P02 | top of solid zone | 362.5 / -3.5 / -3.4 | (198, 327) | (198, 327) | 0.1 | 0.04 | 0.20 | high |
| P03 | opening start | 359.9 / -21.4 / -5.9 | (203, 362) | (203, 375) | 13.3 | 5.07 | 5.16 | medium (hand pick ±3 px) |
| P04 | opening upper inner fillet | 359.1 / -18.5 / -5.6 | — | (205, 368) | — | — | — | not measurable |
| P05 | outer upper edge 25% | 356.5 / -3.4 / -3.5 | (213, 326) | (213, 327) | 0.6 | 0.22 | 0.20 | high |
| P06 | outer upper edge 50% | 236.5 / -1.7 / -4.1 | (520, 329) | (520, 332) | 2.3 | 0.88 | 0.67 | high |
| P07 | outer upper edge 75% | 113.5 / 0.2 / 2.2 | (814, 333) | (814, 334) | 1.1 | 0.44 | 0.98 | high |
| P08 | outer upper shoulder | -3.9 / -2.5 / 43.7 | — | (1043, 336) | — | — | — | not measurable |
| P09 | outer-most point | -6.5 / -6.8 / 44.2 | — | (1047, 347) | — | — | — | not measurable |
| P10 | outer lower shoulder | 43.6 / -44.2 / 13.3 | — | (958, 446) | — | — | — | not measurable |
| P11 | outer lower edge 75% | 115.0 / -50.1 / -5.7 | — | (808, 464) | — | — | — | not measurable |
| P12 | outer lower edge 50% | 235.0 / -52.9 / -9.8 | — | (520, 467) | — | — | — | not measurable |
| P13 | outer lower edge 25% | 354.9 / -55.5 / -8.9 | — | (213, 468) | — | — | — | not measurable |
| P14 | opening lower inner fillet | 358.6 / -27.2 / -6.6 | — | (206, 391) | — | — | — | not measurable |
| P15 | lower end of solid zone | 435.0 / -49.7 / -6.7 | — | (1, 447) | — | — | — | not measurable |
| P16 | opening outer-most point | 13.0 / -11.3 / 32.5 | — | (1014, 360) | — | — | — | not measurable |
| P17 | opening upper edge 50% | 187.4 / -9.9 / -5.0 | (640, 358) | (640, 357) | 1.6 | 0.59 | 0.80 | high |
| P18 | opening lower edge 50% | 187.5 / -40.5 / -9.0 | (638, 438) | (638, 437) | 0.5 | 0.20 | 0.17 | high |
| P19 | opening outer upper fillet | 13.0 / -11.3 / 32.5 | — | (1014, 360) | — | — | — | not measurable |
| P20 | opening outer lower fillet | 45.2 / -36.0 / 13.8 | — | (955, 425) | — | — | — | not measurable |

## oblique_01 — REF_04_OBLIQUE_FRONT = 925_alA_1 (spawplast)

| Landmark | name | CAD X / Y / Z | OEM px | CAD px (V4) | residual px | residual mm V4 | residual mm V3 | confidence |
|---|---|---|---|---|---:|---:|---:|---|
| P01 | inner tip (end of solid zone) | 477.1 / -8.5 / -1.1 | (2488, 962) | (2494, 992) | 30.8 | 6.65 | 5.94 | medium (hand pick ±3 px) |
| P02 | top of solid zone | 362.5 / -3.5 / -3.4 | (1897, 1014) | (1896, 1015) | 0.8 | 0.19 | 0.51 | medium |
| P03 | opening start | 359.9 / -21.4 / -5.9 | (1905, 912) | (1906, 937) | 24.8 | 4.72 | 4.50 | medium (hand pick ±3 px) |
| P04 | opening upper inner fillet | 359.1 / -18.5 / -5.6 | — | (1898, 950) | — | — | — | not measurable |
| P05 | outer upper edge 25% | 356.5 / -3.4 / -3.5 | (1866, 1014) | (1865, 1015) | 1.2 | 0.29 | 0.65 | medium |
| P06 | outer upper edge 50% | 236.5 / -1.7 / -4.1 | — | (1246, 1018) | — | — | — | not measurable |
| P07 | outer upper edge 75% | 113.5 / 0.2 / 2.2 | — | (632, 1005) | — | — | — | not measurable |
| P08 | outer upper shoulder | -3.9 / -2.5 / 43.7 | — | (194, 903) | — | — | — | not measurable |
| P09 | outer-most point | -6.5 / -6.8 / 44.2 | (143, 905) | (179, 884) | 41.6 | 10.54 | 20.98 | medium (hand pick ±3 px) |
| P10 | outer lower shoulder | 43.6 / -44.2 / 13.3 | (267, 782) | (262, 774) | 9.6 | 1.74 | 1.34 | high |
| P11 | outer lower edge 75% | 115.0 / -50.1 / -5.7 | (573, 772) | (575, 780) | 8.0 | 1.52 | 1.14 | medium |
| P12 | outer lower edge 50% | 235.0 / -52.9 / -9.8 | (1238, 794) | (1237, 778) | 16.6 | 3.15 | 2.95 | high |
| P13 | outer lower edge 25% | 354.9 / -55.5 / -8.9 | (1917, 785) | (1921, 768) | 17.4 | 3.18 | 3.36 | medium |
| P14 | opening lower inner fillet | 358.6 / -27.2 / -6.6 | — | (1907, 910) | — | — | — | not measurable |
| P15 | lower end of solid zone | 435.0 / -49.7 / -6.7 | (2365, 796) | (2362, 799) | 4.2 | 0.66 | 0.69 | high |
| P16 | opening outer-most point | 13.0 / -11.3 / 32.5 | (220, 893) | (223, 887) | 6.3 | 2.65 | 1.22 | medium (hand pick ±3 px) |
| P17 | opening upper edge 50% | 187.4 / -9.9 / -5.0 | — | (990, 980) | — | — | — | not measurable |
| P18 | opening lower edge 50% | 187.5 / -40.5 / -9.0 | — | (975, 839) | — | — | — | not measurable |
| P19 | opening outer upper fillet | 13.0 / -11.3 / 32.5 | — | (223, 887) | — | — | — | not measurable |
| P20 | opening outer lower fillet | 45.2 / -36.0 / 13.8 | — | (283, 812) | — | — | — | not measurable |

## oblique_02 — REF_12_OBLIQUE_FRONT_2 = 925_krik_0 (KRIK)

| Landmark | name | CAD X / Y / Z | OEM px | CAD px (V4) | residual px | residual mm V4 | residual mm V3 | confidence |
|---|---|---|---|---|---:|---:|---:|---|
| P01 | inner tip (end of solid zone) | 477.1 / -8.5 / -1.1 | (151, 354) | (153, 351) | 3.6 | 2.41 | 0.98 | medium (hand pick ±3 px) |
| P02 | top of solid zone | 362.5 / -3.5 / -3.4 | (339, 339) | (339, 339) | 0.5 | 0.30 | 0.37 | high |
| P03 | opening start | 359.9 / -21.4 / -5.9 | (348, 380) | (340, 368) | 14.2 | 8.54 | 6.77 | medium (hand pick ±3 px) |
| P04 | opening upper inner fillet | 359.1 / -18.5 / -5.6 | — | (342, 363) | — | — | — | not measurable |
| P05 | outer upper edge 25% | 356.5 / -3.4 / -3.5 | (349, 338) | (349, 338) | 0.0 | 0.01 | 0.37 | high |
| P06 | outer upper edge 50% | 236.5 / -1.7 / -4.1 | (553, 333) | (553, 331) | 1.1 | 0.65 | 1.19 | high |
| P07 | outer upper edge 75% | 113.5 / 0.2 / 2.2 | (768, 324) | (768, 326) | 1.8 | 1.08 | 0.03 | high |
| P08 | outer upper shoulder | -3.9 / -2.5 / 43.7 | (945, 343) | (945, 341) | 1.5 | 1.07 | 1.41 | high |
| P09 | outer-most point | -6.5 / -6.8 / 44.2 | (950, 346) | (950, 348) | 2.2 | 1.49 | 2.42 | medium (hand pick ±3 px) |
| P10 | outer lower shoulder | 43.6 / -44.2 / 13.3 | (898, 405) | (898, 405) | 0.4 | 0.21 | 0.58 | high |
| P11 | outer lower edge 75% | 115.0 / -50.1 / -5.7 | — | (779, 414) | — | — | — | not measurable |
| P12 | outer lower edge 50% | 235.0 / -52.9 / -9.8 | — | (557, 421) | — | — | — | not measurable |
| P13 | outer lower edge 25% | 354.9 / -55.5 / -8.9 | (343, 427) | (343, 428) | 1.3 | 0.70 | 1.24 | high |
| P14 | opening lower inner fillet | 358.6 / -27.2 / -6.6 | — | (341, 378) | — | — | — | not measurable |
| P15 | lower end of solid zone | 435.0 / -49.7 / -6.7 | (209, 418) | (208, 419) | 0.9 | 0.50 | 1.33 | high |
| P16 | opening outer-most point | 13.0 / -11.3 / 32.5 | (921, 348) | (928, 352) | 8.0 | 6.74 | 7.91 | medium (hand pick ±3 px) |
| P17 | opening upper edge 50% | 187.4 / -9.9 / -5.0 | — | (640, 344) | — | — | — | not measurable |
| P18 | opening lower edge 50% | 187.5 / -40.5 / -9.0 | — | (644, 397) | — | — | — | not measurable |
| P19 | opening outer upper fillet | 13.0 / -11.3 / 32.5 | — | (928, 352) | — | — | — | not measurable |
| P20 | opening outer lower fillet | 45.2 / -36.0 / 13.8 | — | (893, 391) | — | — | — | not measurable |