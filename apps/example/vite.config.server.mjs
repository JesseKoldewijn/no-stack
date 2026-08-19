import { defineConfig } from 'vite';
import { octane } from '@octanejs/vite-plugin';

export default defineConfig({
  plugins: [octane()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    target: 'node22',
    minify: false,
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        entryFileNames: 'main.js',
        chunkFileNames: '[name].js',
        format: 'cjs',
      },
    },
  },
});
