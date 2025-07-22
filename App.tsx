import React, { useEffect } from 'react';
import Terminal from './components/Terminal';
import { AppControllerProvider, useAppController } from './components/AppController';
import themes from './themes';

const AppContent: React.FC = () => {
  const { 
    currentTheme, 
    setTheme, 
    currentPose, 
    setPose, 
    isAnimating, 
    toggleAnimation, 
    isGlitching, 
    triggerGlitch 
  } = useAppController();

  // Apply theme CSS custom properties to root
  useEffect(() => {
    const theme = themes[currentTheme as keyof typeof themes];
    if (theme) {
      const root = document.documentElement;
      root.style.setProperty('--bg', theme.bg);
      root.style.setProperty('--fg', theme.fg);
      root.style.setProperty('--input-color', theme.inputColor);
      root.style.setProperty('--output-color', theme.outputColor);
      root.style.setProperty('--prompt-color', theme.promptColor);
      root.style.setProperty('--cat-outline', theme.catOutline);
      root.style.setProperty('--cat-belly', theme.catBelly);
      root.style.setProperty('--cat-fur1', theme.catFur1);
      root.style.setProperty('--cat-fur2', theme.catFur2);
      root.style.setProperty('--cat-ear', theme.catEar);
    }
  }, [currentTheme]);

  return (
    <div 
      className={`h-screen w-screen overflow-hidden ${isGlitching ? 'glitch-effect' : ''}`}
      style={{ 
        backgroundColor: 'var(--bg)', 
        color: 'var(--fg)',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      }}
    >
      <style>{`
        .glitch-effect {
          animation: glitch 0.8s ease-in-out;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
          10% {
            transform: translate(-2px, 2px);
            filter: hue-rotate(90deg);
          }
          20% {
            transform: translate(-4px, 0px);
            filter: hue-rotate(180deg);
          }
          30% {
            transform: translate(4px, 2px);
            filter: hue-rotate(270deg);
          }
          40% {
            transform: translate(-2px, -2px);
            filter: hue-rotate(360deg) contrast(200%);
          }
          50% {
            transform: translate(2px, -2px);
            filter: hue-rotate(180deg) saturate(200%);
          }
          60% {
            transform: translate(-4px, 2px);
            filter: hue-rotate(90deg) brightness(200%);
          }
          70% {
            transform: translate(4px, 0px);
            filter: hue-rotate(270deg) invert(1);
          }
          80% {
            transform: translate(-2px, -2px);
            filter: hue-rotate(0deg) contrast(300%);
          }
          90% {
            transform: translate(2px, 2px);
            filter: hue-rotate(45deg);
          }
          100% {
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
        }

        .glitch-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(255, 0, 0, 0.1) 2px,
            rgba(255, 0, 0, 0.1) 4px,
            transparent 4px,
            transparent 6px,
            rgba(0, 255, 0, 0.1) 6px,
            rgba(0, 255, 0, 0.1) 8px
          );
          animation: scanlines 0.1s linear infinite;
          pointer-events: none;
          z-index: 1000;
        }

        @keyframes scanlines {
          0% { transform: translateX(0); }
          100% { transform: translateX(10px); }
        }

        .glitch-effect * {
          position: relative;
          z-index: 1001;
        }
      `}</style>

      <Terminal
        onThemeChange={setTheme}
        onPoseChange={setPose}
        onAnimationToggle={toggleAnimation}
        onGlitch={triggerGlitch}
        currentTheme={currentTheme}
        currentPose={currentPose}
        isAnimating={isAnimating}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppControllerProvider>
      <AppContent />
    </AppControllerProvider>
  );
}