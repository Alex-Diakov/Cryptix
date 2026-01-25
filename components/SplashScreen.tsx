
import React, { useState, useEffect } from 'react';

// Reusing the logo path from Sidebar for consistency
const Logo = () => (
  <svg viewBox="0 0 1016 1016" className="w-24 h-24 text-emerald-500 animate-pulse drop-shadow-[0_0_25px_rgba(16,185,129,0.6)]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M549.013 918.133C571.123 915.868 592.986 911.862 614.388 906.145C676.711 889.445 735.152 858.196 784.176 813.906L841.438 789.45L930.224 751.521L864.971 713.828C895.174 661.515 912.623 605.35 918.288 548.928H1015.12C1009.22 621.794 987.465 694.536 948.491 762.064C878.209 883.81 765.211 965.538 639.335 999.255C609.798 1007.18 579.564 1012.43 549.012 1014.96V918.133H549.013ZM96.924 548.929C99.188 571.029 103.195 592.892 108.91 614.295C125.611 676.618 156.859 735.058 201.149 784.103L225.606 841.354L263.534 930.161L301.227 864.898C353.53 895.101 409.706 912.529 466.158 918.194L466.127 1015.06C393.262 1009.12 320.509 987.402 252.992 948.398C131.245 878.115 49.517 765.118 15.8 639.242C7.86999 609.736 2.61396 579.481 0.0929565 548.929H96.924V548.929ZM273.145 742.26L187.676 752.537L245.522 710.951C218.228 675.747 198.536 635.678 187.205 593.333C165.229 511.339 174.551 420.965 220.318 341.655L285.603 379.348L274.045 283.451L272.796 273.082L262.52 187.585L304.106 245.43C339.298 218.136 379.379 198.475 421.723 187.113C436.303 183.23 451.148 180.289 466.126 178.405V275.9C459.601 277.088 453.094 278.543 446.67 280.254C388.527 295.827 336.337 333.602 303.838 389.86C271.339 446.148 264.752 510.244 280.315 568.386C295.909 626.529 333.673 678.719 389.951 711.218C446.209 743.685 510.304 750.304 568.447 734.741C626.59 719.137 678.801 681.382 711.299 625.105C725.335 600.792 734.505 575.036 739.187 548.93H836.734C831.395 591.531 817.625 633.814 794.799 673.34L729.546 635.647L741.072 731.513L742.321 741.881L752.628 827.379L711.011 769.524C675.808 796.827 635.738 816.519 593.394 827.841C511.41 849.828 421.025 840.504 341.716 794.737L379.409 729.453L283.543 741.01L273.173 742.26H273.145V742.26ZM653.567 507.476C653.567 426.855 588.192 361.489 507.571 361.489C426.928 361.489 361.553 426.855 361.553 507.476C361.553 588.128 426.928 653.504 507.571 653.504C588.191 653.504 653.567 588.128 653.567 507.476ZM66.658 252.928C136.942 131.182 249.939 49.4241 375.813 15.7061C405.341 7.78605 435.574 2.52 466.126 0V96.85C444.027 99.094 422.164 103.1 400.76 108.848C338.427 125.548 279.998 156.766 230.942 201.057L173.701 225.513L84.895 263.472L150.148 301.134C119.945 353.447 102.527 409.643 96.86 466.064H0C5.903 393.199 27.654 320.446 66.658 252.928Z" />
  </svg>
);

const SLOGANS = [
  "Generating FOMO...",
  "Convincing the bears to hibernate...",
  "Drawing arbitrary lines on charts...",
  "Looking for the seed phrase...",
  "Calculating Wen Lambo...",
  "Mining fiat to buy the dip...",
  "Re-calibrating the diamond hands...",
  "Polishing the moon boots...",
  "Syncing with the simulation...",
  "Deleting leverage..."
];

export const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [sloganIndex, setSloganIndex] = useState(0);

  useEffect(() => {
    // Progress Timer - Fills in about 2.5 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 600); // Slight delay after 100% before unmounting
          return 100;
        }
        // Randomize increment for realism
        return prev + Math.random() * 8;
      });
    }, 120); // Faster updates for smoother feel

    return () => clearInterval(interval);
  }, [onFinish]);

  useEffect(() => {
    // Slogan Rotator
    const interval = setInterval(() => {
      setSloganIndex(prev => (prev + 1) % SLOGANS.length);
    }, 1200); // Change slogan every 1.2s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050507] flex flex-col items-center justify-center w-screen h-[100dvh] overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-12 max-w-md w-full px-6 animate-in fade-in zoom-in duration-700">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-8">
           <Logo />
           <h1 className="text-6xl font-black text-white tracking-[0.2em] uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">Cryptix</h1>
        </div>

        {/* Progress Section */}
        <div className="w-full max-w-xs flex flex-col items-center gap-4">
           {/* Bar */}
           <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-purple-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] transition-all duration-200 ease-out relative" 
                style={{ width: `${progress}%` }}
              >
                  {/* Leading glow */}
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-[4px]"></div>
              </div>
           </div>
           
           {/* Percentage */}
           <div className="flex justify-between w-full text-[10px] font-mono text-zinc-600 font-bold uppercase tracking-widest">
              <span>System Boot</span>
              <span>{Math.floor(progress)}%</span>
           </div>
        </div>

        {/* Slogan */}
        <div className="h-8 flex items-center justify-center">
           <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] animate-pulse text-center">
              {SLOGANS[sloganIndex]}
           </p>
        </div>

      </div>
    </div>
  );
};
