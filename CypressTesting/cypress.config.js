import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
import allureWriter from '@shelex/cypress-allure-plugin/writer.js';

dotenv.config();

export default defineConfig({
  reporter: 'spec',
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://preludeelectronics.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1440,
    viewportHeight: 900,
    video: false,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
  env: {
    allure: true,
    allureReuseAfterSpec: true,
  },
});