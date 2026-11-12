import { useState } from 'react'
import { hobbies } from '../data/hobbies'
import { gallery } from '../data/gallery'
import { sectionFor } from '../routes'
import { Modal, PlaceholderTag, SectionHeader, Shelf } from '../components/ui'

export default function Hobbies() {
  const [photo, setPhoto] = useState<(typeof gallery)[number] | null>(null)
  return (
    <>
      <SectionHeader section={sectionFor('/hobbies')!}>The non-work side: what I play, follow, and do on weekends.</SectionHeader>

      <Shelf title="Collectibles">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {hobbies.map((h) => (
            <li key={h.name}>
              <div className="frame-rare h-full rounded-3xl border-[3px] border-ink p-1.5 shadow-[0_4px_0_#120B26]">
                <div className="flex h-full flex-col items-center rounded-[18px] border-2 border-ink bg-gradient-to-b from-[#2a2160] to-ink p-4 text-center">
                  <span aria-hidden className="grid h-20 w-20 place-items-center rounded-full border-[3px] border-ink bg-[radial-gradient(circle_at_50%_35%,#ffe29a,#c9701a)] text-5xl shadow-[inset_0_4px_0_rgba(255,255,255,.5)]">
                    {h.emoji}
                  </span>
                  <h2 className="game-text-sm mt-3 text-lg">{h.name}</h2>
                  {h.blurb && <p className="mt-1 flex-1 text-sm leading-relaxed text-cream/85">{h.blurb}</p>}
                  {h.placeholder && <span className="mt-2"><PlaceholderTag /></span>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Shelf>

      <Shelf title="Highlights" note="Tap a photo to expand it.">
        <ul className="columns-2 gap-4 md:columns-3">
          {gallery.map((g) => (
            <li key={g.src} className="mb-4 break-inside-avoid">
              <button onClick={() => setPhoto(g)} className="panel block w-full overflow-hidden text-left transition hover:-translate-y-1">
                <span className="relative block">
                  <img src={g.src} alt={g.alt} loading="lazy" className="w-full border-b-[3px] border-ink object-cover" />
                  {g.video && (
                    <span aria-hidden className="btn btn-crimson absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">▶</span>
                  )}
                </span>
                <span className="game-text-sm block px-3 py-2 text-sm">{g.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      </Shelf>

      <Modal open={!!photo} onClose={() => setPhoto(null)} title={photo?.caption ?? ''}>
        {photo && (
          <>
            {photo.video ? (
              <div className="mx-auto mb-3 aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-2xl border-[3px] border-ink bg-ink">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${photo.video.id}`}
                  title={photo.caption}
                  className="h-full w-full"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img src={photo.src} alt={photo.alt} className="mb-3 w-full rounded-2xl border-[3px] border-ink" />
            )}
            <p className="leading-relaxed">{photo.detail}</p>
            {photo.video && (
              <a href={photo.video.href} target="_blank" rel="noreferrer noopener" className="btn btn-teal btn-sm mt-3">
                Watch on YouTube
              </a>
            )}
          </>
        )}
      </Modal>
    </>
  )
}
