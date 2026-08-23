import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const srcDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src')

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/sruh_intra/' : '/',
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: srcDir },
    ],
  },
  server: {
    port: 5173,
    host: true,
  },
})
