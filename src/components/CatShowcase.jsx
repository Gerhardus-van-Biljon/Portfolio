import React, { useState, useEffect, useCallback } from "react";

/**
 * CatShowcase renders animated cats and paw prints.
 * Props:
 *   - catCount: number of cats to show
 *   - onCatClick: function to call when a cat is clicked
 */
export default function CatShowcase({ catCount, onCatClick }) {
    const maxCats = 5;
    const [pawPrints, setPawPrints] = useState([]);

    // Add new paw prints every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setPawPrints((prev) => [
                ...prev,
                ...Array.from({ length: catCount }, (_, i) => ({
                    id: `${Date.now()}-${Math.random()}`,
                    left: Math.random() * 100,
                    top: Math.random() * 100,
                }))
            ]);
        }, 3000);
        return () => clearInterval(interval);
    }, [catCount]);

    // Keep only the last 50 paw prints
    useEffect(() => {
        const cleanup = setInterval(() => {
            setPawPrints((prev) => prev.slice(-50));
        }, 5000);
        return () => clearInterval(cleanup);
    }, []);

    return (
        <>
            {[...Array(catCount)].map((_, i) => (
                <div
                    key={i}
                    onClick={onCatClick}
                    className="cat-animation"
                    style={{ animationDelay: `${i * 3}s` }}
                    tabIndex={0}
                    aria-label="Animated Cat"
                    role="button"
                />
            ))}
            {pawPrints.map((print) => (
                <div
                    key={print.id}
                    className="paw-print"
                    style={{ left: `${print.left}%`, top: `${print.top}%` }}
                />
            ))}
        </>
    );
}
