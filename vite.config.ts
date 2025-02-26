import path from "path"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api/todo': {
        target: 'http://localhost:8080',  // Backend API
        changeOrigin: true,  // Changes the origin of the request to match the target
        rewrite: (path) => path.replace(/^\/api\/todo/, '/api/todo'), // Ensures correct path
      }
    }
  }
})
