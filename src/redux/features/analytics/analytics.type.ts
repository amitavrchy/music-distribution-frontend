export interface EarningsByType {
  earnings: string;
  views: string;
  percentage: number;
}

export interface EstimatedEarning {
  month: string;
  views: number;
  earnings: number;
}

export interface TopCountry {
  country: string;
  earnings: string;
}

export interface TopUSRegion {
  region: string;
  views: number;
}

export interface TopAsset {
  title: string;
  earnings: string;
}

export interface TopClaim {
  title: string;
  earnings: string;
}

export interface Asset {
  assetId: string;
  userId: string;
  title: string;
  artist: string;
  platform: string;
  assetType: string;
  thumbnailUrl: string;
  publishedDate: string;
  totalViews: number;
  totalEarnings: string;
  adSupported: string;
  youtubePremium: string;
  releaseId: string;
  trackId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsAssetsResponse {
  success: boolean;
  message: string;
  data: Asset[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface GeoTrend {
  geoTrendId: string;
  userId: string;
  platform: string;
  country: string;
  region: string;
  date: string;
  month: number;
  year: number;
  views: number;
  earnings: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsGeoTrendsResponse {
  success: boolean;
  message: string;
  data: GeoTrend[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface Claim {
  claimId: string;
  userId: string;
  title: string;
  claimant: string;
  platform: string;
  status: string;
  thumbnailUrl: string;
  publishedDate: string;
  description: string;
  views: number;
  adSupported: string;
  youtubePremium: string;
  totalEarnings: string;
  claimedDate: string;
  resolvedDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsClaimsResponse {
  success: boolean;
  message: string;
  data: Claim[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface PlatformOverviewData {
  platform: string;
  totalViews: string;
  totalEarnings: string;
  earningsByType: {
    free: EarningsByType;
    premium: EarningsByType;
  };
  estimatedEarnings: EstimatedEarning[];
  topCountries: TopCountry[];
  topUSRegions: TopUSRegion[];
  topAssets: TopAsset[];
  topClaims: TopClaim[];
}

export interface PlatformOverviewResponse {
  success: boolean;
  message: string;
  data: PlatformOverviewData;
}

export interface DashboardAnalyticsResponse {
  success: boolean;
  message: string;
  data: PlatformOverviewData[];
}
