import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  },
  preview: {
    host: true,
    // allow Railway's generated domain so `vite preview` accepts the Host header
    allowedHosts: ['website-journey-production.up.railway.app']
  }
})
