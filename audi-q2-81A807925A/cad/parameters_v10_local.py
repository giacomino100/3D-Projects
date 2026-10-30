"""
V10 parameters - 81A807925A / TB2 (LEFT). Imports V8 (which holds V8 + V9 settings).
User feedback on V9: the END A ramp from the nose is right in character but must SINK MORE and be a bit STEEPER;
the upper and lower lips must follow (deeper). All depths are ASSUMED (no photo has a metric scale).
"""
from parameters_v8 import *          # noqa: F401,F403

VERSION = "V10"
STAGE = "deeper / steeper END A ramp, deeper upper and lower lips"

# END A plate: 3.5 -> 5.5 mm (ASSUMED)
D_RECESS = 5.5

# Ramp along s: same start (depth at the nose stays 0.55 * 3.5 = 1.9 mm, "parte bene"), but it reaches full depth
# sooner -> steeper. V9: (4, 90) mm. V10: (4, 60) mm.
RECESS_RAMP_S = (4.0, 60.0)
RECESS_RAMP_MIN = 0.55 * 3.5 / 5.5   # = 0.35 -> nose depth unchanged (1.9 mm)

# Upper lip / ledge along the top rail: 1.0 -> 1.8 mm (ASSUMED)
D_LEDGE = 1.8

# Lower lip / channel: depth 1.6 -> 2.6 mm (ASSUMED); lip width, roll width, s start, s end unchanged
_dch, _wl, _rwc, _c0, _c1 = BOTTOM_CHANNEL
BOTTOM_CHANNEL = (2.6, _wl, _rwc, _c0, _c1)

# Deeper plate -> a slightly longer roll toward the lips so the transition stays smooth (no jog, V9d rule)
RW_POCKET = 3.0       # V9: 2.5
RW_LIP_ENDA = 8.0     # V9: 7.0
