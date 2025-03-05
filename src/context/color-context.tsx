'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ColorScheme, colorConfig } from '@/config/colors';

type ColorContextType = {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
};

const ColorContext = createContext<ColorContextType>({
  colorScheme: 'midnightPurple',
  setColorScheme: () => {}
});

// Move validation function outside component
const isValidColorScheme = (scheme: string | null): scheme is ColorScheme => {
  return !!scheme && Object.keys(colorConfig).includes(scheme);
};

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('colorScheme');
      return isValidColorScheme(saved) ? saved : 'midnightPurple';
    }
    return 'midnightPurple';
  });

  useEffect(() => {
    localStorage.setItem('colorScheme', colorScheme);
  }, [colorScheme]);

  return (
    <ColorContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ColorContext.Provider>
  );
}

export const useColor = () => useContext(ColorContext);