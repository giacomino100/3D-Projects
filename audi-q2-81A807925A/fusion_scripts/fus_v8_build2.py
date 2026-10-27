import adsk.core, adsk.fusion, os, time, traceback
D = r"C:\Users\giaco\Documents\pezzo audi\cad\exports\V8\fusion_parts"
CL = r"C:\Users\giaco\Documents\pezzo audi\cad\exports\V7\clips"
LOG = D + r"\build_log.txt"
SKIP_CLIPS = ("CLIP_C04",)      # END B tongue: sticks out of the part (user feedback) -> removed
F3D = r"C:\Users\giaco\Documents\pezzo audi\cad\fusion\81A807925A_V8.f3d"
STEP = r"C:\Users\giaco\Documents\pezzo audi\cad\exports\V8\81A807925A_V8.step"


def run(_context: str):
    lg = open(LOG, "w"); t = time.time()
    w = lambda s: (lg.write(f"{time.time() - t:6.1f}s {s}\n"), lg.flush())
    app = adsk.core.Application.get()
    app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)
    d = adsk.fusion.Design.cast(app.activeProduct)
    d.designType = adsk.fusion.DesignTypes.DirectDesignType
    root = d.rootComponent; im = app.importManager; tm = adsk.fusion.TemporaryBRepManager.get()

    def imp(path):
        im.importToTarget(im.createSTEPImportOptions(path), root)
        return root.occurrences.item(root.occurrences.count - 1)
    skin, lip, ret = (imp(D + "\\" + n + ".step") for n in ("skin_v8_occ", "lip_v8", "ret_open_v8"))
    body = tm.copy(skin.bRepBodies.item(0))
    w(f"skin solid={skin.bRepBodies.item(0).isSolid} vol={body.volume * 1000:.0f}")
    for name, o in (("ret_open", ret), ("lip", lip)):
        try:
            tm.booleanOperation(body, tm.copy(o.bRepBodies.item(0)), adsk.fusion.BooleanTypes.UnionBooleanType)
            w(f"{name} lumps={body.lumps.count} closed={[s.isClosed for s in body.shells]} vol={body.volume * 1000:.0f}")
        except Exception:
            w(name + " FAILED " + traceback.format_exc()[-200:])
    for v in [s for s in body.shells if s.isVoid]:      # tiny trapped voids between returns and skin
        bb = v.boundingBox; e = 0.005
        c = adsk.core.Point3D.create((bb.minPoint.x + bb.maxPoint.x) / 2, (bb.minPoint.y + bb.maxPoint.y) / 2, (bb.minPoint.z + bb.maxPoint.z) / 2)
        obb = adsk.core.OrientedBoundingBox3D.create(c, adsk.core.Vector3D.create(1, 0, 0), adsk.core.Vector3D.create(0, 1, 0),
                                                     bb.maxPoint.x - bb.minPoint.x + 2 * e, bb.maxPoint.y - bb.minPoint.y + 2 * e, bb.maxPoint.z - bb.minPoint.z + 2 * e)
        tm.booleanOperation(body, tm.createBox(obb), adsk.fusion.BooleanTypes.UnionBooleanType)
        w(f"void filled area_mm2={v.area * 100:.2f}")
    w(f"shells={[(s.isClosed, s.isVoid) for s in body.shells]}")
    for o in (skin, lip, ret):
        o.deleteMe()
    bo = root.occurrences.addNewComponent(adsk.core.Matrix3D.create())
    bo.component.name = "BODY_81A807925A_V8"
    nb = bo.component.bRepBodies.add(body); nb.name = "Corpo trim V8"
    w(f"body solid={nb.isSolid} faces={nb.faces.count} vol={nb.volume * 1000:.0f}")
    for f in sorted(os.listdir(CL)):
        if f.endswith(".step") and f[:-5] not in SKIP_CLIPS:
            o = imp(os.path.join(CL, f)); o.component.name = f[:-5]
            a = tm.copy(nb); tm.booleanOperation(a, tm.copy(o.bRepBodies.item(0)), adsk.fusion.BooleanTypes.IntersectionBooleanType)
            w(f"{f[:-5]} attached overlap_mm3={a.volume * 1000:.0f}")
    em = d.exportManager
    w(f"f3d {em.execute(em.createFusionArchiveExportOptions(F3D))} step {em.execute(em.createSTEPExportOptions(STEP, root))}")
    vp = app.activeViewport
    vp.visualStyle = adsk.core.VisualStyles.ShadedWithVisibleEdgesOnlyVisualStyle
    cam = vp.camera; cam.isSmoothTransition = False
    cam.cameraType = adsk.core.CameraTypes.PerspectiveCameraType
    cam.eye = adsk.core.Point3D.create(29.08, -2.73, -8.18); cam.target = adsk.core.Point3D.create(30.77, -2.87, -6.25)
    cam.upVector = adsk.core.Vector3D.create(0.03, 1.0, 0.04); cam.isFitView = False; cam.perspectiveAngle = 0.6187
    vp.camera = cam; vp.refresh()
    vp.saveAsImageFile(D + r"\check_user_view3.png", 1800, 1000)
    w("done"); lg.close()
