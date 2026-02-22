import type {
  AlbumRef,
  ArtistRef,
  ArtworkSet,
  Track,
} from '@nuclearplayer/plugin-sdk';

import {
  COVER_ART_ARCHIVE_BASE,
  DASHBOARD_PROVIDER_ID,
  METADATA_PROVIDER_ID,
} from './config';
import type {
  ListenBrainzArtistStats,
  ListenBrainzFreshRelease,
  ListenBrainzRecordingStats,
  ListenBrainzReleaseGroupStats,
} from './types';

const coverArtUrl = (caaReleaseMbid: string): string =>
  `${COVER_ART_ARCHIVE_BASE}/release/${caaReleaseMbid}/front-500`;

const coverArtThumbnailUrl = (caaReleaseMbid: string): string =>
  `${COVER_ART_ARCHIVE_BASE}/release/${caaReleaseMbid}/front-250`;

const coverArtwork = (
  caaReleaseMbid: string | undefined,
): ArtworkSet | undefined => {
  if (!caaReleaseMbid) {
    return undefined;
  }
  return {
    items: [
      { url: coverArtUrl(caaReleaseMbid), purpose: 'cover' },
      { url: coverArtThumbnailUrl(caaReleaseMbid), purpose: 'thumbnail' },
    ],
  };
};

const musicbrainzSource = (mbid: string) => ({
  provider: METADATA_PROVIDER_ID,
  id: mbid,
});

const listenbrainzSource = (name: string) => ({
  provider: DASHBOARD_PROVIDER_ID,
  id: name,
});

export const mapRecordingToTrack = (
  recording: ListenBrainzRecordingStats,
): Track => ({
  title: recording.track_name,
  artists: [
    {
      name: recording.artist_name,
      roles: [],
      source: recording.artist_mbids?.[0]
        ? musicbrainzSource(recording.artist_mbids[0])
        : listenbrainzSource(recording.artist_name),
    },
  ],
  album: recording.release_name
    ? {
        title: recording.release_name,
        artwork: coverArtwork(recording.caa_release_mbid),
        source: recording.release_mbid
          ? musicbrainzSource(recording.release_mbid)
          : listenbrainzSource(recording.release_name),
      }
    : undefined,
  artwork: coverArtwork(recording.caa_release_mbid),
  source: recording.recording_mbid
    ? musicbrainzSource(recording.recording_mbid)
    : listenbrainzSource(recording.track_name),
});

export const mapArtistStatsToRef = (
  artist: ListenBrainzArtistStats,
): ArtistRef => ({
  name: artist.artist_name,
  source: artist.artist_mbids?.[0]
    ? musicbrainzSource(artist.artist_mbids[0])
    : listenbrainzSource(artist.artist_name),
});

export const mapReleaseGroupToAlbumRef = (
  releaseGroup: ListenBrainzReleaseGroupStats,
): AlbumRef => ({
  title: releaseGroup.release_group_name,
  artists: [
    {
      name: releaseGroup.artist_name,
      source: releaseGroup.artist_mbids?.[0]
        ? musicbrainzSource(releaseGroup.artist_mbids[0])
        : listenbrainzSource(releaseGroup.artist_name),
    },
  ],
  artwork: coverArtwork(releaseGroup.caa_release_mbid),
  source: releaseGroup.release_group_mbid
    ? musicbrainzSource(releaseGroup.release_group_mbid)
    : listenbrainzSource(releaseGroup.release_group_name),
});

export const mapFreshReleaseToAlbumRef = (
  release: ListenBrainzFreshRelease,
): AlbumRef => ({
  title: release.release_name,
  artists: [
    {
      name: release.artist_credit_name,
      source: release.artist_mbids?.[0]
        ? musicbrainzSource(release.artist_mbids[0])
        : listenbrainzSource(release.artist_credit_name),
    },
  ],
  artwork: coverArtwork(release.caa_release_mbid),
  source: release.release_group_mbid
    ? musicbrainzSource(release.release_group_mbid)
    : listenbrainzSource(release.release_name),
});
