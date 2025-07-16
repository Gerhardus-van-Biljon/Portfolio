// src/poses/index.js

import sitPose from "./sitPose";
import stretchPose from "./stretchPose";
import curlPose from "./curlPose";
import meowPose from "./meowPose";
import blinkOverlay from "./blinkOverlay";
import walkLeftFrames from "./walkLeftFrames";
import walkRightFrames from "./walkRightFrames";

export const frameSets = {
  walkLeft: walkLeftFrames,
  walkRight: walkRightFrames
};

// Map of single-frame poses
export const poseMap = {
  sit: sitPose,
  stretch: stretchPose,
  curl: curlPose,
  meow: meowPose
};


// Overlay effects
export const overlays = {
  blink: blinkOverlay
};
