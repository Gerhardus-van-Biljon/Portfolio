import React from "react";

/**
 * Input line component with prompt, input text, and blinking cursor.
 * Uses forwarded ref for input focus management.
 */
const InputLine = React.forwardRef(({ input, setInput, handleKey, style }, ref) => {
    return (
        <div className="input-line">
            <span className="prompt">$</span>
            <span className="input-wrapper">
                {input}
                <span className="cursor" />
                <input
                    ref={ref}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    style={style}
                    className="ghost-input"
                    aria-label="Terminal input"
                    autoComplete="off"
                    spellCheck={false}
                />
            </span>
        </div>
    );
});

export default InputLine;
