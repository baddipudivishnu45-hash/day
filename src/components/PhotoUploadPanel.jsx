import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Camera, Image, CheckCircle2 } from 'lucide-react';
import { usePhotos } from './PhotoContext';

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function PhotoSlot({ label, photo, onUpload, onClear, isProfile = false }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const dataUrl = await fileToDataUrl(file);
    onUpload(dataUrl);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleClick = () => {
    if (!photo) inputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-inter text-[9px] tracking-[0.2em] text-[#5a544f] uppercase">{label}</span>

      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer group
          ${isProfile ? 'aspect-square w-full' : 'aspect-[4/5] w-full'}
          ${photo ? 'border-[#c59b97]/40' : isDragging ? 'border-[#c59b97] bg-[#c59b97]/5' : 'border-dashed border-[#2c2825]/20 hover:border-[#c59b97]/50 hover:bg-[#faf8f5]'}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {photo ? (
          <>
            <img
              src={photo}
              alt={label}
              className="w-full h-full object-cover"
            />
            {/* Overlay on hover with remove */}
            <div className="absolute inset-0 bg-[#2c2825]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                className="bg-white/90 text-[#2c2825] text-[9px] tracking-widest uppercase font-inter px-3 py-1.5 rounded cursor-pointer hover:bg-white transition-colors flex items-center gap-1.5"
              >
                <Camera size={11} />
                Change
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onClear(); }}
                className="bg-transparent text-white/80 text-[9px] tracking-widest uppercase font-inter px-3 py-1 rounded cursor-pointer hover:text-white transition-colors flex items-center gap-1.5"
              >
                <X size={11} />
                Remove
              </button>
            </div>

            {/* Uploaded badge */}
            <div className="absolute top-1.5 right-1.5 bg-white rounded-full p-0.5 shadow-sm">
              <CheckCircle2 size={12} className="text-[#c59b97] fill-[#c59b97]/10" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 p-3 select-none">
            <div className="w-8 h-8 rounded-full bg-[#faf8f5] border border-[#2c2825]/10 flex items-center justify-center group-hover:border-[#c59b97]/30 transition-colors">
              <Upload size={14} className="text-[#5a544f]/50 group-hover:text-[#c59b97] transition-colors" />
            </div>
            <span className="font-inter text-[8px] text-[#5a544f]/50 text-center leading-tight group-hover:text-[#5a544f] transition-colors">
              Click or<br />drag & drop
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PhotoUploadPanel() {
  const { photos, setProfilePhoto, setStoryPhoto, setGalleryPhoto, clearPhoto } = usePhotos();

  const storyLabels = [
    "Chapter 1: The Day We Met",
    "Chapter 2: Our Best Memories",
    "Chapter 3: Moments I'll Never Forget"
  ];

  const galleryLabels = [
    "Memory 1", "Memory 2", "Memory 3",
    "Memory 4", "Memory 5", "Memory 6"
  ];

  const storyCount = (photos.story || []).filter(Boolean).length;
  const galleryCount = (photos.gallery || []).filter(Boolean).length;
  const uploadedCount = galleryCount + storyCount + (photos.profile ? 1 : 0);
  const totalSlots = 10;

  return (
    <div className="relative">
      {/* Section Header */}
      <div className="text-center pb-8 border-b border-[#2c2825]/5 mb-8 select-none">
        <h2 className="font-playfair text-2xl md:text-3xl font-medium tracking-wide mb-1 text-[#2c2825]">
          Upload Your Photos
        </h2>
        <p className="font-vibes text-xl text-[#c59b97]">
          Make these memories yours...
        </p>
      </div>

      {/* Upload count pill */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-2 bg-[#faf8f5] border border-[#2c2825]/10 rounded-full px-4 py-1.5 shadow-inner">
          <Image size={12} className="text-[#c59b97]" />
          <span className="font-inter text-[9px] tracking-widest text-[#5a544f] uppercase">
            {uploadedCount} of {totalSlots} photos uploaded
          </span>
        </div>
      </div>

      {/* Profile Photo */}
      <div className="mb-8">
        <p className="font-inter text-[10px] tracking-[0.25em] text-[#c59b97] font-semibold uppercase mb-3">
          Profile Photo
        </p>
        <div className="max-w-[180px]">
          <PhotoSlot
            label="Your portrait"
            photo={photos.profile}
            onUpload={setProfilePhoto}
            onClear={() => clearPhoto('profile')}
            isProfile={true}
          />
        </div>
      </div>

      {/* Story Divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-[1px] bg-[#2c2825]/5" />
        <span className="font-inter text-[9px] tracking-[0.2em] text-[#5a544f]/50 uppercase">Our Story Chapters — 3 Photos</span>
        <div className="flex-1 h-[1px] bg-[#2c2825]/5" />
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {storyLabels.map((label, i) => (
          <PhotoSlot
            key={i}
            label={label}
            photo={photos.story ? photos.story[i] : null}
            onUpload={(url) => setStoryPhoto(i, url)}
            onClear={() => clearPhoto('story', i)}
          />
        ))}
      </div>

      {/* Gallery Divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-[1px] bg-[#2c2825]/5" />
        <span className="font-inter text-[9px] tracking-[0.2em] text-[#5a544f]/50 uppercase">Memory Gallery — 6 Photos</span>
        <div className="flex-1 h-[1px] bg-[#2c2825]/5" />
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {galleryLabels.map((label, i) => (
          <PhotoSlot
            key={i}
            label={label}
            photo={photos.gallery[i]}
            onUpload={(url) => setGalleryPhoto(i, url)}
            onClear={() => clearPhoto('gallery', i)}
          />
        ))}
      </div>

      {/* Footer note */}
      <p className="font-inter text-[8px] tracking-widest text-[#5a544f]/40 text-center mt-8 uppercase select-none">
        Photos are saved to your browser — no data leaves your device
      </p>
    </div>
  );
}
