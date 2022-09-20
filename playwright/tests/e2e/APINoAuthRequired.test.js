const { test, expect } = require("@playwright/test");

const anonymousReviewData = require("../../utils/data/anonymous-review-data.json");
let apiContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: "http://localhost:3000",
    extraHTTPHeaders: {},
  });
});

test.afterAll(async ({}) => {
  await apiContext.dispose();
});

test("Get Juice Shop Challenges", async ({ request }) => {
  const challenges = await request.get(`/api/Challenges`);
  expect(challenges.ok()).toBeTruthy();
  const responseChallenges = await challenges.json();
  expect(await responseChallenges.data).toContainEqual(
    expect.objectContaining({
      name: "Deluxe Fraud",
      tags: null,
    })
  );
});

test("Add review as anonymous", async ({ request }) => {
  const review = await request.put(
    `/rest/products/${anonymousReviewData.product}/reviews`,
    {
      data: {
        author: anonymousReviewData.author,
        message: anonymousReviewData.message,
      },
    }
  );
  expect(review.ok()).toBeTruthy();

  const reviews = await request.get(
    `/rest/products/${anonymousReviewData.product}/reviews`
  );
  expect(reviews.ok()).toBeTruthy();
  const dataReviews = await reviews.json();
  expect(await dataReviews.data).toContainEqual(
    expect.objectContaining({
      author: anonymousReviewData.author,
      message: anonymousReviewData.message,
    })
  );
});
