// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  retries: 1,
  reporter: [['list'],
   ['allure-playwright'], 
   ['html', { outputFolder: 'playwright-report', open: 'never' }],
   ['allure-playwright', { outputFolder: 'my-allure-results' }]
  ],
  workers: 4,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    baseURL: 'https://nemean.appdev.liongard.com'
  }
});
