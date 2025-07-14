import React, { useState, useEffect } from "react";

/**
 * Displays text with a typing animation.
 */
function TypeLine({ text }) {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayed(text.slice(0, ++i));
            if (i >= text.length) clearInterval(interval);
        }, 15);
        return () => clearInterval(interval);
    }, [text]);

    return <div className="type-line">{displayed}</div>;
}

export default TypeLine;
