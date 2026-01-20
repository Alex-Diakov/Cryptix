
import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  ChevronDown, 
  Download, 
  FileCode, 
  Filter, 
  ExternalLink,
  ShieldAlert,
  CheckCircle2, 
  XCircle,
  Clock,
  User,
  Bot,
  Shield,
  AlertTriangle,
  X,
  Plus
} from 'lucide-react';

// --- TYPES ---
type Status = 'CONFIRMED' | 'FAILED' | 'PENDING' | 'REJECTED';
type ActorRole = 'ADMIN' | 'TRADER' | 'BOT' | 'CFO';

interface LogEntry {
  id: string;
  timestamp: string;
  actor: {
    name: string;
    role: ActorRole;
    avatar?: string;
  };
  event: string;
  details: {
    label: string;
    value?: string;
    isRisk?: boolean; // Red text & Bolder row
    isPositive?: boolean; // Green text
  };
  refHash: string;
  status: Status;
}

// --- MOCK DATA (Refactored) ---
const AUDIT_DATA: LogEntry[] = [
  {
    id: 'log_001',
    timestamp: '2026-01-05 14:42:01',
    actor: { name: 'Alex M.', role: 'ADMIN', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex' },
    event: 'Security Policy Update',
    details: { label: '2FA Requirement: Enforced', isPositive: true },
    refHash: '0x71c...99a',
    status: 'CONFIRMED'
  },
  {
    id: 'log_002',
    timestamp: '2026-01-05 14:38:15',
    actor: { name: 'System Bot #4', role: 'BOT', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=bot4' },
    event: 'Algo Trade Execution',
    details: { label: 'BTC/USD Long 10x', value: 'PnL Realized: +$42,500' },
    refHash: '0x82b...11f',
    status: 'CONFIRMED'
  },
  {
    id: 'log_003',
    timestamp: '2026-01-05 14:12:00',
    actor: { name: 'Sarah K.', role: 'TRADER', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
    event: 'Large Withdrawal Request',
    details: { label: 'Outflow to Cold Storage', value: '-150,000.00 USDC', isRisk: true },
    refHash: '0x99a...c2d',
    status: 'PENDING'
  },
  {
    id: 'log_004',
    timestamp: '2026-01-05 13:55:22',
    actor: { name: 'Sarah K.', role: 'TRADER', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
    event: 'Limit Order Placed',
    details: { label: 'Sell ETH @ $3,400', value: '50.00 ETH' },
    refHash: '0x33d...f4e',
    status: 'CONFIRMED'
  },
  {
    id: 'log_005',
    timestamp: '2026-01-05 12:30:45',
    actor: { name: 'Security System', role: 'BOT' }, 
    event: 'Login Attempt',
    details: { label: 'Attempt from: 192.168.1.1 (Russia)', isRisk: true },
    refHash: 'sys_auth_fail',
    status: 'FAILED'
  },
  {
    id: 'log_006',
    timestamp: '2026-01-05 11:15:10',
    actor: { name: 'System Bot #4', role: 'BOT', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=bot4' },
    event: 'Rebalancing',
    details: { label: 'Portfolio Adjustment', value: 'Auto-Swap' },
    refHash: '0x12a...b3c',
    status: 'CONFIRMED'
  },
  {
    id: 'log_007',
    timestamp: '2026-01-05 09:45:00',
    actor: { name: 'Alex M.', role: 'ADMIN', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex' },
    event: 'API Key Revoked',
    details: { label: 'Key ID: legacy_read_only', isRisk: true },
    refHash: 'sys_api_rev',
    status: 'CONFIRMED'
  },
  {
    id: 'log_008',
    timestamp: '2026-01-05 08:30:00',
    actor: { name: 'Elena F.', role: 'CFO', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena' },
    event: 'Report Generated',
    details: { label: 'File: FY2025 Tax Liability.pdf (1.2 MB)' },
    refHash: 'doc_882_a',
    status: 'CONFIRMED'
  }
];

const ActivityLogView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<{ type: string, value: string } | null>(null);

  // --- RENDER HELPERS ---
  
  const getStatusBadge = (status: Status) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-black uppercase tracking-wider">
            <CheckCircle2 size={12} /> Confirmed
          </span>
        );
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[10px] font-black uppercase tracking-wider">
            <XCircle size={12} /> Failed
          </span>
        );
      case 'PENDING':
        return (
          <button className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black uppercase tracking-wider hover:bg-amber-500/20 transition-all cursor-pointer shadow-sm hover:shadow-amber-500/10">
            <Clock size={12} /> Pending
            
            {/* Actionable Tooltip */}
            <div className="absolute right-0 top-full mt-2 w-64 p-4 bg-[#141414] border border-zinc-800 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-left translate-y-1">
               <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500 mt-0.5">
                     <ShieldAlert size={14} />
                  </div>
                  <div>
                     <p className="text-[10px] text-zinc-300 font-medium leading-relaxed normal-case mb-2">
                        Approval required from: <span className="text-white font-bold">Alex M. (Admin)</span>.
                     </p>
                     <div className="text-[9px] font-bold text-emerald-500 flex items-center gap-1 uppercase tracking-wider">
                        Click to review <ChevronDown size={10} className="-rotate-90" />
                     </div>
                  </div>
               </div>
               {/* Arrow */}
               <div className="absolute -top-1.5 right-4 w-3 h-3 bg-[#141414] border-t border-l border-zinc-800 rotate-45"></div>
            </div>
          </button>
        );
      default:
        return null;
    }
  };

  const getRoleIcon = (role: ActorRole) => {
    switch (role) {
      case 'ADMIN': return <Shield size={12} className="text-purple-400" />;
      case 'BOT': return <Bot size={12} className="text-zinc-400" />;
      case 'TRADER': return <User size={12} className="text-blue-400" />;
      case 'CFO': return <FileCode size={12} className="text-amber-400" />;
    }
  };

  // Logic for Row Background Color based on Status
  const getRowBackground = (status: Status) => {
      switch(status) {
          case 'FAILED': return 'bg-rose-500/[0.08] hover:bg-rose-500/[0.12]';
          case 'PENDING': return 'bg-amber-500/[0.06] hover:bg-amber-500/[0.1]';
          default: return 'hover:bg-white/[0.02]';
      }
  };

  // Mock toggle for the filter pill demonstration
  const handleFilterClick = (type: string) => {
      if (activeFilter && activeFilter.type === type) {
          setActiveFilter(null);
      } else {
          setActiveFilter({ type, value: 'Sarah K.' }); // Mock value
      }
  };

  return (
    <div className="h-full overflow-hidden flex flex-col p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-[1700px] mx-auto w-full h-full flex flex-col">
        
        {/* 1. HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 shrink-0">
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <ShieldAlert className="text-zinc-400" />
              Audit Log & Activity
            </h1>
            <p className="text-zinc-400 text-xs font-medium mt-1">
              Immutable record of system events, security alerts, and user actions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all text-[10px] font-bold uppercase tracking-wider">
              <FileCode size={14} />
              <span>API Access</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-black text-[10px] uppercase tracking-wider hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 2. FILTER TOOLBAR */}
        <div className="flex flex-col gap-4 mb-4 shrink-0 bg-[#0a0a0a] p-2 rounded-xl border border-white/5">
           
           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
               {/* Left Group: Search + Date */}
               <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative group flex-1 md:flex-none">
                     <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white" />
                     <input 
                        type="text" 
                        placeholder="Search logs..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-zinc-900 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs font-medium text-white w-full md:w-64 focus:outline-none focus:border-emerald-500/50"
                     />
                  </div>
                  
                  <div className="h-6 w-px bg-white/10 mx-2 hidden md:block"></div>

                  <button className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:border-white/20 transition-all">
                     <Calendar size={14} className="text-zinc-500" />
                     <span>Last 30 Days</span>
                     <ChevronDown size={12} className="ml-1 text-zinc-600" />
                  </button>
               </div>

               {/* Right Group: Filters */}
               <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto justify-start md:justify-end">
                    <div className="flex bg-zinc-900 rounded-lg p-1 border border-white/5 gap-1 w-full md:w-auto">
                         <button 
                            onClick={() => handleFilterClick('Actor')}
                            className={`flex-1 md:flex-none px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${activeFilter?.type === 'Actor' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                         >
                            <User size={12} /> <span>Actor</span> <ChevronDown size={10} />
                         </button>
                         <div className="w-px h-4 bg-white/5 my-auto hidden md:block"></div>
                         <button className="flex-1 md:flex-none px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
                            <FileCode size={12} /> <span>Event</span> <ChevronDown size={10} />
                         </button>
                         <div className="w-px h-4 bg-white/5 my-auto hidden md:block"></div>
                         <button className="flex-1 md:flex-none px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
                            <Filter size={12} /> <span>Status</span> <ChevronDown size={10} />
                         </button>
                    </div>
               </div>
           </div>

           {/* ACTIVE FILTERS (Pill) */}
           {activeFilter && (
               <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1 px-1 pb-1">
                   <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Filtering by:</span>
                   <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-[10px] font-bold text-emerald-500">
                       <span className="opacity-60 uppercase tracking-wider">{activeFilter.type}:</span>
                       <span>{activeFilter.value}</span>
                       <button onClick={() => setActiveFilter(null)} className="ml-1 hover:text-white transition-colors">
                           <X size={10} />
                       </button>
                   </div>
               </div>
           )}
        </div>

        {/* 3. DATA TABLE */}
        <div className="flex-1 bg-zinc-900/40 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-md relative flex flex-col">
           
           {/* Table Header */}
           <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 bg-zinc-900/80 sticky top-0 z-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              <div className="col-span-2 pl-2">Timestamp (UTC)</div>
              <div className="col-span-2">Actor</div>
              <div className="col-span-2">Event Type</div>
              <div className="col-span-3">Details / Asset</div>
              <div className="col-span-2">Ref Hash</div>
              <div className="col-span-1 text-right pr-2">Status</div>
           </div>

           {/* Table Body */}
           <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              <div className="divide-y divide-white/5">
                 {AUDIT_DATA.map((row) => (
                    <div 
                        key={row.id} 
                        className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors group ${getRowBackground(row.status)}`}
                    >
                       
                       {/* 1. Timestamp */}
                       <div className="col-span-2 pl-2 flex items-center gap-2">
                          <span className="font-mono text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">{row.timestamp}</span>
                       </div>

                       {/* 2. Actor */}
                       <div className="col-span-2 flex items-center gap-3">
                          {row.actor.avatar ? (
                             <img src={row.actor.avatar} alt="avatar" className="w-6 h-6 rounded-full bg-zinc-800" />
                          ) : (
                             <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center border border-white/5">
                                <User size={12} className="text-zinc-500" />
                             </div>
                          )}
                          <div className="flex flex-col">
                             <span className="text-xs font-bold text-white leading-none mb-1">{row.actor.name}</span>
                             <div className="flex items-center gap-1">
                                {getRoleIcon(row.actor.role)}
                                <span className="text-[9px] font-bold text-zinc-600 uppercase">{row.actor.role}</span>
                             </div>
                          </div>
                       </div>

                       {/* 3. Event Type */}
                       <div className="col-span-2">
                          <span className={`text-xs font-bold ${row.details.isRisk ? 'text-white' : 'text-zinc-300'}`}>{row.event}</span>
                       </div>

                       {/* 4. Details */}
                       <div className="col-span-3">
                          <div className="flex flex-col">
                             <span className={`text-[11px] ${row.details.isRisk ? 'font-semibold text-zinc-200' : 'font-medium text-zinc-400'} group-hover:text-zinc-300 transition-colors`}>
                                 {row.details.label}
                             </span>
                             {row.details.value && (
                                <span className={`text-xs font-mono font-bold mt-0.5 ${
                                   row.details.isRisk ? 'text-rose-500' : 
                                   row.details.isPositive ? 'text-emerald-500' : 'text-zinc-500'
                                }`}>
                                   {row.details.value}
                                </span>
                             )}
                             {row.details.isRisk && (
                                <span className="text-[9px] font-black text-rose-500 uppercase mt-1 flex items-center gap-1 tracking-wider">
                                   <AlertTriangle size={10} className="fill-rose-500/20" /> CRITICAL
                                </span>
                             )}
                          </div>
                       </div>

                       {/* 5. Ref Hash */}
                       <div className="col-span-2">
                          <a href="https://etherscan.io" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-blue-400 transition-colors group/link w-fit">
                             <span className="text-blue-500/80 group-hover/link:text-blue-400">{row.refHash}</span>
                             <ExternalLink size={10} className="text-zinc-600 group-hover/link:text-blue-400 transition-colors" />
                          </a>
                       </div>

                       {/* 6. Status */}
                       <div className="col-span-1 text-right pr-2">
                          {getStatusBadge(row.status)}
                       </div>

                    </div>
                 ))}
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

export default ActivityLogView;
