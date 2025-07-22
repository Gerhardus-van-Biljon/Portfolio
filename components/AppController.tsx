
/* ========== imports and context setup ========== */
import React, { createContext, useContext, useState, useEffect } from 'react';
import themes from '../themes';

/* ========== context type definition ========== */
interface AppControllerContextType {
  // Theme control
  currentTheme: string;
  setTheme: (theme: string) => void;

  // Pose control
  currentPose: 'sitting';
  setPose: (pose: 'sitting') => void;

  // Animation control
  isAnimating: boolean;
  setIsAnimating: (animating: boolean) => void;
  toggleAnimation: () => void;

  // Glitch effect
  isGlitching: boolean;
  triggerGlitch: () => void;
}

/* ========== context creation ========== */
const AppControllerContext = createContext<AppControllerContextType | undefined>(undefined);

/* ========== custom hook for consuming context ========== */
export const useAppController = () => {
  const context = useContext(AppControllerContext);
  if (!context) {
    throw new Error('useAppController must be used within an AppControllerProvider');
  }
  return context;
};

/* ========== provider component ========== */
export const AppControllerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /* ========== state declarations ========== */
  const [currentTheme, setCurrentTheme] = useState('normal');
  const [currentPose, setCurrentPose] = useState<'sitting'>('sitting');
  const [isAnimating, setIsAnimating] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);

  const themeNames = Object.keys(themes) as Array<keyof typeof themes>;

  /* ========== load saved theme from localStorage ========== */
  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme && themeNames.includes(savedTheme as keyof typeof themes)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  /* ========== apply theme to CSS variables ========== */
  useEffect(() => {
    const root = document.documentElement;
    const theme = themes[currentTheme as keyof typeof themes];

    if (theme) {
      root.style.setProperty('--bg', theme.bg);
      root.style.setProperty('--fg', theme.fg);
      root.style.setProperty('--cat-outline', theme.catOutline);
      root.style.setProperty('--cat-belly', theme.catBelly);
      root.style.setProperty('--cat-fur1', theme.catFur1);
      root.style.setProperty('--cat-fur2', theme.catFur2);
      root.style.setProperty('--cat-ear', theme.catEar);

      localStorage.setItem('selectedTheme', currentTheme);
    }
  }, [currentTheme]);

  /* ========== update theme if valid ========== */
  const setTheme = (theme: string) => {
    if (themeNames.includes(theme as keyof typeof themes)) {
      setCurrentTheme(theme);
    }
  };

  /* ========== update pose (currently only 'sitting') ========== */
  const setPose = (pose: 'sitting') => {
    setCurrentPose(pose);
  };

  /* ========== toggle animation state ========== */
  const toggleAnimation = () => {
    setIsAnimating(prev => !prev);
  };

  /* ========== trigger glitch effect briefly ========== */
  const triggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
    }, 800);
  };

  /* ========== context value object ========== */
  const value: AppControllerContextType = {
    currentTheme,
    setTheme,
    currentPose,
    setPose,
    isAnimating,
    setIsAnimating,
    toggleAnimation,
    isGlitching,
    triggerGlitch
  };

  /* ========== render provider with context value ========== */
  return (
    <AppControllerContext.Provider value={value}>
      {children}
    </AppControllerContext.Provider>
  );
};
