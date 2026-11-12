import arena from '../assets/game/arena.jpg'
import selfie from '../assets/selfie.jpeg'
import { site } from '../data/site'
import { feeds } from '../data/feeds'
import { projects } from '../data/projects'
import { tech } from '../data/tech'
import { sections } from '../routes'
import { GameButton, Outlined } from '../components/ui'

function Counter({ icon, value, label }: { icon: string; value: string | number; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border-[3px] border-ink bg-gradient-to-b from-[#2a2160] to-ink py-1 pl-1 pr-4 shadow-[inset_0_3px_2px_rgba(0,0,0,.5)]">
      <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-b from-gold-light to-gold-deep text-lg">{icon}</span>
      <span className="leading-none">
        <span className="game-text-sm block text-lg">{value}</span>
        <span className="block text-[10px] font-extrabold uppercase tracking-wider text-mist">{label}</span>
      </span>
    </div>
  )
}

/** Chest-slot style "live" tiles fed by the CI snapshot. */
function LiveSlot({ label, title, sub, image, href, emptyHint }: { label: string; title?: string; sub?: string | null; image?: string | null; href?: string | null; emptyHint: string }) {
  const body = (
    <div className={`panel flex h-full items-center gap-3 p-3 ${title ? '' : 'panel-dark'}`}>
      <div className="grid h-16 w-12 shrink-0 place-items-center overflow-hidden rounded-lg border-2 border-ink bg-night text-2xl">
        {image ? <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" /> : <span aria-hidden>📦</span>}
      </div>
      <div className="min-w-0">
        <p className="font-game text-xs uppercase tracking-widest text-aether-light">{label}</p>
        <p className="truncate font-game text-base text-white">{title ?? emptyHint}</p>
        {sub && <p className="truncate text-xs font-bold text-mist">{sub}</p>}
      </div>
    </div>
  )
  return href ? (
    <a href={href} target="_blank" rel="noreferrer noopener" className="block min-w-0 transition hover:-translate-y-0.5">
      {body}
    </a>
  ) : (
    <div className="min-w-0">{body}</div>
  )
}

export default function Home() {
  const book = feeds.reading[0]
  const film = feeds.films[0]

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="panel relative overflow-hidden" aria-labelledby="hero-name">
        <img src={arena} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_45%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/30 to-ink/95" />
        <div className="relative flex min-h-[460px] flex-col p-5 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <a href="#/profile" className="flex items-center gap-3 rounded-full border-[3px] border-ink bg-gradient-to-b from-[#3b37b8] to-night py-1 pl-1 pr-5 shadow-[0_6px_12px_rgba(18,11,38,.6)] transition hover:brightness-110">
              <span className="relative">
                <img src={selfie} alt={`Photo of ${site.name}`} className="h-14 w-14 rounded-full border-[3px] border-ink object-cover" />
              </span>
              <span className="leading-tight">
                <span id="hero-name" className="game-text-sm block text-lg">{site.name}</span>
                <span className="block text-xs font-extrabold text-aether-light">{site.shortTitle} @ {site.employer}</span>
              </span>
            </a>
            <div className="flex flex-wrap gap-2">
              <Counter icon="🏆" value={projects.length} label="Projects" />
              <Counter icon="🃏" value={tech.length} label="Tech cards" />
            </div>
          </div>

          <div className="mt-auto pt-24 text-center">
            <p className="font-brand text-sm font-black tracking-[0.3em] text-gold-light drop-shadow-[0_2px_0_#120B26]">WELCOME TO THE KINGDOM OF</p>
            <h1 className="mt-1 text-5xl leading-none sm:text-7xl">
              <Outlined>DESTIN</Outlined>{' '}
              <Outlined fill="teal">GOLLAMUDI</Outlined>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base font-bold text-cream/90 sm:text-lg">{site.tagline}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <GameButton href="#/profile" className="min-w-48 text-2xl">Enter profile</GameButton>
              <GameButton href="#/quiz" tone="teal" className="text-2xl">⚔️ Quiz challenge</GameButton>
              <GameButton href="#/clan" tone="violet" className="text-2xl">Contact</GameButton>
            </div>
          </div>
        </div>
      </section>

      {/* Live tiles */}
      <section aria-labelledby="live-heading">
        <h2 id="live-heading" className="game-text-sm mb-3 text-xl uppercase tracking-wider">Live from the kingdom</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <LiveSlot label="Reading" title={book?.title} sub={book?.author} image={book?.image} href={book?.url} emptyHint="Hardcover not connected yet" />
          <LiveSlot label="Last watched" title={film?.title} sub={[film?.year, film?.stars].filter(Boolean).join(' · ')} image={film?.image} href={film?.url} emptyHint="Letterboxd not connected yet" />
        </div>
      </section>

      {/* Kingdom map */}
      <section aria-labelledby="map-heading">
        <h2 id="map-heading" className="game-text-sm mb-3 text-xl uppercase tracking-wider">Explore the kingdom</h2>
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {sections.map((s, i) => (
            <li key={s.path} className="animate-rise" style={{ animationDelay: `${i * 40}ms` }}>
              <a href={`#${s.path}`} className="panel group flex h-full items-center gap-4 p-4 transition hover:-translate-y-1 hover:brightness-110">
                <span aria-hidden className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-[3px] border-ink bg-gradient-to-b from-gold-light to-gold-deep text-3xl shadow-[inset_0_3px_0_rgba(255,255,255,.6)]">
                  {s.icon}
                </span>
                <span className="min-w-0">
                  <span className="game-text-sm block text-lg">{s.game}</span>
                  <span className="block font-game text-sm text-aether-light">{s.plain}</span>
                  <span className="block text-sm font-bold text-cream/75">{s.blurb}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
