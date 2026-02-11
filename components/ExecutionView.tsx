import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Settings, Ghost, LayoutGrid } from 'lucide-react';
import SwapPanel from './trade/Swap/SwapPanel';
import LimitPanel from './trade/Limit/LimitPanel';
import AlgoPanel from './trade/Algo/AlgoPanel';

interface ExecutionViewProps {
  initialState?: any;
}

const ExecutionView: React.FC<ExecutionViewProps> = ({ initialState }) => {
  const [activeMode, setActiveMode] = useState<'swap' | 'limit' | 'algo'>('swap');
  const [sharedAmount, setSharedAmount] = useState('');
  
  // Mock balance for all panels
  const ETH_BALANCE = 350.0000;

  useEffect(() => {
    if (initialState) {
        if (initialState.mode) setActiveMode(initialState.mode);
        // Pre-fill amount if suggested by bridge/dashboard
        if (initialState.mode === 'algo' && !sharedAmount) {
            setSharedAmount('38.50'); 
        }
    }
  }, [initialState]);

  return (
    <div className="h-full flex flex-col">
        {/* NEW HEADER STRUCTURE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 shrink-0">
            <div>
              <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                <ArrowLeftRight className="text-zinc-400" />
                Instant Trade
              </h1>
              <p className="text-zinc-400 text-xs font-medium mt-1 ml-10">
                Institutional execution engine with smart routing and algo strategies.
              </p>
            </div>

            <div className="flex bg-[#0a0a0a] p-1.5 rounded-xl border border-white/5 shadow-inner">
                <button 
                    onClick={() => setActiveMode('swap')}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeMode === 'swap' 
                        ? 'bg-zinc-800 text-white shadow-sm' 
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                    }`}
                >
                    Swap
                </button>
                <button 
                    onClick={() => setActiveMode('limit')}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeMode === 'limit' 
                        ? 'bg-zinc-800 text-white shadow-sm' 
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                    }`}
                >
                    Limit
                </button>
                <button 
                    onClick={() => setActiveMode('algo')}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                        activeMode === 'algo' 
                        ? 'bg-zinc-800 text-white shadow-sm' 
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                    }`}
                >
                    <Ghost size={12} /> Algo
                </button>
            </div>
        </div>

        {/* MAIN CONTENT GRID - Renders specific panel */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start h-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            {activeMode === 'swap' && (
                <SwapPanel amount={sharedAmount} onAmountChange={setSharedAmount} balance={ETH_BALANCE} />
            )}
            {activeMode === 'limit' && (
                <LimitPanel amount={sharedAmount} onAmountChange={setSharedAmount} balance={ETH_BALANCE} />
            )}
            {activeMode === 'algo' && (
                <AlgoPanel amount={sharedAmount} onAmountChange={setSharedAmount} balance={ETH_BALANCE} />
            )}
        </div>
    </div>
  );
};

export default ExecutionView;