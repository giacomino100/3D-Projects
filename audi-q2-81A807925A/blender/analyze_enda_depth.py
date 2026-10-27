"""Controllo numerico/visivo del campo di profondità END A prima del rebuild."""

from __future__ import annotations

import importlib
import os
import sys
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np


ROOT = Path(__file__).resolve().parents[1]
CAD = ROOT / "cad"
sys.path.insert(0, str(CAD))

version = os.environ.get("Q2_VERSION", "V8").upper()
parameters = importlib.import_module(f"parameters_{version.lower()}")

sys.modules["parameters"] = parameters
from geometry import planform, surface  # noqa: E402

importlib.reload(planform)
importlib.reload(surface)

s = np.linspace(0.0, 220.0, 881)
y = np.linspace(-70.0, 25.0, 381)
S, Y = np.meshgrid(s, y, indexing="xy")
D = surface.recess_depth(S, Y)
d_dy, d_ds = np.gradient(D, y, s)
grad = np.hypot(d_ds, d_dy)

output = ROOT / "cad" / "blender" / f"{version}_END_A_depth_field.png"
fig, axes = plt.subplots(2, 1, figsize=(13, 7.5), constrained_layout=True)

depth_max = max(3.5, float(np.nanmax(D)))
grad_max = max(0.8, float(np.nanpercentile(grad, 99.7)))
depth_plot = axes[0].pcolormesh(S, Y, D, shading="auto", cmap="viridis", vmin=-0.2, vmax=depth_max)
fig.colorbar(depth_plot, ax=axes[0], label="profondità [mm]")
axes[0].contour(S, Y, D, levels=np.linspace(1.0, depth_max, 12), colors="white", linewidths=0.45, alpha=0.8)
axes[0].set_title(f"{version} — campo SF.recess_depth a END A")

grad_plot = axes[1].pcolormesh(S, Y, grad, shading="auto", cmap="magma", vmin=0.0, vmax=grad_max)
fig.colorbar(grad_plot, ax=axes[1], label="|gradiente| [mm/mm]")
axes[1].set_title("Gradiente — fasce verticali indicano transizioni lungo s")

for axis in axes:
    axis.set_xlim(0, 220)
    axis.set_ylim(-70, 25)
    axis.set_xlabel("s dalla punta END A [mm]")
    axis.set_ylabel("y [mm]")
    axis.axvline(parameters.ENDA_SINGLE[0], color="cyan", linestyle="--", linewidth=0.8)
    axis.axvline(parameters.ENDA_SINGLE[1], color="cyan", linestyle="--", linewidth=0.8)
    axis.axvline(parameters.RECESS_RAMP_S[1], color="lime", linestyle=":", linewidth=0.9)

fig.savefig(output, dpi=180)
print(f"Saved: {output}")
print(f"depth min/max: {D.min():.4f} / {D.max():.4f} mm")
print(f"gradient max: {grad.max():.4f} mm/mm")

for yy in (-45.0, -30.0, -15.0, 0.0):
    values = surface.recess_depth(np.arange(0.0, 201.0, 10.0), yy)
    print(f"y={yy:+.1f}: " + " ".join(f"{value:.3f}" for value in values))
