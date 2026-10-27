#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import sys, math

folder = Path(sys.argv[1]) if len(sys.argv)>1 else Path("../03_EXACT_OEM_REFERENCES/downloaded")
out = Path(sys.argv[2]) if len(sys.argv)>2 else folder/"contact_sheet.jpg"
files = [p for p in folder.rglob("*") if p.suffix.lower() in (".png",".jpg",".jpeg",".webp") and "FULLPAGE" not in p.name]
thumb=(420,300)
cols=3
rows=max(1,math.ceil(len(files)/cols))
canvas=Image.new("RGB",(cols*thumb[0], rows*(thumb[1]+40)),"white")
d=ImageDraw.Draw(canvas)
for i,p in enumerate(files):
    try:
        im=Image.open(p).convert("RGB")
        im.thumbnail((thumb[0]-10,thumb[1]-10))
        x=(i%cols)*thumb[0]+(thumb[0]-im.width)//2
        y=(i//cols)*(thumb[1]+40)+(thumb[1]-im.height)//2
        canvas.paste(im,(x,y))
        d.text(((i%cols)*thumb[0]+5,(i//cols)*(thumb[1]+40)+thumb[1]+4),p.name[:60],fill="black")
    except Exception:
        pass
canvas.save(out,quality=90)
print(out)
