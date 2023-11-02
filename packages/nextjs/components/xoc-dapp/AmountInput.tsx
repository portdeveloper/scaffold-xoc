// import { useState } from "react";

/* interface AmountInputProps {
  onSendAmount: (amount: number) => void;
} */

  export default function AmountInput({ }) {
    // const [amount, setAmount] = useState<number>(0);

/*     const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newAmount = parseInt(event.target.value);
      setAmount(isNaN(newAmount) ? 0 : newAmount);
    };

    const handleSendAmount = () => {
      onSendAmount(amount);
    };
 */
    return (
      <form>   
        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
        <input
          type="search"
          id="search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Amount"
          required
        />
        </div>
      <button
        type="button"
        className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Red to Yellow
      </button>
    </form>
  );
}
