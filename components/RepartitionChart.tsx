
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MOCK_ASSETS } from '../constants';

const RepartitionChart: React.FC = () => {
  const data = MOCK_ASSETS.map(asset => ({
    name: asset.name,
    value: asset.value
  }));

  const COLORS = ['#627EEA', '#14F195', '#28A0F0', '#00FF00', '#2775CA'];

  return (
    <div className="bg-zinc-900/40 border border-white/5 rounded-[2.2rem] p-8 shadow-xl backdrop-blur-md h-full flex flex-col">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
        <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Distribution</h2>
      </div>
      
      <div className="flex-1 relative min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
              animationBegin={0}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0a0a0a', 
                borderColor: 'rgba(255,255,255,0.05)', 
                borderRadius: '16px',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold',
                backdropFilter: 'blur(8px)'
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Centered Total */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-[9px] text-zinc-500 uppercase font-black tracking-[0.2em]">Total</div>
          <div className="text-xl font-mono font-bold text-white">100%</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-6">
        {MOCK_ASSETS.slice(0, 4).map((asset, index) => (
          <div key={asset.symbol} className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[index] }}></div>
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest truncate">{asset.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepartitionChart;
