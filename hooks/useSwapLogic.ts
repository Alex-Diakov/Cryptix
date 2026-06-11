import { useState, useMemo, useEffect } from 'react';

interface UseSwapLogicProps {
    initialAmount: string;
    onAmountChange: (val: string) => void;
    balance: number;
}

export const useSwapLogic = ({ initialAmount, onAmountChange, balance }: UseSwapLogicProps) => {
    const [recipientMode, setRecipientMode] = useState(false);
    const [recipientAddress, setRecipientAddress] = useState('');
    const [gasSpeed, setGasSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
    
    // Token State
    const [payToken, setPayToken] = useState({ sym: 'ETH', name: 'Ethereum' });
    const [receiveToken, setReceiveToken] = useState({ sym: 'USDC', name: 'USD Coin' });
    const [selectingSide, setSelectingSide] = useState<'pay' | 'receive' | null>(null);

    // Settings
    const [slippage, setSlippage] = useState(0.5);
    const [useMEVShield, setUseMEVShield] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // UX State
    const [isReviewing, setIsReviewing] = useState(false);
    const [reviewTimer, setReviewTimer] = useState(15);
    const [isSimulating, setIsSimulating] = useState(false);

    const ETH_PRICE = 3208.93;
    const numericPay = parseFloat(initialAmount) || 0;
    const isInsufficientBalance = numericPay > balance;
    const hasAmount = numericPay > 0;

    // Simulation Effect
    useEffect(() => {
        if (hasAmount) {
            setIsSimulating(true);
            setIsDetailsOpen(false);
            const timer = setTimeout(() => setIsSimulating(false), 800);
            return () => clearTimeout(timer);
        }
    }, [initialAmount, payToken, receiveToken]);

    // Review Timer
    useEffect(() => {
        let interval: any;
        if (isReviewing) {
            setReviewTimer(15);
            interval = setInterval(() => {
                setReviewTimer(prev => {
                    if (prev <= 1) {
                        setIsReviewing(false); 
                        return 15;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isReviewing]);

    // Calculations
    const simulation = useMemo(() => {
        const pay = numericPay;
        const usdValue = pay * ETH_PRICE;
        
        // Realistic AMM Math (x * y = k)
        // Assume a deep pool of 2M ETH
        const poolEth = 2_000_000;
        const poolUsdc = poolEth * ETH_PRICE;
        
        let receiveValNum = 0;
        let swapImpactPct = 0;
        let swapImpactCost = 0;

        if (pay > 0) {
            const receiveUsdc = poolUsdc - (poolEth * poolUsdc) / (poolEth + pay);
            const idealValue = pay * ETH_PRICE;
            swapImpactCost = idealValue - receiveUsdc;
            swapImpactPct = (swapImpactCost / idealValue) * 100;
            receiveValNum = receiveUsdc;
        }

        const platformFee = usdValue * 0.0005;
        
        let networkFee = 9.75;
        if (gasSpeed === 'fast') networkFee = 12.20;
        if (gasSpeed === 'slow') networkFee = 7.50;

        let routeSplit = [];
        const baseRate = ETH_PRICE;
        if (usdValue > 0) {
            if (usdValue < 50000) {
                 routeSplit = [{ dex: 'Uniswap V3', pct: 100, color: 'bg-white', rate: baseRate * 1.0005, impact: swapImpactPct * 0.9 }];
            } else {
                 routeSplit = [
                    { dex: 'Uniswap V3', pct: 70, color: 'bg-white', rate: baseRate * 1.0002, impact: swapImpactPct * 0.8 }, 
                    { dex: 'Maverick', pct: 30, color: 'bg-zinc-600', rate: baseRate * 0.9998, impact: swapImpactPct * 1.2 }
                 ];
            }
        } else {
            routeSplit = [{ dex: 'Uniswap V3', pct: 100, color: 'bg-white', rate: baseRate, impact: 0.00 }];
        }

        const totalSwapCost = swapImpactCost + platformFee + networkFee;
        receiveValNum = Math.max(0, receiveValNum - platformFee - networkFee);
        const minReceived = receiveValNum * (1 - slippage/100);

        let routingScore = 10 - (swapImpactPct * 2); // Adjusted penalty
        if (routingScore < 1) routingScore = 1;
        
        let scoreLabel = 'OPTIMAL';
        if (swapImpactPct > 1.0) scoreLabel = 'FAIR';
        if (swapImpactPct > 5.0) scoreLabel = 'POOR';

        return {
            receiveValNum, minReceived, swapImpactPct, swapImpactCost, platformFee, networkFee, totalSwapCost, routeSplit,
            routingScore: routingScore.toFixed(1), scoreLabel, usdValue
        };
    }, [numericPay, gasSpeed, slippage]);

    return {
        // Data
        payToken, setPayToken,
        receiveToken, setReceiveToken,
        selectingSide, setSelectingSide,
        recipientMode, setRecipientMode,
        recipientAddress, setRecipientAddress,
        gasSpeed, setGasSpeed,
        slippage, setSlippage,
        useMEVShield, setUseMEVShield,
        isSettingsOpen, setIsSettingsOpen,
        isDetailsOpen, setIsDetailsOpen,
        isReviewing, setIsReviewing,
        reviewTimer,
        isSimulating,
        isInsufficientBalance,
        hasAmount,
        simulation,
        ETH_PRICE,
        numericPay
    };
};