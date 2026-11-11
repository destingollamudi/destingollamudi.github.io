import { useEffect, useState } from 'react'
import { site } from '../data/site'
import portrait from '../assets/selfie.jpeg'
import portraitAlt from '../assets/viste3.jpg'

/** Typewriter for the rotating subtitle. Rewritten from the original, which
 *  left a stray setTimeout running on unmount during the pause. */
function useTypewriter(words, { typeMs = 80, deleteMs = 40, holdMs = 1800 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]

    if (!deleting && text === word) {
      const timer = setTimeout(() => setDeleting(true), holdMs)
      return () => clearTimeout(timer)
    }

    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return undefined
    }

    const timer = setTimeout(
      () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
      deleting ? deleteMs : typeMs,
    )
    return () => clearTimeout(timer)
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs])

  return text
}

const Hero = ({ onNavigate }) => {
  const typed = useTypewriter(site.rotatingWords)

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Soft bloom behind the portrait. Decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.15fr_1fr] md:py-24 lg:px-8">
        <div className="animate-rise-in">
          <p className="eyebrow mb-5">{site.location} · {site.role}</p>

          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Hi, I&rsquo;m{' '}
            <span className="relative inline-block">
              <span className="relative z-10">{site.firstName}</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-1 z-0 h-3 -skew-x-6 bg-accent/30"
              />
            </span>
          </h1>

          <p className="mt-4 h-7 font-mono text-sm text-accent sm:text-base">
            {typed}
            <span className="animate-blink">_</span>
          </p>

          {/* The tagline. Specific on purpose. */}
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/90 sm:text-xl">
            {site.tagline}
          </p>

          <p className="mt-4 max-w-xl leading-relaxed text-muted">{site.intro}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate({ section: 'experience' })}
              className="btn-primary"
            >
              What I&rsquo;ve built
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ section: 'contact' })}
              className="btn-ghost"
            >
              Say hello
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ href: '#/uses' })}
              className="btn-ghost"
            >
              What I use
            </button>
          </div>
        </div>

        {/* Portrait with a hover swap. Hover the photo and you get the version
            of me that is not wearing a collared shirt. */}
        <div className="flex justify-center md:justify-end">
          <figure className="group relative w-64 sm:w-80">
            <div className="relative aspect-[4/5] w-full animate-float overflow-hidden rounded-[2rem] border border-line shadow-2xl shadow-ink/10">
              <img
                src={portrait}
                alt="Destin Gollamudi"
                width="1536"
                height="2048"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
              />
              <img
                src={portraitAlt}
                alt="Destin volunteering at a food bank on a Publix Serves day"
                width="960"
                height="1280"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
              />
            </div>

            <figcaption
              className="pointer-events-none absolute -bottom-3 left-1/2 w-max max-w-[15rem] -translate-x-1/2 translate-y-1
                         rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-muted opacity-0
                         shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            >
              ↑ the pallet jack said no riding
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export default Hero
