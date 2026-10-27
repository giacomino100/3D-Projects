# Valutazione V11 rispetto all'OEM 81A807925A

Data: 2026-10-24  
Stato: **V11 non convalidata come forma finale**

## Verdetto

La V11 riproduce bene la sagoma frontale generale, ma non è ancora una copia 3D affidabile dell'originale. La correzione V11 ha cambiato soltanto la legge longitudinale della profondità e sposta la superficie di un massimo di circa **0.415 mm** rispetto alla V9. È quindi troppo piccola e troppo locale per correggere la struttura visiva della grande falda di END A.

## Confronto metrico dei contorni

Overlay con camera registrata separatamente su ogni foto. MAE = errore medio assoluto; i valori in viste molto oblique hanno confidenza inferiore.

| Vista | Esemplare | Contorno esterno MAE | Apertura MAE | Lettura |
|---|---|---:|---:|---|
| frontale A | S1 `925_alB_1` | 0.26 mm | 0.42 mm | sagoma generale molto vicina |
| frontale B | S2 `925_ccm_1` | 0.59 mm, copertura 47% | 0.80 mm | apertura localmente diversa, p90 1.62 mm |
| montata | S7 `681_pa_1` | 0.89 mm, copertura 16% | 0.51 mm | solo controllo contestuale |
| obliqua A | S3 `925_alA_1` | 1.50 mm | non misurabile | curvatura Z / ritorni non allineati |
| obliqua B | S5 `925_krik_0` | 1.06 mm | non misurabile | curvatura Z / ritorni non allineati |
| posteriore | S1 `925_alB_2` | 1.69 mm | non misurabile | ritorni e profilo 3D ancora incerti |
| radente | S6 `925_mp_2_hr` | 1.31 mm, copertura 19% | non misurabile | conferma qualitativa, non quota assoluta |

## Cosa coincide

- La sagoma frontale esterna è complessivamente vicina su S1 e compatibile con S2.
- I lunghi tratti dell'apertura e dei bordi seguono il pezzo senza ondulazioni intenzionali.
- Il campo V11 è matematicamente continuo: nessun salto di profondità; salto massimo campionato di `dz/ds` 0.0003.
- Corpo e sei clip sono chiusi e manifold.

## Differenze e limiti ancora aperti

### 1. END A: correzione V11 insufficiente

S1 `925_alB_1` e S3 `925_alA_3` mostrano una grande falda continua e leggibile come un'unica superficie che accompagna il naso fino alla cavità. La V11 conserva invece la costruzione V9 a pocket/floor con raccordo trasversale e cambia soltanto il moltiplicatore lungo `s`.

La differenza massima V11–V9 è circa **−0.415 mm a s ≈ 76.5 mm**. Di conseguenza la V11 può apparire quasi identica alla V9 e non costituisce una correzione sufficiente del difetto segnalato dall'utente.

**Conclusione:** la successiva prova non deve limitarsi a `RECESS_RAMP_PROFILE`; deve modellare la falda END A come un'unica superficie longitudinale controllata tra naso e imbocco della cavità. Nessuna quota di profondità nuova può essere ricavata dalle foto.

### 2. Apertura

S1 è vicino al CAD, mentre S2 presenta errori locali fino a oltre 1.5 mm, soprattutto sul bordo superiore e nella transizione verso END A. I due esemplari non danno una direzione unica sufficiente per una nuova correzione.

**Correzione visiva dell'utente (prioritaria):** nella zona superiore indicata sull'overlay `front_A`, verso END B, i punti rossi non identificano il contorno dell'apertura. L'edge search sta agganciando il bordo/ombra di una **linguetta che va verso l'interno del pezzo**. Quello scarto non deve quindi essere usato per spostare la linea magenta o creare un gradino nella sagoma. Il bordo frontale dell'apertura resta diritto; la linguetta deve essere modellata come geometria interna arretrata, appartenente allo stesso corpo. Profondità e inclinazione restano **ASSUMED** perché non misurabili dalle foto.

### 3. Curvatura Z globale e ritorni

Le viste S3, S5, S1 posteriore e S6 radente mostrano scarti medi da circa 1.1 a 1.7 mm, con p90 intorno a 3 mm. Il segno degli scarti cambia tra le viste, quindi le foto non vincolano ancora una correzione univoca della curvatura Z.

### 4. END B

Il bordo inferiore resta diritto come indicato dall'utente. Gli overlay frontali possono leggere l'ombra della rientranza come scostamento del contorno; non si reintroduce alcun gradino o tacca. La vista dedicata frontale di END B manca ancora.

Sul bordo superiore verso END B è ora identificata esplicitamente la linguetta interna descritta dall'utente: la sua ombra era stata interpretata erroneamente dall'overlay come bordo OEM.

## Decisione operativa

Non usare V11 come prova che il pezzo sia fedele all'OEM. La prossima iterazione deve essere un candidato separato e deve intervenire soltanto sulla costruzione della falda END A; prima della build completa va confrontata con S1 e S3 in una vista equivalente.

Artefatti di controllo:

- `V9_ANALYSIS/overlays/OEM_vs_V11_*.png`
- `V9_ANALYSIS/overlays/metrics_V11.json`
- `V9_ANALYSIS/zone_deviation_V11.json`
- `cad/blender/V11_END_A_depth_field.png`

## Correzione successiva V12

I due crop forniti dall'utente hanno risolto l'ambiguità dell'overlay: il dettaglio è una linguetta/ritorno interno continuo lungo il bordo superiore, non uno scostamento dell'apertura. La V12 estende il ritorno profondo fino al raccordo END A senza modificare la sagoma frontale. Vedere la sezione V12 in `V9_ANALYSIS/V9_V8_vs_OEM.md`.
