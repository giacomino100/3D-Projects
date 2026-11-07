# QA report — mini presepe cometa (bozza v2)

Data: 2026-10-26. Strumenti: Blender 5.2.3 (script `src/genera_presepe.py`). **Nessuno slicer installato: stampabilità, supporti, grammi e tempi = NON VERIFICATO.**

## Dimensioni (misurate sugli STL, mm)
| Pezzo | X | Y | Z | Bordi non-manifold | Volume mm³ |
|---|---|---|---|---|---|
| BASE (standard e varianti testo) | 120,0 | 57,5 | 9,0 | 0 | ~49.400 |
| CAPANNA (perni inclusi) | 119,95 | 16,0 | 72,45 | 0 | 20.525 |
| STELLA_COMETA | 77,4 | 3,0 | 31,3 | 0 | 1.842 |
| MARIA (perno incluso) | 28,5 | 21,9 | 45,3 | 0 | 10.275 |
| GIUSEPPE (perno incluso) | 23,2 | 18,1 | 55,9 | 0 | 9.368 |
| MANGIATOIA_GESU (perni inclusi) | 19,6 | 11,0 | 20,4 | 0 | 1.681 |
| **Assieme** | **120,0** | **57,5** | **94,0** | | |

Limiti del brief (120 / 60 / 95): rispettati. Unità STL verificate in mm leggendo i file.

## Verifiche eseguite
- Mesh chiuse (0 bordi non-manifold) su tutti i pezzi, base con testo inclusa; normali ricalcolate.
- Ingombro assieme calcolato dalle bounding box in posizione di montaggio.
- Render di controllo (`render/`): frontale, tre quarti, laterale, esploso, dettaglio cometa. Verificato visivamente che la scia sia a destra.

## Non verificato / criticità note
1. **Slicer**: nessuna prova di orientamento, supporti, tempi, grammi. Non dichiarare "stampabile senza supporti".
2. **Figure e perni (critico)**: Maria, Giuseppe e mangiatoia hanno il perno sotto il piano d'appoggio, quindi in stampa poggerebbero solo sul perno. Da risolvere: perno spostato sulla base (sedi nelle figure) oppure stampa con perno rifilato/brim. Da decidere.
3. **Capanna**: stampa consigliata sdraiata sul retro (120×72 mm, spessore 16); i perni restano laterali e possono richiedere supporti. Pilastri 6 mm, tetto 6 mm (>= 3 mm ok).
4. **Scia cometa**: nastri spessi 3 mm, larghi 1,8–5,5 mm, sbalzo ~60 mm; punte a 1,8 mm sotto il target decorativo di 2 mm e fragili. Il pezzo è piatto, quindi stampabile in piano, ma va provato. La scia non è appoggiata al tetto.
5. **Incastri**: gioco 0,25 mm/lato non testato fisicamente; perni senza invito/smusso. Perno stella 3×3 mm nel colmo: tenuta da verificare, probabile goccia di colla.
6. **Base**: asole (sedi) presenti. Testo inciso 0,7 mm, altezza 4,5 mm, sulla fascia piana frontale (corda di ~48 mm); la scritta si riduce da sola se troppo lunga. Leggibilità in stampa da verificare.
7. **Figure**: stile stilizzato, volto liscio senza tratti; fedeltà al riferimento solo parziale (niente pieghe del manto, Maria e Giuseppe più simili a pedine).
8. Intersezioni tra pezzi: controllo automatico non eseguito; visivamente nessuna interferenza (figure dentro la capanna senza contatto).
