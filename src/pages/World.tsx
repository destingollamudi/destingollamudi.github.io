import { world } from '../data/world'
import { feeds } from '../data/feeds'
import { sectionFor } from '../routes'
import { Panel, PlaceholderTag, SectionHeader } from '../components/ui'

export default function World() {
  const track = feeds.music
  return (
    <>
      <SectionHeader section={sectionFor('/world')!}>Everything else that makes up my corner of the map.</SectionHeader>
      <div className="columns-1 gap-4 md:columns-2 xl:columns-3">
        {world.map((g) => (
          <Panel key={g.title} className="mb-4 break-inside-avoid p-5">
            <h2 className="game-text-sm mb-3 flex items-center gap-2 text-xl">
              <span aria-hidden>{g.emoji}</span> {g.title}
            </h2>
            {g.title === 'Music' && track && (
              <a href={track.url ?? undefined} target="_blank" rel="noreferrer noopener" className="inset-well mb-3 flex items-center gap-3 p-2">
                {track.image && <img src={track.image} alt="" className="h-12 w-12 rounded-lg border-2 border-ink" />}
                <span className="min-w-0">
                  <span className="block font-game text-xs uppercase tracking-widest text-aether-light">Last played</span>
                  <span className="block truncate font-extrabold">{track.title}</span>
                  <span className="block truncate text-sm text-mist">{track.artist}</span>
                </span>
              </a>
            )}
            <ul className="space-y-2">
              {g.items.map((i) => (
                <li key={i.name}>
                  {i.href ? (
                    <a href={i.href} target="_blank" rel="noreferrer noopener" className="font-extrabold underline decoration-gold decoration-2 underline-offset-4">{i.name}</a>
                  ) : (
                    <span className="font-extrabold">{i.name}</span>
                  )}
                  {i.note && <span className="block text-sm text-mist">{i.note}</span>}
                  {i.placeholder && <span className="ml-2"><PlaceholderTag /></span>}
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
    </>
  )
}
