import { site } from '../data/site'

const SOCIALS = [
  {
    label: 'GitHub',
    href: site.links.github,
    path: 'M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.6-2.67-.31-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.7.8.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z',
  },
  {
    label: 'LinkedIn',
    href: site.links.linkedin,
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
  },
]

const Footer = ({ onNavigate }) => (
  <footer className="border-t border-line">
    <div
      className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
      style={{ paddingBottom: 'calc(3rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-xl font-semibold">{site.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{site.tagline}</p>

          <div className="mt-5 flex gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-muted
                           transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
            <a
              href={site.links.email}
              aria-label="Email"
              className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-muted
                         transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[18px] w-[18px]">
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="m3.5 7 8.5 6 8.5-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <nav className="flex flex-col gap-2.5">
          <p className="eyebrow mb-1">Pages</p>
          {site.nav.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate(item)}
              className="link-underline w-fit text-sm text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {site.name} · React, Vite &amp; Tailwind on GitHub Pages
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group w-fit font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          Back to top{' '}
          <span className="inline-block transition-transform duration-200 group-hover:-translate-y-1">↑</span>
        </button>
      </div>
    </div>
  </footer>
)

export default Footer
