import { test, expect } from "@playwright/test";

const URL = "https://hacker-news-client-inky.vercel.app";

test("Redirects to /new", async ({ page }) => {
  await page.goto(URL);
  await expect(page).toHaveURL(`${URL}/new`);
  await page.getByRole("heading", { name: "New", exact: true }).isVisible();
});

test("Lists first 20 items", async ({ page }) => {
  await page.goto(URL);
  const articlesListLocator = await page.getByLabel("Articles list");
  const countArticles = await articlesListLocator.getByRole("listitem");
  await expect(countArticles).toHaveCount(20);
});

test("Loads more items", async ({ page }) => {
  await page.goto(URL);
  await page.getByRole("link", { name: "More" }).click();
  await page.waitForURL("**/new?page=2");
  const articlesListLocator = await page.getByLabel("Articles list");

  // Make sure skeletons are visible while loading elements
  const countArticleSkeletons = await articlesListLocator.getByRole("status", {
    name: "Loading article",
  });
  await expect(countArticleSkeletons).toHaveCount(20);

  // Make sure another 20 items are fetched
  const countListItems = await articlesListLocator.getByRole("listitem");
  await expect(countListItems).toHaveCount(40);
});
