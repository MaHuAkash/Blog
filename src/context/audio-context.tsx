// context/audio-context.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type AudioContextType = {
  isMuted: boolean;
  hasUserInteracted: boolean;
  setIsMuted: (muted: boolean) => void;
  setHasUserInteracted: (interacted: boolean) => void;
};

const AudioContext = createContext<AudioContextType>({
  isMuted: true,
  hasUserInteracted: false,
  setIsMuted: () => {},
  setHasUserInteracted: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    const savedMuted = localStorage.getItem('isMuted') === 'true';
    const savedInteraction = localStorage.getItem('hasUserInteracted') === 'true';
    setIsMuted(savedMuted);
    setHasUserInteracted(savedInteraction);
  }, []);

  useEffect(() => {
    localStorage.setItem('isMuted', String(isMuted));
    localStorage.setItem('hasUserInteracted', String(hasUserInteracted));
  }, [isMuted, hasUserInteracted]);

  return (
    <AudioContext.Provider value={{ isMuted, hasUserInteracted, setIsMuted, setHasUserInteracted }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);