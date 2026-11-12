import ufSign from '../assets/ufsign.jpg'
import ufFries from '../assets/fries.jpg'

export const education = {
  school: 'University of Florida',
  degree: 'B.S. Computer Science',
  minor: 'Statistics',
  period: '2022 – 2026',
  graduation: 'May 2026',
  location: 'Gainesville, FL',
  images: [
    { src: ufSign, alt: 'The University of Florida arch sign' },
    { src: ufFries, alt: 'The yellow campus sculpture everyone calls "the French Fries"' },
  ],
  honors: ['GPA 3.6 / 4.0', 'Dean’s List — Fall 2023 and Spring 2024'],
  coursework: {
    'Computer Science': [
      'Data Structures & Algorithms',
      'Operating Systems',
      'Computer Organization',
      'Software Engineering',
      'Networking',
      'Natural Language Processing',
    ],
    Statistics: ['Computational Linear Algebra', 'Probability', 'Linear Regression', 'Programming with Data in R'],
  } as Record<string, string[]>,
  clubs: ['Catholic Gators'],
  // Academic projects live in projects.ts — the Academy page links to them.
  technologies: ['Java', 'Python', 'C++', 'R', 'SQL'],
}

export default education
