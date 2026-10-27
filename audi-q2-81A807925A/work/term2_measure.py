"""Terminal refinement 2 - measurement of the RAIL BEADS and the RECESSED FLOOR on alB_1 (Leo-b, 2560 px).

Observation (user feedback + alB_1 / alA_3 / fre_2 close-ups): both rails are raised rounded beads of ~constant
width that run straight to the END A tip; between them the face is set back (recessed floor). Along the opening
the floor survives as a thin ledge (flange) next to the beads, ending with the two steps near END B; at END A the
floor is the whole plate between the beads (the 'rientro'); the END B loop is the bare bead.

Per image column: gradient edges across both bands, back-projected on the CAD face (camera matched in V5) ->
(s, y) and perpendicular distance from the outer contour. Output TERMINAL_REFINEMENT/bead_measure.json."""
import json, os, numpy as np, cv2, warnings
warnings.filterwarnings("ignore")
from scipy.optimize import least_squares
from scipy.spatial import cKDTree
from reg import Model, ROOT, REF, project

m = Model("V5")
cj = json.load(open(os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis", "overlays", "cam_V5_front_A.json")))
cam = np.array(cj["cam"]); W, H = cj["W"], cj["H"]
L = cv2.cvtColor(cv2.imread(os.path.join(REF, "925_alB_1.jpg")), cv2.COLOR_BGR2LAB)[..., 0].astype(float)
ko = cKDTree(m.PF.outline_polyline("outer", 0.25))
ki = cKDTree(m.PF.outline_polyline("opening", 0.25))
allp = np.r_[m.o2, m.i2]; allu = project(m.lift(allp), cam, W, H)


def bp(u):
    j = int(np.argmin(np.linalg.norm(allu - u, axis=1)))
    f = lambda p: project(m.lift(np.array([p])), cam, W, H)[0] - u
    return least_squares(f, allp[j], x_scale=[10, 10]).x


res = []
for x in (600, 727, 900, 1100, 1300, 1600, 1800, 1950, 2050, 2150, 2250, 2330):
    col = L[790:1110, x - 3:x + 4].mean(1); g = np.gradient(col)
    for i in range(2, len(g) - 2):
        if abs(g[i]) >= 6 and abs(g[i]) == np.abs(g[i - 2:i + 3]).max():
            s, y = bp(np.array([x, 790 + i], float))
            res.append(dict(col=x, row=790 + i, grad=round(float(g[i]), 1), s=round(float(s), 1), y=round(float(y), 2),
                            d_outer=round(float(ko.query([s, y])[0]), 2), d_open=round(float(ki.query([s, y])[0]), 2)))
os.makedirs(os.path.join(ROOT, "TERMINAL_REFINEMENT"), exist_ok=True)
json.dump(res, open(os.path.join(ROOT, "TERMINAL_REFINEMENT", "bead_measure.json"), "w"), indent=1)
for r in res:
    print(r)
