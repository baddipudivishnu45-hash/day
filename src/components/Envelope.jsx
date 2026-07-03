import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, CheckCircle2, Mail } from 'lucide-react';

export default function Envelope({ title, indexText, dateText, onClick, isPhoto = false, hasUploadedPhotos = false }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - (box.width / 2);
    const y = e.clientY - box.top - (box.height / 2);
    
    // Subtly rotate card maximum 8 degrees
    const rX = -(y / (box.height / 2)) * 8;
    const rY = (x / (box.width / 2)) * 8;
    
    setRotate({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        y: rotate.x !== 0 ? -6 : 0,
        scale: rotate.x !== 0 ? 1.02 : 1
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`relative p-6 flex flex-col justify-between cursor-pointer w-full aspect-[1.45/1] select-none group transition-all duration-300 rounded-2xl border
        ${isPhoto
          ? 'bg-white/40 backdrop-blur-md border-dashed border-[#c59b97]/30 hover:border-[#c59b97]/70 shadow-sm'
          : 'bg-white border-[#c59b97]/15 shadow-[0_8px_30px_rgba(44,40,37,0.02)] hover:shadow-[0_20px_40px_rgba(197,155,151,0.1)]'
        }
      `}
    >
      {/* Decorative inner line envelope frame */}
      <div className={`absolute inset-2.5 border rounded-xl pointer-events-none transition-colors duration-300
        ${isPhoto ? 'border-[#c59b97]/10' : 'border-[#2c2825]/5 group-hover:border-[#c59b97]/15'}`} 
      />

      {/* Progress status for photos */}
      {isPhoto && hasUploadedPhotos && (
        <div 
          style={{ transform: 'translateZ(25px)' }}
          className="absolute top-4 left-4 flex items-center gap-1.5 z-10 bg-[#c59b97]/10 px-2.5 py-1 rounded-full border border-[#c59b97]/20"
        >
          <CheckCircle2 size={11} className="text-[#c59b97]" />
          <span className="font-inter text-[8px] font-semibold tracking-widest text-[#c59b97] uppercase">Uploaded</span>
        </div>
      )}

      {/* Top row: postmark stamp & stamp placement */}
      <div className="flex justify-between items-start z-10 w-full">
        {/* Postmark stamp */}
        <div 
          style={{ transform: 'translateZ(12px)' }}
          className="text-[8px] tracking-[0.2em] font-mono text-[#2c2825]/30 group-hover:text-[#c59b97]/40 uppercase flex flex-col pointer-events-none mt-1 pl-1 transition-colors"
        >
          <span>{indexText}</span>
          <span>{isPhoto ? 'Your photos' : 'Surprise ed.'}</span>
        </div>

        {/* Vintage Stamp */}
        <div 
          style={{ transform: 'translateZ(22px)' }}
          className={`w-10 h-12 border-dashed rounded p-1 flex flex-col items-center justify-center relative shadow-inner rotate-3 group-hover:rotate-6 transition-transform duration-300
            ${isPhoto ? 'bg-[#fcfbf9] border border-dashed border-[#c59b97]/40' : 'bg-[#fcfbf9] border border-dashed border-[#c59b97]'}`}
        >
          {isPhoto
            ? <Camera size={12} className="text-[#c59b97]" />
            : <Mail size={12} className="text-[#c59b97]" />
          }
          <span className="text-[6px] text-[#c59b97] font-serif mt-1 tracking-tighter uppercase font-bold">
            {isPhoto ? 'Photo' : 'Post'}
          </span>
        </div>
      </div>

      {/* Middle row: classic editorial title & cursive subtitle */}
      <div 
        style={{ transform: 'translateZ(25px)' }}
        className="text-center my-auto z-10"
      >
        <h3 className="font-playfair text-xl md:text-2xl font-semibold tracking-wide text-[#2c2825] group-hover:text-[#c59b97] transition-colors duration-300 leading-snug">
          {title}
        </h3>
        {dateText && (
          <p className="font-vibes text-lg text-[#bda054] mt-1 select-none tracking-wide">
            {dateText}
          </p>
        )}
      </div>

      {/* Bottom row: action label & wax seal button */}
      <div className="flex justify-between items-center z-10 w-full pl-1">
        <span 
          style={{ transform: 'translateZ(12px)' }}
          className="text-[8px] font-inter tracking-widest text-[#2c2825]/40 group-hover:text-[#c59b97] uppercase pointer-events-none transition-colors duration-300"
        >
          {isPhoto ? 'Click to upload' : 'Click to unseal'}
        </span>

        {/* 3D Wax Seal Button */}
        <div 
          style={{ transform: 'translateZ(32px)' }}
          className="w-8 h-8 rounded-full bg-[#c59b97] flex items-center justify-center shadow-md group-hover:shadow-[0_4px_12px_rgba(197,155,151,0.45)] group-hover:scale-105 transition-all duration-300"
        >
          <div className="w-5.5 h-5.5 rounded-full border border-white/20 flex items-center justify-center">
            {isPhoto
              ? <Camera size={9} className="text-white" />
              : <Mail size={9} className="text-white" />
            }
          </div>
        </div>
      </div>
    </motion.div>
  );
}
