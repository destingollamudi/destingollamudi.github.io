import { useEffect, useRef, useState } from 'react'

/**
 * Reveal-on-scroll.
 *
 * Takes primitives rather than an options object on purpose: a default `{}`
 * is a fresh reference on every render, so putting it in the dependency array
 * would tear down and rebuild the observer on each paint.
 *
 * Unobserves after the first intersection, so sections don't re-animate when
 * you scroll back up — that reads as a glitch, not a flourish.
 */
export function useReveal({ rootMargin = '0px 0px -10% 0px', threshold = 0.1 } = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || shown) return undefined

    // No IntersectionObserver (very old browser, some test envs): show it.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [shown, rootMargin, threshold])

  return [ref, shown]
}

export default useReveal
