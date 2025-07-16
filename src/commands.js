
/* ========== Command Descriptions & List ========== */
/**
 * List of available commands and their descriptions.
 */

import drawCommandTable from "./utils/drawCommandTable";

const commandDescriptions = {
    help: "List available commands",
    about: "Show programmer bio",
    projects: "Show project list",
    contact: "Display contact info",
    clear: "Clear terminal output",
    theme: "Change terminal theme",
    pets: "Set number of animated cats",
};

export const commandsList = Object.keys(commandDescriptions);


/* ========== Error Printing Utility ========== */
/**
 * Prints a styled error message to the terminal and removes it after a delay.
 * @param {string} message - The error message to display.
 * @param {object} theme - The current theme object.
 * @param {function} print - Function to append lines to output.
 * @param {function} setOutput - Function to set entire output (used for clear).
 */
export function printError(message, theme, print, setOutput) {
    const color = theme?.fg || "#ff69b4";
    const emoji = theme?.emoji || "❌";
    const html = `<span style="color:${color};" class="error-line">${emoji} ${message}</span>`;

    print(html);

    setTimeout(() => {
        setOutput((prev) => prev.filter((line) => !line.includes(message)));
    }, 3000);
}


/* ========== Main Command Handler ========== */
/**
 * Handles command logic and prints output.
 * @param {string} cmd - The command string.
 * @param {function} print - Function to append lines to output.
 * @param {function} setOutput - Function to set entire output (used for clear).
 * @param {function} setCatCount - Function to set number of cats on screen.
 * @param {function} applyTheme - Function to switch theme.
 * @param {object} theme - The current theme object.
 */
export function handleCommandLogic(cmd, print, setOutput, setCatCount, applyTheme, theme) {
    const [baseCmd, ...args] = cmd.split(" ");

    switch (baseCmd) {
        case "help":   
        case "commands":
        case "?":
      const renderTable = drawCommandTable(commandDescriptions);
  setOutput(prev => [...prev, {
    type: "output-reactive",
    value: renderTable // function that takes theme
  }]);
  break;
  break;

        case "credits":
        print("Created by Gerhardus van Biljon. Powered by imagination, Cats, and React.");
            break;
        case "purrr":
        print("🐱 Meow~ You found the hidden purr protocol.");
            break;
        case "about":
            print("I'm a Robotics Engineering Student at Eduvos | Passionate about Cats, Python, AI, and Robotics.");
            break;
        case "projects":
            print(
                "Terminal Portfolio (React)- what you are looking at.."
            );
            break;
        case "contact":
            print("GitHub: <a href='https://github.com/Gerhardus-van-Biljon' target='_blank'>github.com/Gerhardus-van-Biljon</a>");
            print("Email: <a href='mailto:vanbiljongerhardus@gmail.com'>vanbiljongerhardus@gmail.com</a>");
            break;
        case "clear":
            setOutput([]);
            break;
        case "theme":
    if (args.length === 0) {
        const errorStyle = `style="color: ${theme.fg};"`;
        const emoji = theme.emoji || "❌";
        print(`<span ${errorStyle} class="error-line">${emoji} Usage: theme [theme-name]</span>`);

        setTimeout(() => {
            setOutput((prev) => prev.filter(line => !line.includes("Usage: theme")));
        }, 3000);
    } else {
        applyTheme(args[0]);
    }
    break;

        case "pets":
            if (args.length === 0) {
                print("Usage: pets [number_of_cats]");
            } else {
                const count = parseInt(args[0], 10);
                if (isNaN(count) || count < 1 || count > 5) {
                    print("Please enter a number between 1 and 5.");
                } else {
                    if (setCatCount) {
                        setCatCount(count);
                        print(`Set number of cats to ${count}.`);
                    } else {
                        print("Pets functionality not available.");
                    }
                }
            }
            break;
        default:
            print(`Unknown command: ${cmd} (type 'help')`);
    }
}
