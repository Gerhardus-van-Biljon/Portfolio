import React from "react";


/* ========== InputLine Component ========== */
/**
 * Input line component with prompt, input text, and blinking cursor.
 * Uses forwarded ref for input focus management.
 */
const InputLine = React.forwardRef(({ input, setInput, handleKey, style }, ref) => {
    return (
        <div className="input-line">
            <label htmlFor="cli-input">
                <span className="prompt" aria-hidden="true">Terminal C:/Users/Gerhardus&gt;</span>
            </label>
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
