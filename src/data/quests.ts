import type { Quest } from './types'

/**
 * Active Quests — what I'm learning right now.
 *
 * `progress` (0–100) is optional — no bar is shown until you set one.
 */
export const quests: (Omit<Quest, 'progress'> & { progress?: number })[] = [
  {
    title: 'React, in depth',
    kind: 'Technology',
    description: 'Learning React beyond the basics: hooks, rendering behavior, and how to structure a real app.',
  },
  {
    title: 'Build this site from scratch',
    kind: 'Project',
    description: 'A static React + TypeScript site with every string in a data file and live reading/watching feeds.',
    href: 'https://github.com/destingollamudi/destingollamudi.github.io',
  },
]

export default quests
