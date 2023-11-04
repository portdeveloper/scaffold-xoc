/* import { useContractReader } from "@usedapp/core";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils"; */

function CollateralInfo() {
  /* const collateralToXocRatio = useContractReader({ contractAddress: YOUR_CONTRACT_ADDRESS, functionName: "collateralToXocRatio" });
  const userMaxDebtUtilization = useContractReader({ contractAddress: YOUR_CONTRACT_ADDRESS, functionName: "userMaxDebtUtilization" });
  const userMaxDebt = useContractReader({ contractAddress: YOUR_CONTRACT_ADDRESS, functionName: "userMaxDebt" });
  const maxLTVFactor = useContractReader({ contractAddress: YOUR_CONTRACT_ADDRESS, functionName: "maxLTVFactor" }); */

  return (
    <div className=" border-l-2 w-96 relative overflow-x-auto shadow-md sm:rounded-lg m-12 border-2 border-gray-500">
      <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3  bg-gray-50 dark:bg-gray-800">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Number
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRow name="Borrowing power used" number="1" />
          <TableRow name="Max LTV (Loan-to-Value)" number="two" />
          <TableRow name="Current Price" number="1" />
          <TableRow name="Liquidation Price" number="two" />
          <TableRow name="Deposited Collateral Value" number="1" />
          <TableRow name="Borrowing Limit" number="two" />
        </tbody>
      </table>
    </div>
    
  );
}

const TableRow: React.FC<{
  name: string;
  number: string;
}> = ({ name, number }) => {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
        {name}
      </th>
      <td className="px-6 py-4">{number}</td>
    </tr>
  );
};

export default CollateralInfo;