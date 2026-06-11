import React from "react";
import { MousePointerClick, Plus } from "lucide-react";

export const ButtonsSection: React.FC = () => {
  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between border-b border-strong pb-3">
        <div className="flex items-center gap-3">
          <MousePointerClick className="text-primary" size={24} />
          <h2 className="text-lg font-black text-content uppercase tracking-[0.2em]">
            07. Buttons & Actions
          </h2>
        </div>
        <span className="text-xs font-mono text-content-secondary">
          Interaction States & Variants
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Primary Variants */}
        <div className="surface-group p-8 space-y-8">
          <h3 className="text-sm font-black text-content uppercase tracking-widest border-b border-subtle pb-4">Primary Button States</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 items-center gap-4">
               <div>
                 <p className="text-content font-bold text-sm">Default</p>
                 <p className="text-[10px] font-mono text-info">.btn-primary</p>
               </div>
               <button className="btn-primary py-3 px-4 w-full text-sm">Execute</button>
            </div>
            
            <div className="grid grid-cols-2 items-center gap-4">
               <div>
                 <p className="text-content font-bold text-sm">Hover State</p>
                 <p className="text-[10px] font-mono text-info">hover:bg-primary-hover</p>
               </div>
               <button className="btn-primary bg-primary-hover py-3 px-4 w-full text-sm">Execute</button>
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
               <div>
                 <p className="text-content font-bold text-sm">Active State</p>
                 <p className="text-[10px] font-mono text-info">active:bg-primary-active</p>
               </div>
               <button className="btn-primary bg-primary-active py-3 px-4 w-full text-sm scale-95 transition-transform duration-75">Execute</button>
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
               <div>
                 <p className="text-content-secondary font-bold text-sm">Disabled</p>
                 <p className="text-[10px] font-mono text-content-tertiary">disabled / opacity-50</p>
               </div>
               <button className="btn-primary opacity-50 cursor-not-allowed py-3 px-4 w-full text-sm" disabled>Execute</button>
            </div>
          </div>
        </div>

        {/* Secondary Variants */}
        <div className="surface-group p-8 space-y-8">
          <h3 className="text-sm font-black text-content uppercase tracking-widest border-b border-subtle pb-4">Secondary Button States</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 items-center gap-4">
               <div>
                 <p className="text-content font-bold text-sm">Default</p>
                 <p className="text-[10px] font-mono text-info">.btn-secondary</p>
               </div>
               <button className="btn-secondary py-3 px-4 w-full text-sm">Cancel</button>
            </div>
            
            <div className="grid grid-cols-2 items-center gap-4">
               <div>
                 <p className="text-content font-bold text-sm">Hover State</p>
                 <p className="text-[10px] font-mono text-info">hover:bg-zinc-700</p>
               </div>
               <button className="btn-secondary bg-zinc-700 py-3 px-4 w-full text-sm">Cancel</button>
            </div>

             <div className="grid grid-cols-2 items-center gap-4">
               <div>
                 <p className="text-content font-bold text-sm">Active State</p>
                 <p className="text-[10px] font-mono text-info">active:bg-zinc-900</p>
               </div>
               <button className="btn-secondary bg-zinc-900 py-3 px-4 w-full text-sm scale-95 transition-transform duration-75">Cancel</button>
            </div>

             <div className="grid grid-cols-2 items-center gap-4">
               <div>
                 <p className="text-content-secondary font-bold text-sm">Disabled</p>
                 <p className="text-[10px] font-mono text-content-tertiary">disabled / opacity-50</p>
               </div>
               <button className="btn-secondary opacity-50 cursor-not-allowed py-3 px-4 w-full text-sm" disabled>Cancel</button>
            </div>
          </div>
        </div>

        {/* Other Variants */}
        <div className="surface-group p-8 space-y-8 md:col-span-2">
          <h3 className="text-sm font-black text-content uppercase tracking-widest border-b border-subtle pb-4">Semantic & Sizing</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="space-y-4">
                <div>
                   <p className="text-content font-bold text-sm">Destructive Action</p>
                   <p className="text-[10px] font-mono text-info">Tailwind overrides</p>
                </div>
                <button className="btn-primary bg-destructive hover:bg-destructive-hover text-white py-3 px-4 w-full text-sm">Delete Wallet</button>
             </div>

             <div className="space-y-4">
                <div>
                   <p className="text-content font-bold text-sm">Ghost / Text Utility</p>
                   <p className="text-[10px] font-mono text-info">hover:bg-white/5</p>
                </div>
                <button className="text-content font-medium py-3 px-4 w-full rounded-lg hover:bg-white/5 disabled:opacity-50 transition-colors text-sm">Skip Tutorial</button>
             </div>

             <div className="space-y-4">
                <div>
                   <p className="text-content font-bold text-sm">Action With Icon</p>
                   <p className="text-[10px] font-mono text-info">flex items-center gap-2</p>
                </div>
                <button className="btn-primary py-3 px-4 w-full flex items-center justify-center gap-2 text-sm">
                  <Plus size={16} /> Add Liquidity
                </button>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};
