import { octane } from '@octanejs/vite-plugin';
import { defineConfig, mergeConfig } from 'vitest/config';

import baseConfig from '../../vitest.config.base';

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [octane()],
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            include: ['src/**/*.test.ts'],
            exclude: ['src/**/*.integration.test.ts'],
          },
        },
        {
          extends: true,
          test: {
            name: 'integration',
            include: ['src/**/*.integration.test.ts'],
          },
        },
      ],
    },
  }),
);
