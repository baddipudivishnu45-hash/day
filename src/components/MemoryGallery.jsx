import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function MemoryGallery() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-[65vh] md:h-[70vh] rounded-xl overflow-hidden border border-[#2c2825]/10 bg-white shadow-inner flex flex-col">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#faf8f5] z-10 space-y-3">
          <Loader2 className="w-8 h-8 text-[#c59b97] animate-spin" />
          <p className="font-inter text-xs tracking-widest uppercase text-[#5a544f] animate-pulse">
            Loading your gallery...
          </p>
        </div>
      )}
      <iframe
        src="https://galleryforuhh.vercel.app/"
        title="Personal Gallery"
        className="w-full h-full border-none"
        onLoad={() => setIsLoading(false)}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
}
