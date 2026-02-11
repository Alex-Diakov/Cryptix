import React from 'react';
import { Sparkles, RefreshCw, Zap, BarChart3, ChevronDown, Layers, Activity, Info, GitMerge, ShieldCheck, Settings2, Check, AlertOctagon } from 'lucide-react';
import { getTokenLogo } from '../Shared/Shared';

interface ExecutionAnalysisProps {
    logic: any;
}

export const SwapAnalysis: React.FC<ExecutionAnalysisProps> = ({ logic }) => {
    const { 
        isSimulating, hasAmount, simulation, isDetailsOpen, setIsDetailsOpen, 
        payToken, receiveToken, isSettingsOpen, setIsSettingsOpen, 
        slippage, setSlippage, useMEVShield, setUseMEVShield
    } = logic;

    return (
        <section className="lg:col-span-6 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col h-full overflow-hidden relative">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                   <Sparkles className="text-purple-500" size={20} /> Execution Intelligence
                </h2>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">AI-Optimized Routing Engine</p>
            </div>
            <div className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-wider flex items-center gap-2 ${isSimulating ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : hasAmount ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-zinc-800 border-white/5 text-zinc-500'}`}>
                {isSimulating ? <RefreshCw size={10} className="animate-spin" /> : hasAmount ? <Zap size={10} /> : null}
                {isSimulating ? 'Scanning' : hasAmount ? 'Optimized' : 'Standby'}
            </div>
          </div>

          <div className="flex flex-col gap-6">
             
             {/* Enhanced Score Card with Progressive Disclosure */}
             <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 overflow-hidden transition-all duration-300">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Execution Quality</span>
                        <div className="flex items-baseline gap-2">
                            <span className={`text-4xl font-mono font-black tracking-tighter ${isSimulating ? 'text-zinc-600 animate-pulse' : 'text-white'}`}>
                                {isSimulating || !hasAmount ? '--' : simulation.routingScore}
                            </span>
                            {!isSimulating && hasAmount && (
                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                                    parseFloat(simulation.routingScore) >= 9 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                                    parseFloat(simulation.routingScore) >= 7 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                                    'bg-rose-500/10 text-rose-500 border-rose-500/20'
                                }`}>
                                    {simulation.scoreLabel}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Circular Gauge Visualization */}
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            {/* Background Track */}
                            <circle cx="50" cy="50" r="42" fill="none" stroke="#18181b" strokeWidth="8" />
                            {/* Progress Arc */}
                            {!isSimulating && hasAmount && (
                                <circle 
                                    cx="50" cy="50" r="42" 
                                    fill="none" 
                                    stroke={parseFloat(simulation.routingScore) >= 7 ? '#10b981' : '#f59e0b'} 
                                    strokeWidth="8" 
                                    strokeDasharray="263.89" 
                                    strokeDashoffset={263.89 - (263.89 * (parseFloat(simulation.routingScore) / 10))} 
                                    strokeLinecap="round"
                                    className="transition-[stroke-dashoffset] duration-1000 ease-out drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]"
                                />
                            )}
                        </svg>
                        {/* Center Icon */}
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                            <BarChart3 size={18} />
                        </div>
                    </div>
                </div>

                {/* Progressive Disclosure Toggle */}
                <button 
                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                    disabled={!hasAmount}
                    className={`w-full flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-[9px] font-bold uppercase tracking-widest transition-colors ${!hasAmount ? 'text-zinc-700 cursor-not-allowed' : 'text-zinc-500 hover:text-white group cursor-pointer'}`}
                >
                    <span>Analysis Factors</span>
                    <ChevronDown size={12} className={`transition-transform duration-300 ${isDetailsOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Hidden Details Content */}
                <div className={`grid grid-cols-2 gap-2 overflow-hidden transition-all duration-300 ease-in-out ${isDetailsOpen && hasAmount ? 'mt-3 max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-zinc-900/50 p-2 rounded-lg border border-white/5 flex flex-col justify-center">
                        <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                            <Layers size={10} /> <span className="text-[8px] uppercase font-bold">Liquidity</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-white">Deep (Tier 1)</span>
                    </div>
                    <div className="bg-zinc-900/50 p-2 rounded-lg border border-white/5 flex flex-col justify-center">
                        <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                            <Activity size={10} /> <span className="text-[8px] uppercase font-bold">Volatility</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-500">Low</span>
                    </div>
                    <div className="bg-zinc-900/50 p-2 rounded-lg border border-white/5 flex flex-col justify-center">
                        <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                            <Zap size={10} /> <span className="text-[8px] uppercase font-bold">Hops</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-white">2 Hops</span>
                    </div>
                    <div className="bg-zinc-900/50 p-2 rounded-lg border border-white/5 flex flex-col justify-center">
                        <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                            <Info size={10} /> <span className="text-[8px] uppercase font-bold">Slippage</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-white">~0.05%</span>
                    </div>
                </div>
             </div>

             {/* Route Visualization - NODE BASED */}
             <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 flex flex-col relative overflow-hidden flex-1 min-h-[240px]">
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                       <GitMerge size={12} /> Smart Route
                    </span>
                    <span className="text-[9px] font-mono text-zinc-600">Latency: 2ms</span>
                </div>

                {!hasAmount && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                        <div className="bg-zinc-900 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                            Enter amount to simulate
                        </div>
                    </div>
                )}

                <div className="space-y-4 relative z-10">
                    {/* Source Node */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-lg border border-white/5">
                            <img src={getTokenLogo(payToken.sym)} className="w-4 h-4 rounded-full" />
                            <span className="text-[10px] font-bold text-white">{payToken.sym}</span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-500">100%</span>
                    </div>

                    {/* Routing Split */}
                    <div className="flex flex-col gap-2 pl-4 border-l border-zinc-800 ml-4 py-2">
                        {simulation.routeSplit.map((route: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-3 relative">
                                <div className="w-4 h-px bg-zinc-800 absolute -left-4"></div>
                                <div className="flex-1 bg-[#121212] border border-white/5 rounded-lg p-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${route.color === 'bg-white' ? 'bg-emerald-500' : 'bg-purple-500'}`}></div>
                                        <span className="text-[10px] font-bold text-zinc-300">{route.dex}</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-500">{route.pct}%</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dest Node */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-lg border border-white/5">
                            <img src={getTokenLogo(receiveToken.sym)} className="w-4 h-4 rounded-full" />
                            <span className="text-[10px] font-bold text-white">{receiveToken.sym}</span>
                        </div>
                    </div>
                </div>
                
                {/* Advanced Settings Drawer */}
                <div className={`mt-auto border-t border-white/5 bg-[#0e0e0e] -mx-5 -mb-5 p-5 transition-all duration-300 ${isSettingsOpen ? 'h-auto' : 'h-14'}`}>
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
                        <div className="flex items-center gap-2 text-[9px] text-emerald-500 font-bold uppercase tracking-wider">
                            <ShieldCheck size={12} /> MEV Protected
                        </div>
                        <button className="text-[9px] font-bold text-zinc-500 hover:text-white flex items-center gap-1 transition-colors">
                            <Settings2 size={10} /> Configure <ChevronDown size={10} className={`transition-transform duration-300 ${isSettingsOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {isSettingsOpen && (
                        <div className="mt-4 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-1">
                            <div>
                                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Max Slippage</label>
                                <div className="flex items-center gap-2">
                                    {[0.1, 0.5, 1.0].map(s => (
                                        <button 
                                            key={s} 
                                            onClick={() => setSlippage(s)}
                                            className={`px-2 py-1 rounded text-[9px] font-bold border ${slippage === s ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-zinc-900 border-white/5 text-zinc-500'}`}
                                        >
                                            {s}%
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Private RPC</label>
                                <button 
                                    onClick={() => setUseMEVShield(!useMEVShield)}
                                    className={`w-full py-1.5 rounded flex items-center justify-center gap-2 text-[9px] font-bold border transition-colors ${useMEVShield ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-zinc-900 border-white/5 text-zinc-500'}`}
                                >
                                    {useMEVShield ? 'Enabled' : 'Disabled'}
                                    {useMEVShield ? <Check size={10} /> : <AlertOctagon size={10} />}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
             </div>
          </div>
      </section>
    );
};