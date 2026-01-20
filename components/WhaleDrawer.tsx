
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Copy, Bell, Zap, TrendingUp, ShieldCheck, Sparkles, TrendingDown, ArrowRightLeft, Check, Eye } from 'lucide-react';

type ActionType = 'BUY' | 'SELL' | 'BRIDGE' | 'STAKE';

interface WhaleAction {
  id: number;
  entityName: string;
  isVerified: boolean;
  avatar: string;
  metricLabel: string;
  metricValue: string;
  actionType: ActionType;
  assetAmount: string;
  assetSymbol: string;
  destination?: string;
  time: string;
}

const WHALE_ACTIVITY: WhaleAction[] = [
  {
    id: 1,
    entityName: 'Wintermute Trading',
    isVerified: true,
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=winter',
    metricLabel: '30D WIN RATE',
    metricValue: '78%',
    actionType: 'BUY',
    assetAmount: '$1.2M',
    assetSymbol: 'ETH',
    time: '2m ago',
  },
  {
    id: 2,
    entityName: 'Jump Crypto',
    isVerified: true,
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=jump',
    metricLabel: 'TOTAL PNL',
    metricValue: '+$12.4M',
    actionType: 'SELL',
    assetAmount: '$850K',
    assetSymbol: 'SOL',
    time: '8m ago',
  },
  {
    id: 3,
    entityName: 'Whale 0x82...1a',
    isVerified: false,
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=0x82',
    metricLabel: '30D WIN RATE',
    metricValue: '64%',
    actionType: 'BRIDGE',
    assetAmount: '$500K',
    assetSymbol: 'USDC',
    destination: 'Base',
    time: '15m ago',
  },
  {
    id: 4,
    entityName: 'Amber Group',
    isVerified: true,
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=amber',
    metricLabel: 'AVG ROI',
    metricValue: '3.2x',
    actionType: 'BUY',
    assetAmount: '$2.1M',
    assetSymbol: 'ARB',
    time: '21m ago',
  },
  {
    id: 5,
    entityName: 'Smart Money 0x71',
    isVerified: false,
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=0x71',
    metricLabel: '30D WIN RATE',
    metricValue: '91%',
    actionType: 'STAKE',
    assetAmount: '$1.5M',
    assetSymbol: 'ETH',
    destination: 'Lido',
    time: '42m ago',
  }
];

interface WhaleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhaleDrawer: React.FC<WhaleDrawerProps> = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset tracking state when closed/re-opened
  useEffect(() => {
    if (isOpen) setIsTracking(false);
  }, [isOpen]);

  const handleTrackClick = () => {
    setIsTracking(true);
  };

  if (!mounted) return null;

  const portalRoot = document.getElementById('portal-root') || document.body;

  const getActionColor = (type: ActionType) => {
    switch (type) {
      case 'BUY': return 'text-emerald-500';
      case 'SELL': return 'text-rose-500';
      case 'BRIDGE': return 'text-blue-400';
      case 'STAKE': return 'text-purple-400';
      default: return 'text-white';
    }
  };

  const getActionIcon = (type: ActionType) => {
    switch (type) {
      case 'BUY': return <TrendingUp size={16} />;
      case 'SELL': return <TrendingDown size={16} />;
      case 'BRIDGE': return <ArrowRightLeft size={16} />;
      case 'STAKE': return <Zap size={16} />;
    }
  };

  return createPortal(
    <div className="relative z-[9999]">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[480px] bg-[#09090b] border-l border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,1)] transition-transform duration-500 ease-in-out flex flex-col z-[10000] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header (Fixed) - UPDATED STYLES */}
        <div className="flex-shrink-0 pt-12 px-8 pb-6 border-b border-white/5 relative bg-zinc-900/80 backdrop-blur-xl">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors p-2 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10"
          >
            <X size={18} />
          </button>
          
          <div className="flex items-center space-x-3 mb-1">
            <h2 className="text-xl font-bold text-white tracking-tight">Smart Money Flow</h2>
          </div>
          <div className="flex items-center space-x-2">
             <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Live Updates</span>
          </div>
        </div>

        {/* Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide bg-[#09090b]">
          
          {/* On-Chain Analysis Block */}
          <div className="bg-zinc-900 border border-white/5 p-5 rounded-lg relative overflow-hidden group">
            <div className="flex items-start space-x-3 relative z-10">
              <Sparkles size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest block mb-1">On-Chain Analysis</span>
                <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                  Institutional accumulation of <span className="text-white font-bold">ETH</span> detected. Large whales are withdrawing from CEX to <span className="text-white font-bold">Cold Storage</span> (bullish signal).
                </p>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1 border-b border-white/5 pb-2">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Activity Feed</h3>
            </div>

            {WHALE_ACTIVITY.map((whale) => (
              <div key={whale.id} className="bg-zinc-900/30 border border-white/5 p-4 rounded-lg hover:bg-zinc-900/50 transition-all group relative overflow-hidden">
                {/* Header: Entity Info */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 p-0.5">
                      <img src={whale.avatar} alt={whale.entityName} className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-bold text-white">{whale.entityName}</span>
                        {whale.isVerified && <ShieldCheck size={12} className="text-blue-500" />}
                      </div>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                          {whale.metricLabel}: <span className="text-zinc-300">{whale.metricValue}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button title="Copy" className="p-1.5 bg-zinc-800 rounded hover:text-white transition-colors text-zinc-500"><Copy size={10} /></button>
                  </div>
                </div>

                {/* Body: Action & Amount */}
                <div className="flex items-baseline space-x-2 mb-1">
                  <div className={`flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wide ${getActionColor(whale.actionType)}`}>
                    {getActionIcon(whale.actionType)}
                    <span>{whale.actionType}</span>
                  </div>
                  <span className="text-white text-sm font-mono font-bold tracking-tight">
                    {whale.assetAmount} <span className="text-zinc-500">{whale.assetSymbol}</span>
                  </span>
                </div>
                
                {/* Destination */}
                {(whale.actionType === 'BRIDGE' || whale.actionType === 'STAKE') && whale.destination && (
                    <div className="text-[9px] text-zinc-500 font-mono mb-1 flex items-center gap-1">
                        <span>to</span>
                        <span className="text-zinc-300 font-bold uppercase">{whale.destination}</span>
                    </div>
                )}

                {/* Footer: Time */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-2">
                  <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{whale.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex-shrink-0 p-8 border-t border-white/5 bg-zinc-950/90 backdrop-blur-xl">
          <button 
             onClick={handleTrackClick}
             disabled={isTracking}
             className={`w-full py-4 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-[0.98] flex items-center justify-center space-x-3 ${
                 isTracking 
                 ? 'bg-transparent border border-emerald-500 text-emerald-500 cursor-default' 
                 : 'bg-transparent border border-white/20 text-white hover:border-emerald-500 hover:text-emerald-500'
             }`}
          >
            {isTracking ? (
                <>
                    <Check size={14} />
                    <span>Tracking Active (3)</span>
                </>
            ) : (
                <>
                    <span>Follow & Track Wallets</span>
                </>
            )}
          </button>
        </div>
      </div>
    </div>,
    portalRoot
  );
};

export default WhaleDrawer;
