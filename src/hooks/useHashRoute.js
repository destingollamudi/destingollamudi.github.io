import { useEffect, useState } from 'react'

/**
 * Hash routing on purpose.
 *
 * GitHub Pages serves static files — a real /uses URL 404s on refresh or on a
 * direct link unless you add a 404.html redirect hack. A hash can't 404, so
 * /#/uses just works, including when someone pastes the link.
 */
const normalize = (hash) => {
  const path = hash.replace(/^#/, '')
  if (!path || path === '/') return '/'
  return path.startsWith('/') ? path.replace(/\/+$/, '') || '/' : `/${path}`
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => normalize(window.location.hash))

  useEffect(() => {
    const onChange = () => setRoute(normalize(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

/** Scroll to the top whenever we switch pages — but not between anchors. */
export function useScrollToTopOnRouteChange(route) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route])
}

export default useHashRoute
