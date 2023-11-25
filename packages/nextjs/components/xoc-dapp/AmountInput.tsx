import React, { useState, useEffect } from 'react';
import Button3D from './Button3D';
import { useContractWrite } from 'wagmi';
import { parseEther } from 'ethers/lib/utils';

interface AmountInputProps {
  inputAmount: string;
  actionText: string;
  actionHandler: () => void;
}

export default function AmountInput({ inputAmount, actionText, actionHandler }: AmountInputProps): JSX.Element {
  // Initialize the amount state with the value from the inputAmount prop
  const [amount, setAmount] = useState<bigint>(BigInt(inputAmount) || BigInt(0));

  // Write to the contract using the useScaffoldContractWrite hook
/*   const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203",
    abi: wagmigotchiABI,
    functionName: "deposit",
  }) */

  // Update the component state when the inputAmount prop changes
  useEffect(() => {
    setAmount(BigInt(inputAmount) || BigInt(0));
  }, [inputAmount]);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = BigInt(event.target.value);
    setAmount(isNaN(Number(newAmount)) ? BigInt(0) : BigInt(newAmount));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log('Sending amount: ', amount);
    // Call the write function with the amount state
    await write(amount);

  };

  return (
    <form onSubmit={handleOnSubmit} className="p-10 pt-36 flex flex-col items-center border-r-2">
      <div className="relative p-10">
        <input
          type="search"
          id="search"
          className="text-5xl block p-4 pl-10 text-gray-900 border-b-4 rounded-lg bg-inherit focus:ring-blue-500 focus:border-white dark:bg-inherit dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Amount"
          required
          // Set the inputAmount prop as the input value
          value={amount.toString()}
          onChange={handleAmountChange}
        />
      </div>
      <div className="">
        <Button3D actionHandler={() => 0}>{actionText}</Button3D>
      </div>
    </form>
  );
}