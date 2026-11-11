import publixCelly from '../assets/celly.jpg'
import publixExec from '../assets/exec.jpg'

export const workExperience = [
  {
    title: 'Software Engineering Intern',
    company: 'Publix Super Markets',
    period: 'May – Jul 2025',
    location: 'Lakeland, FL',
    images: [
      { src: publixCelly, alt: 'My intern team holding #internshipcompleted signs on the last day' },
      { src: publixExec, alt: 'The full Publix summer intern class photo' },
    ],
    description: [
      'Built and shipped features in an Angular + ASP.NET internal web app alongside the senior devs who owned it.',
      'Cut page load times by ~30% — almost all of it was two queries doing table scans, not the frontend I assumed was at fault.',
      'Sat in on code review every week, which is where I actually learned the codebase.',
      'Worked in two-week sprints with a real QA gate, so "done" meant done.',
    ],
    technologies: ['Angular', 'ASP.NET', 'MS SQL Server', 'MS Power Apps / Power Automate'],
    // Candid: the thing I'd tell you over coffee, not the thing on the resume.
    note: "I spent my first two weeks convinced the slowness was a rendering problem and rewrote a component for nothing. Then someone showed me the query plan. Now checking the plan is the first thing I do, not the last.",
  },
]

export default workExperience
