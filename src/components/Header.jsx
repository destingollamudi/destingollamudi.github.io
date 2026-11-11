import { useEffect, useState } from 'react'
import { site } from '../data/site'
import ThemeToggle from './ThemeToggle'

const Header = ({ route, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the page changes under it.
  useEffect(() => setMenuOpen(false), [route])

  const handle = (item) => {
    setMenuOpen(false)
    onNavigate(item)
  }

  const isActive = (item) => (item.section ? false : route === item.href.replace('#', ''))

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => handle({ href: '#/', section: 'hero' })}
          className="group font-display text-lg font-semibold tracking-tight"
        >
          <span className="transition-colors group-hover:text-accent">Destin</span>
          <span className="text-accent transition-transform duration-300 group-hover:inline-block group-hover:translate-x-0.5">
            .
          </span>
          <span className="text-muted transition-colors group-hover:text-ink">Gollamudi</span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handle(item)}
              className={`link-underline text-sm font-medium transition-colors hover:text-accent ${
                isActive(item) ? 'text-accent' : 'text-muted'
              }`}
            >
              {item.label}
            </button>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface"
          >
            <span className="relative block h-4 w-5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="absolute left-0 block h-0.5 w-5 rounded bg-ink transition-all duration-300"
                  style={{
                    top: menuOpen ? '7px' : `${i * 7}px`,
                    transform: menuOpen
                      ? `rotate(${i === 0 ? 45 : i === 2 ? -45 : 45}deg)`
                      : 'none',
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </span>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-line bg-bg/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
          {site.nav.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handle(item)}
              className="border-b border-line/60 py-3 text-left text-sm font-medium text-muted last:border-0 hover:text-accent"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
