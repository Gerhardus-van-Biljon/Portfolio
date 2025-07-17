import { catPoses } from "../poses/sitPose";
import { usePixelGrid } from "../hooks/usePixelGrid";


/* ========== Imports ========== */
import React from "react";

/* ========== Test Pose ========== */
const testPose = catPoses.sitting.sit1;



/* ========== Color Map ========== */



/* ========== Debug CatArt Component ========== */




interface CatArtProps {
  pose: number[][];
  theme: {
    catOutline: string;
    catBelly: string;
    catFur1: string;
    catFur2: string;
    catEar: string;
    // optionally: name, bg, emoji...
  };
}

export default function CatArt({ pose, theme }: CatArtProps) {
  if (!pose || pose.length === 0) {
    return <div style={{ color: "red" }}>Pose missing!</div>;
  }
//tst
  const { scaledMatrix, getColorClass } = usePixelGrid({
    baseMatrix: pose,
    scale: 2
  });
const getColor = (value: number): string => {
  switch (value) {
    case 0: return theme.catOutline;
    case 1: return theme.catBelly;
    case 2: return theme.catFur1;
    case 3: return theme.catFur2;
    case 4: return theme.catEar;
    default: return "transparent";
  }
};
  return (
    <div
     style={{
  display: "grid",
  gridTemplateColumns: "repeat(64, 1px)",
  width: "64px",
  height: "64px"
}}
//very nice
    >
      {scaledMatrix.map((row: number[], rowIndex: number) =>
  row.map((value: number, colIndex: number) => (
    <div
      key={`${rowIndex}-${colIndex}`}
      style={{
  width: "1px",
  height: "1px",
  backgroundColor: getColor(value)
}}

    />
  ))
)}

    </div>
  );
}