import { useEffect, useState } from 'react'
import arena from '../assets/game/arena.jpg'
import selfie from '../assets/selfie.jpeg'
import { questions, shuffle, crowns, ROUND_SIZE, type Question } from '../data/quiz'
import { sectionFor } from '../routes'
import { GameButton, Outlined, Panel, Portrait, SectionHeader } from '../components/ui'

const OPPONENTS = ['Ironvale Raider', 'Quillbeard', 'Nyx of the Vale', 'Copperjaw', 'Emberwick']

interface Round {
  qs: (Question & { options: string[] })[]
  opponent: { name: string; art: number }
}

const newRound = (): Round => ({
  qs: shuffle(questions)
    .slice(0, ROUND_SIZE)
    .map((q) => ({ ...q, options: shuffle([q.answer, ...q.wrong]) })),
  opponent: { name: OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)], art: 1 + Math.floor(Math.random() * 7) },
})

/** Three towers, two hits each. `hits` = damage taken. */
function Towers({ hits, side }: { hits: number; side: 'you' | 'enemy' }) {
  const color = side === 'you' ? 'from-[#8fc2ff] to-[#2f6be6]' : 'from-[#ff9a9a] to-[#d3263c]'
  return (
    <div className="flex justify-center gap-3" aria-label={`${side === 'you' ? 'Your' : 'Enemy'} towers: ${3 - crowns(hits)} of 3 standing`}>
      {[0, 1, 2].map((t) => {
        const hp = Math.max(0, 2 - Math.max(0, hits - t * 2))
        return (
          <div key={t} className={`flex flex-col items-center ${hp === 0 ? 'opacity-40 grayscale' : ''}`}>
            <span aria-hidden className="text-3xl">{hp === 0 ? '💥' : t === 1 ? '🏰' : '🗼'}</span>
            <span className="mt-1 flex h-3 w-14 overflow-hidden rounded-full border-2 border-ink bg-ink">
              <span className={`h-full bg-gradient-to-b ${color}`} style={{ width: `${hp * 50}%` }} />
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function Quiz() {
  const [phase, setPhase] = useState<'lobby' | 'queue' | 'found' | 'battle' | 'result'>('lobby')
  const [round, setRound] = useState<Round>(newRound)
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [results, setResults] = useState<boolean[]>([])

  // Matchmaking: a short queue, then the opponent reveal, then the battle.
  useEffect(() => {
    if (phase === 'queue') {
      const t = setTimeout(() => setPhase('found'), 1800)
      return () => clearTimeout(t)
    }
    if (phase === 'found') {
      const t = setTimeout(() => setPhase('battle'), 1600)
      return () => clearTimeout(t)
    }
  }, [phase])

  const start = () => {
    setRound(newRound())
    setI(0)
    setPicked(null)
    setResults([])
    setPhase('queue')
  }

  const q = round.qs[i]
  const right = results.filter(Boolean).length
  const wrong = results.length - right
  const yourCrowns = crowns(right)
  const theirCrowns = crowns(wrong)

  const answer = (option: string) => {
    if (picked) return
    setPicked(option)
    setResults((r) => [...r, option === q.answer])
  }
  const next = () => {
    if (i + 1 >= round.qs.length) setPhase('result')
    else {
      setI(i + 1)
      setPicked(null)
    }
  }

  return (
    <>
      <SectionHeader section={sectionFor('/quiz')!}>
        Queue up for a {ROUND_SIZE}-question battle about my life. Every right answer hits an enemy tower — every wrong one hits yours.
      </SectionHeader>

      <Panel className="overflow-hidden">
        {/* Dim baked into one background (no stacked translucent layers), so tall result lists can't show raw art. */}
        <div
          className="min-h-[460px] bg-cover bg-center p-5 sm:p-8"
          style={{ backgroundImage: `linear-gradient(rgba(18,11,38,.78), rgba(18,11,38,.95)), url(${arena})` }}
        >
          {phase === 'lobby' && (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <p className="text-5xl leading-none sm:text-6xl"><Outlined>QUIZ</Outlined></p>
              <p className="text-4xl leading-none sm:text-5xl"><Outlined fill="teal">CHALLENGE</Outlined></p>
              <p className="mt-4 max-w-md font-bold text-cream/90">
                Knock down all three enemy towers for a three-crown win. Each tower takes two right answers.
              </p>
              <GameButton onClick={start} className="mt-6 min-w-56 text-3xl">BATTLE</GameButton>
            </div>
          )}

          {(phase === 'queue' || phase === 'found') && (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center" aria-live="polite">
              {phase === 'queue' ? (
                <>
                  <span aria-hidden className="h-16 w-16 animate-spin rounded-full border-[6px] border-gold-light border-t-transparent" />
                  <p className="game-text-sm mt-5 text-2xl">Searching for opponent…</p>
                  <GameButton tone="crimson" small onClick={() => setPhase('lobby')} className="mt-6">Cancel</GameButton>
                </>
              ) : (
                <>
                  <p className="game-text-sm text-2xl text-gold-light">Opponent found!</p>
                  <div className="mt-6 flex items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center">
                      <img src={selfie} alt="" className="h-24 w-24 rounded-full border-4 border-sapphire object-cover" />
                      <p className="game-text-sm mt-2">You</p>
                    </div>
                    <p className="text-5xl"><Outlined>VS</Outlined></p>
                    <div className="flex flex-col items-center">
                      <Portrait index={round.opponent.art} className="h-24 w-24 rounded-full border-4 border-crimson" />
                      <p className="game-text-sm mt-2">{round.opponent.name}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {phase === 'battle' && q && (
            <div className="space-y-5">
              <div className="text-center">
                <p className="mb-2 font-game text-sm text-[#ffc9cf]">{round.opponent.name}</p>
                <Towers hits={right} side="enemy" />
              </div>

              <div className="flex items-center justify-center gap-3">
                <span className="rounded-xl border-2 border-ink bg-ink/80 px-3 py-1 font-game text-gold-light">
                  Question {i + 1} / {round.qs.length}
                </span>
                <span className="rounded-xl border-2 border-ink bg-ink/80 px-3 py-1 font-game text-white" aria-label={`Crowns: you ${yourCrowns}, opponent ${theirCrowns}`}>
                  👑 {yourCrowns} – {theirCrowns}
                </span>
              </div>

              <div className="mx-auto max-w-xl rounded-3xl border-[3px] border-ink bg-cream p-5 text-center shadow-[0_6px_0_#120B26]">
                <h2 className="text-xl font-black text-ink sm:text-2xl">{q.q}</h2>
              </div>

              <div className="mx-auto grid max-w-xl gap-3 sm:grid-cols-2">
                {q.options.map((o) => {
                  const state = !picked ? 'violet' : o === q.answer ? 'teal' : o === picked ? 'crimson' : 'violet'
                  return (
                    <button
                      key={o}
                      onClick={() => answer(o)}
                      disabled={!!picked}
                      className={`btn btn-${state} w-full text-base ${picked && o !== q.answer && o !== picked ? 'opacity-50' : ''}`}
                    >
                      {o}
                    </button>
                  )
                })}
              </div>

              {picked && (
                <div className="mx-auto flex max-w-xl flex-wrap items-center justify-between gap-3" aria-live="polite">
                  <p className="game-text-sm text-xl">{picked === q.answer ? '💥 Direct hit!' : '🛡️ Blocked — your tower took damage.'}</p>
                  <div className="flex gap-2">
                    <a href={`#${q.source}`} className="btn btn-sm btn-violet">Learn more</a>
                    <GameButton small onClick={next}>{i + 1 >= round.qs.length ? 'Finish' : 'Next'}</GameButton>
                  </div>
                </div>
              )}

              <div className="text-center">
                <Towers hits={wrong} side="you" />
                <p className="mt-2 font-game text-sm text-[#8fc2ff]">You</p>
              </div>
            </div>
          )}

          {phase === 'result' && (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center" aria-live="polite">
              <p className="text-6xl leading-none">
                {yourCrowns > theirCrowns ? <Outlined>VICTORY</Outlined> : yourCrowns < theirCrowns ? <Outlined fill="white">DEFEAT</Outlined> : <Outlined fill="teal">DRAW</Outlined>}
              </p>
              <p className="mt-4 text-4xl" aria-label={`${yourCrowns} crowns`}>
                {[0, 1, 2].map((c) => (
                  <span key={c} style={c < yourCrowns ? undefined : { opacity: 0.25, filter: 'grayscale(1)' }}>👑</span>
                ))}
              </p>
              <p className="game-text-sm mt-3 text-xl">{right} / {round.qs.length} correct</p>
              <p className="mt-1 font-bold text-mist">vs. {round.opponent.name}</p>
              {wrong > 0 && (
                <ul className="mt-5 max-w-md space-y-2 text-left">
                  {round.qs.map((rq, n) =>
                    results[n] ? null : (
                      <li key={rq.q} className="rounded-xl border-2 border-ink bg-night p-3">
                        <p className="font-bold">{rq.q}</p>
                        <p className="text-sm text-aether-light">
                          Answer: {rq.answer} · <a href={`#${rq.source}`} className="underline">learn more</a>
                        </p>
                      </li>
                    ),
                  )}
                </ul>
              )}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <GameButton onClick={start} className="text-xl">Play again</GameButton>
                <GameButton href="#/profile" tone="teal" className="text-xl">View profile</GameButton>
              </div>
            </div>
          )}
        </div>
      </Panel>
    </>
  )
}
