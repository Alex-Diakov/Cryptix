import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, Info, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCryptoInsights } from '../services/geminiService';
import { MOCK_ASSETS } from '../constants';

const CryptoAI: React.FC = () => {
  const [insight, setInsight] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const autoFetch = async () => {
      setLoading(true);
      const results = await getCryptoInsights(MOCK_ASSETS);
      setInsight(results);
      setLoading(false);
    };
    autoFetch();
  }, []);

  const nextInsight = () => {
    if (insight.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % insight.length);
  };

  const prevInsight = () => {
    if (insight.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + insight.length) % insight.length);
  };

  return (
    <section className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden group backdrop-blur-md" aria-labelledby="ai-intel-title">
      <div className="space-y-4">
        {/* CAROUSEL CONTAINER */}
        <div className="bg-[#050505]/40 border border-white/[0.03] p-6 rounded-[2rem] min-h-[120px] flex flex-col justify-center shadow-inner relative group/carousel">
          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="animate-spin text-emerald-500" size={24} aria-hidden="true" />
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] animate-pulse">Analyzing...</p>
            </div>
          ) : (
            <div className="relative animate-in fade-in slide-in-from-bottom-1 duration-500">
              {insight.length > 0 && (
                <div className="flex flex-col items-center text-center space-y-4 px-2">
                   <p className="text-[12px] leading-relaxed text-zinc-300 font-medium tracking-tight normal-case">
                    {insight[currentIndex]}
                  </p>
                  
                  {/* PAGINATION DOTS */}
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    {insight.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-emerald-500 w-4' : 'bg-zinc-700 hover:bg-zinc-500'}`}
                        aria-label={`Go to insight ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* NAV ARROWS - ONLY ON HOVER */}
              <button 
                onClick={prevInsight} 
                className="absolute -left-4 top-1/2 -translate-y-1/2 p-1 text-zinc-600 hover:text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextInsight} 
                className="absolute -right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-600 hover:text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center space-x-4 bg-zinc-900/80 py-3 rounded-2xl border border-white/5 shadow-lg">
          <Clock size={10} className="text-zinc-500" />
          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Live • Updated 1m ago</span>
        </div>
      </div>
    </section>
  );
};

export default CryptoAI;