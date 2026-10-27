"""
Audi Q2 (GA, pre-facelift) - 81A807925A / TB2  "Zierrahmen Gitter BASIS Li"
Parametric definition for CAD V1 (visual/shape prototype).

EVERY numeric value carries an evidence tag:
  CERTAIN_OEM_OR_CATALOG  - from catalogue / molded-in marking
  MULTI_SOURCE_CONFIRMED  - consistent across >= 2 independent photo sources
  PHOTO_DERIVED           - measured on a calibrated photo (single main source)
  ASSUMED_PARAMETRIC      - engineering assumption for prototyping, NOT OEM
  UNVERIFIED              - placeholder, no evidence

See docs/dimensional_evidence.md and docs/assumptions.md for the full table.

CAD coordinate system (installed position, FRONT view = looking at the car):
  X : horizontal, 0 at the INNER tip of the trim (toward licence plate),
      +X toward the OUTER end (toward the left front wheel arch).
  Y : vertical, 0 at the top edge of the trim, +Y up (trim lies at Y in [-H, 0]).
  Z : depth, 0 at the front face of the trim at the inner tip, +Z toward the
      vehicle interior (rearward).
The complete group 81A807671 4W3 calibration box is 548 x 240 x 80 mm (X, Y, Z).
"""

from dataclasses import dataclass, field
from typing import List, Tuple

# ---------------------------------------------------------------------------
# 0. Identity (CERTAIN)
# ---------------------------------------------------------------------------
PART_NUMBER = "81A807925A"          # CERTAIN_OEM_OR_CATALOG (molded: "81A 807 925 A")
FINISH = "TB2 / Selenite Silver"    # CERTAIN_OEM_OR_CATALOG (catalogue)
MOLDED_NAME = "Zierrahmen Gitter BASIS Li"  # CERTAIN (molded text, 5 photos)
MATERIAL = "PC+ABS"                 # CERTAIN (molded >PC+ABS<, 4 independent samples)
SUPPLIER_MARK = "SMP / PNE, AU276"  # CERTAIN (molded)
RECEIVER = "81A807681A 4W3, Gitter Seite links, >ASA anthrazit<"  # CERTAIN (molded on 681A)
VERSION = "V1"                      # visual / shape prototype

# ---------------------------------------------------------------------------
# 1. Calibration (group envelope)
# ---------------------------------------------------------------------------
GROUP_X = 548.0   # CERTAIN_OEM_OR_CATALOG (81A807671 4W3, group only)
GROUP_Y = 240.0   # CERTAIN_OEM_OR_CATALOG (group only)
GROUP_Z = 80.0    # CERTAIN_OEM_OR_CATALOG (group only)
# Calibration check: group H/W measured on 681_psh_3 = 405/910 = 0.445 vs
# catalogue 240/548 = 0.438 (1.6 % deviation) -> photo usable as scale.
MM_PER_PX_PSH3 = GROUP_X / 910.0    # PHOTO_DERIVED (0.602 mm/px)

# ---------------------------------------------------------------------------
# 2. Front-view planform (installed front view)
# ---------------------------------------------------------------------------
L = 472.0          # PHOTO_DERIVED  frame X extent (projected), 2 photos: 476 (psh_3), 470 (corner_4); +-15
H = 58.0           # PHOTO_DERIVED  frame Y height, 2 photos: 57 (psh_3), 60 (w63_1 ratio); +-6
INNER_RUN = 40.0   # PHOTO_DERIVED  X run of the inner slanted end (tip at top-left)          +-12
OUTER_RUN = 46.0   # PHOTO_DERIVED  X run of the outer slanted end (top-right -> bottom-left)  +-10
R_TIP = 5.0        # ASSUMED_PARAMETRIC  inner tip radius
R_INNER_BOT = 14.0 # ASSUMED_PARAMETRIC  inner bottom corner radius
R_OUTER_TOP = 7.0  # PHOTO_DERIVED  (w63_3: ~15 px @ 0.47 mm/px)
R_OUTER_BOT = 26.0 # PHOTO_DERIVED  (w63_3: ~55 px)                                         low
TOP_EDGE_BOW = 0.0 # ASSUMED_PARAMETRIC  sag of top edge in front view (photos: straight)

# Visible bands
W_TOP = 8.5        # PHOTO_DERIVED  top bar visible width   (w63_3: 18 px / 123 px * H)
W_BOT = 16.5       # PHOTO_DERIVED  bottom band visible width (w63_3: 35 px / 123 px * H)
W_OUTER = 8.0      # PHOTO_DERIVED  outer end band width (measured horizontally)
OPEN_X0 = 110.0    # PHOTO_DERIVED  X where the through-opening starts (pru_1: 232/995*L; psh_1 agrees) +-10
R_OPEN_IN = 10.0   # PHOTO_DERIVED  opening inner-end corner radius (approx.)
R_OPEN_OUT_TOP = 5.0   # ASSUMED_PARAMETRIC
R_OPEN_OUT_BOT = 15.0  # ASSUMED_PARAMETRIC

# ---------------------------------------------------------------------------
# 3. 3D shape (Z curvature, pitch, twist)  -- mostly ASSUMED / low-confidence
# ---------------------------------------------------------------------------
Z_SAG_MAIN = 4.0      # ASSUMED_PARAMETRIC  gentle convex bow over the straight part (front view sag in Z)
X_WRAP_START = 0.60   # PHOTO_DERIVED (qualitative) fraction of L where rearward wrap starts (corner_3, corner_7, mp_2)
Z_WRAP_OUTER = 28.0   # PHOTO_DERIVED low: rearward displacement of outer end (corner_3/mp_2, bounded by group Z=80)
WRAP_EXP = 2.2        # ASSUMED_PARAMETRIC  wrap curve exponent (smooth onset)
PITCH_DEG = 6.0       # ASSUMED_PARAMETRIC  top edge rearward relative to bottom edge (face tilts forward-down)
TWIST_OUTER_DEG = 4.0 # ASSUMED_PARAMETRIC  extra pitch added linearly over the wrap zone

# ---------------------------------------------------------------------------
# 4. Shell / returns  (ASSUMED - no section photo with scale)
# ---------------------------------------------------------------------------
T_SHELL = 2.5         # ASSUMED_PARAMETRIC (V0.1 prototype value)
T_WALL = 2.0          # ASSUMED_PARAMETRIC rear return wall thickness
D_RET_OUTER = 6.0     # ASSUMED_PARAMETRIC outer-perimeter rear return depth (behind the shell)
D_RET_OPEN = 4.0      # ASSUMED_PARAMETRIC opening-perimeter rear return depth
D_RET_TOP = 10.0      # ASSUMED_PARAMETRIC deeper top return (top bar appears deep in oblique pru_1)
EDGE_FILLET = 1.0     # ASSUMED_PARAMETRIC front perimeter edge radius
N_STATIONS = 11       # loft sections along X

# ---------------------------------------------------------------------------
# 5. Clips / tabs  (positions PHOTO_DERIVED, dimensions ASSUMED)
# ---------------------------------------------------------------------------
@dataclass
class Clip:
    cid: str
    family: str            # "EYELET" | "HOOK_TAB" | "TONGUE"
    x: float               # mm along X (front view)
    edge: str              # "top" | "bottom" | "outer_end"
    y: float = None        # only for outer_end clips: height on the slanted end
    insertion: Tuple[float, float, float] = (0.0, 0.0, 1.0)  # direction of assembly (+Z = into grille)
    base_width: float = 0.0
    base_thickness: float = 1.8
    flex_length: float = 0.0
    hook_length: float = 0.0
    hook_height: float = 0.0
    angle_deg: float = 0.0  # tilt from +Z toward outward edge normal (in Y for top/bottom)
    root_fillet: float = 0.8
    clearance: float = 0.30
    window: Tuple[float, float] = (0.0, 0.0)  # eyelet window (along edge, along tab)
    evidence_pos: str = "PHOTO_DERIVED"
    evidence_dim: str = "ASSUMED_PARAMETRIC"
    confidence: str = "medium"
    note: str = ""

# Positions: average of pru_1 (front, rotated 180 deg to installed) and
# pru_4 (rear, rotated 180 deg) -> see docs/clip_map.md
CLIPS: List[Clip] = [
    Clip("C01", "HOOK_TAB", 44.0,  "top", base_width=10.0, flex_length=9.0, hook_length=2.5, hook_height=1.5,
         angle_deg=0.0, note="near plate, small flat tab with barb (pru_4, pru_5)"),
    Clip("C02", "HOOK_TAB", 144.0, "top", base_width=10.0, flex_length=9.0, hook_length=2.5, hook_height=1.5,
         angle_deg=0.0, note="pru_4, pru_5"),
    Clip("C03", "HOOK_TAB", 282.0, "top", base_width=10.0, flex_length=9.0, hook_length=2.5, hook_height=1.5,
         angle_deg=0.0, confidence="low", note="pru_4 only (small)"),
    Clip("C04", "TONGUE",   438.0, "outer_end", y=-14.0, base_width=12.0, flex_length=15.0, window=(6.0, 4.0),
         angle_deg=20.0, confidence="low", note="x is recomputed on the outer slanted end at y; long tongue at outer end (pru_4, pru_1 inside loop)"),
    Clip("C05", "EYELET",   308.0, "bottom", base_width=20.0, flex_length=14.0, window=(10.0, 5.0),
         angle_deg=35.0, confidence="medium", note="pru_1 x=665/995, pru_4 x=660"),
    Clip("C06", "EYELET",   199.0, "bottom", base_width=20.0, flex_length=14.0, window=(10.0, 5.0),
         angle_deg=35.0, confidence="medium", note="pru_1 x=420, pru_4 x=450"),
    Clip("C07", "EYELET",    88.0, "bottom", base_width=20.0, flex_length=14.0, window=(10.0, 5.0),
         angle_deg=35.0, confidence="medium", note="pru_1 x=170, pru_4 x=240; close-ups fre_5, mp_3, ccm_3"),
]

# Coupon tolerance variants (FDM)  ASSUMED_PARAMETRIC
COUPON_CLEARANCES = (0.20, 0.30, 0.45)
