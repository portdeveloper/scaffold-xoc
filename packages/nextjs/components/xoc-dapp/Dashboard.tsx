import React from "react";
import PillNavigation from "./PillNavigation";
import AmountInput from "./AmountInput";
import CollateralInfo from "./CollateralInfo";

const Dashboard: React.FC = () => {
  return (
    <div>
      <PillNavigation />
      <AmountInput />
      <CollateralInfo />
    </div>
  );
};

export default Dashboard;
