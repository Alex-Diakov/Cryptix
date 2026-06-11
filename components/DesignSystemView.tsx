import React from "react";
import {
  LayoutTemplate,
  Palette,
  Type,
  Layers,
  Box,
  Zap,
  MousePointerClick,
  CircleDashed
} from "lucide-react";

/**
 * ============================================================================
 * DESIGN SYSTEM VIEW
 * Single-file implementation identical to index.css architecture.
 * ============================================================================
 */
const DesignSystemView: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto relative bg-background-subtle scrollbar-hide p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-20 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* HEADER */}
        <div className="border-b border-strong pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-background-card rounded-2xl border border-strong shadow-lg">
              <LayoutTemplate className="text-primary" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-content tracking-tight uppercase">
                UI Design System <span className="text-primary">Core</span>
              </h1>
              <p className="text-content-secondary text-sm font-mono mt-2 uppercase tracking-widest">
                Source of Truth • Consistent with index.css
              </p>
            </div>
          </div>
        </div>

        {/* --- 01. TYPOGRAPHY SYSTEM --- */}
        <section className="space-y-8">
          <div className="flex items-end justify-between border-b border-strong pb-3">
            <div className="flex items-center gap-3">
              <Type className="text-info" size={24} />
              <h2 className="text-lg font-black text-content uppercase tracking-[0.2em]">
                01. Typography System
              </h2>
            </div>
            <span className="text-xs font-mono text-content-secondary">
              Inter (sans) & JetBrains Mono (mono)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              {[
                { size: "6xl", token: "text-6xl", details: "60px / tracking:-0.04em / leading:1" },
                { size: "5xl", token: "text-5xl", details: "48px / tracking:-0.04em / leading:1" },
                { size: "4xl", token: "text-4xl", details: "36px / tracking:-0.04em / leading:40px" },
                { size: "3xl", token: "text-3xl", details: "30px / tracking:-0.03em / leading:36px" },
                { size: "2xl", token: "text-2xl", details: "24px / tracking:-0.03em / leading:32px" },
                { size: "xl", token: "text-xl", details: "20px / tracking:-0.02em / leading:28px" },
                { size: "lg", token: "text-lg", details: "18px / tracking:-0.02em / leading:28px" },
                { size: "base", token: "text-base", details: "16px / tracking:-0.01em / leading:24px" },
                { size: "sm", token: "text-sm", details: "14px / tracking:-0.01em / leading:20px" },
                { size: "xs", token: "text-xs", details: "12px / tracking:0 / leading:16px" },
                { size: "2xs", token: "text-2xs", details: "10px / tracking:0.025em / leading:14px" },
                { size: "3xs", token: "text-3xs", details: "9px / tracking:0.05em / leading:12px" },
              ].map((font, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-subtle pb-4">
                   <div className={`font-sans text-content font-bold ${font.token}`}>
                     Heading {font.size}
                   </div>
                   <div className="text-right flex flex-col">
                     <span className="text-sm font-bold font-mono text-info">{font.token}</span>
                     <span className="text-xs font-mono text-content-secondary">{font.details}</span>
                   </div>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div className="surface-group p-8 space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-content-secondary uppercase tracking-widest">
                      Mono Data (JetBrains)
                    </span>
                    <span className="text-xs font-mono text-info font-bold">font-mono</span>
                  </div>
                  <div className="text-4xl font-mono font-medium text-content bg-background-elevated p-4 rounded-xl border border-strong">
                    $1,240,500.00
                  </div>
                </div>
                <div>
                   <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-content-secondary uppercase tracking-widest">
                      Text Gradient Utility
                    </span>
                    <span className="text-xs font-mono text-info font-bold">text-gradient</span>
                  </div>
                  <div className="text-3xl font-black text-gradient bg-background-elevated p-4 rounded-xl border border-strong">
                    Supercharged AI
                  </div>
                </div>
              </div>

              <div className="bg-background-card p-8 rounded-2xl border border-strong">
                  <h3 className="text-lg font-bold text-content mb-4 tracking-tight">Content Hierarchy & Contrast</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-content font-medium text-base">text-content: Pure White / Absolute clarity / Primary actions & headings.</p>
                      <p className="text-xs font-mono text-info mt-1">var(--color-content) / text-content</p>
                    </div>
                    <div>
                      <p className="text-content-secondary text-base">text-content-secondary: Zinc 400 / Structural text / Descriptions and secondary reads.</p>
                      <p className="text-xs font-mono text-info mt-1">var(--color-content-secondary) / text-content-secondary</p>
                    </div>
                    <div>
                      <p className="text-content-tertiary text-base">text-content-tertiary: Zinc 600 / Dimmed information / Metadata, placeholders, disabled states.</p>
                      <p className="text-xs font-mono text-info mt-1">var(--color-content-tertiary) / text-content-tertiary</p>
                    </div>
                     <div>
                      <p className="text-content-muted text-base">text-content-muted: Zinc 700 / Extremely subtle / Watermarks and background text.</p>
                      <p className="text-xs font-mono text-info mt-1">var(--color-content-muted) / text-content-muted</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 02. COLOR PALETTE ARCHITECTURE --- */}
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

        {/* --- 03. RADIUS --- */}
         <section className="space-y-8">
          <div className="flex items-end justify-between border-b border-strong pb-3">
            <div className="flex items-center gap-3">
              <CircleDashed className="text-success" size={24} />
              <h2 className="text-lg font-black text-content uppercase tracking-[0.2em]">
                03. Shape & Radius
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {[
              { val: "lg", size: "0.5rem" },
              { val: "xl", size: "0.75rem" },
              { val: "2xl", size: "1rem" },
              { val: "3xl", size: "1.5rem" },
              { val: "4xl", size: "2rem" },
              { val: "5xl", size: "2.5rem" },
              { val: "full", size: "9999px" },
            ].map((r) => (
              <div key={r.val} className="flex flex-col items-center space-y-4">
                 <div className={`w-20 h-20 bg-background-elevated border border-strong shadow-lg rounded-${r.val} flex items-center justify-center`}>
                    <span className="text-xs font-mono text-content-secondary">{r.size}</span>
                 </div>
                 <div className="text-center">
                    <div className="text-xs font-mono font-bold text-info">rounded-{r.val}</div>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- 04. DEPTH & EFFECTS --- */}
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

        {/* --- 05. ANIMATION PHYSICS --- */}
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

        {/* --- HIGHER ORDER COMPONENTS --- */}
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

      </div>
    </div>
  );
};

export default DesignSystemView;

