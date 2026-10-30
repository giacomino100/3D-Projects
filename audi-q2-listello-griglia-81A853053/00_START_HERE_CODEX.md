# Audi Q2 – listello argento griglia laterale paraurti anteriore

Modello 3D parametrico (Three.js) del listello inferiore della griglia laterale del paraurti
anteriore Audi Q2 (GA) 2016–2020, ricostruito da tre foto del pezzo reale.
Codici ricambio probabili: 81A853053 (sinistro) / 81A853054 (destro), da confermare sul pezzo.

## Da leggere prima
1. `HANDOFF.md` — pipeline geometrica, coordinate in mm, riferimenti condivisi con l'utente
   (lettere A–I sul fronte, numeri 2–11 sul retro), decisioni confermate e aggiornamenti in ordine.
   Le sezioni "Aggiornamento" più in basso sostituiscono le note precedenti quando sono in conflitto.
2. `foto/clip-foto3-numerate.png` — retro del pezzo con le clip numerate (confermato dall'utente).

## Struttura
- `modello/cornice-fendinebbia.html` — il modello, una sola pagina senza build.
- `foto/` — foto originali del pezzo.
- `render/` — render e confronti prodotti durante il lavoro.

## Avvio
```bash
cd modello
python -m http.server 8765
```
Poi apri `http://localhost:8765/cornice-fendinebbia.html`.

## Comandi nella pagina
- Viste: Come in foto, Fronte, Retro, Profilo; Etichette, Wireframe, Graffi, Cromo lucido.
- **Avvolgimento cornice** (0° di default): piega tutto il pezzo con le clip verso G.
- **Avvolgimento cavità** (34° di default): solo l'anello posteriore attorno alla finestra.
- **Profondità B**: discesa della piastra da A–I a E (9 mm di default).

## Regole di lavoro concordate con l'utente
- Parlare delle parti usando lettere e numeri dei riferimenti.
- Non inventare forme: se qualcosa non è chiaro, chiedere.
- Dopo ogni modifica: avviare la pagina, fare uno screenshot e confrontarlo con la foto corrispondente,
  provando anche i valori estremi dei cursori (le clip non devono mai sparire, in E non ci devono
  essere fessure).

## Ancora aperto
- Lunghezza reale A→G (ora 360 mm ipotizzati: scala di tutto il modello).
- Valori veri dei due avvolgimenti e della profondità di B (da misurare sul pezzo).
