import bpy
path=r'C:\Users\giaco\_codex_undo_2026-11-07\girasoli_modificati.blend'
bpy.ops.wm.open_mainfile(filepath=path)
o=bpy.data.objects.get('GIRASOLE_petali_e_gambo'); me=o.data
adj=[[] for _ in me.vertices]
for p in me.polygons:
    for a,b in zip(p.vertices,p.vertices[1:]+p.vertices[:1]): adj[a].append(b); adj[b].append(a)
seen=set(); comps=[]
for i in range(len(me.vertices)):
    if i in seen: continue
    stack=[i]; seen.add(i); ids=[]
    while stack:
        q=stack.pop(); ids.append(q)
        for n in adj[q]:
            if n not in seen: seen.add(n); stack.append(n)
    if len(ids)>20:
        xs=[me.vertices[j].co.x for j in ids]; ys=[me.vertices[j].co.y for j in ids]; zs=[me.vertices[j].co.z for j in ids]
        comps.append((len(ids),min(xs),max(xs),min(ys),max(ys),min(zs),max(zs)))
print(comps)
