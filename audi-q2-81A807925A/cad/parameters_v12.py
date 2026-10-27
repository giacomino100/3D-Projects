"""V12 — linguetta interna superiore continua fino al raccordo END A.

Feedback utente del 2026-10-24 sui crop dell'overlay front_A: la linea interna
non è il contorno dell'apertura, ma una linguetta che rientra nel pezzo e
continua lungo il bordo superiore fino al raccordo dell'altro lato.
"""

from parameters_v11 import *  # noqa: F401,F403


VERSION = "V12"
STAGE = "ritorno superiore interno continuo tra i due raccordi"

# PHOTO_CONFIRMED: la linguetta raggiunge il D-end arrotondato dell'apertura.
# Il margine negativo è solo un'eccedenza booleana, poi ritagliata dall'anello
# dell'apertura: evita una coincidenza tangente e non aggiunge 5 mm al pezzo.
# Nessuna nuova profondità viene inventata: spessore e profondità del ritorno
# restano i valori ASSUMED ereditati (T_WALL_OPEN e D_WALL_OPEN_TOP).
WALL_TOP_START_OFFSET = -5.0
