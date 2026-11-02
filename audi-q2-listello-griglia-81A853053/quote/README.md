# Quotatura del modello Audi Q2

Le quote descrivono il modello nella scala ipotizzata **A–G = 360 mm**. La lunghezza reale non è disponibile. Non sono quote OEM confermate e non includono tolleranze di accoppiamento.

- `listello-quotato.pdf`: cinque tavole A3 orizzontali.
- `listello-quotato.html`: tavole autonome, apribili anche senza server, con stampa ed export.
- `listello-quote.csv`: parametri, quote clip e contorni effettivi campionati, separatore `;`.
- `listello-quote.json`: snapshot completo, incluse geometria avvolta e sezioni.
- `*.svg`: nove disegni vettoriali autonomi.
- `tavola-1.png` … `tavola-5.png`: anteprime delle pagine PDF.

Le tavole coprono riferimento piano, ingombri del modello avvolto, sei clip con asole, sezioni B/C/D, parametri e punti di controllo. Le coordinate sorgente della finestra precedono l'inset di 2 mm; nel CSV/JSON sono disponibili anche i contorni effettivi dopo le correzioni.

## Quote aggiornate dai cursori

Aprire il modello e premere **Quotatura**: le tavole vengono generate con la configurazione corrente dei cinque cursori. Il PDF già salvato in questa cartella è uno snapshot: cornice 19°, cavità 34°, rampa 11 mm, inclinazioni 11° sopra e sotto.

## Rigenerazione dei file

Avviare il server nella cartella `modello`:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Da un secondo terminale, con Python, Playwright e Chrome disponibili:

```powershell
python quote/esporta_quote.py
```

Il comando si esegue dalla radice del progetto Audi e carica i valori iniziali della pagina. Se è presente PyMuPDF, aggiorna anche le anteprime PNG e verifica che il PDF contenga cinque pagine con cartiglio. Per quotare impostazioni diverse usare il pulsante nella pagina dopo aver regolato i cursori.
