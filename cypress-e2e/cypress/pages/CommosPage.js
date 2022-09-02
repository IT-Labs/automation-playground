require("cypress-xpath");

class CommonsPage {
  dismissButton() {
    return cy.get(".close-dialog");
  }

  acceptCookiesButton() {
    return cy.get(".cc-btn").click();
  }

  homeButton() {
    return cy.xpath("//button[text()='Home']");
  }
  logoutButton() {
    return cy.xpath("//button[text()='Logout']");
  }
  yourBasketlink() {
    return cy.xpath(`//button[@routerlink="/basket"]`);
  }

  successMessageLabel() {
    return cy.get(
      ".cdk-overlay-pane > snack-bar-container > div > div > simple-snack-bar > span"
    );
  }

  dismissWelcomeMessage() {
    this.dismissButton().click();
  }

  acceptCookies() {
    this.acceptCookiesButton().click();
  }
}

export default CommonsPage;
