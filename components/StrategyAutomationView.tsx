
import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Filter, 
  Play, 
  ShieldAlert, 
  Plus, 
  MoreHorizontal, 
  Power, 
  Workflow, 
  ArrowRight,
  CheckCircle2,
  X,
  Save,
  Clock,
  Activity,
  Bot,
  PauseCircle,
  StopCircle,
  Settings,
  FileText,
  AlertOctagon,
  TrendingUp,
  BarChart2,
  PieChart,
  CircleDollarSign,
  Wifi,
  AlertTriangle,
  History,
  LayoutList,
  LayoutGrid,
  Search,
  ArrowUpDown,
  RefreshCw,
  Coins,
  Cpu,
  Layers,
  ChevronRight,
  Gauge
} from 'lucide-react';
import { createPortal } from 'react-dom';

// --- TYPES v3.0 ---
type BotState = 'ACTIVE' | 'PAUSED' | 'ERROR' | 'WINDING_DOWN';
type StrategyType = 'GRID' | 'DCA' | 'ARBITRAGE' | 'SCALP' | 'SENTIMENT' | 'MOMENTUM';

interface BotPosition {
  side: 'LONG' | 'SHORT';
  amount: number;
  asset: string;
  leverage: number;
  entryPrice: number;
  currentPnlPercent: number;
  currentPnlUsd: number;
}

interface BotStats {
  id: string;
  name: string;
  strategyType: StrategyType;
  pair: string;
  state: BotState;
  allocation: number;
  position: BotPosition | null;
  dailyPnL: number;
  totalRoiUsd: number;
  totalRoiPercent: number;
  winRate: number;
  trades24h: number;
  riskScore: number; // 1-100
}

// --- DATA GENERATOR (50 Bots) ---
const ASSETS = ['ETH', 'BTC', 'SOL', 'ARB', 'OP', 'MATIC', 'PEPE', 'LINK', 'AAVE', 'UNI'];
const STRATEGIES: StrategyType[] = ['GRID', 'DCA', 'SCALP', 'MOMENTUM'];

const generateBots = (count: number): BotStats[] => {
  return Array.from({ length: count }).map((_, i) => {
    const asset = ASSETS[Math.floor(Math.random() * ASSETS.length)];
    const strategy = STRATEGIES[Math.floor(Math.random() * STRATEGIES.length)];
    const isProfitable = Math.random() > 0.3;
    const allocation = Math.floor(Math.random() * 45000) + 5000;
    
    // Generate realistic PnL
    const roiPercent = isProfitable ? Math.random() * 45 : (Math.random() * -15);
    const roiUsd = (allocation * roiPercent) / 100;
    
    // Status Logic
    let state: BotState = 'ACTIVE';
    if (Math.random() > 0.8) state = 'PAUSED';
    if (Math.random() > 0.95) state = 'ERROR';

    // Position Logic
    let position: BotPosition | null = null;
    if (state === 'ACTIVE' && Math.random() > 0.4) {
       const side = Math.random() > 0.5 ? 'LONG' : 'SHORT';
       const pnlPct = (Math.random() * 10) - 4; // -4% to +6%
       position = {
         side,
         amount: parseFloat((Math.random() * 10).toFixed(2)),
         asset,
         leverage: Math.floor(Math.random() * 10) + 1,
         entryPrice: 0, // Mock
         currentPnlPercent: parseFloat(pnlPct.toFixed(2)),
         currentPnlUsd: (allocation * 0.1 * pnlPct) / 100
       };
    }

    return {
      id: `bot_${i + 1}`,
      name: `${asset} ${strategy} ${i < 9 ? '0' + (i+1) : i+1}`,
      strategyType: strategy,
      pair: `${asset}-USDC`,
      state,
      allocation,
      position,
      dailyPnL: (Math.random() * 500) - 100,
      totalRoiUsd: roiUsd,
      totalRoiPercent: roiPercent,
      winRate: Math.floor(Math.random() * 40) + 40,
      trades24h: Math.floor(Math.random() * 100),
      riskScore: Math.floor(Math.random() * 90) + 10,
    };
  });
};

const INITIAL_BOTS = generateBots(50);

// --- MODAL COMPONENT ---
const HaltModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#09090b] border border-rose-500/30 rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(244,63,94,0.2)] transform animate-in zoom-in-95 duration-200">
         <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-2">
               <AlertOctagon size={32} className="text-rose-500" />
            </div>
            <div>
               <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Emergency Halt</h2>
               <p className="text-sm text-zinc-400 leading-relaxed">
                  This sends a kill signal to <strong>ALL ACTIVE BOTS</strong>. Open positions will be market closed immediately.
               </p>
            </div>
            <div className="flex gap-3 w-full">
               <button onClick={onClose} className="flex-1 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-widest transition-colors">Cancel</button>
               <button onClick={onConfirm} className="flex-1 py-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-widest transition-colors shadow-lg shadow-rose-500/20">Confirm Halt</button>
            </div>
         </div>
      </div>
    </div>,
    document.body
  );
};

const StrategyAutomationView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'dashboard' | 'builder'>('dashboard');
  const [displayMode, setDisplayMode] = useState<'list' | 'grid'>('list'); // 'list' is better for 50 items
  const [bots, setBots] = useState<BotStats[]>(INITIAL_BOTS);
  const [isHaltModalOpen, setIsHaltModalOpen] = useState(false);
  
  // Filters
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof BotStats; direction: 'asc' | 'desc' } | null>({ key: 'totalRoiUsd', direction: 'desc' });

  // --- BUILDER STATE ---
  const [newBotAsset, setNewBotAsset] = useState<string>('ETH');
  const [newBotStrategy, setNewBotStrategy] = useState<StrategyType>('GRID');
  const [newBotAllocation, setNewBotAllocation] = useState<number>(5000);
  const [newBotLeverage, setNewBotLeverage] = useState<number>(1);

  // --- ACTIONS ---
  const toggleBotState = (id: string) => {
    setBots(prev => prev.map(bot => {
      if (bot.id !== id) return bot;
      const newState = bot.state === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
      return { ...bot, state: newState };
    }));
  };

  const executeHalt = () => {
    setBots(prev => prev.map(bot => ({ ...bot, state: 'PAUSED' })));
    setIsHaltModalOpen(false);
  };

  const handleLaunchBot = () => {
    const newBot: BotStats = {
      id: `bot_custom_${Date.now()}`,
      name: `${newBotAsset} ${newBotStrategy} (Custom)`,
      strategyType: newBotStrategy,
      pair: `${newBotAsset}-USDC`,
      state: 'ACTIVE',
      allocation: newBotAllocation,
      position: null,
      dailyPnL: 0,
      totalRoiUsd: 0,
      totalRoiPercent: 0,
      winRate: 0, // Starts at 0
      trades24h: 0,
      riskScore: Math.floor(newBotLeverage * 5 + 10), // Simple mock risk calc
    };

    setBots([newBot, ...bots]);
    setViewMode('dashboard');
  };

  const handleSort = (key: keyof BotStats) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  // --- COMPUTED DATA ---
  const filteredBots = useMemo(() => {
    let result = [...bots];
    if (filterStatus !== 'ALL') {
      result = result.filter(b => b.state === filterStatus);
    }
    if (searchTerm) {
      result = result.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()) || b.pair.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal === bVal) return 0;
        if (aVal === null) return 1;
        if (bVal === null) return -1;
        // @ts-ignore
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        // @ts-ignore
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [bots, filterStatus, searchTerm, sortConfig]);

  const metrics = useMemo(() => {
    return {
      activeBots: bots.filter(b => b.state === 'ACTIVE').length,
      totalAllocation: bots.reduce((acc, b) => acc + b.allocation, 0),
      totalRoi: bots.reduce((acc, b) => acc + b.totalRoiUsd, 0),
      activeExposure: bots.reduce((acc, b) => acc + (b.position ? (b.allocation * 0.1) : 0), 0)
    };
  }, [bots]);

  const fmtUSD = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtPct = (n: number) => `${n > 0 ? '+' : ''}${n.toFixed(2)}%`;

  return (
    <div className="h-full overflow-hidden flex flex-col p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[#050505]">
      <div className="max-w-[1800px] mx-auto w-full h-full flex flex-col">
        
        {/* TOP BAR */}
        <div className="flex justify-between items-start mb-6 shrink-0">
           <div>
              <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                 <Workflow className="text-zinc-400" /> 
                 {viewMode === 'dashboard' ? 'Strategy Automation' : 'Strategy Builder'}
              </h1>
              <p className="text-zinc-400 text-xs font-medium mt-1">
                 {viewMode === 'dashboard' ? 'Manage algorithmic execution, grid bots, and market makers.' : 'Configure and backtest new automated trading strategies.'}
              </p>
           </div>
           
           <div className="flex items-center gap-3">
              {viewMode === 'dashboard' ? (
                 <>
                    <button onClick={() => setIsHaltModalOpen(true)} className="px-4 py-2 bg-rose-500/10 text-rose-500 border border-rose-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all flex items-center gap-2">
                       <AlertOctagon size={14} /> Halt All
                    </button>
                    <button onClick={() => setViewMode('builder')} className="px-4 py-2 bg-emerald-500 text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                       <Plus size={14} /> New Strategy
                    </button>
                 </>
              ) : (
                 <button onClick={() => setViewMode('dashboard')} className="px-4 py-2 bg-zinc-800 text-zinc-300 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">
                    Cancel
                 </button>
              )}
           </div>
        </div>

        {viewMode === 'dashboard' ? (
          <>
            {/* KPI ROW (Refactored to match CFO Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 shrink-0">
               
               {/* 1. ACTIVE FLEET */}
               <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group">
                  <Bot className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 text-white opacity-5 stroke-[1.5px] pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest relative z-10">Active Fleet</span>
                  <div className="mt-4 relative z-10">
                     <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-mono font-bold text-white">{metrics.activeBots}</span>
                        <span className="text-sm text-zinc-500 font-bold">/ {bots.length}</span>
                     </div>
                     <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-5 overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-500 shadow-[0_0_10px_#10b981]" style={{ width: `${(metrics.activeBots / bots.length) * 100}%` }}></div>
                     </div>
                  </div>
               </div>

               {/* 2. TOTAL AUM */}
               <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group">
                  <Coins className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 text-white opacity-5 stroke-[1.5px] pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest relative z-10">Total AUM</span>
                  <div className="mt-4 relative z-10">
                     <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-mono font-bold text-white">{fmtUSD(metrics.totalAllocation)}</span>
                     </div>
                     <div className="mt-2 flex items-center gap-2">
                        <TrendingUp size={12} className="text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">+12% MoM</span>
                     </div>
                  </div>
               </div>

               {/* 3. TOTAL NET PNL */}
               <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group">
                  <TrendingUp className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 text-white opacity-5 stroke-[1.5px] pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest relative z-10">Total Net PnL</span>
                  <div className="mt-4 relative z-10">
                     <div className="flex items-baseline gap-2">
                        <span className={`text-3xl font-mono font-bold ${metrics.totalRoi >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                           {metrics.totalRoi > 0 ? '+' : ''}{fmtUSD(metrics.totalRoi)}
                        </span>
                     </div>
                     <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mt-2 block">All Time Realized</span>
                  </div>
               </div>

               {/* 4. LIVE RISK */}
               <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group">
                  <Activity className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 text-white opacity-5 stroke-[1.5px] pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest relative z-10">Live Risk</span>
                  <div className="mt-4 relative z-10">
                     <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-mono font-bold text-white">{fmtUSD(metrics.activeExposure)}</span>
                     </div>
                     <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">System Healthy</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* CONTROLS */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4 shrink-0 bg-[#0a0a0a] p-2 rounded-xl border border-white/5">
               <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative group flex-1 md:flex-none">
                     <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white" />
                     <input 
                        type="text" 
                        placeholder="Search strategies..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-zinc-900 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs font-medium text-white w-full md:w-64 focus:outline-none focus:border-emerald-500/50"
                     />
                  </div>
                  <div className="h-6 w-px bg-white/10 mx-2 hidden md:block"></div>
                  <div className="flex bg-zinc-900 rounded-lg p-1 border border-white/5">
                     {['ALL', 'ACTIVE', 'PAUSED', 'ERROR'].map(status => (
                        <button 
                           key={status}
                           onClick={() => setFilterStatus(status)}
                           className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider transition-all ${
                              filterStatus === status 
                              ? 'bg-zinc-800 text-white shadow-sm border border-white/10' 
                              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 border border-transparent'
                           }`}
                        >
                           {status}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="flex items-center gap-2">
                  <button 
                     onClick={() => setDisplayMode('list')} 
                     className={`p-2 rounded-lg transition-all border ${
                        displayMode === 'list' 
                        ? 'bg-zinc-800 text-white border-white/10 shadow-sm' 
                        : 'text-zinc-500 hover:text-white border-transparent hover:bg-zinc-800/50'
                     }`}
                  >
                     <LayoutList size={16} />
                  </button>
                  <button 
                     onClick={() => setDisplayMode('grid')} 
                     className={`p-2 rounded-lg transition-all border ${
                        displayMode === 'grid' 
                        ? 'bg-zinc-800 text-white border-white/10 shadow-sm' 
                        : 'text-zinc-500 hover:text-white border-transparent hover:bg-zinc-800/50'
                     }`}
                  >
                     <LayoutGrid size={16} />
                  </button>
               </div>
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 bg-zinc-900/40 border border-white/5 rounded-[2rem] overflow-hidden shadow-xl backdrop-blur-md relative flex flex-col">
               {displayMode === 'list' ? (
                  <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                     <table className="w-full text-left border-collapse">
                        <thead className="bg-[#0a0a0a]/90 backdrop-blur sticky top-0 z-10 text-[9px] font-black uppercase tracking-[0.15em] text-zinc-500 border-b border-white/10">
                           <tr>
                              <th className="py-4 pl-6 cursor-pointer hover:text-zinc-300" onClick={() => handleSort('name')}>Strategy Name <ArrowUpDown size={10} className="inline ml-1"/></th>
                              <th className="py-4">Status</th>
                              <th className="py-4 text-right cursor-pointer hover:text-zinc-300" onClick={() => handleSort('allocation')}>AUM <ArrowUpDown size={10} className="inline ml-1"/></th>
                              <th className="py-4 text-right">24h PnL</th>
                              <th className="py-4 text-right cursor-pointer hover:text-zinc-300" onClick={() => handleSort('totalRoiPercent')}>Total ROI <ArrowUpDown size={10} className="inline ml-1"/></th>
                              <th className="py-4">Active Position</th>
                              <th className="py-4 text-right pr-6">Control</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                           {filteredBots.map((bot) => (
                              <tr key={bot.id} className="group hover:bg-white/[0.02] transition-colors">
                                 <td className="py-3 pl-6">
                                    <div className="flex items-center gap-3">
                                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${bot.state === 'ACTIVE' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-zinc-800 border-white/5 text-zinc-500'}`}>
                                          <Bot size={14} />
                                       </div>
                                       <div>
                                          <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{bot.name}</div>
                                          <div className="text-[9px] text-zinc-500 font-mono">{bot.strategyType} • {bot.pair}</div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="py-3">
                                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider border ${
                                       bot.state === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                       bot.state === 'ERROR' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                                       'bg-zinc-800 text-zinc-500 border-zinc-700'
                                    }`}>
                                       <div className={`w-1.5 h-1.5 rounded-full ${bot.state === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : bot.state === 'ERROR' ? 'bg-rose-500' : 'bg-zinc-500'}`}></div>
                                       {bot.state}
                                    </div>
                                 </td>
                                 <td className="py-3 text-right font-mono text-xs font-bold text-zinc-300">
                                    ${bot.allocation.toLocaleString()}
                                 </td>
                                 <td className="py-3 text-right">
                                    <div className={`text-xs font-mono font-bold ${bot.dailyPnL >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                       {bot.dailyPnL > 0 ? '+' : ''}{bot.dailyPnL.toFixed(2)}
                                    </div>
                                 </td>
                                 <td className="py-3 text-right">
                                    <div className="flex flex-col gap-1.5 items-end">
                                       <div className={`text-xs font-mono font-bold ${bot.totalRoiPercent >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                          {fmtPct(bot.totalRoiPercent)}
                                       </div>
                                       <div className="text-[9px] text-zinc-600 font-mono">
                                          ${Math.floor(bot.totalRoiUsd).toLocaleString()}
                                       </div>
                                    </div>
                                 </td>
                                 <td className="py-3 align-middle">
                                    {bot.state === 'PAUSED' ? (
                                       <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">IDLE</span>
                                    ) : bot.state === 'ERROR' ? (
                                       <span className="text-[10px] text-rose-600 font-bold uppercase tracking-wider">ERROR</span>
                                    ) : bot.position ? (
                                       <div className="flex items-center gap-2">
                                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${bot.position.side === 'LONG' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'}`}>
                                             {bot.position.side} {bot.position.leverage}x
                                          </span>
                                          <span className={`font-mono text-[10px] ${bot.position.currentPnlPercent >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                             {fmtPct(bot.position.currentPnlPercent)}
                                          </span>
                                       </div>
                                    ) : (
                                       <div className="flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                          <span className="text-[10px] text-zinc-300 font-medium tracking-wide">Scanning...</span>
                                       </div>
                                    )}
                                 </td>
                                 <td className="py-3 text-right pr-6">
                                    <div className="flex items-center justify-end gap-2 opacity-100">
                                       <button 
                                          onClick={() => toggleBotState(bot.id)}
                                          className={`p-1.5 rounded-lg transition-all border ${
                                             bot.state === 'ACTIVE' 
                                             ? 'bg-zinc-800/50 text-zinc-400 border-white/5 hover:text-white hover:bg-zinc-800' 
                                             : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500 hover:text-black shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                                          }`}
                                          title={bot.state === 'ACTIVE' ? 'Pause Strategy' : 'Resume Strategy'}
                                       >
                                          {bot.state === 'ACTIVE' ? <PauseCircle size={14} /> : <Play size={14} fill="currentColor" />}
                                       </button>
                                       <button className="p-1.5 bg-zinc-800/50 rounded-lg text-zinc-400 hover:text-white transition-colors border border-white/5 hover:bg-zinc-800">
                                          <Settings size={14} />
                                       </button>
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               ) : (
                  <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {filteredBots.map((bot) => (
                           <div key={bot.id} className={`p-5 rounded-2xl border transition-all hover:bg-zinc-800/30 group ${bot.state === 'ACTIVE' ? 'bg-zinc-900/40 border-white/5' : 'bg-black/20 border-white/5 opacity-70'}`}>
                              <div className="flex justify-between items-start mb-4">
                                 <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${bot.state === 'ACTIVE' ? 'bg-purple-600' : 'bg-zinc-800 text-zinc-500'}`}>
                                       {bot.pair.split('-')[0].substring(0,1)}
                                    </div>
                                    <div>
                                       <div className="text-sm font-bold text-white truncate w-24">{bot.name}</div>
                                       <div className="text-[9px] text-zinc-500 font-black uppercase">{bot.strategyType}</div>
                                    </div>
                                 </div>
                                 <div className={`w-2 h-2 rounded-full ${bot.state === 'ACTIVE' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : bot.state === 'ERROR' ? 'bg-rose-500' : 'bg-zinc-600'}`}></div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                 <div>
                                    <p className="text-[9px] text-zinc-500 uppercase font-bold">Total ROI</p>
                                    <p className={`text-lg font-mono font-bold ${bot.totalRoiPercent >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                       {fmtPct(bot.totalRoiPercent)}
                                    </p>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-[9px] text-zinc-500 uppercase font-bold">AUM</p>
                                    <p className="text-lg font-mono font-bold text-white">${(bot.allocation / 1000).toFixed(1)}k</p>
                                 </div>
                              </div>
                              {bot.position && (
                                 <div className="mb-4 bg-black/40 rounded-lg p-2 flex items-center justify-between border border-white/5">
                                    <span className={`text-[9px] font-black uppercase ${bot.position.side === 'LONG' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                       {bot.position.side} {bot.position.leverage}x
                                    </span>
                                    <span className={`text-xs font-mono font-bold ${bot.position.currentPnlPercent >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                       {fmtPct(bot.position.currentPnlPercent)}
                                    </span>
                                 </div>
                              )}
                              <div className="flex gap-2 mt-auto pt-4 border-t border-white/5">
                                 <button 
                                    onClick={() => toggleBotState(bot.id)}
                                    className={`flex-1 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${
                                       bot.state === 'ACTIVE' 
                                       ? 'bg-zinc-800 text-zinc-400 hover:text-white' 
                                       : 'bg-emerald-600 text-white hover:bg-emerald-500'
                                    }`}
                                 >
                                    {bot.state === 'ACTIVE' ? 'Pause' : 'Resume'}
                                 </button>
                                 <button className="p-2 bg-zinc-800 text-zinc-400 rounded-lg hover:text-white transition-colors">
                                    <Settings size={14} />
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto scrollbar-hide">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* BUILDER: CONFIG COLUMN */}
                <div className="lg:col-span-2 bg-zinc-900/40 border border-white/5 rounded-[2rem] p-8 shadow-xl backdrop-blur-md">
                   <h2 className="text-lg font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                      <Cpu size={18} className="text-emerald-500" />
                      Configuration
                   </h2>
                   
                   <div className="space-y-8">
                      {/* Step 1: Asset Selection */}
                      <div>
                         <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-3">1. Select Asset</label>
                         <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                            {['ETH', 'BTC', 'SOL', 'ARB', 'OP'].map(asset => (
                               <button 
                                  key={asset}
                                  onClick={() => setNewBotAsset(asset)}
                                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                                     newBotAsset === asset 
                                     ? 'bg-zinc-800 border-emerald-500 text-white shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)]' 
                                     : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
                                  }`}
                               >
                                  <span className="text-sm font-bold">{asset}</span>
                               </button>
                            ))}
                         </div>
                      </div>

                      {/* Step 2: Strategy Type */}
                      <div>
                         <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-3">2. Select Strategy</label>
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {STRATEGIES.map(strat => (
                               <button 
                                  key={strat}
                                  onClick={() => setNewBotStrategy(strat)}
                                  className={`p-4 rounded-xl border text-left transition-all ${
                                     newBotStrategy === strat 
                                     ? 'bg-zinc-800 border-emerald-500 text-white shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)]' 
                                     : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
                                  }`}
                               >
                                  <div className="flex items-center justify-between mb-2">
                                     {strat === 'GRID' && <LayoutGrid size={16} />}
                                     {strat === 'DCA' && <Clock size={16} />}
                                     {strat === 'SCALP' && <Zap size={16} />}
                                     {strat === 'MOMENTUM' && <TrendingUp size={16} />}
                                     {newBotStrategy === strat && <CheckCircle2 size={14} className="text-emerald-500" />}
                                  </div>
                                  <span className="text-xs font-black uppercase tracking-wide block mb-1">{strat}</span>
                                  <span className="text-[9px] font-medium opacity-60">
                                     {strat === 'GRID' ? 'Range-bound volatility capture' : 
                                      strat === 'DCA' ? 'Long-term accumulation' :
                                      strat === 'SCALP' ? 'High-freq small gains' : 'Trend following'}
                                  </span>
                               </button>
                            ))}
                         </div>
                      </div>

                      {/* Step 3: Allocation & Leverage */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div>
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-3">3. Allocation (USD)</label>
                            <div className="relative">
                               <input 
                                  type="number" 
                                  value={newBotAllocation}
                                  onChange={(e) => setNewBotAllocation(Number(e.target.value))}
                                  className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3 pl-4 pr-16 text-lg font-mono font-bold text-white focus:outline-none focus:border-emerald-500/50"
                               />
                               <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-600">USDC</div>
                            </div>
                         </div>
                         <div>
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-3">4. Leverage (Max 10x)</label>
                            <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                               <input 
                                  type="range" 
                                  min="1" max="10" step="1"
                                  value={newBotLeverage}
                                  onChange={(e) => setNewBotLeverage(Number(e.target.value))}
                                  className="w-full mr-4 h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer accent-emerald-500"
                               />
                               <span className="text-lg font-mono font-bold text-emerald-500 min-w-[3ch] text-right">{newBotLeverage}x</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* BUILDER: PREVIEW COLUMN */}
                <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-8 shadow-xl backdrop-blur-md flex flex-col">
                   <h2 className="text-lg font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                      <Layers size={18} className="text-purple-500" />
                      Blueprint
                   </h2>

                   <div className="flex-1 space-y-6">
                      <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                         <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-white font-bold border border-white/10">
                                  {newBotAsset.substring(0,1)}
                               </div>
                               <div>
                                  <div className="text-sm font-bold text-white">{newBotAsset} {newBotStrategy}</div>
                                  <div className="text-[9px] text-emerald-500 font-mono">Ready to Deploy</div>
                               </div>
                            </div>
                         </div>
                         <div className="space-y-3 pt-3 border-t border-white/5">
                            <div className="flex justify-between text-[10px]">
                               <span className="text-zinc-500 font-bold uppercase">Strategy</span>
                               <span className="text-white font-mono">{newBotStrategy}</span>
                            </div>
                            <div className="flex justify-between text-[10px]">
                               <span className="text-zinc-500 font-bold uppercase">Exposure</span>
                               <span className="text-white font-mono">${(newBotAllocation * newBotLeverage).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-[10px]">
                               <span className="text-zinc-500 font-bold uppercase">Leverage</span>
                               <span className="text-purple-400 font-mono">{newBotLeverage}x</span>
                            </div>
                         </div>
                      </div>

                      {/* Simulation Stats */}
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 bg-zinc-900/50 rounded-xl border border-white/5 text-center">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-1">Est. APY</span>
                            <span className="text-xl font-mono font-bold text-emerald-400">~{((Math.random() * 20) + 10).toFixed(1)}%</span>
                         </div>
                         <div className="p-4 bg-zinc-900/50 rounded-xl border border-white/5 text-center">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-1">Risk Score</span>
                            <span className={`text-xl font-mono font-bold ${newBotLeverage > 5 ? 'text-rose-500' : 'text-amber-500'}`}>
                               {Math.floor(newBotLeverage * 8 + 20)}/100
                            </span>
                         </div>
                      </div>
                   </div>

                   <button 
                      onClick={handleLaunchBot}
                      className="w-full py-4 mt-6 bg-emerald-500 text-black rounded-xl font-black text-xs uppercase tracking-[0.1em] hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-[0.98]"
                   >
                      <Power size={14} fill="currentColor" /> Launch Strategy
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>
      
      {/* HALT MODAL */}
      <HaltModal 
         isOpen={isHaltModalOpen} 
         onClose={() => setIsHaltModalOpen(false)} 
         onConfirm={executeHalt} 
      />
    </div>
  );
};

export default StrategyAutomationView;
