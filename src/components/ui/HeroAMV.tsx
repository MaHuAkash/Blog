// components/ui/HeroAMV.tsx
'use client';
import { useRef, useEffect } from 'react';
import { useAudio } from '@/context/audio-context';
import { ColourfulText } from './colourful-text';

interface AMVHeroProps {
  video: {
    src: string;
    title: string;
    anime: string;
    editor: string;
  };
  colors: {
    gradient: string;
    textAccent: string;
    textPrimary: string;
    textSecondary: string;
  };
  onVideoEnd: () => void;
  initialDelay: boolean;
}

export default function HeroAMV({ video, colors, onVideoEnd, initialDelay }: AMVHeroProps) {
  const { hasUserInteracted, setHasUserInteracted, isMuted, setIsMuted } = useAudio();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const playVideo = () => {
      if (!hasUserInteracted) {
        videoElement.muted = true;
        setIsMuted(true);
      } else {
        videoElement.muted = isMuted;
      }
      videoElement.play().catch(console.error);
    };

    if (initialDelay) {
      const timer = setTimeout(playVideo, 6000);
      return () => clearTimeout(timer);
    } else {
      playVideo();
    }
  }, [video.src, initialDelay, hasUserInteracted, isMuted, setIsMuted]);

  const handleFirstInteraction = () => {
    if (!hasUserInteracted && videoRef.current) {
      setHasUserInteracted(true);
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', onVideoEnd);
      return () => videoElement.removeEventListener('ended', onVideoEnd);
    }
  }, [onVideoEnd]);

  return (
    <div className="fixed inset-0 w-screen h-screen">
      <div 
        className="relative w-full h-full cursor-pointer"
        onClick={handleFirstInteraction}
      >
        <video
          ref={videoRef}
          className="w-screen h-screen object-cover min-w-full min-h-full"
          playsInline
          loop={false}
          preload="auto"
          muted={isMuted}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%'
          }}
        >
          <source src={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}${video.src}`} type="video/webm" />
        </video>

        {initialDelay ? (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center space-y-4 px-4">
              <div className="w-16 h-16 mx-auto border-4 border-transparent rounded-full 
                bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                animate-spin [mask-composite:exclude] md:w-20 md:h-20"
                style={{
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                }}
              />
              
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-200 md:text-2xl">
                
                <ColourfulText text="wait for it..." />
              </h3>
            </div>
          </div>
        ) : !hasUserInteracted ? (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
            <div className="animate-pulse text-white text-center">
              <div className="w-12 h-12 border-4 border-white/30 rounded-full mb-4 md:w-16 md:h-16" />
              <p className="text-xs md:text-sm">Tap to enable sound</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}