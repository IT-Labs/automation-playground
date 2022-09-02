class LoginPage {
  emailInput() {
    return cy.get("#email");
  }
  passwordInput() {
    return cy.get("#password");
  }
  loginButton() {
    return cy.get("#loginButton");
  }

  navigateToLogin() {
    cy.visit("http://127.0.0.1:3000/#/login");
  }

  login(email, password) {
    this.emailInput().type(email);
    this.passwordInput().type(password);
    this.loginButton().click();
  }
}

export default LoginPage;
