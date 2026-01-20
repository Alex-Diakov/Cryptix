
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ExecutionView from './components/ExecutionView';
import HistoryView from './components/HistoryView';
import ProTradingView from './components/ProTradingView';
import MobileNav from './components/MobileNav';
import StrategyAutomationView from './components/StrategyAutomationView';
import TeamSettingsView from './components/TeamSettingsView';
import ActivityLogView from './components/ActivityLogView';
import DesignSystemView from './components/DesignSystemView';
import { Fuel, Bell, Search, ChevronDown, Wifi, Signal, Cpu, Wallet, Lock, ShieldAlert, FileText, LogOut, ShieldCheck, UserCog, MonitorOff } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [address] = useState('0x71C...4f92');
  const [searchFocused, setSearchFocused] = useState(false);
  const [tradeConfig, setTradeConfig] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Keyboard shortcut listener for CMD+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (tab: string, config?: any) => {
    if (config) {
      setTradeConfig(config);
    }
    setActiveTab(tab);
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'trade': return 'Instant Trade';
      case 'pro-trade': return 'Trading Terminal';
      case 'history': return 'CFO Reporting Console';
      case 'dashboard': return 'Dashboard';
      case 'earn': return 'Yield Optimization';
      case 'analytics': return 'AI Intelligence';
      case 'automation': return 'Strategy Automation';
      case 'settings': return 'Governance & Access Control';
      case 'activity': return 'Audit Log & Activity';
      case 'design-system': return 'UI Design System';
      default: return activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onTradeClick={(config) => navigateTo('trade', config)} />;
      case 'trade':
        return (
          <div className="h-full overflow-y-auto p-6 lg:p-10 scrollbar-hide">
            <div className="max-w-[1700px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500 w-full">
              <ExecutionView initialState={tradeConfig} />
            </div>
          </div>
        );
      case 'pro-trade':
        return (
          <div className="h-full w-full p-2 overflow-hidden">
            <ProTradingView />
          </div>
        );
      case 'history':
        return (
          <div className="h-full overflow-y-auto p-6 lg:p-10 scrollbar-hide">
            <div className="max-w-[1700px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500 w-full">
              <HistoryView />
            </div>
          </div>
        );
      case 'automation':
        return <StrategyAutomationView />;
      case 'settings':
        return <TeamSettingsView />;
      case 'activity':
        return <ActivityLogView />;
      case 'design-system':
        return <DesignSystemView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
            <div className="w-16 h-16 bg-[#121212] rounded-full flex items-center justify-center border border-white/5">
               <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-sm font-black uppercase tracking-widest text-zinc-600">Syncing Alpha...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-screen bg-transparent text-gray-100 font-sans overflow-hidden selection:bg-emerald-500/30">
      
      {/* 1. NATIVE SIDEBAR (Left Edge) */}
      <Sidebar activeTab={activeTab} setActiveTab={navigateTo} />

      {/* 2. MAIN APPLICATION AREA (Rest of Screen) */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent relative">
        
        {/* A. APP HEADER (Fixed Top) */}
        <header className="h-14 border-b border-white/5 bg-[#050507]/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 z-40 drag-region">
          
          {/* Left: Breadcrumbs / Title */}
          <div className="flex items-center space-x-4 no-drag">
            <h1 className="text-sm font-black uppercase tracking-[0.1em] text-white">
              {getPageTitle()}
            </h1>
          </div>

          {/* Center: Global Search (CMD+K) */}
          <div className={`relative max-w-lg w-full mx-8 transition-all duration-300 no-drag ${searchFocused ? 'scale-[1.01]' : 'scale-100'}`}>
            <div className={`absolute inset-y-0 left-3 flex items-center pointer-events-none transition-colors ${searchFocused ? 'text-emerald-500' : 'text-zinc-600'}`}>
              <Search size={14} />
            </div>
            <input 
              id="global-search"
              type="text" 
              placeholder="Search assets, strategies or addresses..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full h-9 bg-[#09090b] border border-white/10 rounded-md pl-10 pr-10 text-[11px] font-medium text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:bg-zinc-900 transition-all shadow-inner"
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <kbd className="hidden sm:inline-flex px-1.5 py-0.5 bg-zinc-800 rounded-[4px] text-[9px] font-bold text-zinc-500 border border-white/5 uppercase font-mono">
                ⌘ K
              </kbd>
            </div>
          </div>

          {/* Right: Profile & Alerts (REDESIGNED) */}
          <div className="flex items-center space-x-2 no-drag">
            
            {/* 1. Notification Bell */}
            <button className="relative p-2 text-zinc-500 hover:text-white transition-colors mr-2">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border border-[#050505]"></span>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-white/5 mx-2 hidden lg:block"></div>

            {/* 2. Network Indicator (NEW FEATURE) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#09090b] border border-white/10 rounded-xl mr-2 hover:border-indigo-500/30 transition-all cursor-pointer group shadow-sm">
               <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
               <span className="text-[10px] font-bold text-zinc-200">Ethereum Mainnet</span>
               <ChevronDown size={10} className="text-zinc-500 group-hover:text-white ml-1" />
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-white/5 mx-1 hidden lg:block"></div>

            {/* 4. User Profile Dropdown (Interactive) */}
            <div className="relative">
                <div 
                    className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                    <div className="text-right hidden xl:block">
                        <div className="text-xs font-bold text-white">Alexander V.</div>
                        <div className="flex justify-end mt-0.5">
                            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1.5 py-px rounded-[4px] text-[8px] font-black uppercase tracking-wider shadow-[0_0_10px_rgba(168,85,247,0.1)]">ADMIN</span>
                        </div>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-white/10 p-0.5 shadow-lg relative">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=alex" alt="Profile" className="w-full h-full object-cover rounded-[6px] bg-zinc-900" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#050505] rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full border border-[#050505]"></div>
                        </div>
                    </div>
                </div>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                        <div className="absolute top-full right-0 mt-3 w-72 bg-[#09090b] border border-white/10 rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                            
                            {/* User Header - Unified Team Settings Style */}
                            <div className="p-4 border-b border-white/5 bg-zinc-900/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 shrink-0">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=alex" alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-bold text-white truncate">Alexander V.</div>
                                        <div className="text-[10px] text-zinc-500 truncate font-medium">alex.v@fund.capital</div>
                                    </div>
                                </div>
                                
                                {/* Authority Badge */}
                                <div className="flex items-center justify-between bg-zinc-800/40 p-2.5 rounded-xl border border-white/5 hover:bg-zinc-800/60 transition-colors cursor-default">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Authority</span>
                                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                                            UNLIMITED
                                        </span>
                                    </div>
                                    <div className="h-6 w-px bg-white/10"></div>
                                    <div className="flex flex-col gap-0.5 items-end">
                                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Role</span>
                                        <span className="text-[9px] font-black text-white uppercase tracking-wider">
                                            Super Admin
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Wallet Context - Moved from Header */}
                            <div className="p-2 pb-0">
                                <div className="bg-[#050505] border border-white/5 rounded-xl p-3 flex items-center justify-between group hover:border-emerald-500/20 transition-all cursor-pointer shadow-inner">
                                    <div className="flex items-center gap-3">
                                         <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-emerald-500 transition-colors">
                                            <Wallet size={16} />
                                         </div>
                                         <div>
                                             <div className="text-[10px] font-black text-zinc-300 uppercase tracking-widest group-hover:text-white transition-colors">Capital Fund Treasury</div>
                                             <div className="flex items-center gap-2 mt-0.5">
                                                 <span className="text-[9px] font-mono text-zinc-500">{address}</span>
                                                 <span className="text-[8px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">Multi-Sig</span>
                                             </div>
                                         </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Personal Actions */}
                            <div className="p-2 space-y-1">
                                <div className="px-2 py-1.5 text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center justify-between">
                                    <span>Personal Config</span>
                                </div>
                                
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group text-left">
                                    <div className="text-zinc-400 group-hover:text-emerald-400 transition-colors"><ShieldCheck size={16}/></div>
                                    <div>
                                        <div className="text-[11px] font-bold text-zinc-200 group-hover:text-white">Security Center</div>
                                        <div className="text-[9px] text-zinc-500 group-hover:text-zinc-400">YubiKey, 2FA, Active Sessions</div>
                                    </div>
                                </button>

                                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group text-left">
                                    <div className="text-zinc-400 group-hover:text-purple-400 transition-colors"><UserCog size={16}/></div>
                                    <div>
                                        <div className="text-[11px] font-bold text-zinc-200 group-hover:text-white">Terminal Config</div>
                                        <div className="text-[9px] text-zinc-500 group-hover:text-zinc-400">Layouts, Notifications, API</div>
                                    </div>
                                </button>

                                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group text-left">
                                    <div className="text-zinc-400 group-hover:text-amber-400 transition-colors"><MonitorOff size={16}/></div>
                                    <div>
                                        <div className="text-[11px] font-bold text-zinc-200 group-hover:text-white">Lock Screen</div>
                                        <div className="text-[9px] text-zinc-500 group-hover:text-zinc-400">Hide PnL & Require Password</div>
                                    </div>
                                </button>
                            </div>

                            {/* Footer - Professional Terminology */}
                            <div className="p-2 border-t border-white/5 bg-zinc-900/30">
                                <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-rose-500/5 text-rose-500 border border-rose-500/10 hover:bg-rose-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_15px_rgba(244,63,94,0.4)] group">
                                    <LogOut size={12} className="group-hover:stroke-[3px]" /> 
                                    Terminate Session
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            
          </div>
        </header>

        {/* B. MAIN VIEWPORT (Scrollable) */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 bg-transparent p-0 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            {renderContent()}
        </main>

        {/* C. STATUS BAR (Fixed Bottom) */}
        <footer className="h-8 bg-[#080808]/90 backdrop-blur border-t border-white/5 flex items-center justify-between px-4 shrink-0 z-50 select-none">
            
            {/* Left: System Status */}
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 hover:text-white transition-colors cursor-pointer">
                    <Wifi size={12} className="text-emerald-500" />
                    <span className="font-bold">Mainnet: Connected</span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 hover:text-white transition-colors cursor-pointer">
                    <Signal size={12} className="text-emerald-500" />
                    <span>RPC: 12ms</span>
                </div>
            </div>

            {/* Center: Version Info */}
            <div className="hidden md:flex items-center space-x-2 text-[10px] font-mono text-zinc-600">
               <Cpu size={12} />
               <span>Cryptix Core v4.0 (Enterprise)</span>
            </div>

            {/* Right: Gas & Block */}
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 hover:text-white transition-colors cursor-pointer">
                    <Fuel size={12} />
                    <span>Gas: <span className="text-emerald-500 font-bold">12 Gwei</span></span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span>Block: 19420421</span>
                </div>
            </div>
        </footer>

        {/* MOBILE OVERLAY NAVIGATION */}
        <div className="md:hidden">
          <MobileNav activeTab={activeTab} setActiveTab={navigateTo} />
        </div>

      </div>
    </div>
  );
};

export default App;
