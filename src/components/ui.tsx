import { useEffect, useRef, type ReactNode } from 'react'
import characters from '../assets/game/characters.jpg'
import type { Section } from '../routes'

type Tone = 'gold' | 'teal' | 'violet' | 'crimson'

/** Beveled game button. Renders a link when given href. */
export function GameButton({
  tone = 'gold',
  small,
  href,
  external,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled,
}: {
  tone?: Tone
  small?: boolean
  href?: string
  external?: boolean
  onClick?: () => void
  children: ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}) {
  const cls = `btn btn-${tone} ${small ? 'btn-sm' : ''} ${disabled ? 'pointer-events-none opacity-60' : ''} ${className}`
  if (href)
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}>
        {children}
      </a>
    )
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

/**
 * Outlined display text with a gradient fill. Stroke and background-clip
 * can't share one layer, so an ink-stroked copy sits under the gradient copy.
 */
export function Outlined({ children, fill = 'gold', className = '' }: { children: string; fill?: 'gold' | 'teal' | 'white'; className?: string }) {
  return (
    <span className={`relative inline-block font-display tracking-wide ${className}`}>
      <span
        aria-hidden
        className="absolute inset-0 text-ink"
        style={{ WebkitTextStroke: '0.14em #120B26', textShadow: '0 0.09em 0 #120B26' }}
      >
        {children}
      </span>
      <span className={`relative ${fill === 'white' ? 'text-white' : fill === 'teal' ? 'text-teal-grad' : 'text-gold-grad'}`}>{children}</span>
    </span>
  )
}

/** Page banner: the game name big, the plain meaning right under it. */
export function SectionHeader({ section, children }: { section: Section; children?: ReactNode }) {
  return (
    <header className="mb-6 animate-rise">
      <p className="font-game text-sm uppercase tracking-[0.2em] text-aether-light">
        <span aria-hidden>{section.icon}</span> {section.plain}
      </p>
      <h1 className="mt-1 text-4xl sm:text-5xl">
        <Outlined>{section.game}</Outlined>
      </h1>
      {children && <div className="mt-3 max-w-2xl text-base leading-relaxed text-cream/85">{children}</div>}
    </header>
  )
}

export function Panel({ children, className = '', tone = '' }: { children: ReactNode; className?: string; tone?: '' | 'violet' | 'dark' }) {
  return <div className={`panel ${tone ? `panel-${tone}` : ''} ${className}`}>{children}</div>
}

export function PlaceholderTag() {
  return <span className="placeholder-tag">✏️ placeholder</span>
}

export function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-lg border-2 border-ink bg-royal px-2 py-0.5 font-game text-xs text-cream ${className}`}>
      {children}
    </span>
  )
}

/** Molten-gold progress bar. `value` undefined = not set yet (placeholder). */
export function ProgressBar({ value, label }: { value?: number; label: string }) {
  const set = typeof value === 'number'
  const pct = set ? Math.max(0, Math.min(100, value)) : 0
  return (
    <div
      className="relative h-7 rounded-full border-[3px] border-ink bg-gradient-to-b from-[#0b0720] to-[#2a2160]"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={set ? pct : undefined}
      aria-valuetext={set ? `${pct}%` : 'progress not set yet'}
    >
      {set && (
        <div
          className="absolute inset-y-0.5 left-0.5 rounded-full bg-gradient-to-b from-[#ffe98a] to-[#f08a0c] shadow-[inset_0_3px_0_rgba(255,255,255,.6)]"
          style={{ width: `calc(${pct}% - 4px)`, minWidth: pct ? 16 : 0 }}
        />
      )}
      <span className="game-text-sm absolute inset-0 grid place-items-center text-sm">{set ? `${pct}%` : '✏️ set progress'}</span>
    </div>
  )
}

/** One of the 8 original characters from the Figma character sheet (4×2 grid). */
export function Portrait({ index, className = '', label }: { index: number; className?: string; label?: string }) {
  const col = index % 4
  const row = Math.floor(index / 4)
  return (
    <div
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
      style={{
        backgroundImage: `url(${characters})`,
        backgroundSize: '400% 200%',
        backgroundPosition: `${(col / 3) * 100}% ${row * 100}%`,
      }}
    />
  )
}

/** Native <dialog> styled as a game modal: gold ribbon, cream body, close X. */
export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="w-[min(92vw,30rem)] overflow-visible bg-transparent p-0 text-cream backdrop:bg-ink/75 backdrop:backdrop-blur-sm"
      aria-label={title}
    >
      <div className="panel relative">
        <div className="rounded-t-[21px] border-b-[3px] border-ink bg-gradient-to-b from-[#ffe07a] to-[#e8820c] px-12 pb-3 pt-2 text-center shadow-[inset_0_3px_0_rgba(255,255,255,.6)]">
          <h2 className="game-text text-2xl">{title}</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="btn btn-crimson btn-sm absolute -right-3 -top-3 h-10 w-10 !p-0 text-xl"
        >
          ×
        </button>
        <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>
      </div>
    </dialog>
  )
}

/** Expandable panel row built on <details> — keyboard + screen-reader friendly for free. */
export function Expandable({ summary, children, defaultOpen }: { summary: ReactNode; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group panel overflow-hidden" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center gap-4 p-4 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 flex-1">{summary}</div>
        <span
          aria-hidden
          className="btn btn-teal btn-sm shrink-0 transition-transform group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <div className="border-t-[3px] border-ink bg-night/60 p-4 sm:p-5">{children}</div>
    </details>
  )
}

export function Shelf({ title, children, note }: { title: string; children: ReactNode; note?: ReactNode }) {
  return (
    <section className="mb-8">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="game-text-sm text-xl uppercase tracking-wider">{title}</h2>
        {note && <p className="text-sm text-mist">{note}</p>}
      </div>
      {children}
    </section>
  )
}
