import { baseApi } from "@/redux/hooks/baseApi";

const newReleaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewRelease: builder.mutation({
      query: (data) => ({
        url: "/releases",
        method: "POST",
        body: data,
      }),
    }),
    createArtists: builder.mutation({
      query: (newArtist) => ({
        url: "/artists",
        method: "POST",
        body: newArtist,
      }),
    }),
    createTrack: builder.mutation({
      query: (trackData) => ({
        url: "/tracks",
        method: "POST",
        body: trackData,
      }),
    }),
    createSplitSheet: builder.mutation({
      query: (splitData) => ({
        url: "/split-sheets",
        method: "POST",
        body: splitData,
      }),
    }),
    uploadTrackAudio: builder.mutation({
      query: ({ trackId, audioFile }: { trackId: string; audioFile: File }) => {
        console.log(
          "Mutation: uploadTrackAudio initializing FormData for file:",
          audioFile.name,
        );
        const formData = new FormData();
        formData.append("audioFile", audioFile);
        return {
          url: `/tracks/${trackId}/upload-audio`,
          method: "POST",
          body: formData,
        };
      },
    }),
    getAllReleases: builder.query({
      query: ({ limit, page }) => ({
        url: "/releases",
        method: "GET",
        params: { limit, page },
      }),
      providesTags: ["Releases"],
    }),
    getMoreReleases: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/releases",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Releases"],

      // ***************************************
      // ** redux Pessimistic Cache Update    **
      // ** update getAllReleases Cache data  **
      // ***************************************
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data: newData } = await queryFulfilled;

          dispatch(
            newReleaseApi.util.updateQueryData(
              "getAllReleases",
              { page: 1, limit: params.limit }, // always update first page cache
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
    getSingleRelease: builder.query({
      query: (releaseId) => ({
        url: `/releases/${releaseId}`,
        method: "GET",
      }),
      providesTags: ["Releases"],
    }),
    createBackCatalogue: builder.mutation({
      query: (data) => ({
        url: "/back-catalogue",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Releases"],
    }),
    getAllBackCatalogue: builder.query({
      query: ({ limit, page }) => ({
        url: "/back-catalogue",
        method: "GET",
        params: { limit, page },
      }),
      providesTags: ["Releases"],
    }),
    getSingleBackCatalogue: builder.query({
      query: (id) => ({
        url: `/back-catalogue/${id}`,
        method: "GET",
      }),
      providesTags: ["Releases"],
    }),
    updateRelease: builder.mutation({
      query: ({ id, data }) => ({
        url: `/releases/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Releases"],
    }),
    updateTrack: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tracks/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Releases"],
    }),
    updateSplitSheet: builder.mutation({
      query: ({ id, data }) => ({
        url: `/split-sheets/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Releases"],
    }),
    updateBackCatalogue: builder.mutation({
      query: ({ id, data }) => ({
        url: `/back-catalogue/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Releases"],
    }),
    getAllSplitSheets: builder.query({
      query: () => ({
        url: "/split-sheets",
        method: "GET",
      }),
      providesTags: ["SplitSheets"],
    }),
  }),
});

export const {
  useCreateNewReleaseMutation,
  useCreateArtistsMutation,
  useCreateTrackMutation,
  useCreateSplitSheetMutation,
  useUploadTrackAudioMutation,
  useGetAllReleasesQuery,
  useLazyGetMoreReleasesQuery,
  useGetSingleReleaseQuery,
  useCreateBackCatalogueMutation,
  useUpdateBackCatalogueMutation,
  useUpdateReleaseMutation,
  useUpdateTrackMutation,
  useUpdateSplitSheetMutation,
  useGetAllBackCatalogueQuery,
  useGetSingleBackCatalogueQuery,
  useGetAllSplitSheetsQuery,
} = newReleaseApi;
