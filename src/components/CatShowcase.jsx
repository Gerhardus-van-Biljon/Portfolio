/* ========== Imports ========== */
import React, { useState, useEffect, useRef } from "react";
import useCatInteraction from "../hooks/useCatInteraction";
import useCatMovement from "../hooks/useCatMovement";
import { frameSets, poseMap } from "../poses";
import HeartAnimation from "./HeartAnimation";
import CatArt from "./CatArt";

/* ========== CatShowcase Component ========== */
export default function CatShowcase({ catCount, onCatClick, lineRefs = [], theme }) {
  /* ========== Refs & State ========== */
  const catRefs = useRef([]);
  const [pawPrints, setPawPrints] = useState([]);
  const [walkIndex, setWalkIndex] = useState(0);

  /* ========== Hooks ========== */
  const { heartPos, handleCatClick, clearHeart } = useCatInteraction();
  const { cats, moveCat } = useCatMovement(catCount);

  /* ========== Walking Frame Timer ========== */
  useEffect(() => {
    const interval = setInterval(() => {
      setWalkIndex(i => (i + 1) % frameSets.walkLeft.length);
    }, 200);
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
        const poseMatrix = cat.isMoving
          ? (cat.direction === "right" ? frameSets.walkRight[walkIndex] : frameSets.walkLeft[walkIndex])
          : poseMap[cat.mood] || poseMap.sit;

        return (
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
              left: cat.left,
              top: cat.top,
              position: "fixed",
              width: 48,
              height: 48,
              pointerEvents: "auto"
            }}
          >
            <CatArt pose={cat.mood || "sit"} theme={`${theme.name}-theme`} blink={!cat.isMoving} />
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
