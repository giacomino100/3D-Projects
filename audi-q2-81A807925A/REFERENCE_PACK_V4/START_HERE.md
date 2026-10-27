# START_HERE.md

This is the V4 refinement pack for Audi Q2 left trim `81A807925A / TB2`.

## What to give Claude Code

Open this folder as the project root and send:

> Read `START_HERE.md`, `docs/CLAUDE_V4_FRONT_REFINEMENT.md`, both reverse-engineering reports, and `web_references/SOURCE_MANIFEST.md`. Use `cad_baseline/V3_current_renders` as the current baseline. First build a local exact-target reference board from the verified web sources, then refine ONLY the front-visible geometry by photo registration and overlay. Do not restart from zero and do not spend this pass redesigning the clips unless required by geometry.

## Important

The ZIP includes:
- all current CAD render screenshots supplied in chat
- earlier iteration screenshots for regression comparison
- both reverse-engineering reports
- V2 revision brief
- V4 front refinement brief
- verified exact-target source manifest
- a helper script to download reference images locally

The actual OEM website images are source-controlled by their respective sites. The helper script is provided so they can be fetched locally in the Claude/PC environment where internet access is available.
