import { baseApi } from "@/redux/hooks/baseApi";
import {
  ApproveSubmissionPayload,
  ClientActionResponse,
  ClientsQueryParams,
  ClientsResponse,
  DashboardResponse,
  CreateClientPayload,
  CreateClientResponse,
  DeclineSubmissionPayload,
  SubmissionDetailsResponse,
  SubmissionsQueryParams,
  SubmissionsResponse,
  SubmissionActionResponse,
  ManualDistributePayload,
  ManualDistributeResponse,
  PlatformDeliveryResponse,
  DeliveryFilesResponse,
} from "./distribution.type";

const distributionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => ({
        url: "/distribution/dashboard",
        method: "GET",
      }),
      providesTags: ["Submissions"],
    }),

    getSubmissions: builder.query<SubmissionsResponse, SubmissionsQueryParams>({
      query: ({ page = 1, limit = 10, status }) => ({
        url: "/distribution/submissions",
        method: "GET",
        params: {
          page,
          limit,
          ...(status && { status }),
        },
      }),
      providesTags: ["Submissions"],
    }),

    getMoreSubmissions: builder.query<
      SubmissionsResponse,
      SubmissionsQueryParams
    >({
      query: ({ page = 1, limit = 10, status }) => ({
        url: "/distribution/submissions",
        method: "GET",
        params: {
          page,
          limit,
          ...(status && { status }),
        },
      }),
      providesTags: ["Submissions"],
      // ***************************************
      // ** redux Pessimistic Cache Update    **
      // ** update getSubmissions Cache data  **
      // ***************************************
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data: newData } = await queryFulfilled;
          dispatch(
            distributionApi.util.updateQueryData(
              "getSubmissions",
              { page: 1, limit: params.limit, status: params.status },
              (draft) => {
                draft.data.push(...newData.data);
                draft.metadata = newData.metadata;
              },
            ),
          );
        } catch (err) {
          console.error(err);
        }
      },
    }),

    getSubmissionDetails: builder.query<SubmissionDetailsResponse, string>({
      query: (releaseId) => ({
        url: `/distribution/submissions/${releaseId}`,
        method: "GET",
      }),
      providesTags: ["Submissions"],
    }),

    getClients: builder.query<ClientsResponse, ClientsQueryParams>({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/distribution/clients",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Clients"],
    }),

    deactivateClient: builder.mutation<ClientActionResponse, string>({
      query: (clientId) => ({
        url: `/distribution/clients/${clientId}/deactivate`,
        method: "PATCH",
      }),
      invalidatesTags: ["Clients"],
    }),

    activateClient: builder.mutation<ClientActionResponse, string>({
      query: (clientId) => ({
        url: `/distribution/clients/${clientId}/activate`,
        method: "PATCH",
      }),
      invalidatesTags: ["Clients"],
    }),

    approveSubmission: builder.mutation<
      SubmissionActionResponse,
      { releaseId: string; payload?: ApproveSubmissionPayload }
    >({
      query: ({ releaseId, payload }) => ({
        url: `/distribution/submissions/${releaseId}/approve`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Submissions", "Tracks"],
    }),

    declineSubmission: builder.mutation<
      SubmissionActionResponse,
      { releaseId: string; payload: DeclineSubmissionPayload }
    >({
      query: ({ releaseId, payload }) => ({
        url: `/distribution/submissions/${releaseId}/decline`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Submissions", "Tracks"],
    }),

    manualDistribute: builder.mutation<
      ManualDistributeResponse,
      ManualDistributePayload
    >({
      query: (body) => ({
        url: "/distribution/manual",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Submissions", "Releases"],
    }),

    updatePlatformDelivery: builder.mutation<
      PlatformDeliveryResponse,
      { distributionId: string; platform: string; status: "Queued" | "Delivered" | "Failed" }
    >({
      query: ({ distributionId, ...body }) => ({
        url: `/distribution/${distributionId}/platforms`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Submissions", "Releases"],
    }),

    getDeliveryFiles: builder.query<DeliveryFilesResponse, string>({
      query: (releaseId) => ({
        url: `/distribution/files/${releaseId}`,
        method: "GET",
      }),
    }),

    createClient: builder.mutation<CreateClientResponse, CreateClientPayload>({
      query: (payload) => ({
        url: "/distribution/clients",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetSubmissionsQuery,
  useGetMoreSubmissionsQuery,
  useLazyGetMoreSubmissionsQuery,
  useGetSubmissionDetailsQuery,
  useGetClientsQuery,
  useApproveSubmissionMutation,
  useDeclineSubmissionMutation,
  useDeactivateClientMutation,
  useActivateClientMutation,
  useCreateClientMutation,
  useManualDistributeMutation,
  useUpdatePlatformDeliveryMutation,
  useGetDeliveryFilesQuery,
} = distributionApi;
export default distributionApi;
