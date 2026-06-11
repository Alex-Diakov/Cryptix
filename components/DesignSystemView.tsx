import React from "react";
import { LayoutTemplate } from "lucide-react";
import { TypographySection } from "./design-system/TypographySection";
import { ColorArchitectureSection } from "./design-system/ColorArchitectureSection";
import { ShapeRadiusSection } from "./design-system/ShapeRadiusSection";
import { DepthLightingSection } from "./design-system/DepthLightingSection";
import { AnimationPhysicsSection } from "./design-system/AnimationPhysicsSection";
import { CssComponentsClassesSection } from "./design-system/CssComponentsClassesSection";
import { ButtonsSection } from "./design-system/ButtonsSection";
import { InputsSection } from "./design-system/InputsSection";
import { InstantTradeSection } from "./design-system/InstantTradeSection";

/**
 * ============================================================================
 * DESIGN SYSTEM VIEW
 * Single-file implementation identical to index.css architecture.
 * ============================================================================
 */
const DesignSystemView: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto relative bg-background-subtle scrollbar-hide p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-20 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* HEADER */}
        <div className="border-b border-strong pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-background-card rounded-2xl border border-strong shadow-lg">
              <LayoutTemplate className="text-primary" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-content tracking-tight uppercase">
                UI Design System <span className="text-primary">Core</span>
              </h1>
              <p className="text-content-secondary text-sm font-mono mt-2 uppercase tracking-widest">
                Source of Truth • Consistent with index.css
              </p>
            </div>
          </div>
        </div>

        <TypographySection />
        <ColorArchitectureSection />
        <ShapeRadiusSection />
        <DepthLightingSection />
        <AnimationPhysicsSection />
        <CssComponentsClassesSection />
        <ButtonsSection />
        <InputsSection />
        <InstantTradeSection />

      </div>
    </div>
  );
};

export default DesignSystemView;

