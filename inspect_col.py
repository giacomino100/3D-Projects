import bpy
for c in bpy.data.collections: print('COL',c.name,c.hide_viewport,c.hide_render)
for o in bpy.data.objects: print('OBJ',o.name,'hide',o.hide_viewport,o.hide_get(),[c.name for c in o.users_collection])