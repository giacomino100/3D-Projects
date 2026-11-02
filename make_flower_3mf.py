import zipfile, shutil, os, math
from xml.etree import ElementTree as ET

NS='http://schemas.microsoft.com/3dmanufacturing/core/2015/02'
ET.register_namespace('',NS); ET.register_namespace('m','http://schemas.microsoft.com/3dmanufacturing/core/2015/02')

def tube_mesh(n=32, ro=3.5, ri=2.6, z0=-55, z1=-47, z2=0):
    v=[]; t=[]
    def ring(r,z):
        ids=[]
        for i in range(n): ids.append(len(v)); a=2*math.pi*i/n; v.append((r*math.cos(a),r*math.sin(a),z))
        return ids
    def quad(a,b,c,d): t.extend([(a,b,c),(a,c,d)])
    ob=ring(ro,z0); ot=ring(ro,z1); ib=ring(ri,z0); it=ring(ri,z1); st=ring(ro,z2)
    for i in range(n):
        j=(i+1)%n
        quad(ob[i],ob[j],ot[j],ot[i]); quad(ib[j],ib[i],it[i],it[j])
        quad(ob[j],ib[j],ib[i],ob[i]); quad(ot[i],it[i],it[j],ot[j])
        quad(ot[i],ot[j],st[j],st[i])
    return v,t

def add_mesh(parent, oid, verts, tris):
    o=ET.SubElement(parent, f'{{{NS}}}object', {'id':str(oid),'type':'model'})
    m=ET.SubElement(o,f'{{{NS}}}mesh'); vs=ET.SubElement(m,f'{{{NS}}}vertices')
    for x,y,z in verts: ET.SubElement(vs,f'{{{NS}}}vertex',{'x':f'{x:.6f}','y':f'{y:.6f}','z':f'{z:.6f}'})
    ts=ET.SubElement(m,f'{{{NS}}}triangles')
    for a,b,c in tris: ET.SubElement(ts,f'{{{NS}}}triangle',{'v1':str(a),'v2':str(b),'v3':str(c)})

def process(src,dst):
    tmp=dst+'.tmp'; shutil.copy2(src,tmp)
    with zipfile.ZipFile(tmp,'r') as zin:
        data={n:zin.read(n) for n in zin.namelist()}
    root=ET.fromstring(data['3D/3dmodel.model'])
    resources=root.find(f'{{{NS}}}resources'); build=root.find(f'{{{NS}}}build')
    items=list(build)
    nextid=max([int(o.attrib['id']) for o in resources if 'id' in o.attrib]+[100])+1
    for item in items:
        tr=[float(x) for x in item.attrib.get('transform','1 0 0 0 1 0 0 0 1 0 0 0').split()]
        # reduce the original part in place, preserving its position
        for i in range(9): tr[i]*=.90
        item.attrib['transform']=' '.join(f'{x:.9g}' for x in tr)
        x,y,z=tr[9],tr[10],tr[11]
        verts,tris=tube_mesh(); add_mesh(resources,nextid,verts,tris)
        ET.SubElement(build,f'{{{NS}}}item',{'objectid':str(nextid),'transform':f'1 0 0 0 1 0 0 0 1 {x:.6f} {y:.6f} {z:.6f}'})
        nextid+=1
    data['3D/3dmodel.model']=ET.tostring(root,encoding='utf-8',xml_declaration=True)
    with zipfile.ZipFile(dst,'w',zipfile.ZIP_DEFLATED) as zout:
        for n,b in data.items(): zout.writestr(n,b)
    os.remove(tmp)

if __name__=='__main__':
    process(r'C:\Users\giaco\Downloads\girasoles.3mf',r'C:\Users\giaco\Downloads\girasoles_modificati.3mf')
    process(r'C:\Users\giaco\Downloads\tulipanes.3mf',r'C:\Users\giaco\Downloads\tulipani_modificati.3mf')
    print('created')
