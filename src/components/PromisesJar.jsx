import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const PROMISES = [
  {
    id: 1,
    title: "🍦 Iceberg Ice Cream Date",
    description: "Redeemable for a double scoop ice cream date at Iceberg. No questions asked!"
  },
  {
    id: 2,
    title: "🎱 8-Ball Pool Handicap",
    description: "Play this card to make me play with one eye closed so you can win. Pro player eyuuuuu!"
  },
  {
    id: 3,
    title: "💄 Lipstick Replacement Pass",
    description: "Redeemable for a makeup shopping trip to replace any lost lipsticks. Guaranteed drama-free!"
  },
  {
    id: 4,
    title: "🕊️ The Insta-Apology Card",
    description: "Skip any minor argument or fight instantly. Can be played anytime you want me to just agree with you."
  },
  {
    id: 5,
    title: "📞 Overthinking Helpline",
    description: "Available 24/7. Call me anytime you want to talk about your thoughts, badhalu, or dreams for hours."
  },
  {
    id: 6,
    title: "🚗 Midnight Long Drive",
    description: "A peaceful night drive under the stars with soft music playing in the background."
  },
  {
    id: 7,
    title: "🍿 Movie Night Selector",
    description: "You get to choose the movie, and I promise not to fall asleep or complain."
  }
];

export default function PromisesJar() {
  const [drawnPromise, setDrawnPromise] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  const drawPromise = () => {
    if (isShaking) return;
    setIsShaking(true);
    setDrawnPromise(null);

    // Shake animation timer
    setTimeout(() => {
      setIsShaking(false);
      const randomIndex = Math.floor(Math.random() * PROMISES.length);
      setDrawnPromise(PROMISES[randomIndex]);

      // Confetti burst
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#c59b97', '#bda054', '#ffffff']
      });
    }, 1200);
  };

  return (
    <div className="relative w-full min-h-[420px] flex flex-col items-center justify-center p-4">
      {/* Title */}
      <div className="text-center pb-6 border-b border-[#2c2825]/5 mb-8 select-none w-full">
        <h2 className="font-playfair text-2xl md:text-3xl font-semibold tracking-wide text-[#2c2825]">
          Jar of Promises
        </h2>
        <p className="font-inter text-xs text-[#5a544f] mt-1 select-none">
          Click the jar to draw a cute digital coupon on me
        </p>
      </div>

      {/* Main Interactive Section */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-2xl">
        
        {/* Interactive Glass Jar */}
        <div className="relative cursor-pointer select-none" onClick={drawPromise}>
          <motion.div
            animate={isShaking ? {
              x: [0, -12, 12, -12, 12, -8, 8, -4, 4, 0],
              y: [0, 4, -4, 4, -4, 2, -2, 1, -1, 0],
              rotate: [0, -4, 4, -4, 4, -2, 2, 0]
            } : {}}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-44 h-56 rounded-[40px] border-[3px] border-[#c59b97]/30 hover:border-[#c59b97]/60 bg-white/40 backdrop-blur-md flex flex-col items-center justify-between p-4 shadow-[0_15px_35px_rgba(197,155,151,0.06),inset_0_0_20px_rgba(197,155,151,0.05)] relative transition-all duration-300"
          >
            {/* Jar Lid */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-5 rounded-full bg-gradient-to-r from-[#c59b97] via-[#bda054] to-[#c59b97] border border-[#2c2825]/5 shadow-[0_4px_10px_rgba(0,0,0,0.05)]" />
            
            {/* Little floating hearts inside */}
            <div className="flex-grow flex items-center justify-center gap-2 flex-wrap max-w-[120px] pt-4">
              <Heart className="text-[#c59b97]/50 fill-[#c59b97]/20 w-4 h-4 animate-bounce" style={{ animationDelay: '0.1s' }} />
              <Heart className="text-[#bda054]/45 fill-[#bda054]/20 w-5 h-5 animate-bounce" style={{ animationDelay: '0.4s' }} />
              <Heart className="text-[#c59b97]/35 fill-[#c59b97]/15 w-3 h-3 animate-bounce" style={{ animationDelay: '0.2s' }} />
              <Heart className="text-[#bda054]/50 fill-[#bda054]/25 w-4 h-4 animate-bounce" style={{ animationDelay: '0.6s' }} />
            </div>

            {/* Glowing Tag */}
            <div className="bg-[#c59b97]/10 border border-[#c59b97]/30 rounded-lg px-3 py-1 mt-auto z-10 shadow-sm flex items-center gap-1">
              <Sparkles size={8} className="text-[#c59b97] animate-pulse" />
              <span className="font-inter text-[7px] font-bold tracking-widest text-[#c59b97] uppercase">SHAKE ME</span>
            </div>
          </motion.div>
        </div>

        {/* Coupon Display Box */}
        <div className="w-full max-w-sm h-56 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isShaking ? (
              <motion.div
                key="shaking"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.7, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2 font-inter text-[10px] font-bold tracking-widest text-[#c59b97] uppercase"
              >
                <div className="w-6 h-6 rounded-full border-2 border-t-transparent border-[#c59b97] animate-spin" />
                <span>Unwrapping...</span>
              </motion.div>
            ) : drawnPromise ? (
              <motion.div
                key="coupon"
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-full bg-white border border-[#c59b97]/25 rounded-3xl p-6 shadow-[0_10px_35px_rgba(197,155,151,0.08)] relative overflow-hidden flex flex-col justify-between h-full select-none text-[#2c2825]"
              >
                {/* Decorative side ticket cuts */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#faf8f5] border-r border-[#c59b97]/15" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#faf8f5] border-l border-[#c59b97]/15" />

                {/* Ticket Top */}
                <div className="flex justify-between items-center text-[8px] font-inter tracking-widest text-[#c59b97] font-bold uppercase pb-3 border-b border-[#c59b97]/20 border-dashed">
                  <span>Relationship Coupon</span>
                  <span>No. 00{drawnPromise.id}</span>
                </div>

                {/* Ticket Body */}
                <div className="my-auto py-2">
                  <h3 className="font-playfair text-lg font-bold tracking-tight text-[#2c2825] mb-2 text-center">
                    {drawnPromise.title}
                  </h3>
                  <p className="font-inter text-xs text-[#5a544f] leading-relaxed font-normal text-center px-2">
                    {drawnPromise.description}
                  </p>
                </div>

                {/* Ticket Footer */}
                <div className="flex justify-between items-center text-[7px] font-inter tracking-widest text-[#5a544f]/50 uppercase pt-3 border-t border-[#c59b97]/20 border-dashed">
                  <span>Redeemable anytime</span>
                  <span>*Terms: One-time use</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                className="text-center font-inter text-xs text-[#5a544f] leading-relaxed max-w-[200px]"
              >
                Shake the jar to pick a promise from the bundle
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
