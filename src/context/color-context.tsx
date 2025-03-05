// context/color-context.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ColorScheme, colorConfig } from '@/config/colors';

type ColorContextType = {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
};

const defaultColorScheme: ColorScheme = 'midnightPurple'; // Ensure consistent default

const ColorContext = createContext<ColorContextType>({
  colorScheme: defaultColorScheme,
  setColorScheme: () => {},
});

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultColorScheme);

  useEffect(() => {
    // Client-side logic (e.g., load from localStorage)
    const saved = localStorage.getItem('colorScheme');
    if (saved && Object.keys(colorConfig).includes(saved)) {
      setColorScheme(saved as ColorScheme);
    }
  }, []);

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