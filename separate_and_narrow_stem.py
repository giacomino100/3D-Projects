import bpy
path=r'C:\Users\giaco\Downloads\girasoli_modificati.blend'
bpy.ops.wm.open_mainfile(filepath=path)
o=bpy.data.objects.get('GIRASOLE_petali_e_gambo')
if o:
    me=o.data; sv=[]; sf=[]; pv=[]; pf=[]; smap={}; pmap={}
    def add_face(poly, verts, faces, mp):
        ids=[]
        for i in poly.vertices:
            if i not in mp: mp[i]=len(verts); verts.append(me.vertices[i].co.copy())
            ids.append(mp[i])
        faces.append(tuple(ids))
    for poly in me.polygons:
        ys=[me.vertices[i].co.y for i in poly.vertices]
        if all(y < -5.0 for y in ys): add_face(poly,sv,sf,smap)
        else: add_face(poly,pv,pf,pmap)
    # make stem narrower in X only; preserve its Y/Z dimensions
    for v in sv: v.x*=0.78
    sm=bpy.data.meshes.new('GIRASOLE_gambo_mesh'); sm.from_pydata(sv,[],sf); sm.update()
    pm=bpy.data.meshes.new('GIRASOLE_petali_mesh'); pm.from_pydata(pv,[],pf); pm.update()
    so=bpy.data.objects.new('GIRASOLE_gambo_separato',sm); po=bpy.data.objects.new('GIRASOLE_petali_con_foro',pm)
    bpy.context.collection.objects.link(so); bpy.context.collection.objects.link(po)
    po.location=o.location.copy(); so.location=o.location.copy(); bpy.data.objects.remove(o,do_unlink=True)
bpy.ops.wm.save_as_mainfile(filepath=path)
