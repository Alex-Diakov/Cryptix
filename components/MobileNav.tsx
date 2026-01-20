
import React from 'react';
import { Home, ArrowLeftRight, LayoutGrid, FileText, Workflow } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'pro-trade', icon: LayoutGrid, label: 'Pro' },
    { id: 'trade', icon: ArrowLeftRight, label: 'Trade', isAction: true },
    { id: 'automation', icon: Workflow, label: 'Bots' },
    { id: 'history', icon: FileText, label: 'Reports' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 pb-6 pt-3 z-50 flex items-end justify-between">
      {navItems.map((item) => {
        if (item.isAction) {
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center -mb-2"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all active:scale-90 ${
                activeTab === item.id 
                  ? 'bg-emerald-500 text-black shadow-emerald-500/30' 
                  : 'bg-white text-black'
              }`}>
                <item.icon size={28} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-black uppercase mt-2 text-zinc-500">{item.label}</span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center space-y-1 py-1 transition-all active:scale-95 ${
              activeTab === item.id ? 'text-emerald-500' : 'text-zinc-500'
            }`}
          >
            <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileNav;
