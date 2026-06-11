import React from "react";
import { ArrowDown, ChevronDown, Check, User, Fuel, Lock } from "lucide-react";
import {
  formatMoney,
  formatToken,
  formatTokenAmount,
  getTokenLogo,
} from "../Shared/Shared";

interface SwapFormProps {
  amount: string;
  onAmountChange: (val: string) => void;
  balance: number;
  logic: any;
}

export const SwapForm: React.FC<SwapFormProps> = ({
  amount,
  onAmountChange,
  balance,
  logic,
}) => {
  const {
    payToken,
    setSelectingSide,
    isReviewing,
    reviewTimer,
    setIsReviewing,
    numericPay,
    ETH_PRICE,
    receiveToken,
    simulation,
    hasAmount,
    isSimulating,
    recipientMode,
    setRecipientMode,
    recipientAddress,
    setRecipientAddress,
    gasSpeed,
    setGasSpeed,
    isInsufficientBalance,
  } = logic;

  const handleFlip = () => {
    const tempToken = logic.payToken;
    logic.setPayToken(logic.receiveToken);
    logic.setReceiveToken(tempToken);
  };

  const isPercentageActive = (pct: number) => {
    if (balance <= 0) return false;
    const maxSafe = Math.max(0, balance - 0.01);
    const targetVal = (maxSafe * pct) / 100;
    return amount === targetVal.toFixed(4);
  };

  const handlePercentageClick = (pct: number) => {
    const maxSafe = Math.max(0, balance - 0.01);
    const val = (maxSafe * pct) / 100;
    onAmountChange(val.toFixed(4));
  };

  return (
    <section className="lg:col-span-4 flex flex-col h-full gap-5">
      {/* Main Card - using glass-panel component */}
      <div
        className={`glass-panel p-2 ${isReviewing ? "opacity-50 pointer-events-none grayscale-[0.5]" : ""}`}
      >
        <div className="bg-background-surface rounded-[2.2rem] p-6 border border-subtle space-y-2">
          {/* 1. PAY BLOCK */}
          <div className="bg-background-subtle rounded-3xl p-5 border border-subtle focus-within:border-emerald-500/30 transition-colors group relative">
            <div className="flex justify-between items-start mb-4">
              <label className="text-[9px] font-black text-content-tertiary uppercase tracking-[0.2em] group-focus-within:text-emerald-500 transition-colors">
                You Pay
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
              <button
                onClick={() => setSelectingSide("pay")}
                className="flex items-center gap-2 bg-background-card border border-strong pl-2 pr-3 py-2 rounded-xl hover:bg-background-surface transition-all shrink-0 active:scale-95"
              >
                <div className="w-6 h-6 rounded-full bg-background-subtle border border-strong flex items-center justify-center p-0.5">
                  <img
                    src={getTokenLogo(payToken.sym)}
                    className="w-full h-full object-contain"
                    alt={payToken.sym}
                  />
                </div>
                <span className="font-bold text-white text-sm">
                  {payToken.sym}
                </span>
                <ChevronDown size={12} className="text-content-tertiary" />
              </button>
            </div>

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
              <div
                onClick={handleFlip}
                className="bg-background-card p-1.5 rounded-full text-content-tertiary hover:text-emerald-500 transition-colors cursor-pointer active:rotate-180 duration-300"
              >
                <ArrowDown size={14} strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* 2. RECEIVE BLOCK */}
          <div className="bg-background-subtle rounded-3xl p-5 border border-subtle focus-within:border-emerald-500/30 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <label className="text-[9px] font-black text-content-tertiary uppercase tracking-[0.2em] group-focus-within:text-emerald-500 transition-colors">
                {recipientMode ? "Recipient Gets" : "You Receive"}
              </label>
              {recipientMode && (
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">
                  Custom Address
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`w-full text-4xl lg:text-5xl font-mono font-medium tracking-tighter truncate ${hasAmount ? "text-emerald-400" : "text-zinc-800"}`}
              >
                {isSimulating ? (
                  <span className="animate-pulse opacity-50">
                    Calculating...
                  </span>
                ) : amount ? (
                  formatTokenAmount(simulation.receiveValNum)
                ) : (
                  "0.00"
                )}
              </div>
              <button
                onClick={() => setSelectingSide("receive")}
                className="flex items-center gap-2 bg-background-card border border-strong pl-2 pr-3 py-2 rounded-xl hover:bg-background-surface transition-all shrink-0 active:scale-95"
              >
                <div className="w-6 h-6 rounded-full bg-background-subtle border border-strong flex items-center justify-center p-0.5">
                  <img
                    src={getTokenLogo(receiveToken.sym)}
                    className="w-full h-full object-contain"
                    alt={receiveToken.sym}
                  />
                </div>
                <span className="font-bold text-white text-sm">
                  {receiveToken.sym}
                </span>
                <ChevronDown size={12} className="text-content-tertiary" />
              </button>
            </div>

            <div className="flex justify-between items-center mt-3">
              <div className="text-xs font-mono font-bold text-content-tertiary">
                ≈ {amount ? formatMoney(simulation.receiveValNum) : "$0.00"}
              </div>
              <div className="text-[9px] font-mono font-bold text-content-tertiary flex items-center gap-1">
                <span className="text-content-tertiary">Rate:</span> 1{" "}
                {payToken.sym} ≈ {ETH_PRICE.toLocaleString()} {receiveToken.sym}
              </div>
            </div>
          </div>

          {/* 3. RECIPIENT TOGGLE */}
          <div className="px-2 pt-2">
            <button
              onClick={() => setRecipientMode(!recipientMode)}
              className="flex items-center gap-2 text-content-tertiary hover:text-content-secondary transition-colors group w-full"
            >
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${recipientMode ? "bg-emerald-500 border-emerald-500 text-black" : "border-strong bg-transparent"}`}
              >
                {recipientMode && <Check size={10} strokeWidth={4} />}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Send to wallet
              </span>
            </button>

            {/* Persist input even if hidden to prevent data loss (audit fix) */}
            <div
              className={`mt-3 relative transition-all duration-300 ${recipientMode ? "opacity-100 max-h-20" : "opacity-0 max-h-0 overflow-hidden"}`}
            >
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="0x..."
                className="w-full bg-background-subtle border border-strong rounded-xl py-3 pl-10 pr-4 text-xs font-mono text-white focus:outline-none focus:border-emerald-500/50"
              />
              <div className="absolute left-3.5 top-3.5 text-content-tertiary">
                <User size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Review Overlay */}
        {isReviewing && (
          <div className="absolute inset-0 flex items-center justify-center z-20 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-black/90 backdrop-blur-md absolute inset-0"></div>
            <div className="relative bg-background-card border border-strong p-6 rounded-3xl shadow-2xl max-w-xs w-full text-center">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                <Lock size={20} />
              </div>
              <h3 className="text-white font-bold text-lg mb-1">
                Confirm Swap
              </h3>
              <p className="text-content-secondary text-xs mb-6">
                Rate expires in{" "}
                <span className="text-emerald-500 font-mono">
                  {reviewTimer}s
                </span>
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    console.log("Swap Executed");
                    setIsReviewing(false);
                  }}
                  className="w-full py-3 bg-emerald-500 text-black rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95"
                >
                  Sign & Swap
                </button>
                <button
                  onClick={() => setIsReviewing(false)}
                  className="w-full py-3 bg-transparent text-content-tertiary hover:text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Execution Details Ticket */}
      <div className="bg-zinc-900/40 border border-subtle rounded-[2rem] p-6 shadow-inner space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-dashed border-strong">
          <span className="text-[10px] font-bold text-content-tertiary uppercase tracking-widest flex items-center gap-1.5">
            <Fuel size={12} /> Network Cost
          </span>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-white block">
              ~{formatMoney(simulation.networkFee)}
            </span>
            <div className="relative group inline-block">
              <span className="text-[9px] text-content-tertiary font-bold uppercase tracking-wider cursor-pointer hover:text-white transition-colors border-b border-strong hover:border-white">
                {gasSpeed}
              </span>
              <select
                value={gasSpeed}
                onChange={(e) => setGasSpeed(e.target.value as any)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              >
                <option value="slow">Slow</option>
                <option value="normal">Normal</option>
                <option value="fast">Fast</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-dashed border-strong">
          <span className="text-[10px] font-bold text-content-tertiary uppercase tracking-widest">
            Price Impact
          </span>
          <span
            className={`text-xs font-mono font-bold ${hasAmount ? "text-red-400" : "text-content-tertiary"}`}
          >
            {hasAmount ? `-${simulation.swapImpactPct.toFixed(2)}%` : "—"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-content-tertiary uppercase tracking-widest">
            Min. Received
          </span>
          <span className="text-xs font-mono font-bold text-emerald-400">
            {amount ? formatTokenAmount(simulation.minReceived) : "0.00"}{" "}
            {receiveToken.sym}
          </span>
        </div>
      </div>

      {/* MAIN ACTION BUTTON */}
      <button
        onClick={() => setIsReviewing(true)}
        disabled={numericPay <= 0 || isInsufficientBalance}
        className={`w-full py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl active:scale-[0.98] ${
          isInsufficientBalance || numericPay <= 0
            ? "bg-background-surface text-content-tertiary cursor-not-allowed border border-subtle"
            : "bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        }`}
      >
        {isInsufficientBalance
          ? "Insufficient Balance"
          : numericPay <= 0
            ? "Enter Amount"
            : "Review Swap"}
      </button>
    </section>
  );
};
