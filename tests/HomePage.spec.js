const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const config = require('../config/config');
const testData = require('../data/testData');

test.beforeEach(async ({ page }) => {
  await page.goto(config.baseURL + '/login');
  const loginPage = new LoginPage(page);
  await loginPage.login(config.username, config.password);
});

test('@regression Validate that the Home Page title is correct, all menu options are available, and the user can successfully log out.', async ({ page }) => {
  const homePage = new HomePage(page);

  // Assert page t
  // itle
  await expect(page).toHaveTitle('Liongard | Relentless');

  // Assert account menu is visible
  await expect(homePage.accountMenu).toBeVisible();

  // Click account menu to reveal dropdown options
  await homePage.openAccountMenu();

  // Assert dropdown links are visible
  await expect(homePage.accountSettings).toBeVisible();
  await expect(homePage.companySettings).toBeVisible();
  await expect(homePage.logoutLink).toBeVisible();

  await homePage.clickonLogout(); // CLick On logout button
});

test('@regression Validate if the "Account Settings" option is clickable ', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.openAccountMenu();
  await page.waitForTimeout(5000); // waits for 5000 milliseconds = 5 seconds
  await homePage.clickonAccountSetting();// Click account Setting
   await page.waitForTimeout(5000); // waits for 5000 milliseconds = 5 seconds
   

});




