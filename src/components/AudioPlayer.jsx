import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer({ isUnlocked }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  
  // Mixkit Forest Lullaby - extremely soft, emotional, and dreamy piano/lullaby track
  const audioUrl = "https://assets.mixkit.co/music/preview/mixkit-forest-lullaby-1109.mp3";

  useEffect(() => {
    // Autoplay when the experience unlocks
    if (isUnlocked && audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          // Fade volume in gently
          audioRef.current.volume = 0;
          let vol = 0;
          const fadeInterval = setInterval(() => {
            if (vol < 0.4) {
              vol += 0.05;
              audioRef.current.volume = Math.min(vol, 0.4);
            } else {
              clearInterval(fadeInterval);
            }
          }, 150);
        })
        .catch((err) => {
          console.log("Autoplay blocked by browser. Awaiting user interaction.", err);
        });
    }
  }, [isUnlocked]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          audioRef.current.volume = isMuted ? 0 : 0.4;
          setIsPlaying(true);
        })
        .catch(err => console.log(err));
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = 0.4;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
      />

      {/* Control Button */}
      <button
        onClick={togglePlay}
        className="bg-white hover:bg-[#faf8f5] text-[#2c2825] border border-[#2c2825]/10 p-3 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-sm active:scale-95 group cursor-pointer"
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        <div className="flex items-end gap-[3px] h-4 w-5 mr-1 justify-center">
          {/* Audio Visualizer Bars */}
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="w-[2px] bg-[#c59b97] rounded-full transition-all duration-300"
              style={{
                height: isPlaying && !isMuted ? "100%" : "20%",
                transformOrigin: "bottom",
                animation: isPlaying && !isMuted
                  ? `soundBar 1s ease-in-out infinite alternate`
                  : "none",
                animationDelay: `${i * 0.15}s`
              }}
            />
          ))}
        </div>
      </button>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="bg-white hover:bg-[#faf8f5] text-[#2c2825] border border-[#2c2825]/10 p-3 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-sm active:scale-95 cursor-pointer"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX size={16} className="text-[#c59b97]" />
        ) : (
          <Volume2 size={16} className="text-[#5a544f] group-hover:text-[#2c2825]" />
        )}
      </button>

      {/* Embedded CSS animation for visualizer */}
      <style>{`
        @keyframes soundBar {
          0% { transform: scaleY(0.2); }
          100% { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
}
