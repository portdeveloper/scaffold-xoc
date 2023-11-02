import React from "react";
import PillNavigation from "./PillNavigation";
import AmountInput from "./AmountInput";
import CollateralInfo from "./CollateralInfo";

const Dashboard: React.FC = () => {
  return (
    <div>
      <div>
        <PillNavigation />
      </div>
      <div className="grid lg:grid-cols-2 flex-grow">
        <AmountInput />
        <CollateralInfo />
      </div>
    </div>
  );
};

export default Dashboard;
