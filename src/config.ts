export const LISTENBRAINZ_API_BASE = 'https://api.listenbrainz.org/1';
export const COVER_ART_ARCHIVE_BASE = 'https://coverartarchive.org';

export const DASHBOARD_PROVIDER_ID = 'listenbrainz.dashboard';
export const DASHBOARD_PROVIDER_NAME = 'ListenBrainz';
export const METADATA_PROVIDER_ID = 'musicbrainz.metadata';

export const DEFAULT_LIMIT = 50;
// The fresh-releases endpoint has no count/limit param.
// We can only select the number of days.We use a short window and slice
// client-side.
// Don't extend the window as even 7 days returns thousands of items.
export const DEFAULT_FRESH_RELEASES_DAYS = 3;
