export type ListenBrainzRecordingStats = {
  track_name: string;
  artist_name: string;
  release_name?: string;
  artist_mbids?: string[];
  recording_mbid?: string;
  release_mbid?: string;
  caa_id?: number;
  caa_release_mbid?: string;
  listen_count: number;
};

export type ListenBrainzArtistStats = {
  artist_name: string;
  artist_mbids?: string[];
  listen_count: number;
};

export type ListenBrainzReleaseGroupStats = {
  release_group_name: string;
  artist_name: string;
  artist_mbids?: string[];
  release_group_mbid?: string;
  caa_id?: number;
  caa_release_mbid?: string;
  listen_count: number;
};

type ListenBrainzStatsPayloadBase = {
  offset: number;
  count: number;
  range: string;
  last_updated: number;
  from_ts: number;
  to_ts: number;
};

export type ListenBrainzRecordingStatsResponse = {
  payload: ListenBrainzStatsPayloadBase & {
    recordings: ListenBrainzRecordingStats[];
  };
};

export type ListenBrainzArtistStatsResponse = {
  payload: ListenBrainzStatsPayloadBase & {
    artists: ListenBrainzArtistStats[];
  };
};

export type ListenBrainzReleaseGroupStatsResponse = {
  payload: ListenBrainzStatsPayloadBase & {
    release_groups: ListenBrainzReleaseGroupStats[];
  };
};

export type ListenBrainzFreshRelease = {
  artist_credit_name: string;
  artist_mbids: string[];
  release_date: string;
  release_group_mbid: string;
  release_group_primary_type?: string;
  release_group_secondary_type?: string;
  release_name: string;
  release_tags?: string[];
  listen_count?: number;
  caa_id?: number;
  caa_release_mbid?: string;
};

export type ListenBrainzFreshReleasesResponse = {
  payload: {
    releases: ListenBrainzFreshRelease[];
    count: number;
  };
};
