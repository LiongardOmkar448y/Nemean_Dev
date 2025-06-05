import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { config } from '../config/config.js'; 
import { HomePage } from '../pages/HomePage.js';
import { AccountPage } from '../pages/AccountPage.js';


let loginPage;
let homePage;
let accountPage;

require('dotenv').config(); // Load .env variables at the top

test.beforeEach(async ({ page }) => {
 // await page.goto(config.baseURL + '/login');
 // await loginPage.login(config.username, config.password);

  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  accountPage = new AccountPage(page);
  await loginPage.navigateTo(`${config.baseURL}/login`);
   await loginPage.login(config.username, config.password);
    
});

test('@regressionLogIn Validate that after login with valid credentials, the user should be navigated to the home page.', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await expect(page).toHaveTitle('Login | Liongard | Relentless');

});

test('@regressionLogIn Validate that after login with Invalid credentials, the user should not be navigated to the home page.', async ({ page }) => {
  const baseUrl = process.env.BASE_URL;
  const username = process.env.USERNAME;
  const invalidpass = process.env.INPASSWORD;
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo(`${baseUrl}/login`);
  await loginPage.invalidlogin(username, invalidpass); 
  await loginPage.assertInvalidLoginMessageVisible(); 
  await expect(page).toHaveTitle('Login | Liongard | Relentless');
   await expect(loginPage.invalidLoginErrorMessage).toHaveText("Username or password was incorrect.");


});


test('@regressionLogIn Validate Forgot Password Flow - Verify Password Reset Email Trigger', async ({ page }) => {
  const baseUrl = process.env.BASE_URL;
  const username = process.env.Name;
  await page.goto(`${baseUrl}/login`);
  const loginPage = new LoginPage(page);
  await loginPage.clickForgotPasswordLink();
  await loginPage.clickBackButton();
  await loginPage.enterUsername(username); 
  await loginPage.clickSubmitButton();
  await loginPage.verifySuccessMessageVisible();
   const [response] = await Promise.all([
  page.waitForResponse(resp => resp.url().includes('/forgot')),
  page.click('button[type="submit"]'),
]);
  expect(response.status()).toBe(200);
});

test('@regressionLogIn Validate Forgot Username Flow - Verify usernmae Reset Email Trigger', async ({ page }) => {
  const baseUrl = process.env.BASE_URL;
  const username = process.env.Name;
  await page.goto(`${baseUrl}/login`);
  const loginPage = new LoginPage(page);
  await loginPage.clickForgotUsernameLink();
  await loginPage.clickBackButton();
  await loginPage.enterEmail(username); 
  await loginPage.clickSubmitButton();
  await loginPage.verifySuccessMessageVisibleUsername();
  const [response] = await Promise.all([
  page.waitForResponse(resp => resp.url().includes('/forgot')),
  page.click('button[type="submit"]'),
]);
  expect(response.status()).toBe(200);

});