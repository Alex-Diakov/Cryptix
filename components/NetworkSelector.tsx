
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, Signal } from 'lucide-react';

// Define Network Types
export interface Network {
  id: string;
  name: string;
  type: 'Mainnet' | 'Testnet' | 'L2';
  icon: string; // URL or component
  latency: number; // ms
  status: 'Operational' | 'Degraded' | 'Down';
  gasPrice: string;
  blockHeight: string;
  currency: string;
}

interface NetworkSelectorProps {
  selectedNetwork: Network;
  onSelect: (network: Network) => void;
}

export const NETWORKS: Network[] = [
  {
    id: 'eth',
    name: 'Ethereum',
    type: 'Mainnet',
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035',
    latency: 12,
    status: 'Operational',
    gasPrice: '12 Gwei',
    blockHeight: '19420421',
    currency: 'ETH'
  },
  {
    id: 'arb',
    name: 'Arbitrum One',
    type: 'L2',
    icon: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=035',
    latency: 8,
    status: 'Operational',
    gasPrice: '0.1 Gwei',
    blockHeight: '22420100',
    currency: 'ETH'
  },
  {
    id: 'opt',
    name: 'Optimism',
    type: 'L2',
    icon: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png?v=035',
    latency: 14,
    status: 'Operational',
    gasPrice: '0.1 Gwei',
    blockHeight: '11820455',
    currency: 'ETH'
  },
  {
    id: 'pol',
    name: 'Polygon',
    type: 'Mainnet',
    icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=035',
    latency: 18,
    status: 'Degraded',
    gasPrice: '150 Gwei',
    blockHeight: '55420421',
    currency: 'MATIC'
  },
  {
    id: 'sol',
    name: 'Solana',
    type: 'Mainnet',
    icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=035',
    latency: 45,
    status: 'Operational',
    gasPrice: '0.000005 SOL',
    blockHeight: '294204221',
    currency: 'SOL'
  },
  {
    id: 'sep',
    name: 'Sepolia',
    type: 'Testnet',
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035',
    latency: 22,
    status: 'Operational',
    gasPrice: '2 Gwei',
    blockHeight: '5420421',
    currency: 'SepETH'
  }
];

export const NetworkSelector: React.FC<NetworkSelectorProps> = ({ selectedNetwork, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredNetworks = NETWORKS.filter(n => 
    n.name.toLowerCase().includes(search.toLowerCase())
  );

  // Grouping logic
  const groups = {
    Mainnet: filteredNetworks.filter(n => n.type === 'Mainnet'),
    L2: filteredNetworks.filter(n => n.type === 'L2'),
    Testnet: filteredNetworks.filter(n => n.type === 'Testnet'),
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* TRIGGER */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 bg-[#09090b] border ${isOpen ? 'border-emerald-500/50' : 'border-white/10'} rounded-xl hover:border-emerald-500/30 transition-all cursor-pointer group shadow-sm min-w-[140px]`}
      >
         {/* Status Dot */}
         <div className={`w-1.5 h-1.5 rounded-full ${selectedNetwork.status === 'Operational' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`}></div>
         
         <div className="flex items-center gap-2 flex-1">
             <img src={selectedNetwork.icon} alt={selectedNetwork.name} className="w-4 h-4 object-contain" />
             <span className="text-[10px] font-bold text-zinc-200">{selectedNetwork.name}</span>
         </div>
         <ChevronDown size={10} className={`text-zinc-500 group-hover:text-white ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-[#09090b] border border-white/10 rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Search */}
            <div className="p-3 border-b border-white/5 relative">
                <Search size={12} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input 
                    type="text" 
                    placeholder="Find network..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg py-1.5 pl-8 pr-3 text-[10px] font-bold text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50"
                    autoFocus
                />
            </div>

            {/* List */}
            <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 py-1">
                {Object.entries(groups).map(([type, nets]) => (
                    nets.length > 0 && (
                        <div key={type}>
                            <div className="px-3 py-1.5 text-[8px] font-black text-zinc-600 uppercase tracking-widest bg-zinc-900/30">
                                {type}
                            </div>
                            {nets.map(net => (
                                <button 
                                    key={net.id}
                                    onClick={() => {
                                        onSelect(net);
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/5 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <img src={net.icon} alt={net.name} className={`w-5 h-5 object-contain grayscale group-hover:grayscale-0 transition-all ${selectedNetwork.id === net.id ? 'grayscale-0' : ''}`} />
                                        <div className="text-left">
                                            <div className={`text-[11px] font-bold ${selectedNetwork.id === net.id ? 'text-emerald-400' : 'text-zinc-300 group-hover:text-white'}`}>{net.name}</div>
                                            <div className="flex items-center gap-1.5">
                                                <span className={`text-[8px] flex items-center gap-0.5 ${net.latency < 20 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                    <Signal size={8} /> {net.latency}ms
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        {net.status === 'Operational' && (
                                            <span className="hidden sm:block text-[8px] font-bold text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-white/5">
                                                Operational
                                            </span>
                                        )}
                                        {selectedNetwork.id === net.id && <Check size={12} className="text-emerald-500" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )
                ))}
                {filteredNetworks.length === 0 && (
                    <div className="p-4 text-center text-[10px] text-zinc-500">No networks found</div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};
