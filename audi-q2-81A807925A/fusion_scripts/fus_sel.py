import adsk.core, adsk.fusion
S = r"C:\Users\giaco\Documents\pezzo audi\fusion_scripts\out\user_view5.png"
L = 472.0


def run(_context: str):
    app = adsk.core.Application.get()
    sel = app.userInterface.activeSelections
    print("selections", sel.count)
    for i in range(sel.count):
        e = sel.item(i).entity
        print(i, e.objectType)
        if e.objectType.endswith("BRepEdge"):
            e = adsk.fusion.BRepEdge.cast(e)
            bb = e.boundingBox
            print(" len mm", round(e.length * 10, 1), "bbox X", round(bb.minPoint.x * 10, 1), round(bb.maxPoint.x * 10, 1),
                  "Y", round(bb.minPoint.y * 10, 1), round(bb.maxPoint.y * 10, 1), "Z", round(bb.minPoint.z * 10, 1), round(bb.maxPoint.z * 10, 1))
            print(" faces", [(type(f.geometry).__name__, round(f.area * 100, 1)) for f in e.faces], "body", e.body.name, e.body.parentComponent.name)
            ev = e.evaluator; ok, a, b = ev.getParameterExtents()
            pts = []
            for k in range(13):
                ok, p = ev.getPointAtParameter(a + (b - a) * k / 12)
                pts.append((round(L - p.x * 10, 1), round(p.y * 10, 2), round(p.z * 10, 2)))
            print(" pts (s, y, z) mm", pts)
    c = app.activeViewport.camera
    print("eye", [round(v, 2) for v in (c.eye.x, c.eye.y, c.eye.z)], "target", [round(v, 2) for v in (c.target.x, c.target.y, c.target.z)],
          "up", [round(v, 2) for v in (c.upVector.x, c.upVector.y, c.upVector.z)])
    app.activeViewport.saveAsImageFile(S, 1800, 1000)
