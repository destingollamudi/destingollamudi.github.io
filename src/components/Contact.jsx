import { useState } from 'react'
import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', half: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', half: true },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: "What's this about?" },
]

const EMPTY = { name: '', email: '', subject: '', message: '' }

const Contact = () => {
  const [form, setForm] = useState(EMPTY)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('')
  const [ref, shown] = useReveal()

  const change = (event) => setForm((f) => ({ ...f, [event.target.name]: event.target.value }))

  const submit = async (event) => {
    event.preventDefault()
    setSending(true)
    setStatus('')

    try {
      const response = await fetch(site.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error(`Formspree returned ${response.status}`)
      setStatus('success')
      setForm(EMPTY)
    } catch (error) {
      console.error('Contact form failed:', error)
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-muted/70 ' +
    'transition-colors focus:border-accent focus:outline-none'

  return (
    <section id="contact" ref={ref} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className={`grid gap-12 lg:grid-cols-2 ${shown ? 'animate-rise-in' : 'opacity-0'}`}>
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Let&rsquo;s talk
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            I read everything that comes through here. If you&rsquo;re hiring for a new-grad role,
            building something strange, or just want to argue about databases — go ahead.
          </p>

          <dl className="mt-10 space-y-5">
            <div>
              <dt className="eyebrow">Email</dt>
              <dd className="mt-1">
                <a href={site.links.email} className="link-underline font-medium hover:text-accent">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Based in</dt>
              <dd className="mt-1 font-medium">{site.location}</dd>
            </div>
            <div>
              <dt className="eyebrow">Elsewhere</dt>
              <dd className="mt-2 flex gap-3">
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-ghost px-4 py-2 text-xs"
                >
                  GitHub
                </a>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-ghost px-4 py-2 text-xs"
                >
                  LinkedIn
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form onSubmit={submit} className="card space-y-5 p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {FIELDS.map((field) => (
              <div key={field.name} className={field.half ? '' : 'sm:col-span-2'}>
                <label htmlFor={field.name} className="eyebrow mb-2 block">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required
                  value={form[field.name]}
                  onChange={change}
                  placeholder={field.placeholder}
                  className={inputClass}
                />
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="message" className="eyebrow mb-2 block">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              value={form.message}
              onChange={change}
              placeholder="Say as much or as little as you want."
              className={`${inputClass} resize-y`}
            />
          </div>

          <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60">
            {sending ? 'Sending…' : 'Send it'}
          </button>

          {status === 'success' && (
            <p
              role="status"
              className="rounded-xl border border-accent/30 bg-accentSoft px-4 py-3 text-sm text-accent"
            >
              Got it — I&rsquo;ll reply within a day or two.
            </p>
          )}
          {status === 'error' && (
            <p
              role="alert"
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500"
            >
              That didn&rsquo;t go through. Email me directly at{' '}
              <a href={site.links.email} className="underline">
                {site.email}
              </a>
              .
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact
