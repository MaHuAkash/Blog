// app/layout.tsx
'use client';

import { ColorProvider, useColor } from '@/context/color-context';
import { AudioProvider } from '@/context/audio-context';
import { ColorPicker } from '@/components/ui/color-picker';
import { useEffect, useState } from 'react';
import { colorConfig } from '@/config/colors';
import './globals.css';
import { ModernPreloader } from '@/components/ui/Preloader';
import { FloatingNav } from '@/components/ui/floatingNav';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
  { name: 'About', link: '/', icon: <span>👤</span> },     
  { name: 'Blog', link: '/blog', icon: <span>📝</span> },
  { name: 'Amv', link: '/amv', icon: <span>☯</span> },  

];

function BodyWrapper({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useColor();
  
  useEffect(() => {
    const gradientClass = colorConfig[colorScheme].gradient;
    document.body.className = `min-h-screen bg-gradient-to-b ${gradientClass}`;
  }, [colorScheme]);

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    
    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <html lang="en">
      <body className="transition-colors duration-300">
        <AudioProvider>
          <ColorProvider>
            <AnimatePresence mode='wait'>
              {loading ? (
                <ModernPreloader />
              ) : (
                <BodyWrapper>
                  <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <FloatingNav navItems={navItems} />
                    {children}
                    <ColorPicker />
                  </motion.main>
                </BodyWrapper>
              )}
            </AnimatePresence>
          </ColorProvider>
        </AudioProvider>
      </body>
    </html>
  );
}