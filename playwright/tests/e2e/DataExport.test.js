const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login-page");
const { CommonsPage } = require("../pages/commons-page");
const { DataExportPage } = require("../pages/data-export-page");

const customerUserData = require("../../utils/data/customer-user-data.json");

test("Download users data", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const commonsPage = new CommonsPage(page);
  const loginPage = new LoginPage(page);
  const dataExportPage = new DataExportPage(page);
  await loginPage.goto();
  await commonsPage.dismissWelcomeMessage();
  await commonsPage.acceptCookies();
  await loginPage.login(customerUserData.email, customerUserData.password);

  await commonsPage.successMessage.waitFor();
  await expect(commonsPage.successMessage).toContainText(
    `Language has been changed to`
  );
  await page.waitForLoadState();
  await dataExportPage.goto();

  await dataExportPage.jsonRadioButton.click();

  const [downloadPage] = await Promise.all([
    context.waitForEvent("page"),
    await dataExportPage.submitButton.click(),
  ]);
  await downloadPage.waitForLoadState();
  await expect(await downloadPage.locator("body")).toContainText(
    `"email": "${customerUserData.email}"`
  );
});
