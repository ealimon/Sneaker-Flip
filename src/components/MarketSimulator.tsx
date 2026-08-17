import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Package, 
  Award, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MarketDrop {
  id: string;
  name: string;
  colorway: string;
  retailPrice: number;
  supplyPairs: number;
  hypeLevel: 'Low' | 'Medium' | 'High' | 'Extreme Bubble Alert';
  merrickAdvisory: string;
  expectedResaleMin: number;
  expectedResaleMax: number;
  eventChance: string;
}

const ROUND_DROPS: Record<number, MarketDrop[]> = {
  1: [
    {
      id: 'r1-d1',
      name: 'Neon Drifters OG',
      colorway: 'Electric Lime / Black',
      retailPrice: 100,
      supplyPairs: 2500,
      hypeLevel: 'High',
      merrickAdvisory: 'Historical data shows steady demand and genuine scarcity. Safe flip!',
      expectedResaleMin: 140,
      expectedResaleMax: 160,
      eventChance: 'High chance of solid +$40 to +$60 profit'
    },
    {
      id: 'r1-d2',
      name: 'City Runner Basic',
      colorway: 'Triple White',
      retailPrice: 70,
      supplyPairs: 200000,
      hypeLevel: 'Low',
      merrickAdvisory: 'Massive supply. Everyone who wants them can get them at the mall. No resale margin.',
      expectedResaleMin: 60,
      expectedResaleMax: 75,
      eventChance: 'Likely break-even or -$10 loss'
    },
    {
      id: 'r1-d3',
      name: 'Hyper Star Ultra',
      colorway: 'Silver / Holographic',
      retailPrice: 150,
      supplyPairs: 1000,
      hypeLevel: 'Extreme Bubble Alert',
      merrickAdvisory: 'High risk! Already reselling at $250 online, but rumors of factory restock exist.',
      expectedResaleMin: 90,
      expectedResaleMax: 260,
      eventChance: 'Volatile! Could 2x or crash 50%'
    }
  ],
  2: [
    {
      id: 'r2-d1',
      name: 'Retro Prism Mid',
      colorway: 'Royal Blue / Suede',
      retailPrice: 110,
      supplyPairs: 4000,
      hypeLevel: 'Medium',
      merrickAdvisory: 'Solid classic silhouette. Buyers consistently pay +$30 to +$50 over retail.',
      expectedResaleMin: 145,
      expectedResaleMax: 165,
      eventChance: 'Steady steady profit'
    },
    {
      id: 'r2-d2',
      name: 'The Comet Kick V1',
      colorway: 'Midnight Black / White Star',
      retailPrice: 130,
      supplyPairs: 5000,
      hypeLevel: 'Extreme Bubble Alert',
      merrickAdvisory: 'Celebrity hype is deafening! Social media says it will triple. Beware the FOMO trap!',
      expectedResaleMin: 80,
      expectedResaleMax: 290,
      eventChance: 'Restock risk is extremely high'
    },
    {
      id: 'r2-d3',
      name: 'Eco Leather Slip',
      colorway: 'Forest Green',
      retailPrice: 85,
      supplyPairs: 50000,
      hypeLevel: 'Low',
      merrickAdvisory: 'General mall release. Safe to pass.',
      expectedResaleMin: 70,
      expectedResaleMax: 90,
      eventChance: 'Low profit potential'
    }
  ],
  3: [
    {
      id: 'r3-d1',
      name: 'Aero Jump Pro',
      colorway: 'Solar Red',
      retailPrice: 120,
      supplyPairs: 3000,
      hypeLevel: 'High',
      merrickAdvisory: 'Basketball tournament official release. Strong organic sports demand.',
      expectedResaleMin: 170,
      expectedResaleMax: 200,
      eventChance: 'Strong +$50 profit margin'
    },
    {
      id: 'r3-d2',
      name: 'Galaxy Runner 90',
      colorway: 'Deep Space Purple',
      retailPrice: 140,
      supplyPairs: 1500,
      hypeLevel: 'Medium',
      merrickAdvisory: 'Limited numbers. Checked past 3 colorway sales: all gained value.',
      expectedResaleMin: 190,
      expectedResaleMax: 220,
      eventChance: 'High probability of solid gains'
    },
    {
      id: 'r3-d3',
      name: 'Neon Hypebot 3000',
      colorway: 'Glow in Dark Yellow',
      retailPrice: 160,
      supplyPairs: 800,
      hypeLevel: 'Extreme Bubble Alert',
      merrickAdvisory: 'Online bots are manipulating prices. Highly dangerous speculative asset!',
      expectedResaleMin: 75,
      expectedResaleMax: 300,
      eventChance: 'Wild swings up or down'
    }
  ],
  4: [
    {
      id: 'r4-d1',
      name: 'Vintage Track 77',
      colorway: 'Gum Sole / Off-White',
      retailPrice: 95,
      supplyPairs: 3500,
      hypeLevel: 'Medium',
      merrickAdvisory: 'Timeless style with high daily liquidity. Sells fast at local sneaker conventions.',
      expectedResaleMin: 135,
      expectedResaleMax: 150,
      eventChance: 'Reliable +$40 gain'
    },
    {
      id: 'r4-d2',
      name: 'Superstar Comet Restock',
      colorway: 'Black / Silver Star',
      retailPrice: 110,
      supplyPairs: 1000000,
      hypeLevel: 'Low',
      merrickAdvisory: 'DANGER! This is the 1,000,000 pair surprise restock. Market will crash below retail!',
      expectedResaleMin: 65,
      expectedResaleMax: 90,
      eventChance: 'Guaranteed loss if flipped'
    },
    {
      id: 'r4-d3',
      name: 'Collab Artist High',
      colorway: 'Graffiti Multi',
      retailPrice: 140,
      supplyPairs: 2000,
      hypeLevel: 'High',
      merrickAdvisory: 'Verified artist collaboration with numbered certificates. Real scarcity.',
      expectedResaleMin: 210,
      expectedResaleMax: 260,
      eventChance: 'Major upside potential'
    }
  ],
  5: [
    {
      id: 'r5-d1',
      name: 'Grand Finale Grail',
      colorway: 'Heritage Chicago Red / White',
      retailPrice: 150,
      supplyPairs: 1800,
      hypeLevel: 'High',
      merrickAdvisory: 'The holy grail of sneaker heritage. Strong historical demand for 15+ years.',
      expectedResaleMin: 240,
      expectedResaleMax: 300,
      eventChance: 'Excellent long-term value'
    },
    {
      id: 'r5-d2',
      name: 'Crypto Glider Moon',
      colorway: 'Neon Silver',
      retailPrice: 180,
      supplyPairs: 500,
      hypeLevel: 'Extreme Bubble Alert',
      merrickAdvisory: 'Pure social media pump! Zero fundamentals. Only buy if you love gambling.',
      expectedResaleMin: 50,
      expectedResaleMax: 320,
      eventChance: 'Extreme risk of 70% collapse'
    },
    {
      id: 'r5-d3',
      name: 'Daily Cushion Flex',
      colorway: 'Grey / Black',
      retailPrice: 80,
      supplyPairs: 300000,
      hypeLevel: 'Low',
      merrickAdvisory: 'Standard running shoe. Great to wear, terrible to flip.',
      expectedResaleMin: 70,
      expectedResaleMax: 80,
      eventChance: 'Break even at best'
    }
  ]
};

export const MarketSimulator: React.FC = () => {
  const [cash, setCash] = useState<number>(250); // Starting paper route savings
  const [round, setRound] = useState<number>(1);
  const [historyLedger, setHistoryLedger] = useState<Array<{ round: number; action: string; cost: number; revenue: number; profit: number; note: string }>>([]);
  const [roundResult, setRoundResult] = useState<{ headline: string; profit: number; note: string; eventType: 'win' | 'loss' | 'neutral' } | null>(null);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  const drops = ROUND_DROPS[round] || [];

  const handleDecision = (drop: MarketDrop, quantity: number) => {
    const totalCost = drop.retailPrice * quantity;
    if (totalCost > cash) {
      alert("You don't have enough cash for this quantity! Protect your budget.");
      return;
    }

    // Determine market outcome
    let resalePerPair = 0;
    let headline = '';
    let eventType: 'win' | 'loss' | 'neutral' = 'win';

    if (drop.hypeLevel === 'Extreme Bubble Alert') {
      // 50% chance bubble pops (restock shock), 50% chance big win
      const roll = Math.random();
      if (roll > 0.45) {
        // Restock shock / crash
        resalePerPair = drop.expectedResaleMin;
        headline = `💥 BUBBLE BURST! Shoe company announced surprise restock. Resale crashed to $${resalePerPair}!`;
        eventType = 'loss';
      } else {
        resalePerPair = drop.expectedResaleMax;
        headline = `🚀 HYPE SURGE! Celebrity wore them on red carpet! Sold for $${resalePerPair} each!`;
        eventType = 'win';
      }
    } else if (drop.hypeLevel === 'Low') {
      resalePerPair = Math.round((drop.expectedResaleMin + drop.expectedResaleMax) / 2);
      headline = `🛍️ General Release: No scarcity. Sold for market value of $${resalePerPair}.`;
      eventType = resalePerPair >= drop.retailPrice ? 'neutral' : 'loss';
    } else {
      // Medium or High - reliable organic data
      resalePerPair = Math.round(drop.expectedResaleMin + Math.random() * (drop.expectedResaleMax - drop.expectedResaleMin));
      headline = `📈 SMART FLIP! Verified demand allowed you to sell to a local collector for $${resalePerPair} each!`;
      eventType = 'win';
    }

    const totalRevenue = resalePerPair * quantity;
    const netProfit = totalRevenue - totalCost;
    const newCash = cash - totalCost + totalRevenue;

    const ledgerEntry = {
      round,
      action: `Bought ${quantity}x ${drop.name} @ $${drop.retailPrice}`,
      cost: totalCost,
      revenue: totalRevenue,
      profit: netProfit,
      note: headline
    };

    setCash(newCash);
    setHistoryLedger(prev => [...prev, ledgerEntry]);
    setRoundResult({
      headline,
      profit: netProfit,
      note: netProfit >= 0 
        ? `You made +$${netProfit} net profit! Merrick approves of your strategy.` 
        : `You suffered a -$${Math.abs(netProfit)} loss. Remember: bubbles always pop!`,
      eventType
    });
  };

  const handlePass = () => {
    const ledgerEntry = {
      round,
      action: 'Passed & Protected Cash Reserves',
      cost: 0,
      revenue: 0,
      profit: 0,
      note: 'Disciplined investors know when to hold cash and wait for the right opportunity.'
    };

    setHistoryLedger(prev => [...prev, ledgerEntry]);
    setRoundResult({
      headline: '🛡️ Cash Protected: You decided not to risk capital this round.',
      profit: 0,
      note: 'Preserving capital is just as important as generating profit.',
      eventType: 'neutral'
    });
  };

  const advanceNextRound = () => {
    if (round < 5) {
      setRound(prev => prev + 1);
      setRoundResult(null);
    } else {
      setGameFinished(true);
      if (cash > 250) {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  const restartGame = () => {
    setCash(250);
    setRound(1);
    setHistoryLedger([]);
    setRoundResult(null);
    setGameFinished(false);
  };

  const totalCumulativeProfit = cash - 250;

  // Rating badge at end of game
  let finalRating = 'Disciplined Junior Investor';
  let ratingColor = 'text-blue-600 bg-blue-50 border-blue-200';
  if (cash >= 500) {
    finalRating = '🏆 Master Sneaker Economist (Top 1%!)';
    ratingColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
  } else if (cash >= 300) {
    finalRating = '🌟 Smart Value Investor (Solid Growth)';
    ratingColor = 'text-teal-700 bg-teal-50 border-teal-300';
  } else if (cash < 200) {
    finalRating = '⚠️ Hype-Trapped Trader (Tuition Paid in Economics)';
    ratingColor = 'text-rose-700 bg-rose-50 border-rose-300';
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" id="market-simulator-root">
      {/* Top Banner */}
      <div className="bg-white p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 border-3 border-slate-900 bg-orange-500 flex items-center justify-center text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] font-black text-xl">
            👟
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              Sneaker Market Trading Simulator
            </h2>
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider">
              Start with Malik's $250 savings. Trade 5 rounds using data & avoid hype bubbles!
            </p>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="flex items-center gap-4 bg-amber-100 p-3 px-5 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <div>
            <div className="text-[10px] font-black text-slate-900 uppercase tracking-wider">Available Cash</div>
            <div className="text-xl font-black font-mono text-emerald-800">${cash}</div>
          </div>
          <div className="h-8 w-0.5 bg-slate-900"></div>
          <div>
            <div className="text-[10px] font-black text-slate-900 uppercase tracking-wider">Total Profit / Loss</div>
            <div className={`text-xl font-black font-mono ${totalCumulativeProfit >= 0 ? 'text-emerald-800' : 'text-rose-700'}`}>
              {totalCumulativeProfit >= 0 ? `+$${totalCumulativeProfit}` : `-$${Math.abs(totalCumulativeProfit)}`}
            </div>
          </div>
          <div className="h-8 w-0.5 bg-slate-900"></div>
          <div>
            <div className="text-[10px] font-black text-slate-900 uppercase tracking-wider">Round</div>
            <div className="text-xl font-black font-mono text-slate-900">{round} / 5</div>
          </div>
        </div>
      </div>

      {!gameFinished ? (
        <>
          {/* Round Outcome Dialog / Banner */}
          <AnimatePresence>
            {roundResult && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] space-y-4 ${
                  roundResult.eventType === 'win'
                    ? 'bg-emerald-200'
                    : roundResult.eventType === 'loss'
                    ? 'bg-rose-200'
                    : 'bg-cyan-100'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-base font-black text-slate-900 uppercase tracking-wide">
                    {roundResult.eventType === 'win' && <Sparkles className="w-5 h-5 text-emerald-800 stroke-[2.5]" />}
                    {roundResult.eventType === 'loss' && <AlertTriangle className="w-5 h-5 text-rose-800 stroke-[2.5]" />}
                    {roundResult.eventType === 'neutral' && <ShieldCheck className="w-5 h-5 text-cyan-800 stroke-[2.5]" />}
                    <span>Round {round} Market Outcome</span>
                  </div>

                  <span className="text-lg font-black font-mono px-3 py-1 bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] text-slate-900">
                    {roundResult.profit >= 0 ? `+$${roundResult.profit} Net Gain` : `-$${Math.abs(roundResult.profit)} Loss`}
                  </span>
                </div>

                <p className="text-base font-black text-slate-900 leading-snug">
                  {roundResult.headline}
                </p>
                <p className="text-xs text-slate-800 font-bold">
                  {roundResult.note}
                </p>

                <div className="pt-2">
                  <button
                    onClick={advanceNextRound}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black border-2 border-slate-900 text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(6,182,212,1)]"
                  >
                    <span>{round < 5 ? `Proceed to Round ${round + 1}` : 'View Final Career Results'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Drops for Current Round */}
          {!roundResult && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 uppercase tracking-wider">
                  Round {round} Available Sneaker Releases
                </h3>
                <button
                  onClick={handlePass}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-900 font-black border-2 border-slate-900 text-xs uppercase tracking-wider transition shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" /> Pass & Hold Cash
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {drops.map((drop) => {
                  const canAfford1 = cash >= drop.retailPrice;
                  const canAfford2 = cash >= drop.retailPrice * 2;

                  return (
                    <div
                      key={drop.id}
                      className="bg-white p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] space-y-5 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ${
                            drop.hypeLevel === 'High' 
                              ? 'bg-emerald-300 text-slate-900' 
                              : drop.hypeLevel === 'Extreme Bubble Alert' 
                              ? 'bg-rose-400 text-slate-900' 
                              : 'bg-cyan-200 text-slate-900'
                          }`}>
                            {drop.hypeLevel}
                          </span>
                          <span className="text-xs font-mono font-black text-slate-600">
                            {drop.supplyPairs.toLocaleString()} pairs
                          </span>
                        </div>

                        <div>
                          <h4 className="text-lg font-black text-slate-900 leading-tight">
                            {drop.name}
                          </h4>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-0.5">
                            Colorway: {drop.colorway}
                          </p>
                        </div>

                        <div className="p-3 bg-amber-50 border-2 border-slate-900 flex items-center justify-between font-mono text-xs shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                          <span className="text-slate-700 font-black uppercase">Store Retail:</span>
                          <span className="text-base font-black text-slate-900">${drop.retailPrice}</span>
                        </div>

                        <div className="p-3 bg-cyan-50 border-2 border-slate-900 text-xs text-slate-900 space-y-1 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                          <div className="font-black text-slate-900 uppercase flex items-center gap-1">
                            💡 Merrick's Math Advisory:
                          </div>
                          <p className="text-[11px] font-bold leading-relaxed">{drop.merrickAdvisory}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2 pt-2 border-t-2 border-slate-900">
                        <button
                          disabled={!canAfford1}
                          onClick={() => handleDecision(drop, 1)}
                          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white font-black border-2 border-slate-900 text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(6,182,212,1)]"
                        >
                          <span>Buy 1 Pair (${drop.retailPrice})</span>
                        </button>

                        <button
                          disabled={!canAfford2}
                          onClick={() => handleDecision(drop, 2)}
                          className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-30 text-white font-black border-2 border-slate-900 text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                        >
                          <span>Buy 2 Pairs (${drop.retailPrice * 2})</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Game Over Screen */
        <div className="bg-white p-8 border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-orange-500 text-white flex items-center justify-center mx-auto border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <Award className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div>
            <span className="inline-block px-4 py-1.5 border-2 border-slate-900 bg-cyan-300 text-slate-900 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] mb-3">
              {finalRating}
            </span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
              Simulation Completed!
            </h3>
            <p className="text-slate-600 text-xs font-black uppercase tracking-wider mt-1">
              Final financial portfolio statement after 5 market rounds:
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="p-4 bg-amber-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
              <div className="text-xs text-slate-700 font-black uppercase">Final Wealth</div>
              <div className="text-2xl font-black font-mono text-slate-900 mt-1">${cash}</div>
            </div>

            <div className="p-4 bg-emerald-200 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
              <div className="text-xs text-slate-800 font-black uppercase">Net Profit</div>
              <div className={`text-2xl font-black font-mono mt-1 ${totalCumulativeProfit >= 0 ? 'text-emerald-900' : 'text-rose-900'}`}>
                {totalCumulativeProfit >= 0 ? `+$${totalCumulativeProfit}` : `-$${Math.abs(totalCumulativeProfit)}`}
              </div>
            </div>
          </div>

          <div className="p-4 bg-cyan-50 text-left text-xs text-slate-900 space-y-2 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            <div className="font-black text-slate-900 uppercase">Merrick's Final Assessment:</div>
            <p className="leading-relaxed font-bold">
              {cash >= 350 ? (
                "Superb work! You respected market data, took calculated risks on real scarcity, and avoided destructive hype bubbles. You think like a professional investor!"
              ) : cash >= 250 ? (
                "Solid, steady performance! You preserved your paper route earnings and avoided catastrophic losses. With more research, your margins will grow!"
              ) : (
                "You experienced firsthand why buying at the peak of celebrity hype is dangerous. Like Malik in the book, use this lesson to track data rather than following crowds!"
              )}
            </p>
          </div>

          <button
            onClick={restartGame}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black border-2 border-slate-900 text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 mx-auto shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.5]" /> Play Again with New Strategy
          </button>
        </div>
      )}

      {/* Realized Trade History Ledger */}
      {historyLedger.length > 0 && (
        <div className="bg-white p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] space-y-4">
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Accounting Ledger & Realized Transactions
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-slate-900 text-slate-900 uppercase font-black">
                  <th className="py-2.5 px-3">Round</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Cost Basis</th>
                  <th className="py-2.5 px-3">Revenue</th>
                  <th className="py-2.5 px-3">Net Profit</th>
                  <th className="py-2.5 px-3">Outcome Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-bold text-slate-800">
                {historyLedger.map((tx, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-black">R{tx.round}</td>
                    <td className="py-2.5 px-3">{tx.action}</td>
                    <td className="py-2.5 px-3 font-mono">${tx.cost}</td>
                    <td className="py-2.5 px-3 font-mono">${tx.revenue}</td>
                    <td className={`py-2.5 px-3 font-mono font-black ${tx.profit > 0 ? 'text-emerald-700' : tx.profit < 0 ? 'text-rose-700' : 'text-slate-500'}`}>
                      {tx.profit > 0 ? `+$${tx.profit}` : tx.profit < 0 ? `-$${Math.abs(tx.profit)}` : '$0'}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate font-medium">{tx.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
