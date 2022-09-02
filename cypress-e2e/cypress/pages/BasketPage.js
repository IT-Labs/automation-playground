require("cypress-xpath");

class BasketPage {
  pageTitle() {
    return cy.get("h1");
  }
  checkoutButton() {
    return cy.get("#checkoutButton");
  }
  selectAddressTitle() {
    return cy.get("h1.ng-star-inserted");
  }
  addNewAddressButton() {
    return cy.xpath(`//button[@routerlink="/address/create"]`);
  }
  countryInput() {
    return cy.xpath(`//input[@data-placeholder="Please provide a country."]`);
  }
  nameInput() {
    return cy.xpath(`//input[@data-placeholder="Please provide a name."]`);
  }

  mobileNumberInput() {
    return cy.xpath(
      `//input[@data-placeholder="Please provide a mobile number."]`
    );
  }

  zipCodeInput() {
    return cy.xpath(`//input[@data-placeholder="Please provide a ZIP code."]`);
  }

  addressInput() {
    return cy.get(`#address`);
  }

  cityInput() {
    return cy.xpath(`//input[@data-placeholder="Please provide a city."]`);
  }

  stateInput() {
    return cy.xpath(`//input[@data-placeholder="Please provide a state."]`);
  }

  submitAddressButton() {
    return cy.get(`#submitButton`);
  }

  addressSelectionRadioButton() {
    return cy.get(".mat-row > .cdk-column-Selection");
  }

  continueToSelectAddressButton() {
    return cy.get(".btn-next");
  }

  chooseDeliverySpeedTitle() {
    return cy.get("app-delivery-method mat-card h1").last();
  }

  deliverySpeedSelector(deliverySpeed) {
    return cy.contains(`${deliverySpeed}`);
  }

  continueToPaymentButton() {
    return cy.xpath(
      `//button[@aria-label='Proceed to delivery method selection']`
    );
  }
  myPaymentOptionsTitle() {
    return cy.get(`app-payment-method div h1`);
  }

  addNewCardHeader() {
    return cy.get(`#mat-expansion-panel-header-0`);
  }
  ccNameInput() {
    return cy.get(
      `.mat-expansion-panel-body div mat-form-field input[type='text']`
    );
  }
  ccnumberInput() {
    return cy.get(
      `.mat-expansion-panel-body div mat-form-field input[type='number']`
    );
  }
  expiryMonthDropdown() {
    return cy.xpath(`//select`).first();
  }
  expiryYearDropdown() {
    return cy.xpath(`//select`).last();
  }
  submitCCButton() {
    return cy.get(`#submitButton`);
  }
  cCRadioButtonSelector() {
    return cy.get("mat-radio-button .mat-radio-label");
  }
  proceedToReviewButton() {
    return cy.xpath(`//button[@aria-label="Proceed to review"]`);
  }

  yourBasketTitle() {
    return cy.get("h1");
  }
  orderSummaryTitle() {
    return cy.get(".order-summary");
  }
  placeOrderAndPayButton() {
    return cy.get("#checkoutButton");
  }
  thankYouTitle() {
    return cy.get(`h1.confirmation`);
  }
  orderSummaryTitleInThankYouPage() {
    return cy.get(`.heading .heading-text`);
  }

  addNewAddress(country, name, mobileNumber, zipCode, address, city, state) {
    this.addNewAddressButton().click();
    this.countryInput().type(country);
    this.nameInput().type(name);
    this.mobileNumberInput().type(mobileNumber);
    this.zipCodeInput().type(zipCode);
    this.addressInput().type(address);
    this.cityInput().type(city);
    this.stateInput().type(state);
    this.submitAddressButton().click({ force: true });
  }

  addNewCard(name, ccNumber, expiryMonth, expiryYear) {
    this.addNewCardHeader().click();
    this.ccNameInput().type(name);
    this.ccnumberInput().type(ccNumber);
    this.expiryMonthDropdown().select(expiryMonth);
    this.expiryYearDropdown().select(expiryYear);
    this.submitCCButton().click();
  }
}

export default BasketPage;
