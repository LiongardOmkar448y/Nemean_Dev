const { BasePage } = require('../utils/BasePage');

exports.LoginPage = class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  get usernameFieldID() {
    return this.page.locator('//input[@id="Username"]');
  }

  get passwordFieldID() {
    return this.page.locator('//input[@id="Password"]');
  }

  get loginButton() {
    return this.page.locator('//button[@type="submit"]');
  }

  get forgotPasswordLink() {
    return this.page.locator("//a[normalize-space()='Forgot your password?']");
  }

  get backButton() {
    return this.page.locator("//div[@class='back-button']");
  }

  get usernameField() {
    return this.page.locator('//input[@id="Username or email"]');
  }

  get submitButton() {
    return this.page.locator('//button[@type="submit"]');
  }

  get successMessage() {
    return this.page.locator('text=If the username you provided exists in Liongard, you will receive a password reset email.');
  }

   get successMessageUsername() {
    return this.page.locator('text=If the email you provided exists, we’ll send you a username reminder email.');
  }
  async verifySuccessMessageVisibleUsername() {
    await this.successMessageUsername.waitFor({ state: 'visible' });
  }

  get forgotUserNameLink() {
    return this.page.locator("//a[normalize-space()='Forgot your username?']");
  }
  get userEmailField() {
    return this.page.locator("input.ant-input[type='text']");

  }
    get invalidLoginErrorMessage() {
    return this.page.locator('//span[text()="Username or password was incorrect."]');
  }

   async assertInvalidLoginMessageVisible() {
    await this.invalidLoginErrorMessage.waitFor({ state: 'visible', timeout: 5000 });
  }

  async clickForgotUsernameLink() {
    await this.forgotUserNameLink.click();
  }
  async clickBackButton() {
    await this.backButton.click();
  }
  async enterEmail(username) {
    await this.userEmailField.waitFor({ state: 'visible', timeout: 10000 });
    await this.userEmailField.fill(username);
  }
  async clickSubmitButton() {
    await this.submitButton.click();
  }
  async clickForgotPasswordLink() {
    await this.forgotPasswordLink.click();
  }

  async clickBackButton() {
    await this.backButton.click();
  }

  async enterUsername(username) {
    await this.usernameField.fill(username);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async verifySuccessMessageVisible() {
    await this.successMessage.waitFor({ state: 'visible' });
  }

  async login(username, password) {
    await this.usernameFieldID.fill(username);
    await this.passwordFieldID.fill(password);
    await this.loginButton.click();
  }
   async invalidlogin(username, invalidpass) {
    await this.usernameFieldID.fill(username);
    await this.passwordFieldID.fill(invalidpass);
    await this.loginButton.click();
  }
};

