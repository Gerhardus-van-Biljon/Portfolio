# CatOS Terminal - Local Development Setup

## Quick Start

1. **Install Node.js** (version 18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Or use a version manager like `nvm`

2. **Clone/Download the project**
   ```bash
   # If you have git
   git clone <your-repo-url>
   cd catos-terminal
   
   # Or download and extract the ZIP file
   ```

3. **Install dependencies**
   ```bash
   npm install

   npm install @radix-ui/react-accordion
   npm install lucide-react
   npm install @radix-ui/react-alert-dialog
   npm install class-variance-authority
   npm install @radix-ui/react-aspect-ratio
   npm install @radix-ui/react-avatar
   npm install @radix-ui/react-slot
   npm install @radix-ui/react-collapsible
   npm install react-day-picker
   npm install cmdk
   npm install embla-carousel-react
   npm install @radix-ui/react-checkbox
   npm install recharts
   npm install @radix-ui/react-context-menu
   npm install vaul
   npm install @radix-ui/react-dropdown-menu
   npm install @radix-ui/react-label
   npm install @radix-ui/react-hover-card
   npm install react-hook-form
   npm install input-otp
   npm install @radix-ui/react-menubar
   npm install @radix-ui/react-navigation-menu
   npm install @radix-ui/react-popover
   npm install @radix-ui/react-progress
   npm install @radix-ui/react-radio-group
   npm install react-resizable-panels
   npm install @radix-ui/react-scroll-area
   npm install @radix-ui/react-select
   npm install @radix-ui/react-separator
   npm install @radix-ui/react-slider
   npm install next-themes
   npm install sonner
   npm install @radix-ui/react-switch
   npm install @radix-ui/react-tabs
   npm install @radix-ui/react-toggle-group
   npm install @radix-ui/react-toggle
   npm install @radix-ui/react-tooltip
   npm install tailwind-merge
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to that URL

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
├── App.tsx              # Main app component
├── main.tsx             # React entry point
├── index.html           # HTML template
├── components/          # React components
│   ├── Terminal.tsx     # Main terminal interface
│   ├── AppController.tsx # State management
│   └── ui/             # UI components
├── styles/
│   └── globals.css     # Global styles & Tailwind
├── catPoses.ts         # Pixel art cat data
├── themes.ts           # Color themes
└── README.md           # Documentation
```

## Troubleshooting

- **Port 3000 already in use?** The dev server will automatically try port 3001, 3002, etc.
- **Installation issues?** Try deleting `node_modules` and running `npm install` again
- **TypeScript errors?** Make sure you're using Node.js 18+ and TypeScript 5+

## Features

- 🐱 Animated pixel art cat with ear movements
- 🌈 6 beautiful color themes (matrix, kimbie, dracula, abyss, normal, chocolate)
- 💻 Full terminal interface with command history
- 🎭 Hidden easter egg commands (try `meow`, `purr`, `pet`, `boop`, `treat`)
- ⚡ Real-time theme switching with glitch effects
- 📱 Responsive design

Enjoy your CatOS Terminal experience! 🐾