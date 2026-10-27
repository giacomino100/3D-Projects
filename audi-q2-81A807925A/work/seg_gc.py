import cv2, numpy as np, sys
# name x0 y0 x1 y1 [rot]
name=sys.argv[1]; x0,y0,x1,y1=map(int,sys.argv[2:6]); rot=int(sys.argv[6]) if len(sys.argv)>6 else 0
im=cv2.imread(f"docs/reference_images/{name}.jpg")
if rot==180: im=cv2.rotate(im,cv2.ROTATE_180)
mask=np.zeros(im.shape[:2],np.uint8); bg=np.zeros((1,65)); fg=np.zeros((1,65))
cv2.grabCut(im,mask,(x0,y0,x1-x0,y1-y0),bg,fg,8,cv2.GC_INIT_WITH_RECT)
m=np.where((mask==1)|(mask==3),255,0).astype(np.uint8)
m=cv2.morphologyEx(m,cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
n,lab,st,_=cv2.connectedComponentsWithStats(m); k=1+np.argmax(st[1:,cv2.CC_STAT_AREA]); m=(lab==k).astype(np.uint8)*255
cv2.imwrite(f"work/mask_{name}{'_r' if rot else ''}.png",m)
o=im.copy(); cs,_=cv2.findContours(m,cv2.RETR_CCOMP,cv2.CHAIN_APPROX_NONE); cv2.drawContours(o,cs,-1,(0,0,255),2)
cv2.imwrite(f"work/gc_{name}.jpg",o[max(0,y0-20):y1+20,max(0,x0-20):x1+20])
