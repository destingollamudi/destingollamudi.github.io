/** @type {import('tailwindcss').Config} */
// Colors and fonts mirror the "DG Tokens" collection in the Figma file.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#120B26',
        night: '#1B1446',
        royal: { DEFAULT: '#2D2A8F', light: '#4B47D6' },
        aether: { DEFAULT: '#19C2C2', light: '#7CF5EC' },
        gold: { DEFAULT: '#FFB52E', light: '#FFE29A', deep: '#C9701A' },
        ember: '#FF5A36',
        violet: '#8A4DFF',
        cream: '#FFF6E0',
        crimson: '#E2394C',
        sapphire: '#3A7BFF',
        mist: '#A9A5E8',
      },
      fontFamily: {
        display: ['"Luckiest Guy"', 'Impact', 'sans-serif'],
        game: ['"Lilita One"', '"Arial Rounded MT Bold"', 'sans-serif'],
        brand: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        rise: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
        ember: { '0%': { transform: 'translateY(0)', opacity: '0' }, '15%': { opacity: '1' }, '100%': { transform: 'translateY(-120vh)', opacity: '0' } },
        shine: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        rise: 'rise .45s cubic-bezier(.2,.7,.3,1) both',
        ember: 'ember linear infinite',
        shine: 'shine 2.4s linear infinite',
      },
    },
  },
  plugins: [],
}
