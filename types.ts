
export interface Asset {
  name: string;
  symbol: string;
  quantity: number;
  avgPurchasePrice: number;
  currentPrice: number;
  value: number;
  change: number;
  changePercent: number;
  icon: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral' | 'High Risk';
  signalTooltip?: string;
  color: string;
  actionContext?: {
    type: 'DEPLOY' | 'REBALANCE' | 'MANAGE' | 'REDUCE_RISK';
    label: string;
    tooltip?: string;
  };
}

export interface Transaction {
  id: string;
  date: string;
  type: 'Swap' | 'Send' | 'Receive' | 'Stake';
  asset: string;
  amount: string;
  fiatValue: string;
  status: 'Success' | 'Pending' | 'Failed';
  txHash: string;
  aiCategory: string;
  aiRisk: 'Low' | 'Medium' | 'High';
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface SwapState {
  fromAsset: string;
  fromAmount: string;
  toAsset: string;
  toAmount: string;
}