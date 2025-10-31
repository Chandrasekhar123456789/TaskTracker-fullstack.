import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173, // optional for local dev
  },
  preview: {
    host: '0.0.0.0',
    port: 10000, // Render expects to bind to this
    allowedHosts: ['tasktracker-fullstack-1.onrender.com'], // your Render frontend URL
  },
  build: {
    outDir: 'dist',
  },
})


