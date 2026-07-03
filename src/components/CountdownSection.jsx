import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';
import ParticleSystem from './ParticleSystem';

export default function CountdownSection({ onUnlock }) {
  // Target: July 5, 2026 at 12:00 AM (midnight)
  const [targetDate] = useState(() => {
    // July 5, 2026 00:00:00 local time
    return new Date(2026, 6, 5, 0, 0, 0).getTime();
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = targetDate - new Date().getTime();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Format numbers to always be 2 digits
  const formatNum = (num) => String(num).padStart(2, '0');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div className="min-h-screen w-full bg-[#f7f4ee] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Soft warm vignette background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,rgba(238,235,227,0.3)_100%)] pointer-events-none" />

      {/* Floating particles (very subtle and slow) */}
      <ParticleSystem type="circle" count={12} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-2xl w-full text-center z-10"
      >
        {/* Simple subtitle */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-3">
          <span className="h-[1px] w-6 bg-[#2c2825]/20" />
          <span className="font-inter text-xs tracking-[0.2em] uppercase text-[#5a544f] font-medium">
            A Surprise Awaits
          </span>
          <span className="h-[1px] w-6 bg-[#2c2825]/20" />
        </motion.div>

        {/* Serif Header */}
        <motion.h2 
          variants={itemVariants}
          className="font-playfair text-3xl md:text-4xl font-medium tracking-wide mb-10 text-[#2c2825]"
        >
          Your Surprise Unlocks In...
        </motion.h2>

        {/* Minimalist Card (like a letters box) */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-[#2c2825]/10 rounded-2xl p-8 md:p-10 mb-12 relative overflow-hidden shadow-sm max-w-lg mx-auto"
        >
          {/* Subtle paper grain texture pattern */}
          <div className="absolute inset-0 opacity-10 bg-radial-[circle,rgba(44,40,37,0.03)_1px,transparent_0] bg-[size:16px_16px] pointer-events-none" />
          
          <div className="grid grid-cols-4 gap-2 md:gap-4 text-center relative z-10">
            {/* Days */}
            <div className="flex flex-col">
              <span className="font-playfair text-3xl md:text-5xl font-medium text-[#2c2825]">
                {formatNum(timeLeft.days)}
              </span>
              <span className="font-inter text-[9px] md:text-xs tracking-widest text-[#5a544f] uppercase mt-2">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="flex flex-col">
              <span className="font-playfair text-3xl md:text-5xl font-medium text-[#2c2825]">
                {formatNum(timeLeft.hours)}
              </span>
              <span className="font-inter text-[9px] md:text-xs tracking-widest text-[#5a544f] uppercase mt-2">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col">
              <span className="font-playfair text-3xl md:text-5xl font-medium text-[#2c2825]">
                {formatNum(timeLeft.minutes)}
              </span>
              <span className="font-inter text-[9px] md:text-xs tracking-widest text-[#5a544f] uppercase mt-2">
                Mins
              </span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col">
              <span className="font-playfair text-3xl md:text-5xl font-medium text-[#2c2825]">
                {formatNum(timeLeft.seconds)}
              </span>
              <span className="font-inter text-[9px] md:text-xs tracking-widest text-[#5a544f] uppercase mt-2">
                Secs
              </span>
            </div>
          </div>
        </motion.div>

        {/* Minimal CTA Button */}
        <motion.div variants={itemVariants}>
          <button
            onClick={onUnlock}
            className="bg-white border border-[#2c2825]/15 hover:border-[#2c2825]/40 text-[#2c2825] px-10 py-4 rounded-md font-inter text-xs tracking-widest uppercase cursor-pointer hover:bg-[#faf8f5] transition-all duration-300 shadow-sm hover:shadow-md hover:scale-101 active:scale-98 flex items-center justify-center gap-2 mx-auto"
          >
            Open Surprise
            <Mail size={13} className="text-[#c59b97]" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
