import generated from './now.generated.json'

/**
 * The "Currently" widget.
 *
 * Two kinds of data meet here:
 *
 *  1. `manual` — things only I know. ✏️ EDIT ME whenever they stop being true.
 *  2. `generated` — Letterboxd / Goodreads / Last.fm, refreshed by a scheduled
 *     GitHub Action (.github/workflows/refresh-now.yml). Never edited by hand.
 *
 * Browsers can't fetch those feeds directly (no CORS headers, and Apple Music
 * needs a signed JWT), so the fetch happens at build time and lands in
 * now.generated.json. If a feed is down the site quietly uses `fallback`
 * instead of rendering an empty card.
 */

export const manual = {
  // ✏️ The headline line. Keep it concrete — "learning React" says nothing.
  building: {
    label: 'Building',
    value: 'this site, from scratch, with every string in a data file',
    href: 'https://github.com/destingollamudi/destingollamudi.github.io',
  },
  // ✏️ What you're actively getting better at right now.
  learning: {
    label: 'Learning',
    value: 'Postgres query plans — properly this time, not by guessing',
  },
  // ✏️ Status line. This is the one recruiters read.
  status: {
    label: 'Status',
    value: 'Graduating Spring 2026 · looking for new-grad SWE roles',
  },
}

/** Used only until the first successful feed refresh. ✏️ Safe to edit. */
const fallback = {
  music: { title: 'Nothing playing', artist: 'feed not connected yet', url: null },
  book: { title: 'Between books', author: 'feed not connected yet', url: null },
  film: { title: 'Nothing watched lately', meta: 'feed not connected yet', url: null },
}

/**
 * Merge the generated snapshot over the fallbacks and tell the UI which is
 * which, so the widget can show a "live" dot only when the data really is.
 */
export function getNow() {
  const pick = (key) => {
    const live = generated?.[key]
    const hasValue = live && typeof live === 'object' && live.title
    return { ...(hasValue ? live : fallback[key]), isLive: Boolean(hasValue) }
  }

  return {
    music: pick('music'),
    book: pick('book'),
    film: pick('film'),
    updatedAt: generated?.updatedAt ?? null,
    isLive: Boolean(generated?.updatedAt),
  }
}

export const currently = { manual, getNow }
export default currently
