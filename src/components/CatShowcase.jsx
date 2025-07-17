/* ========== Imports ========== */
import React, { useState, useEffect, useRef } from "react";
import useCatInteraction from "../hooks/useCatInteraction";
import useCatMovement from "../hooks/useCatMovement";
import { catPoses } from "../poses/sitPose";
import HeartAnimation from "./HeartAnimation";
import CatArt from "./PixelCatArt";

/* ========== CatShowcase Component ========== */
export default function CatShowcase({ catCount, onCatClick, theme }) {
  /* ========== Refs & State ========== */
  const catRefs = useRef([]);
  const [pawPrints, setPawPrints] = useState([]);
  const [poseIndex, setPoseIndex] = useState(0);
    
  /* ========== Hooks ========== */
  const { heartPos, handleCatClick, clearHeart } = useCatInteraction();
  const { cats, moveCat } = useCatMovement(catCount);

  /* ========== Pose Cycling ========== */
  useEffect(() => {
    const frameKeys = Object.keys(catPoses.sitting);
    const interval = setInterval(() => {
      setPoseIndex(i => (i + 1) % frameKeys.length);
    }, 600); // adjust speed if needed
    return () => clearInterval(interval);
  }, []);

  /* ========== Cat Refs Management ========== */
  useEffect(() => {
    while (catRefs.current.length < catCount) {
      catRefs.current.push(React.createRef());
    }
    if (catRefs.current.length > catCount) {
      catRefs.current = catRefs.current.slice(0, catCount);
    }
  }, [catCount]);

  /* ========== Paw Print Tracking Animation ========== */
  useEffect(() => {
    let animationFrame;
    const updatePaws = () => {
      const newPrints = catRefs.current.map((ref, i) => {
        if (!ref?.current) return null;
        const rect = ref.current.getBoundingClientRect();
        return {
          id: `cat-${i}-${Date.now()}`,
          left: rect.left + rect.width / 2,
          top: rect.top + rect.height
        };
      }).filter(Boolean);

      setPawPrints(prev => {
        const combined = [...prev, ...newPrints];
        const MAX_PAW_PRINTS = 45;
        return combined.slice(-MAX_PAW_PRINTS);
      });

      animationFrame = requestAnimationFrame(updatePaws);
    };
    animationFrame = requestAnimationFrame(updatePaws);
    return () => cancelAnimationFrame(animationFrame);
  }, [catCount]);

  /* ========== Render ========== */
  return (
    <>
      {/* 🐾 Render Each Cat */}
      {cats.map((cat, i) => {
        const frameKeys = Object.keys(catPoses.sitting);
        const currentPoseName = frameKeys[poseIndex] || "sit1";
        const currentPose = catPoses.sitting[currentPoseName];

        return (
            <div
  className="pixel-cat inline-block border-2 border-border rounded-lg p-4"
  style={{ backgroundColor: "var(--bg)" }}
>

          <div
            key={cat.id ?? i}
            ref={el => { catRefs.current[i] = el; }}
            className={`cat-animation ${cat.animation} ${theme.name}-theme`}
            onClick={() => {
              const rect = catRefs.current[i]?.getBoundingClientRect();
              if (rect) {
                handleCatClick({
                  left: rect.left + rect.width / 2,
                  top: rect.top
                });
              }
              if (onCatClick) onCatClick();
              moveCat(i, "up");
            }}
            style={{
              animationDelay: `${i * 3}s`,
              top: `calc(100vh - 85px)`,
              left: cat.left,
              position: "fixed",
              width: 48,
              height: 48,
  pointerEvents: "auto"
            }}
          >
            <CatArt pose={currentPose} theme={theme} />

          </div>
          </div>
        );
      })}

      {/* 💘 Heart Pulse on Cat Click */}
      {heartPos && (
        <HeartAnimation
          left={heartPos.left}
          top={heartPos.top}
          onEnd={clearHeart}
        />
      )}

      {/* 🐾 Pawprint Trail */}
      {pawPrints.map(print => (
        <div
          key={print.id}
          className="paw-print"
          style={{
            position: "fixed",
            left: `${print.left}px`,
            top: `${print.top}px`
          }}
        />
      ))}
    </>
  );
}
