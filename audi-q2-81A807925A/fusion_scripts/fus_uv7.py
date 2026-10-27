import adsk.core
S = r"C:\Users\giaco\Documents\pezzo audi\fusion_scripts\out\user_view7_new.png"


def run(_context: str):
    app = adsk.core.Application.get()
    vp = app.activeViewport
    vp.visualStyle = adsk.core.VisualStyles.ShadedWithVisibleEdgesOnlyVisualStyle
    cam = vp.camera; cam.isSmoothTransition = False
    cam.cameraType = adsk.core.CameraTypes.PerspectiveCameraType
    t = (30.77, -2.87, -6.25); e = (29.08, -2.73, -8.18)
    k = 7.0                                   # same direction as the user's view, camera pulled back to see END A
    cam.target = adsk.core.Point3D.create(*t)
    cam.eye = adsk.core.Point3D.create(t[0] + k * (e[0] - t[0]), t[1] + k * (e[1] - t[1]), t[2] + k * (e[2] - t[2]))
    cam.upVector = adsk.core.Vector3D.create(0.03, 1.0, 0.04); cam.isFitView = False; cam.perspectiveAngle = 0.62
    vp.camera = cam; vp.refresh(); adsk.doEvents(); adsk.doEvents()
    vp.saveAsImageFile(S, 1800, 1000)
    print("ok")
