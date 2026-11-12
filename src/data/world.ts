/**
 * My World — everything else. Each group is a titled list; add a group or an
 * item and it appears.
 */
export interface WorldItem {
  name: string
  note?: string
  href?: string
  placeholder?: boolean
}

export interface WorldGroup {
  title: string
  emoji: string
  items: WorldItem[]
}

export const world: WorldGroup[] = [
  {
    title: 'Faith',
    emoji: '✝️',
    items: [
      {
        name: 'Catholic',
        note: 'My Catholic faith governs my entire life and is my anchor. Everything else on this site comes after it.',
      },
    ],
  },
  {
    title: 'Sports teams',
    emoji: '🏟️',
    items: [
      { name: 'Florida Gators', note: 'Obviously.' },
      { name: 'Tampa Bay Buccaneers' },
      { name: 'Tampa Bay Rays' },
      { name: 'Orlando City SC', note: 'Working on becoming a fan now that I live here.' },
    ],
  },
]

export default world
