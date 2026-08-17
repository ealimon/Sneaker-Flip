import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  TrendingUp,
  Package,
  Layers
} from 'lucide-react';

export const DealCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState<number>(100);
  const [sellingPrice, setSellingPrice] = useState<number>(150);
  const [quantity, setQuantity] = useState<number>(1);
  const [shippingCost, setShippingCost] = useState<number>(10);
  const [feePercent, setFeePercent] = useState<number>(9.5); // standard 9.5% resale marketplace fee

  // Preset scenarios
  const applyPreset = (preset: 'neon' | 'comet_crash' | 'standard') => {
    if (preset === 'neon') {
      setPurchasePrice(100);
      setSellingPrice(150);
      setQuantity(1);
      setShippingCost(0); // in-person park flip to Leo
      setFeePercent(0);
    } else if (preset === 'comet_crash') {
      setPurchasePrice(300);
      setSellingPrice(100);
      setQuantity(3);
      setShippingCost(15);
      setFeePercent(9.5);
    } else {
      setPurchasePrice(120);
      setSellingPrice(180);
      setQuantity(2);
      setShippingCost(10);
      setFeePercent(9.5);
    }
  };

  // Calculations
  const totalCostBasis = purchasePrice * quantity;
  const grossRevenue = sellingPrice * quantity;
  const platformFees = (grossRevenue * (feePercent / 100));
  const totalExpenses = totalCostBasis + platformFees + (shippingCost * quantity);
  const netProfit = grossRevenue - totalExpenses;
  const roi = totalCostBasis > 0 ? (netProfit / totalCostBasis) * 100 : 0;
  
  // Break-even price per pair
  const breakEvenPrice = (purchasePrice + shippingCost) / (1 - (feePercent / 100));

  // Risk & Grade Calculation
  let grade = 'B';
  let gradeColor = 'text-blue-700 bg-blue-50 border-blue-200';
  let gradeDescription = 'Decent potential return with manageable risk.';

  if (netProfit < 0) {
    grade = 'F (Loss Alert)';
    gradeColor = 'text-rose-700 bg-rose-50 border-rose-300';
    gradeDescription = 'Negative profit! You are losing money on this trade.';
  } else if (roi >= 40) {
    grade = 'A+ (Elite Arbitrage)';
    gradeColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
    gradeDescription = 'Outstanding profit margin and healthy cushion against market shifts!';
  } else if (roi >= 20) {
    grade = 'A (Great Flip)';
    gradeColor = 'text-teal-700 bg-teal-50 border-teal-200';
    gradeDescription = 'Solid return on investment exceeding standard market benchmarks.';
  } else if (roi > 0) {
    grade = 'C (Tight Margin)';
    gradeColor = 'text-amber-700 bg-amber-50 border-amber-200';
    gradeDescription = 'Low profit margin. A small drop in market price could wipe out gains.';
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" id="deal-calculator-root">
      {/* Top Banner */}
      <div className="bg-white p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 border-3 border-slate-900 bg-cyan-400 flex items-center justify-center text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            <Calculator className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              Merrick's Deal Calculator & Risk Analyzer
            </h2>
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider">
              Calculate exact profit margins, platform fees, break-even prices, and risk scores
            </p>
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-slate-900 uppercase">Quick Test:</span>
          <button
            onClick={() => applyPreset('neon')}
            className="px-3 py-1.5 bg-emerald-300 hover:bg-emerald-200 text-slate-900 border-2 border-slate-900 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition"
          >
            🟢 Malik's Neon Drifters Flip
          </button>
          <button
            onClick={() => applyPreset('comet_crash')}
            className="px-3 py-1.5 bg-rose-300 hover:bg-rose-200 text-slate-900 border-2 border-slate-900 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition"
          >
            💥 Comet Kicks Crash Math
          </button>
        </div>
      </div>

      {/* Grid Inputs & Visual Output Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Controls Column */}
        <div className="lg:col-span-6 bg-white p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] space-y-5">
          <h3 className="text-base font-black text-slate-900 pb-2 border-b-2 border-slate-900 flex items-center gap-2 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-orange-500 stroke-[2.5]" /> Transaction Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Purchase Price */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Purchase Price per Pair ($)
              </label>
              <input
                type="number"
                min="1"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-amber-50 border-2 border-slate-900 font-mono text-base font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] focus:bg-white focus:outline-hidden"
              />
            </div>

            {/* Target Selling Price */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Expected Resale Price ($)
              </label>
              <input
                type="number"
                min="0"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-amber-50 border-2 border-slate-900 font-mono text-base font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] focus:bg-white focus:outline-hidden"
              />
            </div>

            {/* Quantity */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Number of Pairs
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-amber-50 border-2 border-slate-900 font-mono text-base font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] focus:bg-white focus:outline-hidden"
              />
            </div>

            {/* Shipping / Box Cost */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Shipping & Box Cost per Pair ($)
              </label>
              <input
                type="number"
                min="0"
                value={shippingCost}
                onChange={(e) => setShippingCost(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-amber-50 border-2 border-slate-900 font-mono text-base font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          {/* Marketplace App Fee */}
          <div className="space-y-2 pt-2 border-t-2 border-slate-900">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                App / Marketplace Fee (%)
              </label>
              <span className="font-mono text-sm font-black text-slate-900 bg-cyan-200 px-2 py-0.5 border border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                {feePercent.toFixed(1)}% fee
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="0.5"
              value={feePercent}
              onChange={(e) => setFeePercent(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 border-2 border-slate-900 appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-black uppercase">
              <span>0% (In-Person Park Meetup)</span>
              <span>9.5% (Standard App)</span>
              <span>15%+ (Consignment Store)</span>
            </div>
          </div>
        </div>

        {/* Financial Results & Assessment Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Profit / Loss Card */}
          <div className={`p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] space-y-4 ${netProfit >= 0 ? 'bg-emerald-200' : 'bg-rose-200'}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                Net Profit / Loss Outcome
              </span>
              <span className="px-3 py-1 bg-white border-2 border-slate-900 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] text-slate-900">
                Grade: {grade}
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <div className="text-4xl md:text-5xl font-black font-mono tracking-tight text-slate-900">
                {netProfit >= 0 ? `+$${netProfit.toFixed(2)}` : `-$${Math.abs(netProfit).toFixed(2)}`}
              </div>
              <div className="text-base font-black font-mono text-slate-800">
                ({roi >= 0 ? `+${roi.toFixed(1)}%` : `${roi.toFixed(1)}%`} ROI)
              </div>
            </div>

            <p className="text-xs text-slate-900 font-bold leading-relaxed">
              {gradeDescription}
            </p>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <div className="text-[10px] text-slate-700 font-black uppercase">Total Cost Basis</div>
              <div className="text-xl font-black font-mono text-slate-900 mt-0.5">
                ${totalCostBasis.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500 font-bold">Total spent on shoes</div>
            </div>

            <div className="bg-white p-4 border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <div className="text-[10px] text-slate-700 font-black uppercase">Gross Revenue</div>
              <div className="text-xl font-black font-mono text-slate-900 mt-0.5">
                ${grossRevenue.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500 font-bold">Total cash collected</div>
            </div>

            <div className="bg-white p-4 border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <div className="text-[10px] text-slate-700 font-black uppercase">Total Fees & Shipping</div>
              <div className="text-xl font-black font-mono text-rose-700 mt-0.5">
                ${(platformFees + (shippingCost * quantity)).toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500 font-bold">Marketplace cuts</div>
            </div>

            <div className="bg-white p-4 border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <div className="text-[10px] text-slate-700 font-black uppercase">Break-Even Price / Pair</div>
              <div className="text-xl font-black font-mono text-cyan-800 mt-0.5">
                ${breakEvenPrice.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500 font-bold">Minimum sale to not lose</div>
            </div>
          </div>

          {/* Educational Formula Card */}
          <div className="bg-white p-5 border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-xs text-slate-900 space-y-2">
            <div className="font-black text-slate-900 uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-500 stroke-[2.5]" /> Merrick's Economics Formula:
            </div>
            <div className="font-mono bg-amber-50 p-2.5 border-2 border-slate-900 text-slate-900 text-[11px] space-y-1 font-bold shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <div>Net Profit = Gross Revenue - Total Purchase Cost - App Fees - Shipping</div>
              <div>ROI % = (Net Profit ÷ Total Purchase Cost) × 100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
