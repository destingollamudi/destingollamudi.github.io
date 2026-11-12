import { site } from './site'
import { education } from './education'

/**
 * Quiz Challenge questions. Answers pull from the other data files where
 * they can, so editing a fact there updates the quiz too.
 *
 * Only ask single-valued facts: every `wrong` option must be definitely
 * false, not just "not listed on the site".
 */
export interface Question {
  q: string
  answer: string
  wrong: [string, string, string]
  /** Route where the answer lives, for "learn more". */
  source: string
}

export const questions: Question[] = [
  { q: 'Where does Destin work?', answer: site.employer, wrong: ['Accenture', 'IBM', 'Publix'], source: '/career' },
  { q: 'Which platform does Destin develop on at Deloitte?', answer: 'ServiceNow', wrong: ['Salesforce', 'SAP', 'Workday'], source: '/career' },
  { q: 'Where did Destin do his software engineering internship?', answer: 'Publix', wrong: ['Disney', 'Lockheed Martin', 'Raymond James'], source: '/career' },
  { q: 'By roughly how much did Destin cut page load times at Publix?', answer: '~30%', wrong: ['~5%', '~60%', '~90%'], source: '/career' },
  { q: 'Where did Destin go to college?', answer: education.school, wrong: ['Florida State University', 'University of Central Florida', 'University of South Florida'], source: '/academy' },
  { q: 'What did Destin minor in?', answer: education.minor, wrong: ['Mathematics', 'Economics', 'Business'], source: '/academy' },
  { q: 'When did Destin graduate?', answer: site.graduated, wrong: ['December 2025', 'May 2025', 'December 2026'], source: '/academy' },
  { q: 'Which city does Destin live in?', answer: 'Orlando', wrong: ['Tampa', 'Gainesville', 'Miami'], source: '/profile' },
  { q: 'Which database powered GatorConnect?', answer: 'MongoDB', wrong: ['PostgreSQL', 'MySQL', 'Firebase'], source: '/achievements' },
  { q: 'Which NFL team does Destin root for?', answer: 'Tampa Bay Buccaneers', wrong: ['Miami Dolphins', 'Jacksonville Jaguars', 'Atlanta Falcons'], source: '/world' },
  { q: 'Who did the Rays beat 5–2 in ALDS Game 2 with Destin in the stands?', answer: 'New York Yankees', wrong: ['Boston Red Sox', 'Baltimore Orioles', 'Toronto Blue Jays'], source: '/world' },
  { q: 'What did Destin swap with the Holy Father in Rome?', answer: 'Hats', wrong: ['Rosaries', 'Scarves', 'Books'], source: '/world' },
  { q: 'Which city did Destin visit in December 2025?', answer: 'Rome', wrong: ['Paris', 'London', 'Madrid'], source: '/world' },
  { q: 'What anchors Destin’s entire life?', answer: 'His Catholic faith', wrong: ['Fantasy football', 'Coffee', 'His Letterboxd diary'], source: '/world' },
]

// Self-check: an answer listed as wrong would make a question unwinnable.
for (const q of questions) {
  if (q.wrong.includes(q.answer) || new Set(q.wrong).size !== 3) throw new Error(`Bad quiz question: ${q.q}`)
}

export const ROUND_SIZE = 6

/** Fisher–Yates; returns a new array. */
export function shuffle<T>(list: readonly T[]): T[] {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Crowns = enemy towers destroyed; each tower takes 2 hits. */
export const crowns = (hits: number) => Math.min(3, Math.floor(hits / 2))
