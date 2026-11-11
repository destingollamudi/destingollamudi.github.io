import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed to a custom apex/www domain (www.destingollamudi.xyz), so assets
// live at the server root. This must stay '/' — a repo-scoped base like
// '/personal-website/' silently breaks every asset URL on the live site.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
