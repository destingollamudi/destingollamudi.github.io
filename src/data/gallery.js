import timesSquare from '../assets/selfie.jpeg'
import publixServes from '../assets/viste3.jpg'
import fries from '../assets/fries.jpg'
import ufSign from '../assets/ufsign.jpg'
import celly from '../assets/celly.jpg'
import exec from '../assets/exec.jpg'

/**
 * "Behind the scenes" — the non-professional shelf. Captions are written the
 * way I'd text them to someone, which is the point.
 *
 * `span` controls the masonry footprint: 'tall' | 'wide' | undefined.
 */
export const gallery = [
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
]

export default gallery
