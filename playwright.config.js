const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 40000,
  expect: {
    timeout: 5000
  },
  retries: 0,
  reporter: [
    ['list'],
    ['allure-playwright'], 
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'my-allure-results' }]
  ],
  workers: 4,
  use: {
    headless: false,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    baseURL: 'https://nemean.appdev.liongard.com',
  }
});
