import gatorConnect1 from '../assets/connect1.png'
import gatorConnect2 from '../assets/connect2.png'

export const projects = [
  {
    title: 'GatorConnect',
    company: 'Team of four · UF Software Engineering',
    period: 'Spring 2024',
    location: '',
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
    links: [{ label: 'Source', href: 'https://github.com/destingollamudi' }],
    // The "why" and the roadblock — the part most portfolios leave out.
    why: "We picked Mongo because the schema kept changing every sprint and migrations would have eaten our whole week.",
    roadblock:
      "I stored JWTs in localStorage because every tutorial did. A TA asked me what happens if someone injects a script, and I had no answer. If I rebuilt it today it'd be httpOnly cookies — that one question taught me more than the whole auth lecture.",
  },
  {
    title: 'This site',
    company: 'Personal',
    period: '2026',
    location: '',
    images: [],
    description: [
      'React + Vite + Tailwind, deployed to GitHub Pages behind a custom domain.',
      'All content lives in plain data modules under src/data, so updating it is editing one object, not hunting through JSX.',
      'The "now" strip pulls from Letterboxd and Goodreads via a scheduled GitHub Action that regenerates a JSON snapshot at build time.',
    ],
    technologies: ['React 19', 'Vite', 'Tailwind', 'GitHub Actions'],
    links: [{ label: 'Source', href: 'https://github.com/destingollamudi/destingollamudi.github.io' }],
    why: "The old version had every string buried in JSX, so I never updated it. It sat stale for a year. Making the content boring to edit was the whole point.",
    roadblock:
      "I wanted live Apple Music data and couldn't — MusicKit needs a JWT signed with a private key, and there's no server here to hide one in. So the fetching moved to a GitHub Action, which is slower but honest about what a static site can do.",
  },
]

export default projects
