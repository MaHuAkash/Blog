// components/ModernPreloader.tsx
'use client';

import { useEffect, useState } from 'react';

export function ModernPreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure this only runs on the client
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-purple-500 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}