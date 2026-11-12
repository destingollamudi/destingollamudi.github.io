/**
 * Identity and links. Everything the site says about who I am starts here —
 * no copy is hardcoded in a component.
 */
export const site = {
  name: 'Destin Gollamudi',
  firstName: 'Destin',

  occupation: 'Delivery Analyst – Software Developer, ServiceNow',
  shortTitle: 'Delivery Analyst',
  employer: 'Deloitte',

  university: 'University of Florida',
  graduated: 'May 2026',

  location: 'Orlando, FL',

  tagline:
    'ServiceNow developer at Deloitte, UF grad, and a Bucs fan who sets his fantasy lineup way too early.',

  intro:
    "I'm a ServiceNow developer at Deloitte, building solutions and customizations for government clients. I graduated from the University of Florida in May 2026 with a B.S. in Computer Science and a minor in Statistics — which mostly means I can calculate exactly how unlikely a Bucs comeback is, and then watch anyway. I live in Orlando. Off the clock I'm on a tennis or pickleball court, out on a trail, or overthinking a fantasy football trade.",

  interests: ['American football', 'Tennis', 'Pickleball', 'Hiking', 'Fantasy football'],

  email: 'destingollamudi@gmail.com',
  links: {
    github: 'https://github.com/destingollamudi',
    linkedin: 'https://www.linkedin.com/in/destin-gollamudi',
    email: 'mailto:destingollamudi@gmail.com',
    letterboxd: 'https://letterboxd.com/destingollamudi/',
    freecodecamp: 'https://www.freecodecamp.org/destingollamudi' as string | null,
  },

  // Drop resume.pdf into public/ and set this to '/resume.pdf' to show a download button.
  resumeUrl: null as string | null,

  formspreeEndpoint: 'https://formspree.io/f/mgvzrade',
}

export default site
