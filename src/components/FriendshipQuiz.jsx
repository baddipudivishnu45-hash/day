import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUESTIONS = [
  {
    id: 1,
    question: "Where did we meet for the first time?",
    options: [
      "Seventh Heaven",
      "Seven Hills",
      "Iceberg",
      "College Lab"
    ],
    answer: "Iceberg",
    correctMessage: "Correct! That sweet Iceberg moment started everything 🍦",
    incorrectMessage: "Wrong! Ayyoo, it was Iceberg where we met first! 😂"
  },
  {
    id: 2,
    question: "What game did we play almost every day in the beginning?",
    options: [
      "PUBG & Ludo",
      "Free Fire & 8 Ball Pool",
      "Valorant & Chess",
      "Clash of Clans & Subway Surfers"
    ],
    answer: "Free Fire & 8 Ball Pool",
    correctMessage: "Correct! You pro player winning games every day 🎱",
    incorrectMessage: "Wrong! We played FF and 8 Ball Pool every single day! 🎮"
  },
  {
    id: 3,
    question: "On your 2024 birthday at Seventh Heaven, what did I give you?",
    options: [
      "A beautiful card",
      "A rose gold ring",
      "A single chocolate",
      "A matching hoodie"
    ],
    answer: "A single chocolate",
    correctMessage: "Correct! I gave a chocolate while you gave me a gift 😂",
    incorrectMessage: "Wrong! I only gave you a chocolate back then 😭🍫"
  },
  {
    id: 4,
    question: "What did I list as our 'biggest enemy' in this friendship?",
    options: [
      "Fights",
      "Overthinking",
      "WAITING",
      "College lab externals"
    ],
    answer: "WAITING",
    correctMessage: "Yes! WAITING is our biggest enemy 😭 we must eliminate it!",
    incorrectMessage: "Wrong! WAITING is the enemy! We hate waiting to meet 😭"
  },
  {
    id: 5,
    question: "What happens if you don't speak softly to me?",
    options: [
      "I will block you on WhatsApp",
      "Gonthu kinda kaalu esi thokutha 😂",
      "I will ignore you for 3 days",
      "I will call your mom"
    ],
    answer: "Gonthu kinda kaalu esi thokutha 😂",
    correctMessage: "Correct! Don't make me do it 😂 smooth ga matladu!",
    incorrectMessage: "Wrong! Gonthu kinda kaalu esi thokutha was the warning! 😂"
  }
];

export default function FriendshipQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleOptionSelect = (option) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    const isCorrect = option === QUESTIONS[currentIdx].answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
      const isPerfectScore = score + (selectedOption === QUESTIONS[currentIdx].answer ? 1 : 0) === QUESTIONS.length;
      if (isPerfectScore) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#c59b97', '#bda054', '#ffffff']
        });
      }
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
  };

  const currentQuestion = QUESTIONS[currentIdx];
  const isAnswered = selectedOption !== null;
  const isSelectedCorrect = selectedOption === currentQuestion.answer;

  return (
    <div className="relative w-full min-h-[420px] flex flex-col items-center justify-center p-4">
      {/* Title */}
      <div className="text-center pb-6 border-b border-[#2c2825]/5 mb-8 select-none w-full">
        <h2 className="font-playfair text-2xl md:text-3xl font-semibold tracking-wide text-[#2c2825]">
          Friendship Trivia
        </h2>
        <p className="font-inter text-xs text-[#5a544f] mt-1 select-none">
          How well do you know our inside stories?
        </p>
      </div>

      <div className="w-full max-w-md flex flex-col">
        <AnimatePresence mode="wait">
          {!quizFinished ? (
            <motion.div
              key="question"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              {/* Question Progress bar */}
              <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-[#c59b97] uppercase">
                <span>QUESTION {currentIdx + 1} OF {QUESTIONS.length}</span>
                <span>SCORE: {score}</span>
              </div>
              <div className="w-full h-1 bg-[#2c2825]/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#c59b97] to-[#bda054] transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Heading */}
              <h3 className="font-playfair text-lg md:text-xl font-semibold text-[#2c2825] leading-relaxed">
                {currentQuestion.question}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option, idx) => {
                  const isOptionSelected = selectedOption === option;
                  const isCorrectAnswer = option === currentQuestion.answer;
                  
                  let optionStyles = "bg-white border-[#2c2825]/10 text-[#2c2825] hover:border-[#c59b97]/50 hover:bg-[#faf8f5]";
                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      optionStyles = "bg-emerald-50 border-emerald-500/20 text-emerald-800";
                    } else if (isOptionSelected) {
                      optionStyles = "bg-rose-50 border-rose-500/20 text-rose-800";
                    } else {
                      optionStyles = "bg-white border-[#2c2825]/5 opacity-65";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-xl border text-left font-inter text-xs md:text-sm transition-all duration-200 cursor-pointer flex items-center justify-between
                        ${optionStyles}
                        ${!isAnswered ? 'hover:scale-[1.01]' : ''}
                      `}
                    >
                      <span>{option}</span>
                      {isAnswered && isCorrectAnswer && <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
                      {isAnswered && isOptionSelected && !isCorrectAnswer && <XCircle size={16} className="text-rose-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanatory bubble */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-xl border text-xs leading-relaxed font-medium flex items-start gap-2.5
                      ${isSelectedCorrect 
                        ? 'bg-emerald-50/50 border-emerald-500/20 text-emerald-800' 
                        : 'bg-rose-50/50 border-rose-500/20 text-rose-800'
                      }
                    `}
                  >
                    <span className="text-base leading-none">{isSelectedCorrect ? "🎉" : "😭"}</span>
                    <p>{isSelectedCorrect ? currentQuestion.correctMessage : currentQuestion.incorrectMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              {isAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNext}
                    className="bg-[#c59b97] hover:bg-[#b98c88] text-white px-6 py-3 rounded-full text-xs font-inter font-bold tracking-widest uppercase cursor-pointer transition-all duration-300 shadow-[0_6px_15px_rgba(197,155,151,0.25)] flex items-center gap-1 active:scale-98"
                  >
                    {currentIdx < QUESTIONS.length - 1 ? "Next Question" : "View Results"}
                    <ChevronRight size={13} />
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            /* Quiz Completed scoreboard */
            <motion.div
              key="finished"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border border-[#c59b97]/20 rounded-3xl p-8 shadow-[0_10px_35px_rgba(197,155,151,0.08)] flex flex-col items-center relative overflow-hidden text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#c59b97]/10 flex items-center justify-center text-3xl mb-4 shadow-inner">
                {score === QUESTIONS.length ? "🏆" : "🫂"}
              </div>

              <span className="font-inter text-[8px] font-bold tracking-[0.3em] text-[#c59b97] uppercase mb-1">
                TEST COMPLETED
              </span>

              <h3 className="font-playfair text-2xl font-semibold tracking-wide text-[#2c2825] mb-3">
                {score === QUESTIONS.length ? "You Are The Real Rakshi!" : "Nicely Played!"}
              </h3>

              {/* Circular Score Visualizer */}
              <div className="relative w-28 h-28 flex items-center justify-center my-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#eeebe3"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#c59b97"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * score) / QUESTIONS.length}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="font-playfair text-3xl font-bold text-[#2c2825]">{score}/{QUESTIONS.length}</span>
                  <span className="font-inter text-[7px] font-bold tracking-wider text-[#5a544f] uppercase">Score</span>
                </div>
              </div>

              <p className="font-vibes text-2xl text-[#bda054] leading-relaxed px-4 max-w-xs mb-8">
                {score === QUESTIONS.length 
                  ? '"You know us perfectly! May our beautiful bond shine forever 🤍"'
                  : '"Not bad! You know a lot, but you can get a perfect score. Try again!"'
                }
              </p>

              <button
                onClick={handleReset}
                className="bg-[#c59b97] hover:bg-[#b98c88] text-white px-8 py-3 rounded-full text-xs font-inter font-bold tracking-widest uppercase cursor-pointer transition-all duration-300 shadow-[0_6px_15px_rgba(197,155,151,0.25)] flex items-center gap-1.5 active:scale-98"
              >
                <RefreshCw size={11} />
                {score === QUESTIONS.length ? "Play Again" : "Retry Test"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
