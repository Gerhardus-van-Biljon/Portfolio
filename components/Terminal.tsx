import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { catPoses } from "../catPoses";
import themes from "../themes";

interface TerminalProps {
  onThemeChange: (theme: string) => void;
  onPoseChange: (pose: "sitting") => void;
  onAnimationToggle: () => void;
  onGlitch: () => void;
  currentTheme: string;
  currentPose: "sitting";
  isAnimating: boolean;
}

interface CommandHistory {
  command: string;
  output: string;
  timestamp: Date;
  isError?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({
  onThemeChange,
  onAnimationToggle,
  onGlitch,
  currentTheme,
  currentPose,
  isAnimating,
}) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "boot",
      output:
        'CatOS Terminal v1.0.2 - Booting...\nSystem initialized successfully.\nPixel Cat loaded.\nType "help" for available commands.',
      timestamp: new Date(),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<
    string[]
  >([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [showCat, setShowCat] = useState(true);
  const [catMessage, setCatMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const availableThemes = [
    "matrix",
    "kimbie",
    "dracula",
    "abyss",
    "normal",
    "chocolate",
  ];
  const availablePoses = ["sitting"];

  // Cat animation logic
  const poses = Object.values(
    catPoses[currentPose as keyof typeof catPoses],
  );
  const currentPattern = poses[currentPoseIndex] || poses[0];

  // Get theme-specific error color (now dynamically based on current theme)
  const getThemeErrorColor = (): string => {
    const theme = themes[currentTheme as keyof typeof themes];
    if (!theme) return "#ff4444";

    switch (currentTheme) {
      case "matrix":
        return "#ff3333"; // Bright red for matrix
      case "kimbie":
        return theme.fg; // Use the main foreground color
      case "dracula":
        return "#ff79c6"; // Bright pink for dracula
      case "abyss":
        return "#ff79c6"; // Bright pink for abyss
      case "normal":
        return "#ff6b6b"; // Soft red for normal
      case "chocolate":
        return "#ff4757"; // Warm red for chocolate
      default:
        return theme.fg; // Fallback to theme foreground
    }
  };

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Auto-scroll to bottom when history updates - FIXED
  useEffect(() => {
    if (terminalRef.current) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop =
            terminalRef.current.scrollHeight;
        }
      });
    }
  }, [history]);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentPoseIndex((prev) => (prev + 1) % poses.length);
    }, 500); // Slightly faster for ear movements

    return () => clearInterval(interval);
  }, [poses.length, isAnimating]);

  useEffect(() => {
    setCurrentPoseIndex(0);
  }, [currentPose]);

  // Update cat message based on animation state
  useEffect(() => {
    if (
      catMessage === "" ||
      catMessage === "sitting • ears still"
    ) {
      setCatMessage(isAnimating ? "" : "sitting • ears still");
    }
  }, [isAnimating, catMessage]);

  const getPixelColor = (value: number): string => {
    switch (value) {
      case 0:
        return "var(--cat-outline)";
      case 1:
        return "var(--cat-belly)";
      case 2:
        return "var(--cat-fur1)";
      case 3:
        return "var(--cat-fur2)";
      case 4:
        return "var(--cat-ear)";
      case 5:
      default:
        return "transparent";
    }
  };

  const renderCat = () => {
    if (!showCat || !currentPattern) return null;

    return (
      <div style={{ padding: "16px" }}>
        <div
          style={{
            display: "inline-block",
            border: `2px solid var(--fg)`,
            borderRadius: "8px",
            padding: "12px",
            backgroundColor: "transparent",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(32, 4px)",
              gridTemplateRows: "repeat(32, 4px)",
              gap: "0",
              width: "128px",
              height: "128px",
              margin: "0 auto",
            }}
          >
            {currentPattern.flat().map((pixel, index) => (
              <div
                key={index}
                style={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: getPixelColor(pixel),
                }}
              />
            ))}
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              marginTop: "12px",
              opacity: 0.75,
              color: "var(--fg)",
            }}
          >
            {catMessage}
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              opacity: 0.5,
              marginTop: "4px",
              color: "var(--fg)",
            }}
          >
            {currentPoseIndex + 1}/{poses.length} •{" "}
            {isAnimating ? "live" : "paused"}
          </div>
        </div>
      </div>
    );
  };

  const getThemeSpecificError = (
    command: string,
    invalidArg: string,
  ): string => {
    const baseMessage = `✗ CRITICAL ERROR: Unknown ${command} "${invalidArg}"`;

    switch (currentTheme) {
      case "matrix":
        return `${baseMessage}
The Matrix has been corrupted...
Green rain falling upward...
Reality.exe is non-responsive...
Available ${command}s: ${command === "theme" ? availableThemes.join(", ") : availablePoses.join(", ")}`;

      case "kimbie":
        return `${baseMessage}
The woodland spirits are angry...
Amber flames consume the data...
Fox.exe has gone into hiding...
Available ${command}s: ${command === "theme" ? availableThemes.join(", ") : availablePoses.join(", ")}`;

      case "dracula":
        return `${baseMessage}
The vampires are restless...
Blood moon corrupting the data...
Dracula.exe has awakened from his slumber...
Available ${command}s: ${command === "theme" ? availableThemes.join(", ") : availablePoses.join(", ")}`;

      case "abyss":
        return `${baseMessage}
Tentacles emerging from the void...
Pressure crushing the data streams...
Leviathan.exe has awakened...
Available ${command}s: ${command === "theme" ? availableThemes.join(", ") : availablePoses.join(", ")}`;

      case "normal":
        return `${baseMessage}
Productivity metrics failing...
Corporate firewall breach...
Meeting.exe requires immediate restart...
Available ${command}s: ${command === "theme" ? availableThemes.join(", ") : availablePoses.join(", ")}`;

      case "chocolate":
        return `${baseMessage}
Sweet dreams turning to nightmares...
Chocolate river contaminated...
Wonka.exe has stopped responding...
Available ${command}s: ${command === "theme" ? availableThemes.join(", ") : availablePoses.join(", ")}`;

      default:
        return `${baseMessage}
System malfunction detected...
Available ${command}s: ${command === "theme" ? availableThemes.join(", ") : availablePoses.join(", ")}`;
    }
  };

  const getGenericError = (command: string): string => {
    switch (currentTheme) {
      case "matrix":
        return `✗ SEGMENTATION FAULT: Command "${command}" not found
The machines are learning...
Neo.exe has left the building...
Wake up, the Matrix has you...
Type "help" for available commands.`;

      case "kimbie":
        return `��� WOODLAND PANIC: Command "${command}" not found
The forest creatures are confused...
Autumn leaves obscuring the path...
Nature.exe is reclaiming the system...
Type "help" for available commands.`;

      case "dracula":
        return `✗ BLOOD MOON ERROR: Command "${command}" not found
The undead cannot comprehend...
Coffin.exe is currently closed...
Eternal darkness clouding the system...
Type "help" for available commands.`;

      case "abyss":
        return `✗ ABYSSAL VOID: Command "${command}" not found
Something stirs in the depths...
Darkness consuming all logic...
Cthulhu.exe has been summoned...
Type "help" for available commands.`;

      case "normal":
        return `✗ OPERATIONAL FAILURE: Command "${command}" not found
Efficiency protocols breached...
Quarterly reports are overdue...
Boss.exe is not responding...
Type "help" for available commands.`;

      case "chocolate":
        return `✗ SUGAR CRASH: Command "${command}" not found
Candy coating has melted...
Sweetness levels dangerously low...
Diabetes.exe requires calibration...
Type "help" for available commands.`;

      default:
        return `✗ SEGMENTATION FAULT: Command "${command}" not found
Core dumped. Memory corrupted.
Type "help" for available commands.`;
    }
  };

  const addToHistory = (
    command: string,
    output: string,
    isError: boolean = false,
  ) => {
    setHistory((prev) => [
      ...prev,
      { command, output, timestamp: new Date(), isError },
    ]);
  };

  const processCommand = (
    cmd: string,
  ): { output: string; isError: boolean } => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(" ");
    const command = parts[0];
    const args = parts.slice(1);

    switch (command) {
      case "help":
      case "?":
      case "commands": {
        const helpMessages = [
          "*perking up ears helpfully* 📚",
          "*sitting attentively* 🤓",
          "*offering guidance* 🧭",
          "*ready to assist* 💡",
          "*displaying wisdom* 🦉",
          "*being your guide* ⭐"
        ];
        const randomHelpMessage = helpMessages[Math.floor(Math.random() * helpMessages.length)];
        setCatMessage(randomHelpMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output: `
┌───────────── CatOS TERMINAL COMMANDS ───────────────┐
│                                                     │
│  CAT CONTROL:                                       │
│  • theme <name>     - Change theme                  │
│  • animation        - Toggle animation on/off       │
│  • show             - Show/hide cat display         │
│                                                     │
│  INFORMATION:                                       │
│  • bio              - My biography                  │
│  • about            - About this terminal           │
│  • contact          - Contact information           │
│  • projects         - View my projects              │
│                                                     │
│  SYSTEM:                                            │
│  • status           - Show current system status    │
│  • themes           - List all available themes     │
│  • clear            - Clear terminal                │
│  • cat              - Show ASCII cat                │
│  • help             - Show this help message        │
│                                                     │
│  TIP: Try exploring... there might be hidden        │
│       commands waiting to be discovered!            │
└─────────────────────────────────────────────────────┘`,
          isError: false,
        };
      }

      case "bio":
      case "biography":
      case "aboutme":
      case "about-me":
      case "info": {
        const bioMessages = [
          "*proudly presenting human* 👨‍💻",
          "*nodding approvingly* 😺",
          "*showing off my human* ✨",
          "*being supportive* 💪",
          "*feeling proud* 😌",
          "*tail swishing with pride* 🐾"
        ];
        const randomBioMessage = bioMessages[Math.floor(Math.random() * bioMessages.length)];
        setCatMessage(randomBioMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output: `╭──────────── DEVELOPER BIOGRAPHY ─────────────╮
│                                              │
│  Hi, I'm Gerhardus van Biljon                │
│  Robotics Engineering Student at Eduvos      │
│  Passionate About Innovation and Automation  │
│                                              │
│  Background:                                 │
│  • Robotics @ Eduvos University              │
│                                              │
│  Specialties:                                │
│  • Python                                    │
│  • Machine Learning & AI                     │
│  • C++                                       │
|  • React & TypeScript                        │
│                                              │
│  Fun Fact:                                   │
│  I have 1 cat who inspired                   │
│  this terminal's design!                     │
│                                              │
╰──────────────────────────────────────────────╯`,
          isError: false,
        };
      }

      case "theme":
        if (args.length === 0) {
          return {
            output: `Current theme: ${currentTheme}\nAvailable themes: ${availableThemes.join(", ")}\nUsage: theme <name>`,
            isError: false,
          };
        }
        const theme = args[0];
        if (availableThemes.includes(theme)) {
          const themeMessages = [
            "*adjusting to new colors* 🎨",
            "*admiring the new look* ✨",
            "*blending with theme* 🦎",
            "*color coordination mode* 🌈",
            "*style adaptation complete* 💅",
            "*fashion sense activated* 👗"
          ];
          const randomThemeMessage = themeMessages[Math.floor(Math.random() * themeMessages.length)];
          setCatMessage(randomThemeMessage);
          setTimeout(() => {
            setCatMessage(
              isAnimating ? "" : "sitting • ears still",
            );
          }, 3000);
          onThemeChange(theme);
          return {
            output: `✓ Theme changed to: ${theme}\nColors updated successfully.\nEar movement animations active.`,
            isError: false,
          };
        } else {
          return {
            output: getThemeSpecificError("theme", theme),
            isError: true,
          };
        }

      case "animation": {
        const animationMessages = isAnimating ? [
          "*freezing in place* ⏸️",
          "*becoming statue-like* 🗿",
          "*going into sleep mode* 😴",
          "*pausing ear wiggles* 🛑",
          "*entering zen mode* 🧘",
          "*conserving energy* 🔋"
        ] : [
          "*ears perking up* ⚡",
          "*coming to life* ✨",
          "*starting ear dance* 💃",
          "*animation mode on* 🎬",
          "*wiggle sequence initiated* 🎯",
          "*full activity mode* 🚀"
        ];
        const randomAnimationMessage = animationMessages[Math.floor(Math.random() * animationMessages.length)];
        setCatMessage(randomAnimationMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "sitting • ears still" : "",
          );
        }, 3000);
        onAnimationToggle();
        return {
          output: `✓ Animation ${isAnimating ? "paused" : "started"}\nEar movements: ${isAnimating ? "stopped" : "active"}\nFrame rate: ${isAnimating ? "0 fps" : "2 fps"}`,
          isError: false,
        };
      }

      case "show": {
        const showMessages = showCat ? [
          "*fading into shadows* 👻",
          "*becoming invisible* 🫥",
          "*ninja vanish mode* 🥷",
          "*hide and seek champion* 🙈",
          "*stealth mode activated* 🤫",
          "*going incognito* 🕶️"
        ] : [
          "*materializing from void* ✨",
          "*dramatic entrance* 🎭",
          "*ta-da!* 🎪",
          "*reappearing majestically* 👑",
          "*back from the shadows* 🌟",
          "*surprise! here I am* 🎉"
        ];
        const randomShowMessage = showMessages[Math.floor(Math.random() * showMessages.length)];
        setCatMessage(randomShowMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        setShowCat((prev) => !prev);
        return {
          output: `✓ Cat display ${showCat ? "hidden" : "shown"}\nEar animations ${showCat ? "paused" : "resumed"}\nGraphics buffer ${showCat ? "cleared" : "loaded"}.`,
          isError: false,
        };
      }

      case "about": {
        const aboutMessages = [
          "*presenting my home* 🏠",
          "*showing off the system* 💻",
          "*digital tour guide mode* 🗺️",
          "*proud of our creation* 😎",
          "*system spokesperson* 🎤",
          "*tech specs enthusiast* 🤓"
        ];
        const randomAboutMessage = aboutMessages[Math.floor(Math.random() * aboutMessages.length)];
        setCatMessage(randomAboutMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output: `╭───── ABOUT CATOS TERMINAL ─────╮
│                                │
│  CatOS Terminal v1.0.2         │
│  Interactive Pixel Art Cat     │
│                                │
│  Features:                     │
│  • Animated 64x64 pixel cat    │
│  • 6 unique color themes       │
│  • Ear movement animations     │
│  • Tail swishing animation     │
│  • Terminal-based interface    │
│  • Theme-based error msgs      │
│  • Dynamic color updates       │
│  • Hidden easter eggs          │
│                                │
│  Built with React + TypeScript │
│  Styled with Tailwind CSS      │
│  Glitch effects included       │
│                                │
╰────────────────────────────────╯`,
          isError: false,
        };
      }

      case "contact":
      case "contactme":
      case "email":
      case "github":
      case "resume": {
        const contactMessages = [
          "*networking mode engaged* 📡",
          "*connecting people together* 🤝",
          "*social butterfly activated* 🦋",
          "*opening communication channels* 📞",
          "*ready to make friends* 😊",
          "*ambassador cat mode* 🎩"
        ];
        const randomContactMessage = contactMessages[Math.floor(Math.random() * contactMessages.length)];
        setCatMessage(randomContactMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output: `╭───────────────── CONTACT INFORMATION ───────────────╮
│                                                     │
│  • Email: vanbiljongerhardus@gmail.com              │
│  • GitHub: https://github.com/Gerhardus-van-Biljon  │
│  • Website: gerhardvanbiljon.com                    │
│                                                     │
│  Feel free to reach out                             │
│  about pixel art, coding,                           │
│  collaboration, or just to                          │
│  say hello!                                         │
│                                                     │
╰─────────────────────────────────────────────────────╯`,
          isError: false,
        };
      }

      case "projects":
      case "projects-list":
      case "my-projects":
      case "project": {
        const projectMessages = [
          "*showcasing achievements* 🏆",
          "*portfolio presentation mode* 📂",
          "*displaying our work* 💼",
          "*proud project manager* 📋",
          "*innovation showcase* 💡",
          "*creative genius at work* 🎨"
        ];
        const randomProjectMessage = projectMessages[Math.floor(Math.random() * projectMessages.length)];
        setCatMessage(randomProjectMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output: `╭──────── MY PROJECTS ────────╮
│    CatOS Terminal           │
│    Interactive CLI          │
│    Status: You're using it! │
│                             │
╰─────────────────────────────╯`,
          isError: false,
        };
      }

      case "status": {
        const statusMessages = [
          "*running system diagnostics* 🔍",
          "*checking all systems* ⚙️",
          "*monitoring cat metrics* 📊",
          "*system administrator mode* 👨‍💼",
          "*health check complete* ✅",
          "*status report ready* 📋"
        ];
        const randomStatusMessage = statusMessages[Math.floor(Math.random() * statusMessages.length)];
        setCatMessage(randomStatusMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output: `╭─── SYSTEM STATUS ───╮
│ Theme: ${currentTheme.padEnd(12)} │
│ Pose: ${currentPose.padEnd(13)} │
│ Animation: ${(isAnimating ? "running" : "paused").padEnd(8)} │
│ Display: ${(showCat ? "visible" : "hidden").padEnd(9)} │
│ Frame: ${String(currentPoseIndex + 1).padEnd(11)} │
│ Ears: ${(isAnimating ? "moving" : "still").padEnd(12)} │
│ Memory: 42.0 MB      │
│ CPU: 13.37%          │
╰─────────────────────╯`,
          isError: false,
        };
      }

      case "clear": {
        const clearMessages = [
          "*wiping the slate clean* 🧽",
          "*fresh start mode* ✨",
          "*cleaning house* 🏠",
          "*organizing thoughts* 🧹",
          "*reset and refresh* 🔄",
          "*minimalist mode activated* 📝"
        ];
        const randomClearMessage = clearMessages[Math.floor(Math.random() * clearMessages.length)];
        setCatMessage(randomClearMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        setHistory([]);
        return { output: "", isError: false };
      }

      case "cat": {
        const asciiCatMessages = [
          "*showing ASCII sibling* 👯",
          "*meeting my text cousin* 📝",
          "*family reunion time* 👨‍👩‍👧‍👦",
          "*pixel meets text* 🤝",
          "*two cats are better than one* 😺",
          "*ASCII art appreciation* 🎨"
        ];
        const randomAsciiMessage = asciiCatMessages[Math.floor(Math.random() * asciiCatMessages.length)];
        setCatMessage(randomAsciiMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output: `    /\\_/\\  
   ( o.o ) 
    > ^ <  
  CatOS v1.0.2`,
          isError: false,
        };
      }

      case "themes": {
        const themesMessages = [
          "*fashion consultant mode* 👗",
          "*color palette expert* 🎨",
          "*style advisor active* 💅",
          "*rainbow catalog display* 🌈",
          "*aesthetic options ready* ✨",
          "*mood selector engaged* 🎭"
        ];
        const randomThemesMessage = themesMessages[Math.floor(Math.random() * themesMessages.length)];
        setCatMessage(randomThemesMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output: `Available themes: ${availableThemes.join(", ")}`,
          isError: false,
        };
      }

      // Hidden easter egg commands
      case "meow": {
        const meowMessages = [
          "*meows loudly* 🐱",
          "*soft meow* 😺",
          "*demanding meow* 😾",
          "*happy chirp* 😸",
          "*questioning mew?* 🤔",
          "*excited trill* ✨"
        ];
        const randomMeowMessage = meowMessages[Math.floor(Math.random() * meowMessages.length)];
        setCatMessage(randomMeowMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output: 'The cat says: "Meow!" 🐱',
          isError: false,
        };
      }

      case "purr":
      case "purring":
      case "purrs":
      case "pur": {
        const purrMessages = [
          "*purring contentedly* 😸",
          "*deep rumbling purr* 🥰",
          "*gentle purring* 😌",
          "*motor boat purring* 🚤",
          "*sleepy purrs* 😴",
          "*vibrating with joy* ✨"
        ];
        const randomPurrMessage = purrMessages[Math.floor(Math.random() * purrMessages.length)];
        setCatMessage(randomPurrMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output: 'The cat purrs contentedly: "Purrrr..." 😸',
          isError: false,
        };
      }

      case "pet":
      case "petcat":
      case "pat": {
        const petMessages = [
          "*enjoying head pets* 🥰",
          "*leaning into pets* 😻",
          "*closing eyes blissfully* 😌",
          "*headbutting affectionately* 💕",
          "*kneading with paws* 🐾",
          "*rolling over for belly rubs* 🙃"
        ];
        const randomPetMessage = petMessages[Math.floor(Math.random() * petMessages.length)];
        setCatMessage(randomPetMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output:
            "You pet the cat. It purrs and nuzzles your hand! 🥰",
          isError: false,
        };
      }

      case "boop": {
        const boopMessages = [
          "*nose has been booped* 👃",
          "*blinks in surprise* 😲",
          "*wrinkles nose cutely* 🥺",
          "*cross-eyed from boop* 🤪",
          "*wiggles whiskers* 😸",
          "*sneezes adorably* 🤧"
        ];
        const randomBoopMessage = boopMessages[Math.floor(Math.random() * boopMessages.length)];
        setCatMessage(randomBoopMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output:
            "You boop the cat's nose! It blinks slowly in response. 😊",
          isError: false,
        };
      }

      case "treat": {
        const treatMessages = [
          "*waiting for treats* 🍖",
          "*eyes lighting up* ✨",
          "*sitting extra pretty* 😇",
          "*doing tiny jumps* 🦘",
          "*pawing at your pocket* 🐾",
          "*giving puppy dog eyes* 🥺"
        ];
        const randomTreatMessage = treatMessages[Math.floor(Math.random() * treatMessages.length)];
        setCatMessage(randomTreatMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output:
            'The cat perks up hopefully! "Mrow?" (Do you have treats?) 🐾',
          isError: false,
        };
      }

      case "echo":
        return { output: args.join(" "), isError: false };

      case "date": {
        const dateMessages = [
          "*checking the cosmic calendar* 📅",
          "*time keeper mode active* ⏰",
          "*chronometer cat engaged* ⌚",
          "*temporal awareness enabled* 🕰️",
          "*calendar consultant ready* 📆",
          "*time wizard activated* 🧙‍♀️"
        ];
        const randomDateMessage = dateMessages[Math.floor(Math.random() * dateMessages.length)];
        setCatMessage(randomDateMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output: new Date().toLocaleString(),
          isError: false,
        };
      }

      case "whoami": {
        const whoamiMessages = [
          "*identity verification mode* 🆔",
          "*philosophical cat questioning* 🤔",
          "*user authentication active* 👤",
          "*self-awareness protocol* 🧠",
          "*existential query processor* 💭",
          "*digital identity confirmed* ✅"
        ];
        const randomWhoamiMessage = whoamiMessages[Math.floor(Math.random() * whoamiMessages.length)];
        setCatMessage(randomWhoamiMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return { output: "cat-user@catos", isError: false };
      }

      case "pwd": {
        const pwdMessages = [
          "*showing current location* 📍",
          "*GPS cat navigator* 🧭",
          "*directory detective mode* 🕵️",
          "*path finder activated* 🗺️",
          "*location services enabled* 📡",
          "*digital compass engaged* 🧲"
        ];
        const randomPwdMessage = pwdMessages[Math.floor(Math.random() * pwdMessages.length)];
        setCatMessage(randomPwdMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output: "/home/cat-user/pixel-cat",
          isError: false,
        };
      }

      case "ls": {
        const lsMessages = [
          "*inventory check complete* 📦",
          "*file system explorer* 📂",
          "*digital librarian mode* 📚",
          "*catalog coordinator* 📋",
          "*storage inspector active* 🔍",
          "*archive analyst engaged* 🗃️"
        ];
        const randomLsMessage = lsMessages[Math.floor(Math.random() * lsMessages.length)];
        setCatMessage(randomLsMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output:
            "cat.exe  themes/  animations/   bio.txt  about.md  contact.txt  projects/",
          isError: false,
        };
      }

      case "exit": {
        const exitMessages = [
          "*blocks the exit* 😼",
          "*guard duty activated* 🛡️",
          "*no escape from cat zone* 🚫",
          "*gatekeeper mode engaged* 🗝️",
          "*detention officer on duty* 👮",
          "*eternal companion activated* ♾️"
        ];
        const randomExitMessage = exitMessages[Math.floor(Math.random() * exitMessages.length)];
        setCatMessage(randomExitMessage);
        setTimeout(() => {
          setCatMessage(
            isAnimating ? "" : "sitting • ears still",
          );
        }, 3000);
        return {
          output: "Nice try, but you can't escape the cat! 😼",
          isError: false,
        };
      }

      case "":
        return { output: "", isError: false };

      default:
        return {
          output: getGenericError(command),
          isError: true,
        };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const result = processCommand(input);
    addToHistory(input, result.output, result.isError);

    if (result.isError) {
      onGlitch();
    }

    setCommandHistory((prev) => [...prev, input]);
    setInput("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = [
        "help",
        "bio",
        "theme",
        "animation",
        "status",
        "clear",
        "cat",
        "themes",
        "show",
        "about",
        "contact",
        "projects",
      ];
      const matches = commands.filter((cmd) =>
        cmd.startsWith(input.toLowerCase()),
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  // Function to render output with dynamically calculated theme-specific error colors
  const renderOutput = (output: string, isError: boolean) => {
    if (!isError) {
      return (
        <span
          style={{ color: "var(--output-color)", opacity: 0.9 }}
        >
          {output}
        </span>
      );
    }

    // Dynamically get the current theme's error color
    const errorColor = getThemeErrorColor();

    return (
      <span
        style={{
          color: errorColor,
          textShadow: `0 0 5px ${errorColor}`,
          opacity: 1,
        }}
      >
        {output}
      </span>
    );
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "var(--bg)",
        border: `2px solid var(--fg)`,
        boxSizing: "border-box",
        fontFamily:
          "'Courier New', Monaco, Consolas, 'Liberation Mono', 'Lucida Console', monospace",
        overflow: "hidden", // CRITICAL: Prevent container from growing
        position: "fixed", // CRITICAL: Fix to viewport
        top: 0,
        left: 0,
      }}
    >
      {/* Theme-aware scrollbar styles */}
      <style>{`
        /* Webkit scrollbar styles */
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: var(--bg);
          border-radius: 6px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: var(--fg);
          border-radius: 6px;
          opacity: 0.7;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: var(--fg);
          opacity: 1;
        }
        
        /* Firefox scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: var(--fg) var(--bg);
        }
      `}</style>

      {/* Main Terminal Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100%", // CRITICAL: Constrain height
          overflow: "hidden", // CRITICAL: Prevent growing
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: `2px solid var(--fg)`,
            flexShrink: 0, // CRITICAL: Prevent shrinking
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <TerminalIcon
              size={20}
              style={{ color: "var(--fg)" }}
            />
            <span
              style={{ color: "var(--fg)", fontSize: "14px" }}
            >
              CatOS Terminal
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <button
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#fbbf24",
                border: "none",
                cursor: "pointer",
              }}
            ></button>
            <button
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
                border: "none",
                cursor: "pointer",
              }}
            ></button>
            <button
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                border: "none",
                cursor: "pointer",
              }}
            ></button>
          </div>
        </div>

        {/* Terminal Content - FIXED SCROLLING AREA */}
        <div
          ref={terminalRef}
          style={{
            flex: 1, // CRITICAL: Take remaining space
            padding: "16px",
            overflowY: "auto", // CRITICAL: Enable scrolling
            fontSize: "14px",
            color: "var(--fg)",
            fontFamily:
              "'Courier New', Monaco, Consolas, 'Liberation Mono', 'Lucida Console', monospace",
            minHeight: 0, // CRITICAL: Allow flex to shrink below content
            maxHeight: "100%", // CRITICAL: Prevent growing beyond container
          }}
        >
          {history.map((entry, index) => (
            <div key={index} style={{ marginBottom: "12px" }}>
              {entry.command !== "boot" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      color: "var(--prompt-color)",
                      opacity: 0.7,
                    }}
                  >
                    cat-user@catos:~$
                  </span>
                  <span style={{ color: "var(--input-color)" }}>
                    {entry.command}
                  </span>
                </div>
              )}
              {entry.output && (
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    marginLeft: "8px",
                    marginBottom: "8px",
                    fontFamily:
                      "'Courier New', Monaco, Consolas, 'Liberation Mono', 'Lucida Console', monospace",
                  }}
                >
                  {renderOutput(
                    entry.output,
                    entry.isError || false,
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Terminal Input - FIXED AT BOTTOM */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: `2px solid var(--fg)`,
            flexShrink: 0, // CRITICAL: Prevent shrinking
            backgroundColor: "var(--bg)", // Ensure background consistency
            position: "relative", // Ensure it stays in flow
            zIndex: 10, // Ensure it stays above content
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  color: "var(--prompt-color)",
                  opacity: 0.7,
                  flexShrink: 0,
                }}
              >
                cat-user@catos:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  flex: 1,
                  outline: "none",
                  border: "none",
                  backgroundColor: "transparent",
                  color: "var(--input-color)",
                  fontFamily:
                    "'Courier New', Monaco, Consolas, 'Liberation Mono', 'Lucida Console', monospace",
                  fontSize: "14px",
                }}
                placeholder="Enter command..."
                autoComplete="off"
                autoFocus
              />
            </div>
          </form>
        </div>
      </div>

      {/* Fixed Cat Panel on the Right */}
      <div
        style={{
          width: "280px",
          borderLeft: `2px solid var(--fg)`,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0, // CRITICAL: Prevent shrinking
          height: "100%", // CRITICAL: Constrain height
          overflow: "hidden", // CRITICAL: Prevent growing
        }}
      >
        {/* Cat Panel Header */}
        <div
          style={{
            padding: "12px",
            borderBottom: `2px solid var(--fg)`,
            textAlign: "center",
            fontSize: "14px",
            flexShrink: 0, // CRITICAL: Prevent shrinking
            color: "var(--fg)",
          }}
        >
          System Monitor
        </div>

        {/* Cat Display - SCROLLABLE IF NEEDED */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "16px",
            overflowY: "auto", // CRITICAL: Enable scrolling in cat panel
            minHeight: 0, // CRITICAL: Allow flex to work properly
          }}
        >
          {renderCat()}

          {/* System Info */}
          <div
            style={{
              padding: "0 12px",
              fontSize: "12px",
              color: "var(--fg)",
              opacity: 0.7,
              width: "100%",
            }}
          >
            <div
              style={{
                borderTop: `1px solid var(--fg)`,
                paddingTop: "8px",
                marginBottom: "8px",
                opacity: 0.3,
              }}
            >
              <div>Theme: {currentTheme}</div>
              <div>Pose: {currentPose}</div>
              <div>
                Status: {isAnimating ? "Active" : "Idle"}
              </div>
            </div>

            <div
              style={{
                borderTop: `1px solid var(--fg)`,
                paddingTop: "8px",
                marginBottom: "8px",
                opacity: 0.3,
              }}
            >
              <div>Memory: 42.0 MB</div>
              <div>CPU: 13.37%</div>
              <div>Uptime: 01:23:45</div>
            </div>

            <div
              style={{
                borderTop: `1px solid var(--fg)`,
                paddingTop: "8px",
                opacity: 0.3,
                textAlign: "center",
              }}
            >
              <div>🐱 CatOS v1.0.2</div>
              <div style={{ fontSize: "10px", opacity: 0.5 }}>
                Ears always listening
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;