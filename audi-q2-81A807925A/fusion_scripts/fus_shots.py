import adsk.core, adsk.fusion, os
OUT = r"C:\Users\giaco\Documents\pezzo audi\TERMINAL_REFINEMENT_V8\screenshots_V8"
C = (23.6, -2.8, 2.0)          # part centre, cm (CAD frame: X to vehicle right, Y up, Z rearward)
A = (44.5, -2.0, -0.3)         # END A (wide end with the recess)
B = (1.5, -1.0, 4.5)           # END B (narrow loop)
M = (23.6, -2.6, -0.4)         # middle of the rails
D = 120.0
# name, target, eye offset, up, ortho, fit, perspective angle
VIEWS = [
    ("01_front", C, (0, 0, -D), (0, 1, 0), True, True, None),
    ("02_rear", C, (0, 0, D), (0, 1, 0), True, True, None),
    ("03_top", C, (0, D, 0), (0, 0, -1), True, True, None),
    ("04_bottom", C, (0, -D, 0), (0, 0, 1), True, True, None),
    ("05_side_END_A", C, (D, 0, 0), (0, 1, 0), True, True, None),
    ("06_side_END_B", C, (-D, 0, 0), (0, 1, 0), True, True, None),
    ("07_iso_front_left_top", C, (-60, 50, -90), (0, 1, 0), False, True, 0.45),
    ("08_iso_front_right_top", C, (60, 50, -90), (0, 1, 0), False, True, 0.45),
    ("09_iso_front_left_bottom", C, (-60, -50, -90), (0, 1, 0), False, True, 0.45),
    ("10_iso_front_right_bottom", C, (60, -50, -90), (0, 1, 0), False, True, 0.45),
    ("11_iso_rear_left_top", C, (-60, 50, 90), (0, 1, 0), False, True, 0.45),
    ("12_iso_rear_right_top", C, (60, 50, 90), (0, 1, 0), False, True, 0.45),
    ("13_END_A_front_closeup", A, (0, 0, -25), (0, 1, 0), False, False, 0.6),
    ("14_END_A_oblique_top", A, (14, 9, -20), (0, 1, 0), False, False, 0.6),
    ("15_END_A_oblique_low", A, (-12, -6, -22), (0, 1, 0), False, False, 0.6),
    ("16_END_A_grazing", (34.6, -1.39, -5.23), (-5.22, 1.23, -6.37), (0.09, 0.99, 0.11), False, False, 0.62),
    ("17_END_B_front_closeup", B, (0, 0, -25), (0, 1, 0), False, False, 0.6),
    ("18_END_B_oblique_top", B, (-14, 9, -20), (0, 1, 0), False, False, 0.6),
    ("19_END_B_oblique_low", B, (12, -6, -22), (0, 1, 0), False, False, 0.6),
    ("20_END_B_grazing", (11.16, -8.1, 8.07), (-15.4, 13.97, -22.6), (0.26, 0.89, 0.38), False, False, 0.62),
    ("21_rails_middle_front", M, (0, 0, -27.5), (0, 1, 0), False, False, 0.62),
    ("22_rails_middle_oblique", M, (-10, 10, -22), (0, 1, 0), False, False, 0.62),
    ("23_rear_END_A_clips", A, (10, 8, 22), (0, 1, 0), False, False, 0.6),
    ("24_rear_END_B_clips", B, (-10, 8, 22), (0, 1, 0), False, False, 0.6),
]


def run(_context: str):
    os.makedirs(OUT, exist_ok=True)
    app = adsk.core.Application.get()
    vp = app.activeViewport
    vp.visualStyle = adsk.core.VisualStyles.ShadedWithVisibleEdgesOnlyVisualStyle
    for name, tgt, off, up, ortho, fit, ang in VIEWS:
        cam = vp.camera; cam.isSmoothTransition = False
        cam.cameraType = adsk.core.CameraTypes.OrthographicCameraType if ortho else adsk.core.CameraTypes.PerspectiveCameraType
        cam.target = adsk.core.Point3D.create(*tgt)
        cam.eye = adsk.core.Point3D.create(tgt[0] + off[0], tgt[1] + off[1], tgt[2] + off[2])
        cam.upVector = adsk.core.Vector3D.create(*up)
        cam.isFitView = False
        if ang:
            cam.perspectiveAngle = ang
        vp.camera = cam; vp.refresh(); adsk.doEvents(); adsk.doEvents()
        if fit:
            vp.fit(); vp.refresh(); adsk.doEvents(); adsk.doEvents()
        vp.saveAsImageFile(OUT + "\\" + name + ".png", 2000, 1200)
    print("saved", len(VIEWS))
