import { baseApi } from "@/redux/hooks/baseApi";
import {
  AnalyticsAssetsResponse,
  AnalyticsClaimsResponse,
  AnalyticsGeoTrendsResponse,
  DashboardAnalyticsResponse,
  PlatformOverviewResponse,
} from "./analytics.type";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlatformOverview: builder.query<
      PlatformOverviewResponse,
      { platform: string; period?: string }
    >({
      query: ({ platform, period }) => ({
        url: `/analytics/${platform}/overview`,
        method: "GET",
        params: { period },
      }),
    }),
    getDashboardAnalytics: builder.query<DashboardAnalyticsResponse, void>({
      query: () => ({
        url: "/analytics/dashboard",
        method: "GET",
      }),
    }),
    getAnalyticsAssets: builder.query<
      AnalyticsAssetsResponse,
      { page: number; limit: number; platform: string; period?: string }
    >({
      query: ({ page, limit, platform, period }) => ({
        url: `/analytics/assets`,
        method: "GET",
        params: { page, limit, platform, period },
      }),
    }),
    getAnalyticsGeoTrends: builder.query<
      AnalyticsGeoTrendsResponse,
      { page: number; limit: number; platform: string; period?: string }
    >({
      query: ({ page, limit, platform, period }) => ({
        url: `/analytics/geo-trends`,
        method: "GET",
        params: { page, limit, platform, period },
      }),
    }),
    getAnalyticsClaims: builder.query<
      AnalyticsClaimsResponse,
      { page: number; limit: number; platform: string; period?: string }
    >({
      query: ({ page, limit, platform, period }) => ({
        url: `/analytics/claims`,
        method: "GET",
        params: { page, limit, platform, period },
      }),
    }),
  }),
});

export const {
  useGetPlatformOverviewQuery,
  useGetDashboardAnalyticsQuery,
  useGetAnalyticsAssetsQuery,
  useGetAnalyticsGeoTrendsQuery,
  useGetAnalyticsClaimsQuery,
} = analyticsApi;
export default analyticsApi;
