import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { profileStatsMiddleware } from './server/profile-stats.mjs'

export default defineConfig({
  plugins: [react(), {
    name: 'local-profile-statistics',
    configureServer(server) {
      server.middlewares.use(profileStatsMiddleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(profileStatsMiddleware)
    },
  }],
})
