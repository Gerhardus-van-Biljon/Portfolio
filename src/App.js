import React, { useState, useEffect } from "react";
import Terminal from "./components/Terminal";
import "./styles.css";

function App() {
    const [catCount, setCatCount] = useState(1);
    const maxCats = 5;
    const [pawPrints, setPawPrints] = useState([]);

    const handleCatCountChange = (e) => {
        const count = Math.min(maxCats, Math.max(1, Number(e.target.value)));
        setCatCount(count);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setPawPrints((prev) => [
                ...prev,
                ...Array.from({ length: catCount }, (_, i) => ({
                    id: Date.now() + i,
                    left: Math.random() * 100,
                    top: Math.random() * 100,
                }))
            ]);
        }, 3000);

        return () => clearInterval(interval);
    }, [catCount]);

    useEffect(() => {
        const cleanup = setInterval(() => {
            setPawPrints((prev) => prev.slice(-50));
        }, 5000);
        return () => clearInterval(cleanup);
    }, []);

    return (
        <div className="app-container">
            <div className="terminal-wrapper">
                <Terminal />
                <div className="cat-control">
                    <label htmlFor="catCount">Cats:</label>
                    <input id="catCount"
                        type="number"
                        min="1"
                        max={maxCats}
                        value={catCount}
                        onChange={handleCatCountChange} />
                </div>
                {[...Array(catCount)].map((_, i) => (
                    <div key={i} className="cat-animation" style={{ animationDelay: `${i * 3}s` }} />
                ))}
                {pawPrints.map((print) => (
                    <div key={print.id}
                        className="paw-print"
                        style={{ left: `${print.left}%`, top: `${print.top}%` }} />
                ))}
            </div>
            <div className="sidebar">
                <img src="/profile.jpg" alt="Profile" className="profile-pic" />
            </div>
        </div>
    );
}

export default App;
