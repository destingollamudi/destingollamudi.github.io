/**
 * Library. "Currently reading" and "Recently finished" come from Hardcover
 * automatically (see feeds.ts). Add hand-picked favorites here; the
 * Favorites shelf is hidden while this list is empty.
 */
export interface Book {
  title: string
  author?: string
  thoughts?: string
  cover?: string
  href?: string
  placeholder?: boolean
}

export const favoriteBooks: Book[] = []

export default favoriteBooks
