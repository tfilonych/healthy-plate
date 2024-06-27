import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build' // Ensuring Vite outputs to the same directory as Webpack
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3009',
        changeOrigin: true
      },
      '/imageStore': {
        target: 'http://localhost:3009',
        rewrite: (path) => path.replace(/^\/recipes/, ''),
        changeOrigin: true
      },
      '/recipes/imageStore': {
        target: 'http://localhost:3009',
        rewrite: (path) => path.replace(/^\/recipes/, ''),
        changeOrigin: true
      }
    }
  }
});
