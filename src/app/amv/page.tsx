'use client';
import { useColor } from '@/context/color-context';
import { colorConfig } from '@/config/colors';
import Hero from '@/components/ui/Hero';

export default function Amv() {
  const { colorScheme } = useColor();
  const colors = colorConfig[colorScheme];

  const amvShowcase = [
    {
      src: '/wp-content/uploads/2025/03/lamar.webm',
      title: 'Shinobi Dreams',
      anime: 'Naruto: Legacy',
      editor: 'AMV Sensei',
    },
    {
      src: '/wp-content/uploads/2025/03/spiderman.webm',
      title: 'Web of Destiny',
      anime: 'Spider-Verse Chronicles',
      editor: 'AMV Master',
    },
    
  ];

  return (
    <div className="min-h-screen">
    <main className="fixed inset-0 w-full h-full"> {/* Changed to fixed positioning */}
      <Hero
        videos={amvShowcase}
        colors={{
          gradient: colors.gradient,
          textAccent: colors.textPrimary,
          textPrimary: colors.textPrimary,
          textSecondary: colors.textSecondary,
        }}
      />
    </main>
  </div>
  );
}