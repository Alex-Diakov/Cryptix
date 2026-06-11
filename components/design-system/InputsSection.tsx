import React from "react";
import { Keyboard, Search, AlertCircle, CheckCircle2 } from "lucide-react";

export const InputsSection: React.FC = () => {
  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between border-b border-strong pb-3">
        <div className="flex items-center gap-3">
          <Keyboard className="text-secondary" size={24} />
          <h2 className="text-lg font-black text-content uppercase tracking-[0.2em]">
            08. Input Components
          </h2>
        </div>
        <span className="text-xs font-mono text-content-secondary">
          Form Elements & States
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border border-strong rounded-2xl p-8 bg-background-card">
        {/* Left Column - Standard Inputs */}
        <div className="space-y-8">
          <div className="space-y-3">
             <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-content">Default Input</label>
                <span className="text-[10px] font-mono text-info">.input-base</span>
             </div>
             <input type="text" className="input-base w-full py-3 px-4 text-sm" placeholder="Enter amount..." />
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-content">Focus / Active State</label>
                <span className="text-[10px] font-mono text-info">focus-visible:ring-active</span>
             </div>
             <input type="text" className="input-base w-full py-3 px-4 text-sm border-active ring-1 ring-active outline-none" placeholder="Entering amount..." defaultValue="1,000.00" />
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-content-secondary">Disabled State</label>
                <span className="text-[10px] font-mono text-content-tertiary">disabled attr</span>
             </div>
             <input type="text" className="input-base w-full py-3 px-4 text-sm opacity-50 cursor-not-allowed bg-background-subtle border-subtle text-content-tertiary" placeholder="Not allowed" disabled value="Read only user ID: 5910" />
          </div>
        </div>

        {/* Right Column - Complex Inputs */}
        <div className="space-y-8">
          <div className="space-y-3">
             <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-content">With Icon (Left)</label>
                <span className="text-[10px] font-mono text-info">relative absolute pl-10</span>
             </div>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-content-secondary" size={16} />
                <input type="text" className="input-base w-full py-3 pl-10 pr-4 text-sm" placeholder="Search token symbols..." />
             </div>
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-destructive">Error Validation State</label>
                <span className="text-[10px] font-mono text-destructive">border-destructive ring</span>
             </div>
             <div className="relative">
                <input type="text" className="input-base w-full py-3 pr-10 pl-4 text-sm border-destructive ring-1 ring-destructive/50 text-destructive placeholder:text-destructive/50" placeholder="0.00" defaultValue="abcd" />
                <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive" size={16} />
             </div>
             <p className="text-[10px] font-mono text-destructive tracking-tight">Error: Invalid integer format</p>
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-primary">Success Validation State</label>
                <span className="text-[10px] font-mono text-primary">border-primary ring</span>
             </div>
             <div className="relative">
                <input type="text" className="input-base w-full py-3 pr-10 pl-4 text-sm border-primary ring-1 ring-primary/50 text-primary" placeholder="0.00" defaultValue="0x71C...4f92" />
                <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-primary" size={16} />
             </div>
             <p className="text-[10px] font-mono text-primary tracking-tight">Success: Address signature verified</p>
          </div>

        </div>
      </div>
    </section>
  );
};
