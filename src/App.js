
/* ========== Imports ========== */
import React, { useState, useCallback } from "react";
import Terminal from "./components/Terminal";
import CatShowcase from "./components/CatShowcase";
import "./styles.css";
import themes from "./themes";
import { getContrastingColor } from "./utils/color";


/* ========== App Component ========== */
function App() {
    // ========== State ========== //
    const [catCount, setCatCount] = useState(1);
    const maxCats = 5;

    // ========== Cat Count Change Handler ========== //
    const handleCatCountChange = (e) => {
        const count = Math.min(maxCats, Math.max(1, Number(e.target.value)));
        setCatCount(count);
    };

    // ========== Render ========== //
    return (
        <div className="app-container">
            <div className="terminal-wrapper">            
               <Terminal setCatCount={setCatCount} catCount={catCount} />
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
            </div>
            <div className="sidebar">
                <img src="/profile.jpg" alt="Profile" className="profile-pic" />
            </div>
        </div>
    );
}

export default App;
