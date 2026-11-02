import bpy
print('FILE', bpy.data.filepath)
for o in bpy.data.objects:
 print(o.name, o.type, tuple(round(x,2) for x in o.dimensions))