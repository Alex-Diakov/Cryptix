import React from "react";
import { Layers } from "lucide-react";

export const DepthLightingSection: React.FC = () => {
  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between border-b border-strong pb-3">
        <div className="flex items-center gap-3">
          <Layers className="text-warning" size={24} />
          <h2 className="text-lg font-black text-content uppercase tracking-[0.2em]">
            04. Depth & Lighting
          </h2>
        </div>
        <span className="text-xs font-mono text-content-secondary">Box Shadows & Glows</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-background-card p-6 rounded-2xl shadow-sm border border-subtle flex flex-col justify-between h-32">
          <p className="text-content text-base font-black">Shadow SM</p>
          <p className="text-xs font-mono font-bold text-info">shadow-sm</p>
        </div>
        <div className="bg-background-card p-6 rounded-2xl shadow-md border border-subtle flex flex-col justify-between h-32">
          <p className="text-content text-base font-black">Shadow MD</p>
          <p className="text-xs font-mono font-bold text-info">shadow-md</p>
        </div>
        <div className="bg-background-card p-6 rounded-2xl shadow-lg border border-subtle flex flex-col justify-between h-32">
          <p className="text-content text-base font-black">Shadow LG</p>
          <p className="text-xs font-mono font-bold text-info">shadow-lg</p>
        </div>
        <div className="bg-background-card p-6 rounded-2xl shadow-xl border border-subtle flex flex-col justify-between h-32">
          <p className="text-content text-base font-black">Shadow XL</p>
          <p className="text-xs font-mono font-bold text-info">shadow-xl</p>
        </div>
        <div className="bg-background-card p-6 rounded-2xl shadow-2xl border border-subtle flex flex-col justify-between h-32">
          <p className="text-content text-base font-black">Shadow 2XL</p>
          <p className="text-xs font-mono font-bold text-info">shadow-2xl</p>
        </div>
        <div className="bg-background-card p-6 rounded-2xl shadow-glass border border-subtle flex flex-col justify-between h-32">
          <p className="text-content text-base font-black">Shadow Glass</p>
          <p className="text-xs font-mono font-bold text-info">shadow-glass</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
         <div className="bg-background-card p-8 rounded-2xl shadow-glow-sm border border-primary-subtle flex flex-col justify-between h-36">
          <p className="text-primary text-base font-black">Primary Glow SM</p>
          <p className="text-xs font-mono font-bold text-info">shadow-glow-sm</p>
        </div>
        <div className="bg-background-card p-8 rounded-2xl shadow-glow border border-primary-subtle flex flex-col justify-between h-36">
          <p className="text-primary text-base font-black">Primary Glow</p>
          <p className="text-xs font-mono font-bold text-info">shadow-glow</p>
        </div>
        <div className="bg-background-card p-8 rounded-2xl shadow-glow-purple border border-secondary-subtle flex flex-col justify-between h-36">
          <p className="text-secondary text-base font-black">Secondary Glow</p>
          <p className="text-xs font-mono font-bold text-info">shadow-glow-purple</p>
        </div>
        <div className="bg-background-card p-8 rounded-2xl shadow-glow-rose border border-destructive-subtle flex flex-col justify-between h-36">
          <p className="text-destructive text-base font-black">Destructive Glow</p>
          <p className="text-xs font-mono font-bold text-info">shadow-glow-rose</p>
        </div>
      </div>
    </section>
  );
};
