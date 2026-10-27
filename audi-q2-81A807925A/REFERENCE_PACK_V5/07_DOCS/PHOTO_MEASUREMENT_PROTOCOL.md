# PHOTO MEASUREMENT / REGISTRATION PROTOCOL

## Goal
Extract shape constraints without pretending that unscaled photos provide exact millimeters.

## 1. Curate only exact target
Reject:
- wrong side
- facelift
- similar-looking grille
- different OEM code
- render/illustration used as physical truth

## 2. Preserve original images
Never resize originals destructively.
Create analysis copies.

## 3. Perspective
For every image record:
- estimated focal type: wide / normal / tele
- camera yaw
- pitch
- roll
- whether near-orthographic enough for contour ratios

## 4. Landmarks
Choose physical features that are stable across specimens:
- terminal extremities
- opening tangent points
- local inflection points
- clip roots
- sharp molded transition points

Avoid scratches/damage as landmarks.

## 5. Scale
Use isolated images for dimensionless ratios unless a trustworthy scale exists.
Use complete group dimensions only when the complete group is visible and the measurement direction is valid.

## 6. Overlay
Render CAD from the same camera.
Align using 3+ stable landmarks.
Then inspect:
- outer contour residual
- inner contour residual
- wide-end residual
- narrow-end residual

## 7. Multi-view consistency
A control-point change is accepted only if it improves the relevant source view without clearly degrading another independent view.

## 8. Curvature
Fit depth from oblique/profile views jointly.
Do not infer Z solely from front view.

## 9. Confidence labels
HIGH: repeated in multiple exact specimens/views
MEDIUM: visible clearly in one exact view or inferred consistently
LOW: perspective-sensitive / partial / occluded
ASSUMED: prototype parameter only
