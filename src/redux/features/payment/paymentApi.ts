import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Query to fetch all the payment history
    getPaymentHistory: builder.query({
      query: () => ({
        url: "/payment/pay-history",
        method: "GET",
      }),
      providesTags: ["payment"],
    }),
  }),
});

export const { useGetPaymentHistoryQuery } = paymentApi;
