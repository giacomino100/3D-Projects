# Progetto: Mini presepe minimal con stella cometa — pronto per produzione FDM

## ISTRUZIONE PRINCIPALE PER CLAUDE CODE

Agisci come **3D Product Designer**, modellatore esperto di **Blender (Python/bpy)** e **ingegnere di stampa FDM**. Devi sviluppare un prodotto commerciale originale, ispirato al riferimento grafico allegato `01_Reference_Presepe_Stella_Cometa.png`, e consegnare **modelli 3D realmente utilizzabili**, non soltanto render o descrizioni.

**IMPORTANTE:** la tavola allegata è un riferimento estetico generato digitalmente, **non un disegno CAD quotato**. Non ricostruirla in modo cieco dove la geometria sarebbe fragile, sospesa o non stampabile. Usa come vincolanti le quote e le specifiche seguenti, segnalando eventuali compromessi tecnici. La stella deve essere una **STELLA COMETA**, con stella anteriore e scia fluida orientata verso destra come nel riferimento. Non sostituirla con una stella classica.

## 1. Obiettivo commerciale e stile

- Oggetto: mini presepe da appoggio, compatto, piacevole da fotografare e vendere come regalo natalizio.
- Materiale: **PLA bianco osso / avorio**, monocromatico; nessuna verniciatura obbligatoria.
- Stile: **minimal elegante, morbido, effetto porcellana/ceramica**. Personaggi simbolici con volti lisci o appena accennati, tuniche drappeggiate semplici, senza dettagli minutissimi o mani sottili separate.
- Composizione vista frontalmente: Maria a **sinistra** inginocchiata in adorazione; Gesù **al centro** in mangiatoia; Giuseppe **a destra** in piedi con bastone robusto e integrato. Capanna a due falde con fronte aperto. Sopra, **stella cometa** con coda curva estesa verso destra.
- Il modello deve mantenere il carattere armonioso del riferimento, ma essere solido, stabile e stampabile.

## 2. Vincoli dimensionali (quote reali in millimetri)

| Parametro | Specifica |
|---|---|
| Ingombro massimo assemblato, larghezza X | **120 mm** |
| Ingombro massimo assemblato, profondità Y | **60 mm** |
| Ingombro massimo assemblato, altezza Z (cometa compresa) | **95 mm** |
| Basamento | ovale o ellisse schiacciata, **120 × 60 × 9–10 mm**, faccia inferiore piatta |
| Struttura capanna | tetto spiovente, due sostegni laterali robusti, fronte aperto |
| Spessore minimo per elementi portanti | obiettivo **>= 3 mm**, aumentare negli attacchi sollecitati |
| Spessori locali per decorazioni secondarie | idealmente **>= 1,6–2 mm**; evitare punte troppo acute |
| Stella cometa | componente piatto tridimensionale, spessore in profondità circa **3 mm**, almeno 2 mm sulle scie |
| Area eventuale incisione sulla base | zona frontale quasi piana, scritta alta ~4–5 mm, profondità 0,6–0,8 mm se compatibile |

Le quote servono come limite di ingombro dell'**assieme completo**, non di ogni singolo componente. Ricalcola proporzioni e posizioni affinché niente oltrepassi X 120 / Y 60 / Z 95 mm; documenta le misure effettive del progetto finito.

## 3. Strategia di progettazione e stampa

Preferisci una **struttura modulare** se permette di diminuire supporti, difetti e tempo di stampa:

1. `BASE`: base ovale con sede dei componenti e superficie anteriore per personalizzazione.
2. `CAPANNA`: tetto a due falde + pilastri, in uno o più pezzi solo se conviene per stampa.
3. `MARIA`: figura stabile, con superficie inferiore piana, mani/tunica modellate come volumi robusti.
4. `GIUSEPPE`: figura stabile, bastone **solidale alla figura** e con collegamenti strutturali sufficienti, mai un filo fragile isolato.
5. `MANGIATOIA_GESU`: bimbo e mangiatoia in un unico pezzo o struttura equivalente robusta; niente parti minuscole staccabili.
6. `STELLA_COMETA`: stella e scia organica **nello stesso pezzo stampabile**, idealmente steso piatto sul piano della stampante; prevedere incastro pulito sulla capanna.

Progetta per **ugello da 0,4 mm**, layer indicativo 0,16–0,20 mm. Evita dettagli che richiedano una risoluzione irrealistica. Parti da orientamenti di stampa piatti e geometrie autoportanti. Non presumere che nessun componente richieda supporti: mostra i punti critici ed eventualmente crea una variante geometrica senza supporti.

**Incastri:** prevedi sedi e perni con invito/smusso, con gioco iniziale indicativo di **0,20–0,30 mm per lato**, da calibrare sulla stampante effettiva tramite provino. Indica chiaramente la tolleranza implementata e se l'assemblaggio è a pressione o con una piccola quantità di adesivo. Evita che il tetto si spezzi inserendo la stella cometa.

**Stella cometa:** dalle forme morbide e leggere come nell'immagine, ma con code sufficientemente spesse. Se la scia è troppo lunga o sottile, sostituiscila con 2–3 nastri curvi connessi e robusti, o una singola silhouette continua con scanalature superficiali. Una stampa orizzontale piatta deve risultare possibile senza supporti. Progetta la connessione al tetto in una posizione di supporto adeguata.

## 4. Personalizzazione commerciale

Progetta il basamento in modo da poter generare almeno:

- `STANDARD`: senza scritta.
- `FAMIGLIA`: esempio `Famiglia Rossi`.
- `ANNO`: esempio `Natale 2026`.

Il testo deve essere **parametrico e modificabile facilmente**, centrato e leggibile, senza imporre una seconda stampa di un enorme basamento. Se l'incisione su una superficie curva risulta poco affidabile, crea una piccola **fascia frontale piana** discreta o una placchetta sostituibile a incastro, spiegando la scelta.

Non usare marchi o modelli di terze parti privi di licenza commerciale. La geometria prodotta deve essere originale.

## 5. Strumenti e modalità di lavoro

Percorso preferito: **Blender installato localmente + Claude Code**, mediante script Python `bpy` versionato e file `.blend`. In alternativa puoi proporre una soluzione CAD diversa, purché produca veri solidi/mesh esportabili, personaggi esteticamente convincenti e il progetto modificabile.

Procedura richiesta:

1. Verifica se Blender è installato; se non lo è, documenta installazione e comandi di avvio, senza dichiarare verifiche non eseguite.
2. Crea il modello parametrico con script ripetibile. Usa unità metriche e verifica conversione in millimetri all'esportazione.
3. Genera e salva il file sorgente modificabile (`.blend` + `.py`).
4. Esporta gli `.stl` **separati per componente** e possibilmente un STL dell'assieme completo solo come visualizzazione (non per stampa diretta se presenta parti sovrapposte).
5. Realizza almeno **quattro render**: vista frontale, 3/4, laterale, esploso dei componenti, su sfondo neutro e materiale avorio. Aggiungi un close-up della cometa.
6. Calcola bounding box in mm e controlla almeno: mesh chiuse/manifold; normali coerenti; assenza di geometrie flottanti; facce/corpi intersecati per errore; parti troppo sottili; piano di appoggio; compatibilità degli incastri.
7. Se disponibili, usa gli strumenti di riparazione mesh e un vero slicer (es. OrcaSlicer o PrusaSlicer) per verificare orientamento e supporti. Riporta **grammi e tempi dal software di slicing**, non inventarli. In assenza di slicer segna `non verificato`.
8. Ripeti le correzioni fino a ottenere il miglior modello possibile. Non considerare il solo rendering come prova di stampabilità.

**Rigorosità:** se non hai accesso ai tool per generare o esaminare STL, produci gli script completi da eseguire localmente, i comandi esatti e un resoconto onesto di ciò che non è stato ancora verificato. Non dichiarare mai 'modello testato' o 'stampabile senza supporti' senza verifica.

## 6. Struttura dei file da consegnare

```text
mini-presepe-cometa/
  README.md                      # avvio, prerequisiti, comandi
  src/
    genera_presepe.py           # script riproducibile
  progetto/
    mini_presepe_cometa.blend    # scene e oggetti modificabili
  stl/
    BASE_standard.stl
    CAPANNA.stl
    MARIA.stl
    GIUSEPPE.stl
    MANGIATOIA_GESU.stl
    STELLA_COMETA.stl
    BASE_Famiglia_Rossi.stl
    BASE_Natale_2026.stl
  render/
    frontale.png
    tre_quarti.png
    laterale.png
    esploso.png
    dettaglio_cometa.png
  QA_REPORT.md                  # dimensioni, verifiche, criticità, supporti, tolleranze
  STAMPA_ASSEMBLAGGIO.md         # impostazioni, orientamento, istruzioni
```

Se ritieni preferibile accorpare o suddividere diversamente i pezzi, motivane i vantaggi produttivi e aggiorna il file tree effettivo. Non creare nomi di file di output se il contenuto corrispondente non è stato realmente generato.

## 7. Criteri di accettazione

Il lavoro è concluso soltanto quando:

- L'assieme rispetta X <= 120 mm, Y <= 60 mm, Z <= 95 mm.
- La **stella cometa** è visibile e coerente con il riferimento; scia rivolta a destra.
- Maria, Giuseppe e Gesù sono distinguibili e armoniosi, senza dettagli fragili.
- Il modello ha un basamento stabile e una soluzione chiara di assemblaggio.
- Ogni STL consegnato è un elemento stampabile (o è esplicitamente marcato come bozza da correggere).
- Sono presenti i sorgenti **modificabili**, non soltanto STL chiusi.
- Le verifiche svolte e quelle mancanti sono dichiarate in `QA_REPORT.md`.

## 8. Informazioni non ancora fornite dall'utente

- Marca e modello esatto della stampante e dimensioni del piatto.
- Eventuale slicer in uso.
- Disponibilità di AMS / stampa multicolore (non necessaria: progetto monocromatico).
- Preferenza tra componenti a incastro o incollaggio leggero.

Per iniziare **non bloccare il lavoro** su questi dettagli: usa il profilo generico FDM 0,4 mm, specifica le assunzioni e prepara parametri adattabili. Prima della stampa finale chiedi conferma dei dati macchina.
