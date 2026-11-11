/**
 * Identity, voice, and links. Everything the site says about who I am starts
 * here — no copy is hardcoded in a component.
 */
export const site = {
  name: 'Destin Gollamudi',
  firstName: 'Destin',
  role: 'Software Engineer',

  // The tagline. First person, specific, and deliberately not "passionate
  // builder focused on solutions" — that sentence describes nobody.
  tagline:
    "I build full-stack web apps, get unreasonably happy when a slow query drops 30%, and I spend some Saturdays moving pallets at a food bank.",

  intro:
    "I'm a CS senior at the University of Florida with a Statistics minor. Last summer I shipped Angular and ASP.NET features at Publix; the rest of the time I'm building things like this site and arguing with myself about folder structure.",

  location: 'Gainesville, FL',
  email: 'destingollamudi@gmail.com',

  // Rotating subtitle under the name. Honest, not resume-speak.
  rotatingWords: [
    'full-stack, mostly',
    'SQL query whisperer',
    'Gator, class of 2026',
    'serial refactorer',
  ],

  links: {
    github: 'https://github.com/destingollamudi',
    linkedin: 'https://www.linkedin.com/in/destin-gollamudi',
    email: 'mailto:destingollamudi@gmail.com',
  },

  nav: [
    { label: 'Home', href: '#/', section: 'hero' },
    { label: 'Journey', href: '#/', section: 'experience' },
    { label: 'Off the clock', href: '#/', section: 'gallery' },
    { label: 'Uses', href: '#/uses' },
    { label: 'Contact', href: '#/', section: 'contact' },
  ],

  formspreeEndpoint: 'https://formspree.io/f/mgvzrade',
}

export default site
