# Sacra Famiglia — riferimento forma.maker

Progetto separato creato il **1 novembre 2026**, dedicato esclusivamente a Maria, Giuseppe, Bambino e bastone. L'albero e il vassoio dello screenshot non fanno parte del modello.

## Aprire per primo

- `index.html`: confronto con il riferimento e galleria dei render.
- `render/07_vista_prospettica_riferimento.png`: render prospettico del gruppo.
- `render/02_fronte.png` e `render/03_retro.png`: viste ortogonali della mesh.
- `progetto/sacra_famiglia_render.blend`: scena Blender modificabile, con personaggi e studio in collezioni separate.

## Identificazione e limiti

Il candidato individuato è **Minimalist Nativity Scene – Holy Family | 3D Print**, di **Th3D.br**, MakerWorld **3497493**:

https://makerworld.com/en/models/3497493-minimalist-nativity-scene-holy-family-3d-print

Sono state recuperate quattro foto frontali/oblique di una stampa dal profilo pubblico e la sua mesh pubblica di anteprima. La corrispondenza con lo screenshot è molto plausibile per posa, velo, Bambino e bastone; non è verificata l'attribuzione del video forma.maker a questo autore né l'identità del file usato nel video.

**Non è stata reperita una foto posteriore reale verificabile dell'esemplare del video.** I render posteriori provengono dalla mesh del candidato e non sono fotografie né una ricostruzione inventata del lato nascosto. Alcune immagini promozionali della scheda hanno nomi contenenti “ChatGPT” e mostrano incongruenze: sono conservate ma escluse dalle prove fotografiche.

Il progetto usa la mesh pubblica di anteprima GLB, non il file originale di stampa a piena risoluzione. Non sono stati prodotti STL definitivi: questa consegna serve a valutare il render, come richiesto.

## Contenuto della cartella

| Cartella | Contenuto |
|---|---|
| `riferimenti/originale` | Screenshot originale dell'utente, immutato |
| `riferimenti/web` | Foto, immagini promozionali, candidato scartato e archivio della mesh di anteprima |
| `ricerca` | Metadati primari MakerWorld, pagina di scoperta 3DFinder, manifest con URL e SHA-256, analisi dettagli e audit geometrico |
| `src` | Script Blender per rigenerare scena e render |
| `progetto` | GLB di origine e progetto Blender |
| `render` | Sette viste finali, confronto con lo screenshot e prove preliminari |

## Geometria

Dimensioni della mesh sorgente: circa **99,9 × 71,3 × 109,5 mm**. Queste sono le dimensioni del GLB recuperato, non misure fisiche dedotte dallo screenshot.

L'anteprima contiene 46.934 triangoli. Dopo la saldatura dei vertici coincidenti conserva 23.467 vertici, senza bordi aperti o non manifold nel controllo eseguito. Non sono state alterate le proporzioni o scolpite superfici nuove. Si sono modificati soltanto saldatura dei duplicati, normali, posizionamento al piano, materiale e illuminazione. La verifica non equivale alla validazione di stampa o dell'accoppiamento fra volumi.

## Rigenerazione

Con Blender 5.2:

```powershell
& 'C:/Program Files/Blender Foundation/Blender 5.2/blender.exe' --background --factory-startup --python src/prepara_render.py
```

Per due viste rapide aggiungere `-- --preview`; per la sola vista prospettica aggiungere `-- --photo-only`. I percorsi sono relativi alla posizione dello script, non a una cartella utente codificata.

Il file `.blend` contiene `01_PERSONAGGI` e `02_STUDIO_solo_render`. Il piano, le luci e la camera sono nello studio: non sono componenti del presepe. La camera prospettica non è calibrata sui parametri del telefono; le viste ortogonali permettono di distinguere le differenze geometriche da quelle prospettiche.

## Attribuzione della risorsa

Mesh e immagini del candidato: **Th3D.br / MakerWorld 3497493**, profilo di stampa **4028964**. I metadati primari dichiarano **BY-NC**, con rielaborazione consentita. Conservare questa attribuzione e la natura non commerciale della risorsa. Screenshot dell'utente: video Instagram **forma.maker**. Nessun contenuto è stato pubblicato o inviato ai rispettivi autori.
