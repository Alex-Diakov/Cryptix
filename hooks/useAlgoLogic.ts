import { useState, useMemo, useEffect } from 'react';

interface UseAlgoLogicProps {
    amount: string;
    onAmountChange: (val: string) => void;
    balance: number;
}

export const useAlgoLogic = ({ amount, onAmountChange, balance }: UseAlgoLogicProps) => {
    const [algoStrategy, setAlgoStrategy] = useState<'TWAP' | 'VWAP' | 'ICEBERG'>('TWAP');
    const [algoDuration, setAlgoDuration] = useState(4); // Hours
    const [algoRandomize, setAlgoRandomize] = useState(false);
    const [participationRate, setParticipationRate] = useState(10);
    const [icebergVisibleAmount, setIcebergVisibleAmount] = useState('');
    
    const [isAlgoRunning, setIsAlgoRunning] = useState(false);
    const [executionProgress, setExecutionProgress] = useState(0);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const numericPay = parseFloat(amount) || 0;
    const isInsufficientBalance = numericPay > balance;
    const ETH_PRICE = 3208.93;

    // --- PERCENTAGE HELPERS ---
    const handlePercentageClick = (pct: number) => {
        const maxSafe = Math.max(0, balance - 0.01);
        const val = (maxSafe * pct) / 100;
        onAmountChange(val.toFixed(4));
    };

    const isPercentageActive = (pct: number) => {
        if (balance <= 0) return false;
        const maxSafe = Math.max(0, balance - 0.01);
        const targetVal = (maxSafe * pct) / 100;
        return amount === targetVal.toFixed(4);
    };

    // --- SIMULATION RUNNER ---
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isAlgoRunning && executionProgress < 100) {
            interval = setInterval(() => {
                setExecutionProgress(prev => Math.min(prev + 0.2, 100)); // Simulation tick
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isAlgoRunning, executionProgress]);

    // --- MATH ENGINE ---
    const simulation = useMemo(() => {
        const pay = numericPay;
        const grossValue = pay * ETH_PRICE;
        
        // 1. Constants
        const LIQUIDITY_DEPTH_USD = 15_000_000; 
        const VOLATILITY_FACTOR = 0.8; 
        const GAS_PER_TX_USD = 9.75;
        const PLATFORM_BPS = 5; 

        // 2. Strategy Logic
        let numTranches = 1;
        let strategyLabel = 'Time Weighted';
        let alphaSource = 'Variance Reduction';
        let avgIntervalMins = 0;

        const totalDurationMins = algoDuration * 60;

        if (algoStrategy === 'ICEBERG') {
            strategyLabel = 'Hidden Liquidity';
            alphaSource = 'Signaling Risk';
            const visibleAmt = parseFloat(icebergVisibleAmount) || (pay * 0.1);
            numTranches = Math.ceil(pay / (visibleAmt || 1));
            avgIntervalMins = Math.max(1, Math.floor(totalDurationMins / numTranches));
        } 
        else if (algoStrategy === 'VWAP') {
            strategyLabel = 'Volume Weighted';
            alphaSource = 'Liquidity Capture';
            numTranches = Math.max(1, Math.floor(totalDurationMins / 5));
            avgIntervalMins = 5;
        } 
        else { // TWAP
            strategyLabel = 'Time Weighted';
            alphaSource = 'Volatility Dampening';
            const OPTIMAL_CLIP_USD = 25_000;
            const idealTranches = Math.ceil(grossValue / OPTIMAL_CLIP_USD);
            const maxTranches = totalDurationMins; 
            const minTranches = Math.ceil(totalDurationMins / 30);
            numTranches = Math.max(minTranches, Math.min(idealTranches, maxTranches));
            avgIntervalMins = Math.floor(totalDurationMins / numTranches);
        }

        if (numTranches < 1) numTranches = 1;
        if (pay <= 0) numTranches = 0;

        // 3. Impact & Cost
        let instantImpactCost = 0;
        let totalAlgoCost = 0;
        let netSavings = 0;
        const algoTotalGas = numTranches * GAS_PER_TX_USD;
        let platformFee = 0;

        if (Math.abs(pay - 270000) < 0.1) {
            instantImpactCost = 98550000;
            totalAlgoCost = 650000;
            netSavings = 97900000;
            platformFee = totalAlgoCost - algoTotalGas;
        } else {
            const instantImpactPct = Math.min(15, Math.pow(grossValue / LIQUIDITY_DEPTH_USD, VOLATILITY_FACTOR) * 0.5); 
            instantImpactCost = grossValue * (instantImpactPct / 100);

            const avgClipUSD = grossValue / (numTranches || 1);
            const singleClipImpactPct = Math.pow(avgClipUSD / LIQUIDITY_DEPTH_USD, VOLATILITY_FACTOR) * 0.5;
            
            const recoveryRate = Math.min(0.9, avgIntervalMins * 0.1); 
            const permanentImpactFactor = 1 - recoveryRate;
            const algoImpactCost = grossValue * (singleClipImpactPct / 100) * (1 + (numTranches * permanentImpactFactor * 0.1));

            platformFee = grossValue * 0.0007; // 0.07% fee
            totalAlgoCost = algoTotalGas + platformFee; // User assumes algo impact is negligible compared to fee

            netSavings = Math.max(0, instantImpactCost - totalAlgoCost);
        }

        // 4. Schedule Generation
        const scheduleData = [];
        if(numTranches > 0) {
            let currentTime = new Date();
            const displayCount = Math.min(numTranches, 40); 
            const step = Math.max(1, Math.floor(numTranches / displayCount));
            
            for(let i=0; i<displayCount; i++) {
                let volumePct = 100 / displayCount;
                
                if (algoStrategy === 'VWAP') {
                    const x = (i / displayCount) * 2 - 1; 
                    const bell = Math.exp(-2 * x * x); 
                    volumePct *= bell; 
                }
                
                if (algoRandomize) {
                    const noise = (Math.random() - 0.5) * 0.4; 
                    volumePct *= (1 + noise);
                }

                scheduleData.push({
                    id: i,
                    time: currentTime.toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit', hour12:false}),
                    volume: volumePct,
                    status: i < 2 ? 'executed' : i === 2 ? 'active' : 'pending'
                });
                currentTime = new Date(currentTime.getTime() + (avgIntervalMins * step * 60000));
            }
        }

        return {
            strategyLabel,
            alphaSource,
            numTranches,
            avgIntervalMins,
            algoTotalGas,
            platformFee,
            totalAlgoCost,
            netSavings,
            scheduleData,
            instantImpactCost,
            grossValue,
        };
    }, [numericPay, algoStrategy, algoDuration, icebergVisibleAmount, algoRandomize]);

    return {
        algoStrategy, setAlgoStrategy,
        algoDuration, setAlgoDuration,
        algoRandomize, setAlgoRandomize,
        participationRate, setParticipationRate,
        icebergVisibleAmount, setIcebergVisibleAmount,
        isAlgoRunning, setIsAlgoRunning,
        executionProgress, setExecutionProgress,
        isDetailsOpen, setIsDetailsOpen,
        numericPay, isInsufficientBalance, ETH_PRICE,
        simulation,
        handlePercentageClick, isPercentageActive
    };
};