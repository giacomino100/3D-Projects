"""V10 — raccordo lineare e continuo della rientranza di END A.

Feedback utente (2026-10-24): nella vista Blender la rientranza che parte
dal lato sinistro e arriva alla cavità appare come uno scalino. Sugli
esemplari esatti S1/alB_1 e S3/alA_3 (conferma S4/fre) la linea resta diritta,
ma la discesa verso la piastra è un raccordo continuo.
"""

# PROVA SCARTATA DALL'UTENTE: modifica trasversale errata. Non usare come base.
from parameters_v8 import *  # noqa: F401,F403


VERSION = "V10"
STAGE = "END A: raccordo continuo lungo la linea lato-cavità"

# La posizione della linea non cambia: resta l'estensione retta del bordo
# superiore/inferiore dell'apertura. Cambia soltanto la larghezza del raccordo
# trasversale, prima troppo stretta (2.5 mm) e quindi letta come uno scalino.
# Non esiste una scala metrica nelle foto: il rapporto RW_POCKET = W_BEAD è
# ASSUMED, mentre continuità e assenza del gradino sono PHOTO_CONFIRMED.
RW_POCKET = W_BEAD
