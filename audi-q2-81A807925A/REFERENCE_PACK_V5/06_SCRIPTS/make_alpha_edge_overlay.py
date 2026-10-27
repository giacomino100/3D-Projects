#!/usr/bin/env python3
"""
Create a simple overlay once OEM and CAD images have already been perspective/camera matched.
Usage:
  python make_alpha_edge_overlay.py OEM.png CAD.png output_prefix
"""
import sys
from PIL import Image, ImageChops, ImageFilter, ImageOps

oem=Image.open(sys.argv[1]).convert("RGB")
cad=Image.open(sys.argv[2]).convert("RGB").resize(oem.size)
prefix=sys.argv[3]

Image.blend(oem,cad,0.5).save(prefix+"_alpha.png")

def edges(im):
    g=ImageOps.grayscale(im)
    e=g.filter(ImageFilter.FIND_EDGES)
    e=ImageOps.autocontrast(e)
    return e

eo=edges(oem)
ec=edges(cad)
# red OEM, cyan CAD
r=eo
g=ec
b=ec
Image.merge("RGB",(r,g,b)).save(prefix+"_edges.png")
