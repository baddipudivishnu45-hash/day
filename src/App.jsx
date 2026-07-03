import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CountdownSection from './components/CountdownSection';
import StorySection from './components/StorySection';
import MemoryGallery from './components/MemoryGallery';
import SecretLetter from './components/SecretLetter';
import GrandFinale from './components/GrandFinale';
import AudioPlayer from './components/AudioPlayer';
import CustomCursor from './components/CustomCursor';
import Envelope from './components/Envelope';
import PhotoUploadPanel from './components/PhotoUploadPanel';
import { PhotoProvider, usePhotos } from './components/PhotoContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';
import AdvanceWishes from './components/AdvanceWishes';
import PinLockScreen from './components/PinLockScreen';

// Inner App that can access the PhotoProvider context
function AppContent() {
  const [step, setStep] = useState(0); // 0: Loading, 1: Countdown, 2: Letters Desk
  const [activeLetter, setActiveLetter] = useState(null); // null, 1-7
  const { photos } = usePhotos();
  const [isFanned, setIsFanned] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Enable fanning by default on mobile touchscreens
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      setIsFanned(true);
    }
  }, []);

  // Card fanning layout styles helper
  const getFanStyles = (idx, hovered, fanned) => {
    if (!fanned) {
      const pile = [
        { x: -6, y: 4, r: -4 },
        { x: 3, y: -2, r: 1 },
        { x: -3, y: 1, r: -1 },
        { x: 5, y: 3, r: 3 },
        { x: 2, y: -4, r: -2 }
      ];
      return { x: pile[idx].x, y: pile[idx].y, r: pile[idx].r, z: idx, s: 1, op: 1 };
    }

    const isHoveredSelf = hovered === idx;
    const isHoveredAny = hovered !== null;
    const spacing = typeof window !== 'undefined' && window.innerWidth < 640 ? 55 : 200;
    
    const fanAngles = [-15, -7, 0, 7, 15];
    const fanY = [22, 6, 0, 6, 22];
    
    let x = (idx - 2) * spacing;
    let y = fanY[idx];
    let r = fanAngles[idx];
    let z = idx;
    let s = 1;
    let op = 1;

    if (isHoveredAny) {
      if (isHoveredSelf) {
        y -= 35;
        r = 0;
        z = 50;
        s = 1.08;
      } else {
        op = 0.5;
      }
    }

    return { x, y, r, z, s, op };
  };

  const lettersData = [
    { id: 1, title: "Our Story", indexText: "LETTER I", dateText: "Where it all began" },
    { id: 2, title: "Memory Gallery", indexText: "LETTER II", dateText: "Captured joy in frames" },
    { id: 4, title: "A Secret Message", indexText: "LETTER III", dateText: "For your eyes only" },
    { id: 8, title: "20 Advance Wishes", indexText: "THE PRELUDE", dateText: "Counting down to 21" },
    { id: 6, title: "Grand Finale Surprise", indexText: "LETTER IV", dateText: "Make a birthday wish" }
  ];

  const activeLetterData = lettersData.find(l => l.id === activeLetter);

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#2c2825] relative selection:bg-[#c59b97]/30 selection:text-[#2c2825]">
      {/* Subtle overlay paper grain texture globally */}
      <div className="absolute inset-0 opacity-15 bg-radial-[circle,rgba(44,40,37,0.03)_1px,transparent_0] bg-[size:20px_20px] pointer-events-none z-0" />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="loader-step"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          >
            <LoadingScreen onFinished={() => setStep(1)} />
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="countdown-step"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          >
            <CountdownSection onUnlock={() => setStep(3)} />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="pin-step"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          >
            <PinLockScreen onUnlock={() => setStep(2)} />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="unlocked-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            className="relative z-10 min-h-screen flex flex-col"
          >
            {/* Global utilities active inside story */}
            <AudioPlayer isUnlocked={true} />
            <CustomCursor />

            {/* Elegant Header */}
            <header className="max-w-5xl w-full mx-auto px-6 pt-20 pb-10 text-center select-none">

              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-inter text-[10px] md:text-[11px] tracking-[0.3em] font-bold text-[#c59b97] uppercase mb-4 block"
              >
                A Celebration Correspondence
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-playfair text-5xl md:text-7xl font-semibold tracking-wide text-[#2c2825] mb-5"
              >
                Happiest Birthday Rakshii🐥💗
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-inter text-[11px] md:text-xs tracking-[0.25em] text-[#5a544f] uppercase max-w-2xl mx-auto leading-relaxed"
              >
                You make the world a more beautiful and magical place, just by being in it.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.6 }}
                className="w-16 h-[1px] bg-[#2c2825] mx-auto mt-8"
              />
            </header>

            {/* Desktop Tabletop workspace: interactive fanned letters deck */}
            <main className="max-w-5xl w-full mx-auto px-6 pb-32 flex-grow flex items-center justify-center min-h-[480px] relative select-none z-10">
              <div 
                onMouseEnter={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                    setIsFanned(true);
                  }
                }}
                onMouseLeave={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                    setIsFanned(false);
                    setHoveredIdx(null);
                  }
                }}
                className="relative w-full max-w-[310px] sm:max-w-[380px] h-[220px] sm:h-[260px] flex items-center justify-center"
              >
                {lettersData.map((letter, idx) => {
                  const style = getFanStyles(idx, hoveredIdx, isFanned);
                  return (
                    <motion.div
                      key={letter.id}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        zIndex: style.z
                      }}
                      animate={{
                        x: style.x,
                        y: style.y,
                        rotate: style.r,
                        scale: style.s,
                        opacity: style.op
                      }}
                      transition={{ type: "spring", stiffness: 240, damping: 22 }}
                      onMouseEnter={() => isFanned && setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      <Envelope
                        title={letter.title}
                        indexText={letter.indexText}
                        dateText={letter.dateText}
                        onClick={() => setActiveLetter(letter.id)}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </main>

            {/* Envelope Paper Modals Overlay */}
            <AnimatePresence>
              {activeLetter !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-[#faf8f5]/90 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
                >
                  {activeLetter === 8 ? (
                    <AdvanceWishes onClose={() => setActiveLetter(null)} />
                  ) : (
                    <motion.div
                      initial={{ y: 60, scale: 0.96, opacity: 0 }}
                      animate={{ y: 0, scale: 1, opacity: 1 }}
                      exit={{ y: 40, scale: 0.96, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 22 }}
                      className="bg-white border border-[#2c2825]/10 rounded-xl p-6 md:p-10 w-full max-w-4xl shadow-2xl relative flex flex-col max-h-[90vh] my-4"
                    >
                      {/* Rose-gold top border */}
                      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl bg-gradient-to-r from-[#c59b97] via-[#bda054] to-[#c59b97]" />

                      {/* Paper Header */}
                      <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#2c2825]/5 select-none z-20">
                        <span className="font-inter text-[10px] tracking-[0.25em] text-[#c59b97] font-semibold uppercase">
                          {activeLetterData?.indexText}
                        </span>
                        <button
                          onClick={() => setActiveLetter(null)}
                          className="font-inter text-[10px] tracking-widest text-[#5a544f] hover:text-[#2c2825] uppercase cursor-pointer transition-colors active:scale-95 px-2 py-1 bg-[#2c2825]/5 hover:bg-[#2c2825]/10 rounded"
                        >
                          Fold & Seal
                        </button>
                      </div>

                      {/* Scrollable Letter Body */}
                      <div className="overflow-y-auto pr-2 md:pr-4 flex-grow scrollbar-thin select-text">
                        {activeLetter === 1 && <StorySection />}
                        {activeLetter === 2 && <MemoryGallery />}
                        {activeLetter === 4 && <SecretLetter isEmbedded={true} />}
                        {activeLetter === 6 && <GrandFinale name="Rakshi" />}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <PhotoProvider>
      <AppContent />
    </PhotoProvider>
  );
}
