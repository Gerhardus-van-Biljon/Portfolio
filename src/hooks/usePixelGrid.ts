/* ========== Imports ========== */
import { useMemo } from "react";

/* ========== Pixel Grid Hook ========== */
export function usePixelGrid({
  baseMatrix,
  overlayMatrix,
  scale = 2,
}: {
  baseMatrix: number[][];
  overlayMatrix?: number[][];
  scale?: number;
}) {
  /* ========== Compose Overlay ========== */
  const mergedMatrix = useMemo(() => {
    if (!overlayMatrix) return baseMatrix;

    return baseMatrix.map((row, i) =>
      row.map((px, j) => overlayMatrix[i]?.[j] ?? px)
    );
  }, [baseMatrix, overlayMatrix]);

  /* ========== Scaled Matrix ========== */
  const scaledMatrix = useMemo(() => {
    return mergedMatrix.flatMap(row => {
      const scaledRow = row.flatMap(px => Array(scale).fill(px));
      return Array(scale).fill(scaledRow);
    });
  }, [mergedMatrix, scale]);

  /* ========== Resolve Pixel Color ========== */
  const getColorClass = (v: number): string => {
    switch (v) {
      case 0: return "--cat-outline";
      case 1: return "--cat-belly";
      case 2: return "--cat-fur1";
      case 3: return "--cat-fur2";
      case 4: return "--cat-ear";
      default: return "transparent";
    }
  };

  return {
    scaledMatrix,
    getColorClass
  };
}
