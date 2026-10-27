"""V18 - canale superiore continuo come quello inferiore.

Correzione utente del 2026-10-25: la cavita visibile presso il raccordo deve
proseguire lungo tutto il bordo superiore dell'apertura, formando lo stesso
rientro gia presente sul bordo inferiore. Contorni, rampa END A e profondita
posteriore dei labbri restano V17.
"""

from parameters_v17 import *  # noqa: F401,F403


VERSION = "V18"
STAGE = "canale superiore continuo con lo stesso profilo del canale inferiore"

# Nessuna nuova quota: profondita, fascia piana, larghezza del raccordo e
# intervallo longitudinale sono gli stessi valori ASSUMED del canale inferiore.
TOP_CHANNEL = BOTTOM_CHANNEL

