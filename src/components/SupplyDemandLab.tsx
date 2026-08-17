import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  AlertTriangle, 
  Info, 
  RotateCcw,
  Zap,
  Sliders,
  DollarSign,
  Package
} from 'lucide-react';

export const SupplyDemandLab: React.FC = () => {
  // State sliders
  const [supplyCount, setSupplyCount] = useState<number>(2000); // 500 to 500,000
  const [demandInterest, setDemandInterest] = useState<number>(10000); // 500 to 50,000
  const [retailPrice, setRetailPrice] = useState<number>(100);
  const [hypeMultiplier, setHypeMultiplier] = useState<number>(1.5);

  // Preset scenarios
  const applyPreset = (type: 'neon' | 'comet_peak' | 'restock' | 'general') => {
    switch (type) {
      case 'neon':
        setSupplyCount(2000);
        setDemandInterest(8000);
        setRetailPrice(100);
        setHypeMultiplier(1.5);
        break;
      case 'comet_peak':
        setSupplyCount(3000);
        setDemandInterest(25000);
        setRetailPrice(120);
        setHypeMultiplier(3.0);
        break;
      case 'restock':
        setSupplyCount(350000);
        setDemandInterest(2000);
        setRetailPrice(120);
        setHypeMultiplier(0.5);
        break;
      case 'general':
        setSupplyCount(50000);
        setDemandInterest(50000);
        setRetailPrice(90);
        setHypeMultiplier(1.0);
        break;
    }
  };

  // Economic mathematical calculation of secondary market equilibrium price
  const scarcityRatio = (demandInterest * hypeMultiplier) / Math.max(supplyCount, 100);
  let estimatedResalePrice = Math.round(retailPrice * Math.pow(scarcityRatio, 0.45));
  if (estimatedResalePrice < retailPrice * 0.4) estimatedResalePrice = Math.round(retailPrice * 0.4);
  if (estimatedResalePrice > retailPrice * 4.5) estimatedResalePrice = Math.round(retailPrice * 4.5);

  const profitOrLoss = estimatedResalePrice - retailPrice;
  const roiPercent = Math.round((profitOrLoss / retailPrice) * 100);

  // Scarcity state tag
  let scarcityTag = 'Balanced Market';
  let scarcityColor = 'bg-blue-100 text-blue-900 border-blue-200';
  if (scarcityRatio > 4) {
    scarcityTag = 'Extreme Scarcity (High Resale Hype)';
    scarcityColor = 'bg-purple-100 text-purple-900 border-purple-200';
  } else if (scarcityRatio > 1.5) {
    scarcityTag = 'Healthy Scarcity (Profitable Flip)';
    scarcityColor = 'bg-emerald-100 text-emerald-900 border-emerald-200';
  } else if (scarcityRatio < 0.6) {
    scarcityTag = 'Massive Oversupply / Restock Crash';
    scarcityColor = 'bg-rose-100 text-rose-900 border-rose-200';
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" id="supply-demand-lab-root">
      {/* Top Header */}
      <div className="bg-white p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 border-3 border-slate-900 bg-emerald-400 flex items-center justify-center text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            <TrendingUp className="w-6 h-6 stroke-[3]" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              Supply & Demand Equilibrium Lab
            </h2>
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider">
              Simulate how scarcity, buyer demand, and factory restocks dictate sneaker prices
            </p>
          </div>
        </div>

        {/* Preset Story Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-900 mr-1">Presets:</span>
          <button
            onClick={() => applyPreset('neon')}
            className="px-3 py-1.5 bg-cyan-300 hover:bg-cyan-200 text-slate-900 border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-1"
          >
            🟢 Neon Drifters
          </button>
          <button
            onClick={() => applyPreset('comet_peak')}
            className="px-3 py-1.5 bg-orange-400 hover:bg-orange-300 text-slate-900 border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-1"
          >
            🌟 Comet Peak
          </button>
          <button
            onClick={() => applyPreset('restock')}
            className="px-3 py-1.5 bg-rose-400 hover:bg-rose-300 text-slate-900 border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-1"
          >
            💥 1M Restock
          </button>
          <button
            onClick={() => applyPreset('general')}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
          >
            👟 Regular Mall
          </button>
        </div>
      </div>

      {/* Main Grid: Sliders & Live Graph/Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 bg-white p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] space-y-6">
          <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-orange-500 stroke-[2.5]" /> Market Parameters
            </h3>
            <button
              onClick={() => applyPreset('neon')}
              className="text-xs font-black text-slate-600 hover:text-slate-900 uppercase tracking-wider flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Supply Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900 uppercase flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-cyan-600 stroke-[2.5]" /> Supply (Pairs Made)
              </label>
              <span className="font-mono text-sm font-black text-slate-900 bg-cyan-200 px-2.5 py-0.5 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                {supplyCount.toLocaleString()} pairs
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="500000"
              step="500"
              value={supplyCount}
              onChange={(e) => setSupplyCount(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 border-2 border-slate-900 appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-black uppercase">
              <span>500 (Ultra Limited)</span>
              <span>500,000 (Mass Restock)</span>
            </div>
          </div>

          {/* Demand Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900 uppercase flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" /> Demand (Buyers)
              </label>
              <span className="font-mono text-sm font-black text-slate-900 bg-emerald-300 px-2.5 py-0.5 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                {demandInterest.toLocaleString()} buyers
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={demandInterest}
              onChange={(e) => setDemandInterest(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 border-2 border-slate-900 appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-black uppercase">
              <span>500 (Niche)</span>
              <span>50,000 (Viral Frenzy)</span>
            </div>
          </div>

          {/* Social Media Hype Multiplier */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900 uppercase flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-purple-600 stroke-[2.5]" /> Social Media & Hype
              </label>
              <span className="font-mono text-sm font-black text-slate-900 bg-purple-300 px-2.5 py-0.5 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                {hypeMultiplier.toFixed(1)}x Hype
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="4.0"
              step="0.1"
              value={hypeMultiplier}
              onChange={(e) => setHypeMultiplier(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 border-2 border-slate-900 appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-black uppercase">
              <span>0.5x (Zero Hype)</span>
              <span>4.0x (Viral TikTok)</span>
            </div>
          </div>

          {/* Retail MSRP */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900 uppercase flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-orange-500 stroke-[2.5]" /> Store Retail MSRP
              </label>
              <span className="font-mono text-sm font-black text-slate-900 bg-amber-200 px-2.5 py-0.5 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                ${retailPrice}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="250"
              step="10"
              value={retailPrice}
              onChange={(e) => setRetailPrice(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 border-2 border-slate-900 appearance-none cursor-pointer accent-orange-500"
            />
          </div>
        </div>

        {/* Live Analysis & Visual Curves Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metrics Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <div className="text-xs font-black text-slate-500 uppercase tracking-wider">Original MSRP</div>
              <div className="text-2xl font-black font-mono text-slate-900 mt-1">${retailPrice}</div>
              <div className="text-[11px] font-bold text-slate-500 mt-0.5">Store purchase cost</div>
            </div>

            <div className="bg-white p-5 border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <div className="text-xs font-black text-slate-500 uppercase tracking-wider">Resale Equilibrium</div>
              <div className="text-2xl font-black font-mono text-orange-600 mt-1">${estimatedResalePrice}</div>
              <div className="text-[11px] font-bold text-slate-500 mt-0.5">Secondary clearing price</div>
            </div>

            <div className={`p-5 border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] ${profitOrLoss >= 0 ? 'bg-emerald-200' : 'bg-rose-200'}`}>
              <div className="text-xs font-black uppercase text-slate-900 tracking-wider">Net Profit / Loss</div>
              <div className="text-2xl font-black font-mono mt-1 text-slate-900">
                {profitOrLoss >= 0 ? `+$${profitOrLoss}` : `-$${Math.abs(profitOrLoss)}`}
              </div>
              <div className="text-[11px] font-black mt-0.5 text-slate-900">
                {roiPercent >= 0 ? `+${roiPercent}% ROI` : `${roiPercent}% Loss`}
              </div>
            </div>
          </div>

          {/* Interactive Visual Graph Canvas Card */}
          <div className="bg-white p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600 stroke-[3]" /> Economic Curve Diagram
              </h4>
              <span className="px-3 py-1 text-xs font-black uppercase tracking-wider border-2 border-slate-900 bg-cyan-200 text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                {scarcityTag}
              </span>
            </div>

            {/* Custom SVG Supply & Demand Curve Graph */}
            <div className="w-full h-56 bg-slate-950 p-4 relative overflow-hidden border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between text-white font-mono text-xs">
              {/* SVG Graphic with curves */}
              <svg className="absolute inset-0 w-full h-full p-6" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="40" y1="20" x2="40" y2="170" stroke="#334155" strokeWidth="2" />
                <line x1="40" y1="170" x2="380" y2="170" stroke="#334155" strokeWidth="2" />

                {/* Supply Line & Demand Curve */}
                {(() => {
                  const supplyShift = Math.min(Math.max((supplyCount / 500000) * 120, 0), 120);
                  const demandShift = Math.min(Math.max(((demandInterest * hypeMultiplier) / 200000) * 120, 0), 120);
                  
                  return (
                    <>
                      {/* Demand Curve */}
                      <path 
                        d={`M ${60 + demandShift} 30 Q ${180 + demandShift} 100 ${360} 160`} 
                        stroke="#f43f5e" 
                        strokeWidth="3.5" 
                        fill="none" 
                      />
                      {/* Supply Curve */}
                      <path 
                        d={`M ${60} 160 Q ${200 + supplyShift} 100 ${360 + supplyShift} 30`} 
                        stroke="#10b981" 
                        strokeWidth="3.5" 
                        fill="none" 
                      />

                      {/* Equilibrium Dot */}
                      <circle cx="210" cy="95" r="7" fill="#fbbf24" stroke="#000000" strokeWidth="2" />
                    </>
                  );
                })()}
              </svg>

              {/* Labels on Canvas */}
              <div className="relative z-10 flex justify-between items-start text-[11px] text-slate-400 font-black">
                <span className="text-amber-400">▲ Price ($)</span>
                <span className="flex items-center gap-3">
                  <span className="text-emerald-400 flex items-center gap-1">── Supply (S)</span>
                  <span className="text-rose-400 flex items-center gap-1">── Demand (D)</span>
                  <span className="text-amber-300 flex items-center gap-1">● Equilibrium ($P^*)</span>
                </span>
              </div>

              <div className="relative z-10 flex justify-between items-end text-[11px] text-slate-400 font-black">
                <span>0</span>
                <span className="text-slate-300">Quantity (Q) ▶</span>
              </div>
            </div>

            {/* Economic Explanation */}
            <div className="p-4 bg-amber-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-xs text-slate-900 space-y-1.5">
              <div className="font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-4 h-4 text-orange-500 stroke-[2.5]" /> Merrick's Math Explanation:
              </div>
              <p className="leading-relaxed font-bold">
                {scarcityRatio > 1.5 ? (
                  <>
                    Because only <strong>{supplyCount.toLocaleString()} pairs</strong> were produced while{' '}
                    <strong>{Math.round(demandInterest * hypeMultiplier).toLocaleString()} buyers</strong> are competing, 
                    scarcity is high. Buyers are willing to pay an extra <strong>+${profitOrLoss} premium</strong> over retail.
                  </>
                ) : (
                  <>
                    Because supply is high (<strong>{supplyCount.toLocaleString()} pairs</strong>) relative to demand, 
                    the market has reached a surplus. Resellers have to lower prices to find buyers, resulting in a loss of{' '}
                    <strong className="text-rose-700">-${Math.abs(profitOrLoss)}</strong>.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
