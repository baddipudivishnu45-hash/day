import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Flame, Send } from 'lucide-react';

/* ── Animated Candle Flame ── */
function CandleFlame({ lit, delay = 0 }) {
  return (
    <div className="flex flex-col items-center">
      {/* Flame */}
      <AnimatePresence>
        {lit && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, y: -10, transition: { duration: 0.4 } }}
            transition={{ delay, duration: 0.3 }}
            className="relative mb-0.5"
          >
            {/* Outer glow */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.2 + delay, ease: "easeInOut" }}
              className="absolute -inset-2 rounded-full bg-[#bda054]/20 blur-md"
            />
            {/* Flame body */}
            <motion.div
              animate={{
                scaleX: [1, 0.85, 1.1, 0.9, 1],
                scaleY: [1, 1.15, 0.9, 1.1, 1],
                rotate: [0, -3, 3, -2, 0],
              }}
              transition={{ repeat: Infinity, duration: 0.8 + delay * 0.3, ease: "easeInOut" }}
              className="w-2.5 h-4 rounded-full relative"
              style={{
                background: "linear-gradient(to top, #c59b97, #bda054, #f9e6d0)",
                boxShadow: "0 0 8px 2px rgba(189,160,84,0.4)",
              }}
            >
              {/* Inner bright core */}
              <div
                className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-2 rounded-full"
                style={{ background: "linear-gradient(to top, #fff8ee, #f9e6d0)" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Wick */}
      <div className="w-[2px] h-3 bg-[#5a544f]/60 rounded-full" />
    </div>
  );
}

/* ── Birthday Cake ── */
function BirthdayCake({ candlesLit, onBlowCandles }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative flex flex-col items-center mb-10 cursor-pointer group"
      onClick={onBlowCandles}
    >
      {/* Candles row */}
      <div className="flex items-end gap-4 md:gap-5 mb-0">
        <CandleFlame lit={candlesLit} delay={0} />
        <CandleFlame lit={candlesLit} delay={0.15} />
        <CandleFlame lit={candlesLit} delay={0.3} />
        <CandleFlame lit={candlesLit} delay={0.1} />
        <CandleFlame lit={candlesLit} delay={0.25} />
      </div>

      {/* Cake layers */}
      <div className="relative flex flex-col items-center">
        {/* Top layer — smallest */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative z-10"
        >
          <div
            className="w-36 md:w-44 h-10 md:h-12 rounded-t-xl rounded-b-md relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #faf8f5 0%, #f0ece4 100%)",
              border: "1px solid rgba(197,155,151,0.25)",
              boxShadow: "0 4px 12px rgba(44,40,37,0.06), inset 0 2px 4px rgba(255,255,255,0.6)",
            }}
          >
            {/* Frosting drip decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-3 flex justify-around px-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 rounded-b-full"
                  style={{
                    height: `${8 + (i % 3) * 4}px`,
                    background: "linear-gradient(to bottom, #c59b97, #c59b97/80)",
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>
            {/* Subtle pattern stripe */}
            <div className="absolute top-3 left-3 right-3 h-[1px] bg-[#c59b97]/15" />
            <div className="absolute top-5 left-4 right-4 h-[1px] bg-[#bda054]/10" />
          </div>
        </motion.div>

        {/* Middle layer */}
        <div
          className="w-48 md:w-56 h-12 md:h-14 -mt-[1px] relative z-[5]"
          style={{
            background: "linear-gradient(135deg, #f0ece4 0%, #eeebe3 100%)",
            border: "1px solid rgba(197,155,151,0.2)",
            borderTop: "none",
            boxShadow: "0 4px 16px rgba(44,40,37,0.06), inset 0 2px 6px rgba(255,255,255,0.4)",
          }}
        >
          {/* Middle decoration dots */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-center gap-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#c59b97" : "#bda054",
                  opacity: 0.35,
                }}
              />
            ))}
          </div>
          {/* Side frosting lines */}
          <div className="absolute top-2 left-4 right-4 h-[1px] bg-[#c59b97]/10" />
          <div className="absolute bottom-3 left-3 right-3 h-[1px] bg-[#bda054]/10" />
        </div>

        {/* Bottom layer — largest */}
        <div
          className="w-60 md:w-68 h-14 md:h-16 rounded-b-xl -mt-[1px] relative"
          style={{
            background: "linear-gradient(135deg, #eeebe3 0%, #e8e4dc 100%)",
            border: "1px solid rgba(197,155,151,0.2)",
            borderTop: "none",
            boxShadow: "0 8px 24px rgba(44,40,37,0.08), inset 0 2px 6px rgba(255,255,255,0.3)",
          }}
        >
          {/* Rose-gold bottom trim */}
          <div className="absolute bottom-0 left-0 right-0 h-2 rounded-b-xl bg-gradient-to-r from-[#c59b97]/10 via-[#bda054]/15 to-[#c59b97]/10" />
          {/* Pattern decoration */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-center gap-2">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                className="w-1 h-1 rounded-full"
                style={{ background: i % 2 === 0 ? "#c59b97" : "#bda054" }}
              />
            ))}
          </div>
        </div>

        {/* Cake plate / base */}
        <div
          className="w-68 md:w-76 h-3 rounded-b-2xl -mt-[1px]"
          style={{
            background: "linear-gradient(to bottom, #d8d3c5, #c5beae)",
            boxShadow: "0 4px 12px rgba(44,40,37,0.1)",
          }}
        />
      </div>

      {/* Hover hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: candlesLit ? 0.5 : 0 }}
        className="font-inter text-[8px] tracking-[0.25em] text-[#5a544f] uppercase mt-4 group-hover:opacity-80 transition-opacity"
      >
        Click to blow out the candles ✨
      </motion.p>
    </motion.div>
  );
}

/* ── Main GrandFinale ── */
export default function GrandFinale({ name = "Rakshi" }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [candlesLit, setCandlesLit] = useState(true);

  // Message Box States
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openMailtoFallback = (text) => {
    const subject = encodeURIComponent("Rakshii's Birthday Website Message! 🎁");
    const body = encodeURIComponent(text);
    window.open(`mailto:vishnu45264@gmail.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          // You can get a free Web3Forms Access Key by entering your email at web3forms.com.
          // By default, if the key is not replaced or is invalid, the code automatically 
          // falls back to opening her email client prefilled with the message!
          access_key: "f03410d6-b70b-4f45-abf7-d0c47820eea7",
          subject: "Rakshii liked your website! 🎁",
          from_name: "Rakshii Birthday Site",
          message: feedback
        })
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFeedback("");
        confetti({
          particleCount: 50,
          spread: 45,
          colors: ['#c59b97', '#bda054', '#ffffff']
        });
      } else {
        openMailtoFallback(feedback);
      }
    } catch (err) {
      openMailtoFallback(feedback);
    } finally {
      setSubmitting(false);
    }
  };

  // Confetti burst on scroll into view
  useEffect(() => {
    if (isInView) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#c59b97', '#bda054', '#eeebe3', '#fbcfe8', '#f9e6d0']
      });

      const end = Date.now() + 3.5 * 1000;
      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ['#c59b97', '#bda054', '#eeebe3']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ['#c59b97', '#bda054', '#eeebe3']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isInView]);

  const handleManualCelebration = () => {
    confetti({
      particleCount: 130,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#c59b97', '#bda054', '#eeebe3', '#fbcfe8', '#f9e6d0']
    });
  };

  const handleBlowCandles = () => {
    if (!candlesLit) {
      // Relight candles
      setCandlesLit(true);
      return;
    }
    setCandlesLit(false);

    // Special wish confetti burst
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#c59b97', '#bda054', '#eeebe3', '#fbcfe8', '#f9e6d0', '#ffffff']
      });
    }, 500);

    // Sparkle side cannons
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.65 },
        colors: ['#bda054', '#c59b97', '#f9e6d0']
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.65 },
        colors: ['#bda054', '#c59b97', '#f9e6d0']
      });
    }, 900);
  };

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center py-10 text-center select-none">

      {/* Glowing Heart Icon */}
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="mb-8 p-4 rounded-full border border-[#c59b97]/20 bg-white shadow-sm relative cursor-pointer active:scale-95"
        onClick={handleManualCelebration}
      >
        <Heart className="text-[#c59b97] w-8 h-8 fill-[#c59b97]/20" />
      </motion.div>

      {/* Large Finale Wish */}
      <h2 className="font-playfair text-3xl md:text-5xl font-medium tracking-wide leading-tight mb-6 text-[#2c2825]">
        Happy Birthday,{" "}
        <span className="text-[#c59b97]">
          {name}!
        </span>
      </h2>

      {/* Final Wishing message */}
      <p className="font-vibes text-2xl md:text-3xl text-[#bda054] leading-relaxed mb-10 max-w-xl select-none">
        "Here's to another beautiful year of laughter, growth, and sharing dreams. May your day be filled with all the joy and happiness you so richly deserve."
      </p>

      {/* Virtual Birthday Cake */}
      <BirthdayCake candlesLit={candlesLit} onBlowCandles={handleBlowCandles} />

      {/* Wish message after blowing candles */}
      <AnimatePresence>
        {!candlesLit && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-8"
          >
            <p className="font-vibes text-xl md:text-2xl text-[#c59b97]">
              🎂 Your wish has been made! May it come true 🤍
            </p>
            <button
              onClick={() => setCandlesLit(true)}
              className="mt-3 font-inter text-[8px] tracking-[0.2em] text-[#5a544f]/50 hover:text-[#5a544f] uppercase cursor-pointer transition-colors"
            >
              Relight candles
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebrate button */}
      <button
        onClick={handleManualCelebration}
        className="bg-white border border-[#2c2825]/15 hover:border-[#2c2825]/40 text-[#2c2825] px-10 py-3.5 rounded-md font-inter text-xs tracking-widest uppercase cursor-pointer hover:bg-[#faf8f5] transition-all duration-300 shadow-sm hover:shadow active:scale-98 flex items-center gap-2 mx-auto"
      >
        Celebrate Again
        <Sparkles size={13} className="text-[#c59b97]" />
      </button>

      {/* 💌 Feedback Letter Box Card */}
      <div className="mt-12 w-full max-w-md bg-[#faf8f5]/60 backdrop-blur-sm border border-[#c59b97]/20 rounded-2xl p-6 text-left select-text pointer-events-auto shadow-sm">
        <h3 className="font-playfair text-lg font-bold text-[#2c2825] mb-1">
          Leave a message
        </h3>
        <p className="font-inter text-[10px] text-[#5a544f]/80 leading-relaxed mb-4 select-none">
          How did you like this surprise? Share your thoughts, feedback, or a sweet message below to send it directly to my inbox! 🤍
        </p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-3">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your thoughts here..."
                required
                disabled={submitting}
                className="w-full h-24 bg-white border border-[#c59b97]/25 text-[#2c2825] focus:outline-none focus:border-[#c59b97] rounded-xl p-3 text-xs font-inter leading-relaxed resize-none shadow-inner transition-colors disabled:opacity-60"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting || !feedback.trim()}
                  className="bg-[#c59b97] hover:bg-[#b98c88] text-white px-6 py-2.5 rounded-full text-[9px] font-inter font-bold tracking-widest uppercase cursor-pointer transition-all duration-300 shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {submitting ? "Sending..." : "Submit Message"}
                  <Send size={10} />
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center bg-[#c59b97]/5 border border-[#c59b97]/15 rounded-xl flex flex-col items-center justify-center gap-2 select-none"
            >
              <span className="text-2xl">💌</span>
              <p className="font-playfair text-sm font-semibold text-[#2c2825]">
                Message Sent!
              </p>
              <p className="font-inter text-[9px] text-[#5a544f] tracking-wide uppercase">
                Thank you 🤍
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
