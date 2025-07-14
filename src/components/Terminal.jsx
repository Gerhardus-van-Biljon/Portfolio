

import React, { useState, useRef, useEffect } from "react";
import TypeLine from "./TypeLine";
import InputLine from "./InputLine";
import useTerminalHistory from "../hooks/useTerminalHistory";
import useTheme from "../hooks/useTheme";
import CatInteraction from "./CatInteraction";
import { commandsList, handleCommandLogic } from "../commands";

function Terminal({ themeName = "kimbie" }) {
    const [output, setOutput] = useState(["Welcome to the terminal!"]);
    const [input, setInput] = useState("");
    const refInput = useRef(null);

    const print = (text) => setOutput((prev) => [...prev, ...text.split("\n")]);
    const { theme, applyTheme } = useTheme(print, themeName);
    const { history, historyIndex, setHistory, setHistoryIndex } = useTerminalHistory();

    useEffect(() => {
        refInput.current?.focus();
    }, [output, theme]);

    const handleCommand = (cmdRaw) => {
        const cmd = cmdRaw.trim().toLowerCase();
        if (!cmd) return;

        setOutput((prev) => [...prev, `$ ${cmd}`]);

        setHistory((h) => {
            const newHistory = [...h, cmd];
            setHistoryIndex(newHistory.length);
            return newHistory;
        });

        if (cmd.startsWith("theme ")) {
            applyTheme(cmd.split(" ")[1]);
            return;
        }

        handleCommandLogic(cmd, print, setOutput, applyTheme);
    };

    const handleKey = (e) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const idx = Math.max(0, historyIndex - 1);
            setInput(history[idx] || "");
            setHistoryIndex(idx);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const idx = Math.min(history.length, historyIndex + 1);
            setInput(history[idx] || "");
            setHistoryIndex(idx);
        } else if (e.key === "Tab") {
            e.preventDefault();
            const matches = commandsList.filter((c) => c.startsWith(input));
            if (matches.length === 1) setInput(matches[0]);
            else if (matches.length > 1) print(matches.join("    "));
        }
    };

    return (
        <div
            className="terminal"
            style={{ backgroundColor: theme.bg, color: theme.fg }}
            onClick={() => refInput.current?.focus()}
        >
            {output.map((line, i) => (
                <TypeLine key={i} text={line} />
            ))}

            <div className="input-line">
                <span className="prompt">$</span>
                <span className="input-text" style={{ color: theme.inputColor }}>
                    {input}
                    <span className="cursor" />
                </span>
                <input
                    ref={refInput}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    className="ghost-input"
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Terminal input"
                    style={{ color: theme.inputColor }}
                />
            </div>

            <CatInteraction theme={theme} />
        </div>
    );
}


export default Terminal;

