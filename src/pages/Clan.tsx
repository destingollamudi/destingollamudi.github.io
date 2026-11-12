import { useState, type ChangeEvent, type FormEvent } from 'react'
import { site } from '../data/site'
import { sectionFor } from '../routes'
import { GameButton, Panel, SectionHeader } from '../components/ui'
import { Insignia } from '../components/Insignia'

const EMPTY = { name: '', email: '', message: '' }

export default function Clan() {
  const [form, setForm] = useState(EMPTY)
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setState('sending')
    try {
      const res = await fetch(site.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`Formspree returned ${res.status}`)
      setState('sent')
      setForm(EMPTY)
    } catch (error) {
      console.error('Contact form failed:', error)
      setState('error')
    }
  }

  const input = 'w-full rounded-xl border-[3px] border-ink bg-cream px-3 py-2 font-bold text-ink placeholder:text-ink/40 focus:border-aether'

  return (
    <>
      <SectionHeader section={sectionFor('/clan')!}>Hiring, collaborating, or just want to say hi? Pick a channel.</SectionHeader>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Panel tone="violet" className="p-6 text-center">
          <Insignia size={90} className="mx-auto" />
          <h2 className="game-text mt-3 text-3xl">Destin's Clan</h2>
          <p className="font-game text-gold-light">Open · Anyone may join</p>
          <div className="mt-6 grid gap-3">
            <GameButton href={site.links.email} className="w-full">✉️ {site.email}</GameButton>
            <GameButton href={site.links.linkedin} external tone="teal" className="w-full">LinkedIn</GameButton>
            <GameButton href={site.links.github} external tone="crimson" className="w-full">GitHub</GameButton>
            {site.resumeUrl && (
              <GameButton href={site.resumeUrl} tone="gold" className="w-full">⬇ Download résumé</GameButton>
            )}
          </div>
        </Panel>

        <Panel className="overflow-hidden">
          <div className="border-b-[3px] border-ink bg-gradient-to-b from-[#ffe07a] to-[#e8820c] px-5 py-3 shadow-[inset_0_3px_0_rgba(255,255,255,.55)]">
            <h2 className="game-text text-2xl">Send a clan request</h2>
          </div>
          <form onSubmit={submit} className="space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block font-game text-sm text-gold-light">Name</span>
                <input name="name" required value={form.name} onChange={change} className={input} placeholder="Your name" autoComplete="name" />
              </label>
              <label className="block">
                <span className="mb-1 block font-game text-sm text-gold-light">Email</span>
                <input name="email" type="email" required value={form.email} onChange={change} className={input} placeholder="you@example.com" autoComplete="email" />
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block font-game text-sm text-gold-light">Message</span>
              <textarea name="message" rows={6} required value={form.message} onChange={change} className={`${input} resize-y`} placeholder="Say as much or as little as you want." />
            </label>
            <GameButton type="submit" disabled={state === 'sending'} className="w-full text-xl">
              {state === 'sending' ? 'Sending…' : 'Send request'}
            </GameButton>
            <p aria-live="polite" className="min-h-6 text-center font-bold">
              {state === 'sent' && <span className="text-aether-light">Request received — I'll reply within a day or two.</span>}
              {state === 'error' && (
                <span className="text-[#ff9a9a]">
                  That didn't go through. Email me directly at <a href={site.links.email} className="underline">{site.email}</a>.
                </span>
              )}
            </p>
          </form>
        </Panel>
      </div>
    </>
  )
}
