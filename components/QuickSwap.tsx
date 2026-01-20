
import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

const QuickSwap: React.FC = () => {
  const [amount, setAmount] = useState('0.15');
  const USDC_ICON = 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035';
  const ETH_ICON = 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035';

  return (
    <div className="bg-zinc-900/40 border border-white/5 rounded-[2.2rem] p-8 shadow-xl backdrop-blur-md h-full flex flex-col">
      
      <div className="space-y-2 flex-1 flex flex-col justify-center">
        {/* From Section */}
        <div className="bg-black/40 border border-white/5 rounded-3xl p-5 relative group focus-within:border-emerald-500/30 transition-all">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Pay</span>
            <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">Balance: <span className="font-mono text-zinc-400">350.00</span></div>
          </div>
          <div className="flex justify-between items-center">
            <input 
              type="text" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-2xl font-mono font-bold text-white focus:outline-none w-full" 
            />
            <button className="flex items-center space-x-2 bg-zinc-800 border border-white/10 px-3 py-1.5 rounded-xl hover:bg-zinc-700 transition-colors shrink-0">
              <div className="w-5 h-5 rounded-full bg-indigo-600 border border-white/5 flex items-center justify-center overflow-hidden">
                <img src={ETH_ICON} alt="ETH" className="w-full h-full object-contain p-0.5" />
              </div>
              <span className="text-xs font-bold">ETH</span>
              <ChevronDown size={14} className="text-zinc-500" />
            </button>
          </div>
        </div>

        {/* Swap Button Divider */}
        <div className="flex justify-center -my-4 relative z-10">
          <button className="w-10 h-10 bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-emerald-500 hover:border-emerald-500 transition-all shadow-xl ring-4 ring-[#050505] group">
            <ArrowUpDown size={16} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* To Section */}
        <div className="bg-black/40 border border-white/5 rounded-3xl p-5 focus-within:border-emerald-500/30 transition-all">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Receive</span>
            <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">Balance: <span className="font-mono text-zinc-400">2,500.00</span></div>
          </div>
          <div className="flex justify-between items-center">
            <input 
              type="text" 
              placeholder="0.00"
              className="bg-transparent text-2xl font-mono font-bold text-white focus:outline-none w-full" 
              readOnly
              value={(parseFloat(amount || '0') * 3208.93).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            />
            <button className="flex items-center space-x-2 bg-zinc-800 border border-white/10 px-3 py-1.5 rounded-xl hover:bg-zinc-700 transition-colors shrink-0">
              <div className="w-5 h-5 rounded-full bg-blue-600 border border-white/5 flex items-center justify-center overflow-hidden">
                <img src={USDC_ICON} alt="USDC" className="w-full h-full object-contain p-0.5" />
              </div>
              <span className="text-xs font-bold">USDC</span>
              <ChevronDown size={14} className="text-zinc-500" />
            </button>
          </div>
        </div>
      </div>

      <button className="mt-8 w-full py-4 bg-zinc-800 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all flex items-center justify-center space-x-2 group">
        <span>VISUALIZE ROUTE</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

export default QuickSwap;
