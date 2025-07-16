/* ========== Imports ========== */
import React, { useState, useEffect } from "react";
import { poseMap, overlays } from "../poses";

/* ========== PixelArtCat Component ========== */
export default function PixelArtCat({ pose: poseProp, blink: blinkProp, theme = "normal-theme" }) {
  /* ========== Pose & Blink State ========== */
  const [poseInternal, setPoseInternal] = useState("sit");
  const pose = poseProp || poseInternal;

  const [blinkInternal, setBlinkInternal] = useState(false);
  const blink = blinkProp !== undefined ? blinkProp : blinkInternal;

  /* ========== Meow Loop (If No External Pose) ========== */
  useEffect(() => {
    if (!poseProp) {
      const meowInterval = setInterval(() => {
        setPoseInternal("meow");
        setTimeout(() => setPoseInternal("sit"), 1000);
      }, 15000);
      return () => clearInterval(meowInterval);
    }
  }, [poseProp]);

  /* ========== Blink Animation Loop ========== */
  useEffect(() => {
    if (blinkProp === undefined) {
      const blinkInterval = setInterval(() => {
        setBlinkInternal(true);
        setTimeout(() => setBlinkInternal(false), 300);
      }, 6000);
      return () => clearInterval(blinkInterval);
    }
  }, [blinkProp]);

  /* ========== Utility Functions ========== */
  const getColor = (v) => {
    switch (v) {
      case 1: return "--cat-outline";
      case 2: return "--cat-belly";
      case 3: return "--cat-fur1";
      case 4: return "--cat-fur2";
      case 5: return "--cat-ear";
      default: return "transparent";
    }
  };

  const composePoseWithOverlay = (base, overlay) =>
    base.map((row, i) =>
      row.map((px, j) => overlay[i]?.[j] ?? px)
    );

  /* ========== Matrix Assembly ========== */
  const rawMatrix = poseMap[pose] || poseMap.sit;
  const displayMatrix = blink
    ? composePoseWithOverlay(rawMatrix, overlays.blink)
    : rawMatrix;

  const scaledMatrix = displayMatrix.flatMap(row => [
    row.flatMap(p => [p, p]), // duplicate horizontally
    row.flatMap(p => [p, p])  // duplicate vertically
  ]);

  /* ========== Render Pixel Grid ========== */
  return (
    <div className={`pixel-cat ${theme}`}>
      <div className="grid grid-cols-64 gap-0">
        {scaledMatrix.map((row, ri) =>
          row.map((val, ci) => (
            <div
              key={`${ri}-${ci}`}
              style={{
                width: "5px",
                height: "5px",
                backgroundColor:
                  val === 0 ? "transparent" : `var(${getColor(val)})`
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
