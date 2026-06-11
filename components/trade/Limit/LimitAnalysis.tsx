import React from "react";
import {
  Sparkles,
  Fuel,
  ChevronDown,
  Clock,
  Activity,
  Zap,
  Layers,
  X,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface LimitAnalysisProps {
  logic: any;
}

const ACTIVE_LIMIT_ORDERS = [
  {
    id: "ord_1",
    time: "14:32:05",
    pair: "ETH/USDC",
    side: "Sell",
    size: "350.00 ETH",
    filledPct: 12,
    price: 3320.0,
  },
  {
    id: "ord_2",
    time: "14:30:22",
    pair: "SOL/USDC",
    side: "Buy",
    size: "1,200 SOL",
    filledPct: 68,
    price: 138.5,
  },
];

export const LimitAnalysis: React.FC<LimitAnalysisProps> = ({ logic }) => {
  const {
    simulation,
    isDetailsOpen,
    setIsDetailsOpen,
    depthData,
    limitPrice,
    ETH_PRICE,
  } = logic;

  return (
    <section className="lg:col-span-6 bg-zinc-900/40 border border-subtle rounded-[2.5rem] p-8 flex flex-col h-full overflow-hidden relative">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            <Sparkles className="text-purple-500" size={20} /> Limit
            Intelligence
          </h2>
          <p className="text-[10px] font-bold text-content-tertiary uppercase tracking-widest mt-1">
            Predictive Fill Analytics
          </p>
        </div>
        <div
          className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-wider flex items-center gap-2 bg-background-surface border-subtle text-content-tertiary`}
        >
          <Fuel size={10} /> Gas: {simulation.networkFee.toFixed(2)}
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1 overflow-y-auto scrollbar-hide">
        {/* 1. Probability Card (Primary View) */}
        <div className="bg-background-surface border border-subtle rounded-2xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-4">
              {/* Gauge Visual */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#18181b"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke={simulation.probColor}
                    strokeWidth="8"
                    strokeDasharray="263.89"
                    strokeDashoffset={
                      263.89 - 263.89 * (simulation.execProbability / 100)
                    }
                    strokeLinecap="round"
                    className="transition-[stroke-dashoffset] duration-1000 ease-out drop-shadow-[0_0_6px_rgba(0,0,0,0.5)]"
                  />
                </svg>
                <span className="absolute text-sm font-mono font-bold text-white">
                  {simulation.execProbability}%
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-content-tertiary uppercase tracking-widest mb-1">
                  Fill Probability
                </span>
                <span
                  className={`text-xl font-black uppercase tracking-tight ${simulation.execProbability > 75 ? "text-emerald-500" : "text-content-secondary"}`}
                >
                  {simulation.execProbability > 95
                    ? "Instant Fill"
                    : simulation.execProbability > 75
                      ? "Likely Fill"
                      : "Unlikely"}
                </span>
              </div>
            </div>
          </div>

          {/* Progressive Disclosure Toggle */}
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="w-full flex items-center justify-between mt-4 pt-3 border-t border-subtle text-[9px] font-bold uppercase tracking-widest text-content-tertiary hover:text-white transition-colors group cursor-pointer relative z-10"
          >
            <span>Smart Analysis Factors</span>
            <ChevronDown
              size={12}
              className={`transition-transform duration-300 ${isDetailsOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Hidden Detailed Metrics */}
          <div
            className={`grid grid-cols-2 gap-2 overflow-hidden transition-all duration-300 ease-in-out ${isDetailsOpen ? "mt-3 max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="bg-zinc-900/50 p-3 rounded-xl border border-subtle flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-content-tertiary mb-1">
                <Clock size={12} />{" "}
                <span className="text-[9px] uppercase font-bold">
                  Time Horizon
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-white">
                {simulation.timeHorizon}
              </span>
            </div>

            <div className="bg-zinc-900/50 p-3 rounded-xl border border-subtle flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-content-tertiary mb-1">
                <Activity size={12} />{" "}
                <span className="text-[9px] uppercase font-bold">
                  Yield Drag
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-rose-400">
                -${simulation.dailyYieldLoss.toFixed(2)}
              </span>
            </div>

            <div className="bg-zinc-900/50 p-3 rounded-xl border border-subtle flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-content-tertiary mb-1">
                <Zap size={12} />{" "}
                <span className="text-[9px] uppercase font-bold">Fee Tier</span>
              </div>
              <span className="text-xs font-mono font-bold text-content-secondary">
                {simulation.feeTierLabel} ({simulation.activeFeeBps} bps)
              </span>
            </div>

            <div className="bg-zinc-900/50 p-3 rounded-xl border border-subtle flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-content-tertiary mb-1">
                <Layers size={12} />{" "}
                <span className="text-[9px] uppercase font-bold">
                  Market Depth
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-500">
                Thick Liquidity
              </span>
            </div>
          </div>
        </div>

        {/* Order Book Depth */}
        <div className="bg-background-surface border border-subtle rounded-2xl p-5 flex flex-col flex-1 min-h-[200px]">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[10px] font-bold text-content-tertiary uppercase tracking-widest flex items-center gap-2">
              <Layers size={12} /> Market Depth
            </p>
            <span
              className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded border ${
                simulation.structureLabel === "BREAKOUT"
                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  : simulation.structureLabel === "BELOW SUPPORT"
                    ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    : "bg-background-surface text-content-secondary border-subtle"
              }`}
            >
              {simulation.structureLabel}
            </span>
          </div>
          <div className="flex-1 w-full min-h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={depthData}>
                <defs>
                  <linearGradient id="bidGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="askGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="price"
                  type="number"
                  domain={["auto", "auto"]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#52525b", fontSize: 9, fontWeight: 700 }}
                  tickFormatter={(val) => val.toFixed(0)}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{
                    stroke: "#ffffff",
                    strokeWidth: 1,
                    strokeDasharray: "3 3",
                  }}
                  contentStyle={{
                    backgroundColor: "#09090b",
                    borderColor: "#333",
                    borderRadius: "12px",
                    fontSize: "10px",
                  }}
                />
                <Area
                  type="stepAfter"
                  dataKey="bidVol"
                  stroke="#10b981"
                  fill="url(#bidGrad)"
                  strokeWidth={2}
                />
                <Area
                  type="stepAfter"
                  dataKey="askVol"
                  stroke="#ef4444"
                  fill="url(#askGrad)"
                  strokeWidth={2}
                />
                <ReferenceLine
                  x={ETH_PRICE}
                  stroke="#71717a"
                  strokeDasharray="3 3"
                  label={{
                    position: "top",
                    value: "MKT",
                    fill: "#71717a",
                    fontSize: 9,
                    fontWeight: 700,
                  }}
                />
                <ReferenceLine
                  x={parseFloat(limitPrice)}
                  stroke="#3b82f6"
                  strokeWidth={2}
                  label={{
                    position: "top",
                    value: "YOU",
                    fill: "#3b82f6",
                    fontSize: 9,
                    fontWeight: 800,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Orders List */}
        <div className="bg-background-surface border border-subtle rounded-2xl p-5 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[10px] font-black text-content-tertiary uppercase tracking-[0.2em]">
              Active Orders
            </h3>
            <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-2 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>{" "}
              2 LIVE
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[9px] font-black text-content-tertiary uppercase tracking-widest border-b border-subtle">
                  <th className="pb-3 pl-2">Time</th>
                  <th className="pb-3">Pair</th>
                  <th className="pb-3 text-right">Size</th>
                  <th className="pb-3 text-right">Filled</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ACTIVE_LIMIT_ORDERS.map((order) => (
                  <tr
                    key={order.id}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 pl-2 text-xs font-mono font-bold text-content-tertiary">
                      {order.time}
                    </td>
                    <td className="py-3 text-xs font-bold text-white">
                      {order.pair}
                    </td>
                    <td className="py-3 text-right text-xs font-mono font-bold text-content-secondary">
                      {order.size}
                    </td>
                    <td className="py-3 text-right text-xs font-mono font-bold text-emerald-500">
                      {order.filledPct}%
                    </td>
                    <td className="py-3 text-right pr-2">
                      <button className="p-1.5 hover:bg-rose-500/10 text-content-tertiary hover:text-rose-500 rounded transition-colors">
                        <X size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
