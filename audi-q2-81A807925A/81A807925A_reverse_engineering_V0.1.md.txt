# Audi Q2 – Reverse engineering V0.1
## Pezzo sinistro 81A807925A / 81A807925A TB2

### 1. Identificazione certa
- Pezzo: cornice / inserto decorativo griglia paraurti anteriore sinistra
- OEM: 81A807925A
- Variante/finitura: 81A807925A TB2
- Vettura: Audi Q2 pre-restyling
- Lato: sinistro
- Gruppo completo associato: 81A807671 4W3
- Finitura gruppo: Anthracite / Selenite Silver

### 2. Quote certe disponibili online
Le quote pubblicate riguardano il GRUPPO COMPLETO 81A807671 4W3, non il solo listello 81A807925A.

- Ingombro gruppo completo: 548 x 240 x 80 mm
- Peso gruppo completo: circa 0,45 kg

Sistema CAD consigliato:
- X = asse lungo del gruppo, 0…548 mm
- Y = asse verticale/frontale, 0…240 mm
- Z = profondità verso il veicolo, 0…80 mm

Queste tre dimensioni costituiscono il box di calibrazione della V1.

### 3. Dataset fotografico del SOLO pezzo sinistro
Fonti che mostrano esemplari indipendenti del codice esatto 81A807925A:
1. RRR/Ovoko – più fotografie del pezzo isolato, usato:
   https://rrr.lt/en/used-part/ccm44-81a807925a-audi-q2-front-bumper-lower-grill
2. Allegro – 81A807925A TB2, pezzo isolato:
   https://allegro.pl/produkt/boczna-ramka-mocowania-kratki-zderzaka-audi-q2-81a807925a-11269-dfd2b832-ae43-471e-8a01-72a92f3a7a13
3. Allegro – secondo esemplare del codice esatto:
   https://allegro.pl/produkt/audi-q2-kratka-zderzaka-przod-lewa-81a807925a-43cc0bb3-977e-4ff2-a1af-c72c3f13effb
4. Marktplaats / Jan Los – 81A807925A, sinistro, argento:
   https://www.marktplaats.nl/v/auto-onderdelen/carrosserie-en-plaatwerk/m2320491364-audi-q2-81a-bumper-rooster-lijst-links-zilver-voorbumper
5. KRIK Bulgaria – 81A807925A OE, sinistro:
   https://krik.bg/products/audi-q2-16-21-reshetka-lajsna-bronya-predna-lyava-3ddbf8e8d

### 4. Geometria V1 da costruire
Modellare il componente in due corpi logici separati:

A. SUPERFICIE ESTETICA
- profilo frontale chiuso
- curvatura in Z
- raccordi esterni
- bordo interno
- ritorni posteriori

B. SISTEMA DI FISSAGGIO
- clip
- linguette
- nervature
- battute
- eventuali ganci terminali

Non unire definitivamente le clip al corpo finché non è validato il fit.

### 5. Punti geometrici di riferimento
Definizione proposta:
- A = estremità interna superiore
- B = estremità esterna superiore
- C = estremità esterna inferiore
- D = estremità interna inferiore

Percorso estetico principale: A → B → C → D.

Per ogni clip utilizzare parametri separati:
CLIP_n = {X, Y, Z, larghezza, altezza, spessore, angolo, lunghezza gancio}

### 6. Parametri CAD iniziali
Quote OEM delle clip NON disponibili online. I seguenti valori sono SOLO assunzioni di prototipazione e devono rimanere parametrici:

- T_shell = 2.5 mm
- T_rib = 2.0 mm
- T_clip_root = 2.2 mm
- clearance_clip = 0.30 mm
- fillet_clip_root = 0.8–1.2 mm

Non trattare questi valori come misure Audi originali.

### 7. Cross-check geometrico, NON quota del pezzo
Una variante della stessa famiglia di griglie Audi Q2 2016–2020 viene mostrata online con ingombro circa 520 x 235 mm.
Questo è coerente con il box OEM del gruppo target (548 x 240 mm) e può essere usato come controllo di scala generale, MA NON come quota del solo 81A807925A.

Una lettura puramente proporzionale di quella variante suggerisce che la cornice decorativa occupa approssimativamente 60–65% della larghezza del gruppo e circa 80% della sua altezza.
Applicato solo come sanity check al gruppo target, produce una fascia grossolana di circa:
- 330–355 mm in X
- 185–200 mm in Y

IMPORTANTE: questa NON è una misura verificata del 81A807925A. Serve soltanto a riconoscere errori macroscopici durante il primo tracciamento fotografico.

### 8. Livelli di affidabilità
CERTI:
- codice 81A807925A / TB2
- lato sinistro
- relazione con 81A807671 4W3
- finitura Selenite Silver
- box del gruppo completo 548 x 240 x 80 mm

DA FOTO:
- sagoma frontale
- distribuzione delle clip
- curvatura generale
- forma delle estremità

NON DISPONIBILI COME QUOTE OEM:
- lunghezza esatta del solo listello
- altezza esatta del solo listello
- spessore originale
- raggi
- coordinate clip
- dimensioni clip

### 9. Strategia di modellazione
1. Importare una foto del gruppo 81A8076714W3 il più frontale possibile.
2. Correggere prospettiva.
3. Scalare il gruppo sul riferimento X = 548 mm.
4. Tracciare la sagoma della cornice 81A807925A.
5. Validare il tracciato sulle foto isolate RRR/Allegro/Marktplaats/KRIK.
6. Costruire una superficie 3D con sezioni prese dalle viste oblique.
7. Modellare le clip come feature parametriche indipendenti.
8. Stampare prima campioni locali delle clip.
9. Solo dopo validare il componente intero.
10. Esportare STEP + STL finale.

### 10. Materiale consigliato per prototipo/finale
- Prototipo di forma: PETG o ASA
- Pezzo finale esposto all'esterno: preferibile ASA
- Finitura estetica: primer + finitura Selenite Silver compatibile con il riferimento TB2

### 11. Stato del progetto
V0.1 completata:
- identità del ricambio: OK
- dataset fotografico sinistro: OK
- scala assoluta del gruppo: OK
- sistema di riferimento CAD: OK
- parametri di prototipazione: impostati
- sagoma numerica esatta del solo listello: NON ancora certificabile da fonti pubbliche dimensionate
- clip esatte: NON quotate online

La V1 successiva deve produrre il profilo vettoriale/scalato del listello a partire dalle immagini del gruppo e confrontarlo con le fotografie del pezzo isolato.
