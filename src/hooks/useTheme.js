
/* ========== Imports ========== */
import { useState, useEffect, useRef} from "react";
import themes from "../themes";


/* ========== useTheme Hook ========== */
/**
 * Custom hook to manage theme state and apply CSS variables.
 * @param {function} [print] - Optional function to print messages to terminal output.
 * @param {string} [initialThemeName] - Optional initial theme name.
 */
export default function useTheme(print = () => {}, initialThemeName = "kimbie") {
    // ========== State ========== //
    const [themeName, setThemeName] = useState(initialThemeName);
    const [theme, setTheme] = useState(themes[initialThemeName]);
    const previousThemeRef = useRef(initialThemeName); // 🧠 Store previous theme

    // ========== Effect: Apply Theme CSS Variables ========== //
    useEffect(() => {
        if (!theme) return;

        // Update CSS variables for all theme colors
        document.documentElement.style.setProperty("--prompt-color", theme.fg);
        document.documentElement.style.setProperty("--input-color", theme.inputColor);
        document.documentElement.style.setProperty("--output-color", theme.outputColor);
        document.documentElement.style.setProperty("--background-color", theme.bg);
        document.documentElement.style.setProperty("--cat-color", theme.fg);
    }, [theme]);

    // ========== Theme Switcher ========== //
    const applyTheme = (name) => {
        const themeNames = [...Object.keys(themes), "light"];

        if (name === "light") {
            print("Error: Only Sycopatch uses light mode...");
            print("Reverting to previous theme: " + previousThemeRef.current);

            const fallbackTheme = previousThemeRef.current || "kimbie";
            const emoji = themes[fallbackTheme]?.emoji || "❤️";

            setTimeout(() => {
                setThemeName(fallbackTheme);
                setTheme(themes[fallbackTheme]);
                document.documentElement.style.setProperty("--cat-color", themes[fallbackTheme].fg);
                print(`Switched back to theme: ${fallbackTheme} ${emoji}`);
            }, 1500);
            return;
        }

        if (themes[name]) {
            previousThemeRef.current = name; // Remember this theme
            setThemeName(name);
            setTheme(themes[name]);
            print(`Switched to theme: ${name}`);
        } else {
            // No-op for unknown theme
        }
    };

    return { theme, themeName, applyTheme };
}

