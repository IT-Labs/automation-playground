require("cypress-xpath");

class HomePage {
  pageTitle() {
    return cy.get(".heading > .ng-star-inserted");
  }
  addToCartButton(productName) {
    return cy.xpath(
      `//div[text()=' ${productName} ']//ancestor::mat-card//div//button`
    );
  }

  addProductToCart(productName) {
    this.addToCartButton(productName).click();
  }
}

export default HomePage;
