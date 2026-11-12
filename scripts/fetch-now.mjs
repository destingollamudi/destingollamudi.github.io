#!/usr/bin/env node
/**
 * Regenerates src/data/now.generated.json from my actual feeds.
 *
 * Why this runs in CI instead of in the browser:
 *
 *   - Letterboxd has no public API. It does have per-user RSS, but the
 *     response carries no CORS headers, so a browser fetch is blocked.
 *   - Goodreads killed its API in 2020 and its shelf RSS now 404s for
 *     everyone, so reading comes from Hardcover's GraphQL API instead. It
 *     needs a personal token, which must stay a CI secret, never shipped.
 *   - (historical) Goodreads shelf RSS was
 *     works, and is likewise CORS-blocked.
 *   - Apple Music (MusicKit) needs a developer token — a JWT signed with a
 *     private .p8 key — plus a Music User Token for anything personal.
 *     Shipping that key in static JS would hand every visitor your Apple
 *     Developer credentials, so it has to be signed server-side. That's not
 *     the same as "can't be done": CI *is* server-side, so it signs the
 *     token fresh on every run (lib/apple-music-token.mjs) and calls the API
 *     the same way the Letterboxd/Hardcover fetches do. The Music User Token
 *     itself is obtained once, by hand, via apple-music-authorize.html — see
 *     that file for why that one step can't be scripted.
 *
 *     Real limitation, not a workaround-shaped one: Apple's API has no live
 *     "currently playing" endpoint the way Spotify's does. This is always
 *     "last played," never truly live — same as the Last.fm path below.
 *
 *     Last.fm remains the fallback for anyone who'd rather not pay for an
 *     Apple Developer account ($99/yr) just for this card: Apple Music
 *     scrobbles into Last.fm, and a read-only Last.fm key is harmless in CI.
 *
 * So: fetch server-side, commit a JSON snapshot, redeploy. The site stays
 * static and the data still moves.
 *
 * Config via env (set as GitHub Actions secrets/vars):
 *   LETTERBOXD_USER         e.g. "destingollamudi"
 *   HARDCOVER_TOKEN         hardcover.app/account/api — secret
 *   APPLE_MUSIC_TEAM_ID     from developer.apple.com (not secret — see README)
 *   APPLE_MUSIC_KEY_ID      ditto
 *   APPLE_MUSIC_PRIVATE_KEY the .p8 file's contents — secret
 *   APPLE_MUSIC_USER_TOKEN  from apple-music-authorize.html — secret
 *   LASTFM_USER             last.fm username (fallback if Apple isn't set up)
 *   LASTFM_API_KEY          https://www.last.fm/api/account/create
 *
 * Any missing/failing source is skipped, not fatal: a dead feed must never
 * take the build down or blank the card.
 */

import { writeFile, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { createAppleDeveloperToken } from './lib/apple-music-token.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(HERE, '../src/data/now.generated.json')
const TIMEOUT_MS = 15_000

const env = (key) => (process.env[key] || '').trim()

/* ------------------------------------------------------------------ utils */

async function get(url, headers = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'user-agent': 'destingollamudi.xyz/now-fetcher', ...headers },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.text()
  } finally {
    clearTimeout(timer)
  }
}

/** Minimal RSS reader. These two feeds are simple and stable; a parser dep
 *  would be more surface area than the handful of fields we actually read. */
function items(xml, limit) {
  return (xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || []).slice(0, limit)
}

function tag(xml, name) {
  const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i')
  const match = xml.match(re)
  if (!match) return null
  return decode(match[1].replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, '$1').trim()) || null
}

function decode(value) {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&')
}

function imgFrom(html) {
  if (!html) return null
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match ? match[1] : null
}

/* ---------------------------------------------------------------- sources */

const stars = (rating) => {
  const n = Number(rating)
  return n > 0 ? '★'.repeat(Math.floor(n)) + (n % 1 ? '½' : '') : null
}

/** Strip tags and squeeze whitespace, for review snippets. */
const plain = (html, max = 280) => {
  if (!html) return null
  const text = html.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  return text ? (text.length > max ? `${text.slice(0, max - 1)}…` : text) : null
}

/** Recent Letterboxd diary entries, newest first. */
async function fetchFilms() {
  const user = env('LETTERBOXD_USER')
  if (!user) return null

  const xml = await get(`https://letterboxd.com/${encodeURIComponent(user)}/rss/`)
  const films = items(xml, 12)
    .map((item) => {
      // Letterboxd namespaces the good fields; the <title> is "Film Title, 2024 - ★★★★".
      const title = tag(item, 'letterboxd:filmTitle')
      if (!title) return null // lists and other non-diary entries have no filmTitle
      const description = tag(item, 'description')
      // The description is the poster <img> followed by the review, if any.
      const review = plain(description?.replace(/<p>\s*<img[^>]*>\s*<\/p>/i, ''))
      return {
        title,
        year: tag(item, 'letterboxd:filmYear'),
        stars: stars(tag(item, 'letterboxd:memberRating')),
        rewatch: tag(item, 'letterboxd:rewatch') === 'Yes',
        review: review && !/^Watched on /i.test(review) ? review : null,
        url: tag(item, 'link'),
        image: imgFrom(description),
        watchedAt: tag(item, 'letterboxd:watchedDate') || tag(item, 'pubDate'),
      }
    })
    .filter(Boolean)
  return films.length ? films : null
}

/**
 * One Hardcover shelf as a list of books. status_id: 2 = currently reading,
 * 3 = read. `me` resolves to whoever owns the token, so no username is needed.
 */
const HARDCOVER_SHELF = `query Shelf($status: Int!, $limit: Int!) {
  me {
    user_books(where: {status_id: {_eq: $status}}, order_by: {updated_at: desc}, limit: $limit) {
      rating
      review_raw
      last_read_date
      book { title slug cached_contributors image { url } }
    }
  }
}`

async function fetchHardcover(status, limit) {
  // Hardcover shows the token as "Bearer eyJ…"; accept it with or without the prefix.
  const token = env('HARDCOVER_TOKEN').replace(/^Bearer\s+/i, '')
  if (!token) return null

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  let body
  try {
    const res = await fetch('https://api.hardcover.app/v1/graphql', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        'user-agent': 'destingollamudi.xyz/now-fetcher',
      },
      body: JSON.stringify({ query: HARDCOVER_SHELF, variables: { status, limit } }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    body = await res.json()
  } finally {
    clearTimeout(timer)
  }
  // GraphQL reports schema/auth problems as 200 + errors[].
  if (body.errors?.length) throw new Error(body.errors.map((e) => e.message).join('; '))

  const books = (body.data?.me?.[0]?.user_books ?? [])
    .map((ub) => {
      const book = ub.book
      if (!book?.title) return null
      return {
        title: book.title,
        author: book.cached_contributors?.[0]?.author?.name ?? null,
        stars: stars(ub.rating),
        review: plain(ub.review_raw),
        url: book.slug ? `https://hardcover.app/books/${book.slug}` : null,
        image: book.image?.url ?? null,
        finishedAt: ub.last_read_date ?? null,
      }
    })
    .filter(Boolean)
  return books.length ? books : null
}

async function fetchAppleMusicTrack() {
  const teamId = env('APPLE_MUSIC_TEAM_ID')
  const keyId = env('APPLE_MUSIC_KEY_ID')
  const privateKey = env('APPLE_MUSIC_PRIVATE_KEY')
  const userToken = env('APPLE_MUSIC_USER_TOKEN')
  if (!teamId || !keyId || !privateKey || !userToken) return null

  const developerToken = createAppleDeveloperToken({ teamId, keyId, privateKey })

  const body = await get('https://api.music.apple.com/v1/me/recent/played/tracks?limit=1', {
    Authorization: `Bearer ${developerToken}`,
    'Music-User-Token': userToken,
  })
  const track = JSON.parse(body)?.data?.[0]
  const attrs = track?.attributes
  if (!attrs?.name) return null

  // Artwork URLs are templated — {w}/{h} get swapped for pixel dimensions.
  const image = attrs.artwork?.url ? attrs.artwork.url.replace('{w}', '300').replace('{h}', '300') : null

  return {
    title: attrs.name,
    artist: attrs.artistName || null,
    album: attrs.albumName || null,
    url: attrs.url || null,
    image,
    // Apple's API doesn't expose a live "now playing" state — see the file
    // header. This is always "last played", never true.
    nowPlaying: false,
    playedAt: null,
  }
}

async function fetchLastfmTrack() {
  const user = env('LASTFM_USER')
  const key = env('LASTFM_API_KEY')
  if (!user || !key) return null

  const body = await get(
    'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks' +
      `&user=${encodeURIComponent(user)}&api_key=${encodeURIComponent(key)}&format=json&limit=1`,
  )
  const track = JSON.parse(body)?.recenttracks?.track?.[0]
  if (!track?.name) return null

  const art = Array.isArray(track.image) ? track.image.at(-1)?.['#text'] : null

  return {
    title: track.name,
    artist: track.artist?.['#text'] || track.artist?.name || null,
    album: track.album?.['#text'] || null,
    url: track.url || null,
    image: art || null,
    nowPlaying: track['@attr']?.nowplaying === 'true',
    playedAt: track.date?.['#text'] || null,
  }
}

/** Apple Music first (real data, no "now playing"); Last.fm as a fallback
 *  for anyone who hasn't set up an Apple Developer key. */
async function fetchMusic() {
  try {
    const apple = await fetchAppleMusicTrack()
    if (apple) {
      console.log('  (via Apple Music)')
      return apple
    }
  } catch (error) {
    console.warn(`  Apple Music failed (${error.message}), trying Last.fm`)
  }
  return fetchLastfmTrack()
}

/* ------------------------------------------------------------------- main */

async function previous() {
  try {
    return JSON.parse(await readFile(OUT, 'utf8'))
  } catch {
    return {}
  }
}

const SOURCES = [
  ['films', fetchFilms, 'Letterboxd diary'],
  ['reading', () => fetchHardcover(2, 6), 'Hardcover currently reading'],
  ['read', () => fetchHardcover(3, 10), 'Hardcover read'],
  ['music', fetchMusic, 'Music'],
]

const prior = await previous()
const next = { updatedAt: null, music: null, films: null, reading: null, read: null }
let gotSomething = false

for (const [key, fn, label] of SOURCES) {
  try {
    const value = await fn()
    if (value) {
      next[key] = value
      gotSomething = true
      console.log(`✓ ${label}: ${Array.isArray(value) ? `${value.length} items` : value.title}`)
    } else {
      // Not configured, or an empty shelf. Keep whatever we had rather than
      // regressing a good value to null.
      next[key] = prior[key] ?? null
      console.log(`– ${label}: skipped (not configured or empty)`)
    }
  } catch (error) {
    next[key] = prior[key] ?? null
    console.warn(`! ${label}: ${error.message} — keeping previous value`)
  }
}

if (!gotSomething && !prior.updatedAt) {
  // Nothing configured at all: leave the committed placeholder alone so the
  // site keeps rendering its hardcoded fallbacks.
  console.log('No sources configured; leaving now.generated.json untouched.')
  process.exit(0)
}

// Only touch the file when the content moved. Bumping updatedAt alone would
// make the workflow commit on every cron tick.
const content = (data) => JSON.stringify({ ...data, updatedAt: null, note: null })
if (prior.updatedAt && content(next) === content(prior)) {
  console.log('No changes since last refresh; leaving now.generated.json untouched.')
  process.exit(0)
}

next.updatedAt = new Date().toISOString()
next.note =
  'Regenerated by scripts/fetch-now.mjs via the deploy GitHub Action. Do not edit by hand — your changes will be overwritten on the next run.'

await writeFile(OUT, `${JSON.stringify(next, null, 2)}\n`, 'utf8')
console.log(`Wrote ${OUT}`)
