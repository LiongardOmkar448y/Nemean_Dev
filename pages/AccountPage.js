const { BasePage } = require('../utils/BasePage');

exports.AccountPage = class AccountPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  // Locators
  get firstNameField() {
    return this.page.locator('//input[@id="FirstName"]');
  }

  get lastNameField() {
    return this.page.locator('//input[@id="LastName"]');
  }

  get usernameField() {
    return this.page.locator('//input[@id="Username"]');
  }

  get applyButton() {
    return this.page.locator('//button[normalize-space()="Apply"]');
  }

    get colorThemeDropdown() {
    return this.page.locator("//label[normalize-space()='Color Theme']//following::div[@class='ant-select-selector']");
  }

  get lightModeOption() {
    return this.page.locator("//div[contains(@class,'ant-select-item-option-content')][normalize-space()='Light Mode']");
  }

  get darkModeOption() {
    return this.page.locator("//div[contains(@class,'ant-select-item-option-content')][normalize-space()='Dark Mode']");
  }
    get allThemeOptions() {
    return this.page.locator("//div[contains(@class,'ant-select-item-option-content')]");
  }
 // Togle Button Validation --------------------------------------------
   // Locator for toggle
get receiveTechUpdatesToggle() {
  return this.page.locator('//button[@id="ReceiveTechUpdates"]');
}

// Toggle the button
async toggleReceiveTechUpdates() {
  await this.receiveTechUpdatesToggle.click();
}

// Check current state (on = true / off = false)
async isToggleOn() {
  const ariaChecked = await this.receiveTechUpdatesToggle.getAttribute('aria-checked');
  return ariaChecked === 'true';
}

// Ensure toggle is ON
async ensureToggleIsOn() {
  const isOn = await this.isToggleOn();
  if (!isOn) {
    await this.toggleReceiveTechUpdates();
  }
}

// Ensure toggle is OFF
async ensureToggleIsOff() {
  const isOn = await this.isToggleOn();
  if (isOn) {
    await this.toggleReceiveTechUpdates();
  }
}
 //-------------------------------------------------------


  async openColorThemeDropdown() {
    await this.colorThemeDropdown.click();
  }
  async getThemeOptionsText() {
    return this.allThemeOptions.allTextContents();
  }

  // Actions Clear the text and enter Name lastname and username and click on apply button
  async fillAccountDetails(firstName, lastName, username) {
    await this.firstNameField.fill('');
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill('');
    await this.lastNameField.fill(lastName);
    await this.usernameField.fill('');
    await this.usernameField.fill(username);
    await this.applyButton.click();
  }
};
