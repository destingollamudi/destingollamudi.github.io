/**
 * Watchlist. Movies logged on Letterboxd show up automatically (see
 * feeds.ts); this is the hand-curated part. Empty lists are hidden.
 * `poster` is optional — any image URL works, otherwise the card shows a
 * painted title plate.
 */
export interface Watch {
  title: string
  year?: string
  note?: string
  poster?: string
  href?: string
  placeholder?: boolean
}

export const watchlist: { tv: Record<'current' | 'favorites' | 'allTime', Watch[]>; movies: Record<'favorites' | 'allTime', Watch[]> } = {
  tv: {
    current: [{ title: 'The Sopranos' }, { title: 'Silicon Valley' }, { title: 'Suits' }],
    favorites: [],
    allTime: [],
  },
  movies: {
    favorites: [
      { title: 'La La Land', year: '2016' },
      { title: 'The Empire Strikes Back', year: '1980' },
      { title: 'Star Wars: Revenge of the Sith', year: '2005' },
    ],
    allTime: [],
  },
}

export default watchlist
