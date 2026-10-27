"""Manual station readings on 925_alB_1 (frontal, Leo-b sample, 2560 px) -> (s, y).

Readings: image y (px) of the 4 edges at image column x, read on 4x zoom strips
(work/st_alB1_a.png, st_alB1_b.png). Photo is rotated 180 deg: image TOP edge =
installed BOTTOM edge. The grey band just inside the opening on the image-bottom
rail is a face crease (it also exists on the plate where there is no opening), so
the opening edge is taken at the start of that band.
Back-projection: ray / face-surface intersection with the camera registered on
the current V3-A outline (cam_V3A_925_alB_1.npy).
"""
import json, os, numpy as np
from scipy.optimize import least_squares
from reg import *

# x: (img_top_outer, img_top_opening, img_bot_opening, img_bot_outer)   None = not present
READ = {
    2380: (925.0, None, None, 1096.0), 2250: (847.5, None, None, 1092.5), 2100: (834.0, None, None, 1091.0),
    1950: (830.0, None, None, 1089.0), 1800: (827.0, 890.0, 1043.7, 1087.0), 1600: (824.0, 884.0, 1041.0, 1084.5),
    1400: (822.0, 881.0, 1039.0, 1083.5), 1200: (822.0, 880.0, 1037.5, 1083.5), 1000: (824.0, 881.0, 1038.5, 1084.5),
    800: (826.0, 882.0, 1041.0, 1086.0), 600: (832.0, 887.0, 1045.0, 1089.0),
    590: (831.0, 885.0, None, None), 565: (833.0, 869.0, None, None),          # either side of the band step
    550: (None, None, 1046.0, 1089.5), 510: (None, None, 1051.5, 1090.0), 470: (None, None, 1054.0, 1091.5),
    450: (842.0, 879.5, 1055.0, 1091.0), 330: (887.0, 924.0, 1060.0, 1094.5), 220: (980.0, 1020.0, 1066.0, 1099.0),
}
KEYS = ["img_top_outer", "img_top_opening", "img_bot_opening", "img_bot_outer"]


def backproject(model, cam, W, H, u, sy0):
    f = lambda p: project(model.lift(np.array([p])), cam, W, H)[0] - u
    return least_squares(f, sy0, x_scale=[10, 10]).x


def main():
    model = Model("V3")
    cam = np.load(os.path.join("reg_out", "cam_V3A_925_alB_1.npy"))
    W, H = 2560, 1917
    o, i = model.o2, model.i2
    uo = project(model.o3, cam, W, H); ui = project(model.i3, cam, W, H)
    out = []
    for x, vals in READ.items():
        for k, v in zip(KEYS, vals):
            if v is None:
                continue
            u = np.array([x, v], float)
            ref, ref_uv = (o, uo) if "outer" in k else (i, ui)
            j = int(np.argmin(np.linalg.norm(ref_uv - u, axis=1)))
            s, y = backproject(model, cam, W, H, u, ref[j])
            # signed deviation from the current model edge, measured in y (mm)
            col = ref[np.abs(ref[:, 0] - s) < 1.0]
            yy = col[np.argmin(np.abs(col[:, 1] - y)), 1] if len(col) else np.nan
            out.append(dict(x_px=x, edge=k, y_px=v, s=round(float(s), 2), y=round(float(y), 2),
                            model_y=round(float(yy), 2), dy=round(float(y - yy), 2)))
    json.dump(out, open(os.path.join("reg_out", "stations_alB1.json"), "w"), indent=1)
    for r in out:
        print(r)


if __name__ == "__main__":
    main()
