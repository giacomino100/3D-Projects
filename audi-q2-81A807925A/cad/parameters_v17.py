"""V17 - ritorni dell'apertura rifilati dalla rampa V16.

Correzione utente del 2026-10-25: eliminare il collarino sporgente sul D-end e
fare arretrare anche il labbro superiore come quello inferiore. La pelle e il
campo di profondita V16 restano invariati.
"""

from parameters_v16 import *  # noqa: F401,F403


VERSION = "V17"
STAGE = "ritorno corto e due labbri rifilati simmetricamente dalla rampa END A"

# Solo tolleranza di intersezione tra i solidi, non quota OEM.
RETURN_RAMP_TRIM_OVERLAP = 0.15

