const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const config = require('../config/config');

test.beforeEach(async ({ page }) => {
  // Navigate to login page before each test automatically
  await page.goto(config.baseURL + '/login');
});

test('@smoke Login Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  // No need to call navigateTo anymore here
  await loginPage.login(config.username, config.password);

  // Add your assertions here
  await expect(page).toHaveTitle('Liongard | Relentless');
});
