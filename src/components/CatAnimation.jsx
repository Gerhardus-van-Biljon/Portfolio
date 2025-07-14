import React, { useEffect, useState } from "react";

function randomPosition() {
    return {
        top: Math.random() * 90 + "%",
        left: Math.random() * 90 + "%",
    };
}

function CatAnimation({ theme }) {
    const [pos, setPos] = useState(randomPosition());

    useEffect(() => {
        const interval = setInterval(() => {
            setPos(randomPosition());
        }, 5000); // Move every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="cat-animation"
            style={{
                position: "absolute",
                width: "32px",
                height: "32px",
                background: theme.fg,
                mask: "url('/cat-pixel.svg') no-repeat center / contain",
                WebkitMask: "url('/cat-pixel.svg') no-repeat center / contain",
                top: pos.top,
                left: pos.left,
                cursor: "pointer",
                transition: "top 1s ease, left 1s ease",
                zIndex: 10,
            }}
            title="Meow! Click me!"
            onClick={() => alert("You petted a cat! Purrr 🐾")}
        />
    );
}

export default CatAnimation;
