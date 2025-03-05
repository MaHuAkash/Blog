// app/loading.tsx
'use client';

import { useColor } from '@/context/color-context';
import { colorConfig } from '@/config/colors';

export default function Loading() {
  const { colorScheme } = useColor();
  const colors = colorConfig[colorScheme];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b ${colors.gradient}`}>
      <div className={`animate-pulse text-4xl font-bold ${colors.textGradient}`}>
      <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${colors.accent}`} />
        DevChronicles
      </div>
    </div>
  );
}