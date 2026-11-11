import { useCallback, useEffect, useRef } from 'react'
import { useHashRoute } from './hooks/useHashRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Uses from './pages/Uses'

function App() {
  const route = useHashRoute()

  // A section link clicked from /#/uses has to go home first and scroll after
  // the home page has actually mounted, so the target element exists.
  const pendingScroll = useRef(null)

  const scrollTo = useCallback((id) => {
    const node = document.getElementById(id)
    if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const onNavigate = useCallback(
    (item) => {
      const target = item.href ? item.href.replace('#', '') : '/'

      if (item.section) {
        if (route !== '/') {
          pendingScroll.current = item.section
          window.location.hash = '/'
        } else {
          scrollTo(item.section)
        }
        return
      }

      if (target === route) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      window.location.hash = target
    },
    [route, scrollTo],
  )

  useEffect(() => {
    if (route === '/' && pendingScroll.current) {
      const id = pendingScroll.current
      pendingScroll.current = null
      // One frame for the home page to paint before we measure it.
      requestAnimationFrame(() => scrollTo(id))
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [route, scrollTo])

  return (
    <div className="flex min-h-screen flex-col">
      <Header route={route} onNavigate={onNavigate} />
      <main className="flex-1">
        {route === '/uses' ? <Uses onNavigate={onNavigate} /> : <Home onNavigate={onNavigate} />}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  )
}

export default App
