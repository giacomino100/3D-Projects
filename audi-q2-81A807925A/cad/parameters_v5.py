"""
CAD V5 (OEM geometry recovery) parameters - 81A807925A / TB2 (LEFT).
Imports V4 and overrides ONLY what the V5 hypothesis tests supported
(REFERENCE_PACK_V5/analysis/V4_vs_V5_change_log.md):

  H1-H4 (wide end, opening-as-offset, straight upper rail, clean lower rail): NOT supported at the
        measurable level (3 specimens) -> outer/opening planform unchanged (= V4).
  H5 (compound Z): NOT supported (extra Z degrees of freedom do not improve held-out views)
        -> Z station table unchanged (= V3-B/V4).
  H6 (planar face): SUPPORTED for the two rails: luminance across each rail shows a full specular
        highlight cycle (L* range 104-126) while the solid plate is flat-shaded (range 60), in all
        frontal specimens -> each rail gets its own convex section (RAIL_CROWN). Existence HIGH,
        magnitude LOW (not measurable from unscaled photos; 1.2 mm = circular section of a 9 mm
        band with +-30 deg normal rotation), keep adjustable.
"""
from parameters_v4 import *          # noqa: F401,F403

VERSION = "V5"
STAGE = "V5 OEM geometry recovery (H6 rail crown + Z amplitude 55 mm)"
RAIL_CROWN = 1.2             # mm sagitta per rail - ASSUMED magnitude, PHOTO_SUPPORTED existence
RAIL_CROWN_FADE = 15.0       # mm fade at both ends of the opening
SECTION_PTS = 33             # points per loft section (needed to carry the rail crown)

# --- Z amplitude (V5) ------------------------------------------------------------------
# Wrap-amplitude scan with the V4 planform, camera refit per candidate, 4 views of 4 different
# specimens (analysis/H5_wrap_amplitude_scan.json): every view has its minimum at A >= 55 mm
# (alA_1 55, mp_2 55, krik_0 65, alB_2 65); A = 40 (V3/V4) is worse in all four.
# 21 stations S00..S20 (denser at the wide-end transition, opening start and narrow-end turn).
# Combined normalized cost minimum at A = 55 mm (u0 = 0.60, same law as V3-B). Range 50-65 -> Z_SIGMA.
# Compound curvature (extra bumps) was NOT supported (leave-one-out, H5_leave_one_out.json).
Z_STATIONS = [(-5.0, 0.17, 6.0), (0.0, 0.0, 6.0), (15.0, -0.49, 6.0), (35.0, -1.1, 6.0), (60.0, -1.78, 6.0), (90.0, -2.47, 6.0), (115.0, -2.95, 6.0), (135.0, -3.27, 6.0), (170.0, -3.69, 6.0), (215.0, -3.97, 6.0), (260.0, -3.96, 6.0), (300.0, -3.58, 6.36), (330.0, -1.68, 6.99), (355.0, 1.92, 7.52), (378.0, 7.27, 8.01), (395.0, 12.66, 8.37), (415.0, 20.7, 8.79), (435.0, 30.73, 9.22), (452.0, 40.92, 9.58), (465.0, 49.81, 9.85), (478.5, 60.08, 10.0)]
Z_SIGMA = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.7, 1.3, 2.0, 3.1, 4.3, 5.7, 6.8, 8.2]
