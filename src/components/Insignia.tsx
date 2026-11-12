import { Outlined } from './ui'

/** The DG shield, same construction as the Figma "Brand/DG Insignia" component. */
export function Insignia({ size = 64, className = '' }: { size?: number; className?: string }) {
  return (
    <span className={`relative inline-block shrink-0 ${className}`} style={{ width: size, height: size * 1.16 }} aria-hidden>
      <svg viewBox="0 0 200 232" className="absolute inset-0 h-full w-full drop-shadow-[0_3px_0_#120B26]">
        <defs>
          <linearGradient id="dg-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFF1B8" />
            <stop offset=".45" stopColor="#FFB52E" />
            <stop offset="1" stopColor="#9C4F0C" />
          </linearGradient>
          <linearGradient id="dg-field" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4B47D6" />
            <stop offset="1" stopColor="#1B1446" />
          </linearGradient>
        </defs>
        <path d="M100 22 186 48c0 86-28 140-86 178C42 188 14 134 14 48z" fill="url(#dg-gold)" stroke="#120B26" strokeWidth="6" strokeLinejoin="round" />
        <path d="M100 38 170 59c-2 70-26 116-70 148C56 175 32 129 30 59z" fill="url(#dg-field)" stroke="#120B26" strokeWidth="4" strokeLinejoin="round" />
        <path d="M58 30 70 4l16 18 14-20 14 20 16-18 12 26z" fill="url(#dg-gold)" stroke="#120B26" strokeWidth="5" strokeLinejoin="round" />
        <path d="M100 8l9 14-9 14-9-14z" fill="#7CF5EC" stroke="#120B26" strokeWidth="3" strokeLinejoin="round" />
      </svg>
      <span className="absolute inset-x-0 text-center leading-none" style={{ top: '38%', fontSize: size * 0.4 }}>
        <Outlined>DG</Outlined>
      </span>
    </span>
  )
}
