
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

const formatPrecise = (val: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);

const formatPercentage = (val: number) => {
    return `${val > 0 ? '+' : ''}${val.toFixed(2)}%`;
};

// --- RICH TOOLTIP COMPONENT ---
// Re-engineered for exact data precision and strict layout
const RichTooltip = ({ active, payload, label, benchmarkMode = 'USD' }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const portfolioVal = data.value;
    
    // Sort assets by value DESCENDING for the tooltip list
    const sortedBreakdown = [...data.breakdown].sort((a: any, b: any) => b.value - a.value);

    return (
      <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] min-w-[280px] animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
        
        {/* Header */}
        <div className="mb-4 border-b border-white/5 pb-3">
          <div className="text-zinc-400 text-[10px] uppercase tracking-wider font-bold mb-1">{data.fullDate}</div>
          <div className="text-white text-lg font-mono font-medium tracking-tight">
             {benchmarkMode === 'USD' ? formatPrecise(portfolioVal) : `${portfolioVal > 0 ? '+' : ''}${portfolioVal.toFixed(2)}%`}
          </div>
        </div>

        {/* Breakdown List */}
        {benchmarkMode === 'USD' && (
          <div className="flex flex-col gap-2">
            {sortedBreakdown.map((asset: any) => (
              <div key={asset.name} className="flex items-center justify-between text-[11px] h-5 w-full">
                
                {/* Left: Dot + Name */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {/* Dynamic Color Dot (Brand Color) */}
                  <div className="w-2 h-2 rounded-full shadow-[0_0_5px_rgba(0,0,0,0.5)] shrink-0" style={{ backgroundColor: asset.color }} />
                  <span className="text-zinc-300 font-medium tracking-wide">{asset.name}</span>
                  {/* Dotted Leader Line (Subtle) */}
                  <div className="flex-1 border-b border-dotted border-white/10 h-3 mx-2 opacity-20"></div>
                </div>
                
                {/* Right: Value + PnL */}
                <div className="flex items-center gap-4 shrink-0">
                   {/* Tabular nums for strict alignment */}
                  <span className="text-white font-mono tabular-nums font-medium text-[11px]">
                    ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(asset.value)}
                  </span>
                  <span className={`font-mono tabular-nums font-bold w-12 text-right ${
                      asset.change > 0 ? 'text-emerald-500' : 
                      asset.change < 0 ? 'text-rose-500' : 
                      'text-zinc-400'
                  }`}>
                    {formatPercentage(asset.change)}
                  </span>
                </div>
              </div>
            ))}
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
    
    // Initial Base values - MUST MATCH MOCK_ASSETS in constants.tsx
    // Quantities
    const ethQty = 350;
    const solQty = 45;
    const pepeQty = 900000000;
    const bnbQty = 120000;
    const arbQty = 1200;
    const usdcBalance = 2500; 
    const usdtBalance = 2000000;

    // Start Prices (7 days ago approx)
    let ethPrice = 3050;
    let solPrice = 138;
    let pepePrice = 0.000010;
    let bnbPrice = 585.00;
    let arbPrice = 1.05;

    // Target End Prices (Exact Current Values from MOCK_ASSETS)
    const targetEth = 3208.93;
    const targetSol = 142.50;
    const targetPepe = 0.000012;
    const targetBnb = 592.50;
    const targetArb = 1.12;

    let startTotal = 0;
    let startBenchmark = 0;

    for (let i = 0; i <= totalPoints; i++) {
      const date = new Date(now.getTime() - ((totalPoints - i) * (24/pointsPerDay) * 60 * 60 * 1000));
      
      // Interpolate prices from Start to Target to ensure smooth landing on current value
      const progress = i / totalPoints;
      
      // Add some noise but stick to the trend line
      const noise = (Math.random() - 0.5) * 0.02; // 2% noise
      
      const interpolate = (start: number, end: number) => {
          if (i === totalPoints) return end; // Force exact end value
          const linear = start + (end - start) * progress;
          return linear * (1 + noise);
      };

      const currentEth = interpolate(ethPrice, targetEth);
      const currentSol = interpolate(solPrice, targetSol);
      const currentPepe = interpolate(pepePrice, targetPepe);
      const currentBnb = interpolate(bnbPrice, targetBnb);
      const currentArb = interpolate(arbPrice, targetArb);

      const ethVal = currentEth * ethQty;
      const solVal = currentSol * solQty;
      const pepeVal = currentPepe * pepeQty;
      const bnbVal = currentBnb * bnbQty;
      const arbVal = currentArb * arbQty;
      const total = ethVal + solVal + pepeVal + bnbVal + arbVal + usdcBalance + usdtBalance;

      // Benchmark Logic (ETH as base for simple comparison)
      let benchmarkPrice = currentEth; 
      if (benchmarkMode === 'BTC') {
         // Mock BTC correlation
         benchmarkPrice = currentEth * 19.5 + (Math.random() * 200); 
      }

      if (i === 0) {
          startTotal = total;
          startBenchmark = benchmarkPrice;
      }

      // Exact Breakdown for Tooltip with BRAND SPECIFIC COLORS (Matches constants.tsx)
      const breakdown = [
        { name: 'BNB', value: bnbVal, change: ((currentBnb - 580)/580)*100, color: '#F3BA2F' }, // BNB Gold
        { name: 'USDT', value: usdtBalance, change: 0, color: '#26A17B' }, // USDT Teal
        { name: 'ETH', value: ethVal, change: ((currentEth - 3100)/3100)*100, color: '#627EEA' }, // ETH Indigo
        { name: 'SOL', value: solVal, change: ((currentSol - 135)/135)*100, color: '#14F195' }, // SOL Neon Cyan
        { name: 'PEPE', value: pepeVal, change: ((currentPepe - 0.000010)/0.000010)*100, color: '#4C9540' }, // PEPE Forest Green
        { name: 'ARB', value: arbVal, change: ((currentArb - 1.0)/1.0)*100, color: '#28A0F0' }, // ARB Blue
        { name: 'USDC', value: usdcBalance, change: 0, color: '#2775CA' } // USDC Science Blue
      ];

      // Value Calculation
      let plotValue = total;
      let benchmarkPlotValue = 0;

      if (benchmarkMode !== 'USD') {
          // If in crypto benchmark mode, we show PERFORMANCE relative to start, not absolute price
          // Unless we want to show value IN that crypto.
          // Let's show % performance comparison as that's standard for "Benchmark" view
          plotValue = ((total - startTotal) / startTotal) * 100;
          const rawBenchmarkChange = ((benchmarkPrice - startBenchmark) / startBenchmark) * 100;
          benchmarkPlotValue = rawBenchmarkChange; 
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
      <AreaChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.2}/>
            <stop offset="100%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        
        {/* Grid with lower opacity */}
        <CartesianGrid vertical={false} stroke="#27272a" strokeDasharray="3 3" opacity={0.2} />
        
        <XAxis 
          dataKey="shortDate" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}
          interval={3} 
          dy={10}
        />
        
        <YAxis hide domain={['auto', 'auto']} />
        
        <Tooltip 
          content={<RichTooltip benchmarkMode={benchmarkMode} />} 
          cursor={{ stroke: '#FFFFFF', strokeWidth: 1, strokeOpacity: 0.2, strokeDasharray: '4 4' }} 
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
          type="monotone" // Smoothed but precise (not natural)
          dataKey="value" 
          stroke="#10b981" 
          strokeWidth={2} // Refined stroke width
          fill={benchmarkMode === 'USD' ? "url(#chartGradient)" : "none"} 
          animationDuration={1500}
          activeDot={{ 
            r: 4, 
            fill: '#10b981', 
            stroke: '#050505', 
            strokeWidth: 2 
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BalanceChart;
