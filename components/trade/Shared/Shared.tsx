import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Sparkles, X, ExternalLink, ShieldCheck, Search } from "lucide-react";

export const formatMoney = (val: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    val,
  );
export const formatToken = (val: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(val);
export const formatTokenAmount = (val: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(val); // Extended decimals
export const formatPercent = (val: number) =>
  `${val > 0 ? "+" : ""}${val.toFixed(2)}%`;

export const ETH_ICON =
  "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035";
export const USDC_ICON =
  "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035";

// Helper to get generic logos if needed, or use specific ones
export const getTokenLogo = (symbol: string) => {
  switch (symbol.toUpperCase()) {
    case "ETH":
      return ETH_ICON;
    case "USDC":
      return USDC_ICON;
    case "USDT":
      return "https://cryptologos.cc/logos/tether-usdt-logo.png?v=035";
    case "WBTC":
      return "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png?v=035";
    case "PEPE":
      return "https://cryptologos.cc/logos/pepe-pepe-logo.png?v=035";
    default:
      return ETH_ICON;
  }
};

export const EducationalTooltip: React.FC<{
  title: string;
  desc: string;
  children: React.ReactNode;
}> = ({ title, desc, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
          top: rect.top + window.scrollY,
          left: rect.left + rect.width / 2,
        });
        setIsVisible(true);
      }
    }, 500);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsVisible(false);
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-help w-full h-full block"
      >
        {children}
      </div>
      {isVisible &&
        createPortal(
          <div
            className="fixed z-[9999] pointer-events-none animate-in fade-in zoom-in-95 duration-300"
            style={{
              top: coords.top - 12,
              left: coords.left,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="w-[280px] bg-zinc-900/95 border border-strong backdrop-blur-md p-5 rounded-xl shadow-2xl relative">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                <Sparkles size={12} className="text-emerald-500" />
                {title}
              </h4>
              <p className="text-content-secondary text-[11px] leading-relaxed font-medium">
                {desc}
              </p>
              {/* Arrow */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900/95 border-b border-r border-strong rotate-45"></div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

interface Token {
  sym: string;
  name: string;
  balance?: number;
  verified: boolean;
}

export const TokenSelectorModal = ({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (t: Token) => void;
}) => {
  const [search, setSearch] = useState("");
  if (!isOpen) return null;

  const tokens: Token[] = [
    { sym: "ETH", name: "Ethereum", verified: true },
    { sym: "USDC", name: "USD Coin", verified: true },
    { sym: "USDT", name: "Tether USD", verified: true },
    { sym: "WBTC", name: "Wrapped BTC", verified: true },
    { sym: "PEPE", name: "Pepe", verified: false },
  ];

  const filtered = tokens.filter(
    (t) =>
      t.sym.toLowerCase().includes(search.toLowerCase()) ||
      t.name.toLowerCase().includes(search.toLowerCase()),
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-[400px] bg-background-card border border-strong rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-subtle flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase tracking-widest text-white">
              Select Token
            </span>
            <button onClick={onClose}>
              <X size={14} className="text-content-tertiary hover:text-white" />
            </button>
          </div>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-content-tertiary"
            />
            <input
              autoFocus
              type="text"
              placeholder="Search name or paste address"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background-card border border-strong rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium text-white placeholder:text-content-tertiary focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>
        <div className="p-2 space-y-1 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
          {filtered.map((t) => (
            <button
              key={t.sym}
              onClick={() => {
                onSelect(t);
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl group transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-background-surface flex items-center justify-center text-[10px] font-bold text-content-secondary border border-subtle p-1">
                  <img
                    src={getTokenLogo(t.sym)}
                    alt={t.sym}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">
                      {t.sym}
                    </span>
                    {t.verified && (
                      <div
                        className="flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-500/10 rounded text-[9px] font-bold text-emerald-500 border border-emerald-500/20"
                        title="Verified Contract"
                      >
                        <ShieldCheck size={10} />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-content-tertiary">
                    {t.name}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-content-secondary">
                  0.00
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
};
