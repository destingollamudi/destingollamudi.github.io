import { useEffect, useState } from 'react'
import splash from '../assets/game/splash.jpg'
import keyart from '../assets/game/keyart.jpg'
import { Insignia } from './Insignia'
import { Outlined } from './ui'
import { INTRO_KEY } from '../intro'

const TIPS = [
  'Every section has a plain-English name under its game name.',
  'Looking for my contact info? It lives in Join My Clan.',
  'Projects are Achievements. Tech stack is the Card Collection.',
]

/**
 * Publisher splash → loading screen, once per session, about two seconds.
 * Purely decorative: skippable, and the site underneath is already rendered.
 */
export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'splash' | 'loading'>('splash')
  const [pct, setPct] = useState(0)
  const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)])

  useEffect(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* ignore */
    }
    const t1 = setTimeout(() => setPhase('loading'), 1100)
    const t2 = setTimeout(onDone, 2600)
    return () => (clearTimeout(t1), clearTimeout(t2))
  }, [onDone])

  useEffect(() => {
    if (phase !== 'loading') return
    const id = setInterval(() => setPct((p) => Math.min(100, p + 7)), 90)
    return () => clearInterval(id)
  }, [phase])

  return (
    <div className="fixed inset-0 z-50 cursor-pointer bg-ink" onClick={onDone} role="presentation">
      {phase === 'splash' ? (
        <div className="absolute inset-0 grid place-items-center bg-cover bg-center" style={{ backgroundImage: `url(${splash})` }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_30%,#0b0720_90%)]" />
          <div className="relative flex animate-rise flex-col items-center text-center">
            <Insignia size={150} className="drop-shadow-[0_0_40px_rgba(255,181,46,.7)]" />
            <p className="mt-6 font-brand text-4xl font-black leading-none tracking-[0.12em] text-gold-light drop-shadow-[0_3px_0_#120B26] sm:text-5xl">
              DESTIN
              <br />
              GOLLAMUDI
            </p>
            <p className="mt-3 font-brand text-sm font-bold tracking-[0.6em] text-gold-light/90">STUDIOS</p>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-cover bg-top" style={{ backgroundImage: `url(${keyart})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink" />
          <div className="absolute inset-x-0 top-[6vh] text-center">
            <p className="font-brand text-sm font-black tracking-[0.3em] text-gold-light drop-shadow-[0_2px_0_#120B26]">DESTIN GOLLAMUDI'S</p>
            <p className="text-6xl leading-none sm:text-7xl"><Outlined>SKYFORGE</Outlined></p>
            <p className="text-4xl tracking-[0.2em] sm:text-5xl"><Outlined fill="teal">SIEGE</Outlined></p>
          </div>
          <div className="absolute inset-x-0 bottom-10 mx-auto w-[min(90vw,26rem)] space-y-3 px-2">
            <div className="rounded-2xl border-2 border-gold bg-night/90 px-4 py-3 text-center">
              <p className="font-game text-sm tracking-widest text-gold">TIP</p>
              <p className="text-sm font-extrabold text-cream">{tip}</p>
            </div>
            <div className="relative h-8 rounded-full border-[3px] border-ink bg-[#0b0720]">
              <div className="absolute inset-y-0.5 left-0.5 rounded-full bg-gradient-to-b from-[#ffe98a] to-[#f08a0c] transition-[width]" style={{ width: `calc(${pct}% - 4px)` }} />
              <span className="game-text-sm absolute inset-0 grid place-items-center">{pct}%</span>
            </div>
            <p className="text-center font-game text-sm text-aether-light">Tap anywhere to skip</p>
          </div>
        </div>
      )}
    </div>
  )
}
