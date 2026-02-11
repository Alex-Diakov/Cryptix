
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
  LayoutGrid,
  Skull,
  Timer,
  AlertOctagon,
  MousePointer2,
  PenTool,
  ChevronDown,
  Search,
  Bell,
  Check,
  Info,
  AlertTriangle,
  X,
  Settings,
  Lock,
  Box,
  Maximize
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
                <h1 className="text-3xl font-black text-white tracking-tight uppercase">Cryptix Design System <span className="text-emerald-500">v4.3</span></h1>
                <p className="text-zinc-500 text-xs font-mono mt-1 uppercase tracking-widest">
                    Utility-First Architecture • Color Audit Complete • Critical Flows • Form Patterns
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="space-y-3 group">
                    <div className="h-20 rounded-2xl bg-emerald-500 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] border border-emerald-400/20"></div>
                    <div className="px-1 space-y-1"><p className="text-white text-xs font-bold uppercase">Primary (Success)</p><p className="text-zinc-500 text-[10px] font-mono">text-emerald-500</p></div>
                </div>
                <div className="space-y-3 group">
                    <div className="h-20 rounded-2xl bg-purple-500 shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] border border-purple-400/20"></div>
                    <div className="px-1 space-y-1"><p className="text-white text-xs font-bold uppercase">Secondary (AI)</p><p className="text-zinc-500 text-[10px] font-mono">text-purple-500</p></div>
                </div>
                <div className="space-y-3 group">
                    <div className="h-20 rounded-2xl bg-rose-500 shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)] border border-rose-400/20"></div>
                    <div className="px-1 space-y-1"><p className="text-white text-xs font-bold uppercase">Destructive (Error)</p><p className="text-zinc-500 text-[10px] font-mono">text-rose-500</p></div>
                </div>
                <div className="space-y-3 group">
                    <div className="h-20 rounded-2xl bg-amber-500 shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)] border border-amber-400/20"></div>
                    <div className="px-1 space-y-1"><p className="text-white text-xs font-bold uppercase">Caution (Warning)</p><p className="text-zinc-500 text-[10px] font-mono">text-amber-500</p></div>
                </div>
                <div className="space-y-3 group">
                    <div className="h-20 rounded-2xl bg-blue-500 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] border border-blue-400/20"></div>
                    <div className="px-1 space-y-1"><p className="text-white text-xs font-bold uppercase">Info (Action)</p><p className="text-zinc-500 text-[10px] font-mono">text-blue-500</p></div>
                </div>
            </div>
        </section>

        {/* SECTION 2: TYPOGRAPHY */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Type className="text-blue-500" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">02. Typography</h2>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">Inter (UI) & JetBrains Mono (Data)</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-5xl font-black text-white tracking-tight">Display Hero</h1>
                        <p className="text-[10px] font-mono text-zinc-500">text-5xl font-black tracking-tight</p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Section Heading</h2>
                        <p className="text-[10px] font-mono text-zinc-500">text-3xl font-bold tracking-tight</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white">Card Title</h3>
                        <p className="text-[10px] font-mono text-zinc-500">text-xl font-semibold</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Body text is typically <span className="text-white">zinc-400</span> for readability on dark backgrounds. 
                            Active states use <span className="text-white">white</span>. We prioritize legibility and contrast.
                        </p>
                        <p className="text-[10px] font-mono text-zinc-500">text-sm text-zinc-400</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/5 space-y-4">
                        <div>
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Financial Data</span>
                            <div className="text-4xl font-mono font-medium text-white mt-1">$1,240,500.00</div>
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Positive Change</span>
                            <div className="text-xl font-mono font-bold text-emerald-500 mt-1">+12.45%</div>
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Negative Change</span>
                            <div className="text-xl font-mono font-bold text-rose-500 mt-1">-3.82%</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: BUTTONS */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <MousePointerClick className="text-purple-500" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">03. Actions & Inputs</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Primary Actions</h3>
                    <button className="w-full py-4 bg-emerald-500 text-black rounded-xl font-black text-xs uppercase tracking-[0.1em] hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        Confirm Transaction
                    </button>
                    <button className="w-full py-3 bg-white text-black rounded-lg font-bold text-[10px] uppercase tracking-wider hover:bg-zinc-200 transition-all">
                        Connect Wallet
                    </button>
                </div>
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Secondary & Outline</h3>
                    <button className="w-full py-4 bg-zinc-800 text-white rounded-xl font-bold text-xs uppercase tracking-[0.1em] hover:bg-zinc-700 border border-white/5 transition-all">
                        Cancel Order
                    </button>
                    <button className="w-full py-3 bg-transparent text-emerald-500 border border-emerald-500/50 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:bg-emerald-500/10 transition-all">
                        View Details
                    </button>
                </div>
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Destructive & Ghost</h3>
                    <button className="w-full py-4 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-xl font-black text-xs uppercase tracking-[0.1em] hover:bg-rose-500 hover:text-white transition-all">
                        Liquidate Position
                    </button>
                    <button className="w-full py-3 text-zinc-500 hover:text-white font-bold text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                        <Settings size={14} /> Advanced Settings
                    </button>
                </div>
            </div>
        </section>

        {/* SECTION 4: BADGES & TAGS */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Shield className="text-amber-500" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">04. Status Indicators</h2>
                </div>
            </div>
            <div className="flex flex-wrap gap-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-black uppercase tracking-wider">
                    <CheckCircle size={12} /> Active
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black uppercase tracking-wider">
                    <Timer size={12} /> Pending
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[10px] font-black uppercase tracking-wider">
                    <XCircle size={12} /> Failed
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 text-[10px] font-black uppercase tracking-wider">
                    <Ban size={12} /> Revoked
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase tracking-wider">
                    <Bot size={12} /> Automated
                </div>
            </div>
        </section>

        {/* SECTION 5: SURFACES & CARDS (DETAILED & REFACTORED) */}
        <section className="space-y-12">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Layers className="text-zinc-200" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">05. Surfaces Hierarchy</h2>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">Depth & Materials</span>
            </div>

            {/* LEVEL 1: BASE CONTAINERS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    {/* UPDATED: 使用 Glass Panel Component */}
                    <div className="glass-panel p-8 min-h-[240px] flex flex-col group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Box size={100} />
                        </div>
                        <h3 className="text-sm font-bold text-white mb-2 relative z-10">Level 1: The Glass Panel</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed max-w-sm relative z-10">
                            The primary container for major application sections (Dashboard, Trade). 
                            Uses specific tokens for border radius (5xl), blur, and border opacity.
                        </p>
                        <div className="mt-auto pt-6 relative z-10">
                            <code className="text-[9px] bg-black/50 px-2 py-1 rounded text-zinc-500 font-mono">
                                .glass-panel (Reusable Component)
                            </code>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-[#09090b] border border-white/10 rounded-2xl p-6 shadow-xl min-h-[240px] flex flex-col">
                        <h3 className="text-sm font-bold text-white mb-2">Level 1.5: The Modal / Panel</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
                            Used for floating elements like drawers, modals, or dropdowns. 
                            Opaque background to prevent visual noise from layers behind it.
                        </p>
                        <div className="mt-auto pt-6">
                            <code className="text-[9px] bg-zinc-900 px-2 py-1 rounded text-zinc-500 font-mono">
                                bg-[#09090b] • border-white/10 • rounded-2xl • shadow-2xl
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            {/* LEVEL 2 & 3: NESTING & INTERACTION */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-10 backdrop-blur-md">
                <div className="mb-8">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Internal Composition Rules</h3>
                    <p className="text-xs text-zinc-400">How to nest content within a Level 1 container.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* RULE: INSET GROUPING */}
                    <div className="space-y-4">
                        <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-4">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase">Level 2: Grouping</span>
                                <Maximize size={14} className="text-zinc-600" />
                            </div>
                            {/* Inner Content */}
                            <div className="bg-black/20 border border-white/5 rounded-lg p-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/5"></div>
                                    <div className="space-y-1">
                                        <div className="w-24 h-2 bg-zinc-800 rounded"></div>
                                        <div className="w-16 h-2 bg-zinc-800/50 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-[10px] text-zinc-500">
                            <strong className="text-zinc-300">Inset Grouping:</strong> Use <code className="text-zinc-400">bg-black/20</code> or <code className="text-zinc-400">bg-zinc-900/50</code> to group related data points.
                        </p>
                    </div>

                    {/* RULE: INTERACTIVE ITEMS */}
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            {/* Item 1 */}
                            <div className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:bg-zinc-800 hover:border-white/5 transition-all cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                                        <MousePointer2 size={14} />
                                    </div>
                                    <span className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">Interactive Item</span>
                                </div>
                                <ArrowLeftRight size={14} className="text-zinc-600 group-hover:text-zinc-400" />
                            </div>
                            {/* Item 2 (Active) */}
                            <div className="flex items-center justify-between p-3 rounded-lg border bg-zinc-800 border-white/10 cursor-default">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-bold">
                                        <Check size={14} strokeWidth={4} />
                                    </div>
                                    <span className="text-xs font-bold text-white">Selected / Active</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-[10px] text-zinc-500">
                            <strong className="text-zinc-300">Level 3 (Interactive):</strong> Use transparent backgrounds by default. On hover, apply <code className="text-zinc-400">bg-zinc-800</code>. Active states use solid fills.
                        </p>
                    </div>
                </div>
            </div>

            {/* LEVEL 4: COMPLEX FUNCTIONAL SURFACE (TRADING PATTERN) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Level 4: Complex Functional (Trading)</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        High-density functional surfaces require strict contrast management. Active states use brand colors (Emerald/Rose) to denote directionality (Long/Short).
                    </p>
                    
                    {/* ATOMIC COMPONENT: TRADING WIDGET */}
                    <div className="bg-[#0f0f0f] border border-zinc-800 rounded-xl overflow-hidden w-full max-w-sm shadow-2xl">
                        {/* TABS */}
                        <div className="flex bg-[#0a0a0a] border-b border-zinc-800">
                            <div className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-zinc-900 text-center relative cursor-default">
                                Long / Buy
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500"></div>
                            </div>
                            <div className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-300 text-center cursor-default">
                                Short / Sell
                            </div>
                        </div>

                        <div className="p-4 space-y-4">
                            {/* Order Type */}
                            <div className="flex justify-between items-center">
                                <div className="bg-black border border-white/5 rounded-lg p-0.5 flex">
                                    <div className="px-3 py-1.5 rounded-md text-[9px] font-bold uppercase bg-zinc-800 text-white shadow-sm">Market</div>
                                    <div className="px-3 py-1.5 rounded-md text-[9px] font-bold uppercase text-zinc-500">Limit</div>
                                </div>
                                <span className="text-[9px] font-bold text-zinc-500">Isolated 10x</span>
                            </div>

                            {/* Inputs */}
                            <div className="space-y-2">
                                <div className="bg-[#050505] border border-white/10 rounded-xl p-3 space-y-1">
                                    <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase">
                                        <span>Collateral</span>
                                        <span>Bal: 2,450.00</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-1.5 bg-zinc-900 px-2 py-1 rounded-lg border border-white/5">
                                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                            <span className="text-[10px] font-bold text-white">USDT</span>
                                        </div>
                                        <span className="text-sm font-mono font-bold text-white">1,000.00</span>
                                    </div>
                                </div>
                            </div>

                            {/* Leverage Slider Atomic */}
                            <div className="bg-zinc-900/30 rounded-xl p-3 border border-white/5 space-y-3">
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="font-bold text-zinc-500">Leverage</span>
                                    <span className="font-mono font-black text-white">20x</span>
                                </div>
                                <div className="relative h-1.5 w-full bg-zinc-800 rounded-full">
                                    <div className="absolute top-0 left-0 h-full w-[20%] bg-emerald-500 rounded-full"></div>
                                    <div className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg border-2 border-zinc-900"></div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="w-full py-3 bg-emerald-500 text-black rounded-xl font-black text-[10px] uppercase tracking-widest text-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                Open Long
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Anatomy</h3>
                    <ul className="space-y-3">
                        <li className="flex gap-3 text-xs text-zinc-400">
                            <span className="text-emerald-500 font-bold">01.</span>
                            <span><strong>Directional Context:</strong> Top border and active text color (Emerald/Rose) immediately signal trade direction.</span>
                        </li>
                        <li className="flex gap-3 text-xs text-zinc-400">
                            <span className="text-emerald-500 font-bold">02.</span>
                            <span><strong>Input Surface:</strong> Uses <code>bg-[#050505]</code> (darker than container) to create depth for input fields.</span>
                        </li>
                        <li className="flex gap-3 text-xs text-zinc-400">
                            <span className="text-emerald-500 font-bold">03.</span>
                            <span><strong>Primary Action:</strong> Full-width, high-contrast button matching the directional context color.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        {/* SECTION 6: FORM ELEMENTS */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Command className="text-zinc-400" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">06. Simple Inputs</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Text Input</label>
                    <input type="text" placeholder="Enter value..." className="w-full bg-zinc-900 border border-white/10 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-colors" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Search Input</label>
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input type="text" placeholder="Search..." className="w-full bg-zinc-900 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-colors" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Dropdown</label>
                    <div className="relative">
                        <select className="w-full bg-zinc-900 border border-white/10 rounded-lg py-2 pl-3 pr-8 text-xs text-white appearance-none focus:outline-none focus:border-emerald-500/50 cursor-pointer">
                            <option>Option 1</option>
                            <option>Option 2</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 7: DATA VISUALIZATION TOKENS */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <BarChart2 className="text-orange-500" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">07. Data Viz Colors</h2>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="space-y-2 text-center">
                    <div className="h-12 w-full bg-[#10b981] rounded-lg"></div>
                    <span className="text-[10px] font-mono text-zinc-500">Emerald</span>
                </div>
                <div className="space-y-2 text-center">
                    <div className="h-12 w-full bg-[#3b82f6] rounded-lg"></div>
                    <span className="text-[10px] font-mono text-zinc-500">Blue</span>
                </div>
                <div className="space-y-2 text-center">
                    <div className="h-12 w-full bg-[#8b5cf6] rounded-lg"></div>
                    <span className="text-[10px] font-mono text-zinc-500">Violet</span>
                </div>
                <div className="space-y-2 text-center">
                    <div className="h-12 w-full bg-[#f59e0b] rounded-lg"></div>
                    <span className="text-[10px] font-mono text-zinc-500">Amber</span>
                </div>
                <div className="space-y-2 text-center">
                    <div className="h-12 w-full bg-[#f43f5e] rounded-lg"></div>
                    <span className="text-[10px] font-mono text-zinc-500">Rose</span>
                </div>
                <div className="space-y-2 text-center">
                    <div className="h-12 w-full bg-[#71717a] rounded-lg"></div>
                    <span className="text-[10px] font-mono text-zinc-500">Zinc</span>
                </div>
            </div>
        </section>

        {/* SECTION 8: NAVIGATION */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Compass className="text-zinc-300" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">08. Navigation Components</h2>
                </div>
            </div>
            <div className="space-y-6">
                <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">Segmented Control</h3>
                    <div className="flex bg-[#0a0a0a] p-1 rounded-xl border border-white/5 w-fit">
                        <button className="px-4 py-2 bg-zinc-800 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">Dashboard</button>
                        <button className="px-4 py-2 text-zinc-500 hover:text-zinc-300 rounded-lg text-[10px] font-black uppercase tracking-widest">Trade</button>
                        <button className="px-4 py-2 text-zinc-500 hover:text-zinc-300 rounded-lg text-[10px] font-black uppercase tracking-widest">Earn</button>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 9: FEEDBACK */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Bell className="text-yellow-500" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">09. Feedback & Alerts</h2>
                </div>
            </div>
            <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center gap-3">
                    <Info size={16} className="text-blue-500" />
                    <span className="text-xs text-blue-200 font-medium">System update scheduled for 02:00 UTC. Trading will be paused.</span>
                </div>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                    <CheckCircle size={16} className="text-emerald-500" />
                    <span className="text-xs text-emerald-200 font-medium">Order filled successfully at $3,240.50.</span>
                </div>
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3">
                    <AlertTriangle size={16} className="text-amber-500" />
                    <span className="text-xs text-amber-200 font-medium">Slippage is high (1.2%). Consider using a limit order.</span>
                </div>
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3">
                    <AlertOctagon size={16} className="text-rose-500" />
                    <span className="text-xs text-rose-200 font-medium">Transaction failed. Insufficient gas funds.</span>
                </div>
            </div>
        </section>

        {/* SECTION 10: ICONOGRAPHY */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Star className="text-zinc-100" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">10. Iconography</h2>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">Lucide React (Stroke 2px)</span>
            </div>
            <div className="grid grid-cols-8 md:grid-cols-12 gap-4">
                {[
                    Activity, ArrowLeftRight, BarChart2, Bell, Bot, Check, ChevronDown, 
                    Command, Cpu, Globe, Grid, Hash, Info, Layers, LayoutGrid, 
                    LayoutList, Loader2, Lock, MousePointer2, Palette, PenTool, 
                    Search, Server, Settings, Shield, ShieldCheck, Skull, Star, 
                    Timer, Type, Wifi, X, Zap
                ].map((Icon, i) => (
                    <div key={i} className="aspect-square bg-zinc-900 rounded-xl flex items-center justify-center border border-white/5 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
                        <Icon size={20} />
                    </div>
                ))}
            </div>
        </section>

        {/* SECTION 11: FORM & INPUT PATTERNS */}
        <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <PenTool className="text-zinc-400" size={20} />
                    <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">11. Complex Patterns</h2>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">Compound Inputs</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* 11A: COMPOUND INPUTS */}
                <div className="flex flex-col gap-6">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Split Input Group (TP/SL)</h3>
                    
                    <div className="bg-[#050505] p-8 border border-zinc-800 rounded-[2rem] flex flex-col justify-center gap-6">
                        
                        {/* Example 1: TP Input */}
                        <div className="grid grid-cols-2 gap-2 w-full max-w-sm mx-auto">
                            {/* Price Input */}
                            <div className="bg-[#18181b] border border-white/5 rounded-lg p-3 focus-within:border-emerald-500/50 transition-colors">
                                <label className="text-[9px] font-bold text-zinc-500 uppercase block mb-1">TP Price</label>
                                <div className="text-sm font-mono font-bold text-white">65,420.50</div>
                            </div>
                            {/* ROI Input */}
                            <div className="bg-[#18181b] border border-white/5 rounded-lg p-3 focus-within:border-emerald-500/50 transition-colors flex items-center justify-between">
                                <div>
                                    <label className="text-[9px] font-bold text-zinc-500 uppercase block mb-1 flex items-center gap-1">Gain</label>
                                    <div className="text-sm font-mono font-bold text-emerald-500">50.00</div>
                                </div>
                                <div className="flex items-center gap-1 text-[9px] font-bold text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-white/5">
                                    % <ChevronDown size={8}/>
                                </div>
                            </div>
                        </div>

                        {/* Rules */}
                        <div className="space-y-2">
                            <div className="flex gap-3 items-start">
                                <div className="w-1 h-1 bg-emerald-500 rounded-full mt-1.5"></div>
                                <p className="text-[10px] text-zinc-400 leading-relaxed">
                                    <strong className="text-white">Bidirectional Binding:</strong> Editing Price auto-updates ROI %, and vice-versa.
                                </p>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="w-1 h-1 bg-emerald-500 rounded-full mt-1.5"></div>
                                <p className="text-[10px] text-zinc-400 leading-relaxed">
                                    <strong className="text-white">Color Coding:</strong> Gain inputs use <span className="text-emerald-500">emerald-500</span>, Loss inputs use <span className="text-rose-500">rose-500</span>.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 11B: SLIDERS & TOGGLES */}
                <div className="flex flex-col gap-6">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Interactive Controls</h3>
                    
                    <div className="bg-zinc-900/40 p-8 border border-white/5 rounded-[2rem] space-y-8">
                        
                        {/* Leverage Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase">Leverage</span>
                                <span className="text-sm font-mono font-black text-white">20x</span>
                            </div>
                            <div className="relative h-2 w-full bg-zinc-800 rounded-full">
                                <div className="absolute top-0 left-0 h-full w-[40%] bg-emerald-500 rounded-full"></div>
                                <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-zinc-900"></div>
                            </div>
                        </div>

                        {/* Checkbox Toggle */}
                        <div className="flex items-center gap-3 p-3 bg-[#18181b] rounded-xl border border-white/5 w-fit">
                            <div className="w-5 h-5 bg-emerald-500 rounded flex items-center justify-center text-black">
                                <CheckCircle size={14} />
                            </div>
                            <span className="text-[10px] font-bold text-white uppercase tracking-wide">TP / SL Enabled</span>
                        </div>

                    </div>
                </div>

            </div>
        </section>

      </div>
    </div>
  );
};

// Helper for Icon in Section 8 (Compass was missing in lucide export for some versions, using substitute if needed, or import above)
const Compass = ({ className, size }: { className?: string, size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
);

export default DesignSystemView;
