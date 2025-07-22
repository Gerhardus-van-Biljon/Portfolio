/* ========== imports ========== */
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import themes from '../themes';
import { useAppController } from './AppController';

/* ========== component definition ========== */
const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme } = useAppController();
  const themeNames = Object.keys(themes) as Array<keyof typeof themes>;
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  /* ========== sync index with current theme ========== */
  useEffect(() => {
    const index = themeNames.indexOf(currentTheme as keyof typeof themes);
    setCurrentThemeIndex(index >= 0 ? index : 0);
  }, [currentTheme]);

  /* ========== switch to next theme ========== */
  const nextTheme = () => {
    const newIndex = (currentThemeIndex + 1) % themeNames.length;
    setCurrentThemeIndex(newIndex);
    setTheme(themeNames[newIndex]);
  };

  /* ========== switch to previous theme ========== */
  const prevTheme = () => {
    const newIndex = (currentThemeIndex - 1 + themeNames.length) % themeNames.length;
    setCurrentThemeIndex(newIndex);
    setTheme(themeNames[newIndex]);
  };

  const currentThemeData = themes[themeNames[currentThemeIndex]];

  /* ========== render theme selector UI ========== */
  return (
    <div
      className="flex items-center gap-4 p-4 border border-border rounded-lg"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={prevTheme}
        className="flex items-center gap-2"
        style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)', borderColor: 'var(--fg)' }}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-3 min-w-[120px] justify-center">
        <span className="text-2xl">{currentThemeData.emoji}</span>
        <span className="font-medium capitalize">{currentTheme}</span>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={nextTheme}
        className="flex items-center gap-2"
        style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)', borderColor: 'var(--fg)' }}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ThemeSelector;
