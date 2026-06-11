import React from "react";
import { Zap } from "lucide-react";

export const AnimationPhysicsSection: React.FC = () => {
  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between border-b border-strong pb-3">
        <div className="flex items-center gap-3">
          <Zap className="text-secondary" size={24} />
          <h2 className="text-lg font-black text-content uppercase tracking-[0.2em]">
            05. Animation Physics
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="surface-group p-8 flex flex-col items-center justify-center text-center animate-pulse-slow h-40">
          <p className="text-content text-base font-black">Pulse Slow</p>
          <p className="text-xs font-mono font-bold text-info mt-2">animate-pulse-slow</p>
        </div>
        <div className="surface-group p-8 flex flex-col items-center justify-center text-center animate-bounce-soft h-40">
          <p className="text-content text-base font-black">Bounce Soft</p>
          <p className="text-xs font-mono font-bold text-info mt-2">animate-bounce-soft</p>
        </div>
        <div className="surface-group p-8 flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform cursor-pointer h-40">
          <p className="text-content text-base font-black">Hover Lift UI</p>
          <p className="text-xs font-mono font-bold text-info mt-2">hover:-translate-y-2</p>
        </div>
        <div className="surface-group p-8 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform cursor-pointer h-40">
          <p className="text-content text-base font-black">Hover Scale</p>
          <p className="text-xs font-mono font-bold text-info mt-2">hover:scale-105</p>
        </div>
        
        <div className="surface-group p-8 flex flex-col items-center justify-center text-center active:scale-95 transition-transform cursor-pointer h-40">
           <p className="text-content text-base font-black">Active Press</p>
          <p className="text-xs font-mono font-bold text-info mt-2">active:scale-95</p>
        </div>
        <div className="surface-group p-8 flex flex-col items-center justify-center text-center animate-fade-in h-40">
           <p className="text-content text-base font-black">Fade In</p>
          <p className="text-xs font-mono font-bold text-info mt-2">animate-fade-in</p>
        </div>
        <div className="surface-group p-8 flex flex-col items-center justify-center text-center animate-zoom-in h-40">
           <p className="text-content text-base font-black">Zoom In</p>
          <p className="text-xs font-mono font-bold text-info mt-2">animate-zoom-in</p>
        </div>
         <div className="surface-group p-8 flex flex-col items-center justify-center text-center animate-slide-up h-40">
           <p className="text-content text-base font-black">Slide Up</p>
          <p className="text-xs font-mono font-bold text-info mt-2">animate-slide-up</p>
        </div>
      </div>
    </section>
  );
};
