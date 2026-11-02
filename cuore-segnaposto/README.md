# Cuore segnaposto â€” Grazie

Prima proposta di forma in HTML / Three.js, nello stile del visualizzatore Audi.

Aprire `modello/cuore.html` nel browser, oppure, per la scritta in geometria 3D, avviare dalla cartella principale del repository:

```powershell
python -m http.server 8766 --bind 127.0.0.1
```

Poi aprire http://127.0.0.1:8766/cuore-segnaposto/modello/cuore.html . Aprendo direttamente il file, la scritta usa una texture di riserva perchÃ© il browser puÃ² bloccare la lettura del font locale.

- Revisione dalla foto di riferimento: cuore disposto su un lato, bordo inferiore piatto direttamente sul tavolo, senza piedistallo.
- Ingombro indicativo del cuore: circa 136 x 106 x 28 mm.
- Corpo unico con tasca cieca ricavata solo nella parte superiore: larghezza 90 mm, spessore 1,4 mm, fondo rialzato a quota 80 mm, apertura limitata al lobo superiore. Fianchi e base continui e chiusi.
- Foto nominale 88 x 107 mm tipo Polaroid, inserita verticalmente dietro la faccia anteriore.
- Due cuori affiancati: il primo con scritta Grazie (G maiuscola), il secondo senza scritta. Scritta in corsivo calligrafico Parisienne, geometria in rilievo circa 1 mm sul fronte; finitura dorata illustrativa.
- Rotazione, zoom, fronte/retro, foto rimovibile e personalizzabile, profondita di inserimento regolabile e salvataggio PNG.

Studio visivo HTML: geometria definitiva, tolleranza della fessura e stabilita da verificare nel successivo progetto CAD per la stampa.

## Risorse locali

Three.js 0.160.0 e font Gentilis dal progetto Three.js (MIT): https://github.com/mrdoob/three.js . Font Gentilis: copyright e licenza inclusi nei metadati di `assets/font.json`.

Foto dimostrativa: https://unsplash.com (file immagine: https://images.unsplash.com/photo-1519741497674-611481863552), fonte Unsplash. Non Ã¨ una fotografia dellâ€™utente.


Font Parisienne da Google Fonts, licenza SIL OFL in `assets/Parisienne-OFL.txt`. Librerie three-csg-ts e opentype.js incluse nel bundle locale `assets/heart-tools.js`; licenze in `assets/CSG-LICENSE.txt`, `assets/OPENTYPE-LICENSE.txt` e `assets/THREE-LICENSE.txt`.

Bordi esterni ammorbiditi su entrambe le varianti: raccordo indicativo 2,6 mm sul contorno e 2,2 mm in profondita, con 8 segmenti. Appoggio inferiore piano mantenuto; lettering riallineato alla superficie frontale.
