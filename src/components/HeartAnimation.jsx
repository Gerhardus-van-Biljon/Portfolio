import React, { useEffect } from "react";

/**
 * HeartAnimation - floats a themed emoji upward before fading out.
 */
export default function HeartAnimation({ left, top, theme, onEnd }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onEnd) onEnd();
    }, 1200); // slightly longer for full float

    return () => clearTimeout(timer);
  }, [onEnd]);

  const heartStyle = {
    position: "fixed",
    left: `${left}px`,
    top: `${top}px`,
    zIndex: 1000,
    fontSize: "2rem",
    color: theme?.fg || "#ff69b4",
    animation: "float-up 1s ease-out forwards",
    pointerEvents: "none"
  };

  return (
    <div className="heart-animation" style={heartStyle}>
      <span role="img" aria-label="heart">
        {theme?.emoji || "❤️"}
      </span>
    </div>
  );
}

