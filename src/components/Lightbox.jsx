import { useEffect } from 'react'

/**
 * Shared full-screen image view for the experience cards and the gallery.
 * Escape closes it, and body scroll is locked while it's open so the page
 * behind doesn't drift.
 */
const Lightbox = ({ image, onClose }) => {
  useEffect(() => {
    if (!image) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [image, onClose])

  if (!image) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex animate-rise-in items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/25 text-2xl text-white transition-transform hover:scale-110"
        style={{ top: 'calc(env(safe-area-inset-top, 0px) + 1rem)' }}
      >
        &times;
      </button>

      <figure onClick={(event) => event.stopPropagation()} className="max-h-full">
        <img
          src={image.src}
          alt={image.alt}
          className="mx-auto max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl"
        />
        <figcaption className="mt-4 text-center text-sm text-white/70">
          {image.caption || image.alt}
        </figcaption>
      </figure>
    </div>
  )
}

export default Lightbox
