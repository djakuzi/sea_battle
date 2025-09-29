import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@app-network': '/src/app/network',
      '@app-layouts': '/src/app/layouts',
      '@app-core': '/src/app/core',
      '@app-event': '/src/app/event',
      '@app-common': '/src/app/common',
      '@app-redux': '/src/app/redux',
      '@app-rootController': '/src/app/root-controller',
      '@app-styles': '/src/app/styles',

    },
  },
  server: {
    port: 4000,
  },
});
