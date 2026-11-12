import publixCelly from '../assets/celly.jpg'
import publixExec from '../assets/exec.jpg'
import { site } from './site'
import type { Role } from './types'

/** Career History. Newest first. Empty lists are simply not rendered. */
export const career: Role[] = [
  {
    title: site.occupation,
    company: site.employer,
    period: 'Sep 2026 – Present',
    location: '',
    summary: 'ServiceNow solutions and customizations for government clients.',
    responsibilities: ['Junior developer on the ServiceNow team, currently onboarding to my first client project.'],
    accomplishments: [],
    technologies: ['ServiceNow', 'JavaScript', 'HTML/CSS', 'React'],
    skills: [],
    images: [],
  },
  {
    title: 'Software Engineering Intern',
    company: 'Publix Super Markets',
    period: 'May – Jul 2025',
    location: 'Lakeland, FL',
    summary: 'Built internal tools, mostly with Microsoft Power Apps and Power Automate, plus features in an Angular + ASP.NET web app.',
    responsibilities: [
      'Built internal apps and automated workflows with Microsoft Power Apps and Power Automate.',
      'Worked on features in an Angular + ASP.NET internal web app.',
      'Sat in on code review every week.',
      'Worked in two-week sprints.',
    ],
    accomplishments: ['Cut page load times by ~30% by fixing two slow queries that were doing table scans.'],
    technologies: ['Power Apps / Power Automate', 'Angular', 'ASP.NET', 'MS SQL Server'],
    skills: [],
    images: [
      { src: publixCelly, alt: 'My intern team holding #internshipcompleted signs on the last day' },
      { src: publixExec, alt: 'The full Publix summer intern class photo' },
    ],
  },
]

export default career
