
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_ORDER_BOOK, MOCK_RECENT_TRADES } from '../constants';
import { 
  ChevronDown, 
  ArrowUpRight, 
  TrendingUp, 
  Maximize2, 
  Zap, 
  MousePointer2, 
  PenTool, 
  Hash, 
  Eye,
  Settings2,
  Lock,
  Unlock,
  Activity,
  Timer,
  Info,
  Layers,
  Crosshair,
  GripHorizontal,
  X,
  AlertTriangle,
  Wallet,
  Globe,
  Filter,
  CircleDollarSign,
  ShieldCheck
} from 'lucide-react';

const ProTradingView: React.FC = () => {
  // --- STATE: ORDER ENTRY ---
  const [orderType, setOrderType] = useState<'limit' | 'market' | 'stop' | 'oco'>('limit');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState('3208.93');
  const [amount, setAmount] = useState('');
  const [leverage, setLeverage] = useState(10);
  const [marginMode, setMarginMode] = useState<'CROSS' | 'ISOLATED'>('CROSS');
  
  // Advanced Order Settings
  const [postOnly, setPostOnly] = useState(false);
  const [reduceOnly, setReduceOnly] = useState(false);
  const [tif, setTif] = useState<'GTC' | 'IOC' | 'FOK'>('GTC');
  
  // Risk Management Inputs
  const [tpPrice, setTpPrice] = useState('');
  const [slPrice, setSlPrice] = useState('');

  // --- STATE: VISUALS ---
  const [showWhalesOnly, setShowWhalesOnly] = useState(true);

  // --- MOCK DATA GENERATION ---
  const candles = useMemo(() => [...Array(60)].map((_, i) => {
    const isUp = Math.random() > 0.48;
    const base = 20 + Math.random() * 50;
    const bodySize = 5 + Math.random() * 25;
    
    let open, close;
    if (isUp) {
      open = base;
      close = base + bodySize;
    } else {
      open = base + bodySize;
      close = base;
    }
    
    const high = Math.max(open, close) + (Math.random() * 10);
    const low = Math.min(open, close) - (Math.random() * 10);
    
    return { isUp, high, low, open, close };
  }), []);

  const lastCandle = candles[candles.length - 1];
  const currentPriceLevel = lastCandle.close; // Abstract percentage for chart visualization
  const currentMarketPrice = 3208.93;

  // Mock Whale Bubbles
  const whaleTrades = useMemo(() => {
     return Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        size: Math.random() * 100 + 20, // visual size
        volume: (Math.random() * 500 + 100).toFixed(0) + 'K', // label
        side: Math.random() > 0.5 ? 'buy' : 'sell',
        time: `${Math.floor(Math.random()*10)}m ago`
     }));
  }, []);

  const priceScale = [3260, 3240, 3220, 3200, 3180, 3160, 3140];
  const timeScale = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30'];

  const handlePriceClick = (newPrice: number) => {
    setPrice(newPrice.toFixed(2));
  };

  // --- CALCULATIONS ---
  const marginUsed = parseFloat(amount || '0') * parseFloat(price) / leverage;
  const availableBalance = 42500.00;
  const marginRatio = Math.min((marginUsed / availableBalance) * 100, 100);
  const slLoss = slPrice && amount ? (parseFloat(slPrice) - parseFloat(price)) * parseFloat(amount) : 0;

  return (
    <div className="flex flex-col h-full space-y-3 animate-in fade-in duration-500 text-[12px] bg-[#050505]">
      
      {/* 1. DERIVATIVES MARKET HEADER */}
      <header className="grid grid-cols-2 md:grid-cols-8 gap-px bg-zinc-800 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl shrink-0">
        <div className="bg-[#0a0a0a] p-3 flex items-center justify-between border-r border-zinc-800 col-span-2 md:col-span-1">
          <div className="flex flex-col">
            <span className="text-[9px] text-zinc-400 font-black uppercase mb-0.5 tracking-wider flex items-center gap-1">
                <Globe size={10} /> Perp
            </span>
            <button className="flex items-center space-x-2 text-white hover:text-emerald-500 transition-colors group">
              <span className="text-[14px] font-black tracking-tighter">ETH-PERP</span>
              <ChevronDown size={14} className="text-zinc-600 group-hover:text-white" />
            </button>
          </div>
        </div>
        
        {/* Market Data Cells */}
        {[
          { label: 'Mark Price', val: '3,209.12', color: 'text-white' },
          { label: 'Index Price', val: '3,210.50', color: 'text-zinc-400' },
          { label: 'Funding / 8h', val: '0.0100%', sub: '03:42:12', color: 'text-amber-500' },
          { label: '24h Change', val: '+4.82%', color: 'text-emerald-500' },
          { label: '24h Volume', val: '412.5M', color: 'text-zinc-200' },
          { label: 'Open Interest', val: '1.2B', color: 'text-zinc-200' },
          { label: '24h Volatility', val: '3.2%', color: 'text-purple-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0a0a0a] p-2.5 border-r border-zinc-800 last:border-0 flex flex-col justify-center">
            <p className="text-[9px] text-zinc-500 font-bold uppercase mb-1 tracking-tight">{stat.label}</p>
            <div className="flex items-baseline gap-2">
                <p className={`${stat.color} font-mono font-bold text-xs`}>{stat.val}</p>
                {stat.sub && <span className="text-[9px] font-mono text-zinc-600">{stat.sub}</span>}
            </div>
          </div>
        ))}
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-3 flex-1 overflow-hidden">
        
        {/* --------------------------------------------------------
            LEFT: AGGREGATED ORDER BOOK 
           -------------------------------------------------------- */}
        <section className="col-span-12 lg:col-span-2 bg-[#0f0f0f] border border-zinc-800 rounded-lg flex flex-col overflow-hidden h-full">
          <div className="p-2.5 border-b border-zinc-800 bg-[#0a0a0a] flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Layers size={12} className="text-zinc-400" />
                <h3 className="text-[10px] font-black uppercase text-zinc-300 tracking-widest">Aggregated Book</h3>
            </div>
            <div className="flex gap-1">
                {['B', 'C', 'O', 'U'].map(ex => (
                    <div key={ex} className="w-4 h-4 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[8px] font-bold text-zinc-400" title="Source Active">
                        {ex}
                    </div>
                ))}
            </div>
          </div>
          
          <div className="p-2 grid grid-cols-3 text-[9px] font-black uppercase text-zinc-500 border-b border-zinc-900/50 text-right tracking-tight">
            <span className="text-left pl-2">Price</span>
            <span>Size</span>
            <span>Sum</span>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
            {/* ASKS (Sells) */}
            <div className="flex flex-col-reverse justify-end pb-1 min-h-0 overflow-hidden">
                <div className="space-y-[1px]">
                {[...MOCK_ORDER_BOOK.asks].reverse().map((ask, i) => (
                    <div 
                    key={`ask-${i}`} 
                    onClick={() => handlePriceClick(ask.price)}
                    className="grid grid-cols-3 text-[11px] font-mono py-0.5 px-2 hover:bg-zinc-800 cursor-pointer group relative transition-colors text-right items-center"
                    >
                    <div className="absolute inset-y-0 right-0 bg-rose-500/10 pointer-events-none transition-all" style={{ width: `${(ask.amount / 20) * 100}%` }}></div>
                    <div className="flex items-center gap-1.5 relative z-10 text-left">
                        <span className="text-rose-400 font-bold">{ask.price.toFixed(1)}</span>
                        {/* Source Icons (Mock) */}
                        {i % 3 === 0 && <div className="w-1.5 h-1.5 rounded-full bg-orange-400/50" title="Binance Liquidity"></div>}
                        {i % 4 === 0 && <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" title="Coinbase Liquidity"></div>}
                    </div>
                    <span className="text-zinc-300 relative z-10">{ask.amount.toFixed(2)}</span>
                    <span className="text-zinc-600 relative z-10">{Math.floor(ask.total/1000)}K</span>
                    </div>
                ))}
                </div>
            </div>

            {/* SPREAD INDICATOR */}
            <div className="py-2 px-3 border-y border-zinc-800 bg-zinc-900/40 flex justify-between items-center shrink-0">
               <span className={`text-[13px] font-mono font-bold ${currentMarketPrice > 3200 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {currentMarketPrice.toLocaleString()} 
                  <span className="text-[10px] ml-1 opacity-70">↑</span>
               </span>
               <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1">
                  Spread: <span className="text-zinc-300">0.05</span>
               </span>
            </div>

            {/* BIDS (Buys) */}
            <div className="space-y-[1px] pt-1">
              {MOCK_ORDER_BOOK.bids.map((bid, i) => (
                <div 
                  key={`bid-${i}`} 
                  onClick={() => handlePriceClick(bid.price)}
                  className="grid grid-cols-3 text-[11px] font-mono py-0.5 px-2 hover:bg-zinc-800 cursor-pointer group relative transition-colors text-right items-center"
                >
                  <div className="absolute inset-y-0 right-0 bg-emerald-500/10 pointer-events-none transition-all" style={{ width: `${(bid.amount / 20) * 100}%` }}></div>
                  <div className="flex items-center gap-1.5 relative z-10 text-left">
                     <span className="text-emerald-400 font-bold">{bid.price.toFixed(1)}</span>
                     {i % 2 === 0 && <div className="w-1.5 h-1.5 rounded-full bg-orange-400/50"></div>}
                  </div>
                  <span className="text-zinc-300 relative z-10">{bid.amount.toFixed(2)}</span>
                  <span className="text-zinc-600 relative z-10">{Math.floor(bid.total/1000)}K</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------
            CENTER: VISUAL CHART TRADING 
           -------------------------------------------------------- */}
        <section className="col-span-12 lg:col-span-7 flex flex-col space-y-3 h-full overflow-hidden">
          
          <div className="bg-[#0f0f0f] border border-zinc-800 rounded-lg flex-1 relative overflow-hidden flex flex-col group/canvas">
             
             {/* Tool Toolbar */}
             <div className="absolute left-0 top-12 bottom-0 w-10 border-r border-zinc-800 bg-[#0a0a0a] z-30 flex flex-col items-center py-4 space-y-6">
                <button className="text-zinc-400 hover:text-emerald-500 transition-colors p-1" title="Cursor"><Crosshair size={18} /></button>
                <button className="text-zinc-400 hover:text-emerald-500 transition-colors p-1" title="Trend Line"><PenTool size={16} /></button>
                <button className="text-zinc-400 hover:text-emerald-500 transition-colors p-1" title="Fibonacci"><Hash size={16} /></button>
                <button className="text-zinc-400 hover:text-emerald-500 transition-colors p-1" title="Indicators"><Zap size={16} /></button>
                <div className="flex-1"></div>
                <button className="text-zinc-400 hover:text-emerald-500 transition-colors pb-4" title="Visibility"><Eye size={16} /></button>
             </div>

             {/* Chart Controls */}
             <div className="p-2 border-b border-zinc-800 flex justify-between items-center bg-[#0a0a0a] z-30 ml-10">
                <div className="flex items-center space-x-4">
                   <div className="flex space-x-1">
                      {['1m', '5m', '15m', '1h', '4h', '1D'].map(t => (
                        <button key={t} className={`px-2.5 py-1 rounded text-[10px] font-black tracking-tight ${t === '15m' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}>{t}</button>
                      ))}
                   </div>
                   <div className="h-4 w-px bg-zinc-800"></div>
                   <button className="text-zinc-400 hover:text-white flex items-center space-x-1 uppercase text-[10px] font-black tracking-widest"><TrendingUp size={14} /><span>Indicators</span></button>
                </div>
                <div className="flex items-center space-x-4 pr-2">
                   <div className="flex items-center space-x-2 px-2 py-1 bg-zinc-900 rounded border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[10px] font-mono text-zinc-400">Live</span>
                   </div>
                   <button className="text-zinc-400 hover:text-white transition-colors" aria-label="Fullscreen"><Maximize2 size={14} /></button>
                </div>
             </div>
             
             {/* CHART CANVAS */}
             <div className="flex-1 flex bg-[#050505] relative ml-10 cursor-crosshair">
                
                {/* 1. VISUAL TRADING OVERLAYS (Interactive) */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    
                    {/* Active Position Line */}
                    <div className="absolute left-0 right-14 top-[35%] border-t-2 border-dashed border-emerald-500/50 flex items-center group pointer-events-auto cursor-ns-resize hover:border-emerald-500 transition-colors">
                        <div className="absolute left-2 -top-3 flex items-center gap-1">
                           <div className="bg-emerald-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded-sm shadow-lg shadow-emerald-500/20">
                              LONG 15 ETH
                           </div>
                           {/* Quick Close Badge */}
                           <div className="bg-emerald-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded-sm shadow-lg border-l border-black/20 flex items-center gap-1 cursor-pointer hover:bg-emerald-400 hover:text-white transition-colors" title="Quick Close">
                              +15.2% <X size={8} />
                           </div>
                        </div>
                    </div>

                    {/* Active Limit Order (Draggable) */}
                    <div className="absolute left-0 right-14 top-[65%] border-t-2 border-dashed border-blue-500/50 flex items-center group pointer-events-auto cursor-grab active:cursor-grabbing hover:border-blue-400 transition-colors">
                         <div className="absolute left-2 -top-3 bg-blue-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm flex items-center gap-1 shadow-lg">
                           <span>LIMIT BUY</span>
                           <span className="border-l border-white/20 pl-1 ml-0.5">5 ETH</span>
                        </div>
                        <div className="absolute right-0 -top-3 p-0.5 bg-zinc-900 text-zinc-500 border border-white/10 rounded">
                            <GripHorizontal size={10} />
                        </div>
                    </div>

                    {/* Liquidation Line */}
                    <div className="absolute left-0 right-14 bottom-[10%] border-t border-solid border-orange-500 flex items-center opacity-80">
                         <div className="absolute right-2 -top-3 text-orange-500 text-[9px] font-black bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20 flex items-center gap-1">
                            <AlertTriangle size={10} />
                            <span>LIQ: 2,950.00</span>
                        </div>
                    </div>

                </div>


                {/* 2. RENDERING THE CANDLES (Simplified from v1) */}
                <div className="flex-1 relative flex items-end px-4 pb-8 overflow-hidden">
                   {/* Grid Lines */}
                   <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-8 opacity-20">
                      {priceScale.map((_, i) => <div key={i} className="h-px w-full bg-zinc-800"></div>)}
                   </div>

                   <div className="flex-1 flex items-end justify-between w-full h-full relative z-10 pb-2 gap-0.5">
                      {candles.map((c, i) => {
                        const bodyBottom = Math.min(c.open, c.close);
                        const bodyHeight = Math.abs(c.open - c.close);
                        const wickHeight = c.high - c.low;
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center relative h-full justify-end max-w-[10px] hover:opacity-80">
                             <div className={`w-[1px] absolute z-0 ${c.isUp ? 'bg-emerald-500/40' : 'bg-rose-500/40'}`} style={{ height: `${wickHeight}%`, bottom: `${c.low}%` }} />
                             <div className={`w-full z-10 rounded-[1px] border-[1px] ${c.isUp ? 'bg-emerald-500 border-emerald-400' : 'bg-rose-500 border-rose-400'}`} style={{ height: `${bodyHeight}%`, bottom: `${bodyBottom}%`, position: 'absolute' }} />
                          </div>
                        );
                      })}
                   </div>

                   {/* Current Price Line */}
                   <div className="absolute left-0 right-0 border-t border-dashed border-emerald-500/40 z-10 pointer-events-none" style={{ bottom: `${currentPriceLevel}%` }}>
                      <div className="absolute right-0 translate-x-1/2 -top-2.5 text-[10px] bg-emerald-500 text-black px-1.5 py-0.5 rounded-sm font-black shadow-xl z-50">
                        {currentMarketPrice.toFixed(2)}
                      </div>
                   </div>
                </div>

                {/* Y-Axis Scales */}
                <div className="w-14 border-l border-zinc-800 flex flex-col justify-between py-8 px-1 bg-[#0a0a0a] z-20 relative">
                   {priceScale.map((p) => <span key={p} className="text-[10px] font-mono font-bold text-zinc-500 text-right">{p}</span>)}
                </div>
             </div>
          </div>
        </section>

        {/* --------------------------------------------------------
            RIGHT: ADVANCED ORDER ENTRY
           -------------------------------------------------------- */}
        <section className="col-span-12 lg:col-span-3 flex flex-col space-y-3 h-full overflow-hidden">
          
          <div className="bg-[#0f0f0f] border border-zinc-800 rounded-lg p-4 flex flex-col space-y-4 shrink-0 shadow-xl h-full overflow-y-auto scrollbar-hide">
             
             {/* 1. MARGIN & LEVERAGE */}
             <div className="bg-zinc-900/50 p-3 rounded-xl border border-white/5 space-y-3">
                 <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Margin Mode</span>
                    <button 
                        onClick={() => setMarginMode(marginMode === 'CROSS' ? 'ISOLATED' : 'CROSS')}
                        className="px-2 py-1 bg-zinc-800 rounded text-[10px] font-black text-zinc-300 uppercase tracking-wide border border-white/5 hover:bg-zinc-700 transition-colors"
                    >
                        {marginMode}
                    </button>
                 </div>
                 
                 <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Leverage</span>
                        <span className="text-emerald-500 font-black font-mono">{leverage}x</span>
                    </div>
                    <input 
                        type="range" 
                        min="1" max="100" 
                        value={leverage} 
                        onChange={(e) => setLeverage(Number(e.target.value))}
                        className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between mt-1 text-[8px] text-zinc-600 font-mono">
                        <span>1x</span><span>25x</span><span>50x</span><span>100x</span>
                    </div>
                 </div>
             </div>

             {/* 2. ORDER TYPE TABS */}
             <div className="flex p-1 bg-zinc-900 rounded-lg border border-white/5">
                {['limit', 'market', 'stop', 'oco'].map(t => (
                  <button 
                    key={t} 
                    onClick={() => setOrderType(t as any)} 
                    className={`flex-1 py-1.5 rounded text-[10px] font-black uppercase tracking-wide transition-all ${orderType === t ? 'bg-zinc-700 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>

             {/* 3. INPUTS */}
             <div className="space-y-3">
                {/* Price Input */}
                <div className="space-y-1">
                   <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase"><span>Price</span><span className="text-zinc-600">USDC</span></div>
                   <div className="relative">
                      <input 
                          type="text" 
                          value={orderType === 'market' ? 'Market Price' : price}
                          onChange={(e) => setPrice(e.target.value)}
                          disabled={orderType === 'market'}
                          className={`w-full bg-[#050505] border border-zinc-800 rounded-lg py-2.5 pl-3 pr-10 text-sm font-mono font-bold text-white focus:outline-none focus:border-emerald-500/40 transition-colors ${orderType === 'market' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600 text-[10px]">USDC</div>
                   </div>
                </div>

                {/* Amount Input */}
                <div className="space-y-1">
                   <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase"><span>Size</span><span className="text-zinc-600">ETH</span></div>
                   <div className="relative">
                      <input 
                          type="text" 
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full bg-[#050505] border border-zinc-800 rounded-lg py-2.5 pl-3 pr-10 text-sm font-mono font-bold text-white focus:outline-none focus:border-emerald-500/40 transition-colors"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600 text-[10px]">ETH</div>
                   </div>
                </div>

                {/* Percent Slider */}
                <div className="flex gap-1">
                   {[10, 25, 50, 75, 100].map(p => (
                     <button key={p} className="flex-1 py-1 bg-zinc-900 border border-zinc-800 rounded text-[9px] font-bold text-zinc-500 hover:bg-zinc-800 hover:text-white transition-all">{p}%</button>
                   ))}
                </div>
             </div>

             {/* 4. EXECUTION SETTINGS (Checkboxes) */}
             <div className="grid grid-cols-2 gap-2 py-2">
                 <div onClick={() => setPostOnly(!postOnly)} className="flex items-center gap-2 cursor-pointer group">
                     <div className={`w-3 h-3 rounded border flex items-center justify-center ${postOnly ? 'bg-emerald-500 border-emerald-500' : 'border-zinc-700 bg-zinc-900'}`}>
                         {postOnly && <div className="w-1.5 h-1.5 bg-black rounded-full"></div>}
                     </div>
                     <span className="text-[9px] font-bold text-zinc-500 group-hover:text-zinc-300 uppercase tracking-wide">Post-Only</span>
                 </div>
                 <div onClick={() => setReduceOnly(!reduceOnly)} className="flex items-center gap-2 cursor-pointer group">
                     <div className={`w-3 h-3 rounded border flex items-center justify-center ${reduceOnly ? 'bg-emerald-500 border-emerald-500' : 'border-zinc-700 bg-zinc-900'}`}>
                         {reduceOnly && <div className="w-1.5 h-1.5 bg-black rounded-full"></div>}
                     </div>
                     <span className="text-[9px] font-bold text-zinc-500 group-hover:text-zinc-300 uppercase tracking-wide">Reduce-Only</span>
                 </div>
             </div>

             {/* 5. RISK MANAGEMENT (TP/SL) - POLISHED */}
             <div className="bg-zinc-900/30 p-3 rounded-xl border border-white/5 space-y-3">
                 <div className="flex items-center gap-2 mb-1">
                     <ShieldCheck size={12} className="text-zinc-500" />
                     <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Risk Management</span>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3">
                     <div>
                        <span className="text-[9px] font-bold text-zinc-500 uppercase block mb-1">TP Price</span>
                        <input 
                            type="text" 
                            value={tpPrice}
                            onChange={(e) => setTpPrice(e.target.value)}
                            placeholder="Take Profit"
                            className="w-full bg-[#050505] border border-zinc-800 rounded py-1.5 px-2 text-xs font-mono text-emerald-500 focus:border-emerald-500/50 outline-none placeholder:text-zinc-700" 
                        />
                     </div>
                     <div>
                        <span className="text-[9px] font-bold text-zinc-500 uppercase block mb-1">SL Price</span>
                        <input 
                            type="text" 
                            value={slPrice}
                            onChange={(e) => setSlPrice(e.target.value)}
                            placeholder="Stop Loss"
                            className="w-full bg-[#050505] border border-zinc-800 rounded py-1.5 px-2 text-xs font-mono text-rose-500 focus:border-rose-500/50 outline-none placeholder:text-zinc-700" 
                        />
                     </div>
                 </div>
                 {slLoss < 0 && (
                     <div className="flex justify-between items-center bg-rose-500/10 px-2 py-1.5 rounded border border-rose-500/20">
                         <span className="text-[9px] font-bold text-rose-400">Est. Loss:</span>
                         <span className="text-[9px] font-mono font-bold text-rose-400">${Math.abs(slLoss).toFixed(2)}</span>
                     </div>
                 )}
             </div>

             {/* 6. SUBMIT & ACCOUNT INFO */}
             <div className="mt-auto space-y-3">
                {/* Margin Ratio Bar */}
                <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                        <span>Margin Ratio</span>
                        <span className={marginRatio > 80 ? 'text-rose-500' : 'text-emerald-500'}>{marginRatio.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-500 ${marginRatio > 80 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                            style={{ width: `${marginRatio}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex justify-between text-[10px] font-bold text-zinc-400 border-t border-zinc-800 pt-3 mt-1">
                   <span>Buying Power (10x):</span>
                   <span className="text-white font-mono">${(availableBalance * 10).toLocaleString()}</span>
                </div>

                <div className="flex gap-2">
                    <button 
                        onClick={() => setSide('buy')}
                        className={`flex-1 py-3 rounded-lg font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-[0.98] ${side === 'buy' ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-zinc-800 text-zinc-500 hover:text-white'}`}
                    >
                        Buy / Long
                    </button>
                    <button 
                        onClick={() => setSide('sell')}
                        className={`flex-1 py-3 rounded-lg font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-[0.98] ${side === 'sell' ? 'bg-rose-500 text-white hover:bg-rose-400' : 'bg-zinc-800 text-zinc-500 hover:text-white'}`}
                    >
                        Sell / Short
                    </button>
                </div>
             </div>
          </div>
        </section>
      </div>

      {/* 
          BOTTOM PANEL: WHALE BUBBLE WATCH (Replaces plain text stream)
      */}
      <footer className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-2 flex items-center gap-4 h-16 shrink-0 shadow-2xl relative overflow-hidden backdrop-blur-md">
        
        {/* Controls */}
        <div className="flex items-center gap-4 pl-2 shrink-0 border-r border-zinc-700 pr-4 z-20 bg-zinc-900/80 h-full">
            <div className="flex items-center gap-2 text-emerald-400">
                <Activity size={16} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Whale Watch</span>
            </div>
            <button 
                onClick={() => setShowWhalesOnly(!showWhalesOnly)}
                className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase border transition-all ${showWhalesOnly ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}
            >
                {showWhalesOnly ? '> $100k Only' : 'All Trades'}
            </button>
        </div>

        {/* Bubble Stream Area */}
        <div className="flex-1 relative h-full flex items-center overflow-hidden mask-gradient-x">
             {/* Gradient Masks for smooth fade */}
             <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-zinc-900 to-transparent z-10 pointer-events-none"></div>
             <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-zinc-900 to-transparent z-10 pointer-events-none"></div>

             <div className="flex items-center gap-6 animate-marquee whitespace-nowrap pl-full">
                {whaleTrades.map((trade) => (
                    <div 
                        key={trade.id} 
                        className={`
                           flex items-center gap-2 rounded-full px-3 py-1 border backdrop-blur-sm transition-transform hover:scale-110 cursor-pointer
                           ${trade.side === 'buy' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}
                        `}
                        style={{ 
                            transform: `scale(${1 + Math.random() * 0.2})`, // Slight variation
                            opacity: 0.8 + Math.random() * 0.2 
                        }}
                    >
                        <div className={`rounded-full flex items-center justify-center font-black text-xs ${trade.side === 'buy' ? 'text-emerald-400' : 'text-rose-400'}`} 
                             style={{ width: trade.size * 0.4, height: trade.size * 0.4, minWidth: '24px', minHeight: '24px' }}
                        >
                            {trade.side === 'buy' ? 'B' : 'S'}
                        </div>
                        <div className="flex flex-col leading-none mr-2">
                             <span className="text-white font-mono font-bold text-xs">${trade.volume}</span>
                             <span className="text-[9px] text-zinc-500 font-medium">{trade.time}</span>
                        </div>
                    </div>
                ))}
             </div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center gap-4 px-4 border-l border-zinc-700 shrink-0 z-20 bg-zinc-900/80 h-full">
            <div className="text-right hidden md:block">
                <div className="text-[9px] font-bold text-zinc-500 uppercase">Latency</div>
                <div className="text-[10px] font-mono text-emerald-500">14ms</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
        </div>
      </footer>

    </div>
  );
};

export default ProTradingView;
