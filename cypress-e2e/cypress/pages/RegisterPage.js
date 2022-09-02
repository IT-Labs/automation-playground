class RegisterPage {
  emailInput() {
    return cy.get("#emailControl");
  }
  passwordInput() {
    return cy.get("#passwordControl");
  }
  repeatPasswordInput() {
    return cy.get("#repeatPasswordControl");
  }
  securityQuestionDropdown() {
    return cy.get(".mat-select-value");
  }
  securityQuestionOption(securityQuestion) {
    return cy.contains(`${securityQuestion}`);
  }
  securityAnswerInput() {
    return cy.get("#securityAnswerControl");
  }
  registerButton() {
    return cy.get("#registerButton");
  }

  navigateToRegister() {
    cy.visit("http://127.0.0.1:3000/#/register");
  }
}

export default RegisterPage;
