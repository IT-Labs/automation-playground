const { test, expect, browser } = require("@playwright/test");
const { LoginPage } = require("../pages/login-page");
const { CommonsPage } = require("../pages/commons-page");
const { HomePage } = require("../pages/home-page");
const { BasketPage } = require("../pages/basket-page");

const customerUserData = require("../../utils/data/customer-user-data.json");

const email = customerUserData.email;
const password = customerUserData.password;
let productName;

let page;

test.beforeEach(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
  const commonsPage = new CommonsPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await commonsPage.dismissWelcomeMessage();
  await commonsPage.acceptCookies();
  await loginPage.login(email, password);
});

test.afterEach(async ({ browser }) => {
  await browser.close();
});

test("Purchase Apple Juice", async () => {
  const homePage = new HomePage(page);
  const commonsPage = new CommonsPage(page);
  const basketPage = new BasketPage(page);
  await expect(await homePage.pageTitle).toHaveText(`All Products`);
  productName = "Apple Juice (1000ml)";
  await homePage.addProductToCart(productName);
  await commonsPage.successMessage.waitFor();
  await expect(commonsPage.successMessage).toContainText(
    `Placed ${productName} into basket.`
  );

  await commonsPage.yourBasketLink.click();
  await expect(await basketPage.pageTitle).toContainText("Your Basket");
  await basketPage.checkoutButton.click();
  await expect(basketPage.selectAddressTitle).toHaveText("Select an address");
  await basketPage.addNewAddress(
    customerUserData.country,
    customerUserData.name,
    customerUserData.mobileNumber,
    customerUserData.zipCode,
    customerUserData.address,
    customerUserData.city,
    customerUserData.state
  );

  await expect(commonsPage.successMessage).toContainText(
    `The address at ${customerUserData.city} has been successfully added to your addresses.`
  );

  const adressRadioButton = await basketPage.getRadioButtonSelectorForAddress(
    customerUserData.name
  );
  await adressRadioButton.click();
  await basketPage.continueToSelectAddressButton.click();

  await expect(basketPage.chooseDeliverySpeedTitle).toHaveText(
    "Choose a delivery speed"
  );
  const deliverySpeedRadioButton =
    await basketPage.getRadioButtonSelectorForDeliverySpeed(
      customerUserData.deliverySpeed
    );
  await deliverySpeedRadioButton.click();
  await basketPage.continueToPaymentButton.click();

  await expect(basketPage.myPaymentOptionsTitle).toHaveText(
    "My Payment Options"
  );

  await basketPage.addNewCard(
    customerUserData.name,
    customerUserData.ccNumber,
    customerUserData.expiryMonth,
    customerUserData.expiryYear
  );

  await basketPage.selectCCRadioButton.click();
  await basketPage.proceedToReviewButton.click();

  await expect(await basketPage.orderSummaryTitle).toHaveText("Order Summary");
  await expect(await basketPage.yourBasketTitle).toContainText("Your Basket");
  await basketPage.placeOrderAndPayButton.click();

  await expect(await basketPage.thankYouTitle).toHaveText(
    "Thank you for your purchase!"
  );
  await expect(await basketPage.orderSummaryTitleInThankYouPage).toHaveText(
    "Order Summary"
  );
});
