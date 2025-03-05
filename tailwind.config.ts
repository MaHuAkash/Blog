// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: { 500: '#a855f7' },
        emerald: { 500: '#10b981' },
        red: { 500: '#ef4444' },
        blue: { 500: '#3b82f6' },
        cyan: { 500: '#06b6d4' }
      }
    },
  },
  plugins: [],
}

export default config