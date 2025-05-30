const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { AccountPage } = require('../pages/AccountPage');
const config = require('../config/config');
const { accountDetails } = require('../data/testData');

let loginPage;
let homePage;
let accountPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  accountPage = new AccountPage(page);

  await loginPage.navigateTo(config.baseURL + '/login');
  await loginPage.login(config.username, config.password);
});

test('@regression Validate Account Details fields and fill the form', async ({ page }) => {
  await homePage.openAccountMenu();
  await homePage.clickonAccountSetting();

  await accountPage.fillAccountDetails(
    accountDetails.firstName,
    accountDetails.lastName,
    accountDetails.username
  );

});

test('@regression Validate Dropdown Options should display', async () => {
  await homePage.openAccountMenu();
  await homePage.clickonAccountSetting();

    await accountPage.openColorThemeDropdown();

  // Assert both options are visible
  await expect(accountPage.lightModeOption).toBeVisible();
  await expect(accountPage.darkModeOption).toBeVisible();

  // Assert total count of options is 2
  const options = await accountPage.getThemeOptionsText();
  expect(options.length).toBe(2);

  // Assert text values
  expect(options).toContain('Light Mode');
  expect(options).toContain('Dark Mode');
});

test('@regression Ensure Toggle Button Works Correctly', async () => {
  // Navigate to Account Settings
  await homePage.openAccountMenu();
  await homePage.clickonAccountSetting();

  // Get initial state
  const isInitiallyOn = await accountPage.isToggleOn();

  // Toggle it if on ar off
  await accountPage.toggleReceiveTechUpdates();

  // Validate state changed
  const isNowOn = await accountPage.isToggleOn();
  expect(isNowOn).not.toBe(isInitiallyOn);

  // Toggle it back (optional restore)
  await accountPage.toggleReceiveTechUpdates();

  // Confirm restore on or off
  const restored = await accountPage.isToggleOn();
  expect(restored).toBe(isInitiallyOn);
});

