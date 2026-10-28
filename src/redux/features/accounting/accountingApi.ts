import {
  ProfitLossResponse,
  StatementDetailResponse,
  StatementFullDetailResponse,
  StatementsResponse,
} from "./accounting.type";
import { baseApi } from "@/redux/hooks/baseApi";

const accountingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccountProfitAndLoss: builder.query<
      ProfitLossResponse,
      { year: string }
    >({
      query: ({ year }) => ({
        url: "/accounting/profit-loss",
        method: "GET",
        params: { year },
      }),
    }),
    getAccountingStatement: builder.query<
      StatementsResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: "/accounting/statements",
        method: "GET",
        params: { page, limit },
      }),
    }),
    getAccountingStatementById: builder.query<
      StatementDetailResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/accounting/statements/${id}`,
        method: "GET",
      }),
    }),
    getAccountingStatementFullDetails: builder.query<
      StatementFullDetailResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/accounting/statements/${id}/details`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetAccountProfitAndLossQuery,
  useGetAccountingStatementQuery,
  useGetAccountingStatementByIdQuery,
  useGetAccountingStatementFullDetailsQuery,
} = accountingApi;
