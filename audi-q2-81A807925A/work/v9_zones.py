"""V9: V8 deviation per zone and per view (camera-matched, V9_ANALYSIS/overlays/meas_V8_*.json).
Zones along s: END A (s<60), END A opening D-end (60-140), rails (140-360), END B (360-480).
Deviation in mm, + = OEM edge outside the CAD contour. A zone is 'agreed' when >= 2 independent specimens
give the same sign with |median| > 0.5 mm."""
import json, os, sys, numpy as np
from reg import ROOT
D = os.path.join(ROOT, "V9_ANALYSIS", "overlays")
VER = sys.argv[1] if len(sys.argv) > 1 else "V8"
SPEC = {"front_A": "S1", "front_B": "S2", "front_C_assembly": "S7", "oblique_A": "S3", "oblique_B": "S5", "rear": "S1", "profile": "S6"}
ZONES = [("END_A", 0, 60), ("END_A_Dend", 60, 140), ("rails", 140, 360), ("END_B", 360, 490)]
rows = {}
for tag in SPEC:
    f = os.path.join(D, f"meas_{VER}_{tag}.json")
    if not os.path.exists(f):
        continue
    me = json.load(open(f))
    for which in ("outer", "opening"):
        d = np.asarray(me[which]["dev_mm"], float); pts = np.asarray(me[which]["sy"], float)
        yc = pts[:, 1].mean()
        for zn, a, b in ZONES:
            for half, sel in (("top", pts[:, 1] > yc), ("bot", pts[:, 1] <= yc)):
                k = sel & (pts[:, 0] >= a) & (pts[:, 0] < b) & np.isfinite(d) & (np.abs(d) < 5)
                if k.sum() >= 5:
                    rows.setdefault((which, zn, half), {})[tag] = (round(float(np.median(d[k])), 2), int(k.sum()))
out = []
for key, v in sorted(rows.items()):
    pos = {SPEC[t] for t, (x, n) in v.items() if x > 0.5}; neg = {SPEC[t] for t, (x, n) in v.items() if x < -0.5}
    agree = "+" if len(pos) >= 2 and not neg else ("-" if len(neg) >= 2 and not pos else "")
    out.append(dict(edge=key[0], zone=key[1], half=key[2], views=v, agree=agree, conflict=bool(pos and neg)))
    print(key, v, "AGREE" + agree if agree else ("CONFLICT" if pos and neg else ""))
json.dump(out, open(os.path.join(ROOT, "V9_ANALYSIS", f"zone_deviation_{VER}.json"), "w"), indent=1)
