import { baseApi } from "@/redux/hooks/baseApi";
import {
  ReleasesResponse,
  ReleaseDetailResponse,
  AdminReleaseDetailResponse,
} from "./releaseAdminDistributor.type";

const releaseAdminDistributorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReleases: builder.query<
      ReleasesResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/admin/releases",
        method: "GET",
        params: { page, limit },
      }),

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
        currentCache.metadata = newItems.metadata;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    getAdminReleaseById: builder.query<AdminReleaseDetailResponse, string>({
      query: (id) => ({
        url: `/admin/releases/${id}`,
        method: "GET",
      }),
      providesTags: ["Releases"],
    }),
    getReleaseDetails: builder.query<ReleaseDetailResponse, string>({
      query: (releaseId) => ({
        url: `/distribution/submissions/${releaseId}`,
        method: "GET",
      }),
      providesTags: ["Releases"],
    }),
  }),
});

export const {
  useGetReleasesQuery,
  useLazyGetReleasesQuery,
  useGetReleaseDetailsQuery,
  useGetAdminReleaseByIdQuery,
} = releaseAdminDistributorApi;

export default releaseAdminDistributorApi;
