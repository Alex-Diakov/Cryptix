import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  ChevronDown,
  Maximize2,
  Settings2,
  Lock,
  Unlock,
  Crosshair,
  PenTool,
  Hash,
  Globe,
  Skull,
  Minus,
  Plus,
  Wallet,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Check,
  Percent,
  DollarSign,
  ShieldCheck,
  Info,
  Flame,
  Clock,
  Zap,
  Coins,
  Calculator,
  ArrowRight,
  Flag,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";

// --- TYPES ---
interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

// --- SYNTHETIC CHART GENERATOR (BTC Logic) ---
const generateSyntheticCandles = (
  count: number,
  startPrice: number,
): Candle[] => {
  const candles: Candle[] = [];
  let currentPrice = startPrice;
  const now = Date.now();
  const timeStep = 15 * 60 * 1000; // 15 min

  for (let i = count; i > 0; i--) {
    const volatility = currentPrice * 0.002; // 0.2% volatility per candle
    const trend = (Math.random() - 0.5) * volatility * 0.5; // Slight drift

    const open = currentPrice;
    const close = open + (Math.random() - 0.5) * volatility + trend;

    // Wicks
    const high = Math.max(open, close) + Math.random() * volatility * 0.8;
    const low = Math.min(open, close) - Math.random() * volatility * 0.8;

    candles.push({
      time: now - i * timeStep,
      open,
      high,
      low,
      close,
    });

    currentPrice = close;
  }
  return candles;
};

// --- SANITY CHECK MODAL ---
interface SanityCheckProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  leverage: number;
  side: "long" | "short";
  liqPrice: number;
  distance: string;
}

const SanityCheckModal: React.FC<SanityCheckProps> = ({
  isOpen,
  onClose,
  onConfirm,
  leverage,
  side,
  liqPrice,
  distance,
}) => {
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isOpen) {
      setTimer(3);
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-background-card border border-rose-500/30 rounded-3xl w-full max-w-sm shadow-[0_0_50px_-10px_rgba(244,63,94,0.3)] overflow-hidden transform animate-in zoom-in-95 duration-200">
        <div className="bg-rose-500/10 p-5 border-b border-rose-500/20 flex items-center gap-4">
          <div className="p-2.5 bg-rose-500/20 rounded-full text-rose-500 animate-pulse">
            <Skull size={20} />
          </div>
          <div>
            <h2 className="text-base font-black text-white uppercase tracking-wide">
              High Leverage Alert
            </h2>
            <p className="text-rose-400 text-[10px] font-bold uppercase tracking-widest">
              {leverage}x Leverage
            </p>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <p className="text-xs text-content-secondary font-medium leading-relaxed">
            You are opening a{" "}
            <span
              className={
                side === "long"
                  ? "text-emerald-500 font-bold"
                  : "text-rose-500 font-bold"
              }
            >
              {side.toUpperCase()}
            </span>{" "}
            position. Price movement of{" "}
            <span className="text-white font-bold bg-rose-500/20 px-1 rounded">
              {distance}%
            </span>{" "}
            against you triggers immediate liquidation.
          </p>
          <div className="bg-black/40 border border-subtle rounded-xl p-3 flex justify-between items-center">
            <span className="text-[10px] font-bold text-content-tertiary uppercase">
              Liq. Price
            </span>
            <span className="text-sm font-mono font-bold text-rose-500">
              ${liqPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest bg-background-surface hover:bg-zinc-700 text-content-secondary hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={timer > 0}
              className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${timer > 0 ? "bg-background-card border border-subtle text-content-tertiary cursor-not-allowed" : "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/50"}`}
            >
              {timer > 0 ? `Wait ${timer}s` : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

const ProTradingView: React.FC = () => {
  // --- STATE ---
  const [side, setSide] = useState<"long" | "short">("long");
  const [orderType, setOrderType] = useState<"limit" | "market">("market");

  // Market Data (Synthetic)
  const [currentPrice, setCurrentPrice] = useState(82678.88); // BTC-ish Price
  const [candles, setCandles] = useState<Candle[]>([]);

  // Ticker Management (New State)
  const [pinnedTickers, setPinnedTickers] = useState<string[]>([
    "SOL",
    "ETH",
    "WBTC",
  ]);
  const [activeTicker, setActiveTicker] = useState("WBTC");
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false);

  // Inputs
  const [priceInput, setPriceInput] = useState("");
  const [collateralInput, setCollateralInput] = useState("");
  const [leverage, setLeverage] = useState(20);
  const [isDegenMode, setIsDegenMode] = useState(false);

  // Risk Management
  const [tpslEnabled, setTpslEnabled] = useState(false);

  // --- TP/SL COMPLEX STATE ---
  const [tpPercentInput, setTpPercentInput] = useState("50");
  const [tpPriceInput, setTpPriceInput] = useState("");
  const [slPercentInput, setSlPercentInput] = useState("20");
  const [slPriceInput, setSlPriceInput] = useState("");

  // --- TRANSPARENCY STATE (Simulated) ---
  const [fundingTimer, setFundingTimer] = useState("00:59:59");

  // UI
  const [showSanityCheck, setShowSanityCheck] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // WALLET
  const WALLET_BALANCE = 2000000.0;

  // Initialize Chart
  useEffect(() => {
    const data = generateSyntheticCandles(60, 82678.88);
    setCandles(data);
    setCurrentPrice(data[data.length - 1].close);
  }, []);

  // Live Price Ticker Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice((prev) => prev + (Math.random() - 0.5) * 15);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Funding Timer Logic
  useEffect(() => {
    let seconds = 3600; // 1 hour start
    const interval = setInterval(() => {
      seconds--;
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      setFundingTimer(
        `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`,
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- PRECISE MATH ENGINE ---
  const collateral = parseFloat(collateralInput) || 0;
  const positionSize = collateral * leverage; // Notional Value

  // 1. THE INVISIBLE FEE (Spread)
  const spreadPct = 0.05; // 0.05% Spread
  const spreadImpact = (currentPrice * spreadPct) / 100;
  // If Long, we buy at Ask (Market + Spread). If Short, we sell at Bid (Market - Spread).
  const executionPrice =
    side === "long" ? currentPrice + spreadImpact : currentPrice - spreadImpact;

  const entryPrice =
    orderType === "market"
      ? executionPrice
      : parseFloat(priceInput) || executionPrice;

  // Max Leverage Logic
  const maxLeverage = isDegenMode ? 1000 : 100;

  // Liquidation
  const liqPrice = useMemo(() => {
    if (side === "long") return entryPrice * (1 - 1 / leverage);
    else return entryPrice * (1 + 1 / leverage);
  }, [entryPrice, leverage, side]);

  // Initial Sync for TP/SL
  useEffect(() => {
    if (tpslEnabled && tpPriceInput === "" && slPriceInput === "") {
      const tpPct = parseFloat(tpPercentInput) || 0;
      const slPct = parseFloat(slPercentInput) || 0;

      let initialTp, initialSl;
      if (side === "long") {
        initialTp = entryPrice * (1 + tpPct / 100 / leverage);
        initialSl = entryPrice * (1 - slPct / 100 / leverage);
      } else {
        initialTp = entryPrice * (1 - tpPct / 100 / leverage);
        initialSl = entryPrice * (1 + slPct / 100 / leverage);
      }
      setTpPriceInput(initialTp.toFixed(2));
      setSlPriceInput(initialSl.toFixed(2));
    }
  }, [tpslEnabled, entryPrice, leverage, side]);

  // --- BIDIRECTIONAL HANDLERS (TP/SL) ---
  const handleTpPriceChange = (val: string) => {
    setTpPriceInput(val);
    const p = parseFloat(val);
    if (!isNaN(p)) {
      let newPct = 0;
      if (side === "long") newPct = (p / entryPrice - 1) * leverage * 100;
      else newPct = (1 - p / entryPrice) * leverage * 100;
      setTpPercentInput(newPct.toFixed(2));
    }
  };

  const handleTpPercentChange = (val: string) => {
    setTpPercentInput(val);
    const pct = parseFloat(val);
    if (!isNaN(pct)) {
      let newPrice = 0;
      if (side === "long") newPrice = entryPrice * (1 + pct / 100 / leverage);
      else newPrice = entryPrice * (1 - pct / 100 / leverage);
      setTpPriceInput(newPrice.toFixed(2));
    }
  };

  const handleSlPriceChange = (val: string) => {
    setSlPriceInput(val);
    const p = parseFloat(val);
    if (!isNaN(p)) {
      let newPct = 0;
      if (side === "long") newPct = (1 - p / entryPrice) * leverage * 100;
      else newPct = (p / entryPrice - 1) * leverage * 100;
      setSlPercentInput(newPct.toFixed(2));
    }
  };

  const handleSlPercentChange = (val: string) => {
    setSlPercentInput(val);
    const pct = parseFloat(val);
    if (!isNaN(pct)) {
      let newPrice = 0;
      if (side === "long") newPrice = entryPrice * (1 - pct / 100 / leverage);
      else newPrice = entryPrice * (1 + pct / 100 / leverage);
      setSlPriceInput(newPrice.toFixed(2));
    }
  };

  // --- PERCENTAGE HANDLERS FOR COLLATERAL ---
  const handleCollateralPercentageClick = (pct: number) => {
    const val = (WALLET_BALANCE * pct) / 100;
    setCollateralInput(val.toFixed(2));
  };

  const isCollateralPercentageActive = (pct: number) => {
    if (WALLET_BALANCE <= 0) return false;
    const targetVal = (WALLET_BALANCE * pct) / 100;
    return collateralInput === targetVal.toFixed(2);
  };

  const tpPriceNum =
    parseFloat(tpPriceInput) ||
    (side === "long" ? entryPrice * 1.1 : entryPrice * 0.9);
  const slPriceNum =
    parseFloat(slPriceInput) ||
    (side === "long" ? entryPrice * 0.9 : entryPrice * 1.1);

  // --- PAYOUT SIMULATION (Requested Feature) ---
  const outcomeSimulation = useMemo(() => {
    // Basic validation
    if (!collateral || collateral <= 0) return null;

    // Determine Exit Price (If TP not set, project a default 10% gain for visualization)
    let exitPrice = tpPriceNum;
    let isProjected = false;

    if (!tpslEnabled || !tpPriceInput) {
      exitPrice = side === "long" ? entryPrice * 1.1 : entryPrice * 0.9;
      isProjected = true;
    }

    // 2. Fees Calculation (Taker Open + Taker Close)
    // Fee Rate: 0.06% Taker
    const openFee = positionSize * 0.0006;
    const closeFee = positionSize * (exitPrice / entryPrice) * 0.0006; // Approx close size
    const totalFees = openFee + closeFee;

    // 3. Gross PnL Calculation
    let grossPnl = 0;
    if (side === "long") {
      // (Exit - Entry) * (Position / Entry)
      grossPnl = positionSize * ((exitPrice - entryPrice) / entryPrice);
    } else {
      // (Entry - Exit) * (Position / Entry)
      grossPnl = positionSize * ((entryPrice - exitPrice) / entryPrice);
    }

    // 4. Net & Payout
    const netPnl = grossPnl - totalFees;
    const totalPayout = collateral + netPnl;
    const roi = (netPnl / collateral) * 100;

    return {
      grossPnl,
      totalFees,
      netPnl,
      totalPayout,
      roi,
      isProjected,
    };
  }, [
    collateral,
    leverage,
    entryPrice,
    side,
    tpslEnabled,
    tpPriceInput,
    tpPriceNum,
    positionSize,
  ]);

  // --- TRANSPARENCY CALCULATIONS ---
  const distanceToLiq = Math.abs(
    ((entryPrice - liqPrice) / entryPrice) * 100,
  ).toFixed(2);

  // 2. THE SILENT KILLER (Funding)
  const fundingRatePerHour = 0.004; // 0.004% per hour (Mock)
  const hourlyFundingCost = positionSize * (fundingRatePerHour / 100);
  const isHighFunding = hourlyFundingCost > 10; // Warning threshold ($10/hr)

  // 3. EXECUTION FEE (Gas)
  const networkGas = 1.42; // Fixed cost for Monad/L2

  // 4. LIQUIDATOR'S CUT
  const liqPenalty = positionSize * 0.01; // 1% Penalty

  // 5. REVENUE SHARE (Removed as per request)
  // const protocolFee = positionSize * 0.0006; // 0.06% Taker
  // const userRebate = protocolFee * 0.30; // 30% goes back to user

  // --- CHART SCALING ---
  const chartMin = useMemo(() => {
    let min = Math.min(...candles.map((c) => c.low));
    if (tpslEnabled) {
      min = Math.min(min, tpPriceNum, slPriceNum);
    }
    min = Math.min(min, liqPrice);
    return min * 0.995;
  }, [candles, tpslEnabled, tpPriceNum, slPriceNum, liqPrice]);

  const chartMax = useMemo(() => {
    let max = Math.max(...candles.map((c) => c.high));
    if (tpslEnabled) {
      max = Math.max(max, tpPriceNum, slPriceNum);
    }
    max = Math.max(max, liqPrice);
    return max * 1.005;
  }, [candles, tpslEnabled, tpPriceNum, slPriceNum, liqPrice]);

  const getY = (price: number) => {
    return ((price - chartMin) / (chartMax - chartMin)) * 100;
  };

  const handleExecute = () => {
    if (leverage > 20) setShowSanityCheck(true);
    else console.log("Execute");
  };

  const toggleLock = () => {
    if (isDegenMode) {
      setIsDegenMode(false);
      if (leverage > 100) setLeverage(100);
    } else {
      setIsDegenMode(true);
    }
  };

  // Helper for tickers
  const handleRemoveTicker = (ticker: string) => {
    setPinnedTickers((prev) => prev.filter((t) => t !== ticker));
    if (activeTicker === ticker && pinnedTickers.length > 1) {
      setActiveTicker(pinnedTickers.find((t) => t !== ticker) || "");
    }
  };

  const getTickerLogo = (sym: string) => {
    switch (sym) {
      case "SOL":
        return "https://cryptologos.cc/logos/solana-sol-logo.png?v=035";
      case "ETH":
        return "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035";
      case "WBTC":
        return "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png?v=035";
      case "PEPE":
        return "https://cryptologos.cc/logos/pepe-pepe-logo.png?v=035";
      case "USDC":
        return "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035";
      default:
        return "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=035";
    }
  };

  const themeBg = side === "long" ? "bg-emerald-500" : "bg-rose-500";
  const themeText = side === "long" ? "text-emerald-500" : "text-rose-500";

  return (
    <div className="flex flex-col h-full space-y-3 animate-in fade-in duration-500 text-[12px] bg-background-subtle relative overflow-hidden">
      <SanityCheckModal
        isOpen={showSanityCheck}
        onClose={() => setShowSanityCheck(false)}
        onConfirm={() => setShowSanityCheck(false)}
        leverage={leverage}
        side={side}
        liqPrice={liqPrice}
        distance={distanceToLiq}
      />

      {/* HEADER BAR - REDESIGNED WITH LEVEL 2 GROUPING */}
      <header className="flex flex-col lg:flex-row items-center justify-between px-4 py-3 bg-background-surface border-b border-subtle shrink-0 gap-4">
        {/* Left: Ticker Watchlist (Grouped Navigation) */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full lg:w-auto bg-zinc-900/20 p-1.5 rounded-2xl border border-subtle shrink-0">
          {pinnedTickers.map((ticker) => (
            <div
              key={ticker}
              onClick={() => setActiveTicker(ticker)}
              className={`group flex items-center gap-2 cursor-pointer transition-all rounded-xl px-3 py-1.5 ${
                activeTicker === ticker
                  ? "bg-background-surface border border-strong shadow-sm"
                  : "hover:bg-zinc-800/50 opacity-60 hover:opacity-100 border border-transparent"
              }`}
            >
              <img
                src={getTickerLogo(ticker)}
                className="w-5 h-5 rounded-full"
                alt={ticker}
              />
              <span
                className={`font-bold text-xs tracking-wide ${activeTicker === ticker ? "text-white" : "text-content-secondary"}`}
              >
                {ticker}
              </span>

              {/* Remove Action */}
              {!(activeTicker === ticker && pinnedTickers.length === 1) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTicker(ticker);
                  }}
                  className={`ml-1 text-content-tertiary hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all ${activeTicker === ticker ? "block" : "hidden group-hover:block"}`}
                >
                  <X size={10} strokeWidth={3} />
                </button>
              )}
            </div>
          ))}

          {/* Add Ticker Button */}
          <button
            onClick={() => setIsTokenSelectorOpen(true)}
            className="w-8 h-8 rounded-xl bg-zinc-900/50 border border-subtle flex items-center justify-center text-content-tertiary hover:text-white hover:bg-background-surface transition-colors shrink-0"
            title="Add Coin"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Right: Market Stats Grid (Level 2 Grouping) */}
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide w-full lg:w-auto lg:justify-end">
          {/* Primary Group: Price Action */}
          <div className="flex items-center gap-5 bg-zinc-900/30 border border-subtle rounded-2xl px-5 py-2 shrink-0">
            <div className="flex flex-col items-start">
              <span className="text-content-tertiary font-bold text-[9px] uppercase tracking-widest mb-0.5">
                Mark Price
              </span>
              <span className="text-[#ff523d] font-mono font-black text-base tracking-tight">
                $
                {currentPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="w-px h-6 bg-white/5"></div>
            <div className="flex flex-col items-start">
              <span className="text-content-tertiary font-bold text-[9px] uppercase tracking-widest mb-0.5">
                24h Change
              </span>
              <span className="text-[#ff523d] font-mono font-bold text-xs tracking-tight">
                -2.69%
              </span>
            </div>
          </div>

          {/* Secondary Group: Volume & Liquidity */}
          <div className="flex items-center gap-6 bg-zinc-900/20 border border-subtle rounded-2xl px-5 py-2 shrink-0">
            <div className="flex flex-col items-start">
              <span className="text-content-tertiary font-bold text-[9px] uppercase tracking-widest mb-0.5">
                24h Vol
              </span>
              <span className="text-content-secondary font-mono font-bold text-xs tracking-tight">
                $127.90M
              </span>
            </div>
            <div className="w-px h-6 bg-white/5"></div>
            <div className="flex flex-col items-start">
              <span className="text-content-tertiary font-bold text-[9px] uppercase tracking-widest mb-0.5">
                Liquidity
              </span>
              <span className="text-content-secondary font-mono font-bold text-xs tracking-tight">
                $20.00M
              </span>
            </div>
          </div>

          {/* Tertiary Group: Rates & Range (Visible on all screens with scroll) */}
          <div className="flex items-center gap-6 bg-zinc-900/20 border border-subtle rounded-2xl px-5 py-2 shrink-0">
            <div className="flex flex-col items-start">
              <span className="text-content-tertiary font-bold text-[9px] uppercase tracking-widest mb-0.5">
                24h High/Low
              </span>
              <span className="text-content-secondary font-mono font-medium text-[10px] tracking-tight">
                $81k - $85k
              </span>
            </div>
            <div className="w-px h-6 bg-white/5"></div>
            <div className="flex flex-col items-start">
              <span className="text-content-tertiary font-bold text-[9px] uppercase tracking-widest mb-0.5">
                Borrow
              </span>
              <span className="text-emerald-500 font-mono font-bold text-xs tracking-tight">
                0.0013%
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT GRID */}
      <div className="flex-1 grid grid-cols-12 gap-3 min-h-0">
        {/* LEFT: CHART (8 Cols) */}
        <section className="col-span-12 lg:col-span-9 bg-background-elevated border border-subtle rounded-xl relative flex flex-col overflow-hidden">
          {/* Chart Toolbar */}
          <div className="h-10 border-b border-subtle bg-background-surface flex items-center justify-between px-3 shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {["15m", "1h", "4h", "1D"].map((t) => (
                  <button
                    key={t}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${t === "15m" ? "bg-background-surface text-white" : "text-content-tertiary hover:text-content-secondary"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="w-px h-3 bg-background-surface"></div>
              <div className="flex gap-2 text-content-tertiary">
                <Crosshair
                  size={14}
                  className="hover:text-white cursor-pointer"
                />
                <PenTool
                  size={14}
                  className="hover:text-white cursor-pointer"
                />
                <Hash size={14} className="hover:text-white cursor-pointer" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-background-card rounded border border-subtle">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[9px] font-bold text-content-secondary">
                  Sync
                </span>
              </div>
              <Settings2
                size={14}
                className="text-content-tertiary hover:text-white cursor-pointer"
              />
              <Maximize2
                size={14}
                className="text-content-tertiary hover:text-white cursor-pointer"
              />
            </div>
          </div>

          {/* CHART AREA */}
          <div className="flex-1 relative bg-background-subtle cursor-crosshair overflow-hidden">
            {/* ... Chart rendering logic ... */}

            {/* --- DYNAMIC OVERLAYS --- */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* LIQUIDATION LINE (Red Dashed) */}
              <div
                className="absolute left-0 right-14 border-b border-rose-500/60 border-dashed flex items-end transition-all duration-300 ease-out group"
                style={{ bottom: `${getY(liqPrice)}%` }}
              >
                <div className="absolute right-0 translate-x-full text-[9px] font-bold bg-rose-500 text-white px-1 py-0.5 rounded-r-sm">
                  {liqPrice.toFixed(2)}
                </div>
                <div className="absolute right-2 -top-5 text-[9px] font-bold text-rose-500 bg-rose-500/10 px-1.5 py-0.5 rounded flex items-center gap-1 opacity-80 group-hover:opacity-100 border border-rose-500/20 backdrop-blur-sm pointer-events-auto cursor-help">
                  <Skull size={10} /> Liq. Price
                  <span className="hidden group-hover:inline text-[8px] opacity-70 ml-1">
                    (-1% Penalty)
                  </span>
                </div>
              </div>

              {/* ENTRY PRICE LINE (Blue Solid) */}
              <div
                className="absolute left-0 right-14 border-b-2 border-blue-500/50 border-solid flex items-end transition-all duration-300"
                style={{ bottom: `${getY(entryPrice)}%` }}
              >
                <div className="absolute right-0 translate-x-full text-[9px] font-bold bg-blue-600 text-white px-1 py-0.5 rounded-r-sm">
                  {entryPrice.toFixed(2)}
                </div>
                <div className="absolute left-4 -top-5 text-[9px] font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 backdrop-blur-sm">
                  Entry (Exec)
                </div>
              </div>

              {/* TAKE PROFIT LINE (Green Dashed) */}
              {tpslEnabled && (
                <div
                  className="absolute left-0 right-14 border-b border-emerald-500/60 border-dashed transition-all duration-300 group"
                  style={{ bottom: `${getY(tpPriceNum)}%` }}
                >
                  <div className="absolute right-0 translate-x-full text-[9px] font-bold bg-emerald-600 text-white px-1 py-0.5 rounded-r-sm">
                    {tpPriceNum.toFixed(2)}
                  </div>
                  <div className="absolute right-2 -top-5 text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 backdrop-blur-sm flex items-center gap-1">
                    <TrendingUp size={10} /> Take Profit (
                    {parseFloat(tpPercentInput).toFixed(2)}%)
                  </div>
                </div>
              )}

              {/* STOP LOSS LINE (Orange Dashed) */}
              {tpslEnabled && (
                <div
                  className="absolute left-0 right-14 border-b border-orange-500/60 border-dashed transition-all duration-300 group"
                  style={{ bottom: `${getY(slPriceNum)}%` }}
                >
                  <div className="absolute right-0 translate-x-full text-[9px] font-bold bg-orange-600 text-white px-1 py-0.5 rounded-r-sm">
                    {slPriceNum.toFixed(2)}
                  </div>
                  <div className="absolute right-2 -top-5 text-[9px] font-bold text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20 backdrop-blur-sm flex items-center gap-1">
                    <AlertTriangle size={10} /> Stop Loss (
                    {parseFloat(slPercentInput).toFixed(2)}%)
                  </div>
                </div>
              )}
            </div>

            {/* Candles Renderer */}
            <div className="absolute inset-0 flex items-end justify-between px-10 pb-8 z-10 gap-0.5 opacity-90">
              {candles.map((c, i) => {
                const isUp = c.close >= c.open;
                const height = Math.abs(getY(c.close) - getY(c.open));
                const wickHeight = Math.abs(getY(c.high) - getY(c.low));
                const wickBottom = getY(c.low);
                const bodyBottom = Math.min(getY(c.open), getY(c.close));

                return (
                  <div
                    key={i}
                    className="flex-1 relative flex flex-col items-center h-full group hover:opacity-100 opacity-90 transition-opacity"
                  >
                    {/* Wick */}
                    <div
                      className={`w-[1px] absolute ${isUp ? "bg-emerald-500" : "bg-rose-500"}`}
                      style={{
                        height: `${wickHeight}%`,
                        bottom: `${wickBottom}%`,
                      }}
                    ></div>
                    {/* Body */}
                    <div
                      className={`w-full absolute ${isUp ? "bg-emerald-500" : "bg-rose-500"}`}
                      style={{
                        height: `${Math.max(height, 0.2)}%`, // Min height for doji
                        bottom: `${bodyBottom}%`,
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>

            {/* Y-Axis Labels (Dynamic) */}
            <div className="absolute right-0 top-0 bottom-8 w-14 border-l border-subtle bg-background-surface flex flex-col justify-between py-4 z-30">
              {[1, 0.75, 0.5, 0.25, 0].map((pct) => {
                const price = chartMax - (chartMax - chartMin) * (1 - pct);
                return (
                  <div
                    key={pct}
                    className="text-[9px] font-mono text-content-tertiary text-right pr-2 relative h-0"
                  >
                    <span className="absolute -top-1.5 right-2">
                      {price.toFixed(0)}
                    </span>
                    <div className="absolute right-0 top-0 w-1 h-px bg-zinc-700"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* RIGHT: ORDER TERMINAL */}
        <aside className="col-span-12 lg:col-span-3 bg-background-elevated border border-subtle rounded-xl flex flex-col overflow-hidden">
          {/* TABS */}
          <div className="flex bg-background-surface border-b border-subtle">
            <button
              onClick={() => setSide("long")}
              className={`flex-1 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${side === "long" ? "text-emerald-500 bg-background-card" : "text-content-tertiary hover:text-content-secondary"}`}
            >
              Long / Buy
              {side === "long" && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500"></div>
              )}
            </button>
            <button
              onClick={() => setSide("short")}
              className={`flex-1 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${side === "short" ? "text-rose-500 bg-background-card" : "text-content-tertiary hover:text-content-secondary"}`}
            >
              Short / Sell
              {side === "short" && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-rose-500"></div>
              )}
            </button>
          </div>

          <div className="p-4 flex flex-col gap-5 overflow-y-auto scrollbar-hide flex-1">
            {/* ORDER TYPE */}
            <div className="flex items-center justify-between">
              <div className="bg-background-subtle border border-subtle rounded-lg p-0.5 flex">
                <button
                  onClick={() => setOrderType("market")}
                  className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${orderType === "market" ? "bg-background-surface text-white" : "text-content-tertiary"}`}
                >
                  Market
                </button>
                <button
                  onClick={() => setOrderType("limit")}
                  className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${orderType === "limit" ? "bg-background-surface text-white" : "text-content-tertiary"}`}
                >
                  Limit
                </button>
              </div>
              <div className="text-[10px] font-bold text-content-tertiary flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                Isolated <ChevronDown size={10} />
              </div>
            </div>

            {/* INPUTS */}
            <div className="space-y-3">
              {orderType === "limit" && (
                <div className="bg-background-subtle border border-strong rounded-xl px-3 py-2.5 flex items-center justify-between group focus-within:border-active">
                  <div className="flex flex-col">
                    <label className="text-[9px] font-bold text-content-tertiary uppercase">
                      Limit Price
                    </label>
                    <input
                      type="text"
                      value={priceInput}
                      onChange={(e) => setPriceInput(e.target.value)}
                      placeholder={currentPrice.toFixed(2)}
                      className="bg-transparent text-sm font-mono font-bold text-white outline-none w-24"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-content-tertiary">
                    USDT
                  </span>
                </div>
              )}

              <div className="bg-background-subtle border border-strong rounded-xl p-3 space-y-3 group focus-within:border-active">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] font-bold text-content-tertiary uppercase">
                    Collateral
                  </label>
                  <span className="text-[9px] font-mono text-content-tertiary flex items-center gap-1">
                    <Wallet size={10} />{" "}
                    {WALLET_BALANCE.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-background-card px-2 py-1 rounded-lg border border-subtle">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] font-bold text-black">
                      T
                    </div>
                    <span className="text-xs font-bold text-white">USDT</span>
                  </div>
                  <input
                    type="text"
                    value={collateralInput}
                    onChange={(e) => setCollateralInput(e.target.value)}
                    placeholder="0.00"
                    className="bg-transparent text-right text-lg font-mono font-bold text-white outline-none w-full"
                  />
                </div>

                {/* Percentage Selectors */}
                <div className="flex justify-end gap-1 pt-1 border-t border-subtle">
                  {[25, 50, 75, 100].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => handleCollateralPercentageClick(pct)}
                      className={`text-[9px] font-bold px-2 py-1 rounded border transition-all ${
                        isCollateralPercentageActive(pct)
                          ? "bg-zinc-700 text-white border-active shadow-sm"
                          : "text-content-tertiary hover:text-content-secondary bg-zinc-900/50 border-subtle"
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* LEVERAGE (1x-100x Safe, 100x-1000x Degen) */}
            <div className="bg-zinc-900/30 rounded-xl p-4 border border-subtle space-y-4">
              <div className="flex justify-between items-center">
                <Minus
                  size={14}
                  className="text-content-tertiary cursor-pointer hover:text-white"
                  onClick={() => setLeverage(Math.max(1, leverage - 1))}
                />
                <span className="text-xl font-black font-mono text-white tracking-tight">
                  {leverage}x
                </span>
                <Plus
                  size={14}
                  className="text-content-tertiary cursor-pointer hover:text-white"
                  onClick={() =>
                    setLeverage(Math.min(maxLeverage, leverage + 1))
                  }
                />
              </div>
              <div className="relative h-6 w-full flex items-center">
                <div className="absolute inset-x-0 h-1 bg-background-surface rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-150 ${leverage > 100 ? "bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500" : "bg-emerald-500"}`}
                    style={{ width: `${(leverage / maxLeverage) * 100}%` }}
                  ></div>
                </div>
                <input
                  type="range"
                  min="1"
                  max={maxLeverage}
                  step="1"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className="absolute w-4 h-4 bg-white rounded-full shadow-lg border-2 border-zinc-900 pointer-events-none transition-all duration-150"
                  style={{
                    left: `calc(${(leverage / maxLeverage) * 100}% - 8px)`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-[9px] font-bold text-content-tertiary font-mono items-center">
                <span>1x</span>
                <span>{isDegenMode ? "500x" : "50x"}</span>
                <span className={isDegenMode ? "text-rose-500" : ""}>
                  {maxLeverage}x
                </span>
                <button
                  onClick={toggleLock}
                  className="ml-2 hover:text-white transition-colors"
                  title={isDegenMode ? "Lock Leverage" : "Unlock High Leverage"}
                >
                  {isDegenMode ? (
                    <Unlock size={10} className="text-rose-500" />
                  ) : (
                    <Lock size={10} />
                  )}
                </button>
              </div>
            </div>

            {/* TP / SL */}
            <div className="space-y-3">
              <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setTpslEnabled(!tpslEnabled)}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${tpslEnabled ? "bg-emerald-500 border-emerald-500" : "bg-transparent border-strong group-hover:border-zinc-500"}`}
                >
                  {tpslEnabled && (
                    <Check size={10} className="text-black stroke-[4px]" />
                  )}
                </div>
                <label className="text-[10px] font-bold text-content-secondary uppercase cursor-pointer group-hover:text-white">
                  Take Profit / Stop Loss
                </label>
              </div>

              {tpslEnabled && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                  {/* TP Row */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-background-input border border-subtle rounded-lg p-2 focus-within:border-emerald-500/50 transition-colors">
                      <label className="text-[8px] font-bold text-content-tertiary uppercase block mb-1">
                        TP Price
                      </label>
                      <input
                        type="text"
                        value={tpPriceInput}
                        onChange={(e) => handleTpPriceChange(e.target.value)}
                        className="bg-transparent text-xs font-mono font-bold text-white w-full outline-none"
                      />
                    </div>
                    <div className="bg-background-input border border-subtle rounded-lg p-2 focus-within:border-emerald-500/50 transition-colors">
                      <label className="text-[8px] font-bold text-content-tertiary uppercase block mb-1">
                        Gain %
                      </label>
                      <input
                        type="text"
                        value={tpPercentInput}
                        onChange={(e) => handleTpPercentChange(e.target.value)}
                        className="bg-transparent text-xs font-mono font-bold text-emerald-500 w-full outline-none"
                      />
                    </div>
                  </div>
                  {/* SL Row */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-background-input border border-subtle rounded-lg p-2 focus-within:border-rose-500/50 transition-colors">
                      <label className="text-[8px] font-bold text-content-tertiary uppercase block mb-1">
                        SL Price
                      </label>
                      <input
                        type="text"
                        value={slPriceInput}
                        onChange={(e) => handleSlPriceChange(e.target.value)}
                        className="bg-transparent text-xs font-mono font-bold text-white w-full outline-none"
                      />
                    </div>
                    <div className="bg-background-input border border-subtle rounded-lg p-2 focus-within:border-rose-500/50 transition-colors">
                      <label className="text-[8px] font-bold text-content-tertiary uppercase block mb-1">
                        Loss %
                      </label>
                      <input
                        type="text"
                        value={slPercentInput}
                        onChange={(e) => handleSlPercentChange(e.target.value)}
                        className="bg-transparent text-xs font-mono font-bold text-rose-500 w-full outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Area (Fixed at bottom or scrolling with content? previously scrolling) */}
            <div className="mt-auto pt-4 space-y-3">
              {/* 1. Primary Outcome Card (Always Visible) */}
              {outcomeSimulation && (
                <div
                  className={`p-4 rounded-xl border transition-colors ${outcomeSimulation.netPnl > 0 ? "bg-emerald-500/5 border-emerald-500/20" : "bg-zinc-900/50 border-strong"}`}
                >
                  {/* Header: ROI & PnL */}
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-content-tertiary uppercase tracking-widest mb-0.5">
                        Est. ROI
                      </span>
                      <span
                        className={`text-xl font-mono font-black leading-none ${outcomeSimulation.roi >= 0 ? "text-emerald-400" : "text-rose-400"}`}
                      >
                        {outcomeSimulation.roi >= 0 ? "+" : ""}
                        {outcomeSimulation.roi.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-black text-content-tertiary uppercase tracking-widest mb-0.5">
                        Net Profit
                      </span>
                      <span
                        className={`text-sm font-mono font-bold ${outcomeSimulation.netPnl >= 0 ? "text-emerald-500" : "text-rose-500"}`}
                      >
                        {outcomeSimulation.netPnl >= 0 ? "+" : ""}
                        {outcomeSimulation.netPnl.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Footer: Payout */}
                  <div className="pt-2 border-t border-subtle flex justify-between items-center">
                    <span className="text-[10px] font-bold text-content-secondary">
                      Total Payout
                    </span>
                    <span className="text-xs font-mono font-bold text-white">
                      $
                      {outcomeSimulation.totalPayout.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              )}

              {/* 2. Collapsible Details (Progressive Disclosure) */}
              <div className="border border-subtle rounded-xl overflow-hidden bg-background-surface">
                <button
                  onClick={() => setShowOrderDetails(!showOrderDetails)}
                  className="w-full flex items-center justify-between p-3 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Info
                      size={12}
                      className="text-content-tertiary group-hover:text-content-secondary"
                    />
                    <span className="text-[10px] font-bold text-content-tertiary group-hover:text-content-secondary uppercase tracking-widest">
                      Fees & Rates
                    </span>
                  </div>
                  <ChevronDown
                    size={12}
                    className={`text-content-tertiary transition-transform duration-300 ${showOrderDetails ? "rotate-180" : ""}`}
                  />
                </button>

                {showOrderDetails && (
                  <div className="px-3 pb-3 space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="h-px bg-white/5 mb-2"></div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-content-tertiary">
                        Entry (Incl. Spread)
                      </span>
                      <span className="font-mono text-content-secondary">
                        $
                        {executionPrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-content-tertiary">
                        Funding / 1h
                      </span>
                      <span
                        className={`font-mono ${isHighFunding ? "text-amber-500" : "text-content-secondary"}`}
                      >
                        -${hourlyFundingCost.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-content-tertiary">Network Gas</span>
                      <span className="font-mono text-content-secondary">
                        ~${networkGas.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-content-tertiary">
                        Liquidation Penalty
                      </span>
                      <span className="font-mono text-rose-500">1.00%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Action Button */}
              <button
                onClick={handleExecute}
                className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg transition-all active:scale-[0.98] ${themeBg} text-black hover:opacity-90`}
              >
                {side === "long" ? "Open Long" : "Open Short"}
              </button>
            </div>
          </div>
        </aside>

        {/* Token Selector Modal (Reusable Logic) */}
        {isTokenSelectorOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setIsTokenSelectorOpen(false)}
          >
            <div
              className="w-[400px] bg-background-card border border-strong rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-subtle flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest text-white">
                  Add Watchlist Token
                </span>
                <button onClick={() => setIsTokenSelectorOpen(false)}>
                  <X
                    size={14}
                    className="text-content-tertiary hover:text-white"
                  />
                </button>
              </div>
              <div className="p-2 space-y-1 max-h-[300px] overflow-y-auto scrollbar-thin">
                {[
                  "BTC",
                  "ETH",
                  "SOL",
                  "WBTC",
                  "PEPE",
                  "USDC",
                  "ARB",
                  "OP",
                  "MATIC",
                ].map((sym) => (
                  <button
                    key={sym}
                    onClick={() => {
                      if (!pinnedTickers.includes(sym)) {
                        setPinnedTickers([...pinnedTickers, sym]);
                      }
                      setActiveTicker(sym);
                      setIsTokenSelectorOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-background-surface flex items-center justify-center overflow-hidden border border-subtle">
                        <img
                          src={getTickerLogo(sym)}
                          alt={sym}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-bold text-white block">
                          {sym}
                        </span>
                      </div>
                    </div>
                    {pinnedTickers.includes(sym) && (
                      <Check size={14} className="text-emerald-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProTradingView;
