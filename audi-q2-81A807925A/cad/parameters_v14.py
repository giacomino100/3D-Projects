"""V14 — falda END A a profondita piena e linguetta inferiore completa.

Feedback utente del 2026-10-24 sulla vista Blender annotata: la zona piena
deve restare profonda fin dalla partenza del naso fino al raccordo indicato;
da quel raccordo la linguetta inferiore continua lungo tutta l'apertura.
"""

from parameters_v13 import *  # noqa: F401,F403


VERSION = "V14"
STAGE = "END A profondo dalla partenza; linguetta inferiore su tutta l'apertura"

# Non introduce una nuova profondita: elimina soltanto l'attenuazione al 55%
# della V13. La partenza usa quindi lo stesso D_RECESS=3.5 mm, ancora ASSUMED,
# gia raggiunto in prossimita della cavita.
RECESS_RAMP_MIN = 1.0

# La linguetta inferiore non termina piu a s=389 mm: prosegue fino alla fine
# geometrica dell'apertura. I 5 mm sono una sola eccedenza booleana, ritagliata
# dall'anello dell'apertura, e non una quota OEM.
WALL_BOTTOM_END_S = float(max(p[0] for p in OPENING_CPS)) + 5.0
