import React, { useState, useRef, useEffect } from "react";
import InputLine from "./InputLine";
import useTerminalHistory from "../hooks/useTerminalHistory";
import useTheme from "../hooks/useTheme";
import CatInteraction from "./CatInteraction";
import CatShowcase from "./CatShowcase";
import { commandsList, handleCommandLogic } from "../commands";
import drawCommandTable from "../utils/drawCommandTable"; // <-- if using reactive table

function Terminal({ themeName = "kimbie", setCatCount, catCount }) {
  const lineRefs = useRef([]);
  const [output, setOutput] = useState([
    { type: "output", value: "Welcome! Type 'help' to see available commands." }
  ]);
  const [input, setInput] = useState("");
  const refInput = useRef(null);
  const scrollRef = useRef(null);

  const print = (text) =>
    setOutput((prev) => [
      ...prev,
      ...text.split("\n").map((line) => ({ type: "output", value: line }))
    ]);

  const { theme, applyTheme } = useTheme(print, themeName);
  const { history, historyIndex, setHistory, setHistoryIndex } = useTerminalHistory();

  useEffect(() => {
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  scrollToBottom(); // scroll whenever output length changes

  const handleVisibility = () => {
    if (document.visibilityState === "visible") {
      refInput.current?.focus();    // restore input focus
      scrollToBottom();             // scroll again in case new output came in
    }
  };

  document.addEventListener("visibilitychange", handleVisibility);
  return () => {
    document.removeEventListener("visibilitychange", handleVisibility);
  };
}, [output.length]);



  const handleCommand = (cmdRaw) => {
    const cmd = cmdRaw.trim();

    setOutput((prev) => [
      ...prev,
      { type: "prompt", value: `Terminal C:/Users/Gerhardus> ${cmdRaw}` }
    ]);

    if (!cmd) return;

    setHistory((h) => {
      const newHistory = [...h, cmd];
      setHistoryIndex(newHistory.length);
      return newHistory;
    });

    if (cmd === "themes" || cmd === "theme") {
      const themeList = Object.entries(require("../themes").default)
        .map(([name, data]) => `${name} ${data.emoji || ""}`)
        .join(", ");
      print(`Available themes: ${themeList}\nType theme <name> to apply.`);
      return;
    }

    if (cmd.startsWith("theme ")) {
      applyTheme(cmd.split(" ")[1]);
      return;
    }

    const response = handleCommandLogic(cmd, print, setOutput, setCatCount, applyTheme, theme);
    if (response) print(response);
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
      {output.map((line, i) => {
  if (!lineRefs.current[i]) lineRefs.current[i] = React.createRef();

  if (line.type === "prompt") {
    return (
      <div
        key={i}
        ref={lineRefs.current[i]}
        className="type-line prompt-line"
        style={{ color: theme.promptColor || theme.fg, fontWeight: 600 }}
      >
        {line.value}
      </div>
    );
  }

  if (line.type === "output-reactive") {
    return (
      <div key={i} ref={lineRefs.current[i]}>
        {line.value(theme)}
      </div>
    );
  }

  if (line.type === "output") {
    return (
      <div
        key={i}
        ref={lineRefs.current[i]}
        className="type-line output-line"
        style={{ color: theme.outputColor }}
        dangerouslySetInnerHTML={{
          __html: typeof line.value === "string" ? line.value : ""
        }}
      />
    );
  }

  // Optional fallback for unknown types
  return (
    <div
      key={i}
      ref={lineRefs.current[i]}
      className="type-line output-line"
      style={{ color: theme.outputColor }}
    >
      {line.value}
    </div>
  );
})}

      <InputLine
        ref={refInput}
        input={input}
        setInput={setInput}
        handleKey={handleKey}
        style={{ color: theme.inputColor }}
      />

      <CatInteraction theme={theme} />
      <CatShowcase catCount={catCount} theme={theme} lineRefs={lineRefs.current} />
      <div ref={scrollRef} />
    </div>
  );
}

export default Terminal;
