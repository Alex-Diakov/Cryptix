
import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Settings, 
  Info, 
  ChevronDown, 
  Plus, 
  ArrowLeft, 
  ArrowRight, 
  Wallet,
  TrendingUp,
  AlertTriangle,
  Zap,
  BarChart2,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  Coins,
  Activity,
  ChevronRight,
  Bell,
  Cog,
  Minus,
  Scale,
  Landmark,
  FileText,
  Lock,
  Sparkles,
  RefreshCw,
  Loader2,
  LogOut,
  ArrowUpRight,
  Gauge,
  Search,
  LayoutList,
  LayoutGrid,
  ArrowUpDown,
  CircleDollarSign,
  PieChart as PieIcon,
  History,
  AlertOctagon
} from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

// Icons
const ETH_ICON = 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035';
const USDC_ICON = 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035';
const USDT_ICON = 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=035';
const AAVE_ICON = 'https://cryptologos.cc/logos/aave-aave-logo.png?v=035';
const CURVE_ICON = 'https://cryptologos.cc/logos/curve-dao-token-crv-logo.png?v=035';
const UNI_ICON = 'https://cryptologos.cc/logos/uniswap-uni-logo.png?v=035';
const GMX_ICON = 'https://cryptologos.cc/logos/gmx-gmx-logo.png?v=035';
const PENDLE_ICON = 'https://cryptologos.cc/logos/pendle-pendle-logo.png?v=035';
const LDO_ICON = 'https://cryptologos.cc/logos/lido-dao-ldo-logo.png?v=035';
const FRAX_ICON = 'https://cryptologos.cc/logos/frax-frax-logo.png?v=035';
const BAL_ICON = 'https://cryptologos.cc/logos/balancer-bal-logo.png?v=035';
const CVX_ICON = 'https://cryptologos.cc/logos/convex-finance-cvx-logo.png?v=035';
const SNX_ICON = 'https://cryptologos.cc/logos/synthetix-snx-logo.png?v=035';
const MKR_ICON = 'https://cryptologos.cc/logos/maker-mkr-logo.png?v=035';
const RPL_ICON = 'https://cryptologos.cc/logos/rocket-pool-rpl-logo.png?v=035';
const DAI_ICON = 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=035';
const WBTC_ICON = 'https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png?v=035';

interface RiskAnalysis {
  audit: string;
  protocol: string;
  ilRisk: string;
}

interface Vault {
  id: string;
  assets: string[];
  icons: string[];
  protocol: string;
  protocolIcon: string;
  name: string;
  apy: number;
  baseApy: number;
  farmApy: number;
  tvl: string;
  risk: 'Low' | 'Moderate' | 'High';
  riskAnalysis: RiskAnalysis;
  strategy: string;
  category: 'LENDING' | 'LIQUIDITY' | 'OPTIONS' | 'YIELD'; 
}

interface Position {
  id: string;
  strategyName: string;
  protocol: string;
  deposit: number;
  rewards: number;
  apy: number;
  status: 'Active' | 'Pending';
  healthFactor?: number; // For lending
  category: 'LENDING' | 'LIQUIDITY' | 'OPTIONS' | 'YIELD';
}

const ACTIVE_POSITIONS: Position[] = [
  {
    id: 'pos_1',
    strategyName: 'Core Lending (ETH/USDC)',
    protocol: 'Aave V3',
    deposit: 50000,
    rewards: 1240.50,
    apy: 12.5,
    status: 'Active',
    healthFactor: 1.15, // Simulate Risk
    category: 'LENDING'
  },
  {
    id: 'pos_2',
    strategyName: 'Stable Swap (USDC/USDT)',
    protocol: 'Curve',
    deposit: 125000,
    rewards: 450.20,
    apy: 5.2,
    status: 'Active',
    category: 'LIQUIDITY'
  },
  {
    id: 'pos_3',
    strategyName: 'Lido Staking (stETH)',
    protocol: 'Lido',
    deposit: 17500,
    rewards: 120.00,
    apy: 3.8,
    status: 'Active',
    category: 'YIELD'
  }
];

const VAULTS: Vault[] = [
  {
    id: 'v_aave_eth_usdc',
    assets: ['ETH', 'USDC'],
    icons: [ETH_ICON, USDC_ICON],
    protocol: 'Aave V3',
    protocolIcon: AAVE_ICON,
    name: 'Core Lending',
    apy: 12.5,
    baseApy: 8.2,
    farmApy: 4.3,
    tvl: '$452M',
    risk: 'Low',
    riskAnalysis: {
        audit: 'Audited by Halborn ✅',
        protocol: 'Blue Chip (Aave)',
        ilRisk: 'None (Lending)'
    },
    strategy: 'Lending',
    category: 'LENDING'
  },
  {
    id: 'v_curve_usdc_usdt',
    assets: ['USDC', 'USDT'],
    icons: [USDC_ICON, USDT_ICON],
    protocol: 'Curve',
    protocolIcon: CURVE_ICON,
    name: 'Stable Swap',
    apy: 5.2,
    baseApy: 2.1,
    farmApy: 3.1,
    tvl: '$1.2B',
    risk: 'Low',
    riskAnalysis: {
        audit: 'Audited by MixBytes',
        protocol: 'Established (Curve)',
        ilRisk: 'Negligible (Pegged)'
    },
    strategy: 'Liquidity',
    category: 'LIQUIDITY'
  },
  {
    id: 'v_uni_eth_usdc',
    assets: ['ETH', 'USDC'],
    icons: [ETH_ICON, USDC_ICON],
    protocol: 'Uniswap V3',
    protocolIcon: UNI_ICON,
    name: 'Concentrated Liquidity',
    apy: 24.5,
    baseApy: 12.0,
    farmApy: 12.5,
    tvl: '$840M',
    risk: 'Moderate',
    riskAnalysis: {
        audit: 'Multiple Audits',
        protocol: 'Top DEX (Uniswap)',
        ilRisk: '-0.5% at 20% move'
    },
    strategy: 'Market Making',
    category: 'LIQUIDITY'
  },
  {
    id: 'v_gmx_glp',
    assets: ['ETH', 'BTC', 'USDC'],
    icons: [ETH_ICON, WBTC_ICON, USDC_ICON],
    protocol: 'GMX',
    protocolIcon: GMX_ICON,
    name: 'GLP Index Fund',
    apy: 38.2,
    baseApy: 15.5,
    farmApy: 22.7,
    tvl: '$480M',
    risk: 'Moderate',
    riskAnalysis: { audit: 'Multiple Audits', protocol: 'Top Perp DEX', ilRisk: 'Asset Index Exposure' },
    strategy: 'Liquidity Provider',
    category: 'LIQUIDITY'
  },
  {
    id: 'v_lido_steth',
    assets: ['ETH'],
    icons: [ETH_ICON],
    protocol: 'Lido',
    protocolIcon: LDO_ICON,
    name: 'Liquid Staking',
    apy: 3.8,
    baseApy: 3.5,
    farmApy: 0.3,
    tvl: '$32B',
    risk: 'Low',
    riskAnalysis: { audit: 'Top Tier Audits', protocol: 'Market Leader', ilRisk: 'None' },
    strategy: 'Staking',
    category: 'YIELD'
  },
  {
    id: 'v_pendle_reth',
    assets: ['rETH'],
    icons: [RPL_ICON],
    protocol: 'Pendle',
    protocolIcon: PENDLE_ICON,
    name: 'Fixed Yield PT-rETH',
    apy: 8.4,
    baseApy: 8.4,
    farmApy: 0,
    tvl: '$150M',
    risk: 'Moderate',
    riskAnalysis: { audit: 'Audited', protocol: 'Yield Trading', ilRisk: 'Interest Rate Risk' },
    strategy: 'Fixed Income',
    category: 'YIELD'
  },
  {
    id: 'v_convex_frax',
    assets: ['FRAX', 'USDC'],
    icons: [FRAX_ICON, USDC_ICON],
    protocol: 'Convex',
    protocolIcon: CVX_ICON,
    name: 'FraxBP Boost',
    apy: 14.2,
    baseApy: 4.2,
    farmApy: 10.0,
    tvl: '$890M',
    risk: 'Low',
    riskAnalysis: { audit: 'Multiple Audits', protocol: 'Curve Booster', ilRisk: 'Low (Stable)' },
    strategy: 'Yield Farming',
    category: 'LIQUIDITY'
  },
  {
    id: 'v_snx_debt',
    assets: ['SNX'],
    icons: [SNX_ICON],
    protocol: 'Synthetix',
    protocolIcon: SNX_ICON,
    name: 'SNX Staking',
    apy: 21.5,
    baseApy: 5.5,
    farmApy: 16.0,
    tvl: '$420M',
    risk: 'High',
    riskAnalysis: { audit: 'Verified', protocol: 'Derivatives', ilRisk: 'Debt Pool Risk' },
    strategy: 'Staking',
    category: 'YIELD'
  },
  {
    id: 'v_balancer_weth_wsteth',
    assets: ['WETH', 'wstETH'],
    icons: [ETH_ICON, LDO_ICON],
    protocol: 'Balancer',
    protocolIcon: BAL_ICON,
    name: 'Liquid Staking Boost',
    apy: 6.8,
    baseApy: 3.8,
    farmApy: 3.0,
    tvl: '$650M',
    risk: 'Low',
    riskAnalysis: { audit: 'Audited', protocol: 'Balancer V2', ilRisk: 'Low (Correlated)' },
    strategy: 'Liquidity',
    category: 'LIQUIDITY'
  },
  {
    id: 'v_maker_dsr',
    assets: ['DAI'],
    icons: [DAI_ICON],
    protocol: 'MakerDAO',
    protocolIcon: MKR_ICON,
    name: 'DAI Savings Rate',
    apy: 5.0,
    baseApy: 5.0,
    farmApy: 0,
    tvl: '$2.1B',
    risk: 'Low',
    riskAnalysis: { audit: 'Blue Chip', protocol: 'MakerDAO', ilRisk: 'None' },
    strategy: 'Savings',
    category: 'LENDING'
  },
  {
    id: 'v_aura_bal',
    assets: ['BAL', 'WETH'],
    icons: [BAL_ICON, ETH_ICON],
    protocol: 'Aura',
    protocolIcon: BAL_ICON,
    name: 'Aura Balancer Pool',
    apy: 28.5,
    baseApy: 12.0,
    farmApy: 16.5,
    tvl: '$210M',
    risk: 'High',
    riskAnalysis: { audit: 'Audited', protocol: 'Balancer Layer', ilRisk: 'High Volatility' },
    strategy: 'Yield Farming',
    category: 'LIQUIDITY'
  },
  {
    id: 'v_compound_usdc',
    assets: ['USDC'],
    icons: [USDC_ICON],
    protocol: 'Compound V3',
    protocolIcon: USDC_ICON,
    name: 'Comet Supply',
    apy: 5.9,
    baseApy: 4.8,
    farmApy: 1.1,
    tvl: '$880M',
    risk: 'Low',
    riskAnalysis: { audit: 'OpenZeppelin', protocol: 'Blue Chip', ilRisk: 'None' },
    strategy: 'Lending',
    category: 'LENDING'
  },
  {
    id: 'v_frax_sfrxeth',
    assets: ['ETH'],
    icons: [FRAX_ICON],
    protocol: 'Frax Ether',
    protocolIcon: FRAX_ICON,
    name: 'sfrxETH Staking',
    apy: 4.8,
    baseApy: 4.8,
    farmApy: 0,
    tvl: '$620M',
    risk: 'Moderate',
    riskAnalysis: { audit: 'Audited', protocol: 'Frax Finance', ilRisk: 'None' },
    strategy: 'Staking',
    category: 'YIELD'
  }
];

// --- SUB-COMPONENT: RISK TOOLTIP ---
const RiskTooltip = ({ analysis }: { analysis: RiskAnalysis }) => (
    <div className="absolute bottom-full left-0 mb-2 w-64 bg-[#111] border border-zinc-800 rounded-xl p-4 shadow-2xl opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none z-50">
        <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Risk Analysis</h4>
        <div className="space-y-3">
            <div className="flex items-start gap-3">
                <ShieldCheck size={14} className="text-emerald-500 mt-0.5" />
                <div>
                    <p className="text-[10px] font-bold text-white">Smart Contract</p>
                    <p className="text-[10px] text-zinc-400">{analysis.audit}</p>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <Scale size={14} className="text-blue-500 mt-0.5" />
                <div>
                    <p className="text-[10px] font-bold text-white">Counterparty</p>
                    <p className="text-[10px] text-zinc-400">{analysis.protocol}</p>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <TrendingUp size={14} className="text-amber-500 mt-0.5" />
                <div>
                    <p className="text-[10px] font-bold text-white">Impermanent Loss</p>
                    <p className="text-[10px] text-zinc-400">{analysis.ilRisk}</p>
                </div>
            </div>
        </div>
        {/* Arrow */}
        <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#111] border-b border-r border-zinc-800 rotate-45"></div>
    </div>
);

const LiquidityManager: React.FC = () => {
  const [selectedVaultId, setSelectedVaultId] = useState<string | null>(null);
  const [isDepositing, setIsDepositing] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  
  // Workspace Tab State
  const [activeWorkspace, setActiveWorkspace] = useState<'dashboard' | 'lending' | 'liquidity' | 'options' | 'yield'>('dashboard');

  // View & Sort State
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Vault; direction: 'asc' | 'desc' } | null>({ key: 'apy', direction: 'desc' });

  const activeVault = VAULTS.find(v => v.id === selectedVaultId);

  // Deposit Logic
  const walletBalance = 25000.00;
  const depositValue = parseFloat(depositAmount) || 0;
  const isInsufficient = depositValue > walletBalance;

  const handleDeposit = () => {
      if(isInsufficient || depositValue <= 0) return;
      setIsDepositing(true);
      setTimeout(() => {
          setIsDepositing(false);
          setDepositAmount('');
      }, 2000);
  }

  const handleSort = (key: keyof Vault) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  // --- FILTERED & SORTED DATA LOGIC ---
  const getFilteredPositions = () => {
      if (activeWorkspace === 'dashboard') return ACTIVE_POSITIONS;
      return ACTIVE_POSITIONS.filter(p => p.category === activeWorkspace.toUpperCase());
  };

  const getFilteredVaults = () => {
      let filtered = VAULTS;
      if (activeWorkspace !== 'dashboard') {
          filtered = VAULTS.filter(v => v.category === activeWorkspace.toUpperCase());
      }

      // SORTING LOGIC
      if (sortConfig) {
          filtered = [...filtered].sort((a, b) => {
              let aVal: any = a[sortConfig.key];
              let bVal: any = b[sortConfig.key];

              // Custom Sort: TVL (Parse String with Multipliers)
              if (sortConfig.key === 'tvl') {
                  const parseTVL = (s: string) => {
                      const num = parseFloat(s.replace(/[^0-9.]/g, ''));
                      const mult = s.includes('B') ? 1e9 : s.includes('M') ? 1e6 : s.includes('K') ? 1e3 : 1;
                      return num * mult;
                  };
                  aVal = parseTVL(a.tvl);
                  bVal = parseTVL(b.tvl);
              }

              // Custom Sort: Risk (Weighted)
              if (sortConfig.key === 'risk') {
                  const riskWeight = { 'Low': 1, 'Moderate': 2, 'High': 3 };
                  aVal = riskWeight[a.risk];
                  bVal = riskWeight[b.risk];
              }

              if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
              if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
              return 0;
          });
      }

      return filtered;
  };

  const positions = getFilteredPositions();
  const opportunities = getFilteredVaults();

  // --- KPI LOGIC ---
  const renderKPIs = () => {
      // Dynamic KPIs based on workspace
      if (activeWorkspace === 'dashboard') {
          const totalDeployed = ACTIVE_POSITIONS.reduce((acc, p) => acc + p.deposit, 0);
          const idleCapital = 250000;
          const totalCapital = totalDeployed + idleCapital;
          const pnl24h = 1234.56; // Mock

          return (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {/* KPI 1: Total Capital */}
                  <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 backdrop-blur-md relative overflow-hidden group">
                      <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Wallet size={80} />
                      </div>
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                         Total Capital <span className="bg-zinc-800 text-zinc-400 px-1.5 rounded text-[9px]">Deployed + Idle</span>
                      </span>
                      <div className="flex items-baseline gap-3">
                         <span className="text-3xl font-mono font-bold text-white">${totalCapital.toLocaleString()}</span>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-wide">
                         <ArrowUpRight size={12} />
                         <span>85% Utilized</span>
                      </div>
                  </div>

                  {/* KPI 2: Avg Net APY */}
                  <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 backdrop-blur-md relative overflow-hidden group">
                      <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <TrendingUp size={80} />
                      </div>
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                         Avg Net APY <span className="bg-zinc-800 text-zinc-400 px-1.5 rounded text-[9px]">Weighted</span>
                      </span>
                      <div className="flex items-baseline gap-3">
                         <span className="text-3xl font-mono font-bold text-white">8.42%</span>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-wide">
                         <Zap size={12} />
                         <span>+1.2% vs Benchmark</span>
                      </div>
                  </div>

                  {/* KPI 3: 24h PnL */}
                  <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 backdrop-blur-md relative overflow-hidden group">
                      <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Activity size={80} />
                      </div>
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                         24h PnL <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 rounded text-[9px]">Real-Time</span>
                      </span>
                      <div className="flex items-baseline gap-3">
                         <span className="text-3xl font-mono font-bold text-emerald-400">+${pnl24h.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                         <span>+0.15% Daily Yield</span>
                      </div>
                  </div>

                  {/* KPI 4: Idle Capital */}
                  <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 backdrop-blur-md relative overflow-hidden group">
                      <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Coins size={80} />
                      </div>
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                         Idle Capital <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-1.5 rounded text-[9px]">Available</span>
                      </span>
                      <div className="flex items-baseline gap-3">
                         <span className="text-3xl font-mono font-bold text-white">${idleCapital.toLocaleString()}</span>
                      </div>
                      <div className="mt-3">
                          <button className="w-full py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2">
                              <Plus size={12} /> Deploy Capital
                          </button>
                      </div>
                  </div>
              </div>
          );
      }
      return null;
  };

  // --- DASHBOARD WIDGETS ---
  const renderDashboardWidgets = () => {
      // 1. Prepare Pie Chart Data
      const allocationData = [
          { name: 'Lending', value: ACTIVE_POSITIONS.filter(p => p.category === 'LENDING').reduce((a,b) => a + b.deposit, 0), color: '#3b82f6' },
          { name: 'Liquidity', value: ACTIVE_POSITIONS.filter(p => p.category === 'LIQUIDITY').reduce((a,b) => a + b.deposit, 0), color: '#10b981' },
          { name: 'Yield', value: ACTIVE_POSITIONS.filter(p => p.category === 'YIELD').reduce((a,b) => a + b.deposit, 0), color: '#a855f7' },
      ];

      // 2. Risk Logic
      const riskyPosition = ACTIVE_POSITIONS.find(p => p.healthFactor && p.healthFactor < 1.2);

      // 3. Activity Feed Mock
      const activities = [
          { type: 'reward', text: 'Claimed $250 rewards from Aave V3', time: '2 hours ago' },
          { type: 'deploy', text: 'Deployed $50,000 to Curve', time: 'Yesterday' },
          { type: 'alert', text: 'Health Factor dropped to 1.3', time: '4 hours ago', warning: true }
      ];

      return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* WIDGET 1: ALLOCATION CHART */}
              <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 flex flex-col">
                  <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Capital Allocation by Strategy</h3>
                  <div className="flex items-center justify-between flex-1">
                      <div className="w-[120px] h-[120px] relative">
                          <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                  <Pie
                                      data={allocationData}
                                      innerRadius={40}
                                      outerRadius={55}
                                      paddingAngle={5}
                                      dataKey="value"
                                      stroke="none"
                                  >
                                      {allocationData.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={entry.color} />
                                      ))}
                                  </Pie>
                              </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <PieIcon size={16} className="text-zinc-600" />
                          </div>
                      </div>
                      <div className="flex-1 pl-4 space-y-3">
                          {allocationData.map(item => (
                              <div key={item.name} className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                      <span className="text-[10px] font-bold text-zinc-300">{item.name}</span>
                                  </div>
                                  <span className="text-[10px] font-mono text-zinc-500">${(item.value/1000).toFixed(1)}k</span>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* WIDGET 2: RISK MONITOR */}
              <div className={`rounded-[2rem] p-6 border flex flex-col justify-between relative overflow-hidden ${riskyPosition ? 'bg-amber-900/10 border-amber-500/30' : 'bg-emerald-900/10 border-emerald-500/20'}`}>
                  <div>
                      <div className="flex justify-between items-start mb-2">
                          <h3 className={`text-[10px] font-black uppercase tracking-widest ${riskyPosition ? 'text-amber-500' : 'text-emerald-500'}`}>Positions at Risk</h3>
                          {riskyPosition ? <AlertOctagon size={16} className="text-amber-500 animate-pulse" /> : <CheckCircle2 size={16} className="text-emerald-500" />}
                      </div>
                      
                      {riskyPosition ? (
                          <div className="mt-4">
                              <p className="text-sm font-bold text-white mb-1">⚠️ LENDING POSITION AT RISK</p>
                              <p className="text-[10px] text-amber-200/80 mb-4">Health Factor: <span className="font-mono font-bold text-white">{riskyPosition.healthFactor}</span> (Close to Liquidation)</p>
                          </div>
                      ) : (
                          <div className="mt-4">
                              <p className="text-sm font-bold text-white mb-1">All positions are safe</p>
                              <p className="text-[10px] text-emerald-200/60">No immediate liquidation risks detected.</p>
                          </div>
                      )}
                  </div>

                  {riskyPosition && (
                      <button className="w-full py-2 bg-amber-500 text-black rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">
                          Adjust Position
                      </button>
                  )}
              </div>

              {/* WIDGET 3: ACTIVITY FEED */}
              <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Recent Transactions</h3>
                      <History size={12} className="text-zinc-600" />
                  </div>
                  <div className="space-y-4">
                      {activities.map((act, i) => (
                          <div key={i} className="flex gap-3">
                              <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${act.type === 'reward' ? 'bg-emerald-500/20 text-emerald-500' : act.warning ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-500'}`}>
                                  {act.type === 'reward' && <CheckCircle2 size={10} />}
                                  {act.type === 'deploy' && <ArrowRight size={10} />}
                                  {act.type === 'alert' && <AlertTriangle size={10} />}
                              </div>
                              <div>
                                  <p className="text-[10px] font-bold text-zinc-300 leading-tight">{act.text}</p>
                                  <p className="text-[9px] text-zinc-600 mt-0.5">{act.time}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

          </div>
      );
  };

  // --- DETAIL VIEW ---
  if (selectedVaultId && activeVault) {
    return (
      <div className="h-full flex flex-col p-6 lg:p-8 overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-500 scrollbar-hide bg-[#050505]">
        <div className="max-w-[1600px] mx-auto w-full">
          
          {/* WAYFINDING HEADER */}
          <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-medium mb-4">
                  <button onClick={() => setSelectedVaultId(null)} className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
                      <ArrowLeft size={12} /> Back to {activeWorkspace.charAt(0).toUpperCase() + activeWorkspace.slice(1)}
                  </button>
                  <span className="text-zinc-700">/</span>
                  <span className="text-white font-bold">{activeVault.name}</span>
              </div>
              
              <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                          {activeVault.icons.map((icon, i) => (
                              <img key={i} src={icon} className="w-12 h-12 rounded-full border-4 border-[#050505] bg-zinc-900" alt="" />
                          ))}
                      </div>
                      <div>
                          <h1 className="text-2xl font-black text-white tracking-tight leading-none mb-1">{activeVault.name}</h1>
                          <div className="flex items-center gap-3">
                              <span className="text-xs text-zinc-400 font-bold bg-zinc-900 px-2 py-0.5 rounded border border-white/5">{activeVault.protocol}</span>
                              <span className="text-xs text-emerald-500 font-bold flex items-center gap-1"><ShieldCheck size={12}/> Audited</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
             
             {/* LEFT COLUMN: EXECUTION CONTEXT (Write) */}
             <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Card: Deposit (The Form) */}
                <div className="bg-zinc-900/60 border border-white/5 rounded-[2rem] p-1 shadow-2xl backdrop-blur-md">
                   <div className="bg-[#0a0a0a] rounded-[1.8rem] p-6 border border-white/5">
                       <div className="flex justify-between items-center mb-6">
                          <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                              <Wallet size={14} /> Action: Deposit
                          </h3>
                          <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-bold uppercase">
                              Strategy Active
                          </div>
                       </div>

                       <div className="space-y-5">
                          {/* Input Area */}
                          <div className={`bg-zinc-900/50 border rounded-2xl p-4 transition-all group ${isInsufficient ? 'border-rose-500/30' : 'border-white/5 focus-within:border-emerald-500/30'}`}>
                             <div className="flex justify-between items-center mb-2">
                                <label className={`text-[9px] font-black uppercase tracking-widest transition-colors ${isInsufficient ? 'text-rose-500' : 'text-zinc-500 group-focus-within:text-emerald-500'}`}>Amount</label>
                                <div className="text-[9px] text-zinc-500 font-bold font-mono">
                                   Available: {walletBalance.toLocaleString('en-US', {minimumFractionDigits: 2})} <button onClick={() => setDepositAmount(walletBalance.toString())} className="text-emerald-500 ml-1 hover:text-emerald-400 cursor-pointer underline decoration-dotted">MAX</button>
                                </div>
                             </div>
                             <div className="flex justify-between items-center">
                                <input 
                                   type="text" 
                                   value={depositAmount} 
                                   onChange={(e) => setDepositAmount(e.target.value)}
                                   placeholder="0.00" 
                                   className="bg-transparent text-3xl font-mono font-medium text-white focus:outline-none placeholder:text-zinc-800 w-full" 
                                />
                                <div className="flex items-center gap-2 bg-black px-3 py-1.5 rounded-xl border border-white/10 shrink-0">
                                   <img src={USDC_ICON} className="w-5 h-5 object-contain" alt="USDC" />
                                   <span className="text-sm font-bold text-white">USDC</span>
                                </div>
                             </div>
                             <div className="mt-2 text-[10px] font-mono text-zinc-600 font-bold">
                                 ≈ ${depositValue.toLocaleString('en-US', {minimumFractionDigits: 2})}
                             </div>
                          </div>

                          {/* Transaction Preview (Feedback) */}
                          {depositValue > 0 && !isInsufficient && (
                              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 space-y-2 animate-in fade-in slide-in-from-top-2">
                                  <div className="flex justify-between items-center text-[10px]">
                                      <span className="text-zinc-500 font-bold">Est. Weekly Yield</span>
                                      <span className="font-mono text-emerald-400 font-bold">+${((depositValue * (activeVault.apy / 100)) / 52).toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between items-center text-[10px]">
                                      <span className="text-zinc-500 font-bold">Network Fee</span>
                                      <span className="font-mono text-zinc-300">~$4.50</span>
                                  </div>
                              </div>
                          )}

                          {isInsufficient && (
                              <div className="flex items-center gap-2 text-[10px] text-rose-500 font-bold px-1 bg-rose-500/5 p-2 rounded-lg border border-rose-500/10">
                                  <AlertTriangle size={12} /> Insufficient Balance for transaction
                              </div>
                          )}

                          <button 
                              onClick={handleDeposit}
                              disabled={isInsufficient || depositValue <= 0 || isDepositing}
                              className={`w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 ${
                                  isInsufficient || depositValue <= 0
                                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
                                  : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-emerald-500/20'
                              }`}
                          >
                             {isDepositing ? (
                                 <>
                                     <Loader2 size={16} className="animate-spin" /> Confirming...
                                 </>
                             ) : (
                                 <>
                                     <Plus size={16} /> Confirm Deposit
                                 </>
                             )}
                          </button>
                       </div>
                   </div>
                </div>
             </div>

             {/* RIGHT COLUMN: DATA CONTEXT (Read) */}
             <div className="lg:col-span-7 flex flex-col gap-6">
                {/* Analytics Card - Removed for brevity in this fix block */}
             </div>

          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: MAIN OVERVIEW (Tabbed) ---
  return (
    <div className="h-full overflow-y-auto p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 scrollbar-hide">
      <div className="max-w-[1600px] mx-auto space-y-10">
         
         {/* HEADER & CONTEXT */}
         <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                    <Layers className="text-zinc-400" />
                    Yield Management
                  </h1>
                  <p className="text-zinc-400 text-xs font-medium mt-1 ml-10">
                    Institutional capital deployment and liquidity provisioning.
                  </p>
                </div>

                {/* NEW: TAB NAVIGATION (RIGHT SIDE) */}
                <div className="flex bg-[#0a0a0a] p-1.5 rounded-xl border border-white/5 shadow-inner">
                    {['dashboard', 'lending', 'liquidity', 'yield', 'options'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveWorkspace(tab as any)}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                activeWorkspace === tab 
                                ? 'bg-zinc-800 text-white shadow-sm' 
                                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                            }`}
                        >
                            {tab === 'dashboard' ? 'MAIN' : tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* DYNAMIC KPI STRIP */}
            {renderKPIs()}
         </div>

         {/* MAIN DASHBOARD WIDGETS (Only on Dashboard Tab) */}
         {activeWorkspace === 'dashboard' && renderDashboardWidgets()}

         {/* SECTION: ACTIVE POSITIONS (Filtered by Workspace) */}
         <section className="bg-zinc-900/40 border border-white/5 rounded-[2rem] overflow-hidden shadow-xl backdrop-blur-md relative flex flex-col">
             {/* Header */}
             <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0a0a0a]/50">
                 <div className="flex items-center gap-3">
                     <h3 className="text-sm font-black text-white uppercase tracking-wide">
                         {activeWorkspace === 'dashboard' ? 'All Active Positions' : `My ${activeWorkspace.charAt(0).toUpperCase() + activeWorkspace.slice(1)} Positions`}
                     </h3>
                 </div>
             </div>
             
             {/* Table */}
             {positions.length > 0 ? (
                 <div className="overflow-x-auto">
                     <table className="w-full text-left">
                         <thead className="bg-[#0a0a0a]/50 text-[9px] font-black uppercase tracking-widest text-zinc-500 border-b border-white/5">
                             <tr>
                                 <th className="px-6 py-4">Strategy</th>
                                 {activeWorkspace === 'dashboard' && <th className="px-6 py-4">Type</th>}
                                 <th className="px-6 py-4 text-right">Deposit</th>
                                 <th className="px-6 py-4 text-right">Rewards</th>
                                 <th className="px-6 py-4 text-right">APY</th>
                                 <th className="px-6 py-4 text-center">Health</th>
                                 <th className="px-6 py-4 text-center">Status</th>
                                 <th className="px-6 py-4 text-right">Manage</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5">
                             {positions.map(pos => (
                                 <tr key={pos.id} className="hover:bg-white/[0.02] transition-colors group">
                                     <td className="px-6 py-4">
                                         <div className="flex flex-col">
                                             <span className="text-sm font-bold text-white">{pos.strategyName}</span>
                                             <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                                                 {pos.protocol}
                                                 <ExternalLink size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                             </span>
                                         </div>
                                     </td>
                                     {activeWorkspace === 'dashboard' && (
                                         <td className="px-6 py-4">
                                             <span className="text-[9px] font-bold bg-zinc-800 text-zinc-400 px-2 py-1 rounded">{pos.category}</span>
                                         </td>
                                     )}
                                     <td className="px-6 py-4 text-right font-mono text-sm text-zinc-300">
                                         ${pos.deposit.toLocaleString()}
                                     </td>
                                     <td className="px-6 py-4 text-right font-mono text-sm text-emerald-400">
                                         ${pos.rewards.toLocaleString(undefined, {minimumFractionDigits: 2})}
                                     </td>
                                     <td className="px-6 py-4 text-right font-mono text-sm text-white">
                                         {pos.apy}%
                                     </td>
                                     <td className="px-6 py-4 text-center">
                                         {pos.healthFactor ? (
                                             <div className="flex flex-col items-center gap-1 group/health relative">
                                                 <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                     <div 
                                                         className={`h-full ${pos.healthFactor > 1.5 ? 'bg-emerald-500' : pos.healthFactor > 1.1 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                                                         style={{ width: `${Math.min(pos.healthFactor * 30, 100)}%` }}
                                                     ></div>
                                                 </div>
                                                 <span className="text-[9px] font-mono text-zinc-500">{pos.healthFactor.toFixed(2)}</span>
                                             </div>
                                         ) : (
                                             <span className="text-[9px] text-zinc-600 font-mono">N/A</span>
                                         )}
                                     </td>
                                     <td className="px-6 py-4 text-center">
                                         <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-black uppercase tracking-wider">
                                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                             {pos.status}
                                         </span>
                                     </td>
                                     <td className="px-6 py-4 text-right">
                                         <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                             <button className="px-3 py-1.5 rounded-lg bg-zinc-800 text-xs font-bold text-white border border-white/5 hover:bg-zinc-700 hover:border-white/10 transition-all">Adjust</button>
                                         </div>
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>
             ) : (
                 <div className="p-12 text-center flex flex-col items-center justify-center">
                     <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                         <Layers size={24} className="text-zinc-600" />
                     </div>
                     <p className="text-zinc-400 text-sm font-medium">No active {activeWorkspace === 'dashboard' ? '' : activeWorkspace} positions detected.</p>
                     <p className="text-zinc-600 text-xs mt-1 max-w-xs leading-relaxed">
                         Capital is idle. Select a high-yield strategy below to deploy assets.
                     </p>
                 </div>
             )}
         </section>

         {/* SECTION: TOP OPPORTUNITIES (Refactored to Table View) */}
         <section className="flex-1 bg-zinc-900/40 border border-white/5 rounded-[2rem] overflow-hidden shadow-xl backdrop-blur-md relative flex flex-col min-h-[400px]">
              {/* Header with Sort Controls */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0a0a0a]/50">
                 <div className="flex items-center gap-3">
                     <h3 className="text-sm font-black text-white uppercase tracking-wide">
                         {activeWorkspace === 'dashboard' ? 'Top Opportunities' : `${activeWorkspace.charAt(0).toUpperCase() + activeWorkspace.slice(1)} Opportunities`}
                     </h3>
                 </div>
                 
                 <div className="flex items-center gap-2">
                     <div className="hidden md:flex bg-zinc-900 rounded-lg p-1 border border-white/5 mr-2">
                        {/* UPDATED SORT BUTTONS: Removed ArrowUpDown Icon */}
                        <button 
                            onClick={() => handleSort('apy')}
                            className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${sortConfig?.key === 'apy' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            APY
                        </button>
                        <button 
                            onClick={() => handleSort('risk')}
                            className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${sortConfig?.key === 'risk' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            Risk
                        </button>
                        <button 
                            onClick={() => handleSort('tvl')}
                            className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${sortConfig?.key === 'tvl' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            TVL
                        </button>
                     </div>

                     <div className="flex bg-zinc-900 rounded-lg p-1 border border-white/5">
                        <button 
                            onClick={() => setViewMode('list')} 
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                        >
                            <LayoutList size={14} />
                        </button>
                        <button 
                            onClick={() => setViewMode('grid')} 
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                        >
                            <LayoutGrid size={14} />
                        </button>
                     </div>
                 </div>
             </div>
             
             {/* LIST VIEW (TABLE) */}
             {viewMode === 'list' ? (
                 <div className="flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                     <table className="w-full text-left border-collapse">
                        <thead className="bg-[#0a0a0a]/90 backdrop-blur sticky top-0 z-10 text-[9px] font-black uppercase tracking-[0.15em] text-zinc-500 border-b border-white/10">
                           <tr>
                              <th className="py-4 pl-6 cursor-pointer hover:text-zinc-300" onClick={() => handleSort('name')}>Strategy</th>
                              <th className="py-4 cursor-pointer hover:text-zinc-300" onClick={() => handleSort('risk')}>Risk Profile</th>
                              <th className="py-4 text-right cursor-pointer hover:text-zinc-300" onClick={() => handleSort('tvl')}>TVL</th>
                              <th className="py-4 text-right">Base / Farm</th>
                              <th className="py-4 text-right cursor-pointer hover:text-zinc-300" onClick={() => handleSort('apy')}>Net APY</th>
                              <th className="py-4 text-right pr-6">Action</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                           {opportunities.map((vault) => (
                              <tr 
                                key={vault.id} 
                                onClick={() => setSelectedVaultId(vault.id)}
                                className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                              >
                                 <td className="py-4 pl-6">
                                    <div className="flex items-center gap-3">
                                       <div className="flex -space-x-2">
                                            {vault.icons.map((icon, i) => (
                                                <img key={i} src={icon} className="w-8 h-8 rounded-full border-2 border-[#121214] bg-zinc-900 z-10" alt="" />
                                            ))}
                                       </div>
                                       <div>
                                          <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{vault.name}</div>
                                          <div className="text-[9px] text-zinc-500 font-mono flex items-center gap-1.5 mt-0.5">
                                              <img src={vault.protocolIcon} className="w-3 h-3 rounded-full" alt=""/>
                                              {vault.protocol} • {vault.category}
                                          </div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="py-4">
                                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider border group/badge relative ${
                                       vault.risk === 'Low' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                       vault.risk === 'Moderate' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                       'bg-rose-500/10 text-rose-500 border-rose-500/20'
                                    }`}>
                                       <ShieldCheck size={10} />
                                       {vault.risk} Risk
                                       <RiskTooltip analysis={vault.riskAnalysis} />
                                    </div>
                                 </td>
                                 <td className="py-4 text-right font-mono text-xs font-bold text-zinc-300">
                                    {vault.tvl}
                                 </td>
                                 <td className="py-4 text-right">
                                    <div className="flex flex-col gap-0.5 items-end">
                                       <div className="text-[10px] font-mono font-bold text-zinc-400">
                                          {vault.baseApy}%
                                       </div>
                                       <div className="text-[9px] text-emerald-500 font-mono">
                                          +{vault.farmApy}% Farm
                                       </div>
                                    </div>
                                 </td>
                                 <td className="py-4 text-right">
                                    <span className="text-lg font-mono font-bold text-emerald-400 text-shadow-glow">
                                        {vault.apy}%
                                    </span>
                                 </td>
                                 <td className="py-4 text-right pr-6">
                                    <button className="px-4 py-2 bg-zinc-800 text-zinc-300 border border-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-all shadow-sm">
                                        View
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                 </div>
             ) : (
                 /* GRID VIEW (Alternative) */
                 <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {opportunities.map(vault => (
                       <div 
                          key={vault.id}
                          onClick={() => setSelectedVaultId(vault.id)}
                          className="p-5 rounded-2xl border transition-all hover:bg-zinc-800/30 group bg-black/20 border-white/5 cursor-pointer relative overflow-hidden"
                       >
                          {/* Header */}
                          <div className="flex justify-between items-start mb-4">
                             <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {vault.icons.map((icon, i) => (
                                        <img key={i} src={icon} className="w-8 h-8 rounded-full border-2 border-[#121214] bg-zinc-900 z-10" alt="" />
                                    ))}
                                </div>
                                <div>
                                   <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{vault.name}</div>
                                   <div className="flex items-center gap-1 mt-0.5">
                                       <img src={vault.protocolIcon} className="w-3 h-3 rounded-full" alt="" />
                                       <span className="text-[9px] text-zinc-500 font-bold uppercase">{vault.protocol}</span>
                                   </div>
                                </div>
                             </div>
                             <div className={`w-2 h-2 rounded-full ${vault.risk === 'Low' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : vault.risk === 'Moderate' ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
                          </div>

                          {/* Metrics */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                             <div>
                                <p className="text-[9px] text-zinc-500 uppercase font-bold">Net APY</p>
                                <p className="text-lg font-mono font-bold text-emerald-400">
                                   {vault.apy}%
                                </p>
                             </div>
                             <div className="text-right">
                                <p className="text-[9px] text-zinc-500 uppercase font-bold">TVL</p>
                                <p className="text-lg font-mono font-bold text-white">{vault.tvl}</p>
                             </div>
                          </div>

                          {/* Risk Tag */}
                          <div className="mb-4 bg-black/40 rounded-lg p-2 flex items-center justify-between border border-white/5">
                             <span className="text-[9px] text-zinc-500 font-bold uppercase">Risk Profile</span>
                             <span className={`text-[9px] font-black uppercase ${
                                vault.risk === 'Low' ? 'text-emerald-500' : 
                                vault.risk === 'Moderate' ? 'text-amber-500' : 'text-rose-500'
                             }`}>
                                {vault.risk}
                             </span>
                          </div>

                          {/* Footer Action */}
                          <div className="pt-4 border-t border-white/5">
                             <button className="w-full py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 flex items-center justify-center gap-2 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 group-hover:border-emerald-500/20 border border-transparent">
                                View Details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                             </button>
                          </div>
                       </div>
                    ))}
                 </div>
             )}
         </section>
      </div>
    </div>
  );
};

export default LiquidityManager;
