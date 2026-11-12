import { quests } from '../data/quests'
import { site } from '../data/site'
import { sectionFor } from '../routes'
import { Chip, GameButton, Panel, PlaceholderTag, ProgressBar, SectionHeader } from '../components/ui'

const KIND_ICON = { Technology: '⚙️', Course: '📘', Concept: '🧠', Project: '🔨', Career: '🎯' } as const

export default function Quests() {
  return (
    <>
      <SectionHeader section={sectionFor('/quests')!}>What I'm actively learning and building right now.</SectionHeader>
      <ul className="grid gap-4 md:grid-cols-2">
        {quests.map((q) => (
          <li key={q.title}>
            <Panel className={`flex h-full flex-col gap-3 p-5 ${q.placeholder ? 'is-placeholder' : ''}`}>
              <div className="flex items-start gap-3">
                <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-[3px] border-ink bg-gradient-to-b from-[#c99cff] to-[#6326d6] text-2xl">
                  {KIND_ICON[q.kind]}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="game-text-sm text-xl">{q.title}</h2>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <Chip>{q.kind}</Chip>
                    {q.placeholder && <PlaceholderTag />}
                  </div>
                </div>
              </div>
              <p className="flex-1 leading-relaxed text-cream/90">{q.description}</p>
              {typeof q.progress === 'number' && <ProgressBar value={q.progress} label={`${q.title} progress`} />}
              {q.href && <GameButton href={q.href} external small tone="teal" className="self-start">View</GameButton>}
            </Panel>
          </li>
        ))}
      </ul>
      {site.links.freecodecamp && (
        <GameButton href={site.links.freecodecamp} external tone="violet" className="mt-6">
          My freeCodeCamp profile
        </GameButton>
      )}
    </>
  )
}
