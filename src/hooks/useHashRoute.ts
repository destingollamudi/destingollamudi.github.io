import { useEffect, useState } from 'react'
import { aliases } from '../routes'

/**
 * Hash routing on purpose: GitHub Pages serves static files, so a real
 * /profile URL 404s on refresh. /#/profile can't 404.
 */
const normalize = (hash: string) => {
  const path = hash.replace(/^#/, '').replace(/\/+$/, '')
  const clean = !path ? '/' : path.startsWith('/') ? path : `/${path}`
  return aliases[clean] ?? clean
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
