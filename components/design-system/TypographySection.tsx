import React from "react";
import { Type } from "lucide-react";

export const TypographySection: React.FC = () => {
  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between border-b border-strong pb-3">
        <div className="flex items-center gap-3">
          <Type className="text-info" size={24} />
          <h2 className="text-lg font-black text-content uppercase tracking-[0.2em]">
            01. Typography System
          </h2>
        </div>
        <span className="text-xs font-mono text-content-secondary">
          Inter (sans) & JetBrains Mono (mono)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          {[
            { size: "6xl", token: "text-6xl", details: "60px / tracking:-0.04em / leading:1" },
            { size: "5xl", token: "text-5xl", details: "48px / tracking:-0.04em / leading:1" },
            { size: "4xl", token: "text-4xl", details: "36px / tracking:-0.04em / leading:40px" },
            { size: "3xl", token: "text-3xl", details: "30px / tracking:-0.03em / leading:36px" },
            { size: "2xl", token: "text-2xl", details: "24px / tracking:-0.03em / leading:32px" },
            { size: "xl", token: "text-xl", details: "20px / tracking:-0.02em / leading:28px" },
            { size: "lg", token: "text-lg", details: "18px / tracking:-0.02em / leading:28px" },
            { size: "base", token: "text-base", details: "16px / tracking:-0.01em / leading:24px" },
            { size: "sm", token: "text-sm", details: "14px / tracking:-0.01em / leading:20px" },
            { size: "xs", token: "text-xs", details: "12px / tracking:0 / leading:16px" },
            { size: "2xs", token: "text-2xs", details: "10px / tracking:0.025em / leading:14px" },
            { size: "3xs", token: "text-3xs", details: "9px / tracking:0.05em / leading:12px" },
          ].map((font, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-subtle pb-4">
               <div className={`font-sans text-content font-bold ${font.token}`}>
                 Heading {font.size}
               </div>
               <div className="text-right flex flex-col">
                 <span className="text-sm font-bold font-mono text-info">{font.token}</span>
                 <span className="text-xs font-mono text-content-secondary">{font.details}</span>
               </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="surface-group p-8 space-y-8">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-content-secondary uppercase tracking-widest">
                  Mono Data (JetBrains)
                </span>
                <span className="text-xs font-mono text-info font-bold">font-mono</span>
              </div>
              <div className="text-4xl font-mono font-medium text-content bg-background-elevated p-4 rounded-xl border border-strong">
                $1,240,500.00
              </div>
            </div>
            <div>
               <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-content-secondary uppercase tracking-widest">
                  Text Gradient Utility
                </span>
                <span className="text-xs font-mono text-info font-bold">text-gradient</span>
              </div>
              <div className="text-3xl font-black text-gradient bg-background-elevated p-4 rounded-xl border border-strong">
                Supercharged AI
              </div>
            </div>
          </div>

          <div className="bg-background-card p-8 rounded-2xl border border-strong">
              <h3 className="text-lg font-bold text-content mb-4 tracking-tight">Content Hierarchy & Contrast</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-content font-medium text-base">text-content: Pure White / Absolute clarity / Primary actions & headings.</p>
                  <p className="text-xs font-mono text-info mt-1">var(--color-content) / text-content</p>
                </div>
                <div>
                  <p className="text-content-secondary text-base">text-content-secondary: Zinc 400 / Structural text / Descriptions and secondary reads.</p>
                  <p className="text-xs font-mono text-info mt-1">var(--color-content-secondary) / text-content-secondary</p>
                </div>
                <div>
                  <p className="text-content-tertiary text-base">text-content-tertiary: Zinc 600 / Dimmed information / Metadata, placeholders, disabled states.</p>
                  <p className="text-xs font-mono text-info mt-1">var(--color-content-tertiary) / text-content-tertiary</p>
                </div>
                 <div>
                  <p className="text-content-muted text-base">text-content-muted: Zinc 700 / Extremely subtle / Watermarks and background text.</p>
                  <p className="text-xs font-mono text-info mt-1">var(--color-content-muted) / text-content-muted</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};
