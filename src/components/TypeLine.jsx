import React, { useState, useEffect, forwardRef } from "react";

/**
 * Displays text with a typing animation. Forwards ref for position tracking.
 */
const TypeLine = forwardRef(({ text }, ref) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayed(text.slice(0, ++i));
            if (i >= text.length) clearInterval(interval);
        }, 15);
        return () => clearInterval(interval);
    }, [text]);

    return <div ref={ref} className={`type-line ${text.includes("Error") ? "glitch" : ""}`}>{displayed}</div>;
});

export default TypeLine;
