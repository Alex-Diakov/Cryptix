
import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  ArrowDown, 
  Fuel, 
  ChevronDown, 
  Info,
  Check,
  User,
  Sparkles,
  Clock,
  EyeOff,
  AlertOctagon,
  Edit2,
  Undo2,
  Split,
  ArrowRight,
  ShieldCheck,
  Wallet
} from 'lucide-react';

interface BridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToAlgo?: () => void;
}

// Helper for tooltips inside the modal
const InfoTooltip = ({ content, title, warning }: { content: string, title?: string, warning?: boolean }) => (
  <div className="group relative flex items-center">
    <Info size={12} className={`${warning ? 'text-amber-500' : 'text-zinc-500'} hover:text-zinc-300 cursor-help transition-colors`} />
    <div className="absolute right-0 top-full mt-2 w-64 p-4 bg-[#111] border border-zinc-800 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
      {title && <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${warning ? 'text-amber-500' : 'text-white'}`}>{title}</h4>}
      <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">{content}</p>
    </div>
  </div>
);

const RatingBar = ({ label, value }: { label: string, value: number }) => (
    <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-end">
            <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider">{label}</span>
            <span className="text-[8px] font-mono text-zinc-400">{value}/10</span>
        </div>
        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden w-full">
            <div 
                className={`h-full rounded-full ${value >= 8 ? 'bg-emerald-500' : value >= 5 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                style={{ width: `${value * 10}%` }}
            ></div>
        </div>
    </div>
);

// Simple icon wrapper to fix missing import
const CheckCircle = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

const BridgeModal: React.FC<BridgeModalProps> = ({ isOpen, onClose, onSwitchToAlgo }) => {
  const [mounted, setMounted] = useState(false);
  
  // Input State
  const [payAmount, setPayAmount] = useState('120000.00'); 
  
  // 1. Recipient State
  const [isEditingRecipient, setIsEditingRecipient] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('0x71C...4f92 (Vault)');

  // 2. Token Choice State
  const [destToken, setDestToken] = useState<'USDT' | 'USDT.e'>('USDT');
  const [isDestTokenSelectorOpen, setIsDestTokenSelectorOpen] = useState(false);

  // 3. Route Selection State
  const [selectedRouteId, setSelectedRouteId] = useState('r1');

  // 4. Execution Policy State
  const [slippage, setSlippage] = useState('0.50'); 
  const [isPrivateTx, setIsPrivateTx] = useState(true); 

  // Constants
  const ETH_ICON = 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035';
  const ARB_ICON = 'https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=035';
  const USDT_ICON = 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=035';

  useEffect(() => {
    setMounted(true);
  }, []);

  const payNum = parseFloat(payAmount.replace(/,/g, '')) || 0;
  const slippageNum = parseFloat(slippage) || 0;

  // DYNAMIC ROUTES DATA
  // Recalculates cost ratings based on actual volume entered
  const routes = useMemo(() => {
    const baseRoutes = [
        { 
            id: 'r1', 
            provider: 'Stargate V2', 
            protocol: 'LayerZero', 
            time: 12, 
            fee: 250.00, 
            gas: 14.50,
            impactPct: 0.05, // 0.05%
            securityScore: 10,
            tierDesc: 'Institutional',
        },
        { 
            id: 'r2', 
            provider: 'Across', 
            protocol: 'Optimistic', 
            time: 2, 
            fee: 320.50, 
            gas: 18.20,
            impactPct: 0.45, // 0.45%
            securityScore: 9,
            tierDesc: 'Fastest',
        },
        { 
            id: 'r3', 
            provider: 'Hop', 
            protocol: 'AMB', 
            time: 25, 
            fee: 180.20, 
            gas: 12.10,
            impactPct: 1.80, // 1.8% (High impact for large vol)
            securityScore: 8,
            tierDesc: 'Standard',
        },
    ];

    return baseRoutes.map(route => {
        // Calculate Cost Components
        const impactCost = payNum * (route.impactPct / 100);
        const hardCosts = route.fee + route.gas + (payNum * 0.0005); // Fixed + Gas + Platform(0.05%)
        const totalCost = impactCost + hardCosts;
        
        // Calculate Dynamic Ratings
        // Speed: <5m = 10, <15m = 8, <30m = 6, else 4
        let speedRating = 4;
        if (route.time <= 5) speedRating = 10;
        else if (route.time <= 15) speedRating = 8;
        else if (route.time <= 30) speedRating = 6;

        // Cost: Based on % of principal lost.
        // Loss < 0.1% = 10, < 0.3% = 8, < 0.6% = 6, < 1.0% = 4, else 2
        const lossPct = (totalCost / (payNum || 1)) * 100;
        let costRating = 2;
        if (lossPct < 0.15) costRating = 10;
        else if (lossPct < 0.35) costRating = 8;
        else if (lossPct < 0.75) costRating = 6;
        else if (lossPct < 1.5) costRating = 4;

        return {
            ...route,
            totalCost,
            ratings: {
                speed: speedRating,
                cost: costRating,
                security: route.securityScore
            }
        };
    });
  }, [payNum]);

  const selectedRoute = routes.find(r => r.id === selectedRouteId) || routes[0];

  // --- INSTITUTIONAL LOGIC CORE ---
  // Re-verified Mathematics:
  // 1. Principal: payNum
  // 2. Costs: (Impact + Bridge Fee + Gas + Service Fee)
  // 3. Net Output: Principal - Costs
  // 4. Min Receive: Net Output * (1 - Slippage)
  
  const serviceFee = payNum * 0.0005; // 0.05% Platform Fee
  const impactValue = payNum * (selectedRoute.impactPct / 100);
  
  // Total Deductions
  const totalExpectedCost = impactValue + selectedRoute.fee + selectedRoute.gas + serviceFee;
  
  // Expected Output (Base Case)
  const expectedReceiveAmount = Math.max(0, payNum - totalExpectedCost);

  // Minimum Output (Worst Case with Slippage)
  // Logic: The user accepts that the price might move `slippage`% against them.
  const minReceiveAmount = expectedReceiveAmount * (1 - (slippageNum / 100));
  
  // Critical Impact Logic (e.g. > 1% is dangerous for institutions)
  const isCriticalImpact = selectedRoute.impactPct > 1.0;

  if (!mounted) return null;

  const portalRoot = document.getElementById('portal-root') || document.body;

  return createPortal(
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content - Fitted Height */}
      <div className={`relative w-full max-w-[1200px] bg-[#09090b] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-500 transform flex flex-col max-h-[95vh] ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}>
        
        {/* Header - Compact */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
                <div>
                    <h2 className="text-base font-black text-white tracking-tight leading-none">INSTITUTIONAL BRIDGE</h2>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">Cross-Chain Aggregation</p>
                </div>
            </div>
            <button 
                onClick={onClose}
                className="p-1.5 text-zinc-500 hover:text-white transition-colors bg-zinc-900/50 rounded-lg hover:bg-zinc-800"
            >
                <X size={16} />
            </button>
        </div>

        {/* MAIN SPLIT VIEW - Compact Padding */}
        <div className="flex-1 overflow-hidden p-6 bg-[#050505]">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start h-full">
                
                {/* --- LEFT PANEL: CONFIGURATION & POLICY (Scrollable if needed, but fitted) --- */}
                <div className="lg:col-span-4 flex flex-col gap-4 h-full overflow-y-auto scrollbar-hide pr-1">
                    
                    {/* BLOCK 1: CONFIGURATION (Intent) */}
                    <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 space-y-5 shadow-xl backdrop-blur-sm relative">
                        <h3 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-2">Bridge Configuration</h3>

                        {/* From Section */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-1 w-full">
                                     <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex justify-between w-full pr-1">
                                        <span>From Network</span>
                                        <span className="font-mono text-zinc-500">Bal: 2,000,000.00</span>
                                     </label>
                                     <div className="flex items-center gap-2">
                                        <input 
                                            type="text" 
                                            value={payAmount}
                                            onChange={(e) => setPayAmount(e.target.value)}
                                            className="text-2xl lg:text-3xl font-mono font-medium tracking-tighter bg-transparent outline-none placeholder:text-zinc-800 text-white w-full min-w-0" 
                                            placeholder="0.00" 
                                        />
                                        <div className="flex flex-col gap-1 shrink-0">
                                            <button className="flex items-center gap-2 bg-zinc-950/50 border border-white/10 px-2 py-1 rounded-lg hover:border-white/20 transition-colors w-full justify-between">
                                                <div className="flex items-center gap-1.5">
                                                    <img src={ETH_ICON} className="w-3 h-3 object-contain" alt="ETH" />
                                                    <span className="font-bold text-white text-[9px]">Ethereum</span>
                                                </div>
                                                <ChevronDown size={10} className="text-zinc-600" />
                                            </button>
                                            <button className="flex items-center gap-2 bg-zinc-950/50 border border-white/10 px-2 py-1.5 rounded-lg hover:border-white/20 transition-colors">
                                                <img src={USDT_ICON} className="w-4 h-4 object-contain" alt="USDT" />
                                                <span className="font-bold text-white text-xs">USDT</span>
                                                <ChevronDown size={10} className="text-zinc-600" />
                                            </button>
                                        </div>
                                     </div>
                                </div>
                            </div>

                            {/* Connector */}
                            <div className="relative h-px bg-white/5 w-full my-1">
                                <div className="absolute left-1/2 -translate-x-1/2 -top-2.5 p-1 bg-[#0e0e11] border border-white/10 rounded-full text-zinc-500 shadow-sm">
                                    <ArrowDown size={10} />
                                </div>
                            </div>

                            {/* To Section */}
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col gap-1 w-full">
                                     <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">To Network</label>
                                     <div className="flex items-center gap-2">
                                        <div className="flex flex-col w-full min-w-0">
                                            <div className="text-2xl lg:text-3xl font-mono font-medium tracking-tighter text-zinc-300 truncate">
                                                {expectedReceiveAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </div>
                                            <div className="text-[10px] font-mono font-bold text-zinc-600">
                                                Expected Output (Net)
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1 shrink-0 relative">
                                            <button className="flex items-center gap-2 bg-zinc-950/50 border border-white/10 px-2 py-1 rounded-lg hover:border-white/20 transition-colors w-full justify-between">
                                                <div className="flex items-center gap-1.5">
                                                    <img src={ARB_ICON} className="w-3 h-3 object-contain" alt="ARB" />
                                                    <span className="font-bold text-white text-[9px]">Arbitrum</span>
                                                </div>
                                                <ChevronDown size={10} className="text-zinc-600" />
                                            </button>
                                            
                                            {/* Token Selector */}
                                            <div className="relative">
                                                <button 
                                                    onClick={() => setIsDestTokenSelectorOpen(!isDestTokenSelectorOpen)}
                                                    className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 px-2 py-1.5 rounded-lg hover:border-white/10 transition-colors self-start w-full justify-between min-w-[100px]"
                                                >
                                                    <div className="flex items-center gap-1.5">
                                                        <img src={USDT_ICON} className="w-4 h-4 object-contain" alt="USDT" />
                                                        <span className="font-bold text-white text-xs">{destToken}</span>
                                                    </div>
                                                    <ChevronDown size={10} className={`text-zinc-600 transition-transform ${isDestTokenSelectorOpen ? 'rotate-180' : ''}`} />
                                                </button>
                                                {isDestTokenSelectorOpen && (
                                                    <div className="absolute right-0 top-full mt-1 w-40 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                                                        <button onClick={() => { setDestToken('USDT'); setIsDestTokenSelectorOpen(false); }} className="w-full text-left px-3 py-2 hover:bg-white/5 flex items-center justify-between group">
                                                            <div className="flex flex-col"><span className="text-xs font-bold text-white">USDT</span><span className="text-[8px] text-zinc-500 uppercase font-black tracking-wider group-hover:text-emerald-500">Native</span></div>
                                                            {destToken === 'USDT' && <Check size={10} className="text-emerald-500" />}
                                                        </button>
                                                        <button onClick={() => { setDestToken('USDT.e'); setIsDestTokenSelectorOpen(false); }} className="w-full text-left px-3 py-2 hover:bg-white/5 flex items-center justify-between group">
                                                            <div className="flex flex-col"><span className="text-xs font-bold text-white">USDT.e</span><span className="text-[8px] text-zinc-500 uppercase font-black tracking-wider group-hover:text-amber-500">Bridged</span></div>
                                                            {destToken === 'USDT.e' && <Check size={10} className="text-emerald-500" />}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                     </div>
                                </div>
                            </div>

                            {/* Recipient - REFACTORED */}
                            <div className="pt-3 mt-1 border-t border-white/5">
                                {isEditingRecipient ? (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Custom Recipient</label>
                                            <button onClick={() => setIsEditingRecipient(false)} className="text-[9px] font-bold text-zinc-500 hover:text-white flex items-center gap-1"><Undo2 size={10} /> Cancel</button>
                                        </div>
                                        <div className="relative">
                                            <input type="text" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} placeholder="0x..." className="w-full bg-[#050505] border border-emerald-500/50 rounded-lg py-2 pl-8 pr-4 text-[10px] font-mono text-white focus:outline-none shadow-[0_0_10px_rgba(16,185,129,0.1)]" autoFocus />
                                            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500"><User size={10} /></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center bg-zinc-900/50 p-2 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Recipient</span>
                                            <div className="px-2 py-0.5 bg-zinc-800 rounded border border-white/5 flex items-center gap-1">
                                                <User size={10} className="text-zinc-400" />
                                                <span className="text-[9px] font-bold text-white">Alex K. (Self)</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setIsEditingRecipient(true)}
                                            className="p-1 hover:bg-white/5 rounded text-emerald-500 transition-colors"
                                            title="Change Recipient"
                                        >
                                            <Edit2 size={10} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* BLOCK 2: EXECUTION POLICY (Safety) */}
                    <div className="bg-zinc-900/20 border border-white/5 rounded-2xl p-5 shadow-inner">
                        <h3 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-3">Risk Parameters</h3>

                        <div className="flex flex-col space-y-3">
                            
                            {/* MEV Toggle */}
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-wide">MEV Protection</span>
                                    <span className="text-[9px] text-zinc-500">Flashbots / Private RPC</span>
                                </div>
                                <button 
                                    onClick={() => setIsPrivateTx(!isPrivateTx)}
                                    className={`w-8 h-4 rounded-full relative transition-colors ${isPrivateTx ? 'bg-emerald-500' : 'bg-zinc-700'}`}
                                >
                                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-200 ${isPrivateTx ? 'left-4.5' : 'left-0.5'}`}></div>
                                </button>
                            </div>

                            {/* MEV Warning Guardrail */}
                            {payNum > 100000 && !isPrivateTx && (
                                <div className="p-2 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-start gap-2 animate-in fade-in">
                                    <AlertOctagon size={10} className="text-rose-500 shrink-0 mt-0.5" />
                                    <p className="text-[8px] text-rose-400 font-bold leading-relaxed">
                                        CRITICAL: Volume > $100k without MEV Shield exposes trade to sandwich attacks. Enable protection recommended.
                                    </p>
                                </div>
                            )}

                            {/* Slippage Control - REFACTORED */}
                            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                                <div>
                                    <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide block mb-1">Slippage Tolerance</label>
                                    <div className="relative">
                                        <input 
                                            type="number" 
                                            value={slippage}
                                            onChange={(e) => setSlippage(e.target.value)}
                                            className={`w-full bg-[#050505] border ${slippageNum > 3 ? 'border-amber-500 text-amber-500' : 'border-white/10 text-white'} rounded-lg py-1.5 pl-2 pr-5 text-xs font-mono font-bold focus:outline-none`}
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-bold text-zinc-600">%</span>
                                    </div>
                                </div>
                                {/* MAX ALLOWED LOSS */}
                                <div>
                                    <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide block mb-1">Max Potential Loss</label>
                                    <div className="w-full bg-zinc-900/50 border border-white/5 rounded-lg py-1.5 px-2 text-xs font-mono font-bold text-rose-400 truncate">
                                        ~${(payNum * (slippageNum/100) + totalExpectedCost).toLocaleString('en-US', {maximumFractionDigits: 0})}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* BLOCK 3: SIMULATION & CTA */}
                    <div className="px-5 pt-4 pb-2 flex-1 flex flex-col">
                        <h3 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-3">Bridge Simulation</h3>
                        
                        <div className="flex flex-col space-y-2 mb-4">
                            {/* Breakdown */}
                            <div className="flex justify-between items-center pb-1 border-b border-dashed border-white/10">
                                <span className="text-[9px] font-medium text-zinc-500 uppercase tracking-widest">Price Impact</span>
                                <span className={`text-[10px] font-mono font-bold ${selectedRoute.impactPct > 1 ? 'text-rose-500' : 'text-zinc-300'}`}>
                                    -${impactValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-1 border-b border-dashed border-white/10">
                                <span className="text-[9px] font-medium text-zinc-500 uppercase tracking-widest">Fees (Gas+Bridge+Svc)</span>
                                <span className="text-[10px] font-mono font-bold text-white">~${(selectedRoute.fee + selectedRoute.gas + serviceFee).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                            </div>
                            
                            {/* Summary Totals */}
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Expected Net Output</span>
                                <span className="text-white font-bold font-mono text-xs">${expectedReceiveAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1">
                                    <ShieldCheck size={10} /> Minimum Received
                                </span>
                                <span className="text-rose-400 font-bold font-mono text-xs">${minReceiveAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                        </div>

                        {/* Dynamic CTA */}
                        <div className="relative group mt-auto">
                            <button 
                                className={`w-full h-12 rounded-xl font-black text-[10px] uppercase tracking-[0.1em] transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 ${
                                    isCriticalImpact 
                                        ? 'bg-zinc-700 text-white border border-rose-500/50 hover:bg-zinc-600 hover:border-rose-500' // Neutralized color for dangerous impact
                                        : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-500/10'
                                }`}
                            >
                                {isPrivateTx && <EyeOff size={12} className={isCriticalImpact ? 'text-white' : 'text-emerald-200'} />}
                                <span>REVIEW TRANSACTION</span>
                            </button>
                        </div>
                    </div>

                </div>

                {/* --- RIGHT PANEL: ROUTE ANALYSIS (High Fidelity - Scrollable) --- */}
                <div className="lg:col-span-6 bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col h-full overflow-hidden">
                    
                    <div className="flex justify-between items-start mb-6 shrink-0">
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-white flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-gray-500" />
                                Route Analysis
                            </h2>
                            <InfoTooltip title="Aggregation Logic" content="Routes are aggregated from 12+ bridges. Selection prioritizes liquidity depth (Low Price Impact) and security audits." />
                        </div>
                    </div>

                    <div className="flex flex-col h-full gap-3 overflow-hidden">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest pl-1 shrink-0">Route Options</span>

                        {/* ROUTE LIST (Scrollable) */}
                        <div className="space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 pr-1 pb-2">
                            {routes.map((route) => {
                                const isSelected = selectedRouteId === route.id;
                                
                                return (
                                    <div 
                                        key={route.id}
                                        onClick={() => setSelectedRouteId(route.id)}
                                        className={`relative p-4 rounded-xl border cursor-pointer transition-all group overflow-hidden ${
                                            isSelected 
                                            ? 'bg-zinc-800/80 border-emerald-500/50 shadow-lg shadow-emerald-500/5' 
                                            : 'bg-black/20 border-white/5 hover:bg-zinc-800/40 hover:border-white/10'
                                        }`}
                                    >
                                        {/* Selection Indicator */}
                                        {isSelected && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                                        )}

                                        {/* Header: Provider + Description */}
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <div className="text-sm font-bold text-white flex items-center gap-2">
                                                        {route.provider}
                                                        {isSelected && <CheckCircle size={12} className="text-emerald-500" />}
                                                    </div>
                                                    <div className="text-[9px] text-zinc-500 font-mono">
                                                        via <span className="text-zinc-400">{route.protocol}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col items-end gap-1">
                                                <span className="text-[9px] font-bold text-zinc-500">{route.tierDesc}</span>
                                            </div>
                                        </div>

                                        {/* UNSELECTED STATE: COMPACT SUMMARY */}
                                        {!isSelected && (
                                            <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1">
                                                        <Clock size={10} /> ~{route.time}m
                                                    </span>
                                                    <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1">
                                                        <Fuel size={10} /> ~${route.gas.toFixed(0)}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-mono font-bold text-zinc-300">
                                                    Est. Cost: ~${route.totalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                                </span>
                                            </div>
                                        )}

                                        {/* SELECTED STATE: FULL DETAILS */}
                                        {isSelected && (
                                            <div className="mt-3 animate-in fade-in slide-in-from-top-1 duration-300">
                                                {/* Trade-off Triangle (Ratings) */}
                                                <div className="grid grid-cols-3 gap-3 mb-3 bg-zinc-900/30 p-2 rounded-lg border border-white/5">
                                                    <RatingBar label="SPEED" value={route.ratings.speed} />
                                                    <RatingBar label="COST" value={route.ratings.cost} />
                                                    <RatingBar label="SECURITY" value={route.ratings.security} />
                                                </div>

                                                {/* Detailed Cost Breakdown */}
                                                <div className="space-y-1 pl-1">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[9px] text-zinc-500 font-bold uppercase">Price Impact</span>
                                                        <span className={`text-[9px] font-mono font-bold ${route.impactPct > 1 ? 'text-rose-500' : 'text-zinc-400'}`}>-{route.impactPct}%</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[9px] text-zinc-500 font-bold uppercase">Bridge Fee</span>
                                                        <span className="text-[9px] font-mono font-bold text-zinc-400">~${route.fee.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[9px] text-zinc-500 font-bold uppercase">Network Gas</span>
                                                        <span className="text-[9px] font-mono font-bold text-zinc-400">~${route.gas.toFixed(2)}</span>
                                                    </div>
                                                    
                                                    {/* Divider */}
                                                    <div className="h-px bg-white/5 my-1"></div>
                                                    
                                                    <div className="flex justify-between items-center pt-0.5">
                                                        <div className="flex flex-col">
                                                            <span className="text-[9px] text-zinc-400 font-black uppercase tracking-wider">Total Est. Deduction</span>
                                                            <span className="text-[8px] text-zinc-600 font-medium">Fee + Impact + Gas</span>
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-xs font-mono font-bold text-white">~${route.totalCost.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                                                            <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1">
                                                                <Clock size={8} /> ~{route.time} Min
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Split Trade Suggestion */}
                                                {route.impactPct > 5 && (
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onClose();
                                                            onSwitchToAlgo?.();
                                                        }}
                                                        className="mt-3 w-full p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-2 animate-in fade-in group hover:bg-blue-500/20 hover:border-blue-500/40 transition-all text-left"
                                                    >
                                                        <div className="p-1 bg-blue-500/20 rounded-md text-blue-400 group-hover:text-blue-300">
                                                            <Split size={12} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[9px] font-bold text-blue-300 group-hover:text-blue-200">Recommendation: Split into 3 tranches</span>
                                                            <div className="flex items-center gap-1 text-[8px] text-blue-400/70 group-hover:text-blue-300">
                                                                <span>Switch to Algo Execution</span>
                                                                <ArrowRight size={8} />
                                                            </div>
                                                        </div>
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>

            </div>
        </div>

      </div>
    </div>,
    portalRoot
  );
};

export default BridgeModal;
