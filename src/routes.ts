/**
 * Every section, with its game name AND its plain meaning — the nav always
 * shows both, so nobody has to speak "game" to find the résumé.
 */
export interface Section {
  path: string
  game: string
  plain: string
  icon: string
  blurb: string
  group: 'Professional' | 'Personal' | 'Contact'
}

export const sections: Section[] = [
  { path: '/profile', game: 'Player Profile', plain: 'About me', icon: '🛡️', blurb: 'Who I am, where I am, what I do.', group: 'Professional' },
  { path: '/career', game: 'Career History', plain: 'Experience', icon: '⚔️', blurb: 'Deloitte, Publix, and what I shipped.', group: 'Professional' },
  { path: '/cards', game: 'Card Collection', plain: 'Tech stack', icon: '🃏', blurb: 'Languages, frameworks and tools I use.', group: 'Professional' },
  { path: '/achievements', game: 'Achievements', plain: 'Projects', icon: '🏆', blurb: 'Things I built, and what they taught me.', group: 'Professional' },
  { path: '/academy', game: 'Academy', plain: 'Education', icon: '🎓', blurb: 'University of Florida · CS + Statistics.', group: 'Professional' },
  { path: '/quests', game: 'Active Quests', plain: 'Learning now', icon: '📜', blurb: 'What I am working to get better at.', group: 'Professional' },
  { path: '/hobbies', game: 'Beyond the Arena', plain: 'Hobbies', icon: '🎾', blurb: 'Sports, trails and fantasy leagues.', group: 'Personal' },
  { path: '/watchlist', game: 'Watchlist', plain: 'TV & movies', icon: '🎬', blurb: 'What I am watching and what I love.', group: 'Personal' },
  { path: '/library', game: 'Library', plain: 'Reading', icon: '📚', blurb: 'Currently reading, finished, favorites.', group: 'Personal' },
  { path: '/world', game: 'My World', plain: 'Interests', icon: '🧭', blurb: 'Faith, teams, and the rest.', group: 'Personal' },
  { path: '/clan', game: 'Join My Clan', plain: 'Contact', icon: '✉️', blurb: 'Email, LinkedIn and GitHub.', group: 'Contact' },
]

export const sectionFor = (path: string) => sections.find((s) => s.path === path)

/** Old URLs from the previous site keep working. */
export const aliases: Record<string, string> = { '/uses': '/cards' }
