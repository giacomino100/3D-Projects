# V9: V8 compared with OEM photos (no CAD edits yet)

## Method

- **Tooling:** `work/v9_overlays.py` (camera matched on each photo, then edge measurement along the CAD normals) and `work/v9_zones.py` (zone table).
- **Sign:** `+` means the OEM edge lies outside the CAD contour. For the opening, `+` means the OEM opening is larger.
- **Units:** mm in the CAD frame, with L = 472 mm. **No photo has a metric scale.**
- **Agreement rule:** a correction is accepted only if at least 2 independent specimens give the same sign with |median| > 0.5 mm, and no specimen contradicts it.

## Overall fit

| View | Photo | Specimen | Outer MAE | Opening MAE |
|---|---|---|---|---|
| front_A | `alB_1` | S1 | 0.28 | 0.39 |
| front_B | `ccm_1` | S2 | 0.46 (41 % covered) | 0.82 |
| front_C_assembly | `681_pa_1` | S7 | 0.91 (16 % covered) | 0.48 |
| oblique_A | `alA_1` | S3 | 1.31 | – |
| oblique_B | `krik_0` | S5 | 1.00 | – |
| rear | `alB_2` | S1 | 1.66 | – |
| profile | `mp_2_hr` | S6 | 1.48 (18 % covered) | – |

Full per-zone values: `zone_deviation_V8.json`. Overlays: `overlays/OEM_vs_V8_*.png`.

## Findings by priority

### 1. Global Z curvature: NOT constrained enough to change

- The oblique, rear and profile views disagree with each other:
  - On the rails' bottom edge: S3 −1.0, S5 +1.7, S1 rear −2.4, S6 −0.6.
  - At END A: S3 +0.7, S5 −0.1, S1 rear −2.6.
- No 2-specimen agreement anywhere, so the wrap / Z stations of V5 to V8 stay as they are.

### 2. Scallop / recess: not measurable with silhouette overlays

- Its existence and shape are confirmed qualitatively on `alA_3` (S3), `fre_2` (S4) and `alB_1` (S1): the face sinks between straight rails and deepens towards the opening at END A, as modelled in V8.
- Its depth (D_LEDGE 1.0 / D_RECESS 2.2 mm) **cannot be measured**: there is no scale and no profile section. It stays ASSUMED.

### 3. END A outer contour: no consistent correction

The zone medians conflict in sign across the views.

### 4. Inner opening

- **Rails:** no agreement. S2 top −1.15 mm, S1 −0.08, S7 +0.17. S2 is an outlier.
- **Bottom edge near END B (s 378–412): CONFIRMED by 2 independent specimens.** The OEM opening reaches lower than V8:

  | s range | S1 (`alB_1`) | S2 (`ccm_1`) |
  |---|---|---|
  | 378–392 | – | +2.3 mm |
  | 392–412 | +3.4 mm | +1.7 mm |

  This is exactly the **step that was removed in V8** at the user's request. Both specimens show it, and so does the overlay. **Conflict between the user instruction and the evidence.**
- **Top edge near END B:** S2 +0.95, S7 +0.55, S1 +0.15. This is a weak tendency for the opening to be about 0.5 mm larger.

### 5. END B outer contour: no consistent correction

The views conflict in sign.

## Proposed V9 edits

| Edit | Status |
|---|---|
| (a) Restore the bottom-edge step near END B (photo-confirmed, 2 specimens), keeping the clean straight cavity lines and the band that follows it | Needs the user's decision, because it reverses the user's instruction |
| (b) Top opening edge near END B: +0.5 mm | Optional, weak evidence |
| Everything else | No change: not constrained by ≥ 2 specimens, or not measurable without scale |

## V9 edit applied: rientranza on the opening bottom edge near END B

The user clarified that the feature is a recess (rientranza), not a step. On the `alB_1` zoom it is the lower ledge along the opening ending in a rounded concave notch, while the bead continues.

**Changes:**
- The opening keeps the photo-extracted outline from V7 (`alB_1`), concave notch included.
- The bottom flat band blends into the bead-based ledge before the notch (`BOTTOM_FLAT_S` = (115, 380), fade 30 mm), so the cavity lines stay straight and the ledge ends exactly at the notch.

**Re-measured** (camera-matched; median deviation on the bottom opening edge, s 375–412):

| Specimen | V8 (straight edge) | V9 |
|---|---|---|
| S1 `alB_1` | +3.4 mm | **−0.02 / +0.16 mm** |
| S2 `ccm_1` | +2.3 / +1.7 mm | **+0.01 / −0.11 mm** |

**Opening fit overall:**

| Specimen | V8 MAE | V9 MAE |
|---|---|---|
| S1 | 0.39 | **0.28** |
| S2 | 0.82 | **0.58** |

**Not changed:** global Z, END A, END B outer contour and recess depths. They are not constrained by ≥ 2 specimens, or not measurable without scale.

**Files:** `cad/exports/V9/81A807925A_V9.step`, `cad/fusion/81A807925A_V9.f3d`. These are identical to the V8 files, which were also updated.

## Correction (user): the bottom feature is a recess like the top one, not a notch

The notch in the opening outline was wrong, so it has been removed:

- The opening bottom edge is straight into the END B loop again.
- The bottom cavity now ends at the same place (s ≈ 390, `FLOOR_S_MAX`) and in the same way as the top one, rising to the bead with a curved sweep over `RW_LEDGE`.
- The bottom flat band blends into the bead-based ledge before that point: `BOTTOM_FLAT_S` = (115, 375), fade 25 mm.

**Note:** the earlier silhouette measurement on `alB_1` and `ccm_1` read the end of this recess as an outline deviation (+2 to +3 mm), probably from the shadow of the recess wall. Silhouette overlays cannot tell the two apart.

## V9b: END A made faithful to the photos (alB_1, alA_3)

The user confirmed that the recess depth was the main difference.

| Change | Before | Now |
|---|---|---|
| END A recess depth (`D_RECESS`) | 2.2 mm | **3.5 mm**. ASSUMED: there is no scale, but the rails now stand proud as on the photos. |
| Transition from rails to plate | two levels (ledge + pocket) | **one single concave crease** (`ENDA_SINGLE` up to s 120, blended into the rail ledges by s 160; `RW_POCKET` 2.5 mm). The crease lines are the straight extensions of the opening edges. |
| Slanted nose | no rim; recess faded to 0 at the nose | narrow rolled rim, 4.7 mm (`POCKET_RIM` −2.5). The recess starts at 55 % depth at the nose and deepens to full by s 90 (`RECESS_RAMP_MIN`). |
| Rails at END A | flat | rounded all the way to the nose (`CROWN_S_START` 8) |
| D-end of the opening | loose tab where the deep top wall started | tab removed: the deep top wall now starts 18 mm after the D-end (`work/v8_returns2.py`) |

**Result:** one closed solid with 6 clips. Saved as `cad/exports/V9/81A807925A_V9.step` and `cad/fusion/81A807925A_V9.f3d`.

## V9c: bottom lip recessed inward along the whole part

User feedback, matching the shadow along the bottom rail on `alB_1`: seen from the front the bottom edge is a simple lip, but behind it the rail goes inward.

**Changes:**
- **Bottom channel** (`BOTTOM_CHANNEL`): a recessed channel, 1.6 mm deep (ASSUMED), behind a 1.2 mm lip with a 3 mm roll. It runs from END A to the END B loop.
- **Bottom rail:** no longer crowned (raised).
- **END A:** the plate recess now reaches down to the bottom lip in one gentle roll (`POCKET_TO_LIP`, `RW_LIP_ENDA` 7 mm). There is no horizontal crease underneath any more.

**Remaining:** a small visible jog where the END A plate blends into the channel (s ≈ 150).

**Build:** closed solid with 6 clips. Saved as V9 (STEP + f3d).

## V9d: jog removed where the END A plate enters the bottom channel

The jog had two causes, both fixed:

- **Pocket edge on the rail:** the pocket region ended with a vertical edge on the bottom rail at s 160. It now extends to `POCKET_S_MAX` = 260, so the END A → rails blend (`ENDA_SINGLE` 115–200) governs the transition alone.
- **Order of operations:** the bottom channel is now combined with the rail depth *before* the END A blend, which removes the small ridge.
- **Cleanup:** the old two-level pocket sweep (`b_`) is disabled when `ENDA_SINGLE` is used.

**Result:** the depth profile is continuous with no steps. The part is rebuilt as a closed solid with 6 clips and saved as V9.

## Blender baseline (V9d geometry unchanged)

The exact `cad/exports/V9/81A807925A_V9.step` was imported through OCC and tessellated as seven separate Blender objects:

- `BODY_81A807925A_V9`;
- `CLIP_C01`, `CLIP_C02`, `CLIP_C03`, `CLIP_C05`, `CLIP_C06`, `CLIP_C07`.

No geometry, dimension or depth was changed. The Blender scene uses millimetres and records the three unmeasured depths as **ASSUMED** (`D_LEDGE` 1.0 mm, `D_RECESS` 3.5 mm, bottom channel 1.6 mm). All seven meshes are closed and manifold, with zero boundary and non-manifold edges.

**Files:** `cad/blender/81A807925A_V9_Blender.blend`, generated by `blender/export_v9_solids.py` and `blender/build_v9_blend.py`.

## V10 (SCARTATA): interpretazione errata della rientranza END A

**Stato: NON VALIDA.** Il controllo visivo dell'utente in Blender ha mostrato che la V10 non assomiglia al pezzo originale. La modifica ha allargato il raccordo **trasversale**, mentre il feedback richiedeva una rampa/rientranza **longitudinale** unica dalla parte sinistra fino alla cavita. La V9 resta quindi la baseline; la V10 non deve essere usata come base per le correzioni successive.

User feedback from the Blender inspection: on the left/wide end, the recess must run on a straight line from the nose to the cavity and must not read as a step.

**Evidence:**

- S1 `925_alB_1`: the crease follows the straight extension of the opening edge and the surface rolls into the recessed plate;
- S3 `925_alA_3`: independent close-up confirming the same continuous inward sweep;
- S4 `925_fre_2`: qualitative confirmation at the opening transition.

No exact-part image contradicts the correction.

**Change:**

- the position of the crease was not moved: it remains the straight, photo-derived extension of the opening edge;
- only the transverse sweep was widened: `RW_POCKET` changed from 2.5 mm to `W_BEAD` = 7.2 mm;
- the maximum END A recess depth remains 3.5 mm and the outer/opening contours, global Z curvature and clips are unchanged;
- the maximum sampled depth-field gradient decreased from 1.7366 to 0.7330 mm/mm, with no gradient jump in the END A check.

`RW_POCKET = W_BEAD` is **ASSUMED** as a metric value because the photos have no scale. The continuous transition, straight path and absence of a step are photo-confirmed by S1 and S3.

**Esito tecnico, non approvazione geometrica:** il file era manifold (un corpo piu le sei clip), ma questo non convalida la forma. Gli artefatti `cad/blender/81A807925A_V10_Blender.blend` e `cad/exports/V10/81A807925A_V10_body.stl` restano solo come registrazione della prova rifiutata.

## V11 candidata: rampa longitudinale uniforme a END A

**Stato: candidata da validare visivamente, non ancora approvata dall'utente.**

La correzione interessa esclusivamente l'andamento della profondità lungo END A:

- ripristinato `RW_POCKET = 2.5 mm` della V9; l'allargamento trasversale V10 è stato eliminato;
- la moltiplicazione longitudinale della rientranza usa ora un profilo lineare, dalla punta fino all'inizio geometrico della cavità, invece di `smoothstep` terminato prima della cavità;
- contorno esterno, apertura, raccordo trasversale, curvatura Z, profondità massima e clip restano invariati.

**Perché:** S1 `925_alB_1` e S3 `925_alA_3` mostrano indipendentemente una sola falda che si approfondisce in modo regolare dalla zona larga fino alla cavità. La V9 concentrava la variazione di profondità nella parte centrale della rampa, mentre la V10 aveva modificato per errore la direzione trasversale.

**Valori ASSUMED invariati:** profondità iniziale 55%, `D_RECESS = 3.5 mm`, `D_LEDGE = 1.0 mm`, canale inferiore 1.6 mm. Il termine della rampa non introduce una nuova quota: è ricavato direttamente dall'inizio della cavità già modellata.

**Controlli:** deviazione massima della faccia rispetto a `SF.zf` 0.0028 mm; salto massimo campionato di `dz/ds` sul fianco inferiore END A 0.0003; corpo e sei clip chiusi, con zero bordi boundary e non-manifold.

**File candidato:** `cad/blender/81A807925A_V11_Blender.blend`; il corpo triangolato è anche in `cad/exports/V11/81A807925A_V11_body.stl`.

### Valutazione OEM della V11

La V11 **non è convalidata come forma finale**. Gli overlay confermano una buona sagoma frontale generale, ma la modifica della rampa sposta la superficie di non più di circa 0.415 mm rispetto alla V9 e non corregge da sola la struttura della falda END A. Le viste oblique e posteriori conservano scarti dell'ordine di 1–3 mm, senza una direzione coerente sufficiente per correggere la curvatura Z.

Analisi completa: `V9_ANALYSIS/V11_OEM_EVALUATION.md`.

### Correzione utente: linguetta interna, non contorno dell'apertura

Nel crop dell'overlay `front_A` sul bordo superiore verso END B, le deviazioni rosse seguono il bordo/ombra di una linguetta che rientra verso l'interno/retro del pezzo. Non rappresentano uno spostamento del contorno dell'apertura.

- la linea frontale dell'apertura resta diritta;
- non va introdotto alcun gradino o tacca nella silhouette;
- la linguetta va aggiunta come superficie/volume interno dello stesso corpo;
- profondità e inclinazione della linguetta restano **ASSUMED**.

Questa indicazione visiva dell'utente sostituisce l'interpretazione automatica locale dell'overlay.

## V12: linguetta interna superiore continua fino al raccordo END A

**Feedback utente:** i due crop dell'overlay `front_A` identificano lo stesso elemento: una linguetta che rientra verso il retro e continua lungo il bordo superiore dell'apertura fino al raccordo arrotondato sul lato END A.

**Errore precedente:** `work/v8_returns2.py` faceva iniziare il ritorno profondo 18 mm dopo il D-end, con il commento `no loose tab`. Questo lasciava un'interruzione rettangolare proprio nella zona indicata dall'utente.

**Modifica:**

- contorno frontale, apertura, pelle V11 e clip sono invariati;
- il ritorno superiore V11 resta invariato sul tratto già esistente;
- è stata aggiunta solo l'estensione posteriore mancante fino al D-end arrotondato;
- l'estensione segue l'anello dell'apertura e quindi nasce dalla tangente del raccordo, senza gradino nella silhouette;
- una sovrapposizione tecnica di 0.5 mm consente l'unione booleana con il ritorno esistente.

**Evidenza:** indicazione diretta dell'utente sui crop di S1 `925_alB_1`; esistenza del ritorno profondo superiore confermata dalle viste posteriori/oblique S3 (`925_pru_1`) e S4 (`925_fre_3`, `925_fre_4`). Nessuna foto esatta mostra un'interruzione della linguetta prima del raccordo.

**Valori ASSUMED invariati:** `T_WALL_OPEN = 1.8 mm`, `D_WALL_OPEN_TOP = 12.0 mm`. Il margine di costruzione `WALL_TOP_START_OFFSET = -5 mm` è solo un'eccedenza booleana completamente ritagliata dall'anello dell'apertura e non è una dimensione del pezzo.

**Validazione:** estensione STEP valida, un solido, volume 393 mm³. Assemblaggio Blender finale: un corpo più le sei clip; corpo con 0 bordi boundary e 0 non-manifold. Il confronto V11/V12 mostra la rimozione dell'interruzione rettangolare e la continuità della linguetta nel raccordo.

**File:** `cad/blender/81A807925A_V12_Blender.blend`, `cad/exports/V12/81A807925A_V12_body.stl`. Render diagnostici: `cad/blender/V11_tongue_check.png` e `cad/blender/V12_tongue_check.png`.

## V13: linguetta interna anche sul bordo inferiore

**Feedback utente:** sotto l'apertura e presente la stessa rientranza interna gia
modellata sul bordo superiore. Nel raccordo arrotondato di END A la linguetta
inferiore non termina isolata: si collega alla falda profonda che proviene dal
naso.

**Modifica:**

- pelle, contorni esterno e dell'apertura, ritorno anteriore, linguetta superiore
  V12 e clip sono invariati (hash STEP identici a V12);
- aggiunta soltanto la profondita posteriore del ritorno inferiore, lungo il bordo
  dell'apertura e fino al D-end;
- il volume segue l'anello dell'apertura e la superficie curva del pezzo, quindi
  il raccordo con END A e continuo e non introduce una tacca nella silhouette;
- il ritorno corto gia esistente resta il collegamento con la faccia visibile.
  La nuova parte si sovrappone ad esso di 0.3 mm e al tratto rettilineo di 0.5 mm
  esclusivamente per rendere robusta l'unione booleana.

**Evidenza:** S1 `925_alB_1` mostra la continuita del bordo inferiore verso la
zona piena di END A; S3 `925_alA_3` conferma indipendentemente che il ritorno e
collegato alla falda profonda del naso; S4 `925_fre_1` e `925_fre_2` conferma la
stessa struttura da una vista obliqua. Nessuna foto esatta contraddice la
continuita. Le ombre non sono state usate per spostare il contorno frontale.

**Valori ASSUMED:** la profondita inferiore riusa `D_WALL_OPEN_TOP = 12.0 mm` e
lo spessore esistente `T_WALL_OPEN = 1.8 mm`, perche le foto non hanno scala e
non consentono una quota indipendente. Restano ASSUMED anche le profondita
frontali 1.0 / 3.5 / 1.6 mm. Le sovrapposizioni booleane non sono quote OEM.

**Validazione:** campo di profondita frontale invariato (massimo 3.499 mm,
gradiente massimo 1.736 mm/mm); nuova linguetta STEP valida, un solido, volume
3998 mm3. Assemblaggio Blender: un corpo piu le sei clip; corpo con 0 bordi
boundary e 0 non-manifold. Il confronto V12/V13 conferma che la linea frontale
inferiore resta diritta mentre il ritorno arretrato prosegue nel raccordo END A.

**File:** `cad/blender/81A807925A_V13_Blender.blend`,
`cad/exports/V13/81A807925A_V13_body.stl`. Render diagnostici:
`cad/blender/V12_bottom_tongue_check.png` e
`cad/blender/V13_bottom_tongue_check.png`.

## V14: END A profondo dalla partenza e linguetta inferiore completa

**Feedback utente:** nella vista Blender annotata in rosso, la falda piena di
END A deve essere piu profonda gia dalla partenza del naso e mantenere tale
profondita fino al raccordo dell'apertura. Da quel raccordo la linguetta
inferiore continua lungo l'intero bordo dell'apertura.

**Modifica:**

- eliminata l'attenuazione longitudinale al 55% presente in V13:
  `RECESS_RAMP_MIN` passa da 0.55 a 1.0;
- non e stata introdotta una nuova profondita massima: tutta la zona centrale
  iniziale usa lo stesso `D_RECESS = 3.5 mm` gia presente presso la cavita;
- il limite della linguetta inferiore passa da `s = 389 mm` alla fine geometrica
  dell'apertura (`s = 458.35 mm` circa);
- contorni esterno e dell'apertura, larghezza del raccordo, curvatura Z e clip
  restano invariati.

**Evidenza:** la direzione e l'estensione sono fornite direttamente dalla
correzione grafica dell'utente. S1 `925_alB_1` e `925_alB_2` e S3
`925_alA_3`/`925_pru_1` mostrano la falda continua fino al D-end; S4
`925_fre_1`-`925_fre_4` conferma indipendentemente il ritorno lungo l'apertura.
Nessuna foto esatta mostra un gradino nel contorno frontale.

**Valori ASSUMED:** `D_RECESS = 3.5 mm`, `D_WALL_OPEN_BOTTOM = 12.0 mm` e
`T_WALL_OPEN = 1.8 mm` restano non misurabili dalle foto. Il margine di 5 mm
oltre la fine dell'apertura e soltanto un'eccedenza booleana completamente
ritagliata e non e una quota OEM.

**Validazione:** profondita massima 3.5000 mm; gradiente massimo 1.7368 mm/mm,
senza nuovo salto rispetto a V13. Solidi OCC validi: pelle 31019 mm3, labbro
7699 mm3, ritorno corto 4773 mm3, linguetta superiore 4008 mm3, linguetta
inferiore 4801 mm3. Assemblaggio Blender: un corpo e sei clip; corpo con 0
bordi boundary e 0 non-manifold.

**File:** `cad/blender/81A807925A_V14_Blender.blend`,
`cad/exports/V14/81A807925A_V14_body.stl`. Controlli:
`cad/blender/V14_user_view_check.png` e
`cad/blender/V14_END_A_depth_field.png`.

## V15: la rientranza e profondita posteriore dei labbri

**Correzione utente:** la linea rossa nelle viste posteriore e laterale non
indica un ulteriore abbassamento della faccia visibile. Indica la profondita
reale del bordo posteriore: labbro superiore e inferiore devono raggiungere lo
stesso piano arretrato e delimitare la zona piena di END A come sull'OEM.

**Errore V14 annullato:** `RECESS_RAMP_MIN` torna da 1.0 a 0.55. La superficie
frontale e quindi nuovamente identica alla V13; non viene piu usata per simulare
la profondita posteriore.

**Modifica:**

- il labbro del perimetro esterno passa dalla profondita 4.0 mm al piano comune
  `D_WALL_OPEN_TOP = 12.0 mm`;
- i labbri superiore e inferiore dell'apertura usano entrambi 12.0 mm;
- entrambi proseguono fino alla fine geometrica dell'apertura (`s = 458.35 mm`
  circa), eliminando il vecchio termine anticipato del labbro superiore a
  `s = 389 mm`;
- la pelle resta sottile e forma il fondo della vasca; contorni, curvatura Z e
  clip restano invariati.

**Evidenza:** indicazione grafica diretta dell'utente. S1 `925_alB_2` mostra il
fondo posteriore delimitato dai ritorni; S3 `925_alA_4` e `925_alA_5` conferma
indipendentemente la continuita dei bordi superiore e inferiore attorno a END A;
S4 `925_fre_4` e `925_fre_5` mostra la stessa struttura e il rapporto con le
clip. Nessuna foto esatta contraddice la continuita del bordo posteriore.

**Valori ASSUMED:** non e stata introdotta una nuova misura. I tre labbri
riusano la profondita esistente di 12.0 mm, gia PHOTO_DERIVED a bassa
identificabilita e non misurabile direttamente dalle foto senza scala.

**Validazione:** campo frontale ripristinato (massimo 3.4990 mm, gradiente
1.7360 mm/mm). Solidi OCC validi: pelle 31017 mm3, labbro esterno 18900 mm3,
ritorno corto 4773 mm3, labbro superiore 5392 mm3, labbro inferiore 4801 mm3.
Assemblaggio Blender: un corpo e sei clip; 0 bordi boundary, 0 non-manifold e
0 vertici isolati. La profondita totale del corpo aumenta di 8.0 mm rispetto a
V14, coerentemente con il passaggio del labbro esterno da 4 a 12 mm.

**File:** `cad/blender/81A807925A_V15_Blender.blend`,
`cad/exports/V15/81A807925A_V15_body.stl`. Confronto laterale:
`cad/blender/V14_rear_depth_check.png` e
`cad/blender/V15_rear_depth_check.png`.

## V16: fronte e retro di END A sulla stessa rampa fino a 12 mm

**Conferma utente:** la profondita al punto 1 resta quella della V15. Da quel
punto la zona A deve approfondirsi continuamente fino al punto 2 e raggiungere
il piano posteriore dei labbri da 12 mm. La profondita deve essere uguale anche
sulla parte frontale: non va creato un riempimento sul solo retro.

**Modifica:**

- eliminato il cuneo/riempimento posteriore della prima prova V16;
- la rampa e ora parte del campo `SF.recess_depth` della faccia visibile;
- `D_RECESS` di END A passa da 3.5 a 12.0 mm, riusando il piano gia presente dei
  labbri;
- il valore iniziale resta esattamente quello V15: il prodotto
  `D_RECESS * RECESS_RAMP_MIN` resta 1.925 mm, quindi
  `RECESS_RAMP_MIN = 1.925 / 12.0`;
- la pelle viene estrusa dalla nuova faccia dello stesso `T_SKIN`: fronte e
  retro hanno la stessa rampa e lo spessore rimane costante;
- labbro esterno, ritorno dell'apertura, linguette superiore/inferiore, contorni,
  curvatura Z e clip restano V15; i quattro STEP riusati hanno hash identico.

**Perche:** la precisazione dell'utente impone una pelle inclinata, non una zona
piena di spessore crescente. S1 `925_alB_2` mostra la falda posteriore continua;
S3 `925_alA_4` e `925_alA_5` conferma indipendentemente il raccordo con il D-end;
S4 `925_fre_4` e `925_fre_5` mostra la stessa continuita da viste oblique.
Nessuna foto esatta mostra un gradino o una separazione tra fronte e retro.

**Valori ASSUMED:** la quota finale riusa `D_WALL_OPEN_TOP = 12.0 mm`, scelta
dall'utente come piano di arrivo ma non misurabile indipendentemente dalle foto
prive di scala. Il precedente massimo frontale ASSUMED di 3.5 mm e sostituito
solo su END A; `D_LEDGE = 1.0 mm`, canale inferiore 1.6 mm e spessore della pelle
restano invariati e ASSUMED.

**Validazione:** campo di profondita campionato 11.9941 mm massimo (12.0 mm nel
parametro). Il gradiente massimo 5.9511 mm/mm e dovuto al raccordo trasversale
esistente applicato alla maggiore profondita, non a un salto. La faccia B-spline
si discosta da `SF.zf` al massimo di 0.0032 mm; salto massimo campionato di
`dz/ds` sul fianco inferiore 0.0020. Pelle OCC valida: un solido, volume
30964 mm3 contro 30946 mm3 attesi da area per spessore. Assemblaggio Blender:
un corpo piu sei clip; 0 bordi boundary, 0 non-manifold, 0 elementi isolati e
una sola componente connessa.

**File:** `cad/blender/81A807925A_V16_Blender.blend`,
`cad/exports/V16/81A807925A_V16_body.stl`. Controlli:
`cad/blender/V16_END_A_depth_field.png`,
`cad/blender/V15_END_A_front_check.png`,
`cad/blender/V16_END_A_front_check.png`,
`cad/blender/V15_END_A_rear_check.png` e
`cad/blender/V16_END_A_rear_check.png`.

## V17: eliminazione del collare al D-end e labbri sulla rampa

**Correzione utente:** il volume evidenziato in blu attorno al raccordo
arrotondato dell'apertura non deve sporgere sopra la falda di END A. Inoltre il
labbro superiore deve arretrare sulla nuova rampa V16 nello stesso modo gia
presente sul labbro inferiore.

**Modifica:**

- faccia, pelle, campo di profondita, contorni, curvatura Z, labbro esterno e
  clip restano identici alla V16;
- il ritorno corto dell'apertura e stato intersecato con la pelle inclinata V16,
  eliminando il collare pieno che emergeva al D-end;
- le linguette superiore e inferiore sono state ritagliate contro la stessa
  rampa: entrambe si assottigliano e arretrano in modo continuo verso END A;
- il loro piano posteriore da 12 mm rimane invariato. Non sono stati aggiunti
  riempimenti, gradini o nuove variazioni del contorno frontale.

**Perche ed evidenza:** la correzione grafica dell'utente identifica
direttamente il volume da rimuovere e richiede la simmetria funzionale dei due
labbri. S1 `925_alB_2` mostra il D-end senza collare sporgente; S3
`925_alA_4` e `925_alA_5` conferma indipendentemente il raccordo continuo dei
labbri con la falda; S4 `925_fre_4` conferma la stessa struttura da un'altra
vista. Nessuna foto esatta mostra un gradino o una sporgenza locale in quella
zona.

**Valori ASSUMED:** nessuna nuova quota OEM. Restano invariati il piano
posteriore dei labbri da 12.0 mm e tutti i valori ASSUMED della V16. La sola
eccedenza introdotta e `RETURN_RAMP_TRIM_OVERLAP = 0.15 mm`, margine tecnico
interno per rendere robusta l'intersezione booleana; non descrive una misura
del pezzo.

**Validazione:** il campo di profondita e identico alla V16: minimo -1.1544 mm,
massimo 11.9941 mm e gradiente massimo 5.9511 mm/mm, senza nuovi salti. I
risultati OCC del ritaglio sono validi: ritorno corto 1904 + 595 + 1178 mm3,
linguetta superiore 4351 + 32 mm3 e linguetta inferiore 4115 mm3. Il frammento
superiore da 32 mm3 appartiene a END B ed e stato conservato per non alterare
una zona fuori dalla correzione richiesta. Assemblaggio Blender: un solo corpo
connesso piu sei clip; corpo con 107043 vertici, 198261 facce, 0 bordi boundary,
0 non-manifold, 0 elementi isolati e una sola componente connessa.

**File:** `cad/blender/81A807925A_V17_Blender.blend`,
`cad/exports/V17/81A807925A_V17_body.stl`. Controlli:
`cad/blender/V17_END_A_depth_field.png`,
`cad/blender/V17_END_A_front_check.png`,
`cad/blender/V17_END_A_rear_check.png` e
`cad/blender/V17_OEM_D_end_contact.png`.

## V18: cavita superiore continua lungo l'apertura

**Correzione utente:** la cavita presente presso il raccordo deve continuare
lungo tutta la linea superiore indicata in rosso, formando lo stesso rientro
longitudinale gia presente sul bordo inferiore.

**Modifica:**

- aggiunto `TOP_CHANNEL`, che riusa integralmente profilo, profondita e
  intervallo longitudinale di `BOTTOM_CHANNEL`;
- la selezione della fascia superiore segue geometricamente il bordo superiore
  dell'apertura, senza una linea o una quota ricavata a occhio;
- il raccordo con END A usa la rampa continua V16/V17 e non introduce gradini;
- labbro esterno, ritorno inferiore, linguetta inferiore, contorni, curvatura Z
  e clip restano V17. Il labbro esterno e la linguetta inferiore sono copie
  byte-identiche dei rispettivi STEP V17 (hash SHA-256 coincidenti);
- soltanto il tratto superiore del ritorno corto e la linguetta superiore sono
  stati rifilati contro la nuova faccia. Il D-end e il tratto inferiore del
  ritorno corto sono rimasti invariati.

**Perche ed evidenza:** la linea rossa dell'utente definisce direttamente la
continuita richiesta. S1 `925_alB_2` mostra la linea superiore continua lungo
l'apertura; S3 `925_alA_4` e `925_alA_5` conferma indipendentemente il rientro
e il collegamento con il raccordo; S4 `925_fre_4` conferma la stessa struttura
da una vista obliqua. Nessuna foto esatta mostra un'interruzione o un gradino
lungo il tratto indicato.

**Valori ASSUMED:** nessuna nuova quota OEM. `TOP_CHANNEL` riusa la tupla
ASSUMED del canale inferiore: profondita 1.6 mm, fascia 1.2 mm, raccordo 3.0 mm
e lo stesso intervallo parametrico longitudinale. Restano invariati il piano
posteriore da 12.0 mm e il margine tecnico booleano di 0.15 mm.

**Validazione:** prima della build il campo `SF.recess_depth` ha dato minimo
-0.1861 mm, massimo 11.9941 mm e gradiente massimo 5.9510 mm/mm, senza aumento
rispetto alla V17. Pelle OCC valida: un solido, volume 30949 mm3. Parti finali:
ritorno superiore 1405 mm3, raccordo D-end invariato 595 mm3, ritorno inferiore
invariato 1178 mm3; linguetta superiore 3796 + 32 mm3 e linguetta inferiore
V17 invariata 4115 mm3. Assemblaggio Blender: un solo corpo connesso piu sei
clip; corpo con 124097 vertici, 231748 facce, 0 bordi boundary, 0 non-manifold,
0 elementi isolati e una sola componente connessa.

**File:** `cad/blender/81A807925A_V18_Blender.blend`,
`cad/exports/V18/81A807925A_V18_body.stl`. Controlli:
`cad/blender/V18_END_A_depth_field.png` e
`cad/blender/V18_upper_channel_user_view.png`.

**Contesto di montaggio aggiuntivo (26 ottobre 2026):** due viste del gruppo
completo inviate dall'utente, una con la cornice argento montata e una della
ricevente nera senza cornice, confermano che il modello V18 rappresenta
esclusivamente l'inserto argento. La faccia resta visibile all'esterno, mentre
ritorni, linguette e clip entrano nella sede nera. Queste immagini sono state
usate soltanto per verificare identita, orientamento e funzione d'incastro del
pezzo: non hanno scala e la ricevente non e stata usata come fonte di quote.

## Verifica online delle clip V18 (26 ottobre 2026)

**Fonti esatte controllate:** inserzioni dell'esatto `81A807925A` su Allegro
(esemplare Spawplast, viste posteriori e dettaglio END A), KRIK (secondo
esemplare indipendente, viste posteriori) e RRR/Ovoko. Il gruppo
`81A807671 4W3` e la ricevente `81A807681A` sono stati consultati soltanto come
contesto di montaggio, non come fonte dimensionale.

**Esito:** entrambi gli esemplari posteriori leggibili confermano sei clip:
tre sul bordo superiore e tre sul bordo inferiore. Confermano anche l'ordine
relativo gia modellato: C01-C02 quasi simmetriche, C03 a rampa e famiglia
inferiore C05-C07 a rampa, con C05 piu lunga. Nessuna vista dell'esatto pezzo
mostra la vecchia C04; resta quindi correttamente assente. Le posizioni
relative della V18 non sono contraddette dalle nuove viste.

**Decisione:** nessuna modifica geometrica e nessuna V19. Le foto online non
hanno scala ne una proiezione calibrabile, quindi non giustificano variazioni
metriche rispetto alle posizioni gia ricavate da S1 e S3. Restano **ASSUMED /
PROTOTYPE** lo spessore delle linguette, l'altezza, la dimensione delle asole,
l'inclinazione e il gioco reale con la ricevente; questi valori vanno chiusi
con una prova fisica o una misura diretta del pezzo OEM.

**Controllo Blender:** `cad/blender/V18_clip_audit_rear.png`; bounding box e
orientamento sono stati letti direttamente dai sei oggetti
`CLIP_C01`, `CLIP_C02`, `CLIP_C03`, `CLIP_C05`, `CLIP_C06`, `CLIP_C07` della
V18. Il controllo non ha modificato il file `.blend`.
