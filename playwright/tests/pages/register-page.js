const { expect } = require("@playwright/test");

exports.RegisterPage = class RegisterPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator("#emailControl");
    this.passwordInput = page.locator("#passwordControl");
    this.repeatPasswordInput = page.locator("#repeatPasswordControl");
    this.securityQuestionsDropdown = page.locator(".mat-select-value");
    this.securityAnswerInput = page.locator("#securityAnswerControl");
    this.registerButton = page.locator("#registerButton");
    this.errorForEmailInput = page.locator(`.mat-card > div.error`);
  }

  async getSecurityQuestionLocator(securityQuestion) {
    const securityQuestionLocator = this.page.locator(
      `text=${securityQuestion}`
    );
    return securityQuestionLocator;
  }

  async goto() {
    await this.page.goto("/#/register");
  }

  async fillFormRegister(email, password, securityQuestion, securityAnswer) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(password);
    await this.securityQuestionsDropdown.click();
    const securityQuestionLocator = await this.getSecurityQuestionLocator(
      securityQuestion
    );
    await securityQuestionLocator.click();
    await this.securityAnswerInput.fill(securityAnswer);
    await this.registerButton.click();
  }
};
