import gatorConnect1 from '../assets/connect1.png'
import gatorConnect2 from '../assets/connect2.png'
import type { Project } from './types'

/** Achievements. `academic: true` also lists the project on the Academy page. */
export const projects: (Project & { academic?: boolean })[] = [
  {
    title: 'GatorConnect',
    context: 'Team of four · UF Software Engineering',
    period: 'Spring 2024',
    academic: true,
    images: [
      { src: gatorConnect1, alt: 'GatorConnect event feed' },
      { src: gatorConnect2, alt: 'GatorConnect event detail view' },
    ],
    description: [
      'Full-stack CRUD app for finding campus events, built with four people on a real sprint cadence.',
      'REST API in Node + Express over MongoDB, including the query-heavy endpoints for filtering events by org, date, and tag.',
      'JWT auth end to end: token issuing, verification, and middleware-guarded routes.',
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    links: [{ label: 'GitHub', href: 'https://github.com/destingollamudi' }],
    why: 'We picked Mongo because the schema kept changing every sprint and migrations would have eaten our whole week.',
    learned:
      "I stored JWTs in localStorage because every tutorial did. A TA asked me what happens if someone injects a script, and I had no answer. If I rebuilt it today it'd be httpOnly cookies — that one question taught me more than the whole auth lecture.",
  },
  {
    title: 'This site',
    context: 'Personal',
    period: '2026',
    images: [],
    description: [
      'A static React + TypeScript site on GitHub Pages, styled as an original mobile-game interface.',
      'All content lives in typed data modules under src/data, so updating it is editing one object, not hunting through JSX.',
      'Reading and watch history come from Hardcover and Letterboxd via a scheduled GitHub Action that regenerates a JSON snapshot — no backend.',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'GitHub Actions', 'Figma'],
    links: [{ label: 'GitHub', href: 'https://github.com/destingollamudi/destingollamudi.github.io' }],
    why: 'The old version had every string buried in JSX, so I never updated it. Making the content boring to edit was the whole point.',
    learned:
      "I wanted live Apple Music data and couldn't — MusicKit needs a JWT signed with a private key, and there's no server here to hide one in. So the fetching moved to a GitHub Action, which is slower but honest about what a static site can do.",
  },
]

export default projects
