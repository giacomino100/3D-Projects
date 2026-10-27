"""Overlay the CAD V1 front-view silhouette on exact-target photographs.

A 2-point similarity transform is fitted ONLY on:
  (1) the inner tip (top-left corner region, s=0, y=0)
  (2) the outer extreme (top-right corner, s=L, y=-R_OUTER_TOP)
Everything else (height H, band widths, opening start/end, outer/inner slant,
clip positions) is therefore an independent check of the photo-derived values.
Landmark pixel coordinates are hand-picked on gridded images (see
docs/curvature_analysis.md / docs/validation_plan.md) and stored below.
    .venv\\Scripts\\python cad\\validate_overlay.py
"""
import json
import os
import sys

import numpy as np
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import parameters as P  # noqa: E402
from geometry import planform as PF  # noqa: E402

ROOT = os.path.dirname(HERE)
REF = os.path.join(ROOT, "docs", "reference_images")
OUT = os.path.join(ROOT, "docs", "validation")
os.makedirs(OUT, exist_ok=True)

# photo, rotation applied to bring it to installed orientation, landmarks (px after rotation)
CASES = [
    dict(name="pru_1_isolated_front", file="925_pru_1.jpg", rot=180,
         tip=(6.0, 336.0), outer=(990.0, 366.0),
         note="isolated part, RRR pru6165 / Allegro 11269, camera elevated (Y foreshortened)"),
    dict(name="corner_4_installed", file="corner_4.jpg", rot=0,
         tip=(300.0, 610.0), outer=(1200.0, 676.0),
         note="installed on 681A + bumper corner, eBay 267760879656, oblique from front-left-above"),
    # psh_1 (681A+925A assembly) REJECTED: close-range perspective + outer end out of frame,
    # no second landmark -> scale not determinable. See docs/validation_plan.md.
]


def similarity(src, dst):
    """Complex-number similarity z' = a z + b from two point pairs."""
    s0, s1 = complex(*src[0]), complex(*src[1])
    d0, d1 = complex(*dst[0]), complex(*dst[1])
    a = (d1 - d0) / (s1 - s0)
    b = d0 - a * s0
    return lambda p: (lambda z: (z.real, z.imag))(a * complex(p[0], p[1]) + b), abs(a)


def cad_to_img_frame(pts):
    # CAD front view authored as (s right, y up) -> image (u right, v down)
    return np.c_[pts[:, 0], -pts[:, 1]]


def main():
    outer = cad_to_img_frame(PF.outline_polyline("outer"))
    opening = cad_to_img_frame(PF.outline_polyline("opening"))
    xs = outer[:, 0]
    tip_cad = outer[np.argmin(xs + 0.01 * outer[:, 1])]
    ext_cad = outer[np.argmax(xs)]
    results = []
    for c in CASES:
        im = Image.open(os.path.join(REF, c["file"])).convert("RGB").rotate(c["rot"])
        if c["outer"] is not None:
            f, scale = similarity([tip_cad, ext_cad], [c["tip"], c["outer"]])
        else:
            # scale from visible height (px) / H, no rotation
            scale = (692.0 - 588.0) / P.H
            f = lambda p, s=scale, t=c["tip"], o=tip_cad: (t[0] + (p[0] - o[0]) * s, t[1] + (p[1] - o[1]) * s)
        d = ImageDraw.Draw(im)
        d.line([f(p) for p in outer] + [f(outer[0])], fill=(255, 0, 0), width=3)
        d.line([f(p) for p in opening] + [f(opening[0])], fill=(0, 90, 255), width=3)
        for cl in P.CLIPS:
            if cl.edge == "outer_end":
                continue
            yy = 0.0 if cl.edge == "top" else P.H
            a, b = f((cl.x, yy - 6 if cl.edge == "top" else yy)), f((cl.x, yy + 6 if cl.edge == "bottom" else yy))
            d.line([a, b], fill=(255, 140, 0), width=5)
            d.text((a[0] + 4, a[1] - 14), cl.cid, fill=(255, 140, 0))
        d.rectangle([0, 0, im.width, 34], fill=(255, 255, 255))
        d.text((6, 4), f"CAD V1 overlay - {c['name']} | red: outer, blue: opening, orange: clips | "
                       f"{scale:.2f} px/mm", fill=(0, 0, 0))
        d.text((6, 18), c["note"], fill=(80, 80, 80))
        path = os.path.join(OUT, f"overlay_{c['name']}.jpg")
        im.save(path, quality=90)
        results.append(dict(case=c["name"], px_per_mm=round(scale, 3), file=os.path.relpath(path, ROOT)))
        print("saved", path)
    with open(os.path.join(OUT, "overlay_index.json"), "w") as fh:
        json.dump(results, fh, indent=1)


if __name__ == "__main__":
    main()
