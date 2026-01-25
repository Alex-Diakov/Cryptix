
import React from 'react';
import { X, ArrowDown, ShieldCheck, Info, Wallet, Route, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'SWAP' | 'LIMIT' | 'ALGO';
  data: {
    payAmount: string;
    payToken: string;
    receiveAmount: string;
    receiveToken: string;
    rate: string;
    fee: string;
  };
}

const ReviewModal: React.FC<ReviewModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  type, 
  data 
}) => {
  if (!isOpen) return null;

  // --- DERIVED DATA FOR DISPLAY ---
  // In a real app, these would come from the quote/simulation object directly.
  
  // 1. Calculate Min Received (Mock 0.5% Slippage)
  const receiveNum = parseFloat(data.receiveAmount.replace(/,/g, ''));
  const minReceived = receiveNum * 0.995;
  const minReceivedStr = minReceived.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });

  // 2. Dynamic Styles
  const getStyles = () => {
    switch (type) {
      case 'LIMIT':
        return {
          btn: 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20',
          text: 'text-blue-500',
          label: 'Limit Order',
          route: 'Order Book',
          desc: 'GTC Limit'
        };
      case 'ALGO':
        return {
          btn: 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20',
          text: 'text-purple-500',
          label: 'Algo Strategy',
          route: 'TWAP Engine',
          desc: 'Time-Weighted'
        };
      default: // SWAP
        return {
          btn: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20',
          text: 'text-emerald-400',
          label: 'Instant Swap',
          route: 'Uniswap V3 (Smart Router)',
          desc: 'Market Order'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Card - "Ticket Style" - Matching BridgeModal rounded-[2rem] */}
      <div className="relative w-full max-w-md bg-[#09090b] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        
        {/* Header - Consistent with BridgeModal */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md">
          <div>
            <h3 className="text-base font-black text-white tracking-tight leading-none">CONFIRM {type}</h3>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{styles.desc} Execution</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-white bg-zinc-900/50 hover:bg-zinc-800 rounded-lg transition-colors border border-white/5"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body - The Trade Flow */}
        <div className="px-6 py-6 flex flex-col gap-2">
          
          {/* 1. SELLING (Source) */}
          <div className="flex flex-col">
             <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">You Pay</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-900 rounded-md border border-white/5">
                    {/* Placeholder Icon */}
                    <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                    <span className="text-[10px] font-bold text-zinc-300">{data.payToken}</span>
                </div>
             </div>
             <div className="text-3xl lg:text-4xl font-mono font-medium text-white tracking-tight tabular-nums truncate">
                {data.payAmount}
             </div>
          </div>

          {/* CONNECTOR (Visual Flow) */}
          <div className="flex items-center gap-4 py-2 opacity-50">
             <div className="h-px bg-zinc-800 flex-1"></div>
             <div className="p-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500">
                <ArrowDown size={14} />
             </div>
             <div className="h-px bg-zinc-800 flex-1"></div>
          </div>

          {/* 2. BUYING (Destination) */}
          <div className="flex flex-col">
             <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">You Receive</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-900 rounded-md border border-white/5">
                    {/* Placeholder Icon */}
                    <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                    <span className="text-[10px] font-bold text-zinc-300">{data.receiveToken}</span>
                </div>
             </div>
             <div className={`text-3xl lg:text-4xl font-mono font-medium tracking-tight tabular-nums truncate ${styles.text}`}>
                {data.receiveAmount}
             </div>
          </div>

        </div>

        {/* Execution Details (Receipt Data) */}
        <div className="px-6 pb-6">
            <div className="bg-zinc-900/40 rounded-2xl p-5 border border-white/5 space-y-3">
                
                {/* Rate */}
                <div className="flex justify-between items-center text-[11px]">
                    <span className="text-zinc-500 font-medium">Rate</span>
                    <span className="text-zinc-200 font-mono font-bold">{data.rate}</span>
                </div>

                {/* Network Cost */}
                <div className="flex justify-between items-center text-[11px]">
                    <span className="text-zinc-500 font-medium flex items-center gap-1">
                        Network Cost
                    </span>
                    <span className="text-zinc-200 font-mono font-bold">{data.fee}</span>
                </div>

                {/* Price Impact (Critical) */}
                <div className="flex justify-between items-center text-[11px]">
                    <span className="text-zinc-500 font-medium">Price Impact</span>
                    <span className="text-zinc-400 font-mono font-bold">~0.05%</span>
                </div>

                {/* Min Received (Critical) */}
                <div className="flex justify-between items-center text-[11px]">
                    <span className="text-zinc-500 font-medium">Min. Received</span>
                    <span className="text-zinc-200 font-mono font-bold">{minReceivedStr} {data.receiveToken}</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/5 w-full my-1"></div>

                {/* Route */}
                <div className="flex justify-between items-center text-[11px] pt-1">
                    <span className="text-zinc-500 font-medium flex items-center gap-1">
                        <Route size={12} /> Route
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[9px] uppercase tracking-wide">
                            {styles.route}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 pb-6 pt-0 mt-auto space-y-4">
            
            {/* Simulation Status (Subtle) */}
            <div className="flex items-center justify-center gap-2 bg-emerald-500/5 py-2 rounded-lg border border-emerald-500/10">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wide">Simulation Successful</span>
            </div>

            {/* Execute Button */}
            <button 
                onClick={onConfirm}
                className={`w-full h-14 rounded-xl font-black text-[12px] uppercase tracking-[0.2em] text-white shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${styles.btn}`}
            >
                <Wallet size={18} fill="currentColor" />
                <span>Sign & Execute</span>
            </button>
        </div>

      </div>
    </div>
  );
};

export default ReviewModal;
