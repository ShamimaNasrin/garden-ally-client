/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import NoDataFound from "@/components/UI/NoDataFound";
import { useState } from "react";
import toast from "react-hot-toast";

// Define the payment type interface
export interface TPayment {
  customerId: string;
  transactionId: string;
}

// Static payment data
const paymentData: TPayment[] = [
  {
    customerId: "1",
    transactionId: "txn_001",
  },
  {
    customerId: "2",
    transactionId: "txn_002",
  },
  {
    customerId: "3",
    transactionId: "txn_003",
  },
];

const headings = ["Customer ID", "Transaction ID"];

const PaymentHistory: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-[70vh] xl:py-12 lg:py-10 py-7 xl:px-16 lg:px-16 md:px-10 px-7 bg-zinc-100">
      <h1 className="text-3xl font-bold mb-8 text-emerald-500">
        Payment History
      </h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <table className="mx-auto xl:w-[80%] lg:w-[80%] md:w-[70%] w-full text-left table-auto border-collapse shadow-lg rounded-lg overflow-hidden bg-white">
          <thead>
            <tr className="bg-gray-600 text-white">
              {headings.map((h, i) => (
                <th
                  key={i}
                  className="border-b border-gray-800 px-4 py-3 text-center font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paymentData.length ? (
              paymentData.map((item) => (
                <tr
                  key={item.transactionId}
                  className="hover:bg-violet-50 transition-colors duration-200"
                >
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    {item.customerId}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    {item.transactionId}
                  </td>
                </tr>
              ))
            ) : (
              <NoDataFound />
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
