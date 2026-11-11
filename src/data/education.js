import ufSign from '../assets/ufsign.jpg'
import ufFries from '../assets/fries.jpg'

export const education = [
  {
    title: 'B.S. Computer Science, Minor in Statistics',
    company: 'University of Florida',
    period: '2022 – 2026',
    location: 'Gainesville, FL',
    images: [
      { src: ufSign, alt: 'The University of Florida arch sign' },
      { src: ufFries, alt: 'The yellow campus sculpture everyone calls "the French Fries"' },
    ],
    description: [
      'GPA 3.6/4.0 · Dean’s List, Fall 2023 and Spring 2024.',
      'Coursework that actually stuck: Data Structures & Algorithms, Operating Systems, Computer Organization, Software Engineering, Networking, Natural Language Processing.',
      'The stats minor side: Computational Linear Algebra, Probability, Linear Regression, Programming with Data in R.',
      'Software Engineering Club and Catholic Gators.',
    ],
    technologies: ['Java', 'Python', 'C++', 'R', 'SQL'],
    note: "",
  },
]

export default education
