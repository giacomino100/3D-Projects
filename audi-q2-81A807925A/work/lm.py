"""Frozen landmark system P01..P20 (front-face outer edge + opening edge).

Definitions (s = distance from the inner tip in the front view, y up):
  EXTREME landmarks (hand-picked on photos, 2D error):
    P01 inner tip (min s of outer)            P09 outer-most point (max s of outer)
    P03 opening start (min s of opening)      P16 opening outer-most point (max s of opening)
  EDGE landmarks (error = normal deviation measured by edge search, 1D):
    P02 top of the solid zone (max y of outer top edge for s < s(P03))
    P04 opening upper inner fillet (max curvature, opening upper half, s < s(P03)+40)
    P05/P06/P07 outer upper edge at 25/50/75 % of the s range
    P08 outer upper shoulder (max curvature, outer upper half, s > 0.85 L)
    P10 outer lower shoulder (max curvature, outer lower half, s > 0.80 L)
    P11/P12/P13 outer lower edge at 75/50/25 %
    P14 opening lower inner fillet (max curvature, opening lower half, s < s(P03)+60)
    P15 lower end of the solid zone (max curvature, outer lower half, s < 0.25 L)
    P17/P18 opening upper / lower edge at 50 %
    P19/P20 opening outer upper / lower fillet (max curvature, opening, s > s(P16)-40)
"""
import numpy as np

NAMES = {
    "P01": "inner tip (end of solid zone)", "P02": "top of solid zone", "P03": "opening start",
    "P04": "opening upper inner fillet", "P05": "outer upper edge 25%", "P06": "outer upper edge 50%",
    "P07": "outer upper edge 75%", "P08": "outer upper shoulder", "P09": "outer-most point",
    "P10": "outer lower shoulder", "P11": "outer lower edge 75%", "P12": "outer lower edge 50%",
    "P13": "outer lower edge 25%", "P14": "opening lower inner fillet", "P15": "lower end of solid zone",
    "P16": "opening outer-most point", "P17": "opening upper edge 50%", "P18": "opening lower edge 50%",
    "P19": "opening outer upper fillet", "P20": "opening outer lower fillet"}
EXTREME = {"P01", "P03", "P09", "P16"}


def _curv(p):
    d1 = (np.roll(p, -2, 0) - np.roll(p, 2, 0)) / 2
    d2 = np.roll(p, -2, 0) - 2 * p + np.roll(p, 2, 0)
    return np.abs(d1[:, 0] * d2[:, 1] - d1[:, 1] * d2[:, 0]) / (np.linalg.norm(d1, axis=1) ** 3 + 1e-9)


def define(model):
    """Return {Pxx: (contour, index)} on the model's sampled outlines (step=3 samples as in measure())."""
    o = model.o2[::3]; i = model.i2[::3]
    ko, ki = _curv(o), _curv(i)
    yo, yi = o[:, 1].mean(), i[:, 1].mean()
    s0, s1 = o[:, 0].min(), o[:, 0].max()
    up_o, lo_o = o[:, 1] > yo, o[:, 1] <= yo
    up_i, lo_i = i[:, 1] > yi, i[:, 1] <= yi
    sP03 = i[:, 0].min(); sP16 = i[:, 0].max()
    def argmax_mask(v, m):
        idx = np.where(m)[0]; return int(idx[np.argmax(v[idx])])
    def at_s(pts, mask, sv):
        idx = np.where(mask)[0]; return int(idx[np.argmin(np.abs(pts[idx, 0] - sv))])
    L = s1 - s0
    D = {
        "P01": ("outer", int(np.argmin(o[:, 0]))),
        "P02": ("outer", argmax_mask(o[:, 1], up_o & (o[:, 0] < sP03))),
        "P03": ("opening", int(np.argmin(i[:, 0]))),
        "P04": ("opening", argmax_mask(ki, up_i & (i[:, 0] < sP03 + 40))),
        "P05": ("outer", at_s(o, up_o, s0 + 0.25 * L)), "P06": ("outer", at_s(o, up_o, s0 + 0.50 * L)),
        "P07": ("outer", at_s(o, up_o, s0 + 0.75 * L)),
        "P08": ("outer", argmax_mask(ko, up_o & (o[:, 0] > s0 + 0.85 * L) & (o[:, 0] < s1 - 1.0))),
        "P09": ("outer", int(np.argmax(o[:, 0]))),
        "P10": ("outer", argmax_mask(ko, lo_o & (o[:, 0] > s0 + 0.80 * L))),
        "P11": ("outer", at_s(o, lo_o, s0 + 0.75 * L)), "P12": ("outer", at_s(o, lo_o, s0 + 0.50 * L)),
        "P13": ("outer", at_s(o, lo_o, s0 + 0.25 * L)),
        "P14": ("opening", argmax_mask(ki, lo_i & (i[:, 0] < sP03 + 60))),
        "P15": ("outer", argmax_mask(ko, lo_o & (o[:, 0] < s0 + 0.25 * L))),
        "P16": ("opening", int(np.argmax(i[:, 0]))),
        "P17": ("opening", at_s(i, up_i, 0.5 * (sP03 + sP16))), "P18": ("opening", at_s(i, lo_i, 0.5 * (sP03 + sP16))),
        "P19": ("opening", argmax_mask(ki, up_i & (i[:, 0] > sP16 - 40))),
        "P20": ("opening", argmax_mask(ki, lo_i & (i[:, 0] > sP16 - 40))),
    }
    return D


def table(model, meas, cam, picks, W, H, project):
    """Rows: landmark, model XYZ, OEM px, CAD px, err px, err mm, conf."""
    D = define(model); rows = []
    o = model.o2[::3]; i = model.i2[::3]
    for k in sorted(D):
        which, idx = D[k]
        sy = (o if which == "outer" else i)[idx]
        X = model.lift(sy[None])[0]
        cad = project(model.lift(sy[None]), cam, W, H)[0]
        d = meas[which]
        if k in EXTREME and k in picks:
            oem = np.array(picks[k], float)
            err_px = float(np.linalg.norm(oem - cad))
            err_mm = err_px / float(d["ppm"][idx])
            conf = "medium (hand pick ±3 px)"
        else:
            off = d["off_px"][idx]
            if not np.isfinite(off):
                rows.append(dict(id=k, name=NAMES[k], X=X, oem=None, cad=cad, err_px=None, err_mm=None, conf="not measurable"))
                continue
            oem = cad + off * np.asarray(d["nimg"][idx])
            err_px = float(abs(off)); err_mm = float(abs(d["dev_mm"][idx]))
            conf = "high" if d["strength"][idx] > 15 else "medium"
        rows.append(dict(id=k, name=NAMES[k], X=X, oem=oem, cad=cad, err_px=err_px, err_mm=err_mm, conf=conf))
    return rows
