const { BasePage } = require('../utils/BasePage');

exports.HomePage = class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  // Locators 
  get accountMenu() {
    return this.page.locator('//li[@id="account-menu"]//a[@class="clearfix dropdown-toggle"]');
  }

  get accountSettings() {
    return this.page.locator('//a[normalize-space()="Account Settings"]');
  }

  get companySettings() {
    return this.page.locator('//a[normalize-space()="Company Settings"]');
  }

  get logoutLink() {
    return this.page.locator('//a[normalize-space()="Logout"]');
  }

  

  async clickApply() {
    await this.applyButton.click();
  }


  async clickonAccountSetting() {
    await this.accountSettings.click();     // To click on Account setting
  }

  async openAccountMenu() {
    await this.accountMenu.click();     // To click on Menu icon
  }

  async clickonLogout() {
    await this.logoutLink.click();      // To click on logout button
  }
 


};
