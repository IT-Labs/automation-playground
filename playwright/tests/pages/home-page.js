const { expect } = require("@playwright/test");

exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator(
      `app-search-result div div.table-container div.heading .ng-star-inserted`
    );
    this.productTooltip = page.locator(
      `mat-tooltip-component.ng-star-inserted .mat-tooltip-show`
    );
  }

  async goto() {
    await this.page.goto("/");
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

  async getHoverProductElement(productName) {
    const infoTooltipTrigger = await this.page.locator(
      `//div[text()=' ${productName} ']//ancestor::mat-card//div[contains(@class, 'mat-tooltip-trigger')]`
    );
    return infoTooltipTrigger;
  }

  async hoverProduct(productName) {
    const productCard = await this.getHoverProductElement(productName);
    await productCard.hover();
  }

  async getModalProductDetailTitle() {
    const modalProductDetailTitle = await this.page.locator(
      // `mat-dialog-container.mat-dialog-container app-product-details div div div >> nth=1`
      `mat-dialog-container.mat-dialog-container app-product-details div div div:has(h1) h1`
    );
    return modalProductDetailTitle;
  }
};
