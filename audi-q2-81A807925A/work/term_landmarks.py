"""Terminal landmarks A01-A13 (END A, wide solid end), B01-B12 (END B, narrow loop end) and R01-R05
(recess = step of the opening lower edge near END B). For each landmark and each camera-matched exact-target
view: CAD XYZ, projected px, OEM edge px (normal edge search), signed residual (mm, + = OEM outside the CAD
contour) and confidence. Output: TERMINAL_REFINEMENT/landmarks_<VER>.json"""
import json, os, sys, numpy as np, warnings
warnings.filterwarnings("ignore")
from reg import *
from lm import _curv
VER = sys.argv[1] if len(sys.argv) > 1 else "V5"
CAMDIR = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, "REFERENCE_PACK_V5", "analysis", "overlays")
OUT = os.path.join(ROOT, "TERMINAL_REFINEMENT"); os.makedirs(OUT, exist_ok=True)
VIEWS = {"front_A": ("925_alB_1", True), "front_B": ("925_ccm_1", True), "front_C_assembly": ("681_pa_1", True),
         "oblique_A": ("925_alA_1", False), "oblique_B": ("925_krik_0", False), "profile": ("925_mp_2_hr", False)}
NAMES = {
    "A01": "start of upper-end transition", "A02": "upper crown start", "A03": "maximum upper fullness",
    "A04": "beginning of outer descent", "A05": "mid-point of outer descent", "A06": "outermost terminal point (nose)",
    "A07": "lower terminal transition", "A08": "return into lower rail",
    "A09": "upper opening-start tangent", "A10": "upper opening shoulder", "A11": "inner-most rounded point of opening",
    "A12": "lower opening shoulder", "A13": "lower opening-start tangent",
    "B01": "upper rail entering terminal", "B02": "beginning of upper bend", "B03": "upper terminal shoulder",
    "B04": "narrowest / outermost terminal point", "B05": "lower terminal shoulder", "B06": "beginning of lower return",
    "B07": "lower rail exit", "B08": "upper inner tangent", "B09": "upper inner bend", "B10": "deepest inner turning point",
    "B11": "lower inner bend", "B12": "lower inner tangent",
    "R01": "recess entry", "R02": "beginning of concavity", "R03": "maximum recess (max curvature)", "R04": "concavity exit",
    "R05": "transition back into the rail"}


def define(m):
    o, i = m.o2, m.i2
    ko, ki = _curv(o), _curv(i)
    yo, yi = o[:, 1].mean(), i[:, 1].mean()
    up_o, lo_o, up_i, lo_i = o[:, 1] > yo, o[:, 1] <= yo, i[:, 1] > yi, i[:, 1] <= yi
    s0, s1 = o[:, 0].min(), o[:, 0].max(); sa, sb = i[:, 0].min(), i[:, 0].max()
    W = lambda mask: np.where(mask)[0]
    at = lambda mask, s, pts=o: int(W(mask)[np.argmin(np.abs(pts[W(mask), 0] - s))])
    amax = lambda v, mask: int(W(mask)[np.argmax(v[W(mask)])])
    D = {}
    D["A06"] = ("outer", int(np.argmin(o[:, 0])))
    D["A03"] = ("outer", amax(o[:, 1], up_o & (o[:, 0] < sa)))
    D["A04"] = ("outer", amax(ko, up_o & (o[:, 0] < 25)))
    D["A02"] = ("outer", at(up_o, 0.5 * (o[D["A03"][1], 0] + o[D["A04"][1], 0])))
    D["A01"] = ("outer", at(up_o, sa + 15))
    D["A07"] = ("outer", amax(ko, lo_o & (o[:, 0] < 20)))
    D["A05"] = ("outer", at(lo_o & (o[:, 0] < 60), 0.5 * (o[D["A07"][1], 0] + 50)))
    D["A08"] = ("outer", amax(ko, lo_o & (o[:, 0] > 35) & (o[:, 0] < sa + 20)))
    D["A11"] = ("opening", int(np.argmin(i[:, 0])))
    D["A10"] = ("opening", amax(ki, up_i & (i[:, 0] < sa + 25)))
    D["A12"] = ("opening", amax(ki, lo_i & (i[:, 0] < sa + 50)))
    D["A09"] = ("opening", at(up_i, sa + 30, i))
    D["A13"] = ("opening", at(lo_i, sa + 60, i))
    D["B04"] = ("outer", int(np.argmax(o[:, 0])))
    D["B03"] = ("outer", amax(ko, up_o & (o[:, 0] > s1 - 25) & (o[:, 0] < s1 - 0.5)))
    D["B05"] = ("outer", amax(ko, lo_o & (o[:, 0] > s1 - 40)))
    D["B02"] = ("outer", at(up_o, s1 - 40)); D["B01"] = ("outer", at(up_o, s1 - 90))
    D["B06"] = ("outer", at(lo_o, s1 - 55)); D["B07"] = ("outer", at(lo_o, s1 - 100))
    D["B10"] = ("opening", int(np.argmax(i[:, 0])))
    D["B09"] = ("opening", amax(ki, up_i & (i[:, 0] > sb - 25) & (i[:, 0] < sb - 0.5)))
    D["B11"] = ("opening", amax(ki, lo_i & (i[:, 0] > sb - 45)))
    D["B08"] = ("opening", at(up_i, sb - 45, i)); D["B12"] = ("opening", at(lo_i, sb - 70, i))
    r3 = amax(ki, lo_i & (i[:, 0] > 360) & (i[:, 0] < 400))
    D["R03"] = ("opening", r3); s3 = i[r3, 0]
    for k, ds in zip(("R01", "R02", "R04", "R05"), (-20, -8, 8, 20)):
        D[k] = ("opening", at(lo_i, s3 + ds, i))
    return D


def main():
    m = Model(VER); D = define(m); out = {}
    for tag, (photo, frontal) in VIEWS.items():
        p = os.path.join(CAMDIR, f"cam_{VER}_{tag}.json")
        if not os.path.exists(p):
            continue
        cj = json.load(open(p)); cam = np.array(cj["cam"]); ei = EdgeImage(os.path.join(REF, photo + ".jpg"))
        meas = measure(m, ei, cam, step=1, lip=None if frontal else 6.5)
        rows = []
        for k in sorted(D):
            which, idx = D[k]
            sy = (m.o2 if which == "outer" else m.i2)[idx]; X = m.lift(sy[None])[0]
            d = meas[which]; uv = d["uv"][idx]
            r = dict(id=k, name=NAMES[k], s=round(float(sy[0]), 2), X=round(float(X[0]), 2), Y=round(float(X[1]), 2),
                     Z=round(float(X[2]), 2), cad_px=[round(float(uv[0]), 1), round(float(uv[1]), 1)])
            off = d["off_px"][idx]
            if (which == "opening" and not frontal) or not np.isfinite(off):
                r.update(oem_px=None, res_px=None, res_mm=None, conf="not measurable in this view")
            else:
                q = uv + off * d["nimg"][idx]
                r.update(oem_px=[round(float(q[0]), 1), round(float(q[1]), 1)], res_px=round(float(off), 2),
                         res_mm=round(float(d["dev_mm"][idx]), 2), conf="HIGH" if d["strength"][idx] > 15 else "MEDIUM")
            rows.append(r)
        out[tag] = dict(photo=photo, rows=rows)
        print(tag, " ".join(f"{r['id']}:{r['res_mm']}" for r in rows), flush=True)
    json.dump(out, open(os.path.join(OUT, f"landmarks_{VER}.json"), "w"), indent=1)


if __name__ == "__main__":
    main()
