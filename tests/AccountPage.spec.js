import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { AccountPage } from '../pages/AccountPage.js';
import { config } from '../config/config.js';
import { accountDetails } from '../data/testData.js';

let loginPage;
let homePage;
let accountPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  accountPage = new AccountPage(page);
  await loginPage.navigateTo(`${config.baseURL}/login`);
  await loginPage.login(config.username, config.password);
 
});

test('@regression AP_TC-1 Validate Account Details fields and fill the form', async ({ page }) => {
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
  await expect(accountPage.lightModeOption).toBeVisible();   // Assert both options are visible
  await expect(accountPage.darkModeOption).toBeVisible();
  const options = await accountPage.getThemeOptionsText();// Assert total count of options is 2
  expect(options.length).toBe(2); 
  expect(options).toContain('Light Mode'); // Assert text values
  expect(options).toContain('Dark Mode');
});

test('@regression Ensure Toggle Button Works Correctly', async () => {
 
  await homePage.openAccountMenu(); // Navigate to Account Settings
  await homePage.clickonAccountSetting();
  const isInitiallyOn = await accountPage.isToggleOn(); // Get initial state 
  await accountPage.toggleReceiveTechUpdates(); // Toggle it if on or off
  const isNowOn = await accountPage.isToggleOn();// Validate state changed
  expect(isNowOn).not.toBe(isInitiallyOn); 
  await accountPage.toggleReceiveTechUpdates(); // Toggle it back (optional restore)
  const restored = await accountPage.isToggleOn();  // Confirm restore on or off
  expect(restored).toBe(isInitiallyOn);
});

test('@regression After generating a token, validate that the "Access Key ID and Secret" is visible ', async () => {
  // Navigate to Account Settings
  await homePage.openAccountMenu();
  await homePage.clickonAccountSetting();
  await accountPage.openAccessTokenMenu();    // To click  on the AccessToke menu options
  await accountPage.clickGenerateToken();
  await accountPage.clickAgentToken();
  await accountPage.validateSuccessMsg();
  await accountPage.validateAccessKeyLabels();

});

test('@regressiontest Validate that after disabling MFA, the user sees the status as Inactive Authentication on the MFA page.', async () => {
  
  await homePage.openAccountMenu();  // Navigate to Account Settings
  await homePage.clickonAccountSetting();
  await accountPage.clickMFAMenu();
  await accountPage.validateMFAInfo();


});

test('@regression After generating a token, validate that the "Access Key ID and Secret" is visible and after refresh no longer visibal ', async () => {
  
  await homePage.openAccountMenu(); // Navigate to Account Settings
  await homePage.clickonAccountSetting();
  await accountPage.openAccessTokenMenu();    // To click  on the AccessToke menu options
  await accountPage.clickGenerateToken();
  await accountPage.clickAgentToken();
  await accountPage.validateSuccessMsg();
  await accountPage.validateAccessKeyLabels();

});

test('@regression After generating a token, validate that the "Access Key ID and Secret" is visible and after refresh no longer visible', async ({ page }) => {
  await homePage.openAccountMenu();
  await homePage.clickonAccountSetting();
  await accountPage.openAccessTokenMenu();
  await accountPage.clickGenerateToken();
  await accountPage.clickAgentToken();
  await accountPage.validateTokenSuccessMessage();
  await accountPage.validateAccessKeyTextVisible();      //  After token generated
  await page.reload();                                   //  Refresh
  await accountPage.validateAccessKeyTextNotVisible();   //  Text should not be visible
});

test('@regression Validate My Liongard Instance table labels are visible and count is 5', async ({ page }) => {
  await homePage.openAccountMenu();
  await homePage.clickonAccountSetting();
  await accountPage.clickLiongardInstanceMenu();
  await accountPage.validateInstanceTableLabels(); // Check labels and count
});

test('@regressiontest1 Verify that clicking the Export button triggers a file download', async ({ page }) => {
  await homePage.openAccountMenu();
  await homePage.clickonAccountSetting();
  await accountPage.clickLiongardInstanceMenu();
  await accountPage.clickExportButton();
  await accountPage.validateDownloadPopupVisibles(); //  Validate popup appears
  await accountPage.validateExportFileDownloaded();   // Assert file exists and is not empty
});