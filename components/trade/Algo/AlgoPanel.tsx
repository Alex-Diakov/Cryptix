import React from "react";
import { useAlgoLogic } from "../../../hooks/useAlgoLogic";
import { AlgoForm } from "./AlgoForm";
import { AlgoAnalysis } from "./AlgoAnalysis";

interface AlgoPanelProps {
  amount: string;
  onAmountChange: (val: string) => void;
  balance: number;
}

const AlgoPanel: React.FC<AlgoPanelProps> = (props) => {
  const logic = useAlgoLogic({
    amount: props.amount,
    onAmountChange: props.onAmountChange,
    balance: props.balance,
  });

  return (
    <>
      <AlgoForm {...props} logic={logic} />
      <AlgoAnalysis logic={logic} />
    </>
  );
};

export default AlgoPanel;
