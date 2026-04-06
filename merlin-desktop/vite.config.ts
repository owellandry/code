import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import renderer from 'vite-plugin-electron-renderer'

const isRendererOnly = process.env.FORKX_RENDERER_ONLY === '1'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    !isRendererOnly && electron({
      main: {
        entry: 'electron/main.ts',
        vite: {
          build: {
            rollupOptions: {
              external: ['electron/main'],
            },
          },
        },
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
        vite: {
          build: {
            rollupOptions: {
              external: ['electron/renderer'],
            },
          },
        },
      },
    }),
    !isRendererOnly && renderer(),
  ].filter(Boolean),
})
