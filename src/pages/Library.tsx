import { favoriteBooks } from '../data/library'
import { feeds, type FeedBook } from '../data/feeds'
import { sectionFor } from '../routes'
import { PlaceholderTag, SectionHeader, Shelf } from '../components/ui'

interface Shown {
  title: string
  author?: string | null
  image?: string | null
  url?: string | null
  stars?: string | null
  thoughts?: string | null
  status?: string
  placeholder?: boolean
}

function BookCard({ b }: { b: Shown }) {
  const cover = (
    <span className="relative block aspect-[2/3] w-24 shrink-0 overflow-hidden rounded-r-xl rounded-l-sm border-[3px] border-ink bg-gradient-to-br from-[#c99cff] to-[#3b1a8a] shadow-[4px_4px_0_#120B26] sm:w-28">
      {b.image ? (
        <img src={b.image} alt={`Cover of ${b.title}`} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <span className="grid h-full place-items-center p-2 text-center font-game text-xs text-white">{b.title}</span>
      )}
      <span aria-hidden className="absolute inset-y-0 left-0 w-2 bg-ink/40" />
    </span>
  )
  return (
    <li className={`panel flex gap-4 p-4 ${b.placeholder ? 'is-placeholder' : ''}`}>
      {b.url ? <a href={b.url} target="_blank" rel="noreferrer noopener" aria-label={`${b.title} on Hardcover`}>{cover}</a> : cover}
      <div className="min-w-0">
        <h3 className="game-text-sm text-lg leading-tight">{b.title}</h3>
        {b.author && <p className="font-game text-sm text-aether-light">{b.author}</p>}
        {b.status && <p className="mt-1 inline-block rounded-lg border-2 border-ink bg-[#0e93aa] px-2 font-game text-xs">{b.status}</p>}
        {b.stars && <p className="mt-1 font-game text-gold">{b.stars}</p>}
        {b.thoughts && <p className="mt-2 text-sm leading-relaxed text-cream/85">{b.thoughts}</p>}
        {b.placeholder && <p className="mt-2"><PlaceholderTag /></p>}
      </div>
    </li>
  )
}

const fromFeed = (b: FeedBook, status?: string): Shown => ({ ...b, thoughts: b.review, status })

export default function Library() {
  return (
    <>
      <SectionHeader section={sectionFor('/library')!}>
        Currently reading and recently finished update automatically from Hardcover.
      </SectionHeader>

      <Shelf title="Currently reading">
        {feeds.reading.length ? (
          <ul className="grid gap-4 md:grid-cols-2">
            {/* shortcut: status only, no page progress; Hardcover has user_book_reads.progress if wanted. */}
            {feeds.reading.map((b) => <BookCard key={b.title} b={fromFeed(b, 'In progress')} />)}
          </ul>
        ) : (
          <p className="panel panel-dark p-4 font-bold text-mist">Hardcover isn't connected yet — current reads will appear here automatically.</p>
        )}
      </Shelf>

      <Shelf title="Recently finished">
        {feeds.read.length ? (
          <ul className="grid gap-4 md:grid-cols-2">{feeds.read.slice(0, 6).map((b) => <BookCard key={b.title} b={fromFeed(b)} />)}</ul>
        ) : (
          <p className="panel panel-dark p-4 font-bold text-mist">Finished books from the Hardcover “read” shelf will land here.</p>
        )}
      </Shelf>

      {favoriteBooks.length > 0 && (
        <Shelf title="Favorites">
          <ul className="grid gap-4 md:grid-cols-2">
            {favoriteBooks.map((b) => <BookCard key={b.title} b={{ ...b, image: b.cover, url: b.href }} />)}
          </ul>
        </Shelf>
      )}
    </>
  )
}
