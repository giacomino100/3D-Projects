# Analisi dei riferimenti e delle forme

Data: 1 novembre 2026. Obiettivo: render fedele dei soli personaggi, prima della preparazione di un file definitivo per stampa.

## Fonti e classificazione

1. **U1 — screenshot dell'utente**: riferimento principale, fronte obliquo del gruppo sul vassoio. Si vedono Maria seduta a sinistra, Bambino al centro e Giuseppe in piedi a destra, leggermente arretrato. Non contiene scala metrica o vista posteriore.
2. **P1–P4 — foto nella galleria del profilo MakerWorld 4028964**: stampa avorio su piano con griglia, ripresa dal fronte e da due lati. Confermano una geometria compatibile, ma sono di un altro esemplare. URL e hash sono in `fonti_manifest.json`.
3. **M1 — mesh di anteprima pubblica**: risorsa `low_compression_glb` esplicitamente elencata nei metadati pubblici della scheda. L'archivio contiene `input_plate_1.glb`. È stata importata direttamente in Blender; non è un modello riscolpito sulla base di un'immagine generata.
4. **A1–A3 e copertina — immagini promozionali**: i nomi dei file A1–A3 contengono “Imagem do ChatGPT”. Alcune presentano supporti o forme incoerenti; non sono state trattate come fotografie reali, prove del retro o riferimenti metrici.
5. **Candidato SERINSY**: scartato. Presenta volti con lineamenti, una diversa inclinazione di Giuseppe e un bastone senza il medesimo ricciolo. Immagine conservata come `candidato_serinsy.png`.

Fonti:

- Scheda primaria: https://makerworld.com/en/models/3497493-minimalist-nativity-scene-holy-family-3d-print
- Metadati primari: https://makerworld.com/api/v1/design-service/design/3497493
- Pagina di scoperta: https://www.3dfinder.io/model/makerworld/3497493-minimalist-nativity-scene-holy-family-3d-print
- Candidato scartato: https://serinsy.com/products/pesebre-minimalista-s203d74

## Lettura dei dettagli

| Zona | Dettaglio osservabile | Trattamento nel progetto |
|---|---|---|
| Composizione | Maria più bassa e avanzata; Giuseppe alto a destra; teste rivolte verso il centro | Preservata la disposizione della mesh del candidato; nessuna modifica delle proporzioni per forzare la prospettiva |
| Volti | Superfici lisce, prive di occhi, bocca e naso realistici | Nessun lineamento aggiunto |
| Velo di Maria | Bordo continuo che incornicia il capo e scende lungo il lato sinistro fino alla base | Conservata la cavità fra velo e volto e il ritorno del manto alla base |
| Grembo di Maria | Massa seduta arrotondata, piega larga e morbida nella parte inferiore | Geometria originale preservata; non sostituita con un cono o una sfera generica |
| Braccia | Curva che sostiene il Bambino, con cambio di superficie al polso | Nessuna mano con dita inventate; dettagli lasciati come nella mesh |
| Bambino | Testa ovale inclinata, corpo fasciato, bordo avvolgente vicino alla testa | Conservati testa, fasciatura e sovrapposizioni |
| Giuseppe | Corpo lungo, spalle arrotondate, veste continua fino al piano | Non aggiunti piedi o barba assenti nei riferimenti |
| Copricapo di Giuseppe | Calotta e linea obliqua sopra il volto, con coda dietro il collo | Conservati bordo e inclinazione del capo |
| Bastone | Asta davanti al corpo, mano circa a metà; ricciolo aperto e terminale verso il basso | Conservata la mesh, senza sostituire il ricciolo con una semplice semicirconferenza |
| Retro | Non visibile nello screenshot U1; nessuna foto reale posteriore verificata | Mostrato solo come render del retro della mesh pubblica del candidato |
| Finitura | Avorio/beige opaco, leggere tracce di stampa nelle foto | Materiale opaco nel render; non modellati difetti di stampa o danni come parti della scultura |
| Ambientazione | Albero verde e vassoio scanalato separati dal gruppo | Esclusi dal modello; il piano di studio è soltanto illuminotecnico |

## Controllo della mesh

L'audit è riproducibile con `src/prepara_render.py` e salvato in `audit_mesh.json`:

- 46.934 triangoli nell'anteprima;
- 23.467 vertici dopo la saldatura dei duplicati;
- nessun bordo aperto o non manifold nel controllo topologico eseguito;
- ingombro della risorsa recuperata: 99,89 × 71,30 × 109,48 mm;
- nessuna variazione della forma introdotta dal progetto.

La mesh è di anteprima. La topologia chiusa, da sola, non certifica risoluzione, qualità dei contatti, spessori minimi del bastone o adeguatezza alla stampa.

## Cosa non è ancora dimostrato

- Che il file usato da forma.maker sia esattamente questo candidato, anziché una variante della stessa composizione.
- Le dimensioni fisiche del gruppo nello screenshot.
- Il retro reale dell'esemplare del video.
- La corrispondenza dei dettagli fini fra anteprima compressa e file originale di stampa.
- L'inquadratura e la focale del telefono: una differenza di prospettiva modifica il rapporto apparente fra le altezze di Maria e Giuseppe.

Per questo la consegna è un **render di confronto e un progetto 3D del candidato**, non una dichiarazione di replica identica o un STL definitivo approvato per stampa.
