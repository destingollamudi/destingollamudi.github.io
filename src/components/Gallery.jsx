import { useState } from 'react'
import { gallery } from '../data/gallery'
import { useReveal } from '../hooks/useReveal'
import Lightbox from './Lightbox'

/** Masonry footprints. Kept out of the data file so the content stays content. */
const SPAN = {
  tall: 'sm:row-span-2 aspect-[3/4] sm:aspect-auto',
  wide: 'sm:col-span-2 aspect-[16/10]',
}

const Gallery = () => {
  const [open, setOpen] = useState(null)
  const [ref, shown] = useReveal()

  return (
    <section
      id="gallery"
      ref={ref}
      className="scroll-mt-24 border-y border-line bg-surface2/40 py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={shown ? 'animate-rise-in' : 'opacity-0'}>
          <p className="eyebrow">Off the clock</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Behind the scenes
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            None of this is a deliverable. Hover anything for the caption.
          </p>
        </div>

        <div className="mt-10 grid auto-rows-[13rem] grid-cols-1 gap-4 sm:grid-cols-3">
          {gallery.map((photo, i) => (
            <figure
              key={photo.src}
              className={`group relative cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-surface
                          transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10
                          ${SPAN[photo.span] || ''} ${shown ? 'animate-rise-in' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 70}ms` }}
              onClick={() => setOpen(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Caption rides in from the bottom on hover; always visible on
                  touch, where there is no hover to speak of. */}
              <figcaption
                className="absolute inset-x-0 bottom-0 translate-y-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent
                           p-4 text-white transition-all duration-300 sm:translate-y-2 sm:opacity-0
                           sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
              >
                <p className="font-display text-base font-semibold leading-tight">{photo.caption}</p>
                <p className="mt-1 text-xs leading-snug text-white/75">{photo.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <Lightbox image={open} onClose={() => setOpen(null)} />
    </section>
  )
}

export default Gallery
