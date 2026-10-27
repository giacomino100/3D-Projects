"""
Build script - Audi Q2 81A807925A / TB2  CAD V1 (visual / shape prototype)

    .venv\\Scripts\\python cad\\build_model.py

Outputs (cad/exports/):
  81A807925A_V1.step          assembly: BODY + CLIP_C01..C07 as separate solids
  81A807925A_V1.stl           fused printable mesh
  81A807925A_V1_body.step     trim body only (no clips)
  clips/CLIP_Cxx.step         every clip as an independent feature
  clip_test_coupons/*.stl     trim patch + receiver, 3 clearances per family
  build_report.json           validity, volumes, bounding boxes, station table
"""
import json
import os
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import cadquery as cq  # noqa: E402

import parameters as P  # noqa: E402
from geometry import surface as SF, clips as CL, coupons as CP, planform as PF  # noqa: E402

EXP = os.path.join(HERE, "exports")
os.makedirs(os.path.join(EXP, "clips"), exist_ok=True)
os.makedirs(os.path.join(EXP, "clip_test_coupons"), exist_ok=True)


def bb(shape):
    b = shape.BoundingBox()
    return dict(xmin=round(b.xmin, 2), xmax=round(b.xmax, 2), ymin=round(b.ymin, 2),
                ymax=round(b.ymax, 2), zmin=round(b.zmin, 2), zmax=round(b.zmax, 2),
                dx=round(b.xlen, 2), dy=round(b.ylen, 2), dz=round(b.zlen, 2))


def to_cad(shape):
    """Front-view construction frame (s, y, z) -> right-handed CAD frame.

    Geometry is authored in the photo frame: s = distance from the INNER tip
    measured to the viewer's right in the front view, y up, z rearward. That
    triple is left-handed, so authoring it directly would produce the
    MIRRORED (right-hand) part. The physical LEFT part in a right-handed frame
    with Y up and Z rearward has X pointing to the vehicle's right (= toward
    the inner tip), hence X_cad = L - s.
    """
    return shape.mirror("YZ", (P.L / 2.0, 0, 0))


def main():
    t0 = time.time()
    report = {"part": P.PART_NUMBER, "version": P.VERSION, "cadquery": cq.__version__,
              "frame": "right-handed; X_cad = L - s (X toward vehicle right/inner tip), Y up, Z rearward"}

    body, rep = SF.build_body()
    body = to_cad(body)
    rep["body_valid"] = body.isValid()
    report.update(rep)
    report["body_bbox"] = bb(body)

    clips = {k: to_cad(v) for k, v in CL.all_clips().items()}
    report["clips"] = CL.clip_table()
    for cid, s in clips.items():
        report.setdefault("clip_valid", {})[cid] = s.isValid()
        cq.exporters.export(cq.Workplane().add(s), os.path.join(EXP, "clips", f"CLIP_{cid}.step"))

    # Assembly STEP: named, separate solids (clips stay independent features)
    asm = cq.Assembly(name="81A807925A_V1")
    asm.add(body, name="BODY_81A807925A", color=cq.Color(0.75, 0.76, 0.78))
    for cid, s in clips.items():
        asm.add(s, name=f"CLIP_{cid}", color=cq.Color(0.9, 0.45, 0.1))
    asm.save(os.path.join(EXP, "81A807925A_V1.step"))
    cq.exporters.export(cq.Workplane().add(body), os.path.join(EXP, "81A807925A_V1_body.step"))
    cq.exporters.export(cq.Workplane().add(body), os.path.join(EXP, "81A807925A_V1_body.stl"),
                        tolerance=0.05, angularTolerance=0.1)
    cq.exporters.export(cq.Workplane().add(cq.Compound.makeCompound(list(clips.values()))),
                        os.path.join(EXP, "81A807925A_V1_clips.stl"), tolerance=0.02, angularTolerance=0.1)

    # Fused printable mesh
    fused = body
    for s in clips.values():
        fused = fused.fuse(s)
    fused = fused.clean()
    report["fused_valid"] = fused.isValid()
    report["fused_volume_mm3"] = round(fused.Volume(), 1)
    report["fused_bbox"] = bb(fused)
    # mass estimate with PC+ABS density 1.15 g/cm3 (ASSUMED)
    report["mass_estimate_g_PCABS"] = round(fused.Volume() / 1000.0 * 1.15, 1)
    cq.exporters.export(cq.Workplane().add(fused), os.path.join(EXP, "81A807925A_V1.stl"),
                        tolerance=0.05, angularTolerance=0.1)

    # Coupons
    cps = CP.build_coupons()
    for (fam, clr), (trim, rcv) in cps.items():
        tag = f"{fam}_c{clr:.2f}"
        report.setdefault("coupon_interference_mm3", {})[tag] = round(trim.val().intersect(rcv.val()).Volume(), 3)
        cq.exporters.export(trim, os.path.join(EXP, "clip_test_coupons", f"coupon_{fam}_trim.stl"),
                            tolerance=0.02, angularTolerance=0.1)
        cq.exporters.export(rcv, os.path.join(EXP, "clip_test_coupons", f"coupon_{tag}_receiver.stl"),
                            tolerance=0.02, angularTolerance=0.1)
        a = cq.Assembly(name=f"coupon_{tag}")
        a.add(trim, name="trim_patch", color=cq.Color(0.75, 0.76, 0.78))
        a.add(rcv, name="receiver_681A_surrogate", color=cq.Color(0.15, 0.15, 0.17))
        a.save(os.path.join(EXP, "clip_test_coupons", f"coupon_{tag}.step"))
    report["coupons"] = sorted(f"{f}_c{c:.2f}" for f, c in cps)

    # Stations and sampled outline for docs / overlays
    report["stations"] = SF.stations()
    with open(os.path.join(EXP, "outline_front_outer.json"), "w") as f:
        json.dump(PF.outline_polyline("outer").round(3).tolist(), f)
    with open(os.path.join(EXP, "outline_front_opening.json"), "w") as f:
        json.dump(PF.outline_polyline("opening").round(3).tolist(), f)

    report["build_seconds"] = round(time.time() - t0, 1)
    with open(os.path.join(EXP, "build_report.json"), "w") as f:
        json.dump(report, f, indent=1, default=str)
    print(json.dumps({k: report[k] for k in ("body_valid", "fused_valid", "edge_fillet", "body_bbox",
                                              "fused_bbox", "fused_volume_mm3", "mass_estimate_g_PCABS",
                                              "clip_valid", "build_seconds")}, indent=1))


if __name__ == "__main__":
    main()
