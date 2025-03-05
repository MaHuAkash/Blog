'use client';

import { motion } from 'framer-motion';
import { useColor } from '@/context/color-context';
import { ColorScheme, colorConfig } from '@/config/colors';

export function ColorPicker() {
  const { colorScheme, setColorScheme } = useColor();
  const colors = Object.keys(colorConfig) as ColorScheme[];

  return (
    <div className="fixed bottom-8 right-8 flex gap-3 p-4 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      {colors.map((color) => (
        <motion.button
          key={color}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setColorScheme(color)}
          className={`h-8 w-8 rounded-full cursor-pointer transition-all ${
            colorScheme === color ? 'ring-2 ring-white' : ''
          } ${colorToClass[color]}`}
        />
      ))}
    </div>
  );
}

const colorToClass: Record<ColorScheme, string> = {
  midnightPurple: 'bg-purple-500',
  emeraldGreen: 'bg-emerald-500',
  crimsonRed: 'bg-red-500',
  sapphireBlue: 'bg-blue-500',
  aquaCyan: 'bg-cyan-500',
};