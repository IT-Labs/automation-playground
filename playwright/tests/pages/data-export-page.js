const { expect } = require("@playwright/test");

exports.DataExportPage = class DataExportPage {
  constructor(page) {
    this.page = page;
    this.submitButton = page.locator("#submitButton");
    this.jsonRadioButton = page.locator("text=JSON");
  }

  async goto() {
    await this.page.goto("/#/privacy-security/data-export");
  }

  /*
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  */
};
