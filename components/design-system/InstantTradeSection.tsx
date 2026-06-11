import React from "react";
import { ArrowUpDown, ChevronDown, Repeat } from "lucide-react";

export const InstantTradeSection: React.FC = () => {
  const USDC_ICON = "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035";
  const ETH_ICON = "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035";

  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between border-b border-strong pb-3">
        <div className="flex items-center gap-3">
          <Repeat className="text-secondary" size={24} />
          <h2 className="text-lg font-black text-content uppercase tracking-[0.2em]">
            09. Instant Trade (QuickSwap)
          </h2>
        </div>
        <span className="text-xs font-mono text-content-secondary">
          Structural Architecture & Components
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Visual Showcase */}
        <div>
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
                      defaultValue="0.15"
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
                      value="481.33"
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
        </div>

        {/* Documentation / Logic */}
        <div className="bg-background-card p-8 rounded-2xl border border-strong space-y-8">
           <h3 className="text-xl font-bold text-content tracking-tight">Component Architecture</h3>
           
           <div className="space-y-6">
              <div>
                 <p className="text-content font-bold mb-1 flex items-center gap-2">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-black border border-strong text-[10px]">1</span>
                    Level 1.5 Modal Container
                 </p>
                 <p className="text-sm text-content-secondary">
                    The outermost wrapper uses <code className="text-info font-mono text-xs">.surface-modal</code>. This solidifies the background, preventing complex backgrounds from interfering with legibility.
                 </p>
              </div>

              <div className="pl-6 border-l border-subtle space-y-6">
                 <div>
                    <p className="text-content font-bold mb-1 flex items-center gap-2">
                       <span className="w-5 h-5 rounded flex items-center justify-center bg-zinc-900 border border-strong text-[10px]">2</span>
                       Interaction Groups
                    </p>
                    <p className="text-sm text-content-secondary">
                       The "You Pay" and "You Receive" blocks use <code className="text-info font-mono text-xs">.surface-group</code>. When focused, they glow with <code className="text-info font-mono text-xs">focus-within:ring-primary/50</code>.
                    </p>
                 </div>

                 <div className="pl-6 border-l border-subtle space-y-6">
                    <div>
                       <p className="text-content font-bold mb-1">Inputs</p>
                       <p className="text-sm text-content-secondary">
                          Inputs are completely <code className="text-info font-mono text-xs">bg-transparent</code> without borders. The surrounding <code className="text-info font-mono text-xs">.surface-group</code> acts as the bounds.
                       </p>
                    </div>
                    <div>
                       <p className="text-content font-bold mb-1">Token Selectors</p>
                       <p className="text-sm text-content-secondary">
                          Nested buttons use <code className="text-info font-mono text-xs">bg-background-elevated</code>, providing a slight pop against the <code className="text-info font-mono text-xs">.surface-group</code> background.
                       </p>
                    </div>
                 </div>
              </div>

              <div>
                 <p className="text-content font-bold mb-1 flex items-center gap-2">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-background border border-strong text-[10px] text-primary z-10">±</span>
                    Divider Icon
                 </p>
                 <p className="text-sm text-content-secondary">
                    Positioned absolutely dead-center with a thick <code className="text-info font-mono text-xs">ring-4 ring-background-card</code> to cut through the gap between the two interaction groups seamlessly.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
