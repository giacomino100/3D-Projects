# Curvature analysis — 81A807925A V1

## 1. Orientation (how photos map to the car)

* Installed front view (photos psh_1, w63_1, w63_3, corner_1–7, three independent
  assemblies): the **solid plate is at the inner end (viewer's left)** and comes to a
  rounded **tip at the top-left**; the outer end (viewer's right, toward the wheel arch)
  is an open loop with a slanted end running top-right → bottom-left.
* Isolated photos pru_1, pru_4, pru_5, ccm_3, fre_5 show the tip at the bottom → they are
  rotated 180°. Consequence: the molded text on the B-side is upside-down when installed
  (assumption A-13).
* **Handedness**: with Y up and Z rearward, a right-handed CAD frame has X pointing to the
  vehicle's right, i.e. toward the inner tip of this left-hand part. The geometry is
  authored in the photo frame `s` (distance from inner tip, to the viewer's right) and
  mirrored once at the end: **X_cad = L − s**. Without this step the model would be the
  right-hand part. Check: in `renders/front.png` the plate is on the left, as on the car.

## 2. Surface law

Visible face (authoring frame, mm):

```
zf(s, y) = −Z_SAG·4u(1−u)  +  Z_WRAP·max(0,(u−u0)/(1−u0))^p  +  (y + H/2)·tan(pitch(s))  − zf(0,0)
u = s/L,  u0 = X_WRAP_START = 0.60,  p = 2.2,  Z_SAG = 4,  Z_WRAP = 28
pitch(s) = 6° + 4°·clamp((u−u0)/(1−u0), 0, 1)
```

Compound curvature: bow along X, wrap toward the outer end, section rotation (pitch)
and local twist (pitch increases over the wrap zone). Body Z extent: 47.6 mm (< group 80 mm).

## 3. Stations S0…S10 (longitudinal, 11 sections used for the loft)

Vectors are in the **CAD frame** (X vehicle right, Y up, Z rearward). Normal points out
of the visible face (toward the front of the car). Y top/bot is the slab band; the
actual silhouette is cut by the front-view planform.

| Station | s [mm] | X_cad [mm] | Y top/bot | Z top | Z mid | Z bot | pitch [°] | tangent (CAD) | normal (CAD, outward) | visible band | conf. |
|---|---:|---:|---|---:|---:|---:|---:|---|---|---|---|
| S0 | 0.0 | 472.0 | 0 / -58 | 0.0 | -3.0 | -6.1 | 6.0 | [-0.999, 0, -0.034] | [0.034, 0.105, -0.994] | inner tip / solid plate | Y med, Z low |
| S1 | 47.2 | 424.8 | 0 / -58 | -1.4 | -4.5 | -7.5 | 6.0 | [-1.0, 0, -0.027] | [0.027, 0.105, -0.994] | solid plate | Y med, Z low |
| S2 | 94.4 | 377.6 | 0 / -58 | -2.6 | -5.6 | -8.7 | 6.0 | [-1.0, 0, -0.020] | [0.020, 0.105, -0.994] | solid plate | Y med, Z low |
| S3 | 141.6 | 330.4 | 0 / -58 | -3.4 | -6.4 | -9.5 | 6.0 | [-1.0, 0, -0.014] | [0.013, 0.105, -0.994] | top 8.5 / bottom 16.5 | Y med, Z low |
| S4 | 188.8 | 283.2 | 0 / -58 | -3.8 | -6.9 | -9.9 | 6.0 | [-1.0, 0, -0.007] | [0.007, 0.105, -0.995] | top 8.5 / bottom 16.5 | Y med, Z low |
| S5 | 236.0 | 236.0 | 0 / -58 | -4.0 | -7.0 | -10.1 | 6.0 | [-1.0, 0, 0] | [0, 0.105, -0.995] | top 8.5 / bottom 16.5 | Y med, Z low |
| S6 | 283.2 | 188.8 | 0 / -58 | -3.8 | -6.9 | -9.9 | 6.0 | [-1.0, 0, 0.007] | [-0.007, 0.105, -0.995] | top 8.5 / bottom 16.5 (wrap onset) | Y med, Z low |
| S7 | 330.4 | 141.6 | 0 / -58 | -1.5 | -5.1 | -8.6 | 7.0 | [-0.997, 0, 0.075] | [-0.075, 0.122, -0.990] | top 8.5 / bottom 16.5 | Y med, Z low |
| S8 | 377.6 | 94.4 | 0 / -58 | 4.6 | 0.5 | -3.6 | 8.0 | [-0.987, 0, 0.160] | [-0.159, 0.137, -0.978] | top 8.5 / bottom 16.5 | Y med, Z low |
| S9 | 424.8 | 47.2 | 0 / -58 | 15.0 | 10.4 | 5.8 | 9.0 | [-0.968, 0, 0.250] | [-0.247, 0.152, -0.957] | outer slanted end begins | Y med, Z low |
| S10 | 472.0 | 0.0 | 0 / -58 | 30.1 | 25.0 | 19.8 | 10.0 | [-0.941, 0, 0.339] | [-0.334, 0.164, -0.928] | outer extreme (top corner) | Y med, Z low |

Rear-return depth at every station: 6 mm (outer perimeter), 10 mm (top edge), 4 mm
(opening) — all ASSUMED.

## 4. Perimeter stations (CLAUDE.md naming, re-mapped to this part)

CLAUDE.md's S0…S7 assumed a ring around the whole grille. On the real part the ring is
the 925A's own perimeter:

| Name | Meaning on 81A807925A | s [mm] | y [mm] | Evidence |
|---|---|---:|---:|---|
| P-S0 inner upper end | inner tip (top-left) | ≈ 0 | 0 | psh_1, corner_4 |
| P-S1 upper-inner | top edge above plate | 55 | 0 | |
| P-S2 upper-middle | top edge, mid | 236 | 0 | |
| P-S3 outer-upper bend | outer top corner, R 7 | ≈ 470 | ≈ −3 | w63_3 |
| P-S4 outer side | slanted outer end | ≈ 450 | −29 | w63_3, pru_1 |
| P-S5 outer-lower bend | outer bottom corner, R 26 | ≈ 420 | −55 | w63_3 |
| P-S6 lower-middle | bottom edge, mid | 236 | −58 | |
| P-S7 inner-lower end | inner bottom corner, R 14 | ≈ 45 | −55 | psh_1 |

## 5. Uncertainty

* Front-view (X/Y) geometry: medium — validated by overlay on two independent photos.
* Z wrap amount and onset: **low** — derived from oblique photos only; no calibrated
  side/top view exists online. Kept fully parametric.
* Pitch / twist: **assumed**, not measured.
