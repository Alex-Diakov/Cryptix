
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, TrendingUp, ArrowLeftRight, Zap, AlertTriangle } from 'lucide-react';

interface TokenDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const TokenDrawer: React.FC<TokenDrawerProps> = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  // Live Data Simulation
  const CURRENT_PRICE = 2.45;
  const TARGET_PRICE = 3.10;
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const portalRoot = document.getElementById('portal-root') || document.body;

  return createPortal(
    <div className="relative z-[9999]">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[480px] bg-[#09090b] border-l border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,1)] transition-transform duration-500 ease-in-out flex flex-col z-[10000] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* HEADER SECTION */}
        <div className="flex-shrink-0 pt-16 px-8 pb-6 border-b border-white/5 bg-zinc-900/80 backdrop-blur-xl relative">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors p-2 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10"
          >
            <X size={18} />
          </button>
          
          <div className="flex items-start space-x-4 mb-5">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
               <img src="https://logotyp.us/file/fetch-ai.svg" alt="Fetch ai" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">FET</h1>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest bg-zinc-800 text-zinc-400 border border-white/10">
                  AI Sector
                </span>
              </div>
              <span className="text-zinc-500 text-xs font-medium">Fetch.ai Network</span>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
               <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Price</p>
               <div className="flex items-baseline space-x-2">
                 <span className="text-3xl font-mono font-black text-white tracking-tighter">${CURRENT_PRICE.toFixed(2)}</span>
                 <span className="text-xs font-bold text-emerald-500 flex items-center">
                   <TrendingUp size={10} className="mr-1" />
                   +12.4%
                 </span>
               </div>
            </div>
            <div className="text-right">
               <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Vol 24H</p>
               <span className="text-lg font-mono font-bold text-zinc-300">$428M</span>
            </div>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide bg-[#09090b]">
          
          {/* BLOCK 1: FUNDAMENTAL THESIS */}
          <section>
             <div className="mb-3 border-b border-white/5 pb-2">
                <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Fundamental Thesis</h3>
             </div>
             <div className="bg-zinc-900/30 border border-white/5 p-5 rounded-lg relative overflow-hidden">
                <div className="relative z-10">
                   <p className="text-xs font-medium text-zinc-400 leading-relaxed">
                     <strong className="text-white">Sector Rotation:</strong> FET lags sector avg by <span className="text-zinc-200 border-b border-zinc-600">15%</span>. Rotation from NVIDIA equities into top-cap Crypto AI assets expected this week.
                   </p>
                </div>
             </div>
          </section>

          {/* BLOCK 2: DATA CONFLUENCE (List View) */}
          <section>
             <div className="mb-3 border-b border-white/5 pb-2">
                <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Data Confluence</h3>
             </div>
             <div className="bg-zinc-900/30 border border-white/5 rounded-lg flex flex-col divide-y divide-white/5">
                
                {/* Row 1 */}
                <div className="flex items-center justify-between p-4">
                   <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Net Inflow (24H)</span>
                   <span className="text-xs font-mono font-bold text-emerald-500">+$8.2M</span>
                </div>

                {/* Row 2 */}
                <div className="flex items-center justify-between p-4">
                   <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Market Structure</span>
                   <span className="text-xs font-bold text-white uppercase tracking-wider">Retest Support</span>
                </div>

                {/* Row 3 */}
                <div className="flex items-center justify-between p-4">
                   <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Momentum Trend</span>
                   <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">High Momentum</span>
                   </div>
                </div>

             </div>
          </section>

          {/* BLOCK 3: TRADE PARAMETERS (STRICT GRID) */}
          <section>
             <div className="mb-3 border-b border-white/5 pb-2">
                <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Trade Parameters</h3>
             </div>
             <div className="bg-zinc-900/30 border border-white/5 rounded-lg p-6 grid grid-cols-3 gap-6">
                
                {/* 1. ENTRY ZONE */}
                <div className="flex flex-col border-r border-white/5">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Entry Zone</span>
                    <span className="text-sm font-mono font-bold text-white">$2.20 - $2.30</span>
                </div>

                {/* 2. INVALIDATION */}
                <div className="flex flex-col border-r border-white/5 pl-4">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Invalidation</span>
                    <span className="text-sm font-mono font-bold text-rose-500">$2.10</span>
                    <span className="text-[9px] font-mono font-bold text-rose-500/70 mt-1">-4.3%</span>
                </div>

                {/* 3. TARGET */}
                <div className="flex flex-col pl-4">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Target</span>
                    <span className="text-sm font-mono font-bold text-emerald-500">$3.10</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-500/70 mt-1">R:R 2.6</span>
                </div>
                
             </div>
             <div className="mt-2 flex items-center justify-end">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle size={10} className="text-zinc-500" />
                    Strict Stop Loss Required
                </span>
             </div>
          </section>
        </div>

        {/* STICKY FOOTER CTA */}
        <div className="flex-shrink-0 p-6 border-t border-white/5 bg-zinc-950/90 backdrop-blur-xl">
           
           {/* Context Info */}
           <div className="flex justify-between items-center mb-4 px-1">
               <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-medium">
                   <ArrowLeftRight size={12} />
                   <span>ETH <span className="text-zinc-600">→</span> FET via <span className="text-white font-bold">Uniswap V3</span></span>
               </div>
               
               <div className="text-[10px] text-zinc-500 font-medium">
                 Fee: <span className="text-zinc-300">~$4.50</span>
              </div>
           </div>

           {/* Primary Action Button */}
           <button className="w-full py-4 bg-emerald-500 text-black rounded-lg font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:bg-emerald-400 transition-all active:scale-[0.98] flex items-center justify-center space-x-2 group">
              <Zap size={16} fill="currentColor" className="group-hover:scale-110 transition-transform" />
              <span>EXECUTE SWAP</span>
           </button>
           
        </div>

      </div>
    </div>,
    portalRoot
  );
};

export default TokenDrawer;
