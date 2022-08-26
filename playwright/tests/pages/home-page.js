const { expect } = require("@playwright/test");

exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator(
      `app-search-result div div.table-container div.heading .ng-star-inserted`
    );
  }

  async getAddToCartBtn(productName) {
    const addToCartBtn = await this.page.locator(
      `//div[text()=' ${productName} ']//ancestor::mat-card//div//button`
    );
    return addToCartBtn;
  }

  async addProductToCart(productName) {
    const addToCartBtn = await this.getAddToCartBtn(productName);
    await addToCartBtn.click();
  }
};
