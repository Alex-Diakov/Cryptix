
import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Download, 
  Filter, 
  ChevronDown, 
  Scale, 
  Printer, 
  FileSpreadsheet,
  TrendingUp, 
  AlertTriangle,
  CheckCircle2, 
  PieChart,
  Globe,
  Calculator,
  Settings,
  RefreshCw,
  Coins,
  ExternalLink,
  ArrowRight,
  Building2,
  BadgeCheck,
  UserCheck,
  Landmark,
  Calendar
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, ReferenceLine } from 'recharts';

// --- TYPES & MOCK DATA ---

const MONTHLY_PNL_BASE = [
  { month: 'Jan', gain: 125000, loss: -20000, net: 105000 },
  { month: 'Feb', gain: 84000, loss: -5000, net: 79000 },
  { month: 'Mar', gain: 32000, loss: -80000, net: -48000 },
  { month: 'Apr', gain: 156000, loss: -12000, net: 144000 },
  { month: 'May', gain: 98000, loss: -40000, net: 58000 },
  { month: 'Jun', gain: 45000, loss: -1000, net: 44000 },
];

type HoldingPeriod = 'Short-Term' | 'Long-Term' | 'N/A';
type TaxLotStatus = 'RECONCILED' | 'NEEDS_REVIEW';

interface TaxLot {
  id: string;
  date: string;
  asset: string;
  type: string;
  quantity: number;
  costBasis: number;
  proceeds: number;
  fee: number;
  pnl: number;
  taxable: boolean;
  holdingPeriod: HoldingPeriod;
  status: TaxLotStatus;
  counterparty: string;
  counterpartyType: 'DEX' | 'CEX' | 'OTC' | 'PROTOCOL' | 'AIRDROP' | 'BRIDGE';
  kycStatus: 'VERIFIED' | 'UNKNOWN' | 'N/A';
}

const TAX_LOTS_BASE: TaxLot[] = [
  { 
    id: 'TX-9921', 
    date: '2024-06-12', 
    asset: 'ETH', 
    type: 'Sell', 
    quantity: 4.5, 
    costBasis: 12450.00, 
    proceeds: 15600.00, 
    fee: 12.50,
    pnl: 3137.50,
    taxable: true, 
    holdingPeriod: 'Short-Term',
    status: 'NEEDS_REVIEW',
    counterparty: 'Wintermute OTC',
    counterpartyType: 'OTC',
    kycStatus: 'VERIFIED'
  },
  { 
    id: 'TX-9922', 
    date: '2024-06-10', 
    asset: 'USDC', 
    type: 'Bridge', 
    quantity: 50000, 
    costBasis: 50000, 
    proceeds: 49950, 
    fee: 50.00,
    pnl: -50.00, 
    taxable: true, 
    holdingPeriod: 'Short-Term',
    status: 'RECONCILED',
    counterparty: 'Stargate Finance',
    counterpartyType: 'BRIDGE',
    kycStatus: 'VERIFIED'
  },
  { 
    id: 'TX-9923', 
    date: '2024-06-08', 
    asset: 'SOL', 
    type: 'Stake', 
    quantity: 240, 
    costBasis: 18000, 
    proceeds: 18000, 
    fee: 1.25,
    pnl: 0, 
    taxable: false, 
    holdingPeriod: 'N/A',
    status: 'RECONCILED',
    counterparty: 'Lido Protocol',
    counterpartyType: 'PROTOCOL',
    kycStatus: 'VERIFIED'
  },
  { 
    id: 'TX-9924', 
    date: '2024-05-28', 
    asset: 'PEPE', 
    type: 'Swap', 
    quantity: 15000000, 
    costBasis: 4200.00, 
    proceeds: 8400.00, 
    fee: 24.50,
    pnl: 4175.50, 
    taxable: true, 
    holdingPeriod: 'Short-Term',
    status: 'RECONCILED',
    counterparty: 'Uniswap V3',
    counterpartyType: 'DEX',
    kycStatus: 'UNKNOWN'
  },
  { 
    id: 'TX-9925', 
    date: '2024-05-15', 
    asset: 'ARB', 
    type: 'Airdrop', 
    quantity: 5000, 
    costBasis: 0, 
    proceeds: 5500.00, 
    fee: 0,
    pnl: 5500.00, 
    taxable: true, 
    holdingPeriod: 'N/A',
    status: 'RECONCILED',
    counterparty: 'Arbitrum Foundation',
    counterpartyType: 'AIRDROP',
    kycStatus: 'VERIFIED'
  },
  { 
    id: 'TX-9810', 
    date: '2024-04-10', 
    asset: 'BTC', 
    type: 'Sell', 
    quantity: 0.5, 
    costBasis: 20000.00, 
    proceeds: 35000.00, 
    fee: 45.00,
    pnl: 14955.00, 
    taxable: true, 
    holdingPeriod: 'Long-Term',
    status: 'RECONCILED',
    counterparty: 'Coinbase Prime',
    counterpartyType: 'CEX',
    kycStatus: 'VERIFIED'
  },
];

const HistoryView: React.FC = () => {
  // --- GLOBAL CONFIG STATE ---
  const [fiscalYear, setFiscalYear] = useState('2024');
  const [accountingMethod, setAccountingMethod] = useState<'HIFO' | 'FIFO' | 'LIFO'>('HIFO');
  const [jurisdiction, setJurisdiction] = useState('USA');
  const [taxRate, setTaxRate] = useState(30); // Default USA STCG
  
  const [showTaxableOnly, setShowTaxableOnly] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // --- HANDLERS ---
  const handleJurisdictionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setJurisdiction(val);
    switch(val) {
      case 'USA': setTaxRate(30); break;
      case 'UK': setTaxRate(20); break;
      case 'Germany': setTaxRate(26); break;
      case 'Dubai': setTaxRate(0); break;
      default: setTaxRate(30);
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  // --- MATH ENGINE ---

  // 1. Get Multiplier based on Accounting Method
  const methodMultiplier = useMemo(() => {
    switch (accountingMethod) {
      case 'FIFO': return 1.0;
      case 'LIFO': return 0.85; // Simulating higher cost basis -> lower gain
      case 'HIFO': return 0.72; // Simulating highest cost basis -> lowest gain
      default: return 1.0;
    }
  }, [accountingMethod]);

  // 2. Dynamic Chart Data
  // We apply the multiplier to the GAINS. Losses usually stay realized as is, 
  // or we assume HIFO also minimizes net PnL.
  const dynamicMonthlyData = useMemo(() => {
    return MONTHLY_PNL_BASE.map(m => {
        const adjustedGain = m.gain * methodMultiplier;
        // Net = Gain + Loss (Loss is negative)
        const adjustedNet = adjustedGain + m.loss;
        return {
            ...m,
            gain: adjustedGain,
            net: adjustedNet
        };
    });
  }, [methodMultiplier]);

  // 3. Dynamic Table Data
  const filteredData = useMemo(() => {
    let data = showTaxableOnly ? TAX_LOTS_BASE.filter(t => t.taxable) : TAX_LOTS_BASE;
    // Update individual lot PnL based on method multiplier for consistency
    return data.map(tx => {
        if (tx.pnl > 0 && tx.taxable) {
            const newPnL = tx.pnl * methodMultiplier;
            return { 
                ...tx, 
                pnl: newPnL,
                // Adjust cost basis visually to match new PnL
                costBasis: tx.proceeds - newPnL 
            };
        }
        return tx;
    });
  }, [showTaxableOnly, methodMultiplier]);

  // 4. Aggregated Financials
  const financials = useMemo(() => {
    // Current Realized PnL (from dynamic chart sum)
    const currentRealizedPnL = dynamicMonthlyData.reduce((acc, curr) => acc + curr.net, 0);
    
    // Baseline (FIFO) Realized PnL
    const baseRealizedPnL = MONTHLY_PNL_BASE.reduce((acc, curr) => acc + curr.net, 0);

    // Liabilities
    const estimatedLiability = currentRealizedPnL * (taxRate / 100);
    const fifoLiability = baseRealizedPnL * (taxRate / 100);

    // Savings vs FIFO
    const methodSavings = Math.max(0, fifoLiability - estimatedLiability);

    // Labels
    let methodLabel = "STANDARD";
    if (accountingMethod === 'LIFO') methodLabel = "MODERATE";
    if (accountingMethod === 'HIFO') methodLabel = "OPTIMIZED";

    // Constants
    const unrealizedPnl = 424005.40; 
    const harvestLosses = -28200.00;
    const potentialHarvestSavings = Math.abs(harvestLosses * (taxRate / 100));

    return { 
        realizedPnl: currentRealizedPnL, 
        unrealizedPnl, 
        estLiability: estimatedLiability, 
        methodSavings,
        methodLabel,
        harvestLosses,
        potentialHarvestSavings
    };
  }, [dynamicMonthlyData, taxRate, accountingMethod]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      
      {/* HEADER & GLOBAL CONFIGURATION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <FileText className="text-zinc-400" />
              CFO Reporting Console
           </h1>
           <p className="text-zinc-400 text-xs font-medium mt-1">
              Real-time tax liability tracking, audit-ready reports, and portfolio reconciliation.
           </p>
        </div>

        {/* STANDARDIZED CONTROL BAR */}
        <div className="flex flex-wrap items-center gap-3 bg-[#0a0a0a] p-2 rounded-xl border border-white/5 shadow-inner">
           
           {/* 1. Fiscal Year */}
           <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Calendar size={14} className="text-zinc-500" />
              </div>
              <select 
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
                className="appearance-none bg-zinc-900 border border-white/10 rounded-lg py-2 pl-9 pr-8 text-[10px] font-bold text-white outline-none focus:border-emerald-500/50 transition-colors uppercase tracking-wider hover:bg-zinc-800 cursor-pointer h-9 shadow-sm"
              >
                 <option value="2024">FY 2024</option>
                 <option value="2023">FY 2023</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
           </div>

           <div className="w-px h-5 bg-white/10 mx-1"></div>

           {/* 2. Jurisdiction */}
           <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Globe size={14} className="text-zinc-500" />
              </div>
              <select 
                value={jurisdiction}
                onChange={handleJurisdictionChange}
                className="appearance-none bg-zinc-900 border border-white/10 rounded-lg py-2 pl-9 pr-8 text-[10px] font-bold text-white outline-none focus:border-emerald-500/50 transition-colors uppercase tracking-wider hover:bg-zinc-800 cursor-pointer min-w-[140px] h-9 shadow-sm"
              >
                 <option value="USA">USA (IRS)</option>
                 <option value="UK">UK (HMRC)</option>
                 <option value="Germany">Germany (BZSt)</option>
                 <option value="Dubai">Dubai (0% Tax)</option>
                 <option value="Custom">Custom Region</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
           </div>

           {/* 3. Tax Rate Input (Dynamic) */}
           <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Settings size={14} className="text-zinc-500" />
              </div>
              <input 
                 type="number" 
                 value={taxRate}
                 onChange={(e) => setTaxRate(Number(e.target.value))}
                 className="w-20 bg-zinc-900 border border-white/10 rounded-lg py-2 pl-9 pr-2 text-[10px] font-bold text-white outline-none focus:border-emerald-500/50 transition-colors text-center h-9 shadow-sm"
              />
              <span className="absolute right-3 text-[10px] font-bold text-zinc-600 pointer-events-none">%</span>
           </div>

           <div className="w-px h-5 bg-white/10 mx-1"></div>

           {/* 4. Accounting Method */}
           <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Calculator size={14} className="text-zinc-500" />
              </div>
              <select 
                value={accountingMethod}
                onChange={(e) => setAccountingMethod(e.target.value as any)}
                className="appearance-none bg-zinc-900 border border-white/10 rounded-lg py-2 pl-9 pr-8 text-[10px] font-bold text-white outline-none focus:border-emerald-500/50 transition-colors uppercase tracking-wider hover:bg-zinc-800 cursor-pointer h-9 shadow-sm"
              >
                 <option value="HIFO">HIFO (Optimized)</option>
                 <option value="FIFO">FIFO (Standard)</option>
                 <option value="LIFO">LIFO</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
           </div>

        </div>
      </div>

      {/* KPI METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
         {/* Card 1: Realized PnL */}
         <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Scale size={80} />
            </div>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
               Realized PnL <span className="bg-zinc-800 text-zinc-400 px-1.5 rounded text-[9px]">Taxable</span>
            </span>
            <div className="flex items-baseline gap-3">
               <span className="text-3xl font-mono font-bold text-white">${financials.realizedPnl.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-wide">
               <TrendingUp size={12} />
               <span>+18.2% YTD</span>
            </div>
         </div>

         {/* Card 2: Unrealized PnL */}
         <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <PieChart size={80} />
            </div>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
               Unrealized PnL <span className="bg-zinc-800 text-zinc-400 px-1.5 rounded text-[9px]">Paper</span>
            </span>
            <div className="flex items-baseline gap-3">
               <span className="text-3xl font-mono font-bold text-white">${financials.unrealizedPnl.toLocaleString('en-US')}</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
               <span>Mark-to-Market Value</span>
            </div>
         </div>

         {/* Card 3: Est Tax Liability */}
         <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <FileText size={80} />
            </div>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Est. Tax Liability</span>
            <div className="flex items-baseline gap-3">
               <span className={`text-3xl font-mono font-bold ${financials.estLiability > 60000 ? 'text-rose-500' : financials.estLiability > 20000 ? 'text-orange-500' : 'text-yellow-500'}`}>
                   ${financials.estLiability.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
               </span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
               <AlertTriangle size={12} className={financials.methodLabel === 'OPTIMIZED' ? 'text-emerald-500' : 'text-orange-500'} />
               <span>Method: {accountingMethod} ({financials.methodLabel})</span>
            </div>
         </div>

         {/* Card 4: SPLIT - Harvest & Method Savings */}
         <div className="grid grid-cols-2 gap-3 h-full">
            {/* Card 4A: Harvest Opportunity */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-4 flex flex-col justify-between relative overflow-hidden group">
               <div>
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1 block">Harvest Opp.</span>
                  <div className="text-xl font-mono font-bold text-rose-400 leading-tight">
                     ${Math.abs(financials.harvestLosses).toLocaleString('en-US')}
                  </div>
                  <div className="text-[9px] text-zinc-500 mt-1 font-medium">
                     Tax Savings: <span className="text-emerald-500 font-bold">~${financials.potentialHarvestSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
               </div>
               <button className="mt-3 w-full py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-emerald-500 hover:text-white transition-all">
                  Harvest
               </button>
            </div>

            {/* Card 4B: Method Savings */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-4 flex flex-col justify-center relative overflow-hidden group">
               <div className="absolute right-0 top-0 p-2 opacity-5">
                  <Coins size={40} />
               </div>
               <div>
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1 block">Method Savings</span>
                  <div className="text-xl font-mono font-bold text-emerald-500 leading-tight">
                     +${financials.methodSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-[9px] text-zinc-500 mt-1 font-medium leading-tight">
                     Vs. FIFO Standard
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-96">
         {/* CHART SECTION: REDESIGNED NET BAR CHART */}
         <div className="lg:col-span-2 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Realized Gains/Losses (Monthly)</h3>
                <div className="flex gap-2">
                   <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-zinc-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Net Profit</span>
                   <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-zinc-500"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Net Loss</span>
                </div>
             </div>
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={dynamicMonthlyData} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.4} />
                      <ReferenceLine y={0} stroke="#52525b" strokeWidth={1} />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#52525b', fontSize: 10, fontWeight: 800 }} 
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#52525b', fontSize: 10, fontWeight: 700 }}
                        tickFormatter={(value) => value === 0 ? '$0' : `${value > 0 ? '+' : ''}${(value/1000).toFixed(0)}k`}
                        width={40}
                      />
                      <Tooltip 
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                    <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] min-w-[200px] animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
                                        {/* Header */}
                                        <div className="mb-4 border-b border-white/5 pb-3">
                                            <div className="text-zinc-400 text-[10px] uppercase tracking-wider font-bold mb-1">{label} Performance</div>
                                            <div className={`text-lg font-mono font-medium tracking-tight ${data.net >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {data.net >= 0 ? '+' : ''}{data.net.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                            </div>
                                        </div>

                                        {/* Breakdown List */}
                                        <div className="flex flex-col gap-2">
                                            {/* Gain Row */}
                                            <div className="flex items-center justify-between text-[11px] h-5 w-full">
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <div className="w-2 h-2 rounded-full shadow-[0_0_5px_rgba(0,0,0,0.5)] shrink-0 bg-emerald-500" />
                                                    <span className="text-zinc-300 font-medium tracking-wide">Realized Gain</span>
                                                    <div className="flex-1 border-b border-dotted border-white/10 h-3 mx-2 opacity-20"></div>
                                                </div>
                                                <span className="text-emerald-500 font-mono tabular-nums font-bold">
                                                    +${data.gain.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                                                </span>
                                            </div>

                                            {/* Loss Row */}
                                            <div className="flex items-center justify-between text-[11px] h-5 w-full">
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <div className="w-2 h-2 rounded-full shadow-[0_0_5px_rgba(0,0,0,0.5)] shrink-0 bg-rose-500" />
                                                    <span className="text-zinc-300 font-medium tracking-wide">Realized Loss</span>
                                                    <div className="flex-1 border-b border-dotted border-white/10 h-3 mx-2 opacity-20"></div>
                                                </div>
                                                <span className="text-rose-500 font-mono tabular-nums font-bold">
                                                    ${data.loss.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                      />
                      <Bar dataKey="net" radius={[2, 2, 2, 2]}>
                        {dynamicMonthlyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.net >= 0 ? '#10b981' : '#f43f5e'} />
                        ))}
                      </Bar>
                   </BarChart>
                </ResponsiveContainer>
             </div>
         </div>

         {/* EXPORT OPTIONS */}
         <div className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between">
            <div>
               <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-6">Auditor Tools</h3>
               <div className="space-y-3">
                  <button 
                    onClick={handleExport}
                    disabled={isExporting}
                    className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800 border border-white/5 hover:border-white/10 rounded-xl transition-all group disabled:opacity-50"
                  >
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500 border border-rose-500/20">
                           <FileText size={18} />
                        </div>
                        <div className="text-left">
                           <span className="block text-xs font-bold text-white">Form 8949 (PDF)</span>
                           <span className="block text-[9px] text-zinc-500">IRS Compatible</span>
                        </div>
                     </div>
                     <Download size={14} className={`text-zinc-600 group-hover:text-white ${isExporting ? 'animate-bounce' : ''}`} />
                  </button>

                  {/* ERP INTEGRATION BUTTON (Standardized Style) */}
                  <button className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800 border border-white/5 hover:border-blue-500/30 rounded-xl transition-all group">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                           <RefreshCw size={18} />
                        </div>
                        <div className="text-left">
                           <span className="block text-xs font-bold text-white">Sync to NetSuite / Xero</span>
                           <span className="block text-[9px] text-zinc-500">Map to Chart of Accounts (GL)</span>
                        </div>
                     </div>
                     <div className="bg-zinc-800 p-1.5 rounded-lg border border-white/5 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                        <Building2 size={12} className="text-zinc-500 group-hover:text-blue-400" />
                     </div>
                  </button>

                  <button className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/10 rounded-xl transition-all group">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 border border-purple-500/20">
                           <Printer size={18} />
                        </div>
                        <div className="text-left">
                           <span className="block text-xs font-bold text-white">Proof of Reserves</span>
                           <span className="block text-[9px] text-zinc-500">Signed Message</span>
                        </div>
                     </div>
                     <Download size={14} className="text-zinc-600 group-hover:text-white" />
                  </button>
               </div>
            </div>
            
            <div className="pt-6 border-t border-white/5">
               <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                  <span>Last reconciled: <span className="text-zinc-300">Just now</span></span>
               </div>
            </div>
         </div>
      </div>

      {/* DETAILED LEDGER TABLE */}
      <section className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 shadow-xl backdrop-blur-md overflow-hidden">
         <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Tax Lots & Events</h3>
            </div>
            
            <div className="flex items-center gap-4">
               {/* Taxable Toggle */}
               <label className="flex items-center gap-3 cursor-pointer group">
                  <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${showTaxableOnly ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>Taxable Only</span>
                  <div className="relative">
                     <input type="checkbox" className="sr-only" checked={showTaxableOnly} onChange={() => setShowTaxableOnly(!showTaxableOnly)} />
                     <div className={`w-10 h-5 rounded-full border transition-all ${showTaxableOnly ? 'bg-emerald-500 border-emerald-500' : 'bg-zinc-900 border-white/10'}`}></div>
                     <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-all ${showTaxableOnly ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
               </label>
               <button className="p-2 bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors border border-white/5">
                  <Filter size={16} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="text-zinc-500 text-[9px] uppercase tracking-[0.2em] border-b border-white/5 bg-zinc-900/50 sticky top-0">
                  <tr>
                     <th className="py-4 pl-4 font-black">Date / ID</th>
                     <th className="py-4 font-black">Event Type</th>
                     {/* Added Counterparty Column for Audit */}
                     <th className="py-4 font-black">Counterparty / KYC</th>
                     <th className="py-4 font-black">Holding Period</th>
                     <th className="py-4 font-black text-right">Cost Basis</th>
                     <th className="py-4 font-black text-right">Proceeds</th>
                     <th className="py-4 font-black text-right text-zinc-600">Fee</th>
                     <th className="py-4 font-black text-right">Net PnL</th>
                     <th className="py-4 font-black text-right pr-4">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/[0.03]">
                  {filteredData.map((tx) => (
                     <tr key={tx.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 pl-4">
                           <div className="text-sm font-bold text-white">{tx.date}</div>
                           <a href={`https://etherscan.io/tx/${tx.id}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 mt-0.5 group/hash w-fit">
                               <span className="text-[10px] font-mono text-zinc-500 group-hover/hash:text-blue-400 transition-colors">{tx.id}</span>
                               <ExternalLink size={8} className="text-zinc-600 group-hover/hash:text-blue-400 transition-colors" />
                           </a>
                        </td>
                        <td className="py-4">
                           <div className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${tx.taxable ? 'bg-orange-500' : 'bg-zinc-600'}`}></span>
                              <div>
                                 <div className="text-xs font-bold text-zinc-300">{tx.type} {tx.asset}</div>
                                 <div className="text-[9px] text-zinc-500 font-mono mt-0.5">{tx.taxable ? 'Taxable Event' : 'Non-Taxable'}</div>
                              </div>
                           </div>
                        </td>
                        
                        {/* COUNTERPARTY CELL (NEW) */}
                        <td className="py-4">
                           <div className="flex flex-col gap-1">
                               <div className="flex items-center gap-1.5">
                                   <span className="text-xs font-bold text-zinc-200">{tx.counterparty}</span>
                                   {tx.kycStatus === 'VERIFIED' && (
                                       <BadgeCheck size={12} className="text-blue-500" fill="currentColor" color="black" />
                                   )}
                               </div>
                               <div className="flex items-center gap-2">
                                   <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                                       tx.counterpartyType === 'OTC' || tx.counterpartyType === 'CEX' 
                                       ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                                       : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                                   }`}>
                                       {tx.counterpartyType}
                                   </span>
                                   {tx.kycStatus === 'UNKNOWN' && (
                                       <span className="text-[8px] text-zinc-600 flex items-center gap-0.5">
                                           <UserCheck size={8} /> No KYC
                                       </span>
                                   )}
                               </div>
                           </div>
                        </td>

                        <td className="py-4">
                           {tx.holdingPeriod === 'Short-Term' && (
                               <span className="inline-flex px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-500 border border-orange-500/20 text-[9px] font-black uppercase tracking-wider">Short Term</span>
                           )}
                           {tx.holdingPeriod === 'Long-Term' && (
                               <span className="inline-flex px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-black uppercase tracking-wider">Long Term</span>
                           )}
                           {tx.holdingPeriod === 'N/A' && (
                               <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">--</span>
                           )}
                        </td>
                        <td className="py-4 text-right font-mono text-xs font-bold text-zinc-400">
                           ${tx.costBasis.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-4 text-right font-mono text-xs font-bold text-zinc-400">
                           ${tx.proceeds.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-4 text-right font-mono text-xs font-bold text-zinc-500">
                           ${tx.fee.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-4 text-right">
                           <span className={`font-mono text-xs font-bold ${tx.pnl > 0 ? 'text-emerald-500' : tx.pnl < 0 ? 'text-rose-500' : 'text-zinc-500'}`}>
                              {tx.pnl > 0 ? '+' : ''}{tx.pnl === 0 ? '--' : `$${tx.pnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                           </span>
                        </td>
                        <td className="py-4 text-right pr-4">
                           {tx.status === 'NEEDS_REVIEW' ? (
                               <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-black uppercase text-amber-500 tracking-wider">
                                   <AlertTriangle size={10} /> Needs Review
                               </span>
                           ) : (
                               <span className="inline-flex items-center px-2 py-1 rounded bg-zinc-800 border border-white/5 text-[9px] font-black uppercase text-zinc-400 tracking-wider">
                                   Reconciled
                               </span>
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination / View All */}
         <div className="mt-8 flex justify-center">
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
               View All 1,024 Transactions
            </button>
         </div>
      </section>

    </div>
  );
};

export default HistoryView;
