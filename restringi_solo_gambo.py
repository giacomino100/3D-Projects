import bpy
path=r'C:\Users\giaco\_codex_undo_2026-11-07\girasoli_modificati.blend'
bpy.ops.wm.open_mainfile(filepath=path)
o=bpy.data.objects.get('GIRASOLE_petali_e_gambo'); me=o.data
adj=[[] for _ in me.vertices]
for p in me.polygons:
    for a,b in zip(p.vertices,p.vertices[1:]+p.vertices[:1]): adj[a].append(b); adj[b].append(a)
seen=set(); target=None
for i in range(len(me.vertices)):
    if i in seen: continue
    stack=[i]; seen.add(i); ids=[]
    while stack:
        q=stack.pop(); ids.append(q)
        for n in adj[q]:
            if n not in seen: seen.add(n); stack.append(n)
    ys=[me.vertices[j].co.y for j in ids]
    if len(ids)<1000 and min(ys)<-30: target=ids; break
if target:
    cx=(min(me.vertices[j].co.x for j in target)+max(me.vertices[j].co.x for j in target))/2
    for j in target: me.vertices[j].co.x=cx+(me.vertices[j].co.x-cx)*0.80
bpy.ops.wm.save_as_mainfile(filepath=path)
