import { education } from '../data/education'
import { projects } from '../data/projects'
import { sectionFor } from '../routes'
import { Chip, Outlined, Panel, SectionHeader } from '../components/ui'

export default function Academy() {
  const academic = projects.filter((p) => p.academic)
  return (
    <>
      <SectionHeader section={sectionFor('/academy')!} />

      <Panel className="relative mb-6 overflow-hidden">
        <img src={education.images[0].src} alt={education.images[0].alt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        <div className="relative p-6 sm:p-8">
          <p className="font-game uppercase tracking-[0.2em] text-aether-light">Training grounds</p>
          <h2 className="mt-1 text-4xl leading-none sm:text-5xl"><Outlined>{education.school}</Outlined></h2>
          <p className="mt-3 font-game text-xl text-white">{education.degree}</p>
          <p className="font-game text-lg text-gold-light">Minor in {education.minor}</p>
          <p className="mt-2 font-extrabold text-mist">{education.period} · {education.location} · Graduated {education.graduation}</p>
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="p-5">
          <h3 className="game-text-sm mb-3 text-xl">Honors</h3>
          <ul className="space-y-2">
            {education.honors.map((h) => (
              <li key={h} className="flex items-center gap-2 font-extrabold"><span aria-hidden>🏅</span>{h}</li>
            ))}
          </ul>
          <h3 className="game-text-sm mb-2 mt-6 text-xl">Clubs</h3>
          <div className="flex flex-wrap gap-2">{education.clubs.map((c) => <Chip key={c}>{c}</Chip>)}</div>
          <h3 className="game-text-sm mb-2 mt-6 text-xl">Languages used in class</h3>
          <div className="flex flex-wrap gap-2">{education.technologies.map((c) => <Chip key={c} className="bg-violet">{c}</Chip>)}</div>
        </Panel>

        <Panel className="p-5">
          <h3 className="game-text-sm mb-3 text-xl">Relevant coursework</h3>
          {Object.entries(education.coursework).map(([area, list]) => (
            <div key={area} className="mb-4">
              <p className="mb-2 font-game text-sm uppercase tracking-widest text-aether-light">{area}</p>
              <div className="flex flex-wrap gap-2">{list.map((c) => <Chip key={c}>{c}</Chip>)}</div>
            </div>
          ))}
        </Panel>
      </div>

      <section className="mt-6">
        <h3 className="game-text-sm mb-3 text-xl uppercase tracking-wider">Academic projects</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {academic.map((p) => (
            <a key={p.title} href="#/achievements" className="panel block p-4 transition hover:-translate-y-1">
              <p className="game-text-sm text-lg">{p.title}</p>
              <p className="font-game text-sm text-aether-light">{p.context} · {p.period}</p>
              <p className="mt-2 text-sm leading-relaxed text-cream/85">{p.description[0]}</p>
            </a>
          ))}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {education.images.map((img) => (
          <img key={img.src} src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/3] w-full rounded-2xl border-[3px] border-ink object-cover" />
        ))}
      </div>
    </>
  )
}
