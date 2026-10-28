export interface RecentActivityItem {
  title: string;
  subtitle: string;
  timestamp: string;
}

export interface DistributionStatus {
  completed: number;
  inProgress: number;
  failed: number;
}

export interface PlatformPerformanceItem {
  name: string;
  streams: string;
  icon?: string;
  iconColor?: string;
}

export interface DashboardData {
  submissionsToReview: number;
  releasesToDistribute: number;
  newClients: number;
  liveReleases: number;
  recentActivity: RecentActivityItem[];
  distributionStatus: DistributionStatus;
  platformPerformance: PlatformPerformanceItem[];
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

// Submissions types
export interface SubmissionItem {
  releaseId: string;
  title: string;
  artist: string;
  type: string;
  trackCount: number;
  releaseDate: string;
  submittedAt: string;
  status: "Pending Review" | "Approved" | "Declined";
  genre: string | null;
  language: string | null;
}

export interface SubmissionsMetadata {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface SubmissionsResponse {
  success: boolean;
  message: string;
  data: SubmissionItem[];
  metadata: SubmissionsMetadata;
}

export interface SubmissionsQueryParams {
  page?: number;
  limit?: number;
  status?: "PendingReview" | "Approved" | "Declined";
}

export interface ApproveSubmissionPayload {
  note?: string;
}

export interface DeclineSubmissionPayload {
  reason: string;
}

// Submission details types
export interface SubmissionDetailsArtist {
  artistId: string;
  name: string;
  role: string;
  email: string;
}

export interface SubmissionDetailsSubmittedBy {
  id: string;
  name: string;
  email: string;
}

export interface TrackArtist {
  artistId: string;
  name: string;
  role: string;
}

export interface TrackItemData {
  trackId: string;
  trackNumber: number;
  title: string;
  isrc: string;
  genre: string;
  mix: string;
  language: string;
  explicit: boolean;
  publisher: string;
  originalReleaseDate: string;
  territoryRestrictions: string;
  audioFileUrl: string;
  artists: TrackArtist[];
}

export interface ContributorItem {
  id: string;
  name: string;
  role: string;
  share: number;
}

export interface SubmissionDetailsData {
  releaseId: string;
  releaseTitle: string;
  typeOfRelease: string;
  primaryArtist: string;
  releaseDate: string;
  preOrderDate: string | null;
  genre: string;
  language: string;
  isExplicitContent: boolean;
  hasExternalRightsHolder: boolean;
  hasDolbyAtmosVersion: boolean;
  hasExtendedMixForDjStores: boolean;
  hasArtistOnSpotify: boolean;
  hasMusicVideo: boolean;
  additionalDetails: string | null;
  status: string;
  artworkFile?: string; // Added if it exists in response
  tracks: TrackItemData[];
  artists: SubmissionDetailsArtist[];
  contributors: ContributorItem[];
  territories: string[];
  submittedBy: SubmissionDetailsSubmittedBy;
  submittedAt: string;
}

export interface SubmissionDetailsResponse {
  success: boolean;
  message: string;
  data: SubmissionDetailsData;
}

// Clients types
export interface ClientUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

export interface ClientItem {
  clientId: string;
  userId: string;
  distributorId: string;
  user: ClientUser;
  role: string;
  phoneNumber: string | null;
  totalReleases: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClientsMetadata {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ClientsResponse {
  success: boolean;
  message: string;
  data: ClientItem[];
  metadata: ClientsMetadata;
}

export interface ClientsQueryParams {
  page?: number;
  limit?: number;
}

export interface ClientActionResponse {
  success: boolean;
  message: string;
} // Create Client types
export interface CreateClientPayload {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface CreateClientResponse {
  success: boolean;
  message: string;
}

export interface SubmissionActionResponse {
  success: boolean;
  message: string;
}

export interface ManualPlatformStatus {
  platform: string;
  status: "Queued" | "Delivered" | "Failed";
  deliveredAt?: string | null;
}

export interface DeliveryFile {
  trackId: string;
  title: string | null;
  isrc: string | null;
  audioFileUrl: string | null;
  missing: boolean;
}

export interface ManualDistributePayload {
  releaseId: string;
  platforms?: string[];
  territories?: string[];
  note?: string;
}

export interface ManualDistributeResponse {
  success: boolean;
  message: string;
  data: {
    distributionId: string;
    status: string;
    platforms: ManualPlatformStatus[];
    files: DeliveryFile[];
    missingFiles: number;
    releaseTitle: string | null;
  };
}

export interface PlatformDeliveryResponse {
  success: boolean;
  message: string;
  data: {
    distributionId: string;
    status: string;
    platforms: ManualPlatformStatus[];
  };
}

export interface DeliveryFilesResponse {
  success: boolean;
  message: string;
  data: {
    releaseId: string;
    releaseTitle: string | null;
    musicFileLink: string | null;
    files: DeliveryFile[];
    missingFiles: number;
  };
}
