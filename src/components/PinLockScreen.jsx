import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PinLockScreen({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const CORRECT_PIN = "0507"; // 5th of July (DDMM)

  const handleKeyPress = (num) => {
    setError("");
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      
      // Auto-submit when length reaches 4
      if (newPin.length === 4) {
        verifyPin(newPin);
      }
    }
  };

  const handleBackspace = () => {
    setError("");
    setPin(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setError("");
    setPin("");
  };

  const verifyPin = (enteredPin) => {
    if (enteredPin === CORRECT_PIN) {
      // Confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c59b97', '#bda054', '#ffffff']
      });

      // Advance step
      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setIsShaking(true);
      setError("Incorrect PIN. Try again 😭");
      setTimeout(() => {
        setIsShaking(false);
        setPin(""); // Clear code
      }, 600);
    }
  };

  // Keyboard support for desktop users
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin]);

  return (
    <div className="fixed inset-0 bg-[#f7f4ee] z-[9999] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,rgba(238,235,227,0.3)_100%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-sm bg-white/90 backdrop-blur-md border border-[#c59b97]/15 rounded-3xl p-8 flex flex-col items-center shadow-[0_12px_40px_rgba(197,155,151,0.06)] z-10"
      >
        {/* Header Icon */}
        <div className="w-12 h-12 rounded-full border border-[#c59b97]/20 bg-[#c59b97]/5 flex items-center justify-center mb-6">
          <Lock className="w-5 h-5 text-[#c59b97]" />
        </div>

        <h2 className="font-playfair text-xl md:text-2xl font-bold tracking-tight text-[#2c2825] text-center mb-1">
          Identity Verification
        </h2>
        <p className="font-inter text-[10px] text-[#c59b97] font-bold tracking-widest uppercase text-center mb-6">
          Enter the 4-digit key
        </p>

        {/* PIN Indicators Row */}
        <motion.div
          animate={isShaking ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-5 my-6"
        >
          {[...Array(4)].map((_, i) => {
            const isActive = i < pin.length;
            return (
              <div
                key={i}
                className={`w-3.5 h-3.5 rounded-full border transition-all duration-150
                  ${isActive 
                    ? 'bg-[#c59b97] border-[#c59b97] scale-110 shadow-[0_0_8px_rgba(197,155,151,0.45)]' 
                    : 'bg-white/50 border-[#c59b97]/30'
                  }
                `}
              />
            );
          })}
        </motion.div>

        {/* Dynamic Hints/Error Messages */}
        <div className="h-6 mb-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.span
                key="error"
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-inter text-[10px] font-bold text-rose-500 tracking-wide uppercase select-none"
              >
                {error}
              </motion.span>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="font-inter text-[10px] font-normal text-[#5a544f] select-none tracking-tight text-center"
              >
                Hint: Your birth date (DDMM) 🎂
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Circular Keypad Grid */}
        <div className="grid grid-cols-3 gap-x-5 gap-y-4 justify-items-center mt-2 w-full max-w-[240px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className="w-14 h-14 rounded-full border border-[#2c2825]/5 hover:border-[#c59b97]/30 bg-white text-[#2c2825] text-lg font-bold flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-90 hover:bg-[#faf8f5] shadow-sm"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="w-14 h-14 rounded-full text-[#5a544f]/60 hover:text-[#5a544f] text-[10px] font-bold tracking-widest uppercase flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-90"
          >
            Clear
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className="w-14 h-14 rounded-full border border-[#2c2825]/5 hover:border-[#c59b97]/30 bg-white text-[#2c2825] text-lg font-bold flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-90 hover:bg-[#faf8f5] shadow-sm"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="w-14 h-14 rounded-full text-[#5a544f]/60 hover:text-[#5a544f] flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-90"
            title="Backspace"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
