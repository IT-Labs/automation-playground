const { test, expect, browser } = require("@playwright/test");
const { RegisterPage } = require("../pages/register-page");
const { CommonsPage } = require("../pages/commons-page");

const newUserInformation = require("../../utils/data/register-with-email-data.json");

//test.describe.configure({ mode: "serial" });

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  const commonsPage = new CommonsPage(page);
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await commonsPage.dismissWelcomeMessage();
  await commonsPage.acceptCookies();
});

test.afterAll(async ({ browser }) => {
  await browser.close();
});

test("Register a new user successfully", async () => {
  const registerPage = new RegisterPage(page);
  const commonsPage = new CommonsPage(page);
  await registerPage.fillFormRegister(
    newUserInformation.email,
    newUserInformation.password,
    newUserInformation.securityQuestion,
    newUserInformation.securityAnswer
  );
  await commonsPage.successMessage.waitFor();
  await expect(commonsPage.successMessage).toContainText(
    `Registration completed successfully. You can now log in.`
  );
});

test("Register a new user with duplicated email", async () => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await registerPage.fillFormRegister(
    newUserInformation.email,
    newUserInformation.password,
    newUserInformation.securityQuestion,
    newUserInformation.securityAnswer
  );

  await registerPage.errorForEmailInput.waitFor();
  await expect(registerPage.errorForEmailInput).toHaveText(
    `Email must be unique`
  );
});
