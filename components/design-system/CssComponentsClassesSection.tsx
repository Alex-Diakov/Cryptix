import React from "react";
import { Box, MousePointerClick } from "lucide-react";

export const CssComponentsClassesSection: React.FC = () => {
  return (
    <section className="space-y-8">
       <div className="flex items-end justify-between border-b border-strong pb-3">
        <div className="flex items-center gap-3">
          <Box className="text-content" size={24} />
          <h2 className="text-lg font-black text-content uppercase tracking-[0.2em]">
            06. CSS Components Classes
          </h2>
        </div>
        <span className="text-xs font-mono text-content-secondary">
          @layer components defined in index.css
        </span>
      </div>

      {/* Panels & Surfaces */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-panel p-8 min-h-[200px] flex flex-col justify-end">
          <span className="text-xs font-mono text-info font-bold mb-1">.glass-panel</span>
          <span className="text-content text-lg font-black tracking-tight">Level 1 Container</span>
          <span className="text-content-secondary text-sm mt-2 leading-relaxed">
            Primary application shell. Uses large rounding (5xl), heavy shadow (2xl), and strong blur.
          </span>
        </div>
        
        <div className="surface-modal p-8 min-h-[200px] flex flex-col justify-end border border-strong rounded-2xl bg-background-card">
          <span className="text-xs font-mono text-info font-bold mb-1">.surface-modal</span>
          <span className="text-content text-lg font-black tracking-tight">Level 1.5 Modals</span>
          <span className="text-content-secondary text-sm mt-2 leading-relaxed">
            Floating panels and dialogs. Solid colored to ensure contrast over complex backgrounds.
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <div className="surface-group p-6 flex-1 flex flex-col justify-center border border-strong rounded-xl">
            <span className="text-xs font-mono text-info font-bold mb-1">.surface-group</span>
            <span className="text-content font-bold">Level 2 Inset Group</span>
            <span className="text-content-secondary text-xs mt-1">For visual grouping inside panels.</span>
          </div>
          <div className="surface-interactive p-6 flex-1 flex flex-col justify-center border border-transparent rounded-lg cursor-pointer group">
             <span className="text-xs font-mono text-info font-bold mb-1 group-hover:text-primary transition-colors">.surface-interactive</span>
            <span className="text-content font-bold">Level 3 List Items</span>
            <span className="text-content-secondary text-xs mt-1">Hover states for interactive rows.</span>
          </div>
        </div>
      </div>

      {/* Interactive Elements */}
      <div className="surface-group p-8 mt-12 border border-strong rounded-2xl">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-subtle">
          <MousePointerClick size={20} className="text-content" />
          <h3 className="text-sm font-black text-content uppercase tracking-[0.1em]">
            Base Interactive Primitives
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-end">
          <div className="space-y-4">
             <div>
                <label className="text-xs font-bold text-content uppercase tracking-widest block">Primary Button</label>
                <label className="text-xs font-mono text-info font-bold mt-1 block">.btn-primary</label>
             </div>
            <button className="btn-primary w-full py-4 px-6 flex items-center justify-center gap-2 text-sm">
              Execute Trade
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
               <label className="text-xs font-bold text-content uppercase tracking-widest block">Secondary Button</label>
               <label className="text-xs font-mono text-info font-bold mt-1 block">.btn-secondary</label>
            </div>
            <button className="btn-secondary w-full py-4 px-6 flex items-center justify-center gap-2 text-sm">
              Cancel Order
            </button>
          </div>
          
          <div className="space-y-4 lg:col-span-1 md:col-span-2">
             <div>
               <label className="text-xs font-bold text-content uppercase tracking-widest block">Base Input</label>
               <label className="text-xs font-mono text-info font-bold mt-1 block">.input-base</label>
             </div>
            <input 
              type="text" 
              className="input-base w-full py-4 px-6 text-sm" 
              placeholder="Enter token amount..."
            />
          </div>
        </div>
      </div>
    </section>
  );
};
