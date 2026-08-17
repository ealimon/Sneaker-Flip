import React, { useState } from 'react';
import { 
  Printer, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  DollarSign, 
  TrendingUp, 
  ShieldAlert,
  RotateCcw,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CertificateModal } from './CertificateModal';

interface LessonData {
  id: number;
  lessonNumber: string;
  lessonTitle: string;
  progressPercent: number;
  chapterBadge: string;
  storyTitle: string;
  storyText: string;
  highlightWords: string[];
  tipText: string;
  purchaseCost: number;
  cleaningCost: number;
  marketValue: number;
  worksheetTitle: string;
  section1Title: string;
  itemCostDefault: number;
  suppliesDefault: number;
  defaultExpenses: { id: string; name: string; cost: number; checked: boolean }[];
  targetProfitGoal: number;
  completionNote: string;
}

const LESSONS: LessonData[] = [
  {
    id: 1,
    lessonNumber: '01. Spotting Value & Scarcity',
    lessonTitle: 'The Thrift Store Discovery',
    progressPercent: 20,
    chapterBadge: 'STORY CHAPTER 1',
    storyTitle: 'The Dusty Shoe Shelf',
    storyText: 'Marcus scanned the crowded thrift store racks on Saturday morning. Hidden behind worn-out trainers was a legendary find: vintage Air-Whiz 1s. The price sticker was only $15.00. He checked sneaker tracker apps and realized mint condition pairs go for $75.00 due to extreme scarcity. But before celebrating, he needed to assess the true condition.',
    highlightWords: ['Air-Whiz 1s', 'scarcity', 'market value'],
    tipText: 'A low purchase price is only an opportunity if market demand exists and true scarcity keeps resale value high.',
    purchaseCost: 15,
    cleaningCost: 0,
    marketValue: 75,
    worksheetTitle: 'WORKSHEET: INITIAL VALUATION',
    section1Title: '1. RECORD ACQUISITION DETAILS',
    itemCostDefault: 15,
    suppliesDefault: 0,
    defaultExpenses: [
      { id: 'tax', name: 'Sales Tax (8%)', cost: 1.20, checked: true },
      { id: 'bus', name: 'Bus Fare to Thrift Store', cost: 2.50, checked: true },
    ],
    targetProfitGoal: 56.30,
    completionNote: 'Great acquisition assessment! You confirmed true scarcity and factored in travel overhead before buying.'
  },
  {
    id: 2,
    lessonNumber: '02. Understanding Profit',
    lessonTitle: 'The Profit Map',
    progressPercent: 45,
    chapterBadge: 'STORY CHAPTER 2',
    storyTitle: 'The Thrift Store Goldmine',
    storyText: 'Marcus spotted them in the back of the shelf: a dusty pair of Air-Whiz 1s. The price tag said $15. He knew if he cleaned them up and found the right buyer, they could be worth five times that ($75). But first, he had to calculate his true costs and avoid the beginner trap of confusing gross revenue with net profit.',
    highlightWords: ['Air-Whiz 1s', 'costs', 'net profit'],
    tipText: "Profit isn't just what you sell it for. It's what you keep after paying for everything!",
    purchaseCost: 15,
    cleaningCost: 5,
    marketValue: 75,
    worksheetTitle: 'WORKSHEET: THE PROFIT MAP',
    section1Title: '1. IDENTIFY YOUR INITIAL INVESTMENT',
    itemCostDefault: 15,
    suppliesDefault: 5,
    defaultExpenses: [
      { id: 'laces', name: 'New Replacement Laces', cost: 4.50, checked: true },
      { id: 'fee', name: 'Resale App Fee (StockX / Goat)', cost: 8.00, checked: true },
      { id: 'box', name: 'Shipping Box & Bubble Wrap', cost: 3.00, checked: false },
    ],
    targetProfitGoal: 47.50,
    completionNote: 'Excellent budgeting! Notice how supplies ($5.00) and fees ($12.50) mean your actual profit is $47.50, not $60!'
  },
  {
    id: 3,
    lessonNumber: '03. Platform Fees & Margins',
    lessonTitle: 'The Hidden Expense Trap',
    progressPercent: 65,
    chapterBadge: 'STORY CHAPTER 3',
    storyTitle: 'Choosing Where to Sell',
    storyText: 'Marcus had two choices: sell through a nationwide app with buyer protection and automated shipping for a 12% fee ($9.00), or meet a local collector at the community center in broad daylight for 0% fee. Every dollar in platform fees directly cuts into your net profit margin.',
    highlightWords: ['platform fees', 'net profit margin', 'overhead'],
    tipText: 'Always compare distribution channels: online apps offer huge audiences but take large cuts; local verified meetups preserve your full margin.',
    purchaseCost: 15,
    cleaningCost: 5,
    marketValue: 75,
    worksheetTitle: 'WORKSHEET: PLATFORM COMPARISON',
    section1Title: '1. BASE INVESTMENT COSTS',
    itemCostDefault: 15,
    suppliesDefault: 5,
    defaultExpenses: [
      { id: 'app_fee', name: 'Marketplace App Fee (12%)', cost: 9.00, checked: true },
      { id: 'payout_fee', name: 'Instant Cash-out Transfer Fee', cost: 1.50, checked: true },
      { id: 'insurance', name: 'Shipping Loss Insurance', cost: 2.00, checked: false },
    ],
    targetProfitGoal: 44.50,
    completionNote: 'Smart fee deduction! Real entrepreneurs always calculate payout fees before listing an item.'
  },
  {
    id: 4,
    lessonNumber: '04. The Restock Risk',
    lessonTitle: 'Supply Shifts & Price Drops',
    progressPercent: 85,
    chapterBadge: 'STORY CHAPTER 4',
    storyTitle: 'The Manufacturer Announcement',
    storyText: 'Just as Marcus finished cleaning the shoes to pristine condition, sneaker news leaked: the manufacturer was re-releasing 200,000 new pairs next month! Increased market supply will cause resale prices to plummet from $75 down to $45. Marcus must decide whether to sell immediately or risk holding.',
    highlightWords: ['re-releasing', 'market supply', 'plummet'],
    tipText: 'When supply surges, prices fall. Fast inventory turnover beats stubborn holding during a supply wave.',
    purchaseCost: 15,
    cleaningCost: 5,
    marketValue: 50,
    worksheetTitle: 'WORKSHEET: RESTOCK RISK AUDIT',
    section1Title: '1. REVISED MARKET CLEARING PRICE',
    itemCostDefault: 15,
    suppliesDefault: 5,
    defaultExpenses: [
      { id: 'discount', name: 'Quick Sale Discount vs Restock', cost: 5.00, checked: true },
      { id: 'fee', name: 'Resale Platform Cut', cost: 5.00, checked: true },
    ],
    targetProfitGoal: 20.00,
    completionNote: 'Superb agility! Even with a lower resale price, taking a guaranteed $20 profit protects your initial capital!'
  },
  {
    id: 5,
    lessonNumber: '05. Graduation & Reinvestment',
    lessonTitle: 'Building Long-Term Wealth',
    progressPercent: 100,
    chapterBadge: 'STORY CHAPTER 5',
    storyTitle: 'The Compounding Fund',
    storyText: 'Marcus completed the flip, pocketed his earnings, and sat down with his finance mentor Merrick. Rather than spending his profit on video games, Marcus followed the 50/30/20 rule: 50% re-invested into his inventory fund, 30% into savings, and 20% for personal enjoyment. Marcus is now a certified Junior Financial Analyst!',
    highlightWords: ['Compounding', '50/30/20 rule', 'savings', 're-invested'],
    tipText: 'True financial independence comes from compounding: turning your profits into the seed money for your next venture.',
    purchaseCost: 15,
    cleaningCost: 5,
    marketValue: 75,
    worksheetTitle: 'WORKSHEET: WEALTH ALLOCATION',
    section1Title: '1. TOTAL ACCUMULATED CAPITAL',
    itemCostDefault: 15,
    suppliesDefault: 5,
    defaultExpenses: [
      { id: 'reinvest', name: 'Reinvestment into Inventory (50%)', cost: 23.75, checked: true },
      { id: 'emergency', name: 'Bank Emergency Savings (30%)', cost: 14.25, checked: true },
      { id: 'reward', name: 'Personal Fun Reward (20%)', cost: 9.50, checked: true },
    ],
    targetProfitGoal: 47.50,
    completionNote: 'Congratulations! You have mastered the economics of sneaker flipping, budgeting, and capital allocation!'
  }
];

export function SneakerFlipAcademy() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(1); // Default to lesson 2 matching the screenshot
  const lesson = LESSONS[currentLessonIndex];

  // Interactive worksheet inputs state
  const [itemCost, setItemCost] = useState<number>(lesson.itemCostDefault);
  const [suppliesCost, setSuppliesCost] = useState<string>(lesson.suppliesDefault ? lesson.suppliesDefault.toString() : '');
  const [expenses, setExpenses] = useState(lesson.defaultExpenses);
  const [sellingPrice, setSellingPrice] = useState<number>(lesson.marketValue);
  const [isFlipCompleted, setIsFlipCompleted] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  // When switching lessons, reset interactive state to lesson defaults
  const handleLessonChange = (newIndex: number) => {
    const nextLesson = LESSONS[newIndex];
    setCurrentLessonIndex(newIndex);
    setItemCost(nextLesson.itemCostDefault);
    setSuppliesCost(nextLesson.suppliesDefault ? nextLesson.suppliesDefault.toString() : '');
    setExpenses(nextLesson.defaultExpenses);
    setSellingPrice(nextLesson.marketValue);
    setIsFlipCompleted(false);
  };

  // Toggle expense checkbox
  const toggleExpense = (id: string) => {
    setExpenses(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
    setIsFlipCompleted(false);
  };

  // Calculations
  const numericSupplies = parseFloat(suppliesCost) || 0;
  const checkedExpensesTotal = expenses
    .filter(e => e.checked)
    .reduce((acc, curr) => acc + curr.cost, 0);

  const totalCostBasis = itemCost + numericSupplies + checkedExpensesTotal;
  const currentNetProfit = Math.max(0, sellingPrice - totalCostBasis);
  const roiPercent = totalCostBasis > 0 ? (currentNetProfit / totalCostBasis) * 100 : 0;

  // Print PDF handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" id="sneaker-flip-academy-root">
      {/* Top Banner (Matches the exact branding of the variation mockup) */}
      <div className="bg-white p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 border-3 border-slate-900 bg-orange-500 flex items-center justify-center text-white font-black text-2xl shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            👟
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>SNEAKER FLIP</span>
              <span className="text-orange-500">ACADEMY</span>
            </div>
            <p className="text-xs font-black text-slate-600 uppercase tracking-wider">
              THE STORY OF MARCUS & THE RARE AIR-WHIZ 1S
            </p>
          </div>
        </div>

        {/* Progress & Current Lesson Badge */}
        <div className="flex items-center gap-4 bg-amber-100 p-2.5 px-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <div className="text-right">
            <div className="text-[10px] font-black text-slate-600 uppercase tracking-wider">CURRENT LESSON</div>
            <div className="text-sm font-black text-slate-900 uppercase">{lesson.lessonNumber}</div>
          </div>
          
          <div className="w-12 h-12 rounded-full border-3 border-slate-900 bg-cyan-400 flex items-center justify-center font-black text-slate-900 text-sm shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            {lesson.progressPercent}%
          </div>
        </div>
      </div>

      {/* Main Two-Column Side-by-Side Story & Live Worksheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Interactive Story Chapter Card */}
        <div className="lg:col-span-5 bg-cyan-50/50 p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Story Chapter Badge */}
            <div className="inline-block px-3 py-1 bg-white border-2 border-slate-900 text-xs font-black text-slate-900 uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              {lesson.chapterBadge}
            </div>

            {/* Chapter Title */}
            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {lesson.storyTitle}
            </h3>

            {/* Narrative text with highlighted interactive words */}
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              {lesson.storyText}
            </p>

            {/* Tip Box (Exact match from user mockup) */}
            <div className="p-4 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex items-start gap-3">
              <div className="w-8 h-8 shrink-0 bg-orange-500 border-2 border-slate-900 text-white font-black text-xs flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                TIP
              </div>
              <p className="text-xs font-bold text-slate-900 leading-snug">
                {lesson.tipText}
              </p>
            </div>
          </div>

          {/* Bottom Story Metrics Bar & Carousel Dots */}
          <div className="space-y-4 pt-4 border-t-2 border-slate-900">
            <div className="grid grid-cols-3 gap-2 text-center bg-slate-900 text-white p-3 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(6,182,212,1)]">
              <div>
                <div className="text-base font-black font-mono text-cyan-300">${itemCost.toFixed(0)}</div>
                <div className="text-[9px] font-black uppercase text-slate-300">PURCHASE</div>
              </div>
              <div className="border-x border-slate-700">
                <div className="text-base font-black font-mono text-orange-400">${numericSupplies.toFixed(0)}</div>
                <div className="text-[9px] font-black uppercase text-slate-300">CLEANING</div>
              </div>
              <div>
                <div className="text-base font-black font-mono text-emerald-400">${sellingPrice.toFixed(0)}</div>
                <div className="text-[9px] font-black uppercase text-slate-300">MARKET VALUE</div>
              </div>
            </div>

            {/* Carousel Dots */}
            <div className="flex items-center justify-center gap-2">
              {LESSONS.map((l, idx) => (
                <button
                  key={l.id}
                  onClick={() => handleLessonChange(idx)}
                  className={`w-3 h-3 border-2 border-slate-900 transition cursor-pointer ${
                    idx === currentLessonIndex ? 'bg-slate-900 scale-110' : 'bg-white hover:bg-slate-200'
                  }`}
                  title={`Go to Lesson ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Worksheet */}
        <div className="lg:col-span-7 bg-white p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            
            {/* Worksheet Title & Print Button */}
            <div className="flex items-center justify-between pb-3 border-b-3 border-slate-900 gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                {lesson.worksheetTitle}
              </h2>
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(6,182,212,1)] cursor-pointer transition"
              >
                <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>PRINT PDF</span>
              </button>
            </div>

            {/* 1. Identify Your Initial Investment */}
            <div className="space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase tracking-wider">
                {lesson.section1Title}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Box 1: Item Cost */}
                <div className="p-3 bg-amber-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                  <div className="text-[10px] font-black text-slate-600 uppercase">ITEM COST</div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-lg font-black text-slate-900">$</span>
                    <input
                      type="number"
                      value={itemCost}
                      onChange={(e) => {
                        setItemCost(Number(e.target.value));
                        setIsFlipCompleted(false);
                      }}
                      className="w-full bg-white px-2 py-1 border-2 border-slate-900 font-mono text-lg font-black text-slate-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Box 2: Supplies Input */}
                <div className="p-3 bg-cyan-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                  <div className="text-[10px] font-black text-slate-600 uppercase">SUPPLIES (SOAP, BRUSHES)</div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-lg font-black text-slate-900">$</span>
                    <input
                      type="number"
                      placeholder="Enter amount..."
                      value={suppliesCost}
                      onChange={(e) => {
                        setSuppliesCost(e.target.value);
                        setIsFlipCompleted(false);
                      }}
                      className="w-full bg-white px-2 py-1 border-2 border-slate-900 font-mono text-lg font-black text-slate-900 focus:outline-hidden placeholder:text-slate-400 placeholder:italic placeholder:font-normal"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Expense Breakdown Table */}
            <div className="space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase tracking-wider">
                2. EXPENSE BREAKDOWN TABLE
              </div>

              <div className="border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white font-black uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Expense Type</th>
                      <th className="py-2.5 px-3">Estimated Cost</th>
                      <th className="py-2.5 px-3 text-center">Necessary?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-slate-200 font-bold text-slate-900">
                    {expenses.map((expense) => (
                      <tr 
                        key={expense.id}
                        className={`hover:bg-slate-50 transition cursor-pointer ${
                          expense.checked ? 'bg-amber-50/60' : 'bg-white opacity-60'
                        }`}
                        onClick={() => toggleExpense(expense.id)}
                      >
                        <td className="py-2.5 px-3">{expense.name}</td>
                        <td className="py-2.5 px-3 font-mono font-black">${expense.cost.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={expense.checked}
                            onChange={() => toggleExpense(expense.id)}
                            className="w-4 h-4 accent-orange-500 cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Expected Selling Price input */}
            <div className="flex items-center justify-between p-3 bg-slate-100 border-2 border-slate-900 text-xs shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <span className="font-black text-slate-900 uppercase">Target Resale Price:</span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <span>$</span>
                <input 
                  type="number" 
                  value={sellingPrice}
                  onChange={(e) => {
                    setSellingPrice(Number(e.target.value));
                    setIsFlipCompleted(false);
                  }}
                  className="w-20 bg-white px-2 py-0.5 border border-slate-900 font-mono font-black text-slate-900"
                />
              </div>
            </div>

            {/* Highlighted Net Profit Goal Card (Exact design from user screenshot!) */}
            <div className="p-4 border-3 border-orange-500 bg-orange-50 flex flex-wrap items-center justify-between gap-4 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]">
              <div>
                <div className="text-[10px] font-black text-orange-950 uppercase tracking-wider">YOUR NET PROFIT GOAL</div>
                <div className="text-3xl font-black font-mono text-slate-900 mt-0.5">
                  ${currentNetProfit.toFixed(2)}
                </div>
                <div className="text-[11px] font-bold text-slate-600">
                  Total Costs: ${totalCostBasis.toFixed(2)} • ROI: {roiPercent.toFixed(1)}%
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFlipCompleted(true)}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm uppercase tracking-wider border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] cursor-pointer transition flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>FINISH FLIP</span>
              </button>
            </div>

            {/* Interactive Flip Results Modal Banner */}
            <AnimatePresence>
              {isFlipCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-emerald-200 border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-2"
                >
                  <div className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase">
                    <CheckCircle2 className="w-5 h-5 text-emerald-900 stroke-[2.5]" />
                    <span>Flip Completed Successfully!</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 leading-snug">
                    {lesson.completionNote}
                  </p>
                  <div className="text-[11px] font-mono text-slate-800 font-black">
                    Net Profit Realized: +${currentNetProfit.toFixed(2)} ({roiPercent.toFixed(1)}% Return on Investment)
                  </div>
                  {currentLessonIndex === LESSONS.length - 1 && (
                    <button
                      onClick={() => setShowCertificate(true)}
                      className="mt-2 px-4 py-2 bg-slate-900 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(6,182,212,1)] cursor-pointer"
                    >
                      🏆 View Official Graduation Certificate
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Bottom Action Navigation Buttons (Matches BACK / CONTINUE STORY from screenshot) */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-slate-900 gap-3">
            <button
              type="button"
              disabled={currentLessonIndex === 0}
              onClick={() => handleLessonChange(currentLessonIndex - 1)}
              className="px-5 py-2.5 bg-white hover:bg-slate-100 disabled:opacity-30 text-slate-900 font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] cursor-pointer transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>BACK</span>
            </button>

            <div className="text-xs font-black text-slate-600 uppercase hidden sm:block">
              Lesson {currentLessonIndex + 1} of {LESSONS.length}
            </div>

            <button
              type="button"
              onClick={() => {
                if (currentLessonIndex < LESSONS.length - 1) {
                  handleLessonChange(currentLessonIndex + 1);
                } else {
                  setShowCertificate(true);
                }
              }}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(6,182,212,1)] cursor-pointer transition flex items-center gap-2 hover:-translate-y-0.5"
            >
              <span>{currentLessonIndex < LESSONS.length - 1 ? 'CONTINUE STORY' : 'CLAIM CERTIFICATE'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

        </div>

      </div>

      {/* Graduation Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          studentName="Marcus / Malik"
          score={100}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}
