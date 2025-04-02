// components/ui/HeroAMV.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';

interface WPMedia {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  source_url: string;
  media_details: {
    width: number;
    height: number;
    filesize: number;
    mime_type: string;
  };
  author_name: string;
}

interface HeroAMVProps {
  media: WPMedia;
  onVideoEnd?: () => void;
}

export default function HeroAMV({ media, onVideoEnd }: HeroAMVProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Video control management
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => {
      videoElement.muted = isMuted;
      videoElement.play().catch(() => {
        // Autoplay blocked, handled through user interaction
      });
    };

    handlePlay();

    return () => {
      videoElement.pause();
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, [media.source_url, isMuted]);

  const handleVideoEnd = () => {
    onVideoEnd?.();
  };

  // User interaction handler
  const handleFirstInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsMuted(false);
      videoRef.current?.play().catch(console.error);
    }
  };

  return (
    <section 
      className="relative h-screen w-full overflow-hidden cursor-pointer group"
      onClick={handleFirstInteraction}
      role="button"
      tabIndex={0}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted={isMuted}
        playsInline
        loop={false}
        preload="auto"
        onEnded={handleVideoEnd}
      >
        <source 
          src={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}${media.source_url}`} 
          type={media.media_details.mime_type} 
        />
        Your browser does not support the video tag.
      </video>

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {/* Metadata overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-white space-y-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
            {media.title.rendered}
          </h1>
          <div className="flex items-center gap-6 text-lg md:text-xl">
            <span className="bg-black/30 px-4 py-2 rounded-lg">
              {media.media_details.width}x{media.media_details.height}
            </span>
            <span className="hidden md:block">•</span>
            <span className="bg-black/30 px-4 py-2 rounded-lg">
              {new Date(media.date).toLocaleDateString()}
            </span>
            <span className="hidden md:block">•</span>
            <span className="bg-black/30 px-4 py-2 rounded-lg">
              By {media.author_name}
            </span>
          </div>
        </div>
      </div>

      {/* Sound control */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMuted(!isMuted);
        }}
        className="absolute top-6 right-6 z-20 p-3 rounded-full backdrop-blur-sm hover:bg-black/20 transition-all"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <SpeakerXMarkIcon className="w-8 h-8 text-white" />
        ) : (
          <SpeakerWaveIcon className="w-8 h-8 text-white" />
        )}
      </button>

      {/* Interaction prompt */}
      {!hasInteracted && (
        <div className="absolute inset-0 z-30 bg-black/60 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center animate-pulse">
            <p className="text-2xl font-bold text-white mb-4">
              Click anywhere to start
            </p>
            <div className="flex items-center justify-center gap-2">
              <SpeakerXMarkIcon className="w-8 h-8 text-white" />
              <span className="text-white text-lg">Sound is muted</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}