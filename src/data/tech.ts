import { career } from './career'
import { education } from './education'
import { projects } from './projects'

/**
 * Card Collection — the tech I actually use.
 *
 * `level` (1–5) is an optional familiarity rating. Cards without one simply
 * don't show a level; set it and the card's rarity frame follows it.
 *
 * "How I've used it" and "Relevant projects" are NOT typed here — they're
 * computed from the `technologies` lists in career.ts, projects.ts and
 * education.ts, so they can't drift out of date.
 */
export type TechCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Databases'
  | 'Developer Tools'
  | 'Cloud & Platforms'
  | 'AI Tools'

export interface Tech {
  name: string
  category: TechCategory
  /** devicon path, e.g. 'react/react-original' — omit for a monogram badge. */
  icon?: string
  description: string
  level?: 1 | 2 | 3 | 4 | 5
  /** Extra names the same tech goes by in the other data files. */
  aliases?: string[]
  /** Free-text usage you want shown in addition to the computed list. */
  usage?: string
}

export const CATEGORIES: TechCategory[] = [
  'Languages',
  'Frontend',
  'Backend',
  'Databases',
  'Developer Tools',
  'Cloud & Platforms',
  'AI Tools',
]

export const tech: Tech[] = [
  { name: 'Java', category: 'Languages', icon: 'java/java-original', description: 'Statically typed, object-oriented language.' },
  { name: 'Python', category: 'Languages', icon: 'python/python-original', description: 'General-purpose language for scripting, data and backends.' },
  { name: 'C++', category: 'Languages', icon: 'cplusplus/cplusplus-original', description: 'Systems language with manual memory control.' },
  { name: 'R', category: 'Languages', icon: 'r/r-original', description: 'Language for statistics and data analysis.' },
  { name: 'SQL', category: 'Languages', icon: 'azuresqldatabase/azuresqldatabase-original', description: 'Querying and shaping relational data.' },
  { name: 'JavaScript', category: 'Languages', icon: 'javascript/javascript-original', description: 'The language of the web, front and back.', aliases: ['Node.js', 'React', 'Express'] },
  { name: 'TypeScript', category: 'Languages', icon: 'typescript/typescript-original', description: 'JavaScript with a static type system.' },

  { name: 'HTML/CSS', category: 'Frontend', icon: 'html5/html5-original', description: 'Markup and styling for the web.' },
  { name: 'React', category: 'Frontend', icon: 'react/react-original', description: 'Component-based UI library.' },
  { name: 'Angular', category: 'Frontend', icon: 'angular/angular-original', description: 'Full-featured TypeScript front-end framework.' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'tailwindcss/tailwindcss-original', description: 'Utility-first CSS framework.' },
  { name: 'Vite', category: 'Frontend', icon: 'vitejs/vitejs-original', description: 'Fast dev server and build tool.' },

  { name: 'Node.js', category: 'Backend', icon: 'nodejs/nodejs-original', description: 'JavaScript runtime for servers and tooling.' },
  { name: 'Express', category: 'Backend', icon: 'express/express-original', description: 'Minimal web framework for Node.js.' },
  { name: 'ASP.NET', category: 'Backend', icon: 'dot-net/dot-net-original', description: "Microsoft's web framework for .NET." },
  { name: 'JWT', category: 'Backend', description: 'Signed tokens for stateless authentication.' },

  { name: 'MongoDB', category: 'Databases', icon: 'mongodb/mongodb-original', description: 'Document database with flexible schemas.' },
  { name: 'MS SQL Server', category: 'Databases', icon: 'microsoftsqlserver/microsoftsqlserver-original', description: "Microsoft's relational database." },

  { name: 'Git & GitHub', category: 'Developer Tools', icon: 'github/github-original', description: 'Version control and code hosting.', aliases: ['GitHub'] },
  { name: 'VS Code', category: 'Developer Tools', icon: 'vscode/vscode-original', description: 'Code editor.' },
  { name: 'Figma', category: 'Developer Tools', icon: 'figma/figma-original', description: 'Interface design and prototyping.' },

  { name: 'GitHub Actions', category: 'Cloud & Platforms', icon: 'githubactions/githubactions-original', description: 'CI/CD and scheduled automation.' },
  { name: 'GitHub Pages', category: 'Cloud & Platforms', icon: 'github/github-original', description: 'Static site hosting.' },
  { name: 'ServiceNow', category: 'Cloud & Platforms', description: 'Enterprise workflow and IT service platform.' },
  { name: 'Power Apps / Power Automate', category: 'Cloud & Platforms', description: "Microsoft's low-code app and workflow tools." },

  { name: 'Claude Code', category: 'AI Tools', description: 'AI coding agent in the terminal.' },
]

export interface Usage {
  where: string
  kind: 'Career' | 'Project' | 'Academy'
}

/** Where a tech shows up across career, projects and education. */
export function usageOf(t: Tech): Usage[] {
  const names = [t.name, ...(t.aliases ?? [])].map((n) => n.toLowerCase())
  const has = (list: string[]) => list.some((x) => names.includes(x.toLowerCase()))
  return [
    ...career.filter((r) => has(r.technologies)).map((r) => ({ where: `${r.title} @ ${r.company}`, kind: 'Career' as const })),
    ...projects.filter((p) => has(p.technologies)).map((p) => ({ where: p.title, kind: 'Project' as const })),
    ...(has(education.technologies) ? [{ where: `${education.degree} @ ${education.school}`, kind: 'Academy' as const }] : []),
  ]
}

export default tech
