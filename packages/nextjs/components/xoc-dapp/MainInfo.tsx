import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'; // Use your state management library here
// import { fetchAllDisplayData } from '../store/contract/reads';

interface Props {
  selectedCollateral: string;
  collateralDecimals: number;
}

const MainInfo: React.FC<Props> = ({ selectedCollateral, collateralDecimals }) => {
  const isRightNetwork = useSelector((state) => state.isRightNetwork); // Replace with your state selector
  const selectedTab = useSelector((state) => state.selectedTab); // Replace with your state selector
  const userCollateralBalance = useSelector((state) => state.userCollateralBalance); // Replace with your state selector
  const userCollateralDepositBalance = useSelector((state) => state.userCollateralDepositBalance); // Replace with your state selector
  const userCollateralMaxWithdrawal = useSelector((state) => state.userCollateralMaxWithdrawal); // Replace with your state selector
  const userXOCDebt = useSelector((state) => state.userXOCDebt); // Replace with your state selector
  const userXOCMintingPower = useSelector((state) => state.userXOCMintingPower); // Replace with your state selector
  const userXOCBalance = useSelector((state) => state.userXOCBalance); // Replace with your state selector

/*   useEffect(() => {
    if (isRightNetwork) {
      fetchAllDisplayData();
    }
  }, [isRightNetwork]);
 */
  return (
    <section>
      <div className="outer-box">
        <div className="box-header">
          <b>Your Balances Deposits</b> {/* Replace with your translation logic */}
        </div>
        <div className={`box-row ${selectedTab === 'deposit' ? 'highlight' : ''}`}>
          <p>Your Wallet Balance</p> {/* Replace with your translation logic */}
          <p>
            {userCollateralBalance && selectedCollateral
              ? userCollateralBalance.div(10 ** collateralDecimals).toString()
              : '-'}
            {selectedCollateral}
          </p>
        </div>

        <div
          className={`box-row ${selectedTab === 'withdraw' || selectedTab === 'deposit' ? 'highlight' : ''}`}
        >
          <p>Your Deposit Balance</p> {/* Replace with your translation logic */}
          <p>
            {userCollateralDepositBalance
              ? userCollateralDepositBalance.div(10 ** collateralDecimals).toString()
              : '-'}
            {selectedCollateral}
          </p>
        </div>

        <div className={`box-row ${selectedTab === 'withdraw' ? 'highlight' : ''}`}>
          <p>Your Available For Withdrawal</p> {/* Replace with your translation logic */}
          <p>
            {userCollateralMaxWithdrawal
              ? (userCollateralMaxWithdrawal
                  .div(10 ** collateralDecimals)
                  .toNumber()
                  .toFixed(5))
              : '-'}
            {selectedCollateral}
          </p>
        </div>
      </div>

      <div className="outer-box">
        <div className="box-header">
          <b>Your Balances Loans</b> {/* Replace with your translation logic */}
        </div>

        <div className={`box-row ${selectedTab === 'redeem' || selectedTab === 'mint' ? 'highlight' : ''}`}>
          <p>Your Remaining Loan</p> {/* Replace with your translation logic */}
          <p>
            {userXOCDebt
              ? (userXOCDebt.sub(userXOCDebt.mod(1e14)).toNumber()).toString()
              : '-'}{' '}
            XOC
          </p>
        </div>

        <div className={`box-row ${selectedTab === 'mint' ? 'highlight' : ''}`}>
          <p>Your Available To Loan</p> {/* Replace with your translation logic */}
          <p>
            {userXOCMintingPower
              ? (userXOCMintingPower.sub(userXOCMintingPower.mod(1e14)).toNumber()).toString()
              : '-'}{' '}
            XOC
          </p>
        </div>
        <div className={`box-row ${selectedTab === 'redeem' ? 'highlight' : ''}`}>
          <p>Your XOC Balance</p> {/* Replace with your translation logic */}
          <p>
            {userXOCBalance
              ? (userXOCBalance.sub(userXOCBalance.mod(1e14)).toNumber()).toString()
              : '-'}{' '}
            XOC
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainInfo;
