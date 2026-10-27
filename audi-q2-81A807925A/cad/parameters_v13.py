"""V13 — linguetta interna anche sul bordo inferiore dell'apertura.

Feedback utente del 2026-10-24: sotto l'apertura è presente la stessa rientranza
interna modellata sopra; al D-end essa è collegata alla profondità della falda
che parte dal naso di END A.
"""

from parameters_v12 import *  # noqa: F401,F403


VERSION = "V13"
STAGE = "linguette interne superiore e inferiore collegate a END A"

# Stessa profondità della linguetta superiore: nessuna nuova quota ricavata
# dalle foto. Il valore ereditato resta ASSUMED.
D_WALL_OPEN_BOTTOM = D_WALL_OPEN_TOP
WALL_BOTTOM_END_S = WALL_TOP_END_S

# Eccedenza booleana e sovrapposizione tecnica, non dimensioni del pezzo.
WALL_BOTTOM_START_OFFSET = -5.0
WALL_BOTTOM_MID_OVERLAP = 0.5
