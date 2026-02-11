import React from 'react';
import { Settings, Eye, Layers, StopCircle, Bot } from 'lucide-react';
import { formatMoney, formatToken, ETH_ICON } from '../Shared/Shared';

interface AlgoFormProps {
    amount: string;
    onAmountChange: (val: string) => void;
    balance: number;
    logic: any;
}

export const AlgoForm: React.FC<AlgoFormProps> = ({ amount, onAmountChange, balance, logic }) => {
    const {
        algoStrategy, setAlgoStrategy,
        algoDuration, setAlgoDuration,
        algoRandomize, setAlgoRandomize,
        participationRate, setParticipationRate,
        icebergVisibleAmount, setIcebergVisibleAmount,
        isAlgoRunning, setIsAlgoRunning,
        executionProgress,
        simulation,
        numericPay, isInsufficientBalance,
        handlePercentageClick, isPercentageActive
    } = logic;

    if (isAlgoRunning) {
        return (
            <section className="lg:col-span-4 flex flex-col h-full gap-5">
                <div className="glass-panel p-2 h-full flex flex-col">
                    <div className="bg-[#0a0a0a] rounded-[2.2rem] p-6 border border-white/5 flex flex-col h-full relative overflow-hidden">
                        {/* Background Pulse */}
                        <div className="absolute top-0 right-0 w-full h-full bg-emerald-500/5 animate-pulse pointer-events-none"></div>

                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Engine Active
                            </span>
                            <span className="text-[10px] font-mono font-bold text-zinc-400 tabular-nums">{algoStrategy} • {simulation.numTranches} Tranches</span>
                        </div>

                        <div className="flex-1 flex flex-col justify-center relative z-10 space-y-8">
                            <div className="text-center">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Filled Amount</p>
                                <p className="text-5xl font-mono font-medium text-white tabular-nums tracking-tighter">
                                    {formatToken((parseFloat(amount) || 0) * (executionProgress / 100))} <span className="text-zinc-600 text-3xl">ETH</span>
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                                    <span>Progress</span>
                                    <span>{executionProgress.toFixed(1)}%</span>
                                </div>
                                <div className="h-4 w-full bg-[#050505] rounded-full overflow-hidden border border-white/5 p-0.5">
                                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300 ease-out" style={{ width: `${executionProgress}%` }}></div>
                                </div>
                                <div className="flex justify-center mt-2">
                                    <span className="text-[9px] font-mono text-zinc-400 bg-zinc-900 px-2 py-1 rounded">
                                        Est. Time Remaining: <span className="text-white">{Math.ceil(simulation.avgIntervalMins * (simulation.numTranches * (1 - executionProgress / 100)))}m</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsAlgoRunning(false)}
                            className="mt-auto w-full py-5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-3 relative z-10"
                        >
                            <StopCircle size={16} /> Terminate Strategy
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="lg:col-span-4 flex flex-col h-full gap-5">
            {/* CONFIGURATION STATE */}
            <div className="glass-panel p-2">
                <div className="bg-[#0a0a0a] rounded-[2.2rem] p-6 border border-white/5 space-y-2">

                    {/* 1. PAY INPUT BLOCK */}
                    <div className="bg-[#050505] rounded-3xl p-5 border border-white/5 focus-within:border-emerald-500/30 transition-colors group relative">
                        <div className="flex justify-between items-start mb-4">
                            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] group-focus-within:text-emerald-500 transition-colors">Allocated Capital</label>
                            <div className="text-[9px] font-bold text-zinc-500 bg-zinc-900 px-2 py-1 rounded-lg border border-white/5 flex items-center gap-2">
                                <span>Bal: <span className="font-mono text-zinc-300">{formatToken(balance)}</span></span>
                                <button onClick={() => handlePercentageClick(100)} className="text-emerald-500 hover:text-emerald-400 font-black text-[8px] uppercase">Max</button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <input
                                type="text"
                                value={amount}
                                onChange={(e) => onAmountChange(e.target.value)}
                                className="w-full bg-transparent text-4xl lg:text-5xl font-mono font-medium tracking-tighter text-white placeholder:text-zinc-800 focus:outline-none"
                                placeholder="0.00"
                            />
                            <div className="flex items-center gap-2 bg-zinc-900 border border-white/10 pl-2 pr-3 py-2 rounded-xl shrink-0">
                                <div className="w-6 h-6 rounded-full bg-black border border-white/10 flex items-center justify-center p-0.5">
                                    <img src={ETH_ICON} className="w-full h-full object-contain" alt="ETH" />
                                </div>
                                <span className="font-bold text-white text-sm">ETH</span>
                            </div>
                        </div>

                        {/* Footer: USD Value & Percentages */}
                        <div className="flex justify-between items-center mt-3">
                            <div className="text-xs font-mono font-bold text-zinc-600">
                                ≈ {amount ? formatMoney(simulation.grossValue) : '$0.00'}
                            </div>
                            <div className="flex gap-1">
                                {[25, 50, 75, 100].map(pct => (
                                    <button
                                        key={pct}
                                        onClick={() => handlePercentageClick(pct)}
                                        className={`text-[9px] font-bold px-2 py-1 rounded border transition-all ${isPercentageActive(pct)
                                                ? 'bg-zinc-700 text-white border-white/20 shadow-sm'
                                                : 'text-zinc-600 hover:text-zinc-300 bg-zinc-900/50 border-white/5'
                                            }`}
                                    >
                                        {pct}%
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CONNECTOR */}
                    <div className="relative h-4 w-full flex items-center justify-center z-10 -my-3">
                        <div className="p-1.5 bg-[#0a0a0a] rounded-full border border-white/10 shadow-xl">
                            <div className="bg-zinc-900 p-1.5 rounded-full text-zinc-500">
                                <Bot size={14} />
                            </div>
                        </div>
                    </div>

                    {/* 2. STRATEGY CONFIG BLOCK */}
                    <div className="bg-[#050505] rounded-3xl p-5 border border-white/5 space-y-6">

                        {/* Strategy Selector */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Strategy Engine</label>
                                <Settings size={12} className="text-zinc-600" />
                            </div>
                            <div className="flex bg-zinc-900/80 p-1 rounded-xl border border-white/5">
                                {['TWAP', 'VWAP', 'ICEBERG'].map(strat => (
                                    <button
                                        key={strat}
                                        onClick={() => setAlgoStrategy(strat as any)}
                                        className={`flex-1 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${algoStrategy === strat
                                                ? 'bg-zinc-800 text-white shadow-lg border border-white/10'
                                                : 'text-zinc-500 hover:text-zinc-300'
                                            }`}
                                    >
                                        {strat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dynamic Controls based on Strategy */}
                        {algoStrategy === 'TWAP' && (
                            <div className="space-y-4 animate-in fade-in">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Duration</label>
                                        <span className="text-[10px] font-mono font-bold text-white">{algoDuration} Hours</span>
                                    </div>
                                    <input
                                        type="range" min="0.5" max="24" step="0.5"
                                        value={algoDuration}
                                        onChange={(e) => setAlgoDuration(parseFloat(e.target.value))}
                                        className="w-full h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400"
                                    />
                                </div>
                                <div onClick={() => setAlgoRandomize(!algoRandomize)} className="flex items-center justify-between p-3 bg-zinc-900/50 border border-white/5 rounded-xl cursor-pointer hover:bg-zinc-900 transition-colors">
                                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide">Randomize Intervals</span>
                                    <div className={`w-8 h-4 rounded-full relative transition-colors ${algoRandomize ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${algoRandomize ? 'left-4.5' : 'left-0.5'}`}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {algoStrategy === 'VWAP' && (
                            <div className="space-y-4 animate-in fade-in">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Participation Rate</label>
                                        <span className="text-[10px] font-mono font-bold text-emerald-400">{participationRate}% of Volume</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="50" step="1"
                                        value={participationRate}
                                        onChange={(e) => setParticipationRate(parseFloat(e.target.value))}
                                        className="w-full h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
                                    />
                                </div>
                            </div>
                        )}

                        {algoStrategy === 'ICEBERG' && (
                            <div className="space-y-4 animate-in fade-in">
                                <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-3 flex flex-col gap-1 focus-within:border-emerald-500/30 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Visible Amount</label>
                                        <Eye size={12} className="text-zinc-600" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={icebergVisibleAmount}
                                            onChange={(e) => setIcebergVisibleAmount(e.target.value)}
                                            placeholder="Tip Size"
                                            className="bg-transparent text-sm font-mono font-bold text-white outline-none w-full placeholder:text-zinc-700"
                                        />
                                        <span className="text-[10px] font-bold text-zinc-600">ETH</span>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* EXECUTION ESTIMATE TICKET */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 shadow-inner space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-dashed border-white/10">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Layers size={12} /> Total Tranches
                    </span>
                    <div className="text-right">
                        <span className="text-xs font-mono font-bold text-white block">{simulation.numTranches}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-dashed border-white/10">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Est. Gas Cost</span>
                    <span className="text-xs font-mono font-bold text-zinc-400">
                        ~{formatMoney(simulation.algoTotalGas)}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Avg Interval</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                        {simulation.avgIntervalMins} Mins
                    </span>
                </div>
            </div>

            {/* ACTION BUTTON */}
            <button
                onClick={() => setIsAlgoRunning(true)}
                disabled={numericPay <= 0 || isInsufficientBalance}
                className={`w-full py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl active:scale-[0.98] ${isInsufficientBalance || numericPay <= 0
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                    }`}
            >
                {isInsufficientBalance ? 'Insufficient Balance' : 'Launch Strategy'}
            </button>
        </section>
    );
};