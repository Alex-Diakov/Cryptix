import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ArrowRight,
  Check,
  ArrowDownCircle,
  ArrowUpCircle,
  Zap,
  Layers,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Shield,
  MousePointerClick,
} from "lucide-react";

interface OptimizationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const OptimizationDrawer: React.FC<OptimizationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedActions, setSelectedActions] = useState({
    trade1: true,
    revoke: true,
    trade2: true,
  });
  const [isExecuted, setIsExecuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleAction = (key: "trade1" | "revoke" | "trade2") => {
    if (isExecuted) return;
    setSelectedActions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExecute = () => {
    setIsExecuted(true);
    setTimeout(() => {
      setIsExecuted(false);
      onClose();
    }, 2500);
  };

  const selectedCount = Object.values(selectedActions).filter(Boolean).length;

  if (!mounted) return null;

  const portalRoot = document.getElementById("portal-root") || document.body;

  return createPortal(
    <div className="relative z-[9999]">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[480px] bg-background-card border-l border-strong shadow-[0_0_50px_-12px_rgba(0,0,0,1)] transition-transform duration-500 ease-in-out flex flex-col z-[10000] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex-shrink-0 pt-12 px-8 pb-6 border-b border-subtle bg-zinc-900/80 backdrop-blur-xl relative">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-content-tertiary hover:text-white transition-colors p-2 bg-white/5 rounded-xl border border-subtle hover:bg-white/10"
          >
            <X size={18} />
          </button>

          <div className="flex items-center space-x-3 mb-1">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Strategy Engine
            </h2>
          </div>
          <p className="text-content-tertiary text-xs font-medium leading-relaxed">
            AI-driven portfolio rebalancing to minimize risk and maximize yield
            efficiency.
          </p>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide bg-background-card">
          {/* 1. PROJECTED OUTCOME (List View) */}
          <section>
            <div className="mb-3 border-b border-subtle pb-2">
              <h3 className="text-[10px] font-black text-content-tertiary uppercase tracking-[0.2em]">
                Projected Outcome
              </h3>
            </div>

            <div className="bg-zinc-900/30 border border-subtle rounded-lg flex flex-col divide-y divide-white/5">
              {/* Row 1: Risk Profile */}
              <div className="flex items-center justify-between p-4">
                <span className="text-[10px] font-bold text-content-tertiary uppercase tracking-widest">
                  Risk Profile
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-wider line-through decoration-rose-500/50 opacity-60">
                    High Risk
                  </span>
                  <ArrowRight size={10} className="text-content-tertiary" />
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">
                    Low Risk
                  </span>
                </div>
              </div>

              {/* Row 2: Est. APY */}
              <div className="flex items-center justify-between p-4">
                <span className="text-[10px] font-bold text-content-tertiary uppercase tracking-widest">
                  Est. APY
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-content-tertiary">
                    2.1%
                  </span>
                  <ArrowRight size={10} className="text-content-tertiary" />
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    14.2%
                  </span>
                </div>
              </div>

              {/* Row 3: Boost */}
              <div className="flex items-center justify-between p-4">
                <span className="text-[10px] font-bold text-content-tertiary uppercase tracking-widest">
                  Efficiency Boost
                </span>
                <div className="flex items-center space-x-1">
                  <TrendingUp size={12} className="text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">
                    +6.7x
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 2. EXECUTION QUEUE */}
          <section>
            <div className="flex items-center justify-between mb-3 border-b border-subtle pb-2">
              <h3 className="text-[10px] font-black text-content-tertiary uppercase tracking-[0.2em]">
                Execution Queue
              </h3>
              <span className="text-[9px] font-mono text-content-tertiary">
                MEV-Protected
              </span>
            </div>

            <div className="space-y-3">
              {/* Trade 1: Sell PEPE */}
              <div
                onClick={() => toggleAction("trade1")}
                className={`p-4 rounded-lg border transition-all cursor-pointer relative overflow-hidden ${selectedActions.trade1 ? "bg-background-card border-strong" : "bg-zinc-900/30 border-subtle opacity-60"}`}
              >
                <div className="flex items-start gap-4 relative z-10">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all mt-1 ${selectedActions.trade1 ? "bg-emerald-500 border-emerald-500" : "border-strong bg-transparent"}`}
                  >
                    {selectedActions.trade1 && (
                      <Check size={10} className="text-black stroke-[4px]" />
                    )}
                  </div>
                  <div className="p-1.5 bg-background-surface rounded text-rose-500 border border-subtle">
                    <ArrowDownCircle size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs font-bold text-white uppercase tracking-wide">
                        Sell PEPE
                      </span>
                      <span className="text-xs font-mono font-bold text-content-secondary">
                        $10,800
                      </span>
                    </div>
                    <p className="text-[10px] text-content-tertiary">
                      Bearish structure. Rotate to stables.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trade 2: Revoke Allowances */}
              <div
                onClick={() => toggleAction("revoke")}
                className={`p-4 rounded-lg border transition-all cursor-pointer relative overflow-hidden ${selectedActions.revoke ? "bg-background-card border-strong" : "bg-zinc-900/30 border-subtle opacity-60"}`}
              >
                <div className="flex items-start gap-4 relative z-10">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all mt-1 ${selectedActions.revoke ? "bg-emerald-500 border-emerald-500" : "border-strong bg-transparent"}`}
                  >
                    {selectedActions.revoke && (
                      <Check size={10} className="text-black stroke-[4px]" />
                    )}
                  </div>
                  <div className="p-1.5 bg-background-surface rounded text-orange-500 border border-subtle">
                    <Shield size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs font-bold text-white uppercase tracking-wide">
                        Revoke Allowances
                      </span>
                      <span className="text-[9px] font-bold text-content-tertiary">
                        Est. Cost:{" "}
                        <span className="text-emerald-500 font-black">
                          Gas Only
                        </span>
                      </span>
                    </div>
                    <p className="text-[10px] text-content-tertiary">
                      Found 2 infinite approvals. Revoke advised.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trade 3: Deposit USDC */}
              <div
                onClick={() => toggleAction("trade2")}
                className={`p-4 rounded-lg border transition-all cursor-pointer relative overflow-hidden ${selectedActions.trade2 ? "bg-background-card border-strong" : "bg-zinc-900/30 border-subtle opacity-60"}`}
              >
                <div className="flex items-start gap-4 relative z-10">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all mt-1 ${selectedActions.trade2 ? "bg-emerald-500 border-emerald-500" : "border-strong bg-transparent"}`}
                  >
                    {selectedActions.trade2 && (
                      <Check size={10} className="text-black stroke-[4px]" />
                    )}
                  </div>
                  <div className="p-1.5 bg-background-surface rounded text-emerald-500 border border-subtle">
                    <ArrowUpCircle size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs font-bold text-white uppercase tracking-wide">
                        Deposit USDC
                      </span>
                      <span className="text-xs font-mono font-bold text-content-secondary">
                        ~$10,790
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-content-tertiary">
                        Compound V3
                      </span>
                      <span className="text-[9px] font-bold text-emerald-500 uppercase">
                        +5.4% APY
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* STICKY FOOTER */}
        <div className="flex-shrink-0 p-6 border-t border-subtle bg-zinc-950/90 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center space-x-2 text-[10px] text-content-tertiary font-medium">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>Audit Passed</span>
            </div>
            <div className="text-[10px] font-mono text-content-tertiary">
              Gas: <span className="text-content-secondary">$8.42</span>
            </div>
          </div>

          <button
            onClick={handleExecute}
            disabled={isExecuted || selectedCount === 0}
            className="w-full py-4 bg-emerald-500 text-black rounded-lg font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:bg-emerald-400 transition-all active:scale-[0.98] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isExecuted ? (
              <>
                <CheckCircle2 size={16} className="animate-bounce" />
                <span>Executing Strategy...</span>
              </>
            ) : (
              <>
                <Zap
                  size={16}
                  fill="currentColor"
                  className="group-hover:scale-110 transition-transform"
                />
                <span>
                  Sign & Execute{" "}
                  {selectedCount > 0 ? `(${selectedCount} Actions)` : ""}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    portalRoot,
  );
};

export default OptimizationDrawer;
