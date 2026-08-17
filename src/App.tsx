import React, { useState } from 'react';
import { 
  Sparkles,
  BookOpen, 
  FileText, 
  TrendingUp, 
  Gamepad2, 
  Calculator, 
  BrainCircuit, 
  GraduationCap, 
  Layers
} from 'lucide-react';
import { SneakerFlipAcademy } from './components/SneakerFlipAcademy';
import { StorybookReader } from './components/StorybookReader';
import { WorksheetsSuite } from './components/WorksheetsSuite';
import { SupplyDemandLab } from './components/SupplyDemandLab';
import { MarketSimulator } from './components/MarketSimulator';
import { DealCalculator } from './components/DealCalculator';
import { MentorChat } from './components/MentorChat';

export type AppView = 'storybook' | 'academy' | 'worksheets' | 'supply_demand' | 'simulator' | 'calculator' | 'mentor';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('storybook');

  return (
    <div className="min-h-screen bg-[#FDFCF6] text-slate-900 flex flex-col font-sans selection:bg-orange-200 selection:text-orange-950">
      {/* Top Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FDFCF6]/95 backdrop-blur-md border-b-4 border-slate-900 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Brand Logo & Title */}
            <div 
              onClick={() => setCurrentView('storybook')}
              className="flex items-center gap-3 cursor-pointer group shrink-0 select-none mr-2"
            >
              <div className="w-11 h-11 rounded-none border-3 border-slate-900 bg-orange-500 flex items-center justify-center text-white font-black text-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] transition shrink-0">
                👟
              </div>
              <div className="flex flex-col">
                <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tighter flex items-center gap-1.5 whitespace-nowrap">
                  <span>SNEAKER FLIP</span>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-cyan-400 text-slate-900 px-1.5 py-0.5 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] inline-block">
                    ACADEMY
                  </span>
                </div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden md:block">
                  Financial Literacy Suite
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex-1 flex items-center justify-end gap-1.5 sm:gap-2 flex-nowrap" aria-label="Main Navigation">
              <button
                id="nav-storybook"
                type="button"
                onClick={() => setCurrentView('storybook')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition whitespace-nowrap cursor-pointer shrink-0 ${
                  currentView === 'storybook'
                    ? 'bg-cyan-400 text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>1. Storybook</span>
              </button>

              <button
                id="nav-academy"
                type="button"
                onClick={() => setCurrentView('academy')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition whitespace-nowrap cursor-pointer shrink-0 ${
                  currentView === 'academy'
                    ? 'bg-orange-500 text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>2. Interactive Lab</span>
              </button>

              <button
                id="nav-worksheets"
                type="button"
                onClick={() => setCurrentView('worksheets')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition whitespace-nowrap cursor-pointer shrink-0 ${
                  currentView === 'worksheets'
                    ? 'bg-amber-400 text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                <FileText className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>3. Worksheets</span>
              </button>

              <button
                id="nav-supply-demand"
                type="button"
                onClick={() => setCurrentView('supply_demand')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition whitespace-nowrap cursor-pointer shrink-0 ${
                  currentView === 'supply_demand'
                    ? 'bg-emerald-400 text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>4. Curves</span>
              </button>

              <button
                id="nav-simulator"
                type="button"
                onClick={() => setCurrentView('simulator')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition whitespace-nowrap cursor-pointer shrink-0 ${
                  currentView === 'simulator'
                    ? 'bg-amber-400 text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>5. Game</span>
              </button>

              <button
                id="nav-calculator"
                type="button"
                onClick={() => setCurrentView('calculator')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition whitespace-nowrap cursor-pointer shrink-0 ${
                  currentView === 'calculator'
                    ? 'bg-cyan-300 text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>6. Calculator</span>
              </button>

              <button
                id="nav-mentor"
                type="button"
                onClick={() => setCurrentView('mentor')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition whitespace-nowrap cursor-pointer shrink-0 ${
                  currentView === 'mentor'
                    ? 'bg-purple-400 text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>7. AI Mentor</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentView === 'academy' && (
          <SneakerFlipAcademy />
        )}

        {currentView === 'storybook' && (
          <StorybookReader onGoToWorksheets={() => setCurrentView('worksheets')} />
        )}

        {currentView === 'worksheets' && (
          <WorksheetsSuite onOpenStory={() => setCurrentView('storybook')} />
        )}

        {currentView === 'supply_demand' && (
          <SupplyDemandLab />
        )}

        {currentView === 'simulator' && (
          <MarketSimulator />
        )}

        {currentView === 'calculator' && (
          <DealCalculator />
        )}

        {currentView === 'mentor' && (
          <MentorChat />
        )}
      </main>

      {/* Global Footer */}
      <footer className="bg-white border-t-4 border-slate-900 py-6 mt-12 print:hidden shadow-[0px_-4px_0px_0px_rgba(15,23,42,1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-700 font-bold">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-orange-500 border-2 border-slate-900 flex items-center justify-center text-white text-xs">
              👟
            </div>
            <span className="font-black text-slate-900 uppercase tracking-wider">Sneaker Flip Academy: Lesson on Financial Literacy</span>
          </div>

          <div className="flex items-center gap-4 font-black uppercase tracking-wider">
            <button onClick={() => setCurrentView('academy')} className="hover:text-orange-500 transition">Academy</button>
            <button onClick={() => setCurrentView('storybook')} className="hover:text-orange-500 transition">Storybook</button>
            <button onClick={() => setCurrentView('worksheets')} className="hover:text-orange-500 transition">Worksheets</button>
            <button onClick={() => setCurrentView('supply_demand')} className="hover:text-orange-500 transition">Supply & Demand</button>
            <button onClick={() => setCurrentView('simulator')} className="hover:text-orange-500 transition">Simulator</button>
            <button onClick={() => setCurrentView('calculator')} className="hover:text-orange-500 transition">Calculator</button>
            <button onClick={() => setCurrentView('mentor')} className="hover:text-orange-500 transition">AI Mentor</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
