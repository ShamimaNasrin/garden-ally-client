/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import NoDataFound from "@/components/UI/NoDataFound";
import { useGetPaymentHistoryQuery } from "@/redux/features/payment/paymentApi";
import { TPaymentHistory } from "@/types";

const headings = ["Date", "Name", "Email", "Transaction ID"];

const PaymentHistory: React.FC = () => {
  const { data: paymentData, isLoading: paymentLoading } =
    useGetPaymentHistoryQuery({});

  return (
    <div className="min-h-[70vh] xl:py-12 lg:py-10 py-7 xl:px-16 lg:px-16 md:px-10 px-7 bg-zinc-100">
      <h1 className="text-3xl font-bold mb-8 text-emerald-500">
        Payment History
      </h1>
      {paymentLoading ? (
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
            {paymentData?.data?.length ? (
              paymentData?.data?.map((payment: TPaymentHistory) => (
                <tr
                  key={payment?._id}
                  className="hover:bg-violet-50 transition-colors duration-200"
                >
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    {payment?.createdAt.split("T")[0]}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    {payment?.customerId?.name}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    {payment?.customerId?.email}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    {payment?.transactionId}
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
