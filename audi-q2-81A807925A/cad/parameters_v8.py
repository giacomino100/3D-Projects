"""
V8 parameters - 81A807925A / TB2 (LEFT). Imports V7 (same planform, same bead / ledge / pocket regions).
User feedback on V7: where V7 had vertical steps, the real part has a CURVED INWARD SWEEP (raccordo curvo verso
l'interno), photos alB_1 (END A crop), alA_3, fre_2. V8 builds the recess as a smooth depth field inside the
visible face surface (geometry/surface.py: recess_depth, _face_surface): no steps, no fillets needed.
"""
from parameters_v7 import *          # noqa: F401,F403

VERSION = "V8"
STAGE = "smooth recess (curved inward transitions bead -> ledge -> END A pocket)"
RECESS_SMOOTH = True
POCKET_RIM = 2.5      # PHOTO_DERIVED alB_1: END A crease d 9.4-10 (top) -> pocket band >= W_BEAD + 2.5 from the edge
RW_POCKET = 4.5       # PHOTO_DERIVED low: ledge -> END A pocket sweep width, mm (alB_1 crease d 7 -> 13.5 at END A)
POCKET_S_MAX = 160.0  # pocket band continues into the opening (fades there, inside the opening)
RECESS_RES = 0.2      # mm, raster of the depth field
FACE_GRID = (1.0, 0.5)   # mm, (s, y) grid of the face B-spline approximation
FACE_TOL = 0.01       # mm, approximation tolerance
RECESS_BLUR = (1.5, 0.5)  # mm (s, y) gaussian on the depth field: removes the creases of the distance fields
                          # (D-end of the opening at END A) and the raster jitter near the opening edge
FACE_TILES = 1            # one single B-spline face (the Fusion route does not need the OCC split)
RW_LEDGE = 2.0            # mm, constant-width sweep bead -> ledge along the rails (straight, parallel to the edge)
RECESS_RAMP_S = (4.0, 118.0)   # mm (s): END A recess depth 0 at the nose -> full at the opening start (user feedback)
EDGE_SMOOTH = 8.0         # mm (along the edge): bead line / crown tables smoothed -> straight cavity lines
FACE_GRID = (1.5, 0.2)    # mm (s, y): 0.5 mm in y aliased the 2 mm sweep against the slightly slanted rails
                          # (a ripple every ~40 mm along the rails)
BOTTOM_FLAT = 1.5            # mm: bottom rail flat band along the opening edge (as the top ledge), then RW_LEDGE sweep
BOTTOM_FLAT_S = (115.0, 392.0)   # s range (from the D-end at END A to just after the END B step)
BOTTOM_FLAT_Y = -25.0        # bottom half of the part (below the opening centre line)
BOTTOM_FLAT_FADE = (40.0, 8.0)   # mm: band blends in from the END A D-end / runs out along the END B step
CROWN_IN_TABLE = True     # rail crown from exact distances to the (smoothed) outer edge, inside the depth table

# --- V9 (user): the feature near END B on the bottom is a RIENTRANZA like the top one - NOT a notch in the opening
# outline. The opening bottom edge stays straight into the loop; the bottom cavity (ledge) ends at the same place and
# in the same way as the top one (ledge region clipped at FLOOR_S_MAX, curved sweep up to the bead over RW_LEDGE).
import numpy as _np
_cps = _np.asarray(OPENING_CPS, float)
_bot = (_cps[:, 1] < _cps[:, 1].mean())
_fit = _bot & (_cps[:, 0] > 300) & (_cps[:, 0] < 370)
_k, _q = _np.polyfit(_cps[_fit, 0], _cps[_fit, 1], 1)
_line = _k * _cps[:, 0] + _q
_r = 0.3                                          # mm: soft join where the loop curve rises above the straight edge
_new = _line + _r * _np.log1p(_np.exp((_cps[:, 1] - _line) / _r))
_w = _bot * _np.clip((_cps[:, 0] - 345.0) / 20.0, 0, 1) * (_cps[:, 0] < 445)
_w = _w * _w * (3 - 2 * _w)
OPENING_CPS = [tuple(p) for p in _np.c_[_cps[:, 0], (1 - _w) * _cps[:, 1] + _w * _new]]
BOTTOM_STEP_REMOVED = (round(float(_k), 5), round(float(_q), 3))
BOTTOM_FLAT_S = (115.0, 375.0)     # bottom flat band blends into the bead-based ledge before the cavity end
BOTTOM_FLAT_FADE = (40.0, 25.0)

# --- V9b (user: depth of the recess was the main difference; be faithful on the other points too) ---
D_RECESS = 3.5            # ASSUMED (no scale on any photo): END A plate deeper, rails stand proud as on alB_1 / alA_3
RW_POCKET = 2.5           # mm: single concave crease rails -> plate (sharper, one line as on the photos)
POCKET_RIM = -2.5         # rim along the slanted nose = W_BEAD + POCKET_RIM = 4.7 mm (narrow rolled rim, alA_3)
ENDA_SINGLE = (120.0, 160.0)   # END A uses the single crease up to s 120, blends into the rail ledges by s 160
RECESS_RAMP_S = (4.0, 90.0)
RECESS_RAMP_MIN = 0.55    # recess no longer vanishes at the nose (photos: crease visible up to the tip)
CROWN_S_START = 8.0        # photos: the rails are rounded all the way to the END A nose

# --- V9c (user, alB_1 shadow): bottom lip recessed inward along the whole part ---
POCKET_TO_LIP = True      # END A recess reaches down to the bottom lip (no bottom crease line)
RW_LIP_ENDA = 7.0         # mm: gentle roll from the END A plate down to the bottom lip
BOTTOM_CHANNEL = (1.6, 1.2, 3.0, -10.0, 475.0)   # depth (ASSUMED), lip width, roll width, s start, s end (mm)
# V9d: no jog where the END A plate enters the bottom channel - the pocket region no longer ends (vertical edge)
# on the bottom rail at s 160; the END A -> rails blend is longer and governs the transition alone
POCKET_S_MAX = 260.0
ENDA_SINGLE = (115.0, 200.0)
