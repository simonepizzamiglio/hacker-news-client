import type { Page } from "@playwright/test";
import { test, expect } from "@playwright/test";

async function getInternalLink(page: Page, articlesCount: number) {
  const articlesListLocator = await page.getByLabel("Articles list");
  const link = await articlesListLocator
    .locator('a:not([target="_blank"])')
    .first();

  if (link) {
    return link;
  }

  await page.getByRole("link", { name: "More", exact: true }).click();
  const countArticles = await articlesListLocator.getByRole("listitem");
  const newArticlesCount = articlesCount + 20;
  await expect(countArticles).toHaveCount(newArticlesCount);

  getInternalLink(page, newArticlesCount);
}

test.describe("New page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const loadingState = await page.getByRole("status", { name: "Loading..." });
    await loadingState.isVisible();
    await expect(loadingState).not.toBeVisible();
  });

  test("Redirects to /new", async ({ page }) => {
    await expect(page).toHaveURL(`${URL}/new`);
    await page.getByRole("heading", { name: "New", exact: true }).isVisible();
  });

  test("Lists first 20 items", async ({ page }) => {
    const articlesListLocator = await page.getByLabel("Articles list");
    const countArticles = await articlesListLocator.getByRole("listitem");
    await expect(countArticles).toHaveCount(20);
  });

  test("Loads more items", async ({ page }) => {
    await page.getByRole("link", { name: "More", exact: true }).click();
    await page.waitForURL("**/new?page=2");
    const articlesListLocator = await page.getByLabel("Articles list");

    // Make sure skeletons are visible while loading elements
    const countArticleSkeletons = await articlesListLocator.getByRole(
      "status",
      {
        name: "Loading article",
      },
    );
    await expect(countArticleSkeletons).toHaveCount(20);

    // Make sure another 20 items are fetched
    const countListItems = await articlesListLocator.getByRole("listitem");
    await expect(countListItems).toHaveCount(40);
  });

  test("External link opens a new tab", async ({ page, context }) => {
    const articlesListLocator = await page.getByLabel("Articles list");
    const countArticles = await articlesListLocator.getByRole("listitem");
    await expect(countArticles).toHaveCount(20);

    const externalLink = await articlesListLocator
      .locator('a[target="_blank"]')
      .first();

    if (externalLink) {
      externalLink.click();

      const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        externalLink.click(), // Opens a new tab
      ]);
      await newPage.waitForLoadState();
    }
  });

  test("Internal link opens article page", async ({ page }) => {
    const articlesListLocator = await page.getByLabel("Articles list");
    const countArticles = await articlesListLocator.getByRole("listitem");
    await expect(countArticles).toHaveCount(20);

    const internalLink = await getInternalLink(page, 20);

    if (internalLink) {
      internalLink.click();
      await page.waitForURL("**/item/**");
    }
  });
});
