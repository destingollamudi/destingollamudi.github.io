import { useEffect, useState } from 'react'
import { workExperience } from '../data/workExperience'
import { education } from '../data/education'
import { projects } from '../data/projects'
import { useReveal } from '../hooks/useReveal'
import Lightbox from './Lightbox'

const TABS = [
  { id: 'work', label: 'Work', data: workExperience },
  { id: 'education', label: 'School', data: education },
  { id: 'projects', label: 'Projects', data: projects },
]

/** Small captioned carousel used inside each card. */
const CardImages = ({ images, onOpen }) => {
  const [index, setIndex] = useState(0)

  // Auto-advance, but only when there's more than one frame to show.
  useEffect(() => {
    if (images.length < 2) return undefined
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000)
    return () => clearInterval(timer)
  }, [images.length])

  if (!images.length) return null
  const current = images[index]

  return (
    <div className="group/img relative aspect-[16/9] overflow-hidden rounded-xl border border-line bg-surface2">
      <button
        type="button"
        onClick={() => onOpen(current)}
        className="absolute inset-0 h-full w-full cursor-zoom-in"
        aria-label={`Open full size: ${current.alt}`}
      >
        {images.map((image, i) => (
          <img
            key={image.src}
            src={image.src}
            alt={i === index ? image.alt : ''}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
              i === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
            } group-hover/img:scale-[1.04]`}
          />
        ))}
      </button>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              className={`h-1.5 rounded-full bg-white transition-all duration-300 ${
                i === index ? 'w-6 opacity-100' : 'w-1.5 opacity-50 hover:opacity-80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const Card = ({ item }) => (
  <article className="card group p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-ink/5 sm:p-7">
    <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
      <div className="space-y-5">
        <CardImages images={item.images || []} onOpen={item.onOpen} />
        <div>
          <p className="eyebrow">{item.period}</p>
          <h3 className="mt-2 font-display text-2xl font-semibold leading-snug">{item.title}</h3>
          {item.company && <p className="mt-1 text-sm font-medium text-accent">{item.company}</p>}
          {item.location && <p className="mt-0.5 text-sm text-muted">{item.location}</p>}
        </div>
      </div>

      <div className="space-y-5">
        <ul className="space-y-2.5">
          {item.description.map((line) => (
            <li key={line} className="flex gap-3 text-sm leading-relaxed text-ink/90">
              <span className="mt-[0.45rem] h-1.5 w-1.5 flex-none rounded-full bg-accent" />
              {line}
            </li>
          ))}
        </ul>

        {/* The candid part — why, and what went wrong. */}
        {(item.why || item.roadblock || item.note) && (
          <div className="space-y-3 rounded-xl border border-dashed border-line bg-surface2/60 p-4">
            {item.why && (
              <p className="text-sm leading-relaxed text-muted">
                <span className="eyebrow mr-2">Why</span>
                {item.why}
              </p>
            )}
            {(item.roadblock || item.note) && (
              <p className="text-sm leading-relaxed text-muted">
                <span className="eyebrow mr-2">{item.roadblock ? 'What went wrong' : 'Honestly'}</span>
                {item.roadblock || item.note}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="tag transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              {tech}
            </span>
          ))}
        </div>

        {item.links?.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-1">
            {item.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline text-sm font-semibold text-accent"
              >
                {link.label} &rarr;
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  </article>
)

const Experience = () => {
  const [tab, setTab] = useState('work')
  const [lightbox, setLightbox] = useState(null)
  const [ref, shown] = useReveal()

  const active = TABS.find((t) => t.id === tab)

  return (
    <section id="experience" ref={ref} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className={shown ? 'animate-rise-in' : 'opacity-0'}>
        <p className="eyebrow">The long version</p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          How I got here
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Written the way I&rsquo;d actually explain it — including the parts where I got it wrong
          first.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Experience sections"
        className="mt-9 inline-flex rounded-xl border border-line bg-surface p-1"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 sm:px-5 ${
              tab === t.id
                ? 'bg-accent text-white shadow-sm'
                : 'text-muted hover:-translate-y-px hover:text-accent'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div key={tab} className="mt-8 animate-rise-in space-y-6">
        {active.data.map((item) => (
          <Card key={item.title} item={{ ...item, onOpen: setLightbox }} />
        ))}
      </div>

      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
    </section>
  )
}

export default Experience
