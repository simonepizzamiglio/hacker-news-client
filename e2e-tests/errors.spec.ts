import { test, expect } from "@playwright/test";

const URL = "https://hacker-news-client-inky.vercel.app";

test.describe("Errors", () => {
  test("Handles page not found", async ({ page }) => {
    await page.goto(`${URL}/this-page-does-not-exist`);
    const title = await page.title();
    expect(title).toBe("Not found");
    await page.getByRole("heading", { name: "Not found" }).isVisible();
  });

  test("Handles item not found", async ({ page }) => {
    await page.goto(`${URL}/item/789079273489472390432`);
    const title = await page.title();
    expect(title).toBe("Item not found");
    await page.getByRole("heading", { name: "Not found" }).isVisible();
  });
});
