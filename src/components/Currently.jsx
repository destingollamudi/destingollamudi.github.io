import { manual, getNow } from '../data/currently'
import { useReveal } from '../hooks/useReveal'

const relative = (iso) => {
  if (!iso) return null
  const then = new Date(iso)
  if (Number.isNaN(then.getTime())) return null
  const mins = Math.round((Date.now() - then.getTime()) / 60000)
  if (mins < 2) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  return days === 1 ? 'yesterday' : `${days}d ago`
}

/** One live row: album art / cover / poster, title, subtitle. */
const Feed = ({ icon, label, item, subtitleKey }) => {
  const subtitle = item[subtitleKey] || item.meta || item.artist || item.author
  const body = (
    <>
      {item.image ? (
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="h-11 w-11 flex-none rounded-lg border border-line object-cover transition-transform duration-300 group-hover/row:scale-105"
        />
      ) : (
        <span className="grid h-11 w-11 flex-none place-items-center rounded-lg border border-line bg-surface2 text-muted">
          {icon}
        </span>
      )}
      <span className="min-w-0">
        <span className="eyebrow block">{label}</span>
        <span className="mt-0.5 block truncate text-sm font-medium text-ink">{item.title}</span>
        {subtitle && <span className="block truncate text-xs text-muted">{subtitle}</span>}
      </span>
    </>
  )

  const classes =
    'group/row flex items-center gap-3 rounded-xl p-2 -m-2 transition-colors hover:bg-surface2'

  return item.url ? (
    <a href={item.url} target="_blank" rel="noreferrer noopener" className={classes}>
      {body}
    </a>
  ) : (
    <div className={classes}>{body}</div>
  )
}

const Currently = () => {
  const [ref, shown] = useReveal()
  const now = getNow()
  const stamp = relative(now.updatedAt)

  return (
    <section
      ref={ref}
      aria-labelledby="currently-heading"
      className={`mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8 ${shown ? 'animate-rise-in' : 'opacity-0'}`}
    >
      <div className="card relative overflow-hidden p-6 sm:p-8">
        {/* Accent rail — the card should read as "alive" at a glance. */}
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-accent" />

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 id="currently-heading" className="flex items-center gap-2.5 font-display text-xl font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            Currently
          </h2>
          <p className="font-mono text-xs text-muted">
            {now.isLive && stamp ? `feeds refreshed ${stamp}` : 'feeds not connected yet'}
          </p>
        </div>

        {/* Hand-written lines. */}
        <dl className="grid gap-4 sm:grid-cols-3">
          {Object.values(manual).map((entry) => (
            <div key={entry.label}>
              <dt className="eyebrow">{entry.label}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink">
                {entry.href ? (
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline font-medium hover:text-accent"
                  >
                    {entry.value}
                  </a>
                ) : (
                  entry.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <hr className="my-6 border-line" />

        {/* Fed by scripts/fetch-now.mjs. */}
        <div className="grid gap-5 sm:grid-cols-3">
          <Feed
            label={now.music.nowPlaying ? 'Playing now' : 'Last played'}
            item={now.music}
            subtitleKey="artist"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path d="M9 18V6l11-2v12" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6.5" cy="18" r="2.5" />
                <circle cx="17.5" cy="16" r="2.5" />
              </svg>
            }
          />
          <Feed
            label="Reading"
            item={now.book}
            subtitleKey="author"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path
                  d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5Z"
                  strokeLinejoin="round"
                />
                <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H19v3H6.5" strokeLinejoin="round" />
              </svg>
            }
          />
          <Feed
            label="Last watched"
            item={now.film}
            subtitleKey="meta"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="M7 5v14M17 5v14M3 12h18" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  )
}

export default Currently
