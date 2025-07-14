/**
 * List of available commands.
 */
export const commandsList = [
    "help",
    "about",
    "projects",
    "contact",
    "clear",
    "theme",
    "pets"
];

/**
 * Handles command logic and prints output.
 * @param {string} cmd - The command string.
 * @param {function} print - Function to append lines to output.
 * @param {function} setOutput - Function to set entire output (used for clear).
 * @param {function} setCatCount - Function to set number of cats on screen.
 * @param {function} applyTheme - Function to switch theme.
 */
export function handleCommandLogic(cmd, print, setOutput, setCatCount, applyTheme) {
    const [baseCmd, ...args] = cmd.split(" ");

    switch (baseCmd) {
        case "help":
            print("Commands: " + commandsList.join(", "));
            break;
        case "about":
            print("I'm a programmer specializing in C++, Python, and web dev.");
            break;
        case "projects":
            print(
                "1. Flight Booking System (C++)\n2. Terminal Portfolio (React)\n3. Data Visualizer (Python)"
            );
            break;
        case "contact":
            print("Email: you@example.com\nGitHub: github.com/yourhandle");
            break;
        case "clear":
            setOutput([]);
            break;
        case "theme":
            if (args.length === 0) {
                print("Usage: theme [theme-name]");
            } else {
                const themeName = args[0];
                if (applyTheme) {
                    applyTheme(themeName);
                } else {
                    print("Theme functionality not available.");
                }
            }
            break;
        case "pets":
            if (args.length === 0) {
                print("Usage: pets [number_of_cats]");
            } else {
                const count = parseInt(args[0], 10);
                if (isNaN(count) || count < 0 || count > 6) {
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
