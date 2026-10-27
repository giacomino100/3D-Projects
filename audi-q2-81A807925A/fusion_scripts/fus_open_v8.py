import adsk.core, adsk.fusion
F3D = r"C:\Users\giaco\Documents\pezzo audi\cad\fusion\81A807925A_V8.f3d"


def run(_context: str):
    app = adsk.core.Application.get()
    app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)
    d = adsk.fusion.Design.cast(app.activeProduct)
    im = app.importManager
    im.importToTarget(im.createFusionArchiveImportOptions(F3D), d.rootComponent)
    occ = [o.fullPathName for o in d.rootComponent.allOccurrences]
    vp = app.activeViewport
    vp.visualStyle = adsk.core.VisualStyles.ShadedWithVisibleEdgesOnlyVisualStyle
    cam = vp.camera; cam.isSmoothTransition = False
    cam.cameraType = adsk.core.CameraTypes.PerspectiveCameraType
    cam.eye = adsk.core.Point3D.create(-36.4, 47.2, -88.0); cam.target = adsk.core.Point3D.create(23.6, -2.8, 2.0)
    cam.upVector = adsk.core.Vector3D.create(0, 1, 0); cam.isFitView = True
    vp.camera = cam; vp.refresh(); vp.fit()
    print("opened", len(occ), occ[:10])
