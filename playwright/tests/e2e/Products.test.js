const { test, expect, browser } = require("@playwright/test");
const { HomePage } = require("../pages/home-page");
const { CommonsPage } = require("../pages/commons-page");

let context, page;
const productName = "Apple Pomace";

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  const homePage = new HomePage(page);
  const commonsPage = new CommonsPage(page);
  await homePage.goto();
  await commonsPage.dismissWelcomeMessage();
  await commonsPage.acceptCookies();
});

test.afterAll(async () => {
  await context.close();
});

test("Check Product Details", async () => {
  const homePage = new HomePage(page);
  await homePage.hoverProduct(productName);
  await expect(await homePage.productTooltip).toBeVisible();
  await expect(await homePage.productTooltip).toHaveText(
    "Click for more information"
  );

  const productCard = await homePage.getHoverProductElement(productName);
  await productCard.click();
  const modalProductDetailTitle = await homePage.getModalProductDetailTitle();
  await expect(modalProductDetailTitle).toHaveText(productName);
});
