import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ParticleSystem from './ParticleSystem';

export default function HeroIntro({ name = "Rakshi", onStartStory }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0c0a09] px-4 select-none">
      {/* Background slowly swirling aurora */}
      <div className="absolute inset-0 bg-radial from-pink-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none scale-125" />
      <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-radial from-pink-500/5 to-transparent blur-3xl pointer-events-none animate-bg-glow" />

      {/* Particles background */}
      <ParticleSystem type="all" count={45} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="text-center z-10 max-w-4xl"
      >
        {/* Cute script tagline */}
        <motion.p
          variants={itemVariants}
          className="font-vibes text-4xl md:text-5xl text-pink-300 mb-6 drop-shadow-sm"
        >
          For my favorite person...
        </motion.p>

        {/* Large Cinematic Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-playfair text-5xl md:text-7xl lg:text-8xl font-medium tracking-wide mb-8 leading-tight"
        >
          <span className="text-stone-100">Happy Birthday, </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-lavender to-peach text-glow-pink">
            {name}
          </span>
          <span className="text-pink-300"> ❤️</span>
        </motion.h1>

        {/* Heartfelt Subtitle */}
        <motion.p
          variants={itemVariants}
          className="font-inter text-xs md:text-sm lg:text-base tracking-[0.2em] text-stone-400 uppercase max-w-xl mx-auto leading-relaxed mb-12"
        >
          You make the world a more beautiful and magical place, just by being in it.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onStartStory}
            className="glass-panel-glow hover:bg-white/10 text-pink-200 border-pink-300/30 px-8 py-3.5 rounded-full font-inter text-xs tracking-widest uppercase cursor-pointer hover:text-white transition-all duration-300 active:scale-95 glow-pink-hover pointer-events-auto"
          >
            Unfold Our Story
          </button>
        </motion.div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={onStartStory}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer pointer-events-auto group"
      >
        <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-stone-500 group-hover:text-pink-300 transition-colors duration-300">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-stone-500 group-hover:text-pink-300 transition-colors duration-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
