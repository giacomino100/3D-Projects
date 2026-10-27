import adsk.core, adsk.fusion
S = r"C:\Users\giaco\Documents\pezzo audi\cad\exports\V8\fusion_parts"


def run(_context: str):
    app = adsk.core.Application.get()
    vp = app.activeViewport
    vp.visualStyle = adsk.core.VisualStyles.ShadedWithVisibleEdgesOnlyVisualStyle
    views = (("check_endB", (-4.24, 5.87, -14.53), (11.16, -8.1, 8.07), (0.26, 0.89, 0.38)),
             ("check_view5", (2.93, 0.01, -26.1), (16.83, -1.85, 5.96), (0.02, 1.0, 0.05)))
    for name, eye, tgt, up in views:
        cam = vp.camera; cam.isSmoothTransition = False; cam.cameraType = adsk.core.CameraTypes.PerspectiveCameraType
        cam.eye = adsk.core.Point3D.create(*eye); cam.target = adsk.core.Point3D.create(*tgt)
        cam.upVector = adsk.core.Vector3D.create(*up); cam.isFitView = False; cam.perspectiveAngle = 0.619
        vp.camera = cam; vp.refresh(); adsk.doEvents(); adsk.doEvents()
        vp.saveAsImageFile(S + "\\" + name + ".png", 1800, 1000)
    print("ok")
