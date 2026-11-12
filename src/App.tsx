import { useCallback, useEffect, useState, type ComponentType } from 'react'
import { useHashRoute } from './hooks/useHashRoute'
import { Shell } from './components/Shell'
import { LoadingScreen } from './components/LoadingScreen'
import { shouldPlayIntro } from './intro'
import { sectionFor } from './routes'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Career from './pages/Career'
import Cards from './pages/Cards'
import Achievements from './pages/Achievements'
import Academy from './pages/Academy'
import Quests from './pages/Quests'
import Hobbies from './pages/Hobbies'
import Watchlist from './pages/Watchlist'
import Library from './pages/Library'
import World from './pages/World'
import Clan from './pages/Clan'

const PAGES: Record<string, ComponentType> = {
  '/': Home,
  '/profile': Profile,
  '/career': Career,
  '/cards': Cards,
  '/achievements': Achievements,
  '/academy': Academy,
  '/quests': Quests,
  '/hobbies': Hobbies,
  '/watchlist': Watchlist,
  '/library': Library,
  '/world': World,
  '/clan': Clan,
}

export default function App() {
  const route = useHashRoute()
  const [intro, setIntro] = useState(shouldPlayIntro)
  const endIntro = useCallback(() => setIntro(false), [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const s = sectionFor(route)
    document.title = s ? `${s.plain} · Destin Gollamudi` : 'Destin Gollamudi — Software Engineer'
  }, [route])

  const Page = PAGES[route] ?? Home

  return (
    <>
      <Shell route={route}>
        <Page />
      </Shell>
      {intro && <LoadingScreen onDone={endIntro} />}
    </>
  )
}
