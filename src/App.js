import React, { useState, useCallback } from "react";
import Terminal from "./components/Terminal";
import CatShowcase from "./components/CatShowcase";
import "./styles.css";


import themes from "./themes";

// Utility for heart color
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

function App() {
    const [catCount, setCatCount] = useState(1);
    const maxCats = 5;

    // Cat click handler for hearts animation
    const handleCatClick = useCallback(() => {
        const theme = themes.kimbie; // Or use your current theme if you pass it down
        const heartCount = Math.floor(Math.random() * 3) + 2;
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
    }, []);

    const handleCatCountChange = (e) => {
        const count = Math.min(maxCats, Math.max(1, Number(e.target.value)));
        setCatCount(count);
    };

    return (
        <div className="app-container">
            <div className="terminal-wrapper">
                <Terminal />
                <div className="cat-control">
                    <label htmlFor="catCount">Cats:</label>
                    <input
                        id="catCount"
                        type="number"
                        min="1"
                        max={maxCats}
                        value={catCount}
                        onChange={handleCatCountChange}
                    />
                </div>
                <CatShowcase catCount={catCount} onCatClick={handleCatClick} />
            </div>
            <div className="sidebar">
                <img src="/profile.jpg" alt="Profile" className="profile-pic" />
            </div>
        </div>
    );
}

export default App;
