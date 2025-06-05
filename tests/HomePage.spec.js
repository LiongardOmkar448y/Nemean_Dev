import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { config } from '../config/config.js';
import { testData } from '../data/testData.js';

test.beforeEach(async ({ page }) => {
  await page.goto(`${config.baseURL}/login`);
  const loginPage = new LoginPage(page);
  await loginPage.login(config.username, config.password);
});
test('@regression Validate that the Home Page title is correct, all menu options are available, and the user can successfully log out.', async ({ page }) => {
  const homePage = new HomePage(page);
  await expect(page).toHaveTitle('Liongard | Relentless');
  await expect(homePage.accountMenu).toBeVisible();// Assert account menu is visible
  await homePage.openAccountMenu(); // Click account menu to reveal dropdown options
  await expect(homePage.accountSettings).toBeVisible();// Assert dropdown links are visible
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




