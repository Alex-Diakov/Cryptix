
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MOCK_ASSETS } from '../constants';
import { 
  ChevronRight, 
  Wallet,
  TrendingUp,
  AlertTriangle,
  Scale,
  Shield,
  Activity,
  Download,
  Info,
  Sparkles,
  ShieldAlert,
  ArrowLeftRight
} from 'lucide-react';
import { Asset } from '../types';

interface AssetsTableProps {
  onTradeClick?: () => void;
}

// --- PORTAL TOOLTIP ENGINE (Solves Clipping & Stacking) ---
interface PortalTooltipProps {
  content?: string;
  children: React.ReactNode;
  side?: 'top' | 'left' | 'bottom';
}

const PortalTooltip: React.FC<PortalTooltipProps> = ({ content, children, side = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; placement: 'top' | 'bottom' | 'left' }>({ top: 0, left: 0, placement: side });
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!triggerRef.current || !content) return;
    
    const rect = triggerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    
    // Logic to flip tooltip if too close to top of screen
    let placement = side;
    if (side === 'top' && rect.top < 60) {
        placement = 'bottom';
    }

    setCoords({
        top: rect.top + scrollY,
        left: rect.left,
        placement
    });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div 
        ref={triggerRef} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        className="inline-block w-full" // Ensure trigger takes necessary width
      >
        {children}
      </div>
      {isVisible && content && createPortal(
        <TooltipContent 
            rect={triggerRef.current?.getBoundingClientRect()!} 
            placement={coords.placement} 
            content={content} 
        />,
        document.body
      )}
    </>
  );
};

const TooltipContent = ({ rect, placement, content }: { rect: DOMRect, placement: string, content: string }) => {
    // Calculate precise position styles
    let style: React.CSSProperties = {
        position: 'fixed',
        zIndex: 9999,
        maxWidth: '240px',
    };

    if (placement === 'top') {
        style.top = rect.top - 8; // Gap
        style.left = rect.left + (rect.width / 2);
        style.transform = 'translate(-50%, -100%)';
    } else if (placement === 'bottom') {
        style.top = rect.bottom + 8; // Gap
        style.left = rect.left + (rect.width / 2);
        style.transform = 'translate(-50%, 0)';
    } else if (placement === 'left') {
        style.top = rect.top + (rect.height / 2);
        style.left = rect.left - 8;
        style.transform = 'translate(-100%, -50%)';
    }

    return (
        <div style={style} className="pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#141414] border border-[#333] text-gray-200 text-[11px] font-medium leading-relaxed px-3 py-2.5 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,1)] relative">
                {content}
                {/* Arrow */}
                <div 
                    className={`absolute w-2 h-2 bg-[#141414] border-[#333] rotate-45 
                    ${placement === 'top' ? 'bottom-[-5px] left-1/2 -translate-x-1/2 border-r border-b' : ''}
                    ${placement === 'bottom' ? 'top-[-5px] left-1/2 -translate-x-1/2 border-l border-t' : ''}
                    ${placement === 'left' ? 'top-1/2 -translate-y-1/2 right-[-5px] border-r border-t' : ''}
                    `}
                ></div>
            </div>
        </div>
    );
};


const AssetsTable: React.FC<AssetsTableProps> = ({ onTradeClick }) => {
  
  // 1. Institutional Metric Calculations
  const { totalValue, totalPnL, totalCostBasis, deploymentRatio } = useMemo(() => {
    let tValue = 0;
    let tCost = 0;
    let tStables = 0;

    MOCK_ASSETS.forEach(asset => {
      tValue += asset.value;
      tCost += (asset.avgPurchasePrice * asset.quantity);
      if (['USDC', 'USDT', 'DAI'].includes(asset.symbol)) {
        tStables += asset.value;
      }
    });

    const tPnL = tValue - tCost;
    // Deployment Ratio = % of Portfolio Deployed in Non-Stable Assets (Risk On)
    const depRatio = tValue > 0 ? ((tValue - tStables) / tValue) * 100 : 0;

    return { 
      totalValue: tValue, 
      totalPnL: tPnL, 
      totalCostBasis: tCost,
      deploymentRatio: depRatio 
    };
  }, []);

  const totalPnLPercent = totalCostBasis > 0 ? (totalPnL / totalCostBasis) * 100 : 0;

  const formatCurrency = (val: number, decimals: number = 2) => 
    val.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  const formatQuantity = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M`;
    if (val >= 1000) return `${(val / 1000).toLocaleString('en-US', { maximumFractionDigits: 1 })}K`;
    return val.toLocaleString('en-US');
  };

  // 2. Render Logic for Institutional Buttons (Unified Outlined Style)
  const renderActionButton = (asset: Asset) => {
      const type = asset.actionContext?.type || 'MANAGE';
      const label = asset.actionContext?.label || 'TRADE';
      const tooltip = asset.actionContext?.tooltip;

      // Common base styles: Outlined, uniform height, transparent bg by default
      const baseBtnClass = "h-8 w-full flex items-center justify-center gap-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border bg-transparent active:scale-[0.98]";

      let btnContent;

      switch (type) {
          case 'DEPLOY':
              btnContent = (
                  <button onClick={onTradeClick} className={`${baseBtnClass} border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/60`}>
                      <Sparkles size={12} />
                      <span>{label}</span>
                  </button>
              );
              break;
          case 'REBALANCE':
              btnContent = (
                  <button onClick={onTradeClick} className={`${baseBtnClass} border-amber-500/30 text-amber-500 hover:bg-amber-500/10 hover:border-amber-500/60`}>
                      <Scale size={12} />
                      <span>{label}</span>
                  </button>
              );
              break;
          case 'REDUCE_RISK':
              btnContent = (
                  <button onClick={onTradeClick} className={`${baseBtnClass} border-rose-500/30 text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/60`}>
                      <ShieldAlert size={12} />
                      <span>{label}</span>
                  </button>
              );
              break;
          default: // TRADE / MANAGE
              btnContent = (
                  <button onClick={onTradeClick} className={`${baseBtnClass} border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-500`}>
                      <ArrowLeftRight size={12} />
                      <span>{label}</span>
                  </button>
              );
              break;
      }

      return <PortalTooltip content={tooltip} side="left">{btnContent}</PortalTooltip>;
  };

  // 3. Grid Template Definition
  const gridTemplate = "grid-cols-[minmax(180px,1.5fr)_1fr_1fr_0.8fr_1fr_1fr_1.2fr_1.2fr_1.2fr]";

  return (
    <section className="bg-zinc-900/40 border border-white/5 rounded-[3rem] p-8 md:p-10 shadow-xl backdrop-blur-md" aria-labelledby="positions-title">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 px-2 gap-6">
        <div className="flex items-center space-x-5">
          <div>
            <h2 id="positions-title" className="text-3xl font-bold text-white tracking-tight leading-none">PORTFOLIO COMPOSITION</h2>
            <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Institutional View • Real-Time PnL</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
            <button className="flex items-center space-x-2 bg-zinc-800 px-4 py-2 rounded-xl text-[10px] font-black text-zinc-400 uppercase tracking-[0.1em] hover:bg-zinc-700 hover:text-white transition-all border border-white/5 hover:border-white/10 active:scale-95">
                <Download size={12} />
                <span>EXPORT CSV</span>
            </button>

            <div className="flex items-center space-x-8 bg-black/40 px-8 py-4 rounded-2xl border border-white/5 shadow-inner">
                <PortalTooltip content="Risk Asset Allocation: % of portfolio deployed in non-stablecoin assets." side="bottom">
                    <div className="text-right cursor-help">
                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1 flex items-center justify-end gap-1">DEPLOYMENT RATIO <Info size={10}/></p>
                        <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${deploymentRatio}%` }}></div>
                        </div>
                        <p className="text-white font-mono font-bold text-sm">{deploymentRatio.toFixed(1)}%</p>
                        </div>
                    </div>
                </PortalTooltip>
                <div className="h-8 w-px bg-white/10"></div>
                <PortalTooltip content="Current market value minus cost basis" side="bottom">
                    <div className="text-right cursor-help">
                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">TOTAL UNREALIZED PNL</p>
                        <div className={`font-mono font-bold text-sm ${totalPnL >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL, 0)} <span className="text-xs opacity-80">({totalPnL >= 0 ? '+' : ''}{totalPnLPercent.toFixed(1)}%)</span>
                        </div>
                    </div>
                </PortalTooltip>
            </div>
        </div>
      </div>

      {/* DATA GRID VIEW */}
      <div className="w-full">
        
        {/* SCROLLABLE CONTAINER */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent pb-4">
            <div className="min-w-[1200px]">
                {/* TABLE HEADERS */}
                {/* CRITICAL: Enforcing text-right on all numeric columns for perfect vertical alignment */}
                <div className={`grid ${gridTemplate} gap-6 pb-4 border-b border-white/[0.05] mb-2 px-2 items-center`}>
                    <div className="text-left text-[10px] font-black text-zinc-500 uppercase tracking-[0.05em]">Asset</div>
                    <div className="text-right text-[10px] font-black text-zinc-500 uppercase tracking-[0.05em]">Price 24H</div>
                    <div className="text-right text-[10px] font-black text-zinc-500 uppercase tracking-[0.05em]">Avg. Buy</div>
                    <div className="text-right text-[10px] font-black text-zinc-500 uppercase tracking-[0.05em]">Holdings</div>
                    <div className="text-right text-[10px] font-black text-zinc-500 uppercase tracking-[0.05em]">Alloc</div>
                    <div className="text-right text-[10px] font-black text-zinc-500 uppercase tracking-[0.05em]">Value</div>
                    <div className="text-right text-[10px] font-black text-zinc-500 uppercase tracking-[0.05em] cursor-help" title="Avg Buy vs Market">Unrealized PnL</div>
                    <div className="text-right text-[10px] font-black text-zinc-500 uppercase tracking-[0.05em] cursor-help" title="AI Sentiment">Signal</div>
                    <div className="text-right text-[10px] font-black text-zinc-500 uppercase tracking-[0.05em]">Action</div>
                </div>

                {/* TABLE BODY */}
                <div className="space-y-1">
                    {MOCK_ASSETS.map((asset) => {
                        const allocation = (asset.value / totalValue) * 100;
                        const pnlValue = (asset.currentPrice - asset.avgPurchasePrice) * asset.quantity;
                        const pnlPercent = ((asset.currentPrice - asset.avgPurchasePrice) / asset.avgPurchasePrice) * 100;
                        const isPositive = pnlValue >= 0;

                        let signalLabel: string = asset.sentiment;
                        let signalStyle = 'bg-zinc-800/50 text-zinc-500 border-zinc-700';
                        let signalIcon = null;

                        if (asset.symbol === 'USDC' || asset.symbol === 'USDT') {
                            signalLabel = 'DEPLOY';
                            signalStyle = 'bg-zinc-800 text-zinc-400 border-zinc-700';
                            signalIcon = <AlertTriangle size={10} />;
                        } else if (asset.symbol === 'PEPE' || asset.sentiment === 'High Risk') {
                            signalLabel = 'HIGH VOLATILITY';
                            signalStyle = 'bg-purple-500/10 text-purple-400 border-purple-500/20';
                            signalIcon = <Activity size={10} />;
                        } else if (pnlPercent < -15) {
                            signalLabel = 'ACCUMULATE';
                            signalStyle = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
                            signalIcon = <TrendingUp size={10} />;
                        } else if (asset.sentiment === 'Bullish') {
                            signalLabel = 'HOLD';
                            signalStyle = 'bg-zinc-800 text-white border-zinc-700';
                            signalIcon = <Shield size={10} />;
                        } else if (asset.sentiment === 'Neutral') {
                            signalLabel = 'MONITOR';
                            signalStyle = 'bg-zinc-800 text-zinc-500 border-zinc-700';
                        }

                        return (
                        <div key={asset.symbol} className={`grid ${gridTemplate} gap-6 items-center py-4 px-2 hover:bg-white/[0.02] transition-colors rounded-lg group`}>
                            
                            {/* 1. ASSET (Left Align) */}
                            <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/5 shadow-inner bg-zinc-900 shrink-0">
                                <img src={asset.icon} alt={asset.name} className="w-full h-full object-contain p-1" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-sm font-bold text-white leading-none mb-1.5 truncate">{asset.name}</div>
                                <div className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">{asset.symbol}</div>
                            </div>
                            </div>

                            {/* 2. PRICE (Right Align, Tabular) */}
                            <div className="text-right">
                            <div className="text-sm font-mono font-bold text-zinc-300 tabular-nums">
                                {formatCurrency(asset.currentPrice, asset.currentPrice < 1 ? 6 : 2)}
                            </div>
                            <div className={`text-[10px] font-bold mt-0.5 tabular-nums ${asset.changePercent >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent}%
                            </div>
                            </div>

                            {/* 3. AVG BUY (Right Align, Tabular) */}
                            <div className="text-right">
                            <div className="text-xs font-mono font-medium text-zinc-400 tabular-nums">
                                {formatCurrency(asset.avgPurchasePrice, asset.avgPurchasePrice < 1 ? 6 : 2)}
                            </div>
                            </div>

                            {/* 4. HOLDINGS (Right Align, Tabular) */}
                            <div className="text-right">
                            <div className="text-xs font-mono font-bold text-zinc-300 tabular-nums">
                                {formatQuantity(asset.quantity)}
                            </div>
                            </div>

                            {/* 5. ALLOCATION (Right Align, Tabular Text + Side Bar) */}
                            <div className="text-right flex items-center justify-end gap-3">
                                <span className="text-xs font-mono font-bold text-white tabular-nums">{allocation.toFixed(1)}%</span>
                                {/* Redesigned Bar: Clean, side-aligned */}
                                <div className="w-12 h-1.5 bg-zinc-800 rounded-full overflow-hidden shrink-0">
                                    <div className="h-full bg-zinc-400" style={{ width: `${allocation}%` }}></div>
                                </div>
                            </div>

                            {/* 6. VALUE (Right Align, Tabular) */}
                            <div className="text-right">
                            <div className="text-sm font-mono font-black text-white tabular-nums">
                                {formatCurrency(asset.value)}
                            </div>
                            </div>

                            {/* 7. UNREALIZED PNL (Right Align, Tabular) */}
                            <div className="text-right">
                                <div className={`text-sm font-mono font-bold tabular-nums ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {isPositive ? '+' : ''}{formatCurrency(pnlValue, 0)}
                                </div>
                                <div className={`text-[10px] font-black mt-0.5 tabular-nums ${isPositive ? 'text-emerald-500/60' : 'text-rose-500/60'}`}>
                                    ({isPositive ? '+' : ''}{pnlPercent.toFixed(1)}%)
                                </div>
                            </div>

                            {/* 8. SIGNAL (Right Align - Justify End) */}
                            <div className="text-right justify-self-end w-full flex justify-end">
                            <PortalTooltip content={asset.signalTooltip} side="top">
                                <div className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded border text-[9px] font-black uppercase tracking-wider cursor-help ${signalStyle}`}>
                                {signalIcon}
                                <span>{signalLabel}</span>
                                </div>
                            </PortalTooltip>
                            </div>

                            {/* 9. ACTIONS (Right Align) - Context Aware */}
                            <div className="text-right justify-self-end w-full">
                            {renderActionButton(asset)}
                            </div>

                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
        
        {/* FOOTER: ACTIONS */}
        <div className="pt-8 mt-4 border-t border-white/[0.05] flex items-center justify-center gap-4">
           <button className="flex items-center space-x-3 bg-white/5 px-8 py-3 rounded-xl text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white transition-all border border-white/5 hover:border-white/10 active:scale-95">
             <Wallet size={14} />
             <span>VIEW ALL ASSETS</span>
           </button>
        </div>
      </div>
    </section>
  );
};

export default AssetsTable;
