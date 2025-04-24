import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   '/api/v1': {
    //     target: 'http://localhost:8000',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
