import cv2, numpy as np, json, sys
names=sys.argv[1:]
tiles=[]
for name in names:
    im=cv2.imread(f"docs/reference_images/{name}.jpg"); H,W=im.shape[:2]
    hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV); v=hsv[...,2].astype(int); s=hsv[...,1].astype(int)
    b,g,r=[im[...,i].astype(int) for i in range(3)]
    m=((v>135)&(v<250)&(s<38)).astype(np.uint8)
    m[:int(H*float(__import__("os").environ.get("YMIN","0.55")))]=0
    m=cv2.morphologyEx(m*255,cv2.MORPH_CLOSE,np.ones((5,5),np.uint8)); m=cv2.morphologyEx(m,cv2.MORPH_OPEN,np.ones((5,5),np.uint8))
    n,lab,st,_=cv2.connectedComponentsWithStats(m)
    k=1+np.argmax(st[1:,cv2.CC_STAT_AREA]); m=(lab==k).astype(np.uint8)*255
    cv2.imwrite(f"work/mask_{name}.png",m)
    o=im.copy(); cs,_=cv2.findContours(m,cv2.RETR_CCOMP,cv2.CHAIN_APPROX_NONE); cv2.drawContours(o,cs,-1,(0,0,255),2)
    x,y,w,h=cv2.boundingRect(m); pad=30
    tiles.append(cv2.resize(o[max(0,y-pad):y+h+pad, max(0,x-pad):x+w+pad],(900,int(900*(h+2*pad)/(w+2*pad)))))
    print(name, "bbox",x,y,w,h)
S=np.vstack([np.pad(t,((0,6),(0,0),(0,0)),constant_values=255) for t in tiles]); cv2.imwrite("work/masks_sheet.jpg",S)
