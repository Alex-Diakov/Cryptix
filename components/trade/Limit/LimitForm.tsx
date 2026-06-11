import React from "react";
import {
  ArrowDown,
  ChevronDown,
  Check,
  Clock,
  Ban,
  Target,
  Info,
} from "lucide-react";
import { formatMoney, formatToken, ETH_ICON } from "../Shared/Shared";

interface LimitFormProps {
  amount: string;
  onAmountChange: (val: string) => void;
  balance: number;
  logic: any;
}

export const LimitForm: React.FC<LimitFormProps> = ({
  amount,
  onAmountChange,
  balance,
  logic,
}) => {
  const {
    limitPrice,
    setLimitPrice,
    expiry,
    setExpiry,
    postOnly,
    setPostOnly,
    numericPay,
    ETH_PRICE,
    simulation,
    isInsufficientBalance,
    handlePercentageClick,
    isPercentageActive,
    adjustLimitPrice,
  } = logic;

  return (
    <section className="lg:col-span-4 flex flex-col h-full gap-5">
      {/* Main Input Panel */}
      <div className="glass-panel p-2">
        <div className="bg-background-surface rounded-[2.2rem] p-6 border border-subtle space-y-2">
          {/* 1. PAY INPUT BLOCK */}
          <div className="bg-background-subtle rounded-3xl p-5 border border-subtle focus-within:border-emerald-500/30 transition-colors group relative">
            <div className="flex justify-between items-start mb-4">
              <label className="text-[9px] font-black text-content-tertiary uppercase tracking-[0.2em] group-focus-within:text-emerald-500 transition-colors">
                You Sell
              </label>
              <div className="text-[9px] font-bold text-content-tertiary bg-background-card px-2 py-1 rounded-lg border border-subtle flex items-center gap-2">
                <span>
                  Bal:{" "}
                  <span className="font-mono text-content-secondary">
                    {formatToken(balance)}
                  </span>
                </span>
                <button
                  onClick={() => handlePercentageClick(100)}
                  className="text-emerald-500 hover:text-emerald-400 font-black text-[8px] uppercase"
                >
                  Max
                </button>
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
              <button className="flex items-center gap-2 bg-background-card border border-strong pl-2 pr-3 py-2 rounded-xl hover:bg-background-surface transition-all shrink-0 active:scale-95">
                <div className="w-6 h-6 rounded-full bg-background-subtle border border-strong flex items-center justify-center p-0.5">
                  <img
                    src={ETH_ICON}
                    className="w-full h-full object-contain"
                    alt="ETH"
                  />
                </div>
                <span className="font-bold text-white text-sm">ETH</span>
                <ChevronDown size={12} className="text-content-tertiary" />
              </button>
            </div>

            {/* Footer: USD Value & Percentages */}
            <div className="flex justify-between items-center mt-3">
              <div className="text-xs font-mono font-bold text-content-tertiary">
                ≈ {amount ? formatMoney(numericPay * ETH_PRICE) : "$0.00"}
              </div>
              <div className="flex gap-1">
                {[25, 50, 75, 100].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => handlePercentageClick(pct)}
                    className={`text-[9px] font-bold px-2 py-1 rounded border transition-all ${
                      isPercentageActive(pct)
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

          {/* CONNECTOR */}
          <div className="relative h-4 w-full flex items-center justify-center z-10 -my-3">
            <div className="p-1.5 bg-background-surface rounded-full border border-strong shadow-xl">
              <div className="bg-background-card p-1.5 rounded-full text-content-tertiary">
                <ArrowDown size={14} strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* 2. LIMIT SETTINGS BLOCK */}
          <div
            className={`bg-background-subtle rounded-3xl p-5 border transition-colors ${simulation.postOnlyWarning ? "border-rose-500/30" : "border-subtle focus-within:border-emerald-500/30"}`}
          >
            <div className="flex justify-between items-center mb-4">
              <label className="text-[9px] font-black text-content-tertiary uppercase tracking-[0.2em]">
                Target Price
              </label>
              <div className="flex gap-1">
                <button
                  onClick={() => adjustLimitPrice(0)}
                  className="text-[8px] font-bold bg-background-card text-content-tertiary border border-subtle px-2 py-1 rounded hover:text-white transition-colors"
                >
                  MARKET
                </button>
                <button
                  onClick={() => adjustLimitPrice(5)}
                  className="text-[8px] font-bold bg-background-card text-content-tertiary border border-subtle px-2 py-1 rounded hover:text-white transition-colors"
                >
                  +5%
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-mono text-content-tertiary">
                $
              </span>
              <input
                type="text"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="w-full bg-transparent text-3xl font-mono font-medium tracking-tighter text-white placeholder:text-zinc-800 focus:outline-none"
              />
              <span className="text-xs font-bold text-content-tertiary">
                USDC
              </span>
            </div>

            {/* Expiry & Post Only Row */}
            <div className="flex gap-2">
              <div className="relative flex-1 bg-background-card rounded-xl border border-subtle px-3 py-2 flex items-center gap-2 group hover:border-strong transition-colors">
                <Clock size={12} className="text-content-tertiary" />
                <select
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="bg-transparent text-[10px] font-bold text-white uppercase tracking-wider outline-none w-full cursor-pointer appearance-none z-10"
                >
                  <option value="10m">10 Mins</option>
                  <option value="1h">1 Hour</option>
                  <option value="24h">24 Hours</option>
                  <option value="7d">7 Days</option>
                  <option value="GTC">Until Cancelled</option>
                </select>
                <ChevronDown
                  size={10}
                  className="text-content-tertiary absolute right-3 pointer-events-none"
                />
              </div>

              <button
                onClick={() => setPostOnly(!postOnly)}
                className={`flex-1 flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${postOnly ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-background-card border-subtle text-content-tertiary hover:text-content-secondary"}`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Post Only
                </span>
                {postOnly && <Check size={12} />}
              </button>
            </div>

            {/* Footer: Total & Market Ref */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-subtle">
              <div className="text-xs font-mono font-bold text-content-tertiary">
                Total:{" "}
                <span className="text-white">
                  {formatMoney(simulation.grossValue)}
                </span>
              </div>
              <div className="text-[9px] font-mono font-bold text-content-tertiary">
                Market: ${ETH_PRICE.toLocaleString()}
              </div>
            </div>

            {/* Warning Message */}
            {simulation.postOnlyWarning && (
              <div className="mt-3 flex items-center gap-2 text-[9px] font-bold text-rose-500 bg-rose-500/10 px-3 py-2 rounded-lg border border-rose-500/20">
                <Ban size={10} />
                <span>
                  Order is marketable. <strong>Post-Only</strong> will reject.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Execution Details Ticket */}
      <div className="bg-zinc-900/40 border border-subtle rounded-[2rem] p-6 shadow-inner space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-dashed border-strong">
          <span className="text-[10px] font-bold text-content-tertiary uppercase tracking-widest flex items-center gap-1.5">
            <Target size={12} /> Distance
          </span>
          <div className="text-right">
            <span
              className={`text-xs font-mono font-bold ${simulation.distanceToMarket < 0 ? "text-rose-400" : "text-emerald-400"}`}
            >
              {simulation.distanceToMarket > 0 ? "+" : ""}
              {simulation.distanceToMarket.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-dashed border-strong">
          <span className="text-[10px] font-bold text-content-tertiary uppercase tracking-widest">
            Effective Price
          </span>
          <div className="flex flex-col items-end">
            <span className="text-xs font-mono font-bold text-white">
              {formatMoney(simulation.effectivePrice)}
            </span>
            <span className="text-[9px] text-content-tertiary font-mono">
              Net of fees
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-content-tertiary uppercase tracking-widest">
              Total Fees
            </span>
            <span
              title={`Platform: ${simulation.activeFeeBps}bps | Network: $${simulation.networkFee}`}
            >
              <Info size={10} className="text-content-tertiary cursor-help" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] bg-background-surface text-content-secondary px-1.5 py-0.5 rounded border border-subtle font-bold uppercase">
              {simulation.feeTierLabel}
            </span>
            <span className="text-xs font-mono font-bold text-content-secondary">
              ~{formatMoney(simulation.platformFee + simulation.networkFee)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        disabled={
          numericPay <= 0 || isInsufficientBalance || simulation.postOnlyWarning
        }
        className={`w-full py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl active:scale-[0.98] ${
          isInsufficientBalance || numericPay <= 0 || simulation.postOnlyWarning
            ? "bg-background-surface text-content-tertiary cursor-not-allowed border border-subtle"
            : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        }`}
      >
        {simulation.postOnlyWarning
          ? "Invalid Order Type"
          : "Place Limit Order"}
      </button>
    </section>
  );
};
