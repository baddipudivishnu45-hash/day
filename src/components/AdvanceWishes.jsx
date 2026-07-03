import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Video, Image as ImageIcon, Volume2, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

// ==========================================
// 🎁 CONFIGURE YOUR 20 SURPRISES HERE! 🎁
// ==========================================
// You can edit the dates, titles, captions, types, and paths directly in this array.
// - Set 'mediaUrl' to "" to leave the day locked (coming soon).
// - Place local images/videos in "public/wishes/" and reference them as "/wishes/filename.ext".
const SURPRISE_EDITS = [
  {
    id: 1,
    dayText: "Day 01",
    mediaType: "video",
    mediaUrl: "/wishes/day1.mp4"
  },
  {
    id: 2,
    dayText: "Day 02",
    mediaType: "video",
    mediaUrl: "/wishes/day2.mp4"
  },
  {
    id: 3,
    dayText: "Day 03",
    mediaType: "video",
    mediaUrl: "/wishes/day3.mp4"
  },
  {
    id: 4,
    dayText: "Day 04",
    mediaType: "photo",
    mediaUrl: "/wishes/day4.jpeg"
  },
  {
    id: 5,
    dayText: "Day 05",
    mediaType: "video",
    mediaUrl: "/wishes/day5.mp4"
  },
  {
    id: 6,
    dayText: "Day 06",
    mediaType: "video",
    mediaUrl: "/wishes/day6.mp4"
  },
  {
    id: 7,
    dayText: "Day 07",
    mediaType: "video",
    mediaUrl: "/wishes/day7.mp4"
  },
  {
    id: 8,
    dayText: "Day 08",
    mediaType: "video",
    mediaUrl: "/wishes/day8.mp4"
  },
  {
    id: 9,
    dayText: "Day 09",
    mediaType: "video",
    mediaUrl: "/wishes/day9.mp4"
  },
  {
    id: 10,
    dayText: "Day 10",
    mediaType: "video",
    mediaUrl: "/wishes/day10.mp4"
  },
  {
    id: 11,
    dayText: "Day 11",
    mediaType: "video",
    mediaUrl: "/wishes/day11.mp4"
  },
  {
    id: 12,
    dayText: "Day 12",
    mediaType: "video",
    mediaUrl: "/wishes/day12.mp4"
  },
  {
    id: 13,
    dayText: "Day 13",
    mediaType: "video",
    mediaUrl: "/wishes/day13.mp4"
  },
  {
    id: 14,
    dayText: "Day 14",
    mediaType: "video",
    mediaUrl: "/wishes/day14.mp4"
  },
  {
    id: 15,
    dayText: "Day 15",
    mediaType: "video",
    mediaUrl: "/wishes/day15.mp4"
  },
  {
    id: 16,
    dayText: "Day 16",
    mediaType: "video",
    mediaUrl: "/wishes/day16.mp4"
  },
  {
    id: 17,
    dayText: "Day 17",
    mediaType: "photo",
    mediaUrl: "/wishes/day17.png"
  },
  {
    id: 18,
    dayText: "Day 18",
    mediaType: "video",
    mediaUrl: "/wishes/day18.mp4"
  },
  {
    id: 19,
    dayText: "Day 19",
    mediaType: "photo",
    mediaUrl: "/wishes/day19.jpeg"
  },
  {
    id: 20,
    dayText: "Day 20",
    mediaType: "photo",
    mediaUrl: "/wishes/day20.png"
  }
];

const REVEAL_STEPS = [
  "Rakshiiiiiiii 😭😂❤️",
  "Guess whattttt… what's the 21st surpriseee?? 👀🎁",
  "Take a minute… think think thinkkk 🤔😂",
  "Yessssss 😌",
  "IT'S MEEEEEE 😭😂❤️",
  "I'm your 21st surpriseeee 😎🎁",
  "Inka nen unna ga Rakshiii 😭😂\nNene neeku oka pedda surpriseuuu hahahahaha 😭🤣",
  "Okay okayyy… kiddinggg 😂😂",
  "But wait 👀\nThe actual surprise is…",
  "THIS WHOLE PART 😭❤️",
  "Yesss Rakshiiii 🥹\nThis entire thing is my 21st surprise for youuu 🎁❤️",
  "And nowwww… finallyyy…\n\nHAPPYYYY BIRTHDAYYYYY RAKSHIIIIIIII 🥳🎂😭❤️❤️❤️"
];

export default function AdvanceWishes({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealStep, setRevealStep] = useState(0);
  const scrollContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Filter only slides that have content, sorted from lowest ID (Day 01) to highest ID (Day 20)
  const activeSlides = SURPRISE_EDITS.filter(w => !!w.mediaUrl).sort((a, b) => a.id - b.id);

  // Combine custom slides + Grand Finale slide (id: 21)
  const allSlides = [
    ...activeSlides,
    {
      id: 21,
      dayText: "Day 21",
      date: "July 05",
      title: "Happy 21st Birthday!",
      caption: "",
      mediaType: "photo",
      mediaUrl: ""
    }
  ];

  const totalSlides = allSlides.length;

  // Auto-scroll reveal chat list to the bottom as lines print
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [revealStep]);

  // Track scrolling index
  const handleScroll = (e) => {
    const container = e.currentTarget;
    const scrollPos = container.scrollLeft;
    const width = container.clientWidth;
    if (width > 0) {
      const idx = Math.round(scrollPos / width);
      if (idx !== currentIndex && idx >= 0 && idx < totalSlides) {
        setCurrentIndex(idx);
      }
    }
  };

  // Run confetti and auto-reveal timer timeline when hitting the final slide
  useEffect(() => {
    if (activeWish && activeWish.id === 21) {
      setRevealStep(0);

      // Define sequential time delays for each text bubble to animate
      const delays = [
        1600, // 0: Rakshiiiiiiii 😭😂❤️
        2200, // 1: Guess whattttt…
        2000, // 2: Take a minute…
        1200, // 3: Yessssss 😌
        1600, // 4: IT'S MEEEEEE 😭😂❤️
        1800, // 5: I'm your 21st surpriseeee 😎🎁
        2500, // 6: Inka nen unna ga Rakshiii 😭😂...
        1800, // 7: Okay okayyy… kiddinggg 😂😂
        2000, // 8: But wait 👀 The actual surprise is…
        1800, // 9: THIS WHOLE PART 😭❤️
        2400, // 10: Yesss Rakshiiii 🥹 This entire thing is my 21st surprise...
        1500  // 11: And nowwww… finallyyy… HAPPYYYY BIRTHDAYYYYY RAKSHIIIIIIII 🥳🎂😭❤️❤️❤️
      ];

      let timers = [];
      let delaySum = 0;

      // Queue consecutive step updates
      for (let i = 0; i < REVEAL_STEPS.length - 1; i++) {
        delaySum += delays[i];
        const t = setTimeout(() => {
          setRevealStep(i + 1);

          // Confetti bursts at key highlights
          if (i + 1 === 4 || i + 1 === 9 || i + 1 === 11) {
            confetti({
              particleCount: 45,
              spread: 50,
              colors: ['#c59b97', '#bda054', '#ffffff']
            });
          }
        }, delaySum);
        timers.push(t);
      }

      // Initial visual confetti splash
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ['#c59b97', '#bda054', '#ffffff']
      });

      return () => {
        timers.forEach(t => clearTimeout(t));
      };
    } else {
      setRevealStep(0);
    }
  }, [currentIndex]);

  const scrollToSlide = (idx) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: idx * scrollContainerRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < totalSlides - 1) {
      scrollToSlide(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToSlide(currentIndex - 1);
    }
  };

  // Helper to parse YouTube / Vimeo URLs to embed format
  const getEmbedVideoUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed/') || url.includes('player.vimeo.com/video/')) {
      return url;
    }
    const ytReg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const ytMatch = url.match(ytReg);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }
    const vimeoReg = /vimeo\.com\/(?:video\/)?([0-9]+)/;
    const vimeoMatch = url.match(vimeoReg);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    return url;
  };

  const isEmbeddableVideo = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com') || url.includes('embed');
  };

  const activeWish = allSlides[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-[#161413] flex flex-col justify-between overflow-hidden text-white">
      {/* Blurred background projection */}
      <AnimatePresence mode="wait">
        {activeWish && activeWish.mediaType === 'photo' && activeWish.mediaUrl && (
          <motion.div
            key={activeWish.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center filter blur-2xl scale-110 pointer-events-none z-0"
            style={{ backgroundImage: `url(${activeWish.mediaUrl})` }}
          />
        )}
      </AnimatePresence>

      {/* Warm Ambient Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-0" />

      {/* Stories progress bars at the top */}
      <div className="absolute top-6 left-6 right-6 flex gap-1.5 z-40 pointer-events-none">
        {allSlides.map((_, idx) => (
          <div key={idx} className="h-[2px] flex-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#c59b97] to-[#bda054] transition-all duration-300 ease-out"
              style={{ width: idx < currentIndex ? '100%' : idx === currentIndex ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>

      {/* Floating Header controls */}
      <div className="absolute top-10 left-6 right-6 flex justify-between items-center z-40 select-none">
        <div>
          <span className="font-inter text-[8px] tracking-[0.3em] text-[#c59b97] font-semibold uppercase block">
            {activeWish?.dayText}
          </span>
          {activeWish?.title && (
            <h2 className="font-playfair text-base font-medium text-white/90">
              {activeWish?.title}
            </h2>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/25 text-white p-2.5 rounded-full border border-white/5 cursor-pointer active:scale-95 transition-all shadow-md pointer-events-auto z-50"
            title="Close Slideshow"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Main Snap Horizontal Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth relative z-10"
      >
        {allSlides.map((slide, sIdx) => {
          const isGrandFinale = slide.id === 21;

          return (
            <div
              key={slide.id}
              className="w-full h-full shrink-0 snap-start flex items-center justify-center p-4 md:p-8 relative"
            >
              {/* Tap navigation triggers (like Instagram stories) */}
              <div
                onClick={handlePrev}
                className="absolute left-0 top-0 bottom-0 w-[20%] z-20 cursor-w-resize"
              />
              <div
                onClick={handleNext}
                className="absolute right-0 top-0 bottom-0 w-[20%] z-20 cursor-e-resize"
              />

              {/* Scrapbook slide window wrapper */}
              <div className={`w-full max-w-md md:max-w-lg aspect-[9/16] bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex flex-col justify-between relative overflow-hidden select-none z-10 animate-fade-in p-5 md:p-6`}>
                {/* Paper Tape decorative corner top-left */}
                {isGrandFinale && (
                  <div className="absolute -top-3 -left-10 w-24 h-8 bg-white/5 border-b border-white/5 rotate-[-35deg] pointer-events-none" />
                )}

                {isGrandFinale ? (
                  /* Custom Click-to-Reveal chat flow for 21st wish */
                  <div className="w-full h-full flex flex-col justify-between relative pointer-events-auto">
                    {/* Header bar */}
                    <div className="flex justify-between items-center pb-2.5 border-b border-white/10 select-none mb-3">
                      <span className="font-playfair text-[#c59b97] font-semibold text-xs tracking-wider uppercase">
                        The 21st Key
                      </span>
                      <span className="font-inter text-[9px] text-white/40 tracking-wider font-medium">
                        July 05
                      </span>
                    </div>

                    {/* Scrollable messages timeline box */}
                    <div className="flex-grow overflow-y-auto pr-1 flex flex-col gap-4 scrollbar-thin py-2">
                      {REVEAL_STEPS.slice(0, revealStep + 1).map((text, idx) => {
                        // Progressively increase sizes for emotional emphasis
                        let textStyles = "text-white/90 font-inter text-sm md:text-base leading-relaxed font-normal";
                        
                        if (idx === 4 || idx === 5) {
                          textStyles = "text-[#c59b97] font-playfair text-base md:text-lg font-bold tracking-wide";
                        } else if (idx === 9 || idx === 10) {
                          textStyles = "text-[#c59b97] font-playfair text-lg md:text-xl font-bold tracking-wide";
                        } else if (idx === 11) {
                          textStyles = "text-[#bda054] font-playfair text-2xl md:text-3xl font-extrabold text-center pt-6 animate-pulse leading-snug";
                        }

                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            className={`whitespace-pre-line ${textStyles}`}
                          >
                            {text}
                          </motion.div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Auto-revealing progress footer */}
                    <div className="pt-3 border-t border-white/10 flex flex-col items-center mt-3 z-30 select-none">
                      <span className="font-inter text-[8px] font-bold tracking-widest text-[#bda054] uppercase animate-pulse">
                        {revealStep < REVEAL_STEPS.length - 1 ? "⏳ Auto-revealing surprise..." : "🎉 The surprise is complete! 🎉"}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Regular Story Slide Layout (Fullscreen Image/Video Edit) */
                  <div className="w-full h-full relative flex items-center justify-center bg-[#1a1615]">
                    {slide.mediaType === 'photo' ? (
                      <img
                        src={slide.mediaUrl}
                        alt={slide.dayText}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      isEmbeddableVideo(slide.mediaUrl) ? (
                        <iframe
                          src={getEmbedVideoUrl(slide.mediaUrl)}
                          title={slide.dayText}
                          className="w-full h-full absolute inset-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={slide.mediaUrl}
                          controls
                          className="w-full h-full object-contain bg-black"
                        />
                      )
                    )}

                    {/* Floating Glass Day Label */}
                    <div className="absolute bottom-6 left-6 bg-black/45 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full z-20">
                      <span className="font-playfair text-sm text-[#c59b97] font-semibold tracking-wider">
                        {slide.dayText}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Side Arrow overlays for Desktop click interactions */}
      <div className="hidden md:flex absolute inset-y-0 left-6 items-center z-30 select-none pointer-events-none">
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="bg-white/5 hover:bg-white/10 text-white/60 hover:text-white p-3 rounded-full border border-white/5 cursor-pointer active:scale-95 transition-all pointer-events-auto shadow-lg"
          >
            <ChevronLeft size={20} />
          </button>
        )}
      </div>

      <div className="hidden md:flex absolute inset-y-0 right-6 items-center z-30 select-none pointer-events-none">
        {currentIndex < totalSlides - 1 && (
          <button
            onClick={handleNext}
            className="bg-white/5 hover:bg-white/10 text-white/60 hover:text-white p-3 rounded-full border border-white/5 cursor-pointer active:scale-95 transition-all pointer-events-auto shadow-lg"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
