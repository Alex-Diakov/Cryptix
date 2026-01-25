import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  ArrowDown, 
  Sparkles, 
  Settings,
  Ghost,
  ShieldCheck,
  StopCircle,
  AlertTriangle,
  Zap, 
  Clock,
  Split,
  Fuel,
  Target,
  MousePointerClick,
  CheckSquare,
  Square,
  Shuffle,
  Hourglass,
  Coins,
  Layers,
  ArrowDownToLine,
  ChevronDown,
  GitMerge,
  Shield,
  Lock,
  Activity,
  Info,
  Route, 
  Receipt,
  X,
  Edit2,
  TrendingDown,
  Check,
  User,
  ExternalLink,
  Ban,
  Eye,
  BarChart2,
  Timer
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  YAxis, 
  ReferenceLine, 
  BarChart, 
  Bar, 
  XAxis, 
  Tooltip, 
  Cell,
  ComposedChart,
  Line,
} from 'recharts';

const formatMoney = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
const formatToken = (val: number) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(val);
const formatTokenAmount = (val: number) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
const formatPercent = (val: number) => `${val > 0 ? '+' : ''}${val.toFixed(2)}%`;

interface EducationalTooltipProps {
  title: string;
  desc: string;
  children: React.ReactNode;
}

interface ExecutionViewProps {
  initialState?: any;
}

const EducationalTooltip: React.FC<EducationalTooltipProps> = ({ title, desc, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
          top: rect.top + window.scrollY, 
          left: rect.left + rect.width / 2
        });
        setIsVisible(true);
      }
    }, 500);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsVisible(false);
  };

  return (
    <>
      <div 
        ref={triggerRef} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
        className="cursor-help w-full h-full block"
      >
        {children}
      </div>
      {isVisible && createPortal(
        <div 
          className="fixed z-[9999] pointer-events-none animate-in fade-in zoom-in-95 duration-300"
          style={{ 
            top: coords.top - 12, 
            left: coords.left, 
            transform: 'translate(-50%, -100%)' 
          }}
        >
          <div className="w-[280px] bg-zinc-900/95 border border-white/10 backdrop-blur-md p-5 rounded-xl shadow-2xl relative">
             <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                <Sparkles size={12} className="text-emerald-500" />
                {title}
             </h4>
             <p className="text-zinc-300 text-[11px] leading-relaxed font-medium">{desc}</p>
             {/* Arrow */}
             <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900/95 border-b border-r border-white/10 rotate-45"></div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

const TokenSelectorModal = ({ isOpen, onClose, onSelect }: any) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="w-[400px] bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-white/5 flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest text-white">Select Token</span>
                    <button onClick={onClose}><X size={14} className="text-zinc-500 hover:text-white"/></button>
                </div>
                <div className="p-2 space-y-1">
                    {/* Token Row */}
                    {[
                        { sym: 'ETH', name: 'Ethereum', verified: true, address: '0x000...000' },
                        { sym: 'USDC', name: 'USD Coin', verified: true, address: '0xa0b...eb48' },
                        { sym: 'PEPE', name: 'Pepe', verified: false, address: '0x698...1933' }
                    ].map(t => (
                        <button key={t.sym} onClick={() => { onSelect(t.sym); onClose(); }} className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl group transition-colors">
                            <div className="flex items-center gap-3">
                                {/* Icon placeholder */}
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400 border border-white/5">{t.sym[0]}</div>
                                <div className="text-left">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-sm font-bold text-white">{t.sym}</span>
                                        {t.verified && (
                                            <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-500/10 rounded text-[9px] font-bold text-emerald-500 border border-emerald-500/20" title="Verified Contract">
                                                <ShieldCheck size={10} /> Verified
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-zinc-500">{t.name}</span>
                                </div>
                            </div>
                            <a 
                                href="#" 
                                onClick={(e) => e.stopPropagation()} 
                                className="p-2 text-zinc-600 hover:text-blue-400 transition-colors"
                                title="View on Etherscan"
                            >
                                <ExternalLink size={12} />
                            </a>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

const ExecutionView: React.FC<ExecutionViewProps> = ({ initialState }) => {
  const [payAmount, setPayAmount] = useState('');
  const [tradeMode, setTradeMode] = useState<'market' | 'limit' | 'algo'>('market');
  
  // Settings
  const [slippage, setSlippage] = useState(0.5);
  
  // Limit Specific State
  const [limitPrice, setLimitPrice] = useState('3208.93');
  const [expiry, setExpiry] = useState('24h');
  const [postOnly, setPostOnly] = useState(false);

  // Algo Specific State
  const [algoDuration, setAlgoDuration] = useState(4); // Hours (Only for TWAP/VWAP)
  const [algoMinPrice, setAlgoMinPrice] = useState(''); // Price Protection
  const [algoStrategy, setAlgoStrategy] = useState<'TWAP' | 'VWAP' | 'ICEBERG'>('TWAP');
  const [algoRandomize, setAlgoRandomize] = useState(false);
  const [participationRate, setParticipationRate] = useState(10); // % for VWAP
  const [icebergVisibleAmount, setIcebergVisibleAmount] = useState(''); // Amount for ICEBERG
  
  const [isAlgoRunning, setIsAlgoRunning] = useState(false);
  const [executionProgress, setExecutionProgress] = useState(0);

  // NEW FEATURES STATE
  const [recipientMode, setRecipientMode] = useState(false);
  const [gasSpeed, setGasSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [isGasSelectorOpen, setIsGasSelectorOpen] = useState(false);
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false);
  
  // INLINE CONFIRMATION STATE (Replaces Modal)
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewTimer, setReviewTimer] = useState(15);

  const ETH_PRICE = 3208.93;
  const ETH_BALANCE = 350.0000; 
  const BASE_GAS_COST_USD = 9.75; 
  const MIN_TRANCHE_USD = 2000; 
  const GAS_RESERVE = 0.01; // ETH to reserve for gas
  
  // Limit Chart Constants
  const SUPPORT_LEVEL = 3180.00;
  const RESISTANCE_LEVEL = 3280.00;
  const RISK_FREE_RATE = 0.042; // 4.2% Risk Free Rate (Aave/Compound Benchmark)
  
  const USDC_ICON = 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035';
  const ETH_ICON = 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035';

  const ACTIVE_LIMIT_ORDERS = [
      { id: 'ord_1', time: '14:32:05', pair: 'ETH/USDC', side: 'Sell', size: '350.00 ETH', filledPct: 12, price: 3320.00 },
      { id: 'ord_2', time: '14:30:22', pair: 'SOL/USDC', side: 'Buy', size: '1,200 SOL', filledPct: 68, price: 138.50 },
  ];

  // Initialize from Props
  useEffect(() => {
    if (initialState) {
        if (initialState.mode) setTradeMode(initialState.mode);
        if (initialState.strategy) setAlgoStrategy(initialState.strategy);
        if (initialState.tranches) setAlgoDuration(initialState.tranches); // Simplified logic mapping tranches to hours for demo
        
        // Auto fill a typical amount if coming from bridge suggestion
        if (initialState.mode === 'algo' && !payAmount) {
            setPayAmount('38.50'); // Example pre-fill for the bridge scenario
        }
    }
  }, [initialState]);

  // Review Timer Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isReviewing) {
        setReviewTimer(15); // Reset
        interval = setInterval(() => {
            setReviewTimer(prev => {
                if (prev <= 1) {
                    setIsReviewing(false); // Auto cancel
                    return 15;
                }
                return prev - 1;
            });
        }, 1000);
    }
    return () => clearInterval(interval);
  }, [isReviewing]);

  const getGasPrice = () => {
    switch(gasSpeed) {
      case 'slow': return 7.50;
      case 'fast': return 12.20;
      default: return 9.75;
    }
  };

  const numericPay = parseFloat(payAmount) || 0;
  const isInsufficientBalance = numericPay > ETH_BALANCE;
  const hasAmount = numericPay > 0;

  const simulation = useMemo(() => {
    const pay = numericPay;
    const usdValue = pay * ETH_PRICE; 
    const limitP = parseFloat(limitPrice) || ETH_PRICE;
    
    // --- LIMIT CALCULATION REFINED ---
    // Gross value before fees
    const limitValue = pay * limitP; 

    // --- REALISTIC COST STRUCTURE LOGIC ---
    
    // 1. MOCK LIQUIDITY & PRICE IMPACT (Base Instant Execution)
    const MOCK_LIQUIDITY = 10_000_000; 
    const IMPACT_MULTIPLIER = 2.85; 
    
    let swapImpactPct = 0;
    if (usdValue > 0) {
        swapImpactPct = (usdValue / MOCK_LIQUIDITY) * IMPACT_MULTIPLIER;
    }
    const swapImpactCost = usdValue * (swapImpactPct / 100);

    // 2. PLATFORM FEE (0.05%)
    const platformFee = usdValue * 0.0005;

    // 3. DYNAMIC ROUTE LOGIC (MATH CHECKED)
    let routeSplit = [];
    const baseRate = limitP;
    
    // Distribute impact relative to total calculated impact
    const baseImpact = swapImpactPct > 0 ? swapImpactPct : 0.01;

    if (usdValue > 0) {
        if (usdValue < 50000) {
             routeSplit = [{ dex: 'Uniswap V3', pct: 100, color: 'bg-white', rate: baseRate * 1.0005, impact: parseFloat((baseImpact * 0.9).toFixed(2)) }];
        } else if (usdValue < 250000) {
             routeSplit = [
                { dex: 'Uniswap V3', pct: 70, color: 'bg-white', rate: baseRate * 1.0002, impact: parseFloat((baseImpact * 0.8).toFixed(2)) }, 
                { dex: 'Maverick', pct: 30, color: 'bg-zinc-600', rate: baseRate * 0.9998, impact: parseFloat((baseImpact * 1.2).toFixed(2)) }
             ];
        } else {
             routeSplit = [
                { dex: 'Uniswap V3', pct: 60, color: 'bg-white', rate: baseRate * 1.0002, impact: parseFloat((baseImpact * 0.85).toFixed(2)) }, 
                { dex: 'Maverick', pct: 30, color: 'bg-zinc-600', rate: baseRate * 0.9998, impact: parseFloat((baseImpact * 1.1).toFixed(2)) },
                { dex: 'SushiSwap', pct: 10, color: 'bg-zinc-700', rate: baseRate * 0.9985, impact: parseFloat((baseImpact * 1.5).toFixed(2)) }
             ];
        }
    } else {
        routeSplit = [{ dex: 'Uniswap V3', pct: 100, color: 'bg-white', rate: baseRate, impact: 0.00 }];
    }

    // 4. DYNAMIC NETWORK FEE
    let networkFee = getGasPrice();
    if (tradeMode === 'market' && routeSplit.length > 1) {
        // Multi-hop / Multi-route increases gas cost
        networkFee = getGasPrice() * (1 + (routeSplit.length * 0.4));
    }

    // 5. TOTAL SWAP COST (Instant)
    const totalSwapCost = swapImpactCost + platformFee + networkFee;

    // --- ALGO LOGIC (VWAP, TWAP, ICEBERG) ---
    // Common Defaults
    let optimalTranches = 1;
    let avgIntervalMins = 0;
    
    // --- VWAP / TWAP MATH ---
    if (algoStrategy !== 'ICEBERG') {
        const maxViableTranches = Math.floor(usdValue / MIN_TRANCHE_USD);
        const totalMinutes = algoDuration * 60;
        optimalTranches = Math.floor(totalMinutes / 20); 
        if (optimalTranches > maxViableTranches) optimalTranches = Math.max(1, maxViableTranches);
        if (optimalTranches < 1) optimalTranches = 1;
        if (usdValue === 0) optimalTranches = 0;
        avgIntervalMins = optimalTranches > 0 ? Math.floor(totalMinutes / optimalTranches) : 0;
    }

    // --- ICEBERG SPECIFIC MATH ---
    let hiddenSize = 0;
    let signalingSavings = 0;
    let icebergTranches = 0;
    
    if (algoStrategy === 'ICEBERG' && hasAmount) {
        // 1. Determine Visible Amount
        // Default to 10% if user hasn't input anything
        const visibleAmountNum = parseFloat(icebergVisibleAmount) || (pay * 0.1);
        
        // 2. Calculate Tranches based on Visible Amount (Volume Slicing)
        // Ensure at least 1 tranche
        icebergTranches = Math.ceil(pay / visibleAmountNum);
        if (icebergTranches < 1) icebergTranches = 1;
        optimalTranches = icebergTranches;

        // 3. Estimate Duration based on "Liquidity Refill Rate"
        // Assumption: Market can absorb 'Visible Amount' every 2 minutes without slippage increasing
        avgIntervalMins = 3; 
        
        // 4. Calculate Hidden Size
        hiddenSize = Math.max(0, pay - visibleAmountNum);

        // 5. Calculate Signaling Savings
        // Predatory bots front-run large orders. Iceberg avoids this "Signaling Penalty".
        // Penalty Model: 0.15% of total value for large visible orders
        const signalingPenaltyRate = 0.0015; 
        signalingSavings = usdValue * signalingPenaltyRate;
    }
    
    // ALGO COSTS
    const algoTrancheImpactPct = 0.05; 
    const algoTotalGas = optimalTranches * getGasPrice();
    const totalAlgoCost = algoTotalGas + platformFee; 
    
    // --- ADVANCED SAVINGS CALCULATIONS ---
    let vwapSlippageCost = 0;
    let vwapSavings = 0;
    
    if (algoStrategy === 'VWAP' && hasAmount) {
        const participationFactor = Math.pow(participationRate / 100, 1.5);
        const estimatedVWAPImpactPct = swapImpactPct * (0.15 + participationFactor * 0.85);
        vwapSlippageCost = usdValue * (estimatedVWAPImpactPct / 100);
        vwapSavings = swapImpactCost - (vwapSlippageCost + algoTotalGas);
    }

    // Net Savings Logic
    let netSavings = swapImpactCost - totalAlgoCost; 
    
    if (hasAmount) {
        if (algoStrategy === 'VWAP') {
            netSavings = vwapSavings;
        } else if (algoStrategy === 'ICEBERG') {
            // Iceberg Savings = (Instant Impact + Signaling Penalty) - (Iceberg Impact + Gas)
            // Iceberg Impact is roughly 25% of instant impact due to refill intervals
            const icebergImpactCost = swapImpactCost * 0.25;
            netSavings = (swapImpactCost + signalingSavings) - (icebergImpactCost + algoTotalGas);
        }
    }

    const isAlgoEfficient = netSavings > 0;

    // --- DYNAMIC EXECUTION SCORE LOGIC ---
    let routingScore = 0;
    let scoreColor = 'text-zinc-600';
    let scoreLabel = 'WAITING';
    let scoreWarning = null;
    let progressBarColor = 'bg-zinc-800';

    if (usdValue > 0) {
        if (swapImpactPct < 0.1) {
            routingScore = 10 - (swapImpactPct * 10);
            scoreColor = 'text-emerald-500';
            scoreLabel = 'OPTIMAL';
            progressBarColor = 'bg-emerald-500';
        } else if (swapImpactPct < 0.3) {
            routingScore = 8.9 - ((swapImpactPct - 0.1) / 0.2) * 2.9;
            scoreColor = 'text-amber-500';
            scoreLabel = 'FAIR';
            progressBarColor = 'bg-amber-500';
        } else {
            routingScore = Math.max(1, 5.9 - ((swapImpactPct - 0.3) * 20));
            scoreColor = 'text-rose-500';
            scoreLabel = 'POOR';
            scoreWarning = "High Price Impact. Consider using ALGO trade.";
            progressBarColor = 'bg-rose-500';
        }
    }

    const distanceToMarket = ((limitP - ETH_PRICE) / ETH_PRICE) * 100;
    const isBelowMarketSell = distanceToMarket < 0; 
    const postOnlyWarning = postOnly && isBelowMarketSell;

    // --- PROBABILITY ENGINE ---
    let expiryHours = 24;
    switch(expiry) {
        case '10m': expiryHours = 0.16; break;
        case '1h': expiryHours = 1; break;
        case '24h': expiryHours = 24; break;
        case '3d': expiryHours = 72; break;
        case '7d': expiryHours = 168; break;
        case 'GTC': expiryHours = 720; break;
        default: expiryHours = 24;
    }

    const DAILY_VOLATILITY = 0.035; 
    const HOURLY_VOLATILITY = DAILY_VOLATILITY / Math.sqrt(24);
    const distPct = Math.abs(distanceToMarket) / 100;
    const stdDevsNeeded = distPct / (HOURLY_VOLATILITY * Math.sqrt(expiryHours));
    let rawProb = 100 * Math.exp(-0.5 * Math.pow(stdDevsNeeded, 2));
    if (isBelowMarketSell) rawProb = 100; 
    if (rawProb > 99) rawProb = 99;
    if (rawProb < 1) rawProb = 1;
    const execProbability = Math.round(rawProb);

    let probLabel = 'LOW';
    let probColor = 'text-zinc-500';
    if (execProbability >= 90) { probLabel = 'VERY HIGH'; probColor = 'text-emerald-400'; }
    else if (execProbability >= 65) { probLabel = 'HIGH'; probColor = 'text-emerald-500'; }
    else if (execProbability >= 35) { probLabel = 'MEDIUM'; probColor = 'text-amber-500'; }
    else { probLabel = 'LOW'; probColor = 'text-rose-500'; }

    let timeHorizon = '> 4 Days';
    let timeRange = '3d - 7d';
    if (isBelowMarketSell) { timeHorizon = 'Instant'; timeRange = 'Now'; }
    else {
        const expectedHours = (Math.abs(distanceToMarket) / 1.0) * 12;
        if (expectedHours < 1) { timeHorizon = '< 1 Hour'; timeRange = '10m - 90m'; }
        else if (expectedHours < 24) { timeHorizon = `~${Math.ceil(expectedHours)} Hours`; timeRange = `${Math.floor(expectedHours*0.5)}h - ${Math.ceil(expectedHours*1.5)}h`; }
        else { const days = Math.ceil(expectedHours / 24); timeHorizon = `~${days} Days`; timeRange = `${days}d - ${days+2}d`; }
    }

    const annualYield = RISK_FREE_RATE; 
    const yearHours = 8760;
    const baseDailyYieldLoss = limitValue * annualYield * (expiryHours / yearHours);
    const dailyYieldLoss = baseDailyYieldLoss;

    const wallsAheadUsd = Math.abs(distanceToMarket) * 8_000_000; 
    let structureLabel = 'IN RANGE';
    let structureColor = 'text-zinc-400';
    if (limitP < SUPPORT_LEVEL) { structureLabel = 'BELOW SUPPORT'; structureColor = 'text-orange-400'; }
    else if (limitP > RESISTANCE_LEVEL) { structureLabel = 'BREAKOUT TARGET'; structureColor = 'text-emerald-400'; }

    // --- ALGO SCHEDULE GENERATION ---
    const scheduleData = [];
    if (optimalTranches > 0) {
        let currentTime = new Date();
        const now = new Date();
        const startTime = new Date(now.getTime() - (avgIntervalMins * 60000 * 2)); 
        currentTime = startTime;
        
        let predictedPrice = ETH_PRICE;
        
        // Volume Weighting Logic
        const getVolumeWeight = (index: number, total: number) => {
            if (algoStrategy === 'VWAP') {
                const pos = (index / (total - 1)) * 2 - 1;
                const noise = (Math.random() * 0.3) - 0.15;
                return (pos * pos) + 0.5 + noise;
            } else if (algoStrategy === 'ICEBERG') {
                // Iceberg: Mostly flat (the visible amount), with tiny variance
                return 1.0 + (Math.random() * 0.1 - 0.05); 
            } else if (algoStrategy === 'TWAP' && algoRandomize) {
                // TWAP Randomize: +/- 25% volume variance to hide footprint
                return 1.0 + ((Math.random() * 0.5) - 0.25);
            }
            return 1;
        };

        // Calculate Total Weight first to normalize
        let totalWeight = 0;
        const rawWeights = [];
        for (let i = 0; i < optimalTranches; i++) {
            const w = getVolumeWeight(i, optimalTranches);
            rawWeights.push(w);
            totalWeight += w;
        }

        for (let i = 0; i < optimalTranches; i++) {
             // Normalized Volume for this tranche
             const normalizedVol = (rawWeights[i] / totalWeight) * pay;
             
             let status: 'executed' | 'active' | 'pending' = 'pending';
             if (i < 2) status = 'executed';
             if (i === 2) status = 'active';
             
             predictedPrice = predictedPrice * (1 - (0.0002 + (Math.random() * 0.0001)));

             // Interval Randomization for TWAP if enabled
             let currentInterval = avgIntervalMins;
             if (algoStrategy === 'TWAP' && algoRandomize) {
                 const variance = avgIntervalMins * 0.4; // 40% variance in time to avoid detection
                 currentInterval = avgIntervalMins + ((Math.random() * variance * 2) - variance);
             }

             scheduleData.push({
                 id: i,
                 time: currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                 volume: normalizedVol,
                 status: status,
                 priceDecay: predictedPrice 
             });
             
             currentTime = new Date(currentTime.getTime() + currentInterval * 60000);
        }
    }

    let finalReceive = '0.00';
    let receiveValNum = 0;
    let netLimitReceive = 0;
    let effectivePrice = 0;

    if (tradeMode === 'limit') {
        finalReceive = formatTokenAmount(limitValue);
        receiveValNum = limitValue;
        netLimitReceive = Math.max(0, limitValue - platformFee - networkFee);
        effectivePrice = pay > 0 ? netLimitReceive / pay : 0;
    } else if (tradeMode === 'algo') {
        const val = usdValue - totalAlgoCost; // Gross simplified
        finalReceive = formatTokenAmount(val);
        receiveValNum = val;
    } else {
        const val = usdValue - totalSwapCost;
        finalReceive = formatTokenAmount(val);
        receiveValNum = val;
    }

    const minReceived = receiveValNum * (1 - slippage/100);
    const swapTotalGas = networkFee;

    // --- TOOLTIP CONTENT GENERATORS ---
    let probabilityTooltip = "";
    if (isBelowMarketSell) {
        probabilityTooltip = "This order is priced better than current market rate. It will execute immediately as a Taker order (100% Probability).";
    } else {
        probabilityTooltip = `Based on 3.5% daily volatility, there is a ${execProbability}% statistical probability that price will reach your target of $${limitP.toLocaleString()} within the next ${expiry}.`;
    }

    let etaTooltip = "";
    if (isBelowMarketSell) {
        etaTooltip = "Execution will be instant.";
    } else {
        etaTooltip = `Market needs to move ${Math.abs(distanceToMarket).toFixed(2)}% to reach your limit. Based on current market velocity, this gap typically closes in ${timeRange}.`;
    }

    const costTooltip = `Capital Efficiency Drag: By locking ${formatMoney(limitValue)} in this order for ${expiry}, you forego potential risk-free yield (approx 4.2% APY). Estimated loss: ${formatMoney(dailyYieldLoss)}.`;

    const algoDumpTooltip = hasAmount 
        ? `Immediate market execution of ${formatToken(pay)} ETH would deplete available liquidity, causing ${swapImpactPct.toFixed(2)}% slippage and a value loss of ${formatMoney(swapImpactCost)} relative to spot price.`
        : "Estimates price impact penalty for immediate market execution.";

    // STRATEGY SPECIFIC ALPHA TOOLTIP - UPDATED FOR DYNAMIC VWAP & ICEBERG
    let algoAlphaTooltip = "";
    if (algoStrategy === 'VWAP') {
        algoAlphaTooltip = hasAmount
            ? `Targeting ${participationRate}% of volume drastically reduces impact. 
               Instant Impact: ${formatMoney(swapImpactCost)} 
               VWAP Impact: ${formatMoney(vwapSlippageCost)} 
               Net Alpha: ${formatMoney(netSavings)}`
            : "VWAP generates value by executing in proportion to market liquidity.";
    } else if (algoStrategy === 'ICEBERG') {
        algoAlphaTooltip = hasAmount
            ? `Iceberg hides ${formatToken(hiddenSize)} ETH from the order book.
               Visible Amount: ${formatToken(parseFloat(icebergVisibleAmount) || pay * 0.1)} ETH (${icebergTranches} Tranches).
               Signaling Protection: ${formatMoney(signalingSavings)} prevented loss.`
            : "Iceberg masks order intent by splitting into variable, visible tranches.";
    } else {
        algoAlphaTooltip = hasAmount
            ? `By splitting order into ${optimalTranches} equal tranches (TWAP) over ${algoDuration}h, you minimize time-based variance. Net Gain: ${formatMoney(netSavings)} (Slippage Saved - Algo Fees).`
            : "Net value generated by using this algo vs. market order.";
    }

    const algoCostTooltip = hasAmount
        ? `Service Fee: ${formatMoney(platformFee)} (0.05%) + Est. Gas: ${formatMoney(algoTotalGas)} (${optimalTranches} on-chain txs). Total operational cost.`
        : "Combined cost of platform fees and network gas for all child orders.";

    return {
        usdValue,
        limitValue,
        netLimitReceive,
        effectivePrice,
        receiveAmount: finalReceive,
        receiveValNum,
        minReceived,
        swapImpactPct,
        swapImpactCost, 
        algoTrancheImpactPct,
        totalAlgoCost, 
        platformFee, 
        networkFee,
        numTranches: optimalTranches,
        avgIntervalMins,
        algoTotalGas,
        swapTotalGas,
        netSavings,
        isAlgoEfficient,
        scheduleData,
        routingScore: routingScore.toFixed(1),
        scoreColor,
        scoreLabel,
        scoreWarning,
        progressBarColor,
        routeSplit,
        totalSwapCost,
        distanceToMarket,
        isBelowMarketSell,
        postOnlyWarning,
        execProbability,
        probLabel,
        probColor,
        timeHorizon,
        timeRange,
        dailyYieldLoss,
        structureLabel,
        structureColor,
        wallsAheadUsd,
        liquidityBuffer: `${slippage}%`,
        tooltips: {
            probability: probabilityTooltip,
            eta: etaTooltip,
            cost: costTooltip,
            algoDump: algoDumpTooltip,
            algoAlpha: algoAlphaTooltip,
            algoCost: algoCostTooltip
        }
    };
  }, [payAmount, tradeMode, algoDuration, limitPrice, algoRandomize, slippage, gasSpeed, postOnly, expiry, algoStrategy, participationRate, icebergVisibleAmount]); // ADDED icebergVisibleAmount

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setPayAmount(val);
    }
  };

  const handleMaxClick = () => {
    const max = Math.max(0, ETH_BALANCE - GAS_RESERVE);
    setPayAmount(max.toFixed(4));
  };

  const handlePercentageClick = (pct: number) => {
    const maxSafe = Math.max(0, ETH_BALANCE - GAS_RESERVE);
    const val = (maxSafe * pct) / 100;
    setPayAmount(val.toFixed(4));
  };
  
  const adjustLimitPrice = (pct: number) => {
      const newPrice = pct === 0 ? ETH_PRICE : ETH_PRICE * (1 + pct / 100);
      setLimitPrice(newPrice.toFixed(2));
  };

  const adjustAlgoMinPrice = (pct: number) => {
      const price = ETH_PRICE * (1 + (pct / 100));
      setAlgoMinPrice(price.toFixed(2));
  };

  const openSettingsModal = () => {
      console.log("Opening Slippage Settings Modal");
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAlgoRunning && executionProgress < 100) {
      interval = setInterval(() => {
        setExecutionProgress(prev => Math.min(prev + 0.5, 100));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isAlgoRunning, executionProgress]);

  const handleConfirmOrder = () => {
      if (tradeMode === 'algo') {
          setIsAlgoRunning(true);
      } else {
          // Main Swap/Limit Execution
          console.log("Order Executed");
          setIsReviewing(false);
      }
  };

  const structureData = useMemo(() => {
      const data = [];
      let currentP = 3195; 
      for(let i=0; i<=20; i++) {
          if (i === 20) {
             data.push({ i, price: ETH_PRICE }); 
          } else {
             currentP = currentP + (Math.random() * 30 - 12);
             data.push({ i, price: currentP });
          }
      }
      return data;
  }, []);

  const depthData = useMemo(() => {
      const data = [];
      const limitP = parseFloat(limitPrice) || ETH_PRICE;
      const startPrice = ETH_PRICE * 0.95;
      const endPrice = ETH_PRICE * 1.05;
      const steps = 40; 
      const stepSize = (endPrice - startPrice) / steps;

      for(let i = 0; i <= steps; i++) {
          const p = startPrice + (i * stepSize);
          let bidVol = 0;
          let askVol = 0;
          if (p < ETH_PRICE) {
             const dist = ETH_PRICE - p;
             bidVol = 5000;
             if (dist > 10) bidVol += 25000;
             if (dist > 30) bidVol += 55000;
             if (dist > 60) bidVol += 120000;
          }
          if (p > ETH_PRICE) {
             const dist = p - ETH_PRICE;
             askVol = 5000;
             if (dist > 15) askVol += 35000;
             if (dist > 40) askVol += 75000;
             if (dist > 80) askVol += 150000;
          }
          data.push({ price: p, bidVol, askVol });
      }
      return data;
  }, [limitPrice]);

  const isHighImpact = parseFloat(simulation.routingScore) < 6.0 && hasAmount;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <TokenSelectorModal isOpen={isTokenSelectorOpen} onClose={() => setIsTokenSelectorOpen(false)} onSelect={(t: string) => console.log(t)} />
      
      {/* ---------------------------------------------------------------------------
          LEFT PANEL: ENGINE & INPUT
      --------------------------------------------------------------------------- */}
      <section className="lg:col-span-4 flex flex-col h-full" aria-labelledby="engine-title">
        {/* CONTAINER RADIUS: rounded-2xl */}
        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-8 shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col h-full">
          
          {/* TAB SWITCHER */}
          <div className="flex items-center justify-between mb-8 shrink-0">
            <div className="flex p-1 bg-black/40 rounded-2xl border border-white/5 relative">
              <button 
                onClick={() => setTradeMode('market')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    tradeMode === 'market' 
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Swap
              </button>
              
              <button 
                onClick={() => setTradeMode('limit')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    tradeMode === 'limit' 
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Limit
              </button>
              
              {/* ALGO TAB */}
              <button 
                onClick={() => setTradeMode('algo')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 relative ${
                    tradeMode === 'algo' 
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Ghost size={12} /> 
                <span>Algo</span>
              </button>
            </div>
            
            {/* SETTINGS */}
            <div className="flex items-center gap-6">
                <button 
                    onClick={openSettingsModal}
                    className="bg-zinc-800 p-2.5 rounded-xl border border-white/5 text-gray-500 hover:text-white cursor-pointer transition-colors outline-none hover:bg-zinc-700"
                >
                    <Settings size={18} aria-hidden="true" />
                </button>
            </div>
          </div>

          {/* INPUT FORM */}
          {tradeMode === 'algo' && isAlgoRunning ? (
             <div className="space-y-6 py-4 animate-in fade-in zoom-in-95 duration-500 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                     Execution Active
                   </span>
                   <span className="text-[10px] font-mono font-bold text-emerald-400 tabular-nums">{algoStrategy} • {algoStrategy === 'ICEBERG' ? `${simulation.numTranches} Tranches` : `${algoDuration}H`}</span>
                </div>
                
                <div className="bg-black/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                    <div className="flex justify-between items-end mb-4 relative z-10">
                        <div>
                           <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Filled Amount</p>
                           <p className="text-2xl font-mono font-bold text-white tabular-nums">{formatToken((parseFloat(payAmount) || 0) * (executionProgress/100))} ETH</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Avg Price</p>
                           <p className="text-xl font-mono font-bold text-emerald-500 tabular-nums">$3,205.12</p>
                        </div>
                    </div>
                    <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden mb-2 relative z-10">
                       <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300" style={{ width: `${executionProgress}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-zinc-500 relative z-10">
                       <span>{executionProgress.toFixed(1)}% Complete</span>
                       <span>~{simulation.avgIntervalMins * (simulation.numTranches - (simulation.numTranches * executionProgress/100))}m Remaining</span>
                    </div>
                </div>

                <div className="mt-auto">
                    <button 
                      onClick={() => setIsAlgoRunning(false)}
                      className="w-full h-12 rounded-xl font-black text-[11px] uppercase tracking-[0.05em] bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <StopCircle size={16} /> Stop Engine
                    </button>
                </div>
             </div>
          ) : (
          <div className="flex-1 flex flex-col relative gap-2">
            
            {/* ALGO SPECIFIC LAYOUT */}
            {tradeMode === 'algo' ? (
                <div className="flex-1 flex flex-col gap-4">
                    {/* CARD A: ORDER CONFIGURATION */}
                    <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 space-y-6 shadow-xl backdrop-blur-sm">
                        {/* Pay Section */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-2 w-full">
                                     <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex justify-between w-full pr-1">
                                        <span>You Pay</span>
                                        <span className="font-mono text-zinc-500">Bal: {formatToken(ETH_BALANCE)}</span>
                                     </label>
                                     <div className="flex items-center gap-3">
                                        <input 
                                            type="text" 
                                            value={payAmount}
                                            onChange={handleAmountChange}
                                            className="text-4xl lg:text-5xl font-mono font-medium tracking-tighter bg-transparent outline-none placeholder:text-zinc-800 text-white w-full min-w-0" 
                                            placeholder="0.00" 
                                        />
                                        <button className="flex items-center gap-2 bg-zinc-950/50 border border-white/10 px-3 py-2 rounded-xl hover:border-white/20 transition-colors shrink-0">
                                            <img src={ETH_ICON} className="w-5 h-5 object-contain" alt="ETH" />
                                            <span className="font-bold text-white text-sm">ETH</span>
                                            <ChevronDown size={12} className="text-zinc-600" />
                                        </button>
                                     </div>
                                     {/* Percentage Buttons */}
                                     <div className="flex gap-2 mt-1">
                                        {[25, 50, 75, 100].map(pct => (
                                            <button 
                                                key={pct}
                                                onClick={() => handlePercentageClick(pct)}
                                                className="border border-white/10 text-[10px] font-bold text-zinc-500 px-3 py-1 rounded-md hover:bg-white/5 hover:text-white transition-colors"
                                            >
                                                {pct === 100 ? 'MAX' : `${pct}%`}
                                            </button>
                                        ))}
                                     </div>
                                </div>
                            </div>

                            {/* Connector */}
                            <div className="relative h-px bg-white/5 w-full my-2">
                                <div className="absolute left-1/2 -translate-x-1/2 -top-3 p-1.5 bg-[#0e0e11] border border-white/10 rounded-full text-zinc-500 shadow-sm">
                                    <ArrowDown size={12} />
                                </div>
                            </div>

                            {/* Receive Section */}
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col gap-2 w-full">
                                     <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Estimated Receive</label>
                                     <div className="flex items-center gap-3">
                                        <div className="text-3xl lg:text-4xl font-mono font-medium tracking-tighter text-zinc-300 w-full min-w-0 truncate">
                                            {payAmount ? formatTokenAmount(simulation.receiveValNum) : '0.00'}
                                        </div>
                                        <button className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 px-3 py-2 rounded-xl hover:border-white/10 transition-colors shrink-0">
                                            <img src={USDC_ICON} className="w-5 h-5 object-contain" alt="USDC" />
                                            <span className="font-bold text-white text-sm">USDC</span>
                                            <ChevronDown size={12} className="text-zinc-600" />
                                        </button>
                                     </div>
                                     <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                                        Min. Receive (after {slippage}% slippage): <span className="text-zinc-400 font-mono">{payAmount ? formatTokenAmount(simulation.minReceived) : '0.00'} USDC</span>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CARD B: EXECUTION PARAMETERS (Contextual Controls) */}
                    <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 flex flex-col gap-6 shadow-inner animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Execution Parameters</span>
                            <Settings size={12} className="text-zinc-600"/>
                        </div>

                        {/* Strategy Type: Segmented Control */}
                        <div>
                            <label className="text-[9px] font-bold text-zinc-500 uppercase block mb-2 tracking-wide">Strategy Type</label>
                            <div className="bg-black/40 p-1 rounded-lg border border-white/5 flex">
                                {['TWAP', 'VWAP', 'ICEBERG'].map(strat => (
                                    <button 
                                        key={strat}
                                        onClick={() => setAlgoStrategy(strat as any)}
                                        className={`flex-1 py-2 rounded-md text-[9px] font-black uppercase tracking-wider transition-all ${
                                            algoStrategy === strat 
                                            ? 'bg-zinc-700 text-white shadow-sm' 
                                            : 'text-zinc-500 hover:text-zinc-300'
                                        }`}
                                    >
                                        {strat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* --- DYNAMIC CONTROLS --- */}
                        
                        {/* 1. TWAP CONTROLS */}
                        {algoStrategy === 'TWAP' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
                                {/* Duration */}
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Duration</label>
                                        <span className="text-[10px] font-mono font-bold text-white">{algoDuration} Hours</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0.5" 
                                        max="24" 
                                        step="0.5"
                                        value={algoDuration} 
                                        onChange={(e) => setAlgoDuration(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
                                    />
                                </div>

                                {/* Min Price & Randomize */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-zinc-950/30 border border-white/5 rounded-xl p-3 flex flex-col justify-center gap-1 group focus-within:border-emerald-500/30 transition-colors h-[60px]">
                                        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Min. Sell Price</label>
                                        <div className="flex items-center gap-1">
                                            <span className="text-zinc-600 font-mono text-xs">$</span>
                                            <input 
                                                type="text" 
                                                value={algoMinPrice}
                                                onChange={(e) => setAlgoMinPrice(e.target.value)}
                                                placeholder="Optional"
                                                className="bg-transparent text-sm font-mono font-bold text-white outline-none w-full placeholder:text-zinc-700" 
                                            />
                                        </div>
                                    </div>

                                    <div 
                                        className="bg-zinc-950/30 border border-white/5 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-white/10 transition-colors group h-[60px]" 
                                        onClick={() => setAlgoRandomize(!algoRandomize)}
                                    >
                                        <div className="flex flex-col">
                                            <label className={`text-[9px] font-bold uppercase cursor-pointer tracking-wide transition-colors ${algoRandomize ? 'text-emerald-400' : 'text-zinc-500'}`}>Randomize</label>
                                            <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-wider">Intervals</span>
                                        </div>
                                        <div className={`w-8 h-4 rounded-full relative transition-colors ${algoRandomize ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-300 shadow-sm ${algoRandomize ? 'left-4.5' : 'left-0.5'}`}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. VWAP CONTROLS */}
                        {algoStrategy === 'VWAP' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
                                {/* Duration */}
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Duration Window</label>
                                        <span className="text-[10px] font-mono font-bold text-white">{algoDuration} Hours</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0.5" 
                                        max="24" 
                                        step="0.5"
                                        value={algoDuration} 
                                        onChange={(e) => setAlgoDuration(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
                                    />
                                </div>

                                {/* Participation Rate (New) */}
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Target Volume Participation</label>
                                            <EducationalTooltip title="Participation Rate" desc="The bot will throttle execution to ensure it never exceeds this percentage of the total market volume during the execution window.">
                                                <Info size={10} className="text-zinc-600 cursor-help hover:text-white transition-colors" />
                                            </EducationalTooltip>
                                        </div>
                                        <span className="text-[10px] font-mono font-bold text-emerald-400">{participationRate}%</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="50" 
                                        step="1"
                                        value={participationRate} 
                                        onChange={(e) => setParticipationRate(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
                                    />
                                    <div className="flex justify-between mt-1 text-[8px] font-mono text-zinc-600">
                                        <span>Passive (1%)</span>
                                        <span>Aggressive (50%)</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 3. ICEBERG CONTROLS */}
                        {algoStrategy === 'ICEBERG' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Min Sell Price (Limit) */}
                                    <div className="bg-zinc-950/30 border border-white/5 rounded-xl p-3 flex flex-col justify-center gap-1 group focus-within:border-emerald-500/30 transition-colors h-[60px]">
                                        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Limit Price</label>
                                        <div className="flex items-center gap-1">
                                            <span className="text-zinc-600 font-mono text-xs">$</span>
                                            <input 
                                                type="text" 
                                                value={algoMinPrice}
                                                onChange={(e) => setAlgoMinPrice(e.target.value)}
                                                placeholder="Required"
                                                className="bg-transparent text-sm font-mono font-bold text-white outline-none w-full placeholder:text-zinc-700" 
                                            />
                                        </div>
                                    </div>

                                    {/* Visible Amount (New) */}
                                    <div className="bg-zinc-950/30 border border-white/5 rounded-xl p-3 flex flex-col justify-center gap-1 group focus-within:border-emerald-500/30 transition-colors h-[60px]">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Visible Amount</label>
                                            <Eye size={10} className="text-zinc-600" />
                                        </div>
                                        <div className="flex items-center gap-1">
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
                                
                                <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                    <Info size={14} className="text-blue-400" />
                                    <span className="text-[9px] text-blue-300 font-medium">
                                        Iceberg orders hide your full size. Only the "Visible Amount" will be shown on the order book.
                                    </span>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* CARD C: SIMULATION DETAILS (Receipt Style) */}
                    <div className="px-1 pt-2">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Estimated Outcome</span>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center py-3 border-b border-dashed border-white/10 px-2">
                                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Est. Tranches</span>
                                <span className="text-xs font-mono font-bold text-white">{simulation.numTranches}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-dashed border-white/10 px-2">
                                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Avg. Interval</span>
                                <span className="text-xs font-mono font-bold text-white">~{simulation.avgIntervalMins}m</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-dashed border-white/10 px-2">
                                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Est. Gas</span>
                                <span className="text-xs font-mono font-bold text-white">~{formatMoney(simulation.algoTotalGas)}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 px-2">
                                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                                    <Sparkles size={10} /> Platform Fee (0.05%)
                                </span>
                                <span className="text-xs font-mono font-bold text-white">~{formatMoney(simulation.platformFee)}</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA BUTTON */}
                    <button 
                        onClick={() => setIsAlgoRunning(true)}
                        disabled={numericPay <= 0 || isInsufficientBalance}
                        className={`mt-4 w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl transition-all active:scale-[0.98] ${
                            isInsufficientBalance || numericPay <= 0 
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5' 
                            : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-500/20'
                        }`}
                    >
                        LAUNCH {algoStrategy} STRATEGY
                    </button>
                </div>
            ) : tradeMode === 'limit' ? (
                // NEW LIMIT LAYOUT - CONSISTENT WITH ALGO
                <div className="flex-1 flex flex-col gap-4">
                    {/* CARD A: ORDER CONFIGURATION (Copied from Algo but adapted for Limit) */}
                    <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 space-y-6 shadow-xl backdrop-blur-sm">
                        {/* Pay Section */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-2 w-full">
                                     <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex justify-between w-full pr-1">
                                        <span>You Pay</span>
                                        <span className="font-mono text-zinc-500">Bal: {formatToken(ETH_BALANCE)}</span>
                                     </label>
                                     <div className="flex items-center gap-3">
                                        <input 
                                            type="text" 
                                            value={payAmount}
                                            onChange={handleAmountChange}
                                            className="text-4xl lg:text-5xl font-mono font-medium tracking-tighter bg-transparent outline-none placeholder:text-zinc-800 text-white w-full min-w-0" 
                                            placeholder="0.00" 
                                        />
                                        <button className="flex items-center gap-2 bg-zinc-950/50 border border-white/10 px-3 py-2 rounded-xl hover:border-white/20 transition-colors shrink-0">
                                            <img src={ETH_ICON} className="w-5 h-5 object-contain" alt="ETH" />
                                            <span className="font-bold text-white text-sm">ETH</span>
                                            <ChevronDown size={12} className="text-zinc-600" />
                                        </button>
                                     </div>
                                     {/* Percentage Buttons */}
                                     <div className="flex gap-2 mt-1">
                                        {[25, 50, 75, 100].map(pct => (
                                            <button 
                                                key={pct}
                                                onClick={() => handlePercentageClick(pct)}
                                                className="border border-white/10 text-[10px] font-bold text-zinc-500 px-3 py-1 rounded-md hover:bg-white/5 hover:text-white transition-colors"
                                            >
                                                {pct === 100 ? 'MAX' : `${pct}%`}
                                            </button>
                                        ))}
                                     </div>
                                </div>
                            </div>

                            {/* Connector */}
                            <div className="relative h-px bg-white/5 w-full my-2">
                                <div className="absolute left-1/2 -translate-x-1/2 -top-3 p-1.5 bg-[#0e0e11] border border-white/10 rounded-full text-zinc-500 shadow-sm">
                                    <ArrowDown size={12} />
                                </div>
                            </div>

                            {/* Receive Section (Limit specific calculation) */}
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col gap-2 w-full">
                                     <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Estimated Receive (Gross)</label>
                                     <div className="flex items-center gap-3">
                                        <div className="text-3xl lg:text-4xl font-mono font-medium tracking-tighter text-zinc-300 w-full min-w-0 truncate">
                                            {payAmount ? formatTokenAmount(simulation.limitValue) : '0.00'}
                                        </div>
                                        <button className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 px-3 py-2 rounded-xl hover:border-white/10 transition-colors shrink-0">
                                            <img src={USDC_ICON} className="w-5 h-5 object-contain" alt="USDC" />
                                            <span className="font-bold text-white text-sm">USDC</span>
                                            <ChevronDown size={12} className="text-zinc-600" />
                                        </button>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CARD B: LIMIT PARAMETERS */}
                    <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 shadow-inner">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Order Conditions</span>
                            <Settings size={12} className="text-zinc-600"/>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                             {/* Limit Price Input */}
                             <div className="bg-zinc-950/30 border border-white/5 rounded-xl p-3 flex flex-col justify-center gap-1 group focus-within:border-blue-500/30 transition-colors">
                                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide flex justify-between">
                                    Limit Price 
                                    <span className={simulation.isBelowMarketSell ? 'text-orange-500' : 'text-zinc-600'}>{simulation.isBelowMarketSell ? 'Below Market' : 'USDC'}</span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <span className="text-zinc-500 font-mono text-lg">$</span>
                                    <input 
                                        type="text" 
                                        value={limitPrice}
                                        onChange={(e) => setLimitPrice(e.target.value)}
                                        className="bg-transparent text-lg font-mono font-bold text-white outline-none w-full placeholder:text-zinc-700" 
                                    />
                                    <div className="flex gap-1">
                                        <button onClick={() => adjustLimitPrice(0)} className="text-[8px] bg-zinc-800 px-1.5 py-1 rounded text-zinc-400 hover:text-white">MKT</button>
                                        <button onClick={() => adjustLimitPrice(1)} className="text-[8px] bg-zinc-800 px-1.5 py-1 rounded text-zinc-400 hover:text-white">+1%</button>
                                        <button onClick={() => adjustLimitPrice(5)} className="text-[8px] bg-zinc-800 px-1.5 py-1 rounded text-zinc-400 hover:text-white">+5%</button>
                                    </div>
                                </div>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                {/* Expiry */}
                                <div className="bg-zinc-950/30 border border-white/5 rounded-xl p-3 flex flex-col justify-center gap-1">
                                    <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Expiry</label>
                                    <select 
                                        value={expiry} 
                                        onChange={(e) => setExpiry(e.target.value)}
                                        className="bg-transparent text-sm font-bold text-white outline-none cursor-pointer w-full"
                                    >
                                        <option value="10m">10 Minutes</option>
                                        <option value="1h">1 Hour</option>
                                        <option value="24h">24 Hours</option>
                                        <option value="3d">3 Days</option>
                                        <option value="7d">7 Days</option>
                                        <option value="GTC">Never (GTC)</option>
                                    </select>
                                </div>

                                {/* Post Only - UPDATED */}
                                <div 
                                    onClick={() => setPostOnly(!postOnly)}
                                    className={`bg-zinc-950/30 border ${simulation.postOnlyWarning ? 'border-rose-500/50 bg-rose-500/5' : 'border-white/5'} rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-white/10 transition-colors group`}
                                >
                                    <div className="flex flex-col">
                                        <label className={`text-[9px] font-bold uppercase cursor-pointer tracking-wide transition-colors ${postOnly ? 'text-emerald-400' : 'text-zinc-500'}`}>Post-Only</label>
                                        <span className={`text-[8px] font-bold uppercase tracking-wider ${simulation.postOnlyWarning ? 'text-rose-400' : 'text-zinc-600'}`}>
                                            {simulation.postOnlyWarning ? 'Invalid' : 'Maker'}
                                        </span>
                                    </div>
                                    <div className={`w-8 h-4 rounded-full relative transition-colors ${postOnly ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-300 shadow-sm ${postOnly ? 'left-4.5' : 'left-0.5'}`}></div>
                                    </div>
                                </div>
                             </div>
                             
                             {/* Warning Message for Post Only */}
                             {simulation.postOnlyWarning && (
                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                                    <Ban size={12} className="text-rose-500" />
                                    <span className="text-[9px] font-medium text-rose-300 leading-tight">Order is marketable (below current price). Post-Only will cause immediate rejection.</span>
                                </div>
                             )}
                        </div>
                    </div>

                    {/* CARD C: ORDER ANALYTICS */}
                    <div className="px-5 py-2">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Order Analytics</span>
                        </div>

                        <div className="flex flex-col px-2">
                            {/* Row 1: Distance From Market */}
                            <div className="flex justify-between items-center py-3 border-b border-dashed border-white/10">
                                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Distance to Market</span>
                                <span className={`text-xs font-mono font-bold ${simulation.distanceToMarket < 0 ? 'text-orange-500' : 'text-emerald-500'}`}>
                                    {simulation.distanceToMarket > 0 ? '+' : ''}{simulation.distanceToMarket.toFixed(2)}% {simulation.distanceToMarket < 0 ? '(Below)' : '(Above)'}
                                </span>
                            </div>

                            {/* Row 2: Effective Price (NEW) */}
                            <div className="flex justify-between items-center py-3 border-b border-dashed border-white/10">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Effective Price</span>
                                    <span className="text-[8px] text-zinc-600 font-medium">(After Fees)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-xs font-mono font-bold text-white">${formatMoney(simulation.effectivePrice)}</span>
                                </div>
                            </div>

                            {/* Row 3: Net Receive (NEW) */}
                            <div className="flex justify-between items-center py-3 border-b border-dashed border-white/10">
                                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Net Receive</span>
                                <span className="text-xs font-mono font-bold text-emerald-400">
                                    {payAmount ? formatTokenAmount(simulation.netLimitReceive) : '0.00'} USDC
                                </span>
                            </div>

                            {/* Row 4: Fees */}
                            <div className="flex justify-between items-center py-3">
                                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                                    <Sparkles size={10} /> Total Fees
                                </span>
                                <span className="text-xs font-mono font-bold text-zinc-400">~{formatMoney(simulation.platformFee + simulation.networkFee)}</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA BUTTON */}
                    <button 
                        onClick={() => handleConfirmOrder()}
                        disabled={numericPay <= 0 || isInsufficientBalance || simulation.postOnlyWarning}
                        className={`mt-4 w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl transition-all active:scale-[0.98] ${
                            isInsufficientBalance || numericPay <= 0 || simulation.postOnlyWarning
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5' 
                            : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-500/20'
                        }`}
                    >
                        {simulation.postOnlyWarning ? 'Invalid Order Type' : 'PLACE LIMIT ORDER'}
                    </button>
                </div>
            ) : (
                // REDESIGNED SWAP LAYOUT (MATCHING ALGO)
                <div className="flex-1 flex flex-col gap-4">
                    {/* CARD A: ORDER CONFIGURATION */}
                    {/* WRAPPER FOR LOCK STATE */}
                    <div className={`transition-all duration-300 relative ${isReviewing ? 'opacity-50 pointer-events-none grayscale-[0.5]' : ''}`}>
                        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 space-y-6 shadow-xl backdrop-blur-sm">
                            {/* Pay Section */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex justify-between w-full pr-1">
                                            <span>You Pay</span>
                                            <span className="font-mono text-zinc-500">Bal: {formatToken(ETH_BALANCE)}</span>
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <input 
                                                type="text" 
                                                value={payAmount}
                                                onChange={handleAmountChange}
                                                className="text-4xl lg:text-5xl font-mono font-medium tracking-tighter bg-transparent outline-none placeholder:text-zinc-800 text-white w-full min-w-0" 
                                                placeholder="0.00" 
                                            />
                                            <button 
                                                onClick={() => setIsTokenSelectorOpen(true)}
                                                className="flex items-center gap-2 bg-zinc-950/50 border border-white/10 px-3 py-2 rounded-xl hover:border-white/20 transition-colors shrink-0"
                                            >
                                                <img src={ETH_ICON} className="w-5 h-5 object-contain" alt="ETH" />
                                                <span className="font-bold text-white text-sm">ETH</span>
                                                <ChevronDown size={12} className="text-zinc-600" />
                                            </button>
                                        </div>
                                        {/* Percentage Buttons */}
                                        <div className="flex gap-2 mt-1">
                                            {[25, 50, 75, 100].map(pct => (
                                                <button 
                                                    key={pct}
                                                    onClick={() => handlePercentageClick(pct)}
                                                    className="border border-white/10 text-[10px] font-bold text-zinc-500 px-3 py-1 rounded-md hover:bg-white/5 hover:text-white transition-colors"
                                                >
                                                    {pct === 100 ? 'MAX' : `${pct}%`}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Connector */}
                                <div className="relative h-px bg-white/5 w-full my-2">
                                    <div className="absolute left-1/2 -translate-x-1/2 -top-3 p-1.5 bg-[#0e0e11] border border-white/10 rounded-full text-zinc-500 shadow-sm">
                                        <ArrowDown size={12} />
                                    </div>
                                </div>

                                {/* Receive Section */}
                                <div className="flex justify-between items-end">
                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                                            {recipientMode ? "RECIPIENT GETS" : "Estimated Receive"}
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col w-full min-w-0">
                                                <div className="text-3xl lg:text-4xl font-mono font-medium tracking-tighter text-zinc-300 truncate">
                                                    {payAmount ? formatTokenAmount(simulation.receiveValNum) : '0.00'}
                                                </div>
                                                <div className="text-xs font-mono font-bold text-zinc-600 mt-1">
                                                    ≈ {payAmount ? formatMoney(simulation.receiveValNum) : '$0.00'}
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => setIsTokenSelectorOpen(true)}
                                                className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 px-3 py-2 rounded-xl hover:border-white/10 transition-colors shrink-0 self-start"
                                            >
                                                <img src={USDC_ICON} className="w-5 h-5 object-contain" alt="USDC" />
                                                <span className="font-bold text-white text-sm">USDC</span>
                                                <ChevronDown size={12} className="text-zinc-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Recipient Address (New Feature) */}
                                <div className="pt-4 mt-4 border-t border-white/5">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer group"
                                        onClick={() => setRecipientMode(!recipientMode)}
                                    >
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${recipientMode ? 'bg-emerald-500 border-emerald-500' : 'border-zinc-700 bg-zinc-900'}`}>
                                            {recipientMode && <Check size={10} className="text-black stroke-[4px]" />}
                                        </div>
                                        <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300 uppercase tracking-wide">Send to a different address</span>
                                    </div>

                                    {recipientMode && (
                                        <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                                            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1 block">Recipient Address</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="0x..."
                                                    className="w-full bg-[#050505] border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs font-mono text-white focus:outline-none focus:border-emerald-500/50"
                                                />
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600">
                                                    <User size={12} />
                                                </div>
                                                {/* Address validation check mock */}
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">
                                                    <ShieldCheck size={12} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Lock Overlay */}
                        {isReviewing && (
                            <div className="absolute inset-0 flex items-center justify-center z-10 animate-in fade-in zoom-in-95 duration-300">
                                <div className="bg-black/80 backdrop-blur-sm border border-white/10 p-3 rounded-full shadow-2xl">
                                    <Lock size={20} className="text-zinc-400" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* NEW UNIFIED EXECUTION SIMULATION BLOCK */}
                    <div className="px-2 pt-2">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Execution Simulation</span>
                        </div>

                        <div className="flex flex-col px-2">
                            {/* Row 1: Market Rate */}
                            <div className="flex justify-between items-center py-3 border-b border-dashed border-white/10">
                                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Market Rate</span>
                                <span className="text-xs font-mono font-bold text-white">1 ETH = ${ETH_PRICE.toLocaleString()}</span>
                            </div>

                            {/* Row 2: Network Fee (Updated - Value Only) */}
                            <div className="flex justify-between items-center py-3 border-b border-dashed border-white/10">
                                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                                    <Fuel size={10} /> Network Fee
                                </span>
                                <span className="text-xs font-mono font-bold text-white">~{formatMoney(simulation.networkFee)}</span>
                            </div>

                            {/* Row 3: Gas Speed (Dropdown) */}
                            <div className="relative">
                                <div 
                                    className="flex justify-between items-center py-3 border-b border-dashed border-white/10 cursor-pointer group"
                                    onClick={() => setIsGasSelectorOpen(!isGasSelectorOpen)}
                                >
                                    <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300 transition-colors">Gas Speed</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-mono font-bold text-zinc-300 capitalize">{gasSpeed}</span>
                                        <ChevronDown size={10} className={`text-zinc-600 group-hover:text-zinc-400 transition-transform ${isGasSelectorOpen ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>
                                
                                {/* Dropdown Menu */}
                                {isGasSelectorOpen && (
                                    <div className="absolute right-0 top-full mt-1 w-32 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                                        {['slow', 'normal', 'fast'].map((speed) => (
                                            <button
                                                key={speed}
                                                onClick={() => {
                                                    setGasSpeed(speed as any);
                                                    setIsGasSelectorOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider hover:bg-white/5 flex items-center justify-between ${gasSpeed === speed ? 'text-emerald-500' : 'text-zinc-400'}`}
                                            >
                                                {speed}
                                                {gasSpeed === speed && <Check size={10} />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Row 4: Platform Fee */}
                            <div className="flex justify-between items-center py-3 border-b border-dashed border-white/10">
                                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                                    <Sparkles size={10} /> Platform Fee (0.05%)
                                </span>
                                <span className="text-xs font-mono font-bold text-white">~{formatMoney(simulation.platformFee)}</span>
                            </div>

                            {/* Row 5: Price Impact */}
                            <div className="flex justify-between items-center py-3 border-b border-dashed border-white/10">
                                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Price Impact</span>
                                <span className={`text-xs font-mono font-bold ${hasAmount ? 'text-red-400' : 'text-zinc-600'}`}>
                                    {hasAmount ? `-${simulation.swapImpactPct.toFixed(2)}%` : '—'}
                                </span>
                            </div>

                            {/* Row 6: Max Slippage (Refactored to match request) */}
                            <div className="flex justify-between items-center py-3 border-b border-dashed border-white/10 cursor-pointer group" onClick={openSettingsModal}>
                                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300 transition-colors">Max Slippage</span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-mono font-bold text-zinc-300 cursor-pointer underline decoration-dashed decoration-zinc-600 hover:text-white transition-colors">{slippage}% (Auto)</span>
                                </div>
                            </div>

                            {/* Row 7: Min Received */}
                            <div className="flex justify-between items-center pt-3">
                                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Min. Received</span>
                                <span className="text-xs font-mono font-bold text-emerald-400">
                                    {payAmount ? formatTokenAmount(simulation.minReceived) : '0.00'} USDC
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CTA BUTTON - UPDATED FOR INLINE CONFIRMATION */}
                    <div className="relative group mt-1">
                        {!isReviewing ? (
                            <button 
                                onClick={() => setIsReviewing(true)}
                                disabled={numericPay <= 0 || isInsufficientBalance}
                                className={`w-full h-14 rounded-xl font-black text-[11px] uppercase tracking-[0.1em] transition-all shadow-xl active:scale-[0.98] ${
                                    isInsufficientBalance || numericPay <= 0 
                                        ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed border border-white/5' 
                                        : isHighImpact
                                            ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-amber-500/20'
                                            : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-500/10' 
                                }`}
                            >
                                {isInsufficientBalance 
                                    ? 'Insufficient Balance' 
                                    : numericPay <= 0 
                                            ? 'Enter Amount' 
                                            : isHighImpact 
                                                ? 'SWAP WITH HIGH SLIPPAGE'
                                                : 'SWAP'
                                }
                            </button>
                        ) : (
                            <div className="flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-200">
                                <button 
                                    onClick={handleConfirmOrder}
                                    className="w-full h-14 rounded-xl font-black text-[11px] uppercase tracking-[0.1em] bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] animate-pulse"
                                >
                                    CONFIRM SWAP ({reviewTimer}s)
                                </button>
                                <button 
                                    onClick={() => setIsReviewing(false)}
                                    className="w-full py-2 text-[10px] font-bold text-zinc-500 hover:text-zinc-300 uppercase tracking-widest transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                        
                        {/* Tooltip for High Impact */}
                        {isHighImpact && !isReviewing && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] bg-black border border-amber-500/50 text-amber-500 text-[10px] font-bold p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center shadow-2xl z-50">
                                Warning: You will lose an estimated <span className="text-white border-b border-amber-500/50">{simulation.swapImpactPct.toFixed(2)}%</span> due to price impact.
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-amber-500/50"></div>
                            </div>
                        )}
                    </div>
                </div>
            )}

          </div>
          )}

          {/* FOOTER: COSTS & CTA */}
          <div className="mt-auto">
             {/* MAIN CTA BUTTON is now integrated inside each specific view block */}
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------------------
          RIGHT PANEL: ANALYSIS & SAFETY
      --------------------------------------------------------------------------- */}
      <section className="lg:col-span-6 bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          
          <div className="flex justify-between items-start mb-8 shrink-0">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gray-500" />
                {tradeMode === 'algo' ? 'Execution Simulation' : tradeMode === 'limit' ? 'Limit Intelligence' : 'Execution Analysis'}
              </h2>
            </div>
          </div>

          {/* LIMIT TAB CONTENT (AREA CHART) */}
          {tradeMode === 'limit' ? (
             <div className="flex-1 flex flex-col space-y-6">
                
                {/* 1. INTELLIGENCE GRID */}
                <div className="bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6">
                   <EducationalTooltip 
                      title="Fill Probability" 
                      desc={simulation.tooltips.probability}
                   >
                        <div className="flex flex-col h-full justify-center">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">Probability</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-mono font-bold text-white tabular-nums">{simulation.execProbability}%</span>
                            </div>
                            <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                                <div className={`h-full ${simulation.probColor.replace('text-', 'bg-')}`} style={{ width: `${simulation.execProbability}%` }}></div>
                            </div>
                        </div>
                   </EducationalTooltip>

                   <div className="flex flex-col border-l border-white/5 pl-6 h-full justify-center">
                      <EducationalTooltip title="Fill ETA" desc={simulation.tooltips.eta}>
                          <div className="h-full flex flex-col justify-center">
                              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">Fill ETA</span>
                              <span className="text-2xl font-mono font-bold text-white mt-1">{simulation.timeHorizon}</span>
                              <span className="text-[9px] text-zinc-500 mt-1 font-bold">Range: <span className="text-zinc-400">{simulation.timeRange}</span></span>
                          </div>
                      </EducationalTooltip>
                   </div>

                   <EducationalTooltip 
                      title="Opportunity Cost (Drag)" 
                      desc={simulation.tooltips.cost}
                   >
                        <div className="flex flex-col border-l border-white/5 pl-6 h-full justify-center">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">Opportunity Cost</span>
                            <span className={`text-2xl font-mono font-bold mt-1 tabular-nums ${simulation.dailyYieldLoss > 0.1 ? 'text-orange-500' : 'text-zinc-400'}`}>-{formatMoney(simulation.dailyYieldLoss)}</span>
                            <span className="text-[9px] text-zinc-500 mt-1">Daily yield loss (4.2% APY)</span>
                        </div>
                   </EducationalTooltip>
                </div>

                {/* 2. AREA CHART FOR DEPTH (STEPPED WALLS) */}
                <div className="min-h-[200px] bg-black/20 border border-white/5 rounded-2xl p-6 relative flex flex-col">
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Projected Order Book</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`text-sm font-black uppercase ${simulation.structureColor}`}>{simulation.structureLabel}</span>
                            </div>
                        </div>
                        <div className="p-1.5 rounded-lg bg-zinc-800/50 border border-white/5 text-gray-500"></div>
                    </div>
                    
                    <div className="flex-1 w-full relative z-10 -ml-2 min-h-[140px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={depthData}>
                                <defs>
                                    <linearGradient id="bidGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.4}/>
                                        <stop offset="100%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="askGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4}/>
                                        <stop offset="100%" stopColor="#ef4444" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis 
                                    dataKey="price" 
                                    type="number"
                                    domain={['auto', 'auto']}
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#52525b', fontSize: 9, fontWeight: 700 }}
                                    tickFormatter={(val) => val.toFixed(0)}
                                />
                                <YAxis hide />
                                <Tooltip cursor={{ stroke: '#ffffff', strokeWidth: 1, strokeDasharray: '4 4' }} contentStyle={{ backgroundColor: '#09090b', borderColor: '#333' }} />
                                
                                {/* Stepped Line for Realistic Order Book Look */}
                                <Area type="stepAfter" dataKey="bidVol" stroke="#10b981" fill="url(#bidGrad)" strokeWidth={2} />
                                <Area type="stepAfter" dataKey="askVol" stroke="#ef4444" fill="url(#askGrad)" strokeWidth={2} />
                                
                                {/* Current Price Line */}
                                <ReferenceLine x={ETH_PRICE} stroke="#71717a" strokeDasharray="3 3" label={{ position: 'top', value: 'MARKET', fill: '#71717a', fontSize: 9 }} />
                                
                                {/* User Limit Price Line */}
                                <ReferenceLine x={parseFloat(limitPrice)} stroke="#3b82f6" strokeWidth={2} label={{ position: 'top', value: 'YOUR ORDER', fill: '#3b82f6', fontSize: 9, fontWeight: 'bold' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. ACTIVE ORDERS TABLE (NEW) */}
                <div className="bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Active Orders</h3>
                        <div className="flex gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[9px] font-bold text-emerald-500">2 LIVE</span>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-left border-b border-white/5">
                                    <th className="pb-3 pl-2">Time</th>
                                    <th className="pb-3">Pair</th>
                                    <th className="pb-3">Side</th>
                                    <th className="pb-3 text-right">Size</th>
                                    <th className="pb-3 text-right w-[20%]">Filled</th>
                                    <th className="pb-3 text-right">Price</th>
                                    <th className="pb-3 text-right pr-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {ACTIVE_LIMIT_ORDERS.map(order => (
                                    <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="py-3 pl-2 text-xs font-mono font-bold text-zinc-500">{order.time}</td>
                                        <td className="py-3 text-xs font-bold text-white">{order.pair}</td>
                                        <td className={`py-3 text-[10px] font-black uppercase ${order.side === 'Buy' ? 'text-emerald-500' : 'text-rose-500'}`}>{order.side}</td>
                                        <td className="py-3 text-right text-xs font-mono font-bold text-zinc-300">{order.size}</td>
                                        <td className="py-3 text-right">
                                            <div className="flex flex-col gap-1 items-end pr-4">
                                                <div className="flex justify-between text-[9px] font-mono text-zinc-400 font-bold">
                                                    <span>{order.filledPct}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                    <div className={`h-full ${order.side === 'Buy' ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${order.filledPct}%` }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 text-right text-xs font-mono font-bold text-white">${formatMoney(order.price)}</td>
                                        <td className="py-3 text-right pr-2">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    disabled={order.filledPct > 0}
                                                    className={`p-1.5 rounded-lg transition-colors border border-transparent ${order.filledPct > 0 ? 'opacity-30 cursor-not-allowed text-zinc-600' : 'hover:bg-zinc-800 text-zinc-500 hover:text-white hover:border-white/5'}`}
                                                >
                                                    <Edit2 size={12} />
                                                </button>
                                                <button className="p-1.5 rounded-lg hover:bg-rose-500/10 text-zinc-500 hover:text-rose-500 transition-colors border border-transparent hover:border-rose-500/20">
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
             </div>
          ) : tradeMode === 'algo' ? (
             <div className="flex-1 flex flex-col space-y-6">
                {/* ALGO COMPARISON - UNIFIED GRID (Matching Limit Style) */}
                <div className="bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* COL 1: MARKET DUMP */}
                    <EducationalTooltip 
                        title="Impact Penalty" 
                        desc={simulation.tooltips.algoDump}
                    >
                        <div className="flex flex-col h-full justify-center">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Est. Market Dump</span>
                            <span className={`text-3xl font-mono font-bold mb-1 tabular-nums ${hasAmount ? 'text-red-500' : 'text-zinc-500'}`}>
                                {hasAmount ? `-${formatMoney(simulation.swapImpactCost)}` : '$0.00'}
                            </span>
                            <span className={`text-[10px] font-bold uppercase tabular-nums ${hasAmount ? 'text-red-400/60' : 'text-zinc-600'}`}>
                                {hasAmount ? `${simulation.swapImpactPct.toFixed(2)}% Slippage` : '0.00% Slippage'}
                            </span>
                        </div>
                    </EducationalTooltip>

                    {/* COL 2: ALPHA (CENTER) */}
                    <div className="flex flex-col border-l border-white/5 pl-6 h-full justify-center relative">
                        <EducationalTooltip 
                            title="Alpha Generation" 
                            desc={simulation.tooltips.algoAlpha}
                        >
                            <div className="h-full flex flex-col justify-center">
                                <span className={`text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-1.5 ${hasAmount ? 'text-emerald-400' : 'text-zinc-500'}`}>
                                    <Sparkles size={10} className={hasAmount ? "animate-pulse" : ""} /> Alpha Generated
                                </span>
                                <span className={`text-4xl font-mono font-bold mb-1 tabular-nums ${hasAmount ? 'text-white text-shadow-glow' : 'text-zinc-500'}`}>
                                    {hasAmount ? `+${formatMoney(simulation.netSavings)}` : '$0.00'}
                                </span>
                                <span className={`text-[10px] font-bold uppercase tabular-nums tracking-wider ${hasAmount ? 'text-emerald-500/60' : 'text-zinc-600'}`}>
                                    Capital Preserved
                                </span>
                            </div>
                        </EducationalTooltip>
                    </div>

                    {/* COL 3: STRATEGY COST */}
                    <div className="flex flex-col border-l border-white/5 pl-6 h-full justify-center">
                        <EducationalTooltip 
                            title="Operational Overhead" 
                            desc={simulation.tooltips.algoCost}
                        >
                            <div className="h-full flex flex-col justify-center">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Strategy Cost</span>
                                <span className={`text-3xl font-mono font-bold mb-1 tabular-nums ${hasAmount ? 'text-zinc-300' : 'text-zinc-500'}`}>
                                    {hasAmount ? `-${formatMoney(simulation.totalAlgoCost)}` : '$0.00'}
                                </span>
                                <span className="text-[10px] font-bold text-zinc-600 uppercase tabular-nums">Gas + Fees</span>
                            </div>
                        </EducationalTooltip>
                    </div>
                </div>

                {/* SCHEDULE CHART */}
                <div className="flex-1 min-h-[200px] bg-black/20 border border-white/5 rounded-2xl p-6 flex flex-col">
                   <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Execution Schedule</span>
                      <div className="flex items-center gap-3">
                         <span className="text-[9px] font-mono text-zinc-600">Interval: ~{simulation.avgIntervalMins}m</span>
                      </div>
                   </div>
                   <div className="flex-1 w-full min-h-[150px]">
                      <ResponsiveContainer width="100%" height="100%">
                         <ComposedChart data={simulation.scheduleData}>
                            <XAxis 
                               dataKey="time" 
                               axisLine={false} 
                               tickLine={false} 
                               tick={{ fill: '#52525b', fontSize: 10, fontWeight: 700 }} 
                               interval={Math.ceil(simulation.scheduleData.length / 6)} // Dynamic Interval
                            />
                            <YAxis yAxisId="left" hide />
                            <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#09090b', borderColor: '#333' }} />
                            
                            {/* Bars for Volume */}
                            <Bar yAxisId="left" dataKey="volume" radius={[4, 4, 0, 0]}>
                               {simulation.scheduleData.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.status === 'executed' ? '#3f3f46' : entry.status === 'active' ? '#a855f7' : 'transparent'}
                                    stroke={entry.status === 'pending' ? '#a855f7' : 'none'}
                                    strokeWidth={1}
                                    strokeDasharray={entry.status === 'pending' ? '4 4' : '0'}
                                  />
                               ))}
                            </Bar>
                         </ComposedChart>
                      </ResponsiveContainer>
                   </div>
                </div>
             </div>
          ) : (
             // --- SWAP ANALYSIS (RIGHT PANEL) ---
             <div className="flex flex-col h-full gap-6">
                {/* Top Block: Routing Efficiency */}
                <div className="shrink-0">
                    <div className="flex items-end gap-4 mb-2">
                    <span className={`text-6xl font-mono font-bold tracking-tighter tabular-nums ${hasAmount ? simulation.scoreColor : 'text-zinc-700'}`}>
                        {hasAmount ? simulation.routingScore : '—.—'}
                    </span>
                    <div className="flex flex-col mb-2">
                        <span className={`font-bold uppercase text-xs tracking-wider ${hasAmount ? simulation.scoreLabel : 'Waiting'}`}>
                            {hasAmount ? simulation.scoreLabel : 'Waiting'}
                        </span>
                        <span className="text-gray-500 text-[10px] uppercase">0-10 Scale</span>
                    </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden relative">
                        <div 
                            className={`absolute top-0 left-0 h-full rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-500 ${hasAmount ? simulation.progressBarColor : 'bg-transparent'}`}
                            style={{ width: hasAmount ? `${parseFloat(simulation.routingScore) * 10}%` : '0%' }}
                        />
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                    <Zap className="w-3.5 h-3.5 text-gray-500" />
                    <span>Route optimization vs. direct pool: <span className={`${hasAmount ? 'text-white' : 'text-zinc-600'} font-medium`}>{hasAmount ? '0.05% better' : '—'}</span></span>
                    </div>
                    
                    {/* Warning Message */}
                    {hasAmount && simulation.scoreWarning && (
                        <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                            <AlertTriangle size={14} className="text-rose-500" />
                            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wide">{simulation.scoreWarning}</span>
                        </div>
                    )}
                </div>

                {/* Smart Route Execution (CARD) */}
                <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col relative overflow-hidden shrink-0 w-full">
                    <div className="flex items-center justify-between mb-4 relative z-20">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                        <GitMerge className="w-3 h-3" /> Smart Route
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border border-white/5 ${hasAmount ? 'bg-zinc-800 text-gray-400' : 'bg-zinc-800/50 text-zinc-600'}`}>
                            {hasAmount ? 'OPTIMIZED' : 'PENDING'}
                        </span>
                    </div>
                    
                    {/* Column Headers */}
                    <div className="grid grid-cols-4 gap-2 mb-2 px-1 text-[9px] font-black text-zinc-600 uppercase tracking-widest relative z-20">
                        <div className="col-span-1">Pool</div>
                        <div className="text-right">Split</div>
                        <div className="text-right">Rate</div>
                        <div className="text-right">Impact</div>
                    </div>

                    {/* Overlay for Zero State */}
                    {!hasAmount && (
                        <div className="absolute inset-0 top-10 z-10 flex items-center justify-center bg-zinc-900/10 backdrop-blur-[1px]">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-900/90 px-3 py-1.5 rounded-full border border-white/10 shadow-xl">
                                Enter amount to calculate route
                            </span>
                        </div>
                    )}

                    <div className={`flex flex-col gap-3 mt-1 transition-opacity duration-300 ${!hasAmount ? 'opacity-20 pointer-events-none grayscale' : ''}`}>
                        {simulation.routeSplit.map((route) => (
                            <div key={route.dex} className="space-y-1 group">
                                <div className="grid grid-cols-4 gap-2 px-1 text-[10px] items-center">
                                    <div className="font-bold text-white truncate">{route.dex}</div>
                                    <div className="text-right font-mono text-zinc-400">{route.pct}%</div>
                                    <div className="text-right font-mono text-zinc-300 tabular-nums">${route.rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                    <div className="text-right font-mono text-zinc-500 tabular-nums group-hover:text-rose-500 transition-colors">{route.impact.toFixed(3)}%</div>
                                </div>
                                <div className="h-1 w-full bg-zinc-800/50 rounded-full overflow-hidden">
                                    <div className={`h-full ${route.color === 'bg-white' ? 'bg-white' : route.color === 'bg-zinc-600' ? 'bg-zinc-500' : 'bg-zinc-700'} rounded-full`} style={{ width: `${route.pct}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* MEV Footer */}
                    {hasAmount && (
                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between relative z-20 animate-in fade-in slide-in-from-bottom-1">
                            <div className="flex items-center gap-1.5 text-[9px] text-emerald-500 font-bold uppercase tracking-wider">
                                <ShieldCheck size={10} />
                                <span>MEV Protected</span>
                            </div>
                            <div className="text-[9px] text-zinc-600 font-mono">
                                Latency: 2ms
                            </div>
                        </div>
                    )}
                </div>

                {/* Empty Spacer */}
                <div className="flex-1"></div>

             </div>
          )}

      </section>
    </div>
  );
};

export default ExecutionView;