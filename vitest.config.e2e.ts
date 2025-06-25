import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    include: ['./tests/**/*.e2e.ts'],
  },
  resolve: {
    alias: {
      'livestory-js-sdk': path.resolve(__dirname, 'dist'),
    },
  },
});
