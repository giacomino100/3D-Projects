"""
Build script - Audi Q2 81A807925A / TB2  CAD V2 (refined shape prototype)
Applies CLAUDE_REVISION_V2_81A807925A.md on top of the V1 parametric base:
same modules, V2 values from cad/parameters_v2.py (which imports V1 and
overrides). V1 stays reproducible with cad/build_model.py.

    .venv\\Scripts\\python cad\\build_model_v2.py
"""
import json
import os
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import importlib  # noqa: E402
PARAM_MOD = os.environ.get("Q2_PARAMS", "parameters_v2")
_pm = importlib.import_module(PARAM_MOD)
sys.modules["parameters"] = _pm                    # every geometry module now sees these values

import cadquery as cq  # noqa: E402
import parameters as P  # noqa: E402  (== parameters_v2)
from geometry import surface as SF, clips_v2 as CL, planform as PF, landmarks as LM  # noqa: E402
from build_model import to_cad, bb  # noqa: E402

EXP = os.path.join(HERE, "exports", os.environ.get("Q2_OUT", "V2"))
os.makedirs(os.path.join(EXP, "clips"), exist_ok=True)
os.makedirs(os.path.join(EXP, "clip_test_coupons"), exist_ok=True)


def nurbs(shape):
    """Convert every surface to explicit NURBS + ShapeFix. Needed for STEP: the
    prism walls are SurfaceOfExtrusion faces of spline curves, which the STEP
    writer drops (round-trip gave an open Shell of 19/87 faces)."""
    from OCP.BRepBuilderAPI import BRepBuilderAPI_NurbsConvert
    from OCP.ShapeFix import ShapeFix_Shape
    s = cq.Shape.cast(BRepBuilderAPI_NurbsConvert(shape.wrapped, True).Shape())
    fx = ShapeFix_Shape(s.wrapped); fx.Perform()
    return cq.Shape.cast(fx.Shape())


def free_edges(shape):
    from OCP.ShapeAnalysis import ShapeAnalysis_FreeBounds
    from OCP.TopExp import TopExp_Explorer
    from OCP.TopAbs import TopAbs_EDGE
    fb = ShapeAnalysis_FreeBounds(shape.wrapped, 1e-3, False, False); n = 0
    for w in (fb.GetClosedWires(), fb.GetOpenWires()):
        e = TopExp_Explorer(w, TopAbs_EDGE)
        while e.More():
            n += 1; e.Next()
    return n


def coupons(report):
    """Coupons per V2 clip family: flat trim patch + clip + receiver surrogate."""
    from geometry import coupons as CPv1
    fams = {}
    for c in P.CLIPS_V2:
        fams.setdefault(c["family"], c)
    for fam, c in fams.items():
        th = c["t_arm"]
        depth = P.D_RET_OUTER
        shell = (cq.Workplane("XY").box(c["base"] + 16, P.T_SKIN, 22, centered=(True, False, False))
                 .translate((0, -depth - P.T_SKIN, -P.T_RETURN)))
        wall = (cq.Workplane("XY").box(c["base"] + 16, depth + CL.EMBED, P.T_RETURN, centered=(True, False, False))
                .translate((0, -depth, -P.T_RETURN)))
        tab = cq.Workplane("XY").add(CL.clip_solid(c, flat=True)).translate((0, -CL.EMBED, -P.T_RETURN / 2))
        trim = shell.union(wall).union(tab)
        cq.exporters.export(trim, os.path.join(EXP, "clip_test_coupons", f"coupon_{fam}_trim.stl"),
                            tolerance=0.02, angularTolerance=0.1)
        h = c["height"]
        yc = h - c["win_from_tip"] - c["win_h"] / 2
        for clr in P.COUPON_CLEARANCES:
            base_t = 3.0
            base = (cq.Workplane("XY").box(c["base"] + 10, h + 6, base_t, centered=(True, False, False))
                    .translate((0, 1.0, -th / 2 - clr - base_t - P.T_RETURN / 2)))
            bw, bl = c["win_w"] - 2 * clr - 2 * c["win_slant"], c["win_h"] - 2 * clr - 0.6
            barb = (cq.Workplane("XY").box(bw, bl, th + clr, centered=(True, True, False))
                    .translate((c.get("win_dx", 0.0), yc, -th / 2 - clr - P.T_RETURN / 2)))
            barb = barb.faces(">Z").edges("<Y").chamfer(min(th * 0.8, bl * 0.6))
            rcv = base.union(barb)
            inter = trim.val().intersect(rcv.val()).Volume()
            tag = f"{fam}_c{clr:.2f}"
            report.setdefault("coupon_interference_mm3", {})[tag] = round(inter, 3)
            cq.exporters.export(rcv, os.path.join(EXP, "clip_test_coupons", f"coupon_{tag}_receiver.stl"),
                                tolerance=0.02, angularTolerance=0.1)
            a = cq.Assembly(name=f"coupon_{tag}")
            a.add(trim, name="trim_patch", color=cq.Color(0.75, 0.76, 0.78))
            a.add(rcv, name="receiver_681A_surrogate", color=cq.Color(0.15, 0.15, 0.17))
            a.save(os.path.join(EXP, "clip_test_coupons", f"coupon_{tag}.step"))


def main():
    t0 = time.time()
    report = {"part": P.PART_NUMBER, "version": P.VERSION, "cadquery": cq.__version__,
              "frame": "right-handed; X_cad = L - s, Y up, Z rearward"}
    body, rep = SF.build_body_v2()
    body = nurbs(to_cad(body))
    rep["body_valid"] = body.isValid()
    report.update(rep)
    report["body_bbox"] = bb(body)

    clips = {k: to_cad(v) for k, v in CL.all_clips().items()}
    report["clips"] = CL.clip_table()
    for cid, s in clips.items():
        report.setdefault("clip_valid", {})[cid] = s.isValid()
        cq.exporters.export(cq.Workplane().add(s), os.path.join(EXP, "clips", f"CLIP_{cid}.step"))

    asm = cq.Assembly(name="81A807925A_" + P.VERSION + "")
    asm.add(body, name="BODY_81A807925A", color=cq.Color(0.75, 0.76, 0.78))
    for cid, s in clips.items():
        asm.add(s, name=f"CLIP_{cid}", color=cq.Color(0.9, 0.45, 0.1))
    asm.save(os.path.join(EXP, "81A807925A_" + P.VERSION + ".step"))
    cq.exporters.export(cq.Workplane().add(body), os.path.join(EXP, "81A807925A_" + P.VERSION + "_body.step"))
    rt = cq.importers.importStep(os.path.join(EXP, "81A807925A_" + P.VERSION + "_body.step")).val()
    report["step_roundtrip_body"] = dict(type=rt.ShapeType(), faces=len(rt.Faces()), solids=len(rt.Solids()),
                                         free_edges=free_edges(rt), valid=rt.isValid())
    # fine tessellation: at 0.05 mm OCC leaves a 0.0002 mm^2 sliver -> non-manifold edge
    cq.exporters.export(cq.Workplane().add(body), os.path.join(EXP, "81A807925A_" + P.VERSION + "_body.stl"),
                        tolerance=0.01, angularTolerance=0.05)
    cq.exporters.export(cq.Workplane().add(cq.Compound.makeCompound(list(clips.values()))),
                        os.path.join(EXP, "81A807925A_" + P.VERSION + "_clips.stl"), tolerance=0.02, angularTolerance=0.1)
    fused = body
    for s in clips.values():
        fused = fused.fuse(s)
    fused = fused.clean()
    report["fused_valid"] = fused.isValid()
    report["fused_bbox"] = bb(fused)
    cq.exporters.export(cq.Workplane().add(fused), os.path.join(EXP, "81A807925A_" + P.VERSION + ".stl"),
                        tolerance=0.01, angularTolerance=0.05)
    import trimesh
    for nm in ("81A807925A_" + P.VERSION + ".stl", "81A807925A_" + P.VERSION + "_body.stl"):
        m = trimesh.load(os.path.join(EXP, nm))
        report.setdefault("stl_check", {})[nm] = dict(watertight=bool(m.is_watertight), faces=len(m.faces),
                                                      volume_mm3=round(float(m.volume), 1))
    # OCC volume on NURBS-converted faces is unreliable (+10 %): use the mesh volume
    report["fused_volume_mm3"] = report["stl_check"]["81A807925A_" + P.VERSION + ".stl"]["volume_mm3"]
    report["mass_estimate_g_PCABS"] = round(report["fused_volume_mm3"] / 1000.0 * 1.15, 1)
    coupons(report)
    report["landmarks"] = LM.landmarks()
    report["profiles"] = LM.profiles()
    report["build_seconds"] = round(time.time() - t0, 1)
    with open(os.path.join(EXP, f"build_report_{P.VERSION.lower()}.json"), "w") as f:
        json.dump(report, f, indent=1, default=str)
    print(json.dumps({k: report.get(k) for k in ("body_valid", "fused_valid", "boolean_volume_checks", "spline_seg_pts", "visible_fillets", "step_roundtrip_body", "stl_check",
                                                  "body_bbox", "mass_estimate_g_PCABS", "clip_valid",
                                                  "coupon_interference_mm3", "build_seconds")}, indent=1))


if __name__ == "__main__":
    main()
