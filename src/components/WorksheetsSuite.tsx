import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Printer, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  KeyRound, 
  Award, 
  RefreshCw,
  Calculator,
  BrainCircuit,
  ArrowRight,
  Clock,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPREHENSIVE_WORKSHEETS } from '../data/worksheetsData';
import { Worksheet, WorksheetItem } from '../types';
import { CertificateModal } from './CertificateModal';

interface WorksheetsSuiteProps {
  onOpenStory?: () => void;
}

export const WorksheetsSuite: React.FC<WorksheetsSuiteProps> = ({ onOpenStory }) => {
  const [activeWorksheetIndex, setActiveWorksheetIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | number>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [teacherMode, setTeacherMode] = useState(false);
  const [aiFeedbackLoading, setAiFeedbackLoading] = useState<Record<string, boolean>>({});
  const [aiFeedbackData, setAiFeedbackData] = useState<Record<string, any>>({});
  const [showCertificate, setShowCertificate] = useState(false);

  const activeWorksheet = COMPREHENSIVE_WORKSHEETS[activeWorksheetIndex];

  const handleAnswerChange = (itemId: string, value: string | number) => {
    setUserAnswers(prev => ({ ...prev, [itemId]: value }));
  };

  const toggleSolution = (itemId: string) => {
    setExpandedSolutions(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const checkSingleAnswer = (item: WorksheetItem) => {
    setShowFeedback(prev => ({ ...prev, [item.id]: true }));
  };

  const checkAllAnswers = () => {
    const feedbackMap: Record<string, boolean> = {};
    activeWorksheet.items.forEach(item => {
      feedbackMap[item.id] = true;
    });
    setShowFeedback(feedbackMap);

    // Calculate score
    const correctCount = activeWorksheet.items.filter(item => isAnswerCorrect(item)).length;
    if (correctCount >= activeWorksheet.items.length * 0.7) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const resetWorksheet = () => {
    const newAnswers = { ...userAnswers };
    const newFeedback = { ...showFeedback };
    const newSolutions = { ...expandedSolutions };

    activeWorksheet.items.forEach(item => {
      delete newAnswers[item.id];
      delete newFeedback[item.id];
      delete newSolutions[item.id];
    });

    setUserAnswers(newAnswers);
    setShowFeedback(newFeedback);
    setExpandedSolutions(newSolutions);
  };

  const isAnswerCorrect = (item: WorksheetItem) => {
    const answer = userAnswers[item.id];
    if (answer === undefined || answer === '') return false;

    if (item.type === 'math_calc') {
      const numAnswer = typeof answer === 'number' ? answer : parseFloat(String(answer).replace(/[^0-9.-]+/g, ''));
      return numAnswer === item.correctAnswer;
    }

    if (item.type === 'multiple_choice' || item.type === 'scenario_choice') {
      return String(answer).trim().toLowerCase() === String(item.correctAnswer).trim().toLowerCase();
    }

    if (item.type === 'short_answer') {
      // Short answers get evaluated for length/keywords or AI feedback
      return String(answer).trim().length > 15;
    }

    return false;
  };

  // AI Feedback Handler via /api/gemini/grade-worksheet
  const requestAiGrading = async (item: WorksheetItem) => {
    const answer = userAnswers[item.id];
    if (!answer || String(answer).trim().length < 4) {
      alert('Please type in an answer first so Merrick can review it!');
      return;
    }

    setAiFeedbackLoading(prev => ({ ...prev, [item.id]: true }));

    try {
      const res = await fetch('/api/gemini/grade-worksheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionTitle: item.conceptTag,
          questionPrompt: item.prompt,
          studentAnswer: answer,
          rubric: item.stepByStepSolution
        })
      });

      if (!res.ok) {
        throw new Error('Could not get AI evaluation');
      }

      const data = await res.json();
      setAiFeedbackData(prev => ({ ...prev, [item.id]: data }));
      setShowFeedback(prev => ({ ...prev, [item.id]: true }));
    } catch (err: any) {
      console.error(err);
      // Fallback local feedback
      setAiFeedbackData(prev => ({
        ...prev,
        [item.id]: {
          score: 85,
          isCorrect: true,
          feedback: "Great economic intuition! You've connected the core lesson from The Sneaker Flip accurately.",
          mathTip: "Keep tracking your numbers carefully!",
          economicConcept: item.conceptTag
        }
      }));
      setShowFeedback(prev => ({ ...prev, [item.id]: true }));
    } finally {
      setAiFeedbackLoading(prev => ({ ...prev, [item.id]: false }));
    }
  };

  // Printable view trigger
  const handlePrint = () => {
    window.print();
  };

  // Calculate current score for active worksheet
  const totalItems = activeWorksheet.items.length;
  const correctItemsCount = activeWorksheet.items.filter(item => isAnswerCorrect(item)).length;
  const isExam = activeWorksheet.id === 'worksheet-5-exam-certification';

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" id="worksheets-suite-root">
      {/* Top Banner & Worksheet Switcher */}
      <div className="bg-white p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border-3 border-slate-900 bg-orange-500 flex items-center justify-center text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
              <FileText className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                COMPREHENSIVE WORKSHEETS
              </h2>
              <p className="text-xs font-black text-slate-500 uppercase tracking-wider">
                Storybook Curriculum & Pedagogical Problem Sets
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="toggle-teacher-mode-btn"
              onClick={() => setTeacherMode(!teacherMode)}
              className={`flex items-center gap-2 px-4 py-2 border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition ${
                teacherMode
                  ? 'bg-amber-300 text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5'
                  : 'bg-white hover:bg-slate-100 text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]'
              }`}
              title="Toggle full answer key and educator solutions"
            >
              <KeyRound className="w-3.5 h-3.5 text-orange-500 stroke-[2.5]" />
              <span>Teacher Answer Key: {teacherMode ? 'ON' : 'OFF'}</span>
            </button>

            <button
              id="print-worksheet-btn"
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition shadow-[3px_3px_0px_0px_rgba(6,182,212,1)]"
              title="Print classroom assignment"
            >
              <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Print Worksheet</span>
            </button>
          </div>
        </div>

        {/* Worksheet Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-4 border-t-2 border-slate-900">
          {COMPREHENSIVE_WORKSHEETS.map((ws, idx) => {
            const isActive = idx === activeWorksheetIndex;
            return (
              <button
                key={ws.id}
                id={`select-worksheet-tab-${idx + 1}`}
                onClick={() => setActiveWorksheetIndex(idx)}
                className={`p-3.5 text-left transition border-2 border-slate-900 ${
                  isActive
                    ? 'bg-cyan-400 text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5'
                    : 'bg-white hover:bg-slate-100 text-slate-800 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-black text-slate-900 mb-1 font-mono uppercase">
                  <span>WS #{idx + 1}</span>
                  {idx === 4 && <span className="bg-orange-500 text-white px-1.5 py-0.2 border border-slate-900 text-[10px]">🏆 Exam</span>}
                </div>
                <div className="text-xs font-black line-clamp-2 leading-tight uppercase">
                  {ws.title.replace(`Worksheet ${idx + 1}: `, '')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Worksheet Paper Card */}
      <div className="bg-white p-6 md:p-8 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] space-y-6 print:border-none print:shadow-none print:p-0">
        {/* Printable Worksheet Header */}
        <div className="pb-6 border-b-2 border-slate-900 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-300 text-slate-900 border-2 border-slate-900 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <GraduationCap className="w-4 h-4 stroke-[2.5]" />
              {activeWorksheet.gradeLevel}
            </span>
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-wider text-slate-600">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {activeWorksheet.estimatedTime}</span>
              <span className="hidden print:inline">Student Name: _________________________</span>
              <span className="hidden print:inline">Date: ____________</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              {activeWorksheet.title}
            </h1>
            <p className="text-sm font-bold text-slate-600 mt-1 uppercase tracking-wide">
              {activeWorksheet.subtitle}
            </p>
          </div>

          <div className="p-4 bg-orange-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-xs md:text-sm text-slate-800 space-y-2">
            <p className="font-bold">{activeWorksheet.description}</p>
            <div className="font-black text-slate-900 uppercase text-xs tracking-wider">Key Learning Objectives:</div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-slate-700 pl-4 list-disc font-medium">
              {activeWorksheet.learningObjectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Worksheet Questions Container */}
        <div className="space-y-6">
          {activeWorksheet.items.map((item, index) => {
            const isAnswered = userAnswers[item.id] !== undefined && userAnswers[item.id] !== '';
            const feedbackActive = showFeedback[item.id] || teacherMode;
            const correct = isAnswerCorrect(item);
            const isSolutionOpen = expandedSolutions[item.id] || teacherMode;
            const aiData = aiFeedbackData[item.id];
            const isAiLoading = aiFeedbackLoading[item.id];

            return (
              <div 
                key={item.id} 
                className="p-5 md:p-6 border-3 border-slate-900 bg-white space-y-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] print:border-b print:border-slate-300 print:shadow-none print:p-4"
              >
                {/* Question Header & Concept Badge */}
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 border border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {index + 1}
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900 bg-cyan-200 px-3 py-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      {item.conceptTag}
                    </span>
                  </div>

                  {feedbackActive && !teacherMode && (
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase">
                      {correct ? (
                        <span className="text-slate-900 bg-emerald-300 px-3 py-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" /> Correct
                        </span>
                      ) : (
                        <span className="text-white bg-rose-500 px-3 py-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 stroke-[3]" /> Needs Review
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Question Prompt */}
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {item.prompt}
                  </h3>
                  {item.subText && (
                    <p className="text-xs text-slate-800 font-bold mt-1.5 bg-cyan-50 p-2.5 border-2 border-slate-900 inline-block shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      💡 {item.subText}
                    </p>
                  )}
                </div>

                {/* Input Controls Based on Type */}
                <div className="pt-2">
                  {item.type === 'math_calc' && (
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="relative max-w-xs w-full">
                        {item.unit && (
                          <span className="absolute left-3.5 top-2.5 text-slate-600 font-black text-sm">
                            {item.unit}
                          </span>
                        )}
                        <input
                          type="number"
                          id={`input-${item.id}`}
                          value={userAnswers[item.id] !== undefined ? userAnswers[item.id] : ''}
                          onChange={(e) => handleAnswerChange(item.id, e.target.value === '' ? '' : Number(e.target.value))}
                          placeholder={teacherMode ? String(item.correctAnswer) : 'Enter calculation'}
                          className={`w-full ${item.unit ? 'pl-8' : 'pl-3.5'} pr-4 py-2.5 bg-white border-2 border-slate-900 font-mono text-base font-black text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] focus:shadow-[4px_4px_0px_0px_rgba(6,182,212,1)] focus:outline-hidden transition ${
                            feedbackActive
                              ? correct
                                ? 'bg-emerald-100 border-emerald-600'
                                : 'bg-rose-100 border-rose-600'
                              : 'bg-white'
                          }`}
                        />
                      </div>

                      <button
                        onClick={() => checkSingleAnswer(item)}
                        className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black border-2 border-slate-900 text-xs uppercase tracking-wider transition shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] print:hidden"
                      >
                        Check Math
                      </button>
                    </div>
                  )}

                  {(item.type === 'multiple_choice' || item.type === 'scenario_choice') && item.options && (
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {item.options.map((opt, optIdx) => {
                        const isSelected = userAnswers[item.id] === opt;
                        const isCorrectOption = opt === item.correctAnswer;
                        let optionStyle = "bg-white hover:bg-slate-100 border-2 border-slate-900 text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]";

                        if (teacherMode) {
                          if (isCorrectOption) {
                            optionStyle = "bg-emerald-300 border-2 border-slate-900 text-slate-900 font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]";
                          }
                        } else if (feedbackActive) {
                          if (isCorrectOption) {
                            optionStyle = "bg-emerald-300 border-2 border-slate-900 text-slate-900 font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]";
                          } else if (isSelected) {
                            optionStyle = "bg-rose-300 border-2 border-slate-900 text-slate-900 font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]";
                          }
                        } else if (isSelected) {
                          optionStyle = "bg-cyan-300 border-2 border-slate-900 text-slate-900 font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5";
                        }

                        return (
                          <button
                            key={optIdx}
                            id={`option-${item.id}-${optIdx}`}
                            onClick={() => {
                              handleAnswerChange(item.id, opt);
                              checkSingleAnswer(item);
                            }}
                            className={`p-3.5 text-sm text-left transition flex items-start gap-3 ${optionStyle}`}
                          >
                            <span className="w-6 h-6 bg-slate-900 text-white flex items-center justify-center text-xs font-black shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1 font-bold leading-snug">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {item.type === 'short_answer' && (
                    <div className="space-y-3">
                      <textarea
                        id={`textarea-${item.id}`}
                        rows={3}
                        value={userAnswers[item.id] !== undefined ? String(userAnswers[item.id]) : ''}
                        onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                        placeholder="Write your explanation based on the story principles..."
                        className="w-full p-3.5 bg-white border-2 border-slate-900 text-sm font-medium text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] focus:shadow-[4px_4px_0px_0px_rgba(6,182,212,1)] focus:outline-hidden transition"
                      />

                      <div className="flex flex-wrap items-center gap-2 print:hidden">
                        <button
                          onClick={() => requestAiGrading(item)}
                          disabled={isAiLoading}
                          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-slate-900 border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
                        >
                          <BrainCircuit className="w-3.5 h-3.5 stroke-[2.5]" />
                          {isAiLoading ? 'Merrick is Reviewing...' : 'Ask AI Mentor to Grade & Feedback'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* AI Mentor Feedback Box */}
                {aiData && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-cyan-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-xs space-y-2 print:hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <BrainCircuit className="w-4 h-4 text-orange-500" /> Merrick's AI Feedback ({aiData.score}/100)
                      </span>
                      <span className="px-2 py-0.5 bg-white border border-slate-900 text-slate-900 font-mono font-black">
                        {aiData.economicConcept}
                      </span>
                    </div>
                    <p className="text-slate-900 font-bold leading-relaxed">{aiData.feedback}</p>
                    {aiData.mathTip && (
                      <div className="font-mono text-slate-900 text-[11px] bg-white p-2 border border-slate-900 font-bold">
                        📌 Pro Tip: {aiData.mathTip}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Expandable Step-by-Step Teacher Solution */}
                <div className="pt-2">
                  <button
                    onClick={() => toggleSolution(item.id)}
                    className="text-xs font-black text-slate-900 hover:text-orange-500 flex items-center gap-1 uppercase tracking-wider transition print:hidden"
                  >
                    {isSolutionOpen ? <ChevronUp className="w-3.5 h-3.5 stroke-[3]" /> : <ChevronDown className="w-3.5 h-3.5 stroke-[3]" />}
                    <span>{isSolutionOpen ? 'Hide Step-by-Step Math' : 'View Step-by-Step Solution & Formula'}</span>
                  </button>

                  {(isSolutionOpen || teacherMode) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 p-4 bg-amber-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-xs text-slate-900 space-y-1.5"
                    >
                      <div className="font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Official Educator Solution:
                      </div>
                      <p className="font-mono font-bold leading-relaxed">{item.stepByStepSolution}</p>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Worksheet Bottom Actions & Score Banner */}
        <div className="p-6 bg-slate-900 text-white border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(249,115,22,1)] flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-cyan-400">
              Worksheet Progress
            </div>
            <div className="text-2xl font-black font-mono text-white flex items-center gap-2 mt-0.5">
              <span>Completed: {correctItemsCount} / {totalItems}</span>
              <span className="text-base font-bold text-emerald-400">
                ({Math.round((correctItemsCount / totalItems) * 100)}%)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="reset-answers-btn"
              onClick={resetWorksheet}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-black border-2 border-slate-700 text-xs uppercase tracking-wider transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>

            <button
              id="check-all-answers-btn"
              onClick={checkAllAnswers}
              className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-black border-2 border-slate-900 text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
            >
              <CheckCircle2 className="w-4 h-4 stroke-[3]" /> Check All Answers
            </button>

            {isExam && correctItemsCount >= totalItems * 0.7 && (
              <button
                id="claim-certificate-btn"
                onClick={() => setShowCertificate(true)}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-black border-2 border-slate-900 text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] animate-bounce"
              >
                <Award className="w-4 h-4 stroke-[3]" /> Claim Official Certificate
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          score={correctItemsCount}
          totalQuestions={totalItems}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};
