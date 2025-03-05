// app/layout.tsx
'use client';

import { ColorProvider, useColor } from '@/context/color-context';
import { ColorPicker } from '@/components/color-picker';
import { useEffect, useState } from 'react';
import { colorConfig } from '@/config/colors';
import './globals.css';
import { ModernPreloader } from '@/components/Preloader';

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
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className="transition-colors duration-300">
        {loading && <ModernPreloader />}
        <ColorProvider>
          <BodyWrapper>
            <main className="relative">
              {children}
              <ColorPicker />
            </main>
          </BodyWrapper>
        </ColorProvider>
      </body>
    </html>
  );
}