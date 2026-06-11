import React from "react";
import {
  Sparkles,
  RefreshCw,
  Zap,
  BarChart3,
  ChevronDown,
  Layers,
  Activity,
  Info,
  GitMerge,
  ShieldCheck,
  Settings2,
  Check,
  AlertOctagon,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import { getTokenLogo } from "../Shared/Shared";

interface ExecutionAnalysisProps {
  logic: any;
  onSwitchToAlgo?: () => void;
}

const formatMoney = (val: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);
};

export const SwapAnalysis: React.FC<ExecutionAnalysisProps> = ({
  logic,
  onSwitchToAlgo,
}) => {
  const {
    isSimulating,
    hasAmount,
    simulation,
    isDetailsOpen,
    setIsDetailsOpen,
    payToken,
    receiveToken,
    isSettingsOpen,
    setIsSettingsOpen,
    slippage,
    setSlippage,
    useMEVShield,
    setUseMEVShield,
  } = logic;

  const isHighImpact = simulation.swapImpactPct > 1.0;

  return (
    <section className="lg:col-span-6 bg-zinc-900/40 border border-subtle rounded-[2.5rem] p-8 flex flex-col h-full overflow-hidden relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            <Sparkles className="text-purple-500" size={20} /> Execution
            Intelligence
          </h2>
          <p className="text-[10px] font-bold text-content-tertiary uppercase tracking-widest mt-1">
            AI-Optimized Routing Engine
          </p>
        </div>
        <div
          className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-wider flex items-center gap-2 ${isSimulating ? "bg-amber-500/10 border-amber-500/20 text-amber-500" : hasAmount ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-background-surface border-subtle text-content-tertiary"}`}
        >
          {isSimulating ? (
            <RefreshCw size={10} className="animate-spin" />
          ) : hasAmount ? (
            <Zap size={10} />
          ) : null}
          {isSimulating ? "Scanning" : hasAmount ? "Optimized" : "Standby"}
        </div>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto pr-2 pb-10 custom-scrollbar">
        {/* Compact Execution Quality & Loss Analysis Card */}
        <div className="bg-background-surface border border-subtle rounded-2xl p-5 shrink-0 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-content-tertiary uppercase tracking-widest block">
                Execution Quality
              </span>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-4xl font-mono font-black tracking-tighter ${isSimulating ? "text-content-tertiary animate-pulse" : "text-white"}`}
                >
                  {isSimulating || !hasAmount ? "--" : simulation.routingScore}
                </span>
                {!isSimulating && hasAmount && (
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                      parseFloat(simulation.routingScore) >= 9
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : parseFloat(simulation.routingScore) >= 7
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    }`}
                  >
                    {simulation.scoreLabel}
                  </span>
                )}
              </div>
            </div>

            {/* Circular Gauge Visualization */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#18181b"
                  strokeWidth="8"
                />
                {/* Progress Arc */}
                {!isSimulating && hasAmount && (
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke={
                      parseFloat(simulation.routingScore) >= 7
                        ? "#10b981"
                        : parseFloat(simulation.routingScore) >= 4
                          ? "#f59e0b"
                          : "#ef4444"
                    }
                    strokeWidth="8"
                    strokeDasharray="263.89"
                    strokeDashoffset={
                      263.89 -
                      263.89 * (parseFloat(simulation.routingScore) / 10)
                    }
                    strokeLinecap="round"
                    className="transition-[stroke-dashoffset] duration-1000 ease-out drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]"
                  />
                )}
              </svg>
              {/* Center Icon or Amount */}
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                {!isSimulating && hasAmount && isHighImpact ? (
                  <>
                    <span className="text-[8px] font-bold text-rose-500 uppercase tracking-widest mb-0.5">
                      Loss
                    </span>
                    <span className="text-[9px] font-mono font-bold text-rose-400">
                      {simulation.swapImpactCost > 1000000
                        ? `-$${(simulation.swapImpactCost / 1000000).toFixed(1)}M`
                        : simulation.swapImpactCost > 1000
                          ? `-$${(simulation.swapImpactCost / 1000).toFixed(1)}k`
                          : `-$${simulation.swapImpactCost.toFixed(0)}`}
                    </span>
                  </>
                ) : (
                  <BarChart3 size={18} className="text-content-tertiary" />
                )}
              </div>
            </div>
          </div>

          {/* Loss Analysis */}
          {hasAmount && !isSimulating && (
            <div className="pt-4 border-t border-subtle space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-content-tertiary uppercase tracking-wider">
                  Expected Value
                </span>
                <span className="text-[10px] font-mono text-content-secondary">
                  {formatMoney(simulation.usdValue)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-content-tertiary uppercase tracking-wider">
                  Price Impact ({simulation.swapImpactPct.toFixed(2)}%)
                </span>
                <span
                  className={`text-[10px] font-mono ${isHighImpact ? "text-rose-500" : "text-amber-500"}`}
                >
                  -{formatMoney(simulation.swapImpactCost)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-content-tertiary uppercase tracking-wider">
                  Fees (Platform + Network)
                </span>
                <span className="text-[10px] font-mono text-content-secondary">
                  -{formatMoney(simulation.platformFee + simulation.networkFee)}
                </span>
              </div>
              <div className="pt-2 mt-2 border-t border-subtle flex justify-between items-center">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                  Total Value Lost
                </span>
                <span
                  className={`text-[11px] font-mono font-bold ${isHighImpact ? "text-rose-500" : "text-amber-500"}`}
                >
                  -{formatMoney(simulation.totalSwapCost)}
                </span>
              </div>

              {/* Algo Trade Suggestion (Subtle) */}
              {isHighImpact && (
                <div className="mt-3 pt-3 border-t border-subtle animate-in fade-in slide-in-from-bottom-1">
                  <div className="flex items-center justify-between bg-rose-500/5 border border-rose-500/10 rounded-lg p-2.5">
                    <div className="flex items-center gap-2">
                      <AlertOctagon
                        size={12}
                        className="text-rose-500 shrink-0"
                      />
                      <span className="text-[10px] text-rose-400/80 leading-tight">
                        High slippage. <br />
                        Save ~{formatMoney(
                          simulation.swapImpactCost * 0.85,
                        )}{" "}
                        via TWAP.
                      </span>
                    </div>
                    <button
                      onClick={onSwitchToAlgo}
                      className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
                    >
                      Use Algo
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Route Visualization - NODE BASED */}
        <div className="bg-background-surface border border-subtle rounded-2xl p-5 flex flex-col relative overflow-hidden shrink-0 min-h-[240px]">
          <div className="flex items-center justify-between mb-6 relative z-10">
            <span className="text-[10px] font-bold text-content-tertiary uppercase tracking-widest flex items-center gap-2">
              <GitMerge size={12} /> Smart Route
            </span>
            <span className="text-[9px] font-mono text-content-tertiary">
              Latency: 2ms
            </span>
          </div>

          {!hasAmount && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
              <div className="bg-background-card border border-strong px-4 py-2 rounded-xl text-[10px] font-bold text-content-secondary uppercase tracking-widest">
                Enter amount to simulate
              </div>
            </div>
          )}

          <div className="space-y-4 relative z-10">
            {/* Source Node */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-background-card px-3 py-1.5 rounded-lg border border-subtle">
                <img
                  src={getTokenLogo(payToken.sym)}
                  className="w-4 h-4 rounded-full"
                />
                <span className="text-[10px] font-bold text-white">
                  {payToken.sym}
                </span>
              </div>
              <span className="text-[9px] font-mono text-content-tertiary">
                100%
              </span>
            </div>

            {/* Routing Split */}
            <div className="flex flex-col gap-2 pl-4 border-l border-subtle ml-4 py-2">
              {simulation?.routeSplit?.map((route: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3 relative">
                  <div className="w-4 h-px bg-background-surface absolute -left-4"></div>
                  <div className="flex-1 bg-background-input border border-subtle rounded-lg p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${route.color === "bg-white" ? "bg-emerald-500" : "bg-purple-500"}`}
                      ></div>
                      <span className="text-[10px] font-bold text-content-secondary">
                        {route.dex}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-content-tertiary">
                      {route.pct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dest Node */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-background-card px-3 py-1.5 rounded-lg border border-subtle">
                <img
                  src={getTokenLogo(receiveToken.sym)}
                  className="w-4 h-4 rounded-full"
                />
                <span className="text-[10px] font-bold text-white">
                  {receiveToken.sym}
                </span>
              </div>
            </div>
          </div>

          {/* Advanced Settings Drawer */}
          <div
            className={`mt-auto border-t border-subtle bg-background-elevated -mx-5 -mb-5 p-5 transition-all duration-300 ${isSettingsOpen ? "h-auto" : "h-14"}`}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <div className="flex items-center gap-2 text-[9px] text-emerald-500 font-bold uppercase tracking-wider">
                <ShieldCheck size={12} /> MEV Protected
              </div>
              <button className="text-[9px] font-bold text-content-tertiary hover:text-white flex items-center gap-1 transition-colors">
                <Settings2 size={10} /> Configure{" "}
                <ChevronDown
                  size={10}
                  className={`transition-transform duration-300 ${isSettingsOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {isSettingsOpen && (
              <div className="mt-4 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-1">
                <div>
                  <label className="text-[9px] font-bold text-content-tertiary uppercase tracking-widest block mb-2">
                    Max Slippage
                  </label>
                  <div className="flex items-center gap-2">
                    {[0.1, 0.5, 1.0].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSlippage(s)}
                        className={`px-2 py-1 rounded text-[9px] font-bold border ${slippage === s ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-background-card border-subtle text-content-tertiary"}`}
                      >
                        {s}%
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-content-tertiary uppercase tracking-widest block mb-2">
                    Private RPC
                  </label>
                  <button
                    onClick={() => setUseMEVShield(!useMEVShield)}
                    className={`w-full py-1.5 rounded flex items-center justify-center gap-2 text-[9px] font-bold border transition-colors ${useMEVShield ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-background-card border-subtle text-content-tertiary"}`}
                  >
                    {useMEVShield ? "Enabled" : "Disabled"}
                    {useMEVShield ? (
                      <Check size={10} />
                    ) : (
                      <AlertOctagon size={10} />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
