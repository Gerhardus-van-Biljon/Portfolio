/* ========== imports ========== */
import React, { useState, useEffect } from 'react';
import { catPoses } from '../catPoses';
import { useAppController } from './AppController';

/* ========== component definition ========== */
const PixelArtCat: React.FC = () => {
  const { currentPose, isAnimating } = useAppController();
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);

  const poses = Object.values(catPoses[currentPose]);
  const currentPattern = poses[currentPoseIndex] || poses[0];

  /* ========== scale 32x32 pattern to 64x64 ========== */
  const scaledPattern = currentPattern.flatMap(row => 
    [row.flatMap(pixel => [pixel, pixel]), row.flatMap(pixel => [pixel, pixel])]
  );

  /* ========== cycle through poses if animating ========== */
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentPoseIndex(prev => (prev + 1) % poses.length);
    }, 600);

    return () => clearInterval(interval);
  }, [poses.length, isAnimating]);

  /* ========== reset pose index when pose changes ========== */
  useEffect(() => {
    setCurrentPoseIndex(0);
  }, [currentPose]);

  /* ========== resolve pixel color from value ========== */
  const getPixelColor = (value: number): string => {
    switch (value) {
      case 0: return 'cat-outline';
      case 1: return 'cat-belly';
      case 2: return 'cat-fur1';
      case 3: return 'cat-fur2';
      case 4: return 'cat-ear';
      case 5:
      default: return 'transparent';
    }
  };

  /* ========== render pixel grid ========== */
  return (
    <div className="flex flex-col items-center">
      <div className="inline-block border-2 border-border rounded-lg p-4" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="grid grid-cols-64 gap-0" style={{ width: '320px', height: '320px' }}>
          {scaledPattern.map((row, rowIndex) =>
            row.map((pixel, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-1 h-1"
                style={{ 
                  width: '5px', 
                  height: '5px',
                  backgroundColor: pixel === 5 ? 'transparent' : `var(--${getPixelColor(pixel)})`
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PixelArtCat;
