"""GrabCut segmentation of an exact-part photo. Usage: seg3.py name x0 y0 x1 y1 [scale]
Writes work/mask_<name>.png (full res, original orientation) + work/seg3_<name>.jpg preview."""
import cv2, numpy as np, sys
name=sys.argv[1]; x0,y0,x1,y1=map(int,sys.argv[2:6]); sc=float(sys.argv[6]) if len(sys.argv)>6 else 0.5
im=cv2.imread(f"docs/reference_images/{name}.jpg"); H,W=im.shape[:2]
sm=cv2.resize(im,None,fx=sc,fy=sc,interpolation=cv2.INTER_AREA)
mask=np.zeros(sm.shape[:2],np.uint8); bg=np.zeros((1,65)); fg=np.zeros((1,65))
r=(int(x0*sc),int(y0*sc),int((x1-x0)*sc),int((y1-y0)*sc))
cv2.grabCut(sm,mask,r,bg,fg,10,cv2.GC_INIT_WITH_RECT)
m=np.where((mask==1)|(mask==3),255,0).astype(np.uint8)
m=cv2.resize(m,(W,H),interpolation=cv2.INTER_LINEAR); m=(m>127).astype(np.uint8)*255
m=cv2.morphologyEx(m,cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
n,lab,st,_=cv2.connectedComponentsWithStats(m); k=1+np.argmax(st[1:,cv2.CC_STAT_AREA]); m=(lab==k).astype(np.uint8)*255
cv2.imwrite(f"work/mask_{name}.png",m)
o=im.copy(); cs,_=cv2.findContours(m,cv2.RETR_CCOMP,cv2.CHAIN_APPROX_NONE); cv2.drawContours(o,cs,-1,(0,0,255),max(1,W//900))
c=o[max(0,y0-20):y1+20,max(0,x0-20):x1+20]; c=cv2.resize(c,(1400,int(1400*c.shape[0]/c.shape[1])))
cv2.imwrite(f"work/seg3_{name}.jpg",c); print(name,"holes",len(cs)-1)
