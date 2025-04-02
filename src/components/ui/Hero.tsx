// components/ui/Hero.tsx
'use client';
import HeroAMV from './HeroAMV';
import { useState, useEffect } from 'react';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import { useAudio } from '@/context/audio-context';

interface HeroProps {
  videos: {
    src: string;
    title: string;
    anime: string;
    editor: string;
  }[];
  colors: {
    gradient: string;
    textAccent: string;
    textPrimary: string;
    textSecondary: string;
  };
}

export default function Hero({ videos, colors }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [initialDelayComplete, setInitialDelayComplete] = useState(false);
  const { isMuted, setIsMuted } = useAudio();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialDelayComplete(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    setActiveIndex(prev => (prev + 1 >= videos.length ? 0 : prev + 1));
  };

  return (
    <section className="fixed inset-0 w-screen h-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <HeroAMV
          key={activeIndex}
          video={videos[activeIndex]}
          colors={colors}
          onVideoEnd={handleVideoEnd}
          initialDelay={!initialDelayComplete && activeIndex === 0}
        />
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="bg-black/40 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-black/50 transition-colors"
        >
          {isMuted ? (
            <SpeakerXMarkIcon className="w-6 h-6 text-white" />
          ) : (
            <SpeakerWaveIcon className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </section>
  );
}