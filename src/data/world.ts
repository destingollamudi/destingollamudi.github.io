/**
 * My World — faith, hobbies, teams and travel in one place.
 * Add an interest and it appears as a collectible; `note` is optional.
 */
export const philosophy = {
  title: 'Faith',
  text: 'My Catholic faith governs my entire life and is my anchor. Everything else on this site comes after it.',
}

export interface Interest {
  name: string
  emoji: string
  note?: string
}

export const interests: Interest[] = [
  { name: 'American football', emoji: '🏈' },
  { name: 'Tennis', emoji: '🎾' },
  { name: 'Pickleball', emoji: '🏓' },
  { name: 'Hiking', emoji: '🥾' },
  { name: 'Fantasy football', emoji: '📋' },
  { name: 'Traveling', emoji: '✈️' },
  { name: 'Florida Gators', emoji: '🐊', note: 'Obviously.' },
  { name: 'Tampa Bay Buccaneers', emoji: '🏴‍☠️' },
  { name: 'Tampa Bay Rays', emoji: '⚾' },
  { name: 'Orlando City SC', emoji: '⚽', note: 'Getting into it now that I live here.' },
]

export default interests
