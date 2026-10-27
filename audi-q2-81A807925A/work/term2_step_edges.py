"""Front step edges of the V7 recess levels, for selecting them in Fusion (fillets).
For every boundary of the ledge / pocket regions (inside the skin ring only): points (X_cad, y, z) in cm,
X_cad = L - s, z of the convex (upper) edge = zf + z_top and of the concave (lower) edge = zf + z_bot.
Output cad/fusion/V7_step_edges.json"""
import json, os, numpy as np
from shapely.geometry import Polygon
from reg import Model, ROOT
m = Model("V7"); P = m.P
R = m.PF.recess_polygons()
opening = Polygon(m.PF.spline_points("opening", 6000)).buffer(0)
out = {}
for key, regions, ztop, zbot in (("ledge", R["ledge"], 0.0, P.D_LEDGE), ("pocket", R["pocket"], P.D_LEDGE, P.D_RECESS)):
    pts = []
    for g in regions:
        for ring in [g.exterior] + list(g.interiors):
            L_ = ring.length
            for t in np.arange(0, L_, 0.5):
                q = ring.interpolate(t)
                if opening.buffer(0.05).contains(q):
                    continue                     # boundary inside the opening: no edge on the part
                pts.append((q.x, q.y))
    pts = np.array(pts); z = m.SF.zf(pts[:, 0], pts[:, 1])
    out[key] = dict(xy=np.c_[(P.L - pts[:, 0]) / 10, pts[:, 1] / 10].round(4).tolist(),
                    z_convex=((z + ztop) / 10).round(4).tolist(), z_concave=((z + zbot) / 10).round(4).tolist())
    print(key, len(pts))
json.dump(out, open(os.path.join(ROOT, "cad", "fusion", "V7_step_edges.json"), "w"))
