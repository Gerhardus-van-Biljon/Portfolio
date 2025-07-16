
/* ========== useCatInteraction Hook ========== */
import { useState } from "react";

/**
 * Custom hook for cat click interaction: occasional purr and heart animation at clicked cat.
 * @param {function} playPurr - Function to play purr sound (optional)
 * @returns {object} { heartPos, shouldPurr, handleCatClick, clearHeart }
 */
export default function useCatInteraction(playPurr) {
    // ========== State ========== //
    const [heartPos, setHeartPos] = useState(null);
    const [shouldPurr, setShouldPurr] = useState(false);

    // ========== Cat Click Handler ========== //
    // Call this on cat click, pass the cat's position (e.g. {left, top})
    function handleCatClick(pos) {
        // 30% chance to purr
        const purr = Math.random() < 0.3;
        setShouldPurr(purr);
        if (purr && playPurr) playPurr();
        setHeartPos(pos); // Show heart at clicked cat
    }

    // ========== Heart Animation Clear ========== //
    // Call this to clear heart after animation
    function clearHeart() {
        setHeartPos(null);
    }

    // ========== Return API ========== //
    return {
        heartPos,
        shouldPurr,
        handleCatClick,
        clearHeart,
    };
}
