# Audi Q2 81A807925A TB2 — Reverse engineering V0.2
## Focus: clip, superfici di accoppiamento e curvatura 3D — SOLO SINISTRO

### Identità
- Pezzo target: `81A807925A`
- Finitura: `TB2` / Selenite Silver
- Posizione: anteriore sinistra
- Audi Q2 pre-facelift
- Gruppo associato: `81A807671 4W3`
- Griglia/substrato associata nel catalogo: `81A807681A 4W3`

### Gerarchia ricambio verificata
Le fonti catalogo collegano il gruppo `81A807671 4W3` a:
- `81A807681A 4W3`
- `81A807925A TB2`

Un catalogo VAG aftermarket/catalogo originale indica inoltre:
- `81A807925A TB2` = Zierrahmen (cornice decorativa)
- `81A807681A 4W3` = Gitter (griglia)
- entrambi nel ramo che sostituisce/compone il riferimento storico `81A8076714W3`

Quindi, ai fini CAD, conviene trattare:
1. `925A` = cornice estetica separata
2. `681A` = supporto/griglia ricevente
3. `671` = gruppo commerciale/assieme

### Photo bank ad alta utilità

#### A — Pezzo target esatto 81A807925A
1. RRR/Ovoko — 6 immagini
https://rrr.lt/en/used-part/ccm44-81a807925a-audi-q2-front-bumper-lower-grill

2. Allegro / spawplast — galleria multipla, codice esatto, TB2
https://allegro.pl/produkt/boczna-ramka-mocowania-kratki-zderzaka-audi-q2-81a807925a-11269-dfd2b832-ae43-471e-8a01-72a92f3a7a13

3. Allegro / Leo-b — secondo esemplare, codice esatto
https://allegro.pl/produkt/audi-q2-kratka-zderzaka-przod-lewa-81a807925a-43cc0bb3-977e-4ff2-a1af-c72c3f13effb

4. KRIK Bulgaria — molte foto reali del pezzo + close-up difetto
https://krik.bg/products/audi-q2-16-21-reshetka-lajsna-bronya-predna-lyava-3ddbf8e8d

5. Marktplaats / Jan Los — esemplare sinistro argento
https://www.marktplaats.nl/v/auto-onderdelen/carrosserie-en-plaatwerk/m2320491364-audi-q2-81a-bumper-rooster-lijst-links-zilver-voorbumper

#### B — Substrato di accoppiamento esatto 81A807681A
RRR — 11 immagini dell'esatto supporto/griglia sinistra:
https://rrr.lt/en/used-part/cpp5934-81a807681a-audi-q2-front-bumper-lower-grill

Allegro — ulteriori gallerie:
https://allegro.pl/produkt/audi-q2-81a-kratka-zderzaka-lewa-przod-81a807681a-e78475ff-f2bb-4a62-b4e4-7ae2277cd1fd

#### C — Gruppo esatto 81A807671 4W3
eBay — 3 immagini + video:
https://www.ebay.de/p/13053065328

eBay — gruppo 4W3:
https://www.ebay.com/itm/353945262522

#### D — Stesso corpo/base 81A807671, finitura EFA
Il catalogo LLLParts elenca sotto lo STESSO base number `81A807671`:
- `81A807671 4W3` = Anthracite/Selenite Silver
- `81A807671 EFA` = Anthracite/dark chrome high gloss

Per studiare forma e curvatura del corpo, NON il colore:
eBay — 7 immagini + video:
https://www.ebay.de/itm/336554696234

eBay — 4 immagini + video:
https://www.ebay.com/itm/315026256210

#### E — Corner anteriore sinistro completo
eBay / Autoverwertung Wulfhorst — 13 immagini del corner sinistro; i riferimenti includono
`81A807671` e `81A807681A`.
https://www.ebay.ch/itm/267760879656

### Conclusioni geometriche

#### 1. Il pezzo NON è planare
Confidenza: ALTA.

La cornice segue una superficie 3D del corner del paraurti. Il modello deve quindi essere
una sweep/loft su una traiettoria spaziale e NON una semplice estrusione di un profilo 2D.

#### 2. Curvatura composta
Confidenza: ALTA per l'esistenza; MEDIA per i valori numerici.

Ci sono contemporaneamente:
- curvatura nel piano frontale XY (sagoma)
- variazione di profondità Z lungo il perimetro
- torsione locale della sezione, specialmente verso la zona esterna del paraurti

Quindi una sola spline 2D estrusa a spessore costante non è sufficiente.

#### 3. Metodo CAD corretto per la curvatura
Definire una centerline 3D della cornice e almeno 6-8 stazioni:
S0 = estremità interna alta
S1 = tratto alto interno
S2 = tratto alto medio
S3 = curva esterna superiore
S4 = tratto esterno quasi verticale
S5 = curva esterna inferiore
S6 = tratto inferiore medio
S7 = estremità interna bassa

Per ogni stazione usare:
- X
- Y
- Z
- angolo normale della sezione
- larghezza locale della fascia
- profondità/ritorno posteriore

La V1 deve restare parametrica.

#### 4. Sistema di fissaggio
Confidenza: ALTA che sia un sistema snap-fit/linguette; MEDIA sulla topologia esatta;
BASSA sulle quote esatte.

Le foto del pezzo isolato e, soprattutto, le gallerie del supporto `81A807681A`
vanno usate in coppia:
- dal `925A`: geometria maschio delle linguette/ganci
- dal `681A`: sedi/finestre riceventi
- dal gruppo `671`: verifica della posizione montata

Non usare clip di varianti B/C/E come quote: possono differire.

#### 5. Strategia per ricostruire le clip
Ogni clip deve essere un feature indipendente:
CLIP_i = {
  station,
  x, y, z,
  base_width,
  base_thickness,
  hook_length,
  hook_height,
  insertion_angle,
  flex_length,
  root_fillet
}

Modellare prima i supporti/clip come coupon di prova, non tutto il pezzo.

#### 6. Tolleranze
Non esistono online quote Audi delle clip del 925A.
Qualsiasi tolleranza numerica iniziale è quindi da considerare PROTOTIPALE, non OEM.

Per stampa FDM è prudente mantenere le quote clip parametrizzate e creare 2-3 varianti
di clearance in un coupon locale.

### Matrice di confidenza attuale
- Identità `81A807925A TB2`: ~100%
- Relazione con `81A807671 4W3`: ~98%
- Relazione col supporto `81A807681A 4W3`: ~95-98%
- Sagoma frontale: ~90%
- Esistenza di curvatura 3D composta: ~95%
- Andamento qualitativo della curvatura: ~85-90%
- Topologia generale snap-fit: ~80-90%
- Numero esatto e coordinate delle clip: NON ancora certificabile
- Dimensioni esatte delle clip: NON certificabili da fonti pubbliche
- Curva Z quotata in mm: NON ancora certificabile senza immagine calibrata o scan

### Dati certi di scala del gruppo
`81A807671 4W3`:
- 548 x 240 x 80 mm (ingombro gruppo)
- ~0.45 kg

Questi valori NON sono le dimensioni del solo `925A`.

### Regola per la V1 CAD
Non assegnare numeri inventati a Z o alle clip.
Prima costruire:
1. silhouette frontale
2. centerline 3D
3. sezioni locali
4. superficie estetica
5. solo dopo sistema di aggancio

### Stato
La ricerca fotografica ora copre:
- pezzo isolato target
- substrato esatto
- gruppo completo esatto
- stesso corpo in finitura alternativa con più viste
- corner del paraurti montato/smontato con 13 viste

Il limite residuo non è più "mancano foto in generale", ma "manca una vista calibrata con
riferimento dimensionale del retro/fianco" per trasformare la curvatura e le clip in quote
millimetriche certificate.
