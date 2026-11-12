import { useState } from 'react'
import { CATEGORIES, tech, usageOf, type Tech, type TechCategory } from '../data/tech'
import { sectionFor } from '../routes'
import { Chip, Modal, SectionHeader } from '../components/ui'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/'
// With a level set, rarity follows it; otherwise each category gets its own frame.
const CATEGORY_RARITY: Record<TechCategory, string> = {
  Languages: 'epic',
  Frontend: 'rare',
  Backend: 'rare',
  Databases: 'common',
  'Developer Tools': 'common',
  'Cloud & Platforms': 'epic',
  'AI Tools': 'mythic',
}
const rarity = (t: Tech) =>
  !t.level ? CATEGORY_RARITY[t.category] : t.level <= 2 ? 'common' : t.level === 3 ? 'rare' : t.level === 4 ? 'epic' : 'mythic'
const LEVEL_NAMES = ['', 'Beginner', 'Working', 'Comfortable', 'Strong', 'Expert']

function TechIcon({ t, size }: { t: Tech; size: string }) {
  const [failed, setFailed] = useState(false)
  if (t.icon && !failed)
    return <img src={`${DEVICON}${t.icon}.svg`} alt="" className={`${size} object-contain drop-shadow-[0_2px_0_#120B26]`} loading="lazy" onError={() => setFailed(true)} />
  return (
    <span aria-hidden className={`${size} grid place-items-center rounded-xl bg-royal font-display text-2xl text-white`}>
      {t.name.replace(/[^A-Za-z]/g, '').slice(0, 2)}
    </span>
  )
}

function Card({ t, onOpen }: { t: Tech; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className={`frame-${rarity(t)} group relative w-full rounded-2xl border-[3px] border-ink p-1.5 text-left shadow-[0_4px_0_#120B26] transition hover:-translate-y-1`}
    >
      <span className="block overflow-hidden rounded-xl border-2 border-ink bg-gradient-to-b from-[#2a2160] to-ink">
        <span className="grid aspect-square place-items-center bg-[radial-gradient(circle_at_50%_40%,rgba(124,245,236,.25),transparent_65%)] p-5">
          <TechIcon t={t} size="h-14 w-14" />
        </span>
        <span className="block border-t-2 border-ink bg-gradient-to-b from-royal to-night px-2 py-1.5 text-center">
          <span className="game-text-sm block truncate text-sm">{t.name}</span>
          <span className="block font-game text-[11px] text-gold-light">{t.level ? `Lvl ${t.level} · ${LEVEL_NAMES[t.level]}` : t.category}</span>
        </span>
      </span>
    </button>
  )
}

export default function Cards() {
  const [filter, setFilter] = useState<TechCategory | 'All'>('All')
  const [open, setOpen] = useState<Tech | null>(null)
  const shown = filter === 'All' ? tech : tech.filter((t) => t.category === filter)
  const usage = open ? usageOf(open) : []

  return (
    <>
      <SectionHeader section={sectionFor('/cards')!}>
        The technologies I use, as a card collection. Tap a card for what it is, how well I know it, and where I've used it.
      </SectionHeader>

      <div role="group" aria-label="Filter by category" className="mb-5 flex flex-wrap gap-2">
        {(['All', ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`btn btn-sm ${filter === c ? 'btn-gold' : 'btn-violet opacity-80'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {(filter === 'All' ? CATEGORIES : [filter]).map((cat) => {
        const cards = shown.filter((t) => t.category === cat)
        if (!cards.length) return null
        return (
          <section key={cat} className="mb-8" aria-labelledby={`cat-${cat}`}>
            <h2 id={`cat-${cat}`} className="game-text-sm mb-3 text-xl uppercase tracking-wider">{cat}</h2>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
              {cards.map((t) => (
                <li key={t.name}><Card t={t} onOpen={() => setOpen(t)} /></li>
              ))}
            </ul>
          </section>
        )
      })}

      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.name ?? ''}>
        {open && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`frame-${rarity(open)} rounded-2xl border-[3px] border-ink p-1.5`}>
                <div className="grid h-20 w-20 place-items-center rounded-xl bg-ink"><TechIcon t={open} size="h-12 w-12" /></div>
              </div>
              <div>
                <Chip>{open.category}</Chip>
                {open.level && (
                  <p className="mt-2 font-game text-gold-light">
                    Familiarity: {'★'.repeat(open.level)}{'☆'.repeat(5 - open.level)} {LEVEL_NAMES[open.level]}
                  </p>
                )}
              </div>
            </div>
            <p className="leading-relaxed">{open.description}</p>
            <div>
              <h3 className="game-text-sm mb-2 text-lg">How I've used it</h3>
              {open.usage && <p className="mb-2 leading-relaxed">{open.usage}</p>}
              {usage.length ? (
                <ul className="space-y-1.5">
                  {usage.map((u) => (
                    <li key={u.where} className="flex items-center gap-2">
                      <Chip className={u.kind === 'Project' ? 'bg-violet' : u.kind === 'Career' ? 'bg-sapphire' : 'bg-[#0e93aa]'}>{u.kind}</Chip>
                      <a href={u.kind === 'Project' ? '#/achievements' : u.kind === 'Career' ? '#/career' : '#/academy'} className="font-extrabold underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-light">
                        {u.where}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-mist">Personal use so far — no listed project yet.</p>
              )}
            </div>
          </div>
        )}
      </Modal>

    </>
  )
}
