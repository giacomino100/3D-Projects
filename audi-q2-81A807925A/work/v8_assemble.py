"""V8 final assembly in OCC: smooth skin (thickened + trimmed in Fusion) + V8 returns + V7 clips."""
import os, glob, time
import cadquery as cq
from reg import ROOT
t0 = time.time()
D = os.path.join(ROOT, "cad", "exports", "V8")
imp = lambda f: cq.importers.importStep(f).val()
skin = imp(os.path.join(D, "fusion_parts", "skin_v8_fusion.step"))
ret = cq.importers.importStep(os.path.join(D, "fusion_parts", "returns_v8.step")).vals()
print("skin", skin.isValid(), round(skin.Volume()), "returns", len(ret), [round(r.Volume()) for r in ret], flush=True)
body = skin
for r in ret:
    for s in r.Solids():
        body = body.fuse(s).clean()
        print("  +return", body.isValid(), len(body.Solids()), round(body.Volume()), round(time.time() - t0), flush=True)
cq.exporters.export(cq.Workplane().add(body), os.path.join(D, "81A807925A_V8_body.step"))
full = body
for f in sorted(glob.glob(os.path.join(ROOT, "cad", "exports", "V7", "clips", "CLIP_C0*.step"))):
    full = full.fuse(imp(f)).clean()
    print("  +", os.path.basename(f), full.isValid(), len(full.Solids()), round(full.Volume()), round(time.time() - t0), flush=True)
cq.exporters.export(cq.Workplane().add(full), os.path.join(D, "81A807925A_V8.step"))
cq.exporters.export(cq.Workplane().add(full), os.path.join(D, "81A807925A_V8.stl"), tolerance=0.01, angularTolerance=0.1)
print("done", round(time.time() - t0))
