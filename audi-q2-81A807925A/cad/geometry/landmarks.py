"""Named landmarks P01..P11 on the outer visible edge (CLAUDE_REVISION_V2 s.7)
plus longitudinal profiles (Z, section rotation, visible-band widths).

All values reported in the right-handed CAD frame (X_cad = L - s).
"""
import math
import numpy as np

import parameters as P
from geometry import planform as PF
from geometry import surface as SF


def _n(v):
    v = np.asarray(v, float)
    return v / np.linalg.norm(v)


def _to_cad(v, point=False):
    v = np.asarray(v, float).copy()
    v[0] = (P.L - v[0]) if point else -v[0]
    return v


def face_normal(s, y, h=0.3):
    dzs = (SF.zf(s + h, y) - SF.zf(s - h, y)) / (2 * h)
    dzy = (SF.zf(s, y + h) - SF.zf(s, y - h)) / (2 * h)
    return _n([dzs, dzy, -1.0])          # outward (toward vehicle front), authoring frame


def band_width(p, nrm_in, opening):
    """Distance from an outer-edge point to the opening edge along the inward
    in-plane normal (visible band); returns None if the ray misses the opening."""
    best = None
    for t in np.linspace(0.5, 80, 800):
        q = p + nrm_in * t
        d = np.min(np.linalg.norm(opening - q, axis=1))
        if d < 0.6:
            best = t
            break
    return best


def landmarks():
    o = PF.outline_polyline("outer", 0.5)
    op = PF.outline_polyline("opening", 0.5)
    yc = 0.5 * (o[:, 1].max() + o[:, 1].min())
    top, bot = o[o[:, 1] > yc], o[o[:, 1] <= yc]
    s_min, s_max = o[:, 0].min(), o[:, 0].max()
    i_ext = int(np.argmax(o[:, 0]))
    # shoulders = max-curvature points above / below the outer-most point
    def curvature(pts):
        d1 = np.gradient(pts, axis=0); d2 = np.gradient(d1, axis=0)
        return np.abs(d1[:, 0] * d2[:, 1] - d1[:, 1] * d2[:, 0]) / (np.linalg.norm(d1, axis=1) ** 3 + 1e-9)
    k = curvature(o)
    near_out = o[:, 0] > s_max - 70
    up = near_out & (o[:, 1] > o[i_ext, 1]); lo = near_out & (o[:, 1] < o[i_ext, 1] - 5)
    i_osh_u = np.where(up)[0][np.argmax(k[up])] if up.any() else i_ext
    i_osh_l = np.where(lo)[0][np.argmax(k[lo])] if lo.any() else i_ext
    near_in = o[:, 0] < s_min + 60
    i_in_u = np.where(near_in & (o[:, 1] > yc))[0]; i_in_u = i_in_u[np.argmin(o[i_in_u, 0] - 0.3 * o[i_in_u, 1])]
    i_in_l = np.where(near_in & (o[:, 1] < yc))[0]; i_in_l = i_in_l[np.argmax(k[near_in & (o[:, 1] < yc)])] \
        if (near_in & (o[:, 1] < yc)).any() else i_in_u
    def at(edge, frac):
        sv = s_min + frac * (s_max - s_min)
        e = top if edge == "top" else bot
        return int(np.argmin(np.linalg.norm(o - e[np.argmin(np.abs(e[:, 0] - sv))], axis=1)))
    idx = [("P01 inner-upper end", i_in_u), ("P02 upper rail 25%", at("top", .25)),
           ("P03 upper rail 50%", at("top", .5)), ("P04 upper rail 75%", at("top", .75)),
           ("P05 outer-upper shoulder", i_osh_u), ("P06 outer-most point", i_ext),
           ("P07 outer-lower shoulder", i_osh_l), ("P08 lower rail 75%", at("bot", .75)),
           ("P09 lower rail 50%", at("bot", .5)), ("P10 lower rail 25%", at("bot", .25)),
           ("P11 inner-lower end", i_in_l)]
    cen = o.mean(axis=0)
    out = []
    for name, i in idx:
        p = o[i]; tg = _n(o[(i + 2) % len(o)] - o[i - 2])
        nin = _n([-tg[1], tg[0]])
        if np.dot(nin, cen - p) < 0:
            nin = -nin
        z = float(SF.zf(*p))
        dz = float(SF.zf(*(p + tg)) - z)
        tan3 = _n([tg[0], tg[1], dz])
        bw = band_width(p, nin, op)
        out.append(dict(name=name, s=round(float(p[0]), 2), X=round(float(P.L - p[0]), 2), Y=round(float(p[1]), 2),
                        Z=round(z, 2), tangent=np.round(_to_cad(tan3), 4).tolist(),
                        normal=np.round(_to_cad(face_normal(*p)), 4).tolist(),
                        band_width=None if bw is None else round(float(bw), 2),
                        curvature_radius=round(float(1 / max(k[i], 1e-6)), 1)))
    return out


def profiles(n=120):
    """Along s: Z (top/mid/bottom), section rotation, top/bottom visible band."""
    o = PF.outline_polyline("outer", 0.5); op = PF.outline_polyline("opening", 0.5)
    ss = np.linspace(o[:, 0].min() + 1, o[:, 0].max() - 1, n)
    rows = []
    for s in ss:
        col = o[np.abs(o[:, 0] - s) < 0.6]
        if len(col) < 2:
            continue
        yt, yb = col[:, 1].max(), col[:, 1].min()
        oc = op[np.abs(op[:, 0] - s) < 0.6]
        wt = wb = None
        if len(oc) >= 2:
            wt, wb = yt - oc[:, 1].max(), oc[:, 1].min() - yb
        ym = 0.5 * (yt + yb)
        rot = math.degrees(math.atan2(float(SF.zf(s, yt) - SF.zf(s, yb)), yt - yb))
        rows.append(dict(s=float(s), X=float(P.L - s), y_top=float(yt), y_bot=float(yb),
                         z_top=float(SF.zf(s, yt)), z_mid=float(SF.zf(s, ym)), z_bot=float(SF.zf(s, yb)),
                         rotation_deg=rot, band_top=wt, band_bot=wb, height=float(yt - yb)))
    return rows
