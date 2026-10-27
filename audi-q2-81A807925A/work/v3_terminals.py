"""Terminal correction (outer terminal upper boundary + tip: objective bg-edge extraction, reg_out/terminal_auto.json;
inner terminal + opening loop end + image-bottom edges: manual tracing) on 925_alB_1.
Original: Terminal correction from manual tracing on 925_alB_1 (frontal, 2.6x zoom crops
work/term_inner.jpg, work/term_outer.jpg). Image px -> (s, y) by back-projection on the
current V3 surface with the registered camera; the outer outline is replaced in the two
terminal zones (and the opening in the loop-end zone), blended into the rest."""
import json, os, re, numpy as np
from scipy.interpolate import splprep, splev
from scipy.optimize import least_squares
from reg import *

INNER = [(2200, 840), (2238.5, 847), (2277, 858.5), (2315, 876), (2338.5, 889), (2361.5, 910), (2384.6, 933.5),
         (2407.7, 954.6), (2430.8, 977.7), (2453.8, 1004.6), (2477, 1031.5), (2496, 1054.6), (2509.6, 1072),
         (2515.4, 1083.5), (2507.7, 1093.8), (2492, 1097.7), (2469, 1098.5), (2430.8, 1097.7), (2353.8, 1095.4),
         (2277, 1093), (2200, 1091)]
OUTER = [(460.0, 840.0), (450.0, 842.0), (440.0, 844.0), (430.0, 845.0), (420.0, 847.0), (410.0, 850.0), (400.0, 852.0), (390.0, 855.0), (380.0, 858.0), (370.0, 862.0), (360.0, 865.0), (350.0, 869.0), (340.0, 874.0), (330.0, 879.0), (320.0, 885.0), (310.0, 891.0), (300.0, 896.0), (290.0, 903.0), (280.0, 910.0), (270.0, 917.0), (260.0, 925.0), (250.0, 933.0), (240.0, 941.0), (230.0, 949.0), (220.0, 958.0), (210.0, 966.0), (200.0, 975.0), (190.0, 985.0), (180.0, 995.0), (170.0, 1004.0), (160.0, 1014.0), (150.0, 1023.0), (140.0, 1034.0), (130.0, 1043.0), (120.0, 1055.0), (110.0, 1065.0), (100.0, 1077.0), (97.0, 1080.0), (94.0, 1084.0), (92.0, 1088.0), (91.0, 1092.0), (92.0, 1096.0), (94.0, 1100.0), (97, 1100), (128, 1104), (185, 1101.5), (262, 1098), (330, 1094.5), (416, 1093), (450, 1091)]
OPEN_END = [(416, 893), (339, 925), (285, 952), (243, 987), (216, 1014), (197, 1033), (187, 1052), (197, 1062),
            (262, 1063), (416, 1058)]


def bp(model, cam, W, H, uv, ref_sy, ref_uv):
    out = []
    for u in uv:
        u = np.array(u, float)
        j = int(np.argmin(np.linalg.norm(ref_uv - u, axis=1)))
        f = lambda p: project(model.lift(np.array([p])), cam, W, H)[0] - u
        out.append(least_squares(f, ref_sy[j], x_scale=[10, 10]).x)
    return np.array(out)


def splice(dense, new_pts, s_lo, s_hi):
    """Replace the part of the closed `dense` polyline with s in [s_lo, s_hi] (one connected run)
    by `new_pts` (ordered along the contour), keep the rest, return closed point list."""
    inside = (dense[:, 0] >= s_lo) & (dense[:, 0] <= s_hi)
    idx = np.where(~inside)[0]
    # rotate so that the kept run is contiguous and the gap is at the end
    k0 = idx[np.argmax(np.diff(np.r_[idx, idx[0] + len(dense)]))] + 1
    order = np.r_[np.arange(k0, len(dense)), np.arange(0, k0)]
    kept = dense[order][~inside[order]]
    a, b = kept[-1], kept[0]
    # orient new_pts from a to b
    if np.linalg.norm(new_pts[0] - a) > np.linalg.norm(new_pts[-1] - a):
        new_pts = new_pts[::-1]
    return np.vstack([kept, new_pts])


def refit(pts, n_out, smooth):
    c = np.vstack([pts, pts[:1]])
    tck, _ = splprep([c[:, 0], c[:, 1]], s=smooth * len(pts), per=True, k=3)
    x, y = splev(np.linspace(0, 1, n_out, endpoint=False), tck)
    return np.c_[x, y]


def main():
    m = Model("V3"); W, H = 2560, 1917
    cam = np.load(os.path.join("reg_out", "cam_V3A_925_alB_1.npy"))
    o, i = m.o2, m.i2
    uo, ui = project(m.o3, cam, W, H), project(m.i3, cam, W, H)
    pin = bp(m, cam, W, H, INNER, o, uo); pout = bp(m, cam, W, H, OUTER, o, uo); pop = bp(m, cam, W, H, OPEN_END, i, ui)
    print("inner terminal s range", pin[:, 0].min().round(1), pin[:, 0].max().round(1), "tip", pin[np.argmin(pin[:, 0])].round(2))
    print("outer terminal s range", pout[:, 0].min().round(1), pout[:, 0].max().round(1), "outer-most", pout[np.argmax(pout[:, 0])].round(2))
    print("opening loop end", pop[np.argmax(pop[:, 0])].round(2))
    od = PF_dense(m, "outer"); idn = PF_dense(m, "opening")
    o2 = splice(od, pin, -5, pin[:, 0].max()); o2 = splice(o2, pout, pout[:, 0].min(), 1000)
    i2 = splice(idn, pop, pop[:, 0].min(), 1000)
    O = refit(o2, 140, 0.0015); I = refit(i2, 120, 0.0015)
    json.dump(dict(inner=pin.tolist(), outer=pout.tolist(), opening_end=pop.tolist()), open("reg_out/terminals_bp.json", "w"), indent=1)
    src = open("../cad/parameters_v3.py", encoding="utf-8").read()
    fmt = lambda a: "[\n" + "".join(f"    ({x:8.2f}, {y:7.2f}),\n" for x, y in a) + "]"
    src = re.sub(r"OUTER_CPS = \[.*?\n\]", "OUTER_CPS = " + fmt(O), src, count=1, flags=re.S)
    src = re.sub(r"OPENING_CPS = \[.*?\n\]", "OPENING_CPS = " + fmt(I), src, count=1, flags=re.S)
    src = src.replace('STAGE = "V3-A final"', 'STAGE = "V3-A final + terminals (manual tracing on 925_alB_1)"')
    open("../cad/parameters_v3.py", "w", encoding="utf-8").write(src)
    print("new s extent", O[:, 0].min().round(2), O[:, 0].max().round(2), "y range", O[:, 1].min().round(2), O[:, 1].max().round(2))


def PF_dense(m, which):
    return m.PF.spline_points(which, 3000)


if __name__ == "__main__":
    main()
