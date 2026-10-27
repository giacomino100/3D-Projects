import cv2, numpy as np, sys, json
name, roi, lo, hi, smax = sys.argv[1], tuple(map(int,sys.argv[2].split(","))), int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5])
im=cv2.imread(f"docs/reference_images/{name}.jpg"); x0,y0,x1,y1=roi; r=im[y0:y1,x0:x1]
hsv=cv2.cvtColor(r,cv2.COLOR_BGR2HSV)
m=((hsv[...,2]>lo)&(hsv[...,2]<hi)&(hsv[...,1]<smax)).astype(np.uint8)*255
m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((5,5),np.uint8)); m=cv2.morphologyEx(m,cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
n,lab,st,_=cv2.connectedComponentsWithStats(m); k=1+np.argmax(st[1:,cv2.CC_STAT_AREA]); m=(lab==k).astype(np.uint8)*255
cs,h=cv2.findContours(m,cv2.RETR_CCOMP,cv2.CHAIN_APPROX_NONE)
cs=sorted(cs,key=cv2.contourArea,reverse=True)
out=r.copy(); cv2.drawContours(out,cs[:2],-1,(0,0,255),1)
cv2.imwrite(f"work/seg_{name}.png", np.vstack([out, cv2.cvtColor(m,cv2.COLOR_GRAY2BGR)]))
json.dump({"roi":roi,"contours":[(c[:,0,:]+[x0,y0]).tolist() for c in cs[:3]],"areas":[cv2.contourArea(c) for c in cs[:3]]},open(f"work/seg_{name}.json","w"))
print(name,[round(cv2.contourArea(c)) for c in cs[:4]])
