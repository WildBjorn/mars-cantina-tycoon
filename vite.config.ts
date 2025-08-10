import { defineConfig } from 'vite';

// Export a Vite configuration. The `base` option controls the public base path
// when the app is served or built. When deploying to GitHub Pages the
// repository name should be used as the base path. This value can be
// overridden via the BASE_PATH environment variable in CI.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});