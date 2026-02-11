import React from 'react';
import { TokenSelectorModal } from '../Shared/Shared';
import { useSwapLogic } from '../../../hooks/useSwapLogic';
import { SwapForm } from './SwapForm';
import { SwapAnalysis } from './SwapAnalysis';

interface SwapPanelProps {
  amount: string;
  onAmountChange: (val: string) => void;
  balance: number;
}

const SwapPanel: React.FC<SwapPanelProps> = (props) => {
  const logic = useSwapLogic({ 
      initialAmount: props.amount, 
      onAmountChange: props.onAmountChange, 
      balance: props.balance 
  });

  return (
    <>
      <TokenSelectorModal 
        isOpen={!!logic.selectingSide} 
        onClose={() => logic.setSelectingSide(null)} 
        onSelect={(t) => {
            if (logic.selectingSide === 'pay') logic.setPayToken(t);
            if (logic.selectingSide === 'receive') logic.setReceiveToken(t);
            logic.setSelectingSide(null);
        }} 
      />
      <SwapForm {...props} logic={logic} />
      <SwapAnalysis logic={logic} />
    </>
  );
};

export default SwapPanel;