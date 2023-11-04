import React from "react";
import PillNavigation from "./PillNavigation";
import AmountInput from "./AmountInput";
import CollateralInfo from "./CollateralInfo";
import { useState } from "react";

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('deposit');
  const isNative = true; // Define or retrieve isNative
  const CollateralDepositInputAmount = '0'; // Define or retrieve CollateralDepositInputAmount
  const CollateralDepositInputError = ''; // Define or retrieve CollateralDepositInputError
  const CollateralDepositInputAmountBigNum = undefined; // Define or retrieve CollateralDepositInputAmountBigNum
  const userNativeTokenBalance = null; // Define or retrieve userNativeTokenBalance
  const userCollateralAllowance = null; // Define or retrieve userCollateralAllowance
  const userCollateralBalance = null; // Define or retrieve userCollateralBalance
  const XOCMintInputAmount = '0'; // Define or retrieve XOCMintInputAmount
  const XOCMintInputError = ''; // Define or retrieve XOCMintInputError
  const XOCMintInputAmountBigNum = undefined; // Define or retrieve XOCMintInputAmountBigNum
  const userXOCMintingPower = null; // Define or retrieve userXOCMintingPower
  const XOCRedeemInputAmount = '0'; // Define or retrieve XOCRedeemInputAmount
  const XOCRedeemInputError = ''; // Define or retrieve XOCRedeemInputError
  const XOCRedeemInputAmountBigNum = undefined; // Define or retrieve XOCRedeemInputAmountBigNum
  const userXOCBalance = null; // Define or retrieve userXOCBalance
  const userXOCDebt = null; // Define or retrieve userXOCDebt
  const WETHWithdrawInputAmount = '0'; // Define or retrieve WETHWithdrawInputAmount
  const WETHWithdrawInputError = ''; // Define or retrieve WETHWithdrawInputError
  const WETHWithdrawInputAmountBigNum = undefined; // Define or retrieve WETHWithdrawInputAmountBigNum
  const userCollateralMaxWithdrawal = null; // Define or retrieve userCollateralMaxWithdrawal

  return (
    <div className="wrapper">
      <PillNavigation selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="main-section">
        <div className="input-section">
          <div className="input-section__container">
            {selectedTab === 'deposit' ? (
              isNative ? (
                <AmountInput
                  headerText="Deposit"
                  inputAmount={CollateralDepositInputAmount}
                  inputError={CollateralDepositInputError}
                  inputAmountBigNum={CollateralDepositInputAmountBigNum}
                  inputLimit={userNativeTokenBalance}
                  inputTypeText="Collateral"
                  actionText="Deposit"

                />
              ) : checkNeedsAllowance(CollateralDepositInputAmountBigNum, get(userCollateralAllowance)) ? (
                <AmountInput
                  headerText="Deposit"
                  inputAmount={CollateralDepositInputAmount}
                  inputError={CollateralDepositInputError}
                  inputAmountBigNum={CollateralDepositInputAmountBigNum}
                  inputLimit={userCollateralBalance}
                  inputTypeText="Collateral"
                  actionText="Approve"

                />
              ) : (
                <AmountInput
                  headerText="Deposit"
                  inputAmount={CollateralDepositInputAmount}
                  inputError={CollateralDepositInputError}
                  inputAmountBigNum={CollateralDepositInputAmountBigNum}
                  inputLimit={userCollateralBalance}
                  inputTypeText="Collateral"
                  actionText="Deposit"

                />
              )
            ) : selectedTab === 'mint' ? (
              <AmountInput
                headerText="Mint"
                inputAmount={XOCMintInputAmount}
                inputError={XOCMintInputError}
                inputAmountBigNum={XOCMintInputAmountBigNum}
                inputLimit={userXOCMintingPower}
                inputTypeText="Token Mint"
                actionText="Mint"

              />
            ) : selectedTab === 'redeem' ? (
              <AmountInput
                headerText="Redeem"
                inputAmount={XOCRedeemInputAmount}
                inputError={XOCRedeemInputError}
                inputAmountBigNum={XOCRedeemInputAmountBigNum}
                inputLimit={
                  userXOCBalance?.gt(userXOCDebt ? userXOCDebt : 0) ? userXOCDebt : userXOCBalance
                }
                inputTypeText="Token Redeem"
                actionText="Redeem"

              />
            ) : selectedTab === 'withdraw' ? (
              <AmountInput
                headerText="Withdraw"
                inputAmount={WETHWithdrawInputAmount}
                inputError={WETHWithdrawInputError}
                inputAmountBigNum={WETHWithdrawInputAmountBigNum}
                inputLimit={userCollateralMaxWithdrawal}
                inputTypeText="Collateral"
                actionText="Withdraw"

              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
