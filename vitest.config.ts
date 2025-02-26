import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Use global test functions like `test`, `expect`
    environment: 'node', // Node.js test environment
    coverage: {
      provider: 'v8',
    },
  },
});