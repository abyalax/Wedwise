import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    dir: '.',
    alias: {
      '~': path.resolve(__dirname, './'),
    },
  },
});
