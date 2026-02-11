
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // We extend the default theme to keep standard utilities available,
    // but override specific areas to enforce the design system.
    extend: {
      // --- 01. TYPOGRAPHY SYSTEM ---
      // Rules: 
      // - Use `sans` for UI elements (Inter).
      // - Use `mono` for financial data, hashes, and code (JetBrains Mono).
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      // Micro-typography is critical for dense trading dashboards.
      // Use `text-3xs` for labels/metadata, `text-2xs` for secondary table data.
      fontSize: {
        '3xs': ['9px', { lineHeight: '12px', letterSpacing: '0.05em', fontWeight: '700' }], // Metadata / Badges
        '2xs': ['10px', { lineHeight: '14px', letterSpacing: '0.025em', fontWeight: '600' }], // Table Data / Labels
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0' }],
        'sm': ['14px', { lineHeight: '20px', letterSpacing: '-0.01em' }],
        'base': ['16px', { lineHeight: '24px', letterSpacing: '-0.01em' }],
        'lg': ['18px', { lineHeight: '28px', letterSpacing: '-0.02em' }],
        'xl': ['20px', { lineHeight: '28px', letterSpacing: '-0.02em' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.03em' }],
        '3xl': ['30px', { lineHeight: '36px', letterSpacing: '-0.03em' }],
        '4xl': ['36px', { lineHeight: '40px', letterSpacing: '-0.04em' }],
        '5xl': ['48px', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '6xl': ['60px', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },

      // --- 02. COLOR PALETTE ARCHITECTURE ---
      colors: {
        // > Brand & Functional Status
        // Used for interactive elements, status indicators, and highlights.
        primary: {
          DEFAULT: '#10b981', // emerald-500 (Success/Up/Buy)
          foreground: '#000000',
          hover: '#34d399',   // emerald-400
          active: '#059669',  // emerald-600
          subtle: 'rgba(16, 185, 129, 0.1)',
          glow: 'rgba(16, 185, 129, 0.4)',
        },
        secondary: {
          DEFAULT: '#a855f7', // purple-500 (AI/Intelligence/Bot)
          foreground: '#ffffff',
          hover: '#c084fc',   // purple-400
          subtle: 'rgba(168, 85, 247, 0.1)',
          glow: 'rgba(168, 85, 247, 0.4)',
        },
        destructive: {
          DEFAULT: '#f43f5e', // rose-500 (Error/Down/Sell/Liquidate)
          foreground: '#ffffff',
          hover: '#fb7185',   // rose-400
          subtle: 'rgba(244, 63, 94, 0.1)',
        },
        warning: {
          DEFAULT: '#f59e0b', // amber-500 (Caution/Pending/Risk)
          foreground: '#000000',
          hover: '#fbbf24',   // amber-400
          subtle: 'rgba(245, 158, 11, 0.1)',
        },
        info: {
          DEFAULT: '#3b82f6', // blue-500 (System/Network)
          foreground: '#ffffff',
          hover: '#60a5fa',   // blue-400
          subtle: 'rgba(59, 130, 246, 0.1)',
        },

        // > Surface Architecture (Deep Space Theme)
        // These tokens define the depth and hierarchy of the app.
        background: {
          DEFAULT: '#050507', // Global App Body (Deepest)
          subtle: '#050505',  // Chart Backgrounds
          card: '#09090b',    // Panels / Modals / Cards
          surface: '#0a0a0a', // Headers / Sidebars / Nav
          input: '#18181b',   // Form Fields (Higher Contrast)
          elevated: '#1a1a1a' // Dropdowns / Tooltips / Popovers
        },
        
        // > Content Hierarchy (Text & Icons)
        // Strictly use these for text colors to maintain accessible contrast.
        content: {
          primary: '#ffffff',   // Headings, Values, Active States
          secondary: '#a1a1aa', // zinc-400 (Body text, Labels)
          tertiary: '#52525b',  // zinc-600 (Disabled, Watermarks, Meta)
          inverse: '#000000',   // Text on primary buttons
        },

        // > Border System (Glassmorphism)
        // Borders are translucent to blend with the nebula background.
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          subtle: 'rgba(255, 255, 255, 0.04)',
          strong: 'rgba(255, 255, 255, 0.15)',
          active: 'rgba(255, 255, 255, 0.25)', // Focus states
        },
      },

      // --- 03. SPACING & SHAPE ---
      borderRadius: {
        'lg': '0.5rem',    // Inputs, Small Buttons
        'xl': '0.75rem',   // Cards, Dropdowns
        '2xl': '1rem',     // Modal Containers
        '3xl': '1.5rem',   // Large Panels
        '4xl': '2rem',     // Dashboard Sections
        '5xl': '2.5rem',   // Hero Elements
        'full': '9999px',  // Pills, Avatars
      },
      
      // --- 04. DEPTH & EFFECTS ---
      boxShadow: {
        // Standard Elevation
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        
        // Neon / Glow Effects (Cyberpunk Feel)
        'glow-sm': '0 0 10px rgba(16, 185, 129, 0.2)',
        'glow': '0 0 20px rgba(16, 185, 129, 0.4)',
        'glow-lg': '0 0 30px rgba(16, 185, 129, 0.5)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.4)',
        'glow-rose': '0 0 20px rgba(244, 63, 94, 0.4)',
        
        // Functional
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'gradient-glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
        'gradient-brand': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      },

      // --- 05. ANIMATION PHYSICS ---
      // Using cubic-bezier for "premium" feel (Apple-like spring physics)
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'zoom-in': 'zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounceSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(-2%)' },
          '50%': { transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [
    plugin(function({ addComponents, theme }) {
      addComponents({
        // Level 1: Primary Application Container (Glass)
        '.glass-panel': {
          backgroundColor: 'rgb(24 24 27 / 0.4)', // bg-zinc-900/40
          borderColor: 'rgba(255, 255, 255, 0.05)', // border-white/5
          borderWidth: '1px',
          borderRadius: theme('borderRadius.5xl'), // rounded-[2.5rem]
          boxShadow: theme('boxShadow.2xl'), // shadow-2xl
          backdropFilter: 'blur(12px)', // backdrop-blur-md
          position: 'relative',
          overflow: 'hidden',
          transitionProperty: 'all',
          transitionDuration: '300ms',
        },
        // Level 1.5: Modals / Floating Panels (Opaque)
        '.surface-modal': {
          backgroundColor: '#09090b',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: '1px',
          borderRadius: theme('borderRadius.2xl'),
          boxShadow: theme('boxShadow.xl'),
        },
        // Level 2: Grouping / Inset Areas
        '.surface-group': {
          backgroundColor: 'rgba(24, 24, 27, 0.3)', // bg-zinc-900/30
          borderColor: 'rgba(255, 255, 255, 0.05)',
          borderWidth: '1px',
          borderRadius: theme('borderRadius.xl'),
        },
        // Level 3: Interactive List Items / Cards
        '.surface-interactive': {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: '1px',
          borderRadius: theme('borderRadius.lg'),
          transitionProperty: 'all',
          transitionDuration: '200ms',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#27272a', // bg-zinc-800
            borderColor: 'rgba(255, 255, 255, 0.05)',
          },
        },
      })
    })
  ],
}
