"""Esporta le tavole della configurazione iniziale caricata dal modello locale."""
from pathlib import Path
import argparse
import json

from playwright.sync_api import sync_playwright


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url', default='http://127.0.0.1:8765/cornice-fendinebbia.html')
    parser.add_argument('--output', type=Path, default=Path(__file__).resolve().parent)
    args = parser.parse_args()
    out = args.output.resolve()
    out.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True,
                                    args=['--enable-webgl', '--use-angle=swiftshader'])
        page = browser.new_page(viewport={'width': 1500, 'height': 1000})
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(args.url, wait_until='networkidle')
        page.wait_for_function('typeof window.getDimensionSnapshot === "function"')
        snapshot = page.evaluate('window.getDimensionSnapshot()')
        html = page.evaluate('window.getQuotationHtml()')
        (out / 'listello-quote.json').write_text(json.dumps(snapshot, ensure_ascii=False, indent=2), encoding='utf-8')
        (out / 'listello-quotato.html').write_text(html, encoding='utf-8')
        with page.expect_popup() as popup:
            page.click('#b-dimensions')
        report = popup.value
        report.on('pageerror', lambda error: errors.append(str(error)))
        report.wait_for_function('typeof window.quotationCsv === "function"')
        # Conserva il CRLF prodotto dal browser senza una seconda conversione Windows.
        (out / 'listello-quote.csv').write_bytes(report.evaluate('window.quotationCsv()').encode('utf-8'))
        drawings = report.locator('svg').evaluate_all(
            '(els)=>els.map(el=>({id:el.id,svg:new XMLSerializer().serializeToString(el)}))')
        for drawing in drawings:
            (out / (drawing['id'] + '.svg')).write_text(drawing['svg'], encoding='utf-8')
        report.pdf(path=str(out / 'listello-quotato.pdf'), print_background=True, prefer_css_page_size=True)
        report.screenshot(path=str(out / 'anteprima-quotatura.png'), full_page=True)
        count = report.locator('.page').count()
        browser.close()
        if errors:
            raise RuntimeError('\n'.join(errors))
    try:
        import pymupdf
    except ImportError:
        pass
    else:
        pdf = pymupdf.open(out / 'listello-quotato.pdf')
        if len(pdf) != count:
            raise RuntimeError(f'Impaginazione PDF inattesa: {len(pdf)} pagine, {count} tavole.')
        for i, sheet in enumerate(pdf):
            if f'Tavola {i + 1}/{count}' not in sheet.get_text():
                raise RuntimeError(f'Cartiglio assente nella tavola {i + 1}.')
            sheet.get_pixmap().save(str(out / f'tavola-{i + 1}.png'))
    print(f'Esportate {count} tavole, {len(drawings)} SVG, PDF, HTML, CSV e JSON in {out}')


if __name__ == '__main__':
    main()
