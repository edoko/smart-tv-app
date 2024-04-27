import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: [
      { find: '@/const', replacement: resolve(__dirname, 'src/const') },
      { find: '@/hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: '@/utils', replacement: resolve(__dirname, 'src/utils') },
      { find: '@/pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@', replacement: resolve(__dirname, 'src') },
    ],
  },
})
