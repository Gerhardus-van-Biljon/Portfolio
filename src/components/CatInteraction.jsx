/* ========== Imports ========== */
import React, { useEffect, useCallback, useState } from "react";
import HeartAnimation from "./HeartAnimation";
import { getContrastingColor } from "../utils/color";

/* ========== CatInteraction Component ========== */
/**
 * Adds hearts and occasional "Purrr~" bubbles when a cat is clicked.
 */
export default function CatInteraction({ theme }) {
  /* ========== State ========== */
  const [hearts, setHearts] = useState([]);
  const [bubbles, setBubbles] = useState([]);

  /* ========== Event: Cat Click ========== */
  const handleCatClick = useCallback(() => {
    // 💘 Spawn 2–4 hearts
    const heartCount = Math.floor(Math.random() * 3) + 2;
    const newHearts = Array.from({ length: heartCount }, () => ({
      id: Math.random().toString(36).slice(2),
      left: window.innerWidth * 0.4 + Math.random() * 60,
      top: window.innerHeight * 0.8 + Math.random() * 30
    }));
    setHearts(prev => [...prev, ...newHearts]);

    // 💬 Occasionally spawn a Purrr~ bubble
    if (Math.random() < 0.5) {
      const id = Math.random().toString(36).slice(2);
      setBubbles(prev => [
        ...prev,
        {
          id,
          left: window.innerWidth * 0.5 + Math.random() * 40 - 20,
          top: window.innerHeight * 0.75 + Math.random() * 30,
          color: getContrastingColor(theme.fg || "#ff69b4")
        }
      ]);
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== id));
      }, 1500);
    }
  }, [theme]);

  /* ========== Render ========== */
  return (
    <>
      {/* 🐾 Clickable Cat Interaction Layer */}
      <div
        className="cat-animation"
        onClick={handleCatClick}
        aria-label="Cat interaction"
        role="button"
        tabIndex={0}
      />

      {/* 💘 Animated Hearts */}
      {hearts.map(heart => (
        <HeartAnimation
          key={heart.id}
          left={heart.left}
          top={heart.top}
          theme={theme}
          onEnd={() => setHearts(prev => prev.filter(h => h.id !== heart.id))}
        />
      ))}

      {/* 💬 Floating Purrr~ Bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="purrr"
          style={{
            position: "fixed",
            left: bubble.left,
            top: bubble.top,
            color: bubble.color,
            fontSize: "1.25rem",
            zIndex: 1000,
            pointerEvents: "none",
            animation: "fade-up 1.5s ease-out forwards"
          }}
        >
          Purrr~
        </div>
      ))}
    </>
  );
}
