import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Working configuration with proper HMR
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
  define: {
    'navigator.serviceWorker': 'undefined' // Disable service worker globally
  }
});
