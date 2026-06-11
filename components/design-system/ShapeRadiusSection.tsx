import React from "react";
import { CircleDashed } from "lucide-react";

export const ShapeRadiusSection: React.FC = () => {
  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between border-b border-strong pb-3">
        <div className="flex items-center gap-3">
          <CircleDashed className="text-success" size={24} />
          <h2 className="text-lg font-black text-content uppercase tracking-[0.2em]">
            03. Shape & Radius
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {[
          { val: "lg", size: "0.5rem" },
          { val: "xl", size: "0.75rem" },
          { val: "2xl", size: "1rem" },
          { val: "3xl", size: "1.5rem" },
          { val: "4xl", size: "2rem" },
          { val: "5xl", size: "2.5rem" },
          { val: "full", size: "9999px" },
        ].map((r) => (
          <div key={r.val} className="flex flex-col items-center space-y-4">
             <div className={`w-20 h-20 bg-background-elevated border border-strong shadow-lg rounded-${r.val} flex items-center justify-center`}>
                <span className="text-xs font-mono text-content-secondary">{r.size}</span>
             </div>
             <div className="text-center">
                <div className="text-xs font-mono font-bold text-info">rounded-{r.val}</div>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};
