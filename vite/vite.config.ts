import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: './',
  build: {
    outDir: './dist' //Added
  },
  define: {
    __TRANSLATE_API_URL__: JSON.stringify(process.env.VITE_BACKEND_URL || "con cac"),
  },
})
