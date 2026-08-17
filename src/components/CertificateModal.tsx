import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Printer, Download, CheckCircle2, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  score: number;
  totalQuestions: number;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ score, totalQuestions, onClose }) => {
  const [studentName, setStudentName] = useState('Malik Jr.');
  const [dateStr, setDateStr] = useState(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white max-w-3xl w-full p-6 md:p-8 border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative my-8"
        id="certificate-container"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white hover:bg-slate-100 border-2 border-slate-900 text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition print:hidden"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Input Bar (Hidden in print) */}
        <div className="mb-6 p-4 bg-amber-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div className="flex-1 min-w-[240px]">
            <label className="block text-xs font-black uppercase text-slate-900 mb-1">
              Recipient Student Name:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border-2 border-slate-900 text-slate-900 font-black text-base shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] focus:outline-hidden"
              placeholder="Enter Student Name"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerConfetti}
              className="px-4 py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-black border-2 border-slate-900 text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
            >
              <Sparkles className="w-4 h-4 stroke-[2.5]" /> Celebrate
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black border-2 border-slate-900 text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(6,182,212,1)]"
            >
              <Printer className="w-4 h-4 stroke-[2.5]" /> Print Certificate
            </button>
          </div>
        </div>

        {/* The Formal Certificate Canvas */}
        <div className="p-8 md:p-12 border-4 border-slate-900 bg-[#FDFCF6] text-center relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
          {/* Watermark/Emblem */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-orange-500 text-white flex items-center justify-center border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <Award className="w-10 h-10 stroke-[2.5]" />
            </div>
          </div>

          <div className="text-xs uppercase tracking-widest font-black text-orange-600 mb-1">
            Storybook Education • Financial Literacy Honors
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
            Certificate of Achievement
          </h2>

          <p className="text-xs font-black uppercase text-slate-500 mt-2 tracking-wider">
            This certifies that
          </p>

          <div className="my-4 pb-2 border-b-4 border-slate-900 max-w-md mx-auto">
            <span className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
              {studentName || 'Smart Student'}
            </span>
          </div>

          <p className="text-sm md:text-base text-slate-800 max-w-xl mx-auto leading-relaxed font-bold">
            has successfully mastered the economic principles of <strong>Supply & Demand</strong>, 
            <strong> Cost Basis & Net Profit</strong>, <strong>Hype Bubble Detection</strong>, and 
            <strong> Risk Diversification</strong> from <em>"The Sneaker Flip: Lesson on Financial Literacy"</em>.
          </p>

          <div className="mt-8 pt-6 border-t-2 border-slate-900 flex flex-wrap items-center justify-between text-left gap-6">
            <div>
              <div className="text-xs font-black text-slate-500 uppercase">Assessment Score</div>
              <div className="text-lg font-black text-slate-900 flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 stroke-[3]" />
                {score} / {totalQuestions} ({Math.round((score / totalQuestions) * 100)}%)
              </div>
            </div>

            <div>
              <div className="text-xs font-black text-slate-500 uppercase">Date Awarded</div>
              <div className="text-sm font-black text-slate-900">{dateStr}</div>
            </div>

            <div className="text-right">
              <div className="text-xs font-black text-slate-500 uppercase">Endorsed By</div>
              <div className="text-base font-black text-slate-900">Merrick & Malik</div>
              <div className="text-[10px] font-black uppercase text-slate-500">Junior Sneaker Economics Board</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
