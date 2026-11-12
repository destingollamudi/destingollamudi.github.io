import generated from './now.generated.json'

/**
 * Typed view of now.generated.json — written by scripts/fetch-now.mjs in CI,
 * never by hand. Every field is optional because the file starts empty and
 * any feed can be unconfigured or down; pages fall back to placeholders.
 */
export interface FeedFilm {
  title: string
  year?: string | null
  stars?: string | null
  rewatch?: boolean
  review?: string | null
  url?: string | null
  image?: string | null
  watchedAt?: string | null
}

export interface FeedBook {
  title: string
  author?: string | null
  stars?: string | null
  review?: string | null
  url?: string | null
  image?: string | null
  finishedAt?: string | null
}

export interface FeedTrack {
  title: string
  artist?: string | null
  album?: string | null
  url?: string | null
  image?: string | null
}

interface Snapshot {
  updatedAt?: string | null
  films?: FeedFilm[] | null
  reading?: FeedBook[] | null
  read?: FeedBook[] | null
  music?: FeedTrack | null
}

const data = generated as Snapshot

export const feeds = {
  updatedAt: data.updatedAt ?? null,
  films: data.films ?? [],
  reading: data.reading ?? [],
  read: data.read ?? [],
  music: data.music?.title ? data.music : null,
}

export default feeds
