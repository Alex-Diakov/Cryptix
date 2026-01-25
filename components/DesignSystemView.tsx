
import React from 'react';
import { 
  Palette, 
  Type, 
  MousePointerClick, 
  Shield, 
  LayoutTemplate, 
  Loader2, 
  Ban,
  ShieldCheck,
  Grid,
  Star,
  CheckCircle,
  XCircle,
  Bot,
  ArrowLeftRight,
  BarChart2,
  Zap,
  Activity,
  Globe,
  Cpu,
  Layers,
  Wifi,
  Server,
  Command,
  Hash,
  LayoutList,
  LayoutGrid
} from 'lucide-react';

const DesignSystemView: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto relative bg-[#050505] scrollbar-hide p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-20 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* HEADER */}
        <div className="border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-zinc-900 rounded-xl border border-white/10">
               <LayoutTemplate className="text-zinc-400" size={24} />
            </div>
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight uppercase">Cryptix Design System <span className="text-emerald-500">v4.1</span></h1>
                <p className="text-zinc-500 text-xs font-mono mt-1 uppercase tracking-widest">
                    Utility-First Architecture • Color Audit Complete
                </p>
            </div>
          </div>
        </div>

        {/* SECTION 1: TOKENS */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Palette className="text-emerald-500" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">01. Semantic Palette</h2>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">Contextual Color Application</span>
            </div>

            {/* 1A: COLOR SYSTEM AUDIT */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                
                {/* Primary */}
                <div className="space-y-3 group">
                    <div className="h-20 rounded-2xl bg-emerald-500 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] border border-emerald-400/20 group-hover:scale-[1.02] transition-transform"></div>
                    <div className="px-1 space-y-1">
                        <p className="text-white text-xs font-bold uppercase tracking-wide">Primary (Success)</p>
                        <p className="text-zinc-500 text-[10px] font-mono">emerald-500</p>
                        <p className="text-zinc-600 text-[10px]">Buy, Long, Profit, Active</p>
                    </div>
                </div>

                {/* Secondary */}
                <div className="space-y-3 group">
                    <div className="h-20 rounded-2xl bg-purple-500 shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] border border-purple-400/20 group-hover:scale-[1.02] transition-transform"></div>
                    <div className="px-1 space-y-1">
                        <p className="text-white text-xs font-bold uppercase tracking-wide">Secondary (AI)</p>
                        <p className="text-zinc-500 text-[10px] font-mono">purple-500</p>
                        <p className="text-zinc-600 text-[10px]">Strategy, Admin, Bot</p>
                    </div>
                </div>

                {/* Destructive */}
                <div className="space-y-3 group">
                    <div className="h-20 rounded-2xl bg-rose-500 shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)] border border-rose-400/20 group-hover:scale-[1.02] transition-transform"></div>
                    <div className="px-1 space-y-1">
                        <p className="text-white text-xs font-bold uppercase tracking-wide">Destructive (Error)</p>
                        <p className="text-zinc-500 text-[10px] font-mono">rose-500</p>
                        <p className="text-zinc-600 text-[10px]">Sell, Short, Loss, Stop</p>
                    </div>
                </div>

                {/* Warning */}
                <div className="space-y-3 group">
                    <div className="h-20 rounded-2xl bg-amber-500 shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)] border border-amber-400/20 group-hover:scale-[1.02] transition-transform"></div>
                    <div className="px-1 space-y-1">
                        <p className="text-white text-xs font-bold uppercase tracking-wide">Caution (Warning)</p>
                        <p className="text-zinc-500 text-[10px] font-mono">amber-500</p>
                        <p className="text-zinc-600 text-[10px]">Pending, High Slippage</p>
                    </div>
                </div>

                {/* Info / Action */}
                <div className="space-y-3 group">
                    <div className="h-20 rounded-2xl bg-blue-500 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] border border-blue-400/20 group-hover:scale-[1.02] transition-transform"></div>
                    <div className="px-1 space-y-1">
                        <p className="text-white text-xs font-bold uppercase tracking-wide">Info (Action)</p>
                        <p className="text-zinc-500 text-[10px] font-mono">blue-500</p>
                        <p className="text-zinc-600 text-[10px]">Links, Stablecoins, Bridge</p>
                    </div>
                </div>

            </div>
        </section>

        {/* SECTION 2: BASE LAYERS (AUDITED) */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Layers className="text-zinc-500" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">02. Base Layers</h2>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">Monochromatic Depth</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* L0 Canvas */}
                <div className="space-y-3 group">
                    <div className="h-28 rounded-2xl bg-[#050505] border border-white/5 group-hover:scale-[1.02] transition-transform flex items-center justify-center relative overflow-hidden">
                        <span className="text-zinc-800 font-black text-4xl opacity-50 select-none">L0</span>
                    </div>
                    <div className="px-1 space-y-1">
                        <p className="text-white text-xs font-bold uppercase tracking-wide">L0 Canvas</p>
                        <p className="text-zinc-500 text-[10px] font-mono">#050505</p>
                        <p className="text-zinc-600 text-[10px]">App background & negative space.</p>
                    </div>
                </div>

                {/* L1 Surface */}
                <div className="space-y-3 group">
                    <div className="h-28 rounded-2xl bg-[#09090b] border border-white/5 group-hover:scale-[1.02] transition-transform flex items-center justify-center relative overflow-hidden shadow-2xl">
                        <span className="text-zinc-700 font-black text-4xl opacity-50 select-none">L1</span>
                    </div>
                    <div className="px-1 space-y-1">
                        <p className="text-white text-xs font-bold uppercase tracking-wide">L1 Surface</p>
                        <p className="text-zinc-500 text-[10px] font-mono">#09090B</p>
                        <p className="text-zinc-600 text-[10px]">Sidebar, Card containers.</p>
                    </div>
                </div>

                {/* L2 Component */}
                <div className="space-y-3 group">
                    <div className="h-28 rounded-2xl bg-[#18181B] border border-white/10 group-hover:scale-[1.02] transition-transform flex items-center justify-center relative overflow-hidden shadow-inner">
                        <span className="text-zinc-600 font-black text-4xl opacity-50 select-none">L2</span>
                    </div>
                    <div className="px-1 space-y-1">
                        <p className="text-white text-xs font-bold uppercase tracking-wide">L2 Component</p>
                        <p className="text-zinc-500 text-[10px] font-mono">#18181B</p>
                        <p className="text-zinc-600 text-[10px]">Hover states, Nested modules.</p>
                    </div>
                </div>

                {/* L3 Overlay/Stroke */}
                <div className="space-y-3 group">
                    <div className="h-28 rounded-2xl bg-[#27272A] border border-white/10 group-hover:scale-[1.02] transition-transform flex items-center justify-center relative overflow-hidden shadow-inner">
                        <span className="text-zinc-500 font-black text-4xl opacity-50 select-none">L3</span>
                    </div>
                    <div className="px-1 space-y-1">
                        <p className="text-white text-xs font-bold uppercase tracking-wide">L3 Stroke</p>
                        <p className="text-zinc-500 text-[10px] font-mono">#27272A</p>
                        <p className="text-zinc-600 text-[10px]">Borders, Dividers, Inputs.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: TYPOGRAPHY (Was 2) */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Type className="text-blue-500" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">03. Data-First Typography</h2>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">Dual-Font System</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-zinc-900/20 rounded-[2rem] p-8 border border-white/5">
                {/* INTER */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <span className="text-white font-sans text-2xl font-bold">Aa</span>
                        <div className="text-right">
                            <p className="text-zinc-300 font-bold text-sm">Inter</p>
                            <p className="text-zinc-500 text-[10px] uppercase tracking-wider">Human Interface</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-zinc-600 text-[10px] mb-1 font-mono uppercase">Heading 1 / Display</p>
                            <h1 className="text-3xl font-black text-white tracking-tight">Strategy Automation</h1>
                        </div>
                        <div>
                            <p className="text-zinc-600 text-[10px] mb-1 font-mono uppercase">UI Label / Caption</p>
                            <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest">
                                Institutional Grade Execution
                            </p>
                        </div>
                        <div className="p-4 bg-zinc-900/50 rounded-lg border border-white/5">
                            <p className="text-zinc-300 text-sm leading-relaxed">
                                "Used for narrative text, navigation, and labels. Optimized for screen legibility at small sizes."
                            </p>
                        </div>
                    </div>
                </div>

                {/* JETBRAINS MONO */}
                <div className="space-y-6 border-l border-white/5 pl-12 md:pl-8">
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <span className="text-white font-mono text-2xl font-bold">01</span>
                        <div className="text-right">
                            <p className="text-zinc-300 font-mono font-bold text-sm">JetBrains Mono</p>
                            <p className="text-zinc-500 text-[10px] uppercase tracking-wider">Machine Data</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-zinc-600 text-[10px] mb-1 font-mono uppercase">Financial Data</p>
                            <div className="font-mono text-2xl font-bold text-white tracking-tight">
                                $1,240.50 <span className="text-emerald-500 text-lg">+12.4%</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-zinc-600 text-[10px] mb-1 font-mono uppercase">Hash / Address</p>
                            <div className="font-mono text-xs text-zinc-400 bg-black/40 p-2 rounded border border-white/10 w-fit">
                                0x71C...4f92
                            </div>
                        </div>
                        <div className="p-4 bg-zinc-900/50 rounded-lg border border-white/5">
                             <p className="text-zinc-300 text-sm font-mono leading-relaxed">
                                "Ensures tabular alignment. Every digit has equal width. Critical for financial accuracy."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 4: COMPONENTS (BUTTONS) (Was 3) */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <MousePointerClick className="text-purple-500" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">04. Button Anatomy</h2>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {/* Default */}
                <div className="space-y-3 text-center">
                    <button className="w-full py-3 bg-emerald-500 text-black rounded-xl font-black text-[10px] uppercase tracking-[0.1em] shadow-lg shadow-emerald-500/10">
                        Confirm
                    </button>
                    <p className="text-[10px] text-zinc-500 font-mono">State: Default</p>
                </div>
                {/* Hover */}
                <div className="space-y-3 text-center">
                    <button className="w-full py-3 bg-emerald-400 text-black rounded-xl font-black text-[10px] uppercase tracking-[0.1em] shadow-lg shadow-emerald-500/30">
                        Confirm
                    </button>
                    <p className="text-[10px] text-zinc-500 font-mono">State: Hover</p>
                </div>
                {/* Active */}
                <div className="space-y-3 text-center">
                    <button className="w-full py-3 bg-emerald-600 text-black rounded-xl font-black text-[10px] uppercase tracking-[0.1em] scale-95 transform ring-2 ring-emerald-500/50">
                        Confirm
                    </button>
                    <p className="text-[10px] text-zinc-500 font-mono">State: Active</p>
                </div>
                {/* Loading */}
                <div className="space-y-3 text-center">
                    <button className="w-full py-3 bg-emerald-500/80 text-black rounded-xl font-black text-[10px] uppercase tracking-[0.1em] flex items-center justify-center gap-2 cursor-wait">
                        <Loader2 size={12} className="animate-spin" /> Processing
                    </button>
                    <p className="text-[10px] text-zinc-500 font-mono">State: Loading</p>
                </div>
                {/* Disabled */}
                <div className="space-y-3 text-center">
                    <button disabled className="w-full py-3 bg-zinc-800 text-zinc-600 border border-white/5 rounded-xl font-black text-[10px] uppercase tracking-[0.1em] cursor-not-allowed">
                        Insufficient
                    </button>
                    <p className="text-[10px] text-zinc-500 font-mono">State: Disabled</p>
                </div>
                {/* Warning */}
                <div className="space-y-3 text-center">
                    <button className="w-full py-3 bg-amber-500 text-black rounded-xl font-black text-[10px] uppercase tracking-[0.1em] shadow-lg shadow-amber-500/20 hover:bg-amber-400">
                        High Slippage
                    </button>
                    <p className="text-[10px] text-zinc-500 font-mono">State: Warning</p>
                </div>
            </div>
        </section>

        {/* SECTION 5: PATTERNS (Was 4) */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Shield className="text-amber-500" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">05. Governance Patterns</h2>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">B2B Components</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* 3A: Role & Limits */}
                <div className="bg-zinc-900/40 p-8 rounded-[2rem] border border-white/5 space-y-8">
                    <div>
                        <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4">Identity & RBAC</h3>
                        <div className="flex flex-wrap gap-4">
                            <span className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                                [ Admin ]
                            </span>
                            <span className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                [ Senior Trader ]
                            </span>
                            <span className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-zinc-800 text-zinc-500 border border-zinc-700">
                                [ Observer ]
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4">Spend Authority</h3>
                        <div className="flex items-center gap-8">
                            <div className="flex flex-col gap-1">
                                <span className="text-xl font-mono font-bold text-white tracking-tight">$1,000,000</span>
                                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Daily Limit</span>
                            </div>
                            <div className="h-8 w-px bg-white/10"></div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-black text-purple-400 uppercase tracking-widest shadow-purple-500/20 text-shadow-glow py-1">UNLIMITED</span>
                                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Admin Access</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3B: Audit Log Row */}
                <div className="bg-zinc-900/40 p-8 rounded-[2rem] border border-white/5 space-y-6">
                    <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">Immutable Audit Trail</h3>
                    
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-zinc-900 border border-white/5 rounded-xl hover:bg-zinc-800 transition-colors cursor-default group">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 border border-emerald-500/20 group-hover:bg-emerald-500/20">
                                    <ShieldCheck size={16} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <p className="text-xs font-black text-white uppercase tracking-wide">POLICY UPDATE</p>
                                        <span className="text-[8px] font-mono text-zinc-600 px-1 border border-zinc-800 rounded">0x8a...2b</span>
                                    </div>
                                    <p className="text-[10px] font-medium text-zinc-500">Enforced 2FA for Junior Traders</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-zinc-300">Alex M.</p>
                                <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider">2m ago</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-white/5 rounded-xl opacity-60">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500 border border-rose-500/20">
                                    <Ban size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-white uppercase tracking-wide mb-0.5">ACCESS DENIED</p>
                                    <p className="text-[10px] font-medium text-zinc-500">Failed Login Attempt (Russia)</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-zinc-300">System</p>
                                <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider">1h ago</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* SECTION 6: SPACING & GRID */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Grid className="text-blue-400" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">06. Spacing & Layout Grid</h2>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">Spatial System Architecture</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* 6A: SPATIAL SCALE */}
                <div className="bg-zinc-900/40 p-8 rounded-[2rem] border border-white/5 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Base Unit: 4px</h3>
                        <span className="text-[9px] font-mono text-zinc-600">rem-based scaling</span>
                    </div>
                    
                    <div className="space-y-3">
                        {[
                            { name: 'space-1', val: '4px', usage: 'Tight grouping (Icon + Text)' },
                            { name: 'space-2', val: '8px', usage: 'Component internal padding' },
                            { name: 'space-3', val: '12px', usage: 'Related elements gap' },
                            { name: 'space-4', val: '16px', usage: 'Standard padding / Card gap' },
                            { name: 'space-6', val: '24px', usage: 'Section separation' },
                            { name: 'space-8', val: '32px', usage: 'Container padding' },
                            { name: 'space-12', val: '48px', usage: 'Major layout blocks' },
                        ].map((token) => (
                            <div key={token.name} className="flex items-center gap-4 group">
                                <div className="w-12 text-right">
                                    <span className="text-[10px] font-mono font-bold text-zinc-400">{token.val}</span>
                                </div>
                                {/* Visual Bar */}
                                <div className="flex-1 flex items-center">
                                    <div 
                                        className="h-4 bg-emerald-500/20 border border-emerald-500/30 rounded-sm relative group-hover:bg-emerald-500/40 transition-colors"
                                        style={{ width: token.val }}
                                    ></div>
                                    <div className="ml-4 border-l border-zinc-800 pl-4 h-4 flex items-center">
                                        <span className="text-[9px] text-zinc-600 uppercase tracking-wide group-hover:text-zinc-400 transition-colors">{token.usage}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6B: THE 12-COLUMN GRID */}
                <div className="bg-zinc-900/40 p-8 rounded-[2rem] border border-white/5 space-y-6 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">12-Column Fluid Grid</h3>
                        <span className="text-[9px] font-mono text-zinc-600">Gutter: 24px (1.5rem)</span>
                    </div>

                    <div className="flex-1 bg-black/40 rounded-xl border border-white/5 p-4 relative overflow-hidden">
                        {/* Mock Content Overlay */}
                        <div className="absolute inset-0 z-0 grid grid-cols-12 gap-4 p-4 pointer-events-none opacity-20">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="bg-rose-500/50 h-full rounded-sm"></div>
                            ))}
                        </div>

                        {/* Layout Example */}
                        <div className="relative z-10 h-full flex flex-col gap-4 text-[9px] font-black text-white/50 uppercase tracking-widest text-center">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 bg-zinc-800/80 border border-white/10 h-12 rounded flex items-center justify-center">Header (col-12)</div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 flex-1">
                                <div className="col-span-3 bg-zinc-800/80 border border-white/10 rounded flex items-center justify-center">Nav (3)</div>
                                <div className="col-span-9 flex flex-col gap-4">
                                    <div className="flex-1 bg-zinc-800/80 border border-white/10 rounded flex items-center justify-center">Main (9)</div>
                                    <div className="h-24 grid grid-cols-2 gap-4">
                                        <div className="bg-zinc-800/50 border border-white/5 rounded flex items-center justify-center">Widget (4.5)</div>
                                        <div className="bg-zinc-800/50 border border-white/5 rounded flex items-center justify-center">Widget (4.5)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* SECTION 7: ICONOGRAPHY */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Star className="text-purple-500" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">07. Iconography</h2>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">Lucide React • 1.5px Stroke</span>
            </div>

            <div className="bg-zinc-900/40 p-8 rounded-[2rem] border border-white/5">
                <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
                    {[Bot, Shield, ArrowLeftRight, BarChart2, Zap, Activity, Globe, Cpu, Layers, Wifi, Server, Command, Hash, ShieldCheck, Ban, Loader2].map((Icon, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
                            <div className="p-3 bg-zinc-900 rounded-xl border border-white/5 text-zinc-400 group-hover:text-white group-hover:border-white/20 transition-all hover:scale-110">
                                <Icon size={24} strokeWidth={1.5} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* SECTION 8: GUIDELINES */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <CheckCircle className="text-emerald-500" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">08. Usage Guidelines</h2>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">Accessibility & Clarity</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* DO */}
                <div className="bg-zinc-900/40 p-6 rounded-[2rem] border border-emerald-500/20 relative overflow-hidden group">
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-wider">
                        <CheckCircle size={10} /> DO
                    </div>
                    <div className="h-24 flex items-center justify-center">
                        <button className="px-6 py-2.5 bg-emerald-500 text-black rounded-lg font-bold text-xs uppercase tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                            Confirm Action
                        </button>
                    </div>
                    <div className="mt-2">
                        <p className="text-[10px] font-bold text-white">High Contrast</p>
                        <p className="text-[10px] text-zinc-500 mt-1">
                            "Use dark text (Zinc-950) on bright backgrounds (Emerald-500) to ensure readability."
                        </p>
                    </div>
                </div>

                {/* DON'T */}
                <div className="bg-zinc-900/40 p-6 rounded-[2rem] border border-rose-500/20 relative overflow-hidden group">
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[9px] font-black uppercase tracking-wider">
                        <XCircle size={10} /> DON'T
                    </div>
                    <div className="h-24 flex items-center justify-center">
                        <button className="px-6 py-2.5 bg-emerald-500 text-zinc-400 rounded-lg font-bold text-xs uppercase tracking-wide opacity-80 cursor-not-allowed">
                            Confirm Action
                        </button>
                    </div>
                    <div className="mt-2">
                        <p className="text-[10px] font-bold text-white">Low Contrast</p>
                        <p className="text-[10px] text-zinc-500 mt-1">
                            "Never use light grey text on colored buttons. It fails WCAG AA standards."
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 9: DATA TABLES & INTERACTION */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <LayoutList className="text-emerald-500" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">09. Data Tables & Interaction</h2>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">Complex Lists & Filtering</span>
            </div>

            {/* Example 1: Top Opportunities Table */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-8 relative overflow-hidden">
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Component: Opportunity Table</h3>
                        <p className="text-zinc-400 text-xs">Used in Liquidity Manager. Features sorting, filtering, and rich data presentation.</p>
                    </div>
                </div>

                {/* THE TABLE PREVIEW */}
                <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] overflow-hidden shadow-xl backdrop-blur-md relative flex flex-col max-w-4xl mx-auto">
                    {/* Header Toolbar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0a0a0a]/50">
                         <div className="flex items-center gap-3">
                             <h3 className="text-sm font-black text-white uppercase tracking-wide">Top Opportunities</h3>
                         </div>
                         
                         <div className="flex items-center gap-2">
                             <div className="flex bg-zinc-900 rounded-lg p-1 border border-white/5 mr-2">
                                <button className="px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all bg-zinc-800 text-white shadow-sm flex items-center gap-1">
                                    APY
                                </button>
                                <button className="px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all text-zinc-500 hover:text-zinc-300 flex items-center gap-1">
                                    Risk
                                </button>
                                <button className="px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all text-zinc-500 hover:text-zinc-300 flex items-center gap-1">
                                    TVL
                                </button>
                             </div>

                             <div className="flex bg-zinc-900 rounded-lg p-1 border border-white/5">
                                <button className="p-1.5 rounded-md transition-all bg-zinc-800 text-white shadow-sm">
                                    <LayoutList size={14} />
                                </button>
                                <button className="p-1.5 rounded-md transition-all text-zinc-500 hover:text-white">
                                    <LayoutGrid size={14} />
                                </button>
                             </div>
                         </div>
                     </div>

                     {/* Table Content */}
                     <div className="w-full text-left">
                        <div className="bg-[#0a0a0a]/90 backdrop-blur sticky top-0 z-10 text-[9px] font-black uppercase tracking-[0.15em] text-zinc-500 border-b border-white/10 grid grid-cols-6 px-6 py-4">
                            <div className="col-span-2">Strategy</div>
                            <div>Risk Profile</div>
                            <div className="text-right">TVL</div>
                            <div className="text-right">Net APY</div>
                            <div className="text-right">Action</div>
                        </div>
                        
                        <div className="divide-y divide-white/[0.03]">
                            {/* Row 1 */}
                            <div className="grid grid-cols-6 px-6 py-4 items-center group hover:bg-white/[0.02] transition-colors cursor-pointer">
                                <div className="col-span-2 flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full border-2 border-[#121214] bg-zinc-800 flex items-center justify-center text-[8px] text-white font-bold z-20">A</div>
                                        <div className="w-8 h-8 rounded-full border-2 border-[#121214] bg-zinc-700 flex items-center justify-center text-[8px] text-white font-bold z-10">B</div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">GMX GLP Index</div>
                                        <div className="text-[9px] text-zinc-500 font-mono flex items-center gap-1.5 mt-0.5">
                                            GMX • Liquidity
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                                        <ShieldCheck size={10} /> Low Risk
                                    </div>
                                </div>
                                <div className="text-right font-mono text-xs font-bold text-zinc-300">$480M</div>
                                <div className="text-right">
                                    <span className="text-lg font-mono font-bold text-emerald-400 text-shadow-glow">38.2%</span>
                                </div>
                                <div className="text-right">
                                    <button className="px-4 py-2 bg-zinc-800 text-zinc-300 border border-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-all shadow-sm">
                                        View
                                    </button>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-6 px-6 py-4 items-center group hover:bg-white/[0.02] transition-colors cursor-pointer">
                                <div className="col-span-2 flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full border-2 border-[#121214] bg-blue-900 flex items-center justify-center text-[8px] text-white font-bold z-20">U</div>
                                        <div className="w-8 h-8 rounded-full border-2 border-[#121214] bg-zinc-700 flex items-center justify-center text-[8px] text-white font-bold z-10">E</div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Uniswap V3 Pool</div>
                                        <div className="text-[9px] text-zinc-500 font-mono flex items-center gap-1.5 mt-0.5">
                                            Uniswap • Market Making
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider border bg-amber-500/10 text-amber-500 border-amber-500/20">
                                        <ShieldCheck size={10} /> Moderate
                                    </div>
                                </div>
                                <div className="text-right font-mono text-xs font-bold text-zinc-300">$840M</div>
                                <div className="text-right">
                                    <span className="text-lg font-mono font-bold text-emerald-400 text-shadow-glow">24.5%</span>
                                </div>
                                <div className="text-right">
                                    <button className="px-4 py-2 bg-zinc-800 text-zinc-300 border border-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-all shadow-sm">
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
};

export default DesignSystemView;
