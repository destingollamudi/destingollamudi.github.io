import { useEffect, useState, type ReactNode } from 'react'
import { sections } from '../routes'
import { site } from '../data/site'
import { feeds } from '../data/feeds'
import { Insignia } from './Insignia'

const groups = ['Play', 'Professional', 'Personal', 'Contact'] as const

function NavList({ route, onPick }: { route: string; onPick?: () => void }) {
  return (
    <nav aria-label="Sections">
      <a
        href="#/"
        onClick={onPick}
        aria-current={route === '/' ? 'page' : undefined}
        className="mb-3 flex items-center gap-3 rounded-2xl border-[3px] border-ink px-3 py-2 font-game text-lg aria-[current=page]:bg-gradient-to-b aria-[current=page]:from-[#ffe07a] aria-[current=page]:to-[#f28a0c] aria-[current=page]:text-white bg-royal/60 hover:bg-royal"
      >
        <span aria-hidden>🏰</span> Home
      </a>
      {groups.map((g) => (
        <div key={g} className="mb-3">
          <p className="mb-1 px-1 font-game text-xs uppercase tracking-[0.2em] text-mist">{g}</p>
          <ul className="space-y-1.5">
            {sections
              .filter((s) => s.group === g)
              .map((s) => (
                <li key={s.path}>
                  <a
                    href={`#${s.path}`}
                    onClick={onPick}
                    aria-current={route === s.path ? 'page' : undefined}
                    className="group flex items-center gap-3 rounded-2xl border-[3px] border-ink bg-night/80 px-3 py-1.5 transition hover:bg-royal aria-[current=page]:border-gold aria-[current=page]:bg-gradient-to-b aria-[current=page]:from-[#6e6af0] aria-[current=page]:to-[#2d2a8f] aria-[current=page]:shadow-[0_0_14px_rgba(255,181,46,.45)]"
                  >
                    <span aria-hidden className="text-xl">{s.icon}</span>
                    <span className="min-w-0 leading-tight">
                      <span className="block font-game text-[15px] text-white">{s.game}</span>
                      <span className="block text-xs font-bold text-mist group-aria-[current=page]:text-gold-light">{s.plain}</span>
                    </span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

/** Five big thumbs-reachable tabs on mobile; "Menu" opens every section. */
const MOBILE_TABS = [
  { path: '/', label: 'Home', icon: '🏰' },
  { path: '/profile', label: 'About', icon: '🛡️' },
  { path: '/achievements', label: 'Projects', icon: '🏆' },
  { path: '/clan', label: 'Contact', icon: '✉️' },
]

export function Shell({ route, children }: { route: string; children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMenuOpen(false), [route])
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 btn btn-gold btn-sm">
        Skip to content
      </a>

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b-[3px] border-ink bg-gradient-to-b from-night to-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2">
          <a href="#/" className="flex items-center gap-2" aria-label={`${site.name} — home`}>
            <Insignia size={38} />
            <span className="leading-none">
              <span className="block font-brand text-[15px] font-black tracking-[0.12em] text-gold-light sm:text-lg">DESTIN GOLLAMUDI</span>
              <span className="block font-game text-xs text-aether-light">{site.shortTitle} · {site.employer}</span>
            </span>
          </a>
          <div className="ml-auto flex items-center gap-2">
            <a href={site.links.github} target="_blank" rel="noreferrer noopener" className="btn btn-violet btn-sm hidden sm:inline-flex">GitHub</a>
            <a href={site.links.linkedin} target="_blank" rel="noreferrer noopener" className="btn btn-teal btn-sm hidden sm:inline-flex">LinkedIn</a>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 pb-28 pt-6 lg:pb-12">
        {/* Desktop rail */}
        <aside className="sticky top-[76px] hidden max-h-[calc(100vh-90px)] w-64 shrink-0 overflow-y-auto pb-6 pr-1 lg:block">
          <NavList route={route} />
        </aside>

        <main id="main" className="min-w-0 flex-1" key={route}>
          {children}
          <footer className="mt-16 border-t-2 border-royal/60 pt-6 text-center text-xs text-mist">
            <p className="font-brand tracking-[0.25em] text-gold-light/80">DESTIN GOLLAMUDI STUDIOS</p>
            <p className="mt-1">
              Original art and characters · React + TypeScript on GitHub Pages
              {feeds.updatedAt && <> · feeds refreshed {new Date(feeds.updatedAt).toLocaleDateString()}</>}
            </p>
          </footer>
        </main>
      </div>

      {/* Mobile menu sheet */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="All sections">
          <button className="absolute inset-0 bg-ink/75 backdrop-blur-sm" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
          <div id="mobile-menu" className="panel absolute inset-x-3 bottom-24 top-20 overflow-y-auto p-4">
            <NavList route={route} onPick={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Mobile bottom tabs */}
      <nav aria-label="Quick tabs" className="fixed inset-x-0 bottom-0 z-30 border-t-[3px] border-ink bg-gradient-to-b from-royal to-ink px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 lg:hidden">
        <ul className="mx-auto grid max-w-md grid-cols-5 gap-1.5">
          {MOBILE_TABS.map((t) => (
            <li key={t.path}>
              <a
                href={`#${t.path}`}
                aria-current={route === t.path ? 'page' : undefined}
                className="flex flex-col items-center rounded-xl border-2 border-ink bg-night/80 py-1.5 font-game text-xs text-mist aria-[current=page]:border-gold aria-[current=page]:bg-gradient-to-b aria-[current=page]:from-[#6e6af0] aria-[current=page]:to-[#2d2a8f] aria-[current=page]:text-gold-light"
              >
                <span aria-hidden className="text-xl leading-none">{t.icon}</span>
                {t.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              className="flex w-full flex-col items-center rounded-xl border-2 border-ink bg-night/80 py-1.5 font-game text-xs text-mist"
            >
              <span aria-hidden className="text-xl leading-none">☰</span>
              More
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
