import tailwindcss from '@tailwindcss/vite';
import { octane } from '@octanejs/vite-plugin';
import { defineConfig, mergeConfig } from 'vitest/config';

import baseConfig from '../../vitest.config.base';

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [octane(), tailwindcss()],
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            include: ['src/**/*.test.ts'],
          },
        },
        {
          extends: true,
          test: {
            name: 'integration',
            include: ['test/integration/**/*.test.ts'],
          },
        },
      ],
    },
  }),
);
