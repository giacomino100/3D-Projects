# Modello 3D listello griglia paraurti – passaggio di consegne

## Il pezzo
Listello argento inferiore della griglia laterale del paraurti anteriore, **Audi Q2 (GA) 2016–2020**,
versioni non S-line. Identificato con ricerca visiva inversa (Bing Visual Search) sulla foto del
pezzo; il codice ricambio esatto **non** è confermato. Il pezzo fisico è in mano all'utente.

Foto di riferimento dell'utente, in `foto/`:
- `foto1.webp`: fronte, pezzo appoggiato su cemento, vista dall'alto
- `foto2.webp`: punta sinistra (zona piena) da vicino
- `foto3.webp`: retro, pezzo capovolto (in alto il bordo D, in basso C), vista obliqua
- `foto/clip-foto3-numerate.png`: foto 3 con le clip numerate, **confermata corretta dall'utente**

Render e confronti prodotti durante il lavoro, in `render/` (in ordine cronologico circa:
`confronto-*`, `rampa-34`, `labbro-d-i`, `avvolgimento-*`, `fasce-rientranza`, `livello-posteriore*`,
`due-avvolgimenti`, `clip-con-cornice`, `raccordo-E`). Le foto di annunci online usate per identificare
il pezzo non sono incluse (diritti di terzi): le fonti sono citate più sotto.

## File
`modello/cornice-fendinebbia.html`: pagina unica, nessuna build.
- Three.js 0.160.0 da cdn.jsdelivr.net con importmap (OrbitControls), Delaunator 5.0.1 (`+esm`).
- Avvio locale: `python -m http.server 8765` dentro `modello/`, poi `http://localhost:8765/cornice-fendinebbia.html`.
- È pubblicata anche come artifact privato su claude.ai (non accessibile a Codex).

## Sistema di coordinate
- mm, coordinate "piane" del pezzo: x da 0 (punta A) a 360 (punta G), y da 0 (bordo inferiore) a 40,6
  (bordo superiore), z positivo verso il fronte.
- La lunghezza 360 mm è **un'ipotesi**: tutte le quote sono in proporzione. Manca la misura reale A→G.
- `OUTER_MM` / `HOLE_MM`: contorno esterno e finestra, ricavati dalla foto 1 con segmentazione
  OpenCV GrabCut e rilievo dei bordi ingranditi.

## Pipeline geometrica (nell'ordine del codice)
1. `closedPts`: Catmull-Rom centripeta chiusa, ricampionata a passo costante, forzata antioraria.
2. `faceMesh`: punti del contorno (passo 0,5 mm) + griglia interna 0,6 mm, triangolazione Delaunay;
   i triangoli di Delaunator vanno invertiti (sono orari con y verso l'alto).
3. `faceHeight(x, y)`: quota del fronte in funzione della distanza dai bordi. Listelli a sezione tonda
   (`EDGE_R` 2,2), gola leggera sotto il listello superiore C, **nessun avvallamento sotto metà
   altezza** (bordo I→D continuo).
4. `deform` / `bendPoint`: ogni geometria salva le coordinate piane in `userData.flat` e il peso della
   rampa in `userData.w`; `bendPoint` applica la discesa di B (`rampDepth * w`) e l'avvolgimento
   (`bendAngle`, ora 0). I cursori ricalcolano da queste copie.
5. `rampWeight(x, y)`: 0 sul bordo A–I e sui listelli C/D, 1 in fondo alla rampa in E;
   transizione stretta (`RAIL_W` 3,4, `RAIL_SLOPE` 1,6) tra listello e fondo di B.
6. Retro: piastra posteriore con la stessa maglia del fronte, bordini di ritorno bassi
   (`WALL_OUT`/`WALL_IN` 2,5 mm), marcature stampate (texture su canvas).
7. Clip: `finGeo` (pinna con lato inclinato, lato verticale, finestra e bordino) e `standingFin`
   (la ruota perpendicolare al retro, rivolta all'indietro).

## Riferimenti condivisi con l'utente (array `TAGS`)
Lettere sul fronte, numeri sul retro. Usare sempre questi nomi per parlare con l'utente.
- A punta sinistra piena · B piastra in discesa da A–I a E · C listello superiore ·
  D listello inferiore · E inizio finestra (curva a D) · F finestra · G punta destra aperta ·
  H tratto diagonale destro · I bordo inferiore della punta
- 2, 3, 4 asole sul retro di C · 5, 6, 7 linguette sul bordo di D · 8 aletta vicino a G ·
  9 marcature stampate. (Il numero 1, la vecchia mensola, è stato eliminato: non rinumerare.)

## Decisioni confermate dall'utente
- Bordi e superfici **lineari da A a G** (nessuna ondulazione). In pianta il pezzo segue però il paraurti:
  **avvolgimento progressivo 34°** (proposto, non misurato sul pezzo). Ricavato così: listello montato
  visto su foto di Q2 base 2017-2020 (paraurti Polat & Polat, Q2 grigia su njuskalo.hr); posizione
  laterale ~470→790 mm dall'asse dalla vista frontale del disegno quotato getoutlines; profilo del
  paraurti visto dall'alto dallo stesso disegno; 34° è il valore con scarto minimo (≤ 5 mm).
  Legge: theta(s) = 34° · (0,4·t + 0,6·t²), t = s/L. Grafico: `render/avvolgimento-vs-paraurti.png`.
  (Nota: in seguito l'avvolgimento è stato diviso in due cursori, vedi "due avvolgimenti indipendenti".)
- Codici ricambio trovati online per questo listello: 81A853053 (sinistro) e 81A853054 (destro),
  "listello decorativo argento selenite" (suffisso finitura TB2). Da verificare col numero sul pezzo.
- **B** parte a filo sul bordo A–I e sprofonda all'indietro fino a E, alla profondità dei listelli;
  C e D restano fermi e fanno da sponde.
- Da **I a D** il bordo è continuo, senza solchi né interruzioni.
  Implementato come **labbro unico** (`lipHeight`/`lipMask` in `faceHeight`): stessa sezione tonda
  del listello D, larga 3,7 mm, che segue il contorno dalla finestra fino a I e poi si dissolve
  verso A.
- Sotto C **non** c'è nessuna mensola o estrusione nella finestra.
- Tutte le clip sono **perpendicolari al retro**, rivolte verso il paraurti; lato inclinato verso A.

## Ancora aperto o stimato
- Lunghezza reale A→G (scala di tutto il modello).
- Profondità della rampa B: 9 mm proposti (parete visibile in E nella foto 3, ~8–10 mm); cursore "Profondità B".
- Dimensioni delle clip (~18 × 7,5 mm) stimate dalla foto 3; la loro posizione lungo x pure.
- La gola sotto C non è stata né confermata né smentita dall'utente.
- Colore e riflessi del satinato sono più piatti del pezzo vero.

## Metodo di lavoro che ha funzionato
- Prima di cambiare una forma, chiedere conferma usando lettere e numeri; non inventare dettagli.
- Dopo ogni modifica, fare uno screenshot headless della pagina e confrontarlo con la foto
  corrispondente nella stessa inquadratura.

## Aggiornamento: bordi uniformi e clip agganciate
- `faceHeight` usa ora **un'unica sezione** (labbro tondo `lipHeight`) su tutto il bordo esterno:
  A→C→G e I→D senza gola, bombatura o cambi di profilo. Confermato dall'utente.
- Le clip 2–8 seguono avvolgimento e profondità di B: peso della rampa preso dalla piastra alla
  stessa x (`clipWeight`), con la base che resta sul bordino (raccordo nei primi 2 mm).
  Verificato a 0°/0 mm, 34°/9 mm e 60°/16 mm: nessuna clip sparisce.

## Aggiornamento: secondo livello di C e D (confermato dall'utente)
- Il retro di C e D ha due livelli: il bordino con le clip e una **fascia interna** (verso la finestra),
  più arretrata, che è la parete della rientranza data dall'avvolgimento (`bandGeo`).
- Fascia su C: x 100→335 mm (etichetta **10**); su D: x 250→342 mm (etichetta **11**). Larga 5 mm.
- Profondità extra fino a `BAND_MAX` = 6 mm, crescente verso G, scalata con l'angolo di avvolgimento
  (`bendGeo`, peso `userData.bw`): a 0° la fascia resta a filo del bordino.
- Da non confondere con la vecchia mensola "1" sotto C, che resta eliminata.

## Aggiornamento: avvolgimento separato dal labbro (indicazione dell'utente, sostituisce le note precedenti)
- Il **labbro esterno** A→G (lungo C) e I→H (lungo D) è continuo, dritto e piatto; le clip 2–8 stanno
  dietro a questo livello e **non** si muovono con l'avvolgimento. Il pezzo non viene più piegato
  (`bendPoint` applica solo la rampa di B; tabella di piegatura rimossa).
- L'**avvolgimento** agisce solo sulla fascia interna di rientranza (10 su C, 11 su D), indipendente
  dal labbro e dalle clip: profondità = `BAND_REACH` (14 mm) · sin(theta(x)), con
  theta(x) = angolo · (0,4·t + 0,6·t²). A 34° in G la fascia scende di ~7,8 mm; a 0° resta a filo.
- Verificato a 0°, 34° e 60°: contorno e clip identici, cambia solo la fascia.

## Aggiornamento: livello posteriore (profilo scelto dall'utente: "fronte dritto, retro curvo")
- Fronte, contorno e clip dritti da A a G. Dietro C (x 100→335) e D (x 250→342), separato dalle clip,
  un elemento solido (`bandGeo`): parete spessa 1,1 mm che scende dal retro del listello lungo il
  bordo finestra + piano largo 5 mm alla base.
- Profondità extra = `BAND_REACH` (25 mm) · sin(theta(x)); a 34° in G circa 14 mm, a 0° a filo.
  Etichette 10 e 11 seguono la profondità.

## Aggiornamento: livello posteriore su tutta la cavità (confermato dall'utente)
- `bandGeo()` costruisce ora un **anello chiuso** lungo l'intero bordo della finestra (holePts, antiorario,
  normale a sinistra = verso l'interno): sopra lungo C, sotto lungo D, curva in E e chiusura verso G.
- Profondità = `BAND_REACH` · sin(theta(x)): ~2 mm in E, ~14 mm in G a 34°. Clip fisse, invariate.

## Aggiornamento: avvolgimento anche sulla cornice con le clip
- Il bordo posteriore della parete di ritorno esterna (`wallGeo`, vertici a z = -WALL_OUT) e tutte le
  clip 2–8 arretrano con la stessa legge della cavità: `BAND_REACH` · sin(theta(x)) (peso `userData.bw`).
- Il fronte resta dritto da A a G. Le etichette 2–8 seguono la profondità.

## Aggiornamento: due avvolgimenti indipendenti (richiesta dell'utente; li regola lui)
- **Avvolgimento cornice** (cursore `frame`, `frameAngle`, default 0°): piega reale di tutto il pezzo
  (fronte, contorno, clip, cavità) all'indietro verso G, theta(x) = angolo · (0,4·t + 0,6·t²),
  tabella `frameTable` usata in `bendPoint`.
- **Avvolgimento cavità** (cursore `bend`, `bendAngle`, default 34°): solo il livello posteriore ad anello,
  profondità `BAND_REACH` · sin(theta(x)).
- Rimosso l'arretramento parziale del bordo posteriore della cornice e delle clip (non visibile).

## Correzione: clip nascoste con l'avvolgimento cornice
- Causa: le pareti di ritorno erano ExtrudeGeometry con `curveSegments: 1`, quindi triangoli lunghi
  quanto il pezzo; piegati dall'avvolgimento cornice tagliavano la curva e coprivano le clip (la 4 spariva).
- Ora `wallStrip()` costruisce le pareti punto per punto (contorno ricampionato fitto): nessuna corda.
- Verificato a 0°, 30°, 60°: clip 2–8 visibili e solidali con la cornice.

## Correzione: nessuna fessura in E (indicazione dell'utente)
- Pareti di ritorno (`wallStrip`) e anello della cavità (`bandGeo`) salvano per ogni vertice il punto di
  bordo da cui nascono (`userData.edgeXY`); in `deform` prendono il peso della rampa di B di quel punto.
  Così in E scendono con la piastra e l'anello della cavità parte dalla profondità della rampa,
  aggiungendo poi la sua discesa da avvolgimento cavità. Fine rampa raccordata (niente scalino a x = 140).
- Verificato con cavità 34/0/60° e profondità B 9/16/4 mm: E sempre continua.
