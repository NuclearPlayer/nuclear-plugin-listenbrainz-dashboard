import type { FetchFunction } from '@nuclearplayer/plugin-sdk';

import {
  DEFAULT_FRESH_RELEASES_DAYS,
  DEFAULT_LIMIT,
  LISTENBRAINZ_API_BASE,
} from './config';
import type {
  ListenBrainzArtistStatsResponse,
  ListenBrainzFreshReleasesResponse,
  ListenBrainzRecordingStatsResponse,
  ListenBrainzReleaseGroupStatsResponse,
} from './types';

export class ListenBrainzClient {
  #fetch: FetchFunction;

  constructor(fetchFn: FetchFunction) {
    this.#fetch = fetchFn;
  }

  async #get<T>(path: string): Promise<T | null> {
    const response = await this.#fetch(`${LISTENBRAINZ_API_BASE}${path}`);
    if (response.status === 204) {
      // may return 204 when stats are being recalculated
      return null;
    }
    if (!response.ok) {
      throw new Error(
        `ListenBrainz API error: ${response.status} ${response.statusText}`,
      );
    }
    return response.json();
  }

  async getTopRecordings(
    limit = DEFAULT_LIMIT,
    range = 'week',
  ): Promise<ListenBrainzRecordingStatsResponse | null> {
    return this.#get(
      `/stats/sitewide/recordings?count=${limit}&range=${range}`,
    );
  }

  async getTopArtists(
    limit = DEFAULT_LIMIT,
    range = 'week',
  ): Promise<ListenBrainzArtistStatsResponse | null> {
    return this.#get(`/stats/sitewide/artists?count=${limit}&range=${range}`);
  }

  async getTopReleaseGroups(
    limit = DEFAULT_LIMIT,
    range = 'week',
  ): Promise<ListenBrainzReleaseGroupStatsResponse | null> {
    return this.#get(
      `/stats/sitewide/release-groups?count=${limit}&range=${range}`,
    );
  }

  async getFreshReleases(
    days = DEFAULT_FRESH_RELEASES_DAYS,
  ): Promise<ListenBrainzFreshReleasesResponse | null> {
    return this.#get(`/explore/fresh-releases/?days=${days}`);
  }
}
