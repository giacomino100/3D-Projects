import bpy
for o in bpy.data.objects: print(o.name,tuple(round(x,3) for x in o.location),tuple(round(x,3) for x in o.dimensions))