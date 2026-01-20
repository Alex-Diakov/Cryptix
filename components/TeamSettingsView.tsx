
import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  UserPlus, 
  MoreHorizontal, 
  ShieldAlert, 
  CheckCircle2, 
  Lock, 
  AlertTriangle, 
  FileText,
  Trash2,
  RefreshCw,
  Key,
  Smartphone,
  Ban,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

// --- TYPES ---
type Role = 'ADMIN' | 'SENIOR_TRADER' | 'JUNIOR_TRADER' | 'CFO';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'ACTIVE' | 'REVOKED' | 'PENDING';
  dailyLimit: number | null; // null for Admin/CFO
  mfaEnabled: boolean;
  lastActive: string;
  avatar: string;
}

// --- MOCK DATA ---
const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: 'usr_1',
    name: 'Alexander V.',
    email: 'alex.v@fund.capital',
    role: 'ADMIN',
    status: 'ACTIVE',
    dailyLimit: null,
    mfaEnabled: true,
    lastActive: 'Just now',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex'
  },
  {
    id: 'usr_2',
    name: 'Sarah Chen',
    email: 'sarah.c@fund.capital',
    role: 'SENIOR_TRADER',
    status: 'ACTIVE',
    dailyLimit: 1000000,
    mfaEnabled: true,
    lastActive: '12m ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
  },
  {
    id: 'usr_3',
    name: 'Mike Ross',
    email: 'mike.r@fund.capital',
    role: 'JUNIOR_TRADER',
    status: 'ACTIVE',
    dailyLimit: 10000,
    mfaEnabled: true,
    lastActive: '2h ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike'
  },
  {
    id: 'usr_4',
    name: 'Elena Fisher',
    email: 'elena.f@audit.firm',
    role: 'CFO',
    status: 'ACTIVE',
    dailyLimit: 0,
    mfaEnabled: true,
    lastActive: '1d ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena'
  }
];

const AUDIT_LOGS = [
    { id: 1, action: 'ROLE_CHANGE', desc: 'Promoted Sarah Chen to Senior Trader', user: 'Alexander V.', time: '2 days ago' },
    { id: 2, action: 'LIMIT_UPDATE', desc: 'Increased Junior Trader Limit to $10k', user: 'Alexander V.', time: '5 days ago' },
    { id: 3, action: 'USER_REVOKE', desc: 'Revoked access for J. Doe (Terminated)', user: 'Alexander V.', time: '1 week ago' },
    // Critical Security Event
    { id: 4, action: 'PERMISSION_DENIED', desc: 'Mike Ross attempted trade on non-whitelisted protocol (SushiSwap)', user: 'System (Policy Engine)', time: '1 hour ago' },
];

const TeamSettingsView: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);

  const handleRevoke = (id: string) => {
    if (confirm('Are you sure? This will instantly terminate their active session and invalidate their MPC shard keys.')) {
        setMembers(prev => prev.map(m => m.id === id ? { ...m, status: 'REVOKED' } : m));
    }
  };

  const getRoleBadge = (role: Role) => {
    switch(role) {
        case 'ADMIN': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
        case 'SENIOR_TRADER': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        case 'JUNIOR_TRADER': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        case 'CFO': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        default: return 'bg-zinc-800 text-zinc-400';
    }
  };

  const getLimitDisplay = (member: TeamMember) => {
    if (member.role === 'ADMIN') return <span className="text-xs font-black text-purple-400 uppercase tracking-widest shadow-purple-500/20 text-shadow-glow">UNLIMITED</span>;
    if (member.role === 'CFO') return <span className="text-xs font-black text-zinc-600 uppercase tracking-widest">READ ONLY</span>;
    if (member.status === 'REVOKED') return <span className="text-zinc-600 font-mono">--</span>;
    return (
        <div className="flex flex-col gap-0.5">
            {/* Using spaces for thousands separator to match design requirement */}
            <span className="text-base font-mono font-bold text-white tracking-tight">
                ${member.dailyLimit?.toLocaleString('en-US').replace(/,/g, ' ')}
            </span>
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                Daily Limit
            </span>
        </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto p-6 lg:p-10 scrollbar-hide animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-[1700px] mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                    <Users className="text-zinc-400" />
                    Governance & Access Control
                </h1>
                <p className="text-zinc-400 text-xs font-medium mt-1">
                    Manage access controls, execution limits, and audit logs.
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">MPC Architecture</span>
                        <span className="text-[9px] text-zinc-500">Private keys are sharded. No single user access.</span>
                    </div>
                </div>
                <button className="flex items-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.1em] hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95">
                    <UserPlus size={16} />
                    <span>Invite Member</span>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* LEFT: MEMBER LIST (8 Cols) */}
            <div className="xl:col-span-8 space-y-6">
                <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-8 shadow-xl backdrop-blur-md overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Team Roster</h3>
                        
                        {/* Interactive Seats Badge */}
                        <button 
                            className="text-[10px] text-zinc-500 font-bold bg-zinc-900 px-3 py-1 rounded-full border border-white/5 flex items-center gap-2 hover:border-white/20 hover:text-zinc-300 transition-all cursor-pointer group"
                            title="Manage Plan & Billing"
                        >
                            <span>{members.filter(m => m.status === 'ACTIVE').length} / 10 Seats Used</span>
                            <CreditCard size={10} className="group-hover:text-emerald-500 transition-colors" />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[9px] font-black text-zinc-500 uppercase tracking-widest border-b border-white/5">
                                    <th className="pb-6 pl-4">User</th>
                                    <th className="pb-6">Role & Access</th>
                                    <th className="pb-6">Execution Limits</th>
                                    <th className="pb-6">Security</th>
                                    <th className="pb-6 text-right pr-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {members.map((member) => (
                                    <tr key={member.id} className={`group transition-colors ${member.status === 'REVOKED' ? 'bg-rose-500/5' : 'hover:bg-white/[0.02]'}`}>
                                        <td className="py-5 pl-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl overflow-hidden border ${member.status === 'REVOKED' ? 'border-rose-500 grayscale opacity-50' : 'border-white/10'}`}>
                                                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className={`text-sm font-bold ${member.status === 'REVOKED' ? 'text-zinc-500 line-through' : 'text-white'}`}>{member.name}</div>
                                                    <div className="text-[10px] text-zinc-500">{member.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5">
                                            <div className="flex flex-col items-start gap-2">
                                                <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider border ${getRoleBadge(member.role)}`}>
                                                    {member.role.replace('_', ' ')}
                                                </span>
                                                {member.status === 'REVOKED' && (
                                                    <span className="flex items-center gap-1 text-[9px] font-bold text-rose-500 uppercase">
                                                        <Ban size={10} /> Access Revoked
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-5">
                                            {getLimitDisplay(member)}
                                        </td>
                                        <td className="py-5">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-400">
                                                    <Smartphone size={12} className={member.mfaEnabled ? 'text-emerald-500' : 'text-zinc-600'} />
                                                    <span>2FA: {member.mfaEnabled ? 'Enabled' : 'Off'}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-400">
                                                    <Key size={12} className={member.status !== 'REVOKED' ? 'text-emerald-500' : 'text-zinc-600'} />
                                                    <span>MPC: {member.status !== 'REVOKED' ? 'Active Shard' : 'Terminated'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 text-right pr-4">
                                            {member.role !== 'ADMIN' && member.status !== 'REVOKED' && (
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg border border-white/5 transition-colors" 
                                                        title="More Actions (Edit, Suspend)"
                                                    >
                                                        <MoreHorizontal size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleRevoke(member.id)}
                                                        className="p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-lg border border-rose-500/20 transition-all shadow-[0_0_10px_rgba(244,63,94,0)] hover:shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                                                        title="REVOKE ACCESS (Kill Switch)"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            )}
                                            {member.status === 'REVOKED' && (
                                                <button className="text-[10px] font-bold text-zinc-500 uppercase hover:text-white transition-colors">Re-Invite</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* AUDIT LOGS */}
                <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-8 shadow-xl backdrop-blur-md">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Admin Activity Log</h3>
                        <button className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest hover:text-emerald-400 flex items-center gap-1">
                            <FileText size={12} /> View Full Report
                        </button>
                    </div>
                    <div className="space-y-3">
                        {AUDIT_LOGS.map((log) => {
                            // Check for Critical Event
                            const isCritical = log.action === 'PERMISSION_DENIED';
                            
                            return (
                                <div key={log.id} className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${
                                    isCritical 
                                    ? 'bg-rose-500/5 border-rose-500/20 hover:bg-rose-500/10' 
                                    : 'bg-zinc-900/30 border-white/5 hover:bg-zinc-900/50'
                                }`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-xl border ${
                                            isCritical 
                                            ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' 
                                            : 'bg-zinc-800 text-zinc-400 border-white/5'
                                        }`}>
                                            {isCritical ? <ShieldAlert size={16} /> : <Shield size={16} />}
                                        </div>
                                        <div>
                                            <p className={`text-xs font-black uppercase tracking-wide mb-0.5 ${
                                                isCritical ? 'text-rose-500' : 'text-white'
                                            }`}>
                                                {log.action.replace('_', ' ')}
                                            </p>
                                            <p className={`text-[10px] font-medium ${isCritical ? 'text-rose-400/80' : 'text-zinc-500'}`}>
                                                {log.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-zinc-300">{log.user}</p>
                                        <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider">{log.time}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* RIGHT: POLICY DEFINITIONS (4 Cols) */}
            <div className="xl:col-span-4 space-y-6">
                
                {/* 1. MPC EXPLAINER CARD */}
                <div className="bg-gradient-to-br from-emerald-900/20 to-zinc-900 border border-emerald-500/20 rounded-[2rem] p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Lock size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-500">
                                <ShieldCheck size={20} />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-wider">Non-Custodial Architecture</h3>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                            Your team members do <strong>not</strong> have private keys. They authenticate via Web3 Auth (Email/SSO) which decrypts a local MPC shard.
                        </p>
                        <div className="bg-black/40 rounded-xl p-4 border border-emerald-500/10">
                             <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Incident Response</p>
                             <p className="text-[10px] text-zinc-400">
                                If you revoke a user, their shard is instantly invalidated by the policy engine. They cannot move funds even if they saved their browser session.
                             </p>
                        </div>
                    </div>
                </div>

                {/* 2. ROLE DEFINITIONS */}
                <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 shadow-xl backdrop-blur-md">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-6">Role Policies</h3>
                    
                    <div className="space-y-4">
                        {/* JUNIOR */}
                        <div className="p-4 rounded-xl border border-blue-500/10 bg-blue-500/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Junior Trader</span>
                                <span className="text-[9px] font-bold text-zinc-500">Tier 1</span>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-[10px] text-zinc-300">
                                    <CheckCircle2 size={10} className="text-blue-500" /> Max Trade: $10,000 / day
                                </li>
                                <li className="flex items-center gap-2 text-[10px] text-zinc-300 cursor-help" title="Can only interact with approved smart contracts.">
                                    <CheckCircle2 size={10} className="text-blue-500" /> Whitelisted Protocols Only
                                </li>
                                <li className="flex items-center gap-2 text-[10px] text-zinc-300">
                                    <CheckCircle2 size={10} className="text-blue-500" /> Cannot initiate transfers to external addresses
                                </li>
                            </ul>
                        </div>

                        {/* SENIOR */}
                        <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Senior Trader</span>
                                <span className="text-[9px] font-bold text-zinc-500">Tier 2</span>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-[10px] text-zinc-300">
                                    <CheckCircle2 size={10} className="text-emerald-500" /> Max Trade: $1,000,000 / day
                                </li>
                                <li className="flex items-center gap-2 text-[10px] text-zinc-300">
                                    <CheckCircle2 size={10} className="text-emerald-500" /> Full DeFi Access
                                </li>
                                <li className="flex items-center gap-2 text-[10px] text-zinc-300">
                                    <CheckCircle2 size={10} className="text-emerald-500" /> Strategy Deployment
                                </li>
                            </ul>
                        </div>

                        {/* CFO */}
                        <div className="p-4 rounded-xl border border-amber-500/10 bg-amber-500/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">CFO / Auditor</span>
                                <span className="text-[9px] font-bold text-zinc-500">Read Only</span>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-[10px] text-zinc-300">
                                    <CheckCircle2 size={10} className="text-amber-500" /> View All Wallets
                                </li>
                                <li className="flex items-center gap-2 text-[10px] text-zinc-300">
                                    <CheckCircle2 size={10} className="text-amber-500" /> Download Tax Reports
                                </li>
                                <li className="flex items-center gap-2 text-[10px] text-zinc-500">
                                    <Lock size={10} /> No Execution Rights
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSettingsView;
