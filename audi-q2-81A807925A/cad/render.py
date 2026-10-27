"""Offscreen renders with an explicit, documented camera convention.

CAD frame (right-handed): X toward vehicle right (= toward the INNER tip of
this LEFT part), Y up, Z rearward (into the vehicle).
  front : camera in front of the car (-Z) looking rearward  -> inner tip on the LEFT
  rear  : camera behind the part (+Z) looking forward        -> inner tip on the RIGHT
  top   : camera above (+Y) looking down, vehicle front at the bottom of the image
  side  : camera on the outer side (-X, wheel-arch side) looking toward the vehicle centre
  iso   : front / outer / above
    .venv\\Scripts\\python cad\\render.py
"""
import os
import sys

import pyvista as pv

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import parameters as P  # noqa: E402

EXP = os.path.join(HERE, "exports")
OUT = os.path.join(os.path.dirname(HERE), "renders")
os.makedirs(OUT, exist_ok=True)

C = (P.L / 2, -P.H / 2, 10.0)
D = 1400.0
VIEWS = {
    #        camera position                       view-up       label
    "front": ((C[0], C[1], C[2] - D), (0, 1, 0), "FRONT  (from vehicle front, inner tip on the left)"),
    "rear":  ((C[0], C[1], C[2] + D), (0, 1, 0), "REAR  (B-side, clips; inner tip on the right)"),
    "top":   ((C[0], C[1] + D, C[2]), (0, 0, 1), "TOP  (from above; vehicle front at the bottom)"),
    "side":  ((C[0] - D, C[1], C[2]), (0, 1, 0), "SIDE  (from wheel-arch side; front to the left)"),
    "iso":   ((C[0] - 0.55 * D, C[1] + 0.45 * D, C[2] - 0.75 * D), (0, 1, 0), "ISO  (front / outer / above)"),
    "iso_rear": ((C[0] + 0.5 * D, C[1] + 0.5 * D, C[2] + 0.75 * D), (0, 1, 0), "ISO REAR  (B-side)"),
}


def main(version="V1"):
    exp = EXP if version == "V1" else os.path.join(EXP, "V2")
    body = pv.read(os.path.join(exp, f"81A807925A_{version}_body.stl"))
    clips = pv.read(os.path.join(exp, f"81A807925A_{version}_clips.stl"))
    for name, (pos, up, label) in VIEWS.items():
        pl = pv.Plotter(off_screen=True, window_size=(1800, 900))
        pl.set_background("white")
        pl.add_mesh(body, color=(0.78, 0.79, 0.81), smooth_shading=False, specular=0.4,
                    show_edges=False)
        pl.add_mesh(clips, color=(0.90, 0.45, 0.10), smooth_shading=False)
        pl.add_axes(line_width=3, labels_off=False)
        pl.camera.position = pos
        pl.camera.focal_point = C
        pl.camera.up = up
        if name in ("front", "rear", "top", "side"):
            pl.enable_parallel_projection()
        pl.reset_camera(bounds=body.bounds)
        pl.camera.zoom({"side": 4.0}.get(name, 1.15))
        pl.add_text(f"81A807925A TB2  CAD {version} (shape prototype)  -  {label}", font_size=11, color="black")
        pl.add_text("X: vehicle right (inner)   Y: up   Z: rearward   |  not production geometry",
                    position="lower_left", font_size=9, color="gray")
        fname = f"{name}.png" if version == "V1" else f"V2_{ {'iso': 'iso_front'}.get(name, name) }.png"
        pl.screenshot(os.path.join(OUT, fname))
        pl.close()
        print("saved", name)


if __name__ == "__main__" and "--v2" in sys.argv:
    main("V2")
elif __name__ == "__main__" and "--coupons" not in sys.argv:
    main()


def render_coupons():
    """One panel per clip family: trim patch (grey) + nominal receiver c=0.30 (dark)."""
    cdir = os.path.join(EXP, "clip_test_coupons")
    pl = pv.Plotter(off_screen=True, window_size=(1800, 600), shape=(1, 3))
    for i, fam in enumerate(("EYELET", "HOOK_TAB", "TONGUE")):
        pl.subplot(0, i)
        pl.set_background("white")
        pl.add_mesh(pv.read(os.path.join(cdir, f"coupon_{fam}_trim.stl")), color=(0.78, 0.79, 0.81))
        pl.add_mesh(pv.read(os.path.join(cdir, f"coupon_{fam}_c0.30_receiver.stl")), color=(0.2, 0.2, 0.22),
                    opacity=0.85)
        pl.add_text(f"{fam}  (trim patch + 681A receiver surrogate, c=0.30)", font_size=9, color="black")
        pl.camera_position = "iso"
        pl.camera.azimuth = 35
        pl.reset_camera()
    pl.screenshot(os.path.join(OUT, "clip_coupons.png"))
    pl.close()
    print("saved clip_coupons")


if __name__ == "__main__" and "--coupons" in sys.argv:
    render_coupons()
