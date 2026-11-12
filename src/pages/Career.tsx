import { career } from '../data/career'
import { sectionFor } from '../routes'
import { Chip, Expandable, PlaceholderTag, SectionHeader } from '../components/ui'

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null
  return (
    <div>
      <h3 className="game-text-sm mb-2 text-lg">{title}</h3>
      <ul className="space-y-1.5">
        {items.map((i) => (
          <li key={i} className="flex gap-2 leading-relaxed">
            <span aria-hidden className="mt-1 text-gold">◆</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Career() {
  return (
    <>
      <SectionHeader section={sectionFor('/career')!}>Newest first. Open any role for the full breakdown.</SectionHeader>
      <ol className="relative space-y-4 border-l-4 border-dashed border-royal-light/60 pl-6">
        {career.map((r, i) => (
          <li key={r.company + r.title} className="relative">
            <span aria-hidden className="absolute -left-[38px] top-5 grid h-7 w-7 place-items-center rounded-full border-[3px] border-ink bg-gradient-to-b from-gold-light to-gold-deep font-game text-xs text-ink">
              {career.length - i}
            </span>
            <Expandable
              defaultOpen={i === 0 && !r.placeholder}
              summary={
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-[3px] border-ink bg-gradient-to-b from-sapphire to-royal font-display text-xl text-white">
                    {r.company[0]}
                  </span>
                  <span className="min-w-0">
                    <span className="game-text-sm block text-xl">{r.company}</span>
                    <span className="block font-game text-aether-light">{r.title}</span>
                  </span>
                  <span className="ml-auto text-right text-sm font-extrabold text-mist">
                    {r.period}
                    {r.location && <><br />{r.location}</>}
                  </span>
                  {r.placeholder && <PlaceholderTag />}
                </div>
              }
            >
              <div className="space-y-5">
                <p className="text-base leading-relaxed">{r.summary}</p>
                <div className="grid gap-5 md:grid-cols-2">
                  <List title="Responsibilities" items={r.responsibilities} />
                  <List title="Accomplishments" items={r.accomplishments} />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <h3 className="game-text-sm mb-2 text-lg">Technologies</h3>
                    <div className="flex flex-wrap gap-2">{r.technologies.map((t) => <Chip key={t}>{t}</Chip>)}</div>
                  </div>
                  {r.skills.length > 0 && (
                    <div>
                      <h3 className="game-text-sm mb-2 text-lg">Skills developed</h3>
                      <div className="flex flex-wrap gap-2">{r.skills.map((t) => <Chip key={t} className="bg-violet">{t}</Chip>)}</div>
                    </div>
                  )}
                </div>
                {r.note && (
                  <blockquote className="rounded-2xl border-2 border-gold/60 bg-ink/50 p-4 italic text-gold-light">“{r.note}”</blockquote>
                )}
                {r.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {r.images.map((img) => (
                      <img key={img.src} src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/3] w-full rounded-2xl border-[3px] border-ink object-cover" />
                    ))}
                  </div>
                )}
              </div>
            </Expandable>
          </li>
        ))}
      </ol>
    </>
  )
}
