import bpy
import math
import os
import sys
from mathutils import Vector

folder=os.path.dirname(bpy.data.filepath)
root=os.path.dirname(folder) if os.path.basename(folder)=='_work' else folder
sys.path.insert(0,os.path.dirname(root))
from correggi_fiori_verificati import mesh_check,render_view
obj=bpy.data.objects['GIRASOLE_corpo_unico_gambo_stile_tulipano']
for other in bpy.context.scene.objects:
    other.select_set(False)
obj.select_set(True)
bpy.context.view_layer.objects.active=obj
bounds=[(min(v.co[i] for v in obj.data.vertices),max(v.co[i] for v in obj.data.vertices)) for i in (0,1)]
print('PLANAR_OPTIMIZATION_BEGIN',len(obj.data.vertices),len(obj.data.polygons),flush=True)
modifier=obj.modifiers.new('Ottimizzazione_superfici_piane','DECIMATE')
modifier.decimate_type='DISSOLVE'
modifier.angle_limit=math.radians(2)
modifier.use_dissolve_boundaries=False
modifier.delimit={'MATERIAL'}
bpy.ops.object.modifier_apply(modifier=modifier.name)
print('PLANAR_OPTIMIZATION_END',len(obj.data.vertices),len(obj.data.polygons),flush=True)
new_bounds=[(min(v.co[i] for v in obj.data.vertices),max(v.co[i] for v in obj.data.vertices)) for i in (0,1)]
for v in obj.data.vertices:
    for i in (0,1):
        lo,hi=bounds[i]
        nlo,nhi=new_bounds[i]
        v.co[i]=lo+(v.co[i]-nlo)*(hi-lo)/(nhi-nlo)
obj.data.update()
obj.select_set(False)
mesh_check(obj)
bpy.context.scene['ottimizzazione_superfici_piane_gradi']=2.0
output=os.path.join(root,'girasole_corolla_raccordata.blend')
bpy.ops.wm.save_as_mainfile(filepath=output)
print('SAVED_OPTIMIZED',output,flush=True)
import correggi_fiori_verificati as common
common.FOLDER=root
render_view('girasole_corolla_raccordata_fronte.png',(0,0,1),(0,1,0),Vector((0,-18,2)),104)
render_view('girasole_corolla_raccordata_retro.png',(.3,.6,-.75),(0,1,0),Vector((0,0,0)),68)
