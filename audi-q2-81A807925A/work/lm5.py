"""V5 landmark map P01..P24 (CLAUDE_V5 s.8). Same measuring rules as lm.py:
extreme landmarks with a hand pick -> 2-D error; edge landmarks -> 1-D normal error from edge search."""
import numpy as np
from lm import _curv

NAMES = {
    "P01": "wide-end outer nose (inner tip)", "P02": "wide-end upper max", "P03": "wide-end lower max (lower end of solid zone)",
    "P04": "opening start upper fillet", "P05": "opening start lower fillet", "P06": "opening start (min s)",
    "P07": "upper rail 20%", "P08": "upper rail 40%", "P09": "upper rail 60%", "P10": "upper rail 80%",
    "P11": "lower rail 20%", "P12": "lower rail 40%", "P13": "lower rail 60%", "P14": "lower rail 80%",
    "P15": "narrow-end upper shoulder", "P16": "narrowmost tip", "P17": "narrow-end lower shoulder",
    "P18": "opening outer-most point", "P19": "opening outer upper fillet", "P20": "opening outer lower fillet",
    "P21": "opening upper edge 50%", "P22": "opening lower edge 50%",
    "P23": "lower band step (opening lower edge, s~378)", "P24": "upper band step (opening upper edge, s~386)"}
PICK_ALIAS = {"P01": "P01", "P16": "P09", "P06": "P03", "P18": "P16"}     # hand picks stored with the V3 ids


def define(model):
    o = model.o2[::3]; i = model.i2[::3]
    ko, ki = _curv(o), _curv(i)
    yo, yi = o[:, 1].mean(), i[:, 1].mean()
    s0, s1 = o[:, 0].min(), o[:, 0].max(); L = s1 - s0
    up_o, lo_o, up_i, lo_i = o[:, 1] > yo, o[:, 1] <= yo, i[:, 1] > yi, i[:, 1] <= yi
    sa, sb = i[:, 0].min(), i[:, 0].max()
    am = lambda v, m: int(np.where(m)[0][np.argmax(v[np.where(m)[0]])])
    at = lambda p, m, s: int(np.where(m)[0][np.argmin(np.abs(p[np.where(m)[0], 0] - s))])
    D = {"P01": ("outer", int(np.argmin(o[:, 0]))),
         "P02": ("outer", am(o[:, 1], up_o & (o[:, 0] < sa))),
         "P03": ("outer", am(ko, lo_o & (o[:, 0] < s0 + 0.25 * L))),
         "P04": ("opening", am(ki, up_i & (i[:, 0] < sa + 40))),
         "P05": ("opening", am(ki, lo_i & (i[:, 0] < sa + 60))),
         "P06": ("opening", int(np.argmin(i[:, 0]))),
         "P15": ("outer", am(ko, up_o & (o[:, 0] > s0 + 0.85 * L) & (o[:, 0] < s1 - 1.0))),
         "P16": ("outer", int(np.argmax(o[:, 0]))),
         "P17": ("outer", am(ko, lo_o & (o[:, 0] > s0 + 0.80 * L))),
         "P18": ("opening", int(np.argmax(i[:, 0]))),
         "P19": ("opening", am(ki, up_i & (i[:, 0] > sb - 40))),
         "P20": ("opening", am(ki, lo_i & (i[:, 0] > sb - 40))),
         "P21": ("opening", at(i, up_i, 0.5 * (sa + sb))), "P22": ("opening", at(i, lo_i, 0.5 * (sa + sb))),
         "P23": ("opening", am(ki, lo_i & (i[:, 0] > 365) & (i[:, 0] < 395))),
         "P24": ("opening", am(ki, up_i & (i[:, 0] > 372) & (i[:, 0] < 400)))}
    for k, f in zip(("P07", "P08", "P09", "P10"), (0.2, 0.4, 0.6, 0.8)):
        D[k] = ("outer", at(o, up_o, s0 + f * L))
    for k, f in zip(("P11", "P12", "P13", "P14"), (0.2, 0.4, 0.6, 0.8)):
        D[k] = ("outer", at(o, lo_o, s0 + f * L))
    return dict(sorted(D.items()))


def table(model, meas, cam, picks, W, H, project, photo):
    D = define(model); rows = []
    o = model.o2[::3]; i = model.i2[::3]
    for k, (which, idx) in D.items():
        sy = (o if which == "outer" else i)[idx]
        X = model.lift(sy[None])[0]; cad = project(model.lift(sy[None]), cam, W, H)[0]
        d = meas[which]; pk = PICK_ALIAS.get(k)
        row = dict(landmark_id=k, name=NAMES[k], source_image=photo, cad_x_mm=X[0], cad_y_mm=X[1], cad_z_mm=X[2],
                   projected_x=cad[0], projected_y=cad[1])
        if pk and pk in picks:
            oem = np.array(picks[pk], float); err = float(np.linalg.norm(oem - cad))
            row.update(pixel_x=oem[0], pixel_y=oem[1], residual_px=err, residual_mm=err / float(d["ppm"][idx]),
                       confidence="MEDIUM (hand pick +-3 px)")
        else:
            off = d["off_px"][idx]
            if off is None or not np.isfinite(off):
                row.update(pixel_x=None, pixel_y=None, residual_px=None, residual_mm=None, confidence="not measurable in this view")
            else:
                oem = cad + off * np.asarray(d["nimg"][idx])
                row.update(pixel_x=oem[0], pixel_y=oem[1], residual_px=abs(off), residual_mm=abs(d["dev_mm"][idx]),
                           confidence="HIGH" if d["strength"][idx] > 15 else "MEDIUM")
        rows.append(row)
    return rows
