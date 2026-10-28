import { baseApi } from "@/redux/hooks/baseApi";
import type {
  GetReleaseTracksResponse,
  GetAllTracksResponse,
  TrackWithRelease,
} from "./releaseAdminDistributor.type";

const releaseAdminDistributorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReleaseTracks: builder.query<GetReleaseTracksResponse, string>({
      query: (releaseId) => ({
        url: `/admin/tracks/release/${releaseId}`,
        method: "GET",
      }),
      providesTags: ["Tracks"],
    }),
    getAllTracks: builder.query<GetAllTracksResponse, void>({
      query: () => ({
        url: `/admin/tracks`,
        method: "GET",
      }),
      providesTags: ["Tracks"],
    }),
    getTrackDetails: builder.query<TrackWithRelease, string>({
      query: (id) => ({
        url: `/admin/tracks/${id}`,
        method: "GET",
      }),
      providesTags: ["Tracks"],
    }),
  }),
});

export const {
  useGetReleaseTracksQuery,
  useGetAllTracksQuery,
  useGetTrackDetailsQuery,
} = releaseAdminDistributorApi;

export default releaseAdminDistributorApi;
