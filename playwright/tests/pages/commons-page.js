const { expect } = require("@playwright/test");

exports.CommonsPage = class CommonsPage {
  constructor(page) {
    this.page = page;
    this.homeButton = page.locator("//button[text()='Home']");
    this.logoutButton = page.locator("//button[text()='Logout']");
    this.dismissButton = page.locator(`button:has-text("Dismiss")`);
    this.yourBasketLink = page.locator(`//button[@routerlink="/basket"]`);
    this.successMessage = page.locator(
      `.cdk-overlay-pane > snack-bar-container > div > div > simple-snack-bar > span`
    );
    this.acceptCookiesButton = page.locator(
      `//div[@aria-label="cookieconsent"]//div//a`
    );
  }

  async dismissWelcomeMessage() {
    await this.dismissButton.click();
  }

  async acceptCookies() {
    await this.acceptCookiesButton.click();
  }
};
