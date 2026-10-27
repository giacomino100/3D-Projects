import adsk.core
S = r"C:\Users\giaco\Documents\pezzo audi\fusion_scripts\out\user_view7.png"


def run(_context: str):
    app = adsk.core.Application.get()
    c = app.activeViewport.camera
    print("eye", [round(v, 2) for v in (c.eye.x, c.eye.y, c.eye.z)], "target", [round(v, 2) for v in (c.target.x, c.target.y, c.target.z)],
          "up", [round(v, 2) for v in (c.upVector.x, c.upVector.y, c.upVector.z)], "sel", app.userInterface.activeSelections.count)
    app.activeViewport.saveAsImageFile(S, 1800, 1000)
