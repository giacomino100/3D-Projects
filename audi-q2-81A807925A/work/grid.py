import sys
from PIL import Image,ImageDraw
f,out=sys.argv[1],sys.argv[2]; step=int(sys.argv[3]) if len(sys.argv)>3 else 50
crop=tuple(map(int,sys.argv[4].split(","))) if len(sys.argv)>4 else None
im=Image.open(f).convert("RGB")
if crop: im=im.crop(crop)
sc=float(sys.argv[5]) if len(sys.argv)>5 else 1.0
if sc!=1: im=im.resize((int(im.width*sc),int(im.height*sc)),Image.LANCZOS)
d=ImageDraw.Draw(im); ox,oy=(crop[0],crop[1]) if crop else (0,0)
for x in range(0,im.width,int(step*sc)):
    d.line([(x,0),(x,im.height)],fill=(255,0,0) if (x/sc+ox)%(step*2)==0 else (255,150,150),width=1); d.text((x+2,2),str(int(x/sc+ox)),fill=(255,0,0))
for y in range(0,im.height,int(step*sc)):
    d.line([(0,y),(im.width,y)],fill=(0,0,255) if (y/sc+oy)%(step*2)==0 else (150,150,255),width=1); d.text((2,y+2),str(int(y/sc+oy)),fill=(0,0,255))
im.save(out,quality=90)
