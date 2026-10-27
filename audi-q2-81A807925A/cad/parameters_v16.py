"""V16 - pelle END A a spessore costante fino al piano da 12 mm.

Conferma utente del 2026-10-25: non va aggiunto materiale soltanto sul retro.
Fronte e retro della pelle devono seguire la stessa rampa: profondita invariata
al punto 1 e arrivo al piano posteriore dei labbri al punto 2.
"""

from parameters_v15 import *  # noqa: F401,F403


VERSION = "V16"
STAGE = "pelle END A a spessore costante: fronte e retro progressivi fino a 12 mm"

# Il valore iniziale resta IDENTICO alla V15. D_RECESS e RECESS_RAMP_MIN
# compaiono come prodotto all'inizio della rampa, quindi si conserva quel
# prodotto mentre il termine della rampa raggiunge il piano da 12 mm.
_V15_START_DEPTH = D_RECESS * RECESS_RAMP_MIN
D_RECESS = D_WALL_OPEN_TOP
RECESS_RAMP_MIN = _V15_START_DEPTH / D_RECESS

# La pelle standard viene estrusa di T_SKIN dalla nuova faccia: non esiste un
# riempimento posteriore e lo spessore rimane costante in Z come nelle V8-V15.
ENDA_CONSTANT_THICKNESS_RAMP = True
ENDA_RAMP_TARGET = "existing rear lip plane"
