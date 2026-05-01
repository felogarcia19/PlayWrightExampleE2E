import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
    globals: true,
    setupFiles: ['allure-vitest/setup'],
    reporters: ['default', 'allure-vitest/reporter'],
  },
});
