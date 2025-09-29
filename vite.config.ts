import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Working configuration with proper HMR and image optimization
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: 'localhost',
    hmr: {
      port: 5173,
      host: 'localhost'
    }
  },
  build: {
    // Optimize images during build
    assetsInlineLimit: 4096, // Inline small images as base64
    rollupOptions: {
      output: {
        // Separate image assets for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/img/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'gsap']
  }
});
