
import { Asset, ChartDataPoint, Transaction } from './types';

export const MOCK_ASSETS: Asset[] = [
  {
    name: 'BNB',
    symbol: 'BNB',
    quantity: 120000,
    avgPurchasePrice: 320.00,
    currentPrice: 592.50,
    value: 71100000.00,
    change: 1450000.00,
    changePercent: 2.1,
    icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=035',
    sentiment: 'Bullish',
    signalTooltip: 'Launchpool activity driving demand. Heavy volume.',
    color: '#F3BA2F', // BNB Gold
    actionContext: { 
      type: 'MANAGE', 
      label: 'TRADE',
      tooltip: 'Check Launchpool eligibility and staking yields.'
    }
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    quantity: 2000000,
    avgPurchasePrice: 1.00,
    currentPrice: 1.00,
    value: 2000000.00,
    change: 0,
    changePercent: 0.01,
    icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=035',
    sentiment: 'Neutral',
    signalTooltip: 'Stablecoin peg holds strong. High liquidity reserve.',
    color: '#26A17B', // USDT Teal
    actionContext: { 
      type: 'DEPLOY', 
      label: 'DEPLOY YIELD',
      tooltip: 'Lend on Aave V3 for 3.2% APY.'
    }
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    quantity: 350.00,
    avgPurchasePrice: 2450.00,
    currentPrice: 3208.93,
    value: 1123125.50,
    change: 12540.30,
    changePercent: 4.8,
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035',
    sentiment: 'Bullish',
    signalTooltip: 'Whale accumulation detected: +50k ETH inflow to cold storage in 24h.',
    color: '#627EEA', // ETH Indigo/Purple (Distinct from USDC)
    actionContext: { 
      type: 'MANAGE', 
      label: 'TRADE',
      tooltip: 'View detailed asset breakdown and transaction history.'
    }
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    quantity: 45.0,
    avgPurchasePrice: 110.00,
    currentPrice: 142.50,
    value: 6412.50,
    change: -12.40,
    changePercent: -1.2,
    icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=035',
    sentiment: 'Neutral',
    signalTooltip: 'Social volume decreased by 15%. Price consolidating above support.',
    color: '#14F195', // SOL Neon Cyan (Distinct from Pepe)
    actionContext: { 
      type: 'REBALANCE', 
      label: 'REBALANCE',
      tooltip: 'Swap ~10% of holdings to re-align with strategy target weights.'
    }
  },
  {
    name: 'Arbitrum',
    symbol: 'ARB',
    quantity: 1200,
    avgPurchasePrice: 1.85,
    currentPrice: 1.12,
    value: 1344.00,
    change: 5.20,
    changePercent: 2.1,
    icon: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=035',
    sentiment: 'Bullish',
    signalTooltip: 'TVL on Arbitrum reached all-time high. DAO proposal passed.',
    color: '#28A0F0', // ARB Light Blue
    actionContext: { 
      type: 'MANAGE', 
      label: 'TRADE',
      tooltip: 'View governance proposals and staking options.'
    }
  },
  {
    name: 'Pepe',
    symbol: 'PEPE',
    quantity: 900000000,
    avgPurchasePrice: 0.000008,
    currentPrice: 0.000012,
    value: 10800.00,
    change: 120.50,
    changePercent: 12.5,
    icon: 'https://cryptologos.cc/logos/pepe-pepe-logo.png?v=035',
    sentiment: 'High Risk',
    signalTooltip: 'Volatility Index > 80. RSI Divergence detected on 4H timeframe.',
    color: '#4C9540', // PEPE Forest Green (Distinct from SOL)
    actionContext: { 
      type: 'REDUCE_RISK', 
      label: 'REDUCE RISK',
      tooltip: 'Recommended to take principal off the table due to high volatility.'
    }
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    quantity: 2500,
    avgPurchasePrice: 1.00,
    currentPrice: 1.00,
    value: 2500.00,
    change: 0,
    changePercent: 0,
    icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035',
    sentiment: 'Neutral',
    signalTooltip: 'Capital efficiency is low. Stablecoins are not generating yield.',
    color: '#2775CA', // USDC Science Blue (Distinct from ETH)
    actionContext: { 
      type: 'DEPLOY', 
      label: 'DEPLOY YIELD',
      tooltip: 'Deposit to Compound V3 (Est. 5.4% APY). Gas: ~$12.'
    }
  }
];

// Mock data representing the value of each asset over the last 7 days (1 Week)
export const MOCK_PORTFOLIO_HISTORY = [
  { date: 'Mon 22', ETH: 1080000, SOL: 6050, PEPE: 5100, ARB: 1280, USDC: 2500 },
  { date: 'Tue 23', ETH: 1095000, SOL: 5950, PEPE: 5000, ARB: 1300, USDC: 2400 },
  { date: 'Wed 24', ETH: 1105000, SOL: 6100, PEPE: 5200, ARB: 1310, USDC: 2500 },
  { date: 'Thu 25', ETH: 1098000, SOL: 6300, PEPE: 5400, ARB: 1320, USDC: 2300 },
  { date: 'Fri 26', ETH: 1115000, SOL: 6250, PEPE: 5350, ARB: 1330, USDC: 2500 },
  { date: 'Sat 27', ETH: 1120000, SOL: 6350, PEPE: 5450, ARB: 1340, USDC: 2500 },
  { date: 'Sun 28', ETH: 1123125, SOL: 6412, PEPE: 5400, ARB: 1344, USDC: 2500 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: '2024-03-10 14:22',
    type: 'Swap',
    asset: 'ETH → USDC',
    amount: '1.5 ETH',
    fiatValue: '$4,812.00',
    status: 'Success',
    txHash: '0x7a...d2e1',
    aiCategory: 'Capital Disposal',
    aiRisk: 'Low'
  },
  {
    id: '2',
    date: '2024-03-09 09:15',
    type: 'Stake',
    asset: 'SOL',
    amount: '20.0 SOL',
    fiatValue: '$2,850.00',
    status: 'Pending',
    txHash: '0x3b...f9a4',
    aiCategory: 'Yield Generation',
    aiRisk: 'Low'
  },
  {
    id: '3',
    date: '2024-03-08 18:45',
    type: 'Swap',
    asset: 'ARB → PEPE',
    amount: '500 ARB',
    fiatValue: '$560.00',
    status: 'Failed',
    txHash: '0x9c...a1b2',
    aiCategory: 'Complex Swap',
    aiRisk: 'High'
  },
  {
    id: '4',
    date: '2024-03-07 11:30',
    type: 'Receive',
    asset: 'USDC',
    amount: '1,200 USDC',
    fiatValue: '$1,200.00',
    status: 'Success',
    txHash: '0x2d...e4f5',
    aiCategory: 'Income/Salary',
    aiRisk: 'Medium'
  }
];

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { date: '01:00', value: 28400 },
  { date: '04:00', value: 28100 },
  { date: '08:00', value: 28900 },
  { date: '12:00', value: 29500 },
  { date: '16:00', value: 29200 },
  { date: '20:00', value: 30100 },
  { date: '24:00', value: 29294.45 },
];

export const MOCK_ORDER_BOOK = {
  asks: [
    { price: 3209.50, amount: 12.42, total: 39861.99 },
    { price: 3209.40, amount: 2.15, total: 6900.21 },
    { price: 3209.25, amount: 0.85, total: 2727.86 },
    { price: 3209.10, amount: 4.12, total: 13221.49 },
    { price: 3209.00, amount: 1.00, total: 3209.00 },
    { price: 3208.95, amount: 15.30, total: 49096.93 },
    { price: 3208.90, amount: 0.12, total: 385.06 },
    { price: 3208.85, amount: 2.50, total: 8022.12 },
    { price: 3208.80, amount: 1.10, total: 3529.68 },
    { price: 3208.75, amount: 0.45, total: 1443.93 },
  ],
  bids: [
    { price: 3208.50, amount: 8.42, total: 27015.57 },
    { price: 3208.40, amount: 1.15, total: 3689.66 },
    { price: 3208.25, amount: 10.85, total: 34809.51 },
    { price: 3208.10, amount: 2.12, total: 6801.17 },
    { price: 3208.00, amount: 5.00, total: 16040.00 },
    { price: 3207.95, amount: 0.30, total: 962.38 },
    { price: 3207.90, amount: 4.12, total: 13216.54 },
    { price: 3207.85, amount: 1.50, total: 4811.77 },
    { price: 3207.80, amount: 12.10, total: 38814.38 },
    { price: 3207.75, amount: 0.45, total: 1443.48 },
  ]
};

export const MOCK_RECENT_TRADES = [
  { price: 3208.93, amount: 1.45, time: '14:22:01', side: 'buy' },
  { price: 3208.90, amount: 0.12, time: '14:21:58', side: 'sell' },
  { price: 3208.85, amount: 2.50, time: '14:21:55', side: 'sell' },
  { price: 3208.93, amount: 0.05, time: '14:21:52', side: 'buy' },
  { price: 3208.94, amount: 4.12, time: '14:21:50', side: 'buy' },
  { price: 3208.90, amount: 0.35, time: '14:21:48', side: 'sell' },
  { price: 3208.88, amount: 1.10, time: '14:21:45', side: 'sell' },
  { price: 3208.92, amount: 0.85, time: '14:21:42', side: 'buy' },
  { price: 3208.95, amount: 12.42, time: '14:21:40', side: 'buy' },
  { price: 3208.90, amount: 2.15, time: '14:21:38', side: 'sell' },
];
