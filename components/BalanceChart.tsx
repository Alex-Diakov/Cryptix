
import React, { useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Line
} from 'recharts';

interface BalanceChartProps {
  benchmarkMode?: 'USD' | 'ETH' | 'BTC';
}

const formatCompact = (val: number) => {
  if (val >= 1000000) return `$${(val / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M`;
  if (val >= 1000) return `$${(val / 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })}K`;
  return `$${val.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
};

const formatPercentage = (val: number) => {
    if (Math.abs(val) < 0.01) return '0.00%';
    return `${val > 0 ? '+' : ''}${val.toFixed(2)}%`;
};

// --- RICH TOOLTIP COMPONENT ---
const RichTooltip = ({ active, payload, label, benchmarkMode = 'USD' }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const portfolioVal = data.value;
    
    // Sort assets by value DESCENDING
    const sortedBreakdown = [...data.breakdown].sort((a: any, b: any) => b.value - a.value);

    return (
      <div className="bg-[#18181B] border border-white/10 rounded-xl p-3 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] min-w-[260px] animate-in fade-in zoom-in-95 duration-150 relative z-50">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b border-white/5 pb-2 mb-2">
          <div className="flex flex-col">
             <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{data.fullDate}</span>
             <span className="text-sm font-mono font-bold text-white tabular-nums tracking-tight">
                {benchmarkMode === 'USD' ? 
                    `$${portfolioVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 
                    `${portfolioVal > 0 ? '+' : ''}${portfolioVal.toFixed(2)}%`
                }
             </span>
          </div>
        </div>

        {/* Breakdown List - Using Grid for perfect alignment */}
        {benchmarkMode === 'USD' && (
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-1.5">
            {sortedBreakdown.map((asset: any) => {
                // PnL Color Logic
                let pnlColor = 'text-zinc-600'; // Default Gray for 0%
                if (asset.change > 0) pnlColor = 'text-emerald-500';
                if (asset.change < 0) pnlColor = 'text-rose-500';

                return (
                  <React.Fragment key={asset.name}>
                    {/* Col 1: Asset Name + Dot */}
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_6px_rgba(0,0,0,0.5)]" style={{ backgroundColor: asset.color }} />
                      <span className="text-[10px] font-bold text-zinc-300 truncate">{asset.name}</span>
                    </div>
                    
                    {/* Col 2: Value */}
                    <div className="text-[10px] font-mono font-medium text-zinc-200 text-right tabular-nums">
                      {formatCompact(asset.value)}
                    </div>

                    {/* Col 3: PnL % */}
                    <div className={`text-[10px] font-mono font-bold text-right tabular-nums w-[42px] ${pnlColor}`}>
                      {formatPercentage(asset.change)}
                    </div>
                  </React.Fragment>
                );
            })}
          </div>
        )}
      </div>
    );
  }
  return null;
};

const BalanceChart: React.FC<BalanceChartProps> = ({ benchmarkMode = 'USD' }) => {
  
  // --- DATA GENERATION ---
  const chartData = useMemo(() => {
    const data = [];
    const now = new Date();
    const daysToShow = 7;
    const pointsPerDay = 4; // 6-hour intervals
    const totalPoints = daysToShow * pointsPerDay;
    
    // --- EXACT PORTFOLIO CONSTANTS (Matches constants.tsx) ---
    const ETH_QTY = 350;
    const BNB_QTY = 120000;
    const USDT_QTY = 2000000;
    const SOL_QTY = 45;
    const ARB_QTY = 1200;
    const PEPE_QTY = 900000000;
    const USDC_QTY = 2500;

    // Target Prices (Current Market Price)
    const TARGET_ETH = 3208.93;
    const TARGET_BNB = 592.50;
    const TARGET_SOL = 142.50;
    const TARGET_ARB = 1.12;
    const TARGET_PEPE = 0.000012;
    const TARGET_STABLE = 1.00;

    // Start Prices (Simulated 7 days ago)
    const START_ETH = 3050.00;
    const START_BNB = 585.00;
    const START_SOL = 138.00;
    const START_ARB = 1.05;
    const START_PEPE = 0.000010;

    let startTotal = 0;
    let startBenchmark = 0;

    for (let i = 0; i <= totalPoints; i++) {
      const date = new Date(now.getTime() - ((totalPoints - i) * (24/pointsPerDay) * 60 * 60 * 1000));
      const progress = i / totalPoints;
      
      // Interpolate with slight noise for realism
      const interpolate = (start: number, end: number) => {
          if (i === totalPoints) return end; // Lock exact end value
          const linear = start + (end - start) * progress;
          const noise = (Math.random() - 0.5) * (linear * 0.005); // 0.5% noise
          return linear + noise;
      };

      const pEth = interpolate(START_ETH, TARGET_ETH);
      const pBnb = interpolate(START_BNB, TARGET_BNB);
      const pSol = interpolate(START_SOL, TARGET_SOL);
      const pArb = interpolate(START_ARB, TARGET_ARB);
      const pPepe = interpolate(START_PEPE, TARGET_PEPE);
      
      // Calculate Values
      const vEth = pEth * ETH_QTY;
      const vBnb = pBnb * BNB_QTY;
      const vUsdt = TARGET_STABLE * USDT_QTY; // Stable
      const vSol = pSol * SOL_QTY;
      const vArb = pArb * ARB_QTY;
      const vPepe = pPepe * PEPE_QTY;
      const vUsdc = TARGET_STABLE * USDC_QTY; // Stable

      const total = vEth + vBnb + vUsdt + vSol + vArb + vPepe + vUsdc;

      // Benchmark Logic
      const benchmarkPrice = pEth; // Simplified ETH benchmark
      
      if (i === 0) {
          startTotal = total;
          startBenchmark = benchmarkPrice;
      }

      // Breakdown with BRAND COLORS & PnL relative to Start Price
      const breakdown = [
        { name: 'BNB', value: vBnb, change: ((pBnb - START_BNB)/START_BNB)*100, color: '#F3BA2F' },
        { name: 'USDT', value: vUsdt, change: 0, color: '#26A17B' }, // Stable
        { name: 'ETH', value: vEth, change: ((pEth - START_ETH)/START_ETH)*100, color: '#627EEA' },
        { name: 'SOL', value: vSol, change: ((pSol - START_SOL)/START_SOL)*100, color: '#14F195' },
        { name: 'PEPE', value: vPepe, change: ((pPepe - START_PEPE)/START_PEPE)*100, color: '#4C9540' },
        { name: 'ARB', value: vArb, change: ((pArb - START_ARB)/START_ARB)*100, color: '#28A0F0' },
        { name: 'USDC', value: vUsdc, change: 0, color: '#2775CA' } // Stable
      ];

      // Chart Plot Value
      let plotValue = total;
      let benchmarkPlotValue = 0;

      if (benchmarkMode !== 'USD') {
          // Normalize to percentage growth for comparison
          plotValue = ((total - startTotal) / startTotal) * 100;
          benchmarkPlotValue = ((benchmarkPrice - startBenchmark) / startBenchmark) * 100;
      }

      data.push({
        timestamp: date.getTime(),
        shortDate: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date),
        fullDate: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date),
        value: plotValue,
        benchmarkValue: benchmarkPlotValue,
        breakdown: breakdown
      });
    }
    return data;
  }, [benchmarkMode]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.15}/>
            <stop offset="100%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        
        <CartesianGrid vertical={false} stroke="#27272a" strokeDasharray="3 3" opacity={0.2} />
        
        <XAxis 
          dataKey="shortDate" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#52525b', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}
          interval={4} 
          dy={10}
        />
        
        <YAxis hide domain={['auto', 'auto']} />
        
        <Tooltip 
          content={<RichTooltip benchmarkMode={benchmarkMode} />} 
          cursor={{ stroke: '#FFFFFF', strokeWidth: 1, strokeOpacity: 0.2, strokeDasharray: '4 4' }} 
          // Ensure tooltip doesn't get clipped by parent overflow
          wrapperStyle={{ zIndex: 100 }}
        />

        {benchmarkMode !== 'USD' && (
            <Line 
                type="monotone"
                dataKey="benchmarkValue"
                stroke="#52525b" 
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                animationDuration={1500}
            />
        )}

        <Area 
          type="monotone"
          dataKey="value" 
          stroke="#10b981" 
          strokeWidth={2}
          fill={benchmarkMode === 'USD' ? "url(#chartGradient)" : "none"} 
          animationDuration={1500}
          activeDot={{ 
            r: 4, 
            fill: '#10b981', 
            stroke: '#09090b', 
            strokeWidth: 2 
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BalanceChart;
