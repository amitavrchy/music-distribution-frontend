// ===============================
// Track Artist Type
// ===============================
export interface TrackArtist {
  artistId: string;
  artistName: string;
  role?: string; // e.g., 'Primary', 'Featuring', optional
}

// ===============================
// Track Type (for getReleaseTracks)
// ===============================
export interface Track {
  trackId: string;
  releaseId: string;
  trackNumber: number;
  trackTitle: string;
  trackGenre: string;
  trackMix: string;
  explicitContent: boolean;
  trackLanguage: string;
  trackPublisher: string;
  originalReleaseDate: string; // ISO string
  trackIsrc: string;
  territoryRestrictions: string;
  audioFileUrl: string;
  audioFileId: string | null;
  createdAt: string;
  updatedAt: string;
  trackArtists: TrackArtist[];
}

// ===============================
// Release Type (nested in getAllTracks)
// ===============================
export interface Release {
  releaseId: string;
  userId: string;
  releaseDate: string;
  preOrderDate: string;
  releaseTitle: string;
  typeOfRelease: string;
  genre: string;
  language: string;
  isExplicitContent: boolean;
  hasExternalRightsHolder: boolean;
  hasDolbyAtmosVersion: boolean;
  hasExtendedMixForDjStores: boolean;
  additionalDetails: string;
  hasArtistOnSpotify: boolean;
  hasMusicVideo: boolean;
  status: string;
  producerCredits: string;
  lyricistCredits: string;
  masterSplits: string;
  copyrightHolder: string;
  labelName: string;
  albumLevelArtistName: string;
  musicFileLink: string;
  createdAt: string;
  updatedAt: string;
}

// ===============================
// Track with nested Release (for getAllTracks)
// ===============================
export interface TrackWithRelease extends Track {
  release: Release;
}

// ===============================
// Generic API Response Types
// ===============================

// For getReleaseTracks
export interface GetReleaseTracksResponse {
  success: boolean;
  message: string;
  data: Track[];
}

// For getAllTracks
export interface GetAllTracksResponse {
  success: boolean;
  message: string;
  data: TrackWithRelease[];
}
