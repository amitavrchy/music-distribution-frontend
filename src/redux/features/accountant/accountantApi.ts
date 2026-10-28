import { baseApi } from "@/redux/hooks/baseApi";
import {
  AccountantDashboardResponse,
  PaymentsEarningsResponse,
  ProfitLossResponse,
  ClientFinancialsResponse,
  ClientFinancialsQueryParams,
  YearlyStatementsResponse,
  AccountantSettingsResponse,
  UpdateAccountantSettingsPayload,
  ChangePasswordPayload,
} from "./accountant.type";

const accountantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccountantDashboard: builder.query<AccountantDashboardResponse, void>({
      query: () => ({
        url: "/accountant/dashboard",
        method: "GET",
      }),
    }),
    getPaymentsEarnings: builder.query<PaymentsEarningsResponse, void>({
      query: () => ({
        url: "/accountant/payments-earnings",
        method: "GET",
      }),
    }),
    getProfitLoss: builder.query<ProfitLossResponse, void>({
      query: () => ({
        url: "/accountant/profit-loss",
        method: "GET",
      }),
    }),
    getClientFinancials: builder.query<
      ClientFinancialsResponse,
      ClientFinancialsQueryParams
    >({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: "/accountant/clients",
        method: "GET",
        params: { page, limit },
      }),
    }),
    getYearlyStatements: builder.query<YearlyStatementsResponse, void>({
      query: () => ({
        url: "/accountant/statements",
        method: "GET",
      }),
    }),
    getAccountantSettings: builder.query<AccountantSettingsResponse, void>({
      query: () => ({
        url: "/accountant/settings",
        method: "GET",
      }),
      providesTags: ["AccountantSettings"],
    }),
    updateAccountantSettings: builder.mutation<
      AccountantSettingsResponse,
      UpdateAccountantSettingsPayload
    >({
      query: (payload) => ({
        url: "/accountant/settings",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["AccountantSettings"],
    }),
    changeAccountantPassword: builder.mutation<
      { success: boolean; message: string },
      ChangePasswordPayload
    >({
      query: (payload) => ({
        url: "/accountant/change-password",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetAccountantDashboardQuery,
  useGetPaymentsEarningsQuery,
  useGetProfitLossQuery,
  useGetClientFinancialsQuery,
  useGetYearlyStatementsQuery,
  useGetAccountantSettingsQuery,
  useUpdateAccountantSettingsMutation,
  useChangeAccountantPasswordMutation,
} = accountantApi;
export default accountantApi;
