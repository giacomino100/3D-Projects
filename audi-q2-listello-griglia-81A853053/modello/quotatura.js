// Tavole del modello corrente. Nessuna misura reale/OEM viene dedotta dalla scala.
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const n = (value, decimals = 1) => Number(value).toLocaleString('it-IT', { maximumFractionDigits: decimals, minimumFractionDigits: 0 });
const f = value => Number(value).toFixed(3);
const extent = points => ({ min: [0, 1].map(k => Math.min(...points.map(p => p[k]))), max: [0, 1].map(k => Math.max(...points.map(p => p[k]))) });
const path = (pts, closed = false) => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])},${f(p[1])}`).join(' ') + (closed ? ' Z' : '');
const text = (x, y, value, extra = '') => `<text x="${f(x)}" y="${f(y)}" ${extra}>${esc(value)}</text>`;
const line = (x1, y1, x2, y2, cls = 'extension') => `<line class="${cls}" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"/>`;
const svgStyle = `<style>text{font:3.1px Arial,sans-serif;fill:#17212b;text-anchor:middle;paint-order:stroke;stroke:white;stroke-width:.9px;stroke-linejoin:round}path,line,rect,circle{vector-effect:non-scaling-stroke}.outline{fill:#e8edf0;stroke:#17212b;stroke-width:1.1}.hole{fill:white;stroke:#17212b;stroke-width:1}.internal{fill:none;stroke:#067b83;stroke-width:1}.extension{stroke:#94a3b8;stroke-width:.7}.dim{stroke:#ae3d12;stroke-width:.8;marker-start:url(#arrow);marker-end:url(#arrow)}.clip{fill:#cbd5e1;stroke:#334155;stroke-width:.8}.datum{fill:#ae3d12;stroke:none}.center{stroke:#94a3b8;stroke-width:.7;stroke-dasharray:4 2}.small{font-size:2.6px}.label{font-weight:bold;fill:#ae3d12}.section{fill:#e8edf0;stroke:#17212b;stroke-width:1}</style>`;
function svg(id, viewBox, body, title) {
  const font = id.startsWith('clip-family') ? 1.25 : id.startsWith('section-') ? 1.5 : 3.1;
  const typography = `<style>#${id} text{font-size:${font}px;stroke-width:${font * 0.29}px}#${id} .small{font-size:${font * 0.84}px}</style>`;
  const scoped = svgStyle.slice(7, -8).replace(/([^{}]+)\{/g, (_, selectors) => selectors.split(',').map(selector => `#${id} ${selector.trim()}`).join(',') + '{').replaceAll('url(#arrow)', `url(#arrow-${id})`);
  return `<svg id="${id}" xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title><style>${scoped}</style>${typography}<defs><marker id="arrow-${id}" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto-start-reverse" markerUnits="strokeWidth"><path d="M5 0 L0 2.5 L5 5" fill="none" stroke="#ae3d12" stroke-width=".8"/></marker></defs>${body}</svg>`;
}
function dimX(x1, x2, y, anchor1, anchor2, label) {
  return line(x1, anchor1, x1, y + 1) + line(x2, anchor2, x2, y + 1) + line(x1, y, x2, y, 'dim') + text((x1 + x2) / 2, y - 1.8, label);
}
function dimY(y1, y2, x, anchor1, anchor2, label) {
  return line(anchor1, y1, x + 1, y1) + line(anchor2, y2, x + 1, y2) + line(x, y1, x, y2, 'dim') + text(x + 3.5, (y1 + y2) / 2, label, `transform="rotate(-90 ${f(x + 3.5)} ${f((y1 + y2) / 2)})"`);
}
const table = (headers, rows, cls = '') => `<table class="${cls}"><thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(v => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
const pill = value => `<span class="pill">${esc(value)}</span>`;

function flatDrawing(s, rear) {
  const outer = s.flat.outer.map(([x, y]) => [x, -y]), hole = s.flat.hole.map(([x, y]) => [x, -y]);
  const ob = extent(s.flat.outer), hb = extent(s.flat.hole);
  let body = `<path class="outline" d="${path(outer, true)}"/><path class="hole" d="${path(hole, true)}"/>`;
  const labels = [['A', 0, 36.01], ['B', 52, 20], ['C', 220, 40.3], ['D', 220, 0.6], ['E', 101, 24], ['F', 235, 20], ['G', 360, 33.57], ['I', 22, 10]];
  body += labels.map(([id, x, y]) => text(x, -y - 2, id, 'class="label"')).join('');
  if (!rear) {
    body += dimX(ob.min[0], ob.max[0], 17, -ob.min[1], -33.57, `${n(ob.max[0] - ob.min[0])} · riferimento X`);
    body += dimY(-ob.max[1], -ob.min[1], 377, 235, 55, `${n(ob.max[1] - ob.min[1])} · ingombro piano`);
    body += dimX(hb.min[0], hb.max[0], -56, -25, -28, `${n(hb.max[0] - hb.min[0])} · apertura X`);
    body += dimY(-hb.max[1], -hb.min[1], 267, 258, 258, `${n(hb.max[1] - hb.min[1])} · apertura Y`);
    body += text(310, -65, 'Quote della geometria prima dell’avvolgimento', 'class="small"');
  } else {
    const band = s.flat.bandPath.map(([x, y]) => [x, -y]);
    body += `<path class="internal" d="${path(band)}"/>`;
    for (const c of s.clips) {
      body += `<rect class="clip" x="${f(c.x - c.base / 2)}" y="${f(-c.y - c.thickness / 2)}" width="${c.base}" height="${c.thickness}"/>`;
      body += text(c.x, c.family === 'C' ? -45 : 9, `clip ${c.id}`, 'class="label"');
      body += line(c.x, -c.y - 3, c.x, -c.y + 3, 'center');
    }
    const chains = [[0, 41, 116, 224, 360], [0, 82, 164, 221, 360]];
    chains.forEach((chain, row) => {
      for (let i = 0; i < chain.length - 1; i++) body += dimX(chain[i], chain[i + 1], row ? 25 : -61, row ? 3 : -42, row ? 3 : -42, n(chain[i + 1] - chain[i]));
    });
    body += text(310, -48, 'Arresto della cornice interna');
    body += dimX(0, 310, -73, -36.01, -36.5, '310 · X da A');
  }
  return svg(rear ? 'rear-reference' : 'front-reference', '-25 -81 425 118', body, rear ? 'Posizioni clip e arresto interno, riferimento piano' : 'Quotatura del contorno di riferimento');
}

function posedDrawing(s, axes, id, title) {
  const project = p => [p[axes[0]], -p[axes[1]]];
  const outer = s.posed.outer.map(project), hole = s.posed.hole.map(project);
  const min = [s.posed.bounds.min[axes[0]], -s.posed.bounds.max[axes[1]]];
  const max = [s.posed.bounds.max[axes[0]], -s.posed.bounds.min[axes[1]]];
  const w = max[0] - min[0], h = max[1] - min[1];
  let body = `<path class="outline" d="${path(outer, true)}"/><path class="hole" d="${path(hole, true)}"/>`;
  for (const key of ['root', 'floor']) body += `<path class="internal" d="${path(s.posed.bandRows.map(row => project(row[key])))}"/>`;
  for (const c of s.clips) {
    const name = axes.join('') === '01' ? 'xy' : axes.join('') === '02' ? 'xz' : 'yz';
    body += `<path class="clip" d="${path(c.projections[name].map(([x, y]) => [x, -y]), true)}"/>`;
  }
  body += dimX(min[0], max[0], max[1] + 12, max[1], max[1], `${n(w)} mm`);
  body += dimY(min[1], max[1], max[0] + 13, max[0], max[0], `${n(h)} mm`);
  body += text(min[0] + w / 2, min[1] - 9, title, 'class="label"');
  return svg(id, `${min[0] - 13} ${min[1] - 16} ${w + 44} ${h + 47}`, body, title);
}

function clipDetail(c, id) {
  const b = c.base, t = c.top, h = c.height, r = c.cornerRadius;
  const wx = b / 2 - t + 1.4, wy = -h + 1.3;
  let body = `<path class="outline" d="M${-b / 2},0 L${b / 2},0 L${b / 2},${-h + r} Q${b / 2},${-h} ${b / 2 - r},${-h} L${b / 2 - t + r},${-h} Q${b / 2 - t},${-h} ${b / 2 - t - r * 0.6},${-h + r * 0.8} Z"/>`;
  body += `<rect class="hole" x="${wx}" y="${wy}" width="${c.windowWidth}" height="${c.windowHeight}"/>`;
  body += dimX(-b / 2, b / 2, 3.6, 0, 0, n(b));
  body += dimY(-h, 0, b / 2 + 4, b / 2, b / 2, n(h));
  body += dimX(b / 2 - t, b / 2, -h - 3, -h, -h, `${n(t)} · testa`);
  body += text(0, -h - 8, `Famiglia ${c.family} · clip ${c.family === 'C' ? '2–3–4' : '5–6–7'}`, 'class="label"');
  body += text(0, 8, `Apertura nominale ${n(c.windowWidth)} × ${n(c.windowHeight)} mm`, 'class="small"');
  body += text(0, 11.5, `Spessore ${n(c.thickness)} · rinforzo ${n(c.rimWidth)} / ${n(c.rimDepth)} mm`, 'class="small"');
  return svg(id, `${-b / 2 - 4} ${-h - 12} ${b + 14} ${h + 28}`, body, `Quote clip famiglia ${c.family}`);
}

function sectionDrawing(section, id) {
  let body = '';
  const points = [];
  for (const run of section.runs) {
    const front = run.map(([y, z]) => [y, -z]);
    const back = [...run].reverse().map(([y, , z]) => [y, -z]);
    points.push(...front, ...back);
    body += `<path class="section" d="${path(front.concat(back), true)}"/>`;
  }
  const bb = extent(points);
  body += dimX(bb.min[0], bb.max[0], bb.max[1] + 4, bb.max[1], bb.max[1], `${n(bb.max[0] - bb.min[0])} mm · Y`);
  body += dimY(bb.min[1], bb.max[1], bb.max[0] + 5, bb.max[0], bb.max[0], `${n(bb.max[1] - bb.min[1])} mm`);
  body += text((bb.min[0] + bb.max[0]) / 2, bb.min[1] - 4, `Sezione locale X = ${n(section.x)} mm`, 'class="label"');
  return svg(id, `${bb.min[0] - 3} ${bb.min[1] - 9} ${bb.max[0] - bb.min[0] + 19} ${bb.max[1] - bb.min[1] + 22}`, body, `Sezione locale a X ${section.x}`);
}

function sheet(index, title, subtitle, body) {
  return `<section class="page" id="tavola-${index}"><header><div class="kicker">AUDI Q2 · LISTELLO GRIGLIA · QUOTATURA DEL MODELLO</div><h1>${esc(title)}</h1><p>${esc(subtitle)}</p></header>${body}<footer><strong>SCALA IPOTIZZATA · A–G = 360 mm</strong><span>Quote in mm salvo diversa indicazione · non rilevate sul pezzo</span><span>Tavola ${index}/5</span></footer></section>`;
}

export function buildDimensionReport(s) {
  const settings = `Cornice ${n(s.settings.frame)}° · cavità ${n(s.settings.cavity)}° · rampa ${n(s.settings.ramp)} mm · sopra ${n(s.settings.top)}° · sotto ${n(s.settings.bottom)}°`;
  const bb = s.posed.bounds;
  const sourceRows = s.parameters.map(([id, label, value, unit]) => [id, label, n(value, 2), unit]);
  const half = Math.ceil(sourceRows.length / 2);
  const clipRows = s.clips.map(c => [c.id, c.family, n(c.x), n(c.y), n(c.zBase), n(c.base), n(c.top), n(c.height), n(c.thickness), `${n(c.windowWidth)} × ${n(c.windowHeight)}`]);
  const controls = (pts, prefix) => table(['ID', 'X', 'Y'], pts.map(([x, y], i) => [`${prefix}${String(i + 1).padStart(2, '0')}`, n(x, 2), n(y, 2)]), 'coordinates');
  const data = JSON.stringify(s).replace(/</g, '\u003c');
  const pages = [
    sheet(1, 'Ingombri, apertura e posizioni', 'Riferimento piano prima degli avvolgimenti. X parte da A; Y = 0 è il riferimento inferiore del modello.',
      `<div class="warning">${esc(s.scaleNote)} L’altezza nominale H e gli ingombri misurati sulla spline possono differire leggermente.</div><h2>Contorno e finestra attuali</h2><div class="drawing flat">${flatDrawing(s, false)}</div><h2>Clip 2–7 · quote concatenate lungo X</h2><div class="drawing flat">${flatDrawing(s, true)}</div><div class="note">Le clip sono riportate con la loro impronta; le quote sono riferite agli assi di ancoraggio, non alle etichette grafiche. L’aletta 8 è stata rimossa. La linea azzurra mostra la cornice interna, interrotta a X = 310 mm.</div>`),
    sheet(2, 'Proiezioni della configurazione attuale', settings,
      `<div class="drawing posed-front">${posedDrawing(s, [0, 1], 'posed-front', 'Vista XY · ingombro con clip')}</div><div class="two projections"><div>${posedDrawing(s, [0, 2], 'posed-profile', 'Vista XZ · profondità con clip')}</div><div>${posedDrawing(s, [1, 2], 'posed-end', 'Vista YZ · estremità')}</div></div>${table(['Ingombro geometrico', 'X', 'Y', 'Z'], [['Modello avvolto, incluse clip', ...bb.size.map(v => `${n(v)} mm`)]])}<p class="note">Proiezioni ortogonali della geometria deforme, senza le rotazioni della camera o l’appoggio sul piano. X/Y sono centrati nel riferimento locale del modello. Le clip sono rappresentate con sagome di proiezione; le aperture sono quotate nella tavola 3. La quota X avvolta è diversa dal riferimento piano di 360 mm.</p>`),
    sheet(3, 'Clip e asole', 'Due famiglie parametriche; dimensioni nominali del profilo prima di smussi e rinforzi.',
      `<div class="two clip-details"><div>${clipDetail(s.clips[0], 'clip-family-C')}</div><div>${clipDetail(s.clips[3], 'clip-family-D')}</div></div>${table(['Clip', 'Fam.', 'X asse', 'Y asse', 'Z base', 'Base', 'Testa', 'Altezza', 'Spess.', 'Apertura'], clipRows)}<div class="two"><div>${table(['Dettaglio comune', 'Quota nominale'], [['Raggio profilo', '0,8 mm'], ['Smusso estrusione', '0,25 mm'], ['Bordino attorno all’apertura', '1 mm'], ['Sporgenza del rinforzo', '0,6 mm'], ['Luce verticale nominale', '2,3 mm']])}</div><div class="note"><h2>Riferimenti delle posizioni</h2><p>X/Y sono gli assi geometrici del generatore. Z base = −2,5 mm prima della rampa e degli avvolgimenti. Le forme seguono la deformazione del corpo.</p><p>Le quote della finestra sono nominali del profilo: gli smussi modificano le sezioni locali. Dimensioni e accoppiamento delle clip restano da verificare sul pezzo e sul supporto.</p></div></div>`),
    sheet(4, 'Sezioni e parametri completi', settings,
      `<div class="two section-details">${s.sections.map((section, i) => `<div>${sectionDrawing(section, `section-${i}`)}</div>`).join('')}</div><p class="note">Sezioni del guscio visibile e della superficie posteriore, nel riferimento locale prima dell’avvolgimento globale. A X = 60 si legge la rampa B; a X = 220 le sezioni convesse C/D. Le pareti della cavità e le clip non sono tagliate in queste sezioni e sono descritte dalle quote sotto e nella tavola 3.</p><div class="two parameter-tables">${table(['ID', 'Parametro', 'Valore', 'Unità'], sourceRows.slice(0, half))}${table(['ID', 'Parametro', 'Valore', 'Unità'], sourceRows.slice(half))}</div><div class="note">Il guscio ha spessore variabile dato dalla faccia convessa e dall’offset posteriore di 0,4 mm: non va interpretato come una lamina uniforme. Legge cornice: θ = angolo · (0,4t + 0,6t²), t = X/360. Legge cavità: θ = angolo · [(X−123)/(360−123)]², troncata a zero prima di X = 123; profondità aggiunta = 25 · sin(θ). Le inclinazioni sono misurate rispetto alla direzione di profondità. Nessuna tolleranza di accoppiamento è stata assegnata.</div>`),
    sheet(5, 'Coordinate del profilo e verifica sul pezzo', 'Punti di controllo in mm, prima dell’interpolazione e dell’inset interno di 2 mm.',
      `<div class="two coordinate-tables"><div><h2>Contorno esterno</h2>${controls(s.flat.outerControls, 'O')}</div><div><h2>Finestra: punti sorgente</h2>${controls(s.flat.holeControls, 'F')}<div class="note"><p>Il contorno effettivo è una spline ricampionata. I tratti rettilinei C/D sono corretti dal generatore; la finestra è poi ridotta lungo la normale di 2 mm. Questi punti sorgente non sostituiscono le coordinate effettive esportate nel JSON/CSV.</p><h2>Misure ancora necessarie</h2><p>Lunghezza reale A–G; altezze e sezioni C/D; profondità e inclinazioni; quote delle sei clip e delle sedi riceventi. La quotatura descrive il modello attuale e non certifica la conformità al ricambio originale.</p></div></div></div>`),
  ].join('');
  return `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Quotatura listello Audi Q2</title><style>
*{box-sizing:border-box}body{margin:0;background:#dce1e5;color:#17212b;font:13px Arial,sans-serif}.toolbar{position:sticky;top:0;padding:12px;background:#17212b;color:white;z-index:5;display:flex;flex-wrap:wrap;gap:8px;align-items:center}.toolbar button,.toolbar a{font:inherit;padding:8px 12px;border:0;border-radius:4px;background:white;color:#17212b;cursor:pointer;text-decoration:none}.toolbar span{margin-right:auto}.page{width:1120px;min-height:790px;margin:20px auto;padding:25px 30px;background:white;position:relative;page-break-after:always;display:flex;flex-direction:column;gap:8px}header{border-bottom:2px solid #17212b;padding-bottom:9px}h1{font-size:25px;margin:4px 0}h2{font-size:14px;margin:5px 0}.kicker{font-size:10px;letter-spacing:1.8px;color:#ae3d12}p{margin:4px 0;line-height:1.4}.warning{border-left:4px solid #ae3d12;padding:8px 11px;background:#fff4eb;font-size:12px}.note{font-size:11px;line-height:1.45;color:#475569}.drawing svg,.two svg{display:block;width:100%;height:100%}.flat{height:210px}.posed-front{height:215px}.two{display:grid;grid-template-columns:1fr 1fr;gap:24px}.projections{height:230px;grid-template-columns:2fr 1fr}.clip-details{height:310px}.clip-details,.section-details,.projections{grid-template-rows:minmax(0,1fr)}.clip-details>div,.section-details>div,.projections>div{min-width:0;min-height:0;height:100%;overflow:hidden}.section-details{height:210px}table{width:100%;border-collapse:collapse;font-size:11px}th,td{border-bottom:1px solid #d8e0e5;padding:6px 7px;text-align:left;vertical-align:top}th{background:#edf1f4;font-weight:600}td:first-child{font-weight:600}.parameter-tables td,.parameter-tables th{padding:5px;font-size:10px}.coordinates td,.coordinates th{padding:4px 8px}.coordinates td:not(:first-child){font-variant-numeric:tabular-nums}footer{margin-top:auto;padding-top:10px;border-top:1px solid #cbd5e1;display:flex;justify-content:space-between;gap:12px;font-size:9px;color:#475569}footer strong{color:#ae3d12}.pill{padding:3px;background:#edf1f4}@media(max-width:1120px){.page{margin:12px;width:calc(100% - 24px);min-width:740px}.toolbar{position:relative}}@page{size:A3 landscape;margin:10mm}@media print{body{background:white;font-size:10pt}.toolbar{display:none}.page{width:auto;min-width:0;height:277mm;min-height:0;margin:0;padding:4mm 2mm;break-after:page;page-break-after:always;gap:2mm;overflow:hidden}.page:last-of-type{break-after:auto;page-break-after:auto}header h1{font-size:19pt}.flat{height:76mm}.posed-front{height:75mm}.projections{height:82mm}.clip-details{height:100mm}.section-details{height:67mm}th,td{padding:1.5mm 2mm}.parameter-tables td,.parameter-tables th{font-size:8pt;padding:1.3mm}.coordinates td,.coordinates th{padding:1.2mm 2mm}.note{font-size:8pt}footer{font-size:7pt}svg{break-inside:avoid}}
</style></head><body><nav class="toolbar"><span>Quote della configurazione corrente · scala da confermare</span><button onclick="window.print()">Stampa / Salva PDF</button><button id="download-csv">Scarica CSV</button><button id="download-json">Scarica JSON</button><button id="download-svg">Scarica tavole SVG</button></nav>${pages}<script type="application/json" id="dimension-data">${data}</script><script>
const snapshot=JSON.parse(document.getElementById('dimension-data').textContent);
function download(name,content,type){const a=document.createElement('a'),u=URL.createObjectURL(new Blob([content],{type}));a.href=u;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000);}
document.getElementById('download-json').onclick=()=>download('listello-quote.json',JSON.stringify(snapshot,null,2),'application/json');
function csvContent(){const rows=[['tipo','id','descrizione','X_o_valore','Y','Z','unita'],['NOTA','','Scala ipotizzata A-G = 360 mm; non quote OEM','','','','']];for(const [id,label,value,unit]of snapshot.parameters)rows.push(['parametro',id,label,value,'','',unit]);for(const c of snapshot.clips){rows.push(['clip',c.id,'asse ancoraggio prima della deformazione',c.x,c.y,c.zBase,'mm']);for(const key of ['base','top','height','thickness','windowWidth','windowHeight'])rows.push(['clip_quota',c.id,key,c[key],'','','mm']);}for(const [kind,points]of [['esterno',snapshot.flat.outer],['finestra',snapshot.flat.hole]])points.forEach((p,i)=>rows.push([kind,i+1,'contorno effettivo piano',p[0],p[1],0,'mm']));return String.fromCharCode(65279)+rows.map(r=>r.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(';')).join(String.fromCharCode(13,10));}
window.quotationCsv=csvContent;
document.getElementById('download-csv').onclick=()=>download('listello-quote.csv',csvContent(),'text/csv;charset=utf-8');
document.getElementById('download-svg').onclick=()=>{const ns='http://www.w3.org/2000/svg',root=document.createElementNS(ns,'svg'),items=[...document.querySelectorAll('svg')];root.setAttribute('xmlns',ns);root.setAttribute('viewBox','0 0 1120 '+items.length*400);items.forEach((el,i)=>{const clone=el.cloneNode(true);clone.setAttribute('x','0');clone.setAttribute('y',String(i*400));clone.setAttribute('width','1120');clone.setAttribute('height','380');root.append(clone);});download('listello-tavole.svg',new XMLSerializer().serializeToString(root),'image/svg+xml');};
</script></body></html>`;
}
