import { defineConfig, devices, test } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    baseURL: 'https://coffee-cart.app',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'coffee-cart',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'https://coffee-cart.app',
       },
       testDir: './tests/coffee-cart',
    },

    {
      name: 'conduit',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'https://demo.learnwebdriverio.com',
      },
      testDir: './tests/conduit',
    },

    {
      name: 'demoqa.com',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'https://demoqa.com',
      },
      testDir: './tests/demoqa.com',
    },

    {
      name: 'playwright.dev',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'https://playwright.dev',
      },
      testDir: './tests/playwright.dev',
    },
    {
      name: 'saucedemo',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'https://saucedemo.com',
      },
      testDir: './tests/saucedemo',
    },
    {
      name: 'zara-store',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'https://www.zara.com/ua/',
      },
      testDir: './tests/zara-store',
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
