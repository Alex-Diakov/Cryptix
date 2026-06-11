import React from "react";
import { useLimitLogic } from "../../../hooks/useLimitLogic";
import { LimitForm } from "./LimitForm";
import { LimitAnalysis } from "./LimitAnalysis";

interface LimitPanelProps {
  amount: string;
  onAmountChange: (val: string) => void;
  balance: number;
}

const LimitPanel: React.FC<LimitPanelProps> = (props) => {
  const logic = useLimitLogic({
    amount: props.amount,
    onAmountChange: props.onAmountChange,
    balance: props.balance,
  });

  return (
    <>
      <LimitForm {...props} logic={logic} />
      <LimitAnalysis logic={logic} />
    </>
  );
};

export default LimitPanel;
