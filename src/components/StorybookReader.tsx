import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Lightbulb,
  Maximize2
} from 'lucide-react';
import { STORYBOOK_PAGES } from '../data/storybookData';

interface StorybookReaderProps {
  onGoToWorksheets?: () => void;
}

export const StorybookReader: React.FC<StorybookReaderProps> = ({ onGoToWorksheets }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [activeTab, setActiveTab] = useState<'story' | 'notes' | 'vocab' | 'quiz'>('story');

  const currentPage = STORYBOOK_PAGES[currentPageIndex];

  useEffect(() => {
    setSelectedQuizAnswer(null);
    setShowQuizResult(false);
    setActiveTab('story');
  }, [currentPageIndex]);

  const handleNextPage = () => {
    if (currentPageIndex < STORYBOOK_PAGES.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  // Scene visual badge themes
  const getThemeBadge = (theme: string) => {
    switch (theme) {
      case 'intro':
        return { bg: 'bg-amber-300 text-slate-900 border-2 border-slate-900', icon: BookOpen, label: 'Story Introduction' };
      case 'research':
        return { bg: 'bg-cyan-300 text-slate-900 border-2 border-slate-900', icon: Lightbulb, label: 'Market Research' };
      case 'strategy':
        return { bg: 'bg-emerald-300 text-slate-900 border-2 border-slate-900', icon: TrendingUp, label: 'Supply & Demand' };
      case 'line':
        return { bg: 'bg-indigo-300 text-slate-900 border-2 border-slate-900', icon: Sparkles, label: 'The Mall Drop' };
      case 'flip_success':
        return { bg: 'bg-emerald-400 text-slate-900 border-2 border-slate-900', icon: CheckCircle2, label: 'First Big Profit (+$50)' };
      case 'hype':
        return { bg: 'bg-purple-300 text-slate-900 border-2 border-slate-900', icon: AlertTriangle, label: 'Celebrity Hype & FOMO' };
      case 'all_in':
        return { bg: 'bg-rose-400 text-slate-900 border-2 border-slate-900', icon: AlertTriangle, label: 'High Risk "All-In"' };
      case 'restock_crash':
        return { bg: 'bg-rose-500 text-white border-2 border-slate-900', icon: TrendingDown, label: 'The Bubble Bursts (1M Restock)' };
      case 'sad_lesson':
        return { bg: 'bg-orange-300 text-slate-900 border-2 border-slate-900', icon: AlertTriangle, label: 'Facing the -$600 Loss' };
      case 'smart_rebound':
        return { bg: 'bg-teal-300 text-slate-900 border-2 border-slate-900', icon: TrendingUp, label: 'Smart Investing Recovery' };
      default:
        return { bg: 'bg-slate-200 text-slate-900 border-2 border-slate-900', icon: BookOpen, label: 'Educator Summary' };
    }
  };

  const badgeInfo = getThemeBadge(currentPage.theme);
  const BadgeIcon = badgeInfo.icon;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4" id="storybook-reader-container">
      {/* Scene Thumbnails Strip (Top for high visibility) */}
      <div className="bg-white p-3 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {STORYBOOK_PAGES.map((page, idx) => {
            const isActive = idx === currentPageIndex;
            return (
              <button
                key={idx}
                id={`scene-thumbnail-${page.pageNumber}`}
                onClick={() => setCurrentPageIndex(idx)}
                className={`px-3.5 py-2 text-xs font-black uppercase tracking-wider transition flex items-center gap-2 border-2 border-slate-900 cursor-pointer ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5'
                    : 'bg-white hover:bg-slate-100 text-slate-800 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                <span>P.{page.pageNumber}</span>
                <span className="font-bold text-[11px] truncate max-w-[140px]">
                  {page.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Interactive Book Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Scene & Pedagogical Illustration Card */}
        <div className="lg:col-span-5 bg-cyan-100 border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] space-y-5 flex flex-col justify-between min-h-[520px]">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="bg-white border-2 border-slate-900 p-2 inline-block transform -rotate-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <BadgeIcon className="w-3.5 h-3.5 text-orange-500" />
                  {badgeInfo.label}
                </span>
              </div>
              <span className="text-xs font-black uppercase px-2.5 py-1 bg-white border-2 border-slate-900 text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                {currentPage.economicConcept}
              </span>
            </div>

            {/* Custom Scene Visual Artwork in Geometric Slate Box */}
            <div className="relative w-full rounded-none bg-slate-900 border-3 border-slate-900 p-5 flex flex-col justify-between text-white shadow-[6px_6px_0px_0px_rgba(6,182,212,1)] min-h-[260px]">
              <div className="flex justify-between items-start">
                <div className="bg-white border-2 border-slate-900 px-2.5 py-1 text-slate-900 text-[11px] font-black uppercase font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  SCENE #{currentPage.pageNumber} • {currentPage.theme.toUpperCase()}
                </div>
                <div className="text-3xl">
                  {currentPage.pageNumber === 1 && '📊'}
                  {currentPage.pageNumber === 2 && '📱'}
                  {currentPage.pageNumber === 3 && '💻'}
                  {currentPage.pageNumber === 4 && '📈'}
                  {currentPage.pageNumber === 5 && '🛍️'}
                  {currentPage.pageNumber === 6 && '💵'}
                  {currentPage.pageNumber === 7 && '🌟'}
                  {currentPage.pageNumber === 8 && '😰'}
                  {currentPage.pageNumber === 9 && '💥'}
                  {currentPage.pageNumber === 10 && '😔'}
                  {currentPage.pageNumber === 11 && '📝'}
                  {currentPage.pageNumber === 12 && '🎓'}
                </div>
              </div>

              {/* Dynamic Visual Scene Element */}
              <div className="space-y-2 my-4">
                {currentPage.pageNumber === 1 && (
                  <div className="bg-slate-800 border-2 border-cyan-400 p-3 shadow-[3px_3px_0px_0px_rgba(6,182,212,1)]">
                    <div className="text-xs text-cyan-400 font-black uppercase tracking-wider mb-1">Merrick & Malik's Lab</div>
                    <div className="text-sm font-bold text-white">"Sneaker Economics: Supply 🍏 ➔ Demand 🥪 ➔ Hype Risk ⚠️"</div>
                  </div>
                )}

                {currentPage.pageNumber === 4 && (
                  <div className="bg-slate-800 border-2 border-emerald-400 p-3 shadow-[3px_3px_0px_0px_rgba(16,185,129,1)]">
                    <div className="text-xs text-emerald-400 font-black uppercase mb-1">The Golden Equation</div>
                    <div className="text-sm font-bold text-white">Low Supply (2,000 pairs) + High Demand (10,000 buyers) = Price ↑</div>
                  </div>
                )}

                {currentPage.pageNumber === 6 && (
                  <div className="bg-slate-800 border-2 border-green-400 p-3 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
                    <div className="text-xs text-green-400 font-black uppercase mb-1">Malik's First Flip: Neon Drifters</div>
                    <div className="text-sm text-white font-mono font-bold">Cost: $100 | Sold: $150 | Net Profit: +$50.00 (50% ROI)</div>
                  </div>
                )}

                {currentPage.pageNumber === 8 && (
                  <div className="bg-slate-800 border-2 border-rose-400 p-3 shadow-[3px_3px_0px_0px_rgba(244,63,94,1)]">
                    <div className="text-xs text-rose-400 font-black uppercase mb-1">Concentration Risk Alert</div>
                    <div className="text-sm text-white font-bold">Malik went "ALL-IN" on 3 pairs @ $300 each ($900 total savings spent!)</div>
                  </div>
                )}

                {currentPage.pageNumber === 9 && (
                  <div className="bg-slate-800 border-2 border-orange-500 p-3 shadow-[3px_3px_0px_0px_rgba(249,115,22,1)]">
                    <div className="text-xs text-orange-400 font-black uppercase mb-1">Factory Restock Shock!</div>
                    <div className="text-sm text-white font-bold">Company dropped 1,000,000 pairs! Market Value crashed $300 ➔ $100</div>
                  </div>
                )}

                {currentPage.pageNumber === 10 && (
                  <div className="bg-slate-800 border-2 border-amber-400 p-3 shadow-[3px_3px_0px_0px_rgba(251,191,36,1)]">
                    <div className="text-xs text-amber-300 font-black uppercase mb-1">Merrick's Lesson</div>
                    <div className="text-sm text-slate-100 font-bold">"You bought based on feeling, not facts. The trend was a bubble, and bubbles pop."</div>
                  </div>
                )}

                {currentPage.pageNumber === 11 && (
                  <div className="bg-slate-800 border-2 border-cyan-400 p-3 shadow-[3px_3px_0px_0px_rgba(6,182,212,1)]">
                    <div className="text-xs text-cyan-400 font-black uppercase mb-1">The Smart Investor Mindset</div>
                    <div className="text-sm text-white font-bold">"The best flip isn't about being fast—it's about being smart."</div>
                  </div>
                )}

                {![1, 4, 6, 8, 9, 10, 11].includes(currentPage.pageNumber) && (
                  <div className="bg-slate-800/90 p-3 border border-slate-700">
                    <div className="text-xs text-amber-300 font-black uppercase mb-1">Scene Summary</div>
                    <div className="text-xs text-slate-200 line-clamp-2 font-medium">{currentPage.illustrationDescription}</div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>THE SNEAKER FLIP</span>
                <span className="text-cyan-400 font-bold">PAGE {currentPage.pageNumber}</span>
              </div>
            </div>
          </div>

          {/* Quick Concept Callout Box */}
          <div className="bg-white border-3 border-slate-900 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex items-start gap-3">
            <div className="w-9 h-9 bg-orange-500 border-2 border-slate-900 flex items-center justify-center text-white font-black text-base shrink-0 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              💡
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Merrick's Math Rule
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 mt-1 leading-snug font-bold">
                {currentPage.merricksNote}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Text & Tab Content */}
        <div className="lg:col-span-7 bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] space-y-5 flex flex-col justify-between min-h-[520px]">
          <div>
            {/* Tab navigation for interactive learning */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] mb-6">
              <button
                id="tab-story"
                onClick={() => setActiveTab('story')}
                className={`flex-1 py-2 px-3 text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'story'
                    ? 'bg-orange-500 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Story</span>
              </button>

              <button
                id="tab-vocab"
                onClick={() => setActiveTab('vocab')}
                className={`flex-1 py-2 px-3 text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'vocab'
                    ? 'bg-cyan-400 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vocab ({currentPage.vocabulary.length})</span>
              </button>

              {currentPage.quizQuestion && (
                <button
                  id="tab-quiz"
                  onClick={() => setActiveTab('quiz')}
                  className={`flex-1 py-2 px-3 text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'quiz'
                      ? 'bg-emerald-400 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Check Understanding</span>
                </button>
              )}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'story' && (
                <motion.div
                  key={`story-${currentPage.pageNumber}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                    {currentPage.title}
                  </h3>
                  <div className="space-y-3 text-slate-800 text-base sm:text-lg leading-relaxed whitespace-pre-line font-medium">
                    {currentPage.narrative}
                  </div>
                </motion.div>
              )}

              {activeTab === 'vocab' && (
                <motion.div
                  key={`vocab-${currentPage.pageNumber}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-3"
                >
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                    Key Financial Terms for this Scene
                  </h3>
                  <div className="space-y-3">
                    {currentPage.vocabulary.map((v, i) => (
                      <div key={i} className="p-4 bg-cyan-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                        <div className="font-black text-slate-900 text-sm flex items-center gap-2 uppercase tracking-wide">
                          <span className="w-3 h-3 bg-orange-500 border border-slate-900"></span>
                          {v.word}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 mt-1 leading-snug font-medium">
                          {v.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'quiz' && currentPage.quizQuestion && (
                <motion.div
                  key={`quiz-${currentPage.pageNumber}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-widest bg-emerald-300 border-2 border-slate-900 px-3 py-1 inline-block">
                    <HelpCircle className="w-4 h-4 inline mr-1" />
                    <span>Quick Comprehension Check</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900">
                    {currentPage.quizQuestion.question}
                  </h4>

                  <div className="space-y-2.5">
                    {currentPage.quizQuestion.options.map((opt, idx) => {
                      const isSelected = selectedQuizAnswer === idx;
                      const isCorrect = idx === currentPage.quizQuestion!.correctIndex;
                      let btnStyle = "bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]";

                      if (showQuizResult) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-300 border-2 border-slate-900 text-slate-900 font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-300 border-2 border-slate-900 text-slate-900 font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]";
                        } else {
                          btnStyle = "opacity-40 bg-white border-2 border-slate-900 text-slate-500";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-cyan-300 border-2 border-slate-900 text-slate-900 font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5";
                      }

                      return (
                        <button
                          key={idx}
                          id={`quiz-option-${idx}`}
                          onClick={() => {
                            if (!showQuizResult) {
                              setSelectedQuizAnswer(idx);
                            }
                          }}
                          className={`w-full p-3.5 text-left border-2 transition-all flex items-start gap-3 ${btnStyle}`}
                        >
                          <span className="w-6 h-6 bg-slate-900 text-white border border-slate-900 flex items-center justify-center text-xs font-black shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="flex-1 text-sm font-bold">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!showQuizResult ? (
                    <button
                      id="check-quiz-answer-btn"
                      onClick={() => {
                        if (selectedQuizAnswer !== null) {
                          setShowQuizResult(true);
                        }
                      }}
                      disabled={selectedQuizAnswer === null}
                      className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-black text-sm uppercase tracking-wider transition border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-x-0.5 active:translate-y-0.5"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <div className="p-4 bg-orange-100 border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-2">
                      <div className="flex items-center gap-2 font-black text-sm uppercase text-slate-900">
                        {selectedQuizAnswer === currentPage.quizQuestion.correctIndex ? (
                          <span className="text-emerald-700 flex items-center gap-1.5">
                            <CheckCircle2 className="w-5 h-5" /> Correct! Outstanding economics thinking!
                          </span>
                        ) : (
                          <span className="text-rose-700 flex items-center gap-1.5">
                            <XCircle className="w-5 h-5" /> Not quite. Let's review the concept!
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-900 leading-snug font-bold">
                        {currentPage.quizQuestion.explanation}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Page Footer Navigation Bar */}
          <div className="pt-4 border-t-2 border-slate-900 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handlePrevPage}
              disabled={currentPageIndex === 0}
              className="px-5 py-2.5 border-2 border-slate-900 text-xs font-black uppercase tracking-wider bg-white text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
            >
              <ChevronLeft className="w-4 h-4 stroke-[3]" /> Previous Scene
            </button>

            {currentPageIndex < STORYBOOK_PAGES.length - 1 ? (
              <button
                onClick={handleNextPage}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider transition flex items-center gap-2 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(6,182,212,1)]"
              >
                <span>Next Scene</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            ) : (
              <button
                onClick={onGoToWorksheets}
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider transition flex items-center gap-2 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
              >
                <span>Open Worksheets Suite</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
