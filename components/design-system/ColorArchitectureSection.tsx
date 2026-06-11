import React from "react";
import { Palette } from "lucide-react";

export const ColorArchitectureSection: React.FC = () => {
  return (
    <section className="space-y-10">
      <div className="flex items-end justify-between border-b border-strong pb-3">
        <div className="flex items-center gap-3">
          <Palette className="text-primary" size={24} />
          <h2 className="text-lg font-black text-content uppercase tracking-[0.2em]">
            02. Color Architecture
          </h2>
        </div>
        <span className="text-xs font-mono text-content-secondary">
          Theme Semantic Colors & Surfaces
        </span>
      </div>

      {/* Semantic Colors */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {[
          { name: "Primary", token: "bg-primary", val: "#10b981", hover: "bg-primary-hover", subtle: "bg-primary-subtle" },
          { name: "Secondary", token: "bg-secondary", val: "#a855f7", hover: "bg-secondary-hover", subtle: "bg-secondary-subtle" },
          { name: "Destructive", token: "bg-destructive", val: "#f43f5e", hover: "bg-destructive-hover", subtle: "bg-destructive-subtle" },
          { name: "Warning", token: "bg-warning", val: "#f59e0b", hover: "bg-warning-hover", subtle: "bg-warning-subtle" },
          { name: "Info", token: "bg-info", val: "#3b82f6", hover: "bg-info-hover", subtle: "bg-info-subtle" },
        ].map((color) => (
          <div key={color.name} className="space-y-4">
            <div className={`h-24 rounded-2xl ${color.token} shadow-lg flex flex-col justify-end p-3 relative group overflow-hidden`}>
              <div className={`absolute inset-0 ${color.hover} opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end p-2`}>
                 <span className="text-[10px] font-bold text-black uppercase bg-white/50 px-1 rounded">Hover</span>
              </div>
              <span className="text-xs font-mono text-black font-bold relative z-10 bg-white/50 w-max px-1 rounded">{color.val}</span>
            </div>
            <div>
              <p className="text-content text-sm font-bold uppercase tracking-wide">{color.name}</p>
              <div className="flex flex-col gap-1 mt-2">
                <p className="text-info text-xs font-mono font-bold">{color.token}</p>
                <p className="text-content-secondary text-[10px] font-mono">{color.hover}</p>
                <p className="text-content-secondary text-[10px] font-mono">{color.subtle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Backgrounds */}
      <div className="pt-8 border-t border-subtle">
        <p className="text-sm font-black text-content uppercase tracking-[0.1em] mb-6">
          Backgrounds & Surfaces
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: "background", hex: "#050507", desc: "Base layer" },
            { name: "background-subtle", hex: "#050505", desc: "Deepest layer" },
            { name: "background-card", hex: "#09090b", desc: "Widgets/Cards" },
            { name: "background-surface", hex: "#0a0a0a", desc: "Modals/Dropdowns" },
            { name: "background-input", hex: "#18181b", desc: "Forms/Textfields" },
            { name: "background-elevated", hex: "#1a1a1a", desc: "Hover states/Toggles" },
          ].map((bg) => (
            <div key={bg.name} className="space-y-3">
              <div className={`h-28 bg-${bg.name} border border-strong rounded-2xl p-4 flex flex-col justify-end shadow-lg transition-transform hover:-translate-y-1`}>
                <span className="text-xs font-mono text-content font-bold bg-black/50 w-max px-1 rounded">{bg.hex}</span>
              </div>
              <div>
                <span className="text-xs font-mono text-info font-bold block mb-1">bg-{bg.name}</span>
                <span className="text-[11px] font-sans text-content-secondary line-clamp-2 leading-tight">{bg.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
