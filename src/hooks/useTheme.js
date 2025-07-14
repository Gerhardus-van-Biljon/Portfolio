import { useState, useEffect } from "react";
import themes from "../themes";

/**
 * Custom hook to manage theme state and apply CSS variables.
 * @param {function} [print] - Optional function to print messages to terminal output.
 * @param {string} [initialThemeName] - Optional initial theme name.
 */
export default function useTheme(print = () => { }, initialThemeName = "kimbie") {
    const [themeName, setThemeName] = useState(initialThemeName);
    const [theme, setTheme] = useState(themes[initialThemeName]);

    useEffect(() => {
        if (!theme) return;

        // Update CSS variables for all theme colors
        document.documentElement.style.setProperty("--prompt-color", theme.fg);
        document.documentElement.style.setProperty("--input-color", theme.inputColor);
        document.documentElement.style.setProperty("--output-color", theme.outputColor);
        document.documentElement.style.setProperty("--background-color", theme.bg);
        document.documentElement.style.setProperty("--cat-color", theme.fg); // if you use this for cat color
    }, [theme]);

    const applyTheme = (name) => {
        if (name === "light") {
            print("Error: Only Sycopatch uses light mode...");
            setTimeout(() => {
                setThemeName("kimbie");
                setTheme(themes.kimbie);
                document.documentElement.style.setProperty("--cat-color", themes.kimbie.fg);
                print("Switched back to theme: kimbie");
            }, 1500);
            return;
        }
        
        if (themes[name]) {
            setThemeName(name);
            setTheme(themes[name]);
            print(`Switched to theme: ${name}`);
        } else {
            print("Invalid theme. Try: " + Object.keys(themes).join(", "));
        }
    };

    return { theme, themeName, applyTheme };
}
