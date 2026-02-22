import type { DashboardProvider } from '@nuclearplayer/plugin-sdk';

import { ListenBrainzClient } from './client';
import {
  DASHBOARD_PROVIDER_ID,
  DASHBOARD_PROVIDER_NAME,
  DEFAULT_LIMIT,
  METADATA_PROVIDER_ID,
} from './config';
import {
  mapArtistStatsToRef,
  mapFreshReleaseToAlbumRef,
  mapRecordingToTrack,
  mapReleaseGroupToAlbumRef,
} from './mappers';

export const createDashboardProvider = (
  client: ListenBrainzClient,
): DashboardProvider => ({
  id: DASHBOARD_PROVIDER_ID,
  kind: 'dashboard',
  name: DASHBOARD_PROVIDER_NAME,
  metadataProviderId: METADATA_PROVIDER_ID,
  capabilities: ['topTracks', 'topArtists', 'topAlbums', 'newReleases'],

  async fetchTopTracks() {
    const response = await client.getTopRecordings();
    if (!response) {
      return [];
    }
    return response.payload.recordings.map(mapRecordingToTrack);
  },

  async fetchTopArtists() {
    const response = await client.getTopArtists();
    if (!response) {
      return [];
    }
    return response.payload.artists.map(mapArtistStatsToRef);
  },

  async fetchTopAlbums() {
    const response = await client.getTopReleaseGroups();
    if (!response) {
      return [];
    }
    return response.payload.release_groups.map(mapReleaseGroupToAlbumRef);
  },

  async fetchNewReleases() {
    const response = await client.getFreshReleases();
    if (!response) {
      return [];
    }
    return response.payload.releases
      .slice(0, DEFAULT_LIMIT)
      .map(mapFreshReleaseToAlbumRef);
  },
});
