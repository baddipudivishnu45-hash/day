import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';
import ParticleSystem from './ParticleSystem';
import confetti from 'canvas-confetti';

export default function LoadingScreen({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });

  const messages = [
    "Preparing your surprise...",
    "Gathering our best memories...",
    "Polishing the notes...",
    "Writing heartfelt letters...",
    "Unfolding stories...",
    "Sealing with love..."
  ];

  const handleButtonClick = () => {
    if (clickCount < 2) {
      // Calculate random translation offsets to move button away from mouse click
      const signX = Math.random() > 0.5 ? 1 : -1;
      const randomX = signX * (110 + Math.random() * 70); // 110px to 180px shift
      const randomY = 60 + Math.random() * 60;            // 60px to 120px shift downwards
      setButtonOffset({ x: randomX, y: randomY });
      setClickCount(prev => prev + 1);
    } else {
      onFinished(true);
    }
  };

  // Simulate loading progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsLoaded(true);
          return 100;
        }
        const inc = Math.floor(Math.random() * 10) + 5;
        return Math.min(prev + inc, 100);
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, []);

  // Rotate messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1800);

    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#f7f4ee] z-[9999] flex flex-col items-center justify-center overflow-hidden">
      {/* Soft warm vignette background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,rgba(238,235,227,0.3)_100%)] pointer-events-none" />
      
      {/* Slow warm particles resembling floating dust motes */}
      <ParticleSystem type="circle" count={15} />

      <div className="z-10 text-center px-6 max-w-lg w-full flex flex-col items-center">
        {/* Minimal Sealed Letter Icon */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="mb-8 p-4 rounded-full border border-[#2c2825]/10 bg-white shadow-sm flex items-center justify-center"
        >
          <Mail className="text-[#c59b97] w-6 h-6" />
        </motion.div>

        {/* Minimalist Editorial Title */}
        <h1 className="font-playfair text-3xl md:text-4xl font-medium tracking-wide text-[#2c2825] mb-2 select-none">
          A Birthday Correspondence
        </h1>
        <p className="font-vibes text-2xl text-[#c59b97] mb-12 select-none">
          For Someone Very Special
        </p>

        {/* Progress Bar & Buttons Container */}
        <div className="w-64 min-h-[96px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {!isLoaded ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center"
              >
                {/* Thin sepia progress line */}
                <div className="w-full h-[1px] bg-[#2c2825]/10 rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="h-full bg-[#c59b97]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeInOut" }}
                  />
                </div>
                {/* Loader Messages */}
                <div className="h-6">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={messageIndex}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 0.7, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.4 }}
                      className="font-inter text-[10px] tracking-widest uppercase text-[#5a544f] select-none"
                    >
                      {messages[messageIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="enter-btn"
                animate={{ x: buttonOffset.x, y: buttonOffset.y }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                onClick={handleButtonClick}
                className="bg-white border border-[#2c2825]/15 hover:border-[#2c2825]/40 text-[#2c2825] px-8 py-3 rounded-md text-xs font-inter tracking-widest uppercase cursor-pointer hover:bg-[#faf8f5] transition-all duration-300 shadow-sm hover:shadow active:scale-98 flex items-center gap-2"
              >
                Open Letters
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
