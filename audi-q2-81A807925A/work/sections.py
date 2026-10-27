"""Cross-sections at stations S00, S02, S04, S06, S08, S10, S11 (V2 vs V3), computed with
the same planform/surface functions used to build the CAD. Plots y (up) vs z (rearward)."""
import importlib, json, os, sys, numpy as np
import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); sys.path.insert(0, os.path.join(ROOT, "cad"))
OUT = os.path.join(ROOT, "docs", "V3"); os.makedirs(OUT, exist_ok=True)
ST = [0, 2, 4, 6, 8, 10, 11]


def load(mod):
    P = importlib.import_module(mod); sys.modules["parameters"] = P
    from geometry import planform as PF, surface as SF
    importlib.reload(PF); importlib.reload(SF)
    return P, PF, SF


def section(P, PF, SF, s):
    o = PF.spline_points("outer", 4000); i = PF.spline_points("opening", 4000)
    def ys(c):
        near = c[np.abs(c[:, 0] - s) < 0.8]
        return (near[:, 1].min(), near[:, 1].max()) if len(near) else None
    yo = ys(o); yi = ys(i)
    if s <= o[:, 0].min() + 0.5 or yo is None:
        return None
    yy = np.linspace(yo[0], yo[1], 200)
    if yi is not None:
        yy = yy[(yy <= yi[0]) | (yy >= yi[1])]
    z = SF.zf(s, yy)
    deep = (yi is not None) and s <= getattr(P, "WALL_TOP_END_S", 0)
    return dict(y=yy, z=z, yo=yo, yi=yi, deep=deep, t=P.T_SKIN, lip=getattr(P, "D_RET_OUTER", 4.0),
                ret=getattr(P, "D_RET_OPEN", 3.0), wall=getattr(P, "D_WALL_OPEN_TOP", 12.0))


def main():
    data = {}
    for tag, mod in (("V2", "parameters_v2"), ("V3", "parameters_v3")):
        P, PF, SF = load(mod)
        sk = np.linspace(0, P.L, 12)
        data[tag] = {k: section(P, PF, SF, max(sk[k], 1.5) if k == 0 else min(sk[k], P.L - 1.5)) for k in ST}
    fig, axs = plt.subplots(1, len(ST), figsize=(22, 6), sharey=True)
    table = []
    for ax, k in zip(axs, ST):
        for tag, col in (("V2", "tab:blue"), ("V3", "tab:red")):
            d = data[tag][k]
            if d is None:
                continue
            y, z = d["y"], d["z"]
            gaps = np.where(np.diff(y) > 1.0)[0]
            segs = np.split(np.arange(len(y)), gaps + 1)
            for sg in segs:
                ax.plot(z[sg], y[sg], color=col, lw=1.6, label=f"{tag} face" if sg is segs[0] else None)
                ax.plot(z[sg] + d["t"], y[sg], color=col, lw=0.8, ls=":")
            # lip at both outer edges, opening return/wall at the opening edges
            for ye in d["yo"]:
                ze = float(np.interp(ye, y, z)); ax.plot([ze, ze + d["t"] + d["lip"]], [ye, ye], color=col, lw=1.0)
            if d["yi"] is not None:
                for j, ye in enumerate(d["yi"]):
                    ze = float(np.interp(ye, y, z)); dep = d["wall"] if (d["deep"] and j == 1) else d["ret"]
                    ax.plot([ze, ze + d["t"] + dep], [ye, ye], color=col, lw=1.0, ls="--")
            table.append(dict(station=f"S{k:02d}", model=tag, y_top=round(float(d["yo"][1]), 2), y_bot=round(float(d["yo"][0]), 2),
                              opening=None if d["yi"] is None else [round(float(v), 2) for v in d["yi"]],
                              band_top=None if d["yi"] is None else round(float(d["yo"][1] - d["yi"][1]), 2),
                              band_bot=None if d["yi"] is None else round(float(d["yi"][0] - d["yo"][0]), 2),
                              z_top=round(float(z[-1]), 2), z_bot=round(float(z[0]), 2),
                              inclination_deg=round(float(np.degrees(np.arctan2(z[-1] - z[0], y[-1] - y[0]))), 1)))
        ax.set_title(f"S{k:02d}"); ax.grid(alpha=.3); ax.set_xlabel("z [mm] (+ rearward)")
    axs[0].set_ylabel("y [mm]"); axs[0].legend(fontsize=7)
    fig.suptitle("81A807925A cross-sections V2 (blue) vs V3 (red): face, skin (dotted), lip, opening return / deep wall (dashed)")
    plt.tight_layout(); plt.savefig(os.path.join(OUT, "sections_V2_vs_V3.png"), dpi=110)
    json.dump(table, open(os.path.join(OUT, "sections_V2_vs_V3.json"), "w"), indent=1)
    for r in table:
        print(r)


if __name__ == "__main__":
    main()
