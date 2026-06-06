import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { rmSync } from 'node:fs'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    {
      name: 'exclude-unused-public-submodules',
      closeBundle() {
        rmSync(path.resolve(__dirname, 'dist/python'), { recursive: true, force: true })
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
