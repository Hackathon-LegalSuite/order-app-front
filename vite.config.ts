import { defineConfig } from 'vite'
import path from 'node:path'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@components': path.resolve(__dirname, 'src/shared/components'),
      '@ui': path.resolve(__dirname, 'src/shared/components/ui'),
      '@overlays': path.resolve(__dirname, 'src/shared/components/overlays'),
      '@hooks': path.resolve(__dirname, 'src/shared/hooks'),
      '@types': path.resolve(__dirname, 'src/shared/types'),
      '@utils': path.resolve(__dirname, 'src/shared/utils'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
})
