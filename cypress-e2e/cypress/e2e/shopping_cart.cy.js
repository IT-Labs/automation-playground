import customerUserData from "../fixtures/customer-user-data.json";
import HomePage from "../pages/HomePage";
import CommonsPage from "../pages/CommosPage";
import LoginPage from "../pages/LoginPage";
import BasketPage from "../pages/BasketPage";

const commonsPage = new CommonsPage();
const homePage = new HomePage();
const loginPage = new LoginPage();
const basketPage = new BasketPage();

let productName;

describe("Shopping Cart", () => {
  beforeEach(() => {
    loginPage.navigateToLogin();
    commonsPage.acceptCookies();
    commonsPage.dismissWelcomeMessage();
    loginPage.login(customerUserData.email, customerUserData.password);
  });

  it("Purchase Apple Juice successfully", () => {
    homePage.pageTitle().should("have.text", "All Products");
    productName = "Apple Juice (1000ml)";
    homePage.addProductToCart(productName);
    commonsPage
      .successMessageLabel()
      .should("have.text", `Placed ${productName} into basket.`);

    commonsPage.yourBasketlink().click();
    basketPage.pageTitle().contains("Your Basket");

    basketPage.checkoutButton().click();
    basketPage.selectAddressTitle().should("have.text", "Select an address");

    basketPage.addNewAddress(
      customerUserData.country,
      customerUserData.name,
      customerUserData.mobileNumber,
      customerUserData.zipCode,
      customerUserData.address,
      customerUserData.city,
      customerUserData.state
    );

    commonsPage
      .successMessageLabel()
      .should(
        "have.text",
        `The address at ${customerUserData.city} has been successfully added to your addresses.`
      );

    basketPage.addressSelectionRadioButton().click();
    basketPage.continueToSelectAddressButton().click();

    basketPage
      .chooseDeliverySpeedTitle()
      .should("have.text", "Choose a delivery speed");
    basketPage.deliverySpeedSelector(customerUserData.deliverySpeed).click();
    basketPage.continueToPaymentButton().click({ force: true });

    basketPage
      .myPaymentOptionsTitle()
      .should("have.text", "My Payment Options");

    basketPage.addNewCard(
      customerUserData.name,
      customerUserData.ccNumber,
      customerUserData.expiryMonth,
      customerUserData.expiryYear
    );

    basketPage.cCRadioButtonSelector().click();
    basketPage.proceedToReviewButton().click({ force: true });

    basketPage.orderSummaryTitle().should("have.text", "Order Summary");

    basketPage.yourBasketTitle().contains("Your Basket");
    basketPage.placeOrderAndPayButton().click();

    basketPage
      .thankYouTitle()
      .should("have.text", "Thank you for your purchase!");

    basketPage
      .orderSummaryTitleInThankYouPage()
      .should("have.text", "Order Summary");
  });
});
