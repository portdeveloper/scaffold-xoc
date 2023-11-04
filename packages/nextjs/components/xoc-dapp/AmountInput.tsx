import React, { useState } from 'react';

interface AmountInputProps {
  headerText: string;
  inputAmount: string;
  inputError: string;
  inputAmountBigNum: BigNumber | undefined;
  inputLimit: BigNumber | null;
  inputTypeText: string;
  actionText: string;
  actionHandler: () => void;
}

export default function AmountInput({
  headerText,
  inputAmount,
  inputError,
  inputAmountBigNum,
  inputLimit,
  inputTypeText,
  actionText,
  actionHandler,
}: AmountInputProps): JSX.Element {
  const [amount, setAmount] = useState<number>(0);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(event.target.value);
    setAmount(isNaN(newAmount) ? 0 : newAmount);
  };

  const handleSendAmount = () => {
    // Use the actionHandler function
    actionHandler();
  };

  return (
    <form className="p-10 pt-36 flex flex-col items-center border-r-2">
      <div className="relative p-10">
        <input
          type="search"
          id="search"
          className="text-5xl block p-4 pl-10 text-sm text-gray-900 border-b-4 rounded-lg bg-inherit focus:ring-blue-500 focus:border-white dark:bg-inherit dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Amount"
          required
 // Set the inputAmount prop as the input value
          onChange={handleAmountChange}
        />
      </div>
      <div className="">
        <button
          type="button"
          onClick={handleSendAmount}
          className="h-full w-52 text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          {actionText} {/* Use the actionText prop for button text */}
        </button>
      </div>
    </form>
  );
}
