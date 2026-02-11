import React from 'react';
import { Sparkles, TrendingUp, Clock, ChevronDown, Activity, Cpu } from 'lucide-react';
import { ComposedChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { formatMoney } from '../Shared/Shared';

interface AlgoAnalysisProps {
    logic: any;
}

export const AlgoAnalysis: React.FC<AlgoAnalysisProps> = ({ logic }) => {
    const { 
        simulation, isDetailsOpen, setIsDetailsOpen, 
        numericPay, algoRandomize 
    } = logic;

    return (
        <section className="lg:col-span-6 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col h-full overflow-hidden relative">
          
          <div className="flex justify-between items-start mb-8">
            <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                   <Sparkles className="text-purple-500" size={20} /> Execution Intelligence
                </h2>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Algorithmic Advantage</p>
            </div>
            {numericPay > 0 && (
                <div className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp size={12} /> Alpha Gen Active
                </div>
            )}
          </div>

          <div className="flex flex-col gap-6 flex-1 overflow-y-auto scrollbar-hide">
             
             {/* 1. Advantage Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Card 1: Impact Savings */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex flex-col justify-center relative overflow-hidden group">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 relative z-10">Impact Saved</span>
                    <div className="flex items-baseline gap-1 relative z-10">
                        <span className={`text-2xl font-mono font-bold ${numericPay > 0 ? 'text-emerald-400' : 'text-zinc-500'}`}>
                            {numericPay > 0 ? `+${formatMoney(simulation.netSavings)}` : '$0.00'}
                        </span>
                    </div>
                    <div className="text-[9px] text-zinc-600 mt-1 relative z-10">vs Market Dump</div>
                    {/* Decor */}
                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><TrendingUp size={40} /></div>
                </div>

                {/* Card 2: Market Signal */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Alpha Source</span>
                    <span className="text-lg font-bold text-white leading-tight">{simulation.alphaSource}</span>
                    <div className="text-[9px] text-purple-400 mt-1">Reduced Slippage</div>
                </div>

                {/* Card 3: Total Cost */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Total Algo Cost</span>
                    <span className="text-2xl font-mono font-bold text-zinc-300">
                        {formatMoney(simulation.totalAlgoCost)}
                    </span>
                    <div className="text-[9px] text-zinc-600 mt-1">Gas + Fees</div>
                </div>
             </div>

             {/* 2. Schedule Visualization (Progressive Reveal) */}
             <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 flex flex-col flex-1 min-h-[240px] overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                       <Clock size={12} /> Execution Schedule
                    </span>
                    <button 
                        onClick={() => setIsDetailsOpen(!isDetailsOpen)} 
                        className="text-[9px] font-bold text-zinc-500 hover:text-white uppercase tracking-wider flex items-center gap-1 transition-colors"
                    >
                        Strategy Parameters <ChevronDown size={10} className={`transition-transform duration-300 ${isDetailsOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>
                
                {/* Hidden Detailed Metrics (Progressive Disclosure) */}
                <div className={`grid grid-cols-2 gap-2 overflow-hidden transition-all duration-300 ease-in-out mb-4 ${isDetailsOpen ? 'max-h-40 opacity-100 pb-4 border-b border-white/5' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-zinc-900/50 p-3 rounded-xl border border-white/5 flex flex-col justify-center">
                        <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                            <Activity size={12} /> <span className="text-[9px] uppercase font-bold">Variance</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-white">{algoRandomize ? 'High (Randomized)' : 'Low (Fixed)'}</span>
                    </div>
                    <div className="bg-zinc-900/50 p-3 rounded-xl border border-white/5 flex flex-col justify-center">
                        <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                            <Cpu size={12} /> <span className="text-[9px] uppercase font-bold">Latency</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-500">~12ms</span>
                    </div>
                </div>

                <div className="flex-1 w-full min-h-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={simulation.scheduleData} margin={{top: 10, right: 10, left: -20, bottom: 0}}>
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.8}/>
                                    <stop offset="100%" stopColor="#a855f7" stopOpacity={0.3}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#52525b', fontSize: 9, fontWeight: 700 }} interval="preserveStartEnd" />
                            <YAxis hide />
                            <Tooltip 
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                                contentStyle={{ backgroundColor: '#09090b', borderColor: '#333', borderRadius: '12px', fontSize: '10px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="volume" barSize={20} radius={[4, 4, 4, 4]}>
                                {simulation.scheduleData.map((entry: any, index: number) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={entry.status === 'executed' ? '#3f3f46' : entry.status === 'active' ? '#10b981' : 'url(#barGradient)'} 
                                        stroke={entry.status === 'pending' ? 'none' : 'none'} 
                                    />
                                ))}
                            </Bar>
                            {/* Trend Line Overlay */}
                            <Line type="monotone" dataKey="volume" stroke="#3f3f46" strokeWidth={2} strokeDasharray="3 3" dot={false} opacity={0.3} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
             </div>

          </div>
      </section>
    );
};