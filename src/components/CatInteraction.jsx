import React, { useEffect, useCallback } from "react";
import themes from "../themes";

/**
 * Utility to get contrasting color (black or white) for given hex color.
 */
function getContrastingColor(hex) {
    const c = hex.substring(1);
    const [r, g, b] = [
        parseInt(c.substr(0, 2), 16),
        parseInt(c.substr(2, 2), 16),
        parseInt(c.substr(4, 2), 16),
    ];
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000" : "#fff";
}

/**
 * CatInteraction component adds hearts on click and random "Purrr~" bubbles.
 */
export default function CatInteraction({ theme }) {
    // Hearts animation on cat click
    const handleCatClick = useCallback(() => {
        const heartCount = Math.floor(Math.random() * 3) + 2; // 2–4 hearts
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.textContent = "❤️";
            heart.style.left = `${Math.random() * 80 + 10}%`;
            heart.style.top = "90%";
            heart.style.color = getContrastingColor(theme.fg || "#ff69b4");
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 2000 + i * 300);
        }
    }, [theme]);

    // Random "Purrr~" bubbles every 3 seconds with 25% chance
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() < 0.25) {
                const bubble = document.createElement("div");
                bubble.className = "purrr";
                bubble.textContent = "Purrr~";
                bubble.style.left = "50%";
                bubble.style.top = "85%";
                bubble.style.color = getContrastingColor(theme.fg || "#ff69b4");
                document.body.appendChild(bubble);
                setTimeout(() => bubble.remove(), 1500);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [theme]);

    return (
        <div
            className="cat-animation"
            onClick={handleCatClick}
            aria-label="Cat animation"
            role="button"
            tabIndex={0}
        />
    );
}
