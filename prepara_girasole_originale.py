import trimesh, os
src=r'C:\Users\giaco\Downloads\girasoles.3mf'
out=r'C:\Users\giaco\_sunflower_inspect_parts'
os.makedirs(out,exist_ok=True)
s=trimesh.load(src,force='scene')
for i,m in enumerate(s.dump(concatenate=False)):
    m.export(os.path.join(out,f'parte_{i:03d}.stl'))
print('parts',len(s.geometry))
