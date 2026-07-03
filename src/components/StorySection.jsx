import React from 'react';
import { motion } from 'framer-motion';
import { usePhotos } from './PhotoContext';
import story1 from '../assets/story1.jpg';
import story2 from '../assets/story2.jpg';
import story3 from '../assets/story3.jpg';

function StoryChapter({ title, subtitle, date, description, imageUrl, isReverse }) {
  return (
    <div className="py-12 border-b border-[#2c2825]/5 last:border-b-0">
      <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${isReverse ? 'md:flex-row-reverse' : ''}`}>

        {/* Text Container */}
        <div className={`md:col-span-6 space-y-4 ${isReverse ? 'md:order-2' : ''}`}>
          {/* Chapter Date/Badge */}
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-6 bg-[#c59b97]" />
            <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-[#c59b97] font-semibold">
              {date}
            </span>
          </div>

          {/* Chapter Title */}
          <h3 className="font-playfair text-2xl md:text-3xl font-medium tracking-wide text-[#2c2825]">
            {title}
          </h3>

          {/* Handwritten Subtitle */}
          <p className="font-vibes text-2xl text-[#bda054] select-none">
            {subtitle}
          </p>

          {/* Description Card */}
          <div className="bg-[#faf8f5] border border-[#2c2825]/10 rounded-xl p-5 relative overflow-hidden shadow-inner">
            <div className="absolute top-0 left-0 w-[2px] h-full bg-[#c59b97]" />
            <p className="font-inter text-xs md:text-sm text-[#5a544f] leading-relaxed font-light whitespace-pre-line">
              {description}
            </p>
          </div>
        </div>

        {/* Image Container */}
        <div className={`md:col-span-6 flex justify-center ${isReverse ? 'md:order-1' : ''}`}>
          {/* Polaroid container */}
          <motion.div
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="bg-white p-3.5 pb-8 rounded-lg border border-[#2c2825]/10 shadow-md rotate-1 max-w-[270px] w-full transition-transform"
          >
            {/* Photo Wrap */}
            <div className="w-full aspect-[4/5] rounded overflow-hidden bg-[#faf8f5] relative mb-3">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover grayscale-[15%] brightness-[96%]"
                loading="lazy"
              />
            </div>
            {/* Polaroid handwritten caption */}
            <div className="text-center font-vibes text-xl text-[#5a544f] mt-1 select-none">
              {subtitle}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

export default function StorySection() {
  const { photos } = usePhotos();

  const defaultImages = [story1, story2, story3];

  const chapters = [
    {
      title: "The Day We Met",
      subtitle: "Where everything began...",
      date: "Chapter I",
      description: `I may not remember the exact date or the day…  
but I’ll always remember that moment.
Our lab externals.  
Everything was so random, yet somehow it became the start of something special.
You looked so tensed and confused at first, and honestly, the whole atmosphere felt stressful. But later, when you helped me finish the answers, that small moment stayed with me more than the exam itself.
Funny how friendships start, right?  
Not with big plans or perfect timings… but in the middle of chaos, stress, and unfinished answers.
And that day… without us even realizing it, became the beginning of our story.  
A memory I’ll never forget.`,
      imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      isReverse: false
    },
    {
      title: "Our Best Memories",
      subtitle: "Laughter, roads, and late nights",
      date: "Chapter II",
      description: `There were many beautiful moments in my life… but the best one will always be meeting you for the first time at Iceberg. That simple moment became a forever memory for me
And then your 2024 birthday memory at Seventh Heaven 😭
It was your birthday, yet you were the one who gave me a gift while I only gave you a chocolate 😂
Still, that moment felt so special to me.
And how can we forget the legendary lipstick drama at Seven Hills 😂
The chaos, the fun, and that whole moment still makes me smile every time I remember it.
Funny how these small random moments became my favorite memories with you`,

      isReverse: true
    },
    {
      title: "The Little Things",
      subtitle: "Written in the stars",
      date: "Chapter III",
      description: `Funny how we used to play games like Free Fire and 8 Ball Pool in the beginning 😭
We used to play almost every day, and somehow you were always the one winning. Pro player eyuuuuu 😂
Those little moments, those silly games… they genuinely made me so happy.
And slowly, without even realizing it, you became so close to me… like my daily diary, the person I tell everything to.
Even though we fight over the smallest things sometimes, the bond never changes… and honestly, I hope it never does. 🤍
`,
      imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
      isReverse: false
    }
  ];

  // Merge context photos, fallback local imports, and fallback Unsplash links
  const mergedChapters = chapters.map((chapter, idx) => {
    const uploadedPhoto = photos.story ? photos.story[idx] : null;
    const fallbackLocal = defaultImages[idx];
    return {
      ...chapter,
      imageUrl: uploadedPhoto || fallbackLocal || chapter.imageUrl
    };
  });

  return (
    <div className="relative">
      {/* Intro Header */}
      <div className="text-center pb-8 border-b border-[#2c2825]/5 mb-4 select-none">
        <h2 className="font-playfair text-2xl md:text-3xl font-medium tracking-wide mb-1 text-[#2c2825]">
          Our Chapters
        </h2>
        <p className="font-vibes text-xl text-[#c59b97]">
          A small walk down memory lane...
        </p>
      </div>

      {/* Chapters list */}
      <div className="space-y-6">
        {mergedChapters.map((chapter, idx) => (
          <StoryChapter
            key={idx}
            title={chapter.title}
            subtitle={chapter.subtitle}
            date={chapter.date}
            description={chapter.description}
            imageUrl={chapter.imageUrl}
            isReverse={chapter.isReverse}
          />
        ))}
      </div>
    </div>
  );
}
