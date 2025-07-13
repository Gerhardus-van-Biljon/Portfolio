import React, { useState, useRef, useEffect } from "react";
import themes from "../themes";

const commandsList = ["help","about","projects","contact","clear","theme"];

function Terminal() {
  const [output, setOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("kimbie");
  const refInput = useRef(null);

  useEffect(() => { refInput.current?.focus(); }, [output, theme]);

  const print = (text) => setOutput((prev) => [...prev, ...text.split("\n")]);

  const handleCommand = (cmdRaw) => {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;
    setOutput((prev) => [...prev, `$ ${cmd}`]);
    setHistory((h) => [...h, cmd]);
    setHistoryIndex(history.length + 1);

    if (cmd.startsWith("theme ")) return applyTheme(cmd.split(" ")[1]);

    switch (cmd) {
      case "help":
        print("Commands: " + commandsList.join(", "));
        break;
      case "about":
        print("I'm a programmer specializing in C++, Python, and web dev.");
        break;
      case "projects":
        print("1. Flight Booking System (C++)\n2. Terminal Portfolio (React)\n3. Data Visualizer (Python)");
        break;
      case "contact":
        print("Email: you@example.com\nGitHub: github.com/yourhandle");
        break;
      case "clear":
        setOutput([]);
        break;
      default:
        print(`Unknown command: ${cmd} (type 'help')`);
    }
  };

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



  const applyTheme = (name) => {
    if (name === "light") {
      print("%cError: Only Sycopatch uses light mode...", "glitch");
      setTimeout(() => {
          setTheme("kimbie");
          document.documentElement.style.setProperty('--cat-color', themes['kimbie'].fg);
        print("Switched back to theme: kimbie");
      }, 1500);
      return;
    }
    if (themes[name]) {
        setTheme(name);
        document.documentElement.style.setProperty('--cat-color', themes[name]?.fg || '#fff');
      print(`Switched to theme: ${name}`);
    } else {
      print("Invalid. Try: " + [...Object.keys(themes), "light"].join(", "));
    }
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

  const style = { background: themes[theme].bg, color: themes[theme].fg };

  return (
    <div className="terminal" style={style} onClick={() => refInput.current?.focus()}>
          {output.map((line, i) => (
              <TypeLine key={i} text={line} />
          ))}
          <div className="input-line">
              <span className="prompt">$</span>
              <span className="input-wrapper">
                  {input}
                  <span className="cursor" />
                  <input
                      ref={refInput}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      style={style}
                      className="ghost-input"
                  />
              </span>
          </div>
    </div>
  );
}

export default Terminal;
