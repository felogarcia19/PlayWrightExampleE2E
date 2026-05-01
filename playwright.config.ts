import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL ?? 'https://preludeelectronics.com';

export default defineConfig({
  testDir: './e2e',

  /* Run test files in parallel */
  fullyParallel: true,

  /* Fail CI builds if test.only is accidentally committed */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests twice on CI, never locally */
  retries: process.env.CI ? 2 : 0,

  /* Limit parallelism on CI to avoid rate-limiting the live site */
  workers: process.env.CI ? 2 : undefined,

  /* Reporters: Allure (always) + Playwright HTML + dot on CI */
  reporter: process.env.CI
    ? [
        ['dot'],
        ['html', { open: 'never' }],
        ['allure-playwright', { resultsDir: 'allure-results', suiteTitle: false }],
      ]
    : [
        ['html', { open: 'on-failure' }],
        ['allure-playwright', { resultsDir: 'allure-results', suiteTitle: false }],
      ],

  use: {
    baseURL: BASE_URL,

    /* Keep a trace file when retrying a failed test — viewable in Playwright Trace Viewer */
    trace: 'on-first-retry',

    /* Screenshot only on test failure */
    screenshot: 'only-on-failure',

    /* Keep video recording only when a test fails */
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] },
    },
  ],

  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
