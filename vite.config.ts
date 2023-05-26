/* eslint-disable @typescript-eslint/naming-convention */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true,
    }),
    tsconfigPaths({
      projects: ['./tsconfig.json', './tsconfig.node.json'],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  define: {
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify('http://localhost:8000'),
    __PROJECT__: JSON.stringify('frontend'),
  },
  css: {
    modules: {
      generateScopedName:
        '[path][name]__[local]--[hash:base64:5]',
    },
  },
  optimizeDeps: {
    entries: ['index.html'],
  },
})
