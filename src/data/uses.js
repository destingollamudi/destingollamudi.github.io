/**
 * /#/uses — the actual toolkit.
 *
 * ✏️  EDIT ME: this is the one file on the site an API can't fill in for you.
 *     Nothing here is fetched — hardware and desk gear have no feed. Swap any
 *     line that isn't true and delete any row you don't care about.
 */
export const usesIntro =
  "Everything here is something I actually touch most days. If it's on this list I've used it long enough to have an opinion about it; if I'm still trying something out, it's not on the list yet."

export const uses = [
  {
    category: 'Machine',
    items: [
      { name: 'MacBook Air (M2, 16GB)', note: 'Does everything school and side projects need. The 8GB base model would not have.' },
      { name: 'External 27" 1440p monitor', note: 'Editor left, browser + devtools right. I cannot work on one screen anymore.' },
      { name: 'Wired mechanical keyboard, brown switches', note: 'Loud enough to feel good, quiet enough for the library. Barely.' },
    ],
  },
  {
    category: 'Editor',
    items: [
      { name: 'VS Code', note: 'Vim keybindings, which I use at about 70% competence.' },
      { name: 'JetBrains Mono', note: 'Same font the code blocks on this site use.' },
      { name: 'Catppuccin Mocha', note: 'The first dark theme that did not make my JSX look like a Christmas tree.' },
      { name: 'Prettier + ESLint on save', note: 'Non-negotiable. Formatting arguments are a waste of a code review.' },
    ],
  },
  {
    category: 'Building',
    items: [
      { name: 'React 19 + Vite', note: 'What this site runs on. Vite’s dev server is the reason I stopped dreading frontend.' },
      { name: 'Tailwind CSS', note: 'I resisted for a year. I was wrong.' },
      { name: 'Node + Express', note: 'Still my default for a REST API I need running in an hour.' },
      { name: 'PostgreSQL', note: 'Reach for this before Mongo now, unless the schema genuinely will not sit still.' },
      { name: 'DBeaver', note: 'For reading query plans, which is the habit the Publix internship beat into me.' },
    ],
  },
  {
    category: 'Terminal',
    items: [
      { name: 'iTerm2 + zsh', note: 'Plus fzf, which I use roughly four hundred times a day.' },
      { name: 'lazygit', note: 'I know the git commands. I still use lazygit.' },
      { name: 'gh CLI', note: 'Opening PRs without leaving the terminal.' },
    ],
  },
  {
    category: 'Everyday carry',
    items: [
      { name: 'Field Notes pocket notebook', note: 'For the ideas I will absolutely lose otherwise.' },
      { name: 'Hydro Flask, 32oz', note: 'Gainesville in August is not a joke.' },
      { name: 'Wired earbuds', note: 'Yes, wired. They never need charging and I never lose one.' },
      { name: 'UF Gator One card', note: 'Gets me into every building I am allowed in and several I am not sure about.' },
    ],
  },
]

export default uses
