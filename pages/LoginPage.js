const { BasePage } = require('../utils/BasePage');

exports.LoginPage = class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  get usernameField() {
    return this.page.locator('//input[@id="Username"]');
  }

  get passwordField() {
    return this.page.locator('//input[@id="Password"]');
  }

  get loginButton() {
    return this.page.locator('//button[@type="submit"]');
  }

  async login(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
};
