"""V11 — rampa longitudinale continua di END A.

Correzione del feedback utente del 2026-10-24: la V10 era errata perché
allargava il raccordo trasversale. S1/alB_1 e S3/alA_3 mostrano invece che la
grande falda di END A scende in modo uniforme dal naso fino alla cavità.
"""

from parameters_v8 import *  # noqa: F401,F403


VERSION = "V11"
STAGE = "END A: rampa longitudinale lineare dal naso alla cavità"

# La larghezza trasversale torna alla baseline V9: la V10 è stata scartata.
RW_POCKET = 2.5

# Il termine della rampa coincide con l'inizio geometrico della cavità, senza
# introdurre una nuova quota metrica. Il profilo lineare evita la concentrazione
# di pendenza al centro prodotta da smoothstep. La profondità iniziale 55% e la
# profondità massima 3.5 mm restano ASSUMED e invariate rispetto alla V9.
RECESS_RAMP_S = (4.0, float(min(p[0] for p in OPENING_CPS)))
RECESS_RAMP_PROFILE = "linear"
