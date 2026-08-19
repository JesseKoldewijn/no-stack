import { defineConfig } from 'vite';
import { octane } from '@octanejs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [octane(), tailwindcss()],
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
    target: 'es2022',
    rollupOptions: {
      input: 'src/client/hydrate.ts',
      output: {
        entryFileNames: 'assets/hydrate.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
