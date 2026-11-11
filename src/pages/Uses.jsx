import { uses, usesIntro } from '../data/uses'
import { site } from '../data/site'

const Uses = ({ onNavigate }) => (
  <section className="mx-auto max-w-3xl animate-rise-in px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
    <button
      type="button"
      onClick={() => onNavigate({ href: '#/' })}
      className="group mb-10 font-mono text-xs text-muted transition-colors hover:text-accent"
    >
      <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>{' '}
      back home
    </button>

    <p className="eyebrow">/uses</p>
    <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
      The actual toolkit
    </h1>
    <p className="mt-5 max-w-2xl leading-relaxed text-muted">{usesIntro}</p>

    <div className="mt-14 space-y-12">
      {uses.map((group) => (
        <section key={group.category}>
          <h2 className="flex items-center gap-4 font-display text-2xl font-semibold">
            {group.category}
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </h2>

          <dl className="mt-5 divide-y divide-line border-y border-line">
            {group.items.map((item) => (
              <div
                key={item.name}
                className="group grid gap-1 py-4 transition-colors hover:bg-surface2/60 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6"
              >
                <dt className="font-medium text-ink transition-transform duration-200 sm:group-hover:translate-x-1">
                  {item.name}
                </dt>
                <dd className="text-sm leading-relaxed text-muted">{item.note}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>

    <p className="mt-14 border-t border-line pt-6 text-sm leading-relaxed text-muted">
      Inspired by{' '}
      <a
        href="https://uses.tech"
        target="_blank"
        rel="noreferrer noopener"
        className="link-underline text-ink hover:text-accent"
      >
        uses.tech
      </a>
      . Think I&rsquo;m wrong about something on this list?{' '}
      <a href={site.links.email} className="link-underline text-ink hover:text-accent">
        Tell me
      </a>
      .
    </p>
  </section>
)

export default Uses
