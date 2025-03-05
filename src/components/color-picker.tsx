// components/ColorPicker.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useColor } from '@/context/color-context';
import { ColorScheme, colorConfig } from '@/config/colors';
import { useState } from 'react';

export function ColorPicker() {
  const { colorScheme, setColorScheme } = useColor();
  const colors = Object.keys(colorConfig) as ColorScheme[];
  const [isOpen, setIsOpen] = useState(false); // State to manage open/close

  return (
    <>
      {/* Toggle Button with Palette Icon */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 h-12 w-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/10 cursor-pointer z-50"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Palette Icon (🎨) */}
          <span className="text-2xl">🎨</span>
        </motion.div>
      </motion.button>

      {/* Centered Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)} // Close modal on outside click
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-md rounded-2xl shadow-2xl border border-white/10 backdrop-blur-lg p-6 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing on inside click
            >
              {/* Dynamic Background with Transparency */}
              <div
                className="absolute inset-0 z-0 opacity-50"
                style={{
                  background: `linear-gradient(to bottom right, ${colorConfig[colorScheme].gradient})`,
                }}
              ></div>

              {/* Modal Content */}
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white mb-6 text-center">
                  Choose Your Theme
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {colors.map((color, index) => (
                    <motion.button
                      key={color}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 30 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setColorScheme(color);
                        setIsOpen(false); // Close the modal after selection
                      }}
                      className={`h-20 rounded-xl flex items-center justify-center text-white font-semibold transition-all ${
                        colorScheme === color ? 'ring-4 ring-white animate-pulse' : 'ring-2 ring-transparent'
                      } ${colorToClass[color]}`}
                    >
                      <span className="text-xs">{color}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const colorToClass: Record<ColorScheme, string> = {
  midnightPurple: 'bg-gradient-to-br from-purple-600 to-purple-800',
  emeraldGreen: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
  crimsonRed: 'bg-gradient-to-br from-red-600 to-red-800',
  sapphireBlue: 'bg-gradient-to-br from-blue-600 to-blue-800',
  aquaCyan: 'bg-gradient-to-br from-cyan-600 to-cyan-800',
};