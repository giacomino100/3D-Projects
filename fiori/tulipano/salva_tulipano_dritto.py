"""Salva il tulipano come stampato: retro piatto sul piatto, non in diagonale.

Parte da tulipano_maggiorato_calamita.blend, ruota il retro piatto su z=0, allinea l'asse lungo a Y,
scala a 29.5395 x 88.0033 x 12.5776 mm e salva tulipano_dritto_29.5x88x12.6mm.blend
Uso:  blender -b tulipano_maggiorato_calamita.blend -P salva_tulipano_dritto.py
"""
import bpy, numpy as np, math, os

HERE = os.path.dirname(os.path.abspath(bpy.data.filepath))
OUT = os.path.join(HERE, "tulipano_dritto_29.5x88x12.6mm.blend")
TARGET = (29.5395, 88.0033, 12.5776)       # X, Y, Z in mm (misure stampate)
BACK_NORMAL = np.array([0.6412, 0.7637, -0.0748])   # normale del retro piatto (misurata)
ROT_Z_DEG = 36.59                                    # rotazione attorno a Z per le misure stampate

ob = next(o for o in bpy.data.objects if o.type == 'MESH')
me = ob.data
n = len(me.vertices)
v = np.empty(n * 3); me.vertices.foreach_get('co', v); v = v.reshape(-1, 3)
v = v @ np.array(ob.matrix_world.to_3x3()).T + np.array(ob.matrix_world.translation)

nref = BACK_NORMAL / np.linalg.norm(BACK_NORMAL)
tgt = np.array([0, 0, -1.0])
ax = np.cross(nref, tgt); s = np.linalg.norm(ax); c = nref @ tgt; ax /= s
K = np.array([[0, -ax[2], ax[1]], [ax[2], 0, -ax[0]], [-ax[1], ax[0], 0]])
R = np.eye(3) + K * s + K @ K * (1 - c)
w = v @ R.T
a = math.radians(ROT_Z_DEG)
Rz = np.array([[math.cos(a), -math.sin(a), 0], [math.sin(a), math.cos(a), 0], [0, 0, 1]])
w = w @ Rz.T
scale = TARGET[2] / np.ptp(w[:, 2])
w *= scale
mn, mx = w.min(0), w.max(0)
w[:, 0] -= (mn[0] + mx[0]) / 2
w[:, 1] -= (mn[1] + mx[1]) / 2
w[:, 2] -= mn[2]

me.vertices.foreach_set('co', w.ravel())
me.update()
ob.matrix_world.identity()
ob.rotation_euler = (0, 0, 0)
ob.scale = (1, 1, 1)
ob.location = (0, 0, 0)
ob.name = "TULIPANO_dritto"
dims = w.max(0) - w.min(0)
print("scala", round(scale, 4), "dimensioni mm X Y Z", [round(x, 4) for x in dims], "zmin", round(w[:, 2].min(), 4))
bpy.ops.wm.save_as_mainfile(filepath=OUT)
print("salvato", OUT)
