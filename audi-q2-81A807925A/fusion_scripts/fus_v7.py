import adsk.core, adsk.fusion
OUT = r"C:\Users\giaco\Documents\pezzo audi\TERMINAL_REFINEMENT_V7\renders"
STEP = r"C:\Users\giaco\Documents\pezzo audi\cad\exports\V7\81A807925A_V7.step"
F3D = r"C:\Users\giaco\Documents\pezzo audi\cad\fusion\81A807925A_V7_terminal_refinement2.f3d"
T = (23.6, -2.8, 2.0)
A = (44.5, -2.0, -0.3)      # END A (wide end), cm
B = (1.5, -1.0, 4.5)        # END B (loop end), cm
# name, target, eye, ortho, fit, angle/extent
VIEWS = [
    ("01_full_front", T, (T[0], T[1], T[2] - 120), True, True, None),
    ("02_full_rear", T, (T[0], T[1], T[2] + 120), True, True, None),
    ("03_full_oblique", T, (T[0] - 60, T[1] + 50, T[2] - 90), False, True, 0.45),
    ("04_END_A_front_closeup", A, (A[0], A[1], A[2] - 25), False, False, 0.6),
    ("05_END_A_oblique_closeup", A, (A[0] + 14, A[1] + 9, A[2] - 20), False, False, 0.6),
    ("06_END_A_low_oblique", A, (A[0] - 12, A[1] - 6, A[2] - 22), False, False, 0.6),
    ("07_END_B_front_closeup", B, (B[0], B[1], B[2] - 25), False, False, 0.6),
    ("08_END_B_oblique_closeup", B, (B[0] - 14, B[1] + 9, B[2] - 20), False, False, 0.6),
    ("09_END_B_low_oblique", B, (B[0] + 12, B[1] - 6, B[2] - 22), False, False, 0.6),
]


def run(_context: str):
    app = adsk.core.Application.get()
    app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)
    design = adsk.fusion.Design.cast(app.activeProduct)
    design.designType = adsk.fusion.DesignTypes.DirectDesignType
    im = app.importManager
    im.importToTarget(im.createSTEPImportOptions(STEP), design.rootComponent)
    for occ in design.rootComponent.allOccurrences:
        for b in occ.bRepBodies:
            print(occ.name, "solid" if b.isSolid else "NOT SOLID", f"vol_mm3={b.volume*1000:.1f}", "faces", b.faces.count)
    em = design.exportManager
    print("f3d export:", em.execute(em.createFusionArchiveExportOptions(F3D)))
    vp = app.activeViewport
    vp.visualStyle = adsk.core.VisualStyles.ShadedWithVisibleEdgesOnlyVisualStyle
    for name, tgt, eye, ortho, fit, ang in VIEWS:
        cam = vp.camera
        cam.isSmoothTransition = False
        cam.cameraType = adsk.core.CameraTypes.OrthographicCameraType if ortho else adsk.core.CameraTypes.PerspectiveCameraType
        cam.eye = adsk.core.Point3D.create(*eye)
        cam.target = adsk.core.Point3D.create(*tgt)
        cam.upVector = adsk.core.Vector3D.create(0, 1, 0)
        cam.isFitView = False
        if not ortho:
            cam.perspectiveAngle = ang
        else:
            cam.viewExtents = 60.0
        vp.camera = cam
        vp.refresh(); adsk.doEvents(); adsk.doEvents()
        if fit and ortho:
            vp.fit(); vp.refresh(); adsk.doEvents()
        print(name, vp.saveAsImageFile(OUT + "\\" + name + ".png", 2000, 1100))
