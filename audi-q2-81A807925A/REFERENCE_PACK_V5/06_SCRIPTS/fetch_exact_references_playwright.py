#!/usr/bin/env python3
"""
Fetch candidate reference images and full-page captures from verified source pages.

Install:
  pip install playwright pillow
  playwright install chromium

Run:
  python fetch_exact_references_playwright.py

The script saves candidates. HUMAN/Claude review is mandatory:
keep only images actually depicting the exact OEM target / explicitly labelled receiver / exact assembly.
"""
from pathlib import Path
from urllib.parse import urlparse
import asyncio, hashlib, re

from PIL import Image
from io import BytesIO
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[1]
TARGET_OUT = ROOT / "03_EXACT_OEM_REFERENCES" / "downloaded"
MATING_OUT = ROOT / "04_RECEIVER_ASSEMBLY_REFERENCES" / "downloaded"
TARGET_OUT.mkdir(parents=True, exist_ok=True)
MATING_OUT.mkdir(parents=True, exist_ok=True)

SOURCES = [
    ("TARGET_RRR", "target", "https://rrr.lt/en/used-part/ccm44-81a807925a-audi-q2-front-bumper-lower-grill"),
    ("TARGET_ALLEGRO_A", "target", "https://allegro.pl/produkt/boczna-ramka-mocowania-kratki-zderzaka-audi-q2-81a807925a-11269-dfd2b832-ae43-471e-8a01-72a92f3a7a13"),
    ("TARGET_ALLEGRO_B", "target", "https://allegro.pl/produkt/audi-q2-kratka-zderzaka-przod-lewa-81a807925a-43cc0bb3-977e-4ff2-a1af-c72c3f13effb"),
    ("TARGET_MARKTPLAATS", "target", "https://www.marktplaats.nl/v/auto-onderdelen/carrosserie-en-plaatwerk/m2320491364-audi-q2-81a-bumper-rooster-lijst-links-zilver-voorbumper"),
    ("RECEIVER_RRR", "mating", "https://rrr.lt/en/used-part/cpp5934-81a807681a-audi-q2-front-bumper-lower-grill"),
    ("RECEIVER_SERBIA", "mating", "https://www.polovniautomobili.com/auto-delovi/22397355/resetka-branika-za-audi-q2"),
    ("ASSEMBLY_OEM", "mating", "https://www.oemvwshop.de/81a807671-4w3-air-guide-grille-anthracite-selenite-silver-audi-q2-81-p1450100/"),
    ("ASSEMBLY_EBAY", "mating", "https://www.ebay.com/itm/353945262522"),
]

async def save_candidate(context, url, out_dir, prefix, i):
    try:
        r = await context.request.get(url, timeout=30000)
        if not r.ok:
            return None
        data = await r.body()
        if len(data) < 8000:
            return None
        try:
            im = Image.open(BytesIO(data))
            w,h = im.size
            if w < 450 or h < 250:
                return None
            ext = (im.format or "JPEG").lower()
            if ext == "jpeg": ext = "jpg"
        except Exception:
            return None
        digest = hashlib.sha1(data).hexdigest()[:10]
        p = out_dir / f"{prefix}_{i:03d}_{w}x{h}_{digest}.{ext}"
        p.write_bytes(data)
        return p
    except Exception:
        return None

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1600, "height": 1200},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36"
        )
        log=[]
        for prefix, kind, url in SOURCES:
            out = TARGET_OUT if kind == "target" else MATING_OUT
            page = await context.new_page()
            try:
                await page.goto(url, wait_until="domcontentloaded", timeout=60000)
                # scroll to trigger lazy images
                for _ in range(8):
                    await page.mouse.wheel(0, 1200)
                    await page.wait_for_timeout(400)
                await page.screenshot(path=str(out/f"{prefix}_FULLPAGE.png"), full_page=True)

                urls = await page.evaluate("""() => {
                    const u = new Set();
                    document.querySelectorAll('img').forEach(img => {
                        [img.currentSrc, img.src, img.dataset?.src, img.dataset?.original, img.dataset?.lazySrc]
                          .filter(Boolean).forEach(x=>u.add(x));
                        const ss = img.srcset || img.dataset?.srcset;
                        if (ss) ss.split(',').forEach(s=>u.add(s.trim().split(/\\s+/)[0]));
                    });
                    document.querySelectorAll('source[srcset]').forEach(s =>
                        s.srcset.split(',').forEach(x=>u.add(x.trim().split(/\\s+/)[0]))
                    );
                    document.querySelectorAll('meta[property="og:image"],meta[name="twitter:image"]').forEach(m=>{
                        if(m.content) u.add(m.content);
                    });
                    return [...u];
                }""")
                saved=0
                for i, u in enumerate(urls):
                    if not u or u.startswith("data:"):
                        continue
                    if u.startswith("//"):
                        u = "https:" + u
                    elif u.startswith("/"):
                        pr=urlparse(url)
                        u=f"{pr.scheme}://{pr.netloc}{u}"
                    sp=await save_candidate(context,u,out,prefix,i)
                    if sp:
                        saved += 1
                        log.append(f"{prefix}\t{sp.name}\t{u}")
                print(prefix, "saved", saved)
            except Exception as e:
                log.append(f"{prefix}\tERROR\t{e}")
            finally:
                await page.close()
        (ROOT/"REFERENCE_DOWNLOAD_LOG.tsv").write_text("\n".join(log),encoding="utf-8")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
