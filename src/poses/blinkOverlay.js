// blinkOverlay.js
// Only changes eye pixel rows — compatible with any pose

const blinkOverlay = [
  // Apply this overlay starting at correct row offset, e.g., eyes in sitPose at row 10–12
  // Use value 0 for transparent or new eye value (e.g. closed eyes as outline)
  // Here's a demo overlay for 32x32 pose starting eyes at row 10
  [0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0], // row 1
  [0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0], // row 2
  [0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0]  // row 3
];

export default blinkOverlay;
