import React, { useState } from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";

const QuickSwap: React.FC = () => {
  const [amount, setAmount] = useState("0.15");
  const USDC_ICON = "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035";
  const ETH_ICON = "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035";

  return (
    <div className="surface-modal p-6 md:p-8 h-full flex flex-col justify-between">
      <div className="space-y-2 flex-1 flex flex-col justify-center relative">
        {/* Pay Section - Level 2 Group */}
        <div className="surface-group p-5 relative group focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black text-content-secondary uppercase tracking-[0.1em]">
              You Pay
            </span>
            <div className="text-[10px] text-content-tertiary font-bold uppercase tracking-widest">
              Balance: <span className="font-mono text-content-secondary">340,000.00</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-3xl font-mono font-bold text-content focus:outline-none w-full min-w-0"
              placeholder="0.00"
            />
            <button className="flex items-center space-x-2 bg-background-elevated border border-strong px-3 py-2 rounded-xl hover:bg-zinc-700 transition-colors shrink-0 shadow-sm">
              <div className="w-6 h-6 rounded-full bg-[#627EEA] border border-subtle flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={ETH_ICON}
                  alt="ETH"
                  className="w-full h-full object-contain p-[2px]"
                />
              </div>
              <span className="text-sm font-bold text-content">ETH</span>
              <ChevronDown size={16} className="text-content-tertiary" />
            </button>
          </div>
        </div>

        {/* Swap Divider Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full flex justify-center pointer-events-none">
          <button className="w-12 h-12 bg-background border border-strong rounded-full flex items-center justify-center text-content-secondary hover:text-primary hover:border-primary transition-all shadow-lg ring-4 ring-background-card group pointer-events-auto">
            <ArrowUpDown
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
        </div>

        {/* Receive Section - Level 2 Group */}
        <div className="surface-group p-5 relative group focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black text-content-secondary uppercase tracking-[0.1em]">
              You Receive
            </span>
            <div className="text-[10px] text-content-tertiary font-bold uppercase tracking-widest">
              Balance: <span className="font-mono text-content-secondary">2,500.00</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4">
            <input
              type="text"
              placeholder="0.00"
              className="bg-transparent text-3xl font-mono font-bold text-content focus:outline-none w-full min-w-0"
              readOnly
              value={(parseFloat(amount || "0") * 3208.93).toLocaleString(
                "en-US",
                { minimumFractionDigits: 2, maximumFractionDigits: 2 },
              )}
            />
            <button className="flex items-center space-x-2 bg-background-elevated border border-strong px-3 py-2 rounded-xl hover:bg-zinc-700 transition-colors shrink-0 shadow-sm">
              <div className="w-6 h-6 rounded-full bg-[#2775CA] border border-subtle flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={USDC_ICON}
                  alt="USDC"
                  className="w-full h-full object-contain p-[2px]"
                />
              </div>
              <span className="text-sm font-bold text-content">USDC</span>
              <ChevronDown size={16} className="text-content-tertiary" />
            </button>
          </div>
        </div>
      </div>

      <button className="mt-8 btn-primary w-full py-4 text-xs tracking-[0.2em] uppercase rounded-xl shadow-glow-sm">
        Visualize Route
      </button>
    </div>
  );
};

export default QuickSwap;
