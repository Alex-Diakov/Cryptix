import { useState, useMemo } from 'react';

interface UseLimitLogicProps {
    amount: string;
    onAmountChange: (val: string) => void;
    balance: number;
}

export const useLimitLogic = ({ amount, onAmountChange, balance }: UseLimitLogicProps) => {
    const [limitPrice, setLimitPrice] = useState('3208.93');
    const [expiry, setExpiry] = useState('24h');
    const [postOnly, setPostOnly] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const ETH_PRICE = 3208.93;
    const numericPay = parseFloat(amount) || 0;
    const isInsufficientBalance = numericPay > balance;

    const simulation = useMemo(() => {
        const pay = numericPay;
        const limitP = parseFloat(limitPrice) || ETH_PRICE;
        const grossValue = pay * limitP;
        
        // 1. Maker vs Taker Logic
        const distanceToMarket = ((limitP - ETH_PRICE) / ETH_PRICE) * 100;
        const isMarketable = distanceToMarket <= 0; 
        
        // 2. Fee Tier Logic (Institutional)
        const activeFeeBps = (postOnly || !isMarketable) ? 2 : 10;
        const feeTierLabel = (postOnly || !isMarketable) ? 'MAKER' : 'TAKER';
        
        const platformFee = grossValue * (activeFeeBps / 10000);
        const networkFee = 9.75; 
        
        // 3. Net Calculation
        const totalFees = platformFee + networkFee;
        const netLimitReceive = Math.max(0, grossValue - totalFees);
        
        // 4. Effective Price
        const effectivePrice = pay > 0 ? netLimitReceive / pay : 0;
        
        // 5. Post-Only Conflict
        const postOnlyWarning = postOnly && isMarketable;

        // 6. Probability Engine
        let expiryHours = 24;
        if(expiry === '10m') expiryHours = 0.16;
        else if(expiry === '1h') expiryHours = 1;
        else if(expiry === '3d') expiryHours = 72;
        else if(expiry === '7d') expiryHours = 168;
        else if(expiry === 'GTC') expiryHours = 720;

        const HOURLY_VOLATILITY = 0.035 / Math.sqrt(24); 
        const stdDevsNeeded = (Math.abs(distanceToMarket)/100) / (HOURLY_VOLATILITY * Math.sqrt(expiryHours));
        let rawProb = 100 * Math.exp(-0.5 * Math.pow(stdDevsNeeded, 2));
        if (isMarketable) rawProb = 100;
        const execProbability = Math.round(Math.min(99, Math.max(1, rawProb)));

        // 7. Time Horizon
        let timeHorizon = 'Instant';
        if (!isMarketable) {
            const expectedHours = (Math.abs(distanceToMarket)) * 12;
            if(expectedHours < 1) timeHorizon = '< 1 Hour';
            else if(expectedHours < 24) timeHorizon = `~${Math.ceil(expectedHours)} Hours`;
            else timeHorizon = `~${Math.ceil(expectedHours/24)} Days`;
        }

        const dailyYieldLoss = grossValue * 0.042 * (expiryHours/8760);

        return {
            grossValue,
            netLimitReceive,
            effectivePrice,
            distanceToMarket,
            isMarketable,
            postOnlyWarning,
            platformFee,
            networkFee,
            feeTierLabel,
            activeFeeBps,
            execProbability,
            probColor: execProbability > 75 ? '#10b981' : execProbability > 40 ? '#f59e0b' : '#f43f5e',
            timeHorizon,
            dailyYieldLoss,
            structureLabel: limitP < 3180 ? 'BELOW SUPPORT' : limitP > 3280 ? 'BREAKOUT' : 'IN RANGE',
        };
    }, [numericPay, limitPrice, expiry, postOnly]);

    const depthData = useMemo(() => {
        const data = [];
        const startPrice = ETH_PRICE * 0.95;
        const endPrice = ETH_PRICE * 1.05;
        const steps = 40;
        const stepSize = (endPrice - startPrice) / steps;
        for(let i=0; i<=steps; i++) {
            const p = startPrice + i*stepSize;
            let bidVol=0, askVol=0;
            if(p < ETH_PRICE) bidVol = 5000 + Math.abs(ETH_PRICE-p)*2000;
            if(p > ETH_PRICE) askVol = 5000 + Math.abs(p-ETH_PRICE)*2500;
            data.push({ price: p, bidVol, askVol });
        }
        return data;
    }, [limitPrice]);

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

    const adjustLimitPrice = (pct: number) => {
        const newPrice = pct === 0 ? ETH_PRICE : ETH_PRICE * (1 + pct / 100);
        setLimitPrice(newPrice.toFixed(2));
    };

    return {
        limitPrice, setLimitPrice,
        expiry, setExpiry,
        postOnly, setPostOnly,
        isDetailsOpen, setIsDetailsOpen,
        ETH_PRICE,
        numericPay,
        isInsufficientBalance,
        simulation,
        depthData,
        handlePercentageClick,
        isPercentageActive,
        adjustLimitPrice
    };
};