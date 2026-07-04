import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function SecretLetter({ isEmbedded = false }) {
  const [isOpen, setIsOpen] = useState(isEmbedded);
  const [typedText, setTypedText] = useState("");
  const [isDoneTyping, setIsDoneTyping] = useState(false);

  const fullText = `Dearest Rakshi,
From the moment you walked into my life, everything slowly started changing.
Even though you’re not my childhood friend… you still became the best one. 🤍
Mana friendship age almost 4 years ey kada… from Inter second year till now.
And in these years, we’ve literally seen every emotion together — crying, sadness, happiness, anger, jealousy, fights, laughter… everything 😭
And honestly Rakshiiii… only you know how many times I cried.
There were so many ups and downs, but no matter what came between us, we never gave up on our bond.
You came back, I came back… somehow we always saved us.
And when it comes to protecting this friendship, I’ll be like Hanuman to Rama 😭🤍
Recent times lo nenu ela feel avthunano neeku telusu… and thank you for being there through all my badhalu, sachipoina kalalu, overthinking, and everything.
Even when I yell at you sometimes 😭 it’s only because I never want distance between us.
And Rakshiiiiii smooth ga matladadam konchem nerchuko ledante gonthu kinda kaalu esi thokutha 😂
And our biggest enemy in this friendship? WAITING 😭
Please eliminate that asap.
The saddest part is… we haven’t met recently.
Alexa play: “It’s been a long day without you my friend…” 🎶😭
so ur meeting me soon!!!
Ayyooo see… inni matalu chepthu actual main thing eh marchipoya 😭
Happy Birthday to my what ahh?? My best one? 🤍 Beautiful girl? 😭 Supportive one? 🫂 Sometimes childish? 😂
Nahhh nahhh…
You’re the perfect combination of all these things.
So there you gooooo —
“Happiest Birthday to my best, beautiful, supportive gurllll!” 🎂🤍
No no… not “one of the best.”
You are THE ONE Rakshiiiiii.
And one more thing Rakshiiii 🤍
I really want you to come to my college for the next event… so we can finally make your dream come true 😭✨
Trust me, seeing you there would make me the happiest person in the world 🫂
And ik you’ll come 😭🤍
Because some moments are meant to happen… and this is definitely one of them 🫂✨

I hope this birthday brings that this evani nen chepan rakshi!
Nuv happy ga unte chalu 🤍
With all my efforts,
Always.
Urs Vishnu(Amore)`;

  useEffect(() => {
    if (!isOpen) return;

    let index = 0;
    setTypedText("");
    setIsDoneTyping(false);

    const type = () => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;

        const nextChar = fullText[index - 1];
        let delay = 20;
        if (nextChar === '.' || nextChar === '?' || nextChar === '!') delay = 350;
        else if (nextChar === ',') delay = 180;
        else if (nextChar === '\n') delay = 120;

        setTimeout(type, delay);
      } else {
        setIsDoneTyping(true);
      }
    };

    const startTimeout = setTimeout(type, 800); // Start typing shortly after letter opens

    return () => clearTimeout(startTimeout);
  }, [isOpen]);

  return (
    <div className="relative z-10 w-full flex flex-col items-center">
      <div className="max-w-2xl w-full">
        {/* Subtle interior letter header decoration */}
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-[#2c2825]/5 select-none">
          <span className="font-inter text-[9px] tracking-[0.25em] text-[#c59b97] font-semibold uppercase">
            Personal Correspondence
          </span>
          <Heart className="text-[#c59b97] w-3.5 h-3.5 fill-[#c59b97]/15" />
        </div>

        {/* Letter Content Area */}
        <div className="min-h-[300px] py-4">
          <p className="font-vibes text-2xl md:text-3xl text-[#bda054] select-none leading-relaxed whitespace-pre-line tracking-wide">
            {typedText}
            {/* Blinking Typewriter Cursor */}
            {!isDoneTyping && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1.5 h-6 bg-[#c59b97] ml-1 translate-y-[2px]"
              />
            )}
          </p>
        </div>

        {/* Small decorative wax seal style footer */}
        {isDoneTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
            className="mt-8 pt-4 border-t border-[#2c2825]/5 flex items-center justify-between"
          >
            <span className="font-inter text-[8px] tracking-[0.1em] text-[#5a544f] uppercase">
              Hand-signed message
            </span>
            <span className="font-vibes text-xl text-[#c59b97] select-none mr-2">
              With Love
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
