import { projects } from '../data/projects'
import { sectionFor } from '../routes'
import { Chip, GameButton, Panel, PlaceholderTag, Portrait, SectionHeader } from '../components/ui'

export default function Achievements() {
  return (
    <>
      <SectionHeader section={sectionFor('/achievements')!}>
        Every project is an arena I've unlocked — what it does, how it's built, and what it taught me.
      </SectionHeader>
      <div className="space-y-6">
        {projects.map((p, i) => (
          <Panel key={p.title} className={`overflow-hidden ${p.placeholder ? 'is-placeholder' : ''}`}>
            <div className="flex flex-wrap items-center gap-4 border-b-[3px] border-ink bg-gradient-to-b from-[#ffe07a] to-[#e8820c] px-5 py-3 shadow-[inset_0_3px_0_rgba(255,255,255,.55)]">
              <span aria-hidden className="text-3xl">🏆</span>
              <div className="min-w-0 flex-1">
                <h2 className="game-text text-2xl sm:text-3xl">{p.title}</h2>
                <p className="font-game text-sm text-[#5a2a00]">{p.context} · {p.period}</p>
              </div>
              <span className="game-text-sm rounded-xl border-2 border-ink bg-ink/30 px-2 py-0.5 text-sm">Arena {i + 1} unlocked</span>
              {p.placeholder && <PlaceholderTag />}
            </div>

            <div className="grid gap-6 p-5 lg:grid-cols-[1.3fr_1fr]">
              <div className="space-y-4">
                <ul className="space-y-1.5">
                  {p.description.map((d) => (
                    <li key={d} className="flex gap-2 leading-relaxed">
                      <span aria-hidden className="mt-1 text-gold">◆</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">{p.technologies.map((t) => <Chip key={t}>{t}</Chip>)}</div>
                {p.why && (
                  <div className="inset-well p-4">
                    <h3 className="game-text-sm mb-1 text-base text-aether-light">Technical challenge</h3>
                    <p className="leading-relaxed">{p.why}</p>
                  </div>
                )}
                {p.learned && (
                  <div className="inset-well p-4">
                    <h3 className="game-text-sm mb-1 text-base text-gold-light">What I learned</h3>
                    <p className="leading-relaxed">{p.learned}</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  {p.links.map((l) => (
                    <GameButton key={l.href} href={l.href} external small tone={l.label.toLowerCase().includes('demo') ? 'gold' : 'violet'}>
                      {l.label}
                    </GameButton>
                  ))}
                  {!p.links.some((l) => l.label.toLowerCase().includes('demo')) && (
                    <span className="self-center text-sm font-bold text-mist">No live demo</span>
                  )}
                </div>
              </div>

              <div className="grid content-start gap-3">
                {p.images.length ? (
                  p.images.map((img) => (
                    <img key={img.src} src={img.src} alt={img.alt} loading="lazy" className="w-full rounded-2xl border-[3px] border-ink bg-ink object-cover" />
                  ))
                ) : (
                  <div className="grid aspect-video place-items-center rounded-2xl border-[3px] border-ink bg-gradient-to-b from-royal to-ink">
                    <Portrait index={(i * 3) % 8} className="h-full w-1/2" label="Skyforge character art" />
                  </div>
                )}
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </>
  )
}
