import timesSquare from '../assets/selfie.jpeg'
import publixServes from '../assets/viste3.jpg'
import fries from '../assets/fries.jpg'
import ufSign from '../assets/ufsign.jpg'
import celly from '../assets/celly.jpg'
import exec from '../assets/exec.jpg'
import rays from '../assets/travel/rays-trop.jpg'
import romeAudience from '../assets/travel/rome-audience.jpg'
import romeStPeters from '../assets/travel/rome-st-peters.jpg'
import romeBasilica from '../assets/travel/rome-basilica.jpg'
import italyEvening from '../assets/travel/italy-evening.jpg'
import chicagoBean from '../assets/travel/chicago-bean.jpg'
import chicagoRiver from '../assets/travel/chicago-river.jpg'
import chicagoMural from '../assets/travel/chicago-mural.jpg'
import nashvilleParthenon from '../assets/travel/nashville-parthenon.jpg'
import nashvilleBroadway from '../assets/travel/nashville-broadway.jpg'

const HAT_SWAP = 'w1q25v7iyMM'

/**
 * "Behind the scenes" — the non-professional shelf. Captions are written the
 * way I'd text them to someone, which is the point.
 *
 * `span` controls the masonry footprint: 'tall' | 'wide' | undefined.
 * `video` (YouTube id + link) plays inside the popup; `src` is its thumbnail.
 */
export const gallery = [
  {
    src: `https://i.ytimg.com/vi/${HAT_SWAP}/hqdefault.jpg`,
    alt: 'Video: swapping hats with the Holy Father in St. Peter\'s Square',
    caption: 'Swapping hats with the Holy Father',
    detail: "St. Peter's Square, Rome — December 2025.",
    video: { id: HAT_SWAP, href: `https://www.youtube.com/shorts/${HAT_SWAP}` },
  },
  { src: romeStPeters, alt: "Me in front of St. Peter's Basilica with the Christmas tree in the square", caption: "St. Peter's at Christmas", detail: 'Rome — December 2025.', span: 'tall' },
  { src: romeAudience, alt: "In the crowd at a papal audience in St. Peter's Square, with a Swiss Guard nearby", caption: 'Papal audience', detail: "St. Peter's Square, Rome — December 2025." },
  { src: romeBasilica, alt: "Bernini's baldachin inside St. Peter's Basilica", caption: "Inside St. Peter's Basilica", detail: 'Rome — December 2025.', span: 'tall' },
  { src: italyEvening, alt: 'Me at an overlook above Assisi at dusk', caption: 'Assisi at dusk', detail: 'Assisi, Italy — December 2025.' },
  { src: chicagoBean, alt: 'Me and a friend reflected under Cloud Gate (the Bean)', caption: 'Under the Bean', detail: 'Chicago — Summer 2026.' },
  { src: chicagoRiver, alt: 'The Chicago River between downtown skyscrapers', caption: 'Chicago River', detail: 'Chicago — Summer 2026.', span: 'tall' },
  { src: chicagoMural, alt: 'Me next to the Pope Leo XIV mural at Rate Field', caption: 'Pope Leo XIV mural', detail: 'Rate Field, Chicago — Summer 2026.' },
  { src: nashvilleParthenon, alt: 'Group photo with friends in front of the Parthenon in Centennial Park', caption: 'The Parthenon', detail: 'Centennial Park, Nashville — Summer 2026.', span: 'wide' },
  { src: nashvilleBroadway, alt: 'Selfie in a cowboy hat on Broadway', caption: 'Broadway in a cowboy hat', detail: 'Nashville — Summer 2026.' },
  {
    src: publixServes,
    alt: 'Me in a Publix Serves shirt pushing an electric pallet jack in a food bank warehouse',
    caption: 'Pallet jack says NO RIDING',
    detail: "Publix Serves day at the food bank. I was absolutely going to ride it.",
    span: 'tall',
  },
  {
    src: timesSquare,
    alt: 'Me in Times Square at night, lit by billboards',
    caption: 'First time in NYC',
    detail: 'It was 25°F and I had a fleece neck gaiter on. Worth it.',
  },
  {
    src: fries,
    alt: 'The yellow steel sculpture on UF campus that students call "the French Fries"',
    caption: 'The French Fries',
    detail: "Officially it's a sculpture. Nobody on campus calls it that.",
    span: 'wide',
  },
  {
    src: celly,
    alt: 'Publix intern class holding #internshipcompleted signs',
    caption: 'Last day of the internship',
    detail: 'Fourteen people who all learned the same codebase in ten weeks.',
  },
  {
    src: ufSign,
    alt: 'University of Florida arch sign against a blue sky',
    caption: 'Four years of walking under this',
    detail: 'Still take a photo of it every August.',
  },
  {
    src: exec,
    alt: 'Large group photo of the full Publix summer intern class',
    caption: 'Find me in this photo',
    detail: "I'll wait.",
    span: 'wide',
  },
  {
    src: rays,
    alt: 'View from the stands at ALDS Game 2 between the Rays and the Yankees',
    caption: 'ALDS Game 2 vs. the Yankees',
    detail: 'Rays 5, Yankees 2 — 2026 ALDS, Game 2.',
  },
]

export default gallery
