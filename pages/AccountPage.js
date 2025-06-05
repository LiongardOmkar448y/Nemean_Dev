const { BasePage } = require('../utils/BasePage');
const { expect } = require('@playwright/test');  
const path = require('path');
const os = require('os');
const fs = require('fs');

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
get receiveTechUpdatesToggle() {
  return this.page.locator('//button[@id="ReceiveTechUpdates"]');
}
//-------------Access Token Validation
get accessTokenMenuOption() {
    return this.page.locator('//span[text()="Access Tokens"]'); 
  }
 get clickonGenerateTokens() {
  return this.page.locator("//button[normalize-space()='GENERATE NEW TOKEN']");
}

get clickonAgentToken() {
  return this.page.locator("//div[normalize-space()='Agent Install Token']");
}

 get successMsg()
 {
   return this.page.locator("//div[text()='Your Agent Install access key (access key ID and secret access key) has been created successfully.']");

 }
 get accessKeyIdLabel() {
  return this.page.locator("//li[text()='Access Key Id: ']");
}

get accessKeySecretLabel() {
  return this.page.locator('//li[text()="Access Key Secret: "]');
}

  get mfaMenu() {
    return this.page.locator('//span[text()="Multi-Factor Authentication"]');
  }

  get mfaInfoText() {
    return this.page.locator("//p[contains(., 'Multi-Factor authentication is') and contains(., 'for your account')]");
  }

get accessKeyIdTextLabel() {
  return this.page.locator('//li[text()="Access Key Id: "]');
}

get accessKeySecretTextLabel() {
  return this.page.locator('//li[text()="Access Key Secret: "]');
}

 get liongardInstanceMenu() {
    return this.page.locator('//span[text()="My Liongard Instance"]');
  }

  get instanceRowLabels() {
    return this.page.locator('//td[text()="Application IP Address" or text()="Integrations IP Address" or text()="Region" or text()="Service Provider Name" or text()="URL"]');
  }

 get exportButton() {
    return this.page.locator('//span[@class="cap-button" and normalize-space(text())="Export"]');
  }

get downloadingExcelPopup() {
  return this.page.locator("//span[normalize-space()='Downloading Excel']");
}

async validateDownloadPopupVisibles() {
  await expect(this.downloadingExcelPopup).toBeVisible();
  const popupText = await this.downloadingExcelPopup.textContent();
  expect(popupText).toContain('Downloading Excel');
}

 async clickExportButton() {
    await this.exportButton.waitFor({ state: 'visible', timeout: 5000 }); // wait until visible
    await this.exportButton.click();
  }

  async validateExportFileDownloaded() {
    const downloadDir = path.join(os.homedir(), 'Downloads');
    await this.page.waitForTimeout(3000);
    const files = fs.readdirSync(downloadDir);                // Get all files in Downloads folder
    const exportFile = files.find(file => file.toLowerCase().startsWith('export'));    // Find file that starts with "Export" (case-insensitive)
    expect(exportFile, 'Export file should exist in Downloads folder').toBeTruthy();
    const filePath = path.join(downloadDir, exportFile);
    const stats = fs.statSync(filePath);
    expect(stats.size).toBeGreaterThan(0);// Assert file is not empty
  }

 async clickLiongardInstanceMenu() {
    await this.liongardInstanceMenu.click();
  }

  async validateInstanceTableLabels() {
    const expectedLabels = [
      'Application IP Address',
      'Integrations IP Address',
      'Region',
      'Service Provider Name',
      'URL'
    ];

    await expect(this.instanceRowLabels).toHaveCount(5);       // Assert row count

    for (const label of expectedLabels) {                       //  Assert each label is visible
      const labelLocator = this.page.locator(`//td[text()="${label}"]`);
      await expect(labelLocator).toBeVisible();
    }
  }

async validateAccessKeyTextVisible() {                      //Method to validate both labels are visible (after token generation)
  const keyIdText = await this.accessKeyIdTextLabel.textContent();
  const keySecretText = await this.accessKeySecretTextLabel.textContent();

  expect(keyIdText).toContain('Access Key Id:');
  expect(keySecretText).toContain('Access Key Secret:');
}


async validateAccessKeyTextNotVisible() {                   //Method to validate both labels are hidden (after refresh)
  await expect(this.accessKeyIdTextLabel).toBeHidden();
  await expect(this.accessKeySecretTextLabel).toBeHidden();
}


async validateTokenSuccessMessage() {                       // Success message validation
  await expect(this.successMsg).toBeVisible();
  const actualText = await this.successMsg.textContent();
  expect(actualText).toContain("Your Agent Install access key");
  expect(actualText).toContain("has been created successfully");
}



  async clickMFAMenu() {
    await this.mfaMenu.click();
  }

    async validateMFAInfo() {
    await expect(this.mfaInfoText).toBeVisible();
    const fullText = await this.mfaInfoText.textContent();
    expect(fullText.trim()).toContain('Multi-Factor authentication is');
    expect(fullText.trim()).toContain('inactive');
    expect(fullText.trim()).toContain('for your account');
    const classAttr = await this.mfaInfoText.getAttribute('class');
    if (classAttr) {
      expect(classAttr).toContain('inactive');
    }
  } 


async validateAccessKeyLabels() {
  const keyIdText = await this.accessKeyIdLabel.textContent();
  const keySecretText = await this.accessKeySecretLabel.textContent();
  expect(keyIdText).toContain('Access Key Id:');  // Assertions    // Validate Access Key ID and Secret labels
  expect(keySecretText).toContain('Access Key Secret:');
}

async validateSuccessMsg() {
  await expect(this.successMsg).toBeVisible();
  const isVisible = await this.successMsg.isVisible();
  expect(isVisible).toBe(true);
  const actualText = await this.successMsg.textContent();      // Extract text content
  expect(actualText).toContain("Your Agent Install access key");   // Validate the expected message content
  expect(actualText).toContain("has been created successfully");
  
}
async clickAgentToken() {
  await this.clickonAgentToken.waitFor({ state: 'visible' });
  await this.clickonAgentToken.click({ force: true });
}

async clickGenerateToken() {
    await this.clickonGenerateTokens.hover();
  }

async openAccessTokenMenu() {
    await this.accessTokenMenuOption.click();
  }

 // Togle Button Validation -------------------------------------------------------------------------------
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
 //------------------------------------------------------------------------------------------------------

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
