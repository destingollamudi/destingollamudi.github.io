import { useState } from 'react'
import { watchlist, type Watch } from '../data/watchlist'
import { feeds } from '../data/feeds'
import { sectionFor } from '../routes'
import { Modal, PlaceholderTag, SectionHeader, Shelf } from '../components/ui'

interface PosterItem extends Watch {
  stars?: string | null
  review?: string | null
  meta?: string
}

function Poster({ item, onOpen }: { item: PosterItem; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className={`group block w-full text-left ${item.placeholder ? 'is-placeholder rounded-2xl' : ''}`}>
      <span className="relative block aspect-[2/3] overflow-hidden rounded-2xl border-[3px] border-ink bg-gradient-to-b from-violet to-night shadow-[0_4px_0_#120B26] transition group-hover:-translate-y-1">
        {item.poster ? (
          <img src={item.poster} alt={`Poster for ${item.title}`} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <span className="grid h-full place-items-center p-3 text-center">
            <span className="game-text-sm text-base">{item.title}</span>
          </span>
        )}
        {item.stars && (
          <span className="absolute bottom-1.5 left-1.5 rounded-lg border-2 border-ink bg-ink/80 px-1.5 font-game text-xs text-gold">{item.stars}</span>
        )}
      </span>
      <span className="mt-1.5 block truncate font-game text-sm text-white">{item.title}</span>
      {item.meta && <span className="block truncate text-xs font-bold text-mist">{item.meta}</span>}
    </button>
  )
}

function Row({ items, onOpen }: { items: PosterItem[]; onOpen: (i: PosterItem) => void }) {
  return (
    <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
      {items.map((i, n) => (
        <li key={i.title + n}><Poster item={i} onOpen={() => onOpen(i)} /></li>
      ))}
    </ul>
  )
}

export default function Watchlist() {
  const [tab, setTab] = useState<'movies' | 'tv'>('movies')
  const [open, setOpen] = useState<PosterItem | null>(null)

  const recentFilms: PosterItem[] = feeds.films.slice(0, 6).map((f) => ({
    title: f.title,
    year: f.year ?? undefined,
    poster: f.image ?? undefined,
    href: f.url ?? undefined,
    stars: f.stars,
    review: f.review,
    meta: [f.year, f.rewatch ? 'rewatch' : null, f.watchedAt && `watched ${f.watchedAt}`].filter(Boolean).join(' · '),
  }))

  return (
    <>
      <SectionHeader section={sectionFor('/watchlist')!} />
      <div role="tablist" aria-label="Watchlist" className="mb-6 inline-flex rounded-2xl border-[3px] border-ink bg-ink p-1">
        {(['movies', 'tv'] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-xl px-5 py-1.5 font-game text-lg ${tab === t ? 'bg-gradient-to-b from-[#ffe07a] to-[#f28a0c] text-white [-webkit-text-stroke:.14em_#120B26] [paint-order:stroke_fill]' : 'text-mist'}`}
          >
            {t === 'movies' ? '🎬 Movies' : '📺 Television'}
          </button>
        ))}
      </div>

      {tab === 'movies' ? (
        <>
          <Shelf title="Currently watching" note={feeds.films.length ? 'Live from my Letterboxd diary' : undefined}>
            {recentFilms.length ? (
              <Row items={recentFilms} onOpen={setOpen} />
            ) : (
              <p className="panel panel-dark p-4 font-bold text-mist">Letterboxd isn't connected yet — recent watches will appear here automatically.</p>
            )}
          </Shelf>
          {watchlist.movies.favorites.length > 0 && <Shelf title="Favorites"><Row items={watchlist.movies.favorites} onOpen={setOpen} /></Shelf>}
          {watchlist.movies.allTime.length > 0 && <Shelf title="All-time favorites"><Row items={watchlist.movies.allTime} onOpen={setOpen} /></Shelf>}
        </>
      ) : (
        <>
          {watchlist.tv.current.length > 0 && <Shelf title="Currently watching"><Row items={watchlist.tv.current} onOpen={setOpen} /></Shelf>}
          {watchlist.tv.favorites.length > 0 && <Shelf title="Favorites"><Row items={watchlist.tv.favorites} onOpen={setOpen} /></Shelf>}
          {watchlist.tv.allTime.length > 0 && <Shelf title="All-time favorites"><Row items={watchlist.tv.allTime} onOpen={setOpen} /></Shelf>}
        </>
      )}

      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.title ?? ''}>
        {open && (
          <div className="space-y-3">
            {open.placeholder && <PlaceholderTag />}
            {open.meta && <p className="font-game text-aether-light">{open.meta}</p>}
            {open.stars && <p className="font-game text-xl text-gold">{open.stars}</p>}
            <p className="leading-relaxed">{open.review ?? open.note ?? 'No notes yet.'}</p>
            {open.href && (
              <a href={open.href} target="_blank" rel="noreferrer noopener" className="btn btn-teal btn-sm">
                View on Letterboxd
              </a>
            )}
          </div>
        )}
      </Modal>
    </>
  )
}
