/** Shared shapes for everything under src/data. */

export interface Photo {
  src: string
  alt: string
}

export interface Link {
  label: string
  href: string
}

/**
 * Anything marked `placeholder: true` renders with a dashed "✏️ placeholder"
 * tag, so filler can never be mistaken for a real fact on the live site.
 */
export interface Placeholderable {
  placeholder?: boolean
}

export interface Role extends Placeholderable {
  title: string
  company: string
  period: string
  location: string
  summary: string
  responsibilities: string[]
  accomplishments: string[]
  technologies: string[]
  skills: string[]
  images: Photo[]
  /** The candid version — what I'd tell you over coffee. */
  note?: string
}

export interface Project extends Placeholderable {
  title: string
  context: string
  period: string
  description: string[]
  technologies: string[]
  images: Photo[]
  links: Link[]
  why?: string
  learned?: string
}

export interface Hobby extends Placeholderable {
  name: string
  emoji: string
  blurb?: string
}

export interface Quest extends Placeholderable {
  title: string
  kind: 'Technology' | 'Course' | 'Concept' | 'Project' | 'Career'
  description: string
  /** 0–100. */
  progress: number
  href?: string
}
