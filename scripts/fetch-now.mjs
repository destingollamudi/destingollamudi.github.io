#!/usr/bin/env node
/**
 * Regenerates src/data/now.generated.json from my actual feeds.
 *
 * Why this runs in CI instead of in the browser:
 *
 *   - Letterboxd has no public API. It does have per-user RSS, but the
 *     response carries no CORS headers, so a browser fetch is blocked.
 *   - Goodreads killed its API for new keys in Dec 2020. Shelf RSS still
 *     works, and is likewise CORS-blocked.
 *   - Apple Music (MusicKit) needs a developer token: a JWT signed with a
 *     private .p8 key, plus a Music User Token for anything personal. Shipping
 *     that key in static JS would hand anyone my Apple Developer credentials.
 *     Last.fm is the practical stand-in — Apple Music scrobbles into it and a
 *     read-only API key is harmless in CI.
 *
 * So: fetch server-side, commit a JSON snapshot, redeploy. The site stays
 * static and the data still moves.
 *
 * Config via env (set as GitHub Actions secrets/vars):
 *   LETTERBOXD_USER   e.g. "destingollamudi"
 *   GOODREADS_USER_ID numeric id from your profile URL
 *   LASTFM_USER       last.fm username
 *   LASTFM_API_KEY    https://www.last.fm/api/account/create
 *
 * Any missing/failing source is skipped, not fatal: a dead feed must never
 * take the build down or blank the card.
 */

import { writeFile, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(HERE, '../src/data/now.generated.json')
const TIMEOUT_MS = 15_000

const env = (key) => (process.env[key] || '').trim()

/* ------------------------------------------------------------------ utils */

async function get(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'user-agent': 'destingollamudi.xyz/now-fetcher' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.text()
  } finally {
    clearTimeout(timer)
  }
}

/** Minimal RSS reader. These two feeds are simple and stable; a parser dep
 *  would be more surface area than the five fields we actually read. */
function firstItem(xml) {
  const match = xml.match(/<item[\s>][\s\S]*?<\/item>/i)
  return match ? match[0] : null
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

async function fetchFilm() {
  const user = env('LETTERBOXD_USER')
  if (!user) return null

  const xml = await get(`https://letterboxd.com/${encodeURIComponent(user)}/rss/`)
  const item = firstItem(xml)
  if (!item) return null

  // Letterboxd namespaces the good fields; the <title> is "Film Title, 2024 - ★★★★".
  const title = tag(item, 'letterboxd:filmTitle') || tag(item, 'title')
  if (!title) return null

  const year = tag(item, 'letterboxd:filmYear')
  const rating = tag(item, 'letterboxd:memberRating')
  const stars = rating ? '★'.repeat(Math.floor(Number(rating))) + (Number(rating) % 1 ? '½' : '') : null

  return {
    title,
    meta: [year, stars].filter(Boolean).join(' · ') || null,
    url: tag(item, 'link'),
    image: imgFrom(tag(item, 'description')),
    watchedAt: tag(item, 'letterboxd:watchedDate') || tag(item, 'pubDate'),
  }
}

async function fetchBook() {
  const id = env('GOODREADS_USER_ID')
  if (!id) return null

  const xml = await get(
    `https://www.goodreads.com/review/list_rss/${encodeURIComponent(id)}?shelf=currently-reading&sort=date_added`,
  )
  const item = firstItem(xml)
  if (!item) return null

  const title = tag(item, 'title')
  if (!title) return null

  return {
    title,
    author: tag(item, 'author_name'),
    url: tag(item, 'link'),
    image: tag(item, 'book_large_image_url') || tag(item, 'book_medium_image_url'),
    startedAt: tag(item, 'user_date_added'),
  }
}

async function fetchMusic() {
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

/* ------------------------------------------------------------------- main */

async function previous() {
  try {
    return JSON.parse(await readFile(OUT, 'utf8'))
  } catch {
    return {}
  }
}

const SOURCES = [
  ['film', fetchFilm, 'Letterboxd'],
  ['book', fetchBook, 'Goodreads'],
  ['music', fetchMusic, 'Last.fm'],
]

const prior = await previous()
const next = { updatedAt: new Date().toISOString(), music: null, book: null, film: null }
let gotSomething = false

for (const [key, fn, label] of SOURCES) {
  try {
    const value = await fn()
    if (value) {
      next[key] = value
      gotSomething = true
      console.log(`✓ ${label}: ${value.title}`)
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

next.note =
  'Regenerated by scripts/fetch-now.mjs via the refresh-now GitHub Action. Do not edit by hand — your changes will be overwritten on the next run.'

await writeFile(OUT, `${JSON.stringify(next, null, 2)}\n`, 'utf8')
console.log(`Wrote ${OUT}`)
