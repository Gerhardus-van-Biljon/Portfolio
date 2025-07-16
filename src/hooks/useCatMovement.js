import { useState, useEffect } from "react";

/**
 * Hook to manage cat positions, horizontal movement, mood cycling, and animation state.
 * @param {number} catCount
 * @returns {object} { cats, moveCat }
 */
export default function useCatMovement(catCount) {
  const [cats, setCats] = useState([]);

  // ========== Spawn Cats on Mount ========== //
  useEffect(() => {
    setCats(
      Array.from({ length: catCount }, () => ({
        left: Math.random() * (window.innerWidth - 60),
        top: window.innerHeight - 80 + Math.random() * 40,

        animation: "cat-idle",
        direction: Math.random() < 0.5 ? "left" : "right",
        mood: "sit",
        isMoving: false
      }))
    );
  }, [catCount]);

  // ========== Auto-Movement Loop (horizontal only) ========== //
  useEffect(() => {
  let frame;
  const animate = () => {
    setCats(prev =>
      prev.map(cat => {
        const step = 2; // smaller step for smoothness
        let newLeft = cat.left;
        let newDirection = cat.direction;
        let newAnim = "cat-idle";
        let isMoving = cat.isMoving;

        if (!isMoving && Math.random() < 0.02) {
          isMoving = true;
          newDirection = newDirection === "left" ? "right" : "left";
        }

        if (isMoving) {
          newAnim = "cat-walk";
          if (newDirection === "right") {
            newLeft = Math.min(window.innerWidth - 60, cat.left + step);
          } else {
            newLeft = Math.max(0, cat.left - step);
          }

          // stop if reached edge
          if (newLeft === cat.left) isMoving = false;
        }

        return {
          ...cat,
          left: newLeft,
          direction: newDirection,
          animation: newAnim,
          isMoving
        };
      })
    );
    frame = requestAnimationFrame(animate);
  };

  frame = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frame);
}, []);


  // ========== Mood Cycle When Stationary ========== //
  useEffect(() => {
    const moodTimer = setInterval(() => {
      setCats(prev =>
        prev.map(cat => {
          if (cat.isMoving) return { ...cat, isMoving: false }; // reset movement flag
          const moods = ["sit", "stretch", "meow", "curl"];
          const next = moods[(moods.indexOf(cat.mood) + 1) % moods.length];
          return { ...cat, mood: next };
        })
      );
    }, 8000);

    return () => clearInterval(moodTimer);
  }, []);

  // ========== Manual Horizontal Movement ========== //
  function moveCat(index, dir) {
    setCats(prev => {
      const catsCopy = [...prev];
      if (!catsCopy[index]) return prev;

      const step = 60;
      const newLeft = dir === "right"
        ? Math.min(window.innerWidth - 60, catsCopy[index].left + step)
        : Math.max(0, catsCopy[index].left - step);

      catsCopy[index] = {
        ...catsCopy[index],
        left: newLeft,
        direction: dir,
        animation: "cat-walk",
        isMoving: true
      };

      return catsCopy;
    });
  }

  return { cats, moveCat };
}
