#!/usr/bin/env python3
"""
Download candidate reference images from verified exact-target web pages.
Run on a normal internet-connected PC/Claude Code environment.

Dependencies:
  pip install requests beautifulsoup4 pillow

This intentionally downloads CANDIDATES. Review manually and keep only exact-target images.
"""

from pathlib import Path
from urllib.parse import urljoin, urlparse
import hashlib, io, re, time

import requests
from bs4 import BeautifulSoup
from PIL import Image

OUT = Path(__file__).resolve().parents[1] / "web_references" / "exact_target"
OUT.mkdir(parents=True, exist_ok=True)

SOURCES = {
    "RRR": "https://rrr.lt/en/used-part/ccm44-81a807925a-audi-q2-front-bumper-lower-grill",
    "ALLEGRO_SPAWPLAST": "https://allegro.pl/produkt/boczna-ramka-mocowania-kratki-zderzaka-audi-q2-81a807925a-11269-dfd2b832-ae43-471e-8a01-72a92f3a7a13",
    "ALLEGRO_LEOB": "https://allegro.pl/produkt/audi-q2-kratka-zderzaka-przod-lewa-81a807925a-43cc0bb3-977e-4ff2-a1af-c72c3f13effb?fromInactiveOffer=archived",
    "MARKTPLAATS": "https://www.marktplaats.nl/v/auto-onderdelen/carrosserie-en-plaatwerk/m2320491364-audi-q2-81a-bumper-rooster-lijst-links-zilver-voorbumper",
    "KRIK": "https://krik.bg/products/audi-q2-16-21-reshetka-lajsna-bronya-predna-lyava-3ddbf8e8d",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36"
}

def get_img_urls(page_url):
    r = requests.get(page_url, headers=HEADERS, timeout=30)
    r.raise_for_status()
    soup = BeautifulSoup(r.text, "html.parser")
    urls = []

    # High-priority social images
    for key, attr in [("meta[property='og:image']", "content"),
                      ("meta[name='twitter:image']", "content")]:
        for tag in soup.select(key):
            if tag.get(attr):
                urls.append(urljoin(page_url, tag.get(attr)))

    # Standard images / lazy-loading variants / srcsets
    for img in soup.find_all("img"):
        for attr in ("src", "data-src", "data-lazy-src", "data-original"):
            val = img.get(attr)
            if val and not val.startswith("data:"):
                urls.append(urljoin(page_url, val))
        for attr in ("srcset", "data-srcset"):
            val = img.get(attr)
            if val:
                for entry in val.split(","):
                    u = entry.strip().split(" ")[0]
                    if u:
                        urls.append(urljoin(page_url, u))

    # JSON / embedded URLs, useful on JS-heavy commerce pages
    for m in re.findall(r'https?:\\?/\\?/[^"\\s<>]+?\\.(?:jpg|jpeg|png|webp)(?:\\?[^"\\s<>]*)?', r.text, flags=re.I):
        urls.append(m.replace("\\/", "/"))

    # De-dupe
    seen = set()
    out = []
    for u in urls:
        u = u.replace("&amp;", "&")
        if u not in seen:
            seen.add(u)
            out.append(u)
    return out

def download_image(url, prefix, idx):
    try:
        r = requests.get(url, headers=HEADERS, timeout=30)
        r.raise_for_status()
        ctype = r.headers.get("content-type","")
        if "image" not in ctype.lower() and len(r.content) < 5000:
            return None
        im = Image.open(io.BytesIO(r.content))
        w, h = im.size
        # Skip tiny icons/logos
        if w < 400 or h < 200:
            return None
        ext = (im.format or "JPEG").lower()
        ext = "jpg" if ext in ("jpeg","jpg") else ext
        digest = hashlib.sha1(r.content).hexdigest()[:10]
        path = OUT / f"{prefix}_{idx:02d}_{w}x{h}_{digest}.{ext}"
        path.write_bytes(r.content)
        return path
    except Exception as e:
        return None

def main():
    log = []
    for name, url in SOURCES.items():
        print(f"\\n[{name}] {url}")
        try:
            urls = get_img_urls(url)
        except Exception as e:
            print("Page failed:", e)
            log.append(f"{name}: PAGE ERROR {e}")
            continue
        saved = 0
        for i, iu in enumerate(urls, 1):
            p = download_image(iu, name, i)
            if p:
                print(" saved", p.name)
                log.append(f"{name}: {p.name} <- {iu}")
                saved += 1
            if saved >= 20:
                break
            time.sleep(0.1)
        print("saved:", saved)
    (OUT / "DOWNLOAD_LOG.txt").write_text("\\n".join(log), encoding="utf-8")
    print("\\nDone. Review images manually and delete unrelated site graphics.")

if __name__ == "__main__":
    main()
