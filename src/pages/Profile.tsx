import arena from '../assets/game/arena.jpg'
import selfie from '../assets/selfie.jpeg'
import { site } from '../data/site'
import { education } from '../data/education'
import { career } from '../data/career'
import { projects } from '../data/projects'
import { tech } from '../data/tech'
import { sectionFor } from '../routes'
import { Chip, GameButton, Outlined, Panel, SectionHeader } from '../components/ui'

export default function Profile() {
  const facts: [string, string, string][] = [
    ['💼', 'Occupation', `${site.occupation} at ${site.employer}`],
    ['📍', 'Location', site.location],
    ['🎓', 'University', `${education.school} · ${education.degree}, ${education.minor} minor`],
    ['🗓️', 'Graduated', site.graduated],
  ]
  const stats: [string, number | string][] = [
    ['Roles', career.length],
    ['Projects', projects.length],
    ['Tech cards', tech.length],
    ['Class of', site.classOf],
  ]

  return (
    <>
      <SectionHeader section={sectionFor('/profile')!} />

      {/* Banner */}
      <Panel className="relative mb-6 overflow-hidden">
        <img src={arena} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_30%] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-night" />
        <div className="relative flex flex-col items-start gap-5 p-5 pt-28 sm:flex-row sm:items-end sm:p-8 sm:pt-36">
          <div className="relative">
            <img
              src={selfie}
              alt={`Photo of ${site.name}`}
              className="h-32 w-32 rounded-full border-[5px] border-gold object-cover shadow-[0_0_0_3px_#120B26,0_0_24px_rgba(255,181,46,.6)]"
            />
            <span className="game-text-sm absolute -bottom-1 -right-1 rounded-xl border-[3px] border-ink bg-gradient-to-b from-aether-light to-[#0e93aa] px-2 py-0.5 text-lg">
              ’{String(site.classOf).slice(2)}
            </span>
          </div>
          <div>
            <h2 className="text-4xl leading-none sm:text-5xl">
              <Outlined fill="white">{site.name}</Outlined>
            </h2>
            <p className="mt-2 font-game text-lg text-gold-light">{site.occupation} · {site.employer}</p>
          </div>
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel className="p-5 sm:p-6">
          <h3 className="game-text-sm mb-3 text-xl">About me</h3>
          <p className="text-base leading-relaxed text-cream/90">{site.intro}</p>
          <p className="mt-3 text-base italic leading-relaxed text-aether-light">“{site.tagline}”</p>
          <h3 className="game-text-sm mb-2 mt-6 text-lg">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {site.interests.map((i) => <Chip key={i}>{i}</Chip>)}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <GameButton href="#/career" small>Career history</GameButton>
            <GameButton href="#/hobbies" small tone="teal">Hobbies</GameButton>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-5">
            <dl className="space-y-3">
              {facts.map(([icon, k, v]) => (
                <div key={k} className="flex gap-3">
                  <dt className="sr-only">{k}</dt>
                  <span aria-hidden className="text-xl">{icon}</span>
                  <dd>
                    <span className="block font-game text-xs uppercase tracking-widest text-mist">{k}</span>
                    <span className="font-extrabold">{v}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Panel>
          <div className="grid grid-cols-2 gap-3">
            {stats.map(([k, v]) => (
              <div key={k} className="panel p-3">
                <p className="font-game text-xs uppercase tracking-widest text-mist">{k}</p>
                <p className="game-text-sm text-2xl text-gold-light">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
