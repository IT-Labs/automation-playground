const { expect } = require("@playwright/test");

exports.BasketPage = class BasketPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator(`app-basket mat-card app-purchase-basket h1`);
    this.checkoutButton = page.locator(`#checkoutButton`);
    this.selectAddressTitle = page.locator(`#card app-address mat-card h1`);
    this.addNewAddressButton = page.locator(
      `//button[@routerlink="/address/create"]`
    );
    this.countryInput = page.locator(
      `//input[@data-placeholder="Please provide a country."]`
    );
    this.nameInput = page.locator(
      `//input[@data-placeholder="Please provide a name."]`
    );
    this.mobileNumberInput = page.locator(
      `//input[@data-placeholder="Please provide a mobile number."]`
    );
    this.zipCodeInput = page.locator(
      `//input[@data-placeholder="Please provide a ZIP code."]`
    );
    this.addressInput = page.locator(`#address`);
    this.cityInput = page.locator(
      `//input[@data-placeholder="Please provide a city."]`
    );
    this.stateInput = page.locator(
      `//input[@data-placeholder="Please provide a state."]`
    );
    this.submitAddressButton = page.locator(`#submitButton`);
    this.addressRadioButton = page.locator(`input[type='radio']`);
    this.continueToSelectAddressButton = page.locator(
      `//button[@aria-label='Proceed to payment selection']`
    );
    this.continueToPaymentButton = page.locator(
      `//button[@aria-label='Proceed to delivery method selection']`
    );
    this.chooseDeliverySpeedTitle = page
      .locator(`app-delivery-method mat-card h1`)
      .last();
    this.myPaymentOptionsTitle = page.locator(`app-payment-method div h1`);
    this.addNewCardHeader = page.locator(`#mat-expansion-panel-header-0`);
    this.ccNameInput = page.locator(
      `.mat-expansion-panel-body div mat-form-field input[type='text']`
    );
    this.ccnumberInput = page.locator(
      `.mat-expansion-panel-body div mat-form-field input[type='number']`
    );
    this.expiryMonthDropdown = page.locator(`//select`).first();
    this.expiryYearDropdown = page.locator(`//select`).last();
    this.submitCCButton = page.locator(`#submitButton`);
    this.selectCCRadioButton = page.locator(
      `mat-radio-button .mat-radio-label`
    );
    this.proceedToReviewButton = page.locator(
      `//button[@aria-label="Proceed to review"]`
    );
    this.placeOrderAndPayButton = page.locator(`#checkoutButton`);
    this.orderSummaryTitle = page.locator(`div.order-summary`);
    this.yourBasketTitle = page.locator(`app-purchase-basket h1`);
    this.thankYouTitle = page.locator(`h1.confirmation`);
    this.orderSummaryTitleInThankYouPage = page.locator(
      `.heading .heading-text`
    );
  }

  async addNewAddress(
    country,
    name,
    mobileNumber,
    zipCode,
    address,
    city,
    state
  ) {
    await this.addNewAddressButton.click();
    await this.countryInput.fill(country);
    await this.nameInput.fill(name);
    await this.mobileNumberInput.fill(mobileNumber);
    await this.zipCodeInput.fill(zipCode);
    await this.addressInput.fill(address);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.submitAddressButton.click();
  }

  async getRadioButtonSelectorForAddress(customerName) {
    const selectorForAddress = this.page.locator(`text=${customerName}`);
    return selectorForAddress;
  }

  async getRadioButtonSelectorForDeliverySpeed(deliverySpeed) {
    const selectorForDeliverySpeed = this.page.locator(`text=${deliverySpeed}`);
    return selectorForDeliverySpeed;
  }

  async addNewCard(name, ccNumber, expiryMonth, expiryYear) {
    await this.addNewCardHeader.click();
    await this.ccNameInput.fill(name);
    await this.ccnumberInput.fill(ccNumber);
    await this.expiryMonthDropdown.selectOption(expiryMonth);
    await this.expiryYearDropdown.selectOption(expiryYear);
    await this.submitCCButton.click();
  }
};
