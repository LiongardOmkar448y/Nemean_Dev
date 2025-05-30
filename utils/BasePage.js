const { expect } = require('@playwright/test');

exports.BasePage = class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    await this.page.goto(url);
  }
};
