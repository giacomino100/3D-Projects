"""END B loop: inner opening contour on alB_1 by ray casting from seeds inside the loop (first drop of luminance
below the running background maximum -> gradient peak), back-projected on the CAD face (camera V5 front_A).
Output TERMINAL_REFINEMENT/loop_contour_alB1.json (s, y) + check image."""
import json, os, numpy as np, cv2
from scipy.optimize import least_squares
from reg import Model, ROOT, REF, project
m = Model("V5")
cj = json.load(open(os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis", "overlays", "cam_V5_front_A.json")))
cam = np.array(cj["cam"]); W, H = cj["W"], cj["H"]
im = cv2.imread(os.path.join(REF, "925_alB_1.jpg"))
lab = cv2.GaussianBlur(cv2.cvtColor(im, cv2.COLOR_BGR2LAB).astype(np.float32), (0, 0), 1.2)
x0, x1, y0, y1 = 40, 1000, 790, 1110
Lc = cv2.GaussianBlur(cv2.cvtColor(im, cv2.COLOR_BGR2LAB)[..., 0].astype(np.float32), (0, 0), 1.0)
pts = []
for sx, sy_ in ((330, 1010), (450, 975), (600, 960), (800, 960), (250, 1030)):
    for ang in np.linspace(0, 2 * np.pi, 720, endpoint=False):
        d = np.array([np.cos(ang), np.sin(ang)])
        r = np.arange(0, 400, 0.5); P_ = np.array([sx, sy_]) + r[:, None] * d
        ok = (P_[:, 0] > 5) & (P_[:, 0] < W - 5) & (P_[:, 1] > 5) & (P_[:, 1] < H - 5); P_ = P_[ok]; r = r[ok]
        v = cv2.remap(Lc, P_[:, 0].astype(np.float32).reshape(1, -1), P_[:, 1].astype(np.float32).reshape(1, -1),
                      cv2.INTER_LINEAR)[0]
        bgl = np.maximum.accumulate(v)          # running max of the (bright) background along the ray
        hit = np.where(v < bgl - 22)[0]
        if not len(hit):
            continue
        k = hit[0]; g = -np.gradient(v); j = max(0, k - 12) + int(np.argmax(g[max(0, k - 12):k + 1]))
        pts.append(P_[j])
c = np.array(pts)
c = c[(c[:, 0] < x1 - 15) & (c[:, 0] > x0)]
allp = np.r_[m.o2, m.i2]; allu = project(m.lift(allp), cam, W, H)
def bp(u):
    j = int(np.argmin(np.linalg.norm(allu - u, axis=1)))
    f = lambda p: project(m.lift(np.array([p])), cam, W, H)[0] - u
    return least_squares(f, allp[j], x_scale=[10, 10]).x
sy = np.array([bp(u) for u in c[::2]])
json.dump(sy.tolist(), open(os.path.join(ROOT, "TERMINAL_REFINEMENT", "loop_contour_alB1.json"), "w"))
vis = im[y0:y1, x0:x1].copy()
for u in c:
    cv2.circle(vis, (int(u[0] - x0), int(u[1] - y0)), 1, (0, 0, 255), -1)
cv2.imwrite(os.path.join(ROOT, "TERMINAL_REFINEMENT", "loop_contour_alB1.png"), vis)
print(len(sy), sy[:, 0].min(), sy[:, 0].max())
