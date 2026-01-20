
import React, { useState } from 'react';
import { 
  Home, 
  ArrowLeftRight, 
  LayoutGrid,
  Workflow,
  FileText,
  LogOut,
  Shield,
  Palette,
  Users,
  Settings,
  Key,
  Building,
  FileCheck,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CryptixLogo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 1016 1016" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path 
      d="M549.013 918.133C571.123 915.868 592.986 911.862 614.388 906.145C676.711 889.445 735.152 858.196 784.176 813.906L841.438 789.45L930.224 751.521L864.971 713.828C895.174 661.515 912.623 605.35 918.288 548.928H1015.12C1009.22 621.794 987.465 694.536 948.491 762.064C878.209 883.81 765.211 965.538 639.335 999.255C609.798 1007.18 579.564 1012.43 549.012 1014.96V918.133H549.013ZM96.924 548.929C99.188 571.029 103.195 592.892 108.91 614.295C125.611 676.618 156.859 735.058 201.149 784.103L225.606 841.354L263.534 930.161L301.227 864.898C353.53 895.101 409.706 912.529 466.158 918.194L466.127 1015.06C393.262 1009.12 320.509 987.402 252.992 948.398C131.245 878.115 49.517 765.118 15.8 639.242C7.86999 609.736 2.61396 579.481 0.0929565 548.929H96.924V548.929ZM273.145 742.26L187.676 752.537L245.522 710.951C218.228 675.747 198.536 635.678 187.205 593.333C165.229 511.339 174.551 420.965 220.318 341.655L285.603 379.348L274.045 283.451L272.796 273.082L262.52 187.585L304.106 245.43C339.298 218.136 379.379 198.475 421.723 187.113C436.303 183.23 451.148 180.289 466.126 178.405V275.9C459.601 277.088 453.094 278.543 446.67 280.254C388.527 295.827 336.337 333.602 303.838 389.86C271.339 446.148 264.752 510.244 280.315 568.386C295.909 626.529 333.673 678.719 389.951 711.218C446.209 743.685 510.304 750.304 568.447 734.741C626.59 719.137 678.801 681.382 711.299 625.105C725.335 600.792 734.505 575.036 739.187 548.93H836.734C831.395 591.531 817.625 633.814 794.799 673.34L729.546 635.647L741.072 731.513L742.321 741.881L752.628 827.379L711.011 769.524C675.808 796.827 635.738 816.519 593.394 827.841C511.41 849.828 421.025 840.504 341.716 794.737L379.409 729.453L283.543 741.01L273.173 742.26H273.145V742.26ZM653.567 507.476C653.567 426.855 588.192 361.489 507.571 361.489C426.928 361.489 361.553 426.855 361.553 507.476C361.553 588.128 426.928 653.504 507.571 653.504C588.191 653.504 653.567 588.128 653.567 507.476ZM66.658 252.928C136.942 131.182 249.939 49.4241 375.813 15.7061C405.341 7.78605 435.574 2.52 466.126 0V96.85C444.027 99.094 422.164 103.1 400.76 108.848C338.427 125.548 279.998 156.766 230.942 201.057L173.701 225.513L84.895 263.472L150.148 301.134C119.945 353.447 102.527 409.643 96.86 466.064H0C5.903 393.199 27.654 320.446 66.658 252.928Z" 
      fill="currentColor"
    />
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'trade', label: 'Instant Trade', icon: ArrowLeftRight },
    { id: 'pro-trade', label: 'Trading Terminal', icon: LayoutGrid },
    { id: 'automation', label: 'Strategy Automation', icon: Workflow },
    { id: 'history', label: 'CFO Console', icon: FileText },
    { id: 'activity', label: 'Audit Log', icon: Shield },
    { id: 'settings', label: 'Governance & Access Control', icon: Users },
  ];

  // Organization Level Settings
  const settingsOptions = [
    { label: 'Risk Controls', icon: ShieldAlert, desc: 'Limits & Drawdown', color: 'text-amber-400' },
    { label: 'API Management', icon: Key, desc: 'Keys & Webhooks', color: 'text-blue-400' },
    { label: 'Custody & Vaults', icon: Building, desc: 'MPC Wallets', color: 'text-zinc-400' },
    { label: 'Compliance', icon: FileCheck, desc: 'KYC & Reports', color: 'text-purple-400' },
    { label: 'Design System', icon: Palette, desc: 'UI Kit & Tokens', id: 'design-system', color: 'text-emerald-400' },
  ];

  return (
    <aside className="hidden md:flex w-[72px] h-full bg-[#09090b] border-r border-white/5 flex-col shrink-0 z-50 transition-all duration-300">
      
      {/* 2. Logo */}
      <div className="pb-6 pt-6 flex justify-center">
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 p-1.5 cursor-pointer hover:scale-105 transition-all active:scale-95 group"
          title="Cryptix Home"
        >
          <CryptixLogo className="w-full h-full text-black group-hover:rotate-12 transition-transform" />
        </div>
      </div>

      {/* 3. Primary Navigation Rail */}
      <nav className="flex-1 px-2" aria-label="Primary Rail Navigation">
        <ul className="space-y-2 flex flex-col items-center">
          {navItems.map((item) => (
            <li key={item.id} className="relative group w-full flex justify-center">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all relative ${
                  activeTab === item.id 
                    ? 'bg-white/10 text-white border border-white/5 shadow-inner' 
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.03]'
                }`}
              >
                {activeTab === item.id && (
                  <div className="absolute left-0 w-0.5 h-4 bg-emerald-500 rounded-r-full"></div>
                )}
                <item.icon size={18} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              </button>
              
              {/* Native-style Tooltip */}
              <div className="absolute left-full ml-3 px-2 py-1 bg-[#1a1a1a] border border-white/10 rounded text-[10px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                {item.label}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* 4. Bottom Actions */}
      <div className="pb-4 px-2 space-y-3 flex flex-col items-center border-t border-white/5 pt-4">
        
        {/* Settings Button with Dropdown (Unified Design) */}
        <div className="relative group">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${isSettingsOpen ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-zinc-600 hover:text-white hover:bg-white/[0.05]'}`}
            >
              <Settings size={18} />
            </button>
            
            {/* Tooltip for Bottom Settings */}
            <div className="absolute left-full ml-3 px-2 py-1 bg-[#1a1a1a] border border-white/10 rounded text-[10px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
               Global Settings
            </div>

            {/* Unified B2B Settings Dropdown */}
            {isSettingsOpen && (
                <>
                    {/* Invisible Backdrop to close on click outside */}
                    <div className="fixed inset-0 z-40" onClick={() => setIsSettingsOpen(false)}></div>
                    
                    <div className="absolute left-full bottom-0 ml-3 w-64 bg-[#09090b] border border-white/10 rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] overflow-hidden z-50 animate-in fade-in slide-in-from-left-2 duration-200">
                        {/* Header matching Profile */}
                        <div className="p-4 border-b border-white/5 bg-zinc-900/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 border border-white/5">
                                    <Building size={20} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Capital Fund</div>
                                    <div className="text-[10px] text-zinc-500 font-mono">Organization Settings</div>
                                </div>
                            </div>
                        </div>

                        {/* List Items */}
                        <div className="p-2 space-y-1">
                            <div className="px-2 py-1.5 text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                                Global Controls
                            </div>
                            
                            {settingsOptions.map((opt) => (
                                <button 
                                    key={opt.label}
                                    onClick={() => {
                                        setIsSettingsOpen(false);
                                        if (opt.id === 'design-system') {
                                            setActiveTab('design-system');
                                        }
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group text-left"
                                >
                                    <div className={`text-zinc-400 group-hover:${opt.color} transition-colors`}>
                                        <opt.icon size={16} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[11px] font-bold text-zinc-200 group-hover:text-white">{opt.label}</div>
                                        <div className="text-[9px] text-zinc-500 group-hover:text-zinc-400">{opt.desc}</div>
                                    </div>
                                    <ChevronRight size={12} className="text-zinc-700 group-hover:text-zinc-500" />
                                </button>
                            ))}
                        </div>
                        
                        {/* Footer Context */}
                        <div className="p-2 border-t border-white/5 bg-zinc-900/30 text-center">
                            <span className="text-[9px] text-zinc-600 font-mono">Build v4.1.0 (Enterprise)</span>
                        </div>
                    </div>
                </>
            )}
        </div>

        <div className="relative group">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg text-zinc-600 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
            >
              <LogOut size={18} />
            </button>
            {/* Tooltip for Logout */}
            <div className="absolute left-full ml-3 px-2 py-1 bg-[#1a1a1a] border border-white/10 rounded text-[10px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
               Disconnect
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
