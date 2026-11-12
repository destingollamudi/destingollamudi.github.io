export const INTRO_KEY = 'dg-intro-seen'

/** True when the intro should play: first visit this session, motion allowed. */
export function shouldPlayIntro() {
  try {
    if (sessionStorage.getItem(INTRO_KEY)) return false
  } catch {
    /* storage blocked — just play it */
  }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
