"""V15 — profondita posteriore continua dei labbri, non della faccia.

Correzione utente del 2026-10-25: la rientranza indicata in rosso e la
profondita reale del bordo posteriore. Il labbro esterno e i due labbri
dell'apertura devono raggiungere lo stesso piano arretrato.
"""

from parameters_v14 import *  # noqa: F401,F403


VERSION = "V15"
STAGE = "labbri posteriore, superiore e inferiore profondi e continui"

# V14 aveva interpretato erroneamente il feedback come maggiore profondita
# della faccia frontale. Si ripristina la distribuzione V13.
RECESS_RAMP_MIN = 0.55

# Nessuna nuova quota: tutti i labbri riusano la profondita posteriore gia
# parametrizzata per la parete dell'apertura. Il valore resta ASSUMED / a bassa
# identificabilita perche le fotografie non hanno scala metrica.
D_RET_OUTER = D_WALL_OPEN_TOP
D_WALL_OPEN_BOTTOM = D_WALL_OPEN_TOP

# Entrambi i labbri dell'apertura continuano fino alla sua fine geometrica.
# I 5 mm sono solo eccedenza booleana poi ritagliata dall'anello.
_OPENING_END_S = float(max(p[0] for p in OPENING_CPS)) + 5.0
WALL_TOP_END_S = _OPENING_END_S
WALL_BOTTOM_END_S = _OPENING_END_S
