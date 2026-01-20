
import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  ShieldAlert, 
  AlertTriangle, 
  Loader2, 
  ArrowRight, 
  ArrowDown, 
  ArrowUpRight, 
  ArrowLeftRight, 
  TrendingUp, 
  Radar, 
  Flame, 
  Coins, 
  Cpu,
  BarChart2,
  Shuffle
} from 'lucide-react';
import AssetsTable from './AssetsTable';
import BalanceChart from './BalanceChart';
import WhaleDrawer from './WhaleDrawer';
import TokenDrawer from './TokenDrawer';
import OptimizationDrawer from './OptimizationDrawer';
import BridgeModal from './BridgeModal';
import { MOCK_ASSETS } from '../constants';

interface DashboardProps {
  onTradeClick: (config?: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onTradeClick }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isWhaleDrawerOpen, setIsWhaleDrawerOpen] = useState(false);
  const [isTokenDrawerOpen, setIsTokenDrawerOpen] = useState(false);
  const [isOptimizationDrawerOpen, setIsOptimizationDrawerOpen] = useState(false);
  const [isBridgeModalOpen, setIsBridgeModalOpen] = useState(false);
  
  const [timeRange, setTimeRange] = useState('1W');
  const [benchmarkMode, setBenchmarkMode] = useState<'USD' | 'ETH' | 'BTC'>('USD');

  const handleGenerateStrategy = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsOptimizationDrawerOpen(true);
    }, 2000);
  };

  // --- MATH & LOGIC CHECK ---
  // 1. Calculate Real-Time Totals from MOCK_ASSETS (Single Source of Truth)
  const { totalBalance, totalCostBasis, cryptoTotals } = useMemo(() => {
    return MOCK_ASSETS.reduce((acc, asset) => ({
        totalBalance: acc.totalBalance + asset.value,
        totalCostBasis: acc.totalCostBasis + (asset.avgPurchasePrice * asset.quantity),
        cryptoTotals: {
            ETH: acc.cryptoTotals.ETH + (asset.symbol === 'ETH' ? asset.quantity : 0),
            BTC: acc.cryptoTotals.BTC + (asset.symbol === 'BTC' ? asset.quantity : 0),
        }
    }), { totalBalance: 0, totalCostBasis: 0, cryptoTotals: { ETH: 0, BTC: 0 } });
  }, []);

  const totalPnLValue = totalBalance - totalCostBasis;
  const totalPnLPercent = totalCostBasis > 0 ? (totalPnLValue / totalCostBasis) * 100 : 0;

  // 2. Dynamic PnL Projection based on Time Range
  // In a real app, this would be historical data. Here we project reasonable "past" states.
  const pnlData = useMemo(() => {
    let pct = 0;
    
    switch(timeRange) {
        case '1H': pct = 0.02; break;
        case '1D': pct = 0.19; break;
        case '1W': pct = 2.1; break;
        case '1M': pct = -0.54; break;
        case '1Y': pct = 19.6; break;
        case 'ALL': pct = totalPnLPercent; break; // Use REAL calculated PnL for 'ALL'
        default: pct = 2.1;
    }

    // Calculate dollar value based on the percentage relative to current balance
    // (Simplification for mock: assuming current balance is the result of this growth)
    // Value = Balance - (Balance / (1 + pct/100))
    const impliedStartBalance = totalBalance / (1 + (pct / 100));
    const val = totalBalance - impliedStartBalance;
    
    // For 'ALL', strictly use the calculated Total PnL (Value - Cost Basis)
    const displayVal = timeRange === 'ALL' ? totalPnLValue : val;

    return { 
        val: (displayVal >= 0 ? '+' : '-') + '$' + Math.abs(displayVal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        pct: (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%'
    };
  }, [timeRange, totalBalance, totalPnLValue, totalPnLPercent]);

  const isPositive = pnlData.pct.startsWith('+');

  // Benchmark Conversion (Mock Rates)
  const ETH_PRICE = 3208.93;
  const BTC_PRICE = 63200.00;

  const displayBalance = useMemo(() => {
      if (benchmarkMode === 'USD') return '$' + totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (benchmarkMode === 'ETH') return (totalBalance / ETH_PRICE).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ETH';
      if (benchmarkMode === 'BTC') return (totalBalance / BTC_PRICE).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' BTC';
      return '$0.00';
  }, [benchmarkMode, totalBalance]);

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
        {/* COLUMN 1: MAIN ASSETS & CHARTS (70%) */}
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide p-6 lg:p-8 space-y-8">
            {/* Top Row: Balance & Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-3 min-h-[420px] bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 shadow-xl backdrop-blur-md flex flex-col relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-transparent pointer-events-none"></div>
                    
                    {/* Header Row: Compact Layout */}
                    <div className="flex flex-col gap-5 relative z-10 mb-6 w-full">
                        
                        {/* ROW 1: Label + Controls (Aligned) */}
                        <div className="flex justify-between items-end w-full">
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] ml-1 mb-1">TOTAL BALANCE</p>
                            
                            {/* Controls: Right Aligned */}
                            <div className="flex gap-2 overflow-x-auto max-w-full pb-1">
                                {/* Benchmark Toggle */}
                                <div className="flex p-1 bg-black/40 rounded-xl border border-white/5 shrink-0">
                                    {['USD', 'ETH', 'BTC'].map(b => (
                                        <button 
                                        key={b} 
                                        onClick={() => setBenchmarkMode(b as any)}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${b === benchmarkMode ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                                        >
                                        {b}
                                        </button>
                                    ))}
                                </div>

                                {/* Time Filters */}
                                <div className="flex p-1 bg-black/40 rounded-xl border border-white/5 shrink-0">
                                    {['1H', '1D', '1W', '1M', '1Y', 'ALL'].map(t => (
                                        <button 
                                        key={t} 
                                        onClick={() => setTimeRange(t)}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${t === timeRange ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                                        >
                                        {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ROW 2: Big Number + Actions (Aligned) */}
                        <div className="flex flex-col xl:flex-row justify-between items-end gap-4 w-full">
                            
                            {/* Left: Balance & PnL */}
                            <div className="flex items-baseline gap-4 flex-wrap">
                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                                    {displayBalance}
                                </h2>
                                
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp size={16} className={`${isPositive ? 'text-emerald-500' : 'text-rose-500'}`} />
                                    <span className={`text-lg font-mono font-medium tracking-tight ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {pnlData.val} <span className="text-sm opacity-80">({pnlData.pct})</span>
                                    </span>
                                </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 pl-3 pr-4 py-2 rounded-xl transition-all active:scale-95 group shrink-0">
                                    <div className="bg-white/5 p-1 rounded-lg group-hover:scale-110 transition-transform">
                                    <ArrowDown size={14} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">DEPOSIT</span>
                                </button>
                                
                                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 pl-3 pr-4 py-2 rounded-xl transition-all active:scale-95 group shrink-0">
                                    <div className="bg-white/5 p-1 rounded-lg group-hover:scale-110 transition-transform">
                                    <ArrowUpRight size={14} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">SEND</span>
                                </button>

                                <button 
                                    onClick={() => setIsBridgeModalOpen(true)}
                                    className="flex items-center gap-2 bg-blue-500/5 text-blue-400 border border-blue-500/30 pl-3 pr-4 py-2 rounded-xl hover:bg-blue-500/10 hover:border-blue-500/50 transition-all active:scale-95 shrink-0"
                                >
                                    <div className="p-1 rounded-lg text-blue-400">
                                    <Shuffle size={14} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">BRIDGE</span>
                                </button>

                                <button onClick={() => onTradeClick()} className="flex items-center gap-2 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-500 border border-emerald-500/50 pl-3 pr-4 py-2 rounded-xl transition-all active:scale-95 group shrink-0">
                                    <div className="p-1 rounded-lg group-hover:rotate-180 transition-transform text-emerald-500">
                                    <ArrowLeftRight size={14} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">SWAP</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="flex-1 w-full min-h-[200px] relative z-10 -ml-2">
                        <BalanceChart benchmarkMode={benchmarkMode} />
                    </div>

                    {/* Legend (Bottom) */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500 relative z-10">
                        <div className="flex items-center gap-6">
                            {benchmarkMode !== 'USD' && (
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-zinc-500"></div>
                                    <span>Benchmark ({benchmarkMode})</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Assets Table */}
            <AssetsTable onTradeClick={() => onTradeClick()} />
        </div>

        {/* COLUMN 2: INTELLIGENCE PANEL (30%) */}
        <div className="w-full lg:w-[30%] lg:min-w-[350px] lg:max-w-[450px] bg-[#080808] border-l border-white/5 overflow-y-auto scrollbar-hide p-6 space-y-6 shadow-[-10px_0_40px_-10px_rgba(0,0,0,0.5)] z-20 relative">
           
           <div className="flex items-center space-x-2 mb-2 opacity-90 px-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">MARKET INTELLIGENCE</span>
           </div>

           {/* 1. PROFESSIONAL STRATEGY NODE */}
           <section className="bg-zinc-900/40 border border-white/5 rounded-3xl shadow-2xl backdrop-blur-xl relative overflow-hidden group transition-all duration-500">
             <div className="p-6">
                 {/* Top Header */}
                 <div className="flex justify-between items-center mb-6 h-8">
                    <div className="flex items-center space-x-3">
                        {/* TYPOGRAPHY UPDATE */}
                        <span className="text-[11px] font-black text-zinc-400 uppercase tracking-wide">STRATEGY ENGINE</span>
                    </div>
                    {/* Action Button: Optimize (Triggers Drawer) */}
                    <button 
                      onClick={handleGenerateStrategy}
                      disabled={isGenerating}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-white transition-all border border-white/10 flex items-center space-x-2 disabled:opacity-50"
                    >
                      {isGenerating ? (
                          <>
                             <Loader2 size={12} className="animate-spin" />
                             <span>SCANNING...</span>
                          </>
                      ) : (
                          <>
                             <span>OPTIMIZE</span>
                             <ArrowRight size={12} className="translate-y-[1px]" />
                          </>
                      )}
                    </button>
                 </div>

                 {/* Metrics Grid */}
                 <div className="grid grid-cols-2 gap-3">
                    {/* Left: Risk (Unified Style) */}
                    <div className="bg-zinc-800/40 rounded-xl p-4 flex flex-col justify-between min-h-[100px] hover:bg-zinc-800/60 transition-colors">
                        <div>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block opacity-70">OPTIMIZATION OPPORTUNITY</span>
                            <div className="flex items-center space-x-2 text-amber-500 mb-1">
                                <AlertTriangle size={18} />
                                <span className="text-sm font-black tracking-tighter">Idle Assets Detected</span>
                            </div>
                        </div>
                        <div className="pt-2">
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">High Deployment, Low Yield</span>
                        </div>
                    </div>

                    {/* Right: Opportunity (Unified Style) */}
                    <div className="bg-zinc-800/40 rounded-xl p-4 flex flex-col justify-between min-h-[100px] hover:bg-zinc-800/60 transition-colors">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block opacity-70">POTENTIAL UPSIDE</span>
                        <div className="flex flex-col">
                            <span className="text-xl font-mono font-bold text-emerald-400 leading-none">+$42,440</span>
                            <span className="text-[9px] font-bold text-emerald-500/80 mt-1 uppercase tracking-wider">+8.2% APY</span>
                        </div>
                    </div>
                 </div>
               </div>
           </section>

           {/* 2. SMART MONEY ALIGNMENT */}
           <section className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 flex flex-col hover:bg-zinc-900/60 transition-all backdrop-blur-sm relative overflow-hidden group">
             
             {/* Header */}
             <div className="flex items-center justify-between mb-6 h-8">
                <div className="flex items-center space-x-3">
                  {/* TYPOGRAPHY UPDATE */}
                  <h3 className="text-[11px] font-black text-zinc-400 uppercase tracking-wide">SMART MONEY FLOW</h3>
                </div>
                {/* Button: View Wallets (UPDATED STYLE TO MATCH OTHERS) */}
                <button 
                  onClick={() => setIsWhaleDrawerOpen(true)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-white transition-all border border-white/10 flex items-center space-x-2"
                >
                  <span>WALLETS</span>
                  <ArrowRight size={12} className="translate-y-[1px]" />
                </button>
             </div>

             {/* Main Metric & Badge */}
             <div className="flex items-start justify-between mb-8">
               <div className="flex flex-col items-start">
                 <span className="text-5xl font-mono font-black text-white tracking-tighter leading-none mb-3">88%</span>
                 <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">SMART MONEY TRACKER</span>
                 
                 {/* Status Badge: PASSIVE INDICATOR (Fixed Affordance) */}
                 <div className="flex items-center gap-2 mt-1">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                    <span className="text-emerald-500 text-xs font-bold tracking-wide">ACCUMULATING</span>
                 </div>
               </div>
             </div>

             {/* Footer - GROUPED LAYOUT (Fixed Grouping) */}
             <div className="flex items-center justify-start gap-4 pt-5 border-t border-white/5 mt-auto">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">SMART MONEY FLOW 24H</span>
                
                <div className="flex items-center gap-3">
                    <span className="text-white font-mono font-bold text-sm">+$42.5M</span>
                    
                    {/* Overlapping Icons */}
                    <div className="flex items-center -space-x-2">
                        <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035" className="w-5 h-5 rounded-full border border-black bg-zinc-900 p-0.5 relative z-10" alt="ETH" />
                        <img src="https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=035" className="w-5 h-5 rounded-full border border-black bg-zinc-900 p-0.5 relative z-20" alt="ARB" />
                    </div>
                </div>
             </div>
           </section>

           {/* 3. NARRATIVE SENSOR */}
           <section className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 flex flex-col hover:bg-zinc-900/60 transition-all backdrop-blur-sm relative overflow-hidden group">
             {/* Header */}
             <div className="flex items-center justify-between mb-6 h-8">
               <div className="flex items-center space-x-3">
                 {/* TYPOGRAPHY UPDATE */}
                 <h3 className="text-[11px] font-black text-zinc-400 uppercase tracking-wide">MARKET TRENDS</h3>
               </div>
               {/* Action Button */}
               <button 
                  onClick={() => setIsTokenDrawerOpen(true)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-white transition-all border border-white/10 flex items-center space-x-2"
               >
                  <span>EXPLORE AGENTS</span>
                  <ArrowRight size={12} className="translate-y-[1px]" />
               </button>
             </div>

             {/* Main Insight - UPDATED LAYOUT */}
             <div className="mb-8">
               <div className="flex items-center gap-3 mb-4">
                   <span className="text-xl lg:text-2xl font-black text-white tracking-tighter uppercase">TRENDING SECTOR: AI</span>
                   {/* Badge: TRENDING (Outline Style, Inline) */}
                   <div className="flex items-center gap-1.5 border border-orange-500/50 px-2 py-0.5 rounded text-orange-500 bg-transparent">
                      <Flame size={10} fill="currentColor" />
                      <span className="text-[9px] font-black uppercase tracking-wider">TRENDING</span>
                   </div>
               </div>
               
               {/* Sentiment Score Block (Text First, Bar Second) */}
               <div className="flex flex-col gap-2">
                   <div className="flex justify-between items-end">
                       <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">SENTIMENT SCORE</span>
                       <span className="text-orange-500 font-mono font-bold text-xs">78/100 (HIGH MOMENTUM)</span>
                   </div>
                   
                   {/* Progress Bar */}
                   <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                       <div className="h-full bg-orange-500 w-[78%] shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                   </div>
               </div>
             </div>

             {/* Flow Visualization */}
             <div className="mb-0 bg-zinc-800/30 p-4 rounded-xl border-none">
               {/* Net Inflow (Proximity Fix) */}
               <div className="flex items-center justify-start gap-4 mb-4">
                   <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">NET INFLOW 24H</span>
                   <span className="text-sm font-mono font-bold text-emerald-400">+$18.5M</span>
               </div>
               
               {/* Simplified Flow Arrow (Fix Affordance - No Slider Thumb) */}
               <div className="flex items-center justify-between gap-3">
                   <div className="flex items-center space-x-2">
                       <Coins size={14} className="text-zinc-400" />
                       <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">STABLES</span>
                   </div>
                   
                   {/* Gradient Line with Arrow */}
                   <div className="flex-1 h-px bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 relative">
                        <ArrowRight size={12} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-400" />
                   </div>

                   <div className="flex items-center space-x-2">
                       <Cpu size={14} className="text-purple-400" />
                       <span className="text-[10px] font-bold text-purple-200 uppercase tracking-widest">AI TOKENS</span>
                   </div>
               </div>
             </div>
           </section>
      </div>

      <WhaleDrawer isOpen={isWhaleDrawerOpen} onClose={() => setIsWhaleDrawerOpen(false)} />
      <TokenDrawer isOpen={isTokenDrawerOpen} onClose={() => setIsTokenDrawerOpen(false)} />
      <OptimizationDrawer isOpen={isOptimizationDrawerOpen} onClose={() => setIsOptimizationDrawerOpen(false)} />
      <BridgeModal 
        isOpen={isBridgeModalOpen} 
        onClose={() => setIsBridgeModalOpen(false)} 
        onSwitchToAlgo={() => {
            setIsBridgeModalOpen(false);
            onTradeClick({ mode: 'algo', strategy: 'TWAP', tranches: 3 });
        }}
      />
    </div>
  );
};

export default Dashboard;
